import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { getAdminFallbackOverview, hasDatabaseConfig } from '@/lib/dashboard-fallbacks'

export const metadata: Metadata = { title: 'Schools - Admin' }

type AdminSchool = {
  id: number
  name: string
  code: string
  city: string | null
  board: string | null
  plan: string
  isVerified: boolean
  _count: {
    teachers: number
    students: number
  }
}

export default async function AdminSchoolsPage() {
  const fallback = getAdminFallbackOverview()
  let schools = fallback.schools as AdminSchool[]

  if (hasDatabaseConfig()) {
    try {
      schools = await prisma.school.findMany({
        include: { _count: { select: { teachers: true, students: true } } },
        orderBy: { createdAt: 'desc' },
      }) as AdminSchool[]
    } catch {
      schools = fallback.schools as AdminSchool[]
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>Schools ({schools.length})</h1>
      {!hasDatabaseConfig() && (
        <div style={{ marginBottom: '1rem', background: '#fff7ed', border: '1px solid #fdba74', color: '#9a3412', borderRadius: 12, padding: '0.85rem 1rem', fontSize: 13, fontWeight: 600 }}>
          School management view fallback demo data use kar raha hai. Real registrations env setup ke baad sync hongi.
        </div>
      )}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              {['School', 'Code', 'City', 'Board', 'Teachers', 'Students', 'Plan', 'Verified'].map((heading) => (
                <th key={heading} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schools.map((school: AdminSchool) => (
              <tr key={school.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 600, fontSize: 14, color: '#111' }}>{school.name}</td>
                <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontSize: 13, color: '#1a3a6b', fontWeight: 700 }}>{school.code}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: 13, color: '#6b7280' }}>{school.city ?? '—'}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: 13 }}>{school.board ?? '—'}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: 13 }}>{school._count.teachers}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: 13 }}>{school._count.students}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: 12 }}>
                  <span style={{ background: '#e8eef8', color: '#1a3a6b', padding: '2px 8px', borderRadius: 20, fontWeight: 700, textTransform: 'capitalize' }}>{school.plan}</span>
                </td>
                <td style={{ padding: '0.75rem 1rem' }}><span style={{ fontSize: 14 }}>{school.isVerified ? '✓' : '⌛'}</span></td>
              </tr>
            ))}
            {schools.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>No schools registered yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
