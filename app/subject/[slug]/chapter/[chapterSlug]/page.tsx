import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CommentSection from '@/components/comments/CommentSection'
import { getAllUnifiedSubjects, getUnifiedChapterByRoute, parseSubjectRouteSlug } from '@/lib/global-content'

interface Params {
  slug: string
  chapterSlug: string
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const chapter = getUnifiedChapterByRoute(params.slug, params.chapterSlug)
  const subject = getAllUnifiedSubjects().find((item) => item.slug === params.slug)
  const title = chapter?.title ?? params.chapterSlug
  const subjectName = subject?.name ?? params.slug

  return {
    title: `${title} - ${subjectName} - MscTutor`,
    description: chapter?.description ?? `Learn ${title} in ${subjectName} with chapter-wise explanations.`,
  }
}

export default function SubjectChapterPage({ params }: { params: Params }) {
  const subjectInfo = getAllUnifiedSubjects().find((item) => item.slug === params.slug)
  const chapter = getUnifiedChapterByRoute(params.slug, params.chapterSlug)
  const parsed = parseSubjectRouteSlug(params.chapterSlug)

  if (!subjectInfo || !chapter) notFound()

  return (
    <div className="max-w-[1100px] mx-auto px-5 py-8">
      <nav className="text-[12.5px] text-[#5a6a8a] mb-5 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-primary-600">Home</Link><span>/</span>
        <Link href="/subject" className="hover:text-primary-600">Subjects</Link><span>/</span>
        <Link href={`/subject/${params.slug}`} className="hover:text-primary-600">{subjectInfo.name}</Link><span>/</span>
        <span className="text-[#0f1f3d] dark:text-[#e8eeff] font-medium">{chapter.title}</span>
      </nav>

      <div className="rounded-[22px] p-6 mb-8 border-2" style={{ background: `linear-gradient(135deg, ${subjectInfo.color}12, ${subjectInfo.color}06)`, borderColor: `${subjectInfo.color}25` }}>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="bg-white/80 dark:bg-black/30 border border-[#dde5f5] rounded-full px-3 py-1 text-[12px] font-bold" style={{ color: subjectInfo.color }}>
            {subjectInfo.name}
          </span>
          <span className="bg-white/80 dark:bg-black/30 border border-[#dde5f5] rounded-full px-3 py-1 text-[12px]">
            Class {chapter.classLevel}
          </span>
          {chapter.isRich && <span className="bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1 text-[12px] font-bold">Full Content</span>}
        </div>
        <h1 className="font-head text-[28px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] mb-1">{chapter.title}</h1>
        <p className="text-[14px] text-[#5a6a8a] leading-relaxed max-w-[760px]">{chapter.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-7">
        <div className="space-y-7">
          {chapter.topics.length > 0 && (
            <section>
              <h2 className="font-head text-[20px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-4">Key Topics</h2>
              <div className="space-y-4">
                {chapter.topics.map((topic, index) => (
                  <div key={`${topic.title}-${index}`} className="bg-white dark:bg-[#111827] rounded-[18px] p-5 border-l-4 shadow-card" style={{ borderLeftColor: subjectInfo.color }}>
                    <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                      <h3 className="font-head text-[15px] font-bold" style={{ color: subjectInfo.color }}>{topic.title}</h3>
                      <Link href={`/learn/${chapter.classLevel}/${chapter.subjectSlug}/${chapter.id}/topic/${topic.slug}`} className="text-[12px] font-bold no-underline" style={{ color: subjectInfo.color }}>
                        Open topic
                      </Link>
                    </div>
                    <p className="text-[14px] text-[#5a6a8a] leading-relaxed">{topic.content}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {chapter.formulas.length > 0 && (
            <section>
              <h2 className="font-head text-[20px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-4">Formulas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {chapter.formulas.map((formula, index) => (
                  <div key={`${formula.name}-${index}`} className="bg-white dark:bg-[#111827] rounded-[16px] p-4 border border-[#dde5f5] dark:border-[#1e2d4a] shadow-card">
                    <div className="flex items-start justify-between gap-3 mb-1.5 flex-wrap">
                      <div className="text-[12px] font-bold text-primary-600">{formula.name}</div>
                      <Link href={`/learn/${chapter.classLevel}/${chapter.subjectSlug}/${chapter.id}/formula/${formula.slug}`} className="text-[12px] font-bold no-underline text-primary-600">
                        Formula detail
                      </Link>
                    </div>
                    <div className="font-mono text-[16px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] bg-[#f0f4ff] dark:bg-[#1a2236] rounded-lg px-3 py-2 mb-1.5">
                      {formula.latex ?? formula.formula}
                    </div>
                    {formula.example && <div className="text-[12px] text-[#5a6a8a]">{formula.example}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {chapter.experiments.length > 0 && (
            <section>
              <h2 className="font-head text-[20px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-4">Experiments</h2>
              <div className="space-y-3">
                {chapter.experiments.map((experiment, index) => (
                  <div key={`${experiment.title}-${index}`} className="bg-white dark:bg-[#111827] rounded-[16px] p-4 border border-[#dde5f5] dark:border-[#1e2d4a] shadow-card">
                    <div className="font-head text-[16px] font-bold mb-2">{experiment.title}</div>
                    <div className="text-[13px] text-[#5a6a8a] mb-2"><strong>Objective:</strong> {experiment.objective}</div>
                    <div className="text-[13px] text-[#5a6a8a] mb-2"><strong>Materials:</strong> {experiment.materials.join(', ')}</div>
                    <div className="text-[13px] text-[#5a6a8a] mb-2"><strong>Result:</strong> {experiment.result}</div>
                    {experiment.safetyNote && <div className="text-[12px] text-amber-700"><strong>Safety:</strong> {experiment.safetyNote}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {chapter.videos.length > 0 && (
            <section>
              <h2 className="font-head text-[20px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-4">Video Links</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {chapter.videos.map((video, index) => (
                  <a key={`${video.title}-${index}`} href={video.url} target="_blank" rel="noreferrer" className="bg-white dark:bg-[#111827] rounded-[16px] p-4 border border-[#dde5f5] dark:border-[#1e2d4a] shadow-card no-underline">
                    <div className="font-head text-[15px] font-bold text-[#0f1f3d] dark:text-[#e8eeff]">{video.title}</div>
                    <div className="text-[12px] text-[#5a6a8a] mt-1">{video.source ?? 'External source'}</div>
                    {video.duration && <div className="text-[12px] text-[#5a6a8a]">{video.duration}</div>}
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <div className="bg-white dark:bg-[#111827] rounded-[16px] p-4 border border-[#dde5f5] dark:border-[#1e2d4a] shadow-card">
            <div className="font-head text-[15px] font-bold mb-3">Quick Actions</div>
            <div className="flex flex-col gap-2">
              <Link href={`/learn/${chapter.classLevel}/${chapter.subjectSlug}/${chapter.id}`} className="text-primary-600 font-semibold no-underline">Open interactive chapter</Link>
              <Link href={`/mock-test?class=${chapter.classLevel}&subject=${chapter.subjectSlug}`} className="text-primary-600 font-semibold no-underline">Generate mock test</Link>
              <Link href="/ask" className="text-primary-600 font-semibold no-underline">Ask AI doubt</Link>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-[16px] p-4 border border-[#dde5f5] dark:border-[#1e2d4a] shadow-card">
            <div className="font-head text-[15px] font-bold mb-3">Chapter Stats</div>
            <div className="text-[13px] text-[#5a6a8a] space-y-1">
              <div>Class: {chapter.classLevel}</div>
              <div>Topics: {chapter.topics.length}</div>
              <div>Formulas: {chapter.formulas.length}</div>
              <div>Experiments: {chapter.experiments.length}</div>
              <div>Videos: {chapter.videos.length}</div>
              <div>Route slug: {parsed.baseSlug}</div>
            </div>
          </div>

          {chapter.keyTerms.length > 0 && (
            <div className="bg-white dark:bg-[#111827] rounded-[16px] p-4 border border-[#dde5f5] dark:border-[#1e2d4a] shadow-card">
              <div className="font-head text-[15px] font-bold mb-3">Key Terms</div>
              <div className="flex gap-2 flex-wrap">
                {chapter.keyTerms.map((term) => (
                  <span key={term} className="rounded-full px-3 py-1 text-[12px] font-bold" style={{ background: `${subjectInfo.color}12`, color: subjectInfo.color }}>
                    {term}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <div className="mt-10">
        <CommentSection branch={subjectInfo.branch} pageUrl={`/subject/${params.slug}/chapter/${params.chapterSlug}`} />
      </div>
    </div>
  )
}
