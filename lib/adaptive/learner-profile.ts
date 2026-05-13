// lib/adaptive/learner-profile.ts
// ══════════════════════════════════════════════════════════
// ADAPTIVE LEARNING SYSTEM — Student Memory + Profile
// Uses localStorage (free) + optional DB persistence
// ══════════════════════════════════════════════════════════

export type DifficultyLevel = 'beginner' | 'easy' | 'medium' | 'hard' | 'advanced'
export type MasteryLevel    = 'not_started' | 'exploring' | 'learning' | 'practicing' | 'proficient' | 'mastered'
export type LearningStyle   = 'visual' | 'step_by_step' | 'example_first' | 'concept_first' | 'formula_focused'

export interface TopicMastery {
  topicId:         string
  topicName:       string
  subject:         string
  classLevel:      string
  chapterId:       string
  chapterName:     string
  mastery:         MasteryLevel
  correctAttempts: number
  wrongAttempts:   number
  totalAttempts:   number
  lastAttempted:   string   // ISO date
  averageScore:    number   // 0-100
  timeSpentMin:    number
  needsRevision:   boolean
  revisionDue?:    string   // ISO date (spaced repetition)
  notes:           string[] // Student's own notes
  confusedAbout:   string[] // Specific misconceptions detected
}

export interface ChapterProgress {
  chapterId:       string
  chapterName:     string
  subject:         string
  classLevel:      string
  status:          'not_started' | 'in_progress' | 'completed' | 'needs_revision'
  topicsCompleted: number
  topicsTotal:     number
  overallMastery:  number   // 0-100
  startedAt?:      string
  completedAt?:    string
  lastStudied:     string
  timeSpentMin:    number
  quizScores:      number[]
}

export interface ConversationMemory {
  sessionId:     string
  timestamp:     string
  subject:       string
  topic:         string
  classLevel:    string
  messages:      { role: 'student'|'teacher'; text: string; timestamp: string }[]
  topicsCovered: string[]
  questionsAsked: string[]
  difficultyUsed: DifficultyLevel
  wasHelpful:    boolean | null
}

export interface LearnerProfile {
  userId:          string
  name:            string
  classLevel:      string
  board:           string
  language:        string
  preferredStyle:  LearningStyle
  currentDifficulty: DifficultyLevel
  overallProgress: number   // 0-100
  streakDays:      number
  lastActiveDate:  string
  totalTimeMin:    number
  totalQuestions:  number
  correctAnswers:  number

  // Subject-level performance
  subjectPerformance: Record<string, {
    averageScore:   number
    questionsAsked: number
    strongTopics:   string[]
    weakTopics:     string[]
    lastStudied:    string
  }>

  // Detailed topic mastery
  topicMastery:    Record<string, TopicMastery>    // key: `${classLevel}-${subject}-${topicId}`
  chapterProgress: Record<string, ChapterProgress> // key: `${classLevel}-${subject}-${chapterId}`

  // Recent conversations (last 10)
  recentSessions:  ConversationMemory[]

  // Revision queue (spaced repetition)
  revisionQueue:   { topicId: string; dueDate: string; priority: number }[]

  // Detected learning patterns
  patterns: {
    bestTimeOfDay:       string | null
    avgSessionMinutes:   number
    prefersSolvedExamples: boolean
    needsMorePractice:   boolean
    commonMistakes:      string[]
    motivationLevel:     'low' | 'medium' | 'high'
  }
}

const STORAGE_KEY = 'msc_learner_profile'
const SESSION_KEY = 'msc_current_session'

