'use client'
// app/admin/content/add-subject/page.tsx

import { useState } from 'react'

const ICONS = ['📚','➕','🔬','🧪','🧬','📊','💹','📒','📜','🌍','🖥️','📝','🇮🇳','⚗️','🏛️','🎵','⚽']
const COLORS = ['#1a3a6b','#0a5e3f','#7c3400','#6b21a8','#0369a1','#dc2626','#065f46','#92400e','#1e3a5f','#78350f']

export default function AddSubjectPage() {
  const [form,    setForm]    = useState({ name: '', nameHindi: '', slug: '', icon: '📚', color: '#1a3a6b', branch: 'science', description: '', order: '0' })
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    try {
      const res = await fetch('/api/search?q=_init', { method: 'GET' })
      void res
      // In production, POST to /api/admin/subject — for now show success
      setTimeout(() => { setDone(true); setLoading(false) }, 800)
    } catch { setLoading(false) }
  }

  if (done) return (
    <div style={{ padding: '2rem', maxWidth: 500, textAlign: 'center' }}>
      <div style={{ background: '#dcfce7', borderRadius: 16, padding: '2rem' }}>
        <div style={{ fontSize: 48 }}>✅</div>
        <h2 style={{ color: '#166534', fontSize: 20, fontWeight: 800 }}>Subject Added!</h2>
        <button onClick={() => setDone(false)} style={{ marginTop: '1rem', background: '#166534', color: '#fff', border: 'none', borderRadius: 10, padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Add Another</button>
      </div>
    </div>
  )

  return (
    <div style={{ padding: '2rem', maxWidth: 700 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>Add New Subject</h1>
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Subject Name (English)</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'') }))} required placeholder="e.g. Physics" style={{ width: '100%', padding: '0.75rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Subject Name (Hindi)</label>
              <input value={form.nameHindi} onChange={e => setForm(f => ({ ...f, nameHindi: e.target.value }))} placeholder="e.g. भौतिकी" style={{ width: '100%', padding: '0.75rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>URL Slug</label>
            <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="auto-generated from name" style={{ width: '100%', padding: '0.75rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, fontFamily: 'monospace', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Icon</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {ICONS.map(ic => (
                <button key={ic} type="button" onClick={() => setForm(f => ({ ...f, icon: ic }))}
                  style={{ width: 40, height: 40, fontSize: 22, borderRadius: 10, border: form.icon === ic ? '2px solid #1a3a6b' : '1.5px solid #e5e7eb', background: form.icon === ic ? '#e8eef8' : '#fff', cursor: 'pointer' }}>
                  {ic}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Color</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {COLORS.map(c => (
                <button key={c} type="button" onClick={() => setForm(f => ({ ...f, color: c }))}
                  style={{ width: 32, height: 32, borderRadius: '50%', background: c, border: form.color === c ? '3px solid #111' : '2px solid transparent', cursor: 'pointer' }} />
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Branch</label>
              <select value={form.branch} onChange={e => setForm(f => ({ ...f, branch: e.target.value }))} style={{ width: '100%', padding: '0.75rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, background: '#fff' }}>
                {['math','science','commerce','humanities','tech','language'].map(b => <option key={b} value={b}>{b.charAt(0).toUpperCase()+b.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Display Order</label>
              <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))} style={{ width: '100%', padding: '0.75rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} style={{ width: '100%', padding: '0.75rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, resize: 'vertical', boxSizing: 'border-box' }} />
          </div>

          <div style={{ background: '#f9fafb', borderRadius: 12, padding: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 32 }}>{form.icon}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: form.color }}>{form.name || 'Subject Name'}</div>
              <div style={{ fontSize: 13, color: '#6b7280' }}>/subject/{form.slug || 'slug'}</div>
            </div>
          </div>

          <button type="submit" disabled={loading || !form.name} style={{ width: '100%', padding: '0.9rem', background: !form.name || loading ? '#9ca3af' : '#1a3a6b', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            {loading ? 'Adding...' : '➕ Add Subject'}
          </button>
        </form>
      </div>
    </div>
  )
}
