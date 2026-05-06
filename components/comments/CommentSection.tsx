'use client'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface Comment {
  id: number; userId?: string; userName: string; userAvatar?: string
  content: string; branch: string; rating?: number; likes: number
  createdAt: string; isRegistered: boolean
  replies: Reply[]
}
interface Reply {
  id: number; userId: string; userName: string
  content: string; createdAt: string; likes: number
}

interface Props { branch: string; pageUrl?: string; questionId?: number; subjectId?: number }

export default function CommentSection({ branch, pageUrl, questionId, subjectId }: Props) {
  const [comments, setComments] = useState<Comment[]>([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [loading, setLoading]   = useState(false)

  useEffect(() => { fetchComments() }, [branch])

  async function fetchComments() {
    setLoading(true)
    try {
      const res  = await fetch(`/api/community/comment?branch=${branch}&limit=5`)
      const data = await res.json()
      setComments(data.comments ?? [])
    } catch { /* silent */ } finally { setLoading(false) }
  }

  const avgRating = comments.length
    ? (comments.filter(c => c.rating).reduce((s, c) => s + (c.rating ?? 0), 0) / comments.filter(c => c.rating).length).toFixed(1)
    : '0'

  return (
    <>
      <div className="bg-white dark:bg-[#111827] rounded-[20px] p-6 border-[1.5px] border-[#dde5f5] dark:border-[#1e2d4a]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-head text-[17px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] flex items-center gap-2">
            💬 Comments
            <span className="text-[13px] font-normal text-[#5a6a8a]">({comments.length})</span>
          </h2>
          {comments.length > 0 && (
            <div className="text-amber-500 text-[14px] font-semibold">★ {avgRating}/5</div>
          )}
        </div>

        {/* Click trigger */}
        <button
          onClick={() => setPopupOpen(true)}
          className="w-full text-left flex items-center gap-3 px-4 py-3.5 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-xl bg-[#f8faff] dark:bg-[#1a2236] text-[#5a6a8a] hover:border-primary-glow transition mb-4"
        >
          <span className="text-[18px]">😊</span>
          <span className="text-[14px]">
            Write a comment about {branch.charAt(0).toUpperCase() + branch.slice(1)}...
          </span>
        </button>

        {/* Comment list preview */}
        {loading ? (
          <div className="space-y-3">
            {[1,2].map(i => <div key={i} className="h-16 bg-[#f0f4ff] dark:bg-[#1a2236] rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <div className="space-y-4">
            {comments.slice(0, 3).map(c => (
              <CommentItem key={c.id} comment={c} onReply={() => setPopupOpen(true)} />
            ))}
            {comments.length === 0 && (
              <p className="text-center text-[13px] text-[#5a6a8a] py-4">
                Be the first to comment! 🎉
              </p>
            )}
          </div>
        )}

        <button
          onClick={() => setPopupOpen(true)}
          className="w-full mt-4 py-2.5 rounded-xl border border-[#dde5f5] dark:border-[#1e2d4a] text-[#5a6a8a] text-[13px] hover:border-primary-600 hover:text-primary-600 transition"
        >
          💬 View all comments & reply
        </button>
      </div>

      {/* Popup */}
      {popupOpen && (
        <CommentPopup
          branch={branch}
          pageUrl={pageUrl}
          questionId={questionId}
          subjectId={subjectId}
          onClose={() => { setPopupOpen(false); fetchComments() }}
        />
      )}
    </>
  )
}

// ── COMMENT ITEM ──────────────────────────────────────
function CommentItem({ comment, onReply }: { comment: Comment; onReply: () => void }) {
  const [liked, setLiked] = useState(false)

  const stars = comment.rating
    ? '★'.repeat(comment.rating) + '☆'.repeat(5 - comment.rating)
    : null

  return (
    <div className="flex gap-3">
      <Avatar name={comment.userName} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center flex-wrap gap-2 mb-1">
          <span className="text-[13.5px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">{comment.userName}</span>
          <span className="bg-[#f0f4ff] dark:bg-[#1a2236] border border-[#dde5f5] rounded-full px-2 py-0.5 text-[11px] text-[#5a6a8a]">
            {comment.branch}
          </span>
          {stars && <span className="text-amber-500 text-[12px]">{stars}</span>}
          <span className="text-[11px] text-[#5a6a8a] ml-auto">
            {new Date(comment.createdAt).toLocaleDateString('en-IN')}
          </span>
        </div>
        <div className="text-[13.5px] text-[#0f1f3d] dark:text-[#e8eeff] bg-[#f8faff] dark:bg-[#1a2236] rounded-tl-none rounded-xl p-2.5 leading-relaxed">
          {comment.content}
        </div>
        <div className="flex gap-3 mt-1.5">
          <button
            onClick={() => setLiked(!liked)}
            className={`text-[12px] flex items-center gap-1 transition ${liked ? 'text-primary-600' : 'text-[#5a6a8a] hover:text-primary-600'}`}
          >
            👍 {comment.likes + (liked ? 1 : 0)}
          </button>
          <button onClick={onReply} className="text-[12px] text-[#5a6a8a] hover:text-primary-600 transition">
            💬 Reply
          </button>
        </div>
        {/* Replies */}
        {comment.replies.length > 0 && (
          <div className="mt-2.5 pl-3 border-l-2 border-[#dde5f5] space-y-2">
            {comment.replies.map(r => (
              <div key={r.id} className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                  {r.userName[0].toUpperCase()}
                </div>
                <div>
                  <span className="text-[12.5px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mr-1">{r.userName}</span>
                  <span className="bg-blue-50 text-blue-600 rounded-full px-1.5 py-0.5 text-[10px] font-bold mr-1">✓ Registered</span>
                  <span className="text-[11px] text-[#5a6a8a]">{new Date(r.createdAt).toLocaleDateString('en-IN')}</span>
                  <div className="text-[13px] bg-[#f8faff] dark:bg-[#1a2236] rounded-tl-none rounded-xl p-2 mt-0.5">{r.content}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── COMMENT POPUP (no page refresh) ──────────────────
function CommentPopup({ branch, pageUrl, questionId, subjectId, onClose }: Props & { onClose: () => void }) {
  const [comments, setComments]  = useState<Comment[]>([])
  const [text, setText]          = useState('')
  const [rating, setRating]      = useState(0)
  const [loading, setLoading]    = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [replyId, setReplyId]    = useState<number | null>(null)
  const [replyText, setReplyText] = useState('')

  useEffect(() => {
    fetchComments()
    // prevent body scroll
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  async function fetchComments() {
    setLoading(true)
    try {
      const res  = await fetch(`/api/community/comment?branch=${branch}&limit=20`)
      const data = await res.json()
      setComments(data.comments ?? [])
    } catch { /* silent */ } finally { setLoading(false) }
  }

  async function submitComment() {
    if (!text.trim()) { toast.error('Comment likhein pehle!'); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/community/comment', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text, branch, rating, pageUrl, questionId, subjectId }),
      })
      const data = await res.json()
      if (data.error) { toast.error(data.error); return }
      toast.success('Comment posted! ✓')
      setText(''); setRating(0)
      fetchComments()
    } catch { toast.error('Error posting comment') } finally { setSubmitting(false) }
  }

  async function submitReply(commentId: number) {
    if (!replyText.trim()) return
    try {
      const res = await fetch('/api/community/reply', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId, content: replyText }),
      })
      const data = await res.json()
      if (data.error) { toast.error(data.error); return }
      toast.success('Reply posted! ✓')
      setReplyText(''); setReplyId(null)
      fetchComments()
    } catch { toast.error('Login required to reply') }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[600] flex items-end sm:items-center justify-center backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white dark:bg-[#111827] rounded-[20px_20px_0_0] sm:rounded-[20px] w-full max-w-[600px] max-h-[85vh] flex flex-col animate-popup-slide">
        {/* Popup header */}
        <div className="flex items-center justify-between p-5 pb-4 border-b border-[#dde5f5] dark:border-[#1e2d4a] flex-shrink-0">
          <h3 className="font-head text-[16px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">
            💬 {branch.charAt(0).toUpperCase() + branch.slice(1)} Comments
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0f4ff] dark:bg-[#1a2236] flex items-center justify-center text-[#5a6a8a] hover:bg-[#dde5f5] transition"
          >
            ✕
          </button>
        </div>

        {/* Write area */}
        <div className="p-4 flex-shrink-0 border-b border-[#dde5f5] dark:border-[#1e2d4a]">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-glow flex items-center justify-center text-white font-bold text-[15px] flex-shrink-0 font-head">U</div>
            <div className="flex-1">
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder={`Write a comment about ${branch}...`}
                rows={3}
                className="w-full p-3 border-2 border-[#dde5f5] dark:border-[#1e2d4a] rounded-xl text-[14px] bg-[#f8faff] dark:bg-[#1a2236] text-[#0f1f3d] dark:text-[#e8eeff] outline-none focus:border-primary-glow focus:shadow-[0_0_0_3px_rgba(59,111,212,.1)] transition resize-none"
              />
              <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                {/* Stars */}
                <div className="flex items-center gap-2 text-[12.5px] text-[#5a6a8a]">
                  Rate:
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(v => (
                      <button
                        key={v}
                        onClick={() => setRating(v)}
                        className={`text-[20px] transition ${v <= rating ? 'text-amber-500' : 'text-gray-300 hover:text-amber-400'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={submitComment}
                  disabled={submitting}
                  className="bg-primary-600 hover:bg-primary-500 disabled:opacity-60 text-white rounded-xl px-5 py-2 text-[13.5px] font-head font-bold transition"
                >
                  {submitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comment list */}
        <div className="overflow-y-auto flex-1 p-4 space-y-4">
          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-16 bg-[#f0f4ff] dark:bg-[#1a2236] rounded-xl animate-pulse" />)}
            </div>
          ) : comments.length === 0 ? (
            <p className="text-center text-[13px] text-[#5a6a8a] py-8">No comments yet. Be the first! 🎉</p>
          ) : (
            comments.map(c => (
              <div key={c.id} className="flex gap-3">
                <Avatar name={c.userName} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-1.5 mb-1">
                    <span className="text-[13.5px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">{c.userName}</span>
                    <span className="bg-[#f0f4ff] dark:bg-[#1a2236] border border-[#dde5f5] rounded-full px-2 py-0.5 text-[11px] text-[#5a6a8a]">{c.branch}</span>
                    {c.rating && <span className="text-amber-500 text-[12px]">{'★'.repeat(c.rating)}</span>}
                    <span className="text-[11px] text-[#5a6a8a] ml-auto">{new Date(c.createdAt).toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="text-[13.5px] text-[#0f1f3d] dark:text-[#e8eeff] bg-[#f8faff] dark:bg-[#1a2236] rounded-tl-none rounded-xl p-2.5 leading-relaxed mb-1.5">
                    {c.content}
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[12px] text-[#5a6a8a]">👍 {c.likes}</span>
                    <button
                      onClick={() => setReplyId(replyId === c.id ? null : c.id)}
                      className="text-[12px] text-[#5a6a8a] hover:text-primary-600 transition"
                    >
                      💬 Reply {!c.isRegistered && '(Login required)'}
                    </button>
                  </div>

                  {/* Reply input */}
                  {replyId === c.id && (
                    <div className="mt-2 flex gap-2">
                      <input
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                        placeholder="Write a reply (login required)..."
                        className="flex-1 px-3 py-2 border border-[#dde5f5] dark:border-[#1e2d4a] rounded-xl text-[13px] bg-[#f8faff] dark:bg-[#1a2236] outline-none focus:border-primary-glow"
                        onKeyDown={e => e.key === 'Enter' && submitReply(c.id)}
                      />
                      <button
                        onClick={() => submitReply(c.id)}
                        className="bg-primary-600 text-white rounded-xl px-4 py-2 text-[13px] font-head font-semibold"
                      >
                        Post
                      </button>
                    </div>
                  )}

                  {/* Existing replies */}
                  {c.replies.length > 0 && (
                    <div className="mt-2 pl-3 border-l-2 border-[#dde5f5] space-y-2">
                      {c.replies.map(r => (
                        <div key={r.id} className="flex gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                            {r.userName[0].toUpperCase()}
                          </div>
                          <div>
                            <span className="text-[12.5px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mr-1">{r.userName}</span>
                            <span className="bg-blue-50 text-blue-600 rounded-full px-1.5 text-[10px] font-bold mr-1">✓ Registered</span>
                            <div className="text-[13px] bg-[#f8faff] dark:bg-[#1a2236] rounded-tl-none rounded-xl p-2 mt-0.5">{r.content}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-600 to-primary-glow flex items-center justify-center text-white font-bold text-[14px] flex-shrink-0 font-head">
      {name[0]?.toUpperCase() ?? 'U'}
    </div>
  )
}