// ── CREATE DEFAULT PROFILE ─────────────────────────────
export function createDefaultProfile(userId: string, name: string, classLevel = '10', language = 'en'): LearnerProfile {
  return {
    userId, name, classLevel, board: 'CBSE', language,
    preferredStyle:    'step_by_step',
    currentDifficulty: 'medium',
    overallProgress:   0,
    streakDays:        0,
    lastActiveDate:    new Date().toISOString(),
    totalTimeMin:      0,
    totalQuestions:    0,
    correctAnswers:    0,
    subjectPerformance: {},
    topicMastery:      {},
    chapterProgress:   {},
    recentSessions:    [],
    revisionQueue:     [],
    patterns: {
      bestTimeOfDay:         null,
      avgSessionMinutes:     0,
      prefersSolvedExamples: false,
      needsMorePractice:     false,
      commonMistakes:        [],
      motivationLevel:       'medium',
    },
  }
}

// ── LOAD / SAVE ────────────────────────────────────────
export function loadProfile(userId: string): LearnerProfile | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${userId}`)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function saveProfile(profile: LearnerProfile): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(`${STORAGE_KEY}_${profile.userId}`, JSON.stringify(profile))
    // Also sync to DB asynchronously (non-blocking)
    syncProfileToServer(profile).catch(() => {})
  } catch {}
}

async function syncProfileToServer(profile: LearnerProfile) {
  try {
    await fetch('/api/learning/profile', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ profile }),
    })
  } catch {}
}

export function getOrCreateProfile(userId: string, name: string, classLevel?: string): LearnerProfile {
  const existing = loadProfile(userId)
  if (existing) return existing
  const fresh = createDefaultProfile(userId, name, classLevel)
  saveProfile(fresh)
  return fresh
}

// ── UPDATE TOPIC MASTERY ───────────────────────────────
export function updateTopicMastery(
  profile: LearnerProfile,
  params: {
    topicId:     string
    topicName:   string
    subject:     string
    classLevel:  string
    chapterId:   string
    chapterName: string
    correct:     boolean
    timeSpentMin: number
    score?:      number
  }
): LearnerProfile {
  const key  = `${params.classLevel}-${params.subject}-${params.topicId}`
  const now  = new Date().toISOString()
  const prev = profile.topicMastery[key] ?? {
    topicId: params.topicId, topicName: params.topicName,
    subject: params.subject, classLevel: params.classLevel,
    chapterId: params.chapterId, chapterName: params.chapterName,
    mastery: 'exploring' as MasteryLevel,
    correctAttempts: 0, wrongAttempts: 0, totalAttempts: 0,
    lastAttempted: now, averageScore: 0, timeSpentMin: 0,
    needsRevision: false, notes: [], confusedAbout: [],
  }

  const newCorrect = prev.correctAttempts + (params.correct ? 1 : 0)
  const newWrong   = prev.wrongAttempts   + (params.correct ? 0 : 1)
  const newTotal   = prev.totalAttempts   + 1
  const score      = params.score ?? (params.correct ? 100 : 0)
  const newAvg     = Math.round((prev.averageScore * prev.totalAttempts + score) / newTotal)

  // Calculate mastery level
  const accuracy   = newTotal > 0 ? newCorrect / newTotal : 0
  let mastery: MasteryLevel = 'not_started'
  if (newTotal === 0)       mastery = 'not_started'
  else if (newTotal < 3)    mastery = 'exploring'
  else if (accuracy < 0.4)  mastery = 'learning'
  else if (accuracy < 0.6)  mastery = 'practicing'
  else if (accuracy < 0.8)  mastery = 'proficient'
  else                      mastery = 'mastered'

  // Spaced repetition: schedule revision
  const daysUntilRevision = mastery === 'mastered' ? 7 : mastery === 'proficient' ? 3 : 1
  const revisionDue = new Date(Date.now() + daysUntilRevision * 86400000).toISOString()

  const updated: TopicMastery = {
    ...prev,
    correctAttempts: newCorrect,
    wrongAttempts:   newWrong,
    totalAttempts:   newTotal,
    lastAttempted:   now,
    averageScore:    newAvg,
    timeSpentMin:    prev.timeSpentMin + params.timeSpentMin,
    mastery,
    needsRevision:   !params.correct && newTotal >= 2,
    revisionDue,
  }

  // Update overall stats
  const updatedProfile = {
    ...profile,
    topicMastery: { ...profile.topicMastery, [key]: updated },
    totalQuestions: profile.totalQuestions + 1,
    correctAnswers: profile.correctAnswers + (params.correct ? 1 : 0),
    lastActiveDate: now,
    totalTimeMin:   profile.totalTimeMin + params.timeSpentMin,
  }

  // Update subject performance
  const subj = updatedProfile.subjectPerformance[params.subject] ?? {
    averageScore: 0, questionsAsked: 0, strongTopics: [], weakTopics: [], lastStudied: now,
  }
  const subjQuestions = subj.questionsAsked + 1
  const subjAvg = Math.round((subj.averageScore * subj.questionsAsked + score) / subjQuestions)

  updatedProfile.subjectPerformance[params.subject] = {
    ...subj,
    averageScore:   subjAvg,
    questionsAsked: subjQuestions,
    lastStudied:    now,
    strongTopics:   mastery === 'mastered' || mastery === 'proficient'
      ? [...new Set([...subj.strongTopics, params.topicName])]
      : subj.strongTopics,
    weakTopics: mastery === 'learning' || (!params.correct && newTotal >= 2)
      ? [...new Set([...subj.weakTopics, params.topicName])]
      : subj.weakTopics.filter(t => t !== params.topicName),
  }

  return updatedProfile
}

// ── UPDATE CHAPTER PROGRESS ────────────────────────────
export function updateChapterProgress(
  profile: LearnerProfile,
  chapterId: string, subject: string, classLevel: string,
  chapterName: string, topicsTotal: number, topicsCompleted: number,
  quizScore?: number, timeSpentMin = 0
): LearnerProfile {
  const key  = `${classLevel}-${subject}-${chapterId}`
  const now  = new Date().toISOString()
  const prev = profile.chapterProgress[key]
  const masteryPct = topicsTotal > 0 ? Math.round((topicsCompleted / topicsTotal) * 100) : 0
  const status: ChapterProgress['status'] =
    topicsCompleted === 0     ? 'not_started' :
    masteryPct < 50           ? 'in_progress' :
    masteryPct < 80           ? 'in_progress' :
    quizScore !== undefined && quizScore < 60 ? 'needs_revision' : 'completed'

  const updated: ChapterProgress = {
    chapterId, chapterName, subject, classLevel,
    status,
    topicsCompleted,
    topicsTotal,
    overallMastery: masteryPct,
    startedAt:  prev?.startedAt ?? (topicsCompleted > 0 ? now : undefined),
    completedAt: status === 'completed' ? now : undefined,
    lastStudied: now,
    timeSpentMin: (prev?.timeSpentMin ?? 0) + timeSpentMin,
    quizScores: quizScore !== undefined
      ? [...(prev?.quizScores ?? []), quizScore].slice(-10)
      : (prev?.quizScores ?? []),
  }

  return { ...profile, chapterProgress: { ...profile.chapterProgress, [key]: updated } }
}

// ── ADAPTIVE DIFFICULTY ────────────────────────────────
export function computeAdaptiveDifficulty(profile: LearnerProfile, subject: string): DifficultyLevel {
  const subj = profile.subjectPerformance[subject]
  if (!subj || subj.questionsAsked < 5) return 'medium'

  const score = subj.averageScore
  if (score >= 90)      return 'advanced'
  if (score >= 75)      return 'hard'
  if (score >= 55)      return 'medium'
  if (score >= 35)      return 'easy'
  return 'beginner'
}

// ── WEAK TOPIC DETECTION ───────────────────────────────
export function detectWeakTopics(profile: LearnerProfile, subject?: string): TopicMastery[] {
  return Object.values(profile.topicMastery)
    .filter(t => {
      if (subject && t.subject !== subject) return false
      return t.mastery === 'learning' ||
        (t.totalAttempts >= 2 && t.wrongAttempts > t.correctAttempts) ||
        t.needsRevision
    })
    .sort((a, b) => a.averageScore - b.averageScore)
    .slice(0, 5)
}

// ── REVISION RECOMMENDATIONS ───────────────────────────
export function getRevisionRecommendations(profile: LearnerProfile): TopicMastery[] {
  const now = new Date()
  return Object.values(profile.topicMastery)
    .filter(t => {
      if (!t.revisionDue) return false
      return new Date(t.revisionDue) <= now
    })
    .sort((a, b) => {
      const aDate = new Date(a.revisionDue!).getTime()
      const bDate = new Date(b.revisionDue!).getTime()
      return aDate - bDate
    })
    .slice(0, 8)
}

// ── LEARNING INSIGHTS ──────────────────────────────────
export function getLearningInsights(profile: LearnerProfile): {
  strengths:     string[]
  improvements:  string[]
  nextSteps:     string[]
  motivation:    string
  weeklyGoal:    string
} {
  const weakTopics  = detectWeakTopics(profile)
  const accuracy    = profile.totalQuestions > 0
    ? Math.round((profile.correctAnswers / profile.totalQuestions) * 100) : 0

  // Find strongest subjects
  const subjects = Object.entries(profile.subjectPerformance)
  const best     = subjects.sort((a,b) => b[1].averageScore - a[1].averageScore)
  const strengths = best.slice(0, 2).map(([s, d]) => `${s} (${d.averageScore}% accuracy)`)
  const improvements = weakTopics.slice(0, 3).map(t => `${t.topicName} in ${t.subject}`)

  const nextSteps = [
    weakTopics.length > 0 ? `Revise: ${weakTopics[0].topicName}` : 'Explore new chapters',
    accuracy < 60 ? 'Practice easier questions first' : 'Try harder problems',
    profile.streakDays < 3 ? 'Study daily for 15 min to build habit' : `Keep your ${profile.streakDays}-day streak!`,
  ]

  const motivation = accuracy >= 80 ? `🌟 Excellent work! ${accuracy}% accuracy!` :
    accuracy >= 60 ? `👏 Good progress! Let's push to 80%!` :
    `💪 Keep going! Every mistake is a lesson.`

  const weeklyGoal = `Complete ${Math.max(3, Math.floor(profile.totalQuestions * 1.2))} practice questions this week`

  return { strengths, improvements, nextSteps, motivation, weeklyGoal }
}

