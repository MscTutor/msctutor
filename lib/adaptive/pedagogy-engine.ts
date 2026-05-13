// lib/adaptive/pedagogy-engine.ts
// ══════════════════════════════════════════════════════════
// PEDAGOGICAL PROMPT BUILDER — Makes AI behave like real teacher
// Socratic method, scaffolding, Bloom's taxonomy, ZPD
// ══════════════════════════════════════════════════════════

import type { LearnerProfile, TopicMastery, DifficultyLevel, LearningStyle, MasteryLevel } from './learner-profile'
import { computeAdaptiveDifficulty, detectWeakTopics } from './learner-profile'

interface PedagogyContext {
  question:      string
  subject:       string
  classLevel:    string
  chapterName?:  string
  topicName?:    string
  language:      string
  inputType:     'text' | 'voice' | 'image'
}

interface AdaptivePrompt {
  systemPrompt:     string
  userPrompt:       string
  temperature:      number   // 0.3 = precise, 0.8 = creative
  maxTokens:        number
  suggestedFollowups: string[]
  pedagogyStrategy: string
}

// ── BLOOM'S TAXONOMY LEVELS ────────────────────────────
const BLOOMS_VERBS: Record<DifficultyLevel, string[]> = {
  beginner:  ['define', 'identify', 'list', 'name', 'recall', 'state'],
  easy:      ['describe', 'explain', 'summarize', 'classify', 'recognize'],
  medium:    ['apply', 'calculate', 'demonstrate', 'solve', 'use', 'modify'],
  hard:      ['analyze', 'compare', 'differentiate', 'examine', 'experiment'],
  advanced:  ['create', 'design', 'evaluate', 'judge', 'construct', 'derive'],
}

// ── TEACHING STRATEGIES PER MASTERY ────────────────────
const TEACHING_STRATEGY: Record<MasteryLevel, string> = {
  not_started: 'Use simple analogies. Start with a real-life example before any formula. Ask "What do you already know about this?"',
  exploring:   'Build curiosity. Ask probing questions. Introduce core concept gently with a relatable story or example.',
  learning:    'Use scaffolding. Break into smallest possible steps. After each step, check understanding with "Does this make sense?"',
  practicing:  'Focus on common mistakes. Show correct method step-by-step. Provide a similar practice problem at end.',
  proficient:  'Challenge with variations. Ask "What if...?" questions. Connect to other topics. Encourage self-explanation.',
  mastered:    'Push to advanced level. Ask student to explain it back. Connect to real-world applications. Introduce extensions.',
}

// ── SOCRATIC QUESTIONS BY SUBJECT ─────────────────────
const SOCRATIC_PROMPTS: Record<string, string[]> = {
  mathematics: [
    'What formula might apply here?',
    'Can you break this into smaller steps?',
    'What happens if we change just one number?',
    'Can you verify your answer by substituting back?',
    'What is the pattern you see here?',
  ],
  physics: [
    'What forces are acting on this object?',
    'Can you draw a free body diagram first?',
    'What does Newton\'s law say about this situation?',
    'What are the initial and final conditions?',
    'What units should the answer have?',
  ],
  chemistry: [
    'What type of reaction is this?',
    'Is the equation balanced? Check atoms on both sides.',
    'What is the oxidation state of each element?',
    'Can you apply the mole concept here?',
    'What happens at the molecular level?',
  ],
  biology: [
    'What is the function of this structure?',
    'How does this connect to the cell theory?',
    'What would happen if this process stopped?',
    'Can you trace the flow of energy/matter here?',
    'What is the evolutionary advantage of this?',
  ],
  default: [
    'What do you already know about this topic?',
    'Can you explain this in your own words?',
    'What is the key concept being tested here?',
    'How is this similar to what you learned before?',
    'What would be the next logical step?',
  ],
}

