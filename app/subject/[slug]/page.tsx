import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CommentSection from '@/components/comments/CommentSection'
import { getAllUnifiedSubjects, getUnifiedSubjectCatalog } from '@/lib/global-content'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const subjectInfo = getAllUnifiedSubjects().find((subject) => subject.slug === params.slug)
  const name = subjectInfo?.name ?? params.slug

  return {
    title: `${name} - Chapter-wise Global Syllabus - MscTutor`,
    description: `Browse ${name} chapters class-wise with formulas, experiments, videos and AI support.`,
    keywords: `${name}, chapter-wise syllabus, AI learning, global education`,
  }
}

export default function SubjectPage({ params }: { params: { slug: string } }) {
  const subjectCatalog = getUnifiedSubjectCatalog(params.slug)
  const subjectInfo = subjectCatalog ?? getAllUnifiedSubjects().find((subject) => subject.slug === params.slug)

  if (!subjectInfo || !subjectCatalog) notFound()

  const byClass = subjectCatalog.chapters.reduce<Record<string, typeof subjectCatalog.chapters>>((acc, chapter) => {
    const key = `Class ${chapter.classLevel}`
    if (!acc[key]) acc[key] = []
    acc[key].push(chapter)
    return acc
  }, {})

  return (
    <div className="max-w-[1100px] mx-auto px-5 py-10">
      <nav className="text-[12.5px] text-[#5a6a8a] mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-primary-600 transition">Home</Link>
        <span>/</span>
        <Link href="/subject" className="hover:text-primary-600 transition">Subjects</Link>
        <span>/</span>
        <span className="text-[#0f1f3d] dark:text-[#e8eeff] font-medium">{subjectInfo.name}</span>
      </nav>

      <div
        className="rounded-[24px] p-7 mb-10 flex items-center gap-5"
        style={{ background: `linear-gradient(135deg, ${subjectInfo.color}15, ${subjectInfo.color}08)`, border: `2px solid ${subjectInfo.color}20` }}
      >
        <div className="text-[52px]">{subjectInfo.icon}</div>
        <div>
          <h1 className="font-head text-[30px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff]">{subjectInfo.name}</h1>
          <p className="text-[14px] text-[#5a6a8a] mt-1">Class 1-12 coverage where available · chapter-wise learning · AI support</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-[12px] font-bold">✓ {subjectCatalog.chapters.length} Chapters</span>
            <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-[12px] font-bold">Free to Read</span>
            <span className="bg-amber-100 text-amber-700 rounded-full px-3 py-1 text-[12px] font-bold">AI Answers</span>
          </div>
        </div>
      </div>

      {Object.entries(byClass).sort((a, b) => Number(a[0].replace(/\D/g, '')) - Number(b[0].replace(/\D/g, ''))).map(([classLabel, chapters]) => (
        <div key={classLabel} className="mb-10">
          <h2 className="font-head text-[18px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-[13px] font-extrabold">
              {classLabel.replace('Class ', '')}
            </span>
            {classLabel}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {chapters.map((chapter) => (
              <Link
                key={chapter.routeSlug}
                href={`/subject/${params.slug}/chapter/${chapter.routeSlug}`}
                className="bg-white dark:bg-[#111827] rounded-[18px] p-4.5 border-[1.5px] border-[#dde5f5] dark:border-[#1e2d4a] hover:border-primary-600 hover:-translate-y-1 hover:shadow-card transition-all group flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-[20px] flex-shrink-0" style={{ background: `${subjectInfo.color}12` }}>
                  {chapter.isRich ? '📘' : '📖'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-head text-[14px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] group-hover:text-primary-600 transition leading-snug">
                    {chapter.title}
                  </div>
                  <div className="text-[12px] text-[#5a6a8a] mt-0.5 line-clamp-2">{chapter.description}</div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="text-[11px] text-[#6b7280]">{chapter.topics.length} topics</span>
                    {chapter.formulas.length > 0 && <span className="text-[11px] text-[#3730a3]">{chapter.formulas.length} formulas</span>}
                    {chapter.experiments.length > 0 && <span className="text-[11px] text-[#166534]">{chapter.experiments.length} experiments</span>}
                  </div>
                </div>
                <span className="text-primary-600 opacity-0 group-hover:opacity-100 transition flex-shrink-0">→</span>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { href: `/mock-test?subject=${subjectInfo.name}`, icon: '📝', label: 'Mock Test' },
          { href: `/formulas?subject=${params.slug}`, icon: '📐', label: 'Formulas' },
          { href: `/calculators`, icon: '🧮', label: 'Calculators' },
          { href: `/community?branch=${subjectInfo.branch}`, icon: '💬', label: 'Community' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 bg-white dark:bg-[#111827] rounded-[14px] p-3.5 border border-[#dde5f5] dark:border-[#1e2d4a] hover:border-primary-600 hover:text-primary-600 transition text-[13px] font-medium"
          >
            <span className="text-[18px]">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <CommentSection branch={subjectInfo.branch} pageUrl={`/subject/${params.slug}`} />
    </div>
  )
}
