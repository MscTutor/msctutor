// components/layout/Breadcrumb.tsx

import Link from 'next/link'

interface Crumb { label: string; href?: string }
interface Props  { crumbs: Crumb[] }

export default function Breadcrumb({ crumbs }: Props) {
  return (
    <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6b7280', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
      {crumbs.map((c, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {i > 0 && <span style={{ color: '#d1d5db' }}>›</span>}
          {c.href ? (
            <Link href={c.href} style={{ color: '#1a3a6b', textDecoration: 'none', fontWeight: 500 }}>{c.label}</Link>
          ) : (
            <span style={{ color: '#9ca3af' }}>{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
