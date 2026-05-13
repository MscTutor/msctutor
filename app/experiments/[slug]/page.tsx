// app/experiments/[slug]/page.tsx — UPGRADED: step flow, observations, safety, real-world apps
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getExperimentEntry } from '@/lib/bulk-content-bank'
import {
  StepFlow, ObservationList, SafetyChecklist,
  AIExplainButton, SectionHeader, ApplicationBadges,
} from '@/components/edu/EduBlocks'
import { JsonLd, breadcrumbSchema } from '@/lib/seo/structured-data'

interface Props { params: { slug: string } }

const SUBJECT_APPS: Record<string, string[]> = {
  physics:     ['Mechanical engineering','Vehicle design','Space exploration','Power systems'],
  chemistry:   ['Pharmaceuticals','Food safety testing','Water treatment','Cosmetics'],
  biology:     ['Medical diagnostics','Agriculture','Food processing','Environmental testing'],
  science:     ['Industrial QC','Research methodology','Environmental monitoring'],
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getExperimentEntry(params.slug)
  if (!entry) return { title: 'Experiment not found' }
  const B = process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.in'
  return {
    title: `${entry.title} — Experiment, Procedure & Observations | MscTutor`,
    description: `${entry.objective.slice(0, 140)}. Materials, step-by-step procedure, observations and conclusion.`,
    alternates: { canonical: `${B}/experiments/${entry.slug}` },
    openGraph: { title: entry.title, description: entry.objective, images: [entry.webp] },
  }
}

export default function ExperimentEntryPage({ params }: Props) {
  const entry = getExperimentEntry(params.slug)
  if (!entry) notFound()
  const apps = SUBJECT_APPS[entry.subject] ?? ['Scientific research','Technology','Education']
  const B    = process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.in'

  return (
    <div className="max-w-[980px] mx-auto px-5 py-10">
      <nav className="text-[12.5px] text-[#5a6a8a] mb-5 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link><span>/</span>
        <Link href="/experiments" className="hover:text-primary-600 transition-colors">Experiments</Link><span>/</span>
        <span className="text-[#0f1f3d] dark:text-[#e8eeff] font-medium">{entry.title}</span>
      </nav>

      {/* Hero */}
      <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-[#dde5f5] dark:border-[#1e2d4a] overflow-hidden shadow-card mb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={entry.webp} alt={entry.title} className="w-full h-auto border-b border-[#dde5f5] dark:border-[#1e2d4a]" loading="eager"/>
        <div className="p-6">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#e8f5ef] text-[#0a5e3f] capitalize">{entry.subject}</span>
            <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#f9fafb] text-[#5a6a8a]">{entry.classRange}</span>
            <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#f9fafb] text-[#5a6a8a]">{entry.chapterFamily}</span>
          </div>
          <h1 className="font-head text-[28px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] mb-3 leading-tight">{entry.title}</h1>
          {/* Aim */}
          <div className="bg-[#f0fdf4] dark:bg-[#0a1f12] border border-[#bbf7d0] rounded-[14px] px-4 py-3 mb-5">
            <div className="text-[11px] font-bold text-[#065f46] uppercase tracking-wider mb-1">Aim / Objective</div>
            <p className="text-[14px] text-[#374151] dark:text-[#d1d5db] leading-relaxed">{entry.objective}</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <AIExplainButton topic={entry.title} subject={entry.subject} label="Ask AI to Explain"/>
            <a href={entry.videoLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#fee2e2] hover:bg-[#fecaca] text-[#dc2626] text-[13px] font-bold px-4 py-2.5 rounded-[12px] no-underline transition-colors">
              🎬 Watch Video
            </a>
          </div>
        </div>
      </div>

      {/* Core content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Materials */}
        <section className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5">
          <SectionHeader icon="🧰" title="Materials Required"
            subtitle={`${entry.materials.length} items needed`}/>
          <div className="flex flex-wrap gap-2">
            {entry.materials.map((item) => (
              <span key={item} className="text-[12.5px] px-3 py-1.5 rounded-full bg-[#f3f4f6] dark:bg-[#1a2236] text-[#374151] dark:text-[#d1d5db] border border-[#e5e7eb] dark:border-[#374151]">
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Safety */}
        <section className="bg-[#fff5f5] dark:bg-[#1a0808] rounded-[20px] border border-[#fecaca] dark:border-[#7f1d1d] p-5">
          <SectionHeader icon="⚠️" title="Safety Precautions"
            subtitle="Follow these before starting"/>
          <SafetyChecklist items={entry.safety}/>
        </section>

        {/* Procedure — full width with numbered step flow */}
        <section className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5 md:col-span-2">
          <SectionHeader icon="📋" title="Step-by-Step Procedure"
            subtitle={`${entry.steps.length} steps to complete this experiment`}/>
          <StepFlow steps={entry.steps}/>
        </section>

        {/* Observations */}
        <section className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5">
          <SectionHeader icon="🔍" title="Observations"/>
          <ObservationList observations={entry.observations}/>
          <div className="mt-5 pt-4 border-t border-[#f3f4f6] dark:border-[#1e2d4a]">
            <div className="text-[12px] font-bold text-[#5a6a8a] uppercase tracking-wider mb-2">Conclusion</div>
            <p className="text-[13.5px] text-[#374151] dark:text-[#d1d5db] leading-relaxed font-medium">{entry.conclusion}</p>
          </div>
        </section>

        {/* Visuals */}
        <section className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5">
          <SectionHeader icon="📊" title="Diagram &amp; Animation"/>
          <div className="grid grid-cols-2 gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={entry.diagram} alt={`${entry.title} diagram`} className="w-full h-auto rounded-[14px] border border-[#dde5f5] dark:border-[#1e2d4a]" loading="lazy"/>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={entry.gif} alt={`${entry.title} animation`} className="w-full h-auto rounded-[14px] border border-[#dde5f5] dark:border-[#1e2d4a]" loading="lazy"/>
          </div>
        </section>
      </div>

      {/* Real-world applications */}
      <div className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5 mb-5">
        <SectionHeader icon="🌍" title="Real-World Applications"
          subtitle="Where this experiment's principles are applied in industry"/>
        <ApplicationBadges applications={apps}/>
      </div>

      {/* Practice CTA */}
      <div className="bg-gradient-to-r from-[#065f46] to-[#059669] rounded-[20px] p-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="font-head text-[18px] font-bold text-white mb-1">Understand {entry.title} Deeper</div>
          <div className="text-[13px] text-white/80">Ask AI for viva questions, theory, and related experiments</div>
        </div>
        <Link href={`/ask?q=${encodeURIComponent(`Viva questions on experiment: ${entry.title}`)}`}
          className="inline-flex items-center gap-2 bg-white text-[#065f46] text-[14px] font-bold px-5 py-2.5 rounded-[12px] no-underline hover:bg-[#f0fdf4] transition-colors flex-shrink-0">
          🤖 Viva Questions →
        </Link>
      </div>

      <JsonLd data={breadcrumbSchema([
        {name:'Home',url:'/'},{name:'Experiments',url:'/experiments'},{name:entry.title,url:`/experiments/${entry.slug}`},
      ])}/>
    </div>
  )
}
