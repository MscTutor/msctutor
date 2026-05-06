import { ALL_CLASS_DATA } from '@/lib/ncert-master'
import { ALL_CLASSES } from '@/lib/ncert-syllabus'
import { CLASS_11_COMMERCE, CLASS_12_COMMERCE, CLASS_11_HUMANITIES, CLASS_12_HUMANITIES } from '@/lib/ncert-syllabus-commerce'
import { CLASS10_MATHEMATICS_TEXTBOOK } from '@/lib/class10-maths-textbook'
import { SUBJECTS } from '@/lib/constants'
import { slugify } from '@/lib/slug'

type RichTopic = {
  title: string
  content: string
  image?: string
  gif?: string
}

type RichFormula = {
  name: string
  formula: string
  latex?: string
  example: string
  note?: string
}

type RichExperiment = {
  title: string
  objective: string
  materials: string[]
  steps: string[]
  result: string
  safetyNote?: string
}

type RichVideo = {
  title: string
  url: string
  duration: string
  source: string
}

export interface NormalizedTopic {
  slug: string
  title: string
  content: string
  image?: string
}

export interface NormalizedFormula {
  slug: string
  name: string
  formula: string
  latex?: string
  example?: string
  note?: string
}

export interface NormalizedExperiment {
  title: string
  objective: string
  materials: string[]
  steps: string[]
  result: string
  safetyNote?: string
}

export interface NormalizedVideo {
  title: string
  url: string
  duration?: string
  source?: string
}

export interface NormalizedChapter {
  id: string
  routeSlug: string
  title: string
  description: string
  classLevel: string
  subjectSlug: string
  subjectName: string
  chapterNo?: number
  topics: NormalizedTopic[]
  formulas: NormalizedFormula[]
  experiments: NormalizedExperiment[]
  videos: NormalizedVideo[]
  keyTerms: string[]
  quickFacts: string[]
  imageUrl?: string
  isRich: boolean
}

export interface NormalizedSubject {
  slug: string
  name: string
  icon?: string
  color?: string
  branch?: string
  chapters: NormalizedChapter[]
}

export interface NormalizedClassCatalog {
  classLevel: string
  label: string
  description: string
  subjects: NormalizedSubject[]
}

export interface SubjectDisplayInfo {
  slug: string
  name: string
  icon?: string
  color?: string
  branch?: string
}

function inferSubjectBranch(slug: string) {
  if (['mathematics'].includes(slug)) return 'math'
  if (['physics', 'chemistry', 'biology', 'science', 'evs'].includes(slug)) return 'science'
  if (['accountancy', 'economics', 'business-studies', 'commerce'].includes(slug)) return 'commerce'
  if (['history', 'geography', 'political-science', 'sociology', 'social-science'].includes(slug)) return 'humanities'
  if (['english', 'hindi'].includes(slug)) return 'language'
  if (['computer-science'].includes(slug)) return 'tech'
  return 'general'
}

function buildRouteSlug(classLevel: string, chapterId: string, title: string): string {
  return `${slugify(title)}--class-${classLevel}--${chapterId}`
}

function normalizeSyllabusTopic(topic: string, index: number): NormalizedTopic {
  return {
    slug: slugify(topic || `topic-${index + 1}`),
    title: topic || `Topic ${index + 1}`,
    content: `${topic} is a key study area in this chapter. Open the topic page to see examples, formula links and guided explanation.`,
  }
}

