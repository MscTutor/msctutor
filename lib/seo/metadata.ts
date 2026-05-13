// lib/seo/metadata.ts — Complete multilingual SEO system
// schema.org, OpenGraph, Twitter, hreflang, canonical

import type { Metadata }  from 'next'
import { SUPPORTED_LOCALES, LOCALE_NAMES, isRTL, type Locale } from '@/i18n'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.in'
const SITE_NAME = 'MscTutor'

// ── LOCALE → IETF LANGUAGE TAG ────────────────────────────────────
export const LOCALE_TO_IETF: Record<string, string> = {
  en: 'en-IN', hi: 'hi-IN', bn: 'bn-IN', gu: 'gu-IN',
  mr: 'mr-IN', ta: 'ta-IN', te: 'te-IN', pa: 'pa-IN',
  ur: 'ur-PK', as: 'as-IN', ar: 'ar-SA', fr: 'fr-FR',
}

// ── LOCALE → OG LOCALE ────────────────────────────────────────────
export const LOCALE_TO_OG: Record<string, string> = {
  en: 'en_IN', hi: 'hi_IN', bn: 'bn_IN', gu: 'gu_IN',
  mr: 'mr_IN', ta: 'ta_IN', te: 'te_IN', pa: 'pa_IN',
  ur: 'ur_PK', as: 'as_IN', ar: 'ar_SA', fr: 'fr_FR',
}

// ── PAGE SEO DATABASE (all locales) ──────────────────────────────
type LocaleStr = Partial<Record<Locale, string>>

interface PageSEO {
  title:       LocaleStr
  description: LocaleStr
  keywords?:   string[]
  noIndex?:    boolean
}

