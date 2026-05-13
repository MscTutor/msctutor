'use client'
// lib/language-context.tsx — 12 Languages, FREE cookie storage

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, RTL_LOCALES, type Locale } from '@/i18n'

interface LangCtx { locale: Locale; setLocale: (l: Locale) => void; dir: 'ltr'|'rtl'; isRTL: boolean }
const Ctx = createContext<LangCtx>({ locale: DEFAULT_LOCALE, setLocale:()=>{}, dir:'ltr', isRTL: false })

export function LanguageProvider({ children, initialLocale }: { children: ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? DEFAULT_LOCALE)

  useEffect(() => {
    const saved = getCookie('msc_locale') as Locale
    if (saved && SUPPORTED_LOCALES.includes(saved)) { setLocaleState(saved); return }
    const browser = navigator.language.slice(0,2) as Locale
    if (SUPPORTED_LOCALES.includes(browser)) setLocaleState(browser)
  }, [])

  useEffect(() => {
    const rtl = RTL_LOCALES.includes(locale)
    document.documentElement.dir  = rtl ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
    // Special fonts for specific scripts
    const fontMap: Partial<Record<Locale, string>> = {
      ar: "'Noto Naskh Arabic', 'Amiri', sans-serif",
      ur: "'Noto Nastaliq Urdu', sans-serif",
      ta: "'Noto Sans Tamil', sans-serif",
      te: "'Noto Sans Telugu', sans-serif",
      bn: "'Noto Sans Bengali', sans-serif",
      gu: "'Noto Sans Gujarati', sans-serif",
      as: "'Noto Sans Bengali', sans-serif",
    }
    document.documentElement.style.fontFamily = fontMap[locale] ?? ''
  }, [locale])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    setCookie('msc_locale', l, 30)
    window.location.reload()  // Reload to apply server-side translations
  }, [])

  const isRTL = RTL_LOCALES.includes(locale)
  return (
    <Ctx.Provider value={{ locale, setLocale, dir: isRTL?'rtl':'ltr', isRTL }}>
      {children}
    </Ctx.Provider>
  )
}

export function useLanguage() { return useContext(Ctx) }

function getCookie(name: string): string {
  if (typeof document === 'undefined') return ''
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return m ? decodeURIComponent(m[1]) : ''
}
function setCookie(name: string, value: string, days: number) {
  const exp = new Date(Date.now() + days * 86400000).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${exp};path=/;SameSite=Lax`
}
