// lib/gamification.ts
// ══════════════════════════════════════════════════════════════════
// EDUCATIONAL GAMIFICATION — Extends existing LearnerProfile
// XP, streaks, badges, milestones — professional, not childish
// ══════════════════════════════════════════════════════════════════

import type { LearnerProfile } from './adaptive/learner-profile'

// ── XP TABLE ─────────────────────────────────────────────────────
export const XP_EVENTS = {
  QUESTION_ASKED:       2,
  QUESTION_CORRECT:     5,
  TOPIC_COMPLETED:      10,
  CHAPTER_COMPLETED:    30,
  QUIZ_PERFECT:         20,
  DAILY_STREAK_3:       15,
  DAILY_STREAK_7:       35,
  DAILY_STREAK_30:      100,
  FIRST_QUESTION:       10,   // one-time bonus
  FIRST_CHAPTER:        25,
  EXAM_PASSED:          40,
  WEAK_TOPIC_MASTERED:  25,
  PEER_QUESTION_HELPED: 5,
} as const

// ── BADGE DEFINITIONS ─────────────────────────────────────────────
export interface Badge {
  id:          string
  name:        string
  description: string
  icon:        string
  rarity:      'common' | 'uncommon' | 'rare' | 'epic'
  xpReward:    number
}

export const BADGES: Badge[] = [
  // Milestone
  { id:'first_question',    name:'First Step',       description:'Asked your first question',    icon:'🌱', rarity:'common',   xpReward:10  },
  { id:'q_10',              name:'Curious Mind',     description:'Asked 10 questions',           icon:'❓', rarity:'common',   xpReward:15  },
  { id:'q_50',              name:'Knowledge Seeker', description:'Asked 50 questions',           icon:'📚', rarity:'uncommon', xpReward:30  },
  { id:'q_100',             name:'Scholar',          description:'Asked 100 questions',          icon:'🎓', rarity:'rare',     xpReward:60  },
  { id:'q_500',             name:'Maestro',          description:'Asked 500 questions',          icon:'🏆', rarity:'epic',     xpReward:150 },
  // Streak
  { id:'streak_3',          name:'Consistent',       description:'3-day learning streak',        icon:'🔥', rarity:'common',   xpReward:15  },
  { id:'streak_7',          name:'Committed',        description:'7-day learning streak',        icon:'⚡', rarity:'uncommon', xpReward:35  },
  { id:'streak_30',         name:'Dedicated',        description:'30-day learning streak',       icon:'💎', rarity:'epic',     xpReward:100 },
  // Accuracy
  { id:'accuracy_80',       name:'Sharp Mind',       description:'Achieved 80%+ accuracy',      icon:'🎯', rarity:'uncommon', xpReward:25  },
  { id:'accuracy_90',       name:'Precision Expert', description:'Achieved 90%+ accuracy',      icon:'✨', rarity:'rare',     xpReward:50  },
  // Subject
  { id:'math_master',       name:'Math Wizard',      description:'Mastered 5 math topics',      icon:'📐', rarity:'rare',     xpReward:40  },
  { id:'science_master',    name:'Lab Pioneer',      description:'Mastered 5 science topics',   icon:'🔬', rarity:'rare',     xpReward:40  },
  // Speed
  { id:'quick_learner',     name:'Quick Learner',    description:'Completed chapter in 1 day',  icon:'⚡', rarity:'uncommon', xpReward:20  },
  // Comeback
  { id:'comeback',          name:'Resilient',        description:'Improved a weak topic 20%+',  icon:'💪', rarity:'uncommon', xpReward:25  },
]

export const BADGE_MAP = Object.fromEntries(BADGES.map(b => [b.id, b]))

// ── LEVEL SYSTEM ──────────────────────────────────────────────────
export interface Level {
  level:  number
  title:  string
  minXP:  number
  maxXP:  number
  color:  string
}

export const LEVELS: Level[] = [
  { level:1,  title:'Beginner',      minXP:0,    maxXP:100,   color:'#6b7280' },
  { level:2,  title:'Explorer',      minXP:100,  maxXP:250,   color:'#059669' },
  { level:3,  title:'Learner',       minXP:250,  maxXP:500,   color:'#0284c7' },
  { level:4,  title:'Student',       minXP:500,  maxXP:1000,  color:'#7c3aed' },
  { level:5,  title:'Scholar',       minXP:1000, maxXP:2000,  color:'#1d4ed8' },
  { level:6,  title:'Achiever',      minXP:2000, maxXP:4000,  color:'#b45309' },
  { level:7,  title:'Expert',        minXP:4000, maxXP:8000,  color:'#dc2626' },
  { level:8,  title:'Genius',        minXP:8000, maxXP:15000, color:'#7c2d12' },
  { level:9,  title:'Master',        minXP:15000,maxXP:25000, color:'#1a1a2e' },
  { level:10, title:'Grandmaster',   minXP:25000,maxXP:99999, color:'#b7860b' },
]

// ── GAMIFICATION STATE (stored in localStorage) ───────────────────
export interface GamificationState {
  xp:            number
  level:         number
  badges:        string[]     // badge ids earned
  newBadges:     string[]     // newly earned, not yet shown
  streakDays:    number
  lastStudyDate: string       // YYYY-MM-DD
  totalSessions: number
  milestones:    string[]     // milestone ids reached
}

const STORAGE_KEY = 'msc_gamification'

