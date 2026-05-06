'use client'
// app/mock-test/result/[testId]/page.tsx — Result + Analysis

import { useEffect, useState } from 'react'
import { useParams }           from 'next/navigation'
import Link                    from 'next/link'

interface Result {
  id: number; score: number; totalMarks: number; percentage: number
  timeTaken: number; exam: { title: string; questions: Question[] }
  answers: Record<number, string>
  analysis: Record<string, { correct: number; total: number }> | null
}
interface Question {
  id: number; order: number; questionText: string; correctAnswer: string
  explanation: string; marks: number; chapter: string; options?: string[]
}

function grade(pct: number) {
  if (pct >= 90) return { label: 'A+', color: '#16a34a' }
  if (pct >= 80) return { label: 'A',  color: '#22c55e' }
  if (pct >= 70) return { label: 'B',  color: '#84cc16' }
  if (pct >= 60) return { label: 'C',  color: '#f59e0b' }
  if (pct >= 40) return { label: 'D',  color: '#f97316' }
  return              { label: 'F',  color: '#ef4444' }
}

export default function ResultPage() {
  const params  = useParams()
  const [result, setResult] = useState<Result | null>(null)
  const [show,   setShow]   = useState(false)

  useEffect(() => {
    fetch(`/api/exam/result/${params.testId}`)
      .then(r => r.json())
      .then(setResult)
  }, [params.testId])

  if (!result) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: 18, color: '#6b7280' }}>Loading result...</div>

  const pct   = Math.round(result.percentage)
  const g     = grade(pct)
  const mins  = Math.floor(result.timeTaken / 60)
  const secs  = result.timeTaken % 60

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Score card */}
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e5e7eb', padding: '2.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111', marginBottom: '1.5rem' }}>{result.exam.title}</h1>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 120, height: 120, borderRadius: '50%', border: `6px solid ${g.color}`, marginBottom: '1rem' }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, color: g.color }}>{g.label}</div>
            <div style={{ fontSize: 14, color: '#6b7280' }}>{pct}%</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: 500, margin: '1.5rem auto 0' }}>
          {[
            { label: 'Score',      value: `${result.score}/${result.totalMarks}` },
            { label: 'Percentage', value: `${pct}%` },
            { label: 'Time Taken', value: `${mins}m ${secs}s` },
          ].map(s => (
            <div key={s.label} style={{ background: '#f9fafb', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#111' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <Link href="/mock-test" style={{ padding: '0.75rem 1.5rem', background: '#1a3a6b', color: '#fff', borderRadius: 10, textDecoration: 'none', fontWeight: 700 }}>Take Another</Link>
          <button onClick={() => setShow(!show)} style={{ padding: '0.75rem 1.5rem', background: '#f3f4f6', color: '#111', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>
            {show ? 'Hide' : 'Review'} Answers
          </button>
        </div>
      </div>

      {/* Topic analysis */}
      {result.analysis && (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: '1rem' }}>Topic Analysis</h2>
          {Object.entries(result.analysis).map(([chapter, data]) => {
            const p = Math.round((data.correct / data.total) * 100)
            return (
              <div key={chapter} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 14, color: '#374151' }}>{chapter}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: p >= 60 ? '#16a34a' : '#ef4444' }}>{data.correct}/{data.total}</span>
                </div>
                <div style={{ height: 8, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${p}%`, background: p >= 60 ? '#22c55e' : '#ef4444', borderRadius: 4, transition: 'width 0.5s' }} />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Answer review */}
      {show && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111' }}>Answer Review</h2>
          {result.exam.questions.map((q, i) => {
            const userAns   = result.answers[q.id]
            const isCorrect = userAns === q.correctAnswer
            return (
              <div key={q.id} style={{ background: '#fff', border: `1.5px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`, borderRadius: 14, padding: '1.25rem' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 700, color: '#6b7280', fontSize: 13 }}>Q{i + 1}.</span>
                  <span style={{ background: isCorrect ? '#dcfce7' : '#fee2e2', color: isCorrect ? '#166534' : '#dc2626', fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: 6 }}>
                    {isCorrect ? '✓ Correct' : '✗ Wrong'}
                  </span>
                </div>
                <p style={{ fontSize: 15, color: '#111', margin: '0 0 0.75rem' }}>{q.questionText}</p>
                {userAns && <div style={{ fontSize: 13, color: '#dc2626' }}>Your answer: {userAns}</div>}
                <div style={{ fontSize: 13, color: '#16a34a', marginTop: 4 }}>Correct: {q.correctAnswer}</div>
                {q.explanation && <div style={{ fontSize: 13, color: '#6b7280', marginTop: 8, padding: '0.5rem 0.75rem', background: '#f9fafb', borderRadius: 8 }}>💡 {q.explanation}</div>}
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
