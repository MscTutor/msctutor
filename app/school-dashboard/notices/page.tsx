'use client'
// app/school-dashboard/notices/page.tsx

import { useEffect, useState } from 'react'

interface Notice { id: number; title: string; content: string; type: string; priority: string; targetRole: string; isPushed: boolean; createdAt: string }

export default function NoticesPage() {
  const [notices,  setNotices]  = useState<Notice[]>([])
  const [form,     setForm]     = useState({ title: '', content: '', type: 'general', priority: 'normal', targetRole: 'all' })
  const [showForm, setShowForm] = useState(false)
  const [saving,   setSaving]   = useState(false)

  useEffect(() => { fetch('/api/school/notice').then(r => r.json()).then(d => setNotices(d)).catch(() => {}) }, [])

  async function createNotice(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    const res = await fetch('/api/school/notice', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const data = await res.json()
    setNotices(n => [data, ...n]); setShowForm(false); setSaving(false)
  }

  async function sendPush(notice: Notice) {
    await fetch('/api/school/notify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: notice.title, body: notice.content.slice(0, 100), targetRole: notice.targetRole, noticeId: notice.id }) })
    setNotices(n => n.map(x => x.id === notice.id ? { ...x, isPushed: true } : x))
  }

  const PRIORITY_COLORS: Record<string, string> = { normal: '#6b7280', important: '#d97706', urgent: '#dc2626' }

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: 0 }}>Notice Board</h1>
        <button onClick={() => setShowForm(!showForm)} style={{ background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, padding: '0.7rem 1.25rem', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>+ New Notice</button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <form onSubmit={createNotice}>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Notice title" required style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 15, marginBottom: '0.75rem', boxSizing: 'border-box' }} />
            <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Notice content..." required rows={4} style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', marginBottom: '0.75rem' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
              {[['priority', 'Priority', ['normal', 'important', 'urgent']], ['targetRole', 'Send To', ['all', 'teachers', 'students']]].map(([key, label, opts]) => (
                <div key={key as string}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{label as string}</label>
                  <select value={form[key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [key as string]: e.target.value }))} style={{ width: '100%', padding: '0.6rem', border: '1.5px solid #d1d5db', borderRadius: 8, fontSize: 13 }}>
                    {(opts as string[]).map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <button type="submit" disabled={saving} style={{ background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>{saving ? 'Saving...' : 'Create Notice'}</button>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {notices.map(n => (
          <div key={n.id} style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: PRIORITY_COLORS[n.priority] ?? '#6b7280', textTransform: 'capitalize' }}>● {n.priority}</span>
                  <span style={{ fontSize: 12, color: '#9ca3af' }}>→ {n.targetRole}</span>
                </div>
                <div style={{ fontWeight: 700, color: '#111', fontSize: 15 }}>{n.title}</div>
                <p style={{ color: '#6b7280', fontSize: 14, margin: '6px 0 0', lineHeight: 1.5 }}>{n.content}</p>
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 8 }}>{new Date(n.createdAt).toLocaleDateString('en-IN')}</div>
              </div>
              <button onClick={() => sendPush(n)} disabled={n.isPushed} style={{ background: n.isPushed ? '#f3f4f6' : '#1a3a6b', color: n.isPushed ? '#9ca3af' : '#fff', border: 'none', borderRadius: 8, padding: '0.6rem 1rem', fontSize: 13, fontWeight: 700, cursor: n.isPushed ? 'default' : 'pointer', whiteSpace: 'nowrap' }}>
                {n.isPushed ? '✓ Sent' : '🔔 Push'}
              </button>
            </div>
          </div>
        ))}
        {notices.length === 0 && <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>No notices yet.</div>}
      </div>
    </main>
  )
}