// ── SESSION TRACKING ───────────────────────────────────
export function startSession(subject: string, topic: string, classLevel: string): ConversationMemory {
  const session: ConversationMemory = {
    sessionId:      `sess_${Date.now()}`,
    timestamp:      new Date().toISOString(),
    subject, topic, classLevel,
    messages:       [],
    topicsCovered:  [],
    questionsAsked: [],
    difficultyUsed: 'medium',
    wasHelpful:     null,
  }
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  }
  return session
}

export function addMessageToSession(
  session: ConversationMemory,
  role: 'student' | 'teacher',
  text: string
): ConversationMemory {
  const updated = {
    ...session,
    messages: [
      ...session.messages,
      { role, text: text.slice(0, 2000), timestamp: new Date().toISOString() },
    ].slice(-30), // Keep last 30 messages
  }
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(updated))
  }
  return updated
}

export function getCurrentSession(): ConversationMemory | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function saveSessionToProfile(profile: LearnerProfile, session: ConversationMemory): LearnerProfile {
  const sessions = [session, ...profile.recentSessions].slice(0, 10)
  return { ...profile, recentSessions: sessions }
}

// ══════════════════════════════════════════════════════════════════
// COGNITIVE EXTENSION — System 1: Adaptive AI Cognition Engine
// Extends existing LearnerProfile without replacing it
// ══════════════════════════════════════════════════════════════════

