// app/formulas/[slug]/page.tsx — UPGRADED: variables, derivation, examples, mistakes
import type { Metadata }  from 'next'
import Link               from 'next/link'
import { notFound }       from 'next/navigation'
import { getFormulaEntry }     from '@/lib/bulk-content-bank'
import { ALL_NCERT_FORMULAS }  from '@/lib/ncert-formulas'
import {
  VariableTable, DerivationBlock, SolvedExample,
  MistakeBox, MemoryTrick, NoteBlock,
  AIExplainButton, SectionHeader,
} from '@/components/edu/EduBlocks'
import { JsonLd, questionSchema, breadcrumbSchema } from '@/lib/seo/structured-data'

interface Props { params: { slug: string } }

const KIND_MISTAKES: Record<string, string[]> = {
  formula:  ['Forgetting unit consistency before substitution','Confusing initial/final quantities (u vs v)','Not converting to SI units first'],
  reaction: ['Not balancing atoms on both sides','Forgetting state symbols (s),(l),(g),(aq)','Mixing up reactants and products'],
  code:     ['Off-by-one errors in index calculations','Missing edge cases (zero/negative)','Confusing integer vs float division'],
}
const SUBJECT_APPS: Record<string, string[]> = {
  physics:     ['Engineering design','Space missions','Vehicle safety (ABS)','Sports analytics'],
  chemistry:   ['Pharmaceuticals','Environmental monitoring','Food processing','Material science'],
  mathematics: ['Architecture','Computer graphics','Financial modelling','Data science'],
  science:     ['Industrial processes','Research labs','Environmental science'],
  biology:     ['Medical research','Agriculture','Biotechnology'],
  commerce:    ['Banking','Investment','Accounting','Tax calculation'],
}
const TRICKS: Record<string, string> = {
  "Newton's Second Law": '"Force Makes Acceleration" — F = MA. Bigger force → bigger acceleration.',
  "Ohm's Law": '"Very Intense River" — V = IR. Voltage = Intensity × Resistance.',
  'Pythagorean Theorem': '"A-squared + B-squared = C-squared." C is always the hypotenuse.',
  'Speed Distance Time': '"SDT — Saturday Does Track" — Speed = Distance ÷ Time.',
  "Boyle's Law": '"Pressure Up, Volume Down" — P₁V₁ = P₂V₂.',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getFormulaEntry(params.slug)
  if (!e) return { title: 'Formula not found' }
  const B = process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.in'
  return {
    title:`${e.title} — Formula, Derivation & Examples | MscTutor`,
    description:`${e.expression} — ${e.description.slice(0,130)}. Variables, derivation, solved examples.`,
    alternates:{canonical:`${B}/formulas/${e.slug}`},
    openGraph:{title:e.title,description:e.description,images:[e.webp]},
  }
}

