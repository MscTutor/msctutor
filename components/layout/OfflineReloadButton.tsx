'use client'

export default function OfflineReloadButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      style={{ padding: '0.75rem 1.5rem', background: '#f3f4f6', color: '#111', border: '1.5px solid #e5e7eb', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 15 }}
    >
      🔄 Try Again
    </button>
  )
}
