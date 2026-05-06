// lib/chapters-db-extra.ts
// Extra chapters: Class 6-8 Science, Commerce, Social Science, Class 11-12 advanced

import type { ChapterContent } from './chapters-db'

export const SCIENCE_6_8_CHAPTERS: ChapterContent[] = [

  // ── CLASS 6 SCIENCE ──────────────────────────────────
  {
    id: 'c6-sci-7', title: 'Getting to Know Plants', class: '6', subject: 'Science', subjectSlug: 'science',
    description: 'Parts of a plant, types of roots, stems, leaves, flowers and photosynthesis basics.',
    concepts: [
      { title: 'Types of Plants', content: 'Herbs: small, soft stems (wheat, grass). Shrubs: woody base, many branches from near ground (rose, henna). Trees: tall, hard woody stem (mango, neem). Creepers: weak stems that grow along ground (watermelon, pumpkin). Climbers: weak stems that need support (money plant, grapevine).' },
      { title: 'Root Types', content: 'Taproot: main thick root going deep (mango, carrot). Fibrous roots: thin roots spreading from base (wheat, maize, grass). Functions: absorb water and minerals, anchor plant in soil, store food (in carrot, radish).' },
      { title: 'Leaf Parts and Photosynthesis', content: 'Leaf = lamina (blade) + petiole (stalk) + stipules. Veins carry food and water. Stomata (tiny pores) exchange gases. Photosynthesis: leaves trap sunlight → CO₂ + water → glucose + oxygen. Chlorophyll (green pigment) captures light.' },
      { title: 'Flowers', content: 'Complete flower: sepals (calyx) + petals (corolla) + stamens (male: anther+filament) + pistil (female: stigma+style+ovary). Stamen makes pollen. Pistil receives pollen → seeds form in ovary.' },
    ],
    formulas: [
      { name: 'Photosynthesis', latex: '6CO_2 + 6H_2O \\xrightarrow{\\text{sunlight}} C_6H_{12}O_6 + 6O_2', description: 'Process by which plants make food using sunlight', example: 'All green plants do this every day when sunlight is available' },
    ],
    experiments: [
      {
        title: 'Observing Transpiration in Plants',
        objective: 'To show that plants release water vapour through leaves',
        materials: ['Potted plant', 'Clear plastic bag', 'String/rubber band', 'Water'],
        procedure: ['Cover a leafy branch with clear plastic bag', 'Tie securely at base', 'Leave in sunlight for 2-3 hours', 'Observe water droplets inside bag'],
        observation: 'Water droplets collect inside the plastic bag',
        result: 'Plants release water vapour through stomata in leaves — this is called transpiration',
        precautions: ['Use fresh leaves', 'Tie bag tightly so no outside moisture enters'],
      },
    ],
    videos: [
      { title: 'Parts of a Plant - Class 6', url: 'https://www.youtube.com/embed/bMFMyPJw-48', duration: '15 min', source: 'youtube-edu' },
      { title: 'Photosynthesis for Beginners', url: 'https://www.youtube.com/embed/OtBdMmBaR00', duration: '12 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Herb', 'Shrub', 'Tree', 'Taproot', 'Fibrous root', 'Stomata', 'Chlorophyll', 'Photosynthesis', 'Transpiration'],
    quickFacts: ['A single large tree can transpire 100-150 gallons of water per day!', 'There are about 391,000 plant species known to science', 'The oldest known living tree is Methuselah — about 4,850 years old'],
  },

  // ── CLASS 7 SCIENCE ──────────────────────────────────
  {
    id: 'c7-sci-4', title: 'Heat', class: '7', subject: 'Science', subjectSlug: 'science',
    description: 'Temperature measurement, transfer of heat by conduction, convection and radiation.',
    concepts: [
      { title: 'Temperature and Heat', content: 'Heat is a form of energy that flows from hotter to cooler objects. Temperature measures how hot or cold a body is — it tells direction of heat flow, not amount. Thermometers measure temperature in Celsius (°C) or Fahrenheit (°F).' },
      { title: 'Conduction', content: 'Heat transfer through solids by particle-to-particle vibration WITHOUT movement of particles. Metals are good conductors (copper, iron, aluminium). Non-metals are poor conductors = insulators (wood, plastic, rubber, air). Used in cooking vessels, radiators.' },
      { title: 'Convection', content: 'Heat transfer in fluids (liquids + gases) by actual MOVEMENT of particles. Hot fluid rises (less dense), cool fluid sinks — creating convection currents. Examples: boiling water, sea breeze, land breeze, heating of rooms by radiators.' },
      { title: 'Radiation', content: 'Heat transfer WITHOUT any medium — even in vacuum. Energy travels as electromagnetic waves. Example: heat from sun reaches Earth through space. Dark/rough surfaces absorb and emit radiation better than light/shiny surfaces.' },
    ],
    formulas: [
      { name: 'Temperature Conversion: Celsius to Fahrenheit', latex: '°F = \\frac{9}{5} \\times °C + 32', description: 'Convert Celsius to Fahrenheit', example: '100°C = (9/5×100)+32 = 180+32 = 212°F' },
      { name: 'Temperature Conversion: Fahrenheit to Celsius', latex: '°C = \\frac{5}{9} \\times (°F - 32)', description: 'Convert Fahrenheit to Celsius', example: '98.6°F = 5/9×(98.6-32) = 5/9×66.6 = 37°C (normal body temp)' },
    ],
    experiments: [
      {
        title: 'Comparing Conduction in Different Materials',
        objective: 'To compare heat conduction in metal and wooden spoons',
        materials: ['Metal spoon', 'Wooden spoon', 'Hot water (near-boiling)', 'Bowl', 'Small balls of wax', 'Stopwatch'],
        procedure: [
          'Attach a small wax ball to the handle of each spoon using a drop of wax',
          'Place both spoons with their bowl-ends in hot water',
          'Start stopwatch',
          'Observe which wax ball falls first',
          'Note the time for each',
        ],
        observation: 'Wax on metal spoon melts and falls much sooner than wax on wooden spoon',
        result: 'Metal conducts heat much faster than wood. Metal is a good conductor; wood is an insulator.',
        precautions: ['Careful with hot water — use tongs', 'Keep handles at same height above water'],
      },
    ],
    videos: [
      { title: 'Heat Transfer - Conduction Convection Radiation', url: 'https://www.youtube.com/embed/CqNbFd0cEnE', duration: '14 min', source: 'youtube-edu' },
      { title: 'Temperature Measurement and Thermometers', url: 'https://www.youtube.com/embed/y7D2PrJJYFE', duration: '10 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Heat', 'Temperature', 'Conduction', 'Convection', 'Radiation', 'Conductor', 'Insulator', 'Convection current'],
    quickFacts: ['The sun\'s surface is about 5,500°C but its corona is 1-3 million °C!', 'Polar bears have hollow transparent hairs that conduct UV light to their black skin', 'A thermos flask uses all three: silvered walls (radiation), vacuum (no convection/conduction)'],
  },

  // ── CLASS 8 SCIENCE ──────────────────────────────────
  {
    id: 'c8-sci-11', title: 'Force and Pressure', class: '8', subject: 'Science', subjectSlug: 'science',
    description: 'Types of forces, contact and non-contact forces, pressure and atmospheric pressure.',
    concepts: [
      { title: 'What is Force?', content: 'Force is a push or pull that can: change the state of motion (start/stop), change direction of motion, change the shape of an object. Force needs interaction between two objects. Unit: Newton (N). Measured with spring balance.' },
      { title: 'Types of Forces', content: 'Contact forces (objects touch): Muscular force, friction force, normal force, spring force. Non-contact forces (distance): Gravitational force (Earth pulls everything), Magnetic force (between magnets), Electrostatic force (between charged objects).' },
      { title: 'Pressure', content: 'Pressure = Force / Area. Same force on smaller area = MORE pressure. That\'s why sharp needles poke, knife cuts, camel\'s wide feet on sand. SI unit: Pascal (Pa) = 1 N/m². Pressure increases with depth in liquids.' },
      { title: 'Atmospheric Pressure', content: 'Air has weight → it exerts pressure in all directions. At sea level: 101,325 Pa ≈ 101.3 kPa. Decreases with altitude (less air above). That\'s why ears pop on mountains and planes. Proved by Torricelli using mercury barometer.' },
    ],
    formulas: [
      { name: 'Pressure', latex: 'P = \\frac{F}{A}', description: 'Force per unit area', example: 'Force=100N, Area=5m² → P=100/5=20 Pa' },
      { name: 'Pressure in Liquids', latex: 'P = h \\rho g', description: 'Depends on depth, density, gravity', example: 'At 10m depth in water: P=10×1000×10=100,000 Pa' },
      { name: 'Standard Atmospheric Pressure', latex: 'P_{atm} = 101325 \\text{ Pa} = 760 \\text{ mmHg} = 1 \\text{ atm}', description: 'Pressure at sea level', example: 'Used as reference pressure in all calculations' },
    ],
    experiments: [
      {
        title: 'Demonstrating Atmospheric Pressure',
        objective: 'To show that atmospheric pressure is very high using a simple experiment',
        materials: ['Glass tumbler full of water', 'Stiff cardboard piece', 'Sink or basin (for safety)'],
        procedure: [
          'Fill the glass completely with water (no air bubbles)',
          'Place cardboard on top, covering the rim completely',
          'Hold cardboard firmly and quickly invert the glass upside down',
          'Over a sink, carefully remove your hand from the cardboard',
          'Observe what happens',
        ],
        observation: 'The cardboard stays in place and water does not fall!',
        result: 'Atmospheric pressure pushing UP on cardboard is greater than the downward force of water. This shows atmospheric pressure is very high (101,325 Pa).',
        precautions: ['Do this over a sink or basin', 'Use a rigid flat cardboard', 'Glass must be completely full'],
      },
    ],
    videos: [
      { title: 'Force and Pressure - Class 8', url: 'https://www.youtube.com/embed/IJIEkLmLUhA', duration: '18 min', source: 'youtube-edu' },
      { title: 'Atmospheric Pressure Experiments', url: 'https://www.youtube.com/embed/Hj-ZiR8SCBY', duration: '12 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Force', 'Contact force', 'Non-contact force', 'Pressure', 'Pascal', 'Atmospheric pressure', 'Friction', 'Gravity'],
    quickFacts: ['Atmospheric pressure = weight of air column above us which is like 10 metres of water!', 'A suction cup works entirely due to atmospheric pressure', 'Deep-sea fish die when brought up because pressure suddenly drops'],
  },

]

// ── CLASS 11-12 PHYSICS ADVANCED ──────────────────────
export const PHYSICS_ADVANCED_CHAPTERS: ChapterContent[] = [

  {
    id: 'c11-phy-4', title: 'Motion in a Plane', class: '11', subject: 'Physics', subjectSlug: 'physics',
    description: 'Vector addition, projectile motion, uniform circular motion and relative velocity.',
    concepts: [
      { title: 'Vectors and Scalars', content: 'Scalar: magnitude only (speed, mass, temperature, distance). Vector: magnitude + direction (velocity, force, displacement, acceleration). Vectors represented by arrows; magnitude = length, direction = arrowhead.' },
      { title: 'Projectile Motion', content: 'Object thrown at an angle — moves under gravity only. Horizontal velocity stays constant (no friction); vertical velocity changes due to gravity. Path is a parabola. Time of flight, range, and maximum height are calculated separately for horizontal and vertical.' },
      { title: 'Uniform Circular Motion', content: 'Object moving in circle with constant speed. Speed constant but velocity always changing direction → acceleration exists (centripetal). Centripetal acceleration points toward center. Examples: planets orbiting, car on circular road, electron in atom.' },
    ],
    formulas: [
      { name: 'Time of Flight', latex: 'T = \\frac{2u\\sin\\theta}{g}', description: 'Total time projectile stays in air', example: 'u=20m/s, θ=30°: T=2×20×sin30°/10=2s' },
      { name: 'Maximum Height', latex: 'H = \\frac{u^2\\sin^2\\theta}{2g}', description: 'Highest point reached', example: 'u=20, θ=30°: H=400×0.25/20=5m' },
      { name: 'Horizontal Range', latex: 'R = \\frac{u^2\\sin 2\\theta}{g}', description: 'Horizontal distance covered', example: 'u=20, θ=30°: R=400×sin60°/10=34.6m' },
      { name: 'Maximum Range', latex: 'R_{max} = \\frac{u^2}{g} \\text{ at } \\theta = 45°', description: 'Range is maximum at 45°', example: 'u=20m/s: Rmax=400/10=40m' },
      { name: 'Centripetal Acceleration', latex: 'a_c = \\frac{v^2}{r} = \\omega^2 r', description: 'Acceleration in circular motion', example: 'v=10m/s, r=5m: ac=100/5=20 m/s²' },
      { name: 'Centripetal Force', latex: 'F_c = \\frac{mv^2}{r} = m\\omega^2 r', description: 'Force needed for circular motion', example: 'm=2kg, v=5m/s, r=2m: F=2×25/2=25N' },
    ],
    experiments: [
      {
        title: 'Projectile Motion with Marble',
        objective: 'To study projectile motion and verify range formula',
        materials: ['Ramp/inclined board', 'Marble/ball bearing', 'Ruler', 'Carbon paper', 'Blank paper', 'Tape measure'],
        procedure: [
          'Set up ramp at table edge so marble rolls off horizontally',
          'Measure table height H',
          'Place carbon paper on floor at expected landing zone',
          'Release marble from fixed point on ramp 5 times',
          'Measure horizontal range R (average)',
          'Verify: Time = √(2H/g), Range = initial speed × time',
          'Repeat with different ramp heights',
        ],
        observation: 'Marble lands in a consistent spot; range increases with initial speed (ramp height)',
        result: 'Horizontal range R = u√(2H/g) where u is initial horizontal speed. Parabolic path confirmed.',
        precautions: ['Keep table edge clean and straight', 'Average multiple readings to reduce error'],
      },
    ],
    videos: [
      { title: 'Projectile Motion - Complete Analysis', url: 'https://www.youtube.com/embed/aY8SF2PjLEU', duration: '22 min', source: 'youtube-edu' },
      { title: 'Uniform Circular Motion and Centripetal Force', url: 'https://www.youtube.com/embed/XYqgJJGRSfE', duration: '18 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Projectile', 'Range', 'Time of flight', 'Parabola', 'Centripetal', 'Angular velocity', 'Relative velocity'],
    quickFacts: ['Cricket ball achieves maximum range at about 45° (ignoring air resistance)', 'The Moon is in uniform circular motion around Earth', 'Satellites stay in orbit because centripetal force = gravity'],
    vedicMath: [],
  },

  {
    id: 'c12-phy-11', title: 'Dual Nature of Radiation and Matter', class: '12', subject: 'Physics', subjectSlug: 'physics',
    description: 'Photoelectric effect, Einstein\'s equation, de Broglie hypothesis, wave-particle duality.',
    concepts: [
      { title: 'Photoelectric Effect', content: 'When light of sufficient frequency hits a metal surface, electrons are emitted. Key facts: emission happens INSTANTLY, no emission below threshold frequency regardless of intensity, kinetic energy of electrons depends on frequency not intensity, more intensity = more electrons (not more energy). Classical wave theory couldn\'t explain this — Einstein did using photon concept.' },
      { title: "Einstein's Photoelectric Equation", content: 'Photon (light quantum) has energy E = hν (h = Planck constant). When photon hits metal: part used to remove electron (work function φ), rest becomes kinetic energy. So: KE_max = hν - φ. Threshold frequency: ν₀ = φ/h. Stopping potential: V₀ = KE_max/e.' },
      { title: "de Broglie's Hypothesis", content: 'If light (wave) can behave as particle, then particles (electron, proton) can behave as waves! de Broglie wavelength: λ = h/mv = h/p. This was proven by Davisson-Germer experiment (electrons diffracted like X-rays). Basis of quantum mechanics.' },
    ],
    formulas: [
      { name: 'Photon Energy', latex: 'E = h\\nu = \\frac{hc}{\\lambda}', description: 'Energy of one photon', example: 'λ=500nm: E=6.63×10⁻³⁴×3×10⁸/500×10⁻⁹=3.98×10⁻¹⁹J' },
      { name: 'Einstein\'s Photoelectric Equation', latex: 'KE_{max} = h\\nu - \\phi = h(\\nu - \\nu_0)', description: 'Maximum kinetic energy of emitted electron', example: 'hν=5eV, φ=2eV → KE_max=3eV' },
      { name: 'Work Function', latex: '\\phi = h\\nu_0', description: 'Minimum energy to remove electron', example: 'Caesium φ=2.1eV (easiest to eject electrons)' },
      { name: 'Stopping Potential', latex: 'eV_0 = KE_{max} = h\\nu - \\phi', description: 'Voltage to stop all electrons', example: 'KE_max=3eV → V₀=3V' },
      { name: 'de Broglie Wavelength', latex: '\\lambda = \\frac{h}{mv} = \\frac{h}{p}', description: 'Wave nature of particles', example: 'Electron at 10⁶m/s: λ=6.63×10⁻³⁴/(9.1×10⁻³¹×10⁶)=7.28×10⁻¹⁰m (0.73nm)' },
    ],
    experiments: [],
    videos: [
      { title: 'Photoelectric Effect - Complete Chapter', url: 'https://www.youtube.com/embed/v-1zjdUTu0o', duration: '25 min', source: 'youtube-edu' },
      { title: 'de Broglie Hypothesis Explained', url: 'https://www.youtube.com/embed/H6QCd8-aSC4', duration: '18 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Photon', 'Work function', 'Threshold frequency', 'Stopping potential', 'de Broglie wavelength', 'Wave-particle duality'],
    quickFacts: ['Einstein won the 1921 Nobel Prize for photoelectric effect (not relativity!)', 'Modern solar cells work using the photoelectric effect', 'Electron microscopes use de Broglie wavelength of electrons (much smaller than light) to see atoms'],
  },

]

// ── CHEMISTRY ADVANCED ────────────────────────────────
export const CHEMISTRY_ADVANCED_CHAPTERS: ChapterContent[] = [

  {
    id: 'c12-chem-3', title: 'Electrochemistry', class: '12', subject: 'Chemistry', subjectSlug: 'chemistry',
    description: 'Galvanic cells, Nernst equation, electrolysis, Faraday\'s laws, batteries and corrosion.',
    concepts: [
      { title: 'Galvanic Cells (Voltaic Cells)', content: 'Convert chemical energy to electrical energy. Two half-cells connected by salt bridge. Oxidation at anode (negative), reduction at cathode (positive). Standard hydrogen electrode (SHE) has E° = 0V. EMF = E°cathode - E°anode. Example: Daniell cell (Zn-Cu) has EMF = 1.1V.' },
      { title: 'Nernst Equation', content: 'Relates cell potential to concentration of ions at any temperature. E = E° - (RT/nF)lnQ = E° - (0.0592/n)logQ at 25°C. At equilibrium, E = 0 and Q = K, so: log K = nE°/0.0592. Used to find equilibrium constant from standard EMF.' },
      { title: 'Electrolysis', content: 'Using electrical energy to cause non-spontaneous chemical reactions. In electrolytic cell: anode (+), cathode (-). Cations go to cathode (reduced), anions go to anode (oxidized). Applications: electroplating, refining of metals (Cu, Al), production of NaOH, Cl₂ from brine.' },
      { title: 'Faraday\'s Laws of Electrolysis', content: 'First law: mass of substance deposited ∝ quantity of charge. m = ZQ = ZIt. Second law: mass of different substances deposited by same charge are in ratio of their equivalent weights. Faraday constant F = 96,485 C/mol.' },
    ],
    formulas: [
      { name: 'Cell EMF', latex: 'E_{cell} = E°_{cathode} - E°_{anode}', description: 'Standard cell potential from reduction potentials', example: 'Zn-Cu cell: E°=+0.34-(-0.76)=1.10V' },
      { name: 'Nernst Equation', latex: 'E = E° - \\frac{0.0592}{n}\\log Q \\quad (\\text{at 25°C})', description: 'Cell potential at non-standard conditions', example: 'If Q=0.01, n=2, E°=1.1: E=1.1-(0.0296)×(-2)=1.159V' },
      { name: 'Gibbs Energy from EMF', latex: '\\Delta G° = -nFE°', description: 'Relates spontaneity to cell potential', example: 'n=2, E°=1.1V: ΔG°=-2×96485×1.1=-212,267 J=-212.3 kJ' },
      { name: 'Faraday\'s First Law', latex: 'm = \\frac{M}{nF} \\times Q = \\frac{M \\times I \\times t}{n \\times F}', description: 'Mass deposited by electrolysis', example: 'Cu(n=2): m=63.5×2×3600/(2×96485)=2.37g per hour per ampere' },
      { name: 'Relationship: EMF and K', latex: '\\log K = \\frac{nE°}{0.0592}', description: 'From Nernst at equilibrium', example: 'E°=1.1V, n=2: logK=2×1.1/0.0592=37.16 → K=10³⁷·¹⁶' },
    ],
    experiments: [
      {
        title: 'Electroplating of Copper',
        objective: 'To electroplate a metal object with copper',
        materials: ['Copper plate (anode)', 'Metal key/clip (cathode)', 'Copper sulphate solution', 'Battery/power supply 6V', 'Connecting wires', 'Beaker'],
        procedure: [
          'Dissolve 25g CuSO₄ in 250mL water to make electrolyte',
          'Connect copper plate to positive terminal (anode)',
          'Connect the object to be plated to negative terminal (cathode)',
          'Immerse both electrodes in CuSO₄ solution',
          'Pass current for 15-20 minutes',
          'Remove cathode, wash with water and observe',
        ],
        observation: 'A thin shiny copper layer deposits on the cathode (object). Anode copper dissolves slowly.',
        result: 'Cu²⁺ ions in solution get reduced at cathode: Cu²⁺ + 2e⁻ → Cu. At anode: Cu → Cu²⁺ + 2e⁻. Net: copper transfers from anode to cathode.',
        precautions: ['Keep current low to get smooth deposit', 'Clean cathode with sandpaper before plating'],
      },
    ],
    videos: [
      { title: 'Electrochemistry - Galvanic Cells and Nernst', url: 'https://www.youtube.com/embed/hk5ZJxbS9yw', duration: '30 min', source: 'youtube-edu' },
      { title: 'Electrolysis and Faraday Laws', url: 'https://www.youtube.com/embed/oWFCFVHrSBQ', duration: '22 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Galvanic cell', 'Electrolytic cell', 'Anode', 'Cathode', 'EMF', 'Nernst equation', 'Faraday constant', 'Electroplating', 'Corrosion'],
    quickFacts: ['The Daniell cell (1836) was the first practical battery', 'Aluminium production uses 15,000 kWh of electricity per tonne!', 'Corrosion costs the world economy $2.5 trillion annually'],
  },

  {
    id: 'c12-chem-4', title: 'Chemical Kinetics', class: '12', subject: 'Chemistry', subjectSlug: 'chemistry',
    description: 'Rate of reaction, order, rate laws, Arrhenius equation, activation energy, catalysis.',
    concepts: [
      { title: 'Rate of Reaction', content: 'Rate = decrease in concentration of reactant / time = increase in concentration of product / time. Instantaneous rate (at specific moment) vs average rate (over interval). Factors affecting rate: concentration (more molecules = more collisions), temperature, surface area, catalyst.' },
      { title: 'Rate Law and Order', content: 'Rate = k[A]ᵐ[B]ⁿ. k = rate constant (depends on temperature only). m, n = order w.r.t each reactant (found EXPERIMENTALLY, not from equation). Overall order = m+n. Zero order: rate independent of concentration. First order: rate ∝ concentration. Half-life of first order reaction: t½ = 0.693/k.' },
      { title: 'Arrhenius Equation', content: 'k = Ae^(-Ea/RT). A = frequency factor, Ea = activation energy, R = 8.314 J/mol/K, T = temperature in Kelvin. Higher temperature → larger k → faster reaction. Higher Ea → slower reaction. Catalyst lowers Ea → increases k → faster reaction.' },
    ],
    formulas: [
      { name: 'Average Rate', latex: 'r = -\\frac{\\Delta[A]}{\\Delta t} = +\\frac{\\Delta[P]}{\\Delta t}', description: 'Change in concentration per unit time', example: 'If [A] drops from 1M to 0.5M in 10s: r=0.5/10=0.05 M/s' },
      { name: 'Rate Law', latex: 'r = k[A]^m[B]^n', description: 'Rate depends on concentrations', example: 'r=k[A]²[B]: second order in A, first in B, third order overall' },
      { name: 'First Order Half-Life', latex: 't_{1/2} = \\frac{0.693}{k}', description: 'Time for concentration to halve (1st order)', example: 'k=0.02s⁻¹: t½=0.693/0.02=34.65s' },
      { name: 'Integrated First Order', latex: '\\ln\\frac{[A]_0}{[A]} = kt', description: 'Concentration at time t for 1st order', example: '[A]₀=1M, k=0.1min⁻¹, t=10min: ln(1/[A])=1 → [A]=e⁻¹=0.368M' },
      { name: 'Arrhenius Equation', latex: 'k = Ae^{-E_a/RT}', description: 'Rate constant and temperature relationship', example: 'Ea=50kJ/mol: 10°C rise roughly doubles rate' },
      { name: 'Arrhenius Log Form', latex: '\\ln\\frac{k_2}{k_1} = \\frac{E_a}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)', description: 'Finding Ea from two rate constants', example: 'k doubles from 300K to 310K → Ea≈52.9 kJ/mol' },
    ],
    experiments: [
      {
        title: 'Effect of Concentration on Rate',
        objective: 'To study how concentration affects rate using sodium thiosulphate and HCl',
        materials: ['Sodium thiosulphate solution (different concentrations)', 'HCl solution', 'Conical flasks', 'White tile with X mark', 'Stopwatch'],
        procedure: [
          'Draw X mark on white tile',
          'Prepare Na₂S₂O₃ solutions: 50mL, 40mL+10mLwater, 30mL+20mLwater, 20mL+30mLwater',
          'For each concentration, add 5mL HCl and start timer',
          'Place flask on X mark, look from above',
          'Stop timer when X is no longer visible (due to sulphur precipitate)',
          'Plot concentration vs 1/time (rate)',
        ],
        observation: 'Higher concentration solutions turn cloudy faster. Rate increases with concentration.',
        result: 'As [Na₂S₂O₃] increases, rate of reaction increases. Rate ∝ concentration confirms rate law.',
        precautions: ['Use same amount of HCl each time', 'Same person should judge when X disappears'],
      },
    ],
    videos: [
      { title: 'Chemical Kinetics - Rate Laws and Order', url: 'https://www.youtube.com/embed/MwBNSYq4R4o', duration: '28 min', source: 'youtube-edu' },
      { title: 'Arrhenius Equation Explained', url: 'https://www.youtube.com/embed/j_D0yb-KFAQ', duration: '20 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Rate of reaction', 'Rate constant', 'Order', 'Rate law', 'Half-life', 'Arrhenius', 'Activation energy', 'Catalyst'],
    quickFacts: ['Catalytic converters in cars use platinum to speed up reactions that reduce pollution', 'Enzymes are biological catalysts — can speed reactions a trillion times!', 'At absolute zero (0 K), all reactions stop'],
  },

]

// ── COMMERCE CHAPTERS ─────────────────────────────────
export const COMMERCE_CHAPTERS: ChapterContent[] = [

  {
    id: 'c12-acc-1', title: 'Accounting for Partnership', class: '12', subject: 'Accountancy', subjectSlug: 'accountancy',
    description: 'Partnership deed, fixed and fluctuating capital accounts, profit distribution, interest on capital and drawings.',
    concepts: [
      { title: 'Nature of Partnership', content: 'Partnership is an agreement between 2-50 persons to carry on a business and share profits/losses. Governed by Indian Partnership Act 1932. Partnership Deed (written agreement) specifies: profit ratio, capital contribution, salary/commission to partners, interest on capital/drawings.' },
      { title: 'Capital Account Methods', content: 'Fixed Capital: Capital account stays at fixed amount; adjustments go to Current Account. Fluctuating Capital: All transactions (interest, salary, drawings, profit) done in Capital Account itself — balance changes every year. Fixed method is preferred in large partnerships.' },
      { title: 'P&L Appropriation Account', content: 'Prepared AFTER P&L account. Shows HOW net profit is distributed among partners. Deductions: Interest on capital, Partner\'s salary/commission. Additions: Interest on drawings. Remaining profit shared in profit-sharing ratio. Format: Dr side = appropriations; Cr side = net profit + interest on drawings.' },
      { title: 'Goodwill', content: 'Reputation/advantage of business over competitors. Types: Purchased goodwill (recorded in books), Self-generated goodwill (not recorded). Methods of valuation: Average profit method = Average profits × Years of purchase. Super profit method = Super profit × Years of purchase. Super profit = Average profit - Normal profit.' },
    ],
    formulas: [
      { name: 'Interest on Capital', latex: '\\text{Interest on Capital} = \\frac{\\text{Capital} \\times \\text{Rate}}{100}', description: 'Charged to P&L Appropriation A/c, credited to partner\'s account', example: 'Capital=₹50,000, Rate=10%: Interest=₹5,000' },
      { name: 'Interest on Drawings (Flat rate)', latex: '\\text{Interest} = \\frac{\\text{Drawings} \\times \\text{Rate} \\times \\text{Period}}{100 \\times 12}', description: 'If drawings made during year', example: 'Drawings=₹12,000, Rate=6%, period=6months: I=12000×6×6/1200=₹360' },
      { name: 'Average Profit Goodwill', latex: '\\text{Goodwill} = \\text{Average Profit} \\times \\text{Years of Purchase}', description: 'Simple goodwill valuation', example: 'Avg profit=₹60,000, YOP=3: Goodwill=₹1,80,000' },
      { name: 'Super Profit', latex: '\\text{Super Profit} = \\text{Average Profit} - \\text{Normal Profit}', description: 'Profit above normal for the industry', example: 'Avg=₹80,000, Normal=₹50,000: Super profit=₹30,000' },
      { name: 'New Ratio after Admission', latex: '\\text{New ratio} = \\text{Old ratio} - \\text{Sacrificing ratio}', description: 'Old partners give up share for new partner', example: 'A:B=3:2 (total 5), C gets 1/5: Sacrifice 3:2 from 1/5 → New ratio A:B:C=12:8:5' },
    ],
    experiments: [],
    videos: [
      { title: 'Partnership Accounts - Complete Chapter', url: 'https://www.youtube.com/embed/VYoqEBLXKyc', duration: '35 min', source: 'youtube-edu' },
      { title: 'P&L Appropriation Account Format', url: 'https://www.youtube.com/embed/2HQEF-VH4iM', duration: '25 min', source: 'youtube-edu' },
    ],
    keyTerms: ['Partnership deed', 'Fixed capital', 'Fluctuating capital', 'P&L Appropriation', 'Goodwill', 'Sacrificing ratio', 'Interest on capital', 'Interest on drawings'],
    quickFacts: ['Maximum partners in banking: 10; other business: 50 (as per Companies Act 2013)', 'Partnership does not have separate legal existence from partners', 'India has about 1.5 crore registered partnership firms'],
  },

]

// ── MASTER EXTRA EXPORT ───────────────────────────────
export const ALL_EXTRA_CHAPTERS: ChapterContent[] = [
  ...SCIENCE_6_8_CHAPTERS,
  ...PHYSICS_ADVANCED_CHAPTERS,
  ...CHEMISTRY_ADVANCED_CHAPTERS,
  ...COMMERCE_CHAPTERS,
]