export interface MisconceptionRecord {
  topicId:     string
  topicName:   string
  subject:     string
  misconception: string          // what the student got wrong
  correction:  string            // correct understanding
  detectedAt:  string
  resolved:    boolean
  occurrences: number
}

export interface SpacedRepetitionCard {
  topicId:      string
  topicName:    string
  subject:      string
  classLevel:   string
  interval:     number           // days until next review
  easeFactor:   number           // SM-2 ease factor (default 2.5)
  repetitions:  number           // how many times reviewed
  nextReview:   string           // ISO date
  lastReview:   string
  quality:      number           // 0-5 last recall quality
}

export interface ConfidenceEstimate {
  subject:     string
  topicId:     string
  confidence:  number            // 0-100 self-estimated + AI-inferred
  aiInferred:  number            // pure AI estimate from response patterns
  lastUpdated: string
}

export interface CurriculumMasteryNode {
  nodeId:      string            // "${class}-${subject}-${chapter}"
  masteryPct:  number            // 0-100
  topicsTotal: number
  topicsDone:  number
  quizScore:   number            // average quiz score
  lastVisited: string
  dependencies: string[]         // nodeIds that must be done first
}

// ── SPACED REPETITION (SM-2 algorithm) ───────────────────────────
export function updateSR(card: SpacedRepetitionCard, quality: number): SpacedRepetitionCard {
  // quality: 0-5 (0=blackout, 5=perfect)
  const q = Math.max(0, Math.min(5, quality))

  let { easeFactor, repetitions, interval } = card

  if (q >= 3) {
    interval     = repetitions === 0 ? 1 : repetitions === 1 ? 6 : Math.round(interval * easeFactor)
    repetitions += 1
  } else {
    repetitions  = 0
    interval     = 1
  }

  easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))

  const nextReview = new Date(Date.now() + interval * 86400000).toISOString().split('T')[0]

  return { ...card, easeFactor, repetitions, interval, nextReview, lastReview: new Date().toISOString().split('T')[0], quality: q }
}

