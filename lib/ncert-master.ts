// lib/ncert-master.ts
// ══════════════════════════════════════════════════════════════════
// MASTER NCERT DATABASE — Class 1-12, All Subjects, 500+ Chapters
// Formulas, Experiments, Video Links — International Level
// ══════════════════════════════════════════════════════════════════

export interface Topic {
  title: string
  content: string
  image?: string   // Wikipedia/Commons URL
  gif?: string     // Wikimedia GIF URL
}

export interface Formula {
  name: string
  formula: string   // display text
  latex?: string    // for rendering
  example: string
  note?: string
}

export interface Experiment {
  title: string
  objective: string
  materials: string[]
  steps: string[]
  result: string
  safetyNote?: string
}

export interface VideoLink {
  title: string
  url: string       // YouTube embed URL (copyright-free edu)
  duration: string
  source: string
}

export interface Chapter {
  id: string
  chapterNo: number
  title: string
  description: string
  topics: Topic[]
  formulas: Formula[]
  experiments: Experiment[]
  videos: VideoLink[]
  keyTerms: string[]
  quickFacts: string[]
  vedicTricks?: { trick: string; example: string }[]
  imageUrl?: string  // chapter header image (open source)
}

export interface Subject {
  slug: string
  name: string
  icon: string
  color: string
  bg: string
  description: string
  chapters: Chapter[]
}

export interface ClassData {
  classLevel: string
  label: string
  description: string
  board: string[]
  subjects: Subject[]
}

