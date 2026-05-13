'use client'
// lib/use-auth.ts — Client-side auth hook (FREE, uses Firebase + cookies)

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export interface CurrentUser {
  uid:      string
  name:     string
  email:    string | null
  role:     string
  plan:     string
  credits:  number
  schoolId: number | null
  photoUrl: string | null
  profileId?: string
  subject?: string | null
  classLevel?: string | null
  schoolName?: string | null
  schoolBoard?: string | null
}

interface AuthState {
  user:    CurrentUser | null
  loading: boolean
  error:   string | null
}

export function useAuth(options: { required?: boolean; allowedRoles?: string[] } = {}) {
  const router  = useRouter()
  const [state, setState] = useState<AuthState>({ user: null, loading: true, error: null })

  const fetchUser = useCallback(async () => {
    try {
      // 1. Get token from cookie
      const token = getCookie('msc_auth_token')
      if (!token) {
        setState({ user: null, loading: false, error: null })
        if (options.required) router.push(`/login?redirect=${window.location.pathname}`)
        return
      }

      // 2. Fetch user from API
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
        cache:   'no-store',
      })

      if (!res.ok) {
        // Token expired — clear cookie
        deleteCookie('msc_auth_token')
        setState({ user: null, loading: false, error: null })
        if (options.required) router.push('/login')
        return
      }

      const data = await res.json()
      const user = data.user as CurrentUser

      // 3. Check role permissions
      if (options.allowedRoles && !options.allowedRoles.includes(user.role)) {
        router.push('/dashboard')
        return
      }

      setState({ user, loading: false, error: null })
    } catch (e) {
      setState({ user: null, loading: false, error: 'Auth check failed' })
    }
  }, [options.required, options.allowedRoles, router])

  useEffect(() => { fetchUser() }, [fetchUser])

  const logout = useCallback(async () => {
    try {
      const { auth } = await import('./firebase')
      const { signOut } = await import('firebase/auth')
      await signOut(auth)
    } catch {}
    deleteCookie('msc_auth_token')
    deleteCookie('msc_user_role')
    router.push('/')
  }, [router])

  const refreshCredits = useCallback(async () => {
    if (!state.user) return
    try {
      const token = getCookie('msc_auth_token')
      const res   = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) {
        const data = await res.json()
        setState(prev => ({ ...prev, user: data.user }))
      }
    } catch {}
  }, [state.user])

  return {
    user:           state.user,
    loading:        state.loading,
    error:          state.error,
    isLoggedIn:     !!state.user,
    isStudent:      state.user?.role === 'student',
    isTeacher:      state.user?.role === 'teacher',
    isSchoolAdmin:  state.user?.role === 'school_admin',
    isAdmin:        ['super_admin', 'content_admin'].includes(state.user?.role ?? ''),
    logout,
    refreshCredits,
  }
}

// Cookie helpers
function getCookie(name: string): string {
  if (typeof document === 'undefined') return ''
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return m ? decodeURIComponent(m[1]) : ''
}

function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
}
