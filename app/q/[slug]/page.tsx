// app/q/[slug]/page.tsx — Dynamic SEO page for individual questions
// /q/what-is-newtons-second-law → indexed by Google with schema.org

import type { Metadata }   from 'next'
import { notFound }         from 'next/navigation'
import Link                 from 'next/link'
import { buildMetadata }    from '@/lib/seo/metadata'
import { JsonLd, questionSchema, breadcrumbSchema } from '@/lib/seo/structured-data'
import { questionCache, TTL, cached } from '@/lib/cache'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.in'

interface Props { params: { slug: string } }

interface CachedQuestion {
  slug: string
  title: string
  solution: string
  formula: string | null
  ncertRef: string | null
  difficulty: string
  classLevel: string | null
  language: string
  views: number
  createdAt: Date
  updatedAt: Date
}

async function getQuestion(slug: string): Promise<CachedQuestion | null> {
  return await cached(questionCache as never, `q-page:${slug}`, TTL.QUESTION, async () => {
    try {
      const { default: prisma } = await import('@/lib/prisma')
      return await prisma.question.findFirst({
        where: { slug, isPublic: true, isApproved: true },
        select: {
          slug: true, title: true, solution: true,
          formula: true, ncertRef: true, difficulty: true,
          classLevel: true, language: true, views: true,
          createdAt: true, updatedAt: true,
        },
      })
    } catch { return null }
  }) as CachedQuestion | null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const q = await getQuestion(params.slug)
  if (!q) return { robots: { index: false, follow: false } }

  const title = q.title.slice(0, 70)
  const desc  = `AI step-by-step solution for: ${q.title.slice(0, 120)}. ${q.ncertRef ?? ''} Free NCERT answer.`.slice(0, 160)

  return {
    title:       `${title} | MscTutor`,
    description: desc,
    alternates:  { canonical: `${BASE}/q/${q.slug}` },
    openGraph: {
      title, description: desc,
      url:   `${BASE}/q/${q.slug}`,
      type:  'article',
      images: [{ url: `${BASE}/og/ask/en.png`, width: 1200, height: 630 }],
    },
    other: { 'article:published_time': q.createdAt?.toISOString() ?? '' },
  }
}

export default async function QuestionPage({ params }: Props) {
  const q = await getQuestion(params.slug)
  if (!q) notFound()

  // Parse steps from solution
  const steps = q.solution
    .split('\n')
    .filter(l => l.trim().length > 10)
    .slice(0, 6)
    .map((text, i) => ({ name: `Step ${i + 1}`, text: text.trim() }))

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Breadcrumb */}
      <nav style={{ fontSize: 13, color: '#6b7280', marginBottom: '1.5rem', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</Link> ›
        <Link href="/ask" style={{ color: '#2563eb', textDecoration: 'none' }}>Ask AI</Link> ›
        <span>{q.title.slice(0, 50)}...</span>
      </nav>

      {/* Question */}
      <h1 style={{ fontSize: 26, fontWeight: 900, color: '#111', lineHeight: 1.3, marginBottom: '0.75rem' }}>
        {q.title}
      </h1>

      {/* Meta badges */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {q.classLevel && (
          <span style={{ background: '#eff6ff', color: '#2563eb', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>
            Class {q.classLevel}
          </span>
        )}
        {q.ncertRef && (
          <span style={{ background: '#f0fdf4', color: '#059669', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>
            📚 {q.ncertRef}
          </span>
        )}
        {q.difficulty && (
          <span style={{ background: '#fef3c7', color: '#d97706', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20, textTransform: 'capitalize' }}>
            {q.difficulty}
          </span>
        )}
        <span style={{ background: '#f3f4f6', color: '#6b7280', fontSize: 12, padding: '3px 10px', borderRadius: 20 }}>
          👁 {(q.views ?? 0) + 1} views
        </span>
      </div>

      {/* AI Solution */}
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>
          <span style={{ fontSize: 24 }}>🤖</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#111' }}>AI Step-by-Step Solution</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>Verified by MscTutor AI</div>
          </div>
        </div>
        <div style={{ fontSize: 15, lineHeight: 1.8, color: '#374151', whiteSpace: 'pre-wrap' }}>
          {q.solution}
        </div>
        {q.formula && (
          <div style={{ marginTop: '1rem', background: '#eff6ff', borderRadius: 10, padding: '0.875rem', border: '1px solid #bfdbfe' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#2563eb', marginBottom: 4 }}>📐 Formula Used</div>
            <div style={{ fontFamily: 'monospace', fontSize: 15, color: '#1e40af', fontWeight: 700 }}>{q.formula}</div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg,#1a3a6b,#2563eb)', borderRadius: 16, padding: '1.5rem', textAlign: 'center', color: '#fff', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 0.5rem' }}>Have a different question?</h2>
        <p style={{ opacity: 0.85, fontSize: 14, margin: '0 0 1rem' }}>Ask AI any NCERT question — Text, Image, Voice or PDF</p>
        <Link href="/ask" style={{ display: 'inline-block', background: '#f59e0b', color: '#111', padding: '0.75rem 2rem', borderRadius: 12, textDecoration: 'none', fontWeight: 800, fontSize: 15 }}>
          Ask AI Now — Free! →
        </Link>
      </div>

      {/* Related */}
      <div style={{ background: '#f9fafb', borderRadius: 14, padding: '1.25rem', border: '1px solid #e5e7eb' }}>
        <div style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: 15 }}>📚 Study More</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { label: '🤖 AI Teacher', href: '/ai-teacher' },
            { label: '📋 Mock Test', href: '/mock-test' },
            { label: '📐 Formulas', href: '/formulas' },
            { label: '📚 Classes', href: '/class' },
          ].map(l => (
            <Link key={l.href} href={l.href}
              style={{ padding: '6px 14px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, textDecoration: 'none', fontSize: 13, color: '#374151', fontWeight: 600 }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Schema.org */}
      <JsonLd data={[
        questionSchema({ question: q.title, answer: q.solution, subject: q.ncertRef ?? undefined, classLevel: q.classLevel ?? undefined, url: `${BASE}/q/${q.slug}` }),
        breadcrumbSchema([{ name:'Home', url:'/' }, { name:'Ask AI', url:'/ask' }, { name: q.title.slice(0,40), url:`/q/${q.slug}` }]),
      ]} />
    </div>
  )
}
