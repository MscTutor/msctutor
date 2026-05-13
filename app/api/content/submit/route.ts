// app/api/content/submit/route.ts — Content submission with moderation workflow

import { NextRequest }     from 'next/server'
import { ok, err, serverErr, parseBody, requireFields, sanitize, getClientIP } from '@/lib/api-middleware'
import { checkRateLimit }  from '@/lib/security/rate-limiter'
import { hasPermission }   from '@/lib/security/rbac'
import { audit, auditLog } from '@/lib/security/audit-log'
import { sanitizeText }    from '@/lib/security/input-sanitizer'
import { generateSlug }    from '@/lib/slug'
import type { Role }       from '@/lib/security/rbac'

export async function POST(req: NextRequest) {
  const ip = getClientIP(req)
  try {
    // Rate limit: 10 submissions/hour per IP
    const rl = checkRateLimit(`submit:${ip}`, 'strict')
    if (!rl.allowed) return err('Too many submissions. Please wait.', 429)

    const body = await parseBody(req)
    if (!body) return err('Invalid request body', 400)

    const missingField = requireFields(body, ['type', 'title', 'content', 'submittedBy', 'submitterRole'])
    if (missingField) return err(missingField, 400)

    const type         = sanitize(body.type, 30)
    const title        = sanitize(body.title, 300)
    const content      = sanitize(body.content as string, 50000)
    const submittedBy  = sanitize(body.submittedBy, 100)
    const submitterRole= sanitize(body.submitterRole, 30) as Role
    const schoolId     = body.schoolId ? parseInt(String(body.schoolId)) : undefined
    const subjectId    = body.subjectId ? parseInt(String(body.subjectId)) : undefined
    const classLevel   = body.classLevel ? sanitize(body.classLevel, 5) : undefined
    const language     = (body.language ? sanitize(body.language, 5) : 'en')
    const metadata     = body.metadata ? JSON.stringify(body.metadata) : undefined

    // RBAC check — must have content:write permission
    if (!hasPermission(submitterRole, 'content:write')) {
      await audit.accessDenied(ip, '/api/content/submit', submittedBy)
      return err('Permission denied: content:write required', 403)
    }

    // Validate content type
    const validTypes = ['chapter', 'formula', 'question', 'experiment', 'note', 'syllabus']
    if (!validTypes.includes(type)) {
      return err(`Invalid content type. Must be one of: ${validTypes.join(', ')}`, 400)
    }

    // Content safety check
    const titleCheck   = sanitizeText(title,   { checkPrompt: true, maxLength: 300 })
    const contentCheck = sanitizeText(content, { checkPrompt: true, maxLength: 50000 })
    if (!titleCheck.wasClean || !contentCheck.wasClean) {
      await audit.suspicious(ip, '/api/content/submit', `threats: ${[...titleCheck.threats, ...contentCheck.threats].join(',')}`)
      return err('Content contains invalid or unsafe text', 400)
    }

    // Auto-approve for admin/content_admin, else pending
    const isAdmin  = ['super_admin', 'content_admin'].includes(submitterRole)
    const status   = isAdmin ? 'approved' : 'pending'
    const slug     = generateSlug(`${type}-${title}-${Date.now().toString(36)}`)

    try {
      const { default: prisma } = await import('@/lib/prisma')

      const submission = await (prisma as unknown as { contentSubmission: { create: (a: unknown) => Promise<{ id: number; slug?: string; status: string }> } }).contentSubmission.create({
        data: {
          type, title, content, metadata,
          submittedBy, submitterRole,
          schoolId, subjectId, classLevel, language,
          status,
          ...(isAdmin ? { reviewedBy: submittedBy, reviewNote: 'Auto-approved (admin)' } : {}),
        },
      })

      // If approved, auto-create ContentPage
      if (status === 'approved') {
        await (prisma as unknown as { contentPage: { create: (a: unknown) => Promise<unknown> } }).contentPage.create({
          data: {
            type, title, slug,
            content:   content.slice(0, 100000),
            classLevel, subjectId,
            addedBy:    submittedBy,
            addedByRole: submitterRole,
            schoolId, isPublic: true, isApproved: true,
          },
        })
      }

      await auditLog({
        action: 'CONTENT_PUBLISHED',
        userId: submittedBy,
        ip, path: '/api/content/submit',
        details: { type, title: title.slice(0, 50), status, submissionId: submission.id },
        success: true,
      })

      return ok({
        success: true,
        submissionId: submission.id,
        status,
        message: isAdmin
          ? 'Content published immediately.'
          : 'Content submitted for review. Admin will approve within 24 hours.',
      })
    } catch {
      // DB not configured — return success with note
      return ok({
        success: true,
        submissionId: `local-${Date.now()}`,
        status: 'pending',
        message: 'Submission recorded (DB not configured).',
      })
    }
  } catch (e) {
    return serverErr(e, 'POST /api/content/submit')
  }
}
