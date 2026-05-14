// lib/ncert-master-8-extra.ts
// Additional rich chapters for Class 8 — Math, Science, History, Geography, English, Hindi

import type { ClassData } from '@/lib/ncert-master'

export const CLASS8_EXTRA: ClassData = {
  classLevel: '8', label: 'Class 8', board: ['CBSE','ICSE','State'],
  description: 'Complete Class 8 — Algebra, Science, Modern Indian History, Geography, English',
  subjects: [
    // ── MATHEMATICS ────────────────────────────────────────────────
    {
      slug: 'mathematics', name: 'Mathematics', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Rational numbers, linear equations, geometry, mensuration, statistics',
      chapters: [
        {
          id: 'c8m1', chapterNo: 1, title: 'Rational Numbers',
          description: 'Properties of rational numbers, representation on number line, between two rationals.',
          topics: [
            { title: 'What are Rational Numbers?', content: 'A rational number is any number that can be written as p/q where p and q are integers and q ≠ 0. Examples: 3/4, -5/7, 0 (=0/1), 6 (=6/1), -3 (=-3/1). All integers are rational numbers! All fractions are rational numbers. Non-examples: √2, π, √3 (cannot be written as p/q).' },
            { title: 'Properties of Rational Numbers', content: 'Closure: sum/product of two rationals is always rational. Commutative: a+b=b+a, a×b=b×a. Associative: (a+b)+c=a+(b+c). Distributive: a(b+c)=ab+ac. Additive identity: 0 (a+0=a). Multiplicative identity: 1 (a×1=a). Additive inverse of p/q is -p/q. Multiplicative inverse (reciprocal) of p/q is q/p.' },
            { title: 'Rational Numbers on Number Line', content: 'Any rational number p/q can be plotted on number line. For 3/4: divide segment 0 to 1 into 4 equal parts, go to 3rd mark. For -5/3: go left of zero, divide -1 to -2 into 3 parts, go to 2nd mark (-5/3 is between -1 and -2). Infinite rational numbers between any two integers.' },
            { title: 'Finding Rational Numbers Between Two Numbers', content: 'Between any two rational numbers, there are infinitely many rationals. Method: average of two numbers. Between 1/4 and 1/2: average = (1/4+1/2)/2 = (3/4)/2 = 3/8. To find 5 numbers between 1/4 and 1/2: convert to same denominator with gap. 2/8 and 4/8 → only 3/8 between. Scale up: 4/16 and 8/16 → 5,6,7 between = 5/16, 6/16, 7/16.' },
          ],
          formulas: [
            { name: 'Standard Form of Rational Number', formula: 'p/q where HCF(p,q)=1 and q>0', example: '-6/4 in standard form: divide by HCF(6,4)=2 → -3/2' },
            { name: 'Multiplicative Inverse', formula: 'Reciprocal of p/q = q/p', example: 'Reciprocal of 3/7 = 7/3. Reciprocal of -5/8 = -8/5' },
          ],
          experiments: [],
          videos: [{ title: 'Rational Numbers Class 8', url: 'https://www.youtube.com/embed/0bxZwQNPRsA', duration: '20 min', source: 'Khan Academy' }],
          keyTerms: ['Rational number', 'p/q form', 'Closure', 'Additive inverse', 'Multiplicative inverse', 'Standard form'],
          quickFacts: ['Between 0 and 1, there are INFINITELY many rational numbers', 'Square root of 2 is irrational (proven by ancient Greeks)', 'Every terminating decimal and every repeating decimal is rational'],
          vedicTricks: [{ trick: 'Reciprocal trick: flip the fraction', example: 'To divide 3 by 3/4: 3 ÷ 3/4 = 3 × 4/3 = 4' }],
        },
        {
          id: 'c8m2', chapterNo: 2, title: 'Linear Equations in One Variable',
          description: 'Solving linear equations including those with variables on both sides and word problems.',
          topics: [
            { title: 'Linear Equations — Review', content: 'An equation with variable of degree 1 (no x², no x³). Examples: 2x+5=13, 3x-7=x+9, x/4=2. To solve: do same operation to both sides. Goal: isolate the variable. Verify by substituting back.' },
            { title: 'Variables on Both Sides', content: 'When variable appears on both sides: collect all variable terms on one side, constants on other. Example: 3x+5 = x+13. Subtract x: 2x+5=13. Subtract 5: 2x=8. Divide: x=4. Verify: 3(4)+5=17, (4)+13=17 ✓.' },
            { title: 'Equations with Fractions', content: 'Clear fractions by multiplying all terms by LCM of denominators. x/2 + x/3 = 5. LCM of 2,3 = 6. Multiply all by 6: 3x + 2x = 30. 5x = 30. x = 6. Always verify answer in original equation.' },
            { title: 'Word Problems', content: 'Translate English to algebra: "a number" → x, "twice a number" → 2x, "3 more than" → +3, "is equal to" → =. Types: age problems, perimeter problems, speed-distance, money. Example: "Sum of three consecutive integers is 54." Let them be n, n+1, n+2. n+(n+1)+(n+2)=54 → 3n+3=54 → n=17. Numbers: 17, 18, 19.' },
          ],
          formulas: [
            { name: 'Consecutive integers formula', formula: 'n, n+1, n+2 (consecutive). n, n+2, n+4 (consecutive odd/even)', example: 'Sum of 4 consecutive integers = 4n+6. If =54: n=12, so 12,13,14,15' },
          ],
          experiments: [],
          videos: [{ title: 'Linear Equations Class 8', url: 'https://www.youtube.com/embed/l3XzepN03KQ', duration: '22 min', source: 'Khan Academy' }],
          keyTerms: ['Linear equation', 'Transposition', 'Variable', 'Coefficient', 'Consecutive integers', 'Word problem'],
          quickFacts: ['Linear equations model straight lines — hence "linear"', 'Every GPS position calculation involves solving equations', 'Indian mathematician Aryabhata solved linear equations in 499 CE'],
          vedicTricks: [{ trick: 'For sum of n consecutive integers: sum = n × (first + last)/2', example: 'Sum of 1 to 100: 100 × (1+100)/2 = 5050 (Gauss did this at age 8!)' }],
        },
        {
          id: 'c8m7', chapterNo: 7, title: 'Cubes and Cube Roots',
          description: 'Perfect cubes, cube roots — by factorisation and estimation.',
          topics: [
            { title: 'What are Cubes?', content: 'Cube of a number = n × n × n = n³. A perfect cube is a number whose cube root is an integer. Perfect cubes up to 20³: 1,8,27,64,125,216,343,512,729,1000,1331,1728,2197,2744,3375,4096,4913,5832,6859,8000. The units digit pattern: 1³→1, 2³→8, 3³→7, 4³→4, 5³→5, 6→6, 7→3, 8→2, 9→9, 0→0.' },
            { title: 'Cube Roots', content: 'Cube root of n = ∛n = number m such that m³=n. ∛8=2, ∛27=3, ∛1000=10. Method: prime factorisation. Group prime factors in groups of 3. If each prime appears exactly 3 times → perfect cube. ∛216: 216=2³×3³=8×27. ∛216=2×3=6. Negative cube roots: ∛(-8)=-2 (only real cube root of negative number is negative).' },
          ],
          formulas: [
            { name: 'Cube of a number', formula: 'n³ = n × n × n', example: '5³=125, 10³=1000, (-3)³=-27' },
            { name: 'Cube root', formula: '∛n = m means m³ = n', example: '∛125=5 because 5³=125. ∛(-125)=-5' },
          ],
          experiments: [],
          videos: [{ title: 'Cubes and Cube Roots Class 8', url: 'https://www.youtube.com/embed/1tnRFaZGpHg', duration: '16 min', source: 'Khan Academy' }],
          keyTerms: ['Perfect cube', 'Cube root', 'Prime factorisation', 'Grouping'],
          quickFacts: ['A Rubik\'s cube has 6 faces — 3×3 each. Total 54 squares', 'Volume of a cube = side³. This is why it\'s called a "cube"', '1729 = 12³+1³ = 10³+9³ — Hardy-Ramanujan number, the smallest "taxicab number"!'],
          vedicTricks: [{ trick: 'Cube of a number ending in 5: (n5)³ = (n)(n+1)(n+2) × 125 pattern for last digits', example: '15³=3375. 25³=15625. Note: all end in 5' }],
        },
        {
          id: 'c8m9', chapterNo: 9, title: 'Algebraic Expressions and Identities',
          description: 'Multiplying expressions, standard algebraic identities and their applications.',
          topics: [
            { title: 'Multiplying Expressions', content: 'Monomial × monomial: multiply coefficients and add powers. 3x² × 4x³ = 12x⁵. Monomial × binomial: distributive property. 2x(x+3) = 2x²+6x. Binomial × binomial: FOIL (First, Outer, Inner, Last). (x+3)(x+4) = x²+4x+3x+12 = x²+7x+12.' },
            { title: 'Standard Identities', content: '(a+b)² = a²+2ab+b². (a-b)² = a²-2ab+b². (a+b)(a-b) = a²-b². (x+a)(x+b) = x²+(a+b)x+ab. These are called algebraic identities — true for all values of variables. Used for quick calculation without actual multiplication.' },
            { title: 'Using Identities for Calculation', content: 'Mental math with identities: 103² = (100+3)² = 10000+600+9 = 10609. 97² = (100-3)² = 10000-600+9 = 9409. 103×97 = (100+3)(100-3) = 100²-3² = 10000-9 = 9991. Much faster than direct multiplication! These same identities appear in advanced algebra and calculus.' },
          ],
          formulas: [
            { name: '(a+b)² Identity', formula: '(a+b)² = a² + 2ab + b²', example: '(x+5)² = x²+10x+25. (2+3)²=4+12+9=25=5² ✓', latex: '(a+b)^2 = a^2 + 2ab + b^2' },
            { name: '(a-b)² Identity', formula: '(a-b)² = a² - 2ab + b²', example: '(x-4)² = x²-8x+16', latex: '(a-b)^2 = a^2 - 2ab + b^2' },
            { name: 'Difference of squares', formula: '(a+b)(a-b) = a² - b²', example: '(x+7)(x-7)=x²-49. 103×97=(100)²-3²=9991', latex: '(a+b)(a-b) = a^2 - b^2' },
          ],
          experiments: [],
          videos: [{ title: 'Algebraic Identities Class 8', url: 'https://www.youtube.com/embed/5NmJFDcEGCQ', duration: '18 min', source: 'Khan Academy' }],
          keyTerms: ['Monomial', 'Binomial', 'FOIL', 'Identity', 'Expansion', 'Coefficient'],
          quickFacts: ['(a+b)² is used in statistics: variance formula (σ²) uses it', 'Difference of squares helps factorise: x²-9 = (x+3)(x-3)', 'These identities are the building blocks of high school and university algebra'],
          vedicTricks: [{ trick: 'Square numbers close to 100: (100±n)² = 10000 ± 200n + n²', example: '97²=(100-3)²=10000-600+9=9409. 106²=11236' }],
        },
      ],
    },

    // ── SCIENCE ────────────────────────────────────────────────────
    {
      slug: 'science', name: 'Science', icon: '⚗️', color: '#0369a1', bg: '#eff6ff',
      description: 'Crop production, metals, coal, petroleum, combustion, light, stars',
      chapters: [
        {
          id: 'c8s1', chapterNo: 1, title: 'Crop Production and Management',
          description: 'Agricultural practices, kharif/rabi crops, irrigation, fertilisers and food storage.',
          topics: [
            { title: 'Types of Crops', content: 'Kharif crops (monsoon/summer): sown in June-July, harvested Sept-Oct. Examples: Rice, maize, soybean, groundnut, cotton, sugarcane. Rabi crops (winter): sown in Oct-Nov, harvested March-April. Examples: Wheat, barley, mustard, pea, gram. Zaid crops: short summer season. Examples: Cucumber, watermelon, muskmelon.' },
            { title: 'Agricultural Practices', content: 'Preparation of soil: ploughing (loosens soil, aerates, removes weeds), levelling (levelling board), manuring. Sowing: using seed drill (saves time, evenly spaced). Irrigation: canal irrigation (rivers), wells/tube wells, drip irrigation (most efficient — drops water at roots, saves 30-50% water), sprinkler irrigation. Weeding: removing unwanted plants (weeds) that compete for nutrients.' },
            { title: 'Fertilisers and Manures', content: 'Manure: decomposed animal/plant waste — improves soil texture and microorganisms, organic, slow-acting. Fertilisers: chemical compounds, fast-acting, specific nutrients. NPK: Nitrogen (leafy growth), Phosphorus (root growth), Potassium (fruit/flower). Urea (nitrogen), DAP (phosphorus). Overuse of chemical fertilisers: soil degradation, water pollution. Green revolution used heavy fertilisers + HYV seeds.' },
            { title: 'Food Storage and Preservation', content: 'Harvested grain must be stored properly — pests, moisture and heat cause damage. Traditional: mud bins, metal drums (sealed). Modern: silos (large cylindrical metal structures). Chemical methods: fumigation (chemicals kill pests). Cold storage: vegetables and fruits. Proper storage = no food wastage = food security.' },
          ],
          formulas: [],
          experiments: [
            {
              title: 'Testing Effectiveness of Fertilisers',
              objective: 'Compare plant growth with different types of fertilisers',
              materials: ['4 pots with same soil', 'Same seeds (beans/wheat)', 'Chemical fertiliser (urea)', 'Organic manure', 'No fertiliser (control)'],
              steps: ['Plant same number of seeds in each pot', 'Water all pots equally', 'Apply urea to pot 1, compost to pot 2, nothing to pot 3', 'Observe growth over 3 weeks', 'Measure height weekly, record observations'],
              result: 'Chemical fertiliser shows fastest initial growth; organic manure shows steady sustained growth; control shows slowest growth.',
            },
          ],
          videos: [{ title: 'Crop Production Class 8', url: 'https://www.youtube.com/embed/aqZC-Ke8o34', duration: '20 min', source: 'Education' }],
          keyTerms: ['Kharif', 'Rabi', 'Irrigation', 'Fertiliser', 'Manure', 'Drip irrigation', 'Silo', 'Green revolution'],
          quickFacts: ['India is world\'s 2nd largest producer of wheat and rice', 'Drip irrigation was developed in Israel — India adopted it under PM Krishi Sinchai Yojana', 'Green Revolution (1960s-70s) made India self-sufficient in food grain'],
        },
        {
          id: 'c8s3', chapterNo: 3, title: 'Synthetic Fibres and Plastics',
          description: 'Types of synthetic fibres, plastics, their properties, uses and environmental impact.',
          topics: [
            { title: 'Synthetic Fibres', content: 'Made from chemical processes (petrochemicals). Unlike natural fibres (cotton, silk, wool). Types: NYLON — first synthetic fibre (1935), strong, elastic, durable, used in parachutes, ropes, brushes, stockings. POLYESTER — resists wrinkles, dries quickly, blend with cotton (polycot). ACRYLIC — looks like wool, cheaper, used in blankets/sweaters. RAYON — from wood pulp, silk-like, blend natural+synthetic.' },
            { title: 'Plastics', content: 'Plastics are polymers — long chains of repeating chemical units. Thermoplastics: soften on heating, can be remolded (PVC, polythene) — recycled. Thermosetting plastics: once set, don\'t soften on heating (bakelite, melamine) — used in handles, electrical fittings. Properties: corrosion-resistant, lightweight, strong, poor conductor, non-biodegradable (problem!).' },
            { title: 'Environmental Impact', content: 'Plastics are non-biodegradable — take 100-1000 years to decompose. Harm: clog drainage, harm animals (cows eat plastic bags), marine pollution (plastic in oceans harms fish and seabirds). Microplastics: tiny plastic particles now found in human blood! Solutions: reduce single-use plastic, carry cloth bags, segregate waste, recycling. 5Rs: Refuse, Reduce, Reuse, Recycle, Recover.' },
          ],
          formulas: [],
          experiments: [],
          videos: [{ title: 'Synthetic Fibres and Plastics Class 8', url: 'https://www.youtube.com/embed/HDCwJ3bY5V8', duration: '16 min', source: 'Education' }],
          keyTerms: ['Synthetic fibre', 'Nylon', 'Polyester', 'Acrylic', 'Polymer', 'Thermoplastic', 'Non-biodegradable', 'Microplastics'],
          quickFacts: ['A plastic bottle takes 450 years to decompose', 'India banned single-use plastics in 2022 — 19 categories of plastic items', '8 million tonnes of plastic enters the ocean every year — like 1 garbage truck per minute!'],
        },
        {
          id: 'c8s4', chapterNo: 4, title: 'Metals and Non-metals',
          description: 'Physical and chemical properties of metals and non-metals, reactivity series, corrosion.',
          topics: [
            { title: 'Physical Properties of Metals', content: 'Metals (Iron, copper, aluminium, gold, silver, sodium): Lustrous (shiny), hard (except sodium, potassium), high melting point, malleable (beaten into sheets), ductile (drawn into wires), sonorous (produce sound when struck), good conductor of heat and electricity. Exceptions: Mercury is liquid at room temperature. Sodium and Potassium are soft metals stored in oil (react violently with air/water).' },
            { title: 'Chemical Properties of Metals', content: 'Reaction with oxygen: most metals form metal oxides (basic). 2Mg + O₂ → 2MgO (white, burns brightly). Iron + O₂ → Fe₂O₃ (rust). Reaction with water: Na reacts explosively, K even more. Mg reacts slowly, Fe doesn\'t react with cold water. Cu, Ag, Au don\'t react at all. Reaction with acids: active metals + dilute HCl → metal chloride + H₂ gas.' },
            { title: 'Non-metals and Their Properties', content: 'Non-metals: Carbon (C), Sulphur (S), Phosphorus (P), Nitrogen (N), Oxygen (O), Iodine (I), Hydrogen (H). Properties: not lustrous (except iodine, graphite), brittle (not malleable/ductile), low melting point usually, poor conductor (except graphite). Chemical: react with oxygen to form acidic oxides. C + O₂ → CO₂. Sulphur + O₂ → SO₂ (acid rain).' },
            { title: 'Uses of Metals and Non-metals', content: 'Metals: iron (construction, tools), copper (wires, pots), aluminium (aircraft, utensils, foil), gold/silver (jewellery, electronics), zinc (galvanizing, batteries), titanium (aerospace). Non-metals: oxygen (breathing), nitrogen (fertilisers, food packaging), carbon (fuels, diamonds, pencils), silicon (chips, solar cells), iodine (antiseptic, thyroid health), chlorine (water purification).' },
          ],
          formulas: [
            { name: 'Reactivity Series (decreasing)', formula: 'K > Na > Ca > Mg > Al > Zn > Fe > Pb > H > Cu > Ag > Au', example: 'Mg displaces Fe from FeSO₄. Cu CANNOT displace Fe (lower in series)', note: 'More reactive metal displaces less reactive from solution' },
          ],
          experiments: [
            {
              title: 'Reactivity of Metals with Dilute Acid',
              objective: 'Demonstrate reactivity series using metals and HCl',
              materials: ['Dilute HCl', 'Magnesium ribbon', 'Zinc strip', 'Iron nail', 'Copper piece', 'Test tubes'],
              steps: ['Take 4 test tubes with 5ml dilute HCl each', 'Add Mg to first, Zn to second, Fe to third, Cu to fourth', 'Observe rate of hydrogen gas bubbles', 'Record: vigorous, moderate, slow, none'],
              result: 'Mg: very vigorous. Zn: moderate. Fe: slow. Cu: no reaction. This matches the reactivity series!',
              safetyNote: 'Use dilute acid only. Do not inhale fumes. Wear safety goggles.',
            },
          ],
          videos: [{ title: 'Metals and Non-metals Class 8', url: 'https://www.youtube.com/embed/DNpOH_U1jSE', duration: '22 min', source: 'Education' }],
          keyTerms: ['Lustrous', 'Malleable', 'Ductile', 'Sonorous', 'Reactivity series', 'Corrosion', 'Non-metal', 'Metal oxide'],
          quickFacts: ['Gold is so unreactive it\'s found as a pure metal in nature (gold nuggets)', 'Aluminium is the most abundant metal in Earth\'s crust (8%)', 'Diamond (carbon) is the hardest natural substance; graphite (also carbon) is one of the softest!'],
        },
        {
          id: 'c8s5', chapterNo: 5, title: 'Coal and Petroleum',
          description: 'Formation, uses and conservation of fossil fuels — coal, petroleum and natural gas.',
          topics: [
            { title: 'Formation of Fossil Fuels', content: 'Fossil fuels formed from remains of organisms buried millions of years ago. Coal: formed from ancient forests buried under water/mud, covered with more sediment, slowly converted to coal by heat and pressure (millions of years). Types: Peat → Lignite → Bituminous → Anthracite (increasing carbon content and heating value). Petroleum: formed from marine organisms buried in sea bed.' },
            { title: 'Coal and Its Products', content: 'Coal uses: thermal power plants (electricity), steel industry (coke), household fuel, making dyes, explosives, medicines. Products by destructive distillation: coke (carbon, for making steel), coal tar (making dyes, drugs, paints, naphthalene balls), coal gas (was used for street lighting in 1800s). Coal tar is black and smelly but has many useful chemicals.' },
            { title: 'Petroleum and Natural Gas', content: 'Petroleum (crude oil): mixture of hydrocarbons. Found deep underground. Extracted by drilling. Refining by fractional distillation in refineries: separated into different fractions: LPG (cooking gas), petrol/gasoline (cars), kerosene (jet fuel, lamps), diesel (trucks, buses), lubricating oil, paraffin wax (candles), bitumen (roads, waterproofing). India: major oil fields in Assam, Gujarat, Mumbai High.' },
            { title: 'Conservation of Fossil Fuels', content: 'Fossil fuels are non-renewable (once used, gone for millions of years). At current rates: known petroleum reserves may last ~50 more years! Problems: air pollution, greenhouse effect, acid rain, oil spills. Conservation: use public transport, share rides, turn off lights, use LED bulbs, renewable energy (solar, wind). India\'s National Solar Mission aims for 100 GW solar by 2022.' },
          ],
          formulas: [],
          experiments: [],
          videos: [{ title: 'Coal and Petroleum Class 8', url: 'https://www.youtube.com/embed/zaXBVYr9Ij0', duration: '18 min', source: 'Education' }],
          keyTerms: ['Fossil fuel', 'Coal', 'Petroleum', 'Natural gas', 'Fractional distillation', 'Coke', 'Coal tar', 'Non-renewable'],
          quickFacts: ['One litre of petrol requires 23 tonnes of ancient plants to form!', 'Saudi Arabia has 17% of world\'s proven oil reserves', 'India imports 85% of its petroleum — costs billions of dollars every year'],
        },
        {
          id: 'c8s16', chapterNo: 16, title: 'Light',
          description: 'Reflection laws, mirrors, refraction, lenses and the human eye.',
          topics: [
            { title: 'Laws of Reflection', content: 'When light hits a smooth surface: Angle of incidence = Angle of reflection (both measured from the normal). Incident ray, reflected ray and normal all lie in the same plane. Regular reflection: smooth mirror → clear image. Diffuse reflection: rough surface → scattered light, no clear image but whole surface visible. Plane mirror: image is virtual, erect, same size, laterally inverted, at same distance behind mirror.' },
            { title: 'Spherical Mirrors', content: 'Concave mirror: curved inward (reflecting surface inside). Can form real, inverted images (when object far) or virtual, magnified (close up). Used in: torches (light converges), doctors (ear/dental examination), solar cookers. Convex mirror: curved outward (reflecting outside). Always forms virtual, erect, diminished image. Used in: rear-view mirrors (wide field of view).' },
            { title: 'Refraction', content: 'Refraction: bending of light as it passes from one medium to another. Happens because light changes speed. From rarer to denser medium (air to glass): bends towards normal (slows down). From denser to rarer (glass to air): bends away from normal. Real-life refraction: pencil in water appears bent, coins in water appear raised, twinkling of stars.' },
            { title: 'Lenses and Human Eye', content: 'Convex lens: converges light, thicker in middle. Forms real inverted image (far objects) or virtual magnified (close — magnifying glass). Used in cameras, projectors, spectacles for far-sightedness. Concave lens: diverges light, thinner in middle. Forms virtual, erect, diminished image. Used for near-sightedness. Human eye: cornea+lens focuses image on retina. Retina converts to nerve signals.' },
          ],
          formulas: [
            { name: 'Law of Reflection', formula: 'Angle of incidence (i) = Angle of reflection (r)', example: 'Light hits mirror at 35°: reflects at 35°' },
            { name: 'Speed and Refractive Index', formula: 'n = c/v (refractive index = speed in vacuum / speed in medium)', example: 'Glass n≈1.5: light slows to c/1.5 = 2×10⁸ m/s' },
          ],
          experiments: [
            {
              title: 'Observing Refraction with Water and Coin',
              objective: 'Demonstrate refraction — coin appears closer than it is',
              materials: ['Deep bowl', 'Water', 'Coin', 'Pencil'],
              steps: ['Place coin at bottom of empty bowl', 'Look at coin from side of bowl — just visible', 'Slowly pour water without moving — coin appears to rise!', 'For pencil: place pencil in glass of water at angle', 'Observe from side — it appears bent at water surface'],
              result: 'Objects in water appear raised/bent — confirms light refracts (bends) at water-air boundary!',
            },
          ],
          videos: [{ title: 'Light Reflection Refraction Class 8', url: 'https://www.youtube.com/embed/5SGvbxS4RVQ', duration: '22 min', source: 'Education' }],
          keyTerms: ['Reflection', 'Refraction', 'Concave mirror', 'Convex mirror', 'Convex lens', 'Concave lens', 'Retina', 'Lateral inversion'],
          quickFacts: ['Human eye can distinguish 10 million different colors', 'Cats\' eyes have special cells (tapetum) that reflect light — why they glow in dark!', 'Fiber optic cables use total internal reflection to transmit data at speed of light'],
        },
      ],
    },

    // ── HISTORY (SOCIAL SCIENCE) ───────────────────────────────────
    {
      slug: 'social-science', name: 'Social Science (History)', icon: '📜', color: '#92400e', bg: '#fef3c7',
      description: 'Modern Indian history — Company rule, revolt, British policies',
      chapters: [
        {
          id: 'c8h1', chapterNo: 1, title: 'How, When and Where',
          description: 'How historians work, the importance of dates, colonial administration and sources.',
          topics: [
            { title: 'How Historians Work', content: 'Historians study the past using sources: documents, diaries, newspapers, official records, census data, photographs, paintings, archaeological remains, oral testimonies. Colonial period: British East India Company maintained detailed records (administrative reports, surveys, census, statistics). These were used to understand and control India. These same records now help historians understand colonial India.' },
            { title: 'The 1857 Date Controversy', content: 'Historians debate when "modern India" begins. British thought modern period = British rule (1757 or 1858). Indian historians: may say modern period = with emergence of nationalist consciousness. Dates are markers, not absolute truths. Different for different communities — what was important to Dalit history? Women\'s history? Each group has its own significant dates.' },
            { title: 'Census and Statistics', content: 'British conducted regular census starting 1872. Classified people by religion, caste, occupation. This data helped British rule but also created/hardened divisions (religion-based politics). Census showed: 1901 census — 294 million people in India. Now used to understand demographic change. Issues: some communities under-counted, categories were British assumptions not Indian realities.' },
          ],
          formulas: [],
          experiments: [],
          videos: [{ title: 'History Class 8 Chapter 1', url: 'https://www.youtube.com/embed/dv0cVv32g9c', duration: '16 min', source: 'Education' }],
          keyTerms: ['Primary source', 'Secondary source', 'Census', 'Colonialism', 'Periodisation', 'Official records'],
          quickFacts: ['British started the first Indian census in 1872 — India conducts it every 10 years', 'Jawaharlal Nehru wrote "Discovery of India" (1946) as his own interpretation of Indian history', 'Archaeology Act 1904 was passed to protect Indian historical monuments'],
        },
        {
          id: 'c8h2', chapterNo: 2, title: 'From Trade to Territory',
          description: 'How the British East India Company gained control of India — trade, battles, policies.',
          topics: [
            { title: 'East India Company', content: 'British East India Company founded 1600 for trade with East Indies. Initially traded in: cotton, silk, indigo dye, saltpetre, tea, spices. Set up trading posts (factories): Surat (1608), Madras (Fort St George, 1639), Bombay (from Portugal, 1668), Calcutta (Fort William, 1690). Had its own army (sepoys — Indian soldiers). Slowly from trade company to territorial power.' },
            { title: 'Key Battles for Control', content: 'Battle of Plassey (1757): Clive defeated Nawab Siraj-ud-Daulah (Bengal). Treachery by Mir Jafar (key general). Company gained Bengal — vast wealth. Battle of Buxar (1764): Company defeated combined forces of Bengal, Awadh, Mughal emperor. Diwani Rights: right to collect revenue of Bengal, Bihar, Orissa — enormous power. Subsidiary Alliance (Wellesley): Indian kings gave up armies, accepted British protection, paid for British troops.' },
            { title: 'Doctrine of Lapse (Dalhousie)', content: 'If an Indian ruler died without a male heir, the kingdom would be "lapsed" (taken over by British). Used to annex: Satara (1848), Jhansi (1853 — reason for Rani Laxmibai\'s revolt), Nagpur (1854). Also annexed Awadh (1856) claiming "misgovernance." These annexations directly caused the 1857 revolt — Indian rulers saw no future under British!' },
          ],
          formulas: [],
          experiments: [],
          videos: [{ title: 'British East India Company Class 8', url: 'https://www.youtube.com/embed/7s-ioHPpSiE', duration: '20 min', source: 'Education' }],
          keyTerms: ['East India Company', 'Plassey', 'Buxar', 'Diwani rights', 'Subsidiary alliance', 'Doctrine of Lapse', 'Sepoy', 'Factory'],
          quickFacts: ['Battle of Plassey (1757) — often called the real beginning of British India', 'Rani Laxmibai of Jhansi fought British after Doctrine of Lapse took her kingdom', 'At its peak, East India Company was the world\'s most powerful corporation — private army of 260,000!'],
        },
        {
          id: 'c8h5', chapterNo: 5, title: 'When People Rebel — 1857 and After',
          description: 'The 1857 revolt — causes, events, key leaders and its aftermath.',
          topics: [
            { title: 'Causes of the Revolt', content: 'Political: Doctrine of Lapse, disrespect for Indian rulers. Economic: heavy taxation, drain of wealth to Britain, handloom weavers unemployed (cheap British cloth). Social/Cultural: interference with Indian customs, forced conversion fears, Railways and Telegraph seen as disruption. Military: low pay, no promotion for Indian sepoys, greased cartridges controversy (Enfield rifle cartridge greased with cow and pig fat — offensive to Hindus and Muslims).' },
            { title: 'Key Events and Leaders', content: 'Mangal Pandey: first to openly revolt (Barrackpore, 29 March 1857 — before main revolt). 10 May 1857: Meerut sepoys mutinied, marched to Delhi. Sepoys proclaimed Bahadur Shah Zafar as leader. Key figures: Rani Laxmibai of Jhansi, Nana Sahib (Kanpur), Begum Hazrat Mahal (Lucknow), Tantia Tope, Bakht Khan. Mainly in northern India — Bombay and Madras largely unaffected.' },
            { title: 'End and Consequences', content: 'British crushed the revolt by 1858. Bahadur Shah Zafar exiled to Rangoon (died there 1862 — last Mughal emperor). East India Company abolished — British Crown took direct control of India. Governor General became Viceroy. Queen Victoria\'s Proclamation (1858): promised to respect Indian customs, no more annexations, Indians could be in administration. Changed British policies — but India still under colonial rule for 90 more years.' },
          ],
          formulas: [],
          experiments: [],
          videos: [{ title: '1857 Revolt India Class 8', url: 'https://www.youtube.com/embed/x0uf0UiPbEw', duration: '22 min', source: 'Education' }],
          keyTerms: ['1857 revolt', 'Sepoy mutiny', 'Mangal Pandey', 'Rani Laxmibai', 'Doctrine of Lapse', 'Bahadur Shah Zafar', 'Greased cartridge'],
          quickFacts: ['1857 is called "First War of Independence" by Indian historians and "Sepoy Mutiny" by British', 'Mangal Pandey was hanged on 8 April 1857 — 34 days before the main revolt', 'Rani Laxmibai died fighting on 18 June 1858 — at just 29 years of age'],
        },
      ],
    },

    // ── ENGLISH ────────────────────────────────────────────────────
    {
      slug: 'english', name: 'English', icon: '📖', color: '#1e3a5f', bg: '#eff6ff',
      description: 'Honeydew — literature, poetry, grammar',
      chapters: [
        {
          id: 'c8e1', chapterNo: 1, title: 'The Best Christmas Present in the World',
          description: 'A story about humanity in wartime — the 1914 Christmas truce in World War I.',
          topics: [
            { title: 'Story Summary', content: 'The narrator buys an old roll-top desk and finds a secret compartment with a letter from a World War I soldier, Jim Macpherson, written on Christmas Day 1914. The letter describes how German and British soldiers stopped fighting on Christmas night — they exchanged greetings, shared food and played football in No Man\'s Land. Jim asks his wife Connie to keep his memory alive. At the end, the narrator visits old Connie and she mistakes him for Jim.' },
            { title: 'Themes: War, Peace and Humanity', content: 'Theme 1: Common humanity transcends war — soldiers on both sides were ordinary people. Theme 2: The tragedy of war separating families and loved ones. Theme 3: Peace is possible when people see each other as human beings. The 1914 Christmas Truce was a real historical event — impromptu ceasefire on the Western Front. It shows that war is a political/economic decision forced on ordinary people.' },
            { title: 'Grammar: Passive Voice', content: 'Active voice: Subject does the action. "The soldiers signed the truce." Passive voice: Subject receives the action. "The truce was signed by the soldiers." Formation: Subject + to be (is/was/were/has been) + past participle + by + agent (optional). Use passive when: doer unknown, unimportant, or to emphasize the object/receiver. "The letter was found in the desk." (doer = narrator, not important).' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['World War I', 'Christmas truce', 'Passive voice', 'Theme', 'Humanity', 'Irony'],
          quickFacts: ['The 1914 Christmas Truce actually happened! About 100,000 soldiers participated', 'World War I lasted 4 years (1914-1918) and killed 20 million people', 'The letter in the story is fiction but inspired by real letters from WWI soldiers'],
        },
        {
          id: 'c8e3', chapterNo: 3, title: 'Glimpses of the Past',
          description: 'Comic strips showing the growth of national consciousness in 19th century India.',
          topics: [
            { title: 'Comic Strip Story', content: 'This chapter uses a comic strip format to show how the idea of India as a nation developed during the 19th century. It shows: British policies creating hardship (heavy taxes, drain of wealth), Indian intellectuals learning about freedom and rights from Western education, growing resentment against British rule, and the seeds of the Indian freedom movement being planted.' },
            { title: 'Reading Comics and Visual Literacy', content: 'Comics use both images AND words to tell a story. Panel: single frame. Dialogue balloon: speech of character. Caption box: narrator\'s voice. Gutter: space between panels. Sound effects: BANG, CRASH. Reading a comic: follow panels left to right, top to bottom. Visual literacy — understanding meaning from images — is as important as text literacy.' },
            { title: 'Grammar: Reported Speech', content: 'Direct speech: "I am hungry," he said. Reported speech: He said that he was hungry. Changes when reporting: I→he/she, am→was (tense shifts back), "said" = reporting verb. "told" needs an object: He told me that... Other verbs: asked (questions), exclaimed, complained, warned. Time references change: now→then, today→that day, tomorrow→the next day.' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['Comics', 'Visual literacy', 'Reported speech', 'Direct speech', 'Colonial India', 'National consciousness'],
          quickFacts: ['Comics and graphic novels are a serious literary form', 'Amar Chitra Katha (1967) has sold 100 million copies — India\'s most popular comic series', 'Reported speech is used in news articles — "The minister said that the project was complete"'],
        },
      ],
    },

    // ── HINDI ──────────────────────────────────────────────────────
    {
      slug: 'hindi', name: 'Hindi', icon: '📝', color: '#991b1b', bg: '#fee2e2',
      description: 'वसंत — कविता, गद्य, व्याकरण',
      chapters: [
        {
          id: 'c8h1h', chapterNo: 1, title: 'ध्वनि',
          description: 'सूर्यकांत त्रिपाठी निराला की कविता — नव-जीवन और उत्साह का संदेश।',
          topics: [
            { title: 'कविता का भावार्थ', content: '"ध्वनि" निराला जी की उत्साहवर्धक कविता है। कवि मृत मालाओं को जगाने की बात कहता है — अर्थात् जो लोग, विचार या सपने मर गए हैं, उन्हें फिर से जीवित करना चाहता है। कवि स्वयं में उर्जा और उमंग महसूस कर रहा है। "अभी न होगा मेरा अंत" — यह जीवन के प्रति सकारात्मक दृष्टिकोण है। प्रकृति के बिम्ब — वसंत ऋतु का उपयोग नव-जीवन के प्रतीक के रूप में।' },
            { title: 'निराला और छायावाद', content: 'सूर्यकांत त्रिपाठी "निराला" (1896-1961) हिंदी के महान कवि। छायावाद के चार स्तंभों में से एक (अन्य: प्रसाद, पंत, महादेवी वर्मा)। निराला ने हिंदी में मुक्त छंद (free verse) का प्रयोग किया — क्रांतिकारी कदम। प्रमुख रचनाएँ: राम की शक्तिपूजा, सरोज-स्मृति, तुलसीदास, जूही की कली। वे गरीबी में जिए पर भावनाओं से अमीर रहे।' },
            { title: 'व्याकरण: क्रियाविशेषण', content: 'क्रियाविशेषण वह शब्द है जो क्रिया, विशेषण या दूसरे क्रियाविशेषण की विशेषता बताए। भेद: कालवाचक (कब) — अभी, कल, तब, अब। स्थानवाचक (कहाँ) — यहाँ, वहाँ, ऊपर, नीचे। रीतिवाचक (कैसे) — धीरे, जल्दी, ध्यान से। परिमाणवाचक (कितना) — बहुत, थोड़ा, काफी, अधिक।' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['छायावाद', 'मुक्त छंद', 'निराला', 'बिम्ब', 'प्रतीक', 'क्रियाविशेषण'],
          quickFacts: ['"निराला" ने हिंदी में पहली बार मुक्त छंद कविता लिखी', 'छायावाद काल (1918-1938) हिंदी का स्वर्णयुग माना जाता है', '"राम की शक्तिपूजा" (1936) निराला की सबसे प्रसिद्ध कृति है'],
        },
        {
          id: 'c8h2h', chapterNo: 2, title: 'लाख की चूड़ियाँ',
          description: 'पद्मा सचदेव — बचपन की यादें, हस्तशिल्प और बदलते समाज की कहानी।',
          topics: [
            { title: 'कहानी का सारांश', content: '"लाख की चूड़ियाँ" एक भावभीनी कहानी है। कथाकार को बचपन में बदलू (लाख की चूड़ियाँ बनाने वाले) की दुकान बहुत प्रिय थी। बदलू की चूड़ियाँ हाथ से बनती थीं और हर स्त्री को उनकी पसंद के अनुसार मिलती थीं। पर धीरे-धीरे मशीनों से बनी सस्ती काँच की चूड़ियाँ आ गईं। बदलू का काम खत्म हो गया। कहानी में परिवर्तन का दर्द और पुराने हुनर के खोने की पीड़ा है।' },
            { title: 'हस्तशिल्प और औद्योगीकरण', content: 'भारत में पारंपरिक हस्तशिल्पकार बड़े पैमाने पर मशीनीकरण से प्रभावित हुए। लाख का काम, चर्म शिल्प, बुनाई, मिट्टी के बर्तन — सभी ऐसे शिल्प। अंग्रेजों के आने के बाद से ये कलाएँ खतरे में थीं। आज "Make in India" और "Vocal for Local" जैसी योजनाएँ इन्हें बचाने का प्रयास कर रही हैं।' },
            { title: 'व्याकरण: संधि', content: 'संधि = दो शब्दों या ध्वनियों का मेल। स्वर संधि: दो स्वरों का मेल (विद्या + अर्थी = विद्यार्थी)। व्यंजन संधि: व्यंजन + स्वर या व्यंजन (सत् + चित् = सच्चित)। विसर्ग संधि: विसर्ग का किसी से मेल (मनः + रथ = मनोरथ)। संधि-विच्छेद = शब्दों को अलग करना।' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['लाख', 'हस्तशिल्प', 'औद्योगीकरण', 'संधि', 'स्वर संधि', 'व्यंजन संधि', 'विसर्ग संधि'],
          quickFacts: ['लाख का उपयोग 5000 साल पहले सिंधु घाटी सभ्यता में होता था', 'भारत 300+ पारंपरिक हस्तशिल्प कलाओं का घर है', '"Vocal for Local" अभियान इन्हीं कारीगरों की मदद के लिए है'],
        },
      ],
    },
  ],
}

export const ALL_CLASS8_EXTRA_DATA: ClassData[] = [CLASS8_EXTRA]
