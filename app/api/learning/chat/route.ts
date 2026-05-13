// app/api/learning/chat/route.ts — Adaptive AI Tutor Chat

import { NextRequest }    from 'next/server'
import { ok, err, serverErr, parseBody, requireFields, rateLimit, getClientIP } from '@/lib/api-middleware'
import { adaptiveChat }   from '@/lib/adaptive/adaptive-tutor'
import { logger }         from '@/lib/logger'
import type { TutorMessage } from '@/lib/adaptive/adaptive-tutor'
import type { LearnerProfile } from '@/lib/adaptive/learner-profile'

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 30 messages/min per IP
    const ip = getClientIP(req)
    if (!rateLimit(`chat:${ip}`, 30, 60_000)) {
      return err('Too many messages. Please slow down a little!', 429)
    }

    const body = await parseBody(req)
    if (!body) return err('Invalid request')

    const missing = requireFields(body, ['message', 'profile', 'subject'])
    if (missing) return err(missing)

    const message  = String(body.message).trim().slice(0, 2000)
    const profile  = body.profile  as LearnerProfile
    const subject  = String(body.subject)
    const language = String(body.language  ?? profile?.language ?? 'en')
    const classLevel = String(body.classLevel ?? profile?.classLevel ?? '10')

    if (!message) return err('Message cannot be empty')

    logger.info('Adaptive chat request', { subject, language, uid: profile?.userId })

    const response = await adaptiveChat({
      studentMessage:      message,
      profile,
      subject,
      classLevel,
      chapterName:         body.chapterName  ? String(body.chapterName)  : undefined,
      topicName:           body.topicName    ? String(body.topicName)    : undefined,
      language,
      conversationHistory: (body.history ?? []) as TutorMessage[],
    })

    // Track in DB (non-blocking)
    setImmediate(async () => {
      try {
        const { default: prisma } = await import('@/lib/prisma')
        await prisma.question.create({
          data: {
            slug:      `adaptive-${Date.now()}`,
            title:     message.slice(0, 500),
            solution:  response.text.slice(0, 5000),
            source:    'ai-teacher',
            isPublic:  false,
            language,
            userId:    profile?.userId ? undefined : undefined,
          },
        })
      } catch {}
    })

    return ok(response)
  } catch (e) { return serverErr(e, 'POST /api/learning/chat') }
}
