import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { getFreeImage } from '@/lib/free-images'
import CommentSection from '@/components/comments/CommentSection'
import { qaPageSchema } from '@/lib/seo'
import { SITE } from '@/lib/constants'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const question = await getQuestion(params.slug)
  if (!question) return { title: 'Question Not Found' }
  return {
    title:       question.metaTitle ?? `${question.title.substring(0, 60)} — MscTutor`,
    description: question.metaDesc ?? question.solution.substring(0, 155),
    keywords:    question.metaKeywords ?? `${question.subject?.name ?? ''} NCERT solution class ${question.classLevel}`,
    openGraph: {
      title:       question.metaTitle ?? question.title.substring(0, 60),
      description: question.metaDesc ?? question.solution.substring(0, 155),
      type:        'article',
      url:         `${SITE.url}/question/${question.slug}`,
    },
    alternates: { canonical: `${SITE.url}/question/${question.slug}` },
  }
}

async function getQuestion(slug: string) {
  try {
    const q = await prisma.question.findUnique({
      where: { slug, isPublic: true },
      include: { subject: true, chapter: true },
    })
    if (q) await prisma.question.update({ where: { id: q.id }, data: { views: { increment: 1 } } })
    return q
  } catch { return null }
}

export default async function QuestionPage({ params }: { params: { slug: string } }) {
  const question = await getQuestion(params.slug)
  if (!question) notFound()

  const steps  = question.steps ? JSON.parse(question.steps) : []
  const branch = question.subject?.branch ?? 'general'

  // Fetch free diagram if available
  let diagram = null
  try {
    if (question.subject?.name) {
      diagram = await getFreeImage(question.title.substring(0, 50), question.subject.name)
    }
  } catch { /* silent */ }

  const schema = qaPageSchema(question.title, question.solution, `${SITE.url}/question/${question.slug}`)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-[1100px] mx-auto px-5 py-8">
        {/* Breadcrumb */}
        <nav className="text-[12.5px] text-[#5a6a8a] mb-5 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-primary-600">Home</Link><span>/</span>
          {question.subject && <><Link href={`/subject/${question.subject.slug}`} className="hover:text-primary-600">{question.subject.name}</Link><span>/</span></>}
          <span className="text-[#0f1f3d] dark:text-[#e8eeff] font-medium line-clamp-1">{question.title.substring(0, 50)}...</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-7">
          {/* Main */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Question */}
            <div className="bg-white dark:bg-[#111827] rounded-[20px] p-6 border border-[#dde5f5] dark:border-[#1e2d4a] shadow-card">
              <div className="flex flex-wrap gap-2 mb-4">
                {question.subject && <span className="bg-primary-600/10 text-primary-600 rounded-full px-3 py-1 text-[12px] font-bold">{question.subject.name}</span>}
                {question.classLevel && <span className="bg-[#f0f4ff] dark:bg-[#1a2236] text-[#5a6a8a] rounded-full px-3 py-1 text-[12px]">Class {question.classLevel}</span>}
                {question.board && <span className="bg-[#f0f4ff] dark:bg-[#1a2236] text-[#5a6a8a] rounded-full px-3 py-1 text-[12px]">{question.board}</span>}
                <span className={`ml-auto rounded-full px-3 py-1 text-[12px] font-bold ${
                  question.difficulty === 'easy' ? 'bg-green-50 text-green-600' :
                  question.difficulty === 'hard' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                }`}>{question.difficulty}</span>
              </div>
              <h1 className="font-head text-[22px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] leading-snug">{question.title}</h1>
            </div>

            {/* Solution */}
            <div className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] shadow-card overflow-hidden">
              <div className="bg-gradient-to-r from-primary-600 to-primary-glow px-5 py-3.5 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-[17px]">🤖</div>
                <span className="text-white font-head font-semibold text-[14px]">MscTutor AI — Step-by-Step Solution</span>
              </div>
              <div className="p-5">
                {steps.length > 0 ? (
                  <div className="space-y-3 mb-5">
                    {steps.map((s: any, i: number) => (
                      <div key={i} className="flex gap-3 items-start p-3.5 bg-[#f8faff] dark:bg-[#1a2236] rounded-xl">
                        <div className="w-7 h-7 rounded-full bg-primary-600 text-white flex items-center justify-center text-[12px] font-bold flex-shrink-0 font-head">{s.step ?? i+1}</div>
                        <div>
                          <div className="text-[13.5px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-0.5">{s.title}</div>
                          <div className="text-[13.5px] text-[#5a6a8a] leading-relaxed">{s.content}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[14px] text-[#0f1f3d] dark:text-[#e8eeff] leading-relaxed mb-5">{question.solution}</p>
                )}

                {/* Formula */}
                {question.formula && (
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-[#1e2d4a] dark:to-[#1a2236] border-l-4 border-primary-600 rounded-r-xl p-4 mb-4">
                    <div className="text-[11px] font-bold text-primary-600 uppercase tracking-wider mb-1">📐 Formula Used</div>
                    <div className="font-mono text-[16px] font-bold">{question.formula}</div>
                  </div>
                )}

                {/* NCERT Reference */}
                {question.ncertRef && (
                  <div className="flex items-center gap-2 bg-[#f8faff] dark:bg-[#1a2236] rounded-xl p-3 text-[13px] text-[#5a6a8a] mb-4">
                    <span>📚</span><span>{question.ncertRef}</span>
                  </div>
                )}

                {/* Diagram */}
                {diagram && (
                  <div className="rounded-xl overflow-hidden border border-[#dde5f5] dark:border-[#1e2d4a]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={diagram.url} alt={`${question.title} diagram`} className="w-full max-h-[250px] object-contain bg-[#f8faff] p-3" loading="lazy" />
                    <div className="px-3 py-1.5 text-[11px] text-[#5a6a8a] bg-[#f8faff] dark:bg-[#1a2236]">{diagram.attribution}</div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-2 mt-4 flex-wrap">
                  <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-primary-600 text-white text-[13px] font-medium hover:opacity-90 transition">
                    👍 Helpful ({question.helpful})
                  </button>
                  <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] border border-[#dde5f5] text-[#0f1f3d] dark:text-[#e8eeff] text-[13px] hover:border-primary-600 transition">
                    🔊 Read Aloud
                  </button>
                  <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] border border-[#dde5f5] text-[#0f1f3d] dark:text-[#e8eeff] text-[13px] hover:border-primary-600 transition">
                    🔖 Save
                  </button>
                  <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] border border-[#dde5f5] text-[#0f1f3d] dark:text-[#e8eeff] text-[13px] hover:border-primary-600 transition">
                    📥 Download PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Comments */}
            <CommentSection branch={branch} questionId={question.id} pageUrl={`/question/${question.slug}`} />
          </div>

          {/* Sidebar */}
          <aside className="lg:w-[240px] flex-shrink-0 space-y-5 sticky top-[154px] self-start">
            <div className="bg-white dark:bg-[#111827] rounded-[18px] p-4 border border-[#dde5f5] dark:border-[#1e2d4a]">
              <div className="text-[12px] font-bold text-[#5a6a8a] mb-2">📊 Stats</div>
              <div className="space-y-1.5 text-[13px]">
                <div className="flex justify-between"><span className="text-[#5a6a8a]">Views</span><span className="font-bold">{question.views.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-[#5a6a8a]">Rating</span><span className="font-bold text-amber-500">★ {question.rating?.toFixed(1) ?? '—'}</span></div>
                <div className="flex justify-between"><span className="text-[#5a6a8a]">Subject</span><span className="font-bold">{question.subject?.name ?? '—'}</span></div>
              </div>
            </div>
            {question.subject && (
              <Link href={`/subject/${question.subject.slug}`} className="block bg-primary-600 text-white rounded-[14px] px-4 py-3 text-center text-[13px] font-head font-bold hover:opacity-90 transition">
                📚 More {question.subject.name} →
              </Link>
            )}
            <Link href="/mock-test" className="block border-2 border-primary-600 text-primary-600 rounded-[14px] px-4 py-3 text-center text-[13px] font-head font-bold hover:bg-primary-600 hover:text-white transition">
              📝 Practice Test
            </Link>
          </aside>
        </div>
      </div>
    </>
  )
}
