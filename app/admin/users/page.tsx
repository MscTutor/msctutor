import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { getAdminFallbackOverview, hasDatabaseConfig } from '@/lib/dashboard-fallbacks'

export const metadata: Metadata = { title: 'Users - Admin' }

type AdminUser = {
  id: number
  name: string
  email: string | null
  role: string
  plan: string
  credits: number
  createdAt: Date
}

export default async function AdminUsersPage() {
  const fallback = getAdminFallbackOverview()
  let users = fallback.users as AdminUser[]

  if (hasDatabaseConfig()) {
    try {
      users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      }) as AdminUser[]
    } catch {
      users = fallback.users as AdminUser[]
    }
  }

  const planColors: Record<string, { bg: string; color: string }> = {
    free: { bg: '#f3f4f6', color: '#6b7280' },
    starter: { bg: '#e8eef8', color: '#1a3a6b' },
    basic: { bg: '#f5f3ff', color: '#6b21a8' },
    pro: { bg: '#fee2e2', color: '#dc2626' },
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>Users ({users.length})</h1>
      {!hasDatabaseConfig() && (
        <div style={{ marginBottom: '1rem', background: '#fff7ed', border: '1px solid #fdba74', color: '#9a3412', borderRadius: 12, padding: '0.85rem 1rem', fontSize: 13, fontWeight: 600 }}>
          Demo user list dikh rahi hai. Real signups database connect hone ke baad yahin populate honge.
        </div>
      )}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              {['Name', 'Email', 'Role', 'Plan', 'Credits', 'Joined'].map((heading) => (
                <th key={heading} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user: AdminUser) => {
              const badgeColors = planColors[user.plan] ?? planColors.free
              return (
                <tr key={user.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600, fontSize: 14, color: '#111' }}>{user.name}</td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: 13, color: '#6b7280' }}>{user.email ?? '—'}</td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: 12, color: '#374151', textTransform: 'capitalize' }}>{user.role.replace('_', ' ')}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 20, fontWeight: 700, textTransform: 'capitalize', ...badgeColors }}>{user.plan}</span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: 13 }}>{user.credits}</td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: 12, color: '#9ca3af' }}>{new Date(user.createdAt).toLocaleDateString('en-IN')}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
