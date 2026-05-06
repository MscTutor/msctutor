'use client'
// components/school/AttendanceCalendar.tsx — Monthly calendar view

interface DayRecord { date: string; status: 'present' | 'absent' | 'late' | 'holiday' }
interface Props { records: DayRecord[]; month?: number; year?: number }

const STATUS_COLORS = {
  present: '#dcfce7', absent: '#fee2e2', late: '#fef3c7', holiday: '#e8eef8'
}
const STATUS_TEXT = {
  present: '#166534', absent: '#dc2626', late: '#92400e', holiday: '#1a3a6b'
}

export default function AttendanceCalendar({ records, month, year }: Props) {
  const now   = new Date()
  const m     = month ?? now.getMonth()
  const y     = year  ?? now.getFullYear()
  const first = new Date(y, m, 1).getDay()
  const days  = new Date(y, m + 1, 0).getDate()

  const byDate: Record<string, DayRecord['status']> = {}
  records.forEach(r => { byDate[r.date.split('T')[0]] = r.status })

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

  const present  = records.filter(r => r.status === 'present').length
  const absent   = records.filter(r => r.status === 'absent').length
  const pct      = records.length ? Math.round((present / records.length) * 100) : 0

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111', margin: 0 }}>{MONTHS[m]} {y}</h3>
        <div style={{ fontSize: 14, fontWeight: 700, color: pct >= 75 ? '#166534' : '#dc2626' }}>{pct}% attendance</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: '1rem' }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#6b7280', padding: '4px 0' }}>{d}</div>
        ))}
        {Array.from({ length: first }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: days }).map((_, i) => {
          const date = `${y}-${String(m + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`
          const status = byDate[date]
          return (
            <div key={i} style={{
              textAlign: 'center', padding: '6px 2px', borderRadius: 8,
              background: status ? STATUS_COLORS[status] : 'transparent',
              color:      status ? STATUS_TEXT[status]   : '#374151',
              fontSize: 13, fontWeight: status ? 700 : 400,
            }}>
              {i + 1}
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {[{ label: `Present: ${present}`, color: '#166534', bg: '#dcfce7' }, { label: `Absent: ${absent}`, color: '#dc2626', bg: '#fee2e2' }, { label: `Late: ${records.filter(r=>r.status==='late').length}`, color: '#92400e', bg: '#fef3c7' }].map(s => (
          <div key={s.label} style={{ fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20, background: s.bg, color: s.color }}>{s.label}</div>
        ))}
      </div>
    </div>
  )
}