export function loadGamification(userId: string): GamificationState {
  if (typeof window === 'undefined') return defaultState()
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${userId}`)
    return raw ? JSON.parse(raw) : defaultState()
  } catch { return defaultState() }
}

export function saveGamification(userId: string, state: GamificationState): void {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(state)) } catch {}
}

function defaultState(): GamificationState {
  return { xp:0, level:1, badges:[], newBadges:[], streakDays:0, lastStudyDate:'', totalSessions:0, milestones:[] }
}

// ── COMPUTE LEVEL ─────────────────────────────────────────────────
export function computeLevel(xp: number): Level {
  return LEVELS.slice().reverse().find(l => xp >= l.minXP) ?? LEVELS[0]
}

export function getLevelProgress(xp: number): { pct: number; next: number; current: number } {
  const lv   = computeLevel(xp)
  const span = lv.maxXP - lv.minXP
  const done = xp - lv.minXP
  return { pct: Math.round((done / span) * 100), next: lv.maxXP, current: xp }
}

// ── ADD XP + CHECK BADGES ─────────────────────────────────────────
export function addXP(
  state:     GamificationState,
  event:     keyof typeof XP_EVENTS,
  profile?:  LearnerProfile
): { state: GamificationState; leveledUp: boolean; newBadges: Badge[] } {
  const amount    = XP_EVENTS[event]
  const newXP     = state.xp + amount
  const oldLevel  = computeLevel(state.xp)
  const newLevel  = computeLevel(newXP)
  const leveledUp = newLevel.level > oldLevel.level

  let updated: GamificationState = {
    ...state,
    xp:         newXP,
    level:      newLevel.level,
    totalSessions: event === 'QUESTION_ASKED' ? state.totalSessions + 1 : state.totalSessions,
  }

  // Check badges
  const earned = checkBadges(updated, profile)
  const newEarned = earned.filter(b => !state.badges.includes(b.id))

  if (newEarned.length > 0) {
    updated = {
      ...updated,
      badges:    [...state.badges, ...newEarned.map(b => b.id)],
      newBadges: [...(state.newBadges ?? []), ...newEarned.map(b => b.id)],
      xp:        newXP + newEarned.reduce((s, b) => s + b.xpReward, 0),
    }
  }

  return { state: updated, leveledUp, newBadges: newEarned }
}

// ── UPDATE STREAK ─────────────────────────────────────────────────
export function updateStreak(state: GamificationState): GamificationState {
  const today    = new Date().toISOString().split('T')[0]
  const lastDate = state.lastStudyDate

  if (lastDate === today) return state   // Already studied today

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const newStreak = lastDate === yesterday ? state.streakDays + 1 : 1

  return { ...state, streakDays: newStreak, lastStudyDate: today }
}

// ── CHECK BADGE CONDITIONS ────────────────────────────────────────
function checkBadges(state: GamificationState, profile?: LearnerProfile): Badge[] {
  const earned: Badge[] = []
  const has = (id: string) => state.badges.includes(id)

  const q = profile?.totalQuestions ?? 0
  const acc = profile && profile.totalQuestions > 0
    ? (profile.correctAnswers / profile.totalQuestions) * 100 : 0

  if (q >= 1   && !has('first_question')) earned.push(BADGE_MAP['first_question'])
  if (q >= 10  && !has('q_10'))           earned.push(BADGE_MAP['q_10'])
  if (q >= 50  && !has('q_50'))           earned.push(BADGE_MAP['q_50'])
  if (q >= 100 && !has('q_100'))          earned.push(BADGE_MAP['q_100'])
  if (q >= 500 && !has('q_500'))          earned.push(BADGE_MAP['q_500'])

  if (state.streakDays >= 3  && !has('streak_3'))  earned.push(BADGE_MAP['streak_3'])
  if (state.streakDays >= 7  && !has('streak_7'))  earned.push(BADGE_MAP['streak_7'])
  if (state.streakDays >= 30 && !has('streak_30')) earned.push(BADGE_MAP['streak_30'])

  if (acc >= 80 && !has('accuracy_80')) earned.push(BADGE_MAP['accuracy_80'])
  if (acc >= 90 && !has('accuracy_90')) earned.push(BADGE_MAP['accuracy_90'])

  return earned.filter(Boolean)
}

// ── MOTIVATIONAL MESSAGES (indexed by level + streak) ────────────
export function getMotivationalMessage(
  level: number, streak: number, locale = 'en'
): string {
  const msgs: Record<string, string[]> = {
    en: [
      `🔥 ${streak} day streak! You're building a great habit.`,
      `⭐ Level ${level}! Keep pushing — every question makes you sharper.`,
      `📈 Consistency beats intensity. You're proving that every day.`,
      `🎯 Your dedication today is your advantage tomorrow.`,
      `💡 Real learning happens when you review what went wrong.`,
    ],
    hi: [
      `🔥 ${streak} दिन की streak! बेहतरीन लय पकड़ी है।`,
      `⭐ Level ${level}! हर सवाल से और तेज़ होते जा रहे हो।`,
      `📈 नियमितता ही सफलता की कुंजी है।`,
      `🎯 आज की मेहनत कल का फल देगी।`,
      `💡 जो गलत हुआ उसे review करना असली learning है।`,
    ],
  }
  const list = msgs[locale] ?? msgs.en
  return list[Math.floor(Math.random() * list.length)]
}

// ── MILESTONE MESSAGES ────────────────────────────────────────────
export function getMilestoneMessage(event: keyof typeof XP_EVENTS): string | null {
  const milestones: Partial<Record<keyof typeof XP_EVENTS, string>> = {
    FIRST_QUESTION:      '🌟 First question asked! Your journey begins.',
    CHAPTER_COMPLETED:   '🏆 Chapter complete! One step closer to mastery.',
    QUIZ_PERFECT:        '⭐ Perfect quiz score! Impressive.',
    WEAK_TOPIC_MASTERED: '💪 Weak topic conquered! Resilience wins.',
    DAILY_STREAK_7:      '🔥 7-day streak! You\'re in the zone.',
  }
  return milestones[event] ?? null
}
