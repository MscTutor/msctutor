'use client'
// app/(auth)/forgot-password/page.tsx

import { useState }    from 'react'
import Link            from 'next/link'
import { SITE }        from '@/lib/constants'

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState('')
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { getAuth, sendPasswordResetEmail } = await import('firebase/auth')
      const { app } = await import('@/lib/firebase')
      await sendPasswordResetEmail(getAuth(app), email)
      setSent(true)
    } catch {
      setError('Could not send reset email. Check the address and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#f9fafb' }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 56, height: 56, background: '#1a3a6b', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: 24 }}>🔑</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111', margin: 0 }}>Reset Password</h1>
          <p style={{ color: '#6b7280', marginTop: 6, fontSize: 14 }}>Enter your email and we&apos;ll send a reset link</p>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: '1rem' }}>📧</div>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#111' }}>Check your email</h2>
            <p style={{ color: '#6b7280', fontSize: 14, marginTop: 8 }}>We sent a password reset link to <strong>{email}</strong></p>
            <Link href="/login" style={{ display: 'block', marginTop: '1.5rem', color: '#1a3a6b', fontWeight: 600, fontSize: 14 }}>Back to Sign In</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '0.75rem 1rem', color: '#dc2626', fontSize: 14, marginBottom: '1rem' }}>
                {error}
              </div>
            )}
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', marginTop: '1.25rem', padding: '0.85rem', background: loading ? '#93c5fd' : '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? 'default' : 'pointer' }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
              <Link href="/login" style={{ color: '#6b7280', fontSize: 14 }}>Back to Sign In</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
