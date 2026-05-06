'use client'
// app/admin/content/add-question/page.tsx

import { useState } from 'react'
import { BOARDS, SUBJECTS } from '@/lib/constants'

export default function AddQuestionPage() {
  const [form,    setForm]    = useState({ title: '', solution: '', subject: 'mathematics', classLevel: '9', board: 'CBSE', difficulty: 'medium', formula: '' })
  const [result,  setResult]  = useState<{ slug: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    const res  = await fetch('/api/question/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const data = await res.json()
    if (data.slug) setResult(data)
    setLoading(false)
  }

  if (result) return (
    <div style={{ padding: '2rem', maxWidth: 600, textAlign: 'center' }}>
      <div style={{ background: '#dcfce7', borderRadius: 16, border: '1.5px solid #bbf7d0', padding: '2rem' }}>
        <div style={{ fontSize: 48 }}>✅</div>
        <h2 style={{ color: '#166534', fontSize: 20, fontWeight: 800, marginTop: '0.5rem' }}>Question Created!</h2>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1rem' }}>
          <a href={`/question/${result.slug}`} target="_blank" style={{ background: '#166534', color: '#fff', padding: '0.75rem 1.25rem', borderRadius: 10, fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>View Page →</a>
          <button onClick={() => setResult(null)} style={{ background: '#fff', color: '#166534', border: '1.5px solid #bbf7d0', padding: '0.75rem 1.25rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Add Another</button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ padding: '2rem', maxWidth: 800 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>Add Question</h1>
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Question</label>
            <textarea value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required rows={3} placeholder="Enter the full question text..."
              style={{ width: '100%', padding: '0.85rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 12, fontSize: 15, resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Solution / Answer</label>
            <textarea value={form.solution} onChange={e => setForm(f => ({ ...f, solution: e.target.value }))} required rows={6} placeholder="Step-by-step solution..."
              style={{ width: '100%', padding: '0.85rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 12, fontSize: 15, resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            {[['subject','Subject',SUBJECTS.map(s=>s.name)],['board','Board',BOARDS],['classLevel','Class',['6','7','8','9','10','11','12']],['difficulty','Difficulty',['easy','medium','hard']]].map(([key,label,opts]) => (
              <div key={key as string}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 }}>{label as string}</label>
                <select value={form[key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [key as string]: e.target.value }))} style={{ width: '100%', padding: '0.65rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, background: '#fff' }}>
                  {(opts as string[]).map(o => <option key={o} value={o.toLowerCase()}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Formula (optional)</label>
            <input value={form.formula} onChange={e => setForm(f => ({ ...f, formula: e.target.value }))} placeholder="e.g. F = ma"
              style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, fontFamily: 'monospace', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.9rem', background: loading ? '#93c5fd' : '#1a3a6b', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            {loading ? 'Creating...' : '💾 Create Question Page'}
          </button>
        </form>
      </div>
    </div>
  )
}
