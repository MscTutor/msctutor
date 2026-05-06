'use client'
// components/comments/CommentItem.tsx

import { useState } from 'react'
import StarRating   from './StarRating'

interface Reply   { id: number; userName: string; content: string; createdAt: string; likes: number }
interface Comment { id: number; userName: string; content: string; createdAt: string; likes: number; rating?: number | null; branch: string; replies: Reply[] }
interface Props   { comment: Comment }

export default function CommentItem({ comment }: Props) {
  const [likes,     setLikes]     = useState(comment.likes)
  const [liked,     setLiked]     = useState(false)
  const [showReply, setShowReply] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [replies,   setReplies]   = useState(comment.replies)
  const [posting,   setPosting]   = useState(false)

  function formatDate(d: string) {
    const diff = Date.now() - new Date(d).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1)  return 'Just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24)  return `${hrs}h ago`
    return Math.floor(hrs / 24) + 'd ago'
  }

  async function postReply() {
    if (!replyText.trim()) return
    setPosting(true)
    const res  = await fetch('/api/community/reply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ commentId: comment.id, content: replyText, userName: 'You' }) })
    const data = await res.json()
    setReplies(r => [...r, data])
    setReplyText(''); setShowReply(false); setPosting(false)
  }

  return (
    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1rem 1.25rem', marginBottom: '0.75rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.65rem' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#e8eef8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1a3a6b', fontSize: 14, flexShrink: 0 }}>
          {comment.userName.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>{comment.userName}</span>
          <span style={{ fontSize: 12, color: '#9ca3af', marginLeft: 8 }}>{formatDate(comment.createdAt)}</span>
        </div>
        {comment.rating && <StarRating value={comment.rating} readonly size={16} />}
        <span style={{ fontSize: 11, background: '#f3f4f6', color: '#6b7280', padding: '2px 8px', borderRadius: 20, fontWeight: 600, textTransform: 'capitalize' }}>{comment.branch}</span>
      </div>

      <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.6, margin: '0 0 0.75rem' }}>{comment.content}</p>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button onClick={() => { if (!liked) { setLikes(l => l + 1); setLiked(true) } }}
          style={{ background: 'none', border: 'none', color: liked ? '#1a3a6b' : '#9ca3af', cursor: 'pointer', fontSize: 13, fontWeight: liked ? 700 : 400, padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
          👍 {likes}
        </button>
        <button onClick={() => setShowReply(!showReply)}
          style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: 13, padding: 0 }}>
          Reply
        </button>
      </div>

      {/* Replies */}
      {replies.length > 0 && (
        <div style={{ marginTop: '0.75rem', paddingLeft: '1rem', borderLeft: '2px solid #e8eef8' }}>
          {replies.map(r => (
            <div key={r.id} style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: '#111' }}>{r.userName}</span>
              <span style={{ fontSize: 12, color: '#9ca3af', marginLeft: 6 }}>{formatDate(r.createdAt)}</span>
              <p style={{ fontSize: 14, color: '#374151', margin: '2px 0 0', lineHeight: 1.5 }}>{r.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Reply box */}
      {showReply && (
        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
          <input value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Write a reply..."
            style={{ flex: 1, padding: '0.6rem 0.9rem', border: '1.5px solid #e5e7eb', borderRadius: 10, fontSize: 14 }}
            onKeyDown={e => e.key === 'Enter' && postReply()} />
          <button onClick={postReply} disabled={posting || !replyText.trim()}
            style={{ padding: '0.6rem 1rem', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
            {posting ? '...' : 'Reply'}
          </button>
        </div>
      )}
    </div>
  )
}
