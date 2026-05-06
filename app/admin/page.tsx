import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getAdminFallbackOverview, hasDatabaseConfig } from '@/lib/dashboard-fallbacks'

export const metadata: Metadata = { title: 'Admin Dashboard - MscTutor' }

type RecentQuestion = {
  id: number
  title: string
  createdAt: Date
  subject: { name: string } | null
}

export default async function AdminPage() {
  const fallback = getAdminFallbackOverview()
  let questions = fallback.counts.questions
  let chapters = fallback.counts.chapters
  let users = fallback.counts.users
  let schools = fallback.counts.schools
  let recentQuestions = fallback.recentQuestions as RecentQuestion[]

  if (hasDatabaseConfig()) {
    try {
      const [questionCount, chapterCount, userCount, schoolCount, recentQuestionsRaw] = await Promise.all([
        prisma.question.count(),
        prisma.chapter.count(),
        prisma.user.count(),
        prisma.school.count(),
        prisma.question.findMany({
          orderBy: { createdAt: 'desc' },
          take: 5,
          include: { subject: { select: { name: true } } },
        }),
      ])

      questions = questionCount
      chapters = chapterCount
      users = userCount
      schools = schoolCount
      recentQuestions = recentQuestionsRaw as RecentQuestion[]
    } catch {
      recentQuestions = fallback.recentQuestions as RecentQuestion[]
    }
  }

  const stats = [
    { label: 'Total Questions', value: questions.toLocaleString(), color: '#1a3a6b', bg: '#e8eef8', href: '/admin/questions' },
    { label: 'Total Chapters', value: chapters.toLocaleString(), color: '#0a5e3f', bg: '#e8f5ef', href: '/admin/chapters' },
    { label: 'Total Users', value: users.toLocaleString(), color: '#7c3400', bg: '#fdf0e6', href: '/admin/users' },
    { label: 'Schools', value: schools.toLocaleString(), color: '#6b21a8', bg: '#f5f3ff', href: '/admin/schools' },
  ]

  const actions = [
    { label: 'AI Generate Full Subject', href: '/admin/content/add-chapter' },
    { label: 'Bulk Import Questions CSV', href: '/admin/content/bulk-import' },
    { label: 'Upload PDF to create pages', href: '/admin/content/upload-pdf' },
    { label: 'Add Subject', href: '/admin/content/add-subject' },
    { label: 'Storage & quota manager', href: '/admin/storage' },
    { label: 'View Sitemap', href: '/sitemap.xml' },
  ]

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>Dashboard Overview</h1>
      {!hasDatabaseConfig() && (
        <div style={{ marginBottom: '1rem', background: '#fff7ed', border: '1px solid #fdba74', color: '#9a3412', borderRadius: 12, padding: '0.85rem 1rem', fontSize: 13, fontWeight: 600 }}>
          Database env abhi configured nahi hai, isliye dashboard fallback catalog data dikha raha hai. Real records `DATABASE_URL` add hote hi load ho jayenge.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} style={{ textDecoration: 'none' }}>
            <div style={{ background: stat.bg, borderRadius: 14, padding: '1.25rem' }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: stat.color, fontWeight: 600, marginTop: 4 }}>{stat.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.25rem' }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#111', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            Recent Questions
            <Link href="/admin/questions" style={{ fontSize: 13, color: '#1a3a6b', fontWeight: 600 }}>View all</Link>
          </div>
          {recentQuestions.map((question: RecentQuestion) => (
            <div key={question.id} style={{ padding: '0.6rem 0', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ fontSize: 14, color: '#111', fontWeight: 500 }}>
                {question.title.slice(0, 60)}
                {question.title.length > 60 ? '...' : ''}
              </div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
                {question.subject?.name ?? 'General'} · {new Date(question.createdAt).toLocaleDateString('en-IN')}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.25rem' }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#111', marginBottom: '1rem' }}>Quick Actions</div>
          {actions.map((action) => (
            <Link key={action.href} href={action.href} style={{ display: 'block', padding: '0.7rem 1rem', marginBottom: '0.5rem', background: '#f9fafb', borderRadius: 10, textDecoration: 'none', fontSize: 14, fontWeight: 600, color: '#111' }}>
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