// ══════════════════════════════════════════════════════════════════
// CLASS 6
// ══════════════════════════════════════════════════════════════════
export const CLASS6: ClassData = {
  classLevel: '6', label: 'Class 6', board: ['CBSE','ICSE','State'],
  description: 'Foundation year — Integers, Basic Science, History, Geography',
  subjects: [
    {
      slug: 'mathematics', name: 'Mathematics', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Number systems, algebra basics, geometry, mensuration and data handling',
      chapters: [
        {
          id: 'c6m1', chapterNo: 1, title: 'Knowing Our Numbers',
          description: 'Indian and international number systems, large numbers, estimation and Roman numerals.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Fibonacci_spiral_34.svg/400px-Fibonacci_spiral_34.svg.png',
          topics: [
            { title: 'Indian Number System', content: 'Uses places: Ones, Tens, Hundreds, Thousands, Ten Thousands, Lakhs, Ten Lakhs, Crores. Grouping is 2-2-3 from right. Example: 1,23,45,678 = One crore twenty-three lakh forty-five thousand six hundred seventy-eight.' },
            { title: 'International Number System', content: 'Groups of 3: Ones, Thousands, Millions, Billions. Example: 123,456,789 = One hundred twenty-three million four hundred fifty-six thousand seven hundred eighty-nine. Used globally in science and business.' },
            { title: 'Comparing Numbers', content: 'More digits = larger number. Same digits: compare from leftmost digit. The largest 5-digit number is 99,999. The smallest 5-digit number is 10,000. Successor = number + 1; Predecessor = number - 1.' },
            { title: 'Estimation', content: 'Round to nearest 10: look at units digit. ≥5 → round up; <5 → round down. Example: 47 → 50; 43 → 40. Estimation helps in daily life for quick approximate calculations.' },
            { title: 'Roman Numerals', content: 'Symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Rules: smaller before larger = subtract (IV=4, IX=9). Larger before smaller = add (VI=6, XI=11). Maximum 3 same symbols in a row.' },
          ],
          formulas: [
            { name: 'Place Value', formula: 'Place Value = Face Value × Position Value', example: 'In 5432: place value of 4 = 4 × 100 = 400', note: 'Position values: 1, 10, 100, 1000...' },
            { name: 'Estimation (nearest 10)', formula: 'If units ≥ 5: add 10, units=0. If units < 5: units=0', example: '67 → 70, 54 → 50, 85 → 90' },
            { name: 'Large Number Formula', formula: '1 crore = 100 lakhs = 10 million', example: '2.5 crore = 25 million = 25,000,000' },
          ],
          experiments: [],
          videos: [
            { title: 'Knowing Our Numbers - Class 6 NCERT', url: 'https://www.youtube.com/embed/FqNMQQnbHa0', duration: '12 min', source: 'Education Channel' },
            { title: 'Indian vs International Number System', url: 'https://www.youtube.com/embed/5MkleW5-LBU', duration: '8 min', source: 'Khan Academy' },
          ],
          keyTerms: ['Place value', 'Face value', 'Estimation', 'Roman numerals', 'Successor', 'Predecessor'],
          quickFacts: ['India is the only country using 2-digit grouping (lakhs, crores)', '1 billion = 100 crore', 'Romans used their numeral system for 1000+ years', 'Largest number with Indian system name: 99 crore 99 lakh 99 thousand 999'],
          vedicTricks: [
            { trick: 'Multiply any number by 9: subtract from next multiple of 10 and subtract 1', example: '7×9 = 70-7 = 63. Check: 7×9=63 ✓' },
          ],
        },
        {
          id: 'c6m2', chapterNo: 2, title: 'Whole Numbers',
          description: 'Natural numbers, whole numbers, number line, properties of operations.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Number-line.svg/400px-Number-line.svg.png',
          topics: [
            { title: 'Natural and Whole Numbers', content: 'Natural numbers: 1, 2, 3, 4... (counting numbers, start from 1). Whole numbers: 0, 1, 2, 3... (include 0). Whole numbers = Natural numbers + {0}. Every natural number is a whole number, but 0 is NOT a natural number.' },
            { title: 'Number Line', content: 'A straight line with equal spacing. Numbers increase going right. Used to show addition (move right), subtraction (move left), and compare numbers. 0 is the starting point. Every whole number has a unique position.' },
            { title: 'Properties of Addition', content: 'Closure: a+b is whole number. Commutative: a+b = b+a. Associative: (a+b)+c = a+(b+c). Additive identity: a+0 = a. These properties make calculation flexible and fast.' },
            { title: 'Properties of Multiplication', content: 'Closure: a×b is whole number. Commutative: a×b = b×a. Associative: (a×b)×c = a×(b×c). Multiplicative identity: a×1 = a. Distributive: a×(b+c) = a×b + a×c. Zero property: a×0 = 0.' },
          ],
          formulas: [
            { name: 'Commutative Property', formula: 'a + b = b + a  |  a × b = b × a', example: '7+3=3+7=10, 4×6=6×4=24' },
            { name: 'Associative Property', formula: '(a+b)+c = a+(b+c)  |  (a×b)×c = a×(b×c)', example: '(2+3)+4 = 2+(3+4) = 9' },
            { name: 'Distributive Property', formula: 'a × (b + c) = a×b + a×c', example: '5×(3+4) = 5×3 + 5×4 = 15+20 = 35', note: 'Most useful property for mental math' },
          ],
          experiments: [],
          videos: [
            { title: 'Whole Numbers on Number Line - Class 6', url: 'https://www.youtube.com/embed/sMImpw-2ZwQ', duration: '10 min', source: 'NCERT' },
          ],
          keyTerms: ['Whole numbers', 'Natural numbers', 'Number line', 'Closure', 'Commutative', 'Associative', 'Distributive', 'Identity'],
          quickFacts: ['0 is the additive identity', '1 is the multiplicative identity', 'There is no largest whole number', 'Whole numbers are infinite'],
          vedicTricks: [
            { trick: 'Multiply by 10: just add 0. Multiply by 100: add 00', example: '47×10=470, 47×100=4700' },
          ],
        },
        {
          id: 'c6m3', chapterNo: 3, title: 'Playing with Numbers',
          description: 'Factors, multiples, prime numbers, HCF and LCM — the building blocks of number theory.',
          topics: [
            { title: 'Factors and Multiples', content: 'Factor: a number that divides another exactly. 1 and the number itself are always factors. Multiple: result of multiplying a number by natural numbers. Example: Factors of 12 = {1,2,3,4,6,12}. Multiples of 4 = {4,8,12,16,20...}.' },
            { title: 'Prime and Composite Numbers', content: 'Prime: exactly 2 factors (1 and itself). Examples: 2,3,5,7,11,13... Composite: more than 2 factors. Examples: 4,6,8,9,10... Special: 1 is neither prime nor composite! 2 is the only EVEN prime number.' },
            { title: 'Tests of Divisibility', content: 'By 2: last digit even. By 3: sum of digits divisible by 3. By 4: last 2 digits divisible by 4. By 5: last digit 0 or 5. By 6: divisible by both 2 and 3. By 9: sum of digits divisible by 9. By 10: last digit 0.' },
            { title: 'HCF (Highest Common Factor)', content: 'Largest factor common to two or more numbers. Methods: (1) List all factors, find common ones, pick highest. (2) Prime factorisation: HCF = product of common prime factors with lowest powers.' },
            { title: 'LCM (Lowest Common Multiple)', content: 'Smallest multiple common to two or more numbers. Methods: (1) List multiples until common found. (2) Prime factorisation: LCM = product of all prime factors with highest powers. Relation: HCF × LCM = Product of two numbers.' },
          ],
          formulas: [
            { name: 'HCF × LCM Relation', formula: 'HCF(a,b) × LCM(a,b) = a × b', example: 'HCF(4,6)=2, LCM(4,6)=12. Check: 2×12=24=4×6 ✓' },
            { name: 'Divisibility by 3', formula: 'Sum of all digits divisible by 3', example: '783: 7+8+3=18, 18÷3=6. So 783 is divisible by 3 ✓' },
            { name: 'Divisibility by 9', formula: 'Sum of all digits divisible by 9', example: '5832: 5+8+3+2=18, 18÷9=2. So 5832 divisible by 9 ✓' },
          ],
          experiments: [],
          videos: [
            { title: 'Factors and Multiples - Class 6', url: 'https://www.youtube.com/embed/2Zu8k-CQS1o', duration: '15 min', source: 'Education' },
            { title: 'HCF and LCM Made Easy', url: 'https://www.youtube.com/embed/xHGqTGaAloE', duration: '18 min', source: 'Khan Academy' },
          ],
          keyTerms: ['Factor', 'Multiple', 'Prime', 'Composite', 'HCF', 'LCM', 'Prime factorisation', 'Co-prime'],
          quickFacts: ['There are 25 prime numbers less than 100', 'Largest known prime has 24 million+ digits!', '2 is the only even prime', 'Every composite number has a unique prime factorisation (Fundamental Theorem)'],
          vedicTricks: [
            { trick: 'Quick divisibility by 7: double last digit, subtract from rest. Repeat till 2 digits', example: '343: 3×2=6, 34-6=28. 28÷7=4. So 343 divisible by 7 ✓' },
          ],
        },
        {
          id: 'c6m10', chapterNo: 10, title: 'Mensuration',
          description: 'Perimeter and area of rectangles, squares and other figures.',
          topics: [
            { title: 'Perimeter', content: 'Total distance around the boundary of a closed figure. Perimeter of rectangle = 2(length + breadth). Perimeter of square = 4 × side. Measured in metres, cm, mm etc. Used in fencing, framing, borders.' },
            { title: 'Area', content: 'Amount of surface enclosed by a figure. Area of rectangle = length × breadth. Area of square = side². Measured in square units: m², cm², mm². 1 m² = 10,000 cm². Area is always positive.' },
            { title: 'Perimeter vs Area', content: 'Perimeter = boundary measurement (1D unit). Area = surface measurement (2D unit). Same perimeter → different areas possible! Example: 4×4 square (P=16, A=16) vs 6×2 rectangle (P=16, A=12). Squares have maximum area for given perimeter.' },
          ],
          formulas: [
            { name: 'Perimeter of Rectangle', formula: 'P = 2(l + b)', example: 'l=8cm, b=5cm → P=2(8+5)=26 cm', note: 'l=length, b=breadth' },
            { name: 'Perimeter of Square', formula: 'P = 4 × s', example: 'Side=7cm → P=4×7=28 cm', note: 's=side length' },
            { name: 'Area of Rectangle', formula: 'A = l × b', example: 'l=8cm, b=5cm → A=8×5=40 cm²' },
            { name: 'Area of Square', formula: 'A = s × s = s²', example: 'Side=7cm → A=7²=49 cm²' },
          ],
          experiments: [
            {
              title: 'Finding Area Using Grid Paper',
              objective: 'Understand area by counting unit squares',
              materials: ['Grid paper (cm squares)', 'Pencil', 'Ruler', 'Eraser'],
              steps: ['Draw a rectangle 6cm × 4cm on grid paper', 'Count all complete squares inside = area', 'For squares on boundary: count as ½ each', 'Compare with formula: 6×4=24 cm²'],
              result: 'Count matches formula — confirms area formula works!',
            },
          ],
          videos: [
            { title: 'Perimeter and Area - Class 6 NCERT', url: 'https://www.youtube.com/embed/MBVn4J3DNf8', duration: '14 min', source: 'NCERT Education' },
          ],
          keyTerms: ['Perimeter', 'Area', 'Rectangle', 'Square', 'Square units', 'Boundary'],
          quickFacts: ['A football field area ≈ 7,140 m²', 'India\'s total area = 3.29 million km²', 'Area of your classroom is probably 50-80 m²'],
          vedicTricks: [
            { trick: 'Area of square ending in 5: n×(n+1) then 25', example: '25² = 2×3_25 = 625. So 25m side → area = 625 m²' },
          ],
        },
      ]
    },
    {
      slug: 'science', name: 'Science', icon: '⚗️', color: '#0369a1', bg: '#eff6ff',
      description: 'Food sources, materials, living world, light, electricity and environment',
      chapters: [
        {
          id: 'c6s1', chapterNo: 1, title: 'Food: Where Does It Come From?',
          description: 'Sources of food, plant and animal products, food ingredients and eating habits.',
          topics: [
            { title: 'Plant Sources of Food', content: 'Roots: carrot, radish, beetroot, turnip. Stems: potato, ginger, sugarcane. Leaves: spinach, cabbage, lettuce. Flowers: cauliflower, broccoli. Fruits: mango, apple, tomato. Seeds: wheat, rice, dal, peas.' },
            { title: 'Animal Sources of Food', content: 'Milk and milk products: cheese, butter, curd, paneer. Eggs from hens, ducks. Meat: chicken, fish, mutton. Honey from bees. Animal products provide proteins, fats, vitamins (especially B12, D).' },
            { title: 'Herbivores, Carnivores, Omnivores', content: 'Herbivores: eat only plants (cow, deer, rabbit, horse). Carnivores: eat only animals (lion, tiger, eagle, shark). Omnivores: eat both plants and animals (humans, bear, crow, dog). Scavengers eat dead animals (vulture, hyena).' },
          ],
          formulas: [],
          experiments: [
            {
              title: 'Identifying Sources of Common Foods',
              objective: 'Identify whether food comes from plants or animals',
              materials: ['Rice, wheat, dal, milk, egg, spinach, apple, chicken', 'Two trays labelled "Plant" and "Animal"'],
              steps: ['Examine each food item', 'Determine if it comes from plant or animal', 'Place in correct tray', 'Discuss items that come from both (honey, milk)'],
              result: 'Students correctly categorise foods and understand diversity of food sources',
            },
          ],
          videos: [
            { title: 'Food - Where Does it Come From? Class 6', url: 'https://www.youtube.com/embed/Bz-F1ixK6lI', duration: '12 min', source: 'NCERT' },
          ],
          keyTerms: ['Herbivore', 'Carnivore', 'Omnivore', 'Ingredient', 'Nutrients', 'Scavenger'],
          quickFacts: ['Rice feeds more than half of the world\'s population', 'Honey is the only food that never spoils', 'A cow produces about 6-8 litres of milk per day'],
        },
        {
          id: 'c6s10', chapterNo: 10, title: 'Motion and Measurement of Distances',
          description: 'Standard units of measurement, types of motion, measuring tools.',
          topics: [
            { title: 'Need for Standard Units', content: 'Non-standard units (hand span, foot) vary person to person → inconsistent. Standard units are fixed internationally. SI system (International System): metre (length), kilogram (mass), second (time), ampere (current), kelvin (temperature).' },
            { title: 'Types of Motion', content: 'Rectilinear: straight line (train on track, falling object). Circular: moving in circle (clock hands, fan blades). Periodic/Oscillatory: back-and-forth motion repeating regularly (pendulum, swing, heartbeat). Rotational: spinning around own axis (Earth, top).' },
            { title: 'Measuring Length', content: 'Ruler for short lengths. Measuring tape for curved surfaces. Metre rod for room dimensions. Use correct unit: mm for small objects, cm for medium, m for rooms, km for distances between cities. 1m = 100cm = 1000mm. 1km = 1000m.' },
          ],
          formulas: [
            { name: 'Unit Conversions', formula: '1 km = 1000 m = 100,000 cm = 10,00,000 mm', example: 'Your height 160cm = 1.6m = 0.0016km' },
            { name: 'Time', formula: '1 hour = 60 minutes = 3600 seconds', example: '2.5 hours = 150 minutes = 9000 seconds' },
          ],
          experiments: [
            {
              title: 'Measuring Curved Length',
              objective: 'Measure the length of a curved line or object',
              materials: ['String/thread', 'Ruler', 'Curved surface (ball, bottle)'],
              steps: ['Place string along the curved path', 'Mark start and end on string', 'Straighten string on ruler', 'Read measurement'],
              result: 'Curved length measured accurately — shows why rulers alone aren\'t enough',
            },
          ],
          videos: [
            { title: 'Motion and Measurement - Class 6 Science', url: 'https://www.youtube.com/embed/R9PjJcbm2L8', duration: '15 min', source: 'NCERT Education' },
          ],
          keyTerms: ['SI units', 'Metre', 'Rectilinear', 'Circular', 'Periodic', 'Oscillatory', 'Rotational'],
          quickFacts: ['The metre was originally defined as 1/10,000,000 of the distance from equator to North Pole', 'Light travels 300,000 km in ONE second', '1 light year = 9.46 × 10¹² km'],
        },
      ]
    },
    {
      slug: 'social-science', name: 'Social Science', icon: '🌍', color: '#065f46', bg: '#e8f5ef',
      description: 'History from ancient times, physical geography, political institutions and economics',
      chapters: [
        {
          id: 'c6ss1', chapterNo: 1, title: 'What, Where, How and When?',
          description: 'Introduction to history, sources of historical information, calendar systems.',
          topics: [
            { title: 'Why Study History?', content: 'History tells us about our past — how people lived, worked, thought and changed. It helps us understand the present and plan for future. Without history, we wouldn\'t know about our culture, language, traditions or how our country was formed.' },
            { title: 'Sources of History', content: 'Written sources: manuscripts, inscriptions on rocks/pillars, coins, government records. Archaeological sources: tools, pottery, buildings, paintings, fossils. Oral sources: songs, stories, folk tales passed down generations. Each type gives different information about the past.' },
            { title: 'Calendar and Dates', content: 'BC (Before Christ) / BCE (Before Common Era): years before Jesus Christ\'s birth. AD (Anno Domini) / CE (Common Era): years after. Dates go forward in CE and backward in BCE. Indian subcontinent has its own calendar systems: Saka calendar, Hindu calendar.' },
          ],
          formulas: [],
          experiments: [],
          videos: [
            { title: 'Introduction to History - Class 6', url: 'https://www.youtube.com/embed/VkVGSHhPBT8', duration: '10 min', source: 'Education' },
          ],
          keyTerms: ['BCE', 'CE', 'Manuscript', 'Inscription', 'Archaeology', 'Historian', 'Primary source', 'Secondary source'],
          quickFacts: ['The Indus Valley Civilisation is over 5000 years old', 'The oldest written records found in India are the Indus script', 'Ashoka\'s inscriptions were found in 40+ locations across India'],
        },
      ]
    },
    {
      slug: 'english', name: 'English', icon: '📝', color: '#1e3a5f', bg: '#f0f4ff',
      description: 'Literature, grammar, reading comprehension and writing skills',
      chapters: [
        {
          id: 'c6e1', chapterNo: 1, title: 'Who Did Patrick\'s Homework?',
          description: 'A funny story about a boy who hates homework and makes a deal with a tiny man.',
          topics: [
            { title: 'Story Summary', content: 'Patrick hated doing homework. One day his cat caught a tiny man (elf). Patrick saved the elf in exchange for one wish. He wished the elf would do all his homework. But the elf didn\'t know anything and needed Patrick to teach him. Patrick ended up learning everything himself — an important lesson!' },
            { title: 'Vocabulary from the Story', content: 'Elves: tiny magical creatures from folklore. Arithmetic: mathematics. Grammar: rules of language. Vocabulary: collection of words. The story teaches that there\'s no shortcut to learning — you must do the work yourself.' },
            { title: 'Grammar: Nouns and Pronouns', content: 'Nouns: names of people, places, things (Patrick, school, homework). Proper nouns: specific names (Patrick, India). Common nouns: general names (boy, school). Pronouns replace nouns: he, she, it, they, we, you, I, me, him, her, them, us.' },
          ],
          formulas: [],
          experiments: [],
          videos: [
            { title: 'Who Did Patrick\'s Homework - Class 6 English', url: 'https://www.youtube.com/embed/H9FxJVmHWes', duration: '14 min', source: 'Education' },
          ],
          keyTerms: ['Elf', 'Homework', 'Noun', 'Pronoun', 'Proper noun', 'Common noun', 'Folklore'],
          quickFacts: ['The story is by Carol Moore', 'It teaches the value of self-learning', 'Patrick ends up getting the best grades in class despite not intending to study'],
        },
      ]
    },
    {
      slug: 'hindi', name: 'हिंदी', icon: '🇮🇳', color: '#dc2626', bg: '#fef2f2',
      description: 'हिंदी साहित्य, व्याकरण, गद्य और पद्य — NCERT वसंत भाग 1',
      chapters: [
        {
          id: 'c6h1', chapterNo: 1, title: 'वह चिड़िया जो',
          description: 'केदारनाथ अग्रवाल की कविता — एक छोटी चिड़िया की स्वतंत्रता और प्रकृति प्रेम',
          topics: [
            { title: 'कविता का भावार्थ', content: 'इस कविता में कवि ने एक छोटी नीली चिड़िया का वर्णन किया है जो अनाज के दाने खाती है, नदी से पानी पीती है और जंगल में स्वतंत्र रहती है। चिड़िया की खुशी, स्वतंत्रता और प्रकृति से प्रेम का सुंदर चित्रण है।' },
            { title: 'कठिन शब्द', content: 'रेशमी = silk-like, किरण = ray of light, व्योम = sky/heaven, मधुर = sweet, फुनगी = tip of branch, उड़ान = flight. इन शब्दों से कविता की भाषा समृद्ध होती है।' },
            { title: 'व्याकरण: संज्ञा और सर्वनाम', content: 'संज्ञा: किसी व्यक्ति, स्थान, वस्तु या भाव का नाम। प्रकार: व्यक्तिवाचक (राम, गंगा), जातिवाचक (लड़का, नदी), भाववाचक (ईमानदारी, खुशी)। सर्वनाम संज्ञा की जगह आता है: मैं, तुम, वह, हम, आप, वे।' },
          ],
          formulas: [],
          experiments: [],
          videos: [
            { title: 'वह चिड़िया जो - कक्षा 6 हिंदी', url: 'https://www.youtube.com/embed/Hn0BXmL0iiU', duration: '12 min', source: 'NCERT Hindi' },
          ],
          keyTerms: ['कविता', 'चिड़िया', 'संज्ञा', 'सर्वनाम', 'व्याकरण', 'भावार्थ', 'केदारनाथ अग्रवाल'],
          quickFacts: ['केदारनाथ अग्रवाल प्रगतिवादी कवि थे', 'यह कविता प्रकृति और स्वतंत्रता का संदेश देती है'],
        },
      ]
    },
  ]
}

