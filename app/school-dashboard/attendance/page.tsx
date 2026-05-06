'use client'
// app/school-dashboard/attendance/page.tsx

import { useEffect, useState } from 'react'

interface AttendanceRecord { id: number; studentId: number; status: string; student: { name: string } }

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [date,    setDate]    = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/school/attendance?date=${date}`).then(r => r.json()).then(d => { setRecords(d); setLoading(false) }).catch(() => setLoading(false))
  }, [date])

  const counts = { present: records.filter(r => r.status === 'present').length, absent: records.filter(r => r.status === 'absent').length, late: records.filter(r => r.status === 'late').length }

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: 0 }}>Attendance</h1>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ padding: '0.65rem 1rem', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 14 }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[{ label: 'Present', val: counts.present, color: '#16a34a', bg: '#dcfce7' }, { label: 'Absent', val: counts.absent, color: '#dc2626', bg: '#fee2e2' }, { label: 'Late', val: counts.late, color: '#d97706', bg: '#fef3c7' }].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 13, color: s.color, fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {loading ? <div style={{ color: '#6b7280' }}>Loading...</div> : records.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>No attendance data for this date.</div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>{['Student', 'Status'].map(h => <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {records.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem 1rem', fontSize: 14, color: '#111' }}>{r.student.name}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: r.status === 'present' ? '#dcfce7' : r.status === 'absent' ? '#fee2e2' : '#fef3c7', color: r.status === 'present' ? '#166534' : r.status === 'absent' ? '#dc2626' : '#92400e' }}>
                      {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
