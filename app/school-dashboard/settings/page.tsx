'use client'
// app/school-dashboard/settings/page.tsx
import { useState } from 'react'
import { BOARDS }   from '@/lib/constants'

export default function SchoolSettingsPage() {
  const [form,  setForm]  = useState({ name: '', board: 'CBSE', medium: 'English', city: '', state: '', pincode: '' })
  const [saved, setSaved] = useState(false)

  function handleSave(e: React.FormEvent) {
    e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>School Settings</h1>
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem' }}>
        <form onSubmit={handleSave}>
          {saved && <div style={{ background: '#dcfce7', color: '#166534', borderRadius: 8, padding: '0.75rem', fontSize: 14, fontWeight: 600, marginBottom: '1rem' }}>✓ Settings saved!</div>}
          {[['name', 'School Name', 'text'], ['city', 'City', 'text'], ['state', 'State', 'text'], ['pincode', 'Pincode', 'text']].map(([key, label, type]) => (
            <div key={key} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>{label}</label>
              <input type={type} value={form[key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Board</label>
              <select value={form.board} onChange={e => setForm(f => ({ ...f, board: e.target.value }))} style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, background: '#fff' }}>
                {BOARDS.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Medium</label>
              <select value={form.medium} onChange={e => setForm(f => ({ ...f, medium: e.target.value }))} style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, background: '#fff' }}>
                {['English', 'Hindi', 'Both'].map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" style={{ width: '100%', padding: '0.85rem', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Save Settings</button>
        </form>
      </div>
    </main>
  )
}