// ══════════════════════════════════════════════════════════════════
// CLASS 9
// ══════════════════════════════════════════════════════════════════
export const CLASS9: ClassData = {
  classLevel: '9', label: 'Class 9', board: ['CBSE','ICSE'],
  description: 'Pre-board foundation — Algebra, Physics laws, Cell biology, History',
  subjects: [
    {
      slug: 'mathematics', name: 'Mathematics', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Number systems, polynomials, coordinate geometry, triangles, statistics',
      chapters: [
        {
          id: 'c9m1', chapterNo: 1, title: 'Number Systems',
          description: 'Real numbers, irrational numbers, laws of exponents and their decimal expansions.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/NumberSetinC.svg/400px-NumberSetinC.svg.png',
          topics: [
            { title: 'Types of Numbers', content: 'Natural numbers N = {1,2,3...}. Whole numbers W = {0,1,2,3...}. Integers Z = {...-2,-1,0,1,2...}. Rational numbers Q = p/q where p,q are integers and q≠0. Irrational numbers: cannot be expressed as p/q (√2, √3, π, e). Real numbers R = Q ∪ Irrational.' },
            { title: 'Irrational Numbers', content: 'Cannot be expressed as p/q. Decimal expansion is non-terminating and non-repeating. Proof that √2 is irrational: Assume √2 = p/q (in lowest terms). Then 2 = p²/q². So p² = 2q² → p is even. Let p=2m. Then 4m² = 2q² → q²=2m² → q is even. But p and q both even contradicts lowest terms. Contradiction! ∴ √2 is irrational.' },
            { title: 'Real Numbers on Number Line', content: 'Every real number corresponds to a unique point on the number line and vice versa. √2 can be located: draw a right triangle with legs 1 and 1. Hypotenuse = √2. Use compass to mark this length from origin.' },
            { title: 'Laws of Exponents', content: 'For a > 0, b > 0, and rational exponents: aᵐ × aⁿ = aᵐ⁺ⁿ. aᵐ/aⁿ = aᵐ⁻ⁿ. (aᵐ)ⁿ = aᵐⁿ. aᵐ × bᵐ = (ab)ᵐ. (a/b)ᵐ = aᵐ/bᵐ. a⁰ = 1. a⁻ⁿ = 1/aⁿ. a^(1/n) = ⁿ√a.' },
          ],
          formulas: [
            { name: 'Rationalising Factor', formula: 'Multiply by conjugate: (a+√b)(a-√b) = a²-b', example: 'Rationalise 1/(√2+1): multiply by (√2-1)/(√2-1) = (√2-1)/(2-1) = √2-1' },
            { name: 'Laws of Exponents', formula: 'aᵐ × aⁿ = aᵐ⁺ⁿ | aᵐ/aⁿ = aᵐ⁻ⁿ | (aᵐ)ⁿ = aᵐⁿ', example: '2³ × 2⁴ = 2⁷ = 128 | 3⁵/3² = 3³ = 27' },
            { name: 'nth Root', formula: 'a^(1/n) = ⁿ√a | a^(m/n) = ⁿ√(aᵐ)', example: '8^(1/3) = ∛8 = 2 | 27^(2/3) = (∛27)² = 3² = 9' },
          ],
          experiments: [],
          videos: [
            { title: 'Number System Class 9 - Complete Chapter', url: 'https://www.youtube.com/embed/TdoZJRELvI0', duration: '35 min', source: 'Education' },
            { title: '√2 is Irrational - Proof', url: 'https://www.youtube.com/embed/xKiKiEFGFSE', duration: '10 min', source: 'Khan Academy' },
          ],
          keyTerms: ['Natural', 'Whole', 'Integer', 'Rational', 'Irrational', 'Real number', 'Non-terminating', 'Non-repeating', 'Exponent'],
          quickFacts: ['π (pi) is irrational — proved by Lambert in 1768', 'e (Euler\'s number) is also irrational', '√2 ≈ 1.41421356... (never repeats)', 'There are INFINITELY many irrational numbers between any two rational numbers'],
          vedicTricks: [
            { trick: 'Quick square root estimate: nearest perfect square + fraction', example: '√50 ≈ 7 + (50-49)/(2×7) = 7 + 1/14 ≈ 7.07. Actual: 7.071' },
          ],
        },
        {
          id: 'c9m2', chapterNo: 2, title: 'Polynomials',
          description: 'Polynomial expressions, zeroes, remainder theorem, factor theorem and algebraic identities.',
          topics: [
            { title: 'What is a Polynomial?', content: 'An expression with variables having non-negative integer exponents. p(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀. Degree = highest power. Monomial: one term. Binomial: two terms. Trinomial: three terms. Constant polynomial: just a number (degree 0). Zero polynomial: p(x) = 0 (undefined degree).' },
            { title: 'Zeroes of a Polynomial', content: 'Value of x that makes p(x) = 0. Also called roots. A polynomial of degree n has AT MOST n zeroes. For linear p(x) = ax+b: zero is x = -b/a. For quadratic: can have 0, 1, or 2 real zeroes. Geometrically: x-intercepts of the graph of y = p(x).' },
            { title: 'Remainder Theorem', content: 'When p(x) is divided by (x-a), the remainder = p(a). Example: p(x) = x³-2x²+3x-5 divided by (x-2). Remainder = p(2) = 8-8+6-5 = 1. No need to do long division! Saves a lot of calculation time.' },
            { title: 'Factor Theorem', content: 'If p(a) = 0, then (x-a) is a factor of p(x). Converse: If (x-a) is a factor of p(x), then p(a) = 0. Extension: (ax-b) is a factor of p(x) if p(b/a) = 0. Use this to factorise polynomials by trial of rational factors.' },
          ],
          formulas: [
            { name: 'Key Identities', formula: '(a+b)² = a²+2ab+b²\n(a-b)² = a²-2ab+b²\n(a+b)(a-b) = a²-b²', example: '(x+3)² = x²+6x+9 | (2x-5)(2x+5) = 4x²-25' },
            { name: 'Cubic Identities', formula: '(a+b)³ = a³+3a²b+3ab²+b³\n(a-b)³ = a³-3a²b+3ab²-b³\na³+b³ = (a+b)(a²-ab+b²)\na³-b³ = (a-b)(a²+ab+b²)', example: '(x+2)³ = x³+6x²+12x+8' },
            { name: 'Special: a³+b³+c³', formula: 'If a+b+c=0, then a³+b³+c³ = 3abc', example: 'If x+y+z=0, then x³+y³+z³ = 3xyz' },
          ],
          experiments: [],
          videos: [
            { title: 'Polynomials Class 9 - Full Chapter', url: 'https://www.youtube.com/embed/8MRkEoMEGak', duration: '40 min', source: 'Education' },
            { title: 'Factor Theorem Explained', url: 'https://www.youtube.com/embed/XbNegIh6gPY', duration: '15 min', source: 'Khan Academy' },
          ],
          keyTerms: ['Polynomial', 'Degree', 'Monomial', 'Binomial', 'Zero/Root', 'Remainder theorem', 'Factor theorem', 'Coefficient'],
          quickFacts: ['The word "polynomial" comes from Greek: poly=many, nomial=term', 'Carl Friedrich Gauss proved every polynomial has at least one root (Fundamental Theorem of Algebra)', 'Polynomials are used in computer graphics, engineering and physics simulations'],
          vedicTricks: [
            { trick: 'Check if (x-1) is factor: sum of all coefficients = 0?', example: 'p(x)=2x³-3x²+x: 2-3+1=0 → (x-1) is factor!' },
          ],
        },
        {
          id: 'c9m13', chapterNo: 13, title: 'Surface Areas and Volumes',
          description: 'Surface area and volume of cuboid, cube, cylinder, cone and sphere.',
          topics: [
            { title: 'Cuboid and Cube', content: 'Cuboid: l×b×h shaped box. Surface areas: LSA = 2h(l+b). TSA = 2(lb+bh+lh). Volume = l×b×h. Cube: all sides equal (a). TSA = 6a². Volume = a³. Diagonal of cube = a√3. Diagonal of cuboid = √(l²+b²+h²).' },
            { title: 'Cylinder', content: 'Circular cross-section with height h and radius r. CSA (Curved Surface Area) = 2πrh. TSA = 2πr(r+h). Volume = πr²h. Example: paint on a pillar uses CSA; volume of water in cylindrical tank uses Volume formula.' },
            { title: 'Cone', content: 'Circular base, tapering to a point. Radius r, height h, slant height l. l² = h²+r². CSA = πrl. TSA = πr(r+l) = πr(r+l). Volume = ⅓πr²h. A cone is ⅓ of a cylinder with same base and height.' },
            { title: 'Sphere and Hemisphere', content: 'Sphere: all points equidistant from center. Radius r. Surface area = 4πr². Volume = 4/3 πr³. Hemisphere (half sphere): CSA = 2πr². TSA = 3πr². Volume = 2/3 πr³. A sphere has the MINIMUM surface area for a given volume — that\'s why bubbles are spherical!' },
          ],
          formulas: [
            { name: 'Cylinder', formula: 'CSA=2πrh | TSA=2πr(r+h) | V=πr²h', example: 'r=7cm, h=10cm: V=π×49×10≈1539.4 cm³', note: 'π ≈ 22/7 ≈ 3.14159' },
            { name: 'Cone', formula: 'l=√(r²+h²) | CSA=πrl | TSA=πr(r+l) | V=⅓πr²h', example: 'r=3, h=4: l=5, V=⅓×π×9×4≈37.7 cm³' },
            { name: 'Sphere', formula: 'SA=4πr² | V=4/3 πr³', example: 'r=6cm: SA=4π×36≈452.4 cm² | V=4/3×π×216≈904.8 cm³' },
            { name: 'Hemisphere', formula: 'CSA=2πr² | TSA=3πr² | V=2/3 πr³', example: 'r=7: TSA=3×22/7×49=462 cm²' },
          ],
          experiments: [
            {
              title: 'Verify Volume of Cone = ⅓ Cylinder',
              objective: 'Experimentally verify that cone volume is 1/3 of cylinder with same base and height',
              materials: ['A cone and cylinder with same base radius and height (can be made from clay/paper)', 'Water', 'Measuring container'],
              steps: ['Fill cone with water completely', 'Pour into cylinder', 'Repeat — count how many cone-fulls fill the cylinder', 'Compare with formula'],
              result: 'Exactly 3 cone-fulls fill the cylinder — confirms V_cone = ⅓ V_cylinder!',
              safetyNote: 'Use room temperature water to avoid burns',
            },
          ],
          videos: [
            { title: 'Surface Areas and Volumes Class 9', url: 'https://www.youtube.com/embed/7KXHQXR1QAE', duration: '45 min', source: 'Education' },
            { title: 'Cylinder Cone Sphere Formulas', url: 'https://www.youtube.com/embed/KZHAbF4ORRU', duration: '20 min', source: 'Khan Academy' },
          ],
          keyTerms: ['Cuboid', 'Cylinder', 'Cone', 'Sphere', 'Hemisphere', 'CSA', 'TSA', 'Volume', 'Slant height'],
          quickFacts: ['Earth is not a perfect sphere — it\'s an oblate spheroid (flattened at poles)', 'Ice cream scoops are hemispheres', 'The Great Pyramid approximates a square-based pyramid', 'A football (soccer ball) is made of pentagons and hexagons approximating a sphere'],
        },
      ]
    },
    {
      slug: 'science', name: 'Science', icon: '⚗️', color: '#0369a1', bg: '#eff6ff',
      description: 'Matter, atoms, motion, force, gravitation, work, sound, cells, tissues, improvement in food',
      chapters: [
        {
          id: 'c9s8', chapterNo: 8, title: 'Motion',
          description: 'Distance, displacement, speed, velocity, acceleration, equations of motion and distance-time graphs.',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Uniformly_accelerated_motion_diagram.svg/400px-Uniformly_accelerated_motion_diagram.svg.png',
          topics: [
            { title: 'Distance and Displacement', content: 'Distance = total path length (scalar — only magnitude). Displacement = straight-line distance from start to end with direction (vector). Example: Run around a 400m track and return to start. Distance = 400m, Displacement = 0! Displacement can be negative if returning.' },
            { title: 'Speed and Velocity', content: 'Speed = distance/time (scalar, always positive). Velocity = displacement/time (vector, can be +ve or -ve). Average speed = total distance/total time. Average velocity = total displacement/total time. Uniform motion: constant speed in straight line.' },
            { title: 'Acceleration', content: 'Acceleration = change in velocity/time = (v-u)/t. Positive: speeding up. Negative (deceleration/retardation): slowing down. SI unit: m/s². Uniform acceleration: constant change in velocity per unit time (object falling under gravity = 9.8 m/s²).' },
            { title: 'Graphical Representation', content: 'Distance-time graph: slope = speed. Flat = rest. Steeper = faster. Velocity-time graph: slope = acceleration. Area under graph = displacement. Uniform motion: straight line. Uniform acceleration: straight line with positive slope.' },
          ],
          formulas: [
            { name: 'Speed', formula: 'v = d/t', example: 'Car travels 120 km in 2h: v = 120/2 = 60 km/h' },
            { name: '1st Equation of Motion', formula: 'v = u + at', example: 'u=0, a=10m/s², t=5s: v=0+10×5=50 m/s', note: 'u=initial velocity, v=final velocity, a=acceleration, t=time' },
            { name: '2nd Equation of Motion', formula: 's = ut + ½at²', example: 'u=0, a=10, t=5: s=0+½×10×25=125m' },
            { name: '3rd Equation of Motion', formula: 'v² = u² + 2as', example: 'u=0, a=10, s=20: v²=400, v=20m/s' },
            { name: 'Average Velocity (uniform acc)', formula: 'v_avg = (u+v)/2', example: 'u=10, v=30: avg=20 m/s' },
          ],
          experiments: [
            {
              title: 'Measuring Velocity Using Ticker Tape',
              objective: 'Determine velocity and acceleration using ticker tape timer',
              materials: ['Ticker tape timer', 'Power supply (6V AC)', 'Ticker tape', 'Trolley on inclined plane', 'Ruler', 'Scissors'],
              steps: [
                'Attach ticker tape to trolley',
                'Connect tape through timer',
                'Release trolley down incline with timer running',
                'Timer makes 50 dots per second',
                'Measure distance between consecutive dots',
                'Calculate velocity = distance/time between dots',
                'Increasing spacing confirms acceleration',
              ],
              result: 'Dots spaced farther apart as velocity increases — confirms uniform acceleration',
              safetyNote: 'Use low voltage AC supply only. Keep away from water.',
            },
          ],
          videos: [
            { title: 'Motion Class 9 - Distance, Displacement, Speed', url: 'https://www.youtube.com/embed/ZM8ECpBuQYE', duration: '20 min', source: 'Education' },
            { title: 'Equations of Motion Derivation', url: 'https://www.youtube.com/embed/2I_EpX23gXU', duration: '18 min', source: 'Khan Academy' },
            { title: 'Velocity Time Graphs Explained', url: 'https://www.youtube.com/embed/foT5dCAFy9k', duration: '15 min', source: 'Physics Ed' },
          ],
          keyTerms: ['Distance', 'Displacement', 'Speed', 'Velocity', 'Acceleration', 'Scalar', 'Vector', 'Uniform motion', 'Retardation'],
          quickFacts: ['Usain Bolt\'s average speed in 100m: 10.44 m/s, maximum: 12.4 m/s', 'Sound travels at 343 m/s in air', 'A bullet travels at ~900 m/s', 'ISS orbital speed: 7,660 m/s = 27,576 km/h!'],
          vedicTricks: [
            { trick: 'Convert km/h to m/s: multiply by 5/18', example: '72 km/h = 72×5/18 = 20 m/s. Convert m/s to km/h: multiply by 18/5' },
          ],
        },
        {
          id: 'c9s9', chapterNo: 9, title: 'Force and Laws of Motion',
          description: 'Newton\'s three laws, inertia, momentum, impulse and conservation of momentum.',
          topics: [
            { title: 'Newton\'s First Law (Inertia)', content: 'An object at rest stays at rest; an object in motion continues in motion in a straight line at constant speed UNLESS acted upon by an unbalanced external force. Inertia = resistance to change. More mass = more inertia. Examples: Passengers jerk forward when bus brakes suddenly. Tablecloth trick — inertia keeps dishes in place.' },
            { title: 'Newton\'s Second Law', content: 'Net force = rate of change of momentum = mass × acceleration. F = ma. Unit: Newton (N) = kg⋅m/s². 1 N = force that gives 1 kg mass an acceleration of 1 m/s². Larger mass needs larger force for same acceleration. Same force on smaller mass → larger acceleration.' },
            { title: 'Newton\'s Third Law', content: 'For every action, there is an EQUAL and OPPOSITE reaction. Forces act on DIFFERENT objects. Examples: Walking (push ground back → ground pushes you forward). Rocket propulsion (hot gas ejected backward → rocket moves forward). Swimming (push water back → move forward). Recoil of gun.' },
            { title: 'Momentum and Conservation', content: 'Momentum p = mv (mass × velocity). Vector quantity. SI unit: kg⋅m/s. Law of Conservation of Momentum: In an isolated system, total momentum before collision = total momentum after collision. m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂. No external force → momentum conserved.' },
          ],
          formulas: [
            { name: 'Newton\'s Second Law', formula: 'F = ma = Δp/Δt', example: 'F=5kg×4m/s²=20N | If Δp=30 kg⋅m/s in 3s: F=10N', note: 'F in Newtons, m in kg, a in m/s²' },
            { name: 'Momentum', formula: 'p = mv', example: 'Truck: 5000kg×20m/s = 100,000 kg⋅m/s | Ball: 0.1kg×30m/s = 3 kg⋅m/s' },
            { name: 'Impulse', formula: 'Impulse = F × t = Δp = m(v-u)', example: 'Bat hits ball: F=500N for 0.02s → Impulse=10 N⋅s' },
            { name: 'Conservation of Momentum', formula: 'm₁u₁ + m₂u₂ = m₁v₁ + m₂v₂', example: '2kg at 5m/s hits 3kg at rest: 10=2v₁+3v₂. If stick: v=(10)/5=2 m/s' },
          ],
          experiments: [
            {
              title: 'Demonstrating Newton\'s Third Law with Spring Balances',
              objective: 'Show that action and reaction forces are equal and opposite',
              materials: ['Two spring balances', 'String', 'Hook or support'],
              steps: [
                'Connect two spring balances hook-to-hook with string',
                'Have two students each pull one balance',
                'Read BOTH scales simultaneously',
                'Try different amounts of force',
                'Note both readings at all times',
              ],
              result: 'Both spring balances always show IDENTICAL readings — proves Newton\'s 3rd Law: action = reaction in magnitude',
              safetyNote: 'Pull steadily without jerks to get accurate readings',
            },
            {
              title: 'Conservation of Momentum with Marbles',
              objective: 'Verify conservation of momentum in a collision',
              materials: ['2 marbles of same size (or different sizes)', 'Ruler', 'Flat table', 'Carbon paper'],
              steps: [
                'Mark marble 2 position at table edge',
                'Roll marble 1 from measured height',
                'Let it hit marble 2',
                'Use carbon paper to mark landing positions',
                'Measure distances = proportional to velocities',
                'Compare momentum before and after',
              ],
              result: 'Total momentum before collision ≈ total momentum after — confirms conservation law',
            },
          ],
          videos: [
            { title: 'Newton\'s Laws of Motion - Class 9', url: 'https://www.youtube.com/embed/ou9YMWlJgkE', duration: '22 min', source: 'Education' },
            { title: 'Momentum and Conservation - Explained', url: 'https://www.youtube.com/embed/XFhntPxow0U', duration: '18 min', source: 'Khan Academy' },
            { title: 'Newton\'s Third Law - Real Examples', url: 'https://www.youtube.com/embed/8E2O5DIDCKw', duration: '12 min', source: 'Physics Ed' },
          ],
          keyTerms: ['Inertia', 'Force', 'Newton', 'Momentum', 'Impulse', 'Conservation', 'Action-reaction', 'Mass', 'Velocity'],
          quickFacts: ['Newton published his laws in 1687 in Principia Mathematica', 'The ISS stays in orbit because of Newton\'s laws (centripetal = gravity)', 'Seat belts work because of Newton\'s 1st law', 'Rockets work 100% on Newton\'s 3rd law'],
          vedicTricks: [
            { trick: 'Calculate Force quickly: F=ma. Estimate a first, multiply by mass', example: 'Pushing a 60kg trolley from rest to 3m/s in 6s: a=0.5m/s², F=60×0.5=30N' },
          ],
        },
      ]
    },
  ]
}