export function getDueSRCards(
  profile: LearnerProfile & { srCards?: SpacedRepetitionCard[] }
): SpacedRepetitionCard[] {
  const today = new Date().toISOString().split('T')[0]
  return (profile.srCards ?? []).filter(c => c.nextReview <= today)
}

export function addSRCard(
  profile: LearnerProfile & { srCards?: SpacedRepetitionCard[] },
  topic: { topicId: string; topicName: string; subject: string; classLevel: string }
): LearnerProfile & { srCards?: SpacedRepetitionCard[] } {
  const exists = (profile.srCards ?? []).some(c => c.topicId === topic.topicId)
  if (exists) return profile
  const card: SpacedRepetitionCard = {
    ...topic,
    interval:    1,
    easeFactor:  2.5,
    repetitions: 0,
    nextReview:  new Date(Date.now() + 86400000).toISOString().split('T')[0],
    lastReview:  new Date().toISOString().split('T')[0],
    quality:     0,
  }
  return { ...profile, srCards: [...(profile.srCards ?? []), card] }
}

// ── MISCONCEPTION DETECTION ───────────────────────────────────────
export function detectAndRecordMisconception(
  profile: LearnerProfile & { misconceptions?: MisconceptionRecord[] },
  topic:     string,
  subject:   string,
  studentAnswer: string
): { profile: typeof profile; misconception: string | null } {
  const COMMON: Record<string, { trigger: RegExp; misconception: string; correction: string }[]> = {
    physics: [
      { trigger: /heavier.*fall.*faster|mass.*affect.*fall/i, misconception: 'Heavier objects fall faster', correction: 'All objects fall at the same rate (9.8 m/s²) ignoring air resistance — Galileo proved this.' },
      { trigger: /current.*positive.*negative|conventional.*wrong/i, misconception: 'Electrons flow from + to −', correction: 'Conventional current flows + to −, but electrons actually flow − to +.' },
    ],
    mathematics: [
      { trigger: /\(a\+b\).*=.*a\^2\+b\^2|(x\+y)\^2.*x\^2\+y\^2/i, misconception: '(a+b)² = a²+b²', correction: '(a+b)² = a² + 2ab + b². The middle term 2ab is often forgotten.' },
      { trigger: /divide.*zero.*zero|0\/0.*=.*0/i, misconception: 'Division by zero equals zero', correction: 'Division by zero is undefined. 0/0 has no defined value.' },
    ],
    chemistry: [
      { trigger: /rust.*iron.*rust|oxidation.*same.*rusting/i, misconception: 'All oxidation is rusting', correction: 'Rusting is oxidation of iron specifically. Oxidation is a broader concept.' },
    ],
  }

  const subjectRules = COMMON[subject.toLowerCase()] ?? []
  for (const rule of subjectRules) {
    if (rule.trigger.test(studentAnswer)) {
      const existing = (profile.misconceptions ?? []).find(m => m.misconception === rule.misconception && m.topicId === topic)
      const updated = existing
        ? (profile.misconceptions ?? []).map(m => m.misconception === rule.misconception ? { ...m, occurrences: m.occurrences + 1 } : m)
        : [...(profile.misconceptions ?? []), {
            topicId: topic, topicName: topic, subject,
            misconception: rule.misconception, correction: rule.correction,
            detectedAt: new Date().toISOString(), resolved: false, occurrences: 1,
          }]
      return { profile: { ...profile, misconceptions: updated }, misconception: rule.misconception }
    }
  }
  return { profile, misconception: null }
}

