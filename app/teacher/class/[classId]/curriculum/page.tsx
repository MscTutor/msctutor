import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getFallbackTeacherClassById, getFallbackTeacherCurriculum, hasDatabaseConfig } from '@/lib/dashboard-fallbacks'
import { getUnifiedClassCatalog } from '@/lib/global-content'

interface Props { params: { classId: string } }

export const metadata: Metadata = { title: 'Curriculum - Teacher' }

export default async function CurriculumPage({ params }: Props) {
  const fallbackClass = getFallbackTeacherClassById(params.classId)
  let classLevel = fallbackClass.classLevel
  let bySubject: Record<string, Array<{ id: number | string; title: string; subject?: { slug?: string } }>> = {}

  if (hasDatabaseConfig()) {
    try {
      const cls = await prisma.schoolClass.findUnique({ where: { id: parseInt(params.classId, 10) } })
      classLevel = cls?.classLevel ?? fallbackClass.classLevel
      const chapters = await prisma.chapter.findMany({
        where: { classLevel, isPublic: true },
        include: { subject: { select: { name: true, slug: true } } },
        orderBy: [{ subject: { name: 'asc' } }, { order: 'asc' }],
      })

      for (const chapter of chapters) {
        const key = chapter.subject?.name ?? 'Other'
        if (!bySubject[key]) bySubject[key] = []
        bySubject[key].push(chapter)
      }
    } catch {
      bySubject = {}
    }
  }

  if (!Object.keys(bySubject).length) {
    const fallbackCurriculum = getFallbackTeacherCurriculum(classLevel)
    for (const subject of fallbackCurriculum) {
      bySubject[subject.name] = subject.chapters.map((chapter) => ({
        id: chapter.id,
        title: chapter.title,
        subject: { slug: subject.slug },
      }))
    }
  }

  const chapterCount = Object.values(bySubject).reduce((sum, entries) => sum + entries.length, 0)
  const unifiedClass = getUnifiedClassCatalog(classLevel)

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      {!hasDatabaseConfig() && (
        <div style={{ marginBottom: '1rem', background: '#fff7ed', border: '1px solid #fdba74', color: '#9a3412', borderRadius: 12, padding: '0.85rem 1rem', fontSize: 13, fontWeight: 600 }}>
          Curriculum view unified syllabus fallback se chal rahi hai. Isse teacher bina database ke bhi class-wise chapter plan dekh sakta hai.
        </div>
      )}
      <nav style={{ fontSize: 13, color: '#6b7280', marginBottom: '1rem' }}>
        <Link href={`/teacher/class/${params.classId}`} style={{ color: '#1a3a6b' }}>← Back to Class</Link>
      </nav>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111', margin: '0 0 0.4rem' }}>Curriculum - Class {classLevel}</h1>
      <p style={{ color: '#6b7280', margin: '0 0 1.5rem' }}>
        {unifiedClass?.subjects.length ?? Object.keys(bySubject).length} subjects · {chapterCount} chapters
      </p>

      {Object.entries(bySubject).map(([subject, chapters]) => (
        <section key={subject} style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1a3a6b', margin: '0 0 0.75rem', padding: '0.4rem 0', borderBottom: '2px solid #e8eef8' }}>{subject}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {chapters.map((chapter, index) => (
              <div key={chapter.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10 }}>
                <span style={{ width: 28, height: 28, borderRadius: 6, background: '#e8eef8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#1a3a6b', flexShrink: 0 }}>{index + 1}</span>
                <span style={{ flex: 1, fontWeight: 500, color: '#111', fontSize: 14 }}>{chapter.title}</span>
                <Link href={`/teacher/class/${params.classId}/teach/${chapter.id}`} style={{ fontSize: 13, color: '#1a3a6b', fontWeight: 600, textDecoration: 'none', background: '#e8eef8', padding: '4px 12px', borderRadius: 20 }}>Teach →</Link>
              </div>
            ))}
          </div>
        </section>
      ))}

      {chapterCount === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          <div style={{ fontSize: 48 }}>📚</div>
          <p style={{ marginTop: '1rem' }}>No chapters found. Content will appear here as it is added.</p>
        </div>
      )}
    </main>
  )
}
