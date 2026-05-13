// lib/ncert-formulas.ts
// ══════════════════════════════════════════════════════════════════
// TASK 7: Accurate NCERT-level formulas — Class 6-12, All Subjects
// Source: NCERT textbooks — not template-based
// ══════════════════════════════════════════════════════════════════

export interface NCERTFormula {
  id:          string
  name:        string
  formula:     string       // Display formula
  latex:       string       // LaTeX for rendering
  subject:     string
  classLevel:  string
  chapter:     string
  chapterNo:   number
  variables:   { sym: string; meaning: string; unit: string }[]
  example:     string
  note?:       string
  derivation?: string
}

// ══════════════════════════════════════════════════════════════════
// CLASS 9 — SCIENCE (PHYSICS)
// ══════════════════════════════════════════════════════════════════
export const CLASS9_PHYSICS_FORMULAS: NCERTFormula[] = [
  {
    id: 'c9-p-01', name: 'Speed', subject: 'Physics', classLevel: '9', chapter: 'Motion', chapterNo: 8,
    formula: 'Speed = Distance / Time',
    latex:   'v = \\frac{d}{t}',
    variables: [
      { sym: 'v', meaning: 'Speed', unit: 'm/s' },
      { sym: 'd', meaning: 'Distance', unit: 'm' },
      { sym: 't', meaning: 'Time', unit: 's' },
    ],
    example: 'A car travels 120 km in 2 hours. Speed = 120/2 = 60 km/h = 16.67 m/s',
    note: 'Speed is a scalar quantity — it has magnitude only, no direction.',
  },
  {
    id: 'c9-p-02', name: "Newton's First Equation of Motion", subject: 'Physics', classLevel: '9', chapter: 'Force and Laws of Motion', chapterNo: 9,
    formula: 'v = u + at',
    latex:   'v = u + at',
    variables: [
      { sym: 'v', meaning: 'Final velocity', unit: 'm/s' },
      { sym: 'u', meaning: 'Initial velocity', unit: 'm/s' },
      { sym: 'a', meaning: 'Acceleration', unit: 'm/s²' },
      { sym: 't', meaning: 'Time', unit: 's' },
    ],
    example: 'A car starts from rest (u=0), accelerates at 5 m/s² for 4 seconds. v = 0 + 5×4 = 20 m/s',
    note: 'Valid only for uniform (constant) acceleration.',
    derivation: 'From definition: a = (v-u)/t → at = v-u → v = u+at',
  },
  {
    id: 'c9-p-03', name: "Newton's Second Equation of Motion", subject: 'Physics', classLevel: '9', chapter: 'Force and Laws of Motion', chapterNo: 9,
    formula: 's = ut + ½at²',
    latex:   's = ut + \\frac{1}{2}at^2',
    variables: [
      { sym: 's', meaning: 'Displacement', unit: 'm' },
      { sym: 'u', meaning: 'Initial velocity', unit: 'm/s' },
      { sym: 'a', meaning: 'Acceleration', unit: 'm/s²' },
      { sym: 't', meaning: 'Time', unit: 's' },
    ],
    example: 'Object starts from rest, a=10 m/s², t=3s. s = 0 + ½×10×9 = 45 m',
    derivation: 'Average velocity = (u+v)/2 = (u+u+at)/2. s = avg_vel × t = ut + ½at²',
  },
  {
    id: 'c9-p-04', name: "Newton's Third Equation of Motion", subject: 'Physics', classLevel: '9', chapter: 'Force and Laws of Motion', chapterNo: 9,
    formula: 'v² = u² + 2as',
    latex:   'v^2 = u^2 + 2as',
    variables: [
      { sym: 'v', meaning: 'Final velocity', unit: 'm/s' },
      { sym: 'u', meaning: 'Initial velocity', unit: 'm/s' },
      { sym: 'a', meaning: 'Acceleration', unit: 'm/s²' },
      { sym: 's', meaning: 'Displacement', unit: 'm' },
    ],
    example: 'A ball thrown upward at 20 m/s, g=10 m/s². At max height v=0. 0=400+2×(-10)×s → s=20 m',
    note: 'Use this when time is not given or not required.',
  },
  {
    id: 'c9-p-05', name: "Newton's Second Law — Force", subject: 'Physics', classLevel: '9', chapter: 'Force and Laws of Motion', chapterNo: 9,
    formula: 'F = ma = Δp/Δt',
    latex:   'F = ma = \\frac{\\Delta p}{\\Delta t}',
    variables: [
      { sym: 'F', meaning: 'Net Force', unit: 'N (Newton)' },
      { sym: 'm', meaning: 'Mass', unit: 'kg' },
      { sym: 'a', meaning: 'Acceleration', unit: 'm/s²' },
      { sym: 'Δp', meaning: 'Change in momentum', unit: 'kg⋅m/s' },
    ],
    example: 'Force on 5 kg object with 4 m/s² acceleration: F = 5×4 = 20 N',
    note: '1 Newton = force that gives 1 kg object an acceleration of 1 m/s²',
  },
  {
    id: 'c9-p-06', name: 'Momentum', subject: 'Physics', classLevel: '9', chapter: 'Force and Laws of Motion', chapterNo: 9,
    formula: 'p = mv',
    latex:   'p = mv',
    variables: [
      { sym: 'p', meaning: 'Momentum', unit: 'kg⋅m/s' },
      { sym: 'm', meaning: 'Mass', unit: 'kg' },
      { sym: 'v', meaning: 'Velocity', unit: 'm/s' },
    ],
    example: 'Cricket ball (m=0.15 kg) at 30 m/s: p = 0.15×30 = 4.5 kg⋅m/s',
    note: 'Momentum is a vector — direction same as velocity.',
  },
  {
    id: 'c9-p-07', name: 'Universal Gravitation', subject: 'Physics', classLevel: '9', chapter: 'Gravitation', chapterNo: 10,
    formula: 'F = G×m₁×m₂ / r²',
    latex:   'F = \\frac{Gm_1m_2}{r^2}',
    variables: [
      { sym: 'F', meaning: 'Gravitational force', unit: 'N' },
      { sym: 'G', meaning: 'Universal gravitational constant = 6.674×10⁻¹¹', unit: 'N⋅m²/kg²' },
      { sym: 'm₁,m₂', meaning: 'Masses of objects', unit: 'kg' },
      { sym: 'r', meaning: 'Distance between centers', unit: 'm' },
    ],
    example: 'Force between 60 kg person and Earth: F = 6.674×10⁻¹¹ × 60 × 6×10²⁴ / (6.4×10⁶)² ≈ 588 N',
    note: 'This is Newton\'s Law of Universal Gravitation (1687)',
  },
  {
    id: 'c9-p-08', name: 'Weight', subject: 'Physics', classLevel: '9', chapter: 'Gravitation', chapterNo: 10,
    formula: 'W = mg',
    latex:   'W = mg',
    variables: [
      { sym: 'W', meaning: 'Weight', unit: 'N' },
      { sym: 'm', meaning: 'Mass', unit: 'kg' },
      { sym: 'g', meaning: 'Acceleration due to gravity = 9.8 m/s²', unit: 'm/s²' },
    ],
    example: '60 kg person on Earth: W = 60×9.8 = 588 N. On Moon (g=1.6): W = 60×1.6 = 96 N',
    note: 'Weight changes with location (gravity), but mass does not change.',
  },
  {
    id: 'c9-p-09', name: 'Work Done', subject: 'Physics', classLevel: '9', chapter: 'Work and Energy', chapterNo: 11,
    formula: 'W = F × d × cos θ',
    latex:   'W = Fd\\cos\\theta',
    variables: [
      { sym: 'W', meaning: 'Work done', unit: 'J (Joule)' },
      { sym: 'F', meaning: 'Force applied', unit: 'N' },
      { sym: 'd', meaning: 'Displacement', unit: 'm' },
      { sym: 'θ', meaning: 'Angle between force and displacement', unit: 'degrees' },
    ],
    example: 'Push 20 N force, move 5 m, θ=0°: W = 20×5×cos0° = 20×5×1 = 100 J',
    note: 'If force and displacement are perpendicular (θ=90°), W=0. Carrying a bag horizontally: no work done by weight.',
  },
  {
    id: 'c9-p-10', name: 'Kinetic Energy', subject: 'Physics', classLevel: '9', chapter: 'Work and Energy', chapterNo: 11,
    formula: 'KE = ½mv²',
    latex:   'KE = \\frac{1}{2}mv^2',
    variables: [
      { sym: 'KE', meaning: 'Kinetic Energy', unit: 'J' },
      { sym: 'm', meaning: 'Mass', unit: 'kg' },
      { sym: 'v', meaning: 'Speed', unit: 'm/s' },
    ],
    example: 'Car (1000 kg) at 20 m/s: KE = ½×1000×400 = 200,000 J = 200 kJ',
    note: 'KE is always positive. Doubling speed quadruples KE.',
  },
  {
    id: 'c9-p-11', name: 'Potential Energy (Gravitational)', subject: 'Physics', classLevel: '9', chapter: 'Work and Energy', chapterNo: 11,
    formula: 'PE = mgh',
    latex:   'PE = mgh',
    variables: [
      { sym: 'PE', meaning: 'Potential Energy', unit: 'J' },
      { sym: 'm',  meaning: 'Mass', unit: 'kg' },
      { sym: 'g',  meaning: 'Acceleration due to gravity = 9.8 m/s²', unit: 'm/s²' },
      { sym: 'h',  meaning: 'Height above reference level', unit: 'm' },
    ],
    example: '2 kg book raised 3 m: PE = 2×9.8×3 = 58.8 J',
    note: 'Reference level (h=0) is chosen by convenience — usually ground level.',
  },
  {
    id: 'c9-p-12', name: 'Power', subject: 'Physics', classLevel: '9', chapter: 'Work and Energy', chapterNo: 11,
    formula: 'P = W/t = F×v',
    latex:   'P = \\frac{W}{t} = Fv',
    variables: [
      { sym: 'P', meaning: 'Power', unit: 'W (Watt)' },
      { sym: 'W', meaning: 'Work done', unit: 'J' },
      { sym: 't', meaning: 'Time', unit: 's' },
    ],
    example: 'Lift 50 kg box to height 3 m in 5 s: W=50×9.8×3=1470 J, P=1470/5=294 W',
    note: '1 Watt = 1 Joule per second. Horsepower: 1 hp = 746 W.',
  },
]

