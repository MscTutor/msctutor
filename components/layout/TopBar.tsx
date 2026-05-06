'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { LANGUAGES } from '@/lib/constants'

export default function TopBar() {
  const { theme, setTheme } = useTheme()
  const [lang, setLang] = useState('en')

  return (
    <div
      style={{ height: 'var(--topbar-h)' }}
      className="bg-primary-600 text-white flex items-center px-4 text-xs gap-3"
    >
      {/* Left */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="bg-white/15 rounded-full px-2.5 py-0.5 text-[11px] font-semibold">🆓 Free</span>
        <span className="opacity-60 hidden sm:block">CBSE • ICSE • State Board</span>
      </div>

      {/* Center */}
      <div className="flex-1 text-center font-medium opacity-90 text-[11.5px] hidden md:block">
        ✨ Free AI education for every student — MscTutor.in
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
        {/* Language selector */}
        <select
          value={lang}
          onChange={e => setLang(e.target.value)}
          className="bg-transparent border-none text-white text-[12px] cursor-pointer outline-none"
          aria-label="Select language"
        >
          {LANGUAGES.slice(0, 10).map(l => (
            <option key={l.code} value={l.code} className="text-black bg-white">
              {l.nativeName}
            </option>
          ))}
        </select>

        {/* Sign In */}
        <Link
          href="/login"
          className="bg-white/15 hover:bg-white/25 border border-white/25 rounded-md px-3 py-0.5 text-[12px] transition"
        >
          Sign In
        </Link>

        {/* Dark mode */}
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
