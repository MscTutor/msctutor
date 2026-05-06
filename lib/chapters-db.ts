// lib/chapters-db.ts
// 500+ Chapters with Formulas, Experiments, YouTube Video Links, Images
// All content is FREE / Open Source / NCERT aligned

export interface Formula {
  name: string
  latex: string
  description: string
  example?: string
}

export interface Experiment {
  title: string
  objective: string
  materials: string[]
  procedure: string[]
  observation: string
  result: string
  precautions?: string[]
}

export interface VideoResource {
  title: string
  url: string          // YouTube embed URL
  duration?: string
  source: string       // 'khan-academy' | 'ncert' | 'youtube-edu'
}

export interface ImageResource {
  url: string          // Wikimedia Commons or open-source URL
  alt: string
  attribution: string
  license: string      // 'CC0' | 'CC-BY' | 'public-domain'
}

export interface ChapterContent {
  id: string
  title: string
  class: string
  subject: string
  subjectSlug: string
  description: string
  concepts: { title: string; content: string; image?: ImageResource }[]
  formulas: Formula[]
  experiments: Experiment[]
  videos: VideoResource[]
  keyTerms: string[]
  quickFacts: string[]
  vedicMath?: { technique: string; example: string; shortcut: string }[]
}

// ─────────────────────────────────────────────────────────
// MATHEMATICS CHAPTERS
// ─────────────────────────────────────────────────────────

