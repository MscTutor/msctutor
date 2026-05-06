import { getAllUnifiedClasses, getPlatformContentStats, type NormalizedChapter } from '@/lib/global-content'
import { SCHOOL_STORAGE, SUBJECTS } from '@/lib/constants'

export function hasDatabaseConfig() {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim())
}

export function getAdminFallbackOverview() {
  const stats = getPlatformContentStats()
  const classes = getAllUnifiedClasses()
  const chapters = classes.flatMap((catalog) => catalog.subjects.flatMap((subject) => subject.chapters))
  const recentChapters = chapters.slice(0, 8)

  return {
    counts: {
      questions: stats.chapters * 6,
      chapters: stats.chapters,
      users: 128,
      schools: 12,
      examAttempts: 364,
      subjects: stats.subjects,
    },
    recentQuestions: recentChapters.slice(0, 5).map((chapter, index) => ({
      id: index + 1,
      slug: chapter.routeSlug,
      title: `Explain ${chapter.title} for Class ${chapter.classLevel}`,
      createdAt: new Date(Date.now() - index * 86400000),
      subject: { name: chapter.subjectName },
      views: 180 - index * 18,
      source: chapter.isRich ? 'admin' : 'ai',
    })),
    subjects: classes
      .flatMap((catalog) => catalog.subjects)
      .reduce<Array<{ id: number; icon: string | null; name: string; slug: string; isActive: boolean; _count: { chapters: number; questions: number } }>>((acc, subject) => {
        if (acc.some((item) => item.slug === subject.slug)) return acc
        acc.push({
          id: acc.length + 1,
          icon: subject.icon ?? null,
          name: subject.name,
          slug: subject.slug,
          isActive: true,
          _count: {
            chapters: subject.chapters.length,
            questions: Math.max(subject.chapters.length * 4, 8),
          },
        })
        return acc
      }, []),
    schools: [
      { id: 1, name: 'MscTutor Demo School', code: 'MSC-1001', city: 'Indore', board: 'CBSE', plan: 'basic', isVerified: true, _count: { teachers: 18, students: 420 } },
      { id: 2, name: 'Global Learning Academy', code: 'MSC-1048', city: 'Jaipur', board: 'ICSE', plan: 'pro', isVerified: true, _count: { teachers: 24, students: 610 } },
      { id: 3, name: 'Future Scholars Public School', code: 'MSC-1084', city: 'Bhopal', board: 'State Board', plan: 'free', isVerified: false, _count: { teachers: 9, students: 205 } },
    ],
    users: [
      { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com', role: 'student', plan: 'free', credits: 5, createdAt: new Date(Date.now() - 86400000 * 2) },
      { id: 2, name: 'Neha Verma', email: 'neha@example.com', role: 'teacher', plan: 'starter', credits: 100, createdAt: new Date(Date.now() - 86400000 * 4) },
      { id: 3, name: 'School Admin', email: 'principal@example.com', role: 'school_admin', plan: 'basic', credits: 300, createdAt: new Date(Date.now() - 86400000 * 7) },
      { id: 4, name: 'Content Lead', email: 'content@example.com', role: 'content_admin', plan: 'pro', credits: 1500, createdAt: new Date(Date.now() - 86400000 * 9) },
    ],
    topQuestions: recentChapters.slice(0, 5).map((chapter, index) => ({
      slug: chapter.routeSlug,
      title: `${chapter.title}: chapter-wise explanation and solved examples`,
      views: 420 - index * 40,
      subject: { name: chapter.subjectName },
    })),
    recentUsers: [
      { name: 'Riya Patel', plan: 'free', createdAt: new Date(Date.now() - 86400000) },
      { name: 'Kabir Singh', plan: 'starter', createdAt: new Date(Date.now() - 86400000 * 2) },
      { name: 'Ananya Das', plan: 'basic', createdAt: new Date(Date.now() - 86400000 * 3) },
      { name: 'Green Valley School', plan: 'pro', createdAt: new Date(Date.now() - 86400000 * 5) },
      { name: 'Manav Jain', plan: 'free', createdAt: new Date(Date.now() - 86400000 * 6) },
    ],
  }
}

export type FallbackTeacherClass = {
  id: number
  name: string
  classLevel: string
  section: string
  studentCount: number
  todayPresent: number
}

export function getFallbackTeacherClasses(): FallbackTeacherClass[] {
  return [
    { id: 901, name: 'Class 9-A', classLevel: '9', section: 'A', studentCount: 38, todayPresent: 35 },
    { id: 1001, name: 'Class 10-A', classLevel: '10', section: 'A', studentCount: 42, todayPresent: 39 },
    { id: 1101, name: 'Class 11-Commerce', classLevel: '11', section: 'Commerce', studentCount: 33, todayPresent: 31 },
  ]
}

export function getFallbackTeacherClassById(classId: string) {
  return getFallbackTeacherClasses().find((item) => String(item.id) === classId) ?? getFallbackTeacherClasses()[0]
}

export function getFallbackTeacherCurriculum(classLevel: string) {
  return getAllUnifiedClasses()
    .find((catalog) => catalog.classLevel === classLevel)
    ?.subjects.map((subject) => ({
      name: subject.name,
      slug: subject.slug,
      chapters: subject.chapters,
    })) ?? []
}

function bytesToGB(bytes: number) {
  return `${(bytes / (1024 ** 3)).toFixed(2)} GB`
}

export function getFallbackStorageReport() {
  const classes = getAllUnifiedClasses()
  const chapters = classes.flatMap((catalog) => catalog.subjects.flatMap((subject) => subject.chapters))
  const files = chapters.slice(0, 18).map((chapter, index) => ({
    id: index + 1,
    fileName: `${chapter.subjectSlug}-${chapter.id}.webp`,
    fileType: index % 5 === 0 ? 'video' : index % 2 === 0 ? 'pdf' : 'image',
    fileUrl: chapter.imageUrl ?? `/generated-media/${index % 2 === 0 ? 'math-diagram.svg' : 'science-diagram.svg'}`,
    sizeBytes: 180000 + index * 24000,
    createdAt: new Date(Date.now() - index * 43200000),
    owner: index % 2 === 0 ? 'admin' : 'teacher',
    chapterTitle: chapter.title,
  }))

  const totalBytes = files.reduce((sum, file) => sum + file.sizeBytes, 0)
  const quotaBytes = SCHOOL_STORAGE.basic.storageGB * 1024 ** 3
  const usagePercent = Math.min(Math.round((totalBytes / quotaBytes) * 100), 100)

  return {
    files,
    summary: {
      totalBytes,
      totalReadable: bytesToGB(totalBytes),
      quotaBytes,
      quotaReadable: `${SCHOOL_STORAGE.basic.storageGB} GB`,
      usagePercent,
      warning: usagePercent >= 80,
      blocked: usagePercent >= 95,
      pdfCount: files.filter((file) => file.fileType === 'pdf').length,
      imageCount: files.filter((file) => file.fileType === 'image').length,
      videoCount: files.filter((file) => file.fileType === 'video').length,
    },
  }
}

export function getSubjectCatalogSeed() {
  const classes = getAllUnifiedClasses()
  const subjectMap = new Map<string, { slug: string; name: string; icon?: string; color?: string; branch?: string; chapterCount: number }>()

  for (const catalog of classes) {
    for (const subject of catalog.subjects) {
      const existing = subjectMap.get(subject.slug)
      if (existing) {
        existing.chapterCount += subject.chapters.length
        continue
      }

      const subjectMeta = SUBJECTS.find((item) => item.slug === subject.slug)
      subjectMap.set(subject.slug, {
        slug: subject.slug,
        name: subject.name,
        icon: subject.icon ?? subjectMeta?.icon,
        color: subject.color ?? subjectMeta?.color,
        branch: subject.branch ?? subjectMeta?.branch,
        chapterCount: subject.chapters.length,
      })
    }
  }

  return Array.from(subjectMap.values()).sort((a, b) => a.name.localeCompare(b.name))
}

export function pickFeaturedChapters(limit = 6): NormalizedChapter[] {
  return getAllUnifiedClasses()
    .flatMap((catalog) => catalog.subjects.flatMap((subject) => subject.chapters))
    .slice(0, limit)
}
