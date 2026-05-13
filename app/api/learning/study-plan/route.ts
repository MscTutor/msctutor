// app/api/learning/study-plan/route.ts

import { NextRequest }   from 'next/server'
import { ok, err, serverErr, parseBody } from '@/lib/api-middleware'
import { generateStudyPlan }             from '@/lib/adaptive/adaptive-tutor'
import type { LearnerProfile }           from '@/lib/adaptive/learner-profile'

export async function POST(req: NextRequest) {
  try {
    const body = await parseBody(req)
    if (!body?.profile) return err('profile required')

    const plan = await generateStudyPlan(
      body.profile as LearnerProfile,
      String(body.language ?? (body.profile as LearnerProfile).language ?? 'en')
    )
    return ok(plan)
  } catch (e) { return serverErr(e, 'POST /api/learning/study-plan') }
}
