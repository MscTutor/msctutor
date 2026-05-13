// lib/adaptive/adaptive-tutor.ts
// ══════════════════════════════════════════════════════════
// ADAPTIVE AI TUTOR — Real teacher behavior with memory
// ══════════════════════════════════════════════════════════

import { deepseekChat, type Message } from '@/lib/deepseek'
import { logger }                     from '@/lib/logger'
import type { LearnerProfile }        from './learner-profile'
import { buildAdaptivePrompt, detectConfusion } from './pedagogy-engine'

export interface TutorMessage {
  role:        'student' | 'teacher'
  text:        string
  timestamp:   string
  metadata?: {
    difficulty:       string
    topicsCovered:    string[]
    wasConfused:      boolean
    responseType:     'explanation' | 'question' | 'encouragement' | 'correction' | 'hint'
    followupQuestions: string[]
    keyConceptsUsed:  string[]
  }
}

export interface AdaptiveTutorResponse {
  text:              string
  followupQuestions: string[]
  pedagogyStrategy:  string
  difficultyUsed:    string
  topicsCovered:     string[]
  suggestRevision:   boolean
  encouragement?:    string
  keyFormula?:       string
  relatedTopics:     string[]
}

// Language instruction map
const LANG_INSTRUCTION: Record<string, string> = {
  en: 'Respond in clear English.',
  hi: 'हिंदी में जवाब दो (Hinglish ठीक है)।',
  bn: 'বাংলায় উত্তর দাও।',
  gu: 'ગુજરાતીમાં જવાબ આપો।',
  mr: 'मराठीत उत्तर द्या।',
  ta: 'தமிழில் பதில் அளிக்கவும்।',
  te: 'తెలుగులో సమాధానం ఇవ్వండి।',
  pa: 'ਪੰਜਾਬੀ ਵਿੱਚ ਜਵਾਬ ਦਿਓ।',
  ur: 'اردو میں جواب دیں۔',
  as: 'অসমীয়াত উত্তৰ দিয়া।',
  ar: 'أجب باللغة العربية.',
  fr: 'Répondez en français.',
}

// ── MAIN ADAPTIVE CHAT ─────────────────────────────────
export async function adaptiveChat(params: {
  studentMessage:  string
  profile:         LearnerProfile
  subject:         string
  classLevel:      string
  chapterName?:    string
  topicName?:      string
  language:        string
  conversationHistory: TutorMessage[]
}): Promise<AdaptiveTutorResponse> {

  const { studentMessage, profile, subject, classLevel, language, conversationHistory } = params
  const isConfused = detectConfusion(studentMessage)

  // ── NEW: Emotional + teaching-style intelligence ─────────────
  const { detectEmotionalState, emotionalResponsePrefix, selectTeachingStyle, teachingStyleInstruction, getBloomsQuestion } = await import('./pedagogy-engine')
  const { estimateConfidence, detectBurnout } = await import('./learner-profile')

  const recentAccuracy = Object.values(profile.topicMastery)
    .slice(-5).reduce((s, t) => s + t.averageScore, 0) / Math.max(1, Math.min(5, Object.keys(profile.topicMastery).length))

  const emotionalState  = detectEmotionalState(studentMessage, recentAccuracy)
  const teachingStyle   = selectTeachingStyle(profile, emotionalState.state, params.topicName?.includes('formula') ? 'formula' : 'concept')
  const styleInstruction = teachingStyleInstruction(teachingStyle)
  const emotionPrefix    = emotionalResponsePrefix(emotionalState.state, language)
  const confidence       = estimateConfidence(profile, subject, params.topicName ?? subject)
  const burnout          = detectBurnout(profile)

  // Build adaptive prompt
  const adaptive = buildAdaptivePrompt(profile, {
    question:    studentMessage,
    subject,
    classLevel,
    chapterName: params.chapterName,
    topicName:   params.topicName,
    language,
    inputType:   'text',
  }, conversationHistory.map(m => ({ role: m.role, text: m.text })))

  // Enrich system prompt with emotional + style context
  const enrichedSystem = `${adaptive.systemPrompt}

[EMOTIONAL INTELLIGENCE]
Student state: ${emotionalState.state} (${emotionalState.signal})
Teaching style selected: ${teachingStyle}
${styleInstruction}
Confidence estimate: ${confidence}%
${burnout.risk !== 'none' ? `⚠️ Burnout risk: ${burnout.risk}. ${burnout.advice}` : ''}
${emotionPrefix ? `Start your response with: "${emotionPrefix}"` : ''}

[ADAPTIVE DEPTH]
${confidence < 40 ? 'Student is struggling — use maximum simplification, analogies, and encouragement.' : ''}
${confidence > 80 ? 'Student is advanced — can handle technical depth and challenge problems.' : ''}
`

  const messages: Message[] = [{ role: 'system', content: enrichedSystem }]

  // Add recent conversation (last 6 exchanges = 12 messages)
  const recentHistory = conversationHistory.slice(-12)
  for (const msg of recentHistory) {
    messages.push({ role: msg.role === 'student' ? 'user' : 'assistant', content: msg.text })
  }

  // Add current question
  messages.push({ role: 'user', content: `${LANG_INSTRUCTION[language] ?? ''}\n\n${studentMessage}` })

  // API key check
  if (!process.env.DEEPSEEK_API_KEY) {
    logger.warn('DEEPSEEK_API_KEY missing — using pedagogical fallback')
    return buildFallbackResponse(studentMessage, subject, language, adaptive, isConfused)
  }

  try {
    const raw = await deepseekChat(messages, adaptive.maxTokens)

    // Extract key info from response
    const keyFormula   = extractFormula(raw)
    const relatedTopics = extractRelatedTopics(raw, subject)

    return {
      text:              raw,
      followupQuestions: adaptive.suggestedFollowups,
      pedagogyStrategy:  adaptive.pedagogyStrategy,
      difficultyUsed:    'medium',
      topicsCovered:     extractTopicsMentioned(raw, subject),
      suggestRevision:   isConfused || raw.toLowerCase().includes('practice'),
      keyFormula,
      relatedTopics,
      encouragement:     extractEncouragement(raw),
    }
  } catch (err) {
    logger.aiError(err)
    return buildFallbackResponse(studentMessage, subject, language, adaptive, isConfused)
  }
}

