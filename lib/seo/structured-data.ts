// lib/seo/structured-data.ts — schema.org JSON-LD for educational platform

import { Fragment, createElement } from 'react'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.in'

// ── TYPES ─────────────────────────────────────────────────────────
type JsonLd = Record<string, unknown>

// ── ORGANIZATION SCHEMA ────────────────────────────────────────────
export function organizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type':    'EducationalOrganization',
    '@id':      `${BASE}/#organization`,
    name:       'MscTutor',
    url:        BASE,
    logo: {
      '@type':      'ImageObject',
      url:          `${BASE}/icons/icon-512.png`,
      width:        512,
      height:       512,
    },
    sameAs: [
      'https://twitter.com/MscTutor',
      'https://www.youtube.com/@msctutor',
      'https://t.me/msctutor',
    ],
    contactPoint: {
      '@type':           'ContactPoint',
      contactType:       'customer support',
      email:             'support@msctutor.in',
      availableLanguage: ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu'],
    },
    areaServed: {
      '@type': 'Country',
      name:    'India',
    },
    knowsAbout: ['NCERT', 'CBSE', 'ICSE', 'School Education', 'AI Tutoring', 'Adaptive Learning'],
    description: 'Free AI-powered educational platform for Indian school students (Class 1-12).',
    foundingDate: '2024',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 50 },
  }
}

// ── WEBSITE SCHEMA ─────────────────────────────────────────────────
export function websiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    '@id':      `${BASE}/#website`,
    url:        BASE,
    name:       'MscTutor',
    description:'Free AI tutor for Class 1-12 NCERT India',
    publisher:  { '@id': `${BASE}/#organization` },
    inLanguage: ['en-IN', 'hi-IN', 'bn-IN', 'gu-IN', 'mr-IN', 'ta-IN', 'te-IN', 'pa-IN', 'ur-PK', 'as-IN', 'ar-SA', 'fr-FR'],
    potentialAction: {
      '@type':       'SearchAction',
      target:        { '@type': 'EntryPoint', urlTemplate: `${BASE}/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ── EDUCATIONAL APP SCHEMA ─────────────────────────────────────────
export function educationalAppSchema(): JsonLd {
  return {
    '@context':       'https://schema.org',
    '@type':          'SoftwareApplication',
    name:             'MscTutor AI Tutor',
    applicationCategory: 'EducationApplication',
    operatingSystem: 'Web, Android, iOS',
    url:              BASE,
    screenshot:       `${BASE}/og-image.png`,
    featureList: [
      'AI-powered NCERT solutions',
      'Image and voice question input',
      'Adaptive personalized learning',
      'Mock test generator',
      'Formula bank with 1000+ formulas',
      '12 Indian language support',
    ],
    offers: {
      '@type':    'Offer',
      price:      '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type':       'AggregateRating',
      ratingValue:   '4.8',
      ratingCount:   '10000',
      bestRating:    '5',
      worstRating:   '1',
    },
    author: { '@id': `${BASE}/#organization` },
  }
}

