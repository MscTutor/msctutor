'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { LOCALE_FLAGS, LOCALE_NAMES, SUPPORTED_LOCALES, loadMessages, t } from '@/lib/i18n-client'

export default function TopBar() {
  const { theme, setTheme } = useTheme()
  const [lang, setLang] = useState<string>('en')
  const [messages, setMessages] = useState<Record<string, any>>({})

  useEffect(() => {
    const saved = localStorage.getItem('msc_locale') || 'en'
    setLang(saved)
    document.documentElement.lang = saved
    document.documentElement.dir = ['ar', 'ur'].includes(saved) ? 'rtl' : 'ltr'
    loadMessages((SUPPORTED_LOCALES.includes(saved as any) ? saved : 'en') as any).then(setMessages)
  }, [])

  function handleLangChange(newLang: string) {
    localStorage.setItem('msc_locale', newLang)
    document.documentElement.lang = newLang
    document.documentElement.dir = ['ar', 'ur'].includes(newLang) ? 'rtl' : 'ltr'
    setLang(newLang)
    window.location.reload()
  }

  const activeLocale = (SUPPORTED_LOCALES.includes(lang as any) ? lang : 'en') as keyof typeof LOCALE_NAMES

  return (
    <div
      style={{ height: 'var(--topbar-h)' }}
      className="bg-primary-600 text-white flex items-center px-4 text-xs gap-3"
    >
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="bg-white/15 rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
          {LOCALE_FLAGS[activeLocale]} {t(messages, 'topbar.free_badge', 'Free')}
        </span>
        <span className="opacity-60 hidden sm:block">{t(messages, 'topbar.boards', 'CBSE • ICSE • State Board')}</span>
      </div>

      <div className="flex-1 text-center font-medium opacity-90 text-[11.5px] hidden md:block">
        {t(messages, 'topbar.tagline', 'Free AI education for every student — MscTutor.in')}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
        <select
          value={lang}
          onChange={e => handleLangChange(e.target.value)}
          className="bg-transparent border-none text-white text-[12px] cursor-pointer outline-none"
          aria-label="Select language"
        >
          {SUPPORTED_LOCALES.map(locale => (
            <option key={locale} value={locale} className="text-black bg-white">
              {LOCALE_FLAGS[locale]} {LOCALE_NAMES[locale]}
            </option>
          ))}
        </select>

        <Link
          href="/login"
          className="bg-white/15 hover:bg-white/25 border border-white/25 rounded-md px-3 py-0.5 text-[12px] transition"
        >
          {t(messages, 'nav.login', 'Sign In')}
        </Link>

        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-base px-1 hover:opacity-80 transition"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  )
}
