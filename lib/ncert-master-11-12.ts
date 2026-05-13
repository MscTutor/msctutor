// lib/ncert-master-11-12.ts
// Class 11 & 12 Rich Chapter Content — Physics, Chemistry, Maths, Biology, Commerce

import type { ClassData } from './ncert-master'

export const CLASS11: ClassData = {
  classLevel: '11', label: 'Class 11', board: ['CBSE','ICSE'],
  description: 'Foundation for engineering/medical/commerce — Board + JEE/NEET/CA prep',
  subjects: [
    {
      slug: 'physics', name: 'Physics', icon: '🔬', color: '#0369a1', bg: '#eff6ff',
      description: 'Mechanics, thermodynamics, waves, optics — Class 11 complete',
      chapters: [
        {
          id: 'c11p3', chapterNo: 3, title: 'Motion in a Straight Line',
          description: 'Kinematics — position, velocity, acceleration, equations of motion and graphs.',
          topics: [
            { title: 'Position, Path Length and Displacement', content: 'Position: location of object w.r.t. reference point (origin). Path length (distance): total length of actual path — scalar, always positive. Displacement: change in position = final - initial position — vector, can be +ve, -ve or zero. Example: Run 4m east then 3m west: path=7m, displacement=1m east.' },
            { title: 'Average and Instantaneous Velocity', content: 'Average velocity = total displacement / total time. Average speed = total distance / total time. These can be different! Instantaneous velocity = velocity at a specific instant = limit of average velocity as Δt→0 = dx/dt (derivative of position w.r.t. time). Speedometer shows instantaneous speed.' },
            { title: 'Uniform and Non-uniform Acceleration', content: 'Acceleration a = dv/dt = rate of change of velocity. Uniform acceleration: same acceleration throughout (free fall, object on inclined plane). Non-uniform: acceleration changes (car in traffic). Positive acceleration: speeding up in +ve direction. Negative acceleration (retardation): slowing down.' },
            { title: 'Kinematic Equations and Graphs', content: 'For uniform acceleration: v=u+at, s=ut+½at², v²=u²+2as, s_nth=u+a(2n-1)/2. x-t graph: slope=velocity. v-t graph: slope=acceleration, area=displacement. a-t graph: area=change in velocity. These equations ONLY apply when acceleration is constant.' },
          ],
          formulas: [
            { name: '1st Equation of Motion', formula: 'v = u + at', example: 'u=10m/s, a=5m/s², t=4s: v=10+5×4=30 m/s', note: 'u=initial velocity, v=final velocity' },
            { name: '2nd Equation of Motion', formula: 's = ut + ½at²', example: 'u=0, a=10, t=3: s=0+½×10×9=45 m' },
            { name: '3rd Equation of Motion', formula: 'v² = u² + 2as', example: 'u=0, a=10, s=20: v²=400, v=20 m/s' },
            { name: 'Distance in nth second', formula: 'sₙ = u + a(2n-1)/2', example: 'u=0, a=10, n=3: s₃=0+10×5/2=25 m', note: 'Distance in the nth second (not total)' },
            { name: 'Average Velocity', formula: 'v_avg = (u+v)/2  [only for uniform acceleration]', example: 'u=10, v=30: avg=20 m/s' },
          ],
          experiments: [
            {
              title: 'Verify 2nd Equation of Motion Using Free Fall',
              objective: 'Verify s = ut + ½gt² for a freely falling object',
              materials: ['Ball bearing', 'Electromagnet (to hold ball)', 'Ticker tape timer', 'Power supply 6V AC', 'Ruler', 'Scale'],
              steps: [
                'Connect ticker tape to ball bearing',
                'Hold ball with electromagnet at height h from ground',
                'Connect tape through ticker timer (50 dots/sec)',
                'Switch off electromagnet — ball falls, tape records motion',
                'Measure distance between dot 1 and each successive dot',
                'Distances should increase as: 1:3:5:7:9... (odd number ratio) for free fall',
                'Plot s vs t² — should give straight line through origin. Slope = ½g ≈ 4.9 m/s²',
              ],
              result: 's ∝ t² confirms s = ½gt² (u=0 for free fall). Slope gives g ≈ 9.8 m/s².',
              safetyNote: 'Use low voltage (6V AC) for ticker timer. Ensure ball drops safely without hitting anyone.',
            },
          ],
          videos: [
            { title: 'Motion in Straight Line Class 11 Physics', url: 'https://www.youtube.com/embed/FEF6PxB6x6U', duration: '35 min', source: 'Education' },
            { title: 'Equations of Motion Derivation and Problems', url: 'https://www.youtube.com/embed/2I_EpX23gXU', duration: '20 min', source: 'Khan Academy' },
            { title: 'Velocity Time Graphs - Class 11', url: 'https://www.youtube.com/embed/foT5dCAFy9k', duration: '18 min', source: 'Physics Ed' },
          ],
          keyTerms: ['Displacement', 'Velocity', 'Acceleration', 'Uniform motion', 'Kinematics', 'Retardation', 'Instantaneous velocity', 'x-t graph', 'v-t graph'],
          quickFacts: ['Galileo first proved all objects fall at same rate (ignoring air resistance) by dropping from Leaning Tower of Pisa', 'g = 9.8 m/s² — standard acceleration due to gravity', 'A ball thrown upward has same acceleration (g downward) throughout'],
          vedicTricks: [
            { trick: 'Odd number rule for free fall: distances in consecutive seconds are in ratio 1:3:5:7...', example: '1st sec: 5m, 2nd: 15m, 3rd: 25m (ratio 1:3:5). Quick verification!' },
          ],
        },
        {
          id: 'c11p8', chapterNo: 8, title: 'Gravitation',
          description: "Newton's law of gravitation, Kepler's laws, orbital velocity, escape velocity and satellites.",
          topics: [
            { title: "Newton's Universal Law of Gravitation", content: 'Every object attracts every other object with a force directly proportional to product of masses and inversely proportional to square of distance. F = Gm₁m₂/r². G = 6.674×10⁻¹¹ N⋅m²/kg² (gravitational constant). This force acts along the line joining the two objects. It\'s always attractive, never repulsive.' },
            { title: "Kepler's Laws of Planetary Motion", content: '1st Law (Law of Orbits): Planets move in elliptical orbits with Sun at one focus. 2nd Law (Law of Areas): Line joining planet to Sun sweeps equal areas in equal times (planet moves faster when closer to Sun). 3rd Law (Law of Periods): T² ∝ r³. Square of time period is proportional to cube of semi-major axis.' },
            { title: 'Acceleration due to Gravity', content: 'g = GM/R² (at Earth\'s surface). g = 9.8 m/s² at surface. Variation: g decreases as height increases (g_h = g(R/(R+h))²). g decreases inside Earth (g_d = g(1-d/R)). g is maximum at poles, minimum at equator (due to rotation and shape). g on Moon = g_Earth/6 ≈ 1.6 m/s².' },
            { title: 'Orbital and Escape Velocity', content: 'Orbital velocity: minimum velocity for satellite to orbit (gravitational force = centripetal force): v_o = √(GM/r) = √(gR²/r). For orbit just above Earth: v_o ≈ 7.9 km/s. Escape velocity: minimum velocity to escape Earth\'s gravity: v_e = √(2GM/R) = √(2gR) ≈ 11.2 km/s = √2 × v_o.' },
          ],
          formulas: [
            { name: 'Universal Gravitation', formula: 'F = Gm₁m₂/r²', example: 'Earth-Moon force: G×6×10²⁴×7.3×10²²/(3.8×10⁸)² ≈ 2×10²⁰ N', note: 'G = 6.674×10⁻¹¹ N⋅m²/kg²' },
            { name: 'g at surface', formula: 'g = GM/R²', example: 'M=6×10²⁴kg, R=6.4×10⁶m: g=6.67×10⁻¹¹×6×10²⁴/(6.4×10⁶)² ≈ 9.8 m/s²' },
            { name: 'g at height h', formula: 'g_h = g(R/(R+h))² ≈ g(1-2h/R) for h<<R', example: 'At h=R: g_h = g/4. At h=2R: g_h = g/9' },
            { name: 'Orbital Velocity', formula: 'v_o = √(GM/r) = √(gR²/r)', example: 'Near Earth surface (r≈R): v_o = √(9.8×6.4×10⁶) ≈ 7920 m/s ≈ 7.9 km/s' },
            { name: 'Escape Velocity', formula: 'v_e = √(2GM/R) = √(2gR) = √2 × v_o', example: 'v_e = √(2×9.8×6.4×10⁶) ≈ 11,200 m/s ≈ 11.2 km/s' },
            { name: "Kepler's 3rd Law", formula: 'T² ∝ r³  →  T₁²/T₂² = r₁³/r₂³', example: 'Earth: T=1yr, r=1AU. Mars: r=1.52AU → T²=1.52³=3.51 → T=1.88 years' },
          ],
          experiments: [],
          videos: [
            { title: 'Gravitation Class 11 Complete Chapter', url: 'https://www.youtube.com/embed/O1VY5zoBxu8', duration: '45 min', source: 'Education' },
            { title: "Kepler's Laws Simply Explained", url: 'https://www.youtube.com/embed/D6gKNVDGxK0', duration: '18 min', source: 'Khan Academy' },
            { title: 'Orbital Velocity vs Escape Velocity', url: 'https://www.youtube.com/embed/ZFDGjsH4xnY', duration: '15 min', source: 'Physics Ed' },
          ],
          keyTerms: ['Gravitation', 'G (constant)', 'g (acceleration)', 'Kepler\'s laws', 'Orbital velocity', 'Escape velocity', 'Satellite', 'Ellipse', 'Semi-major axis'],
          quickFacts: ['ISS orbits Earth at 7.66 km/s at 408 km height', 'Moon stays in orbit because it\'s in free fall — always "missing" Earth', 'Black holes have escape velocity > speed of light (3×10⁸ m/s)!', 'Voyager 1 (launched 1977) exceeded escape velocity and is now in interstellar space'],
        },
      ]
    },
    {
      slug: 'mathematics', name: 'Mathematics', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Sets, functions, trigonometry, complex numbers, calculus — Class 11',
      chapters: [
        {
          id: 'c11math3', chapterNo: 3, title: 'Trigonometric Functions',
          description: 'Radian measure, all 6 trig functions, identities, graphs and solutions of equations.',
          topics: [
            { title: 'Radian Measure', content: 'Radian is the SI unit of angle. 1 radian = angle subtended at center by arc equal to radius. π radians = 180°. Conversion: radians = degrees × π/180. Degrees = radians × 180/π. Key values: 0°=0, 30°=π/6, 45°=π/4, 60°=π/3, 90°=π/2, 180°=π, 270°=3π/2, 360°=2π.' },
            { title: '6 Trigonometric Functions', content: 'For angle θ in right triangle: sin=P/H, cos=B/H, tan=P/B=sin/cos. Reciprocals: cosec=1/sin=H/P, sec=1/cos=H/B, cot=1/tan=B/P. For angles beyond 90°: use CAST rule. Quadrant I: all +ve. Quadrant II: only sin,cosec +ve. Quadrant III: only tan,cot +ve. Quadrant IV: only cos,sec +ve.' },
            { title: 'Trigonometric Identities', content: 'Pythagorean: sin²θ+cos²θ=1, 1+tan²θ=sec²θ, 1+cot²θ=cosec²θ. Sum/difference: sin(A±B)=sinAcosB±cosAsinB. cos(A±B)=cosAcosB∓sinAsinB. tan(A+B)=(tanA+tanB)/(1-tanAtanB). Double angle: sin2A=2sinAcosA. cos2A=cos²A-sin²A=1-2sin²A=2cos²A-1.' },
            { title: 'Graphs of Trig Functions', content: 'sin x: range [-1,1], period 2π, starts at 0. cos x: range [-1,1], period 2π, starts at 1. tan x: range (-∞,∞), period π, undefined at π/2+nπ. Period of sin(ax+b): 2π/|a|. Amplitude of a⋅sin(x): |a|. These are wave functions used in physics, engineering, music.' },
          ],
          formulas: [
            { name: 'Fundamental Identity', formula: 'sin²θ + cos²θ = 1', example: 'If sinθ=3/5: cosθ=√(1-9/25)=4/5', note: 'Most important — used in almost every problem' },
            { name: 'Sum Formulas', formula: 'sin(A+B) = sinAcosB + cosAsinB\ncos(A+B) = cosAcosB - sinAsinB', example: 'sin75° = sin(45°+30°) = (1/√2)(√3/2)+(1/√2)(1/2) = (√3+1)/(2√2)' },
            { name: 'Double Angle', formula: 'sin2A = 2sinAcosA\ncos2A = cos²A - sin²A = 1-2sin²A', example: 'sin60°=sin(2×30°)=2×sin30°×cos30°=2×(1/2)×(√3/2)=√3/2 ✓' },
            { name: 'Product to Sum', formula: '2sinAcosB = sin(A+B) + sin(A-B)', example: '2sin75°cos15° = sin90°+sin60° = 1+√3/2' },
          ],
          experiments: [],
          videos: [
            { title: 'Trigonometric Functions Class 11 - Complete', url: 'https://www.youtube.com/embed/Q2eyqX7XLGI', duration: '40 min', source: 'Education' },
            { title: 'All Trig Identities - Master Class', url: 'https://www.youtube.com/embed/PUB0TaZ7bhA', duration: '30 min', source: 'Math Ed' },
          ],
          keyTerms: ['Radian', 'sin', 'cos', 'tan', 'cosec', 'sec', 'cot', 'CAST rule', 'Period', 'Amplitude', 'Identity'],
          quickFacts: ['The word "sine" comes from Arabic "jayb" which was mistranslated from Sanskrit "jya"', 'Fourier showed ANY wave can be made from trig functions', 'GPS uses trig identities to calculate your exact location'],
          vedicTricks: [
            { trick: 'Remember sin values: √0/2, √1/2, √2/2, √3/2, √4/2 for 0°,30°,45°,60°,90°', example: 'sin30°=√1/2=1/2, sin45°=√2/2=1/√2, sin60°=√3/2. Cos is reverse order!' },
          ],
        },
      ]
    },
    {
      slug: 'chemistry', name: 'Chemistry', icon: '🧪', color: '#7c3aed', bg: '#f5f3ff',
      description: 'Basic concepts, atomic structure, bonding, thermodynamics, equilibrium — Class 11',
      chapters: [
        {
          id: 'c11c7', chapterNo: 7, title: 'Equilibrium',
          description: 'Physical and chemical equilibrium, law of mass action, Le Chatelier\'s principle, pH, buffers.',
          topics: [
            { title: 'Concept of Equilibrium', content: 'Dynamic equilibrium: forward and reverse reactions occur at equal rates. Concentrations of reactants and products remain CONSTANT (not equal). Equilibrium is dynamic — both reactions still happening. Reached in closed system. Symbol ⇌ shows reversible reaction. Example: N₂ + 3H₂ ⇌ 2NH₃.' },
            { title: 'Equilibrium Constants Kc and Kp', content: 'For aA + bB ⇌ cC + dD: Kc = [C]^c[D]^d / [A]^a[B]^b. Square brackets = molar concentration at equilibrium. Kp uses partial pressures: Kp = Kc(RT)^Δn where Δn = moles of products - moles of reactants. Large K: equilibrium favours products. Small K: favours reactants.' },
            { title: "Le Chatelier's Principle", content: 'If a system at equilibrium is disturbed, it shifts in the direction that reduces the disturbance. Increase concentration of reactant → shifts forward. Increase concentration of product → shifts backward. Increase pressure → shifts toward fewer moles of gas. Increase temperature → shifts in endothermic direction. Catalyst: speeds up reaching equilibrium, does NOT change K or shift position.' },
            { title: 'Ionic Equilibrium and pH', content: 'Weak acids partially dissociate: HA ⇌ H⁺ + A⁻. Ka = [H⁺][A⁻]/[HA]. pH = -log[H⁺]. pOH = -log[OH⁻]. pH + pOH = 14 at 25°C. Strong acids: HCl, H₂SO₄, HNO₃ (fully dissociate). Weak acids: CH₃COOH, H₂CO₃ (partially dissociate). Buffer: resists pH change (weak acid + its salt).' },
          ],
          formulas: [
            { name: 'Equilibrium Constant', formula: 'Kc = [C]^c[D]^d / [A]^a[B]^b', example: 'N₂+3H₂⇌2NH₃: Kc = [NH₃]²/[N₂][H₂]³', note: 'Only include aqueous and gaseous species; not pure solids/liquids' },
            { name: 'Kp and Kc Relation', formula: 'Kp = Kc(RT)^Δn', example: 'N₂+3H₂⇌2NH₃: Δn=2-4=-2, so Kp=Kc(RT)⁻²' },
            { name: 'pH Definition', formula: 'pH = -log[H⁺]  |  [H⁺][OH⁻] = 10⁻¹⁴ at 25°C', example: '[H⁺]=10⁻³: pH=3 (acidic). [H⁺]=10⁻¹¹: pH=11 (basic)' },
            { name: 'Henderson-Hasselbalch', formula: 'pH = pKa + log([A⁻]/[HA])', example: 'Acetate buffer: pH=4.74+log([CH₃COO⁻]/[CH₃COOH])', note: 'Used for buffer pH calculation' },
          ],
          experiments: [
            {
              title: 'Demonstrating Le Chatelier\'s Principle with Iron Thiocyanate',
              objective: 'Show how equilibrium shifts when concentration is changed',
              materials: ['0.1M Fe(NO₃)₃ solution', '0.1M KSCN solution', 'Distilled water', '5 test tubes', 'Dropper'],
              steps: [
                'Mix 1mL Fe³⁺ and 1mL SCN⁻ → deep red color forms (FeSCN²⁺ at equilibrium)',
                'Divide into 5 equal portions in test tubes',
                'Tube 1: add more Fe³⁺ solution → observe color change',
                'Tube 2: add more SCN⁻ solution → observe',
                'Tube 3: add more FeSCN²⁺ (product) → observe',
                'Tube 4: add Na₂HPO₄ (removes Fe³⁺) → observe',
                'Tube 5: keep as control for comparison',
              ],
              result: 'Adding Fe³⁺ or SCN⁻ deepens red (shifts forward). Adding product or removing reactant lightens color (shifts backward). Confirms Le Chatelier\'s Principle!',
              safetyNote: 'SCN⁻ is toxic — avoid contact with skin. Dispose in proper waste container.',
            },
          ],
          videos: [
            { title: 'Chemical Equilibrium Class 11 Chemistry', url: 'https://www.youtube.com/embed/k-u7F9yoBKE', duration: '38 min', source: 'Education' },
            { title: "Le Chatelier's Principle - All Cases", url: 'https://www.youtube.com/embed/4-fEvpVnqfE', duration: '22 min', source: 'Khan Academy' },
          ],
          keyTerms: ['Equilibrium', 'Kc', 'Kp', 'Le Chatelier', 'pH', 'pOH', 'Buffer', 'Ka', 'Kb', 'Strong acid', 'Weak acid'],
          quickFacts: ['Blood pH = 7.35-7.45. Even 0.1 change causes serious illness', 'Industrial Haber process uses Le Chatelier principle to maximize NH₃ yield', 'Ocean is slowly becoming more acidic (pH dropping) due to CO₂ absorption'],
        },
      ]
    },
  ]
}

