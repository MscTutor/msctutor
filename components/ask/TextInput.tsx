'use client'
// components/ask/TextInput.tsx

import { useState, useRef } from 'react'

interface Props {
  onResult: (solution: string, slug: string) => void
  onLoading: (v: boolean) => void
}

export default function TextInput({ onResult, onLoading }: Props) {
  const [text,    setText]    = useState('')
  const [subject, setSubject] = useState('')
  const textRef               = useRef<HTMLTextAreaElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    onLoading(true)
    try {
      const res  = await fetch('/api/ask', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ question: text, subject }),
      })
      const data = await res.json()
      onResult(data.solution ?? data.error ?? 'No answer received', data.slug ?? '')
    } catch {
      onResult('Something went wrong. Please try again.', '')
    } finally {
      onLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        ref={textRef}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type your question here… e.g. What is Newton's Second Law? Solve: 2x + 5 = 11"
        rows={4}
        style={{
          width:        '100%',
          padding:      '1rem',
          border:       '1.5px solid #d1d5db',
          borderRadius: 12,
          fontSize:     15,
          lineHeight:   1.6,
          resize:       'vertical',
          outline:      'none',
          boxSizing:    'border-box',
          fontFamily:   'inherit',
        }}
        onKeyDown={e => { if (e.key === 'Enter' && e.ctrlKey) handleSubmit(e as unknown as React.FormEvent) }}
      />
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', alignItems: 'center' }}>
        <select
          value={subject}
          onChange={e => setSubject(e.target.value)}
          style={{ padding: '0.6rem 0.9rem', border: '1.5px solid #d1d5db', borderRadius: 10, fontSize: 14, background: '#fff', color: '#374151', flexShrink: 0 }}
        >
          <option value="">Auto-detect subject</option>
          {['Mathematics','Physics','Chemistry','Biology','Commerce','Economics','History','Geography','English','Hindi','Computer Science'].map(s => (
            <option key={s} value={s.toLowerCase()}>{s}</option>
          ))}
        </select>
        <button
          type="submit"
          disabled={!text.trim()}
          style={{
            flex:         1,
            padding:      '0.75rem 1.5rem',
            background:   text.trim() ? '#1a3a6b' : '#9ca3af',
            color:        '#fff',
            border:       'none',
            borderRadius: 10,
            fontSize:     15,
            fontWeight:   700,
            cursor:       text.trim() ? 'pointer' : 'default',
            transition:   'background 0.15s',
          }}
        >
          🤖 Solve with AI
        </button>
      </div>
      <div style={{ fontSize: 12, color: '#9ca3af', marginTop: '0.4rem' }}>Tip: Press Ctrl + Enter to submit</div>
    </form>
  )
}
