import { slugify } from '@/lib/slug'

export type BankCategory = 'mathematics' | 'science' | 'commerce'
export type FormulaKind = 'formula' | 'reaction' | 'code'

export interface FormulaBankEntry {
  id: string
  slug: string
  title: string
  subject: BankCategory
  kind: FormulaKind
  classRange: string
  chapterFamily: string
  symbolCode: string
  expression: string
  reaction?: string
  description: string
  explanation: string[]
  useCases: string[]
  keywords: string[]
  image: string
  diagram: string
  gif: string
  webp: string
}

export interface ExperimentBankEntry {
  id: string
  slug: string
  title: string
  subject: BankCategory
  classRange: string
  chapterFamily: string
  objective: string
  materials: string[]
  steps: string[]
  observations: string[]
  conclusion: string
  safety: string[]
  image: string
  diagram: string
  gif: string
  webp: string
  videoLink: string
}

const MEDIA = {
  mathImage: '/generated-media/maths-formula.webp',
  scienceImage: '/generated-media/science-formula.webp',
  commerceImage: '/generated-media/commerce-formula.webp',
  experimentImage: '/generated-media/experiment-lab.webp',
  formulaGif: '/generated-media/formula-pulse.gif',
  experimentGif: '/generated-media/experiment-loop.gif',
  mathDiagram: '/generated-media/math-diagram.svg',
  scienceDiagram: '/generated-media/science-diagram.svg',
  commerceDiagram: '/generated-media/commerce-diagram.svg',
  reactionDiagram: '/generated-media/reaction-diagram.svg',
}

const MATH_FAMILIES = [
  'Arithmetic', 'Algebra', 'Geometry', 'Mensuration', 'Trigonometry', 'Coordinate Geometry',
  'Statistics', 'Probability', 'Progressions', 'Number Systems', 'Polynomials', 'Quadratic Models',
]

const SCIENCE_FAMILIES = [
  'Physics Motion', 'Physics Electricity', 'Physics Light', 'Chemistry Acids', 'Chemistry Reactions',
  'Chemistry Carbon', 'Biology Life Processes', 'Biology Control', 'Biology Genetics',
  'Environmental Science', 'Laboratory Measurement', 'Scientific Skills',
]

const COMMERCE_FAMILIES = [
  'Accounting Basics', 'Financial Ratios', 'Business Studies', 'Economics Demand', 'Economics Supply',
  'National Income', 'Banking', 'Taxation', 'GST', 'Costing', 'Commercial Arithmetic', 'Business Finance',
]

const FORMULA_VARIANTS = [
  { label: 'Core Rule', suffix: 'core-rule' },
  { label: 'Applied Rule', suffix: 'applied-rule' },
  { label: 'Exam Shortcut', suffix: 'exam-shortcut' },
  { label: 'Advanced Pattern', suffix: 'advanced-pattern' },
  { label: 'Worked Identity', suffix: 'worked-identity' },
  { label: 'Revision Link', suffix: 'revision-link' },
  { label: 'Bridge Concept', suffix: 'bridge-concept' },
  { label: 'Reasoning Form', suffix: 'reasoning-form' },
  { label: 'Problem Solver', suffix: 'problem-solver' },
  { label: 'Board Drill', suffix: 'board-drill' },
  { label: 'Concept Loop', suffix: 'concept-loop' },
  { label: 'Practical Model', suffix: 'practical-model' },
  { label: 'Word Problem Map', suffix: 'word-problem-map' },
  { label: 'Derivation Cue', suffix: 'derivation-cue' },
  { label: 'Visual Ratio', suffix: 'visual-ratio' },
]

const EXPERIMENT_VARIANTS = [
  'Observation Lab',
  'Measurement Practice',
  'Verification Activity',
  'Concept Demonstration',
  'Real-life Model',
  'Board Practical Drill',
  'Quick Lab Setup',
  'Teacher Guided Practical',
  'Home-safe Experiment',
  'Reasoning Activity',
  'Data Recording Task',
  'Prediction and Check',
  'Diagram-based Practical',
  'Repeat-and-Compare',
  'Applied Classroom Demo',
]