function normalizeRichChapter(
  classLevel: string,
  subjectSlug: string,
  subjectName: string,
  chapter: {
    id: string
    chapterNo?: number
    title: string
    description?: string
    topics?: RichTopic[]
    formulas?: RichFormula[]
    experiments?: RichExperiment[]
    videos?: RichVideo[]
    keyTerms?: string[]
    quickFacts?: string[]
    imageUrl?: string
  },
): NormalizedChapter {
  return {
    id: chapter.id,
    routeSlug: buildRouteSlug(classLevel, chapter.id, chapter.title),
    title: chapter.title,
    description: chapter.description ?? '',
    classLevel,
    subjectSlug,
    subjectName,
    chapterNo: chapter.chapterNo,
    topics: (chapter.topics ?? []).map((topic) => ({
      slug: slugify(topic.title),
      title: topic.title,
      content: topic.content,
      image: topic.image ?? topic.gif,
    })),
    formulas: (chapter.formulas ?? []).map((formula) => ({
      slug: slugify(formula.name || formula.formula),
      name: formula.name,
      formula: formula.formula,
      latex: formula.latex,
      example: formula.example,
      note: formula.note,
    })),
    experiments: (chapter.experiments ?? []).map((experiment) => ({
      title: experiment.title,
      objective: experiment.objective,
      materials: experiment.materials,
      steps: experiment.steps,
      result: experiment.result,
      safetyNote: experiment.safetyNote,
    })),
    videos: (chapter.videos ?? []).map((video) => ({
      title: video.title,
      url: video.url,
      duration: video.duration,
      source: video.source,
    })),
    keyTerms: chapter.keyTerms ?? [],
    quickFacts: chapter.quickFacts ?? [],
    imageUrl: chapter.imageUrl,
    isRich: true,
  }
}

function normalizeSyllabusChapter(
  classLevel: string,
  subjectSlug: string,
  subjectName: string,
  chapter: {
    id: string
    title: string
    topics: string[]
    formulas?: string[]
    keyTerms?: string[]
  },
): NormalizedChapter {
  return {
    id: chapter.id,
    routeSlug: buildRouteSlug(classLevel, chapter.id, chapter.title),
    title: chapter.title,
    description: `${subjectName} syllabus chapter for Class ${classLevel}.`,
    classLevel,
    subjectSlug,
    subjectName,
    topics: (chapter.topics ?? []).map(normalizeSyllabusTopic),
    formulas: (chapter.formulas ?? []).map((formula, index) => ({
      slug: slugify(formula || `formula-${index + 1}`),
      name: formula,
      formula,
    })),
    experiments: [],
    videos: [],
    keyTerms: chapter.keyTerms ?? [],
    quickFacts: [],
    isRich: false,
  }
}

function buildRichMap() {
  const map = new Map<string, NormalizedChapter>()

  for (const classData of ALL_CLASS_DATA) {
    for (const subject of classData.subjects) {
      for (const chapter of subject.chapters) {
        map.set(
          `${classData.classLevel}:${subject.slug}:${chapter.id}`,
          normalizeRichChapter(classData.classLevel, subject.slug, subject.name, chapter),
        )
      }
    }
  }

  for (const chapter of CLASS10_MATHEMATICS_TEXTBOOK) {
    map.set(
      `10:mathematics:${chapter.id}`,
      normalizeRichChapter('10', 'mathematics', 'Mathematics', chapter),
    )
  }

  return map
}

const richMap = buildRichMap()

function dedupeSubjects(subjects: NormalizedSubject[]): NormalizedSubject[] {
  const subjectMap = new Map<string, NormalizedSubject>()

  for (const subject of subjects) {
    const existing = subjectMap.get(subject.slug)
    if (!existing) {
      subjectMap.set(subject.slug, subject)
      continue
    }

    const chapterIds = new Set(existing.chapters.map((chapter) => chapter.id))
    for (const chapter of subject.chapters) {
      if (!chapterIds.has(chapter.id)) {
        existing.chapters.push(chapter)
      }
    }
  }

  return Array.from(subjectMap.values()).map((subject) => ({
    ...subject,
    chapters: [...subject.chapters].sort((a, b) => {
      if (a.chapterNo && b.chapterNo) return a.chapterNo - b.chapterNo
      return a.title.localeCompare(b.title)
    }),
  }))
}

function normalizeCatalogSubject(
  classLevel: string,
  subject: {
    slug: string
    name: string
    icon?: string
    color?: string
    branch?: string
    chapters: Array<{
      id: string
      title: string
      topics: string[]
      formulas?: string[]
      keyTerms?: string[]
    }>
  },
): NormalizedSubject {
  return {
    slug: subject.slug,
    name: subject.name,
    icon: subject.icon,
    color: subject.color,
    branch: subject.branch,
    chapters: subject.chapters.map((chapter) => {
      const richChapter = richMap.get(`${classLevel}:${subject.slug}:${chapter.id}`)
      return richChapter ?? normalizeSyllabusChapter(classLevel, subject.slug, subject.name, chapter)
    }),
  }
}

