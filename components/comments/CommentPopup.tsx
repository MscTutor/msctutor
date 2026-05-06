'use client'
// components/comments/CommentPopup.tsx — Opens on click, no page refresh

import { useState } from 'react'
import StarRating   from './StarRating'

interface Props { branch: string; questionId?: number; onClose: () => void; onPosted: (c: unknown) => void }

export default function CommentPopup({ branch, questionId, onClose, onPosted }: Props) {
  const [name,    setName]    = useState('')
  const [content, setContent] = useState('')
  const [rating,  setRating]  = useState(0)
  const [posting, setPosting] = useState(false)
  const [error,   setError]   = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) { setError('Please write a comment'); return }
    setPosting(true); setError('')
    try {
      const res = await fetch('/api/community/comment', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ content, userName: name || 'Anonymous', branch, rating: rating || null, questionId }),
      })
      const data = await res.json()
      onPosted(data); onClose()
    } catch { setError('Failed to post. Please try again.') }
    setPosting(false)
  }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 0 0' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '20px 20px 0 0', width: '100%', maxWidth: 640, padding: '1.5rem', boxShadow: '0 -8px 40px rgba(0,0,0,0.15)', maxHeight: '90vh', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111', margin: 0 }}>Write a Comment</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, color: '#9ca3af', cursor: 'pointer' }}>×</button>
        </div>

        <form onSubmit={submit}>
          {error && <div style={{ background: '#fee2e2', color: '#dc2626', borderRadius: 10, padding: '0.75rem', fontSize: 14, marginBottom: '0.75rem' }}>{error}</div>}

          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name (optional — defaults to Anonymous)"
            style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #e5e7eb', borderRadius: 12, fontSize: 14, marginBottom: '0.75rem', boxSizing: 'border-box' }} />

          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Write your comment, question, or feedback…" rows={4} required
            style={{ width: '100%', padding: '0.85rem 1rem', border: '1.5px solid #d1d5db', borderRadius: 12, fontSize: 15, resize: 'vertical', boxSizing: 'border-box', marginBottom: '0.75rem', fontFamily: 'inherit' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
            <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 600 }}>Rate this page:</span>
            <StarRating value={rating} onChange={setRating} />
          </div>

          <button type="submit" disabled={posting}
            style={{ width: '100%', padding: '0.9rem', background: posting ? '#93c5fd' : '#1a3a6b', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: posting ? 'default' : 'pointer' }}>
            {posting ? 'Posting...' : '💬 Post Comment'}
          </button>
        </form>
      </div>
    </div>
  )
}
