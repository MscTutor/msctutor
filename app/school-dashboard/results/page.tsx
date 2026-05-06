import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { getAdminFallbackOverview, hasDatabaseConfig } from '@/lib/dashboard-fallbacks'

export const metadata: Metadata = { title: 'Exam Results - School Dashboard' }

export default async function ResultsPage() {
  const fallback = getAdminFallbackOverview().recentQuestions.map((question, index) => ({
    id: index + 1,
    userName: ['Aarav', 'Riya', 'Kabir', 'Neha', 'Ishita'][index] ?? `Student ${index + 1}`,
    exam: { title: `${question.subject?.name ?? 'General'} mock assessment` },
    score: 58 + index * 6,
    totalMarks: 100,
    percentage: 58 + index * 6,
    createdAt: new Date(Date.now() - index * 86400000),
  }))

  let attempts = fallback
  if (hasDatabaseConfig()) {
    try {
      attempts = await prisma.examAttempt.findMany({
        include: { exam: { select: { title: true, subjectId: true } } },
        orderBy: { createdAt: 'desc' },
        take: 50,
      })
    } catch {
      attempts = fallback
    }
  }

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', margin: '0 0 1.5rem' }}>Exam Results</h1>
      {!hasDatabaseConfig() && (
        <div style={{ marginBottom: '1rem', background: '#fff7ed', border: '1px solid #fdba74', color: '#9a3412', borderRadius: 12, padding: '0.85rem 1rem', fontSize: 13, fontWeight: 600 }}>
          School result board abhi demo data use kar raha hai. Live exam attempts DB setup ke baad yahi dikhengi.
        </div>
      )}
      {attempts.length === 0 ? <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>No exam results yet.</div> : (
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>{['Student', 'Exam', 'Score', 'Percentage', 'Date'].map((heading) => <th key={heading} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{heading}</th>)}</tr>
            </thead>
            <tbody>
              {attempts.map((attempt) => (
                <tr key={attempt.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem 1rem', fontSize: 14 }}>{attempt.userName}</td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: 14, color: '#6b7280' }}>{attempt.exam.title}</td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: 14, fontWeight: 600 }}>{attempt.score}/{attempt.totalMarks}</td>
                  <td style={{ padding: '0.75rem 1rem' }}><span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: attempt.percentage >= 60 ? '#dcfce7' : '#fee2e2', color: attempt.percentage >= 60 ? '#166534' : '#dc2626' }}>{Math.round(attempt.percentage)}%</span></td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: 13, color: '#9ca3af' }}>{new Date(attempt.createdAt).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