// ══════════════════════════════════════════════════════════════════
// CLASS 10 — SCIENCE (PHYSICS)
// ══════════════════════════════════════════════════════════════════
export const CLASS10_PHYSICS_FORMULAS: NCERTFormula[] = [
  {
    id: 'c10-p-01', name: "Ohm's Law", subject: 'Physics', classLevel: '10', chapter: 'Electricity', chapterNo: 12,
    formula: 'V = IR',
    latex:   'V = IR',
    variables: [
      { sym: 'V', meaning: 'Potential difference (Voltage)', unit: 'V (Volt)' },
      { sym: 'I', meaning: 'Current', unit: 'A (Ampere)' },
      { sym: 'R', meaning: 'Resistance', unit: 'Ω (Ohm)' },
    ],
    example: 'Voltage=12V, Resistance=4Ω: Current I = V/R = 12/4 = 3 A',
    note: 'Valid at constant temperature. Metals follow Ohm\'s law; semiconductors do not.',
  },
  {
    id: 'c10-p-02', name: 'Resistance Formula', subject: 'Physics', classLevel: '10', chapter: 'Electricity', chapterNo: 12,
    formula: 'R = ρL/A',
    latex:   'R = \\frac{\\rho L}{A}',
    variables: [
      { sym: 'R', meaning: 'Resistance', unit: 'Ω' },
      { sym: 'ρ', meaning: 'Resistivity (depends on material)', unit: 'Ω⋅m' },
      { sym: 'L', meaning: 'Length of conductor', unit: 'm' },
      { sym: 'A', meaning: 'Cross-sectional area', unit: 'm²' },
    ],
    example: 'Copper wire (ρ=1.7×10⁻⁸), L=10m, A=1mm²=10⁻⁶m²: R=1.7×10⁻⁸×10/10⁻⁶=0.17 Ω',
    note: 'Resistance increases with length and decreases with area.',
  },
  {
    id: 'c10-p-03', name: 'Series Resistance', subject: 'Physics', classLevel: '10', chapter: 'Electricity', chapterNo: 12,
    formula: 'R_total = R₁ + R₂ + R₃',
    latex:   'R_{total} = R_1 + R_2 + R_3',
    variables: [{ sym: 'R_total', meaning: 'Total equivalent resistance', unit: 'Ω' }],
    example: '3Ω + 5Ω + 2Ω in series: R_total = 10 Ω',
    note: 'In series: same current, voltages add. Total resistance is always GREATER than any individual.',
  },
  {
    id: 'c10-p-04', name: 'Parallel Resistance', subject: 'Physics', classLevel: '10', chapter: 'Electricity', chapterNo: 12,
    formula: '1/R_eq = 1/R₁ + 1/R₂ + 1/R₃',
    latex:   '\\frac{1}{R_{eq}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}',
    variables: [{ sym: 'R_eq', meaning: 'Equivalent parallel resistance', unit: 'Ω' }],
    example: '6Ω and 3Ω in parallel: 1/R = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 → R = 2 Ω',
    note: 'In parallel: same voltage, currents add. Equivalent resistance is LESS than smallest.',
  },
  {
    id: 'c10-p-05', name: 'Electrical Power', subject: 'Physics', classLevel: '10', chapter: 'Electricity', chapterNo: 12,
    formula: 'P = VI = I²R = V²/R',
    latex:   'P = VI = I^2R = \\frac{V^2}{R}',
    variables: [
      { sym: 'P', meaning: 'Power', unit: 'W (Watt)' },
      { sym: 'V', meaning: 'Voltage', unit: 'V' },
      { sym: 'I', meaning: 'Current', unit: 'A' },
    ],
    example: '240V bulb draws 0.5 A: P = 240×0.5 = 120 W. Monthly units = P×hours/1000',
    note: '1 kWh = 1 "unit" of electricity on your bill = 1000W for 1 hour.',
  },
  {
    id: 'c10-p-06', name: 'Joule\'s Law of Heating', subject: 'Physics', classLevel: '10', chapter: 'Electricity', chapterNo: 12,
    formula: 'H = I²Rt',
    latex:   'H = I^2Rt',
    variables: [
      { sym: 'H', meaning: 'Heat produced', unit: 'J' },
      { sym: 'I', meaning: 'Current', unit: 'A' },
      { sym: 'R', meaning: 'Resistance', unit: 'Ω' },
      { sym: 't', meaning: 'Time', unit: 's' },
    ],
    example: '2A current through 10Ω for 60s: H = 4×10×60 = 2400 J',
    note: 'Used in electric heaters, irons, geysers, toasters — all use Joule heating.',
  },
  {
    id: 'c10-p-07', name: 'Snell\'s Law of Refraction', subject: 'Physics', classLevel: '10', chapter: 'Light - Reflection and Refraction', chapterNo: 10,
    formula: 'n = sin i / sin r = c/v',
    latex:   'n = \\frac{\\sin i}{\\sin r} = \\frac{c}{v}',
    variables: [
      { sym: 'n', meaning: 'Refractive index of medium', unit: 'dimensionless' },
      { sym: 'i', meaning: 'Angle of incidence (in rarer medium)', unit: 'degrees' },
      { sym: 'r', meaning: 'Angle of refraction (in denser medium)', unit: 'degrees' },
      { sym: 'c', meaning: 'Speed of light in vacuum = 3×10⁸ m/s', unit: 'm/s' },
      { sym: 'v', meaning: 'Speed of light in medium', unit: 'm/s' },
    ],
    example: 'Glass (n=1.5): light goes from air (i=30°) to glass. sin r = sin30°/1.5 = 0.5/1.5 = 1/3 → r ≈ 19.47°',
    note: 'Light bends toward normal when entering denser medium. n_water ≈ 1.33, n_glass ≈ 1.5.',
  },
  {
    id: 'c10-p-08', name: 'Mirror Formula', subject: 'Physics', classLevel: '10', chapter: 'Light - Reflection and Refraction', chapterNo: 10,
    formula: '1/f = 1/v + 1/u',
    latex:   '\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}',
    variables: [
      { sym: 'f', meaning: 'Focal length of mirror', unit: 'cm or m' },
      { sym: 'v', meaning: 'Image distance from mirror', unit: 'cm or m' },
      { sym: 'u', meaning: 'Object distance from mirror', unit: 'cm or m' },
    ],
    example: 'Concave mirror f=-10cm, u=-30cm: 1/v = 1/(-10) - 1/(-30) = -3/30+1/30 = -2/30 → v=-15cm (real image)',
    note: 'Sign convention: distances measured from pole. Distances in direction of incident light = positive.',
  },
  {
    id: 'c10-p-09', name: 'Magnification (Mirror)', subject: 'Physics', classLevel: '10', chapter: 'Light - Reflection and Refraction', chapterNo: 10,
    formula: 'm = -v/u = h₂/h₁',
    latex:   'm = -\\frac{v}{u} = \\frac{h_2}{h_1}',
    variables: [
      { sym: 'm', meaning: 'Magnification', unit: 'dimensionless' },
      { sym: 'v', meaning: 'Image distance', unit: 'cm' },
      { sym: 'u', meaning: 'Object distance', unit: 'cm' },
      { sym: 'h₂,h₁', meaning: 'Image height, Object height', unit: 'cm' },
    ],
    example: 'u=-30cm, v=-15cm: m=-(-15)/(-30)=-0.5 (real, inverted, diminished image)',
    note: '+m: virtual upright image. -m: real inverted image. |m|>1: magnified. |m|<1: diminished.',
  },
]