function getRawClassSources(classLevel: string) {
  const base = ALL_CLASSES.find((item) => item.classLevel === classLevel)
  const extra: Array<{ subjects: NormalizedClassCatalog['subjects'] | any[] }> = []

  if (classLevel === '11') {
    extra.push(CLASS_11_COMMERCE, CLASS_11_HUMANITIES)
  }

  if (classLevel === '12') {
    extra.push(CLASS_12_COMMERCE, CLASS_12_HUMANITIES)
  }

  return { base, extra }
}

export function getUnifiedClassCatalog(classLevel: string): NormalizedClassCatalog | null {
  const { base, extra } = getRawClassSources(classLevel)
  if (!base && extra.length === 0) return null

  const allSubjects = [
    ...(base?.subjects ?? []).map((subject) => normalizeCatalogSubject(classLevel, subject)),
    ...extra.flatMap((source) => source.subjects.map((subject: any) => normalizeCatalogSubject(classLevel, subject))),
  ]

  const subjects = dedupeSubjects(allSubjects)

  return {
    classLevel,
    label: `Class ${classLevel}`,
    description: `Global-ready syllabus catalog for Class ${classLevel} with chapter-wise learning paths, formulas, experiments, videos and AI doubt support.`,
    subjects,
  }
}

export function getUnifiedSubjectForClass(classLevel: string, subjectSlug: string): NormalizedSubject | null {
  const catalog = getUnifiedClassCatalog(classLevel)
  return catalog?.subjects.find((subject) => subject.slug === subjectSlug) ?? null
}

export function getUnifiedChapterById(classLevel: string, subjectSlug: string, chapterId: string): NormalizedChapter | null {
  return getUnifiedSubjectForClass(classLevel, subjectSlug)?.chapters.find((chapter) => chapter.id === chapterId) ?? null
}

export function getUnifiedTopicBySlug(classLevel: string, subjectSlug: string, chapterId: string, topicSlug: string): NormalizedTopic | null {
  return getUnifiedChapterById(classLevel, subjectSlug, chapterId)?.topics.find((topic) => topic.slug === topicSlug) ?? null
}

export function getUnifiedFormulaBySlug(classLevel: string, subjectSlug: string, chapterId: string, formulaSlug: string): NormalizedFormula | null {
  return getUnifiedChapterById(classLevel, subjectSlug, chapterId)?.formulas.find((formula) => formula.slug === formulaSlug) ?? null
}

export interface GeneratedExample {
  slug: string
  title: string
  problem: string
  steps: string[]
  answer: string
  formulaSlug?: string
}

const EXAMPLE_STYLES = [
  'Concept check',
  'Definition to application',
  'Formula warm-up',
  'Reasoning practice',
  'Board-style short answer',
  'Mistake correction',
  'Visual interpretation',
  'Applied word problem',
  'Revision challenge',
  'Exam recap',
]

export function getGeneratedTopicExamples(classLevel: string, subjectSlug: string, chapterId: string, topicSlug: string): GeneratedExample[] {
  const chapter = getUnifiedChapterById(classLevel, subjectSlug, chapterId)
  const topic = getUnifiedTopicBySlug(classLevel, subjectSlug, chapterId, topicSlug)

  if (!chapter || !topic) return []

  return Array.from({ length: 10 }, (_, index) => {
    const formula = chapter.formulas[index % Math.max(chapter.formulas.length, 1)]
    const style = EXAMPLE_STYLES[index] ?? `Example ${index + 1}`
    const formulaNote = formula
      ? `Use the related formula "${formula.name}" as the main tool while solving.`
      : 'Solve this by explaining the concept in a clear step-by-step form.'

    return {
      slug: `example-${index + 1}`,
      title: `${style} ${index + 1}`,
      problem: `For Class ${classLevel} ${chapter.subjectName}, explain or solve a ${topic.title.toLowerCase()} question from the chapter "${chapter.title}". Focus on ${style.toLowerCase()} and show the working clearly.`,
      steps: [
        `Read the topic idea: ${topic.title}.`,
        `Recall the core explanation from the chapter: ${chapter.description}`,
        formulaNote,
        'Write the reasoning in simple school-level language before the final answer.',
      ],
      answer: formula
        ? `This example is centred on ${topic.title}. A strong solution should identify the correct data, apply ${formula.name}, and explain each transition instead of jumping directly to the answer.`
        : `This example is centred on ${topic.title}. A strong solution should define the idea, connect it to the chapter, and then present the final conclusion in simple language.`,
      formulaSlug: formula?.slug,
    }
  })
}

