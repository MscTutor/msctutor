import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getFallbackTeacherClasses, hasDatabaseConfig } from '@/lib/dashboard-fallbacks'

export const metadata: Metadata = { title: 'My Classes - Teacher' }

export default async function MyClassesPage() {
  const fallbackClasses = getFallbackTeacherClasses().map((item) => ({
    id: item.id,
    classLevel: item.classLevel,
    section: item.section,
    name: item.name,
  }))

  let classes = fallbackClasses

  if (hasDatabaseConfig()) {
    try {
      classes = await prisma.schoolClass.findMany({ take: 20, orderBy: { classLevel: 'asc' } })
    } catch {
      classes = fallbackClasses
    }
  }

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>My Classes</h1>
      {!hasDatabaseConfig() && (
        <div style={{ marginBottom: '1rem', background: '#fff7ed', border: '1px solid #fdba74', color: '#9a3412', borderRadius: 12, padding: '0.85rem 1rem', fontSize: 13, fontWeight: 600 }}>
          Demo class list dikh rahi hai. School env connect hote hi assigned classes automatically load hongi.
        </div>
      )}
      {classes.length === 0 ? <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>No classes assigned yet. Contact your school admin.</div> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {classes.map((item) => (
            <Link key={item.id} href={`/teacher/class/${item.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: '#1a3a6b' }}>Class {item.classLevel}-{item.section}</div>
                <div style={{ fontSize: 13, color: '#6b7280', marginTop: 8 }}>{item.name}</div>
                <div style={{ marginTop: '1rem', fontSize: 13, color: '#1a3a6b', fontWeight: 600 }}>Open →</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
