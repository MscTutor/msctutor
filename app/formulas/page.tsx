import type { Metadata } from 'next'
import Link from 'next/link'
import { FORMULA_BANK, getFormulaBankStats } from '@/lib/bulk-content-bank'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd, breadcrumbSchema } from '@/lib/seo/structured-data'

export const metadata: Metadata = buildMetadata({ pageKey:'formulas', path:'/formulas' })
export const revalidate = 86400

const SUBJECT_COLORS = {
  mathematics: { bg: '#e8eef8', color: '#1a3a6b', border: '#c7d5f0' },
  science: { bg: '#eff6ff', color: '#0369a1', border: '#bae6fd' },
  commerce: { bg: '#fdf0e6', color: '#7c3400', border: '#fcd9a6' },
}

export default function FormulasPage() {
  const stats = getFormulaBankStats()
  const grouped = {
    mathematics: FORMULA_BANK.filter((entry) => entry.subject === 'mathematics'),
    science: FORMULA_BANK.filter((entry) => entry.subject === 'science'),
    commerce: FORMULA_BANK.filter((entry) => entry.subject === 'commerce'),
  }

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 bg-primary-600/8 border border-primary-600/15 rounded-full px-4 py-1.5 text-[12.5px] text-primary-600 font-semibold mb-4">
          500+ Formula Bank
        </div>
        <h1 className="font-head text-[32px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] mb-2">Formula, Code and Reaction Library</h1>
        <p className="text-[14px] text-[#5a6a8a] max-w-[760px] mx-auto">
          Chapter-wise bank for mathematics, science and commerce with full description, subject code, reaction format where relevant, and generated copyright-safe image, diagram, gif and webp support.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Entries', value: stats.total },
          { label: 'Mathematics', value: stats.mathematics },
          { label: 'Science', value: stats.science },
          { label: 'Commerce', value: stats.commerce },
        ].map((item) => (
          <div key={item.label} className="bg-white dark:bg-[#111827] rounded-[18px] p-5 border border-[#dde5f5] dark:border-[#1e2d4a] text-center">
            <div className="text-[28px] font-black text-[#0f1f3d] dark:text-[#e8eeff]">{item.value}</div>
            <div className="text-[12px] text-[#5a6a8a] font-semibold mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      {(['mathematics', 'science', 'commerce'] as const).map((subject) => {
        const palette = SUBJECT_COLORS[subject]
        return (
          <section key={subject} className="mb-12">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
              <h2 className="font-head text-[22px] font-bold" style={{ color: palette.color }}>
                {subject[0].toUpperCase() + subject.slice(1)}
              </h2>
              <span className="text-[12px] font-bold px-3 py-1 rounded-full" style={{ background: palette.bg, color: palette.color, border: `1px solid ${palette.border}` }}>
                {grouped[subject].length} entries
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {grouped[subject].map((entry) => (
                <Link key={entry.slug} href={`/formulas/${entry.slug}`} className="no-underline">
                  <div className="bg-white dark:bg-[#111827] rounded-[18px] p-4 border border-[#dde5f5] dark:border-[#1e2d4a] hover:shadow-card transition">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="text-[12px] font-bold" style={{ color: palette.color }}>{entry.chapterFamily}</div>
                      <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: palette.bg, color: palette.color }}>
                        {entry.kind}
                      </span>
                    </div>
                    <div className="font-head text-[16px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-2">{entry.title}</div>
                    <div className="font-mono text-[13px] text-[#0f1f3d] dark:text-[#e8eeff] bg-[#f8fafc] dark:bg-[#1a2236] rounded-lg px-3 py-2 mb-2 break-all">
                      {entry.expression}
                    </div>
                    <div className="text-[12px] text-[#5a6a8a] leading-relaxed line-clamp-3">{entry.description}</div>
                    <div className="mt-3 text-[11px] text-[#5a6a8a]">Code: {entry.symbolCode}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
      <JsonLd data={breadcrumbSchema([{ name:'Home', url:'/' }, { name:'Formula Bank', url:'/formulas' }])} />
    </div>
  )
}
