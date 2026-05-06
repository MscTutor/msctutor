// app/community/[branch]/page.tsx — Branch-specific community page

import type { Metadata }  from 'next'
import { prisma }         from '@/lib/prisma'
import { SITE }           from '@/lib/constants'
import CommentSection     from '@/components/comments/CommentSection'

interface Props { params: { branch: string } }

const BRANCH_LABELS: Record<string, string> = {
  science: 'Science', math: 'Mathematics', commerce: 'Commerce',
  physics: 'Physics', chemistry: 'Chemistry', biology: 'Biology',
  humanities: 'Humanities', tech: 'Technology', general: 'General',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const label = BRANCH_LABELS[params.branch] ?? params.branch
  return {
    title:       `${label} Community — ${SITE.name}`,
    description: `Join discussions, ask questions and share answers in the ${label} community on MscTutor.in`,
    alternates:  { canonical: `${SITE.url}/community/${params.branch}` },
  }
}

export default async function CommunityBranchPage({ params }: Props) {
  const branch = params.branch
  const label  = BRANCH_LABELS[branch] ?? branch

  const comments = await prisma.comment.findMany({
    where:   { branch },
    include: { replies: true },
    orderBy: { createdAt: 'desc' },
    take:    50,
  })

  const branches = Object.entries(BRANCH_LABELS)

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', margin: '0 0 1rem' }}>{label} Community</h1>

      {/* Branch tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem', borderBottom: '1.5px solid #e5e7eb', paddingBottom: '1rem' }}>
        {branches.map(([b, l]) => (
          <a key={b} href={`/community/${b}`}
            style={{ padding: '0.5rem 1rem', borderRadius: 20, fontSize: 14, fontWeight: b === branch ? 700 : 400, background: b === branch ? '#1a3a6b' : '#f3f4f6', color: b === branch ? '#fff' : '#374151', textDecoration: 'none', border: 'none' }}>
            {l}
          </a>
        ))}
      </div>

      <div style={{ marginBottom: '1.5rem', fontSize: 14, color: '#6b7280' }}>
        {comments.length} discussion{comments.length !== 1 ? 's' : ''} in {label}
      </div>

      {/* Comment list */}
      {comments.map(c => (
        <div key={c.id} style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#e8eef8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1a3a6b', fontSize: 14 }}>
              {c.userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#111' }}>{c.userName}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>{new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
            </div>
            {c.rating && (
              <div style={{ marginLeft: 'auto', color: '#f59e0b', fontSize: 14 }}>{'★'.repeat(c.rating)}{'☆'.repeat(5 - c.rating)}</div>
            )}
          </div>
          <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.6, margin: 0 }}>{c.content}</p>
          {c.replies.length > 0 && (
            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #f3f4f6' }}>
              <div style={{ fontSize: 13, color: '#6b7280', marginBottom: '0.5rem' }}>{c.replies.length} {c.replies.length === 1 ? 'reply' : 'replies'}</div>
            </div>
          )}
        </div>
      ))}

      {comments.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          <div style={{ fontSize: 48 }}>💬</div>
          <p style={{ marginTop: '1rem' }}>No discussions yet in {label}. Be the first to start!</p>
        </div>
      )}

      <CommentSection branch={branch} />
    </main>
  )
}
