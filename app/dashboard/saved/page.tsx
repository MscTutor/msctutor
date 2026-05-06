'use client'
// app/dashboard/saved/page.tsx

import Link from 'next/link'

export default function SavedPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>Saved Questions</h1>
      <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280', background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb' }}>
        <div style={{ fontSize: 48 }}>🔖</div>
        <p style={{ marginTop: '1rem' }}>Bookmark questions to save them here.</p>
        <Link href="/ask" style={{ display: 'inline-block', marginTop: '1rem', background: '#1a3a6b', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: 10, textDecoration: 'none', fontWeight: 700 }}>
          Ask a Question
        </Link>
      </div>
    </main>
  )
}
