'use client'
// components/question/PracticeBlock.tsx — AI-generated practice questions

import { useState } from 'react'

interface Props { topic: string; subject?: string }

export default function PracticeBlock({ topic, subject }: Props) {
  const [questions, setQuestions] = useState<string[]>([])
  const [loading,   setLoading]   = useState(false)
  const [shown,     setShown]     = useState(false)

  async function generate() {
    setLoading(true); setShown(true)
    try {
      const res  = await fetch('/api/ask', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ question: `Generate 3 practice questions related to "${topic}" ${subject ? `for ${subject}` : ''}. Number them 1., 2., 3. Only questions, no answers.` }),
      })
      const data = await res.json()
      const lines = (data.solution ?? '').split('\n').filter((l: string) => /^\d+\./.test(l.trim()))
      setQuestions(lines.slice(0, 3))
    } catch { setQuestions(['Could not load practice questions.']) }
    setLoading(false)
  }

  return (
    <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 14, padding: '1.25rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: shown ? '0.75rem' : 0 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#92400e', margin: 0 }}>✏️ Practice Questions</h3>
        {!shown && (
          <button onClick={generate} style={{ background: '#f59e0b', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1rem', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
            Generate
          </button>
        )}
      </div>
      {loading && <div style={{ color: '#92400e', fontSize: 14 }}>Generating practice questions…</div>}
      {!loading && questions.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {questions.map((q, i) => (
            <div key={i} style={{ padding: '0.65rem 1rem', background: '#fff', border: '1px solid #fde68a', borderRadius: 8, fontSize: 14, color: '#374151', lineHeight: 1.5 }}>
              {q}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
