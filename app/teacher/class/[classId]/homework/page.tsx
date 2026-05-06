'use client'
// app/teacher/class/[classId]/homework/page.tsx

import { useEffect, useState } from 'react'
import { useParams }           from 'next/navigation'
import Link                    from 'next/link'

interface Homework { id: number; title: string; subject: string; dueDate: string; submissions: { id: number }[] }

export default function TeacherHomeworkPage() {
  const { classId }  = useParams()
  const [homeworks,  setHomeworks]  = useState<Homework[]>([])
  const [form,       setForm]       = useState({ title: '', description: '', subject: '', dueDate: '' })
  const [showForm,   setShowForm]   = useState(false)
  const [saving,     setSaving]     = useState(false)

  useEffect(() => {
    fetch(`/api/school/homework?classId=${classId}`).then(r => r.json()).then(d => setHomeworks(d)).catch(() => {})
  }, [classId])

  async function createHW(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    const res  = await fetch('/api/school/homework', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, classId: parseInt(classId as string) }) })
    const data = await res.json()
    setHomeworks(h => [data, ...h]); setShowForm(false); setSaving(false)
  }

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <nav style={{ fontSize: 13, color: '#6b7280', marginBottom: '1rem' }}>
        <Link href={`/teacher/class/${classId}`} style={{ color: '#1a3a6b' }}>← Back to Class</Link>
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111', margin: 0 }}>Homework</h1>
        <button onClick={() => setShowForm(!showForm)} style={{ background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, padding: '0.7rem 1.25rem', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>+ Assign</button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <form onSubmit={createHW}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Homework title" required style={{ padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14 }} />
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description / instructions..." rows={3} style={{ padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, resize: 'vertical' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Subject" required style={{ padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14 }} />
                <input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} required style={{ padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14 }} />
              </div>
              <button type="submit" disabled={saving} style={{ background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, padding: '0.75rem', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                {saving ? 'Assigning...' : 'Assign Homework'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {homeworks.map(hw => (
          <div key={hw.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#111', fontSize: 15 }}>{hw.title}</div>
                <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>{hw.subject} · Due: {new Date(hw.dueDate).toLocaleDateString('en-IN')}</div>
              </div>
              <span style={{ background: '#e8eef8', color: '#1a3a6b', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>
                {hw.submissions?.length ?? 0} submitted
              </span>
            </div>
          </div>
        ))}
        {homeworks.length === 0 && <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>No homework assigned yet.</div>}
      </div>
    </main>
  )
}
