'use client'
// app/dashboard/history/page.tsx

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Question { slug: string; title: string; createdAt: string; subject?: { name: string } }

export default function HistoryPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    fetch('/api/question/create?history=1').then(r => r.json()).then(d => { setQuestions(d.questions ?? []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>Question History</h1>
      {loading ? <div style={{ color: '#6b7280' }}>Loading...</div> : questions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          <div style={{ fontSize: 48 }}>📜</div>
          <p style={{ marginTop: '1rem' }}>No questions yet. <Link href="/ask" style={{ color: '#1a3a6b' }}>Ask your first question!</Link></p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {questions.map(q => (
            <Link key={q.slug} href={`/question/${q.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#111', fontSize: 15 }}>{q.title.slice(0, 80)}{q.title.length > 80 ? '...' : ''}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
                    {q.subject?.name ?? 'General'} · {new Date(q.createdAt).toLocaleDateString('en-IN')}
                  </div>
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