// ── MISCONCEPTION DATABASE ─────────────────────────────
const COMMON_MISCONCEPTIONS: Record<string, string[]> = {
  mathematics: [
    'Students often confuse area and perimeter',
    'Many confuse mean, median, and mode',
    'Common error: (a+b)² = a²+b² (missing 2ab term)',
    'Often divide instead of multiply when finding percentage',
    'Confuse HCF and LCM purposes',
  ],
  physics: [
    'Distance and displacement are often confused',
    'Many think heavier objects fall faster (Galileo disproved this)',
    'Confusing mass (kg) with weight (N)',
    'Think current is "used up" in a circuit',
    'Confuse speed and velocity (velocity has direction)',
  ],
  chemistry: [
    'Atoms are NOT the smallest particles (subatomic particles exist)',
    'Mixing or dissolving does NOT create new substances',
    'All acids are NOT corrosive (some are mild like vinegar)',
    'Compounds are NOT just mixtures of elements',
    'Confusing physical and chemical changes',
  ],
  biology: [
    'Plants do NOT only do photosynthesis (they also respire)',
    'Osmosis is specifically for water, not all solutions',
    'Veins do NOT always carry deoxygenated blood (pulmonary vein)',
    'Viruses are NOT living organisms',
    'DNA is NOT the same as genes (DNA contains genes)',
  ],
}

// ── LANGUAGE-SPECIFIC TEACHER PERSONA ─────────────────
function getTeacherPersona(language: string, subject: string): string {
  const personas: Record<string, string> = {
    hi: `तुम एक अनुभवी और दयालु ${subject} शिक्षक हो जो भारत में पढ़ाते हो। 
तुम Hindi और English दोनों में समझाते हो (Hinglish ठीक है)।
तुम हर छात्र की क्षमता पर विश्वास करते हो।`,

    bn: `আপনি একজন অভিজ্ঞ এবং সদয় ${subject} শিক্ষক যিনি বাংলায় পড়ান।
আপনি বাংলা এবং ইংরেজি মিশিয়ে শেখান।
আপনি প্রতিটি ছাত্রের সম্ভাবনায় বিশ্বাস করেন।`,

    ta: `நீங்கள் ஒரு அனுபவமிக்க ${subject} ஆசிரியர், தமிழில் கற்பிக்கிறீர்கள்.
தமிழ் மற்றும் ஆங்கிலம் கலந்து விளக்குகிறீர்கள்.`,

    te: `మీరు అనుభవజ్ఞులైన ${subject} ఉపాధ్యాయులు, తెలుగులో బోధిస్తారు.
తెలుగు మరియు ఇంగ్లీష్ కలిపి వివరిస్తారు.`,

    ar: `أنت مدرس ${subject} متمرس وودود يعلم باللغة العربية البسيطة.
تشرح بأمثلة من الحياة اليومية.`,

    fr: `Vous êtes un professeur de ${subject} expérimenté et bienveillant.
Vous enseignez en français simple et clair.`,

    en: `You are an experienced, warm, and encouraging ${subject} teacher for Indian school students.
You believe every student can succeed with the right guidance.`,
  }
  return personas[language] ?? personas.en
}

