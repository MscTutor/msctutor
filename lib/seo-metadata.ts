// lib/seo-metadata.ts — Multilingual SEO (FREE, no paid service)

import type { Metadata } from 'next'
import { SUPPORTED_LOCALES, LOCALE_NAMES, isRTL, type Locale } from '@/i18n'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.vercel.app'

// Page-specific SEO data per locale
const PAGE_SEO: Record<string, Record<string, { title: string; description: string; keywords?: string }>> = {
  home: {
    en: { title: 'MscTutor — Free AI Tutor for Class 1-12 NCERT',             description: 'Free AI tutor for Class 1-12 NCERT. Ask via text, image, voice or PDF. Step-by-step answers in Hindi, English and 10+ Indian languages.', keywords: 'NCERT solutions, AI tutor, free education, class 10, class 12, JEE, NEET' },
    hi: { title: 'MscTutor — कक्षा 1-12 के लिए Free AI शिक्षक',              description: 'कक्षा 1-12 NCERT के लिए Free AI ट्यूटर। Text, Image, Voice से पूछो। हिंदी में step-by-step जवाब।', keywords: 'NCERT हल, AI शिक्षक, मुफ़्त शिक्षा, कक्षा 10, JEE, NEET' },
    bn: { title: 'MscTutor — বিনামূল্যে AI টিউটর কক্ষা ১-১২',               description: 'কক্ষা ১-১২ NCERT-এর জন্য বিনামূল্যে AI। বাংলায় step-by-step উত্তর।' },
    ta: { title: 'MscTutor — வகுப்பு 1-12 NCERT இலவச AI ஆசிரியர்',           description: 'வகுப்பு 1-12 NCERT-க்கான இலவச AI ஆசிரியர். தமிழில் step-by-step விளக்கம்.' },
    te: { title: 'MscTutor — తరగతి 1-12 NCERT ఉచిత AI టీచర్',               description: 'తరగతి 1-12 NCERT కోసం ఉచిత AI. తెలుగులో step-by-step సమాధానాలు.' },
    gu: { title: 'MscTutor — ધોरण 1-12 NCERT માટે Free AI',                   description: 'ધોرण 1-12 NCERT માટે Free AI ટ્યૂટર. ગુજરાતીmaં step-by-step.' },
    mr: { title: 'MscTutor — इयत्ता 1-12 NCERT साठी Free AI',                description: 'इयत्ता 1-12 साठी Free AI. मराठीत step-by-step उत्तरे.' },
    pa: { title: 'MscTutor — ਜਮਾਤ 1-12 NCERT ਲਈ Free AI',                    description: 'ਜਮਾਤ 1-12 ਲਈ Free AI ਅਧਿਆਪਕ. ਪੰਜਾਬੀ ਵਿੱਚ step-by-step ਜਵਾਬ।' },
    ur: { title: 'MscTutor — جماعت 1-12 NCERT کے لیے مفت AI',                description: 'جماعت 1-12 کے لیے مفت AI استاد۔ اردو میں step-by-step جوابات۔' },
    as: { title: 'MscTutor — শ্ৰেণী 1-12 NCERT ৰ বাবে বিনামূলীয়া AI',       description: 'শ্ৰেণী 1-12 ৰ বাবে বিনামূলীয়া AI। অসমীয়াত step-by-step উত্তৰ।' },
    ar: { title: 'MscTutor — معلم AI مجاني للصف 1-12',                         description: 'معلم AI مجاني لمنهج الصف 1-12. إجابات خطوة بخطوة باللغة العربية.' },
    fr: { title: 'MscTutor — Tuteur IA gratuit Classe 1-12',                   description: 'Tuteur IA gratuit pour la Classe 1-12. Réponses étape par étape en français.' },
  },
  ask: {
    en: { title: 'Ask AI — Free NCERT Solutions | MscTutor', description: 'Get instant AI solutions for any NCERT question via text, image, voice or PDF. Class 1-12, all subjects, free.' },
    hi: { title: 'AI से पूछो — Free NCERT हल | MscTutor',   description: 'किसी भी NCERT सवाल का तुरंत AI हल। Text, Image, Voice या PDF। कक्षा 1-12, सभी विषय, Free।' },
  },
  aiTeacher: {
    en: { title: 'AI Teacher — Adaptive Learning | MscTutor', description: 'Personal AI teacher with memory. Adapts to your level, tracks progress, recommends revision. Available 24/7 in 12 languages. Free.' },
    hi: { title: 'AI शिक्षक — Adaptive Learning | MscTutor', description: 'Personal AI शिक्षक जो progress याद रखता है। 12 भाषाओं में 24/7। बिल्कुल Free।' },
  },
  formulas: {
    en: { title: 'NCERT Formula Bank — Class 6-12 | MscTutor', description: '1000+ NCERT formulas for Class 6-12 with variables, examples, derivations and practice problems. Physics, Chemistry, Maths.' },
    hi: { title: 'NCERT फॉर्मूला बैंक — कक्षा 6-12 | MscTutor', description: '1000+ NCERT फॉर्मूले कक्षा 6-12 के लिए। Variables, उदाहरण, व्युत्पत्ति।' },
  },
  mockTest: {
    en: { title: 'AI Mock Test — NCERT Practice | MscTutor', description: 'AI-generated mock tests for NCERT board exam preparation. Class 6-12, all subjects, CBSE and ICSE.' },
    hi: { title: 'AI मॉक टेस्ट — NCERT Practice | MscTutor', description: 'Board परीक्षा की तैयारी के लिए AI Mock Tests। कक्षा 6-12, सभी विषय।' },
  },
}

