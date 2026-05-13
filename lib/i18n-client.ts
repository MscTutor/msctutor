'use client'

export const SUPPORTED_LOCALES = ['en','hi','bn','gu','mr','ta','te','pa','ur','as','ar','fr'] as const
export type Locale = typeof SUPPORTED_LOCALES[number]

export const LOCALE_NAMES: Record<Locale, string> = {
  en:'English', hi:'हिंदी', bn:'বাংলা', gu:'ગુજરાતી', mr:'मराठी',
  ta:'தமிழ்', te:'తెలుగు', pa:'ਪੰਜਾਬੀ', ur:'اردو', as:'অসমীয়া',
  ar:'العربية', fr:'Français',
}

export const LOCALE_FLAGS: Record<Locale, string> = {
  en:'🇬🇧', hi:'🇮🇳', bn:'🇧🇩', gu:'🇮🇳', mr:'🇮🇳',
  ta:'🇮🇳', te:'🇮🇳', pa:'🇮🇳', ur:'🇵🇰', as:'🇮🇳',
  ar:'🇸🇦', fr:'🇫🇷',
}

export function getSavedLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  const saved = localStorage.getItem('msc_locale') as Locale
  return SUPPORTED_LOCALES.includes(saved) ? saved : 'en'
}

export function saveLocale(locale: Locale): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('msc_locale', locale)
}

export async function loadMessages(locale: Locale): Promise<Record<string, any>> {
  try {
    const messages = await import(`../messages/${locale}.json`)
    return messages.default
  } catch {
    const fallback = await import(`../messages/en.json`)
    return fallback.default
  }
}

export function t(messages: Record<string, any>, key: string, fallback = key): string {
  const keys = key.split('.')
  let val: any = messages
  for (const k of keys) {
    val = val?.[k]
    if (val === undefined) return fallback
  }
  return typeof val === 'string' ? val : fallback
}
