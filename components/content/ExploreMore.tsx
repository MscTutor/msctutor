// components/content/ExploreMore.tsx — Category-wise related content links

import Link from 'next/link'

interface Item  { label: string; href: string; emoji?: string }
interface Group { category: string; items: Item[] }
interface Props { groups: Group[] }

export default function ExploreMore({ groups }: Props) {
  if (!groups.length) return null
  return (
    <div style={{ background: '#f9fafb', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.25rem', marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111', margin: '0 0 1rem' }}>🔍 Explore More</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {groups.map(g => (
          <div key={g.category}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: '0.5rem' }}>{g.category}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {g.items.map(item => (
                <Link key={item.href} href={item.href}
                  style={{ fontSize: 14, color: '#1a3a6b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {item.emoji && <span>{item.emoji}</span>}
                  <span style={{ borderBottom: '1px dotted #93c5fd' }}>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
