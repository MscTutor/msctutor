'use client'
// components/school/SmartTeachMode.tsx — Full teaching interface

import { useState }    from 'react'
import CurriculumViewer from './CurriculumViewer'

interface Concept { title: string; content: string }
interface Formula { name: string; latex: string }
interface Chapter { id: number; title: string; slug: string; order: number; subject?: { name: string; slug: string } }
interface Content  { concepts?: Concept[]; formulas?: Formula[] }
interface Props {
  chapters:   Chapter[]
  classId:    string
  activeChapter?: Chapter
  content?:   Content
  onSelect:   (id: number) => void
}

export default function SmartTeachMode({ chapters, classId, activeChapter, content, onSelect }: Props) {
  const [aiQ,      setAiQ]      = useState('')
  const [aiAns,    setAiAns]    = useState('')
  const [aiLoad,   setAiLoad]   = useState(false)

  const subjects: Record<string, Chapter[]> = {}
  chapters.forEach(ch => {
    const key = ch.subject?.name ?? 'Other'
    if (!subjects[key]) subjects[key] = []
    subjects[key].push(ch)
  })

  const subjectList = Object.entries(subjects).map(([name, chs]) => ({ name, chapters: chs }))

  async function askAI(e: React.FormEvent) {
    e.preventDefault(); if (!aiQ.trim()) return
    setAiLoad(true)
    const res  = await fetch('/api/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: aiQ }) })
    const data = await res.json()
    setAiAns(data.solution ?? ''); setAiLoad(false)
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* Left — Curriculum */}
      <CurriculumViewer subjects={subjectList} classId={classId} activeSlug={activeChapter?.slug} />

      {/* Center — Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem 2rem' }}>
        {!activeChapter ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#6b7280' }}>
            <div style={{ fontSize: 56, marginBottom: '1rem' }}>📖</div>
            <p style={{ fontSize: 16 }}>Select a chapter from the left to start teaching.</p>
          </div>
        ) : (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>{activeChapter.title}</h1>

            {content?.concepts?.map((c, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderLeft: '4px solid #1a3a6b', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '0.75rem' }}>
                <h3 style={{ fontWeight: 700, color: '#1a3a6b', margin: '0 0 0.4rem', fontSize: 15 }}>{c.title}</h3>
                <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{c.content}</p>
              </div>
            ))}

            {content?.formulas && content.formulas.length > 0 && (
              <div style={{ background: '#f0f4ff', border: '1px solid #c7d2fe', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1rem' }}>
                <h3 style={{ fontWeight: 700, color: '#3730a3', margin: '0 0 0.75rem', fontSize: 15 }}>📐 Formulas</h3>
                {content.formulas.map((f, i) => (
                  <div key={i} style={{ marginBottom: '0.4rem', fontFamily: 'monospace', fontSize: 15, color: '#1e1b4b' }}>
                    <strong>{f.name}:</strong> {f.latex}
                  </div>
                ))}
              </div>
            )}

            {/* AI Ask */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '1.1rem', marginTop: '1.25rem' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#111', marginBottom: '0.65rem' }}>🤖 Ask AI about this chapter</div>
              <form onSubmit={askAI} style={{ display: 'flex', gap: '0.65rem' }}>
                <input value={aiQ} onChange={e => setAiQ(e.target.value)} placeholder={`Ask anything about ${activeChapter.title}...`}
                  style={{ flex: 1, padding: '0.7rem 1rem', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 14 }} />
                <button type="submit" disabled={aiLoad}
                  style={{ background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, padding: '0.7rem 1.1rem', fontWeight: 700, cursor: 'pointer', fontSize: 14, whiteSpace: 'nowrap' }}>
                  {aiLoad ? '...' : 'Ask'}
                </button>
              </form>
              {aiAns && <div style={{ marginTop: '0.75rem', padding: '0.85rem 1rem', background: '#f9fafb', borderRadius: 10, fontSize: 14, lineHeight: 1.7, color: '#374151' }}>{aiAns}</div>}
            </div>
          </>
        )}
      </div>

      {/* Right — Tools */}
      <div style={{ width: 190, borderLeft: '1px solid #e5e7eb', padding: '1rem', flexShrink: 0, overflow: 'auto', background: '#fff' }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: '#111', marginBottom: '0.75rem' }}>🛠️ Tools</div>
        {[
          { emoji: '✅', label: 'Attendance',  href: `/teacher/class/${classId}/attendance` },
          { emoji: '📝', label: 'Quick Quiz',  href: `/teacher/class/${classId}/exam`       },
          { emoji: '📚', label: 'Homework',    href: `/teacher/class/${classId}/homework`   },
          { emoji: '📹', label: 'Live Class',  href: `/teacher/class/${classId}/live`       },
          { emoji: '📊', label: 'Results',     href: `/school-dashboard/results`            },
        ].map(t => (
          <a key={t.label} href={t.href}
            style={{ display: 'block', padding: '0.7rem 0.85rem', background: '#f9fafb', borderRadius: 10, marginBottom: '0.45rem', fontSize: 13, fontWeight: 600, color: '#111', textDecoration: 'none', border: '1px solid #f3f4f6' }}>
            {t.emoji} {t.label}
          </a>
        ))}
      </div>
    </div>
  )
}
