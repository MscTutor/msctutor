// lib/auth.ts — Firebase auth helpers for server-side verification

import { adminAuth } from './firebase-admin'
import { prisma }     from './prisma'

export interface AuthUser {
  uid:   string
  email: string | null
  name:  string
  role:  string
  plan:  string
  credits: number
  schoolId?: number | null
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const decoded = await adminAuth.verifyIdToken(token)
    const adminUid = process.env.ADMIN_FIREBASE_UID

    let user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
    })

    // Auto-create user in DB if Firebase token valid but no DB record yet
    if (!user) {
      const isAdminUser = adminUid && decoded.uid === adminUid
      user = await prisma.user.create({
        data: {
          firebaseUid: decoded.uid,
          email:       decoded.email ?? null,
          name:        decoded.name ?? decoded.email?.split('@')[0] ?? 'User',
          role:        isAdminUser ? 'super_admin' : 'student',
          plan:        'free',
          credits:     5,
        },
      })
    }

    // Upgrade to super_admin if UID matches ADMIN_FIREBASE_UID
    if (adminUid && decoded.uid === adminUid && user.role !== 'super_admin') {
      user = await prisma.user.update({
        where: { firebaseUid: decoded.uid },
        data:  { role: 'super_admin' },
      })
    }

    return {
      uid:      user.firebaseUid,
      email:    user.email,
      name:     user.name,
      role:     user.role,
      plan:     user.plan,
      credits:  user.credits,
      schoolId: user.schoolId,
    }
  } catch {
    return null
  }
}

export async function getAuthUser(req: Request): Promise<AuthUser | null> {
  const auth = req.headers.get('authorization')
  if (!auth?.startsWith('Bearer ')) return null
  return verifyToken(auth.slice(7))
}

export function requireRole(user: AuthUser | null, roles: string[]): boolean {
  if (!user) return false
  return roles.includes(user.role)
}

export function isAdmin(user: AuthUser | null): boolean {
  return requireRole(user, ['super_admin', 'content_admin'])
}

export function isTeacher(user: AuthUser | null): boolean {
  return requireRole(user, ['teacher', 'super_admin'])
}

export function isSchoolAdmin(user: AuthUser | null): boolean {
  return requireRole(user, ['school_admin', 'super_admin'])
}

export async function ensureUserExists(uid: string, name: string, email?: string): Promise<void> {
  await prisma.user.upsert({
    where:  { firebaseUid: uid },
    update: { name, email: email ?? undefined },
    create: { firebaseUid: uid, name, email: email ?? null, role: 'student', plan: 'free', credits: 5 },
  })
}