// ── GENERATE QUIZ QUESTION ─────────────────────────────
export async function generateAdaptiveQuestion(params: {
  profile:     LearnerProfile
  subject:     string
  classLevel:  string
  topicName:   string
  chapterName: string
  language:    string
}): Promise<{
  question:    string
  options:     string[]
  answer:      string
  explanation: string
  difficulty:  string
  hint:        string
}> {
  const { profile, subject, topicName, chapterName, language, classLevel } = params
  const subjectPerf = profile.subjectPerformance[subject]
  const accuracy    = subjectPerf?.averageScore ?? 50
  const difficulty  = accuracy >= 80 ? 'hard' : accuracy >= 60 ? 'medium' : 'easy'
  const langNote    = LANG_INSTRUCTION[language] ?? ''

  const prompt = `You are a ${subject} teacher for Class ${classLevel}.
Generate ONE multiple choice question about "${topicName}" from chapter "${chapterName}".
Difficulty: ${difficulty} (student accuracy: ${accuracy}%)
${langNote}

Return ONLY valid JSON (no markdown):
{
  "question": "question text",
  "options":  ["A. option1", "B. option2", "C. option3", "D. option4"],
  "answer":   "A. option1",
  "explanation": "Why A is correct, step by step",
  "difficulty": "${difficulty}",
  "hint": "A small hint without giving away the answer"
}`

  if (!process.env.DEEPSEEK_API_KEY) {
    return {
      question:    `What is the key concept of ${topicName}?`,
      options:     ['A. Concept 1', 'B. Concept 2', 'C. Concept 3', 'D. Concept 4'],
      answer:      'A. Concept 1',
      explanation: `${topicName} is an important topic in ${subject}. Configure DEEPSEEK_API_KEY for real questions.`,
      difficulty,
      hint:        'Think about the fundamental definition.',
    }
  }

  try {
    const raw   = await deepseekChat(prompt, 600)
    const clean = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return {
      question:    `Explain the concept of ${topicName} in ${subject}.`,
      options:     ['A. Definition approach', 'B. Formula approach', 'C. Example approach', 'D. All of the above'],
      answer:      'D. All of the above',
      explanation: `Understanding ${topicName} requires definition, formula, and examples.`,
      difficulty,
      hint:        'Consider all aspects of the topic.',
    }
  }
}

// ── GENERATE PERSONALIZED STUDY PLAN ──────────────────
export async function generateStudyPlan(
  profile: LearnerProfile,
  language: string
): Promise<{
  weeklyPlan: { day: string; topic: string; activity: string; duration: number }[]
  focusAreas: string[]
  dailyGoal:  string
}> {
  const weakTopics = Object.values(profile.topicMastery)
    .filter(t => t.mastery === 'learning' || t.needsRevision)
    .slice(0, 5)

  const langNote = LANG_INSTRUCTION[language] ?? ''
  const weak     = weakTopics.map(t => `${t.topicName} (${t.subject})`).join(', ')
  const prompt   = `Create a 7-day study plan for ${profile.name}, Class ${profile.classLevel}.
Weak areas: ${weak || 'none identified yet'}
${langNote}
Return ONLY JSON:
{
  "weeklyPlan": [
    {"day": "Monday", "topic": "topic name", "activity": "what to do", "duration": 30}
  ],
  "focusAreas": ["area1", "area2"],
  "dailyGoal": "short motivating daily goal"
}`

  if (!process.env.DEEPSEEK_API_KEY) {
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    return {
      weeklyPlan: days.map((day, i) => ({
        day, topic: weakTopics[i % weakTopics.length]?.topicName ?? 'Review topics',
        activity: i < 5 ? 'Practice 5 questions' : 'Revise all week\'s topics',
        duration: 30,
      })),
      focusAreas: weakTopics.slice(0,3).map(t => t.topicName),
      dailyGoal:  'Solve 5 questions and understand 1 new concept',
    }
  }

  try {
    const raw   = await deepseekChat(prompt, 800)
    const clean = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return {
      weeklyPlan: [
        { day: 'Monday',    topic: 'Weak topics review', activity: 'Practice problems', duration: 30 },
        { day: 'Tuesday',   topic: 'New chapter',        activity: 'Read + notes',      duration: 25 },
        { day: 'Wednesday', topic: 'Formulas',           activity: 'Formula practice',  duration: 20 },
        { day: 'Thursday',  topic: 'Mock quiz',          activity: '10 MCQs',           duration: 30 },
        { day: 'Friday',    topic: 'Revision',           activity: 'All week topics',   duration: 20 },
        { day: 'Saturday',  topic: 'Full test',          activity: 'Chapter test',      duration: 45 },
        { day: 'Sunday',    topic: 'Rest + review',      activity: 'Light reading',     duration: 15 },
      ],
      focusAreas: weakTopics.slice(0,3).map(t => t.topicName),
      dailyGoal:  'Practice 5 questions every day',
    }
  }
}

