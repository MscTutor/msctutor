'use client'
// app/teacher/class/[classId]/teach/[chapterId]/page.tsx — Smart Teaching Mode

import { useEffect, useState } from 'react'
import { useParams }           from 'next/navigation'
import Link                    from 'next/link'

interface Chapter { id: number; title: string; slug: string; order: number }
interface Content { concepts: { title: string; content: string }[]; formulas: { name: string; latex: string }[]; diagrams: { imageUrl: string; title: string; attribution?: string }[] }

export default function SmartTeachPage() {
  const params    = useParams()
  const classId   = params.classId as string
  const chapterId = params.chapterId as string

  const [chapters, setChapters] = useState<Chapter[]>([])
  const [content,  setContent]  = useState<Content | null>(null)
  const [current,  setCurrent]  = useState<Chapter | null>(null)
  const [loading,  setLoading]  = useState(true)
  const [aiQ,      setAiQ]      = useState('')
  const [aiAns,    setAiAns]    = useState('')
  const [aiLoading, setAiLoading] = useState(false)

  useEffect(() => {
    fetch('/api/question/create?chapters=1').then(r => r.json()).then(d => { setChapters(d.chapters ?? []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!chapterId || chapterId === '1') return
    fetch(`/api/question/create?chapterId=${chapterId}`).then(r => r.json()).then(d => { setCurrent(d.chapter ?? null); setContent(d.content ?? null) }).catch(() => {})
  }, [chapterId])

  async function askAI(e: React.FormEvent) {
    e.preventDefault(); if (!aiQ.trim()) return
    setAiLoading(true)
    const res  = await fetch('/api/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: aiQ }) })
    const data = await res.json()
    setAiAns(data.solution ?? ''); setAiLoading(false)
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Left: Curriculum */}
      <div style={{ width: 250, background: '#1a3a6b', color: '#fff', overflow: 'auto', flexShrink: 0 }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid #ffffff22' }}>
          <Link href={`/teacher/class/${classId}`} style={{ color: '#93c5fd', fontSize: 13 }}>← Back to Class</Link>
          <div style={{ fontWeight: 700, marginTop: 8, fontSize: 16 }}>📚 Curriculum</div>
        </div>
        {loading ? <div style={{ padding: '1rem', fontSize: 14, opacity: 0.7 }}>Loading...</div> : (
          <div>
            {chapters.map(ch => (
              <Link key={ch.id} href={`/teacher/class/${classId}/teach/${ch.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ padding: '0.75rem 1rem', fontSize: 14, color: ch.id.toString() === chapterId ? '#fff' : '#93c5fd', background: ch.id.toString() === chapterId ? '#ffffff22' : 'transparent', borderLeft: ch.id.toString() === chapterId ? '3px solid #fff' : '3px solid transparent', cursor: 'pointer' }}>
                  {ch.order}. {ch.title}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Center: Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem 2rem' }}>
        {!content && !loading && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
            <div style={{ fontSize: 48 }}>📖</div>
            <p style={{ marginTop: '1rem', fontSize: 16 }}>Select a chapter from the left panel to start teaching.</p>
          </div>
        )}
        {current && (
          <>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>{current.title}</h1>
            {content?.concepts?.map((c, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '1.25rem', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a3a6b', margin: '0 0 0.5rem' }}>{c.title}</h3>
                <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{c.content}</p>
              </div>
            ))}
            {content?.formulas && content.formulas.length > 0 && (
              <div style={{ background: '#f0f4ff', border: '1px solid #c7d2fe', borderRadius: 14, padding: '1.25rem', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#3730a3', margin: '0 0 0.75rem' }}>📐 Formulas</h3>
                {content.formulas.map((f, i) => (
                  <div key={i} style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 600, color: '#374151' }}>{f.name}:</span>
                    <code style={{ marginLeft: 8, background: '#fff', padding: '2px 8px', borderRadius: 4, fontFamily: 'monospace', color: '#1a3a6b' }}>{f.latex}</code>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {/* AI ask box */}
        <div style={{ marginTop: '2rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '1.25rem' }}>
          <div style={{ fontWeight: 700, color: '#111', marginBottom: '0.75rem', fontSize: 15 }}>🤖 Ask AI About This Topic</div>
          <form onSubmit={askAI} style={{ display: 'flex', gap: '0.75rem' }}>
            <input value={aiQ} onChange={e => setAiQ(e.target.value)} placeholder="Ask anything about this chapter..." style={{ flex: 1, padding: '0.75rem 1rem', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 14 }} />
            <button type="submit" disabled={aiLoading} style={{ background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, padding: '0.75rem 1.25rem', fontWeight: 700, cursor: 'pointer', fontSize: 14, whiteSpace: 'nowrap' }}>{aiLoading ? '...' : 'Ask'}</button>
          </form>
          {aiAns && <div style={{ marginTop: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: 10, fontSize: 14, lineHeight: 1.7, color: '#374151' }}>{aiAns}</div>}
        </div>
      </div>

      {/* Right: Tools */}
      <div style={{ width: 200, borderLeft: '1px solid #e5e7eb', padding: '1rem', flexShrink: 0, overflow: 'auto' }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#111', marginBottom: '0.75rem' }}>Teacher Tools</div>
        {[
          { emoji: '✅', label: 'Take Attendance', href: `/teacher/class/${classId}/attendance` },
          { emoji: '📝', label: 'Quick Quiz',      href: `/teacher/class/${classId}/exam` },
          { emoji: '📚', label: 'Assign Homework', href: `/teacher/class/${classId}/homework` },
          { emoji: '📹', label: 'Start Live Class',href: `/teacher/class/${classId}/live` },
        ].map(t => (
          <Link key={t.label} href={t.href} style={{ textDecoration: 'none' }}>
            <div style={{ padding: '0.75rem', background: '#f9fafb', borderRadius: 10, marginBottom: '0.5rem', fontSize: 13, fontWeight: 600, color: '#111', cursor: 'pointer' }}>
              {t.emoji} {t.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