export default function FormulaEntryPage({ params }: Props) {
  const e = getFormulaEntry(params.slug)
  if (!e) notFound()
  const ncert = ALL_NCERT_FORMULAS.find(f=>
    f.name.toLowerCase()===e.title.toLowerCase()||
    f.formula.replace(/\s/g,'')===e.expression.replace(/\s/g,'')
  )
  const mistakes  = KIND_MISTAKES[e.kind]   ?? KIND_MISTAKES.formula
  const apps      = SUBJECT_APPS[e.subject] ?? ['Scientific research','Technology']
  const trick     = TRICKS[e.title]         ?? null
  const B         = process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.in'
  return (
    <div className="max-w-[980px] mx-auto px-5 py-10">
      <nav className="text-[12.5px] text-[#5a6a8a] mb-5 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link><span>/</span>
        <Link href="/formulas" className="hover:text-primary-600 transition-colors">Formulas</Link><span>/</span>
        <span className="text-[#0f1f3d] dark:text-[#e8eeff] font-medium">{e.title}</span>
      </nav>

      {/* Hero */}
      <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-[#dde5f5] dark:border-[#1e2d4a] overflow-hidden shadow-card mb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={e.webp} alt={e.title} className="w-full h-auto border-b border-[#dde5f5] dark:border-[#1e2d4a]" loading="eager"/>
        <div className="p-6">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#f0f4ff] text-primary-600 capitalize">{e.subject}</span>
            <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#f9fafb] text-[#5a6a8a]">{e.classRange}</span>
            <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#f9fafb] text-[#5a6a8a] capitalize">{e.kind}</span>
            {ncert?.classLevel&&<span className="text-[12px] font-bold px-3 py-1 rounded-full bg-[#e8f5ef] text-[#065f46]">Class {ncert.classLevel}</span>}
          </div>
          <h1 className="font-head text-[28px] font-extrabold text-[#0f1f3d] dark:text-[#e8eeff] mb-4 leading-tight">{e.title}</h1>
          {/* Formula display */}
          <div className="bg-[#f8fafc] dark:bg-[#0f172a] border-2 border-[#e8eef8] dark:border-[#1e2d4a] rounded-[16px] px-5 py-4 mb-4">
            <div className="text-[11px] font-bold text-[#5a6a8a] uppercase tracking-wider mb-2">Formula</div>
            <div className="font-mono text-[20px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] break-all">{e.expression}</div>
            <div className="text-[12px] text-[#5a6a8a] mt-1 font-mono">{e.symbolCode}</div>
          </div>
          {e.reaction&&(
            <div className="font-mono text-[14px] text-[#7c3400] dark:text-[#fcd34d] bg-[#fff7ed] dark:bg-[#1a0f00] rounded-[14px] px-4 py-3 mb-4 border border-[#fed7aa]">
              <span className="text-[11px] font-bold text-[#92400e] uppercase tracking-wider block mb-1">Reaction</span>{e.reaction}
            </div>
          )}
          <p className="text-[14px] text-[#5a6a8a] dark:text-[#9ca3af] leading-relaxed mb-5">{e.description}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <AIExplainButton topic={e.title} subject={e.subject} classLevel={ncert?.classLevel}/>
            <Link href={`/ask?q=${encodeURIComponent(`Practice question on ${e.title}`)}`}
              className="inline-flex items-center gap-2 bg-[#f0f4ff] hover:bg-[#e8eef8] text-primary-600 text-[13px] font-bold px-4 py-2.5 rounded-[12px] no-underline transition-colors border border-[#dde5f5]">
              ✏️ Practice Question
            </Link>
          </div>
        </div>
      </div>

      {/* Variables */}
      {(ncert?.variables?.length??0)>0&&<div className="mb-5"><VariableTable variables={ncert!.variables}/></div>}

      {/* Core grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <section className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5">
          <SectionHeader icon="📖" title="Full Explanation"/>
          <div className="flex flex-col gap-3">
            {e.explanation.map(line=><p key={line} className="text-[13.5px] text-[#5a6a8a] dark:text-[#9ca3af] leading-relaxed">{line}</p>)}
          </div>
        </section>
        <section className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5">
          <SectionHeader icon="🎯" title="Use Cases"/>
          <ul className="flex flex-col gap-2 mb-4">
            {e.useCases.map(item=>(
              <li key={item} className="flex items-start gap-2.5 text-[13.5px] text-[#5a6a8a] dark:text-[#9ca3af]">
                <span className="text-accent-green mt-0.5 flex-shrink-0">✓</span>{item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 pt-3 border-t border-[#f3f4f6] dark:border-[#1e2d4a]">
            {e.keywords.map(kw=><span key={kw} className="text-[11px] px-2.5 py-1 rounded-full bg-[#f0f4ff] dark:bg-[#1a2236] text-primary-600 dark:text-[#93c5fd] font-semibold">{kw}</span>)}
          </div>
        </section>
        <section className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5">
          <SectionHeader icon="📊" title="Diagram"/>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={e.diagram} alt={`${e.title} diagram`} className="w-full h-auto rounded-[14px] border border-[#dde5f5] dark:border-[#1e2d4a]" loading="lazy"/>
        </section>
        <section className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5">
          <SectionHeader icon="🎬" title="Animated View"/>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={e.gif} alt={`${e.title} animation`} className="w-full h-auto rounded-[14px] border border-[#dde5f5] dark:border-[#1e2d4a]" loading="lazy"/>
        </section>
      </div>

      {/* Educational enhancements */}
      <div className="flex flex-col gap-5">
        {ncert?.derivation&&<DerivationBlock derivation={ncert.derivation}/>}
        {ncert?.example   &&<SolvedExample   example={ncert.example}/>}
        {ncert?.note      &&<NoteBlock        note={ncert.note}/>}
        {trick            &&<MemoryTrick      trick={trick}/>}
        <MistakeBox mistakes={mistakes}/>
        <div className="bg-white dark:bg-[#111827] rounded-[20px] border border-[#dde5f5] dark:border-[#1e2d4a] p-5">
          <SectionHeader icon="🌍" title="Real-World Applications" subtitle="Where this formula is used outside the textbook"/>
          <div className="flex flex-wrap gap-2">
            {apps.map(a=><span key={a} className="text-[12px] font-semibold px-3 py-1.5 rounded-full bg-[#e0f2fe] text-[#0369a1] dark:bg-[#0c2d4a] dark:text-[#7dd3fc] border border-[#bae6fd]">{a}</span>)}
          </div>
        </div>
        <div className="bg-gradient-to-r from-primary-600 to-[#2563eb] rounded-[20px] p-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="font-head text-[18px] font-bold text-white mb-1">Practice {e.title}</div>
            <div className="text-[13px] text-white/80">Get AI-generated practice problems with full solutions</div>
          </div>
          <Link href={`/ask?q=${encodeURIComponent(`Give me 3 practice problems on ${e.title} with step-by-step solutions`)}`}
            className="inline-flex items-center gap-2 bg-white text-primary-600 text-[14px] font-bold px-5 py-2.5 rounded-[12px] no-underline hover:bg-[#f0f4ff] transition-colors flex-shrink-0">
            🤖 Practice Now →
          </Link>
        </div>
      </div>
      <JsonLd data={[
        questionSchema({question:`What is the formula for ${e.title}?`,answer:`${e.expression}. ${e.description}`,subject:e.subject,url:`${B}/formulas/${e.slug}`}),
        breadcrumbSchema([{name:'Home',url:'/'},{name:'Formulas',url:'/formulas'},{name:e.title,url:`/formulas/${e.slug}`}]),
      ]}/>
    </div>
  )
}
