// lib/static-params.ts — generateStaticParams for ISR/SSG
// Pre-renders most popular pages at build time → instant loads

// ── COMMON CLASSES, SUBJECTS, BOARDS ─────────────────────────────
export const STATIC_CLASSES  = ['6','7','8','9','10','11','12']
export const STATIC_SUBJECTS = [
  'mathematics', 'physics', 'chemistry', 'biology',
  'english', 'hindi', 'social-science', 'science',
  'accountancy', 'economics', 'history', 'geography',
]
export const STATIC_BOARDS   = ['cbse', 'icse']

// ── CLASS PAGE PARAMS ─────────────────────────────────────────────
export function getClassPageParams() {
  return STATIC_CLASSES.map(classId => ({ classId }))
}

// ── SUBJECT PAGE PARAMS ───────────────────────────────────────────
export function getSubjectPageParams() {
  return STATIC_CLASSES.flatMap(classId =>
    STATIC_SUBJECTS.map(subject => ({ classId, subject }))
  )
}

// ── REVALIDATION TIMES (ISR) ──────────────────────────────────────
export const REVALIDATE = {
  HOME:          3600,   // 1 hour — home page
  CLASS_PAGE:    86400,  // 24 hours — class content rarely changes
  SUBJECT_PAGE:  86400,  // 24 hours
  CHAPTER_PAGE:  86400,  // 24 hours — chapter content is static
  FORMULA_PAGE:  86400,  // 24 hours
  BLOG:          3600,   // 1 hour — blog updates often
  COMMUNITY:     300,    // 5 min — community is dynamic
  LEADERBOARD:   120,    // 2 min
  QUESTION:      3600,   // 1 hour — question solutions
}

// ── STATIC METADATA GENERATOR ─────────────────────────────────────
export function getStaticClassMeta(classId: string) {
  return {
    title:       `Class ${classId} NCERT Solutions — Free AI | MscTutor`,
    description: `Free NCERT solutions for Class ${classId}. AI-powered step-by-step explanations for Maths, Science, English and all subjects. Ask in Hindi or English.`,
    keywords:    [`class ${classId}`, `ncert class ${classId}`, `class ${classId} solutions`, 'free education', 'AI tutor'],
  }
}

export function getStaticSubjectMeta(classId: string, subject: string) {
  const subjectName = subject.charAt(0).toUpperCase() + subject.slice(1).replace(/-/g, ' ')
  return {
    title:       `Class ${classId} ${subjectName} — NCERT Solutions | MscTutor`,
    description: `Free NCERT solutions for Class ${classId} ${subjectName}. Complete syllabus, chapter-wise solutions, formulas, and AI explanations. CBSE and ICSE.`,
    keywords:    [`class ${classId} ${subject}`, `ncert ${subject}`, `${subject} solutions class ${classId}`, 'CBSE', 'ICSE'],
  }
}
