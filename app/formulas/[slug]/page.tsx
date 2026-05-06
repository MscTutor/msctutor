import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getFormulaEntry } from '@/lib/bulk-content-bank'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getFormulaEntry(params.slug)
  return {
    title: entry?.title ?? 'Formula detail',
    description: entry?.description ?? 'Formula detail page',
  }
}

export default function FormulaEntryPage({ params }: Props) {
  const entry = getFormulaEntry(params.slug)
  if (!entry) notFound()

  return (
    <div className="max-w-[980px] mx-auto px-5 py-10">
      <nav className="text-[12.5px] text-[#5a6a8a] mb-5 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-primary-600">Home</Link><span>/</span>
        <Link href="/formulas" className="hover:text-primary-600">Formulas</Link><span>/</span>
        <span className="text-[#0f1f3d] dark:text-[#e8eeff] font-medium">{entry.title}</span>
      </nav>

      <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-[#dde5f5] dark:border-[#1e2d4a] overflow-hidden shadow-card mb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={entry.webp} alt={entry.title} className="w-full h-auto border-b border-[#dde5f5] dark:border-[#1e2d4a]" />
        <div className="p-6">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#f0f4ff] text-primary-600">{entry.subject}</span>
            <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#f9fafb] text-[#5a6a8a]">{entry.classRange}</span>
            <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#f9fafb] text-[#5a6a8a]">{entry.kind}</span>
            <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#f9fafb] text-[#5a6a8a]">{entry.symbolCode}</span>
          </div>
          <h1 className="font-head text-[30px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] mb-3">{entry.title}</h1>
          <div className="font-mono text-[18px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] bg-[#f8fafc] dark:bg-[#1a2236] rounded-[16px] px-4 py-3 mb-4 break-all">
            {entry.expression}
          </div>
          {entry.reaction && (
            <div className="font-mono text-[15px] text-[#7c3400] bg-[#fff7ed] rounded-[16px] px-4 py-3 mb-4 break-all">
              Reaction: {entry.reaction}
            </div>
          )}
          <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-0">{entry.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <section className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5">
          <h2 className="font-head text-[18px] font-bold mb-3 text-[#0f1f3d] dark:text-[#e8eeff]">Full Explanation</h2>
          <div className="space-y-3">
            {entry.explanation.map((line) => (
              <p key={line} className="text-[14px] text-[#5a6a8a] leading-relaxed">{line}</p>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5">
          <h2 className="font-head text-[18px] font-bold mb-3 text-[#0f1f3d] dark:text-[#e8eeff]">Use Cases</h2>
          <ul className="pl-5 space-y-2 text-[14px] text-[#5a6a8a]">
            {entry.useCases.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="mt-4 flex gap-3 flex-wrap">
            {entry.keywords.map((keyword) => (
              <span key={keyword} className="text-[11px] px-3 py-1 rounded-full bg-[#f0f4ff] text-primary-600">{keyword}</span>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5">
          <h2 className="font-head text-[18px] font-bold mb-3 text-[#0f1f3d] dark:text-[#e8eeff]">Diagram Asset</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={entry.diagram} alt={`${entry.title} diagram`} className="w-full h-auto rounded-[14px] border border-[#dde5f5] dark:border-[#1e2d4a]" />
        </section>

        <section className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5">
          <h2 className="font-head text-[18px] font-bold mb-3 text-[#0f1f3d] dark:text-[#e8eeff]">Animated Support</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={entry.gif} alt={`${entry.title} animation`} className="w-full h-auto rounded-[14px] border border-[#dde5f5] dark:border-[#1e2d4a]" />
        </section>
      </div>
    </div>
  )
}
