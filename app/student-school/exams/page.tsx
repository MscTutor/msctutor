// app/student-school/exams/page.tsx
'use client'
import Link from 'next/link'
export default function StudentExamsPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>Exams</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Link href="/exam/join" style={{ textDecoration: 'none' }}>
          <div style={{ background: '#1a3a6b', borderRadius: 16, padding: '1.75rem', color: '#fff', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: '0.5rem' }}>🔑</div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Join with Code</div>
            <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>Enter teacher's share code</div>
          </div>
        </Link>
        <Link href="/mock-test" style={{ textDecoration: 'none' }}>
          <div style={{ background: '#0a5e3f', borderRadius: 16, padding: '1.75rem', color: '#fff', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: '0.5rem' }}>📋</div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>AI Mock Test</div>
            <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>Practice with AI questions</div>
          </div>
        </Link>
      </div>
      <div style={{ marginTop: '1.5rem', background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem', textAlign: 'center', color: '#6b7280' }}>
        <div style={{ fontSize: 32 }}>📊</div>
        <p style={{ marginTop: '0.5rem', fontSize: 14 }}>Your exam history will appear here.</p>
        <Link href="/dashboard/my-tests" style={{ color: '#1a3a6b', fontWeight: 600, fontSize: 14 }}>View All Test Results →</Link>
      </div>
    </main>
  )
}