// ── CONFIDENCE ESTIMATION ─────────────────────────────────────────
export function estimateConfidence(
  profile: LearnerProfile,
  subject: string,
  topicId: string
): number {
  const mastery   = profile.topicMastery[topicId]
  const perfData  = profile.subjectPerformance[subject]
  if (!mastery && !perfData) return 40  // No data = medium confidence

  const scores = [
    mastery?.averageScore ?? perfData?.averageScore ?? 50,
    mastery?.correctAttempts ? Math.min(mastery.correctAttempts * 5, 30) : 0,
    mastery?.needsRevision ? -15 : 0,
  ]
  return Math.max(10, Math.min(100, scores.reduce((a, b) => a + b, 0)))
}

// ── EXAM READINESS ────────────────────────────────────────────────
export function computeExamReadiness(profile: LearnerProfile, subject?: string): {
  score:      number   // 0-100
  level:      'not_ready' | 'needs_work' | 'almost_ready' | 'ready' | 'excellent'
  weakAreas:  string[]
  strongAreas: string[]
  advice:     string
} {
  const topics   = Object.values(profile.topicMastery).filter(t => !subject || t.subject === subject)
  if (topics.length === 0) return { score: 0, level: 'not_ready', weakAreas: [], strongAreas: [], advice: 'Start learning topics to track readiness.' }

  const avgScore    = topics.reduce((s, t) => s + t.averageScore, 0) / topics.length
  const weakAreas   = topics.filter(t => t.averageScore < 60).map(t => t.topicName).slice(0, 5)
  const strongAreas = topics.filter(t => t.averageScore >= 80).map(t => t.topicName).slice(0, 5)
  const revisionPenalty = topics.filter(t => t.needsRevision).length * 3
  const score = Math.max(0, Math.min(100, Math.round(avgScore - revisionPenalty)))

  const level = score >= 85 ? 'excellent' : score >= 70 ? 'ready' : score >= 55 ? 'almost_ready' : score >= 40 ? 'needs_work' : 'not_ready'
  const advice = weakAreas.length > 0
    ? `Focus on: ${weakAreas.slice(0, 3).join(', ')} — these are your weak areas.`
    : strongAreas.length > 0
    ? `Strong in ${strongAreas[0]}! Keep practising for exam excellence.`
    : 'Complete more topics and attempt quizzes to improve readiness.'

  return { score, level, weakAreas, strongAreas, advice }
}

