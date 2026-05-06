'use client'
// app/school-dashboard/teachers/page.tsx

import { useEffect, useState } from 'react'

interface Teacher { id: number; name: string; email: string; subject?: string; phone?: string; isActive: boolean }

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading,  setLoading]  = useState(true)
  const [form,     setForm]     = useState({ name: '', email: '', subject: '', phone: '' })
  const [adding,   setAdding]   = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetch('/api/school/teacher').then(r => r.json()).then(d => { setTeachers(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  async function addTeacher(e: React.FormEvent) {
    e.preventDefault(); setAdding(true)
    const res = await fetch('/api/school/teacher', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const data = await res.json()
    setTeachers(t => [data, ...t]); setShowForm(false); setForm({ name: '', email: '', subject: '', phone: '' }); setAdding(false)
  }

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: 0 }}>Teachers</h1>
        <button onClick={() => setShowForm(!showForm)} style={{ background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, padding: '0.7rem 1.25rem', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>+ Add Teacher</button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <form onSubmit={addTeacher}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[['name', 'Full Name', 'text'], ['email', 'Email', 'email'], ['subject', 'Subject', 'text'], ['phone', 'Phone', 'tel']].map(([key, label, type]) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>{label}</label>
                  <input type={type} value={form[key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} required={key === 'name' || key === 'email'} style={{ width: '100%', padding: '0.7rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>
            <button type="submit" disabled={adding} style={{ marginTop: '1rem', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>{adding ? 'Adding...' : 'Add Teacher'}</button>
          </form>
        </div>
      )}

      {loading ? <div style={{ color: '#6b7280' }}>Loading teachers...</div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {teachers.map(t => (
            <div key={t.id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#e8eef8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1a3a6b', fontSize: 16, flexShrink: 0 }}>{t.name.charAt(0)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#111' }}>{t.name}</div>
                <div style={{ fontSize: 13, color: '#6b7280' }}>{t.email} {t.subject ? `· ${t.subject}` : ''}</div>
              </div>
              <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: t.isActive ? '#dcfce7' : '#fee2e2', color: t.isActive ? '#166534' : '#dc2626', fontWeight: 600 }}>{t.isActive ? 'Active' : 'Inactive'}</span>
            </div>
          ))}
          {teachers.length === 0 && <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>No teachers added yet.</div>}
        </div>
      )}
    </main>
  )
}
