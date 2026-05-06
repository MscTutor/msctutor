import type { Metadata } from 'next'
import Link from 'next/link'
import { EXPERIMENT_BANK, getExperimentBankStats } from '@/lib/bulk-content-bank'

export const metadata: Metadata = {
  title: 'Experiment Bank - 500+ Guided Experiments - MscTutor',
  description: 'Large experiment bank for mathematics, science and commerce with objective, materials, steps, observation, conclusion and generated visuals.',
}

export default function ExperimentsPage() {
  const stats = getExperimentBankStats()

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 bg-[#0a5e3f]/8 border border-[#0a5e3f]/15 rounded-full px-4 py-1.5 text-[12.5px] text-[#0a5e3f] font-semibold mb-4">
          500+ Experiment Bank
        </div>
        <h1 className="font-head text-[32px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] mb-2">Guided Experiment Library</h1>
        <p className="text-[14px] text-[#5a6a8a] max-w-[760px] mx-auto">
          Structured experiment pages with objective, material list, procedure, observations, conclusion, safety and reusable copyright-safe image, gif, diagram and webp support.
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {EXPERIMENT_BANK.map((entry) => (
          <Link key={entry.slug} href={`/experiments/${entry.slug}`} className="no-underline">
            <div className="bg-white dark:bg-[#111827] rounded-[18px] p-4 border border-[#dde5f5] dark:border-[#1e2d4a] hover:shadow-card transition">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="text-[12px] font-bold text-[#0a5e3f]">{entry.chapterFamily}</div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#e8f5ef] text-[#0a5e3f]">{entry.subject}</span>
              </div>
              <div className="font-head text-[16px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] mb-2">{entry.title}</div>
              <div className="text-[12px] text-[#5a6a8a] leading-relaxed line-clamp-3">{entry.objective}</div>
              <div className="mt-3 text-[11px] text-[#5a6a8a]">{entry.classRange}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
