'use client'
// components/exam/ExamInterface.tsx — Live exam UI with question palette

import { useState, useCallback } from 'react'
import TimerBar from './TimerBar'

interface Question {
  id: number; order: number; type: string; questionText: string
  options?: string[]; marks: number; chapter: string
}
interface Props {
  exam:     { id: number; title: string; duration: number; totalMarks: number; questions: Question[] }
  onSubmit: (answers: Record<number, string>) => void
}

export default function ExamInterface({ exam, onSubmit }: Props) {
  const [answers,  setAnswers]  = useState<Record<number, string>>({})
  const [marked,   setMarked]   = useState<Set<number>>(new Set())
  const [current,  setCurrent]  = useState(0)
  const [confirm,  setConfirm]  = useState(false)

  const q         = exam.questions[current]
  const answered  = Object.keys(answers).length
  const total     = exam.questions.length

  const handleExpire = useCallback(() => onSubmit(answers), [answers, onSubmit])
  const handleSubmit = () => { if (!confirm) { setConfirm(true); return } onSubmit(answers) }

  function toggleMark() {
    setMarked(m => { const n = new Set(m); n.has(q.id) ? n.delete(q.id) : n.add(q.id); return n })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Top bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: '#1a3a6b', color: '#fff', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{exam.title}</div>
          <TimerBar totalSeconds={exam.duration * 60} onExpire={handleExpire} />
        </div>
        <div style={{ textAlign: 'right', fontSize: 13, flexShrink: 0 }}>
          <div style={{ color: '#93c5fd' }}>{answered}/{total} answered</div>
          {confirm ? (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 4 }}>
              <button onClick={() => setConfirm(false)} style={{ padding: '4px 10px', background: '#fff2', color: '#fff', border: '1px solid #fff4', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>Cancel</button>
              <button onClick={handleSubmit} style={{ padding: '4px 10px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>Confirm Submit</button>
            </div>
          ) : (
            <button onClick={handleSubmit} style={{ marginTop: 4, padding: '5px 12px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>Submit</button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', maxWidth: 1100, margin: '0 auto', padding: '1.25rem 1rem', gap: '1.25rem' }}>
        {/* Question */}
        <div style={{ flex: 1 }}>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: '0.85rem', flexWrap: 'wrap' }}>
              <span style={{ background: '#e8eef8', color: '#1a3a6b', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 6 }}>Q{current + 1} of {total}</span>
              <span style={{ background: '#f3f4f6', color: '#6b7280', fontSize: 12, padding: '3px 10px', borderRadius: 6 }}>{q.marks} mark{q.marks !== 1 ? 's' : ''}</span>
              <span style={{ background: '#f3f4f6', color: '#6b7280', fontSize: 12, padding: '3px 10px', borderRadius: 6 }}>{q.chapter}</span>
              {marked.has(q.id) && <span style={{ background: '#fef3c7', color: '#92400e', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 6 }}>★ Marked</span>}
            </div>
            <p style={{ fontSize: 17, color: '#111', lineHeight: 1.7, margin: '0 0 1.25rem' }}>{q.questionText}</p>

            {q.type === 'mcq' && q.options ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {q.options.map(opt => {
                  const sel = answers[q.id] === opt
                  return (
                    <button key={opt} onClick={() => setAnswers(a => ({ ...a, [q.id]: opt }))}
                      style={{ textAlign: 'left', padding: '0.85rem 1.1rem', borderRadius: 12, border: sel ? '2px solid #1a3a6b' : '1.5px solid #e5e7eb', background: sel ? '#e8eef8' : '#fff', cursor: 'pointer', fontSize: 15, fontWeight: sel ? 600 : 400, color: sel ? '#1a3a6b' : '#374151', transition: 'all 0.1s' }}>
                      {opt}
                    </button>
                  )
                })}
              </div>
            ) : (
              <textarea rows={4} value={answers[q.id] ?? ''} onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
                placeholder="Type your answer here..." style={{ width: '100%', padding: '0.85rem', border: '1.5px solid #d1d5db', borderRadius: 12, fontSize: 15, resize: 'vertical', boxSizing: 'border-box' }} />
            )}
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
              style={{ padding: '0.7rem 1.5rem', borderRadius: 10, border: '1.5px solid #d1d5db', background: '#fff', cursor: current === 0 ? 'default' : 'pointer', color: current === 0 ? '#9ca3af' : '#111', fontWeight: 600, fontSize: 14 }}>
              ← Previous
            </button>
            <button onClick={toggleMark}
              style={{ padding: '0.7rem 1.25rem', borderRadius: 10, border: `1.5px solid ${marked.has(q.id) ? '#f59e0b' : '#e5e7eb'}`, background: marked.has(q.id) ? '#fef3c7' : '#fff', cursor: 'pointer', color: '#92400e', fontWeight: 600, fontSize: 14 }}>
              {marked.has(q.id) ? '★ Marked' : '☆ Mark Review'}
            </button>
            <button onClick={() => setCurrent(c => Math.min(total - 1, c + 1))} disabled={current === total - 1}
              style={{ padding: '0.7rem 1.5rem', borderRadius: 10, border: '1.5px solid #d1d5db', background: '#fff', cursor: current === total - 1 ? 'default' : 'pointer', color: current === total - 1 ? '#9ca3af' : '#111', fontWeight: 600, fontSize: 14 }}>
              Next →
            </button>
          </div>
        </div>

        {/* Palette */}
        <div style={{ width: 210, flexShrink: 0 }}>
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1rem' }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#111', marginBottom: '0.75rem' }}>Question Palette</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 5, marginBottom: '1rem' }}>
              {exam.questions.map((qItem, idx) => {
                const isAns  = !!answers[qItem.id]
                const isMark = marked.has(qItem.id)
                const isCur  = idx === current
                let bg = '#f3f4f6', color = '#374151', border = '1.5px solid #e5e7eb'
                if (isCur)  { bg = '#1a3a6b'; color = '#fff'; border = '1.5px solid #1a3a6b' }
                else if (isMark) { bg = '#fef3c7'; color = '#92400e'; border = '1.5px solid #f59e0b' }
                else if (isAns)  { bg = '#dcfce7'; color = '#166534'; border = '1.5px solid #22c55e' }
                return (
                  <button key={qItem.id} onClick={() => setCurrent(idx)}
                    style={{ width: 32, height: 32, borderRadius: 6, border, background: bg, color, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                    {idx + 1}
                  </button>
                )
              })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11, color: '#6b7280' }}>
              {[{ bg: '#dcfce7', border: '#22c55e', label: 'Answered' }, { bg: '#fef3c7', border: '#f59e0b', label: 'Marked' }, { bg: '#f3f4f6', border: '#e5e7eb', label: 'Not answered' }].map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 14, height: 14, borderRadius: 3, background: s.bg, border: `1px solid ${s.border}`, display: 'inline-block' }} />
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
