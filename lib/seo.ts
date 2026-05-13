// lib/seo.ts — Multilingual SEO metadata (FREE, no paid service)

import type { Metadata } from 'next'
import { generateQuestionMeta as buildQuestionMeta } from './seo-engine'

const SITE_URL  = process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.in'
const SITE_NAME = 'MscTutor'

const HREFLANG: Record<string, string> = {
  en:'en', hi:'hi', bn:'bn-IN', gu:'gu-IN', mr:'mr-IN',
  ta:'ta-IN', te:'te-IN', pa:'pa-IN', ur:'ur', as:'as-IN', ar:'ar', fr:'fr',
}

const SEO_STRINGS: Record<string, Record<string, { title: string; desc: string }>> = {
  en: {
    home:      { title: 'MscTutor — Free AI Tutor for Class 1-12 NCERT',        desc: 'Free AI tutor for Class 1-12 NCERT. Ask via text, image, voice or PDF. Step-by-step answers in Hindi, English and 10+ Indian languages.' },
    ask:       { title: 'Ask AI — Free NCERT Solutions | MscTutor',               desc: 'Instant AI solutions for any NCERT question. Class 1-12, all subjects.' },
    aiTeacher: { title: 'AI Teacher — Adaptive Learning | MscTutor',              desc: 'Personal AI teacher that adapts to your level. Memory, weak topic detection, 12 languages. Free 24/7.' },
    formulas:  { title: 'NCERT Formula Bank — Class 6-12 | MscTutor',             desc: '1000+ NCERT formulas with examples and derivations. Class 6 to 12.' },
    mockTest:  { title: 'AI Mock Test Generator — NCERT | MscTutor',              desc: 'AI-generated CBSE/ICSE mock tests. Instant result analysis.' },
    classes:   { title: 'NCERT Classes 1-12 | MscTutor',                          desc: 'Complete NCERT syllabus for all classes. Free AI explanations.' },
    login:     { title: 'Login | MscTutor',                                        desc: 'Login to your MscTutor account.' },
    register:  { title: 'Create Free Account | MscTutor',                          desc: 'Create your free MscTutor account. Student, teacher or school.' },
    dashboard: { title: 'Student Dashboard | MscTutor',                            desc: 'Your personal learning dashboard.' },
  },
  hi: {
    home:      { title: 'MscTutor — Class 1-12 NCERT के लिए मुफ्त AI Tutor',      desc: 'NCERT के लिए मुफ्त AI tutor। हिंदी में step-by-step जवाब। 100% मुफ्त।' },
    ask:       { title: 'AI से पूछो — मुफ्त NCERT Solutions | MscTutor',           desc: 'किसी भी NCERT सवाल का तुरंत AI solution।' },
    aiTeacher: { title: 'AI टीचर — Adaptive Learning | MscTutor',                 desc: 'निजी AI शिक्षक जो आपकी progress याद रखे।' },
    formulas:  { title: 'NCERT फॉर्मूला बैंक | MscTutor',                          desc: '1000+ NCERT फॉर्मूले।' },
    mockTest:  { title: 'AI मॉक टेस्ट | MscTutor',                                 desc: 'AI से CBSE/ICSE mock test बनाएं।' },
    classes:   { title: 'NCERT Class 1-12 | MscTutor',                             desc: 'Class 1-12 का पूरा NCERT syllabus।' },
    login:     { title: 'लॉगिन | MscTutor',                                         desc: 'MscTutor में लॉगिन करें।' },
    register:  { title: 'मुफ्त अकाउंट बनाएं | MscTutor',                           desc: 'मुफ्त अकाउंट बनाएं।' },
    dashboard: { title: 'डैशबोर्ड | MscTutor',                                      desc: 'आपका निजी learning डैशबोर्ड।' },
  },
  ar: {
    home:      { title: 'MscTutor — معلم ذكاء اصطناعي مجاني',                      desc: 'معلم ذكاء اصطناعي مجاني. إجابات خطوة بخطوة.' },
    ask:       { title: 'اسأل الذكاء الاصطناعي | MscTutor',                         desc: 'حلول فورية لأي سؤال.' },
    aiTeacher: { title: 'المعلم الذكي | MscTutor',                                  desc: 'معلم ذكاء اصطناعي شخصي.' },
    formulas:  { title: 'بنك الصيغ | MscTutor',                                     desc: 'صيغ NCERT.' },
    mockTest:  { title: 'اختبار تجريبي | MscTutor',                                  desc: 'اختبارات بالذكاء الاصطناعي.' },
    classes:   { title: 'الفصول 1-12 | MscTutor',                                   desc: 'المنهج الكامل.' },
    login:     { title: 'تسجيل الدخول | MscTutor',                                   desc: 'تسجيل الدخول.' },
    register:  { title: 'إنشاء حساب | MscTutor',                                     desc: 'إنشاء حساب مجاني.' },
    dashboard: { title: 'لوحة التحكم | MscTutor',                                    desc: 'لوحة التحكم الشخصية.' },
  },
  fr: {
    home:      { title: 'MscTutor — Tuteur IA Gratuit',                              desc: 'Tuteur IA gratuit. Réponses étape par étape.' },
    ask:       { title: 'Demander à l\'IA | MscTutor',                               desc: 'Solutions instantanées.' },
    aiTeacher: { title: 'Professeur IA | MscTutor',                                  desc: 'Professeur IA personnel.' },
    formulas:  { title: 'Banque de Formules | MscTutor',                             desc: 'Formules avec exemples.' },
    mockTest:  { title: 'Test Blanc IA | MscTutor',                                  desc: 'Tests générés par IA.' },
    classes:   { title: 'Classes 1-12 | MscTutor',                                   desc: 'Programme complet.' },
    login:     { title: 'Connexion | MscTutor',                                       desc: 'Connexion.' },
    register:  { title: 'Créer un Compte | MscTutor',                                desc: 'Compte gratuit.' },
    dashboard: { title: 'Tableau de bord | MscTutor',                                desc: 'Tableau de bord personnel.' },
  },
}

