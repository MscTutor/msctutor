'use client'
// components/exam/MockTestSetup.tsx — Config form for mock test

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BOARDS }    from '@/lib/constants'

const SUBJECTS  = ['Mathematics','Physics','Chemistry','Biology','Commerce','Economics','Accountancy','English','Hindi','Computer Science']
const CLASSES   = ['6','7','8','9','10','11','12']
const Q_COUNTS  = [10, 20, 30, 40]
const DIFF_OPTS = [{ val: 'easy', label: '😊 Easy' }, { val: 'medium', label: '🎯 Medium' }, { val: 'hard', label: '🔥 Hard' }, { val: 'mixed', label: '🌀 Mixed' }]

export default function MockTestSetup() {
  const router  = useRouter()
  const [form,  setForm]  = useState({ classLevel: '10', subject: 'Mathematics', board: 'CBSE', medium: 'English', difficulty: 'mixed', totalQ: 20, questionTypes: ['mcq', 'short'] })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  function toggleType(t: string) {
    setForm(f => ({ ...f, questionTypes: f.questionTypes.includes(t) ? f.questionTypes.filter(x => x !== t) : [...f.questionTypes, t] }))
  }

  async function generate(e: React.FormEvent) {
    e.preventDefault()
    if (!form.questionTypes.length) { setError('Select at least one question type'); return }
    setLoading(true); setError('')
    try {
      const res  = await fetch('/api/exam/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, title: `${form.subject} Class ${form.classLevel} — ${form.board}` }) })
      const data = await res.json()
      if (data.exam?.id) router.push(`/mock-test/start/${data.exam.id}`)
      else setError(data.error ?? 'Failed to generate exam')
    } catch { setError('Network error. Please try again.') }
    setLoading(false)
  }

  return (
    <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e5e7eb', padding: '2rem', maxWidth: 640, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <div style={{ fontSize: 48, marginBottom: '0.5rem' }}>📝</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111', margin: 0 }}>Generate Mock Test</h2>
        <p style={{ color: '#6b7280', fontSize: 14, marginTop: 6 }}>AI creates authentic exam questions based on your board & class</p>
      </div>

      {error && <div style={{ background: '#fee2e2', color: '#dc2626', borderRadius: 10, padding: '0.75rem 1rem', fontSize: 14, marginBottom: '1rem' }}>{error}</div>}

      <form onSubmit={generate}>
        {/* Board + Class */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>Board</label>
            <select value={form.board} onChange={e => setForm(f => ({ ...f, board: e.target.value }))}
              style={{ width: '100%', padding: '0.75rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, background: '#fff' }}>
              {BOARDS.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>Class</label>
            <select value={form.classLevel} onChange={e => setForm(f => ({ ...f, classLevel: e.target.value }))}
              style={{ width: '100%', padding: '0.75rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, background: '#fff' }}>
              {CLASSES.map(c => <option key={c} value={c}>Class {c}</option>)}
            </select>
          </div>
        </div>

        {/* Subject + Medium */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>Subject</label>
            <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
              style={{ width: '100%', padding: '0.75rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, background: '#fff' }}>
              {SUBJECTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>Medium</label>
            <select value={form.medium} onChange={e => setForm(f => ({ ...f, medium: e.target.value }))}
              style={{ width: '100%', padding: '0.75rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, background: '#fff' }}>
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
        </div>

        {/* Difficulty */}
        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }}>Difficulty</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {DIFF_OPTS.map(d => (
              <button key={d.val} type="button" onClick={() => setForm(f => ({ ...f, difficulty: d.val }))}
                style={{ flex: 1, padding: '0.6rem', borderRadius: 10, border: form.difficulty === d.val ? '2px solid #1a3a6b' : '1.5px solid #e5e7eb', background: form.difficulty === d.val ? '#e8eef8' : '#fff', color: form.difficulty === d.val ? '#1a3a6b' : '#374151', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question count */}
        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
            Questions: <span style={{ color: '#1a3a6b' }}>{form.totalQ}</span>
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {Q_COUNTS.map(n => (
              <button key={n} type="button" onClick={() => setForm(f => ({ ...f, totalQ: n }))}
                style={{ flex: 1, padding: '0.6rem', borderRadius: 10, border: form.totalQ === n ? '2px solid #1a3a6b' : '1.5px solid #e5e7eb', background: form.totalQ === n ? '#e8eef8' : '#fff', color: form.totalQ === n ? '#1a3a6b' : '#374151', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Question types */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }}>Question Types</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[['mcq','MCQ'],['short','Short'],['long','Long']].map(([val, label]) => (
              <button key={val} type="button" onClick={() => toggleType(val)}
                style={{ flex: 1, padding: '0.6rem', borderRadius: 10, border: form.questionTypes.includes(val) ? '2px solid #0a5e3f' : '1.5px solid #e5e7eb', background: form.questionTypes.includes(val) ? '#e8f5ef' : '#fff', color: form.questionTypes.includes(val) ? '#0a5e3f' : '#374151', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                {form.questionTypes.includes(val) ? '✓ ' : ''}{label}
              </button>
            ))}
          </div>
        </div>

        {/* Duration info */}
        <div style={{ background: '#f9fafb', borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#6b7280' }}>
          <span>Estimated duration</span>
          <span style={{ fontWeight: 700, color: '#111' }}>{Math.ceil(form.totalQ * 2.5)} minutes</span>
        </div>

        <button type="submit" disabled={loading}
          style={{ width: '100%', padding: '1rem', background: loading ? '#93c5fd' : '#1a3a6b', color: '#fff', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 800, cursor: loading ? 'default' : 'pointer', letterSpacing: 0.3 }}>
          {loading ? '🤖 AI is generating your exam...' : '🚀 Generate & Start Exam'}
        </button>
      </form>
    </div>
  )
}
