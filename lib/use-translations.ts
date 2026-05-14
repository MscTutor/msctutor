'use client'
// lib/use-translations.ts — FREE local JSON translations, no paid API

import { useState, useEffect, useCallback } from 'react'

export type SupportedLocale = 'en'|'hi'|'bn'|'gu'|'mr'|'ta'|'te'|'pa'|'ur'|'as'|'ar'|'fr'
const VALID_LOCALES: SupportedLocale[] = ['en','hi','bn','gu','mr','ta','te','pa','ur','as','ar','fr']
const CACHE: Partial<Record<SupportedLocale, Record<string,unknown>>> = {}

function getCookie(name: string): string {
  if (typeof document === 'undefined') return ''
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return m ? decodeURIComponent(m[1]) : ''
}

function get(obj: Record<string,unknown>, path: string): string {
  let cur: unknown = obj
  for (const key of path.split('.')) {
    if (!cur || typeof cur !== 'object') return ''
    cur = (cur as Record<string,unknown>)[key]
  }
  return typeof cur === 'string' ? cur : ''
}

async function load(loc: SupportedLocale): Promise<Record<string,unknown>> {
  if (CACHE[loc]) return CACHE[loc]!
  try {
    const r = await fetch(`/messages/${loc}.json`)
    const d = await r.json()
    CACHE[loc] = d
    return d
  } catch {
    if (loc !== 'en' && !CACHE.en) {
      const r = await fetch('/messages/en.json')
      CACHE.en = await r.json()
    }
    return CACHE.en ?? {}
  }
}

export function useTranslations() {
  const [locale,   setLocale]   = useState<SupportedLocale>('en')
  const [messages, setMessages] = useState<Record<string,unknown>>({})
  const [loaded,   setLoaded]   = useState(false)

  useEffect(() => {
    // Read from localStorage first (written by language-context), then cookie, then default 'en'
    const ls  = (typeof window !== 'undefined' ? localStorage.getItem('msc_locale') : null) as SupportedLocale | null
    const ck  = getCookie('msc_locale') as SupportedLocale
    const saved = (ls && VALID_LOCALES.includes(ls) ? ls : null) ?? (VALID_LOCALES.includes(ck) ? ck : null)
    const loc   = saved ?? 'en'
    setLocale(loc)
    load(loc).then(d => { setMessages(d); setLoaded(true) })
  }, [])

  const t = useCallback((key: string, vars?: Record<string,string>): string => {
    let val = get(messages, key)
    if (!val) val = get(CACHE.en ?? {}, key)
    if (!val) val = key.split('.').pop() ?? key
    if (vars) Object.entries(vars).forEach(([k,v]) => { val = val.replace(`{${k}}`, v) })
    return val
  }, [messages])

  return {
    t,
    locale,
    loaded,
    dir: (['ar','ur'] as SupportedLocale[]).includes(locale) ? 'rtl' : 'ltr',
    isRTL: (['ar','ur'] as SupportedLocale[]).includes(locale),
  }
}

export async function preloadTranslations(locale: SupportedLocale) {
  await load(locale)
}