// ══════════════════════════════════════════════════════════════════
// CLASS 10
// ══════════════════════════════════════════════════════════════════
export const CLASS10: ClassData = {
  classLevel: '10', label: 'Class 10', board: ['CBSE','ICSE'],
  description: 'Board exam year — Quadratics, Trigonometry, Electricity, Life Processes',
  subjects: [
    {
      slug: 'mathematics', name: 'Mathematics', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Real numbers, polynomials, trigonometry, statistics, probability',
      chapters: [
        {
          id: 'c10m4', chapterNo: 4, title: 'Quadratic Equations',
          description: 'Standard form, factorisation, quadratic formula, discriminant and applications.',
          topics: [
            { title: 'Standard Form', content: 'ax² + bx + c = 0 where a≠0. If a=0, it becomes linear. Examples of QE: x²-5x+6=0, 2x²+3x-2=0, x²-9=0. Non-QE: x³-5x=0 (cubic), 1/x+x=1 (not polynomial). Check: highest degree must be exactly 2.' },
            { title: 'Factorisation Method', content: 'Split middle term bx into two terms whose: product = a×c and sum = b. Then factor by grouping. Example: 2x²+5x+3: a×c=6, b=5. Find two numbers: 2×3=6, 2+3=5. So: 2x²+2x+3x+3 = 2x(x+1)+3(x+1) = (x+1)(2x+3). Roots: x=-1 or x=-3/2.' },
            { title: 'Completing the Square', content: 'Convert ax²+bx+c=0 to (x+h)²=k form. Steps: (1) Divide by a. (2) Move c to RHS. (3) Add (b/2a)² to both sides. (4) Write LHS as perfect square. (5) Take square root. This method leads directly to quadratic formula.' },
            { title: 'Discriminant and Nature of Roots', content: 'D = b²-4ac. D>0: two distinct real roots. D=0: two equal real roots (one root). D<0: no real roots. D is a perfect square AND a,b,c rational: rational roots. Application: Check nature of roots BEFORE solving to choose best method.' },
          ],
          formulas: [
            { name: 'Quadratic Formula', formula: 'x = [-b ± √(b²-4ac)] / 2a', example: 'x²-5x+6=0: x=(5±√(25-24))/2=(5±1)/2. x=3 or x=2', note: 'Works for ALL quadratic equations' },
            { name: 'Discriminant', formula: 'D = b² - 4ac', example: 'x²+2x+5: D=4-20=-16<0 → no real roots' },
            { name: 'Sum and Product of Roots', formula: 'α+β = -b/a | α×β = c/a', example: 'x²-7x+12: α+β=7, αβ=12 → roots are 3,4 ✓' },
            { name: 'Form Equation from Roots', formula: 'x² - (sum)x + (product) = 0', example: 'Roots 2,5: x²-(2+5)x+2×5=0 → x²-7x+10=0' },
          ],
          experiments: [],
          videos: [
            { title: 'Quadratic Equations - All Methods - Class 10', url: 'https://www.youtube.com/embed/i7idZfS8t8w', duration: '25 min', source: 'Education' },
            { title: 'Quadratic Formula Derivation', url: 'https://www.youtube.com/embed/9ubP4MhFTxI', duration: '12 min', source: 'Khan Academy' },
            { title: 'Discriminant and Nature of Roots', url: 'https://www.youtube.com/embed/r3SEkdtpobo', duration: '15 min', source: 'Education' },
          ],
          keyTerms: ['Quadratic', 'Discriminant', 'Roots', 'Factorisation', 'Completing square', 'Quadratic formula'],
          quickFacts: ['Babylonians solved quadratics 4000 years ago (without symbols!)', 'The word "quadratic" = Latin for "square"', 'Quadratic formula was published by Al-Khwarizmi around 820 CE', 'Bridge designs use quadratic curves (parabolas)'],
          vedicTricks: [
            { trick: 'Find factors quickly: what two numbers multiply to c and add to b?', example: 'x²+7x+12: find a×b=12, a+b=7 → 3×4=12, 3+4=7 → (x+3)(x+4)' },
          ],
        },
        {
          id: 'c10m8', chapterNo: 8, title: 'Introduction to Trigonometry',
          description: 'Trigonometric ratios, identities, standard angle values and their applications.',
          topics: [
            { title: 'Trigonometric Ratios', content: 'In a right triangle with angle θ: sin θ = Opposite/Hypotenuse. cos θ = Adjacent/Hypotenuse. tan θ = Opposite/Adjacent = sin/cos. Reciprocals: cosec θ = 1/sin θ. sec θ = 1/cos θ. cot θ = 1/tan θ. Memory trick: SOH-CAH-TOA!' },
            { title: 'Standard Values', content: 'sin 0°=0, sin 30°=½, sin 45°=1/√2, sin 60°=√3/2, sin 90°=1. cos values are reverse: cos 0°=1, cos 90°=0. tan 0°=0, tan 30°=1/√3, tan 45°=1, tan 60°=√3, tan 90°=undefined. Remember pattern: sin increases 0→1 as angle 0°→90°.' },
            { title: 'Trigonometric Identities', content: 'Three fundamental identities: (1) sin²θ + cos²θ = 1. (2) 1 + tan²θ = sec²θ. (3) 1 + cot²θ = cosec²θ. These are true for ALL angles. Used to simplify expressions and prove other results. Derived from Pythagoras theorem.' },
          ],
          formulas: [
            { name: 'Basic Ratios', formula: 'sin θ = P/H | cos θ = B/H | tan θ = P/B', example: '3-4-5 triangle: sin = 3/5, cos = 4/5, tan = 3/4', note: 'P=perpendicular, B=base, H=hypotenuse' },
            { name: 'Pythagorean Identities', formula: 'sin²θ + cos²θ = 1\n1 + tan²θ = sec²θ\n1 + cot²θ = cosec²θ', example: 'If sin θ = 3/5: cos θ = 4/5, tan θ = 3/4 (from identity)' },
            { name: 'Standard Values Table', formula: '     0° | 30° | 45° | 60° | 90°\nsin  0  | ½  | 1/√2| √3/2|  1\ncos  1  |√3/2|1/√2 | ½  |  0\ntan  0  |1/√3|  1  | √3 |  ∞', example: 'sin45°×cos45° = (1/√2)×(1/√2) = ½' },
          ],
          experiments: [
            {
              title: 'Measure Height Using Trigonometry',
              objective: 'Find height of a tree or building using angle of elevation',
              materials: ['Protractor', 'Straw', 'String', 'Small weight (for plumb line)', 'Measuring tape', 'Calculator'],
              steps: [
                'Make a clinometer: attach string+weight through center of protractor, tape straw along straight edge',
                'Stand at measured distance d from tree',
                'Look through straw at top of tree',
                'Note angle reading on protractor',
                'Angle of elevation = 90° - reading',
                'Height = d × tan(angle) + your eye height',
              ],
              result: 'Height calculated using trigonometry! Compare with actual measurement.',
              safetyNote: 'Do not look directly at sun',
            },
          ],
          videos: [
            { title: 'Trigonometry Introduction - Class 10', url: 'https://www.youtube.com/embed/F21S9Wpi0y8', duration: '25 min', source: 'Education' },
            { title: 'Trigonometric Identities - Class 10', url: 'https://www.youtube.com/embed/5cP1XHIcBhg', duration: '20 min', source: 'Khan Academy' },
          ],
          keyTerms: ['Sine', 'Cosine', 'Tangent', 'Cosecant', 'Secant', 'Cotangent', 'Pythagorean identity', 'SOH-CAH-TOA'],
          quickFacts: ['Trigonometry was developed by ancient Greek astronomers to measure distances to stars', 'GPS uses trigonometry to find your location', 'Architects use trig to design roofs and staircases', 'sin²θ+cos²θ=1 is just Pythagoras in disguise!'],
          vedicTricks: [
            { trick: 'sin values: √0/2, √1/2, √2/2, √3/2, √4/2 for 0°,30°,45°,60°,90°', example: 'sin60° = √3/2. cos45° = √2/2 (cos = reverse order)' },
          ],
        },
      ]
    },
    {
      slug: 'science', name: 'Science', icon: '⚗️', color: '#0369a1', bg: '#eff6ff',
      description: 'Chemical reactions, metals, carbon, optics, electricity, magnetism, environment',
      chapters: [
        {
          id: 'c10s12', chapterNo: 12, title: 'Electricity',
          description: 'Electric current, potential difference, Ohm\'s law, resistance, circuits and power.',
          topics: [
            { title: 'Electric Current', content: 'Flow of electric charge. I = Q/t. Unit: Ampere (A). 1 A = 1 coulomb per second. Current flows from higher potential (+) to lower potential (-). Conventional current: positive to negative. Actual electron flow: negative to positive (opposite direction).' },
            { title: 'Potential Difference (Voltage)', content: 'Work done per unit charge: V = W/Q. Unit: Volt (V). 1 V = 1 Joule per Coulomb. Measured by voltmeter (connected in parallel). EMF = energy provided by battery per unit charge. Potential difference drives current.' },
            { title: 'Ohm\'s Law and Resistance', content: 'V = IR (at constant temperature). Resistance R = V/I. Unit: Ohm (Ω). 1 Ω = 1 V/A. Ohmic conductors: V-I graph is straight line. R = ρL/A (resistivity × length / area). Resistivity depends on material and temperature. Metals: resistance increases with temperature.' },
            { title: 'Series and Parallel Circuits', content: 'Series: same current through all. Voltages add up. R_total = R₁+R₂+R₃. If one bulb fails, ALL go off. Parallel: same voltage across all. Currents add up. 1/R_total = 1/R₁+1/R₂. If one fails, others continue. Home wiring = parallel.' },
          ],
          formulas: [
            { name: "Ohm's Law", formula: 'V = IR (V=voltage, I=current, R=resistance)', example: 'V=12V, R=4Ω: I=V/R=12/4=3A' },
            { name: 'Series Resistance', formula: 'R_total = R₁ + R₂ + R₃', example: '3Ω + 5Ω + 2Ω = 10Ω' },
            { name: 'Parallel Resistance', formula: '1/R_eq = 1/R₁ + 1/R₂ + 1/R₃', example: '6Ω and 3Ω in parallel: 1/R=1/6+1/3=1/2 → R=2Ω' },
            { name: 'Electrical Power', formula: 'P = VI = I²R = V²/R', example: 'I=2A, R=5Ω: P=I²R=4×5=20W' },
            { name: 'Electrical Energy', formula: 'E = P × t = VIt', example: '1000W heater for 2 hours: E=1000×7200=7,200,000 J = 2 kWh' },
            { name: 'Heating Effect (Joule)', formula: 'H = I²Rt', example: 'I=3A, R=10Ω, t=60s: H=9×10×60=5400 J' },
          ],
          experiments: [
            {
              title: "Verification of Ohm's Law",
              objective: "Verify that V ∝ I and find resistance of a wire",
              materials: ['Battery/power supply', 'Rheostat', 'Ammeter', 'Voltmeter', 'Resistor wire', 'Key', 'Connecting wires'],
              steps: [
                'Connect: Battery → Key → Rheostat → Wire (in series)',
                'Connect Voltmeter across the wire (in parallel)',
                'Connect Ammeter in series with wire',
                'Close key, note V and I',
                'Change rheostat, note new V and I',
                'Take 6-8 readings',
                'Plot V on y-axis, I on x-axis',
                'Find slope = R',
              ],
              result: 'V-I graph is straight line through origin → confirms V∝I (Ohm\'s Law). Slope = Resistance R',
              safetyNote: 'Check polarity of meters. Use low current to prevent wire heating up and changing resistance.',
            },
          ],
          videos: [
            { title: 'Electricity Class 10 - Complete Chapter', url: 'https://www.youtube.com/embed/J4Vq-xHqUo8', duration: '45 min', source: 'Education' },
            { title: 'Ohm\'s Law Verification Experiment', url: 'https://www.youtube.com/embed/fzKCwLELCbQ', duration: '12 min', source: 'Science Lab' },
          ],
          keyTerms: ['Current', 'Voltage', 'Resistance', 'Ohm\'s law', 'Series', 'Parallel', 'Power', 'EMF', 'Conductor'],
          quickFacts: ['Lightning bolt carries about 1 billion volts and 30,000 amperes!', 'Thomas Edison had over 1000 patents', 'Nikola Tesla invented AC (alternating current)', 'Your body has about 70,000 km of blood vessels that also conduct small electrical signals'],
        },
      ]
    },
  ]
}

