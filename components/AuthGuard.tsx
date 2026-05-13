'use client'
// components/AuthGuard.tsx — Protect pages (FREE, no paid service)

import { useAuth } from '@/lib/use-auth'
import Link from 'next/link'

interface Props {
  children:      React.ReactNode
  allowedRoles?: string[]       // e.g. ['teacher', 'school_admin']
  fallback?:     React.ReactNode
}

export default function AuthGuard({ children, allowedRoles, fallback }: Props) {
  const { user, loading, isLoggedIn } = useAuth({
    required:     true,
    allowedRoles,
  })

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid #e5e7eb', borderTopColor: '#1a3a6b', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <div style={{ color: '#6b7280', fontSize: 14 }}>Loading your account...</div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return fallback ?? (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: 56 }}>🔒</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111' }}>Login Required</h2>
        <p style={{ color: '#6b7280', fontSize: 14 }}>Please login to access this page</p>
        <Link href="/login" style={{ padding: '10px 28px', background: '#1a3a6b', color: '#fff', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
          Login Now →
        </Link>
      </div>
    )
  }

  if (allowedRoles && !allowedRoles.includes(user!.role)) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: 56 }}>🚫</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111' }}>Access Denied</h2>
        <p style={{ color: '#6b7280', fontSize: 14 }}>You don&apos;t have permission to view this page</p>
        <Link href="/dashboard" style={{ padding: '10px 28px', background: '#1a3a6b', color: '#fff', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
          Go to Dashboard
        </Link>
      </div>
    )
  }

  return <>{children}</>
}