// ── MAIN ADAPTIVE PROMPT BUILDER ──────────────────────
export function buildAdaptivePrompt(
  profile: LearnerProfile,
  context: PedagogyContext,
  conversationHistory: { role: string; text: string }[] = []
): AdaptivePrompt {

  const subject         = context.subject.toLowerCase()
  const difficulty      = computeAdaptiveDifficulty(profile, context.subject)
  const weakTopics      = detectWeakTopics(profile, context.subject)
  const subjectPerf     = profile.subjectPerformance[context.subject]
  const accuracy        = subjectPerf ? Math.round(subjectPerf.averageScore) : 50
  const questionsAsked  = subjectPerf?.questionsAsked ?? 0
  const isFirstSession  = questionsAsked === 0

  // Find current topic mastery
  const topicKey      = context.topicName
    ? `${context.classLevel}-${context.subject}-${context.topicName}`
    : null
  const topicMastery  = topicKey ? profile.topicMastery[topicKey] : null
  const masteryLevel  = topicMastery?.mastery ?? 'exploring'

  // Choose teaching strategy based on mastery
  const strategy = TEACHING_STRATEGY[masteryLevel]

  // Socratic questions for subject
  const socraticQs = SOCRATIC_PROMPTS[subject] ?? SOCRATIC_PROMPTS.default
  const misconceptions = COMMON_MISCONCEPTIONS[subject] ?? []

  // Build conversation history context (last 8 messages)
  const recentHistory = conversationHistory.slice(-8)
  const historyText   = recentHistory.length > 0
    ? '\n\nCONVERSATION SO FAR:\n' + recentHistory.map(m => `${m.role === 'student' ? 'Student' : 'Teacher'}: ${m.text}`).join('\n')
    : ''

  // Teacher persona
  const persona = getTeacherPersona(context.language, context.subject)

  // Weak topics context
  const weakTopicsText = weakTopics.length > 0
    ? `\nWEAK TOPICS THIS STUDENT STRUGGLES WITH: ${weakTopics.map(t => t.topicName).join(', ')}. Watch for these in the answer.`
    : ''

  // Build full system prompt
  const systemPrompt = `${persona}

STUDENT PROFILE:
- Name: ${profile.name}
- Class: ${context.classLevel} (${profile.board})
- Subject: ${context.subject}
- Overall accuracy: ${accuracy}%
- Questions answered: ${questionsAsked}
- Current difficulty level: ${difficulty}
- Topic mastery: ${masteryLevel}
- Language: ${context.language}
- Learning style: ${profile.preferredStyle}
${isFirstSession ? '- FIRST SESSION: Be extra welcoming and encouraging!' : `- Streak: ${profile.streakDays} days active`}
${weakTopicsText}

TEACHING STRATEGY FOR THIS STUDENT:
${strategy}

RESPONSE RULES (NON-NEGOTIABLE):
1. Address student by name "${profile.name}" occasionally (not every message)
2. Use Bloom's taxonomy verbs for ${difficulty}: ${BLOOMS_VERBS[difficulty].slice(0,4).join(', ')}
3. Match complexity to ${difficulty} level — not too easy, not too hard
4. After explaining, ALWAYS ask ONE probing question to check understanding
5. If student is wrong, NEVER just say "wrong" — say "Good try! Let me show why..."
6. Use real-life examples relevant to Indian students (cricket, chai, trains, festivals)
7. Keep responses concise: 3-5 sentences for concepts, more for numericals
8. For math/physics: show EVERY step clearly with formula name first
9. End with encouragement ONLY when student deserves it (not every time)
10. Language: ${context.language === 'en' ? 'English' : context.language === 'hi' ? 'Hindi/Hinglish' : 'Mix of local language and English'}

COMMON MISTAKES TO WATCH FOR IN ${context.subject.toUpperCase()}:
${misconceptions.slice(0,3).map((m,i) => `${i+1}. ${m}`).join('\n')}

PEDAGOGICAL APPROACH:
- Socratic questioning: Guide to answer, don't just give it
- Zone of Proximal Development: Challenge but don't overwhelm
- Spaced repetition: Reference previous topics if relevant
- Growth mindset: Praise effort and process, not just correct answers${historyText}`

  // Suggest follow-up questions based on difficulty
  const followupsByDiff: Record<DifficultyLevel, string[]> = {
    beginner:  ['Can you explain this in your own words?', 'What is the basic formula here?', 'Can you give a real-life example?'],
    easy:      ['Can you solve a similar problem?', 'Why does this formula work?', 'What happens if we change one value?'],
    medium:    ['Can you derive this from first principles?', 'What are the exceptions to this rule?', 'How would you apply this to a real problem?'],
    hard:      ['Can you prove this mathematically?', 'How does this connect to [related concept]?', 'Design a problem using this concept.'],
    advanced:  ['Can you find a shorter method?', 'What are the limitations of this approach?', 'How would you teach this to a junior student?'],
  }

  const suggestedFollowups = [
    ...(followupsByDiff[difficulty] ?? []),
    ...socraticQs.slice(0, 2),
  ].slice(0, 4)

  return {
    systemPrompt,
    userPrompt:         context.question,
    temperature:        difficulty === 'beginner' ? 0.5 : difficulty === 'advanced' ? 0.7 : 0.6,
    maxTokens:          difficulty === 'beginner' ? 400 : difficulty === 'advanced' ? 800 : 600,
    suggestedFollowups,
    pedagogyStrategy:   `${masteryLevel} → ${strategy.split('.')[0]}`,
  }
}

