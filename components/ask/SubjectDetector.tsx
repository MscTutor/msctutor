'use client'
// components/ask/SubjectDetector.tsx — Auto-detect subject from text

import { useEffect, useState } from 'react'
import { detectSubject }       from '@/lib/subject-detect'

const SUBJECT_META: Record<string, { emoji: string; color: string }> = {
  mathematics: { emoji: '➕', color: '#1a3a6b' },
  physics:     { emoji: '🔬', color: '#0369a1' },
  chemistry:   { emoji: '🧪', color: '#7c3aed' },
  biology:     { emoji: '🧬', color: '#0a5e3f' },
  accountancy: { emoji: '📒', color: '#7c3400' },
  economics:   { emoji: '💹', color: '#92400e' },
  history:     { emoji: '📜', color: '#78350f' },
  geography:   { emoji: '🌍', color: '#065f46' },
  'computer-science': { emoji: '🖥️', color: '#0369a1' },
  english:     { emoji: '📝', color: '#1e3a5f' },
  hindi:       { emoji: '🇮🇳', color: '#dc2626' },
  general:     { emoji: '📚', color: '#6b7280' },
}

interface Props { text: string }

export default function SubjectDetector({ text }: Props) {
  const [detected, setDetected] = useState('')

  useEffect(() => {
    if (text.length < 10) { setDetected(''); return }
    const timer = setTimeout(() => {
      const s = detectSubject(text)
      setDetected(s)
    }, 400)
    return () => clearTimeout(timer)
  }, [text])

  if (!detected || detected === 'general') return null

  const meta = SUBJECT_META[detected] ?? SUBJECT_META.general

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: `${meta.color}11`, border: `1px solid ${meta.color}33`, borderRadius: 20, fontSize: 13, color: meta.color, fontWeight: 600 }}>
      <span>{meta.emoji}</span>
      <span>Detected: {detected.charAt(0).toUpperCase() + detected.slice(1)}</span>
    </div>
  )
}
