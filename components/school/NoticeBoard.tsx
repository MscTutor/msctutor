// components/school/NoticeBoard.tsx

interface Notice { id: number; title: string; content: string; priority: string; targetRole: string; createdAt: string; isPushed: boolean }
interface Props  { notices: Notice[]; onPush?: (id: number) => void }

const PRIORITY_STYLE: Record<string, { color: string; bg: string }> = {
  urgent:    { color: '#dc2626', bg: '#fee2e2' },
  important: { color: '#92400e', bg: '#fef3c7' },
  normal:    { color: '#6b7280', bg: '#f3f4f6' },
}

export default function NoticeBoard({ notices, onPush }: Props) {
  if (!notices.length) return (
    <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
      <div style={{ fontSize: 40 }}>🔔</div>
      <p style={{ marginTop: '0.5rem' }}>No notices yet.</p>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {notices.map(n => {
        const s = PRIORITY_STYLE[n.priority] ?? PRIORITY_STYLE.normal
        return (
          <div key={n.id} style={{ background: '#fff', borderRadius: 14, border: `1px solid ${s.color}33`, padding: '1.1rem 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: s.bg, color: s.color, textTransform: 'capitalize' }}>{n.priority}</span>
                  <span style={{ fontSize: 12, color: '#9ca3af' }}>→ {n.targetRole} · {new Date(n.createdAt).toLocaleDateString('en-IN')}</span>
                </div>
                <div style={{ fontWeight: 700, color: '#111', fontSize: 15 }}>{n.title}</div>
                <p style={{ color: '#6b7280', fontSize: 13, margin: '4px 0 0', lineHeight: 1.5 }}>{n.content}</p>
              </div>
              {onPush && (
                <button onClick={() => onPush(n.id)} disabled={n.isPushed}
                  style={{ flexShrink: 0, padding: '0.5rem 0.9rem', background: n.isPushed ? '#f3f4f6' : '#1a3a6b', color: n.isPushed ? '#9ca3af' : '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: n.isPushed ? 'default' : 'pointer', whiteSpace: 'nowrap' }}>
                  {n.isPushed ? '✓ Sent' : '🔔 Push'}
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
