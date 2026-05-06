import type { Metadata } from 'next'
import Link from 'next/link'
import AskBox from '@/components/ask/AskBox'
import CommentSection from '@/components/comments/CommentSection'
import HeroSlider from '@/components/layout/HeroSlider'
import { SITE } from '@/lib/constants'
import { getPlatformContentStats } from '@/lib/global-content'

export const metadata: Metadata = {
  title: `${SITE.name} - Free AI Education Platform`,
  description: 'Ask any Math, Science, Commerce or school question and get chapter-wise AI support, formulas, experiments and learning paths.',
  keywords: 'free education, AI tutor, NCERT, chapter-wise learning, mock test, class 1 to 12',
}

const ROLE_CARDS = [
  { icon: '👨‍🎓', title: 'Student', desc: 'Ask doubts, read chapters, take mock tests and learn with AI.', href: '/dashboard' },
  { icon: '🏫', title: 'School', desc: 'Manage classes, attendance, notices and academic workflows.', href: '/school-dashboard' },
  { icon: '👨‍🏫', title: 'Teacher', desc: 'Open teaching tools, live class flow and chapter support.', href: '/teacher/dashboard' },
]

const QUICK_LINKS = [
  { label: 'Explore Classes', href: '/class' },
  { label: 'Explore Subjects', href: '/subject' },
  { label: 'Formula Bank', href: '/formulas' },
  { label: 'Demo Page', href: '/demo' },
]

export default function HomePage() {
  const stats = getPlatformContentStats()

  return (
    <>
      <HeroSlider />

      <section style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111', margin: '0 0 0.5rem' }}>
            Ask now and learn chapter by chapter
          </h2>
          <p style={{ color: '#6b7280', fontSize: 14, marginBottom: '1.25rem' }}>
            Text, voice, image and chapter-based AI learning support
          </p>
          <AskBox />
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {[
            { label: 'Classes', value: stats.classes },
            { label: 'Subjects', value: stats.subjects },
            { label: 'Chapters', value: stats.chapters },
            { label: 'Formulas', value: stats.formulas },
            { label: 'Experiments', value: stats.experiments },
            { label: 'Videos', value: stats.videos },
          ].map((item) => (
            <div key={item.label} style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 18, padding: '1rem' }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#102a56' }}>{item.value}</div>
              <div style={{ fontSize: 13, color: '#6b7280' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem 1rem 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: '#111827', marginBottom: 8 }}>Platform for every role</h2>
          <p style={{ color: '#6b7280', margin: 0 }}>Student, teacher, school and admin workflows are all available in the project foundation.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
          {ROLE_CARDS.map((card) => (
            <Link key={card.title} href={card.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #dde5f5', padding: '1.25rem', minHeight: 170 }}>
                <div style={{ fontSize: 34, marginBottom: 10 }}>{card.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 18, color: '#111827', marginBottom: 8 }}>{card.title}</div>
                <div style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.65 }}>{card.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '1rem 1rem 3rem' }}>
        <div style={{ background: 'linear-gradient(135deg,#102a56,#254f97)', color: '#fff', borderRadius: 24, padding: '1.5rem' }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, marginTop: 0, marginBottom: 10 }}>Quick access</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {QUICK_LINKS.map((item) => (
              <Link key={item.href} href={item.href} style={{ background: '#ffffff18', color: '#fff', textDecoration: 'none', padding: '10px 16px', borderRadius: 12, fontWeight: 800, border: '1px solid #ffffff26' }}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1rem 4rem' }}>
        <CommentSection branch="general" pageUrl="/" />
      </section>
    </>
  )
}
