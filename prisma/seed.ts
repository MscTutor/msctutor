// prisma/seed.ts — Seed initial data for MscTutor

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding MscTutor database...')

  // ── SUBJECTS ──────────────────────────────────────────
  const subjects = [
    { name: 'Mathematics',     slug: 'mathematics',     icon: '➕', color: '#1a3a6b', branch: 'math',       order: 1, description: 'Algebra, Calculus, Geometry, Trigonometry and more' },
    { name: 'Physics',         slug: 'physics',         icon: '🔬', color: '#0369a1', branch: 'science',    order: 2, description: 'Mechanics, Thermodynamics, Optics, Modern Physics' },
    { name: 'Chemistry',       slug: 'chemistry',       icon: '🧪', color: '#7c3aed', branch: 'science',    order: 3, description: 'Organic, Inorganic, Physical Chemistry' },
    { name: 'Biology',         slug: 'biology',         icon: '🧬', color: '#0a5e3f', branch: 'science',    order: 4, description: 'Botany, Zoology, Human Biology, Genetics' },
    { name: 'Science',         slug: 'science',         icon: '⚗️', color: '#0369a1', branch: 'science',    order: 5, description: 'Physics, Chemistry, Biology for Class 6-10' },
    { name: 'Commerce',        slug: 'commerce',        icon: '📊', color: '#7c3400', branch: 'commerce',   order: 6, description: 'Accountancy, Business Studies, Economics' },
    { name: 'Economics',       slug: 'economics',       icon: '💹', color: '#065f46', branch: 'commerce',   order: 7, description: 'Micro and Macro Economics, Statistics' },
    { name: 'Accountancy',     slug: 'accountancy',     icon: '📒', color: '#7c3400', branch: 'commerce',   order: 8, description: 'Financial Accounting, Partnership, Company Accounts' },
    { name: 'Business Studies',slug: 'business-studies',icon: '💼', color: '#7c3400', branch: 'commerce',   order: 9, description: 'Management, Marketing, Finance, Trade' },
    { name: 'History',         slug: 'history',         icon: '📜', color: '#78350f', branch: 'humanities', order: 10, description: 'Ancient, Medieval and Modern Indian History; World History' },
    { name: 'Geography',       slug: 'geography',       icon: '🗺️', color: '#065f46', branch: 'humanities', order: 11, description: 'Physical, Human and Economic Geography' },
    { name: 'Political Science',slug: 'political-science',icon:'🏛️',color: '#1e3a5f', branch: 'humanities', order: 12, description: 'Political Theory, Governance, Democracy, International Relations' },
    { name: 'Social Science',  slug: 'social-science',  icon: '🌍', color: '#065f46', branch: 'humanities', order: 13, description: 'History, Geography, Civics for Class 6-10' },
    { name: 'Computer Science',slug: 'computer-science',icon: '🖥️', color: '#0369a1', branch: 'tech',       order: 14, description: 'Programming, Data Structures, Networking, AI & ML' },
    { name: 'English',         slug: 'english',         icon: '📝', color: '#1e3a5f', branch: 'language',   order: 15, description: 'Literature, Grammar, Writing and Reading Comprehension' },
    { name: 'Hindi',           slug: 'hindi',           icon: '🇮🇳', color: '#dc2626', branch: 'language',   order: 16, description: 'हिंदी साहित्य, व्याकरण, गद्य और पद्य' },
    { name: 'Sanskrit',        slug: 'sanskrit',        icon: '🕉️', color: '#92400e', branch: 'language',   order: 17, description: 'Sanskrit Grammar, Literature and Shlokas' },
    { name: 'EVS',             slug: 'evs',             icon: '🌿', color: '#065f46', branch: 'science',    order: 18, description: 'Environmental Studies for Class 1-5' },
    { name: 'Sociology',       slug: 'sociology',       icon: '👥', color: '#4a1942', branch: 'humanities', order: 19, description: 'Society, Culture, Social Institutions and Change' },
  ]

  console.log('Adding subjects...')
  for (const s of subjects) {
    await prisma.subject.upsert({
      where:  { slug: s.slug },
      update: { name: s.name, icon: s.icon, color: s.color, description: s.description },
      create: { ...s, isActive: true },
    })
  }
  console.log(`✅ ${subjects.length} subjects added`)

  // ── SAMPLE QUESTIONS (for SEO pages) ──────────────────
  const sampleQuestions = [
    {
      slug:       'what-is-newtons-second-law-of-motion',
      title:      "What is Newton's Second Law of Motion?",
      solution:   "Newton's Second Law of Motion states that the net force acting on an object is equal to the rate of change of its momentum. Mathematically: F = ma, where F is the net force (in Newtons), m is the mass of the object (in kg), and a is the acceleration (in m/s²).\n\nKey points:\n1. Force and acceleration are directly proportional\n2. Mass and acceleration are inversely proportional\n3. The direction of force equals the direction of acceleration\n\nExample: A 5 kg ball is pushed with 20 N force. Acceleration = F/m = 20/5 = 4 m/s²\n\nNCERT Reference: Class 9 Science, Chapter 9 — Force and Laws of Motion",
      formula:    'F = ma',
      classLevel: '9',
      board:      'CBSE',
      difficulty: 'medium',
      source:     'admin',
      isPublic:   true,
      isApproved: true,
      metaTitle:  "Newton's Second Law of Motion — F=ma — Class 9 NCERT | MscTutor",
      metaDesc:   "Newton's Second Law: F = ma. Complete explanation with formula, examples and NCERT reference for Class 9 Science.",
    },
    {
      slug:       'quadratic-formula-derivation-and-examples',
      title:      'What is the Quadratic Formula? How to use it?',
      solution:   "The Quadratic Formula is used to find the roots of a quadratic equation of the form ax² + bx + c = 0.\n\nFormula: x = [-b ± √(b² - 4ac)] / 2a\n\nWhere:\n• a, b, c are coefficients (a ≠ 0)\n• b² - 4ac is called the Discriminant (D)\n\nNature of roots (based on Discriminant):\n• D > 0: Two distinct real roots\n• D = 0: Two equal real roots\n• D < 0: No real roots (complex roots)\n\nExample: Solve 2x² - 7x + 3 = 0\na=2, b=-7, c=3\nD = (-7)² - 4(2)(3) = 49 - 24 = 25\nx = [7 ± √25] / 4 = [7 ± 5] / 4\nx = 3 or x = ½\n\nNCERT Reference: Class 10 Maths, Chapter 4",
      formula:    'x = (-b ± √(b²-4ac)) / 2a',
      classLevel: '10',
      board:      'CBSE',
      difficulty: 'medium',
      source:     'admin',
      isPublic:   true,
      isApproved: true,
      metaTitle:  'Quadratic Formula — Derivation and Examples — Class 10 | MscTutor',
      metaDesc:   'Quadratic formula x = (-b ± √D)/2a explained with discriminant, nature of roots and solved examples for Class 10 CBSE.',
    },
    {
      slug:       'what-is-photosynthesis-process-and-equation',
      title:      'What is Photosynthesis? Write the chemical equation.',
      solution:   "Photosynthesis is the process by which green plants, algae and some bacteria convert light energy (sunlight) into chemical energy (glucose) using carbon dioxide and water.\n\nChemical Equation:\n6CO₂ + 6H₂O + Light energy → C₆H₁₂O₆ + 6O₂\n\nConditions required:\n1. Sunlight (light energy)\n2. Chlorophyll (green pigment in chloroplasts)\n3. Carbon dioxide (from air through stomata)\n4. Water (from soil through roots)\n\nProducts:\n• Glucose (C₆H₁₂O₆) — food/energy for the plant\n• Oxygen (O₂) — released into the atmosphere\n\nStages of Photosynthesis:\n1. Light reactions (in thylakoids): Water is split, ATP and NADPH formed, O₂ released\n2. Calvin cycle/Dark reactions (in stroma): CO₂ fixed using ATP and NADPH to form glucose\n\nImportance:\n• Produces oxygen for all living beings\n• Base of all food chains\n• Removes CO₂ (reduces greenhouse effect)\n\nNCERT Reference: Class 10 Science, Chapter 6; Class 11 Biology, Chapter 13",
      formula:    '6CO₂ + 6H₂O + hν → C₆H₁₂O₆ + 6O₂',
      classLevel: '10',
      board:      'CBSE',
      difficulty: 'easy',
      source:     'admin',
      isPublic:   true,
      isApproved: true,
      metaTitle:  'Photosynthesis — Process, Equation, Stages | MscTutor',
      metaDesc:   'Photosynthesis: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. Complete explanation with light and dark reactions for Class 10.',
    },
    {
      slug:       'ohms-law-statement-formula-and-verification',
      title:      "State Ohm's Law. Write its formula and conditions.",
      solution:   "Ohm's Law: The electric current (I) flowing through a conductor is directly proportional to the potential difference (V) across it, provided the temperature and other physical conditions remain constant.\n\nMathematically: V = IR\n• V = Potential Difference (Volts)\n• I = Current (Amperes)\n• R = Resistance (Ohms Ω)\n\nThis means:\n• V ∝ I (at constant R and temperature)\n• The graph of V vs I is a straight line passing through the origin\n\nConditions for Ohm's Law to hold:\n1. Temperature must remain constant\n2. The nature of the conductor must not change\n3. Physical conditions (pressure, mechanical strain) must be constant\n\nOhmic vs Non-Ohmic Conductors:\n• Ohmic: Copper wire, resistance wire (V-I graph is linear)\n• Non-Ohmic: Diode, LED, transistor (V-I graph is non-linear)\n\nPower Formula (derived from Ohm's Law):\nP = VI = I²R = V²/R\n\nNCERT Reference: Class 10 Science, Chapter 12 — Electricity",
      formula:    'V = IR, P = I²R',
      classLevel: '10',
      board:      'CBSE',
      difficulty: 'easy',
      source:     'admin',
      isPublic:   true,
      isApproved: true,
      metaTitle:  "Ohm's Law — V=IR — Statement, Formula, Verification | MscTutor",
      metaDesc:   "Ohm's Law: V = IR. Complete explanation with statement, formula derivation, V-I graph and conditions for Class 10 CBSE.",
    },
    {
      slug:       'heron-formula-area-of-triangle-class-9',
      title:      "What is Heron's Formula? Find area of triangle with sides 7, 8, 9 cm.",
      solution:   "Heron's Formula is used to calculate the area of a triangle when all three sides are known (without knowing the height).\n\nFormula:\nStep 1: Calculate semi-perimeter s = (a + b + c) / 2\nStep 2: Area = √[s(s-a)(s-b)(s-c)]\n\nExample: Triangle with sides a = 7 cm, b = 8 cm, c = 9 cm\n\nStep 1: s = (7 + 8 + 9) / 2 = 24/2 = 12 cm\n\nStep 2: Area = √[12(12-7)(12-8)(12-9)]\n= √[12 × 5 × 4 × 3]\n= √720\n= 12√5\n≈ 26.83 cm²\n\nWhen to use Heron's Formula:\n• When height (altitude) is not given\n• When all three sides are known\n• For scalene triangles where normal formula is difficult\n\nNCERT Reference: Class 9 Maths, Chapter 12 — Heron's Formula",
      formula:    'A = √[s(s-a)(s-b)(s-c)], s = (a+b+c)/2',
      classLevel: '9',
      board:      'CBSE',
      difficulty: 'medium',
      source:     'admin',
      isPublic:   true,
      isApproved: true,
      metaTitle:  "Heron's Formula — Area of Triangle — Class 9 NCERT | MscTutor",
      metaDesc:   "Heron's Formula: A = √s(s-a)(s-b)(s-c). Solved example with triangle sides 7, 8, 9 cm. NCERT Class 9 Maths.",
    },
  ]

  console.log('Adding sample questions...')
  for (const q of sampleQuestions) {
    await prisma.question.upsert({
      where:  { slug: q.slug },
      update: { views: { increment: 0 } },
      create: {
        ...q,
        schemaJson: JSON.stringify({
          '@context': 'https://schema.org',
          '@type':    'QAPage',
          mainEntity: {
            '@type': 'Question',
            name:    q.title,
            acceptedAnswer: { '@type': 'Answer', text: q.solution.slice(0, 500) },
          },
        }),
      },
    })
  }
  console.log(`✅ ${sampleQuestions.length} sample questions added`)

  console.log('\n🎉 Seed complete! Your MscTutor database is ready.')
  console.log('Next: npm run dev → visit http://localhost:3000')
}

main()
  .catch(e => { console.error('❌ Seed failed:', e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
