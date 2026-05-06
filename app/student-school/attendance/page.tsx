// app/student-school/attendance/page.tsx
'use client'
import { useEffect, useState } from 'react'
interface Rec { id: number; date: string; status: string; class: { name: string } }
export default function StudentAttendancePage() {
  const [records, setRecords] = useState<Rec[]>([])
  useEffect(() => { fetch('/api/school/attendance?student=1').then(r => r.json()).then(d => setRecords(d)).catch(() => {}) }, [])
  const pct = records.length ? Math.round((records.filter(r => r.status === 'present').length / records.length) * 100) : 0
  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>My Attendance</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[{ label: 'Present', val: records.filter(r => r.status === 'present').length, color: '#166534', bg: '#dcfce7' }, { label: 'Absent', val: records.filter(r => r.status === 'absent').length, color: '#dc2626', bg: '#fee2e2' }, { label: 'Percentage', val: `${pct}%`, color: pct >= 75 ? '#166534' : '#dc2626', bg: pct >= 75 ? '#dcfce7' : '#fee2e2' }].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 13, color: s.color, fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>
      {records.length === 0 ? <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>No attendance records yet.</div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {records.slice(0, 30).map(r => (
            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }}>
              <span style={{ fontSize: 14, color: '#374151' }}>{new Date(r.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 12px', borderRadius: 20, background: r.status === 'present' ? '#dcfce7' : '#fee2e2', color: r.status === 'present' ? '#166534' : '#dc2626' }}>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