export const PAGE_SEO: Record<string, PageSEO> = {
  home: {
    title: {
      en: 'MscTutor — Free AI Tutor for Class 1-12 NCERT',
      hi: 'MscTutor — कक्षा 1-12 के लिए Free AI शिक्षक',
      bn: 'MscTutor — শ্রেণী 1-12 NCERT-এর জন্য বিনামূল্যে AI শিক্ষক',
      gu: 'MscTutor — ધોરણ 1-12 NCERT માટે Free AI',
      mr: 'MscTutor — इयत्ता 1-12 NCERT साठी Free AI',
      ta: 'MscTutor — வகுப்பு 1-12 NCERT-க்கான இலவச AI ஆசிரியர்',
      te: 'MscTutor — తరగతి 1-12 NCERT ఉచిత AI',
      pa: 'MscTutor — ਜਮਾਤ 1-12 NCERT ਲਈ Free AI',
      ur: 'MscTutor — جماعت 1-12 کے لیے مفت AI استاد',
      as: 'MscTutor — শ্ৰেণী 1-12 NCERT ৰ বাবে বিনামূলীয়া AI',
      ar: 'MscTutor — معلم AI مجاني للصف 1-12',
      fr: 'MscTutor — Tuteur IA gratuit Classe 1-12 NCERT',
    },
    description: {
      en: 'Free AI tutor for Class 1-12 NCERT. Ask via text, image, voice or PDF. Step-by-step answers in Hindi, English and 10+ Indian languages. Adaptive learning that remembers your progress.',
      hi: 'कक्षा 1-12 NCERT के लिए Free AI ट्यूटर। Text, Image, Voice या PDF से पूछो। हिंदी, English और 10+ भाषाओं में step-by-step जवाब। Progress याद रखने वाला Adaptive Learning।',
      bn: 'কক্ষা 1-12 NCERT-এর জন্য Free AI। বাংলায় step-by-step উত্তর। Text, Image, Voice বা PDF দিয়ে প্রশ্ন করো।',
      ar: 'معلم AI مجاني للصف 1-12 NCERT. اسأل بالنص أو الصورة أو الصوت. إجابات تفصيلية باللغة العربية.',
      fr: 'Tuteur IA gratuit pour la Classe 1-12. Posez des questions par texte, image ou voix. Réponses en français étape par étape.',
    },
    keywords: ['NCERT solutions', 'AI tutor', 'free education India', 'class 10 solutions', 'class 12', 'JEE preparation', 'NEET preparation', 'CBSE', 'ICSE', 'Hindi medium education'],
  },
  ask: {
    title: {
      en: 'Ask AI — Free NCERT Solutions | MscTutor',
      hi: 'AI से पूछो — Free NCERT हल | MscTutor',
      ta: 'AI-யிடம் கேளு — இலவச NCERT தீர்வுகள் | MscTutor',
      ar: 'اسأل الذكاء الاصطناعي — حلول مجانية | MscTutor',
    },
    description: {
      en: 'Get instant AI solutions for any NCERT question. Type, upload image, speak, or upload PDF. Class 1-12, all subjects, CBSE & ICSE. Free step-by-step explanations.',
      hi: 'किसी भी NCERT सवाल का तुरंत AI हल पाओ। Type करो, Photo Upload करो, बोलो या PDF Upload करो। कक्षा 1-12, सभी विषय। Free step-by-step व्याख्या।',
    },
    keywords: ['ask AI', 'NCERT solutions', 'homework help', 'instant answers', 'math solver', 'science help', 'image to solution'],
  },
  aiTeacher: {
    title: {
      en: 'AI Teacher — Adaptive Personalized Learning | MscTutor',
      hi: 'AI शिक्षक — Adaptive Personal Learning | MscTutor',
      ar: 'المعلم الذكي — تعلم تكيفي | MscTutor',
      fr: 'Professeur IA — Apprentissage Adaptatif | MscTutor',
    },
    description: {
      en: 'Your personal AI teacher available 24/7. Remembers your progress, detects weak topics, adapts difficulty level. Available in 12 languages. 100% free for all students.',
      hi: 'आपका 24/7 Personal AI शिक्षक। Progress याद रखता है, कमजोर topics detect करता है, difficulty adapt करता है। 12 भाषाओं में उपलब्ध। सभी छात्रों के लिए 100% Free।',
    },
    keywords: ['AI teacher', 'adaptive learning', 'personalized tutor', 'weak topic detection', 'spaced repetition', '24/7 teacher'],
  },
  formulas: {
    title: {
      en: 'NCERT Formula Bank — Class 6-12 Physics, Chemistry, Maths | MscTutor',
      hi: 'NCERT फॉर्मूला बैंक — कक्षा 6-12 | MscTutor',
    },
    description: {
      en: '1000+ NCERT formulas for Class 6-12. Physics, Chemistry, Mathematics with variables, examples, derivations and practice problems. CBSE and ICSE boards.',
      hi: '1000+ NCERT फॉर्मूले कक्षा 6-12 के लिए। Physics, Chemistry, Mathematics। Variables, उदाहरण, व्युत्पत्ति।',
    },
    keywords: ['NCERT formulas', 'physics formulas', 'chemistry formulas', 'maths formulas', 'class 10', 'class 12', 'formula sheet'],
  },
  mockTest: {
    title: {
      en: 'AI Mock Test — NCERT Board Exam Practice | MscTutor',
      hi: 'AI मॉक टेस्ट — Board परीक्षा Practice | MscTutor',
    },
    description: {
      en: 'AI-generated mock tests for NCERT board exam preparation. Class 6-12, all subjects. Adaptive difficulty, instant results, performance analysis. CBSE and ICSE.',
      hi: 'Board परीक्षा की तैयारी के लिए AI Mock Tests। कक्षा 6-12, सभी विषय। Adaptive difficulty, instant results।',
    },
    keywords: ['mock test', 'NCERT practice test', 'board exam preparation', 'CBSE test', 'ICSE test', 'online test Class 10'],
  },
  class: {
    title: {
      en: 'NCERT Class 1-12 — All Subjects & Solutions | MscTutor',
      hi: 'NCERT कक्षा 1-12 — सभी विषय | MscTutor',
    },
    description: {
      en: 'Complete NCERT syllabus for Class 1-12. Mathematics, Science, Social Studies, English, Hindi and more. AI-powered explanations for every chapter.',
      hi: 'कक्षा 1-12 के लिए पूरी NCERT syllabus। Maths, Science, Social, English, Hindi और अन्य। हर chapter का AI explanation।',
    },
    keywords: ['NCERT class 1 to 12', 'all subjects', 'chapter solutions', 'CBSE syllabus'],
  },
  pricing: {
    title: {
      en: 'Pricing — Free & Premium Plans | MscTutor',
      hi: 'मूल्य — Free और Premium Plans | MscTutor',
    },
    description: {
      en: 'MscTutor is free for all students. Premium plans available for unlimited AI questions, advanced features and priority support. Start free, upgrade anytime.',
      hi: 'MscTutor सभी छात्रों के लिए Free है। Premium plans unlimited AI questions के लिए। Free शुरू करें, कभी भी upgrade करें।',
    },
    keywords: ['MscTutor pricing', 'free AI tutor', 'education subscription', 'premium plan India'],
  },
  blog: {
    title: {
      en: 'Education Blog — Study Tips & NCERT Help | MscTutor',
      hi: 'Education Blog — Study Tips | MscTutor',
    },
    description: {
      en: 'Tips for board exam preparation, NCERT solutions, study strategies, and AI-powered learning. Updated regularly by education experts.',
      hi: 'Board exam preparation tips, NCERT solutions, study strategies। शिक्षा विशेषज्ञों द्वारा नियमित update।',
    },
    keywords: ['education blog', 'study tips', 'board exam tips', 'NCERT help', 'learning strategies'],
  },
}

