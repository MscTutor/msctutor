// lib/ai-tutor.ts
// ══════════════════════════════════════════════════════════════════
// TASK 8: Robust AI Tutor — text, voice, image + fallbacks + steps
// ══════════════════════════════════════════════════════════════════

import { deepseekChat, detectSubject, type Message } from './deepseek'

export interface TutorStep {
  step:    number
  title:   string
  content: string
  formula?: string
}

export interface TutorResponse {
  success:      boolean
  answer:       string
  steps:        TutorStep[]
  formula?:     string
  formulaLatex?: string
  subject?:     string
  chapter?:     string
  ncertRef?:    string
  relatedTopics?: string[]
  followupQuestions?: string[]
  difficulty?:  string
  inputType:    'text' | 'voice' | 'image' | 'pdf'
  language:     string
  fallback?:    boolean
  errorMsg?:    string
}

// ── FALLBACK RESPONSES (when AI unavailable) ──────────────────────
const FALLBACKS: Record<string, string> = {
  mathematics: 'This is a Mathematics question. Key approach: Read carefully, identify given values, choose correct formula, substitute and solve step by step. Check your answer by substitution.',
  physics:     'This is a Physics problem. Approach: Identify the concept (Motion/Force/Energy/Waves/Optics), write given data, apply relevant formula from NCERT, solve with proper units.',
  chemistry:   'This is a Chemistry question. Approach: Identify if Organic/Inorganic/Physical, balance equations if needed, apply mole concept or relevant laws.',
  biology:     'This is a Biology question. Draw a labelled diagram if applicable, explain structure→function relationship, give NCERT examples.',
  default:     'Great question! Break it down: (1) Understand what is asked, (2) Recall relevant concepts, (3) Apply step by step, (4) Verify your answer.',
}

function getFallback(subject: string, question: string): TutorResponse {
  const sub = subject.toLowerCase()
  const msg = FALLBACKS[sub] ?? FALLBACKS.default
  return {
    success:   false,
    fallback:  true,
    answer:    msg,
    steps: [
      { step: 1, title: 'Understand the Question', content: `Read: "${question.slice(0, 100)}..."` },
      { step: 2, title: 'Recall Concepts',         content: `Think about ${subject} concepts related to this topic.` },
      { step: 3, title: 'Apply and Solve',          content: 'Use the relevant formula or concept and solve step by step.' },
      { step: 4, title: 'Verify',                   content: 'Check your answer by substituting back or using common sense.' },
    ],
    subject,
    inputType: 'text',
    language:  'en',
    errorMsg:  'AI temporarily unavailable. Showing general guidance.',
  }
}

