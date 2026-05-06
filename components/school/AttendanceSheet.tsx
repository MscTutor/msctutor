'use client'
// components/school/AttendanceSheet.tsx

interface Student { id: number; name: string; rollNumber?: string }
interface Props {
  students:   Student[]
  statuses:   Record<number, string>
  onChange:   (id: number, status: string) => void
  onMarkAll:  (status: string) => void
  onSubmit:   () => void
  submitting: boolean
  saved:      boolean
}

const OPTS = [
  { val: 'present', label: 'P', color: '#166534', bg: '#dcfce7', border: '#22c55e' },
  { val: 'absent',  label: 'A', color: '#dc2626', bg: '#fee2e2', border: '#f87171' },
  { val: 'late',    label: 'L', color: '#92400e', bg: '#fef3c7', border: '#fbbf24' },
]

export default function AttendanceSheet({ students, statuses, onChange, onMarkAll, onSubmit, submitting, saved }: Props) {
  return (
    <div>
      {saved && (
        <div style={{ background: '#dcfce7', color: '#166534', borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '1rem', fontWeight: 600, fontSize: 14 }}>
          ✅ Attendance saved! Absent students have been notified.
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button onClick={() => onMarkAll('present')} style={{ padding: '0.5rem 1rem', background: '#dcfce7', color: '#166534', border: '1.5px solid #bbf7d0', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
          ✓ Mark All Present
        </button>
        <button onClick={() => onMarkAll('absent')} style={{ padding: '0.5rem 1rem', background: '#fee2e2', color: '#dc2626', border: '1.5px solid #fecaca', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
          ✗ Mark All Absent
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {students.map(s => (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#111' }}>{s.name}</div>
              {s.rollNumber && <div style={{ fontSize: 12, color: '#9ca3af' }}>Roll: {s.rollNumber}</div>}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {OPTS.map(o => (
                <button key={o.val} onClick={() => onChange(s.id, o.val)}
                  style={{ width: 38, height: 38, borderRadius: 8, border: `2px solid ${statuses[s.id] === o.val ? o.border : '#e5e7eb'}`, background: statuses[s.id] === o.val ? o.bg : '#f9fafb', color: statuses[s.id] === o.val ? o.color : '#9ca3af', fontWeight: 800, fontSize: 14, cursor: 'pointer', transition: 'all 0.1s' }}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={onSubmit} disabled={submitting}
        style={{ width: '100%', padding: '0.9rem', background: submitting ? '#93c5fd' : '#1a3a6b', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: submitting ? 'default' : 'pointer' }}>
        {submitting ? '⏳ Saving & Notifying...' : '✅ Save Attendance & Notify Absent'}
      </button>
    </div>
  )
}
