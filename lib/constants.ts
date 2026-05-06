// ─── SITE CONFIG ──────────────────────────────────────
export const SITE = {
  name:        'MscTutor',
  domain:      'msctutor.in',
  url:         process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.in',
  description: 'Free AI-powered education platform for Class 1–12. Math, Science, Commerce with step-by-step solutions.',
  keywords:    'NCERT solutions, CBSE, ICSE, mock test, free education, AI tutor, class 9, class 10, class 12',
  ogImage:     '/og-image.png',
  youtube:     process.env.NEXT_PUBLIC_YOUTUBE_URL  ?? 'https://youtube.com/@msctutor',
  twitter:     process.env.NEXT_PUBLIC_TWITTER_URL  ?? 'https://x.com/msctutor',
  telegram:    process.env.NEXT_PUBLIC_TELEGRAM_URL ?? 'https://t.me/msctutor',
  playStore:   process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? '#',
}

// ─── CREDIT COSTS ─────────────────────────────────────
export const CREDITS = {
  TEXT_QUESTION:  1,
  IMAGE_QUESTION: 2,
  VOICE_QUESTION: 2,
  PDF_QUESTION:   3,
  EXAM_GENERATE:  5,
  TRANSLATE:      1,
}

// ─── CREDIT PLANS ─────────────────────────────────────
export const PLANS = {
  free:    { credits: 5,    period: 'day',   price: 0    },
  starter: { credits: 100,  period: 'month', price: 49   },
  basic:   { credits: 300,  period: 'month', price: 99   },
  pro:     { credits: 1500, period: 'month', price: 299  },
}

// ─── SCHOOL STORAGE PLANS ─────────────────────────────
export const SCHOOL_STORAGE = {
  free:   { storageGB: 1,   pdfsPerMonth: 10,  price: 0    },
  basic:  { storageGB: 20,  pdfsPerMonth: 200, price: 999  },
  pro:    { storageGB: 100, pdfsPerMonth: -1,  price: 2999 },
  elite:  { storageGB: 500, pdfsPerMonth: -1,  price: 7999 },
}

// ─── BOARDS ───────────────────────────────────────────
export const BOARDS = [
  'CBSE', 'ICSE', 'UP Board', 'MP Board',
  'Maharashtra Board', 'Bihar Board',
  'Rajasthan Board', 'NCERT',
]

// ─── CLASSES ──────────────────────────────────────────
export const CLASSES = ['1','2','3','4','5','6','7','8','9','10','11','12']

// ─── SUBJECTS ─────────────────────────────────────────
export const SUBJECTS = [
  { name: 'Mathematics', slug: 'mathematics', icon: '➕', color: '#1a3a6b', branch: 'math' },
  { name: 'Physics',     slug: 'physics',     icon: '🔬', color: '#0369a1', branch: 'science' },
  { name: 'Chemistry',   slug: 'chemistry',   icon: '🧪', color: '#7c3aed', branch: 'science' },
  { name: 'Biology',     slug: 'biology',     icon: '🧬', color: '#0a5e3f', branch: 'science' },
  { name: 'Science',     slug: 'science',     icon: '⚗️', color: '#0a5e3f', branch: 'science' },
  { name: 'Commerce',    slug: 'commerce',    icon: '📊', color: '#7c3400', branch: 'commerce' },
  { name: 'Economics',   slug: 'economics',   icon: '💹', color: '#92400e', branch: 'commerce' },
  { name: 'Accountancy', slug: 'accountancy', icon: '📒', color: '#7c3400', branch: 'commerce' },
  { name: 'History',     slug: 'history',     icon: '📜', color: '#78350f', branch: 'humanities' },
  { name: 'Geography',   slug: 'geography',   icon: '🌍', color: '#065f46', branch: 'humanities' },
  { name: 'Computer Science', slug: 'computer-science', icon: '🖥️', color: '#0369a1', branch: 'tech' },
  { name: 'English',     slug: 'english',     icon: '🇬🇧', color: '#1e3a5f', branch: 'language' },
  { name: 'Hindi',       slug: 'hindi',       icon: '🇮🇳', color: '#dc2626', branch: 'language' },
]

// ─── LANGUAGES ────────────────────────────────────────
export const LANGUAGES = [
  { code: 'en', name: 'English',    nativeName: 'English'     },
  { code: 'hi', name: 'Hindi',      nativeName: 'हिंदी'       },
  { code: 'bn', name: 'Bengali',    nativeName: 'বাংলা'       },
  { code: 'te', name: 'Telugu',     nativeName: 'తెలుగు'      },
  { code: 'mr', name: 'Marathi',    nativeName: 'मराठी'       },
  { code: 'ta', name: 'Tamil',      nativeName: 'தமிழ்'       },
  { code: 'gu', name: 'Gujarati',   nativeName: 'ગુજરાતી'     },
  { code: 'kn', name: 'Kannada',    nativeName: 'ಕನ್ನಡ'       },
  { code: 'ml', name: 'Malayalam',  nativeName: 'മലയാളം'      },
  { code: 'pa', name: 'Punjabi',    nativeName: 'ਪੰਜਾਬੀ'      },
  { code: 'ur', name: 'Urdu',       nativeName: 'اردو'        },
  { code: 'ar', name: 'Arabic',     nativeName: 'عربية'       },
  { code: 'fr', name: 'French',     nativeName: 'Français'    },
  { code: 'es', name: 'Spanish',    nativeName: 'Español'     },
  { code: 'de', name: 'German',     nativeName: 'Deutsch'     },
  { code: 'zh', name: 'Chinese',    nativeName: '中文'         },
  { code: 'ja', name: 'Japanese',   nativeName: '日本語'       },
  { code: 'ru', name: 'Russian',    nativeName: 'Русский'     },
  { code: 'ko', name: 'Korean',     nativeName: '한국어'       },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português'   },
]