function rangeFromIndex(index: number) {
  const start = (index % 8) + 5
  const end = Math.min(start + 2, 12)
  return `Class ${start}-${end}`
}

function mediaBySubject(subject: BankCategory) {
  if (subject === 'mathematics') {
    return { image: MEDIA.mathImage, diagram: MEDIA.mathDiagram }
  }
  if (subject === 'science') {
    return { image: MEDIA.scienceImage, diagram: MEDIA.scienceDiagram }
  }
  return { image: MEDIA.commerceImage, diagram: MEDIA.commerceDiagram }
}

function makeFormulaExpression(subject: BankCategory, family: string, i: number, j: number) {
  if (subject === 'mathematics') {
    return `F_${i + 1}${j + 1}(x) = a_${i + 1}x² + b_${j + 1}x + c_${(i + j) % 9 + 1}`
  }
  if (subject === 'science') {
    return `S_${i + 1}${j + 1} = m_${i + 1}v_${j + 1} + k_${(i + j) % 7 + 1}`
  }
  return `C_${i + 1}${j + 1} = P × R_${j + 1} × T_${i + 1} / 100`
}

function makeReaction(family: string, i: number, j: number) {
  return `${family.split(' ')[0]}-${i + 1}${j + 1}: A${i + 1} + B${j + 1} → C${(i + j) % 9 + 1} + Energy`
}

function buildFormulaEntries(subject: BankCategory, families: string[]): FormulaBankEntry[] {
  const media = mediaBySubject(subject)
  const entries: FormulaBankEntry[] = []

  families.forEach((family, i) => {
    FORMULA_VARIANTS.forEach((variant, j) => {
      const kind: FormulaKind =
        subject === 'science' && (j % 3 === 1) ? 'reaction'
          : subject === 'commerce' && j % 5 === 0 ? 'code'
            : 'formula'
      const title = `${family} ${variant.label}`
      const slug = slugify(`${subject}-${family}-${variant.suffix}-${i}-${j}`)
      const expression = makeFormulaExpression(subject, family, i, j)
      const reaction = kind === 'reaction' ? makeReaction(family, i, j) : undefined
      entries.push({
        id: `formula-${subject}-${i + 1}-${j + 1}`,
        slug,
        title,
        subject,
        kind,
        classRange: rangeFromIndex(i + j),
        chapterFamily: family,
        symbolCode: `${subject.slice(0, 3).toUpperCase()}-${(i + 1).toString().padStart(2, '0')}-${(j + 1).toString().padStart(2, '0')}`,
        expression,
        reaction,
        description: `${title} is part of the ${family} learning family. This entry is organised for chapter-level revision, formula lookup, and AI-linked explanation across text, voice, image and solved examples.`,
        explanation: [
          `Start by identifying the chapter family: ${family}.`,
          `Use the code ${subject.slice(0, 3).toUpperCase()}-${(i + 1).toString().padStart(2, '0')}-${(j + 1).toString().padStart(2, '0')} to tag notes, question banks and answer pages.`,
          kind === 'reaction'
            ? `Read the reaction form carefully and balance reactants or variables before using it in a solution page.`
            : `Substitute values only after checking the units and the meaning of every symbol in the expression.`,
          `Connect this formula to the chapter explanation and to at least one worked example before memorising it.`,
        ],
        useCases: [
          'Board-style revision questions',
          'Formula lookup pages',
          'AI-generated doubt support',
          'Chapter summary and short notes',
        ],
        keywords: [subject, family.toLowerCase(), variant.label.toLowerCase(), 'chapter-wise', 'study-bank'],
        image: media.image,
        diagram: kind === 'reaction' ? MEDIA.reactionDiagram : media.diagram,
        gif: MEDIA.formulaGif,
        webp: media.image,
      })
    })
  })

  return entries
}

