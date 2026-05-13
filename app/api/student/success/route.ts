// app/api/student/success/route.ts — Student Success Engine API

import { NextRequest } from 'next/server'
import { ok, err, serverErr, getClientIP } from '@/lib/api-middleware'
import { checkRateLimit } from '@/lib/security/rate-limiter'
import {
  getOrCreateProfile, saveProfile,
  computeExamReadiness, detectBurnout, generateStudyPlan,
  getDueSRCards, addSRCard, updateSR,
} from '@/lib/adaptive/learner-profile'

function uid(req: NextRequest) { return req.nextUrl.searchParams.get('userId') ?? req.headers.get('x-user-id') ?? 'demo' }

export async function GET(req: NextRequest) {
  const ip = getClientIP(req)
  try {
    const rl = checkRateLimit(`success:${ip}`, 'standard')
    if (!rl.allowed) return err('Too many requests', 429)

    const sp      = req.nextUrl.searchParams
    const action  = sp.get('action') ?? 'dashboard'
    const userId  = uid(req)
    const subject = sp.get('subject') ?? ''
    const profile = getOrCreateProfile(userId, 'Student')

    if (action === 'dashboard') {
      const readiness  = computeExamReadiness(profile, subject || undefined)
      const burnout    = detectBurnout(profile)
      const srDue      = getDueSRCards(profile as Parameters<typeof getDueSRCards>[0])
      const insights   = {
        questionsAsked: profile.totalQuestions,
        accuracy:       profile.totalQuestions > 0 ? Math.round(profile.correctAnswers / profile.totalQuestions * 100) : 0,
        streak:         profile.streakDays,
        strongSubjects: Object.entries(profile.subjectPerformance)
          .filter(([,v]) => v.averageScore >= 75).map(([k]) => k),
        weakSubjects:   Object.entries(profile.subjectPerformance)
          .filter(([,v]) => v.averageScore < 60).map(([k]) => k),
      }
      return ok({ readiness, burnout, srDue: srDue.length, insights, profile: { streakDays: profile.streakDays, totalQuestions: profile.totalQuestions } })
    }

    if (action === 'exam-readiness') {
      return ok(computeExamReadiness(profile, subject || undefined))
    }

    if (action === 'burnout') {
      return ok(detectBurnout(profile))
    }

    if (action === 'study-plan') {
      const examDate     = sp.get('examDate') ?? undefined
      const dailyMinutes = parseInt(sp.get('dailyMinutes') ?? '45')
      return ok(generateStudyPlan(profile, subject || 'all subjects', examDate, dailyMinutes))
    }

    if (action === 'sr-due') {
      const cards = getDueSRCards(profile as Parameters<typeof getDueSRCards>[0])
      return ok({ dueCount: cards.length, cards: cards.slice(0, 10) })
    }

    return err('action: dashboard|exam-readiness|burnout|study-plan|sr-due', 400)
  } catch (e) { return serverErr(e, 'GET /api/student/success') }
}

export async function POST(req: NextRequest) {
  const ip = getClientIP(req)
  try {
    const rl = checkRateLimit(`success-post:${ip}`, 'standard')
    if (!rl.allowed) return err('Too many requests', 429)

    const body = await req.json().catch(() => null)
    if (!body?.action) return err('action required', 400)

    const userId = body.userId ?? uid(req)
    const profile = getOrCreateProfile(userId, 'Student')

    if (body.action === 'sr-update') {
      // Update spaced repetition card after review
      const { topicId, quality } = body
      if (!topicId || quality === undefined) return err('topicId and quality required', 400)
      const extProfile = profile as Parameters<typeof getDueSRCards>[0]
      const card = (extProfile.srCards ?? []).find(c => c.topicId === topicId)
      if (!card) return err('Card not found', 404)
      const updated = updateSR(card, quality)
      const newCards = (extProfile.srCards ?? []).map(c => c.topicId === topicId ? updated : c)
      saveProfile({ ...extProfile, srCards: newCards } as typeof profile)
      return ok({ updated: true, nextReview: updated.nextReview, interval: updated.interval })
    }

    if (body.action === 'add-sr-card') {
      const { topicId, topicName, subject, classLevel } = body
      if (!topicId || !topicName) return err('topicId and topicName required', 400)
      const extProfile = profile as Parameters<typeof getDueSRCards>[0]
      const updated = addSRCard(extProfile, { topicId, topicName, subject: subject ?? '', classLevel: classLevel ?? profile.classLevel })
      saveProfile(updated as typeof profile)
      return ok({ added: true, topicId })
    }

    if (body.action === 'set-goal') {
      const { goal, examDate, targetScore } = body
      if (!goal) return err('goal required', 400)
      // Store goal in profile patterns (non-destructive extension)
      const extended = { ...profile, patterns: { ...profile.patterns, goal, examDate, targetScore } }
      saveProfile(extended)
      return ok({ set: true, goal })
    }

    return err('action: sr-update|add-sr-card|set-goal', 400)
  } catch (e) { return serverErr(e, 'POST /api/student/success') }
}