// ── GET SEO FOR PAGE + LOCALE ─────────────────────────────────────
export function getPageSEO(pageKey: string, locale: string): { title: string; description: string } {
  const seo  = PAGE_SEO[pageKey] ?? PAGE_SEO.home
  const lang = locale as Locale
  return {
    title:       seo.title[lang]       ?? seo.title['en']       ?? 'MscTutor',
    description: seo.description[lang] ?? seo.description['en'] ?? 'Free AI Education',
  }
}

// ── BUILD HREFLANG ALTERNATES ─────────────────────────────────────
export function buildAlternates(path: string): NonNullable<Metadata['alternates']> {
  const languages: Record<string, string> = { 'x-default': `${BASE}${path}` }
  for (const locale of SUPPORTED_LOCALES) {
    languages[LOCALE_TO_IETF[locale] ?? locale] = locale === 'en'
      ? `${BASE}${path}`
      : `${BASE}/${locale}${path}`
  }
  return { canonical: `${BASE}${path}`, languages }
}

// ── BUILD FULL METADATA ────────────────────────────────────────────
export function buildMetadata(params: {
  pageKey:     string
  locale?:     string
  path?:       string
  title?:      string     // Override title
  description?: string   // Override description
  image?:      string
  noIndex?:    boolean
  type?:       'website' | 'article'
}): Metadata {
  const locale   = params.locale ?? 'en'
  const path     = params.path   ?? '/'
  const seo      = getPageSEO(params.pageKey, locale)
  const title    = params.title       ?? seo.title
  const desc     = params.description ?? seo.description
  const keywords = PAGE_SEO[params.pageKey]?.keywords ?? []
  const image    = params.image ?? `${BASE}/og/${params.pageKey}-${locale}.png`
  const fallbackImg = `${BASE}/og-image.png`
  const ogImage  = `${image}`

  return {
    metadataBase: new URL(BASE),
    title,
    description:  desc,
    keywords:     keywords.join(', '),

    authors:  [{ name: 'MscTutor Team', url: BASE }],
    creator:  'MscTutor',
    publisher:'MscTutor Education Pvt Ltd',

    openGraph: {
      type:        (params.type ?? 'website') as 'website',
      siteName:    SITE_NAME,
      title,
      description: desc,
      url:         `${BASE}${path}`,
      locale:      LOCALE_TO_OG[locale] ?? 'en_IN',
      alternateLocale: SUPPORTED_LOCALES
        .filter(l => l !== locale)
        .map(l => LOCALE_TO_OG[l] ?? l),
      images: [{
        url:    ogImage,
        width:  1200,
        height: 630,
        alt:    title,
        type:   'image/png',
      }, {
        url:    fallbackImg,
        width:  1200,
        height: 630,
        alt:    'MscTutor — Free AI Education',
      }],
    },

    twitter: {
      card:        'summary_large_image',
      site:        '@MscTutor',
      creator:     '@MscTutor',
      title,
      description: desc,
      images:      [ogImage],
    },

    alternates: buildAlternates(path),

    robots: params.noIndex
      ? { index: false, follow: false }
      : {
          index:     true,
          follow:    true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        },

    icons: {
      icon:    '/favicon.svg',
      apple:   '/icons/apple-touch-icon.png',
      shortcut:'/favicon.svg',
    },

    manifest: '/manifest.json',

    other: {
      'application-name':    SITE_NAME,
      'apple-mobile-web-app-capable':          'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'format-detection':    'telephone=no',
      ...(isRTL(locale as Locale) ? { dir: 'rtl' } : {}),
    },
  }
}

