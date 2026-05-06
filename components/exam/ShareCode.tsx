'use client'
// components/exam/ShareCode.tsx — Display and share exam code

import { useState } from 'react'
import { SITE }     from '@/lib/constants'

interface Props { shareCode: string; examId: number; title?: string }

export default function ShareCode({ shareCode, examId, title }: Props) {
  const [copied, setCopied] = useState(false)
  const joinUrl = `${SITE.url}/exam/${shareCode}`

  function copy(text: string) {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ background: '#e8eef8', borderRadius: 16, padding: '1.5rem', textAlign: 'center' }}>
      {title && <div style={{ fontSize: 14, color: '#6b7280', marginBottom: '0.5rem' }}>{title}</div>}

      <div style={{ fontSize: 48, fontWeight: 900, color: '#1a3a6b', letterSpacing: 8, fontFamily: 'monospace', margin: '0.5rem 0', background: '#fff', borderRadius: 12, padding: '0.75rem' }}>
        {shareCode}
      </div>

      <p style={{ fontSize: 13, color: '#374151', margin: '0.5rem 0 1rem' }}>
        Students join at: <strong>msctutor.in/exam/join</strong>
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => copy(shareCode)}
          style={{ padding: '0.7rem 1.25rem', background: copied ? '#22c55e' : '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14, transition: 'background 0.2s' }}>
          {copied ? '✓ Copied!' : '📋 Copy Code'}
        </button>
        <button onClick={() => copy(joinUrl)}
          style={{ padding: '0.7rem 1.25rem', background: '#fff', color: '#1a3a6b', border: '1.5px solid #1a3a6b', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
          🔗 Copy Link
        </button>
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button onClick={() => navigator.share({ title: `Join exam: ${shareCode}`, url: joinUrl })}
            style={{ padding: '0.7rem 1.25rem', background: '#f3f4f6', color: '#111', border: '1.5px solid #e5e7eb', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            📤 Share
          </button>
        )}
      </div>

      <div style={{ marginTop: '1rem', fontSize: 12, color: '#6b7280' }}>
        Exam ID: #{examId} · Code expires after exam ends
      </div>
    </div>
  )
}
