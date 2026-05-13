// app/api/auth/register/route.ts — Complete role-based registration

import { NextRequest }    from 'next/server'
import { ok, err, serverErr, parseBody, requireFields, sanitize } from '@/lib/api-middleware'
import { logger }         from '@/lib/logger'

export async function POST(req: NextRequest) {
  try {
    const body = await parseBody(req)
    if (!body) return err('Invalid JSON body')

    const missing = requireFields(body, ['uid', 'name'])
    if (missing) return err(missing)

    const uid         = sanitize(body.uid, 128)
    const name        = sanitize(body.name, 100)
    const email       = body.email ? sanitize(body.email, 200) : null
    const phone       = body.phone ? sanitize(body.phone, 20)  : null
    const photoUrl    = body.photoUrl ? sanitize(body.photoUrl, 500) : null
    const profileId   = body.profileId ? sanitize(body.profileId, 30) : null
    const language    = body.language  ? sanitize(body.language, 5)   : 'en'
    const rawRole     = sanitize(body.role ?? 'student', 20)
    const schoolId    = body.schoolId  ? sanitize(body.schoolId, 30)  : null
    const schoolName  = body.schoolName? sanitize(body.schoolName, 100): null
    const subject     = body.subject   ? sanitize(body.subject, 100)  : null
    const classTeach  = body.classTeach? sanitize(body.classTeach, 10) : null
    const schoolAddress = body.schoolAddress ? sanitize(body.schoolAddress, 200) : null
    const schoolBoard   = body.schoolBoard   ? sanitize(body.schoolBoard, 50)   : 'CBSE'

    // Map role
    const VALID_ROLES = ['student','teacher','school_admin','content_admin','super_admin']
    const role = rawRole === 'school' ? 'school_admin' : VALID_ROLES.includes(rawRole) ? rawRole : 'student'

    try {
      const { default: prisma } = await import('@/lib/prisma')

      // Resolve school link
      let resolvedSchoolId: number | null = null

      if (role === 'school_admin' && schoolName) {
        // Create school record
        const school = await prisma.school.upsert({
          where:  { code: profileId ?? uid.slice(0,12).toUpperCase() },
          update: { name: schoolName, address: schoolAddress ?? undefined, board: schoolBoard, profileId: profileId ?? undefined },
          create: {
            name:      schoolName,
            code:      profileId ?? uid.slice(0,12).toUpperCase(),
            profileId: profileId ?? undefined,
            address:   schoolAddress ?? undefined,
            board:     schoolBoard,
          },
        }).catch(() => null)
        if (school) resolvedSchoolId = school.id
      } else if (schoolId) {
        // Link to existing school by profileId
        const school = await prisma.school.findFirst({ where: { profileId: schoolId } }).catch(() => null)
        if (school) resolvedSchoolId = school.id
      }

      const user = await prisma.user.upsert({
        where:  { firebaseUid: uid },
        update: {
          name, email, phone, photoUrl, role,
          language, schoolId: resolvedSchoolId,
          subject: subject ?? undefined,
          classLevel: classTeach ?? undefined,
          schoolName: schoolName ?? undefined,
          schoolBoard: schoolBoard ?? undefined,
          profileId: profileId ?? undefined,
        },
        create: {
          firebaseUid: uid, name, email, phone, photoUrl,
          role, plan: 'free', credits: 5, language,
          schoolId: resolvedSchoolId,
          profileId: profileId ?? undefined,
          subject: subject ?? undefined,
          classLevel: classTeach ?? undefined,
          schoolName: schoolName ?? undefined,
          schoolBoard: schoolBoard ?? undefined,
        },
      })

      logger.info('User registered', { uid, role, profileId })
      return ok({
        user:      { id: user.id, name: user.name, role: user.role, credits: user.credits, schoolId: user.schoolId },
        profileId: user.profileId ?? profileId ?? uid.slice(0,12).toUpperCase(),
        message:   'Account created successfully!',
      }, 201)

    } catch (dbErr: any) {
      logger.dbError('register', dbErr)
      // DB not configured — return success with mock data
      return ok({
        user:      { id: 1, name, role, credits: 5, schoolId: null },
        profileId: profileId ?? uid.slice(0,12).toUpperCase(),
        message:   'Account created! (Note: Database not configured — data not persisted)',
      }, 201)
    }
  } catch (e) { return serverErr(e, 'POST /api/auth/register') }
}
