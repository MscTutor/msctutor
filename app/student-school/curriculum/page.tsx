import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getAllUnifiedSubjects } from '@/lib/global-content'
import { hasDatabaseConfig } from '@/lib/dashboard-fallbacks'

export const metadata: Metadata = { title: 'Curriculum - Student' }

export default async function StudentCurriculumPage() {
  let subjects = getAllUnifiedSubjects().map((subject, index) => ({
    id: index + 1,
    icon: subject.icon,
    name: subject.name,
    slug: subject.slug,
    chapters: [],
  }))

  if (hasDatabaseConfig()) {
    try {
      subjects = await prisma.subject.findMany({
        where: { isActive: true },
        include: { chapters: { where: { isPublic: true }, orderBy: { order: 'asc' }, take: 5 } },
        orderBy: { order: 'asc' },
      })
    } catch {
      subjects = subjects
    }
  }

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>Study Curriculum</h1>
      {!hasDatabaseConfig() && (
        <div style={{ marginBottom: '1rem', background: '#fff7ed', border: '1px solid #fdba74', color: '#9a3412', borderRadius: 12, padding: '0.85rem 1rem', fontSize: 13, fontWeight: 600 }}>
          Student curriculum unified subject catalog se render ho raha hai. Database add hone par subject-specific chapter previews bhi yahin dikhenge.
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {subjects.map((subject) => (
          <div key={subject.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
              <span style={{ fontSize: 24 }}>{subject.icon ?? '📚'}</span>
              <Link href={`/subject/${subject.slug}`} style={{ fontWeight: 700, fontSize: 17, color: '#111', textDecoration: 'none' }}>{subject.name}</Link>
            </div>
            {subject.chapters.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {subject.chapters.map((chapter: any) => (
                  <Link key={chapter.id} href={`/subject/${subject.slug}/chapter/${chapter.slug}`} style={{ textDecoration: 'none', color: '#374151', fontSize: 14, padding: '0.4rem 0.75rem', borderRadius: 8, background: '#f9fafb' }}>
                    {chapter.order}. {chapter.title}
                  </Link>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7 }}>
                Open the subject page to see full class-wise chapter lists and topic pages.
              </div>
            )}
            <Link href={`/subject/${subject.slug}`} style={{ fontSize: 13, color: '#1a3a6b', fontWeight: 600, display: 'inline-block', marginTop: '0.5rem', textDecoration: 'none' }}>View all chapters →</Link>
          </div>
        ))}
      </div>
    </main>
  )
}
