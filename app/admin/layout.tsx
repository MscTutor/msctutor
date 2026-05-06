// app/admin/layout.tsx — Admin auth guard

import type { ReactNode } from 'react'
import Link               from 'next/link'

const NAV = [
  { href: '/admin',               label: '📊 Overview'  },
  { href: '/admin/subjects',      label: '📚 Subjects'  },
  { href: '/admin/chapters',      label: '📖 Chapters'  },
  { href: '/admin/questions',     label: '❓ Questions' },
  { href: '/admin/users',         label: '👥 Users'     },
  { href: '/admin/schools',       label: '🏫 Schools'   },
  { href: '/admin/analytics',     label: '📈 Analytics' },
  { href: '/admin/content',       label: '✍️ Content'   },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: '#111827', color: '#fff', flexShrink: 0, padding: '1.5rem 0' }}>
        <div style={{ padding: '0 1.25rem 1.5rem', borderBottom: '1px solid #ffffff22' }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: '#fff' }}>MscTutor</div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>Admin Panel</div>
        </div>
        <nav style={{ marginTop: '1rem' }}>
          {NAV.map(n => (
            <Link key={n.href} href={n.href}
              style={{ display: 'block', padding: '0.7rem 1.25rem', color: '#d1d5db', textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'background 0.1s' }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div style={{ position: 'absolute', bottom: '1.5rem', left: 0, width: 220, padding: '0 1.25rem' }}>
          <Link href="/" style={{ color: '#9ca3af', fontSize: 13, textDecoration: 'none' }}>← Back to site</Link>
        </div>
      </aside>
      {/* Content */}
      <main style={{ flex: 1, background: '#f9fafb', overflow: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
