'use client'
// app/teacher/class/[classId]/exam/page.tsx

import { useState }  from 'react'
import { useParams } from 'next/navigation'
import Link          from 'next/link'
import { BOARDS }    from '@/lib/constants'

export default function TeacherExamPage() {
  const { classId } = useParams()
  const [form,    setForm]    = useState({ subject: 'Mathematics', board: 'CBSE', medium: 'English', difficulty: 'mixed', totalQ: 20, questionTypes: ['mcq', 'short'] })
  const [result,  setResult]  = useState<{ shareCode: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function generate(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    const res  = await fetch('/api/exam/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, classLevel: classId, schoolId: null }) })
    const data = await res.json()
    setResult(data); setLoading(false)
  }

  if (result) return (
    <main style={{ maxWidth: 500, margin: '4rem auto', padding: '0 1rem', textAlign: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e5e7eb', padding: '2.5rem' }}>
        <div style={{ fontSize: 48, marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111' }}>Exam Created!</h2>
        <p style={{ color: '#6b7280' }}>Share this code with your students:</p>
        <div style={{ fontSize: 42, fontWeight: 900, color: '#1a3a6b', letterSpacing: 6, margin: '1rem 0', fontFamily: 'monospace', background: '#e8eef8', borderRadius: 12, padding: '1rem' }}>
          {result.shareCode}
        </div>
        <p style={{ fontSize: 13, color: '#6b7280' }}>Students join at: msctutor.in/exam/join</p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.5rem' }}>
          <button onClick={() => { navigator.clipboard.writeText(result.shareCode) }} style={{ background: '#f3f4f6', color: '#111', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '0.75rem 1.25rem', fontWeight: 700, cursor: 'pointer' }}>📋 Copy Code</button>
          <button onClick={() => setResult(null)} style={{ background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, padding: '0.75rem 1.25rem', fontWeight: 700, cursor: 'pointer' }}>Create Another</button>
        </div>
      </div>
    </main>
  )

  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1rem' }}>
      <nav style={{ fontSize: 13, color: '#6b7280', marginBottom: '1rem' }}>
        <Link href={`/teacher/class/${classId}`} style={{ color: '#1a3a6b' }}>← Back to Class</Link>
      </nav>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>Create Exam Paper</h1>
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem' }}>
        <form onSubmit={generate}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {[['subject', 'Subject', ['Mathematics','Physics','Chemistry','Biology','Commerce','Economics']], ['board', 'Board', BOARDS], ['medium', 'Medium', ['English','Hindi']], ['difficulty', 'Difficulty', ['easy','medium','hard','mixed']]].map(([key, label, opts]) => (
              <div key={key as string}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>{label as string}</label>
                <select value={form[key as keyof typeof form] as string} onChange={e => setForm(f => ({ ...f, [key as string]: e.target.value }))} style={{ width: '100%', padding: '0.7rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, background: '#fff' }}>
                  {(opts as string[]).map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Number of Questions: {form.totalQ}</label>
            <input type="range" min={10} max={40} step={5} value={form.totalQ} onChange={e => setForm(f => ({ ...f, totalQ: parseInt(e.target.value) }))} style={{ width: '100%' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9ca3af' }}>
              <span>10</span><span>20</span><span>30</span><span>40</span>
            </div>
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Question Types</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['mcq','short','long'].map(t => (
                <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
                  <input type="checkbox" checked={form.questionTypes.includes(t)} onChange={e => setForm(f => ({ ...f, questionTypes: e.target.checked ? [...f.questionTypes, t] : f.questionTypes.filter(x => x !== t) }))} />
                  {t.toUpperCase()}
                </label>
              ))}
            </div>
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.9rem', background: loading ? '#93c5fd' : '#1a3a6b', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            {loading ? '🤖 Generating Paper...' : '🤖 Generate with AI'}
          </button>
        </form>
      </div>
    </main>
  )
}
