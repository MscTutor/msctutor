'use client'
// components/exam/CreateExam.tsx — Teacher paper creator

import { useState } from 'react'
import { BOARDS }   from '@/lib/constants'

const SUBJECTS = ['Mathematics','Physics','Chemistry','Biology','Commerce','Economics','Accountancy','English','Computer Science']

interface Props { classId?: string; schoolId?: number; onCreated: (shareCode: string, examId: number) => void }

export default function CreateExam({ classId, schoolId, onCreated }: Props) {
  const [form,    setForm]    = useState({ subject: 'Mathematics', board: 'CBSE', medium: 'English', difficulty: 'mixed', totalQ: 20, questionTypes: ['mcq','short'], classLevel: classId ?? '10' })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  function toggle(t: string) { setForm(f => ({ ...f, questionTypes: f.questionTypes.includes(t) ? f.questionTypes.filter(x => x !== t) : [...f.questionTypes, t] })) }

  async function generate(e: React.FormEvent) {
    e.preventDefault()
    if (!form.questionTypes.length) { setError('Select at least one question type'); return }
    setLoading(true); setError('')
    try {
      const res  = await fetch('/api/exam/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, schoolId }) })
      const data = await res.json()
      if (data.shareCode) onCreated(data.shareCode, data.exam.id)
      else setError(data.error ?? 'Failed')
    } catch { setError('Network error') }
    setLoading(false)
  }

  return (
    <form onSubmit={generate}>
      {error && <div style={{ background: '#fee2e2', color: '#dc2626', borderRadius: 10, padding: '0.75rem', fontSize: 14, marginBottom: '1rem' }}>{error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
        {[['subject','Subject',SUBJECTS],['board','Board',BOARDS],['classLevel','Class',['6','7','8','9','10','11','12']],['medium','Medium',['English','Hindi']]].map(([key,label,opts]) => (
          <div key={key as string}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 }}>{label as string}</label>
            <select value={form[key as keyof typeof form] as string} onChange={e => setForm(f => ({ ...f, [key as string]: e.target.value }))} style={{ width: '100%', padding: '0.65rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, background: '#fff' }}>
              {(opts as string[]).map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
        {[10,20,30,40].map(n => (
          <button key={n} type="button" onClick={() => setForm(f => ({ ...f, totalQ: n }))}
            style={{ flex:1, padding:'0.6rem', borderRadius:10, border: form.totalQ===n?'2px solid #1a3a6b':'1.5px solid #e5e7eb', background: form.totalQ===n?'#e8eef8':'#fff', color: form.totalQ===n?'#1a3a6b':'#374151', fontWeight:700, cursor:'pointer', fontSize:14 }}>
            {n}Q
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {[['mcq','MCQ'],['short','Short'],['long','Long']].map(([val,label]) => (
          <button key={val} type="button" onClick={() => toggle(val)}
            style={{ flex:1, padding:'0.6rem', borderRadius:10, border: form.questionTypes.includes(val)?'2px solid #0a5e3f':'1.5px solid #e5e7eb', background: form.questionTypes.includes(val)?'#e8f5ef':'#fff', color: form.questionTypes.includes(val)?'#0a5e3f':'#374151', fontWeight:700, cursor:'pointer', fontSize:14 }}>
            {form.questionTypes.includes(val)?'✓ ':''}{label}
          </button>
        ))}
      </div>

      <button type="submit" disabled={loading}
        style={{ width:'100%', padding:'0.9rem', background: loading?'#93c5fd':'#1a3a6b', color:'#fff', border:'none', borderRadius:12, fontSize:15, fontWeight:700, cursor: loading?'default':'pointer' }}>
        {loading ? '🤖 Generating...' : '🤖 Generate Exam Paper'}
      </button>
    </form>
  )
}