// ── FAQ PAGE SCHEMA ────────────────────────────────────────────────
export function faqSchema(faqs: { question: string; answer: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type':          'Question',
      name:             f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

// ── COURSE SCHEMA ──────────────────────────────────────────────────
export function courseSchema(params: {
  name:         string
  description:  string
  classLevel:   string
  subject:      string
  url:          string
  provider?:    string
}): JsonLd {
  return {
    '@context':   'https://schema.org',
    '@type':      'Course',
    name:         params.name,
    description:  params.description,
    url:          params.url,
    provider: {
      '@type': 'Organization',
      name:    params.provider ?? 'MscTutor',
      url:     BASE,
    },
    hasCourseInstance: {
      '@type':        'CourseInstance',
      courseMode:     'online',
      inLanguage:     ['en', 'hi', 'bn', 'gu', 'mr', 'ta', 'te', 'pa', 'ur'],
      isAccessibleForFree: true,
    },
    educationalLevel:    `Grade ${params.classLevel}`,
    educationalAlignment: {
      '@type':            'AlignmentObject',
      alignmentType:      'educationalSubject',
      targetName:         params.subject,
      educationFramework: 'NCERT',
    },
    teaches:     params.subject,
    audience: {
      '@type':              'EducationalAudience',
      educationalRole:      'student',
      audienceType:         `Class ${params.classLevel} students`,
    },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  }
}

// ── ARTICLE / BLOG SCHEMA ──────────────────────────────────────────
export function articleSchema(params: {
  title:        string
  description:  string
  url:          string
  image?:       string
  datePublished: string
  dateModified?: string
  author?:      string
  keywords?:    string[]
}): JsonLd {
  return {
    '@context':      'https://schema.org',
    '@type':         'Article',
    headline:        params.title,
    description:     params.description,
    url:             params.url,
    image:           params.image ?? `${BASE}/og-image.png`,
    datePublished:   params.datePublished,
    dateModified:    params.dateModified ?? params.datePublished,
    author: {
      '@type': 'Organization',
      name:    params.author ?? 'MscTutor Team',
      url:     BASE,
    },
    publisher: {
      '@type': 'Organization',
      name:    'MscTutor',
      logo:    { '@type': 'ImageObject', url: `${BASE}/icons/icon-512.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': params.url },
    keywords:         params.keywords?.join(', '),
    inLanguage:       'en-IN',
    isPartOf:         { '@type': 'WebSite', name: 'MscTutor', url: BASE },
  }
}

// ── BREADCRUMB SCHEMA ──────────────────────────────────────────────
export function breadcrumbSchema(items: { name: string; url: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':   'ListItem',
      position:  i + 1,
      name:      item.name,
      item:      item.url.startsWith('http') ? item.url : `${BASE}${item.url}`,
    })),
  }
}

// ── Q&A / QUESTION SCHEMA ──────────────────────────────────────────
export function questionSchema(params: {
  question:    string
  answer:      string
  subject?:    string
  classLevel?: string
  url?:        string
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type':    'QAPage',
    mainEntity: {
      '@type':          'Question',
      name:             params.question,
      text:             params.question,
      answerCount:      1,
      dateCreated:      new Date().toISOString(),
      educationalLevel: params.classLevel ? `Grade ${params.classLevel}` : undefined,
      about: params.subject ? { '@type': 'Thing', name: params.subject } : undefined,
      acceptedAnswer: {
        '@type':       'Answer',
        text:          params.answer,
        dateCreated:   new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name:    'MscTutor AI',
          url:     BASE,
        },
      },
    },
  }
}

// ── HOW-TO SCHEMA (for step-by-step solutions) ─────────────────────
export function howToSchema(params: {
  name:  string
  steps: { name: string; text: string }[]
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type':    'HowTo',
    name:       params.name,
    step:       params.steps.map((s, i) => ({
      '@type':  'HowToStep',
      position: i + 1,
      name:     s.name,
      text:     s.text,
    })),
  }
}

// ── REVIEW SCHEMA ──────────────────────────────────────────────────
export function aggregateRatingSchema(rating = 4.8, count = 10000): JsonLd {
  return {
    '@context':       'https://schema.org',
    '@type':          'Product',
    name:             'MscTutor AI Tutor',
    aggregateRating: {
      '@type':        'AggregateRating',
      ratingValue:    String(rating),
      reviewCount:    String(count),
      bestRating:     '5',
      worstRating:    '1',
    },
  }
}

// ── HOME PAGE SCHEMA BUNDLE ────────────────────────────────────────
export function homePageSchemas(): JsonLd[] {
  const homeFAQs = [
    { question: 'Is MscTutor completely free?', answer: 'Yes! MscTutor offers 5 free AI questions per day. Premium plans are available for unlimited access.' },
    { question: 'Which classes does MscTutor support?', answer: 'MscTutor supports Class 1 to Class 12 covering CBSE, ICSE and State Board syllabus.' },
    { question: 'Can I ask questions in Hindi?', answer: 'Yes! MscTutor supports 12 languages including Hindi, Bengali, Gujarati, Marathi, Tamil, Telugu, Punjabi, Urdu, Assamese, Arabic and French.' },
    { question: 'How does the AI Teacher work?', answer: 'The AI Teacher remembers your progress, detects weak topics, adapts to your level, and provides personalized explanations using proven teaching methods.' },
    { question: 'Can I upload a photo of my question?', answer: 'Yes! You can upload images, PDFs, or use voice input. The AI will analyze and solve the question step by step.' },
  ]
  return [
    organizationSchema(),
    websiteSchema(),
    educationalAppSchema(),
    faqSchema(homeFAQs),
  ]
}

// ── INJECT JSON-LD INTO PAGE ───────────────────────────────────────
export function JsonLd({ data }: { data: JsonLd | JsonLd[] }) {
  const schemas = Array.isArray(data) ? data : [data]
  return createElement(
    Fragment,
    null,
    ...schemas.map((schema, i) =>
      createElement('script', {
        key: i,
        type: 'application/ld+json',
        dangerouslySetInnerHTML: { __html: JSON.stringify(schema) },
      })
    )
  )
}
