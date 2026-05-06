'use client'
// app/mock-test/start/[testId]/page.tsx — Live exam interface

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useParams }             from 'next/navigation'

interface Question {
  id: number; order: number; type: string; questionText: string
  options?: string[]; correctAnswer: string; explanation: string; marks: number; chapter: string
}
interface ExamData {
  id: number; title: string; duration: number; totalMarks: number
  questions: Question[]
}

export default function ExamStartPage() {
  const params  = useParams()
  const router  = useRouter()
  const testId  = params.testId as string

  const [exam,      setExam]      = useState<ExamData | null>(null)
  const [answers,   setAnswers]   = useState<Record<number, string>>({})
  const [marked,    setMarked]    = useState<Set<number>>(new Set())
  const [current,   setCurrent]   = useState(0)
  const [timeLeft,  setTimeLeft]  = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(true)

  const submitExam = useCallback(async (finalAnswers: Record<number, string>) => {
    if (!exam || submitted) return
    setSubmitted(true)
    try {
      const res = await fetch('/api/exam/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ examId: exam.id, answers: finalAnswers }),
      })
      const data = await res.json()
      if (data.attemptId) router.push(`/mock-test/result/${data.attemptId}`)
    } catch { router.push('/mock-test') }
  }, [exam, submitted, router])

  useEffect(() => {
    fetch(`/api/exam/generate?id=${testId}`)
      .then(r => r.json())
      .then(data => { setExam(data); setTimeLeft(data.duration * 60); setLoading(false) })
      .catch(() => setLoading(false))
  }, [testId])

  useEffect(() => {
    if (!exam || submitted) return
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timer); submitExam(answers); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [exam, submitted, answers, submitExam])

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: 18, color: '#6b7280' }}>Loading exam...</div>
  if (!exam)   return <div style={{ textAlign: 'center', padding: '4rem', color: '#dc2626' }}>Exam not found. <a href="/mock-test">Go back</a></div>

  const q        = exam.questions[current]
  const mins     = Math.floor(timeLeft / 60).toString().padStart(2, '0')
  const secs     = (timeLeft % 60).toString().padStart(2, '0')
  const isRed    = timeLeft < 300
  const answered = Object.keys(answers).length

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Top bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: '#1a3a6b', color: '#fff', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{exam.title}</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>{answered}/{exam.questions.length} answered</div>
        </div>
        <div style={{ background: isRed ? '#dc2626' : '#fff2', padding: '0.5rem 1.25rem', borderRadius: 8, fontWeight: 800, fontSize: 20, fontFamily: 'monospace', letterSpacing: 2 }}>
          {mins}:{secs}
        </div>
        <button onClick={() => submitExam(answers)} style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, padding: '0.6rem 1.25rem', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
          Submit Exam
        </button>
      </div>

      <div style={{ display: 'flex', maxWidth: 1100, margin: '0 auto', padding: '1.5rem 1rem', gap: '1.5rem' }}>
        {/* Question */}
        <div style={{ flex: 1 }}>
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1.75rem' }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: '1rem' }}>
              <span style={{ background: '#e8eef8', color: '#1a3a6b', fontWeight: 700, fontSize: 13, padding: '3px 10px', borderRadius: 6 }}>Q{current + 1}</span>
              <span style={{ background: '#f3f4f6', color: '#6b7280', fontSize: 12, padding: '3px 10px', borderRadius: 6 }}>{q.marks} marks</span>
              <span style={{ background: '#f3f4f6', color: '#6b7280', fontSize: 12, padding: '3px 10px', borderRadius: 6 }}>{q.chapter}</span>
            </div>
            <p style={{ fontSize: 17, color: '#111', lineHeight: 1.7, marginBottom: '1.5rem' }}>{q.questionText}</p>

            {q.type === 'mcq' && q.options ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {q.options.map(opt => {
                  const selected = answers[q.id] === opt
                  return (
                    <button key={opt} onClick={() => setAnswers(a => ({ ...a, [q.id]: opt }))}
                      style={{ textAlign: 'left', padding: '0.85rem 1.25rem', borderRadius: 10, border: selected ? '2px solid #1a3a6b' : '1.5px solid #e5e7eb', background: selected ? '#e8eef8' : '#fff', cursor: 'pointer', fontSize: 15, fontWeight: selected ? 600 : 400, color: selected ? '#1a3a6b' : '#374151', transition: 'all 0.1s' }}>
                      {opt}
                    </button>
                  )
                })}
              </div>
            ) : (
              <textarea
                rows={4}
                value={answers[q.id] ?? ''}
                onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
                placeholder="Type your answer here..."
                style={{ width: '100%', padding: '0.85rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 15, resize: 'vertical', boxSizing: 'border-box' }}
              />
            )}
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
            <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
              style={{ padding: '0.75rem 1.5rem', borderRadius: 10, border: '1.5px solid #d1d5db', background: '#fff', cursor: current === 0 ? 'default' : 'pointer', color: current === 0 ? '#9ca3af' : '#111', fontWeight: 600 }}>
              ← Previous
            </button>
            <button onClick={() => setMarked(m => { const n = new Set(m); n.has(q.id) ? n.delete(q.id) : n.add(q.id); return n })}
              style={{ padding: '0.75rem 1.5rem', borderRadius: 10, border: '1.5px solid #f59e0b', background: marked.has(q.id) ? '#fef3c7' : '#fff', cursor: 'pointer', color: '#92400e', fontWeight: 600 }}>
              {marked.has(q.id) ? '★ Marked' : '☆ Mark Review'}
            </button>
            <button onClick={() => setCurrent(c => Math.min(exam.questions.length - 1, c + 1))} disabled={current === exam.questions.length - 1}
              style={{ padding: '0.75rem 1.5rem', borderRadius: 10, border: '1.5px solid #d1d5db', background: '#fff', cursor: current === exam.questions.length - 1 ? 'default' : 'pointer', color: current === exam.questions.length - 1 ? '#9ca3af' : '#111', fontWeight: 600 }}>
              Next →
            </button>
          </div>
        </div>

        {/* Question palette */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1rem' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#111', marginBottom: '0.75rem' }}>Question Palette</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
              {exam.questions.map((qItem, idx) => {
                const isAnswered = !!answers[qItem.id]
                const isMarked   = marked.has(qItem.id)
                const isCurrent  = idx === current
                let bg = '#f3f4f6', color = '#374151', border = '1.5px solid #e5e7eb'
                if (isCurrent) { bg = '#1a3a6b'; color = '#fff'; border = '1.5px solid #1a3a6b' }
                else if (isMarked) { bg = '#fef3c7'; color = '#92400e'; border = '1.5px solid #f59e0b' }
                else if (isAnswered) { bg = '#dcfce7'; color = '#166534'; border = '1.5px solid #22c55e' }
                return (
                  <button key={qItem.id} onClick={() => setCurrent(idx)}
                    style={{ width: 32, height: 32, borderRadius: 6, border, background: bg, color, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                    {idx + 1}
                  </button>
                )
              })}
            </div>
            <div style={{ marginTop: '1rem', fontSize: 11, color: '#6b7280', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div><span style={{ display: 'inline-block', width: 12, height: 12, background: '#dcfce7', border: '1px solid #22c55e', borderRadius: 2, marginRight: 6 }} />Answered</div>
              <div><span style={{ display: 'inline-block', width: 12, height: 12, background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: 2, marginRight: 6 }} />Marked</div>
              <div><span style={{ display: 'inline-block', width: 12, height: 12, background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 2, marginRight: 6 }} />Not Answered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
