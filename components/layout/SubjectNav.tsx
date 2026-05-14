'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NAV_MATH_CHAPTERS, NAV_SCIENCE_CHAPTERS, NAV_COMMERCE_CHAPTERS } from '@/lib/constants'
import { loadMessages, t } from '@/lib/i18n-client'

function DropLink({ href, title, badge, isNew }: { href: string; title: string; badge?: string; isNew?: boolean }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12.5px] text-[#0f1f3d] dark:text-[#e8eeff] hover:bg-[#f0f4ff] dark:hover:bg-[#1a2236] hover:text-primary-600 hover:pl-4 transition-all"
    >
      <span className="flex-1">{title}</span>
      {isNew
        ? <span className="bg-red-100 text-red-600 rounded-full px-2 py-0.5 text-[10px] font-bold">New</span>
        : badge && <span className="bg-[#f0f4ff] dark:bg-[#1a2236] border border-[#dde5f5] rounded-full px-2 py-0.5 text-[10px] text-[#5a6a8a]">{badge}</span>
      }
    </Link>
  )
}

function ColTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-bold uppercase tracking-[0.8px] text-primary-600 mb-2 pb-1.5 border-b-2 border-[#dde5f5] flex items-center gap-1.5">
      {children}
    </div>
  )
}

export default function SubjectNav() {
  const path = usePathname()
  const [locale, setLocale] = useState('en')
  const [messages, setMessages] = useState<Record<string, any>>({})
  const isActive = (href: string) => path === href || path.startsWith(href + '/')

  useEffect(() => {
    const saved = localStorage.getItem('msc_locale') || 'en'
    setLocale(saved)
    loadMessages(saved as any).then(setMessages)
  }, [])

  return (
    <nav
      style={{ height: 'var(--nav-h)' }}
      className="bg-white dark:bg-[#111827] border-b-2 border-primary-600 flex items-center px-3 gap-1 overflow-x-auto hide-scrollbar"
      data-locale={locale}
    >
      <NavItem href="/" active={path === '/'}>🏠 {t(messages, 'nav.home', 'Home')}</NavItem>
      <Divider />

      <div className="nav-dropdown relative inline-flex items-center">
        <NavItem href="/subject/mathematics" active={isActive('/subject/mathematics')}>➕ {t(messages, 'nav.mathematics', 'Mathematics')} ▾</NavItem>
        <div className="drop-panel absolute top-[calc(100%+6px)] left-0 bg-white dark:bg-[#111827] border border-[#dde5f5] dark:border-[#1e2d4a] rounded-[14px] shadow-lg min-w-[560px] z-[400] p-4 flex gap-4 animate-fade-in">
          <div className="flex-1">
            <ColTitle>📘 Class 9-10</ColTitle>
            {NAV_MATH_CHAPTERS.class9_10.map(c => (
              <DropLink key={c.slug} href={`/subject/mathematics/chapter/${c.slug}`} title={c.title} badge={c.badge} isNew={c.isNew} />
            ))}
          </div>
          <div className="flex-1">
            <ColTitle>📗 Class 11-12</ColTitle>
            {NAV_MATH_CHAPTERS.class11_12.map(c => (
              <DropLink key={c.slug} href={`/subject/mathematics/chapter/${c.slug}`} title={c.title} badge={c.badge} isNew={c.isNew} />
            ))}
          </div>
          <div className="min-w-[130px]">
            <ColTitle>🏆 Tools</ColTitle>
            <DropLink href="/calculators" title="🧮 Calculators" />
            <DropLink href="/formulas" title="📋 Formula Bank" />
            <DropLink href="/mock-test?subject=Mathematics" title="📝 Math Mock Test" />
          </div>
        </div>
      </div>

      <div className="nav-dropdown relative inline-flex items-center">
        <NavItem href="/subject/science" active={isActive('/subject/science')}>⚗️ {t(messages, 'nav.science', 'Science')} ▾</NavItem>
        <div className="drop-panel absolute top-[calc(100%+6px)] left-0 bg-white dark:bg-[#111827] border border-[#dde5f5] dark:border-[#1e2d4a] rounded-[14px] shadow-lg min-w-[560px] z-[400] p-4 flex gap-4 animate-fade-in">
          <div className="flex-1">
            <ColTitle>🔬 Physics</ColTitle>
            {NAV_SCIENCE_CHAPTERS.physics.map(c => (
              <DropLink key={c.slug} href={`/subject/physics/chapter/${c.slug}`} title={c.title} badge={c.badge} />
            ))}
          </div>
          <div className="flex-1">
            <ColTitle>🧪 Chemistry</ColTitle>
            {NAV_SCIENCE_CHAPTERS.chemistry.map(c => (
              <DropLink key={c.slug} href={`/subject/chemistry/chapter/${c.slug}`} title={c.title} badge={c.badge} />
            ))}
          </div>
          <div className="flex-1">
            <ColTitle>🧬 Biology</ColTitle>
            {NAV_SCIENCE_CHAPTERS.biology.map(c => (
              <DropLink key={c.slug} href={`/subject/biology/chapter/${c.slug}`} title={c.title} badge={c.badge} />
            ))}
          </div>
        </div>
      </div>

      <div className="nav-dropdown relative inline-flex items-center">
        <NavItem href="/subject/commerce" active={isActive('/subject/commerce')}>📊 {t(messages, 'nav.commerce', 'Commerce')} ▾</NavItem>
        <div className="drop-panel absolute top-[calc(100%+6px)] left-0 bg-white dark:bg-[#111827] border border-[#dde5f5] dark:border-[#1e2d4a] rounded-[14px] shadow-lg min-w-[480px] z-[400] p-4 flex gap-4 animate-fade-in">
          <div className="flex-1">
            <ColTitle>📒 Accountancy</ColTitle>
            {NAV_COMMERCE_CHAPTERS.accountancy.map(c => (
              <DropLink key={c.slug} href={`/subject/accountancy/chapter/${c.slug}`} title={c.title} badge={c.badge} isNew={c.isNew} />
            ))}
          </div>
          <div className="flex-1">
            <ColTitle>💹 Economics</ColTitle>
            {NAV_COMMERCE_CHAPTERS.economics.map(c => (
              <DropLink key={c.slug} href={`/subject/economics/chapter/${c.slug}`} title={c.title} badge={c.badge} isNew={c.isNew} />
            ))}
          </div>
          <div className="flex-1">
            <ColTitle>🏢 Business Studies</ColTitle>
            {NAV_COMMERCE_CHAPTERS.business.map(c => (
              <DropLink key={c.slug} href={`/subject/business-studies/chapter/${c.slug}`} title={c.title} badge={c.badge} />
            ))}
          </div>
        </div>
      </div>

      <div className="nav-dropdown relative inline-flex items-center">
        <NavItem href="/class" active={isActive('/class')}>🎓 {t(messages, 'nav.classes', 'Classes')} ▾</NavItem>
        <div className="drop-panel absolute top-[calc(100%+6px)] left-0 bg-white dark:bg-[#111827] border border-[#dde5f5] dark:border-[#1e2d4a] rounded-[14px] shadow-lg w-[240px] z-[400] p-3 flex-col animate-fade-in">
          <ColTitle>Select Class</ColTitle>
          <div className="grid grid-cols-4 gap-1.5">
            {['1','2','3','4','5','6','7','8','9','10','11','12'].map(c => (
              <Link
                key={c}
                href={`/class/${c}`}
                className="py-1.5 rounded-lg text-center text-[13px] font-bold text-[#0f1f3d] dark:text-[#e8eeff] border-[1.5px] border-[#dde5f5] hover:bg-primary-600 hover:text-white hover:border-primary-600 transition"
              >
                {c}
              </Link>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-[#dde5f5]">
            <DropLink href="/jee-neet" title="🏆 JEE / NEET" isNew={true} />
            <DropLink href="/competitive" title="🎯 Competitive Exams" />
            <DropLink href="/live" title="🎥 Live Classes" isNew={true} />
          </div>
        </div>
      </div>

      <Divider />
      <NavItem href="/mock-test" active={isActive('/mock-test')}>📝 {t(messages, 'nav.mockTest', 'Mock Test')}</NavItem>
      <NavItem href="/pricing" active={isActive('/pricing')}>💰 {t(messages, 'nav.pricing', 'Pricing')}</NavItem>
      <NavItem href="/community" active={isActive('/community')}>💬 {t(messages, 'nav.community', 'Community')}</NavItem>
      <div className="nav-dropdown relative inline-flex items-center">
        <NavItem href="/school/register" active={false}>🏫 {t(messages, 'nav.schools', 'Schools')} ▾</NavItem>
        <div className="drop-panel absolute top-[calc(100%+6px)] right-0 bg-white dark:bg-[#111827] border border-[#dde5f5] dark:border-[#1e2d4a] rounded-[14px] shadow-lg w-[220px] z-[400] p-3 flex-col animate-fade-in">
          <DropLink href="/school/register" title="🏫 Register School" />
          <DropLink href="/school/login" title="🔑 School Login" />
          <DropLink href="/school-dashboard" title="📊 School Dashboard" />
          <DropLink href="/teacher/dashboard" title="👨‍🏫 Teacher Dashboard" />
        </div>
      </div>
    </nav>
  )
}

function NavItem({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition ${
        active
          ? 'bg-primary-600 text-white font-semibold'
          : 'text-[#5a6a8a] hover:bg-[#f0f4ff] hover:text-[#0f1f3d] dark:hover:bg-[#1a2236] dark:hover:text-[#e8eeff]'
      }`}
    >
      {children}
    </Link>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-[#dde5f5] mx-0.5 flex-shrink-0" />
}