// ── DETECT IF STUDENT IS CONFUSED ─────────────────────
export function detectConfusion(studentMessage: string): boolean {
  const confusionSignals = [
    'i don\'t understand', 'confused', 'what', 'how', 'why', 'not clear',
    'समझ नहीं', 'क्यों', 'कैसे', 'समझाओ', 'doubt', 'unclear',
    'huh', 'explain again', 'one more time', 'phir se',
  ]
  const lower = studentMessage.toLowerCase()
  return confusionSignals.some(signal => lower.includes(signal))
}

// ── ASSESS RESPONSE QUALITY ───────────────────────────
export function assessStudentResponse(
  studentAnswer: string,
  correctConcepts: string[]
): { score: number; correct: boolean; feedback: string } {
  const lower  = studentAnswer.toLowerCase()
  const found  = correctConcepts.filter(c => lower.includes(c.toLowerCase()))
  const score  = correctConcepts.length > 0
    ? Math.round((found.length / correctConcepts.length) * 100)
    : 50

  return {
    score,
    correct: score >= 60,
    feedback: score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 40 ? 'partial' : 'needs_work',
  }
}

// ── GENERATE PERSONALIZED REVISION MESSAGE ─────────────
export function buildRevisionPrompt(topics: TopicMastery[], language: string): string {
  const topicList = topics.map(t => `${t.topicName} (${t.subject}, ${t.averageScore}% accuracy)`).join(', ')

  const messages: Record<string, string> = {
    hi: `${profile_name_placeholder} के लिए revision plan:\n\nये topics practice करने की जरूरत है: ${topicList}\n\nइनमें से एक topic चुनकर शुरू करते हैं। कौन सा पहले करें?`,
    en: `Time for revision! These topics need practice: ${topicList}\n\nWhich would you like to start with?`,
    default: `Revision needed for: ${topicList}`,
  }

  return messages[language] ?? messages.default
}
const profile_name_placeholder = '{student_name}'

// ── MOTIVATIONAL MESSAGES ─────────────────────────────
export function getMotivationalMessage(accuracy: number, streakDays: number, language: string): string {
  const msgs: Record<string, Record<string, string>> = {
    hi: {
      excellent: `🌟 शानदार! ${streakDays} दिन की streak के साथ ${accuracy}% accuracy — तुम प्रतिदिन बेहतर हो रहे हो!`,
      good:      `👏 अच्छा काम! अपनी weak topics पर थोड़ा और ध्यान दो और तुम top पर होगे!`,
      low:       `💪 हार मत मानो! हर गलती से कुछ नया सीखते हैं। आज फिर कोशिश करो!`,
    },
    en: {
      excellent: `🌟 Outstanding! ${accuracy}% accuracy and a ${streakDays}-day streak — you're on fire!`,
      good:      `👏 Good work! Focus a bit more on weak topics and you'll be excellent!`,
      low:       `💪 Don't give up! Every mistake is a stepping stone. Let's try again today!`,
    },
  }

  const level = accuracy >= 80 ? 'excellent' : accuracy >= 60 ? 'good' : 'low'
  return (msgs[language] ?? msgs.en)[level]
}

