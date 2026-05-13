// app/api/admin/subjects/route.ts — Admin subjects CRUD

import { NextRequest }  from 'next/server'
import { ok, err, serverErr, requireAdmin, parseBody, requireFields, sanitize, dbSafe } from '@/lib/api-middleware'
import { logger }       from '@/lib/logger'

export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireAdmin(req)
    if (response) return response

    const subjects = await dbSafe(async () => {
      const { default: prisma } = await import('@/lib/prisma')
      return prisma.subject.findMany({ orderBy: { order: 'asc' } })
    }, [], 'fetch subjects')

    return ok({ subjects })
  } catch (e) { return serverErr(e, 'GET /api/admin/subjects') }
}

export async function POST(req: NextRequest) {
  try {
    const { user, response } = await requireAdmin(req)
    if (response) return response

    const body = await parseBody(req)
    if (!body) return err('Invalid JSON body')

    const missing = requireFields(body, ['name', 'slug'])
    if (missing) return err(missing)

    const data = {
      name:        sanitize(body.name, 100),
      nameHindi:   sanitize(body.nameHindi, 100),
      slug:        sanitize(body.slug, 100).toLowerCase().replace(/\s+/g, '-'),
      icon:        sanitize(body.icon, 10),
      color:       sanitize(body.color, 20),
      description: sanitize(body.description, 500),
      branch:      sanitize(body.branch, 50) || 'general',
      order:       Number(body.order) || 0,
    }

    const subject = await dbSafe(async () => {
      const { default: prisma } = await import('@/lib/prisma')
      return prisma.subject.create({ data })
    }, null, 'create subject')

    if (!subject) return err('Failed to create subject. Check database connection.', 500)
    logger.info('Subject created', { name: data.name, by: user!.uid })
    return ok({ subject, message: 'Subject created!' }, 201)
  } catch (e) { return serverErr(e, 'POST /api/admin/subjects') }
}

export async function PUT(req: NextRequest) {
  try {
    const { response } = await requireAdmin(req)
    if (response) return response

    const body = await parseBody(req)
    if (!body) return err('Invalid JSON')
    if (!body.id) return err('Subject ID required')

    const subject = await dbSafe(async () => {
      const { default: prisma } = await import('@/lib/prisma')
      return prisma.subject.update({
        where: { id: Number(body.id) },
        data:  {
          name:     body.name ? sanitize(body.name, 100) : undefined,
          icon:     body.icon ? sanitize(body.icon, 10)  : undefined,
          isActive: typeof body.isActive === 'boolean' ? body.isActive : undefined,
          order:    body.order !== undefined ? Number(body.order) : undefined,
        },
      })
    }, null, 'update subject')

    if (!subject) return err('Update failed or subject not found', 404)
    return ok({ subject, message: 'Subject updated!' })
  } catch (e) { return serverErr(e, 'PUT /api/admin/subjects') }
}

export async function DELETE(req: NextRequest) {
  try {
    const { response } = await requireAdmin(req)
    if (response) return response

    const id = req.nextUrl.searchParams.get('id')
    if (!id || isNaN(Number(id))) return err('Valid subject ID required')

    await dbSafe(async () => {
      const { default: prisma } = await import('@/lib/prisma')
      return prisma.subject.update({ where: { id: Number(id) }, data: { isActive: false } })
    }, null, 'soft-delete subject')

    return ok({ message: 'Subject deactivated' })
  } catch (e) { return serverErr(e, 'DELETE /api/admin/subjects') }
}