export function generateMetadata(page: string, locale = 'en', path = '/'): Metadata {
  const locData  = SEO_STRINGS[locale] ?? SEO_STRINGS.en
  const strings  = locData[page] ?? SEO_STRINGS.en[page] ?? SEO_STRINGS.en.home
  const url      = `${SITE_URL}${path}`

  return {
    title:       strings.title,
    description: strings.desc,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        Object.entries(HREFLANG).map(([loc, lang]) => [lang, `${SITE_URL}${path}?lang=${loc}`])
      ),
    },
    openGraph: {
      type:        'website',
      url,
      siteName:    SITE_NAME,
      title:       strings.title,
      description: strings.desc,
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: strings.title }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       strings.title,
      description: strings.desc,
      images:      [`${SITE_URL}/og-image.png`],
    },
    robots: { index: true, follow: true },
  }
}

export function generateEduJsonLD(params: { name: string; description: string; url: string }) {
  return {
    '@context':   'https://schema.org',
    '@type':      'WebApplication',
    name:          params.name,
    description:   params.description,
    url:           params.url,
    applicationCategory: 'EducationApplication',
    operatingSystem:     'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    inLanguage:    ['en','hi','bn','gu','mr','ta','te','pa','ur','as','ar','fr'],
  }
}

export function generateQuestionMeta(
  titleOrParams: string | { title?: string; question?: string; solution: string; subject?: string; classLevel?: string; formula?: string; ncertRef?: string; language?: string },
  solution?: string,
  subject?: string,
) {
  if (typeof titleOrParams === 'string') {
    const meta = buildQuestionMeta({ title: titleOrParams, solution: solution ?? '', subject })
    return { title: meta.metaTitle, description: meta.metaDesc, metaTitle: meta.metaTitle, metaDesc: meta.metaDesc, keywords: meta.keywords, slug: meta.slug, canonical: meta.canonical }
  }

  const normalizedTitle = titleOrParams.title ?? titleOrParams.question ?? 'Untitled Question'
  const meta = buildQuestionMeta({
    title: normalizedTitle,
    solution: titleOrParams.solution,
    subject: titleOrParams.subject,
    classLevel: titleOrParams.classLevel,
    formula: titleOrParams.formula,
    ncertRef: titleOrParams.ncertRef,
    language: titleOrParams.language,
  })
  return { ...meta, title: meta.metaTitle, description: meta.metaDesc }
}

export function qaPageSchema(question: string, answer: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
        url,
      },
    },
  }
}