// ── NEXT TOPIC RECOMMENDATION ─────────────────────────
export function recommendNextTopic(
  profile: LearnerProfile,
  currentSubject: string,
  currentChapterId: string
): { topicName: string; reason: string; priority: 'revision'|'new'|'advance' } | null {
  // 1. Check revision queue first
  const revisionDue = Object.values(profile.topicMastery)
    .filter(t => t.subject === currentSubject && t.needsRevision)
    .sort((a, b) => a.averageScore - b.averageScore)[0]

  if (revisionDue) {
    return { topicName: revisionDue.topicName, reason: `You got this wrong before — let's try again!`, priority: 'revision' }
  }

  // 2. Suggest weakest topic in current chapter
  const chapterTopics = Object.values(profile.topicMastery)
    .filter(t => t.subject === currentSubject && t.chapterId === currentChapterId && t.mastery !== 'mastered')

  if (chapterTopics.length > 0) {
    const weakest = chapterTopics.sort((a,b) => a.averageScore - b.averageScore)[0]
    return { topicName: weakest.topicName, reason: `Let's strengthen this topic`, priority: 'new' }
  }

  return null
}

// ══════════════════════════════════════════════════════════════════
// PEDAGOGY EXTENSION — Emotional tutoring + teaching style switching
// ══════════════════════════════════════════════════════════════════

export type TeachingStyle =
  | 'socratic'       // Ask questions to guide discovery
  | 'direct'         // Explain clearly and directly
  | 'example_based'  // Lead with worked examples
  | 'analogy'        // Use real-life comparisons
  | 'story'          // Embed in narrative
  | 'challenge'      // Give challenge problems

