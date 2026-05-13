// app/school-dashboard/classes/page.tsx
'use client'
import { useEffect, useState } from 'react'

interface SchoolClass { id: number; name: string; classLevel: string; section: string; students: { id: number }[]; teachers: { id: number }[] }
export default function ClassesPage() {
  const [classes, setClasses] = useState<SchoolClass[]>([])
  const [form, setForm] = useState({ classLevel: '9', section: 'A' })
  const [showForm, setShowForm] = useState(false)
  useEffect(() => { fetch('/api/school/teacher?classes=1').then(r => r.json()).then(d => setClasses(d.classes ?? [])).catch(() => {}) }, [])
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: 0 }}>Classes</h1>
        <button onClick={() => setShowForm(!showForm)} style={{ background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, padding: '0.7rem 1.25rem', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>+ Create Class</button>
      </div>
      {showForm && (
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1.25rem', marginBottom: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Class</label>
            <select value={form.classLevel} onChange={e => setForm(f => ({ ...f, classLevel: e.target.value }))} style={{ padding: '0.65rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14 }}>
              {['6','7','8','9','10','11','12'].map(c => <option key={c}>{c}</option>)}
            </select></div>
          <div><label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Section</label>
            <select value={form.section} onChange={e => setForm(f => ({ ...f, section: e.target.value }))} style={{ padding: '0.65rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14 }}>
              {['A','B','C','D'].map(s => <option key={s}>{s}</option>)}
            </select></div>
          <button style={{ background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Create</button>
        </div>
      )}
      {classes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>No classes created yet.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {classes.map(c => (
            <div key={c.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#1a3a6b' }}>Class {c.classLevel}-{c.section}</div>
              <div style={{ fontSize: 13, color: '#6b7280', marginTop: 8 }}>{c.students?.length ?? 0} students · {c.teachers?.length ?? 0} teachers</div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
