// app/student-school/homework/page.tsx
'use client'
import { useEffect, useState } from 'react'
interface HW { id: number; title: string; subject: string; dueDate: string; description: string }
export default function StudentHomeworkPage() {
  const [hws, setHws] = useState<HW[]>([])
  useEffect(() => { fetch('/api/school/homework').then(r => r.json()).then(d => setHws(d)).catch(() => {}) }, [])
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>Homework</h1>
      {hws.length === 0 ? <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}><div style={{ fontSize: 48 }}>📝</div><p style={{ marginTop: '1rem' }}>No homework assigned yet.</p></div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {hws.map(hw => {
            const isOverdue = new Date(hw.dueDate) < new Date()
            return (
              <div key={hw.id} style={{ background: '#fff', border: `1.5px solid ${isOverdue ? '#fecaca' : '#e5e7eb'}`, borderRadius: 14, padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#111', fontSize: 15 }}>{hw.title}</div>
                    <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>{hw.subject}</div>
                    {hw.description && <p style={{ fontSize: 13, color: '#374151', marginTop: 8, lineHeight: 1.5 }}>{hw.description}</p>}
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: isOverdue ? '#dc2626' : '#6b7280' }}>Due: {new Date(hw.dueDate).toLocaleDateString('en-IN')}</div>
                    {isOverdue && <div style={{ fontSize: 11, color: '#dc2626', marginTop: 2 }}>Overdue</div>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