// ── CLASS PAGE METADATA ────────────────────────────────────────────
export function buildClassMetadata(classId: string, locale = 'en'): Metadata {
  const titles: Record<string, string> = {
    en: `Class ${classId} NCERT — All Subjects & Free AI Solutions | MscTutor`,
    hi: `कक्षा ${classId} NCERT — सभी विषय | MscTutor`,
    bn: `শ্রেণী ${classId} NCERT — সব বিষয় | MscTutor`,
    ta: `வகுப்பு ${classId} NCERT — அனைத்து பாடங்கள் | MscTutor`,
    te: `తరగతి ${classId} NCERT — అన్ని సబ్జెక్టులు | MscTutor`,
    ar: `الصف ${classId} NCERT — جميع المواد | MscTutor`,
  }
  const descs: Record<string, string> = {
    en: `Free NCERT solutions for Class ${classId}. AI-powered step-by-step explanations for Maths, Science, English and all subjects. Ask in any of 12 Indian languages.`,
    hi: `कक्षा ${classId} NCERT के लिए Free हल। Maths, Science, English और सभी विषयों के लिए AI step-by-step explanation। 12 भारतीय भाषाओं में।`,
  }
  return buildMetadata({
    pageKey:     'class',
    locale,
    path:        `/class/${classId}`,
    title:       titles[locale] ?? titles.en,
    description: descs[locale]  ?? descs.en,
  })
}

// ── SUBJECT PAGE METADATA ──────────────────────────────────────────
export function buildSubjectMetadata(classId: string, subject: string, locale = 'en'): Metadata {
  const subjectName = subject.charAt(0).toUpperCase() + subject.slice(1).replace(/-/g, ' ')
  const titles: Record<string, string> = {
    en: `Class ${classId} ${subjectName} — NCERT Solutions & AI Explanations | MscTutor`,
    hi: `कक्षा ${classId} ${subjectName} — NCERT हल | MscTutor`,
    ta: `வகுப்பு ${classId} ${subjectName} — NCERT தீர்வுகள் | MscTutor`,
    ar: `الصف ${classId} ${subjectName} — حلول NCERT | MscTutor`,
  }
  const descs: Record<string, string> = {
    en: `Free NCERT ${subjectName} solutions for Class ${classId}. Complete chapter-wise solutions, formulas, experiments and AI explanations. CBSE and ICSE. Download PDF notes.`,
    hi: `कक्षा ${classId} ${subjectName} के लिए Free NCERT हल। Chapter-wise solutions, formulas। CBSE और ICSE।`,
  }
  return buildMetadata({
    pageKey:     'class',
    locale,
    path:        `/class/${classId}/${subject}`,
    title:       titles[locale] ?? titles.en,
    description: descs[locale]  ?? descs.en,
  })
}
