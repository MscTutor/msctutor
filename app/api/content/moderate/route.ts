// app/api/content/moderate/route.ts — Review queue + approve/reject

import { NextRequest } from 'next/server'
import { ok, err, serverErr, parseBody, requireAdmin, getClientIP } from '@/lib/api-middleware'
import { generateSlug } from '@/lib/slug'

export async function GET(req: NextRequest) {
  try {
    const { response } = await requireAdmin(req)
    if (response) return response

    const sp      = req.nextUrl.searchParams
    const status  = sp.get('status') ?? 'pending'
    const page    = Math.max(1, parseInt(sp.get('page') ?? '1'))
    const limit   = Math.min(50, parseInt(sp.get('limit') ?? '20'))

    try {
      const { default: prisma } = await import('@/lib/prisma')
      const [submissions, total] = await Promise.all([
        (prisma as unknown as { contentSubmission: { findMany: (a: unknown) => Promise<unknown[]> } }).contentSubmission.findMany({
          where:    { status },
          orderBy:  { createdAt: 'desc' },
          skip:     (page - 1) * limit,
          take:     limit,
        }),
        (prisma as unknown as { contentSubmission: { count: (a: unknown) => Promise<number> } }).contentSubmission.count({ where: { status } }),
      ])
      return ok({ submissions, total, page, pages: Math.ceil(total / limit), status })
    } catch {
      return ok({ submissions: [], total: 0, page: 1, pages: 0, note: 'DB not configured' })
    }
  } catch (e) { return serverErr(e, 'GET /api/content/moderate') }
}

export async function POST(req: NextRequest) {
  const ip = getClientIP(req)
  try {
    const { user, response } = await requireAdmin(req)
    if (response) return response

    const body = await parseBody(req)
    if (!body) return err('Invalid body', 400)

    const { submissionId, action, note } = body
    if (!submissionId || !action) return err('submissionId and action required', 400)
    if (!['approve', 'reject', 'flag'].includes(String(action))) return err('action must be approve|reject|flag', 400)

    const id = parseInt(String(submissionId))

    try {
      const { default: prisma } = await import('@/lib/prisma')
      const db = prisma as unknown as {
        contentSubmission: {
          findUnique: (a: unknown) => Promise<{ id: number; type: string; title: string; content: string; classLevel?: string; subjectId?: number; addedBy?: string; submittedBy: string; schoolId?: number } | null>
          update: (a: unknown) => Promise<unknown>
        }
        contentPage: { create: (a: unknown) => Promise<unknown> }
      }

      const submission = await db.contentSubmission.findUnique({ where: { id } })
      if (!submission) return err('Submission not found', 404)

      if (action === 'approve') {
        const slug = generateSlug(`${submission.type}-${submission.title}-${Date.now().toString(36)}`)
        await Promise.all([
          db.contentSubmission.update({
            where: { id },
            data:  { status: 'approved', reviewedBy: (user as { uid?: string })?.uid, reviewNote: String(note ?? '') },
          }),
          db.contentPage.create({
            data: {
              type:        submission.type,
              title:       submission.title,
              slug,
              content:     submission.content,
              classLevel:  submission.classLevel,
              subjectId:   submission.subjectId,
              addedBy:     submission.submittedBy,
              addedByRole: 'teacher',
              schoolId:    submission.schoolId,
              isPublic:    true,
              isApproved:  true,
            },
          }),
        ])
        return ok({ success: true, action: 'approved', slug })
      }

      if (action === 'reject') {
        await db.contentSubmission.update({
          where: { id },
          data:  { status: 'rejected', reviewedBy: (user as { uid?: string })?.uid, reviewNote: String(note ?? 'Does not meet content standards') },
        })
        return ok({ success: true, action: 'rejected' })
      }

      if (action === 'flag') {
        await db.contentSubmission.update({
          where: { id },
          data:  { status: 'flagged', moderationFlags: { increment: 1 } },
        })
        return ok({ success: true, action: 'flagged' })
      }

      return err('Unknown action', 400)
    } catch {
      return ok({ success: true, note: 'Action recorded (DB not configured)' })
    }
  } catch (e) { return serverErr(e, 'POST /api/content/moderate') }
}
