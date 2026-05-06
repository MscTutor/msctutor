'use client'
// app/teacher/class/[classId]/attendance/page.tsx

import { useEffect, useState } from 'react'
import { useParams }           from 'next/navigation'
import Link                    from 'next/link'

interface Student { id: number; name: string; rollNumber?: string }

export default function TeacherAttendancePage() {
  const { classId }  = useParams()
  const [students,   setStudents]  = useState<Student[]>([])
  const [statuses,   setStatuses]  = useState<Record<number, string>>({})
  const [date,       setDate]      = useState(new Date().toISOString().split('T')[0])
  const [saving,     setSaving]    = useState(false)
  const [saved,      setSaved]     = useState(false)

  useEffect(() => {
    fetch(`/api/school/student?classId=${classId}`).then(r => r.json()).then((d: Student[]) => {
      setStudents(d)
      const init: Record<number, string> = {}
      d.forEach(s => { init[s.id] = 'present' })
      setStatuses(init)
    }).catch(() => {})
  }, [classId])

  function markAll(status: string) { const s: Record<number, string> = {}; students.forEach(st => { s[st.id] = status }); setStatuses(s) }

  async function submit() {
    setSaving(true)
    const records = students.map(s => ({ studentId: s.id, status: statuses[s.id] ?? 'absent' }))
    await fetch('/api/school/attendance', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ classId: parseInt(classId as string), date, records, className: `Class ${classId}` }) })
    setSaved(true); setSaving(false); setTimeout(() => setSaved(false), 3000)
  }

  const STATUS_OPTS = [{ val: 'present', label: 'P', color: '#166534', bg: '#dcfce7' }, { val: 'absent', label: 'A', color: '#dc2626', bg: '#fee2e2' }, { val: 'late', label: 'L', color: '#92400e', bg: '#fef3c7' }]

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <nav style={{ fontSize: 13, color: '#6b7280', marginBottom: '1rem' }}><Link href={`/teacher/class/${classId}`} style={{ color: '#1a3a6b' }}>← Back</Link></nav>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111', margin: 0 }}>Mark Attendance</h1>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ padding: '0.6rem 1rem', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 14 }} />
      </div>
      {saved && <div style={{ background: '#dcfce7', color: '#166534', borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '1rem', fontWeight: 600 }}>✓ Attendance saved! Absent students notified.</div>}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button onClick={() => markAll('present')} style={{ background: '#dcfce7', color: '#166534', border: '1.5px solid #bbf7d0', borderRadius: 8, padding: '0.5rem 1rem', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>Mark All Present</button>
        <button onClick={() => markAll('absent')} style={{ background: '#fee2e2', color: '#dc2626', border: '1.5px solid #fecaca', borderRadius: 8, padding: '0.5rem 1rem', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>Mark All Absent</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {students.map(s => (
          <div key={s.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#111' }}>{s.name}</div>
              {s.rollNumber && <div style={{ fontSize: 12, color: '#9ca3af' }}>Roll: {s.rollNumber}</div>}
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {STATUS_OPTS.map(o => (
                <button key={o.val} onClick={() => setStatuses(st => ({ ...st, [s.id]: o.val }))}
                  style={{ width: 36, height: 36, borderRadius: 8, border: statuses[s.id] === o.val ? '2px solid currentColor' : '1.5px solid #e5e7eb', background: statuses[s.id] === o.val ? o.bg : '#f9fafb', color: statuses[s.id] === o.val ? o.color : '#9ca3af', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={submit} disabled={saving} style={{ width: '100%', padding: '0.9rem', background: saving ? '#93c5fd' : '#1a3a6b', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
        {saving ? 'Saving...' : '✅ Save Attendance & Notify Absent Students'}
      </button>
    </main>
  )
}