export const CLASS12: ClassData = {
  classLevel: '12', label: 'Class 12', board: ['CBSE','ICSE'],
  description: 'Board exam year + JEE/NEET/CA foundation — Complete preparation',
  subjects: [
    {
      slug: 'physics', name: 'Physics', icon: '🔬', color: '#0369a1', bg: '#eff6ff',
      description: 'Electrostatics, current, magnetism, optics, modern physics — Class 12',
      chapters: [
        {
          id: 'c12p1', chapterNo: 1, title: 'Electric Charges and Fields',
          description: 'Coulomb\'s law, electric field, field lines, Gauss\'s law and their applications.',
          topics: [
            { title: 'Electric Charge', content: 'Charge is a fundamental property of matter. Two types: positive (protons) and negative (electrons). Like charges repel, unlike attract. Charge is quantized: q = ne (n is integer, e = 1.6×10⁻¹⁹ C). Charge is conserved: total charge in isolated system is constant. SI unit: Coulomb (C). 1 C is very large — typical charges are μC or nC.' },
            { title: "Coulomb's Law", content: 'Force between two point charges: F = kq₁q₂/r². k = 1/(4πε₀) = 9×10⁹ N⋅m²/C². ε₀ = 8.85×10⁻¹² C²/N⋅m² (permittivity of free space). Force is along line joining charges. In medium with dielectric constant K: F = kq₁q₂/(Kr²). Superposition principle: net force on a charge = vector sum of forces due to all other charges.' },
            { title: 'Electric Field', content: 'Electric field E = force per unit positive test charge = F/q₀. E = kq/r² due to point charge. Direction: away from +ve charge, toward -ve charge. SI unit: N/C or V/m. Electric field lines: tangent gives direction, density gives magnitude. Lines go from +ve to -ve. Never cross each other.' },
            { title: "Gauss's Law", content: 'Total electric flux through any closed surface = total charge enclosed / ε₀. φ_E = Q_enclosed/ε₀. Flux = E⋅A⋅cosθ. Applications: (1) Field of uniformly charged sphere = kQ/r² (outside). (2) Field of infinite line charge = λ/(2πε₀r). (3) Field of infinite plane = σ/(2ε₀). Gauss\'s law simplifies calculation when symmetry exists.' },
          ],
          formulas: [
            { name: "Coulomb's Law", formula: 'F = kq₁q₂/r² = q₁q₂/(4πε₀r²)', example: 'q₁=q₂=1μC, r=1m: F=9×10⁹×10⁻⁶×10⁻⁶/1=9×10⁻³ N=9 mN', note: 'k = 9×10⁹ N⋅m²/C²' },
            { name: 'Electric Field', formula: 'E = F/q₀ = kq/r² (point charge)', example: 'q=1μC, r=0.1m: E=9×10⁹×10⁻⁶/0.01=9×10⁶ N/C', note: 'q₀ is positive test charge' },
            { name: "Gauss's Law", formula: 'φ = ∮E⃗⋅dA⃗ = Q_enc/ε₀', example: 'Charge Q inside sphere of any radius: φ = Q/ε₀ (same for any closed surface!)' },
            { name: 'Field due to Line Charge', formula: 'E = λ/(2πε₀r)', example: 'λ=1μC/m, r=0.1m: E=10⁻⁶/(2π×8.85×10⁻¹²×0.1)=1.8×10⁵ N/C' },
          ],
          experiments: [],
          videos: [
            { title: 'Electric Charges and Fields - Class 12', url: 'https://www.youtube.com/embed/mdulzEfQXDE', duration: '40 min', source: 'Education' },
            { title: "Coulomb's Law and Gauss's Law", url: 'https://www.youtube.com/embed/Q1apST04Aqw', duration: '28 min', source: 'Khan Academy' },
          ],
          keyTerms: ['Charge', 'Coulomb', 'Electric field', 'Field lines', 'Flux', 'Gauss\'s law', 'Permittivity', 'Superposition', 'Dielectric'],
          quickFacts: ['Lightning carries ~1 billion volts but only ~5 coulombs of charge', 'Your hair stands up due to electrostatic repulsion of like charges on each strand', 'Photocopiers and laser printers work using electrostatic attraction'],
          vedicTricks: [
            { trick: 'Remember k = 9×10⁹: "Nine nines" — k = 9×10⁹ N⋅m²/C²', example: 'F = 9×10⁹ × q₁q₂/r². Keep 9×10⁹ memorized for all numericals!' },
          ],
        },
        {
          id: 'c12p10', chapterNo: 10, title: 'Wave Optics',
          description: "Huygens' principle, interference, Young's double slit experiment, diffraction, polarization.",
          topics: [
            { title: "Huygens' Wave Theory", content: "Every point on a wavefront acts as a source of secondary wavelets. The new wavefront is the tangent to all secondary wavelets. Explains: reflection, refraction, interference, diffraction — things that particle theory of light CANNOT explain. Speed of light in medium = c/n where n = refractive index. λ_medium = λ_vacuum/n." },
            { title: 'Interference of Light', content: 'When two coherent light waves meet, they superpose. Constructive interference: path difference = nλ → bright fringe. Destructive interference: path difference = (2n+1)λ/2 → dark fringe. Coherent sources: same frequency, constant phase difference. White light: colored fringes because different λ diffract differently.' },
            { title: "Young's Double Slit Experiment (YDSE)", content: 'Two slits S₁ and S₂ separated by d, screen at distance D. Fringe width β = λD/d. Position of nth bright fringe: y_n = nλD/d. Position of nth dark fringe: y_n = (2n-1)λD/2d. Angular fringe width = λ/d. Fringe pattern: alternating bright and dark bands of equal width.' },
            { title: 'Diffraction and Polarization', content: 'Diffraction: bending of light around obstacles/slits. Single slit: central bright maximum (widest), secondary maxima. Condition for dark fringe: a sinθ = nλ (a=slit width). Polarization: transverse nature of light. Polaroid transmits only one plane of vibration. Brewster\'s law: tanθ_B = n (θ_B = polarizing angle).' },
          ],
          formulas: [
            { name: 'YDSE Fringe Width', formula: 'β = λD/d', example: 'λ=600nm, D=1m, d=0.3mm: β=600×10⁻⁹×1/(3×10⁻⁴)=2×10⁻³m=2mm', note: 'β = distance between consecutive bright (or dark) fringes' },
            { name: 'Path Difference', formula: 'Bright: Δ=nλ (n=0,±1,±2...) | Dark: Δ=(2n+1)λ/2', example: 'For 3rd bright fringe: Δ=3λ. For 2nd dark: Δ=3λ/2' },
            { name: 'Intensity Pattern', formula: 'I = 4I₀cos²(δ/2) where δ = phase difference = 2πΔ/λ', example: 'At bright fringe: δ=0,2π: I=4I₀ (maximum)' },
            { name: "Brewster's Law", formula: 'tan(θ_B) = n (refractive index)', example: 'Glass n=1.5: θ_B=arctan(1.5)=56.3°' },
          ],
          experiments: [
            {
              title: "Young's Double Slit Experiment",
              objective: 'Observe interference pattern and measure fringe width',
              materials: ['Laser pointer (red, 650nm)', 'Double slit card (d≈0.25mm)', 'White screen', 'Ruler', 'Dark room'],
              steps: [
                'Set up laser → double slit → screen (distance D=1-2m)',
                'Switch on laser — observe bright and dark fringes on screen',
                'Count 10 fringe widths from center, measure total distance',
                'β = total distance / 10',
                'Calculate λ using β = λD/d → λ = βd/D',
                'Compare with known λ=650nm for red laser',
              ],
              result: 'Fringe pattern clearly visible. Calculated λ ≈ 650nm ± 5% confirming wave nature of light.',
              safetyNote: 'NEVER look directly into laser beam. Point away from people.',
            },
          ],
          videos: [
            { title: 'Wave Optics Class 12 - Complete Chapter', url: 'https://www.youtube.com/embed/Iuv6hY6zsd0', duration: '48 min', source: 'Education' },
            { title: "Young's Double Slit Experiment - Derivation", url: 'https://www.youtube.com/embed/eaS8WGmBvyQ', duration: '20 min', source: 'Physics Ed' },
          ],
          keyTerms: ['Wavefront', 'Coherent', 'Interference', 'Fringe width', 'YDSE', 'Diffraction', 'Polarization', 'Brewster\'s law', 'Huygens'],
          quickFacts: ['Soap bubble colors are due to interference of light waves', 'CDs and DVDs use diffraction to store data', 'Polarized sunglasses reduce glare by blocking polarized reflected light'],
        },
      ]
    },
    {
      slug: 'mathematics', name: 'Mathematics', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Matrices, calculus, vectors, 3D geometry, probability — Class 12 Board',
      chapters: [
        {
          id: 'c12m6', chapterNo: 6, title: 'Application of Derivatives',
          description: 'Rate of change, increasing/decreasing functions, maxima, minima, tangents and normals.',
          topics: [
            { title: 'Rate of Change', content: 'dy/dx represents rate of change of y w.r.t. x. If y=f(t), dy/dt is rate of change w.r.t. time. Examples: velocity = ds/dt (rate of change of displacement). Acceleration = dv/dt. Rate of change of area: dA/dt = dA/dr × dr/dt. Chain rule is key for related rates.' },
            { title: 'Increasing and Decreasing Functions', content: 'f is increasing on interval if f\'(x) > 0 for all x in interval. f is decreasing if f\'(x) < 0. f is constant if f\'(x) = 0. Critical points: where f\'(x) = 0 or undefined. Method: find f\'(x), set = 0, find critical points, check sign of f\'(x) in each interval.' },
            { title: 'Tangents and Normals', content: 'Slope of tangent to y=f(x) at point (x₁,y₁): m = f\'(x₁). Equation of tangent: y-y₁ = m(x-x₁). Normal is perpendicular to tangent: slope of normal = -1/m. Equation of normal: y-y₁ = (-1/m)(x-x₁). If tangent is horizontal: m=0. If tangent is vertical: m=undefined (normal is horizontal).' },
            { title: 'Maxima and Minima', content: 'Local maximum: f\'(x)=0 and f\'\'(x)<0. Local minimum: f\'(x)=0 and f\'\'(x)>0. If f\'\'(x)=0: use first derivative test. Global/absolute maxima: largest value in given interval — check at critical points AND endpoints. Applications: maximizing area/profit/volume, minimizing cost/distance/material.' },
          ],
          formulas: [
            { name: 'Slope of Tangent', formula: 'm = dy/dx|_(x₁,y₁) = f\'(x₁)', example: 'y=x³-2x at (1,-1): m=3x²-2|_{x=1}=3-2=1. Tangent: y+1=1(x-1)→y=x-2' },
            { name: 'Equation of Normal', formula: 'y - y₁ = (-1/m)(x - x₁)  where m = f\'(x₁)', example: 'At (1,-1) with m=1: Normal: y+1=-1(x-1)→y=-x' },
            { name: '2nd Derivative Test', formula: 'f\'(x₀)=0 AND f\'\'(x₀)<0 → local max | f\'\'(x₀)>0 → local min', example: 'f(x)=x²-4x+3: f\'=2x-4=0→x=2. f\'\'=2>0 → local min at x=2, f(2)=-1' },
            { name: 'Related Rates', formula: 'Use chain rule: dV/dt = dV/dr × dr/dt', example: 'Sphere: V=4πr³/3 → dV/dt=4πr²×dr/dt. Given dr/dt=2cm/s at r=5: dV/dt=4π×25×2=200π cm³/s' },
          ],
          experiments: [],
          videos: [
            { title: 'Application of Derivatives Class 12 - Complete', url: 'https://www.youtube.com/embed/F1hZ_jOV6Rs', duration: '50 min', source: 'Education' },
            { title: 'Maxima Minima - All Methods Class 12', url: 'https://www.youtube.com/embed/pvLj1s7SOtk', duration: '35 min', source: 'Math Ed' },
          ],
          keyTerms: ['Derivative', 'Rate of change', 'Increasing', 'Decreasing', 'Tangent', 'Normal', 'Maxima', 'Minima', 'Critical point', 'Second derivative test'],
          quickFacts: ['Google uses calculus derivatives to optimize search algorithms', 'Economics uses derivatives to find maximum profit and minimum cost', 'Engineering uses derivatives to find maximum stress before structural failure'],
          vedicTricks: [
            { trick: 'For quadratic ax²+bx+c: vertex (max/min) at x=-b/2a directly', example: 'x²-6x+8: vertex at x=6/2=3, min value=9-18+8=-1. No need to use derivative!' },
          ],
        },
        {
          id: 'c12m13', chapterNo: 13, title: 'Probability',
          description: 'Conditional probability, multiplication theorem, Bayes\' theorem, random variables, binomial distribution.',
          topics: [
            { title: 'Conditional Probability', content: 'P(A|B) = probability of A given B has occurred = P(A∩B)/P(B), where P(B)>0. Reduces sample space to events consistent with B. Example: P(even number | >2) on a die: favorable = {4,6}, total from >2 is {3,4,5,6}, so P = 2/4 = 1/2.' },
            { title: 'Multiplication Theorem', content: 'P(A∩B) = P(A) × P(B|A) = P(B) × P(A|B). For independent events: P(A∩B) = P(A) × P(B). Events A and B are independent if: P(A|B) = P(A) or P(B|A) = P(B). Mutually exclusive vs independent: ME means P(A∩B)=0, independent means P(A∩B)=P(A)P(B).' },
            { title: "Bayes' Theorem", content: 'P(Aᵢ|B) = P(Aᵢ)P(B|Aᵢ) / Σⱼ P(Aⱼ)P(B|Aⱼ). Used for: medical diagnosis (P(disease|+test)), quality control, spam filters. Partition theorem: P(B) = ΣP(B|Aᵢ)P(Aᵢ). Example: 3 boxes with different compositions — which box was a ball drawn from?' },
            { title: 'Random Variables and Binomial Distribution', content: 'Random variable X assigns numerical value to each outcome. Mean (expectation) E(X)=Σx⋅P(X=x). Variance V(X)=E(X²)-[E(X)]². Binomial distribution: n trials, each with success probability p. P(X=r) = ⁿCᵣ × pʳ × (1-p)^(n-r). Mean = np. Variance = npq where q=1-p. Used in: coin tosses, quality testing, genetics.' },
          ],
          formulas: [
            { name: 'Conditional Probability', formula: 'P(A|B) = P(A∩B) / P(B)', example: 'P(A∩B)=0.12, P(B)=0.4: P(A|B)=0.12/0.4=0.3' },
            { name: "Bayes' Theorem", formula: 'P(Aᵢ|B) = P(Aᵢ)P(B|Aᵢ) / Σ P(Aⱼ)P(B|Aⱼ)', example: 'Classic problem: factory machines producing defective items' },
            { name: 'Binomial Distribution', formula: 'P(X=r) = ⁿCᵣ pʳ qⁿ⁻ʳ  |  Mean=np  |  Variance=npq', example: 'Coin tossed 5 times: P(3 heads)=⁵C₃×(1/2)³×(1/2)²=10/32=5/16' },
            { name: 'Total Probability', formula: 'P(B) = Σᵢ P(B|Aᵢ)×P(Aᵢ)', example: 'Used when event B can happen via multiple paths A₁, A₂, A₃...' },
          ],
          experiments: [],
          videos: [
            { title: 'Probability Class 12 - Bayes Theorem', url: 'https://www.youtube.com/embed/HZGCoVF3YvM', duration: '40 min', source: 'Education' },
            { title: 'Binomial Distribution - Complete Chapter', url: 'https://www.youtube.com/embed/qIzC1-9PwQo', duration: '28 min', source: 'Math Ed' },
          ],
          keyTerms: ['Conditional probability', 'Independence', 'Multiplication theorem', 'Bayes\' theorem', 'Random variable', 'Binomial distribution', 'Mean', 'Variance'],
          quickFacts: ['Bayes\' theorem is the foundation of modern AI and machine learning!', 'Insurance companies use probability to calculate premiums', 'Google PageRank uses probabilistic Markov chains'],
          vedicTricks: [
            { trick: 'For binomial mean and variance: mean=np, variance=npq, SD=√(npq). Quick calculation!', example: 'n=100, p=0.3: mean=30, variance=21, SD=√21≈4.58' },
          ],
        },
      ]
    },
    {
      slug: 'biology', name: 'Biology', icon: '🧬', color: '#0a5e3f', bg: '#e8f5ef',
      description: 'Reproduction, genetics, evolution, ecology, biotechnology — Class 12',
      chapters: [
        {
          id: 'c12b6', chapterNo: 6, title: 'Molecular Basis of Inheritance',
          description: 'DNA structure, replication, transcription, translation, genetic code and gene expression.',
          topics: [
            { title: 'DNA Structure (Watson-Crick Model)', content: 'DNA is double helix — two polynucleotide chains wound around each other. Each nucleotide: deoxyribose sugar + phosphate + nitrogenous base. Bases: Purines (Adenine, Guanine) and Pyrimidines (Cytosine, Thymine). Base pairing: A=T (2 H-bonds), G≡C (3 H-bonds). Chargaff\'s rule: %A=%T, %G=%C. Chains are antiparallel: one 5\'→3\', other 3\'→5\'.' },
            { title: 'DNA Replication (Semi-conservative)', content: 'Proven by Meselson-Stahl experiment (1958) using ¹⁵N and ¹⁴N. Each new DNA has one old and one new strand. Enzymes: Helicase (unwinds), DNA Polymerase III (adds nucleotides, only 5\'→3\'), Primase (makes RNA primer), DNA Ligase (joins Okazaki fragments). Leading strand: continuous synthesis. Lagging strand: discontinuous (Okazaki fragments).' },
            { title: 'Transcription (DNA→RNA)', content: 'Only one strand of DNA (template strand) is read. mRNA is synthesized 5\'→3\'. RNA Polymerase reads template 3\'→5\'. Promoter: site where RNA polymerase binds. Three stages: Initiation, Elongation, Termination. In eukaryotes: pre-mRNA processed by capping, tailing and splicing (introns removed, exons joined). Three types of RNA: mRNA (messenger), tRNA (transfer), rRNA (ribosomal).' },
            { title: 'Translation (RNA→Protein)', content: 'Genetic code: 64 codons (triplets of mRNA). 61 codons for 20 amino acids (degenerate). 3 stop codons: UAA, UAG, UGA. Start codon: AUG (codes for Methionine). tRNA has anticodon complementary to codon. Ribosome has A, P, E sites. Peptide bond forms between amino acids. Polypeptide grows from N-terminus to C-terminus.' },
          ],
          formulas: [
            { name: "Chargaff's Rule", formula: '%A = %T  |  %G = %C  |  %A+%T+%G+%C = 100%', example: 'If A=30%: T=30%, G+C=40%, so G=C=20%' },
            { name: 'Number of Codons', formula: '4³ = 64 codons total. 61 sense + 3 stop codons', example: '20 amino acids coded by 61 codons — most amino acids have multiple codons (degenerate code)' },
            { name: 'Replication time', formula: 'Human DNA: ~3×10⁹ base pairs replicated in ~8 hours', example: 'Rate ≈ 100 base pairs/second at each replication fork' },
          ],
          experiments: [],
          videos: [
            { title: 'DNA Replication - Molecular Basis of Inheritance', url: 'https://www.youtube.com/embed/TNKWgcFPHqw', duration: '35 min', source: 'Education' },
            { title: 'Transcription and Translation Animation', url: 'https://www.youtube.com/embed/gG7uCskUOrA', duration: '25 min', source: 'Biology Ed' },
            { title: 'Genetic Code - All 64 Codons Explained', url: 'https://www.youtube.com/embed/ubT8ljjSk2o', duration: '20 min', source: 'Khan Academy' },
          ],
          keyTerms: ['DNA', 'Double helix', 'Base pairing', 'Chargaff\'s rule', 'Replication', 'Semi-conservative', 'Transcription', 'Translation', 'Genetic code', 'Codon', 'Anticodon'],
          quickFacts: ['Human DNA stretched out = 2 metres per cell. All your DNA end-to-end = 2× distance from Earth to Pluto!', 'DNA Polymerase makes only 1 error per billion base pairs copied', 'Watson, Crick, and Franklin\'s (X-ray crystallography) work led to Nobel Prize 1962'],
        },
      ]
    },
  ]
}
