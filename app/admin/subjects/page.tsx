import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { getAdminFallbackOverview, hasDatabaseConfig } from '@/lib/dashboard-fallbacks'

export const metadata: Metadata = { title: 'Subjects - Admin' }

type AdminSubject = {
  id: number
  icon: string | null
  name: string
  slug: string
  isActive: boolean
  _count: {
    chapters: number
    questions: number
  }
}

export default async function AdminSubjectsPage() {
  const fallback = getAdminFallbackOverview()
  let subjects = fallback.subjects as AdminSubject[]

  if (hasDatabaseConfig()) {
    try {
      subjects = await prisma.subject.findMany({
        include: { _count: { select: { chapters: true, questions: true } } },
        orderBy: { order: 'asc' },
      }) as AdminSubject[]
    } catch {
      subjects = fallback.subjects as AdminSubject[]
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111', margin: 0 }}>Subjects ({subjects.length})</h1>
        <a href="/admin/content/add-subject" style={{ background: '#1a3a6b', color: '#fff', borderRadius: 10, padding: '0.7rem 1.25rem', fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>+ Add Subject</a>
      </div>
      {!hasDatabaseConfig() && (
        <div style={{ marginBottom: '1rem', background: '#fff7ed', border: '1px solid #fdba74', color: '#9a3412', borderRadius: 12, padding: '0.85rem 1rem', fontSize: 13, fontWeight: 600 }}>
          Subject table unified syllabus catalog se aa rahi hai kyunki database env abhi add nahi hua.
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              {['Icon', 'Name', 'Slug', 'Chapters', 'Questions', 'Status'].map((heading) => (
                <th key={heading} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject: AdminSubject) => (
              <tr key={subject.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '0.75rem 1rem', fontSize: 20 }}>{subject.icon ?? '📚'}</td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#111', fontSize: 14 }}>{subject.name}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: 13, color: '#6b7280', fontFamily: 'monospace' }}>{subject.slug}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: 14 }}>{subject._count.chapters}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: 14 }}>{subject._count.questions}</td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, fontWeight: 700, background: subject.isActive ? '#dcfce7' : '#f3f4f6', color: subject.isActive ? '#166534' : '#6b7280' }}>
                    {subject.isActive ? 'Active' : 'Hidden'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
