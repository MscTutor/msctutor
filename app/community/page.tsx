'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const BRANCHES = [
  { id: 'all',       label: '🌐 All',       color: '#1a3a6b' },
  { id: 'math',      label: '➕ Math',      color: '#1a3a6b' },
  { id: 'science',   label: '⚗️ Science',   color: '#0a5e3f' },
  { id: 'physics',   label: '🔬 Physics',   color: '#0369a1' },
  { id: 'chemistry', label: '🧪 Chemistry', color: '#7c3aed' },
  { id: 'biology',   label: '🧬 Biology',   color: '#065f46' },
  { id: 'commerce',  label: '📊 Commerce',  color: '#7c3400' },
  { id: 'general',   label: '💬 General',   color: '#5a6a8a' },
]

interface Comment {
  id: number; userId?: string; userName: string; content: string
  branch: string; rating?: number; likes: number
  createdAt: string; isRegistered: boolean; replies: any[]
}

export default function CommunityPage() {
  const [activeBranch, setActiveBranch] = useState('all')
  const [comments, setComments]         = useState<Comment[]>([])
  const [loading, setLoading]           = useState(false)
  const [page, setPage]                 = useState(1)
  const [total, setTotal]               = useState(0)

  useEffect(() => { fetchComments(activeBranch, 1) }, [activeBranch])

  async function fetchComments(branch: string, p: number) {
    setLoading(true)
    try {
      const res  = await fetch(`/api/community/comment?branch=${branch}&page=${p}&limit=15`)
      const data = await res.json()
      if (p === 1) setComments(data.comments ?? [])
      else         setComments(prev => [...prev, ...(data.comments ?? [])])
      setTotal(data.total ?? 0)
      setPage(p)
    } catch { /* silent */ } finally { setLoading(false) }
  }

  function switchBranch(branch: string) {
    setActiveBranch(branch)
    setPage(1)
  }

  const branchInfo = BRANCHES.find(b => b.id === activeBranch) ?? BRANCHES[0]

  return (
    <div className="max-w-[900px] mx-auto px-5 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-head text-[30px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] mb-2">
          💬 Community Discussions
        </h1>
        <p className="text-[14px] text-[#5a6a8a]">
          {total.toLocaleString()} comments from students • Anyone can comment • Registered users can reply
        </p>
      </div>

      {/* Branch tabs — sticky */}
      <div className="sticky top-[154px] z-10 bg-[#f0f4ff] dark:bg-[#0a0f1e] py-3 -mx-5 px-5 mb-7">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {BRANCHES.map(b => (
            <button
              key={b.id}
              onClick={() => switchBranch(b.id)}
              className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold whitespace-nowrap flex-shrink-0 transition ${
                activeBranch === b.id
                  ? 'text-white shadow-card'
                  : 'bg-white dark:bg-[#111827] border border-[#dde5f5] dark:border-[#1e2d4a] text-[#5a6a8a] hover:border-primary-600'
              }`}
              style={activeBranch === b.id ? { background: b.color } : {}}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Write comment box */}
      <div className="bg-white dark:bg-[#111827] rounded-[20px] p-4 border-[1.5px] border-[#dde5f5] dark:border-[#1e2d4a] mb-7">
        <WriteComment branch={activeBranch} onSubmit={() => fetchComments(activeBranch, 1)} />
      </div>

      {/* Comment count */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-head text-[16px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">
          {activeBranch === 'all' ? 'All Comments' : `${branchInfo.label} Comments`}
          <span className="text-[14px] font-normal text-[#5a6a8a] ml-1">({total})</span>
        </h2>
        <select className="text-[12.5px] border border-[#dde5f5] dark:border-[#1e2d4a] rounded-[10px] px-3 py-1.5 bg-[#f8faff] dark:bg-[#1a2236] text-[#5a6a8a] outline-none">
          <option>Newest first</option>
          <option>Most liked</option>
          <option>Most replies</option>
        </select>
      </div>

      {/* Comments list */}
      {loading && page === 1 ? (
        <div className="space-y-4">
          {[1,2,3,4,5].map(i => <div key={i} className="h-24 bg-[#f0f4ff] dark:bg-[#1a2236] rounded-[18px] animate-pulse" />)}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-[48px] mb-3">💬</div>
          <p className="text-[15px] text-[#5a6a8a]">No comments yet for {branchInfo.label}.</p>
          <p className="text-[13px] text-[#5a6a8a] mt-1">Be the first to start the discussion! 🎉</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map(c => <CommentCard key={c.id} comment={c} onReplySubmit={() => fetchComments(activeBranch, page)} />)}

          {/* Load more */}
          {comments.length < total && (
            <button
              onClick={() => fetchComments(activeBranch, page + 1)}
              disabled={loading}
              className="w-full py-3 rounded-[14px] border-2 border-[#dde5f5] dark:border-[#1e2d4a] text-[#5a6a8a] text-[13.5px] font-medium hover:border-primary-600 hover:text-primary-600 disabled:opacity-60 transition"
            >
              {loading ? 'Loading...' : `Load More (${total - comments.length} remaining)`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ── Write Comment ──────────────────────────────────────
function WriteComment({ branch, onSubmit }: { branch: string; onSubmit: () => void }) {
  const [text, setText]   = useState('')
  const [rating, setRating] = useState(0)
  const [posting, setPosting] = useState(false)

  async function submit() {
    if (!text.trim()) return
    setPosting(true)
    try {
      await fetch('/api/community/comment', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ content: text, branch: branch === 'all' ? 'general' : branch, rating }),
      })
      setText(''); setRating(0)
      onSubmit()
    } catch { /* silent */ } finally { setPosting(false) }
  }

  return (
    <div className="flex gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-glow flex items-center justify-center text-white font-bold text-[15px] flex-shrink-0 font-head">U</div>
      <div className="flex-1">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={`Share your thoughts about ${branch === 'all' ? 'any subject' : branch}...`}
          rows={2}
          className="w-full p-3 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-xl text-[14px] bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow transition resize-none"
        />
        <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
          <div className="flex gap-1">
            {[1,2,3,4,5].map(v => (
              <button key={v} onClick={() => setRating(v)} className={`text-[20px] transition ${v <= rating ? 'text-amber-500' : 'text-gray-300 hover:text-amber-400'}`}>★</button>
            ))}
          </div>
          <button
            onClick={submit}
            disabled={posting || !text.trim()}
            className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white rounded-xl px-5 py-2 text-[13.5px] font-head font-bold transition"
          >
            {posting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Comment Card ──────────────────────────────────────
function CommentCard({ comment, onReplySubmit }: { comment: Comment; onReplySubmit: () => void }) {
  const [showReply, setShowReply] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [liked, setLiked]         = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function submitReply() {
    if (!replyText.trim()) return
    setSubmitting(true)
    try {
      const token = '' // get from auth context
      const res = await fetch('/api/community/reply', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ commentId: comment.id, content: replyText }),
      })
      const data = await res.json()
      if (data.error) {
        alert('Please login to reply')
        return
      }
      setReplyText(''); setShowReply(false)
      onReplySubmit()
    } catch { /* silent */ } finally { setSubmitting(false) }
  }

  const branchInfo = BRANCHES.find(b => b.id === comment.branch) ?? BRANCHES[0]

  return (
    <div className="bg-white dark:bg-[#111827] rounded-[18px] p-5 border-[1.5px] border-[#dde5f5] dark:border-[#1e2d4a] shadow-card">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-glow flex items-center justify-center text-white font-bold text-[15px] flex-shrink-0 font-head">
          {comment.userName[0]?.toUpperCase() ?? 'U'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-1.5">
            <span className="text-[14px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">{comment.userName}</span>
            {comment.isRegistered && (
              <span className="bg-blue-50 text-blue-600 rounded-full px-2 py-0.5 text-[10.5px] font-bold">✓ Member</span>
            )}
            <span className="rounded-full px-2.5 py-0.5 text-[11.5px] font-bold text-white" style={{ background: branchInfo.color }}>
              {branchInfo.label}
            </span>
            {comment.rating && (
              <span className="text-amber-500 text-[13px]">{'★'.repeat(comment.rating)}</span>
            )}
            <span className="text-[11.5px] text-[#5a6a8a] ml-auto">
              {new Date(comment.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>

          <p className="text-[14px] text-[#0f1f3d] dark:text-[#e8eeff] leading-relaxed mb-3">{comment.content}</p>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1 text-[12.5px] transition ${liked ? 'text-primary-600' : 'text-[#5a6a8a] hover:text-primary-600'}`}
            >
              👍 {comment.likes + (liked ? 1 : 0)}
            </button>
            <button
              onClick={() => setShowReply(!showReply)}
              className="flex items-center gap-1 text-[12.5px] text-[#5a6a8a] hover:text-primary-600 transition"
            >
              💬 Reply ({comment.replies.length})
              {!comment.isRegistered && <span className="text-[10px]"> — login required</span>}
            </button>
          </div>

          {/* Existing replies */}
          {comment.replies.length > 0 && (
            <div className="mt-3 pl-4 border-l-2 border-[#dde5f5] space-y-2.5">
              {comment.replies.map(r => (
                <div key={r.id} className="flex gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0">
                    {r.userName[0]?.toUpperCase()}
                  </div>
                  <div className="bg-[#f8faff] dark:bg-[#1a2236] rounded-tl-none rounded-[14px] px-3 py-2 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[13px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">{r.userName}</span>
                      <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-1.5 rounded-full">✓ Member</span>
                    </div>
                    <p className="text-[13px] text-[#5a6a8a]">{r.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reply input */}
          {showReply && (
            <div className="mt-3 flex gap-2">
              <input
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Login required to reply..."
                className="flex-1 px-3 py-2 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-xl text-[13px] bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow"
                onKeyDown={e => e.key === 'Enter' && submitReply()}
              />
              <button
                onClick={submitReply}
                disabled={submitting}
                className="bg-primary-600 text-white rounded-xl px-4 text-[13px] font-head font-semibold disabled:opacity-60"
              >
                {submitting ? '...' : 'Post'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