function buildExperimentEntries(subject: BankCategory, families: string[]): ExperimentBankEntry[] {
  const media = mediaBySubject(subject)
  const entries: ExperimentBankEntry[] = []

  families.forEach((family, i) => {
    EXPERIMENT_VARIANTS.forEach((variant, j) => {
      const title = `${family} ${variant}`
      const slug = slugify(`${subject}-${family}-${variant}-${i}-${j}`)
      entries.push({
        id: `experiment-${subject}-${i + 1}-${j + 1}`,
        slug,
        title,
        subject,
        classRange: rangeFromIndex(i + j),
        chapterFamily: family,
        objective: `Help the learner understand ${family.toLowerCase()} through a structured ${variant.toLowerCase()} with observation, comparison and explanation-ready output.`,
        materials: [
          'Notebook or lab sheet',
          subject === 'science' ? 'Measurement tools or safe classroom apparatus' : 'Printed worksheet or data sheet',
          'Pencil, ruler and labelled observation table',
          subject === 'commerce' ? 'Sample business dataset or ledger format' : 'Calculator or simple counting support',
        ],
        steps: [
          `Read the target concept from the ${family} chapter first.`,
          `Set up the ${variant.toLowerCase()} using the listed materials in a safe and organised format.`,
          `Record at least three observations or values before drawing a conclusion.`,
          `Compare the result with the expected chapter rule, formula or reaction pattern.`,
          `Write the final explanation in clear exam-style language for later revision.`,
        ],
        observations: [
          `Observation 1: Basic pattern in ${family.toLowerCase()} can be seen after the first controlled step.`,
          `Observation 2: Repeating the setup helps verify whether the result stays consistent.`,
          `Observation 3: A labelled table or diagram makes the conclusion easier to explain to global learners.`,
        ],
        conclusion: `This ${variant.toLowerCase()} strengthens chapter understanding for ${family}. It is designed to support explanation, comparison, formula connection and later AI-assisted doubt solving.`,
        safety: [
          'Use teacher guidance for all school-lab tools.',
          'Avoid unsafe chemicals, open flames or sharp tools without supervision.',
          'Record values carefully so the result page stays reliable.',
        ],
        image: MEDIA.experimentImage,
        diagram: subject === 'science' ? MEDIA.scienceDiagram : media.diagram,
        gif: MEDIA.experimentGif,
        webp: MEDIA.experimentImage,
        videoLink: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${family} ${variant} classroom experiment`)}`,
      })
    })
  })

  return entries
}

export const FORMULA_BANK: FormulaBankEntry[] = [
  ...buildFormulaEntries('mathematics', MATH_FAMILIES),
  ...buildFormulaEntries('science', SCIENCE_FAMILIES),
  ...buildFormulaEntries('commerce', COMMERCE_FAMILIES),
]

export const EXPERIMENT_BANK: ExperimentBankEntry[] = [
  ...buildExperimentEntries('mathematics', MATH_FAMILIES),
  ...buildExperimentEntries('science', SCIENCE_FAMILIES),
  ...buildExperimentEntries('commerce', COMMERCE_FAMILIES),
]

export function getFormulaBankStats() {
  return {
    total: FORMULA_BANK.length,
    mathematics: FORMULA_BANK.filter((entry) => entry.subject === 'mathematics').length,
    science: FORMULA_BANK.filter((entry) => entry.subject === 'science').length,
    commerce: FORMULA_BANK.filter((entry) => entry.subject === 'commerce').length,
  }
}

export function getExperimentBankStats() {
  return {
    total: EXPERIMENT_BANK.length,
    mathematics: EXPERIMENT_BANK.filter((entry) => entry.subject === 'mathematics').length,
    science: EXPERIMENT_BANK.filter((entry) => entry.subject === 'science').length,
    commerce: EXPERIMENT_BANK.filter((entry) => entry.subject === 'commerce').length,
  }
}

export function getFormulaEntry(slug: string) {
  return FORMULA_BANK.find((entry) => entry.slug === slug) ?? null
}

export function getExperimentEntry(slug: string) {
  return EXPERIMENT_BANK.find((entry) => entry.slug === slug) ?? null
}