export const MATH_CHAPTERS: ChapterContent[] = [

  // ── CLASS 6 ──────────────────────────────────────────
  {
    id: 'c6-math-1', title: 'Knowing Our Numbers', class: '6', subject: 'Mathematics', subjectSlug: 'mathematics',
    description: 'Understanding large numbers, Indian and International number systems, estimation and Roman numerals.',
    concepts: [
      { title: 'Indian Number System', content: 'In the Indian system, we use ones, tens, hundreds, thousands, ten-thousands, lakhs, ten-lakhs, crores. Example: 1,23,45,678 is read as twelve crore thirty-four lakh fifty-six thousand seven hundred and seventy-eight.' },
      { title: 'International Number System', content: 'Groups of three digits: ones, thousands, millions, billions. Example: 123,456,789 = one hundred twenty-three million, four hundred fifty-six thousand, seven hundred eighty-nine.' },
      { title: 'Estimation', content: 'Rounding to nearest 10, 100, 1000. If digit is ≥5, round up; if <5, round down. Useful for quick mental calculations and approximations.' },
      { title: 'Roman Numerals', content: 'I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Rule: smaller symbol before larger = subtract. Example: IV=4, IX=9, XL=40, XC=90.' },
    ],
    formulas: [
      { name: 'Place Value', latex: '\\text{Place Value} = \\text{Face Value} \\times \\text{Position value}', description: 'Value of a digit based on its position', example: 'In 5432, place value of 4 = 4 × 100 = 400' },
      { name: 'Estimation (Nearest 10)', latex: '\\text{Round to nearest 10 based on units digit}', description: 'Units ≥ 5: add 10 to tens, units become 0', example: '67 → 70, 54 → 50' },
    ],
    experiments: [],
    videos: [
      { title: 'Knowing Our Numbers - Class 6', url: 'https://www.youtube.com/embed/FqNMQQnbHa0', duration: '12 min', source: 'youtube-edu' },
      { title: 'Indian vs International Number System', url: 'https://www.youtube.com/embed/5MkleW5-LBU', duration: '8 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Place value', 'Face value', 'Indian system', 'International system', 'Estimation', 'Roman numerals'],
    quickFacts: ['India uses 2-digit grouping after thousands', '1 crore = 10 million', 'Largest 5-digit number = 99,999', 'Roman numerals were used by Romans 2000+ years ago'],
  },

  {
    id: 'c6-math-2', title: 'Whole Numbers', class: '6', subject: 'Mathematics', subjectSlug: 'mathematics',
    description: 'Properties of whole numbers, number line, and operations on whole numbers.',
    concepts: [
      { title: 'Natural vs Whole Numbers', content: 'Natural numbers start from 1 (1,2,3...). Whole numbers include 0 (0,1,2,3...). The only difference is 0 — whole numbers include zero while natural numbers do not.' },
      { title: 'Properties of Whole Numbers', content: 'Closure: a+b and a×b are whole numbers. Commutative: a+b=b+a, a×b=b×a. Associative: (a+b)+c=a+(b+c). Distributive: a×(b+c)=a×b+a×c. Identity: a+0=a, a×1=a.' },
      { title: 'Number Line', content: 'A straight line with numbers marked at equal intervals. Moving right = adding, moving left = subtracting. Helps visualize operations and order of numbers.' },
    ],
    formulas: [
      { name: 'Commutative Law', latex: 'a + b = b + a,\\quad a \\times b = b \\times a', description: 'Order does not matter in addition and multiplication', example: '3+5=5+3=8, 4×6=6×4=24' },
      { name: 'Distributive Law', latex: 'a \\times (b + c) = a \\times b + a \\times c', description: 'Multiplication distributes over addition', example: '5×(3+4) = 5×3 + 5×4 = 15+20 = 35' },
      { name: 'Associative Law', latex: '(a + b) + c = a + (b + c)', description: 'Grouping does not matter', example: '(2+3)+4 = 2+(3+4) = 9' },
    ],
    experiments: [],
    videos: [
      { title: 'Whole Numbers on Number Line', url: 'https://www.youtube.com/embed/sMImpw-2ZwQ', duration: '10 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Whole numbers', 'Natural numbers', 'Number line', 'Closure', 'Commutative', 'Associative', 'Distributive'],
    quickFacts: ['0 is the smallest whole number', 'There is no largest whole number', 'Whole numbers are infinite'],
    vedicMath: [
      { technique: 'Fast Multiplication by 11', example: '35 × 11 = 3_(3+5)_5 = 385', shortcut: 'Add adjacent digits and place in middle' },
    ],
  },

  {
    id: 'c9-math-8', title: 'Quadrilaterals', class: '9', subject: 'Mathematics', subjectSlug: 'mathematics',
    description: 'Properties of parallelogram, rectangle, rhombus, square, and the mid-point theorem.',
    concepts: [
      { title: 'Parallelogram Properties', content: 'In a parallelogram: opposite sides are equal and parallel, opposite angles are equal, diagonals bisect each other, adjacent angles are supplementary (sum = 180°).' },
      { title: 'Special Parallelograms', content: 'Rectangle: all angles 90°, diagonals equal. Rhombus: all sides equal, diagonals perpendicular bisectors of each other. Square: all sides equal + all angles 90°, combines properties of both.' },
      { title: 'Mid-Point Theorem', content: 'The line segment joining midpoints of two sides of a triangle is parallel to the third side and half its length. Converse: A line through midpoint of one side, parallel to another side, bisects the third side.' },
    ],
    formulas: [
      { name: 'Area of Parallelogram', latex: 'A = b \\times h', description: 'base × height (perpendicular height)', example: 'Base 8 cm, height 5 cm → Area = 40 cm²' },
      { name: 'Diagonal of Rectangle', latex: 'd = \\sqrt{l^2 + b^2}', description: 'By Pythagoras theorem', example: 'l=3, b=4 → d=√(9+16)=√25=5' },
      { name: 'Mid-Point Theorem', latex: 'EF = \\frac{1}{2} BC,\\quad EF \\parallel BC', description: 'E,F are midpoints of AB and AC', example: 'If BC=10cm, then EF=5cm' },
    ],
    experiments: [],
    videos: [
      { title: 'Properties of Parallelogram', url: 'https://www.youtube.com/embed/a7XVBBgWAqA', duration: '15 min', source: 'youtube-edu' },
      { title: 'Mid-Point Theorem Proof', url: 'https://www.youtube.com/embed/8QVQR-mFuVk', duration: '12 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Parallelogram', 'Rectangle', 'Rhombus', 'Square', 'Diagonal', 'Mid-point theorem'],
    quickFacts: ['Square is a special rectangle AND rhombus', 'All rectangles are parallelograms', 'Diagonals of rhombus are perpendicular'],
    vedicMath: [
      { technique: 'Area of Square', example: '45² = (45+5)(45-5) + 5² = 50×40 + 25 = 2025', shortcut: 'Use (a+b)(a-b) identity for squares near multiples of 10' },
    ],
  },

  // ── CLASS 10 MATHS ────────────────────────────────────
  {
    id: 'c10-math-1', title: 'Real Numbers', class: '10', subject: 'Mathematics', subjectSlug: 'mathematics',
    description: "Euclid's division algorithm, Fundamental Theorem of Arithmetic, irrational numbers, decimal expansions.",
    concepts: [
      { title: "Euclid's Division Algorithm", content: 'For any two positive integers a and b, there exist unique integers q (quotient) and r (remainder) such that a = bq + r, where 0 ≤ r < b. Used to find HCF of large numbers efficiently.' },
      { title: 'Fundamental Theorem of Arithmetic', content: 'Every composite number can be expressed as a product of primes in a unique way (ignoring order). Example: 12 = 2² × 3. This is the basis of prime factorization.' },
      { title: 'Irrational Numbers', content: 'Numbers that cannot be written as p/q (where p,q are integers, q≠0). Their decimal expansion is non-terminating and non-repeating. Examples: √2, √3, π, e.' },
      { title: 'Decimal Expansion', content: 'Rational numbers have terminating or repeating decimal expansion. Denominator in lowest form has only 2s and 5s as prime factors → terminating. Otherwise → repeating.' },
    ],
    formulas: [
      { name: "Euclid's Division Lemma", latex: 'a = bq + r,\\quad 0 \\leq r < b', description: 'Foundation of division algorithm', example: '57 = 4×13 + 5 (so HCF working: 57,13)' },
      { name: 'HCF × LCM', latex: '\\text{HCF}(a,b) \\times \\text{LCM}(a,b) = a \\times b', description: 'Product of HCF and LCM equals product of numbers', example: 'HCF(4,6)=2, LCM=12, 2×12=24=4×6 ✓' },
      { name: 'Terminating Decimal', latex: '\\frac{p}{q} \\text{ terminates if } q = 2^m \\times 5^n', description: 'Condition for terminating decimal', example: '7/8 = 7/2³ → terminates = 0.875' },
    ],
    experiments: [],
    videos: [
      { title: 'Euclid Division Algorithm - Class 10', url: 'https://www.youtube.com/embed/AJn843kplDw', duration: '18 min', source: 'youtube-edu' },
      { title: 'Irrational Numbers Proof - √2', url: 'https://www.youtube.com/embed/xKiKiEFGFSE', duration: '10 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Euclid algorithm', 'HCF', 'LCM', 'Prime factorization', 'Irrational', 'Terminating decimal'],
    quickFacts: ['√2 was first proved irrational by Hippasus (Greek)', 'π has been calculated to 100 trillion digits', 'Every integer is a rational number'],
    vedicMath: [
      { technique: 'Divisibility by 9', example: '783: 7+8+3=18, 1+8=9 → divisible by 9', shortcut: 'Sum of digits divisible by 9 → number divisible by 9' },
    ],
  },

  {
    id: 'c10-math-4', title: 'Quadratic Equations', class: '10', subject: 'Mathematics', subjectSlug: 'mathematics',
    description: 'Solving quadratic equations by factorisation, completing the square and quadratic formula. Nature of roots using discriminant.',
    concepts: [
      { title: 'Standard Form', content: 'A quadratic equation has the form ax² + bx + c = 0, where a ≠ 0, and a, b, c are real numbers. The highest power of the variable is 2.' },
      { title: 'Methods of Solution', content: '1) Factorisation: Split middle term. 2) Completing the square: Convert to (x+p)²=q form. 3) Quadratic formula: x = (-b ± √D)/2a. Choose the easiest method for each problem.' },
      { title: 'Discriminant and Nature of Roots', content: 'D = b² - 4ac. If D > 0: two distinct real roots. If D = 0: two equal real roots (one repeated root). If D < 0: no real roots (roots are complex/imaginary).' },
      { title: 'Relationship Between Roots', content: 'If α and β are roots: Sum of roots α+β = -b/a. Product of roots αβ = c/a. These help verify solutions and form new equations.' },
    ],
    formulas: [
      { name: 'Quadratic Formula', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}', description: 'Universal formula to find roots', example: 'x²-5x+6=0: x=(5±√1)/2 → x=3 or x=2' },
      { name: 'Discriminant', latex: 'D = b^2 - 4ac', description: 'Determines nature of roots', example: 'x²+2x+1=0: D=4-4=0 → equal roots' },
      { name: 'Sum and Product of Roots', latex: '\\alpha + \\beta = -\\frac{b}{a},\\quad \\alpha\\beta = \\frac{c}{a}', description: 'Vieta\'s formulas', example: 'x²-5x+6: sum=5, product=6 → roots 2,3' },
      { name: 'Form Equation from Roots', latex: 'x^2 - (\\alpha+\\beta)x + \\alpha\\beta = 0', description: 'Build quadratic from known roots', example: 'Roots 3,4: x²-7x+12=0' },
    ],
    experiments: [],
    videos: [
      { title: 'Quadratic Equations - All Methods', url: 'https://www.youtube.com/embed/i7idZfS8t8w', duration: '25 min', source: 'youtube-edu' },
      { title: 'Quadratic Formula Derivation', url: 'https://www.youtube.com/embed/9ubP4MhFTxI', duration: '12 min', source: 'youtube-edu' },
      { title: 'Nature of Roots - Discriminant', url: 'https://www.youtube.com/embed/r3SEkdtpobo', duration: '15 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Quadratic', 'Discriminant', 'Roots', 'Factorisation', 'Completing square', 'Vieta\'s formulas'],
    quickFacts: ['The word "quadratic" comes from Latin "quadratus" meaning square', 'Babylonians solved quadratic equations 4000 years ago', 'Quadratic formula was first published in 1629'],
    vedicMath: [
      { technique: 'Factorisation Shortcut', example: 'x²-7x+12: find two numbers with product 12 and sum 7 → 3,4. So (x-3)(x-4)=0', shortcut: 'For x²+bx+c, find p,q where p+q=b and p×q=c' },
    ],
  },

  // ── CLASS 11 MATHS ────────────────────────────────────
  {
    id: 'c11-math-13', title: 'Limits and Derivatives', class: '11', subject: 'Mathematics', subjectSlug: 'mathematics',
    description: 'Intuitive concept of limit, algebra of limits, limits of polynomials, derivatives from first principles.',
    concepts: [
      { title: 'Intuitive Concept of Limit', content: 'lim(x→a) f(x) = L means: as x gets closer and closer to a (but never equals a), f(x) gets closer and closer to L. We can approach from both left and right sides.' },
      { title: 'Algebra of Limits', content: 'Sum: lim(f+g) = lim f + lim g. Product: lim(fg) = lim f × lim g. Quotient: lim(f/g) = lim f / lim g (if lim g ≠ 0). These allow us to compute limits of complex functions.' },
      { title: 'Derivative from First Principles', content: "f'(x) = lim(h→0) [f(x+h) - f(x)]/h. This measures the instantaneous rate of change of f at x. Geometrically, it's the slope of the tangent to the curve at point (x, f(x))." },
      { title: 'Standard Derivatives', content: 'd/dx(xⁿ) = nxⁿ⁻¹ (Power rule). d/dx(sin x) = cos x. d/dx(cos x) = -sin x. d/dx(eˣ) = eˣ. d/dx(ln x) = 1/x. These are fundamental building blocks.' },
    ],
    formulas: [
      { name: 'Definition of Derivative', latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}", description: 'First principles definition', example: "For f(x)=x²: f'(x)=lim[(x+h)²-x²]/h=lim[2x+h]=2x" },
      { name: 'Power Rule', latex: '\\frac{d}{dx}(x^n) = nx^{n-1}', description: 'Derivative of power function', example: 'd/dx(x⁵) = 5x⁴' },
      { name: 'Standard Limit', latex: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1', description: 'Fundamental trigonometric limit', example: 'lim(x→0) sin(3x)/(3x) = 1' },
      { name: 'Product Rule', latex: '\\frac{d}{dx}(fg) = f\'g + fg\'', description: 'Derivative of product of two functions', example: 'd/dx(x²·sin x) = 2x·sin x + x²·cos x' },
    ],
    experiments: [],
    videos: [
      { title: 'Introduction to Limits', url: 'https://www.youtube.com/embed/riXcZT2ICjA', duration: '20 min', source: 'khan-academy' },
      { title: 'Derivatives from First Principles', url: 'https://www.youtube.com/embed/ay8838UZ4nM', duration: '18 min', source: 'youtube-edu' },
      { title: 'Power Rule Made Easy', url: 'https://www.youtube.com/embed/IvLpN1G1Ncg', duration: '15 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Limit', 'Continuity', 'Derivative', 'Tangent', 'First principles', 'Power rule', 'Rate of change'],
    quickFacts: ['Newton and Leibniz independently invented calculus in the 1660s-1680s', 'Limits were rigorously defined by Augustin-Louis Cauchy in 1821', 'Derivatives are used in physics, economics, engineering everywhere'],
  },

  // ── CLASS 12 MATHS ────────────────────────────────────
  {
    id: 'c12-math-7', title: 'Integrals', class: '12', subject: 'Mathematics', subjectSlug: 'mathematics',
    description: 'Integration as reverse of differentiation, methods of integration, definite integrals, fundamental theorem of calculus.',
    concepts: [
      { title: 'Integration as Anti-derivative', content: 'If d/dx F(x) = f(x), then ∫f(x)dx = F(x) + C, where C is the constant of integration. Integration "undoes" differentiation. Example: ∫2x dx = x² + C because d/dx(x²) = 2x.' },
      { title: 'Methods of Integration', content: '1) Direct formulas. 2) Substitution (u-substitution). 3) Integration by parts: ∫uv dx = u∫v dx - ∫(u\'·∫v dx) dx. 4) Partial fractions for rational functions. Choose based on form.' },
      { title: 'Definite Integral', content: '∫[a to b] f(x)dx = F(b) - F(a) where F is antiderivative of f. Represents the area under the curve y=f(x) from x=a to x=b above the x-axis.' },
      { title: 'Fundamental Theorem of Calculus', content: 'Part 1: If F(x) = ∫[a to x] f(t)dt, then F\'(x) = f(x). Part 2: ∫[a to b] f(x)dx = F(b) - F(a). Connects differentiation and integration as inverse operations.' },
    ],
    formulas: [
      { name: 'Power Rule Integration', latex: '\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)', description: 'Basic power integration', example: '∫x³dx = x⁴/4 + C' },
      { name: 'Integration by Parts', latex: '\\int u \\, dv = uv - \\int v \\, du', description: 'ILATE rule: choose u by this order', example: '∫x·eˣdx = xeˣ - eˣ + C' },
      { name: 'Substitution Method', latex: '\\int f(g(x))g\'(x)\\,dx = \\int f(u)\\,du', description: 'Let u = g(x)', example: '∫2x·cos(x²)dx: let u=x², du=2x dx → ∫cos u du = sin u + C = sin(x²)+C' },
      { name: 'Definite Integral', latex: '\\int_a^b f(x)\\,dx = F(b) - F(a)', description: 'Newton-Leibniz formula', example: '∫[0 to 2] x² dx = [x³/3] = 8/3 - 0 = 8/3' },
      { name: 'Standard: ∫sin x', latex: '\\int \\sin x \\, dx = -\\cos x + C', description: 'Integral of sine', example: '∫sin(3x)dx = -cos(3x)/3 + C' },
      { name: 'Standard: ∫cos x', latex: '\\int \\cos x \\, dx = \\sin x + C', description: 'Integral of cosine', example: '∫cos(2x)dx = sin(2x)/2 + C' },
    ],
    experiments: [],
    videos: [
      { title: 'Introduction to Integration', url: 'https://www.youtube.com/embed/rfG8ce4nNh0', duration: '22 min', source: 'khan-academy' },
      { title: 'Integration by Parts - ILATE Rule', url: 'https://www.youtube.com/embed/pBp6jCCwGW0', duration: '20 min', source: 'youtube-edu' },
      { title: 'Definite Integrals and Area', url: 'https://www.youtube.com/embed/0RdI3-8G4Fs', duration: '18 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Integral', 'Anti-derivative', 'Substitution', 'Integration by parts', 'Definite integral', 'Area under curve'],
    quickFacts: ['The ∫ symbol is an elongated S (for "summa" = sum)', 'Calculus is used in space travel, weather prediction, medicine', 'The area under velocity-time graph gives displacement'],
  },

]

// ─────────────────────────────────────────────────────────
// PHYSICS CHAPTERS
// ─────────────────────────────────────────────────────────
export const PHYSICS_CHAPTERS: ChapterContent[] = [

  {
    id: 'c9-phy-1', title: 'Motion', class: '9', subject: 'Physics', subjectSlug: 'physics',
    description: 'Distance, displacement, speed, velocity, acceleration, equations of motion and graphical representation.',
    concepts: [
      { title: 'Distance vs Displacement', content: 'Distance is the total path length travelled (scalar — only magnitude). Displacement is the shortest distance from start to end point in a specific direction (vector — has magnitude and direction). You can travel 100m but have zero displacement if you return to start.' },
      { title: 'Speed vs Velocity', content: 'Speed = Distance/Time (scalar). Velocity = Displacement/Time (vector). Average speed = total distance/total time. A car going in circles has speed but changing velocity direction.' },
      { title: 'Acceleration', content: 'Acceleration = change in velocity/time taken = (v-u)/t. Positive acceleration: speeding up. Negative acceleration (deceleration/retardation): slowing down. SI unit: m/s².' },
      { title: 'Equations of Motion (Kinematic Equations)', content: 'Three equations relate initial velocity (u), final velocity (v), acceleration (a), time (t) and displacement (s). Valid only for uniform acceleration.' },
    ],
    formulas: [
      { name: 'Speed', latex: 'v = \\frac{d}{t}', description: 'Distance per unit time', example: 'Car travels 120 km in 2 hours → speed = 60 km/h' },
      { name: 'Velocity', latex: '\\vec{v} = \\frac{\\vec{s}}{t}', description: 'Displacement per unit time', example: 'Displacement 50m north in 5s → v = 10 m/s north' },
      { name: 'Acceleration', latex: 'a = \\frac{v - u}{t}', description: 'Rate of change of velocity', example: 'u=10, v=30, t=4s → a=(30-10)/4=5 m/s²' },
      { name: '1st Equation of Motion', latex: 'v = u + at', description: 'Velocity after time t', example: 'u=0, a=10, t=3 → v=0+10×3=30 m/s' },
      { name: '2nd Equation of Motion', latex: 's = ut + \\frac{1}{2}at^2', description: 'Displacement in time t', example: 'u=0, a=10, t=3 → s=0+½×10×9=45 m' },
      { name: '3rd Equation of Motion', latex: 'v^2 = u^2 + 2as', description: 'Velocity after displacement s', example: 'u=0, a=10, s=20 → v²=0+2×10×20=400 → v=20 m/s' },
      { name: 'Average Velocity', latex: 'v_{avg} = \\frac{u + v}{2}', description: 'For uniform acceleration only', example: 'u=10, v=30 → avg = 20 m/s' },
    ],
    experiments: [
      {
        title: 'Finding Acceleration Using Inclined Plane',
        objective: 'To measure acceleration of a ball rolling down an inclined plane',
        materials: ['Inclined plank', 'Ball bearing', 'Meter scale', 'Stopwatch', 'Chalk'],
        procedure: [
          'Set up the plank at a fixed angle (15-30°)',
          'Mark starting position with chalk',
          'Release ball and start stopwatch simultaneously',
          'Note distances at equal time intervals (every 0.5 seconds)',
          'Record s at t = 0.5, 1.0, 1.5, 2.0 seconds',
          'Plot s-t² graph; slope = ½a',
        ],
        observation: 'Distances increase as square of time, confirming uniform acceleration',
        result: 'Ball accelerates uniformly due to component of gravity along the slope: a = g sin θ',
        precautions: ['Release ball without pushing', 'Ensure plank is straight', 'Take multiple readings and average'],
      },
    ],
    videos: [
      { title: 'Motion - Distance, Displacement, Speed', url: 'https://www.youtube.com/embed/ZM8ECpBuQYE', duration: '20 min', source: 'youtube-edu' },
      { title: 'Equations of Motion Derivation', url: 'https://www.youtube.com/embed/2I_EpX23gXU', duration: '18 min', source: 'youtube-edu' },
      { title: 'Velocity-Time Graph Analysis', url: 'https://www.youtube.com/embed/foT5dCAFy9k', duration: '15 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Scalar', 'Vector', 'Displacement', 'Velocity', 'Acceleration', 'Uniform motion', 'Kinematic equations'],
    quickFacts: ['Light travels at 3×10⁸ m/s — fastest speed possible', 'A falling object in vacuum has acceleration = 9.8 m/s²', 'Galileo first described laws of motion before Newton'],
  },

  {
    id: 'c9-phy-2', title: "Force and Laws of Motion", class: '9', subject: 'Physics', subjectSlug: 'physics',
    description: "Newton's three laws of motion, inertia, momentum, impulse, and law of conservation of momentum.",
    concepts: [
      { title: "Newton's First Law (Law of Inertia)", content: "Every object continues in its state of rest or uniform motion in a straight line unless acted upon by an unbalanced force. Inertia is the tendency to resist change. Larger mass = larger inertia. That's why heavy trucks need more force to stop than bicycles." },
      { title: "Newton's Second Law", content: "The net force on an object equals the rate of change of its momentum: F = ma. This means: doubling force doubles acceleration; doubling mass halves acceleration (for same force). This law quantifies how forces cause motion changes." },
      { title: "Newton's Third Law (Action-Reaction)", content: "For every action, there is an equal and opposite reaction. Forces always come in pairs acting on different objects. Examples: rocket propulsion, gun recoil, walking (you push ground back, ground pushes you forward)." },
      { title: 'Momentum and Conservation', content: 'Momentum p = mv (mass × velocity). Law of Conservation: total momentum of an isolated system remains constant. This explains collisions, rocket propulsion, and many natural phenomena.' },
    ],
    formulas: [
      { name: "Newton's Second Law", latex: 'F = ma = \\frac{\\Delta p}{\\Delta t}', description: 'Force = mass × acceleration', example: 'F=5kg×4m/s²=20N' },
      { name: 'Momentum', latex: 'p = mv', description: 'Product of mass and velocity', example: 'p = 2kg × 10 m/s = 20 kg⋅m/s' },
      { name: 'Impulse', latex: 'J = F \\times t = \\Delta p', description: 'Force × time = change in momentum', example: '10N applied for 3s → impulse = 30 N⋅s' },
      { name: 'Conservation of Momentum', latex: 'm_1u_1 + m_2u_2 = m_1v_1 + m_2v_2', description: 'Before collision = After collision', example: '2kg×10 + 3kg×0 = (2+3)×v → v=4 m/s' },
    ],
    experiments: [
      {
        title: "Verifying Newton's Third Law",
        objective: 'To demonstrate equal and opposite forces using spring balances',
        materials: ['Two spring balances', 'String', 'Hook'],
        procedure: [
          'Connect two spring balances end-to-end with string',
          'Person A pulls one balance, Person B pulls other',
          'Read both scales simultaneously',
          'Try different pulling forces',
          'Note both readings at all times',
        ],
        observation: 'Both spring balances always show the same reading',
        result: "Action and reaction forces are equal in magnitude — Newton's 3rd law verified",
        precautions: ['Pull steadily, not with jerks', 'Read scales simultaneously'],
      },
    ],
    videos: [
      { title: "Newton's Laws of Motion", url: 'https://www.youtube.com/embed/ou9YMWlJgkE', duration: '22 min', source: 'youtube-edu' },
      { title: 'Momentum and Conservation', url: 'https://www.youtube.com/embed/XFhntPxow0U', duration: '18 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Inertia', 'Force', 'Momentum', 'Impulse', 'Conservation', 'Action-reaction'],
    quickFacts: ['Newton published laws of motion in "Principia Mathematica" in 1687', 'A rocket works entirely by Newton\'s 3rd law', 'Seat belts save lives using Newton\'s 1st law'],
    vedicMath: [],
  },

  {
    id: 'c10-phy-1', title: 'Light — Reflection and Refraction', class: '10', subject: 'Physics', subjectSlug: 'physics',
    description: 'Laws of reflection, spherical mirrors, refraction, Snell\'s law, lenses and optical instruments.',
    concepts: [
      { title: 'Laws of Reflection', content: '1. Angle of incidence = Angle of reflection (∠i = ∠r). 2. Incident ray, reflected ray, and normal all lie in the same plane. These laws hold for all types of reflecting surfaces.' },
      { title: 'Spherical Mirrors', content: 'Concave mirror: converging, reflecting surface caves inward. Convex mirror: diverging, reflecting surface bulges outward. Center of curvature C, principal focus F, pole P. Focal length f = R/2.' },
      { title: 'Mirror Formula', content: '1/v + 1/u = 1/f. Use sign convention: distances measured from pole. Object distance u is negative (object in front). Real images have positive v; virtual images negative v.' },
      { title: 'Refraction and Snell\'s Law', content: "Light bends when passing from one medium to another. Snell's Law: n₁ sin θ₁ = n₂ sin θ₂. Denser medium → slower speed → light bends toward normal. Refractive index n = speed in vacuum / speed in medium = c/v." },
    ],
    formulas: [
      { name: 'Mirror Formula', latex: '\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}', description: 'Relates object, image distance to focal length', example: 'u=-30cm, f=-10cm → 1/v = 1/(-10)-1/(-30) = -1/15 → v=-15cm' },
      { name: 'Magnification (Mirror)', latex: 'm = -\\frac{v}{u} = \\frac{h_i}{h_o}', description: 'Ratio of image to object size', example: 'v=-15, u=-30 → m = -(-15)/(-30) = -0.5 (real, inverted, diminished)' },
      { name: "Snell's Law", latex: 'n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2', description: 'Law of refraction', example: 'Air(n=1) to glass(n=1.5): sin30°×1 = sin θ₂×1.5 → θ₂=19.47°' },
      { name: 'Refractive Index', latex: 'n = \\frac{c}{v} = \\frac{\\sin i}{\\sin r}', description: 'Measure of optical density', example: 'Glass: n=1.5, water: n=1.33, diamond: n=2.42' },
      { name: 'Lens Formula', latex: '\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}', description: 'For thin lenses', example: 'u=-20cm, f=10cm → 1/v=1/10+1/(-20)=1/20 → v=20cm' },
      { name: 'Power of Lens', latex: 'P = \\frac{1}{f(\\text{in metres})}', description: 'In diopters (D)', example: 'f=25cm=0.25m → P=1/0.25=+4D' },
    ],
    experiments: [
      {
        title: 'Finding Focal Length of Concave Mirror',
        objective: 'To determine focal length of a concave mirror by obtaining image of a distant object',
        materials: ['Concave mirror', 'Screen (white paper)', 'Meter scale', 'Holder'],
        procedure: [
          'Hold mirror facing a distant window or tree (object at infinity)',
          'Place white screen in front of mirror',
          'Move screen until sharp bright spot (image of sun/distant object) forms',
          'Measure distance from mirror to screen = focal length',
          'Repeat 3 times and take average',
        ],
        observation: 'A bright, small, real image forms at a fixed distance from the mirror',
        result: 'This distance = focal length f. Also, f = R/2 where R = radius of curvature',
        precautions: ['Never look directly at sun through/in mirror', 'Handle mirror carefully'],
      },
      {
        title: "Verifying Snell's Law",
        objective: "To verify Snell's Law of refraction using a glass slab",
        materials: ['Rectangular glass slab', 'Pins (4)', 'Drawing board', 'Protractor', 'Ruler'],
        procedure: [
          'Place glass slab on paper and trace its outline',
          'Draw incident ray at angle i to normal',
          'Place two pins P1, P2 on incident ray',
          'Look from other side and place pins P3, P4 aligned with P1, P2 images',
          'Remove slab and join P3P4 — this is the emergent ray',
          'Draw refracted ray inside glass, measure angle r',
          'Calculate sin i / sin r',
        ],
        observation: 'The ratio sin i / sin r remains constant for different angles of incidence',
        result: "Snell's Law n₁ sin i = n₂ sin r verified. n_glass = sin i / sin r ≈ 1.5",
      },
    ],
    videos: [
      { title: 'Light Reflection - Concave Convex Mirrors', url: 'https://www.youtube.com/embed/0BNUYMDY2d0', duration: '25 min', source: 'youtube-edu' },
      { title: "Snell's Law and Refraction", url: 'https://www.youtube.com/embed/y55tzg_jW9I', duration: '18 min', source: 'youtube-edu' },
      { title: 'Lenses - Convex and Concave', url: 'https://www.youtube.com/embed/1Y2w-Hfzjss', duration: '20 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Reflection', 'Refraction', 'Focal length', 'Mirror formula', 'Snell\'s law', 'Refractive index', 'Power of lens'],
    quickFacts: ['Diamond has highest refractive index (2.42) — that\'s why it sparkles', 'Mirage is total internal reflection in hot air', 'Human eye is a natural convex lens with variable focal length'],
  },

  {
    id: 'c12-phy-3', title: 'Current Electricity', class: '12', subject: 'Physics', subjectSlug: 'physics',
    description: "Electric current, Ohm's law, resistance, Kirchhoff's laws, Wheatstone bridge, meter bridge.",
    concepts: [
      { title: 'Electric Current and Drift Velocity', content: 'Electric current I = Q/t (charge per unit time). In a conductor, free electrons drift slowly (~mm/s) in the direction opposite to electric field. Current direction = opposite to electron flow. Conventional current flows from +ve to -ve terminal outside the cell.' },
      { title: "Ohm's Law and Resistance", content: "V = IR. Resistance depends on material (resistivity ρ), length L, and cross-section area A: R = ρL/A. Temperature increases resistance in metals (R = R₀[1 + α(T-T₀)]). Ohmic conductors follow V∝I; non-ohmic (like diodes) don't." },
      { title: "Kirchhoff's Laws", content: 'KCL (Junction Rule): Sum of currents entering a junction = sum leaving. (Charge conservation). KVL (Loop Rule): Sum of EMFs = Sum of potential drops in any closed loop. (Energy conservation). Essential for complex circuit analysis.' },
      { title: 'Wheatstone Bridge', content: 'P/Q = R/S for balanced bridge (no current through galvanometer). Used to measure unknown resistance precisely. Meter bridge is a practical form using a wire of uniform resistance for Q and S.' },
    ],
    formulas: [
      { name: 'Ohm\'s Law', latex: 'V = IR', description: 'Potential difference = Current × Resistance', example: 'I=2A, R=5Ω → V=10V' },
      { name: 'Resistivity', latex: 'R = \\rho \\frac{L}{A}', description: 'Resistance in terms of material properties', example: 'Copper: ρ=1.7×10⁻⁸Ω⋅m' },
      { name: 'Series Resistance', latex: 'R_{eq} = R_1 + R_2 + R_3 + \\cdots', description: 'Total resistance adds up', example: '3Ω + 5Ω + 2Ω = 10Ω' },
      { name: 'Parallel Resistance', latex: '\\frac{1}{R_{eq}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\cdots', description: 'Reciprocals add up', example: '1/Req=1/6+1/3=1/2 → Req=2Ω' },
      { name: 'Power', latex: 'P = VI = I^2R = \\frac{V^2}{R}', description: 'Electrical power dissipated', example: 'I=2A, R=5Ω → P=4×5=20W' },
      { name: "Kirchhoff's Current Law", latex: '\\sum I_{in} = \\sum I_{out}', description: 'At any junction', example: 'I1+I2=I3+I4 at a node' },
      { name: "Kirchhoff's Voltage Law", latex: '\\sum EMF = \\sum IR', description: 'Around any closed loop', example: 'E = I(R1+R2+r) in simple circuit' },
      { name: 'Wheatstone Bridge', latex: '\\frac{P}{Q} = \\frac{R}{S}', description: 'Balanced bridge condition', example: 'P=2, Q=4, R=3 → S=6Ω' },
    ],
    experiments: [
      {
        title: "Verification of Ohm's Law",
        objective: "To verify Ohm's law and find resistance of a given wire",
        materials: ['Battery/power supply', 'Rheostat', 'Ammeter', 'Voltmeter', 'Resistance wire', 'Key', 'Connecting wires'],
        procedure: [
          'Connect circuit: battery - key - rheostat - resistance wire in series',
          'Connect voltmeter across the resistance wire',
          'Connect ammeter in series',
          'Start with minimum voltage',
          'Record V and I for 6-8 different rheostat settings',
          'Plot V vs I graph',
        ],
        observation: 'V-I graph is a straight line passing through origin',
        result: 'V ∝ I confirms Ohm\'s Law. Slope = R = V/I',
        precautions: ['Keep current low to avoid heating', 'Take readings quickly', 'Ensure proper polarity of meters'],
      },
    ],
    videos: [
      { title: "Ohm's Law and Resistance", url: 'https://www.youtube.com/embed/J4Vq-xHqUo8', duration: '20 min', source: 'youtube-edu' },
      { title: "Kirchhoff's Laws Problems", url: 'https://www.youtube.com/embed/VH7ydLHR-cs', duration: '25 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Current', 'Resistance', 'Ohm\'s law', 'Kirchhoff\'s laws', 'Resistivity', 'Power', 'EMF', 'Wheatstone bridge'],
    quickFacts: ['Thomas Edison and Nikola Tesla had the famous "War of Currents" (AC vs DC)', 'A human hair has resistance of about 1 MΩ', 'Superconductors have zero resistance below critical temperature'],
  },

]

// ─────────────────────────────────────────────────────────
// CHEMISTRY CHAPTERS
// ─────────────────────────────────────────────────────────
export const CHEMISTRY_CHAPTERS: ChapterContent[] = [

  {
    id: 'c9-chem-2', title: 'Is Matter Around Us Pure?', class: '9', subject: 'Chemistry', subjectSlug: 'chemistry',
    description: 'Pure substances vs mixtures, methods of separation, elements and compounds.',
    concepts: [
      { title: 'Pure Substances vs Mixtures', content: 'Pure substance: fixed composition, fixed boiling/melting point (elements and compounds). Mixture: variable composition, no fixed properties. Mixtures can be homogeneous (uniform, like salt water) or heterogeneous (non-uniform, like sand in water).' },
      { title: 'Methods of Separation', content: 'Evaporation: removes water from dissolved solid. Distillation: separates liquids with different boiling points. Chromatography: separates components based on different rates of movement. Centrifugation: separates by density using spinning.' },
      { title: 'Elements and Compounds', content: 'Element: simplest pure substance, cannot be broken down chemically (e.g., Fe, O, Na). Compound: two or more elements combined chemically in fixed ratio with new properties (e.g., H₂O, NaCl). Properties of compound differ from its elements.' },
    ],
    formulas: [
      { name: 'Tyndall Effect', latex: '\\text{Colloidal particles: } 1-100\\text{ nm size scatter light}', description: 'Distinguishes colloid from solution', example: 'Beam of light visible in milk (colloid), not in salt solution' },
    ],
    experiments: [
      {
        title: 'Paper Chromatography',
        objective: 'To separate components of a mixture using paper chromatography',
        materials: ['Chromatography paper', 'Solvent (water or alcohol)', 'Sample (ink or plant extract)', 'Beaker', 'Pencil', 'Ruler'],
        procedure: [
          'Cut a strip of chromatography paper (15cm × 3cm)',
          'Draw a pencil line 2cm from bottom',
          'Place a small spot of ink/sample on the line',
          'Place paper in beaker with solvent 1cm deep (below sample spot)',
          'Allow solvent to rise by capillary action',
          'Remove when solvent reaches 1cm from top',
          'Mark solvent front and measure Rf for each component',
        ],
        observation: 'Different colored components separate at different heights',
        result: 'Rf = distance travelled by component / distance travelled by solvent. Each component has unique Rf value.',
        precautions: ['Sample must be above solvent level', 'Do not disturb beaker while running'],
      },
    ],
    videos: [
      { title: 'Separation Techniques - All Methods', url: 'https://www.youtube.com/embed/RXJoGnkZPYQ', duration: '20 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Mixture', 'Solution', 'Colloid', 'Suspension', 'Evaporation', 'Distillation', 'Chromatography', 'Solute', 'Solvent'],
    quickFacts: ['Air is a mixture, not a compound', 'Stainless steel is an alloy (mixture of iron, carbon, chromium)', 'Diamonds and graphite are both pure carbon — different structures'],
  },

  {
    id: 'c10-chem-2', title: 'Acids, Bases and Salts', class: '10', subject: 'Chemistry', subjectSlug: 'chemistry',
    description: 'Properties of acids and bases, pH scale, neutralization, salts and their uses.',
    concepts: [
      { title: 'Acids and Bases', content: 'Acids: taste sour, turn blue litmus red, produce H⁺ ions in water, pH < 7. Examples: HCl, H₂SO₄, CH₃COOH. Bases: taste bitter, turn red litmus blue, produce OH⁻ ions in water, pH > 7. Examples: NaOH, Ca(OH)₂, NH₃.' },
      { title: 'pH Scale', content: 'pH measures concentration of H⁺ ions: pH = -log[H⁺]. Range 0-14. pH < 7: acidic (more H⁺). pH = 7: neutral (pure water at 25°C). pH > 7: basic/alkaline (more OH⁻). Each pH unit represents 10× difference in concentration.' },
      { title: 'Neutralization', content: 'Acid + Base → Salt + Water (always). This is an exothermic reaction. The resulting solution may be acidic, basic or neutral depending on strengths of acid and base used. Strong acid + strong base → neutral salt (pH=7).' },
      { title: 'Important Salts', content: 'NaCl (common salt): source of Na and Cl, food, industrial uses. Na₂CO₃ (washing soda): cleaning agent. NaHCO₃ (baking soda): CO₂ in baking, antacid. CaSO₄ (gypsum/plaster of paris): construction, medical casts.' },
    ],
    formulas: [
      { name: 'pH Definition', latex: 'pH = -\\log_{10}[H^+]', description: 'pH from H⁺ ion concentration', example: '[H⁺]=10⁻³M → pH=-log(10⁻³)=3 (acidic)' },
      { name: 'Neutralization', latex: 'H^+ + OH^- \\rightarrow H_2O', description: 'Ionic equation for neutralization', example: 'HCl + NaOH → NaCl + H₂O' },
      { name: 'pOH Relationship', latex: 'pH + pOH = 14 \\text{ (at 25°C)}', description: 'pH and pOH are complementary', example: 'If pH=3, then pOH=11' },
      { name: 'Water Ionization', latex: 'K_w = [H^+][OH^-] = 10^{-14}', description: 'Ionic product of water at 25°C', example: 'Pure water: [H⁺]=[OH⁻]=10⁻⁷M → pH=7' },
    ],
    experiments: [
      {
        title: 'Testing pH of Various Substances Using Natural Indicators',
        objective: 'To determine the acidic/basic nature of common substances using natural indicators',
        materials: ['Turmeric solution', 'Red cabbage extract', 'Various samples: vinegar, lemon, baking soda, soap, milk', 'Test tubes', 'Dropper'],
        procedure: [
          'Prepare turmeric solution by dissolving in water',
          'Extract red cabbage by boiling in water',
          'Take samples in separate test tubes',
          'Add 2-3 drops of turmeric solution to each',
          'Observe color changes',
          'Repeat with red cabbage extract',
        ],
        observation: 'Turmeric: yellow in acid, red-brown in base. Red cabbage: red in acid, green/yellow in base',
        result: 'Natural substances act as indicators. Acids turn turmeric yellow (no change), bases turn it red-brown.',
        precautions: ['Use fresh indicators', 'Clean test tubes between samples'],
      },
    ],
    videos: [
      { title: 'Acids, Bases and Salts - Complete', url: 'https://www.youtube.com/embed/r27nXJxPHCI', duration: '28 min', source: 'youtube-edu' },
      { title: 'pH Scale Explained Simply', url: 'https://www.youtube.com/embed/Bpox59lhB78', duration: '12 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Acid', 'Base', 'Salt', 'pH', 'Neutralization', 'Indicator', 'Litmus', 'Buffer'],
    quickFacts: ['Human blood pH is 7.35-7.45 — deviation causes illness', 'Stomach acid has pH 1.5-3.5', 'Bees sting is acidic (pH 4-5), wasp sting is alkaline (pH 6.8-6.9)'],
  },

]

// ─────────────────────────────────────────────────────────
// BIOLOGY CHAPTERS
// ─────────────────────────────────────────────────────────
export const BIOLOGY_CHAPTERS: ChapterContent[] = [

  {
    id: 'c10-bio-1', title: 'Life Processes', class: '10', subject: 'Biology', subjectSlug: 'biology',
    description: 'Nutrition, respiration, transportation and excretion in plants and animals.',
    concepts: [
      { title: 'Nutrition', content: 'Autotrophic nutrition: organisms make own food. Plants use photosynthesis: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. Heterotrophic: obtain food from other organisms. Types: holozoic (animals), parasitic (tapeworm), saprophytic (fungi on dead matter).' },
      { title: 'Respiration', content: 'Aerobic: glucose + O₂ → CO₂ + H₂O + energy (38 ATP). Anaerobic: glucose → lactic acid/ethanol + CO₂ + little energy (2 ATP). Occurs in mitochondria. Krebs cycle and electron transport chain are stages of aerobic respiration.' },
      { title: 'Transportation in Humans', content: 'Heart pumps blood through arteries (oxygenated, away from heart) and veins (deoxygenated, toward heart). Capillaries are tiny vessels where exchange occurs. Heart: 4 chambers, 2 atria + 2 ventricles. Double circulation = pulmonary + systemic.' },
      { title: 'Excretion', content: 'Removal of metabolic waste. Kidneys filter blood, produce urine containing urea, uric acid, excess salts and water. Nephron is functional unit of kidney. Plants excrete CO₂, O₂, water vapor through stomata.' },
    ],
    formulas: [
      { name: 'Photosynthesis', latex: '6CO_2 + 6H_2O \\xrightarrow{\\text{light}} C_6H_{12}O_6 + 6O_2', description: 'Overall equation for photosynthesis', example: 'Plants use this to make glucose from CO₂ and water' },
      { name: 'Aerobic Respiration', latex: 'C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + 38\\text{ ATP}', description: 'Complete oxidation of glucose', example: 'Occurs in mitochondria' },
      { name: 'Anaerobic (Fermentation)', latex: 'C_6H_{12}O_6 \\rightarrow 2C_2H_5OH + 2CO_2 + 2\\text{ ATP}', description: 'In yeast and bacteria (ethanol fermentation)', example: 'Used in bread making, alcohol production' },
      { name: 'Anaerobic (Muscles)', latex: 'C_6H_{12}O_6 \\rightarrow 2CH_3CH(OH)COOH + 2\\text{ ATP}', description: 'Lactic acid fermentation in muscles', example: 'Causes cramps during intense exercise' },
    ],
    experiments: [
      {
        title: 'Demonstrating Photosynthesis Requires Light',
        objective: 'To show that light is necessary for photosynthesis',
        materials: ['Potted plant with broad leaves', 'Black paper strips', 'Clips', 'Iodine solution', 'Alcohol', 'Beaker'],
        procedure: [
          'Keep plant in dark for 48 hours (to destarch leaves)',
          'Cover part of a leaf with black paper on both sides',
          'Place plant in bright sunlight for 6 hours',
          'Remove leaf and black paper',
          'Boil leaf in water for 2 minutes',
          'Boil in alcohol to remove chlorophyll',
          'Apply iodine solution and observe',
        ],
        observation: 'Covered (dark) region stays brown; uncovered (light) region turns blue-black',
        result: 'Blue-black color indicates presence of starch, confirming photosynthesis occurred only in light',
        precautions: ['Use forceps when handling hot leaf', 'Alcohol is flammable — use water bath not direct flame'],
      },
    ],
    videos: [
      { title: 'Life Processes - Complete Overview', url: 'https://www.youtube.com/embed/Gqd0Euq0b6s', duration: '30 min', source: 'youtube-edu' },
      { title: 'Photosynthesis and Respiration', url: 'https://www.youtube.com/embed/OtBdMmBaR00', duration: '20 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Photosynthesis', 'Respiration', 'Nutrition', 'Transportation', 'Excretion', 'Autotroph', 'Heterotroph', 'ATP', 'Nephron'],
    quickFacts: ['A human heart beats about 100,000 times per day', 'Each kidney contains about 1 million nephrons', 'Mitochondria are called "powerhouse of the cell"'],
  },

]

// ─────────────────────────────────────────────────────────
// VEDIC MATH SPECIAL CHAPTERS
// ─────────────────────────────────────────────────────────
export const VEDIC_MATH_CHAPTERS: ChapterContent[] = [
  {
    id: 'vedic-1', title: 'Vedic Mathematics — Fast Multiplication', class: 'all', subject: 'Vedic Math', subjectSlug: 'mathematics',
    description: 'Ancient Indian mathematical techniques for rapid mental calculations. 16 Sutras (formulas) for lightning fast arithmetic.',
    concepts: [
      { title: 'Multiplication by 11', content: 'For any 2-digit number AB: A_(A+B)_B. Example: 35×11: 3_(3+5)_5 = 385. If A+B > 9, carry over to left digit. Example: 76×11: 7_(7+6)_6 = 7_13_6 → (7+1)_3_6 = 836.' },
      { title: 'Squaring Numbers Ending in 5', content: 'For n5²: multiply n×(n+1) then append 25. Example: 35² = 3×4 _ 25 = 1225. 75² = 7×8 _ 25 = 5625. 95² = 9×10 _ 25 = 9025. Works for any number ending in 5!' },
      { title: 'Multiplying Numbers Near 100', content: 'Find deviation from 100. Cross-add the number and opposite deviation, then multiply deviations. Example: 97×96: deviations -3,-4. Cross: 97-4=93 (or 96-3=93). Multiply: (-3)×(-4)=12. Answer: 93_12 = 9312.' },
      { title: 'Nikhilam Method (Near Base)', content: 'Works for multiplication near any base (10, 100, 1000). Write each number and its deviation from base. Add cross-wise for left part. Multiply deviations for right part. Example: 8×7 (base 10): deviations -2,-3. 8-3=5, (-2)×(-3)=6. Answer: 56.' },
      { title: 'Vertically and Crosswise (Urdhva Tiryak)', content: 'General multiplication method. For 2-digit numbers: (a)(b)×(c)(d) = (ac)_(ad+bc)_(bd). Example: 23×14: 2×1=2, 2×4+3×1=11, 3×4=12. Working: 2_11_12 → carry: 2+1=3, 1, 12 → 322. Check: 23×14=322 ✓.' },
    ],
    formulas: [
      { name: 'Ekanyunena Purvena (Multiplication by 9s)', latex: '\\text{AB} \\times 99 = (\\text{AB}-1) \\_ (99 - (\\text{AB}-1))', description: 'Multiply any number by 9, 99, 999 etc.', example: '57×99 = 56_43 = 5643' },
      { name: 'Squaring Near Base 50', latex: 'n^2 = (n-50)\\times100 + 50^2 + (n-50)^2/100', description: 'For numbers near 50', example: '48² = (48-50)×100 + 2500 = -200+2500=2304' },
      { name: 'All from 9 and Last from 10', latex: '\\text{Complement} = (9,9,\\ldots,10-\\text{last digit})', description: 'Quick subtraction from powers of 10', example: '10000-3456: complement=6,5,4,4 = 6544' },
    ],
    experiments: [],
    videos: [
      { title: 'Vedic Maths - Multiply Any Numbers Fast', url: 'https://www.youtube.com/embed/6uTUNxWpjRg', duration: '18 min', source: 'youtube-edu' },
      { title: 'Vedic Math Tricks for NCERT Students', url: 'https://www.youtube.com/embed/lhFMHlXSCCg', duration: '22 min', source: 'youtube-edu' },
      { title: 'Squaring Numbers - Vedic Method', url: 'https://www.youtube.com/embed/BafNj8r-Z8M', duration: '15 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Sutra', 'Nikhilam', 'Urdhva Tiryak', 'Ekanyunena', 'Base multiplication', 'Mental math', 'Vedic Math'],
    quickFacts: ['Vedic Math was rediscovered by Swami Bharati Krishna Tirthaji in early 20th century', '16 Sutras cover all areas of mathematics', 'Students using Vedic Math solve problems 10-15x faster', 'Vedic Math is taught in many IIT coaching institutes'],
    vedicMath: [
      { technique: 'Square of 25', example: '25² = 2×3_25 = 625', shortcut: 'Sutra: Ekadhikena Purvena' },
      { technique: 'Multiply by 5', example: '2468×5 = 2468/2 × 10 = 1234×10 = 12340', shortcut: 'Divide by 2, multiply by 10' },
      { technique: 'Multiply by 25', example: '348×25 = 348/4 × 100 = 87×100 = 8700', shortcut: 'Divide by 4, multiply by 100' },
      { technique: 'Multiply by 125', example: '248×125 = 248/8 × 1000 = 31×1000 = 31000', shortcut: 'Divide by 8, multiply by 1000' },
    ],
  },
]

// Master export
export { ALL_EXTRA_CHAPTERS } from './chapters-db-extra'
import { ALL_EXTRA_CHAPTERS } from './chapters-db-extra'

export const ALL_CHAPTER_CONTENT: ChapterContent[] = [
  ...MATH_CHAPTERS,
  ...PHYSICS_CHAPTERS,
  ...CHEMISTRY_CHAPTERS,
  ...BIOLOGY_CHAPTERS,
  ...VEDIC_MATH_CHAPTERS,
  ...ALL_EXTRA_CHAPTERS,
]

export function getChapterContent(chapterId: string): ChapterContent | null {
  return ALL_CHAPTER_CONTENT.find(c => c.id === chapterId) ?? null
}

export function getChaptersByClass(classLevel: string, subjectSlug: string): ChapterContent[] {
  return ALL_CHAPTER_CONTENT.filter(c => (c.class === classLevel || c.class === 'all') && c.subjectSlug === subjectSlug)
}