// ─── NAV MENU DATA ────────────────────────────────────
export const NAV_MATH_CHAPTERS = {
  class9_10: [
    { title: 'Number System',          slug: 'number-system',        badge: 'Ch 1' },
    { title: 'Polynomials',            slug: 'polynomials',           badge: 'Ch 2' },
    { title: 'Coordinate Geometry',    slug: 'coordinate-geometry',   badge: 'Ch 3' },
    { title: 'Linear Equations',       slug: 'linear-equations',      badge: 'Ch 4' },
    { title: 'Triangles',              slug: 'triangles',             badge: 'Ch 7' },
    { title: 'Quadratic Equations',    slug: 'quadratic-equations',   badge: 'Cl.10', isNew: true },
    { title: 'Arithmetic Progressions',slug: 'arithmetic-progressions',badge: 'Ch 5' },
    { title: 'Trigonometry',           slug: 'trigonometry',          badge: 'Ch 8' },
    { title: 'Statistics',             slug: 'statistics',            badge: 'Ch 14' },
  ],
  class11_12: [
    { title: 'Sets & Functions',  slug: 'sets-and-functions',  badge: 'Ch 1'  },
    { title: 'Complex Numbers',   slug: 'complex-numbers',     badge: 'Ch 5'  },
    { title: 'Conic Sections',    slug: 'conic-sections',      badge: 'Ch 11' },
    { title: 'Limits & Derivatives', slug: 'limits-derivatives', badge: 'Ch 13' },
    { title: 'Integration',       slug: 'integration',         badge: 'Cl.12', isNew: true },
    { title: 'Matrices',          slug: 'matrices',            badge: 'Cl.12', isNew: true },
    { title: 'Probability',       slug: 'probability',         badge: 'Ch 15' },
  ],
}

export const NAV_SCIENCE_CHAPTERS = {
  physics: [
    { title: 'Motion',            slug: 'motion',           badge: 'Ch 1' },
    { title: "Newton's Laws",     slug: 'newtons-laws',     badge: 'Ch 9' },
    { title: 'Gravitation',       slug: 'gravitation',      badge: 'Ch 10' },
    { title: 'Work & Energy',     slug: 'work-energy',      badge: 'Ch 11' },
    { title: 'Light — Reflection',slug: 'light-reflection', badge: 'Ch 10' },
    { title: 'Electricity',       slug: 'electricity',      badge: 'Ch 12' },
  ],
  chemistry: [
    { title: 'Matter Around Us',    slug: 'matter',          badge: 'Ch 1' },
    { title: 'Atoms & Molecules',   slug: 'atoms-molecules', badge: 'Ch 3' },
    { title: 'Periodic Table',      slug: 'periodic-table',  badge: 'Ch 5' },
    { title: 'Chemical Reactions',  slug: 'chemical-reactions', badge: 'Ch 1' },
    { title: 'Carbon Compounds',    slug: 'carbon-compounds',badge: 'Ch 4' },
  ],
  biology: [
    { title: 'The Cell',            slug: 'cell',            badge: 'Ch 5' },
    { title: 'Photosynthesis',      slug: 'photosynthesis',  badge: 'Ch 7' },
    { title: 'Heredity & DNA',      slug: 'heredity-dna',    badge: 'Ch 9' },
    { title: 'Reproduction',        slug: 'reproduction',    badge: 'Ch 8' },
  ],
}

export const NAV_COMMERCE_CHAPTERS = {
  accountancy: [
    { title: 'Basic Accounting',   slug: 'basic-accounting',  badge: 'Ch 1' },
    { title: 'Journal Entries',    slug: 'journal-entries',   badge: 'Ch 3' },
    { title: 'Ledger Accounts',    slug: 'ledger-accounts',   badge: 'Ch 4' },
    { title: 'Trial Balance',      slug: 'trial-balance',     badge: 'Ch 6' },
    { title: 'Balance Sheet',      slug: 'balance-sheet',     badge: 'Ch 9' },
    { title: 'Partnership Accounts', slug: 'partnership',     badge: 'Cl.12', isNew: true },
  ],
  economics: [
    { title: 'Demand & Supply',    slug: 'demand-supply',     badge: 'Ch 2' },
    { title: 'Market Structures',  slug: 'market-structures', badge: 'Ch 6' },
    { title: 'National Income',    slug: 'national-income',   badge: 'Ch 2' },
    { title: 'Money & Banking',    slug: 'money-banking',     badge: 'Ch 3' },
    { title: 'GST & Taxation',     slug: 'gst-taxation',      badge: 'Practical', isNew: true },
  ],
  business: [
    { title: 'Nature of Business', slug: 'nature-business',   badge: 'Ch 1' },
    { title: 'Forms of Business',  slug: 'forms-business',    badge: 'Ch 2' },
    { title: 'Marketing',          slug: 'marketing',         badge: 'Ch 11' },
    { title: 'Consumer Protection',slug: 'consumer-protection',badge: 'Ch 12' },
  ],
}
