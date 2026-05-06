import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { getAdminFallbackOverview, hasDatabaseConfig } from '@/lib/dashboard-fallbacks'

export const metadata: Metadata = { title: 'Analytics - Admin' }

type TopQuestion = {
  slug: string
  title: string
  views: number
  subject: { name: string } | null
}

type RecentUser = {
  name: string
  plan: string
  createdAt: Date
}

export default async function AdminAnalyticsPage() {
  const fallback = getAdminFallbackOverview()
  let totalQ = fallback.counts.questions
  let totalUsers = fallback.counts.users
  let totalSchools = fallback.counts.schools
  let totalExams = fallback.counts.examAttempts
  let topQuestions = fallback.topQuestions as TopQuestion[]
  let recentUsers = fallback.recentUsers as RecentUser[]

  if (hasDatabaseConfig()) {
    try {
      const [questionCount, userCount, schoolCount, examCount, topQuestionsRaw, recentUsersRaw] = await Promise.all([
        prisma.question.count(),
        prisma.user.count(),
        prisma.school.count(),
        prisma.examAttempt.count(),
        prisma.question.findMany({
          orderBy: { views: 'desc' },
          take: 5,
          select: { slug: true, title: true, views: true, subject: { select: { name: true } } },
        }),
        prisma.user.findMany({
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: { name: true, plan: true, createdAt: true },
        }),
      ])

      totalQ = questionCount
      totalUsers = userCount
      totalSchools = schoolCount
      totalExams = examCount
      topQuestions = topQuestionsRaw as TopQuestion[]
      recentUsers = recentUsersRaw as RecentUser[]
    } catch {
      topQuestions = fallback.topQuestions as TopQuestion[]
      recentUsers = fallback.recentUsers as RecentUser[]
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>Analytics</h1>
      {!hasDatabaseConfig() && (
        <div style={{ marginBottom: '1rem', background: '#fff7ed', border: '1px solid #fdba74', color: '#9a3412', borderRadius: 12, padding: '0.85rem 1rem', fontSize: 13, fontWeight: 600 }}>
          Live analytics ke liye database env chahiye. Abhi yeh fallback platform metrics dikha raha hai.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Questions', value: totalQ },
          { label: 'Users', value: totalUsers },
          { label: 'Schools', value: totalSchools },
          { label: 'Exam Attempts', value: totalExams },
        ].map((item) => (
          <div key={item.label} style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#1a3a6b' }}>{item.value.toLocaleString()}</div>
            <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>{item.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1.25rem' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', margin: '0 0 1rem' }}>Top Questions by Views</h2>
          {topQuestions.map((question: TopQuestion, index: number) => (
            <div key={question.slug} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.6rem 0', borderBottom: '1px solid #f3f4f6' }}>
              <span style={{ width: 22, height: 22, background: '#e8eef8', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#1a3a6b', flexShrink: 0 }}>
                {index + 1}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{question.title}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{question.subject?.name ?? 'General'}</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#1a3a6b', flexShrink: 0 }}>{question.views} views</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '1.25rem' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', margin: '0 0 1rem' }}>Recent Signups</h2>
          {recentUsers.map((user: RecentUser, index: number) => (
            <div key={`${user.name}-${index}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #f3f4f6' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{user.name}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{new Date(user.createdAt).toLocaleDateString('en-IN')}</div>
              </div>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: '#f3f4f6', color: '#6b7280', fontWeight: 700, textTransform: 'capitalize' }}>{user.plan}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
