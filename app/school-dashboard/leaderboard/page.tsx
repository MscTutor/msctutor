'use client'
// app/school-dashboard/leaderboard/page.tsx
// School-wide leaderboard — top students by score

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Student {
  rank: number
  name: string
  class: string
  score: number
  tests: number
  badge: string
}

const MOCK_DATA: Student[] = [
  { rank: 1, name: 'Priya Sharma',   class: '10-A', score: 98, tests: 24, badge: '🥇' },
  { rank: 2, name: 'Rahul Gupta',    class: '10-B', score: 95, tests: 22, badge: '🥈' },
  { rank: 3, name: 'Sneha Patel',    class: '9-A',  score: 93, tests: 20, badge: '🥉' },
  { rank: 4, name: 'Arjun Singh',    class: '12-A', score: 91, tests: 18, badge: '⭐' },
  { rank: 5, name: 'Kavya Reddy',    class: '11-B', score: 89, tests: 19, badge: '⭐' },
  { rank: 6, name: 'Amit Kumar',     class: '10-A', score: 87, tests: 17, badge: '⭐' },
  { rank: 7, name: 'Pooja Verma',    class: '9-B',  score: 85, tests: 21, badge: '⭐' },
  { rank: 8, name: 'Rohan Mehta',    class: '12-B', score: 83, tests: 16, badge: '⭐' },
  { rank: 9, name: 'Divya Nair',     class: '11-A', score: 81, tests: 15, badge: '⭐' },
  { rank: 10, name: 'Vikram Joshi',  class: '10-B', score: 79, tests: 14, badge: '⭐' },
]

export default function SchoolLeaderboard() {
  const [filter, setFilter] = useState('all')
  const [period, setPeriod] = useState('month')

  const classes = ['all', '9-A', '9-B', '10-A', '10-B', '11-A', '11-B', '12-A', '12-B']

  const filtered = filter === 'all'
    ? MOCK_DATA
    : MOCK_DATA.filter(s => s.class === filter)

  const rankColor = (r: number) => {
    if (r === 1) return { bg: '#fef3c7', color: '#92400e', border: '#fde68a' }
    if (r === 2) return { bg: '#f3f4f6', color: '#374151', border: '#d1d5db' }
    if (r === 3) return { bg: '#fff7ed', color: '#9a3412', border: '#fed7aa' }
    return { bg: '#f9fafb', color: '#6b7280', border: '#e5e7eb' }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fc', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
          <Link href="/school-dashboard" style={{ color: '#1a3a6b', textDecoration: 'none', fontSize: 14 }}>← Back</Link>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: '#111', margin: 0 }}>🏆 School Leaderboard</h1>
            <p style={{ color: '#6b7280', fontSize: 14, margin: '4px 0 0' }}>Top performing students this month</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 4, background: '#fff', borderRadius: 12, padding: 4, border: '1px solid #e5e7eb' }}>
            {['week', 'month', 'year'].map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                style={{ padding: '6px 14px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', background: period === p ? '#1a3a6b' : 'transparent', color: period === p ? '#fff' : '#6b7280' }}>
                {p === 'week' ? 'This Week' : p === 'month' ? 'This Month' : 'This Year'}
              </button>
            ))}
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)}
            style={{ padding: '8px 14px', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 13, background: '#fff', fontFamily: 'inherit', fontWeight: 600 }}>
            {classes.map(c => <option key={c} value={c}>{c === 'all' ? 'All Classes' : `Class ${c}`}</option>)}
          </select>
        </div>

        {/* Top 3 Podium */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* 2nd place */}
          <div style={{ background: '#fff', borderRadius: 16, border: '2px solid #d1d5db', padding: '1.25rem', textAlign: 'center', marginTop: '1.5rem' }}>
            <div style={{ fontSize: 40 }}>🥈</div>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#111', margin: '8px 0 4px' }}>{MOCK_DATA[1]?.name}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>Class {MOCK_DATA[1]?.class}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#374151', marginTop: 8 }}>{MOCK_DATA[1]?.score}%</div>
          </div>
          {/* 1st place */}
          <div style={{ background: 'linear-gradient(135deg,#fef3c7,#fde68a)', borderRadius: 16, border: '2px solid #f59e0b', padding: '1.5rem', textAlign: 'center', boxShadow: '0 4px 20px rgba(245,158,11,.3)' }}>
            <div style={{ fontSize: 48 }}>🥇</div>
            <div style={{ fontWeight: 900, fontSize: 16, color: '#111', margin: '8px 0 4px' }}>{MOCK_DATA[0]?.name}</div>
            <div style={{ fontSize: 12, color: '#92400e' }}>Class {MOCK_DATA[0]?.class}</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#92400e', marginTop: 8 }}>{MOCK_DATA[0]?.score}%</div>
            <div style={{ fontSize: 11, color: '#78350f', marginTop: 4 }}>🏆 Top Student</div>
          </div>
          {/* 3rd place */}
          <div style={{ background: '#fff', borderRadius: 16, border: '2px solid #fed7aa', padding: '1.25rem', textAlign: 'center', marginTop: '2rem' }}>
            <div style={{ fontSize: 36 }}>🥉</div>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#111', margin: '8px 0 4px' }}>{MOCK_DATA[2]?.name}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>Class {MOCK_DATA[2]?.class}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#9a3412', marginTop: 8 }}>{MOCK_DATA[2]?.score}%</div>
          </div>
        </div>

        {/* Full Rankings */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e5e7eb', display: 'grid', gridTemplateColumns: '50px 1fr 80px 80px 80px', gap: 8, fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: .5 }}>
            <div>Rank</div><div>Student</div><div style={{ textAlign: 'center' }}>Score</div><div style={{ textAlign: 'center' }}>Tests</div><div style={{ textAlign: 'center' }}>Class</div>
          </div>
          {filtered.map((s) => {
            const rc = rankColor(s.rank)
            return (
              <div key={s.rank} style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid #f9fafb', display: 'grid', gridTemplateColumns: '50px 1fr 80px 80px 80px', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: rc.bg, border: `1.5px solid ${rc.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: rc.color, fontSize: 14 }}>
                  {s.rank <= 3 ? s.badge : `#${s.rank}`}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#111' }}>{s.name}</div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontWeight: 900, fontSize: 16, color: s.score >= 90 ? '#16a34a' : s.score >= 75 ? '#d97706' : '#dc2626' }}>{s.score}%</span>
                </div>
                <div style={{ textAlign: 'center', fontSize: 13, color: '#6b7280', fontWeight: 600 }}>{s.tests} tests</div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ background: '#e8eef8', color: '#1a3a6b', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20 }}>{s.class}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Export button */}
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button style={{ padding: '10px 20px', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            📥 Export as CSV
          </button>
        </div>
      </div>
    </div>
  )
}
