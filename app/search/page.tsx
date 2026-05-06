import type { Metadata } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Search — MscTutor',
  description: 'Search questions, chapters, formulas across all subjects.',
  robots: { index: false },
}

interface Props { searchParams: { q?: string } }

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams.q?.trim() ?? ''
  let results: any[] = []

  if (query.length >= 2) {
    try {
      results = await prisma.question.findMany({
        where: {
          isPublic: true,
          OR: [
            { title:    { contains: query } },
            { solution: { contains: query } },
          ],
        },
        include: { subject: { select: { name: true, slug: true, color: true } } },
        take:    20,
        orderBy: { views: 'desc' },
      })
    } catch { /* DB not configured yet */ }
  }

  return (
    <div className="max-w-[800px] mx-auto px-5 py-10">
      <h1 className="font-head text-[24px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] mb-2">
        {query ? `Search results for "${query}"` : 'Search'}
      </h1>

      {query && (
        <p className="text-[13.5px] text-[#5a6a8a] mb-6">
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </p>
      )}

      {!query && (
        <p className="text-[14px] text-[#5a6a8a] mb-6">
          Search bar mein kuch likhke Enter dabao ya{' '}
          <Link href="/ask" className="text-primary-600 hover:underline">AI se seedha poochho →</Link>
        </p>
      )}

      {results.length > 0 ? (
        <div className="space-y-3">
          {results.map(q => (
            <Link
              key={q.id}
              href={`/question/${q.slug}`}
              className="block bg-white dark:bg-[#111827] rounded-[18px] p-5 border border-[#dde5f5] dark:border-[#1e2d4a] hover:border-primary-600 hover:-translate-y-0.5 hover:shadow-card transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    {q.subject && (
                      <span className="text-[11.5px] font-bold px-2.5 py-0.5 rounded-full text-white" style={{ background: q.subject.color ?? '#1a3a6b' }}>
                        {q.subject.name}
                      </span>
                    )}
                    {q.classLevel && <span className="text-[11.5px] text-[#5a6a8a]">Class {q.classLevel}</span>}
                    <span className="text-[11.5px] text-[#5a6a8a] ml-auto">👁 {q.views}</span>
                  </div>
                  <div className="text-[14.5px] font-semibold text-[#0f1f3d] dark:text-[#e8eeff] leading-snug line-clamp-2">{q.title}</div>
                  <div className="text-[13px] text-[#5a6a8a] mt-1 line-clamp-2">{q.solution.substring(0, 120)}...</div>
                </div>
                <span className="text-primary-600 flex-shrink-0 mt-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      ) : query.length >= 2 ? (
        <div className="text-center py-14">
          <div className="text-[48px] mb-3">🔍</div>
          <p className="text-[15px] text-[#5a6a8a] mb-2">"{query}" ke liye koi result nahi mila</p>
          <p className="text-[13.5px] text-[#5a6a8a] mb-6">AI se seedha poochho — turant answer milega</p>
          <Link
            href={`/ask?q=${encodeURIComponent(query)}`}
            className="inline-flex items-center gap-2 bg-primary-600 text-white rounded-xl px-6 py-3 font-head font-bold text-[14px] hover:opacity-90 transition"
          >
            🤖 AI se Poochho →
          </Link>
        </div>
      ) : null}
    </div>
  )
}
