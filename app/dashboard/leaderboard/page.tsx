'use client'
// app/dashboard/leaderboard/page.tsx
// Student's personal ranking and class leaderboard

import Link from 'next/link'

const MY_RANK   = { rank: 7, total: 38, score: 85, name: 'Rahul Kumar', class: '10-A' }
const CLASS_TOP = [
  { rank: 1, name: 'Priya S.',   score: 98, tests: 24, badge: '🥇' },
  { rank: 2, name: 'Ankit M.',   score: 95, tests: 20, badge: '🥈' },
  { rank: 3, name: 'Zara K.',    score: 92, tests: 18, badge: '🥉' },
  { rank: 4, name: 'Dev R.',     score: 89, tests: 22, badge: '⭐' },
  { rank: 5, name: 'Meena P.',   score: 87, tests: 17, badge: '⭐' },
  { rank: 6, name: 'Karan S.',   score: 86, tests: 19, badge: '⭐' },
  { rank: 7, name: 'Rahul K. ◀ YOU', score: 85, tests: 21, badge: '⭐', isMe: true },
  { rank: 8, name: 'Neha V.',    score: 83, tests: 15, badge: '⭐' },
  { rank: 9, name: 'Siddharth', score: 81, tests: 16, badge: '⭐' },
  { rank: 10, name: 'Anjali T.', score: 79, tests: 13, badge: '⭐' },
]

const SUBJECTS = [
  { name: 'Mathematics', rank: 3, score: 92, color: '#1a3a6b' },
  { name: 'Physics',     rank: 5, score: 88, color: '#0369a1' },
  { name: 'Chemistry',   rank: 8, score: 82, color: '#7c3aed' },
  { name: 'Biology',     rank: 4, score: 90, color: '#0a5e3f' },
]

export default function StudentLeaderboard() {
  const pct = Math.round(((MY_RANK.total - MY_RANK.rank + 1) / MY_RANK.total) * 100)

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fc', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
          <Link href="/dashboard" style={{ color: '#1a3a6b', textDecoration: 'none', fontSize: 14 }}>← Dashboard</Link>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: '#111', margin: 0 }}>🏆 My Rankings</h1>
            <p style={{ color: '#6b7280', fontSize: 14, margin: '4px 0 0' }}>Class 10-A performance leaderboard</p>
          </div>
        </div>

        {/* My Rank Card */}
        <div style={{ background: 'linear-gradient(135deg,#1a3a6b,#0e2347)', borderRadius: 20, padding: '1.75rem', marginBottom: '1.5rem', color: '#fff', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 42, fontWeight: 900 }}>#{MY_RANK.rank}</div>
            <div style={{ fontSize: 12, opacity: .75, marginTop: 4 }}>Class Rank</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 42, fontWeight: 900 }}>{MY_RANK.score}%</div>
            <div style={{ fontSize: 12, opacity: .75, marginTop: 4 }}>Avg Score</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 42, fontWeight: 900 }}>{pct}%</div>
            <div style={{ fontSize: 12, opacity: .75, marginTop: 4 }}>Top Percentile</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 42, fontWeight: 900 }}>6</div>
            <div style={{ fontSize: 12, opacity: .75, marginTop: 4 }}>Ranks to Top 1</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>

          {/* Class Leaderboard */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e5e7eb', fontWeight: 800, fontSize: 16 }}>
              🏅 Class 10-A Top 10
            </div>
            {CLASS_TOP.map((s) => (
              <div key={s.rank} style={{
                padding: '0.75rem 1.25rem', borderBottom: '1px solid #f3f4f6',
                display: 'flex', alignItems: 'center', gap: 10,
                background: (s as { isMe?: boolean }).isMe ? '#e8eef8' : 'transparent',
              }}>
                <div style={{ fontSize: 18, width: 28, textAlign: 'center' }}>{s.badge}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: (s as { isMe?: boolean }).isMe ? 800 : 600, fontSize: 14, color: (s as { isMe?: boolean }).isMe ? '#1a3a6b' : '#111' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>{s.tests} tests taken</div>
                </div>
                <div style={{ fontWeight: 900, fontSize: 15, color: s.score >= 90 ? '#16a34a' : '#374151' }}>{s.score}%</div>
              </div>
            ))}
          </div>

          {/* Subject-wise rankings */}
          <div>
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.25rem', marginBottom: '1rem' }}>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: '1rem' }}>📊 Subject Rankings</div>
              {SUBJECTS.map(sub => (
                <div key={sub.name} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{sub.name}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span style={{ fontSize: 11, background: '#e8eef8', color: '#1a3a6b', padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>Rank #{sub.rank}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: sub.score >= 90 ? '#16a34a' : '#374151' }}>{sub.score}%</span>
                    </div>
                  </div>
                  <div style={{ height: 8, background: '#f3f4f6', borderRadius: 4 }}>
                    <div style={{ height: '100%', width: `${sub.score}%`, background: sub.color, borderRadius: 4, transition: 'width 0.8s ease' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Motivation card */}
            <div style={{ background: 'linear-gradient(135deg,#e8f5ef,#dcfce7)', borderRadius: 16, border: '1.5px solid #bbf7d0', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎯</div>
              <div style={{ fontWeight: 800, fontSize: 15, color: '#065f46', marginBottom: 6 }}>You can reach Top 5!</div>
              <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, marginBottom: 12 }}>
                Improve by just <strong>2%</strong> in Math & Physics to move to Rank #5
              </div>
              <Link href="/mock-test" style={{ display: 'inline-block', background: '#0a5e3f', color: '#fff', padding: '8px 20px', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>
                📋 Practice Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
