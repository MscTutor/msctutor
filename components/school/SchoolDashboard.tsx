// components/school/SchoolDashboard.tsx — Principal overview

import Link from 'next/link'

interface Stats { classes: number; teachers: number; students: number; avgAttendance: number }
interface Props { schoolName: string; schoolCode: string; stats: Stats; plan: string }

export default function SchoolDashboard({ schoolName, schoolCode, stats, plan }: Props) {
  const TILES = [
    { label: 'Classes',          value: stats.classes,                 href: '/school-dashboard/classes',    color: '#1a3a6b', bg: '#e8eef8' },
    { label: 'Teachers',         value: stats.teachers,                href: '/school-dashboard/teachers',   color: '#0a5e3f', bg: '#e8f5ef' },
    { label: 'Students',         value: stats.students,                href: '/school-dashboard/students',   color: '#7c3400', bg: '#fdf0e6' },
    { label: 'Avg Attendance',   value: `${stats.avgAttendance}%`,     href: '/school-dashboard/attendance', color: '#6b21a8', bg: '#f5f3ff' },
  ]
  const QUICK = [
    { label: '+ Add Teacher',   href: '/school-dashboard/teachers',   bg: '#1a3a6b' },
    { label: '+ Add Student',   href: '/school-dashboard/students',   bg: '#0a5e3f' },
    { label: '📢 Send Notice',  href: '/school-dashboard/notices',    bg: '#7c3400' },
    { label: '📋 Create Exam',  href: '/teacher/class/1/exam',        bg: '#6b21a8' },
  ]

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: 0 }}>{schoolName}</h1>
          <div style={{ display: 'flex', gap: 10, marginTop: 6, alignItems: 'center' }}>
            <code style={{ background: '#e8eef8', color: '#1a3a6b', padding: '3px 10px', borderRadius: 8, fontSize: 14, fontWeight: 700 }}>{schoolCode}</code>
            <span style={{ fontSize: 12, background: '#f3f4f6', color: '#6b7280', padding: '3px 10px', borderRadius: 20, fontWeight: 600, textTransform: 'capitalize' }}>{plan} plan</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {TILES.map(t => (
          <Link key={t.label} href={t.href} style={{ textDecoration: 'none' }}>
            <div style={{ background: t.bg, borderRadius: 14, padding: '1.25rem', border: `1px solid ${t.color}22` }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: t.color }}>{t.value}</div>
              <div style={{ fontSize: 13, color: t.color, fontWeight: 600, marginTop: 4 }}>{t.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', margin: '0 0 0.75rem' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {QUICK.map(q => (
            <Link key={q.label} href={q.href}
              style={{ padding: '0.7rem 1.25rem', background: q.bg, color: '#fff', borderRadius: 10, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>
              {q.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
        {[
          { href: '/school-dashboard/attendance', emoji: '✅', label: 'Attendance' },
          { href: '/school-dashboard/results',    emoji: '📊', label: 'Results'    },
          { href: '/school-dashboard/notices',    emoji: '🔔', label: 'Notices'    },
          { href: '/school-dashboard/settings',   emoji: '⚙️', label: 'Settings'   },
        ].map(n => (
          <Link key={n.href} href={n.href} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{n.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{n.label}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