export function getGeneratedTopicExampleBySlug(
  classLevel: string,
  subjectSlug: string,
  chapterId: string,
  topicSlug: string,
  exampleSlug: string,
): GeneratedExample | null {
  return getGeneratedTopicExamples(classLevel, subjectSlug, chapterId, topicSlug).find((example) => example.slug === exampleSlug) ?? null
}

export function getAllUnifiedClasses(): NormalizedClassCatalog[] {
  return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    .map((classLevel) => getUnifiedClassCatalog(classLevel))
    .filter((catalog): catalog is NormalizedClassCatalog => Boolean(catalog))
}

export function getAllUnifiedSubjects(): SubjectDisplayInfo[] {
  const subjectMap = new Map<string, SubjectDisplayInfo>()
  const fallbackMeta = new Map(SUBJECTS.map((subject) => [subject.slug, subject]))

  for (const catalog of getAllUnifiedClasses()) {
    for (const subject of catalog.subjects) {
      const meta = fallbackMeta.get(subject.slug)
      if (!subjectMap.has(subject.slug)) {
        subjectMap.set(subject.slug, {
          slug: subject.slug,
          name: subject.name,
          icon: subject.icon ?? meta?.icon,
          color: subject.color ?? meta?.color,
          branch: subject.branch ?? meta?.branch ?? inferSubjectBranch(subject.slug),
        })
      }
    }
  }

  return Array.from(subjectMap.values()).sort((a, b) => a.name.localeCompare(b.name))
}

export function getUnifiedSubjectCatalog(subjectSlug: string): NormalizedSubject | null {
  const chapters = getAllUnifiedClasses()
    .flatMap((catalog) => catalog.subjects)
    .filter((subject) => subject.slug === subjectSlug)

  if (!chapters.length) return null

  const first = chapters[0]
  const merged = dedupeSubjects(chapters)

  return {
    ...first,
    chapters: merged.flatMap((subject) => subject.chapters).sort((a, b) => {
      const classDiff = Number(a.classLevel) - Number(b.classLevel)
      if (!Number.isNaN(classDiff) && classDiff !== 0) return classDiff
      return a.title.localeCompare(b.title)
    }),
  }
}

export function parseSubjectRouteSlug(routeSlug: string): { classLevel?: string; chapterId?: string; baseSlug: string } {
  const match = routeSlug.match(/^(.*)--class-(\d+)--([a-z0-9-]+)$/)
  if (!match) {
    return { baseSlug: routeSlug }
  }

  return {
    baseSlug: match[1],
    classLevel: match[2],
    chapterId: match[3],
  }
}

export function getUnifiedChapterByRoute(subjectSlug: string, routeSlug: string): NormalizedChapter | null {
  const parsed = parseSubjectRouteSlug(routeSlug)

  if (parsed.classLevel && parsed.chapterId) {
    return getUnifiedChapterById(parsed.classLevel, subjectSlug, parsed.chapterId)
  }

  const subjectCatalog = getUnifiedSubjectCatalog(subjectSlug)
  return subjectCatalog?.chapters.find((chapter) => slugify(chapter.title) === parsed.baseSlug) ?? null
}

export function getPlatformContentStats() {
  const classes = getAllUnifiedClasses()
  const chapters = classes.flatMap((catalog) => catalog.subjects.flatMap((subject) => subject.chapters))
  const subjects = new Set(classes.flatMap((catalog) => catalog.subjects.map((subject) => subject.slug)))

  return {
    classes: classes.length,
    subjects: subjects.size,
    chapters: chapters.length,
    formulas: chapters.reduce((total, chapter) => total + chapter.formulas.length, 0),
    experiments: chapters.reduce((total, chapter) => total + chapter.experiments.length, 0),
    videos: chapters.reduce((total, chapter) => total + chapter.videos.length, 0),
    richChapters: chapters.filter((chapter) => chapter.isRich).length,
  }
}
