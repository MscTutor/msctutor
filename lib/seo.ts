import { SITE } from './constants'

export function generateQuestionMeta(question: string, answer: string, subject: string) {
  const title = question.length > 57 ? question.substring(0, 57) + '...' : question
  const desc  = answer.replace(/<[^>]+>/g, '').substring(0, 155)
  return {
    title:       `${title} — MscTutor`,
    description: desc,
    keywords:    `${subject}, NCERT solution, CBSE, class notes, free education`,
    openGraph: {
      title,
      description: desc,
      type:       'article' as const,
      siteName:   SITE.name,
    },
  }
}

export function generateChapterMeta(chapterTitle: string, subject: string, classLevel: string, board: string) {
  const title = `${chapterTitle} — Class ${classLevel} ${subject} — MscTutor`
  const desc  = `Complete ${chapterTitle} notes with diagrams, formulas, and solved examples for Class ${classLevel} ${board} ${subject}. Free NCERT solutions.`
  return {
    title,
    description: desc,
    keywords:    `${chapterTitle}, Class ${classLevel}, ${subject}, ${board}, NCERT, solutions, notes`,
    openGraph: { title, description: desc, type: 'article' as const, siteName: SITE.name },
  }
}

// JSON-LD Schemas
export function qaPageSchema(question: string, answer: string, url: string) {
  return {
    '@context':   'https://schema.org',
    '@type':      'QAPage',
    mainEntity: {
      '@type': 'Question',
      name:    question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    },
    url,
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context':        'https://schema.org',
    '@type':           'BreadcrumbList',
    itemListElement:   items.map((item, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      name:       item.name,
      item:       item.url,
    })),
  }
}
