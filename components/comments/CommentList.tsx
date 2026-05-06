'use client'
// components/comments/CommentList.tsx — Branch-filtered list (YouTube style)

import { useState, useEffect } from 'react'
import CommentItem              from './CommentItem'
import BranchFilter             from './BranchFilter'

interface Comment { id: number; userName: string; content: string; createdAt: string; likes: number; rating?: number | null; branch: string; replies: { id: number; userName: string; content: string; createdAt: string; likes: number }[] }

interface Props { initialComments: Comment[]; defaultBranch?: string }

export default function CommentList({ initialComments, defaultBranch = 'general' }: Props) {
  const [branch,   setBranch]   = useState(defaultBranch)
  const [comments, setComments] = useState(initialComments)
  const [page,     setPage]     = useState(1)
  const [loading,  setLoading]  = useState(false)
  const [hasMore,  setHasMore]  = useState(initialComments.length >= 10)

  const filtered = branch === 'general' ? comments : comments.filter(c => c.branch === branch)

  async function loadMore() {
    setLoading(true)
    try {
      const res  = await fetch(`/api/community/comment?branch=${branch}&page=${page + 1}`)
      const data = await res.json()
      if (data.comments?.length) {
        setComments(prev => {
          const ids = new Set(prev.map(c => c.id))
          return [...prev, ...data.comments.filter((c: Comment) => !ids.has(c.id))]
        })
        setPage(p => p + 1)
        setHasMore(data.comments.length >= 10)
      } else { setHasMore(false) }
    } catch { setHasMore(false) }
    setLoading(false)
  }

  useEffect(() => { setPage(1) }, [branch])

  return (
    <div>
      <BranchFilter active={branch} onChange={b => { setBranch(b); setPage(1) }} />

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280', background: '#f9fafb', borderRadius: 14 }}>
          <div style={{ fontSize: 36 }}>💬</div>
          <p style={{ marginTop: '0.5rem', fontSize: 14 }}>No comments yet in this branch. Be the first!</p>
        </div>
      ) : (
        <>
          {filtered.map(c => <CommentItem key={c.id} comment={c} />)}
          {hasMore && (
            <button onClick={loadMore} disabled={loading}
              style={{ width: '100%', padding: '0.75rem', background: '#f3f4f6', border: '1.5px solid #e5e7eb', borderRadius: 12, fontWeight: 600, cursor: loading ? 'default' : 'pointer', color: '#374151', fontSize: 14, marginTop: '0.5rem' }}>
              {loading ? 'Loading...' : 'Load more comments'}
            </button>
          )}
        </>
      )}
    </div>
  )
}
