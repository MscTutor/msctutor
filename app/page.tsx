import type { Metadata } from 'next'
import Link from 'next/link'
import AskBox from '@/components/ask/AskBox'
import CommentSection from '@/components/comments/CommentSection'
import HeroSlider from '@/components/layout/HeroSlider'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import CountUp from '@/components/ui/CountUp'
import { SITE } from '@/lib/constants'
import { getPlatformContentStats } from '@/lib/global-content'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd, homePageSchemas } from '@/lib/seo/structured-data'

export const metadata: Metadata = buildMetadata({ pageKey:'home', path:'/' })

const ROLE_CARDS = [
  { icon: '👨‍🎓', title: 'Student',     desc: 'Ask doubts, read chapters, take mock tests and learn with AI.',      href: '/dashboard'       },
  { icon: '👨‍👩‍👧', title: 'Parent',      desc: 'Track your child\'s attendance, grades, homework and teacher messages.', href: '/parent'           },
  { icon: '🏫', title: 'School',      desc: 'Manage classes, attendance, notices and academic workflows.',          href: '/school-dashboard' },
  { icon: '👨‍🏫', title: 'Teacher',     desc: 'Open teaching tools, live class flow and chapter support.',           href: '/teacher/dashboard' },
  { icon: '🏆', title: 'Competitive', desc: 'NTSE, Olympiads, JEE, NEET, UPSC, NDA — complete exam prep hub.',      href: '/competitive'      },
  { icon: '📊', title: 'Analytics',   desc: 'Real-time performance charts, mastery map, badges, rank & quiz trends.', href: '/analytics'        },
]

const QUICK_LINKS = [
  { label: '🧮 Calculators',    href: '/calculators' },
  { label: '📋 Formula Bank',   href: '/formulas'    },
  { label: '📚 Explore Classes', href: '/class'      },
  { label: '⚗️ Subjects',        href: '/subject'    },
  { label: '🏆 Competitive',    href: '/competitive' },
  { label: '👨‍👩‍👧 Parent Portal',   href: '/parent'     },
  { label: '🎥 Live Classes',   href: '/live'        },
  { label: '📊 Analytics',      href: '/analytics'   },
  { label: '👩‍🏫 AI Teacher',     href: '/ai-teacher'  },
  { label: '📝 Mock Tests',     href: '/mock-test'   },
]

export default function HomePage() {
  const stats = getPlatformContentStats()

  return (
    <>
      <HeroSlider />

      {/* ── Primary CTA: Hero search w/ gradient mesh background ── */}
      <section className="mesh-bg" style={{ borderBottom: '1px solid #e5e7eb', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800, color: '#0e2347', margin: '0 0 0.5rem', letterSpacing: -0.5, lineHeight: 1.15 }}>
            Ask now and learn chapter by chapter
          </h1>
          <p style={{ color: '#475569', fontSize: 'clamp(13px, 2vw, 15px)', marginBottom: '1.5rem' }}>
            Text, voice, image and chapter-based AI learning support — free for every student
          </p>
          <AskBox />
        </div>
      </section>

      {/* ── Stats grid (animated counters) ── */}
      <RevealOnScroll as="section" style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
          {[
            { label: 'Classes',     value: stats.classes     },
            { label: 'Subjects',    value: stats.subjects    },
            { label: 'Chapters',    value: stats.chapters    },
            { label: 'Formulas',    value: stats.formulas    },
            { label: 'Experiments', value: stats.experiments },
            { label: 'Videos',      value: stats.videos      },
          ].map((item) => (
            <div key={item.label} style={{ background: '#fff', border: '1px solid #dde5f5', borderRadius: 18, padding: '1.1rem', boxShadow: '0 1px 2px rgba(15,31,61,.04)' }}>
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 30, fontWeight: 900, color: '#102a56', lineHeight: 1.05 }}>
                <CountUp end={item.value} />
              </div>
              <div style={{ fontSize: 13, color: '#475569', marginTop: 4 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </RevealOnScroll>

      {/* ── Role cards ── */}
      <RevealOnScroll as="section" style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem 1rem 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(22px, 3.2vw, 30px)', fontWeight: 900, color: '#111827', marginBottom: 8, letterSpacing: -0.4 }}>
            Platform for every role
          </h2>
          <p style={{ color: '#475569', margin: 0, fontSize: 14 }}>
            Student, teacher, school and admin workflows are all available in the project foundation.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
          {ROLE_CARDS.map((card) => (
            <Link key={card.title} href={card.href} style={{ textDecoration: 'none' }} aria-label={card.title}>
              <div className="role-card">
                <div aria-hidden="true" style={{ fontSize: 34, marginBottom: 10 }}>{card.icon}</div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 18, color: '#0e2347', marginBottom: 8 }}>{card.title}</div>
                <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.65 }}>{card.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </RevealOnScroll>

      {/* ── Calculator strip — premium, responsive-safe ── */}
      <RevealOnScroll as="section" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1rem 1rem' }}>
        <Link href="/calculators" style={{ textDecoration: 'none', display: 'block' }} aria-label="Open free calculators">
          <div style={{ background: 'linear-gradient(135deg,#0a5e3f,#064e34)', color: '#fff', borderRadius: 20, padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', cursor: 'pointer', boxShadow: '0 8px 24px rgba(10,94,63,.25)' }}>
            <span aria-hidden="true" style={{ fontSize: 48, lineHeight: 1 }}>🧮</span>
            <div style={{ flex: '1 1 240px', minWidth: 0 }}>
              <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: 'clamp(17px, 2.5vw, 21px)', marginBottom: 4 }}>
                Free Math &amp; Science Calculators
              </div>
              <div style={{ fontSize: 13, opacity: 0.88, lineHeight: 1.5 }}>
                Percentage · Interest · Geometry · Statistics · Fractions · Quadratic · Mole · Matrix · Scientific
              </div>
            </div>
            <div style={{ background: '#ffffff22', border: '1px solid #ffffff55', borderRadius: 12, padding: '10px 18px', fontWeight: 800, fontSize: 14, whiteSpace: 'nowrap' }}>
              Open Calculators →
            </div>
          </div>
        </Link>
      </RevealOnScroll>

      {/* ── Quick access tile section ── */}
      <RevealOnScroll as="section" style={{ maxWidth: 1100, margin: '0 auto', padding: '1rem 1rem 3rem' }}>
        <div style={{ background: 'linear-gradient(135deg,#102a56,#254f97)', color: '#fff', borderRadius: 24, padding: '1.75rem', boxShadow: '0 8px 32px rgba(16,42,86,.20)' }}>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px, 2.8vw, 26px)', fontWeight: 900, marginTop: 0, marginBottom: 14, letterSpacing: -0.3 }}>
            Quick access
          </h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {QUICK_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="quick-tile">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1rem 4rem' }}>
        <CommentSection branch="general" pageUrl="/" />
      </section>
      <JsonLd data={homePageSchemas()} />
    </>
  )
}