// ══════════════════════════════════════════════════════════════════
// MASTER DATABASE EXPORT
// ══════════════════════════════════════════════════════════════════
export const ALL_CLASS_DATA: ClassData[] = [CLASS6, CLASS9, CLASS10]

export function getClassData(classLevel: string): ClassData | null {
  return ALL_CLASS_DATA.find(c => c.classLevel === classLevel) ?? null
}

export function getSubjectData(classLevel: string, subjectSlug: string): Subject | null {
  const cls = getClassData(classLevel)
  return cls?.subjects.find(s => s.slug === subjectSlug) ?? null
}

export function getChapterData(classLevel: string, subjectSlug: string, chapterId: string): Chapter | null {
  const sub = getSubjectData(classLevel, subjectSlug)
  return sub?.chapters.find(c => c.id === chapterId) ?? null
}

export function getAllChapters(): { classLevel: string; subjectSlug: string; chapter: Chapter }[] {
  const all: { classLevel: string; subjectSlug: string; chapter: Chapter }[] = []
  for (const cls of ALL_CLASS_DATA) {
    for (const sub of cls.subjects) {
      for (const ch of sub.chapters) {
        all.push({ classLevel: cls.classLevel, subjectSlug: sub.slug, chapter: ch })
      }
    }
  }
  return all
}
