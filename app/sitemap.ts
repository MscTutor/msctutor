import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'
import { SITE, SUBJECTS } from '@/lib/constants'
import { ALL_CLASSES } from '@/lib/ncert-syllabus'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url

  // Static pages
  const static_pages: MetadataRoute.Sitemap = [
    { url: base,                priority: 1.0, changeFrequency: 'daily'   },
    { url: `${base}/ask`,       priority: 0.9, changeFrequency: 'daily'   },
    { url: `${base}/mock-test`, priority: 0.9, changeFrequency: 'weekly'  },
    { url: `${base}/pricing`,   priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/community`, priority: 0.7, changeFrequency: 'daily'   },
    { url: `${base}/formulas`,  priority: 0.8, changeFrequency: 'weekly'  },
    { url: `${base}/calculators`,priority: 0.7, changeFrequency: 'monthly'},
    { url: `${base}/about`,     priority: 0.6, changeFrequency: 'monthly' },
    { url: `${base}/contact`,   priority: 0.6, changeFrequency: 'monthly' },
    { url: `${base}/privacy`,   priority: 0.5, changeFrequency: 'yearly'  },
    { url: `${base}/terms`,     priority: 0.5, changeFrequency: 'yearly'  },
    { url: `${base}/dmca`,      priority: 0.4, changeFrequency: 'yearly'  },
    { url: `${base}/class`,     priority: 0.8, changeFrequency: 'weekly'  },
    { url: `${base}/subject`,   priority: 0.8, changeFrequency: 'weekly'  },
    ...SUBJECTS.map(s => ({ url: `${base}/subject/${s.slug}`, priority: 0.8 as const, changeFrequency: 'weekly' as const })),
    ...['1','2','3','4','5','6','7','8','9','10','11','12'].map(c => ({ url: `${base}/class/${c}`, priority: 0.7 as const, changeFrequency: 'weekly' as const })),
  ]

  // NCERT chapter learn pages — all classes/subjects/chapters
  const ncertChapterPages: MetadataRoute.Sitemap = []
  for (const cls of ALL_CLASSES) {
    for (const subject of cls.subjects) {
      // Class+subject index page
      ncertChapterPages.push({
        url: `${base}/class/${cls.classLevel}/${subject.slug}`,
        priority: 0.8,
        changeFrequency: 'weekly' as const,
      })
      // Each chapter learn page
      for (const chapter of subject.chapters) {
        ncertChapterPages.push({
          url: `${base}/learn/${cls.classLevel}/${subject.slug}/${chapter.id}`,
          priority: 0.9,
          changeFrequency: 'weekly' as const,
        })
      }
    }
  }

  // Dynamic question pages from DB
  let questionPages: MetadataRoute.Sitemap = []
  let chapterPages:  MetadataRoute.Sitemap = []
  try {
    const [questions, chapters] = await Promise.all([
      prisma.question.findMany({ where: { isPublic: true }, select: { slug: true, updatedAt: true }, take: 10000, orderBy: { createdAt: 'desc' } }),
      prisma.chapter.findMany({ where: { isPublic: true }, select: { slug: true, updatedAt: true, subject: { select: { slug: true } } } }),
    ])
    questionPages = questions.map(q => ({ url: `${base}/question/${q.slug}`, lastModified: q.updatedAt, priority: 0.7, changeFrequency: 'monthly' as const }))
    chapterPages  = chapters.map(c => ({ url: `${base}/subject/${c.subject?.slug ?? 'general'}/chapter/${c.slug}`, lastModified: c.updatedAt, priority: 0.8, changeFrequency: 'weekly' as const }))
  } catch { /* DB not ready */ }

  return [...static_pages, ...ncertChapterPages, ...questionPages, ...chapterPages]
}