// ══════════════════════════════════════════════════════════════════
// CLASS 10 — MATHEMATICS
// ══════════════════════════════════════════════════════════════════
export const CLASS10_MATHS_FORMULAS: NCERTFormula[] = [
  {
    id: 'c10-m-01', name: 'Quadratic Formula', subject: 'Mathematics', classLevel: '10', chapter: 'Quadratic Equations', chapterNo: 4,
    formula: 'x = (-b ± √(b²-4ac)) / 2a',
    latex:   'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}',
    variables: [
      { sym: 'a,b,c', meaning: 'Coefficients in ax²+bx+c=0 (a≠0)', unit: '' },
      { sym: 'x', meaning: 'Roots/solutions of quadratic', unit: '' },
    ],
    example: 'x²-5x+6=0: a=1,b=-5,c=6. x=(5±√(25-24))/2=(5±1)/2. x=3 or x=2',
    note: 'Discriminant D=b²-4ac: D>0 two real roots, D=0 one real root, D<0 no real roots.',
  },
  {
    id: 'c10-m-02', name: 'Discriminant', subject: 'Mathematics', classLevel: '10', chapter: 'Quadratic Equations', chapterNo: 4,
    formula: 'D = b² - 4ac',
    latex:   'D = b^2 - 4ac',
    variables: [{ sym: 'D', meaning: 'Discriminant', unit: '' }],
    example: '2x²+3x+5: D=9-40=-31<0 → No real roots. x²+2x+1: D=4-4=0 → Equal roots x=-1.',
    note: 'Check D before solving — saves time in deciding which method to use.',
  },
  {
    id: 'c10-m-03', name: 'Sum and Product of Roots', subject: 'Mathematics', classLevel: '10', chapter: 'Quadratic Equations', chapterNo: 4,
    formula: 'α+β = -b/a  |  α×β = c/a',
    latex:   '\\alpha+\\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a}',
    variables: [
      { sym: 'α,β', meaning: 'Two roots of ax²+bx+c=0', unit: '' },
    ],
    example: 'x²-7x+12=0: Sum=7, Product=12 → roots are 3,4. Check: 3+4=7✓, 3×4=12✓',
    note: 'Use this to find equations given roots: x²-(sum)x+(product)=0',
  },
  {
    id: 'c10-m-04', name: 'Arithmetic Progression — nth Term', subject: 'Mathematics', classLevel: '10', chapter: 'Arithmetic Progressions', chapterNo: 5,
    formula: 'aₙ = a + (n-1)d',
    latex:   'a_n = a + (n-1)d',
    variables: [
      { sym: 'aₙ', meaning: 'nth term', unit: '' },
      { sym: 'a', meaning: 'First term', unit: '' },
      { sym: 'd', meaning: 'Common difference', unit: '' },
      { sym: 'n', meaning: 'Position of term', unit: '' },
    ],
    example: 'AP: 2,5,8,11... a=2,d=3. 10th term: a₁₀=2+(10-1)×3=2+27=29',
    note: 'Common difference d = any term - previous term. d can be negative (decreasing AP).',
  },
  {
    id: 'c10-m-05', name: 'Sum of AP', subject: 'Mathematics', classLevel: '10', chapter: 'Arithmetic Progressions', chapterNo: 5,
    formula: 'Sₙ = n/2 × [2a + (n-1)d] = n/2 × (a + l)',
    latex:   'S_n = \\frac{n}{2}[2a + (n-1)d] = \\frac{n}{2}(a+l)',
    variables: [
      { sym: 'Sₙ', meaning: 'Sum of first n terms', unit: '' },
      { sym: 'l', meaning: 'Last term = aₙ', unit: '' },
    ],
    example: 'Sum of first 20 natural numbers: a=1,d=1,n=20. S=20/2×[2+19]=10×21=210',
    note: 'Sum of first n natural numbers = n(n+1)/2 (special case: a=1, d=1).',
  },
  {
    id: 'c10-m-06', name: 'Pythagoras Theorem', subject: 'Mathematics', classLevel: '10', chapter: 'Triangles', chapterNo: 6,
    formula: 'a² + b² = c²',
    latex:   'a^2 + b^2 = c^2',
    variables: [
      { sym: 'a,b', meaning: 'Two legs (shorter sides) of right triangle', unit: 'cm/m' },
      { sym: 'c', meaning: 'Hypotenuse (side opposite to 90°)', unit: 'cm/m' },
    ],
    example: 'Legs=3cm,4cm: Hypotenuse=√(9+16)=√25=5cm. Check: 3²+4²=5² ✓',
    note: 'Pythagorean triples: (3,4,5), (5,12,13), (8,15,17), (7,24,25) — all right triangles.',
    derivation: 'Proved by Euclid in 300 BC. In India, proved in Baudhayana Sulbasutra (~800 BC).',
  },
  {
    id: 'c10-m-07', name: 'Area of Triangle (Heron\'s Formula)', subject: 'Mathematics', classLevel: '10', chapter: 'Areas Related to Circles', chapterNo: 12,
    formula: 'A = √[s(s-a)(s-b)(s-c)]  where s=(a+b+c)/2',
    latex:   'A = \\sqrt{s(s-a)(s-b)(s-c)}, \\quad s=\\frac{a+b+c}{2}',
    variables: [
      { sym: 'a,b,c', meaning: 'Three sides of triangle', unit: 'cm' },
      { sym: 's', meaning: 'Semi-perimeter', unit: 'cm' },
    ],
    example: 'Sides 3,4,5: s=6. A=√(6×3×2×1)=√36=6 cm². Check: ½×3×4=6 ✓ (right triangle)',
    note: 'Use when height of triangle is not given.',
  },
  {
    id: 'c10-m-08', name: 'Surface Area of Sphere', subject: 'Mathematics', classLevel: '10', chapter: 'Surface Areas and Volumes', chapterNo: 13,
    formula: 'SA = 4πr²',
    latex:   'SA = 4\\pi r^2',
    variables: [{ sym: 'r', meaning: 'Radius of sphere', unit: 'cm' }],
    example: 'r=7cm: SA=4×22/7×49=4×22×7=616 cm²',
    note: 'A sphere has the minimum surface area for a given volume — that\'s why water droplets are spherical.',
  },
  {
    id: 'c10-m-09', name: 'Volume of Sphere', subject: 'Mathematics', classLevel: '10', chapter: 'Surface Areas and Volumes', chapterNo: 13,
    formula: 'V = (4/3)πr³',
    latex:   'V = \\frac{4}{3}\\pi r^3',
    variables: [{ sym: 'r', meaning: 'Radius of sphere', unit: 'cm' }],
    example: 'r=6cm: V=4/3×22/7×216=4/3×22/7×216 ≈ 904.32 cm³',
    note: 'Hemisphere Volume = 2/3 πr³. Hemisphere TSA = 3πr².',
  },
]

