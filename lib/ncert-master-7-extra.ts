// lib/ncert-master-7-extra.ts
// Additional rich chapters for Class 7 — Science, Social Science, English, Hindi

import type { ClassData } from '@/lib/ncert-master'

export const CLASS7_EXTRA: ClassData = {
  classLevel: '7', label: 'Class 7', board: ['CBSE','ICSE','State'],
  description: 'Complete Class 7 — Heat, Acids/Bases, History, Geography, English, Hindi',
  subjects: [
    // ── MATHEMATICS (additional chapters) ──────────────────────────
    {
      slug: 'mathematics', name: 'Mathematics', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Integers, fractions, rational numbers, data handling, geometry',
      chapters: [
        {
          id: 'c7m1', chapterNo: 1, title: 'Integers',
          description: 'Operations on integers, properties and applications in real life.',
          topics: [
            { title: 'Integers Recap', content: 'Integers include positive numbers, negative numbers and zero: {...-3,-2,-1,0,1,2,3...}. On number line: positive is right, negative is left. Zero is neither positive nor negative. Absolute value of a number = its distance from zero (always positive). |−7| = 7, |+5| = 5.' },
            { title: 'Multiplication of Integers', content: 'Rules: positive × positive = positive. negative × negative = positive. positive × negative = negative. Mnemonic: same signs → positive result. Different signs → negative result. Examples: (−3)×(−4)=+12. (+5)×(−6)=−30. Any integer × 0 = 0. Any integer × 1 = same integer.' },
            { title: 'Division of Integers', content: 'Same sign rules as multiplication. (+ve)÷(+ve)=+ve. (−ve)÷(−ve)=+ve. (+ve)÷(−ve)=−ve. (−ve)÷(+ve)=−ve. Examples: (−24)÷(−6)=+4. (+18)÷(−3)=−6. Division by zero is undefined (not allowed). Zero divided by any integer = 0.' },
            { title: 'Properties of Integers', content: 'Closure under addition, subtraction, multiplication: result is always an integer. NOT closed under division (10÷3 is not integer). Commutative for + and ×. Associative for + and ×. Distributive: a(b+c) = ab+ac. Additive identity = 0. Multiplicative identity = 1. Additive inverse of a is −a.' },
          ],
          formulas: [
            { name: 'Sign Rules', formula: '(+)×(+)=+, (−)×(−)=+, (+)×(−)=−, (−)×(+)=−', example: '(−5)×(+3)=−15, (−4)×(−7)=+28' },
            { name: 'Absolute Value', formula: '|a| = a if a≥0, |a| = −a if a<0', example: '|−8|=8, |+6|=6, |0|=0' },
          ],
          experiments: [],
          videos: [{ title: 'Integers Class 7 - Complete Chapter', url: 'https://www.youtube.com/embed/QFXqRkFfIiA', duration: '18 min', source: 'Khan Academy' }],
          keyTerms: ['Integer', 'Absolute value', 'Closure', 'Commutative', 'Additive inverse', 'Sign rules'],
          quickFacts: ['Negative numbers were first used in India by Brahmagupta (628 CE)', 'Temperatures, altitudes, bank balances all use negative integers', 'Product of even number of negative integers = always positive'],
          vedicTricks: [{ trick: 'Count negatives in a multiplication: even count → positive answer', example: '(−2)×(−3)×(−4): 3 negatives (odd) → negative: −24' }],
        },
        {
          id: 'c7m2', chapterNo: 2, title: 'Fractions and Decimals',
          description: 'Multiplying and dividing fractions and decimals with applications.',
          topics: [
            { title: 'Multiplication of Fractions', content: 'Multiply numerators together and denominators together. a/b × c/d = ac/bd. Simplify before multiplying (cancel common factors). Fraction of a number: "of" means multiply. 3/4 of 24 = 3/4 × 24 = 18. Mixed numbers: convert to improper fractions first. 1½ × 2⅓ = 3/2 × 7/3 = 21/6 = 7/2 = 3½.' },
            { title: 'Division of Fractions', content: 'Dividing by a fraction = multiplying by its reciprocal. Reciprocal of p/q is q/p. a/b ÷ c/d = a/b × d/c = ad/bc. Example: 3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8 = 1⅞. How many ½-metre pieces in 3 metres? 3 ÷ ½ = 3 × 2 = 6 pieces.' },
            { title: 'Multiplication of Decimals', content: 'Multiply as whole numbers, then place decimal point. Count total decimal places in both numbers. Put same number in product. Example: 2.3 × 1.5: 23 × 15 = 345. Total decimal places = 1+1 = 2. Answer: 3.45. Multiplying by powers of 10: move decimal right (×10 → right 1, ×100 → right 2).' },
            { title: 'Division of Decimals', content: 'Dividing decimal by whole number: divide normally, put decimal in same position. Dividing by decimal: multiply both by 10 (or 100) to make divisor whole number. Example: 2.4 ÷ 0.3 = 24 ÷ 3 = 8. Dividing by powers of 10: move decimal left (÷10 → left 1).' },
          ],
          formulas: [
            { name: 'Fraction multiplication', formula: 'a/b × c/d = ac/bd', example: '2/3 × 3/4 = 6/12 = 1/2' },
            { name: 'Fraction division (reciprocal)', formula: 'a/b ÷ c/d = a/b × d/c', example: '2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6' },
          ],
          experiments: [],
          videos: [{ title: 'Fractions and Decimals Class 7', url: 'https://www.youtube.com/embed/0bxZwQNPRsA', duration: '22 min', source: 'Khan Academy' }],
          keyTerms: ['Reciprocal', 'Improper fraction', 'Mixed number', 'Decimal places', 'Multiplication', 'Division'],
          quickFacts: ['1÷3 = 0.333... (recurring decimal)', '1/7 = 0.142857142857... (repeating with period 6)', 'Fractions and decimals are same thing — different representations'],
          vedicTricks: [{ trick: 'To divide 1 by any fraction: just flip the fraction', example: '1 ÷ (3/7) = 7/3' }],
        },
        {
          id: 'c7m3', chapterNo: 3, title: 'Data Handling',
          description: 'Mean, median, mode, range and drawing bar graphs, histograms.',
          topics: [
            { title: 'Mean, Median, Mode', content: 'MEAN (average): sum ÷ count. MEDIAN: middle value when data is sorted. For even number of values: average of two middle values. MODE: value that appears most frequently. Multiple modes possible. RANGE: largest − smallest value. These are called measures of central tendency — they represent "typical" data.' },
            { title: 'Bar Graphs and Double Bar Graphs', content: 'Bar graph: bars of equal width, height = frequency. Double bar graph: two bars side by side for each category — used to compare two sets of data. Example: compare boys and girls marks in different subjects. Read bar graph: scale on y-axis, categories on x-axis.' },
            { title: 'Probability (Introduction)', content: 'Probability = chance of an event happening. P(event) = favourable outcomes / total outcomes. P(value) is between 0 and 1. P=0 means impossible. P=1 means certain. Example: tossing a coin: P(head) = 1/2. Rolling a die: P(getting 3) = 1/6. P(getting even number) = 3/6 = 1/2.' },
          ],
          formulas: [
            { name: 'Mean', formula: 'Mean = Sum of all observations / Total number', example: 'Data: 4,7,8,9,2. Sum=30, n=5. Mean=6' },
            { name: 'Probability', formula: 'P(event) = Number of favourable outcomes / Total outcomes', example: 'P(head) = 1/2. P(ace from deck) = 4/52 = 1/13' },
          ],
          experiments: [],
          videos: [{ title: 'Mean Median Mode Class 7', url: 'https://www.youtube.com/embed/uk3tKXrBzaU', duration: '20 min', source: 'Khan Academy' }],
          keyTerms: ['Mean', 'Median', 'Mode', 'Range', 'Probability', 'Frequency', 'Bar graph'],
          quickFacts: ['Weather forecasts use probability (60% chance of rain)', 'Insurance companies use probability to calculate risk', 'The most common score on two dice is 7 (probability 6/36)'],
          vedicTricks: [{ trick: 'For odd number of items, median = item at position (n+1)/2 when sorted', example: 'Data: 2,5,8,11,14 (n=5). Median at position 3 = 8' }],
        },
        {
          id: 'c7m6', chapterNo: 6, title: 'Triangles and Its Properties',
          description: 'Properties of triangles, angle sum, exterior angles and Pythagoras theorem.',
          topics: [
            { title: 'Angle Sum Property of Triangle', content: 'Sum of all angles in any triangle = 180°. Always true regardless of triangle type. Proof: draw a line parallel to base through the vertex — alternate angles and corresponding angles show the three angles of triangle make a straight line (180°). If two angles are known, third = 180° − sum of known two.' },
            { title: 'Exterior Angle Property', content: 'Exterior angle of a triangle = sum of the two non-adjacent interior angles. If exterior angle is ∠ACD, then ∠ACD = ∠A + ∠B. This is because exterior angle + interior angle = 180° (straight line), and sum of all three interior angles = 180°.' },
            { title: 'Pythagoras Theorem', content: 'In a right-angled triangle: (hypotenuse)² = (base)² + (perpendicular)². Hypotenuse = longest side, opposite to right angle. a² + b² = c². Pythagorean triples: (3,4,5), (5,12,13), (8,15,17). Check if triangle is right-angled: verify if squares of sides satisfy this.' },
          ],
          formulas: [
            { name: 'Angle sum in triangle', formula: '∠A + ∠B + ∠C = 180°', example: 'Angles 50°, 70°: third = 180-120 = 60°' },
            { name: 'Exterior angle theorem', formula: 'Exterior angle = sum of opposite interior angles', example: 'Interior angles 65° and 75°: exterior angle = 65+75 = 140°' },
            { name: 'Pythagoras theorem', formula: 'c² = a² + b²', example: 'a=3,b=4: c=√(9+16)=√25=5', note: 'c is hypotenuse (opposite to right angle)' },
          ],
          experiments: [],
          videos: [{ title: 'Triangles Properties Class 7', url: 'https://www.youtube.com/embed/JLXh4PBFiRg', duration: '16 min', source: 'Khan Academy' }],
          keyTerms: ['Angle sum', 'Exterior angle', 'Hypotenuse', 'Pythagoras theorem', 'Pythagorean triple'],
          quickFacts: ['Pythagoras theorem was known in India 1000 years before Pythagoras (Sulba Sutras, 800 BCE)', '3-4-5 right triangle was used by Egyptians to make right angles in construction', 'A² + B² = C² is used in GPS, construction, navigation'],
          vedicTricks: [{ trick: 'Pythagorean triple generator: n²+n = side, n+0.5 and n+1 for other sides', example: 'n=2: 4,4.5,5 → scale × 2 → 8,9,... not standard. Use known triples: 3-4-5, 5-12-13' }],
        },
      ],
    },

    // ── SCIENCE ────────────────────────────────────────────────────
    {
      slug: 'science', name: 'Science', icon: '⚗️', color: '#0369a1', bg: '#eff6ff',
      description: 'Heat, acids & bases, light, weather, forest ecosystem',
      chapters: [
        {
          id: 'c7s4', chapterNo: 4, title: 'Heat',
          description: 'Temperature, conduction, convection, radiation and insulators.',
          topics: [
            { title: 'Temperature and Heat', content: 'Heat is a form of energy that flows from hot to cold. Temperature is the measure of hotness/coldness. Unit: Celsius (°C), Kelvin (K), Fahrenheit (°F). Thermometer measures temperature. Clinical thermometer: 35-42°C range (for human body). Laboratory thermometer: -10 to 110°C. Body temperature: 37°C (98.6°F) is normal.' },
            { title: 'Transfer of Heat', content: 'CONDUCTION: heat transfer through solid materials by contact. Metals conduct well (good conductors) — iron, copper, aluminium. Wood, plastic are poor conductors (insulators). CONVECTION: heat transfer in liquids and gases — hot fluid rises (less dense), cold falls (more dense), creating convection currents. Basis of sea breeze, boiling water, hot air balloons.' },
            { title: 'Radiation', content: 'Heat transfer without any medium (works in vacuum). Energy travels as infrared waves (electromagnetic radiation). Sun heats Earth through radiation across empty space. Dark/dull surfaces absorb more radiation. Shiny/light surfaces reflect more. That\'s why we wear light clothes in summer and dark in winter. Thermocol and wool trap air — excellent insulators (no convection).' },
          ],
          formulas: [
            { name: 'Temperature Conversion', formula: 'F = (9/5)C + 32  |  C = (F-32) × 5/9', example: '37°C = 37×9/5+32 = 66.6+32 = 98.6°F', note: 'Normal body temperature' },
            { name: 'Kelvin to Celsius', formula: 'K = C + 273', example: '0°C = 273K (freezing of water). -273°C = 0K (absolute zero)' },
          ],
          experiments: [
            {
              title: 'Comparing Heat Conductivity of Materials',
              objective: 'Determine which materials are good conductors of heat',
              materials: ['Iron rod', 'Wooden rod', 'Plastic rod', 'Copper wire', 'Wax beads', 'Bunsen burner/candle'],
              steps: ['Attach wax beads at equal intervals along each material', 'Apply heat at one end of each simultaneously', 'Observe how quickly wax beads melt along each material', 'Record order of melting'],
              result: 'Metal rods (copper, iron) melt wax faster — good conductors. Wood and plastic melt slowly/not at all — poor conductors (insulators)',
              safetyNote: 'Handle hot equipment with oven mitt. Do not touch heated materials.',
            },
          ],
          videos: [{ title: 'Heat Conduction Convection Radiation Class 7', url: 'https://www.youtube.com/embed/CqJE7l7ISSU', duration: '18 min', source: 'Education' }],
          keyTerms: ['Conduction', 'Convection', 'Radiation', 'Conductor', 'Insulator', 'Temperature', 'Clinical thermometer', 'Convection current'],
          quickFacts: ['Absolute zero (-273°C) = coldest temperature possible — no heat energy at all', 'Vacuum flasks use radiation-blocking silver coating + vacuum (no conduction/convection)', 'Land heats faster than water — causes sea breeze and monsoon winds!'],
        },
        {
          id: 'c7s5', chapterNo: 5, title: 'Acids, Bases and Salts',
          description: 'Properties of acids and bases, pH scale, neutralisation and everyday applications.',
          topics: [
            { title: 'Acids', content: 'Acids taste sour (lemon juice, vinegar). Turn blue litmus RED. Release H⁺ ions in solution. Examples: HCl (hydrochloric acid — in stomach), H₂SO₄ (sulphuric acid), HNO₃ (nitric acid), CH₃COOH (acetic acid in vinegar), citric acid (in citrus fruits). Strong acids: HCl, H₂SO₄ (fully dissociate). Weak acids: CH₃COOH, citric acid.' },
            { title: 'Bases and Alkalis', content: 'Bases taste bitter, feel soapy. Turn red litmus BLUE. Alkalis = soluble bases. Examples: NaOH (sodium hydroxide — caustic soda), Ca(OH)₂ (lime water), Mg(OH)₂ (milk of magnesia — antacid), NH₃ (ammonia — in cleaning products). Uses: baking soda (NaHCO₃) for cooking, washing soda (Na₂CO₃) for laundry.' },
            { title: 'pH Scale and Indicators', content: 'pH measures acidity/alkalinity: 0-14 scale. pH < 7: acid. pH = 7: neutral (pure water). pH > 7: base/alkali. Litmus: natural indicator from lichens. Turns RED in acid, BLUE in base. Turmeric: yellow in acid/neutral, RED-BROWN in base. Phenolphthalein: colorless in acid, pink in base. Methylorange: red in acid, yellow in base.' },
            { title: 'Neutralisation', content: 'Acid + Base → Salt + Water. This is neutralisation reaction. The acid and base neutralise each other. Examples: HCl + NaOH → NaCl + H₂O. Stomach acidity (excess HCl) treated with antacid (base like Mg(OH)₂). Ant bite (formic acid) → apply baking soda. Bee sting (alkali) → apply vinegar. Soil acidity → add lime.' },
          ],
          formulas: [
            { name: 'Neutralisation', formula: 'Acid + Base → Salt + Water', example: 'HCl + NaOH → NaCl + H₂O (table salt + water)' },
            { name: 'pH Scale', formula: 'pH 0-6: acid (lower = stronger). pH 7: neutral. pH 8-14: base (higher = stronger)', example: 'Battery acid: pH 1. Lemon: pH 2. Blood: pH 7.4. Baking soda: pH 9. Drain cleaner: pH 14' },
          ],
          experiments: [
            {
              title: 'Natural Indicators from Plants',
              objective: 'Make natural pH indicator from red cabbage or turmeric',
              materials: ['Red cabbage (or turmeric)', 'Water', 'Various liquids: vinegar, lemon juice, baking soda solution, soap solution', 'White cups'],
              steps: ['Boil red cabbage in water — extract purple juice', 'Pour small amounts of extract into separate cups', 'Add different liquids to each cup', 'Observe color changes', 'Record: pink/red = acid, green/yellow = base, purple = neutral'],
              result: 'Natural indicators change color based on pH. Acids turn red cabbage pink, bases turn it green!',
              safetyNote: 'Do not use strong laboratory acids/bases. Household items only.',
            },
          ],
          videos: [{ title: 'Acids Bases Salts Class 7', url: 'https://www.youtube.com/embed/L7AsMIRIBxA', duration: '20 min', source: 'Education' }],
          keyTerms: ['Acid', 'Base', 'Salt', 'Litmus', 'pH scale', 'Neutralisation', 'Indicator', 'Alkali'],
          quickFacts: ['Human blood pH = 7.35-7.45 (slightly alkaline)', 'Acid rain has pH below 5.6 — damages monuments and aquatic life', 'Baking soda (NaHCO₃) releases CO₂ in oven — makes cakes rise!'],
        },
        {
          id: 'c7s6', chapterNo: 6, title: 'Physical and Chemical Changes',
          description: 'Difference between physical and chemical changes with examples.',
          topics: [
            { title: 'Physical Changes', content: 'A change in shape, size, state or appearance WITHOUT forming a new substance. The change is usually REVERSIBLE. Examples: melting ice (water → ice → water), dissolving sugar in water (can evaporate to get sugar back), tearing paper, cutting vegetables, melting wax. NO new substance formed. Same chemical formula before and after.' },
            { title: 'Chemical Changes', content: 'A change that produces a NEW substance with different properties. Usually IRREVERSIBLE. Signs of chemical change: new colour, new smell, gas produced, heat/light produced, precipitate formed. Examples: burning paper (ash formed), rusting of iron, curdling of milk, cooking an egg, photosynthesis, ripening of fruit. Cannot get original substance back easily.' },
            { title: 'Rusting and Crystallisation', content: 'Rusting: iron reacts with oxygen and water to form rust (Fe₂O₃·xH₂O). Chemical change — reddish-brown, flaky. Prevents with painting, oiling, galvanising (zinc coating). Crystallisation: growing crystals from supersaturated solution — example copper sulphate crystals (blue). This is physical change — can dissolve crystals and get solution back.' },
          ],
          formulas: [
            { name: 'Rusting (simplified)', formula: 'Iron + Oxygen + Water → Iron Oxide (rust)', example: '4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃ → Fe₂O₃ (rust)' },
          ],
          experiments: [
            {
              title: 'Comparing Physical and Chemical Changes',
              objective: 'Classify various changes as physical or chemical',
              materials: ['Ice cube', 'Paper', 'Candle', 'Vinegar', 'Baking soda', 'Milk', 'Lemon'],
              steps: ['Melt ice cube — observe', 'Tear paper — observe', 'Burn paper (teacher demo) — observe', 'Mix vinegar + baking soda — observe', 'Add lemon to warm milk — observe', 'Classify each as physical or chemical'],
              result: 'Melting, tearing = physical (reversible). Burning, vinegar+baking soda, curdling milk = chemical (new substance formed)!',
              safetyNote: 'Burning experiment must be done by teacher only.',
            },
          ],
          videos: [{ title: 'Physical and Chemical Changes Class 7', url: 'https://www.youtube.com/embed/gFmLiD5BHIU', duration: '16 min', source: 'Education' }],
          keyTerms: ['Physical change', 'Chemical change', 'Reversible', 'Irreversible', 'Rusting', 'Crystallisation'],
          quickFacts: ['Cooking is a chemical change — you can\'t "uncook" an egg!', 'Digestion is a chemical change — food molecules are broken down into simpler ones', 'Gold and platinum resist chemical changes (rusting, oxidation) — why they\'re valuable'],
        },
        {
          id: 'c7s7', chapterNo: 7, title: 'Weather, Climate and Adaptations',
          description: 'Difference between weather and climate, factors, and animal adaptations.',
          topics: [
            { title: 'Weather vs Climate', content: 'Weather: atmospheric conditions at a specific place at a specific time. Changes daily. Climate: average weather of a place over 25-30 years. More stable. India\'s climate: tropical monsoon. Polar regions: extreme cold (-40°C), very little rainfall. Tropical rainforests: hot and wet all year (25-30°C, 200+ cm rain).' },
            { title: 'Factors Affecting Weather', content: 'Temperature (thermometer), rainfall (rain gauge), wind speed (anemometer), wind direction (wind vane), humidity (hygrometer), cloudiness. Weather forecast: observation stations collect data, sent to meteorological department, processed by computers. Forecasts help farmers, pilots, shipping, disaster management.' },
            { title: 'Adaptations in Polar Regions', content: 'Polar bear: thick layer of fat (blubber) for insulation, thick white fur for camouflage, small ears to retain heat, sharp claws for ice, excellent swimmers. Penguins: huddled behaviour (rotate outside to inside), thick fat layer, flipper-wings for swimming, dense waterproof feathers. Arctic fox: white in winter, brown in summer (camouflage).' },
            { title: 'Adaptations in Tropical Rainforests', content: 'Trees very tall (to reach sunlight through canopy), buttress roots for support. Monkeys: prehensile tail (grip branches), binocular vision, agile. Toucans: large colorful bills to reach fruits deep in dense vegetation. Red-eyed tree frog: bright colors (warning to predators), toe pads for climbing. Snakes: camouflage patterns.' },
          ],
          formulas: [],
          experiments: [],
          videos: [{ title: 'Weather Climate Adaptations Class 7', url: 'https://www.youtube.com/embed/MIgJF1QCgKU', duration: '18 min', source: 'Education' }],
          keyTerms: ['Weather', 'Climate', 'Adaptation', 'Blubber', 'Camouflage', 'Humidity', 'Anemometer', 'Rain gauge'],
          quickFacts: ['Amazon rainforest produces 20% of world\'s oxygen', 'Polar bears are actually black-skinned under their fur — white fur tubes channel UV light', 'India has 7 climate zones from polar (Himalayas) to tropical (Andaman)!'],
        },
        {
          id: 'c7s12', chapterNo: 12, title: 'Reproduction in Plants',
          description: 'Modes of plant reproduction — vegetative, sexual, pollination, seed dispersal.',
          topics: [
            { title: 'Vegetative Propagation', content: 'Plants reproduce without seeds using vegetative parts. Types: Stem cutting (rose, sugarcane), Layering (jasmine — bend stem to soil, roots form, then cut), Budding (grafting one plant onto another), Rhizomes (ginger, turmeric underground stem), Tubers (potato — eyes are buds), Bulbs (onion, garlic). Advantages: faster, identical to parent, no need for seeds.' },
            { title: 'Sexual Reproduction in Plants', content: 'Involves pollen (male) and ovule/egg (female). Flower parts: stamen (male — anther + filament), pistil (female — stigma + style + ovary). Pollination: transfer of pollen from anther to stigma. Self-pollination: same flower. Cross-pollination: different flowers — by wind, insects (bees, butterflies), water, birds.' },
            { title: 'Fertilisation and Fruit Formation', content: 'After pollination, pollen grain germinates, grows pollen tube down style to ovary. Male nucleus fuses with egg (fertilisation). Fertilised egg = zygote → embryo → seed. Ovary → fruit. The fruit protects the seed. True fruit: from ovary. False fruit: from other flower parts (apple — thalamus, not ovary).' },
            { title: 'Seed Dispersal', content: 'Seeds need to travel away from parent plant (to avoid competition, reach new areas). Methods: Wind (dandelion, maple — lightweight, wings/parachutes), Water (coconut — floats), Animal — inside (berries eaten, seeds excreted) or outside (hooks/spines stick to fur — bur, Xanthium), Explosion (touch-me-not/Mimosa, castor — seed pod bursts).' },
          ],
          formulas: [],
          experiments: [
            {
              title: 'Growing a Plant from a Cutting',
              objective: 'Demonstrate vegetative propagation using stem cutting',
              materials: ['Healthy rose/hibiscus stem cutting (15cm)', 'Pot with moist soil', 'Polythene bag', 'Rooting powder (optional)'],
              steps: ['Take cutting just below leaf node', 'Remove lower leaves', 'Dip end in rooting powder (optional)', 'Plant in moist soil', 'Cover with polythene bag (humidity)', 'Keep in indirect sunlight', 'Observe for new growth in 2-3 weeks'],
              result: 'New roots and shoots emerge from cutting — vegetative propagation confirmed!',
              safetyNote: 'Use clean, sharp scissors for cutting.',
            },
          ],
          videos: [{ title: 'Reproduction in Plants Class 7', url: 'https://www.youtube.com/embed/qHPBh3IvNpk', duration: '22 min', source: 'Education' }],
          keyTerms: ['Vegetative propagation', 'Pollination', 'Fertilisation', 'Stamen', 'Pistil', 'Seed dispersal', 'Cross-pollination'],
          quickFacts: ['A single dandelion plant can produce up to 15,000 seeds!', 'The coconut can float and remain viable for 3 months at sea', 'Bees pollinate 1/3 of all food humans eat'],
        },
      ],
    },

    // ── SOCIAL SCIENCE (HISTORY) ───────────────────────────────────
    {
      slug: 'social-science', name: 'Social Science', icon: '🌍', color: '#065f46', bg: '#d1fae5',
      description: 'Medieval India, the Mughals, geography of India',
      chapters: [
        {
          id: 'c7ss1', chapterNo: 1, title: 'Tracing Changes Through a Thousand Years',
          description: 'How India changed from 700 CE to 1750 CE — sources, maps, languages.',
          topics: [
            { title: 'Sources of Medieval History', content: 'Coins, inscriptions (stone/copper plates), manuscripts (written texts), buildings, monuments. Chronicles: history books written by court historians (Biographies of kings). Persian/Arabic texts. Archaeological evidence. Notable text: Ain-i-Akbari by Abul Fazl (about Akbar\'s empire). Problem: most written by those in power — may be biased.' },
            { title: 'Changes in Medieval Period', content: 'Major changes from 700-1750 CE: New religions spread (Islam arrived in India), new rulers (Sultans, Mughals), new languages (Persian became court language), new architecture (mosques, tombs, forts with Islamic style), new foods and crops (from Central Asia, Americas via trade), new trade routes.' },
            { title: 'Brahmanas and Rajputs', content: 'Brahmanas: upper caste priests and scholars, maintained Sanskrit learning. Rajputs: warrior clans who became rulers across northern India. Valued bravery and honour. Many clans: Chahamanas, Chandellas, Paramaras, Solankis. They fought among themselves but united against external invaders. Rajput courts patronized art and literature.' },
          ],
          formulas: [],
          experiments: [],
          videos: [{ title: 'Medieval India History Class 7', url: 'https://www.youtube.com/embed/gOmCbBh7lRw', duration: '20 min', source: 'Education' }],
          keyTerms: ['Chronicle', 'Manuscript', 'Inscription', 'Medieval period', 'Rajput', 'Brahmana', 'Persian'],
          quickFacts: ['Medieval period in India: 700-1750 CE (roughly)', 'The word "India" comes from the river Indus (Sindhu in Sanskrit)', 'Arabic numerals (0-9) reached Europe from India via Arab mathematicians in medieval period'],
        },
        {
          id: 'c7ss2', chapterNo: 2, title: 'New Kings and Kingdoms',
          description: 'Rise of new dynasties after the Gupta empire — Rashtrakutas, Cholas, Palas.',
          topics: [
            { title: 'After the Guptas', content: 'After the Gupta empire declined (550 CE), smaller kingdoms arose across India. Harsha ruled northern India (606-647 CE) — last great Hindu empire of north. Chinese pilgrim Xuanzang visited during Harsha\'s time. After Harsha, no single king ruled north. Regional kingdoms: Palas (Bengal), Pratiharas (Rajasthan), Rashtrakutas (Deccan) — the "tripartite struggle" for Kannauj.' },
            { title: 'The Chola Empire', content: 'Most powerful south Indian kingdom (9th-13th century). Capital: Thanjavur (Tanjore). Famous rulers: Rajaraja Chola I, Rajendra Chola I. Rajendra Chola sent naval expedition to Southeast Asia! Built magnificent temples: Brihadeeswarar Temple, Thanjavur (a UNESCO World Heritage Site). Had a strong navy, efficient administration with sabhas (village councils).' },
            { title: 'Land Revenue and Administration', content: 'Kings owned land and collected land tax (bhumi kara) from peasants. Land grants to brahmanas and temples created powerful new landowners. Village headmen (mukhiya/patel) collected tax locally. Copper plates recorded land grants. Tax = typically 1/6 to 1/4 of produce. Traders paid customs duties.' },
          ],
          formulas: [],
          experiments: [],
          videos: [{ title: 'Chola Empire Class 7', url: 'https://www.youtube.com/embed/P_1yBxg7aPs', duration: '18 min', source: 'Education' }],
          keyTerms: ['Harsha', 'Chola', 'Rashtrakuta', 'Pala', 'Tripartite struggle', 'Brihadeeswarar', 'Bhumi kara'],
          quickFacts: ['Rajendra Chola\'s navy reached as far as present-day Malaysia and Indonesia!', 'Brihadeeswarar Temple (1010 CE) is 70m tall — built without modern machinery', 'India had no single ruler for 600+ years after Harsha (till the Delhi Sultanate)'],
        },
        {
          id: 'c7ss4', chapterNo: 4, title: 'The Mughal Empire',
          description: 'Rise of the Mughal Empire, major rulers, administration, art and culture.',
          topics: [
            { title: 'Founding of the Mughal Empire', content: 'Babur founded the Mughal Empire in 1526 by defeating Ibrahim Lodi at First Battle of Panipat. Babur was from Central Asia (Fergana valley). He wrote an autobiography: Baburnama (in Chagatai Turkic). Humayun (his son) was defeated by Sher Shah Suri and spent 15 years in exile in Persia, returned in 1555.' },
            { title: 'Akbar the Great (1556-1605)', content: 'Greatest Mughal emperor. Conquered Gujarat, Bengal, Kashmir, Rajputana. Policy of Sulh-i-kul (peace with all). Abolished jizyah (tax on non-Muslims). Married Rajput princess Jodha Bai (religious tolerance). Din-i-Ilahi: new religious movement combining best of all religions. Navratnas (nine jewels): Tansen, Birbal, Todar Mal, Abul Fazl etc.' },
            { title: 'Shah Jahan and the Taj Mahal', content: 'Shah Jahan (1627-1658) built the most beautiful monuments. Taj Mahal: built 1631-1648 in memory of wife Mumtaz Mahal, in Agra. 20,000 workers. White marble from Makrana (Rajasthan). 28 types of precious stones from Asia. One of the Seven Wonders of the World. Also built Red Fort (Lal Qila) in Delhi, Jama Masjid.' },
            { title: 'Mughal Administration', content: 'Empire divided into provinces (Subas). Each suba headed by a Subedar. Land tax system: Zabti (Todar Mal\'s system) — measured land, fixed tax based on actual production. Mansabdari system: ranks for officials (mansabdars), assigned based on merit. Military: Mughal army had elephants, cavalry, firearms.' },
          ],
          formulas: [],
          experiments: [],
          videos: [{ title: 'Mughal Empire Class 7', url: 'https://www.youtube.com/embed/9sXGCGJaIhk', duration: '22 min', source: 'Education' }],
          keyTerms: ['Babur', 'Akbar', 'Sulh-i-kul', 'Din-i-Ilahi', 'Mansabdari', 'Shah Jahan', 'Taj Mahal', 'Subedar', 'Zabti'],
          quickFacts: ['Taj Mahal took 17 years to build (1631-1648)', 'Akbar was illiterate but one of India\'s greatest administrators!', 'Todar Mal\'s land revenue system was so good that British used similar system 200 years later'],
        },
        {
          id: 'c7geo1', chapterNo: 1, title: 'Our Environment (Geography)',
          description: 'Environment, ecosystems, food chain, biotic and abiotic components.',
          topics: [
            { title: 'Environment and Its Components', content: 'Environment = everything around us. Biotic components: all living things — plants, animals, microorganisms. Abiotic components: non-living — air, water, soil, sunlight, temperature. These interact with each other constantly. Example: plants need sunlight (abiotic) to grow, animals eat plants (biotic), decomposers break dead matter back to soil.' },
            { title: 'Ecosystem', content: 'An ecosystem is a community of living organisms interacting with each other and their environment. Types: Forest ecosystem, Grassland ecosystem, Aquatic ecosystem (pond, ocean), Desert ecosystem. Energy flows from sun → producers → consumers → decomposers. Each ecosystem has producers (plants), consumers (animals), decomposers (bacteria, fungi).' },
            { title: 'Food Chain and Food Web', content: 'Food chain: Grass → Grasshopper → Frog → Snake → Eagle. Shows who eats whom. Energy lost at each step (only ~10% passed on). Food web: multiple interconnected food chains — more realistic. Example: grass → deer → tiger AND grass → rabbit → fox → eagle. If one species disappears, it affects the whole web.' },
          ],
          formulas: [
            { name: '10% Energy Rule', formula: 'Only 10% of energy passes from one trophic level to the next', example: 'If plants have 10,000 J, herbivores get 1,000 J, carnivores get 100 J' },
          ],
          experiments: [],
          videos: [{ title: 'Environment Ecosystem Class 7', url: 'https://www.youtube.com/embed/3pGFLVU_nAo', duration: '16 min', source: 'Education' }],
          keyTerms: ['Biotic', 'Abiotic', 'Ecosystem', 'Food chain', 'Food web', 'Producer', 'Consumer', 'Decomposer'],
          quickFacts: ['1 kg of vegetation needs ~10 kg of sunlight/water to produce', 'Removing just one species can collapse an entire ecosystem', 'Bacteria and fungi are nature\'s recyclers — essential decomposers'],
        },
      ],
    },

    // ── ENGLISH ────────────────────────────────────────────────────
    {
      slug: 'english', name: 'English', icon: '📖', color: '#1e3a5f', bg: '#eff6ff',
      description: 'Literature, poetry, grammar — Honeycomb and An Alien Hand',
      chapters: [
        {
          id: 'c7e1', chapterNo: 1, title: 'Three Questions',
          description: 'Leo Tolstoy\'s short story about the three most important questions in life.',
          topics: [
            { title: 'Story Summary', content: 'A king wants answers to three questions: When is the right time to do things? Who are the most important people? What is the most important thing to do? He visits a wise hermit. While there, a wounded enemy arrives. The king helps him and they make peace. The hermit\'s answer: The right time is now. The most important person is whoever you\'re with. The most important deed is doing good to that person.' },
            { title: 'Theme and Moral', content: 'Theme: Living in the present moment. Don\'t wait for the "perfect" time — act now. The story is from Leo Tolstoy (1828-1910), Russia\'s greatest writer, author of "War and Peace" and "Anna Karenina". Moral: the present moment, the person before you, and kindness are the most important. Mindfulness philosophy.' },
            { title: 'Grammar: Adverbs', content: 'Adverbs modify verbs, adjectives, or other adverbs. Types: Manner (quickly, slowly, carefully), Time (now, then, yesterday, soon), Place (here, there, inside), Frequency (always, never, often, sometimes), Degree (very, too, quite, extremely). Formation: most adverbs of manner = adjective + -ly (quick → quickly, careful → carefully).' },
          ],
          formulas: [],
          experiments: [],
          videos: [{ title: 'Three Questions Class 7 English', url: 'https://www.youtube.com/embed/c6J0ZNBG0kA', duration: '12 min', source: 'Education' }],
          keyTerms: ['Theme', 'Moral', 'Adverb', 'Present moment', 'Short story', 'Tolstoy'],
          quickFacts: ['Leo Tolstoy (1828-1910) wrote War and Peace — one of the longest novels ever', 'The story\'s message aligns with Buddhist and Hindu philosophy — mindfulness', 'Tolstoy was influenced by Indian philosophy and corresponded with Mahatma Gandhi!'],
        },
        {
          id: 'c7e2', chapterNo: 2, title: 'A Gift of Chappals',
          description: 'A story about a child\'s kindness and the value of generosity.',
          topics: [
            { title: 'Story Summary', content: 'Mridu visits her cousins. They secretly give their expensive new chappals to a poor music teacher. When their mother discovers, she is angry at first. But the music teacher plays beautiful music. The story shows children\'s natural generosity vs adult practicality. Theme: spontaneous kindness is a gift more precious than any material thing.' },
            { title: 'Values in the Story', content: 'Generosity: giving without thinking of return. Empathy: feeling the music teacher\'s need. Children often see things more clearly than adults — they see a person in need, not a "problem." Music as a bridge between people. The chappals become a symbol of connection between different social classes.' },
            { title: 'Grammar: Tenses (Review)', content: 'Simple Past: He played. Past Continuous: He was playing. Past Perfect: He had played. Present Perfect: He has played. Using correctly gives writing precision. Past narrative uses Simple Past and Past Continuous together: "She was cooking when he arrived." Sequence of events in past: Past Perfect for earlier event.' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['Theme', 'Generosity', 'Simple past', 'Past continuous', 'Past perfect', 'Present perfect'],
          quickFacts: ['The story is set in South India (chappals are Tamil word for footwear)', 'Carnatic music is one of the two classical music systems of India (other is Hindustani)'],
        },
      ],
    },

    // ── HINDI ──────────────────────────────────────────────────────
    {
      slug: 'hindi', name: 'Hindi', icon: '📝', color: '#991b1b', bg: '#fee2e2',
      description: 'हिंदी — कविता, गद्य, व्याकरण',
      chapters: [
        {
          id: 'c7h1', chapterNo: 1, title: 'हम पंछी उन्मुक्त गगन के',
          description: 'शिवमंगल सिंह सुमन की कविता — स्वतंत्रता का महत्त्व।',
          topics: [
            { title: 'कविता का भावार्थ', content: '"हम पंछी उन्मुक्त गगन के" कविता में पक्षी पिंजरे में बंद हैं। वे स्वतंत्रता की माँग कर रहे हैं। पक्षी कहते हैं — हम खुले आसमान में उड़ना चाहते हैं, तूफानों का सामना करना चाहते हैं, अपनी मर्जी से जीना चाहते हैं। सुनहरे पिंजरे की तुलना में जंगल की आज़ादी ज्यादा प्यारी है। स्वतंत्रता का प्रतीकात्मक अर्थ — राष्ट्रीय स्वतंत्रता का संकेत भी हो सकता है।' },
            { title: 'शिवमंगल सिंह सुमन', content: 'शिवमंगल सिंह सुमन (1915-2002) हिंदी के प्रमुख प्रगतिवादी कवि थे। उत्तर प्रदेश में जन्मे। उन्हें पद्मश्री और साहित्य अकादमी पुरस्कार मिला। उनकी कविताओं में सामाजिक चेतना, देशप्रेम और प्रकृति-प्रेम का मेल है। अन्य प्रमुख कृतियाँ: "विश्वास बढ़ता ही रहा", "पर आँखें नहीं भरीं"।' },
            { title: 'व्याकरण: सर्वनाम और विशेषण', content: 'सर्वनाम = संज्ञा के स्थान पर प्रयुक्त शब्द। प्रकार: पुरुषवाचक (मैं, तुम, वह), निश्चयवाचक (यह, वह), अनिश्चयवाचक (कोई, कुछ), प्रश्नवाचक (कौन, क्या), संबंधवाचक (जो, सो)। विशेषण = संज्ञा की विशेषता बताने वाला। जैसे: लाल फूल, मोटी किताब, तीन बच्चे, कुछ पानी।' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['स्वतंत्रता', 'प्रतीक', 'सर्वनाम', 'विशेषण', 'प्रगतिवाद', 'पुरुषवाचक सर्वनाम'],
          quickFacts: ['भारत में 22 अधिकारिक भाषाएँ हैं, हिंदी सबसे अधिक बोली जाती है', '"उन्मुक्त" का अर्थ है स्वतंत्र, खुला', 'पक्षी भारतीय साहित्य में स्वतंत्रता के प्रतीक के रूप में अक्सर आते हैं'],
        },
      ],
    },
  ],
}

export const ALL_CLASS7_EXTRA_DATA: ClassData[] = [CLASS7_EXTRA]
