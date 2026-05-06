'use client'
// app/exam/join/page.tsx — Join exam with share code

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ExamJoinPage() {
  const [code,    setCode]    = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const res  = await fetch(`/api/exam/generate?code=${code.toUpperCase().trim()}`)
      const data = await res.json()
      if (data.id) router.push(`/exam/${code.toUpperCase().trim()}`)
      else setError('Invalid exam code. Please check and try again.')
    } catch { setError('Could not find exam.') }
    finally { setLoading(false) }
  }

  return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 440, background: '#fff', borderRadius: 20, border: '1px solid #e5e7eb', padding: '2.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: '1rem' }}>📝</div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111', margin: '0 0 0.5rem' }}>Join Exam</h1>
        <p style={{ color: '#6b7280', fontSize: 15, marginBottom: '2rem' }}>Enter the share code given by your teacher</p>
        <form onSubmit={handleJoin}>
          {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '0.75rem', color: '#dc2626', fontSize: 14, marginBottom: '1rem' }}>{error}</div>}
          <input
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            placeholder="Enter code (e.g. ABC123)"
            maxLength={6}
            required
            style={{ width: '100%', padding: '1rem', border: '2px solid #d1d5db', borderRadius: 12, fontSize: 22, fontWeight: 800, textAlign: 'center', letterSpacing: 6, textTransform: 'uppercase', boxSizing: 'border-box', outline: 'none' }}
          />
          <button type="submit" disabled={loading || code.length < 4}
            style={{ width: '100%', marginTop: '1rem', padding: '0.9rem', background: code.length >= 4 ? '#1a3a6b' : '#9ca3af', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: code.length >= 4 ? 'pointer' : 'default' }}>
            {loading ? 'Joining...' : 'Join Exam →'}
          </button>
        </form>
      </div>
    </main>
  )
}
