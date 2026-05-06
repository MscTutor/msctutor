// app/student-school/notices/page.tsx
'use client'
import { useEffect, useState } from 'react'
interface Notice { id: number; title: string; content: string; priority: string; createdAt: string }
export default function StudentNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  useEffect(() => { fetch('/api/school/notice').then(r => r.json()).then(d => setNotices(d)).catch(() => {}) }, [])
  const COLORS: Record<string, { bg: string; color: string }> = { urgent: { bg: '#fee2e2', color: '#dc2626' }, important: { bg: '#fef3c7', color: '#92400e' }, normal: { bg: '#f9fafb', color: '#6b7280' } }
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>School Notices</h1>
      {notices.length === 0 ? <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}><div style={{ fontSize: 48 }}>🔔</div><p style={{ marginTop: '1rem' }}>No notices yet.</p></div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {notices.map(n => {
            const c = COLORS[n.priority] ?? COLORS.normal
            return (
              <div key={n.id} style={{ background: c.bg, borderRadius: 14, padding: '1.25rem', border: `1px solid ${c.color}33` }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c.color, textTransform: 'uppercase', letterSpacing: 0.5 }}>{n.priority}</span>
                  <span style={{ fontSize: 12, color: '#9ca3af' }}>· {new Date(n.createdAt).toLocaleDateString('en-IN')}</span>
                </div>
                <div style={{ fontWeight: 700, color: '#111', fontSize: 15 }}>{n.title}</div>
                <p style={{ color: '#374151', fontSize: 14, margin: '6px 0 0', lineHeight: 1.6 }}>{n.content}</p>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
