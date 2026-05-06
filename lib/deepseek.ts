const API_URL = process.env.DEEPSEEK_API_URL ?? 'https://api.deepseek.com/v1/chat/completions'
const MODEL   = process.env.DEEPSEEK_MODEL   ?? 'deepseek-chat'

export interface Message { role: 'system' | 'user' | 'assistant'; content: string }

export async function deepseekChat(
  input: Message[] | string,
  maxTokens = 2000,
): Promise<string> {
  const messages = typeof input === 'string'
    ? [{ role: 'user', content: input } satisfies Message]
    : input

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({ model: MODEL, messages, max_tokens: maxTokens, temperature: 0.3 }),
  })
  if (!res.ok) throw new Error(`DeepSeek error: ${res.status}`)
  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? ''
}

// ─── SOLVE A STUDENT QUESTION ─────────────────────────
export async function solveQuestion(params: {
  question: string
  subject?: string
  classLevel?: string
  board?: string
  language?: string
}) {
  const { question, subject = 'Auto', classLevel = '', board = 'CBSE', language = 'en' } = params
  const langNote = language !== 'en' ? `Answer in ${language} language.` : ''

  const messages: Message[] = [
    {
      role: 'system',
      content: `You are MscTutor AI — expert Indian school teacher for ${subject}, 
Class ${classLevel}, ${board} board. Give step-by-step solutions.
${langNote}
Return ONLY valid JSON (no markdown):
{
  "subject": "Physics",
  "chapter": "Newton's Laws",
  "classLevel": "9",
  "difficulty": "medium",
  "answer": "Short direct answer",
  "steps": [
    {"step": 1, "title": "Identify Given", "content": "detailed explanation"},
    {"step": 2, "title": "Formula", "content": "F = ma"},
    {"step": 3, "title": "Solve", "content": "step by step math"},
    {"step": 4, "title": "Answer", "content": "final answer with unit"}
  ],
  "formula": "F = ma (Newton's 2nd Law)",
  "formulaLatex": "F = ma",
  "ncertReference": "NCERT Class 9, Chapter 9",
  "relatedTopics": ["Inertia", "Momentum", "Newton's 3rd Law"],
  "metaTitle": "Question title for SEO",
  "metaDescription": "150 char description",
  "slug": "url-friendly-slug"
}`,
    },
    { role: 'user', content: question },
  ]
  const raw = await deepseekChat(messages, 2000)
  const clean = raw.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}

// ─── GENERATE EXAM PAPER ──────────────────────────────
export async function generateExamPaper(params: {
  subject: string
  classLevel: string
  board: string
  medium: string
  difficulty: string
  totalQ: number
}) {
  const { subject, classLevel, board, medium, difficulty, totalQ } = params
  const messages: Message[] = [
    {
      role: 'system',
      content: `You are an expert ${board} examiner for Class ${classLevel} ${subject}.
Generate ${totalQ} MCQ questions in ${medium} medium, difficulty: ${difficulty}.
Return ONLY valid JSON array:
[{
  "order": 1,
  "type": "mcq",
  "questionText": "...",
  "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
  "correctAnswer": "A. ...",
  "explanation": "why this is correct",
  "marks": 2,
  "chapter": "chapter name",
  "difficulty": "easy/medium/hard"
}]
Make questions authentic ${board} exam style matching syllabus.`,
    },
    { role: 'user', content: `Generate ${totalQ} questions for ${board} Class ${classLevel} ${subject}` },
  ]
  const raw = await deepseekChat(messages, 4000)
  const clean = raw.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}

// ─── GENERATE CHAPTER CONTENT ────────────────────────
export async function generateChapterContent(params: {
  topic: string
  classLevel: string
  board: string
  subject: string
  medium?: string
}) {
  const { topic, classLevel, board, subject, medium = 'English' } = params
  const messages: Message[] = [
    {
      role: 'system',
      content: `You are an expert ${board} curriculum designer for Class ${classLevel} ${subject}.
Generate complete educational content in ${medium}. Return ONLY valid JSON:
{
  "chapterTitle": "...",
  "chapterTitleHindi": "...",
  "description": "2-3 sentence chapter overview",
  "concepts": [
    {"title": "Concept name", "content": "Full explanation 3-4 sentences", "color": "#1a3a6b"}
  ],
  "formulas": [
    {"name": "Formula name", "latex": "F = ma", "description": "what it means"}
  ],
  "examples": [
    {"question": "example question", "solution": "complete solution", "steps": ["step1","step2"]}
  ],
  "practiceQuestions": [
    {"q": "question text", "answer": "answer", "difficulty": "easy"}
  ],
  "experiments": [
    {"title": "...", "objective": "...", "materials": "...", "procedure": "...", "result": "..."}
  ],
  "keyPoints": ["point 1", "point 2", "point 3"],
  "slug": "url-slug",
  "metaTitle": "SEO title under 60 chars",
  "metaDescription": "SEO description 150 chars",
  "metaKeywords": "keyword1, keyword2, keyword3"
}`,
    },
    { role: 'user', content: `Generate content for: ${topic}, Class ${classLevel}, ${board}, ${subject}` },
  ]
  const raw = await deepseekChat(messages, 4000)
  const clean = raw.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}

// ─── AI ANIMATION GENERATOR ──────────────────────────
export async function generateConceptAnimation(concept: string, subject: string): Promise<string> {
  const messages: Message[] = [
    {
      role: 'system',
      content: `Generate a self-contained HTML/CSS/SVG animation for an educational concept.
Rules: Pure HTML+CSS+SVG only. Fits in 600x300px. Auto-plays & loops. Educational.
Return ONLY the complete HTML code, nothing else.`,
    },
    { role: 'user', content: `Create animation for: "${concept}" in ${subject}` },
  ]
  return await deepseekChat(messages, 2000)
}

// ─── AUTO DETECT SUBJECT FROM TEXT ───────────────────
export async function detectSubject(question: string): Promise<string> {
  const q = question.toLowerCase()
  if (/force|motion|velocity|acceleration|newton|gravity|energy|wave|light|electric|magnetic|optic/.test(q)) return 'Physics'
  if (/atom|molecule|element|compound|acid|base|reaction|periodic|bond|carbon|organic/.test(q)) return 'Chemistry'
  if (/cell|tissue|photosynthesis|dna|heredity|evolution|ecosystem|organ|plant|animal/.test(q)) return 'Biology'
  if (/equation|polynomial|matrix|calculus|integrate|differentiat|geometry|trigon|algebra|number/.test(q)) return 'Mathematics'
  if (/journal|ledger|balance sheet|accountancy|debit|credit|trial balance|depreciation/.test(q)) return 'Accountancy'
  if (/demand|supply|gdp|inflation|market|elasticity|monopoly|banking|money/.test(q)) return 'Economics'
  if (/history|geography|political|civics|sociolog/.test(q)) return 'Social Science'
  if (/python|program|algorithm|computer|software|hardware|network|database/.test(q)) return 'Computer Science'
  return 'General'
}
