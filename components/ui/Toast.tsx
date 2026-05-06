'use client'
// components/ui/Toast.tsx

import { useEffect, useState } from 'react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastProps { message: string; type?: ToastType; duration?: number; onClose: () => void }

const COLORS: Record<ToastType, { bg: string; color: string; border: string; icon: string }> = {
  success: { bg: '#dcfce7', color: '#166534', border: '#bbf7d0', icon: '✓' },
  error:   { bg: '#fee2e2', color: '#dc2626', border: '#fecaca', icon: '✕' },
  info:    { bg: '#e8eef8', color: '#1a3a6b', border: '#bfdbfe', icon: 'ℹ' },
  warning: { bg: '#fef3c7', color: '#92400e', border: '#fde68a', icon: '⚠' },
}

export default function Toast({ message, type = 'info', duration = 3500, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true)
  const c = COLORS[type]

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onClose, 300) }, duration)
    return () => clearTimeout(t)
  }, [duration, onClose])

  return (
    <div style={{
      position:     'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9999,
      display:      'flex', alignItems: 'center', gap: 10,
      padding:      '0.85rem 1.25rem',
      background:   c.bg, border: `1.5px solid ${c.border}`, color: c.color,
      borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      fontSize:     14, fontWeight: 600, maxWidth: 360,
      opacity:      visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition:   'all 0.3s ease',
    }}>
      <span style={{ fontSize: 16, fontWeight: 800 }}>{c.icon}</span>
      <span style={{ flex: 1 }}>{message}</span>
      <button onClick={() => { setVisible(false); setTimeout(onClose, 300) }} style={{ background: 'none', border: 'none', color: c.color, cursor: 'pointer', fontSize: 16, padding: 0, opacity: 0.7 }}>×</button>
    </div>
  )
}
