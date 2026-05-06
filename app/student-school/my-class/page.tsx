// app/student-school/my-class/page.tsx
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'My Class' }
export default function MyClassPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>My Class</h1>
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
        <div style={{ fontSize: 48 }}>🏫</div>
        <p style={{ marginTop: '1rem' }}>Your class details will appear here after your school admin adds you to a class.</p>
      </div>
    </main>
  )
}