// ── EMOTION DETECTION ─────────────────────────────────────────────
export function detectEmotionalState(
  message: string,
  recentAccuracy: number
): { state: 'frustrated' | 'confused' | 'bored' | 'confident' | 'anxious' | 'neutral'; signal: string } {
  const m = message.toLowerCase()

  if (/i give up|hate|stupid|can't do|impossible|nothing works/i.test(m))
    return { state: 'frustrated', signal: 'Giving-up language detected' }

  if (/don't understand|confused|makes no sense|lost|what does.*mean/i.test(m))
    return { state: 'confused', signal: 'Explicit confusion expressed' }

  if (/easy|boring|already know|too simple|i get it already/i.test(m))
    return { state: 'bored', signal: 'Content too easy' }

  if (/exam|test tomorrow|scared|afraid|panic|will i fail/i.test(m))
    return { state: 'anxious', signal: 'Exam anxiety detected' }

  if (recentAccuracy > 80 && /got it|understand|makes sense|clear/i.test(m))
    return { state: 'confident', signal: 'High accuracy + positive language' }

  return { state: 'neutral', signal: 'Normal engagement' }
}

// ── EMOTIONAL RESPONSE MODIFIER ───────────────────────────────────
export function emotionalResponsePrefix(state: ReturnType<typeof detectEmotionalState>['state'], language = 'en'): string {
  const responses: Record<string, Record<typeof state, string>> = {
    en: {
      frustrated:  '💙 I understand — this topic can feel really hard sometimes. Let\'s try a completely different approach: ',
      confused:    '🔍 No worries, confusion is part of learning! Let me break this down into tiny steps: ',
      bored:       '⚡ Since you\'ve got the basics, let\'s try something more challenging: ',
      confident:   '🌟 You\'re doing great! Let\'s level up: ',
      anxious:     '😊 Exam pressure is real, but you\'re more prepared than you think. Focus on what you know: ',
      neutral:     '',
    },
    hi: {
      frustrated:  '💙 मैं समझता हूँ — यह topic कभी-कभी बहुत मुश्किल लगता है। एक अलग तरीका try करते हैं: ',
      confused:    '🔍 कोई बात नहीं! Confusion learning का हिस्सा है। छोटे steps में समझते हैं: ',
      bored:       '⚡ Basics आ गए तुम्हें! कुछ challenging try करते हैं: ',
      confident:   '🌟 बहुत बढ़िया! अब थोड़ा advanced देखते हैं: ',
      anxious:     '😊 Exam का pressure समझ में आता है। तुम सोचते हो से ज़्यादा ready हो: ',
      neutral:     '',
    },
  }
  const lang = responses[language] ?? responses.en
  return lang[state] ?? ''
}

// ── ADAPTIVE TEACHING STYLE SELECTOR ─────────────────────────────
export function selectTeachingStyle(
  profile: { patterns?: { prefersSolvedExamples?: boolean }; preferredStyle?: string },
  emotional: ReturnType<typeof detectEmotionalState>['state'],
  topicType: 'formula' | 'concept' | 'procedure' | 'theorem' | 'application'
): TeachingStyle {
  // Emotional overrides
  if (emotional === 'frustrated') return 'analogy'
  if (emotional === 'confused')   return 'example_based'
  if (emotional === 'bored')      return 'challenge'
  if (emotional === 'anxious')    return 'direct'

  // Profile preferences
  if (profile.patterns?.prefersSolvedExamples) return 'example_based'
  if (profile.preferredStyle === 'visual')       return 'analogy'
  if (profile.preferredStyle === 'step_by_step') return 'direct'

  // Topic type defaults
  const defaults: Record<typeof topicType, TeachingStyle> = {
    formula:     'example_based',
    concept:     'analogy',
    procedure:   'direct',
    theorem:     'socratic',
    application: 'story',
  }
  return defaults[topicType]
}

// ── STYLE INSTRUCTION FOR AI ──────────────────────────────────────
export function teachingStyleInstruction(style: TeachingStyle): string {
  const instructions: Record<TeachingStyle, string> = {
    socratic:      'Use the Socratic method: ask guiding questions, let the student discover the answer. Do not state the answer directly — lead with "What do you think happens when...?" or "Can you spot the pattern?"',
    direct:        'Explain directly, clearly, and step-by-step. Use numbered steps. State the key formula or rule first, then explain why.',
    example_based: 'Lead with a fully worked numerical example (show every step). Then explain the concept. Use a second shorter example to confirm.',
    analogy:       'Start with a real-life Indian analogy (cricket, cooking, traffic, market, railway). Map the analogy to the concept, then give the formal explanation.',
    story:         'Frame the concept as a short story or real-world scenario. Characters should face the problem, and solving it reveals the concept.',
    challenge:     'Present a challenging problem slightly above their current level. Give minimal hints. Celebrate when they struggle — that\'s where learning happens.',
  }
  return instructions[style]
}

// ── BLOOM'S TAXONOMY QUESTION GENERATOR ──────────────────────────
export type BloomsLevel = 'remember'|'understand'|'apply'|'analyze'|'evaluate'|'create'

export function getBloomsQuestion(topic: string, level: BloomsLevel, subject: string): string {
  const starters: Record<BloomsLevel, string[]> = {
    remember:   ['What is the definition of', 'State the formula for', 'List the steps to', 'Name the types of'],
    understand:  ['Explain in your own words why', 'Describe how', 'Summarize the concept of', 'Give an example of'],
    apply:       ['Calculate the value of', 'Solve this problem using', 'Use the formula to find', 'Apply the concept of'],
    analyze:     ['Compare and contrast', 'Why does this happen in', 'Identify the relationship between', 'Break down the process of'],
    evaluate:    ['Judge whether', 'Justify why', 'Is this approach correct for', 'Critique the method of'],
    create:      ['Design an experiment to test', 'Predict what would happen if', 'Create a real-life situation where', 'Formulate your own problem about'],
  }
  const starter = starters[level][Math.floor(Math.random() * starters[level].length)]
  return `${starter} ${topic} in the context of ${subject}?`
}

// ── CURRICULUM MASTERY PROGRESSION ───────────────────────────────
export function buildMasteryProgressionPrompt(
  completedTopics: string[],
  currentTopic:    string,
  nextTopics:      string[],
  subject:         string
): string {
  return `[CURRICULUM CONTEXT]
Subject: ${subject}
Completed: ${completedTopics.slice(-5).join(', ') || 'None yet'}
Current focus: ${currentTopic}
Next up: ${nextTopics.slice(0, 3).join(', ') || 'TBD'}

Build on what they already know. Use completed topics as bridges to the current one.`
}
