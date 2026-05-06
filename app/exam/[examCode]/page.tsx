'use client'
// app/exam/[examCode]/page.tsx — Take shared exam by code

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Question {
  id: number; order: number; type: string; questionText: string
  options?: string[]; correctAnswer: string; marks: number; chapter: string
}
interface ExamData { id: number; title: string; duration: number; totalMarks: number; totalQ: number; questions: Question[] }

export default function ExamByCodePage() {
  const params  = useParams()
  const router  = useRouter()
  const code    = params.examCode as string

  const [exam,    setExam]    = useState<ExamData | null>(null)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [current, setCurrent] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')
  const [started, setStarted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch(`/api/exam/generate?code=${code}`)
      .then(r => r.json())
      .then(d => { if (d.id) { setExam(d); setTimeLeft(d.duration * 60) } else setError('Invalid exam code') })
      .catch(() => setError('Could not load exam'))
      .finally(() => setLoading(false))
  }, [code])

  useEffect(() => {
    if (!started || !exam) return
    const t = setInterval(() => setTimeLeft(s => { if (s <= 1) { clearInterval(t); handleSubmit(); return 0 } return s - 1 }), 1000)
    return () => clearInterval(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, exam])

  async function handleSubmit() {
    if (!exam || submitting) return
    setSubmitting(true)
    const res  = await fetch('/api/exam/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ examId: exam.id, answers }) })
    const data = await res.json()
    if (data.attemptId) router.push(`/mock-test/result/${data.attemptId}`)
  }

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh', color: '#6b7280', fontSize: 18 }}>Loading exam...</div>
  if (error)   return <div style={{ textAlign: 'center', padding: '4rem', color: '#dc2626' }}>{error}<br /><a href="/exam/join" style={{ color: '#1a3a6b', marginTop: '1rem', display: 'inline-block' }}>Try again</a></div>
  if (!exam)   return null

  if (!started) {
    return (
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ maxWidth: 500, background: '#fff', borderRadius: 20, border: '1px solid #e5e7eb', padding: '2.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: '1rem' }}>📋</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111' }}>{exam.title}</h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', margin: '1.5rem 0', textAlign: 'center' }}>
            {[{ label: 'Questions', val: exam.totalQ }, { label: 'Total Marks', val: exam.totalMarks }, { label: 'Duration', val: `${exam.duration} min` }].map(s => (
              <div key={s.label} style={{ background: '#f9fafb', borderRadius: 10, padding: '0.75rem' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#1a3a6b' }}>{s.val}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <p style={{ color: '#6b7280', fontSize: 14, marginBottom: '1.5rem' }}>Once started, timer cannot be paused. Complete all questions before time runs out.</p>
          <button onClick={() => setStarted(true)} style={{ width: '100%', padding: '1rem', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Start Exam →
          </button>
        </div>
      </main>
    )
  }

  const q    = exam.questions[current]
  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0')
  const secs = (timeLeft % 60).toString().padStart(2, '0')

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: '#1a3a6b', color: '#fff', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 700 }}>{exam.title}</div>
        <div style={{ fontWeight: 800, fontSize: 20, fontFamily: 'monospace', background: timeLeft < 300 ? '#dc2626' : '#ffffff22', padding: '0.4rem 1rem', borderRadius: 8 }}>{mins}:{secs}</div>
        <button onClick={handleSubmit} disabled={submitting} style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, padding: '0.6rem 1.25rem', fontWeight: 700, cursor: 'pointer' }}>{submitting ? 'Submitting...' : 'Submit'}</button>
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '1.5rem 1rem' }}>
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '2rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: '1rem' }}>Question {current + 1} of {exam.questions.length} · {q.marks} marks</div>
          <p style={{ fontSize: 16, color: '#111', lineHeight: 1.7, marginBottom: '1.5rem' }}>{q.questionText}</p>
          {q.type === 'mcq' && q.options ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {q.options.map(opt => (
                <button key={opt} onClick={() => setAnswers(a => ({ ...a, [q.id]: opt }))}
                  style={{ textAlign: 'left', padding: '0.8rem 1rem', borderRadius: 10, border: answers[q.id] === opt ? '2px solid #1a3a6b' : '1.5px solid #e5e7eb', background: answers[q.id] === opt ? '#e8eef8' : '#fff', cursor: 'pointer', fontSize: 15, color: answers[q.id] === opt ? '#1a3a6b' : '#374151', fontWeight: answers[q.id] === opt ? 600 : 400 }}>
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <textarea rows={4} value={answers[q.id] ?? ''} onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))} placeholder="Write your answer..." style={{ width: '100%', padding: '0.85rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 15, boxSizing: 'border-box' }} />
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0} style={{ padding: '0.75rem 1.5rem', borderRadius: 10, border: '1.5px solid #d1d5db', background: '#fff', cursor: 'pointer', fontWeight: 600 }}>← Prev</button>
          <button onClick={() => setCurrent(c => Math.min(exam.questions.length - 1, c + 1))} disabled={current === exam.questions.length - 1} style={{ padding: '0.75rem 1.5rem', borderRadius: 10, border: '1.5px solid #d1d5db', background: '#fff', cursor: 'pointer', fontWeight: 600 }}>Next →</button>
        </div>
      </div>
    </div>
  )
}
