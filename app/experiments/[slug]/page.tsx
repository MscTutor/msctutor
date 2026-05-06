import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getExperimentEntry } from '@/lib/bulk-content-bank'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getExperimentEntry(params.slug)
  return {
    title: entry?.title ?? 'Experiment detail',
    description: entry?.objective ?? 'Experiment detail page',
  }
}

export default function ExperimentEntryPage({ params }: Props) {
  const entry = getExperimentEntry(params.slug)
  if (!entry) notFound()

  return (
    <div className="max-w-[980px] mx-auto px-5 py-10">
      <nav className="text-[12.5px] text-[#5a6a8a] mb-5 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-primary-600">Home</Link><span>/</span>
        <Link href="/experiments" className="hover:text-primary-600">Experiments</Link><span>/</span>
        <span className="text-[#0f1f3d] dark:text-[#e8eeff] font-medium">{entry.title}</span>
      </nav>

      <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-[#dde5f5] dark:border-[#1e2d4a] overflow-hidden shadow-card mb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={entry.webp} alt={entry.title} className="w-full h-auto border-b border-[#dde5f5] dark:border-[#1e2d4a]" />
        <div className="p-6">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#e8f5ef] text-[#0a5e3f]">{entry.subject}</span>
            <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#f9fafb] text-[#5a6a8a]">{entry.classRange}</span>
            <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#f9fafb] text-[#5a6a8a]">{entry.chapterFamily}</span>
          </div>
          <h1 className="font-head text-[30px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] mb-3">{entry.title}</h1>
          <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-0">{entry.objective}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <section className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5">
          <h2 className="font-head text-[18px] font-bold mb-3 text-[#0f1f3d] dark:text-[#e8eeff]">Materials</h2>
          <ul className="pl-5 space-y-2 text-[14px] text-[#5a6a8a]">
            {entry.materials.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5">
          <h2 className="font-head text-[18px] font-bold mb-3 text-[#0f1f3d] dark:text-[#e8eeff]">Procedure</h2>
          <ol className="pl-5 space-y-2 text-[14px] text-[#5a6a8a]">
            {entry.steps.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </section>

        <section className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5">
          <h2 className="font-head text-[18px] font-bold mb-3 text-[#0f1f3d] dark:text-[#e8eeff]">Observations</h2>
          <ul className="pl-5 space-y-2 text-[14px] text-[#5a6a8a]">
            {entry.observations.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="mt-4 text-[14px] text-[#5a6a8a] leading-relaxed">
            <strong>Conclusion:</strong> {entry.conclusion}
          </div>
        </section>

        <section className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5">
          <h2 className="font-head text-[18px] font-bold mb-3 text-[#0f1f3d] dark:text-[#e8eeff]">Safety + Visuals</h2>
          <ul className="pl-5 space-y-2 text-[14px] text-[#5a6a8a] mb-4">
            {entry.safety.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="grid grid-cols-2 gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={entry.diagram} alt={`${entry.title} diagram`} className="w-full h-auto rounded-[14px] border border-[#dde5f5] dark:border-[#1e2d4a]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={entry.gif} alt={`${entry.title} animation`} className="w-full h-auto rounded-[14px] border border-[#dde5f5] dark:border-[#1e2d4a]" />
          </div>
          <a href={entry.videoLink} target="_blank" rel="noreferrer" className="inline-flex mt-4 text-primary-600 font-bold no-underline">
            Open related video search →
          </a>
        </section>
      </div>
    </div>
  )
}