// ── BURNOUT DETECTION ─────────────────────────────────────────────
export function detectBurnout(profile: LearnerProfile): {
  risk:    'none' | 'low' | 'medium' | 'high'
  signals: string[]
  advice:  string
} {
  const signals: string[] = []

  const today = new Date().toISOString().split('T')[0]
  const lastActive = profile.lastActiveDate
  const daysSinceActive = lastActive
    ? Math.floor((Date.now() - new Date(lastActive).getTime()) / 86400000) : 0

  if (daysSinceActive > 7) signals.push('Inactive for 7+ days')
  if (profile.patterns.motivationLevel === 'low') signals.push('Low motivation detected')
  if (profile.streakDays === 0 && profile.totalQuestions > 50) signals.push('Streak broken after good progress')

  const recentAccuracy = Object.values(profile.topicMastery)
    .filter(t => t.lastAttempted && new Date(t.lastAttempted) > new Date(Date.now() - 7 * 86400000))
    .map(t => t.averageScore)
  if (recentAccuracy.length > 3 && recentAccuracy.reduce((a, b) => a + b, 0) / recentAccuracy.length < 50) {
    signals.push('Accuracy declining this week')
  }

  const risk = signals.length >= 3 ? 'high' : signals.length === 2 ? 'medium' : signals.length === 1 ? 'low' : 'none'
  const advice = risk === 'high'
    ? 'Take a short break. Review what you know well rather than new topics. 15 min per day is enough.'
    : risk === 'medium'
    ? 'Shorter study sessions with revision of your strongest topics. Celebrate small wins!'
    : risk === 'low'
    ? 'Keep going! One topic per day builds momentum.'
    : 'Great consistency! Keep your current pace.'

  return { risk, signals, advice }
}

// ── PERSONALIZED STUDY PLAN ───────────────────────────────────────
export function generateStudyPlan(
  profile: LearnerProfile,
  subject:      string,
  examDate?:    string,
  dailyMinutes = 45
): {
  daysAvailable: number
  dailyGoal:     string
  weekPlan:      { day: string; topics: string[]; focus: string; duration: number }[]
  priority:      'revision' | 'new_topics' | 'balanced'
} {
  const daysAvailable = examDate
    ? Math.max(1, Math.floor((new Date(examDate).getTime() - Date.now()) / 86400000))
    : 30

  const weak  = detectWeakTopics(profile, subject).map(t => t.topicName)
  const due   = getRevisionRecommendations(profile).map(t => t.topicName)
  const priority = daysAvailable <= 7 ? 'revision' : weak.length > 5 ? 'new_topics' : 'balanced'

  const weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
  const weekPlan = weekDays.map((day, i) => {
    const isWeekend = i >= 5
    const duration  = isWeekend ? dailyMinutes + 15 : dailyMinutes
    const topics    = priority === 'revision'
      ? due.slice(i * 2, i * 2 + 2)
      : i % 2 === 0
      ? weak.slice(Math.floor(i / 2), Math.floor(i / 2) + 2)
      : due.slice(Math.floor(i / 2), Math.floor(i / 2) + 1)
    const focus = i === 5 ? 'Mock test + review' : i === 6 ? 'Revision + rest' : priority === 'revision' ? 'Spaced revision' : 'New topic + practice'
    return { day, topics: topics.length > 0 ? topics : ['Choose any weak topic'], focus, duration }
  })

  const dailyGoal = priority === 'revision'
    ? `${Math.ceil(due.length / 7)} revision topics per day`
    : `1 new topic + ${Math.ceil(due.length / 7)} revisions per day`

  return { daysAvailable, dailyGoal, weekPlan, priority }
}
