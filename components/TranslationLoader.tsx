'use client'
// components/TranslationLoader.tsx
// Preloads translation JSON into window cache on mount

import { useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'
import { preloadTranslations } from '@/lib/use-translations'
import type { Locale } from '@/i18n'

export default function TranslationLoader() {
  const { locale } = useLanguage()

  useEffect(() => {
    preloadTranslations(locale as Locale)
    // Also preload English as fallback
    if (locale !== 'en') preloadTranslations('en')
  }, [locale])

  return null
}
