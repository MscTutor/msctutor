'use client'
// app/school-dashboard/students/page.tsx

import { useEffect, useState, useRef } from 'react'

interface Student { id: number; name: string; rollNumber?: string; phone?: string; isActive: boolean }

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [form,     setForm]     = useState({ name: '', rollNumber: '', phone: '', parentPhone: '' })
  const [showForm, setShowForm] = useState(false)
  const [adding,   setAdding]   = useState(false)
  const [importing, setImporting] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/school/student').then(r => r.json()).then(d => { setStudents(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  async function addStudent(e: React.FormEvent) {
    e.preventDefault(); setAdding(true)
    const res = await fetch('/api/school/student', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const data = await res.json()
    setStudents(s => [data, ...s]); setShowForm(false); setAdding(false)
  }

  async function handleCSV(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setImporting(true)
    const { default: Papa } = await import('papaparse')
    Papa.parse(file, {
      header: true, skipEmptyLines: true,
      complete: async (results) => {
        const rows = results.data as { name?: string; roll_number?: string; phone?: string; parent_phone?: string }[]
        const students = rows.map(r => ({ name: r.name ?? '', rollNumber: r.roll_number, phone: r.phone, parentPhone: r.parent_phone })).filter(s => s.name)
        const res = await fetch('/api/school/student', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ students }) })
        const data = await res.json()
        alert(`✅ ${data.created} students imported!`)
        window.location.reload()
        setImporting(false)
      },
    })
  }

  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNumber?.includes(search))

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: 0 }}>Students ({students.length})</h1>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => fileRef.current?.click()} disabled={importing} style={{ background: '#f3f4f6', color: '#111', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '0.65rem 1.1rem', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
            {importing ? 'Importing...' : '📥 Bulk CSV'}
          </button>
          <input ref={fileRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleCSV} />
          <button onClick={() => setShowForm(!showForm)} style={{ background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, padding: '0.65rem 1.1rem', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>+ Add Student</button>
        </div>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or roll number..." style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 14, marginBottom: '1rem', boxSizing: 'border-box' }} />

      {showForm && (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1.25rem' }}>
          <form onSubmit={addStudent}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[['name', 'Full Name'], ['rollNumber', 'Roll Number'], ['phone', 'Student Phone'], ['parentPhone', "Parent's Phone"]].map(([key, label]) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>{label}</label>
                  <input value={form[key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} required={key === 'name'} style={{ width: '100%', padding: '0.7rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: '0.75rem', fontSize: 12, color: '#6b7280' }}>📄 For bulk import, CSV columns: name, roll_number, phone, parent_phone</div>
            <button type="submit" disabled={adding} style={{ marginTop: '1rem', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>{adding ? 'Adding...' : 'Add Student'}</button>
          </form>
        </div>
      )}

      {loading ? <div style={{ color: '#6b7280' }}>Loading...</div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {filtered.map(s => (
            <div key={s.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '0.9rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#374151', flexShrink: 0 }}>{s.name.charAt(0)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#111', fontSize: 14 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>Roll: {s.rollNumber ?? 'N/A'} · {s.phone ?? 'No phone'}</div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>No students found.</div>}
        </div>
      )}
    </main>
  )
}
