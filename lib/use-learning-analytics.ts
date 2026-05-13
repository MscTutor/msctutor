'use client'
// lib/use-learning-analytics.ts
// ══════════════════════════════════════════════════════════════════
// LEARNING ANALYTICS — Extends existing LearnerProfile + GamificationState
// Provides computed metrics for dashboard visualizations
// ══════════════════════════════════════════════════════════════════

import { useMemo, useEffect, useState } from 'react'
import {
  loadProfile, getRevisionRecommendations,
  detectWeakTopics, getLearningInsights,
  type LearnerProfile, type TopicMastery,
} from './adaptive/learner-profile'
import {
  loadGamification, computeLevel, getLevelProgress,
  updateStreak, saveGamification, getMotivationalMessage,
  type GamificationState,
} from './gamification'

// ── TYPES ─────────────────────────────────────────────────────────
export interface SubjectHeatmap {
  subject:      string
  avgAccuracy:  number
  questionsAsked: number
  weeklyTrend:  'up' | 'down' | 'stable'
}

export interface ConsistencyMetric {
  activeDaysLast7:  number
  activeDaysLast30: number
  avgDailyQuestions: number
  bestStreak:       number
}

export interface AnalyticsSummary {
  profile:        LearnerProfile | null
  gamification:   GamificationState | null
  // Computed
  totalQuestions: number
  accuracy:       number           // 0-100
  streakDays:     number
  xp:             number
  level:          number
  levelTitle:     string
  levelPct:       number
  levelNext:      number
  weakTopics:     TopicMastery[]
  revisionsdue:   TopicMastery[]
  subjectHeatmap: SubjectHeatmap[]
  motivationalMsg: string
  consistency:    ConsistencyMetric
  insights:       ReturnType<typeof getLearningInsights> | null
  loaded:         boolean
}

// ── HOOK ──────────────────────────────────────────────────────────
export function useLearningAnalytics(userId?: string): AnalyticsSummary {
  const [profile,      setProfile]      = useState<LearnerProfile | null>(null)
  const [gamification, setGamification] = useState<GamificationState | null>(null)
  const [loaded,       setLoaded]       = useState(false)

  useEffect(() => {
    const uid = userId ?? localStorage.getItem('msc_demo_uid') ?? 'demo'
    const prof = loadProfile(uid)
    const gami = loadGamification(uid)

    // Update streak on load
    const updatedGami = updateStreak(gami)
    if (updatedGami.lastStudyDate !== gami.lastStudyDate) {
      saveGamification(uid, updatedGami)
    }

    setProfile(prof)
    setGamification(updatedGami)
    setLoaded(true)
  }, [userId])

  return useMemo<AnalyticsSummary>(() => {
    if (!loaded || !gamification) {
      return {
        profile: null, gamification: null,
        totalQuestions:0, accuracy:0, streakDays:0,
        xp:0, level:1, levelTitle:'Beginner', levelPct:0, levelNext:100,
        weakTopics:[], revisionsdue:[], subjectHeatmap:[],
        motivationalMsg:'', consistency:{activeDaysLast7:0,activeDaysLast30:0,avgDailyQuestions:0,bestStreak:0},
        insights:null, loaded:false,
      }
    }

    const lv      = computeLevel(gamification.xp)
    const lvProg  = getLevelProgress(gamification.xp)

    // Accuracy
    const accuracy = profile && profile.totalQuestions > 0
      ? Math.round((profile.correctAnswers / profile.totalQuestions) * 100)
      : 0

    // Weak topics & revisions
    const weakTopics   = profile ? detectWeakTopics(profile)               : []
    const revisionsdue = profile ? getRevisionRecommendations(profile)      : []
    const insights     = profile ? getLearningInsights(profile)             : null

    // Subject heatmap
    const subjectHeatmap: SubjectHeatmap[] = profile
      ? Object.entries(profile.subjectPerformance).map(([subject, perf]) => ({
          subject,
          avgAccuracy:   Math.round(perf.averageScore),
          questionsAsked: perf.questionsAsked,
          weeklyTrend:   perf.averageScore >= 70 ? 'up' as const
            : perf.averageScore >= 50 ? 'stable' as const : 'down' as const,
        })).sort((a, b) => b.questionsAsked - a.questionsAsked)
      : []

    // Consistency
    const consistency: ConsistencyMetric = {
      activeDaysLast7:   Math.min(gamification.streakDays, 7),
      activeDaysLast30:  Math.min(gamification.streakDays, 30),
      avgDailyQuestions: profile && gamification.totalSessions > 0
        ? Math.round(profile.totalQuestions / Math.max(gamification.totalSessions, 1))
        : 0,
      bestStreak: gamification.streakDays,
    }

    return {
      profile,
      gamification,
      totalQuestions: profile?.totalQuestions ?? 0,
      accuracy,
      streakDays:  gamification.streakDays,
      xp:          gamification.xp,
      level:       lv.level,
      levelTitle:  lv.title,
      levelPct:    lvProg.pct,
      levelNext:   lvProg.next,
      weakTopics,
      revisionsdue,
      subjectHeatmap,
      motivationalMsg: getMotivationalMessage(lv.level, gamification.streakDays),
      consistency,
      insights,
      loaded: true,
    }
  }, [profile, gamification, loaded])
}

// ── MINI HOOK: just XP + level for header display ─────────────────
export function useXPLevel(userId?: string) {
  const [state, setState] = useState<{ xp: number; level: number; title: string; pct: number } | null>(null)
  useEffect(() => {
    const uid  = userId ?? localStorage.getItem('msc_demo_uid') ?? 'demo'
    const gami = loadGamification(uid)
    const lv   = computeLevel(gami.xp)
    const prog = getLevelProgress(gami.xp)
    setState({ xp: gami.xp, level: lv.level, title: lv.title, pct: prog.pct })
  }, [userId])
  return state
}