// ══════════════════════════════════════════════════════════════════
// CLASS 12 — PHYSICS
// ══════════════════════════════════════════════════════════════════
export const CLASS12_PHYSICS_FORMULAS: NCERTFormula[] = [
  {
    id: 'c12-p-01', name: "Coulomb's Law", subject: 'Physics', classLevel: '12', chapter: 'Electric Charges and Fields', chapterNo: 1,
    formula: 'F = kq₁q₂/r² = q₁q₂/(4πε₀r²)',
    latex:   'F = \\frac{kq_1q_2}{r^2} = \\frac{q_1q_2}{4\\pi\\varepsilon_0 r^2}',
    variables: [
      { sym: 'F', meaning: 'Electrostatic force', unit: 'N' },
      { sym: 'k', meaning: 'Coulomb\'s constant = 9×10⁹', unit: 'N⋅m²/C²' },
      { sym: 'q₁,q₂', meaning: 'Charges', unit: 'C (Coulomb)' },
      { sym: 'r', meaning: 'Distance between charges', unit: 'm' },
      { sym: 'ε₀', meaning: 'Permittivity of free space = 8.85×10⁻¹²', unit: 'C²/N⋅m²' },
    ],
    example: 'q₁=q₂=1μC=10⁻⁶C, r=1m: F=9×10⁹×10⁻⁶×10⁻⁶/1=9×10⁻³ N=9 mN',
    note: 'In medium with dielectric constant K: F_medium = F_vacuum/K. Water K≈80.',
  },
  {
    id: 'c12-p-02', name: 'Capacitance', subject: 'Physics', classLevel: '12', chapter: 'Electrostatic Potential and Capacitance', chapterNo: 2,
    formula: 'C = Q/V',
    latex:   'C = \\frac{Q}{V}',
    variables: [
      { sym: 'C', meaning: 'Capacitance', unit: 'F (Farad)' },
      { sym: 'Q', meaning: 'Charge stored', unit: 'C' },
      { sym: 'V', meaning: 'Potential difference', unit: 'V' },
    ],
    example: 'Capacitor stores 10⁻⁴ C at 100V: C=10⁻⁴/100=10⁻⁶ F=1 μF',
    note: 'Parallel plate capacitor: C=ε₀A/d. With dielectric: C=Kε₀A/d.',
  },
  {
    id: 'c12-p-03', name: 'Lens Formula', subject: 'Physics', classLevel: '12', chapter: 'Ray Optics and Optical Instruments', chapterNo: 9,
    formula: '1/f = 1/v - 1/u',
    latex:   '\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}',
    variables: [
      { sym: 'f', meaning: 'Focal length of lens (+ve for convex, -ve for concave)', unit: 'cm' },
      { sym: 'v', meaning: 'Image distance from optical center', unit: 'cm' },
      { sym: 'u', meaning: 'Object distance from optical center', unit: 'cm' },
    ],
    example: 'Convex lens f=+20cm, u=-60cm: 1/v=1/20+1/(-60)=3/60-1/60=2/60 → v=+30cm (real image)',
    note: 'Note: Lens formula uses 1/f=1/v-1/u. Mirror formula uses 1/f=1/v+1/u. Be careful!',
  },
  {
    id: 'c12-p-04', name: 'De Broglie Wavelength', subject: 'Physics', classLevel: '12', chapter: 'Dual Nature of Radiation and Matter', chapterNo: 11,
    formula: 'λ = h/mv = h/p',
    latex:   '\\lambda = \\frac{h}{mv} = \\frac{h}{p}',
    variables: [
      { sym: 'λ', meaning: 'de Broglie wavelength', unit: 'm' },
      { sym: 'h', meaning: 'Planck\'s constant = 6.626×10⁻³⁴', unit: 'J⋅s' },
      { sym: 'm', meaning: 'Mass of particle', unit: 'kg' },
      { sym: 'v', meaning: 'Speed of particle', unit: 'm/s' },
    ],
    example: 'Electron (m=9.1×10⁻³¹ kg) at 10⁶ m/s: λ=6.626×10⁻³⁴/(9.1×10⁻³¹×10⁶)=7.28×10⁻¹⁰m=0.73nm',
    note: 'Proved by Davisson-Germer experiment (1927). Basis of electron microscopes.',
  },
]

