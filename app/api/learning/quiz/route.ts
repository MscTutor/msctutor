// app/api/learning/quiz/route.ts

import { NextRequest }  from 'next/server'
import { ok, err, serverErr, parseBody, rateLimit, getClientIP } from '@/lib/api-middleware'
import { generateAdaptiveQuestion } from '@/lib/adaptive/adaptive-tutor'
import type { LearnerProfile }      from '@/lib/adaptive/learner-profile'

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req)
    if (!rateLimit(`quiz:${ip}`, 20, 60_000)) return err('Too many requests', 429)

    const body = await parseBody(req)
    if (!body)                return err('Invalid request')
    if (!body.profile)        return err('profile required')
    if (!body.topicName)      return err('topicName required')
    if (!body.subject)        return err('subject required')

    const q = await generateAdaptiveQuestion({
      profile:     body.profile as LearnerProfile,
      subject:     String(body.subject),
      classLevel:  String(body.classLevel ?? (body.profile as LearnerProfile).classLevel ?? '10'),
      topicName:   String(body.topicName),
      chapterName: String(body.chapterName ?? body.topicName),
      language:    String(body.language ?? (body.profile as LearnerProfile).language ?? 'en'),
    })

    return ok(q)
  } catch (e) { return serverErr(e, 'POST /api/learning/quiz') }
}