// ── HELPER: EXTRACT FORMULA FROM RESPONSE ─────────────
function extractFormula(text: string): string | undefined {
  const formulaPatterns = [
    /[A-Z]\s*=\s*[A-Za-z0-9+\-×÷/\\^²³√πΔ∑()]+/g,
    /\bF\s*=\s*ma\b/i,
    /\bV\s*=\s*IR\b/i,
    /\bs\s*=\s*ut/i,
  ]
  for (const pattern of formulaPatterns) {
    const match = text.match(pattern)
    if (match?.[0] && match[0].length < 50) return match[0]
  }
  return undefined
}

// ── HELPER: EXTRACT TOPICS MENTIONED ──────────────────
function extractTopicsMentioned(text: string, subject: string): string[] {
  const subjectKeywords: Record<string, string[]> = {
    mathematics: ['algebra','geometry','trigonometry','calculus','statistics','probability','mensuration'],
    physics:     ['motion','force','energy','work','power','electricity','magnetism','optics','gravitation'],
    chemistry:   ['atoms','molecules','bonding','reactions','acids','bases','organic','periodic table'],
    biology:     ['cells','tissues','organs','photosynthesis','respiration','genetics','evolution','nutrition'],
  }
  const keywords = subjectKeywords[subject.toLowerCase()] ?? []
  return keywords.filter(k => text.toLowerCase().includes(k))
}

// ── HELPER: EXTRACT RELATED TOPICS ────────────────────
function extractRelatedTopics(text: string, subject: string): string[] {
  const related: Record<string, string[]> = {
    physics:     ['Newton\'s Laws','Energy Conservation','Wave Motion','Electromagnetic Induction'],
    mathematics: ['Algebra','Coordinate Geometry','Calculus','Probability'],
    chemistry:   ['Atomic Structure','Chemical Bonding','Thermodynamics','Electrochemistry'],
    biology:     ['Cell Biology','Genetics','Evolution','Ecology'],
  }
  return (related[subject.toLowerCase()] ?? []).slice(0, 3)
}

// ── HELPER: EXTRACT ENCOURAGEMENT ─────────────────────
function extractEncouragement(text: string): string | undefined {
  const phrases = [
    'excellent', 'great job', 'well done', 'perfect', 'outstanding',
    'शानदार', 'बहुत अच्छा', 'perfect', 'correct',
  ]
  const lower = text.toLowerCase()
  return phrases.some(p => lower.includes(p))
    ? '🌟 Keep it up!'
    : undefined
}

// ── PEDAGOGICAL FALLBACK RESPONSE ─────────────────────
function buildFallbackResponse(
  question: string, subject: string, language: string,
  adaptive: ReturnType<typeof buildAdaptivePrompt>, isConfused: boolean
): AdaptiveTutorResponse {
  const fallbacks: Record<string, string> = {
    en: `Great question! Let me guide you through this step by step.

First, let's understand what's being asked: "${question.slice(0, 80)}..."

In ${subject}, the key approach is:
1. Identify what is given and what is required
2. Choose the relevant formula or concept
3. Apply it step by step
4. Verify your answer

${isConfused ? "It's completely okay to be confused! That's how learning works. Can you tell me which specific part you don't understand?" : "Can you try the first step and I'll guide you further?"}`,

    hi: `बहुत अच्छा सवाल! मैं तुम्हें step-by-step guide करता हूँ।

पहले समझते हैं कि क्या पूछा गया है।

${subject} में हमेशा:
1. दिया गया क्या है — पहले लिखो
2. क्या निकालना है — identify करो  
3. सही formula चुनो
4. Step-by-step solve करो

${isConfused ? "Confused होना बिल्कुल normal है! कौन सी step समझ नहीं आई?" : "पहली step try करो, मैं help करूँगा!"}`,
  }

  return {
    text:              fallbacks[language] ?? fallbacks.en,
    followupQuestions: adaptive.suggestedFollowups,
    pedagogyStrategy:  adaptive.pedagogyStrategy,
    difficultyUsed:    'medium',
    topicsCovered:     [subject],
    suggestRevision:   isConfused,
    relatedTopics:     [],
  }
}