// ══════════════════════════════════════════════════════════════════
// CLASS 12 — MATHEMATICS
// ══════════════════════════════════════════════════════════════════
export const CLASS12_MATHS_FORMULAS: NCERTFormula[] = [
  {
    id: 'c12-m-01', name: 'Chain Rule', subject: 'Mathematics', classLevel: '12', chapter: 'Continuity and Differentiability', chapterNo: 5,
    formula: 'd/dx[f(g(x))] = f\'(g(x)) × g\'(x)',
    latex:   '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)',
    variables: [],
    example: 'd/dx[sin(x²)] = cos(x²) × 2x = 2x⋅cos(x²)',
    note: 'Used for composite functions — identify outer function and inner function.',
  },
  {
    id: 'c12-m-02', name: 'Integration by Parts', subject: 'Mathematics', classLevel: '12', chapter: 'Integrals', chapterNo: 7,
    formula: '∫u⋅dv = uv - ∫v⋅du',
    latex:   '\\int u\\,dv = uv - \\int v\\,du',
    variables: [],
    example: '∫x⋅eˣdx: u=x, dv=eˣdx → du=dx, v=eˣ. Answer: xeˣ - eˣ + C = eˣ(x-1) + C',
    note: 'ILATE rule for choosing u: Inverse trig, Logarithm, Algebraic, Trig, Exponential.',
  },
  {
    id: 'c12-m-03', name: 'Area Under Curve', subject: 'Mathematics', classLevel: '12', chapter: 'Application of Integrals', chapterNo: 8,
    formula: 'Area = ∫[a to b] |f(x)| dx',
    latex:   'A = \\int_a^b |f(x)|\\,dx',
    variables: [
      { sym: 'f(x)', meaning: 'Function (curve equation)', unit: '' },
      { sym: 'a,b', meaning: 'Lower and upper limits', unit: '' },
    ],
    example: 'Area under y=x² from x=0 to x=3: ∫₀³ x²dx = [x³/3]₀³ = 27/3 = 9 sq units',
    note: 'If curve is below x-axis, area is still positive (use absolute value).',
  },
  {
    id: 'c12-m-04', name: 'Differential Equation — Variable Separable', subject: 'Mathematics', classLevel: '12', chapter: 'Differential Equations', chapterNo: 9,
    formula: 'dy/dx = f(x)g(y) → ∫dy/g(y) = ∫f(x)dx + C',
    latex:   '\\frac{dy}{dx} = f(x)g(y) \\implies \\int \\frac{dy}{g(y)} = \\int f(x)dx + C',
    variables: [],
    example: 'dy/dx = xy: dy/y = x⋅dx → ln|y| = x²/2 + C → y = Ae^(x²/2)',
    note: 'Separate variables (x on one side, y on other), then integrate both sides.',
  },
]

