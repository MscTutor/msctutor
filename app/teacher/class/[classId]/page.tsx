import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getFallbackTeacherClassById, hasDatabaseConfig } from '@/lib/dashboard-fallbacks'

interface Props { params: { classId: string } }

export const metadata: Metadata = { title: 'Class Overview - Teacher' }

export default async function TeacherClassPage({ params }: Props) {
  const fallback = getFallbackTeacherClassById(params.classId)
  let cls: {
    id: number
    name: string
    classLevel: string
    students: Array<{ id: number }>
    attendance: Array<{ status: string }>
  } | null = {
    id: fallback.id,
    name: fallback.name,
    classLevel: fallback.classLevel,
    students: Array.from({ length: fallback.studentCount }, (_, index) => ({ id: index + 1 })),
    attendance: Array.from({ length: fallback.todayPresent }, () => ({ status: 'present' })),
  }

  if (hasDatabaseConfig()) {
    try {
      cls = await prisma.schoolClass.findUnique({
        where: { id: parseInt(params.classId, 10) },
        include: {
          students: { select: { id: true } },
          attendance: {
            where: { date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
            select: { status: true },
          },
        },
      })
    } catch {
      cls = {
        id: fallback.id,
        name: fallback.name,
        classLevel: fallback.classLevel,
        students: Array.from({ length: fallback.studentCount }, (_, index) => ({ id: index + 1 })),
        attendance: Array.from({ length: fallback.todayPresent }, () => ({ status: 'present' })),
      }
    }
  }

  const tools = [
    { label: 'Curriculum', href: `/teacher/class/${params.classId}/curriculum` },
    { label: 'Teach Mode', href: `/teacher/class/${params.classId}/teach/1` },
    { label: 'Attendance', href: `/teacher/class/${params.classId}/attendance` },
    { label: 'Homework', href: `/teacher/class/${params.classId}/homework` },
    { label: 'Exam', href: `/teacher/class/${params.classId}/exam` },
    { label: 'Live Class', href: `/teacher/class/${params.classId}/live` },
  ]

  if (!cls) return <div style={{ padding: '2rem', color: '#dc2626' }}>Class not found.</div>

  const todayPresent = cls.attendance.filter((item) => item.status === 'present').length

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      {!hasDatabaseConfig() && (
        <div style={{ marginBottom: '1rem', background: '#fff7ed', border: '1px solid #fdba74', color: '#9a3412', borderRadius: 12, padding: '0.85rem 1rem', fontSize: 13, fontWeight: 600 }}>
          Teacher class overview demo mode me hai. Real attendance aur student roster database ke saath sync hoga.
        </div>
      )}
      <nav style={{ fontSize: 13, color: '#6b7280', marginBottom: '1rem' }}><Link href="/teacher/my-classes" style={{ color: '#1a3a6b' }}>My Classes</Link> › {cls.name}</nav>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: '0 0 0.5rem' }}>{cls.name}</h1>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>{cls.students.length} students · Today: {todayPresent} present</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 14, padding: '1.5rem', textAlign: 'center', fontSize: 16, fontWeight: 600, color: '#111', transition: 'border-color 0.15s' }}>
              {tool.label}
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