// ── PARSE AI RESPONSE SAFELY ──────────────────────────────────────
function parseAIResponse(raw: string, inputType: TutorResponse['inputType'], language: string): TutorResponse {
  // Try JSON parse first
  try {
    const clean = raw.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)
    return {
      success:      true,
      answer:       parsed.answer ?? parsed.solution ?? raw.slice(0, 500),
      steps:        parsed.steps  ?? [],
      formula:      parsed.formula,
      formulaLatex: parsed.formulaLatex,
      subject:      parsed.subject,
      chapter:      parsed.chapter,
      ncertRef:     parsed.ncertReference,
      relatedTopics:parsed.relatedTopics ?? [],
      difficulty:   parsed.difficulty    ?? 'medium',
      inputType,
      language,
    }
  } catch {
    // Not JSON — extract steps from markdown/text
    const lines  = raw.split('\n').filter(l => l.trim())
    const steps: TutorStep[] = []
    let   stepNum = 1

    for (const line of lines) {
      if (/^(step\s*\d+|##|\*\*step|\d+\.)/i.test(line.trim())) {
        steps.push({
          step:    stepNum++,
          title:   line.replace(/[#*\d.]/g, '').trim().slice(0, 60) || `Step ${stepNum}`,
          content: '',
        })
      } else if (steps.length > 0) {
        steps[steps.length - 1].content += (steps[steps.length - 1].content ? ' ' : '') + line.trim()
      }
    }

    // If no steps extracted, make one big step
    if (steps.length === 0) {
      steps.push({ step: 1, title: 'Solution', content: raw.slice(0, 2000) })
    }

    return {
      success:   true,
      answer:    lines[0] ?? raw.slice(0, 200),
      steps,
      inputType,
      language,
    }
  }
}

// ── TASK 8A: TEXT QUERY HANDLER ───────────────────────────────────
export async function handleTextQuery(params: {
  question:   string
  subject?:   string
  classLevel?: string
  board?:     string
  language?:  string
}): Promise<TutorResponse> {
  const { question, board = 'CBSE', language = 'en' } = params
  const classLevel = params.classLevel ?? ''
  const subject    = params.subject ?? await detectSubject(question)
  const langNote   = language === 'hi' ? 'Answer in Hindi (Hinglish mix is okay).' : 'Answer in English.'

  if (!process.env.DEEPSEEK_API_KEY) return getFallback(subject, question)

  const messages: Message[] = [
    {
      role:    'system',
      content: `You are MscTutor AI — expert Indian school teacher for ${subject}, Class ${classLevel}, ${board} board.
${langNote}
Return ONLY valid JSON (no markdown fences):
{
  "subject": "${subject}",
  "chapter": "chapter name",
  "classLevel": "${classLevel}",
  "difficulty": "easy|medium|hard",
  "answer": "one-line direct answer",
  "steps": [
    {"step": 1, "title": "Identify Given", "content": "detailed"},
    {"step": 2, "title": "Formula Used",   "content": "formula name and equation"},
    {"step": 3, "title": "Solution",       "content": "step by step calculation"},
    {"step": 4, "title": "Final Answer",   "content": "answer with unit"}
  ],
  "formula": "F = ma",
  "formulaLatex": "F = ma",
  "ncertReference": "NCERT Class X, Chapter Y",
  "relatedTopics": ["topic1", "topic2"]
}`,
    },
    { role: 'user', content: question },
  ]

  try {
    const raw = await deepseekChat(messages, 2000)
    return parseAIResponse(raw, 'text', language)
  } catch (err: any) {
    console.error('AI text query failed:', err.message)
    return getFallback(subject, question)
  }
}

// ── TASK 8B: VOICE QUERY HANDLER ─────────────────────────────────
export async function handleVoiceQuery(params: {
  transcript: string
  language?:  string
  classLevel?: string
}): Promise<TutorResponse> {
  const { transcript, language = 'en', classLevel = '' } = params
  const subject = await detectSubject(transcript)
  const langNote = language === 'hi' ? 'Answer in Hindi or Hinglish.' : 'Answer in simple English.'

  if (!process.env.DEEPSEEK_API_KEY) return getFallback(subject, transcript)

  const prompt = `You are MscTutor AI. A student asked via voice: "${transcript}"
Class level: ${classLevel || 'not specified'}. ${langNote}
Give a clear, friendly, conversational answer with steps.
Keep it concise (3-5 sentences for simple questions, more for complex ones).
Include the formula if relevant. Give NCERT reference if applicable.
Format as plain text (not JSON) — be like a teacher talking to a student.`

  try {
    const raw = await deepseekChat(prompt, 1200)
    // Voice responses are conversational text, not JSON
    const sentences = raw.split(/[.!?]\s+/).filter(s => s.trim().length > 10)
    const steps: TutorStep[] = sentences.slice(0, 4).map((s, i) => ({
      step:    i + 1,
      title:   ['Understanding', 'Explanation', 'Key Point', 'Summary'][i] ?? `Point ${i + 1}`,
      content: s.trim(),
    }))

    return {
      success:   true,
      answer:    raw.slice(0, 300),
      steps:     steps.length > 0 ? steps : [{ step: 1, title: 'Answer', content: raw }],
      subject,
      inputType: 'voice',
      language,
    }
  } catch {
    return getFallback(subject, transcript)
  }
}

// ── TASK 8C: IMAGE QUERY HANDLER ─────────────────────────────────
export async function handleImageQuery(params: {
  base64:    string
  mimeType:  string
  prompt?:   string
  language?: string
}): Promise<TutorResponse> {
  const { base64, mimeType, prompt, language = 'en' } = params

  if (!process.env.DEEPSEEK_API_KEY) {
    return {
      success:   false,
      fallback:  true,
      answer:    'Image received. Add DEEPSEEK_API_KEY to enable AI analysis.',
      steps:     [{ step: 1, title: 'Setup Required', content: 'Configure DEEPSEEK_API_KEY in environment variables to get AI image analysis.' }],
      inputType: 'image',
      language,
      errorMsg:  'API key missing',
    }
  }

  // Validate base64 size (max ~4MB base64 = ~3MB image)
  if (base64.length > 4 * 1024 * 1024) {
    return {
      success:   false,
      fallback:  true,
      answer:    'Image too large for AI analysis. Please use an image under 3MB.',
      steps:     [{ step: 1, title: 'Image Too Large', content: 'Compress image or take a clearer, closer photo of just the question.' }],
      inputType: 'image',
      language,
    }
  }

  const userPrompt = prompt?.trim()
    ? `${prompt}\nSolve step by step. Show all formulas and working.`
    : 'Identify and solve this question. Show all steps, formulas used, and give the final answer with units.'

  try {
    const { deepseekVision } = await import('./deepseek-vision')
    const raw = await deepseekVision(base64, mimeType, userPrompt)
    return parseAIResponse(raw, 'image', language)
  } catch (err: any) {
    console.error('Image AI failed:', err.message)
    return {
      success:   false,
      fallback:  true,
      answer:    'Could not analyze the image. Try typing your question instead.',
      steps: [
        { step: 1, title: 'Image Processing Failed', content: 'The AI could not read the image. Make sure the question is clear and well-lit.' },
        { step: 2, title: 'Try Instead',             content: 'Type your question in the text box for instant AI answer.' },
      ],
      inputType: 'image',
      language,
      errorMsg:  err.message,
    }
  }
}

// ── TASK 8D: PDF QUERY HANDLER ────────────────────────────────────
export async function handlePDFQuery(params: {
  text:      string
  filename?: string
  question?: string
  language?: string
}): Promise<TutorResponse> {
  const { text, filename = 'document', question, language = 'en' } = params
  const truncatedText = text.slice(0, 3000)  // Limit context size

  if (!process.env.DEEPSEEK_API_KEY) {
    return getFallback('General', question ?? 'PDF question')
  }

  const prompt = question?.trim()
    ? `PDF content: "${truncatedText}"\n\nStudent question: "${question}"\nAnswer the question based on the PDF content with step-by-step explanation.`
    : `Analyze this educational PDF content: "${truncatedText}"\nExtract key concepts, formulas, and important points. Present as a structured study guide.`

  try {
    const raw = await deepseekChat(prompt, 2000)
    const result = parseAIResponse(raw, 'pdf', language)
    result.chapter = filename.replace('.pdf', '').replace(/-/g, ' ')
    return result
  } catch {
    return getFallback('General', question ?? 'PDF content')
  }
}

// ── MASTER HANDLER — routes to correct handler ────────────────────
export async function askAITutor(params: {
  type:       'text' | 'voice' | 'image' | 'pdf'
  question?:  string
  transcript?: string
  base64?:    string
  mimeType?:  string
  pdfText?:   string
  filename?:  string
  prompt?:    string
  subject?:   string
  classLevel?: string
  board?:     string
  language?:  string
}): Promise<TutorResponse> {
  const { type, language = 'en' } = params

  try {
    switch (type) {
      case 'text':
        if (!params.question?.trim()) throw new Error('Question is required')
        return await handleTextQuery({
          question:   params.question,
          subject:    params.subject,
          classLevel: params.classLevel,
          board:      params.board,
          language,
        })

      case 'voice':
        if (!params.transcript?.trim()) throw new Error('Transcript is required')
        return await handleVoiceQuery({
          transcript: params.transcript,
          language,
          classLevel: params.classLevel,
        })

      case 'image':
        if (!params.base64?.trim()) throw new Error('Image data is required')
        return await handleImageQuery({
          base64:   params.base64,
          mimeType: params.mimeType ?? 'image/jpeg',
          prompt:   params.prompt,
          language,
        })

      case 'pdf':
        if (!params.pdfText?.trim()) throw new Error('PDF text is required')
        return await handlePDFQuery({
          text:     params.pdfText,
          filename: params.filename,
          question: params.question,
          language,
        })

      default:
        throw new Error(`Unknown input type: ${type}`)
    }
  } catch (err: any) {
    console.error('AI Tutor master error:', err.message)
    return {
      success:   false,
      fallback:  true,
      answer:    'Something went wrong. Please try again.',
      steps:     [{ step: 1, title: 'Error', content: err.message ?? 'Unexpected error occurred.' }],
      inputType: type,
      language,
      errorMsg:  err.message,
    }
  }
}

// ── XP INTEGRATION (non-destructive extension) ─────────────────────
// Called client-side after successful AI response to award XP
export function awardQuestionXP(userId: string, wasCorrect?: boolean): void {
  if (typeof window === 'undefined') return
  try {
    const { loadGamification, addXP, updateStreak, saveGamification } = require('./gamification')
    let state = loadGamification(userId)
    state     = updateStreak(state)
    const r1  = addXP(state, 'QUESTION_ASKED')
    state     = r1.state
    if (wasCorrect) {
      const r2 = addXP(state, 'QUESTION_CORRECT')
      state    = r2.state
    }
    saveGamification(userId, state)
  } catch {
    // Gamification is non-critical — silent fail
  }
}
