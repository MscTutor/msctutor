import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getAdminFallbackOverview, hasDatabaseConfig } from '@/lib/dashboard-fallbacks'

export const metadata: Metadata = { title: 'Questions - Admin' }

type AdminQuestion = {
  id: number
  slug: string
  title: string
  views: number
  source: string
  createdAt: Date
  subject: { name: string } | null
}

export default async function AdminQuestionsPage() {
  const fallback = getAdminFallbackOverview()
  let questions = fallback.recentQuestions as AdminQuestion[]

  if (hasDatabaseConfig()) {
    try {
      questions = await prisma.question.findMany({
        include: { subject: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }) as AdminQuestion[]
    } catch {
      questions = fallback.recentQuestions as AdminQuestion[]
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111', margin: 0 }}>Questions ({questions.length})</h1>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a href="/admin/content/bulk-import" style={{ background: '#f3f4f6', color: '#111', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '0.65rem 1.1rem', fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>Bulk Import</a>
          <a href="/admin/content/add-question" style={{ background: '#1a3a6b', color: '#fff', borderRadius: 10, padding: '0.65rem 1.1rem', fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>+ Add Question</a>
        </div>
      </div>
      {!hasDatabaseConfig() && (
        <div style={{ marginBottom: '1rem', background: '#fff7ed', border: '1px solid #fdba74', color: '#9a3412', borderRadius: 12, padding: '0.85rem 1rem', fontSize: 13, fontWeight: 600 }}>
          Real question table database ke bina available nahi hai. Abhi demo fallback entries dikh rahi hain.
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              {['Question', 'Subject', 'Views', 'Source', 'Date'].map((heading) => (
                <th key={heading} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#374151', borderBottom: '1px solid #e5e7eb' }}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {questions.map((question: AdminQuestion) => (
              <tr key={question.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '0.75rem 1rem', maxWidth: 300 }}>
                  <Link href={`/question/${question.slug}`} target="_blank" style={{ fontWeight: 600, fontSize: 14, color: '#1a3a6b', textDecoration: 'none' }}>
                    {question.title.slice(0, 60)}
                    {question.title.length > 60 ? '...' : ''}
                  </Link>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: 13, color: '#6b7280' }}>{question.subject?.name ?? 'General'}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: 13 }}>{question.views}</td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: question.source === 'ai' ? '#e8eef8' : '#dcfce7', color: question.source === 'ai' ? '#1a3a6b' : '#166534', fontWeight: 700, textTransform: 'uppercase' }}>
                    {question.source}
                  </span>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: 12, color: '#9ca3af' }}>{new Date(question.createdAt).toLocaleDateString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
