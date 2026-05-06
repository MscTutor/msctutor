'use client'
// app/dashboard/my-tests/page.tsx

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Attempt { id: number; score: number; totalMarks: number; percentage: number; createdAt: string; exam: { title: string } }

export default function MyTestsPage() {
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    fetch('/api/exam/submit?history=1').then(r => r.json()).then(d => { setAttempts(d.attempts ?? []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  function grade(pct: number) {
    if (pct >= 90) return '#16a34a'
    if (pct >= 70) return '#22c55e'
    if (pct >= 50) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>My Tests</h1>
      {loading ? <div style={{ color: '#6b7280' }}>Loading...</div> : attempts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280', background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: 48 }}>📝</div>
          <p style={{ marginTop: '1rem' }}>No tests taken yet.</p>
          <Link href="/mock-test" style={{ display: 'inline-block', marginTop: '1rem', background: '#1a3a6b', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: 10, textDecoration: 'none', fontWeight: 700 }}>Take a Mock Test</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {attempts.map(a => (
            <Link key={a.id} href={`/mock-test/result/${a.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', border: `3px solid ${grade(a.percentage)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: grade(a.percentage), flexShrink: 0 }}>
                  {Math.round(a.percentage)}%
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#111', fontSize: 15 }}>{a.exam.title}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{a.score}/{a.totalMarks} marks · {new Date(a.createdAt).toLocaleDateString('en-IN')}</div>
                </div>
                <span style={{ color: '#9ca3af', fontSize: 18 }}>›</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
