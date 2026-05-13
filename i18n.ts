// i18n.ts — 12 languages, all FREE (local JSON files, no paid API)
import { notFound }        from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

export const SUPPORTED_LOCALES = [
  'en','hi','bn','gu','mr','ta','te','pa','ur','as','ar','fr'
] as const

export type Locale = (typeof SUPPORTED_LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

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

export const RTL_LOCALES: Locale[] = ['ar','ur']
export function isRTL(locale: Locale): boolean { return RTL_LOCALES.includes(locale) }

export const LOCALE_GROUPS: Record<string, Locale[]> = {
  'Indian Languages': ['hi','bn','gu','mr','ta','te','pa','ur','as'],
  'International':    ['en','ar','fr'],
}

export default getRequestConfig(async ({ locale }) => {
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound()
  return { messages: (await import(`./messages/${locale}.json`)).default }
})