// Generate hreflang alternates for SEO
function buildAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {
    'x-default': `${BASE_URL}${path}`,
  }
  for (const locale of SUPPORTED_LOCALES) {
    alternates[locale] = locale === 'en'
      ? `${BASE_URL}${path}`
      : `${BASE_URL}/${locale}${path}`
  }
  return alternates
}

// Get locale-specific SEO data with English fallback
function getLocaleSEO(pageKey: string, locale: string): { title: string; description: string; keywords?: string } {
  const pageSeo = PAGE_SEO[pageKey]
  if (!pageSeo) {
    return {
      title:       'MscTutor — Free AI Education',
      description: 'Free AI-powered education platform for Indian students.',
    }
  }
  return pageSeo[locale] ?? pageSeo['en'] ?? { title: 'MscTutor', description: 'Free AI Education' }
}

// Build complete metadata for any page
export function buildPageMetadata(params: {
  pageKey:   string
  locale?:   string
  path?:     string
  canonical?: string
  ogImage?:  string
  noIndex?:  boolean
}): Metadata {
  const locale = params.locale ?? 'en'
  const path   = params.path   ?? '/'
  const seo    = getLocaleSEO(params.pageKey, locale)
  const dir    = isRTL(locale as Locale) ? 'rtl' : 'ltr'
  const ogImg  = params.ogImage ?? `${BASE_URL}/og-image.png`

  return {
    metadataBase: new URL(BASE_URL),
    title:        seo.title,
    description:  seo.description,
    keywords:     seo.keywords,

    openGraph: {
      title:       seo.title,
      description: seo.description,
      url:         `${BASE_URL}${path}`,
      siteName:    'MscTutor',
      locale:      locale,
      type:        'website',
      images: [{
        url:    ogImg,
        width:  1200,
        height: 630,
        alt:    seo.title,
      }],
    },

    twitter: {
      card:        'summary_large_image',
      title:       seo.title,
      description: seo.description,
      images:      [ogImg],
      creator:     '@MscTutor',
    },

    alternates: {
      canonical:  params.canonical ?? `${BASE_URL}${path}`,
      languages:  buildAlternates(path),
    },

    robots: params.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },

    other: {
      'content-language': locale,
      'og:locale:alternate': SUPPORTED_LOCALES.filter(l => l !== locale).join(','),
      ...(dir === 'rtl' ? { dir: 'rtl' } : {}),
    },
  }
}

// Sitemap entries with all language alternates
export function buildSitemapEntries(pages: { path: string; priority?: number; changefreq?: string }[]) {
  return pages.flatMap(({ path, priority = 0.7, changefreq = 'weekly' }) =>
    SUPPORTED_LOCALES.map(locale => ({
      url:          locale === 'en' ? `${BASE_URL}${path}` : `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: changefreq as 'weekly',
      priority,
      alternates: {
        languages: buildAlternates(path),
      },
    }))
  )
}
