// app/api/live/session/route.ts
// LIVE CLASSROOM FOUNDATION — scalable architecture scaffold
// Currently: REST-based session management + Supabase Realtime hooks
// Future upgrade path: Liveblocks / Ably / Socket.io without breaking this API

import { NextRequest } from 'next/server'
import { ok, err, serverErr, requireAuth, getClientIP } from '@/lib/api-middleware'
import { checkRateLimit } from '@/lib/security/rate-limiter'
import { generateSlug }   from '@/lib/slug'

// ── SESSION TYPES ─────────────────────────────────────────────────
export type SessionType = 'live_class' | 'study_room' | 'quiz_session' | 'mentor_session'

export interface LiveSession {
  id:          string
  type:        SessionType
  hostId:      string
  title:       string
  subject?:    string
  classLevel?: string
  joinCode:    string        // 6-digit code for joining
  status:      'waiting' | 'active' | 'ended'
  maxParticipants: number
  participantCount: number
  createdAt:   string
  scheduledFor?: string
  features: {
    whiteboard:   boolean
    chat:         boolean
    quiz:         boolean
    screenShare:  boolean
    recording:    boolean
  }
}

// In-memory session store (production: Redis/Supabase)
const LIVE_SESSIONS = new Map<string, LiveSession>()
const CODE_TO_ID    = new Map<string, string>()

function generateJoinCode(): string {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

function generateSessionId(): string {
  return `ls_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`
}

// ── CREATE SESSION ────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = getClientIP(req)
  try {
    const rl = checkRateLimit(`live-create:${ip}`, 'strict')  // 5/min
    if (!rl.allowed) return err('Too many session requests', 429)

    const { user, response } = await requireAuth(req)
    if (response) return response

    const body = await req.json().catch(() => null)
    if (!body) return err('Invalid body', 400)

    const { type = 'study_room', title, subject, classLevel, maxParticipants = 30, scheduledFor, features = {} } = body
    if (!title?.trim()) return err('title required', 400)

    const validTypes: SessionType[] = ['live_class','study_room','quiz_session','mentor_session']
    if (!validTypes.includes(type)) return err('Invalid session type', 400)

    // Role check: only teachers+ can create live_class/mentor_session
    const userRole = (user as { role?: string })?.role ?? 'student'
    if (['live_class','mentor_session'].includes(type) && !['teacher','school_admin','super_admin','content_admin'].includes(userRole)) {
      return err('Only teachers can create live classes', 403)
    }

    const id       = generateSessionId()
    const joinCode = generateJoinCode()

    const session: LiveSession = {
      id, type,
      hostId:    (user as { uid?: string })?.uid ?? 'unknown',
      title:     title.trim().slice(0, 100),
      subject,   classLevel,
      joinCode,
      status:    'waiting',
      maxParticipants: Math.min(maxParticipants, type === 'live_class' ? 500 : 50),
      participantCount: 1,
      createdAt:  new Date().toISOString(),
      scheduledFor,
      features: {
        whiteboard:  features.whiteboard  ?? type === 'live_class',
        chat:        features.chat        ?? true,
        quiz:        features.quiz        ?? type === 'quiz_session',
        screenShare: features.screenShare ?? false,
        recording:   features.recording   ?? false,
      },
    }

    LIVE_SESSIONS.set(id, session)
    CODE_TO_ID.set(joinCode, id)

    // Auto-cleanup after 4 hours
    setTimeout(() => {
      LIVE_SESSIONS.delete(id)
      CODE_TO_ID.delete(joinCode)
    }, 4 * 3600 * 1000)

    try {
      const { default: prisma } = await import('@/lib/prisma')
      await (prisma as unknown as { liveClass: { create: (a: unknown) => Promise<unknown> } }).liveClass.create({
        data: {
          title:       session.title,
          hostId:      session.hostId,
          joinCode:    session.joinCode,
          classLevel:  session.classLevel,
          subject:     session.subject,
          status:      session.status,
          scheduledAt: scheduledFor ? new Date(scheduledFor) : null,
          maxStudents: session.maxParticipants,
        },
      })
    } catch { /* DB optional */ }

    return ok({ session, joinUrl: `/live/${id}?code=${joinCode}` }, 201)
  } catch (e) { return serverErr(e, 'POST /api/live/session') }
}

// ── GET SESSION / JOIN ────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const sp   = req.nextUrl.searchParams
    const id   = sp.get('id')
    const code = sp.get('code')?.toUpperCase()

    if (code) {
      const sessionId = CODE_TO_ID.get(code)
      if (!sessionId) return err('Invalid join code', 404)
      const session = LIVE_SESSIONS.get(sessionId)
      if (!session) return err('Session not found or expired', 404)
      if (session.status === 'ended') return err('Session has ended', 410)
      if (session.participantCount >= session.maxParticipants) return err('Session is full', 409)
      return ok({ session, websocketHint: `/api/live/ws?sessionId=${sessionId}` })
    }

    if (id) {
      const session = LIVE_SESSIONS.get(id)
      if (!session) return err('Session not found', 404)
      return ok({ session })
    }

    // List active sessions (no auth required for public rooms)
    const active = [...LIVE_SESSIONS.values()]
      .filter(s => s.status !== 'ended' && s.type === 'study_room')
      .map(s => ({ id: s.id, title: s.title, type: s.type, subject: s.subject, participantCount: s.participantCount, status: s.status }))
      .slice(0, 20)

    return ok({ sessions: active, total: active.length })
  } catch (e) { return serverErr(e, 'GET /api/live/session') }
}

// ── UPDATE SESSION STATUS ─────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req)
    if (response) return response

    const body = await req.json().catch(() => null)
    if (!body?.id) return err('id required', 400)

    const session = LIVE_SESSIONS.get(body.id)
    if (!session) return err('Session not found', 404)
    if (session.hostId !== (user as { uid?: string })?.uid) return err('Only host can update session', 403)

    const updated = { ...session, ...{ status: body.status ?? session.status, participantCount: body.participantCount ?? session.participantCount } }
    LIVE_SESSIONS.set(body.id, updated)

    if (body.status === 'ended') {
      setTimeout(() => { LIVE_SESSIONS.delete(body.id); CODE_TO_ID.delete(session.joinCode) }, 60000)
    }

    return ok({ updated: true, session: updated })
  } catch (e) { return serverErr(e, 'PATCH /api/live/session') }
}