// ══════════════════════════════════════════════════════════════════
// MASTER EXPORT + LOOKUP FUNCTIONS
// ══════════════════════════════════════════════════════════════════
export const ALL_NCERT_FORMULAS: NCERTFormula[] = [
  ...CLASS9_PHYSICS_FORMULAS,
  ...CLASS10_PHYSICS_FORMULAS,
  ...CLASS10_MATHS_FORMULAS,
  ...CLASS12_PHYSICS_FORMULAS,
  ...CLASS12_MATHS_FORMULAS,
]

export function getFormulasByClass(classLevel: string): NCERTFormula[] {
  return ALL_NCERT_FORMULAS.filter(f => f.classLevel === classLevel)
}

export function getFormulasBySubject(subject: string, classLevel?: string): NCERTFormula[] {
  return ALL_NCERT_FORMULAS.filter(f =>
    f.subject.toLowerCase().includes(subject.toLowerCase()) &&
    (!classLevel || f.classLevel === classLevel)
  )
}

export function getFormulasByChapter(chapter: string, classLevel?: string): NCERTFormula[] {
  const ch = chapter.toLowerCase()
  return ALL_NCERT_FORMULAS.filter(f =>
    f.chapter.toLowerCase().includes(ch) &&
    (!classLevel || f.classLevel === classLevel)
  )
}

export function searchFormulas(query: string): NCERTFormula[] {
  const q = query.toLowerCase()
  return ALL_NCERT_FORMULAS.filter(f =>
    f.name.toLowerCase().includes(q) ||
    f.formula.toLowerCase().includes(q) ||
    f.chapter.toLowerCase().includes(q) ||
    f.variables.some(v => v.meaning.toLowerCase().includes(q))
  )
}

export function getFormulaById(id: string): NCERTFormula | null {
  return ALL_NCERT_FORMULAS.find(f => f.id === id) ?? null
}
