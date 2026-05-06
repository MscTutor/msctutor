// lib/ncert-syllabus.ts
// Complete NCERT Syllabus — Class 1 to 12
// All subjects, all chapters, all topics

export interface Chapter {
  id:       string
  title:    string
  topics:   string[]
  formulas?: string[]
  keyTerms?: string[]
}

export interface Subject {
  name:     string
  slug:     string
  icon:     string
  color:    string
  chapters: Chapter[]
}

export interface ClassSyllabus {
  classLevel: string
  subjects:   Subject[]
}

// ─────────────────────────────────────────────────────────
// CLASS 1
// ─────────────────────────────────────────────────────────
export const CLASS_1: ClassSyllabus = {
  classLevel: '1',
  subjects: [
    {
      name: 'Mathematics (Maths Magic)', slug: 'mathematics', icon: '➕', color: '#1a3a6b',
      chapters: [
        { id: 'c1m1', title: 'Shapes and Space', topics: ['Inside and outside', 'Shapes around us', 'Pattern', 'Above and below', 'Near and far'] },
        { id: 'c1m2', title: 'Numbers from One to Nine', topics: ['Counting objects', 'Writing numbers 1-9', 'More and fewer', 'Number names'] },
        { id: 'c1m3', title: 'Addition', topics: ['Adding small numbers', 'Addition stories', 'Adding with pictures', 'Number bonds'] },
        { id: 'c1m4', title: 'Subtraction', topics: ['Taking away', 'Subtraction stories', 'How many are left?'] },
        { id: 'c1m5', title: 'Numbers from Ten to Twenty', topics: ['Counting 10-20', 'Place value (tens and ones)', 'Writing number names'] },
        { id: 'c1m6', title: 'Time', topics: ['Morning, afternoon, evening, night', 'Days of the week', 'Months of the year'] },
        { id: 'c1m7', title: 'Measurement', topics: ['Longer and shorter', 'Heavier and lighter', 'More and less (volume)'] },
        { id: 'c1m8', title: 'Numbers from Twenty-one to Fifty', topics: ['Counting 21-50', 'Number names', 'Skip counting'] },
        { id: 'c1m9', title: 'Data Handling', topics: ['Sorting objects', 'Pictograph', 'Counting in groups'] },
        { id: 'c1m10', title: 'Patterns', topics: ['Repeating patterns', 'Growing patterns', 'Pattern in nature'] },
        { id: 'c1m11', title: 'Numbers', topics: ['Numbers 51-100', 'Ordinal numbers', 'Comparing numbers'] },
        { id: 'c1m12', title: 'Money', topics: ['Coins and notes', 'Counting money', 'Simple transactions'] },
        { id: 'c1m13', title: 'How Many?', topics: ['Counting large groups', 'Estimation', 'Grouping by tens'] },
      ]
    },
    {
      name: 'English (Marigold)', slug: 'english', icon: '📝', color: '#1e3a5f',
      chapters: [
        { id: 'c1e1', title: 'A Happy Child', topics: ['Reading simple sentences', 'New words', 'Poem comprehension'] },
        { id: 'c1e2', title: 'After a Bath', topics: ['Daily routine', 'Action words', 'Simple sentences'] },
        { id: 'c1e3', title: 'One Little Kitten', topics: ['Animals and sounds', 'Rhyming words', 'Counting poem'] },
        { id: 'c1e4', title: 'Bubble Bubble', topics: ['Describing words', 'Colors', 'Fun with language'] },
        { id: 'c1e5', title: 'Noodle Soup', topics: ['Food items', 'Simple story', 'New vocabulary'] },
        { id: 'c1e6', title: 'Once I Saw a Little Bird', topics: ['Birds', 'Nature poem', 'Question words'] },
        { id: 'c1e7', title: 'Lalu and Peelu', topics: ['Story reading', 'Colors', 'Comprehension'] },
        { id: 'c1e8', title: 'A Little Turtle', topics: ['Animals', 'Describing a turtle', 'Rhyme'] },
      ]
    },
    {
      name: 'Hindi (Rimjhim)', slug: 'hindi', icon: '🇮🇳', color: '#dc2626',
      chapters: [
        { id: 'c1h1', title: 'झूला', topics: ['स्वर', 'व्यंजन', 'बारहखड़ी', 'शब्द पहचान'] },
        { id: 'c1h2', title: 'आम की कहानी', topics: ['छोटी कहानी', 'नए शब्द', 'चित्र देखकर बताओ'] },
        { id: 'c1h3', title: 'आम की टोकरी', topics: ['गिनती', 'फल', 'कविता'] },
        { id: 'c1h4', title: 'पत्ते ही पत्ते', topics: ['पेड़-पौधे', 'रंग', 'प्रकृति'] },
        { id: 'c1h5', title: 'पकौड़ी', topics: ['खाना', 'घर', 'परिवार'] },
      ]
    },
  ]
}

// ─────────────────────────────────────────────────────────
// CLASS 2
// ─────────────────────────────────────────────────────────
export const CLASS_2: ClassSyllabus = {
  classLevel: '2',
  subjects: [
    {
      name: 'Mathematics (Maths Magic)', slug: 'mathematics', icon: '➕', color: '#1a3a6b',
      chapters: [
        { id: 'c2m1', title: 'What is Long? What is Round?', topics: ['Shapes', 'Comparing shapes', 'Solid and flat shapes'] },
        { id: 'c2m2', title: 'Counting in Groups', topics: ['Groups of 2, 5, 10', 'Skip counting', 'Even and odd'] },
        { id: 'c2m3', title: 'How Much Can You Carry?', topics: ['Weight', 'Balance', 'Heavy and light'] },
        { id: 'c2m4', title: 'Counting in Tens', topics: ['Place value', 'Tens and ones', 'Number expansion'] },
        { id: 'c2m5', title: 'Patterns', topics: ['Number patterns', 'Shape patterns', 'Growing sequences'] },
        { id: 'c2m6', title: 'Footprints', topics: ['Measurement with non-standard units', 'Comparison', 'Estimation'] },
        { id: 'c2m7', title: 'Jugs and Mugs', topics: ['Capacity', 'Filling and emptying', 'Comparison of volume'] },
        { id: 'c2m8', title: 'Tens and Hundreds', topics: ['Hundreds, tens, ones', '3-digit numbers', 'Place value chart'] },
        { id: 'c2m9', title: 'My Funday', topics: ['Calendar', 'Days', 'Months', 'Dates'] },
        { id: 'c2m10', title: 'Add Our Points', topics: ['2-digit addition', 'Adding with carry', 'Word problems'] },
        { id: 'c2m11', title: 'Lines and Lines', topics: ['Straight and curved lines', 'Drawing lines', 'Patterns with lines'] },
        { id: 'c2m12', title: 'Give and Take', topics: ['Subtraction', '2-digit subtraction', 'Borrowing concept'] },
        { id: 'c2m13', title: 'The Longest Step', topics: ['Length', 'Measuring with ruler', 'Centimetres'] },
        { id: 'c2m14', title: 'Birds Come, Birds Go', topics: ['Data collection', 'Tally marks', 'Simple graphs'] },
        { id: 'c2m15', title: 'How Many Ponytails', topics: ['Counting strategies', 'Data handling', 'Bar graph'] },
      ]
    },
    {
      name: 'English (Marigold)', slug: 'english', icon: '📝', color: '#1e3a5f',
      chapters: [
        { id: 'c2e1', title: 'First Day at School', topics: ['School life', 'New words', 'Story reading'] },
        { id: 'c2e2', title: 'Haldi\'s Adventure', topics: ['Adventure story', 'Animals', 'Comprehension'] },
        { id: 'c2e3', title: 'I am Lucky!', topics: ['Gratitude', 'Describing oneself', 'Poem'] },
        { id: 'c2e4', title: 'I Want', topics: ['Wishes and desires', 'Rhyming poem', 'Vocabulary'] },
        { id: 'c2e5', title: 'A Smile', topics: ['Emotions', 'Simple poem', 'Expression'] },
        { id: 'c2e6', title: 'The Wind and the Sun', topics: ['Fable', 'Moral story', 'Characters'] },
        { id: 'c2e7', title: 'Rain', topics: ['Weather', 'Sensory words', 'Nature poem'] },
        { id: 'c2e8', title: 'Storm in the Garden', topics: ['Story', 'Action words', 'Describing events'] },
      ]
    },
  ]
}

// ─────────────────────────────────────────────────────────
// CLASS 3
// ─────────────────────────────────────────────────────────
export const CLASS_3: ClassSyllabus = {
  classLevel: '3',
  subjects: [
    {
      name: 'Mathematics', slug: 'mathematics', icon: '➕', color: '#1a3a6b',
      chapters: [
        { id: 'c3m1', title: 'Where to Look From?', topics: ['Different views', 'Top, front, side view', 'Perspective'] },
        { id: 'c3m2', title: 'Fun with Numbers', topics: ['Large numbers', '4-digit numbers', 'Place value', 'Comparing numbers'] },
        { id: 'c3m3', title: 'Give and Take', topics: ['Addition up to 1000', 'Subtraction', 'Word problems'] },
        { id: 'c3m4', title: 'Long and Short', topics: ['Measurement in cm and m', 'Conversion', 'Ruler use'] },
        { id: 'c3m5', title: 'Shapes and Designs', topics: ['2D shapes', '3D shapes', 'Symmetry', 'Tessellation'] },
        { id: 'c3m6', title: 'Fun with Give and Take', topics: ['Mixed operations', 'Mental math', 'Estimation'] },
        { id: 'c3m7', title: 'Time Goes On', topics: ['Reading clock', 'Hours and minutes', 'AM and PM', 'Calendar'] },
        { id: 'c3m8', title: 'Who is Heavier?', topics: ['Weight in grams and kg', 'Comparing weights', 'Weighing'] },
        { id: 'c3m9', title: 'How Many Times?', topics: ['Multiplication concept', 'Tables 1-10', 'Repeated addition'] },
        { id: 'c3m10', title: 'Play with Patterns', topics: ['Number patterns', 'Magic squares', 'Sequences'] },
        { id: 'c3m11', title: 'Jugs and Mugs', topics: ['Litre and ml', 'Measuring capacity', 'Conversion'] },
        { id: 'c3m12', title: 'Can We Share?', topics: ['Division concept', 'Equal sharing', 'Division as repeated subtraction'] },
        { id: 'c3m13', title: 'Smart Charts!', topics: ['Data collection', 'Pictograph', 'Bar graph'] },
        { id: 'c3m14', title: 'Rupees and Paise', topics: ['Money', 'Addition with money', 'Making change'] },
      ]
    },
    {
      name: 'EVS (Looking Around)', slug: 'evs', icon: '🌿', color: '#0a5e3f',
      chapters: [
        { id: 'c3e1', title: 'Poonam\'s Day Out', topics: ['Animals and their homes', 'Birds', 'Water creatures'] },
        { id: 'c3e2', title: 'The Plant Fairy', topics: ['Types of plants', 'Parts of plant', 'Plants around us'] },
        { id: 'c3e3', title: 'Water O Water', topics: ['Sources of water', 'Uses of water', 'Water conservation'] },
        { id: 'c3e4', title: 'Our First School', topics: ['Family', 'Home', 'Relationships'] },
        { id: 'c3e5', title: 'Chhotu\'s House', topics: ['Different types of houses', 'Building materials', 'Rural and urban'] },
        { id: 'c3e6', title: 'Foods We Eat', topics: ['Food groups', 'Healthy eating', 'Cooking'] },
        { id: 'c3e7', title: 'Saying Without Speaking', topics: ['Communication', 'Signs and symbols', 'Languages'] },
        { id: 'c3e8', title: 'Flying High', topics: ['Birds', 'Migration', 'Parts of a bird'] },
      ]
    },
  ]
}

// ─────────────────────────────────────────────────────────
// CLASS 4
// ─────────────────────────────────────────────────────────
export const CLASS_4: ClassSyllabus = {
  classLevel: '4',
  subjects: [
    {
      name: 'Mathematics', slug: 'mathematics', icon: '➕', color: '#1a3a6b',
      chapters: [
        { id: 'c4m1', title: 'Building with Bricks', topics: ['Shapes', '3D objects', 'Faces, edges, vertices'] },
        { id: 'c4m2', title: 'Long and Short', topics: ['Measurement', 'Conversion of units', 'Estimation'] },
        { id: 'c4m3', title: 'A Trip to Bhopal', topics: ['Large numbers', 'Distance', 'Maps and scale'] },
        { id: 'c4m4', title: 'Tick-Tick-Tick', topics: ['Time', 'Reading clocks', 'Duration', 'Calendar'] },
        { id: 'c4m5', title: 'The Way The World Looks', topics: ['Top view', 'Maps', 'Direction and distance'] },
        { id: 'c4m6', title: 'The Junk Seller', topics: ['Money', 'Bills and transactions', 'Profit and loss concept'] },
        { id: 'c4m7', title: 'Jugs and Mugs', topics: ['Capacity', 'Litres and millilitres', 'Estimation'] },
        { id: 'c4m8', title: 'Carts and Wheels', topics: ['Circles and wheels', 'Radius', 'Shapes in daily life'] },
        { id: 'c4m9', title: 'Halves and Quarters', topics: ['Fractions', 'Half', 'Quarter', 'Equal parts'] },
        { id: 'c4m10', title: 'Play with Patterns', topics: ['Number and shape patterns', 'Symmetry'] },
        { id: 'c4m11', title: 'Tables and Shares', topics: ['Multiplication tables', 'Division', 'Multiples'] },
        { id: 'c4m12', title: 'How Heavy? How Light?', topics: ['Weight', 'Grams and kilograms', 'Balance'] },
        { id: 'c4m13', title: 'Fields and Fences', topics: ['Perimeter', 'Area concept', 'Measurement of land'] },
        { id: 'c4m14', title: 'Smart Charts', topics: ['Data', 'Bar graphs', 'Pictographs', 'Reading charts'] },
      ]
    },
    {
      name: 'EVS (Looking Around)', slug: 'evs', icon: '🌿', color: '#0a5e3f',
      chapters: [
        { id: 'c4evs1', title: 'Going to School', topics: ['Transport', 'Roads', 'Safety rules'] },
        { id: 'c4evs2', title: 'Ear to Ear', topics: ['Animals', 'Sense organs', 'Sound'] },
        { id: 'c4evs3', title: 'A Day with Nandu', topics: ['Elephant habitat', 'Wildlife', 'Conservation'] },
        { id: 'c4evs4', title: 'The Story of Amrita', topics: ['Trees', 'Forest conservation', 'Chipko movement'] },
        { id: 'c4evs5', title: 'Anita and the Honeybees', topics: ['Bees', 'Honey', 'Insects'] },
        { id: 'c4evs6', title: 'Omana\'s Journey', topics: ['Train journey', 'States of India', 'Geography'] },
        { id: 'c4evs7', title: 'From the Window', topics: ['Observation', 'Nature', 'Seasons'] },
        { id: 'c4evs8', title: 'Reaching Grandmother\'s House', topics: ['Different homes', 'Culture', 'Traditions'] },
        { id: 'c4evs9', title: 'Changing Families', topics: ['Family types', 'Relationships', 'Changes in family'] },
        { id: 'c4evs10', title: 'Hu Tu Tu Hu Tu Tu', topics: ['Traditional games', 'Exercise', 'Health'] },
      ]
    },
  ]
}

// ─────────────────────────────────────────────────────────
// CLASS 5
// ─────────────────────────────────────────────────────────
export const CLASS_5: ClassSyllabus = {
  classLevel: '5',
  subjects: [
    {
      name: 'Mathematics', slug: 'mathematics', icon: '➕', color: '#1a3a6b',
      chapters: [
        { id: 'c5m1', title: 'The Fish Tale', topics: ['Large numbers', 'Multiplication', 'Word problems'] },
        { id: 'c5m2', title: 'Shapes and Angles', topics: ['Types of angles', 'Measuring angles', '2D shapes'] },
        { id: 'c5m3', title: 'How Many Squares?', topics: ['Area', 'Counting squares', 'Perimeter vs area'] },
        { id: 'c5m4', title: 'Parts and Wholes', topics: ['Fractions', 'Like and unlike fractions', 'Mixed numbers'] },
        { id: 'c5m5', title: 'Does it Look the Same?', topics: ['Symmetry', 'Mirror images', 'Lines of symmetry'] },
        { id: 'c5m6', title: 'Be My Multiple, I\'ll be Your Factor', topics: ['Factors', 'Multiples', 'Prime numbers', 'HCF and LCM'] },
        { id: 'c5m7', title: 'Can You See the Pattern?', topics: ['Number patterns', 'Rules', 'Magic triangles'] },
        { id: 'c5m8', title: 'Mapping Your Way', topics: ['Maps and directions', 'Scale', 'Compass points'] },
        { id: 'c5m9', title: 'Boxes and Sketches', topics: ['3D shapes', 'Nets', 'Drawing 3D objects'] },
        { id: 'c5m10', title: 'Tenths and Hundredths', topics: ['Decimals', 'Comparing decimals', 'Money and decimals'] },
        { id: 'c5m11', title: 'Area and its Boundary', topics: ['Area formula', 'Perimeter', 'Units of area'] },
        { id: 'c5m12', title: 'Smart Charts', topics: ['Pie charts', 'Bar graphs', 'Data interpretation'] },
        { id: 'c5m13', title: 'Ways to Multiply and Divide', topics: ['Long multiplication', 'Long division', 'Estimation'] },
        { id: 'c5m14', title: 'How Big? How Heavy?', topics: ['Volume', 'Cubic units', 'Weight revision'] },
      ]
    },
    {
      name: 'EVS (Looking Around)', slug: 'evs', icon: '🌿', color: '#0a5e3f',
      chapters: [
        { id: 'c5evs1', title: 'Super Senses', topics: ['Sense organs', 'Animal senses', 'How animals find food'] },
        { id: 'c5evs2', title: 'A Snake Charmer\'s Story', topics: ['Wildlife protection', 'Snake', 'Conservation'] },
        { id: 'c5evs3', title: 'From Tasting to Digesting', topics: ['Digestion', 'Teeth', 'Digestive system'] },
        { id: 'c5evs4', title: 'Mangoes Round the Year', topics: ['Food preservation', 'Seasons', 'Food storage'] },
        { id: 'c5evs5', title: 'Seeds and Seeds', topics: ['Seed dispersal', 'Types of seeds', 'Germination'] },
        { id: 'c5evs6', title: 'Every Drop Counts', topics: ['Water cycle', 'Water conservation', 'Water harvesting'] },
        { id: 'c5evs7', title: 'Experiments with Water', topics: ['Properties of water', 'Absorption', 'Filtration'] },
        { id: 'c5evs8', title: 'A Treat for Mosquitoes', topics: ['Diseases', 'Mosquitoes', 'Prevention'] },
        { id: 'c5evs9', title: 'Up You Go!', topics: ['Mountain life', 'Adaptation', 'Himalayas'] },
        { id: 'c5evs10', title: 'Walls Tell Stories', topics: ['History', 'Forts', 'Historical monuments'] },
      ]
    },
  ]
}

// ─────────────────────────────────────────────────────────
// CLASS 6
// ─────────────────────────────────────────────────────────
export const CLASS_6: ClassSyllabus = {
  classLevel: '6',
  subjects: [
    {
      name: 'Mathematics', slug: 'mathematics', icon: '➕', color: '#1a3a6b',
      chapters: [
        { id: 'c6m1', title: 'Knowing Our Numbers', topics: ['Indian number system', 'International system', 'Large numbers', 'Estimation', 'Roman numerals'], formulas: ['Place value', 'Face value'] },
        { id: 'c6m2', title: 'Whole Numbers', topics: ['Natural numbers', 'Whole numbers', 'Number line', 'Properties of whole numbers'], formulas: ['Commutative', 'Associative', 'Distributive'] },
        { id: 'c6m3', title: 'Playing with Numbers', topics: ['Factors and multiples', 'Prime and composite numbers', 'Tests of divisibility', 'HCF', 'LCM'], keyTerms: ['HCF', 'LCM', 'Prime factorisation'] },
        { id: 'c6m4', title: 'Basic Geometrical Ideas', topics: ['Point, line, ray', 'Angle', 'Triangle, quadrilateral, polygon', 'Circle'] },
        { id: 'c6m5', title: 'Understanding Elementary Shapes', topics: ['Line segments', 'Angles (acute, obtuse, right)', 'Triangles', 'Quadrilaterals', '3D shapes'] },
        { id: 'c6m6', title: 'Integers', topics: ['Negative numbers', 'Integers on number line', 'Addition and subtraction of integers'], formulas: ['a + (-a) = 0'] },
        { id: 'c6m7', title: 'Fractions', topics: ['Types of fractions', 'Equivalent fractions', 'Comparing fractions', 'Addition and subtraction'] },
        { id: 'c6m8', title: 'Decimals', topics: ['Decimal notation', 'Comparing decimals', 'Addition and subtraction of decimals'] },
        { id: 'c6m9', title: 'Data Handling', topics: ['Collection of data', 'Tally marks', 'Pictograph', 'Bar graph', 'Mean'] },
        { id: 'c6m10', title: 'Mensuration', topics: ['Perimeter of rectangle and square', 'Area of rectangle and square'], formulas: ['P = 2(l+b)', 'A = l×b', 'P = 4s', 'A = s²'] },
        { id: 'c6m11', title: 'Algebra', topics: ['Matchstick patterns', 'Variables', 'Algebraic expressions', 'Simple equations'] },
        { id: 'c6m12', title: 'Ratio and Proportion', topics: ['Ratio', 'Equivalent ratios', 'Proportion', 'Unitary method'] },
        { id: 'c6m13', title: 'Symmetry', topics: ['Lines of symmetry', 'Reflection symmetry', 'Rotational symmetry'] },
        { id: 'c6m14', title: 'Practical Geometry', topics: ['Drawing a circle', 'Perpendicular bisector', 'Angle bisector', 'Drawing angles'] },
      ]
    },
    {
      name: 'Science', slug: 'science', icon: '⚗️', color: '#0369a1',
      chapters: [
        { id: 'c6s1', title: 'Food: Where Does It Come From?', topics: ['Plant and animal food sources', 'Edible parts of plants', 'Herbivores, omnivores, carnivores'] },
        { id: 'c6s2', title: 'Components of Food', topics: ['Carbohydrates', 'Proteins', 'Fats', 'Vitamins', 'Minerals', 'Balanced diet', 'Deficiency diseases'] },
        { id: 'c6s3', title: 'Fibre to Fabric', topics: ['Plant fibres (cotton, jute)', 'Animal fibres (wool, silk)', 'Weaving', 'Spinning'] },
        { id: 'c6s4', title: 'Sorting Materials into Groups', topics: ['Properties of materials', 'Transparency', 'Solubility', 'Conductors and insulators'] },
        { id: 'c6s5', title: 'Separation of Substances', topics: ['Threshing', 'Winnowing', 'Sieving', 'Sedimentation', 'Filtration', 'Evaporation', 'Distillation'] },
        { id: 'c6s6', title: 'Changes Around Us', topics: ['Reversible changes', 'Irreversible changes', 'Examples in daily life'] },
        { id: 'c6s7', title: 'Getting to Know Plants', topics: ['Types of plants', 'Parts of a plant', 'Root, stem, leaf, flower', 'Photosynthesis'] },
        { id: 'c6s8', title: 'Body Movements', topics: ['Types of joints', 'Human skeleton', 'Movement in animals', 'Cockroach, earthworm, snail, fish, bird'] },
        { id: 'c6s9', title: 'The Living Organisms and Their Surroundings', topics: ['Habitat', 'Adaptation', 'Biotic and abiotic components', 'Aquatic, terrestrial, desert habitats'] },
        { id: 'c6s10', title: 'Motion and Measurement of Distances', topics: ['Standard units', 'SI system', 'Measurement', 'Types of motion'] },
        { id: 'c6s11', title: 'Light, Shadows and Reflections', topics: ['Transparent, translucent, opaque', 'Shadow formation', 'Reflection', 'Pinhole camera'] },
        { id: 'c6s12', title: 'Electricity and Circuits', topics: ['Electric circuit', 'Cell', 'Switch', 'Conductors and insulators'] },
        { id: 'c6s13', title: 'Fun with Magnets', topics: ['Properties of magnets', 'Poles', 'Magnetic compass', 'Uses of magnets'] },
        { id: 'c6s14', title: 'Water', topics: ['Water cycle', 'Evaporation', 'Condensation', 'Water conservation'] },
        { id: 'c6s15', title: 'Air Around Us', topics: ['Composition of air', 'Properties of air', 'Wind', 'Air pollution'] },
        { id: 'c6s16', title: 'Garbage In, Garbage Out', topics: ['Types of waste', 'Biodegradable', 'Composting', 'Recycling', '3 Rs'] },
      ]
    },
    {
      name: 'Social Science', slug: 'social-science', icon: '🌍', color: '#065f46',
      chapters: [
        { id: 'c6ss1', title: 'What, Where, How and When?', topics: ['History', 'Sources', 'Historians', 'Timeline', 'Dates and calendars'] },
        { id: 'c6ss2', title: 'On the Trail of the Earliest People', topics: ['Hunter-gatherers', 'Stone age', 'Cave paintings', 'Fire discovery'] },
        { id: 'c6ss3', title: 'From Gathering to Growing Food', topics: ['Agriculture', 'Domestication of animals', 'Neolithic age', 'First farmers'] },
        { id: 'c6ss4', title: 'In the Earliest Cities', topics: ['Harappan civilisation', 'Town planning', 'Trade', 'Crafts'] },
        { id: 'c6ss5', title: 'What Books and Burials Tell Us', topics: ['Vedas', 'Megaliths', 'Iron tools', 'Social differences'] },
        { id: 'c6ss6', title: 'Kingdoms, Kings and an Early Republic', topics: ['Janapadas', 'Mahajanapadas', 'Elections', 'Republics', 'Magadha'] },
        { id: 'c6ss7', title: 'New Questions and Ideas', topics: ['Upanishads', 'Mahavira', 'Jainism', 'Buddha', 'Buddhism', 'Sangha'] },
        { id: 'c6ss8', title: 'Ashoka, The Emperor Who Gave Up War', topics: ['Maurya empire', 'Kalinga war', 'Dhamma', 'Pillars and inscriptions'] },
        { id: 'c6ss9', title: 'Vital Villages, Thriving Towns', topics: ['Iron tools', 'Agriculture', 'Trade towns', 'Coins', 'Punch-marked coins'] },
        { id: 'c6ss10', title: 'Traders, Kings and Pilgrims', topics: ['Silk route', 'Buddhism spread', 'Bhakti', 'Pilgrims'] },
        { id: 'c6ss11', title: 'New Empires and Kingdoms', topics: ['Gupta empire', 'Samudragupta', 'Pallava', 'Chalukya', 'Prabhavatigupta'] },
        { id: 'c6ss12', title: 'Buildings, Paintings and Books', topics: ['Stupas', 'Temples', 'Ajanta caves', 'Kalidasa', 'Aryabhata'] },
      ]
    },
  ]
}

// ─────────────────────────────────────────────────────────
// CLASS 9 (Most important — board prep begins)
// ─────────────────────────────────────────────────────────
export const CLASS_9: ClassSyllabus = {
  classLevel: '9',
  subjects: [
    {
      name: 'Mathematics', slug: 'mathematics', icon: '➕', color: '#1a3a6b',
      chapters: [
        { id: 'c9m1', title: 'Number Systems', topics: ['Irrational numbers', 'Real numbers and number line', 'Laws of exponents', 'Decimal expansion of real numbers'], formulas: ['√a × √b = √(ab)', 'a^m × a^n = a^(m+n)', '(a^m)^n = a^(mn)'] },
        { id: 'c9m2', title: 'Polynomials', topics: ['Polynomial definition', 'Degree of polynomial', 'Zeroes of polynomial', 'Remainder theorem', 'Factor theorem', 'Algebraic identities'], formulas: ['(a+b)² = a²+2ab+b²', '(a-b)² = a²-2ab+b²', 'a³+b³ = (a+b)(a²-ab+b²)'] },
        { id: 'c9m3', title: 'Coordinate Geometry', topics: ['Cartesian system', 'Plotting points', 'Quadrants', 'x-axis and y-axis', 'Origin'], keyTerms: ['x-coordinate (abscissa)', 'y-coordinate (ordinate)', 'Quadrant'] },
        { id: 'c9m4', title: 'Linear Equations in Two Variables', topics: ['Ax+By+C=0 form', 'Graph of linear equation', 'Solutions', 'Lines passing through origin'], formulas: ['ax + by + c = 0'] },
        { id: 'c9m5', title: 'Introduction to Euclid\'s Geometry', topics: ['Euclid\'s definitions', 'Axioms and postulates', '5 postulates', 'Theorems and proofs'] },
        { id: 'c9m6', title: 'Lines and Angles', topics: ['Types of angles', 'Parallel lines', 'Transversal', 'Angle sum property'], formulas: ['Angle sum = 180°', 'Vertically opposite angles are equal'] },
        { id: 'c9m7', title: 'Triangles', topics: ['Congruence criteria (SSS, SAS, ASA, AAS, RHS)', 'Properties of triangles', 'Inequalities in triangles'] },
        { id: 'c9m8', title: 'Quadrilaterals', topics: ['Properties of quadrilaterals', 'Parallelogram', 'Rhombus', 'Rectangle', 'Square', 'Mid-point theorem'] },
        { id: 'c9m9', title: 'Areas of Parallelograms and Triangles', topics: ['Area of parallelogram', 'Area of triangle', 'Triangles on same base'], formulas: ['Area = base × height', 'Area of triangle = ½ × b × h'] },
        { id: 'c9m10', title: 'Circles', topics: ['Circle terminology', 'Chord properties', 'Angle subtended by chord', 'Cyclic quadrilateral'], keyTerms: ['Chord', 'Arc', 'Sector', 'Segment', 'Tangent'] },
        { id: 'c9m11', title: 'Constructions', topics: ['Bisecting a line segment', 'Bisecting an angle', 'Constructing triangles'] },
        { id: 'c9m12', title: 'Heron\'s Formula', topics: ['Heron\'s formula derivation', 'Area of triangle with all sides given', 'Area of quadrilateral'], formulas: ['s = (a+b+c)/2', 'Area = √[s(s-a)(s-b)(s-c)]'] },
        { id: 'c9m13', title: 'Surface Areas and Volumes', topics: ['Cuboid', 'Cube', 'Cylinder', 'Cone', 'Sphere'], formulas: ['CSA of cylinder = 2πrh', 'Volume of cylinder = πr²h', 'Volume of cone = ⅓πr²h', 'SA of sphere = 4πr²'] },
        { id: 'c9m14', title: 'Statistics', topics: ['Collection of data', 'Mean', 'Median', 'Mode', 'Bar graph', 'Histogram', 'Frequency polygon'], formulas: ['Mean = Σx/n', 'Mode = most frequent value'] },
        { id: 'c9m15', title: 'Probability', topics: ['Experimental probability', 'Empirical probability', 'Events', 'Sample space'], formulas: ['P(E) = n(favorable outcomes)/n(total outcomes)'] },
      ]
    },
    {
      name: 'Science', slug: 'science', icon: '⚗️', color: '#0369a1',
      chapters: [
        { id: 'c9s1', title: 'Matter in Our Surroundings', topics: ['States of matter', 'Interconversion of states', 'Evaporation', 'Latent heat', 'Boiling and melting points'], keyTerms: ['Sublimation', 'Condensation', 'Fusion', 'Vaporisation'] },
        { id: 'c9s2', title: 'Is Matter Around Us Pure?', topics: ['Mixtures and solutions', 'Suspensions and colloids', 'Separation techniques', 'Physical and chemical changes', 'Elements and compounds'] },
        { id: 'c9s3', title: 'Atoms and Molecules', topics: ['Laws of chemical combination', 'Dalton\'s atomic theory', 'Atoms', 'Molecules', 'Ions', 'Formulae of compounds'], formulas: ['Law of conservation of mass', 'Law of constant proportions'] },
        { id: 'c9s4', title: 'Structure of the Atom', topics: ['Electrons, protons, neutrons', 'Thomson\'s model', 'Rutherford\'s model', 'Bohr\'s model', 'Valency', 'Atomic number and mass number', 'Isotopes'], keyTerms: ['Nucleus', 'Shell', 'Orbit', 'Atomic mass'] },
        { id: 'c9s5', title: 'The Fundamental Unit of Life', topics: ['Cell', 'Cell theory', 'Prokaryotic and eukaryotic', 'Cell organelles', 'Plasma membrane', 'Nucleus', 'Mitochondria', 'Plastids'] },
        { id: 'c9s6', title: 'Tissues', topics: ['Plant tissues (meristematic, permanent)', 'Animal tissues (epithelial, connective, muscular, nervous)'] },
        { id: 'c9s7', title: 'Diversity in Living Organisms', topics: ['Classification', 'Kingdom Monera, Protista, Fungi, Plantae, Animalia', 'Nomenclature', 'Five kingdom classification'] },
        { id: 'c9s8', title: 'Motion', topics: ['Distance and displacement', 'Velocity and speed', 'Equations of motion', 'Uniform and non-uniform motion', 'Graphs'], formulas: ['v = u + at', 's = ut + ½at²', 'v² = u² + 2as'] },
        { id: 'c9s9', title: 'Force and Laws of Motion', topics: ['Newton\'s three laws', 'Inertia', 'Momentum', 'Impulse', 'Law of conservation of momentum'], formulas: ['F = ma', 'p = mv', 'F × t = m(v-u)'] },
        { id: 'c9s10', title: 'Gravitation', topics: ['Universal law of gravitation', 'Free fall', 'Weight and mass', 'Thrust and pressure', 'Archimedes\' principle', 'Buoyancy', 'Relative density'], formulas: ['F = Gm₁m₂/r²', 'g = GM/R²', 'W = mg'] },
        { id: 'c9s11', title: 'Work and Energy', topics: ['Work done', 'Energy', 'Kinetic and potential energy', 'Law of conservation of energy', 'Power', 'Commercial unit of energy'], formulas: ['W = F × s', 'KE = ½mv²', 'PE = mgh', 'P = W/t'] },
        { id: 'c9s12', title: 'Sound', topics: ['Production of sound', 'Propagation', 'Wave characteristics', 'Speed of sound', 'Reflection of sound', 'Echo', 'Sonar', 'Human ear'] },
        { id: 'c9s13', title: 'Why Do We Fall Ill?', topics: ['Health', 'Disease', 'Infectious and non-infectious', 'Causes of diseases', 'Prevention'] },
        { id: 'c9s14', title: 'Natural Resources', topics: ['Air', 'Water', 'Soil', 'Biogeochemical cycles', 'Nitrogen cycle', 'Carbon cycle', 'Water cycle'] },
        { id: 'c9s15', title: 'Improvement in Food Resources', topics: ['Crop improvement', 'Crop variety', 'Animal husbandry', 'Fisheries', 'Bee-keeping', 'Manures and fertilisers'] },
      ]
    },
    {
      name: 'Social Science', slug: 'social-science', icon: '🌍', color: '#065f46',
      chapters: [
        { id: 'c9ss1', title: 'The French Revolution', topics: ['Causes', 'Events of 1789', 'Declaration of Rights', 'Role of Napoleon', 'Impact on Europe'] },
        { id: 'c9ss2', title: 'Socialism in Europe and the Russian Revolution', topics: ['Capitalism vs Socialism', 'Russian revolution', 'Lenin', 'Bolsheviks', 'Impact of revolution'] },
        { id: 'c9ss3', title: 'Nazism and the Rise of Hitler', topics: ['Weimar Republic', 'Rise of Hitler', 'Nazi ideology', 'Holocaust', 'World War II'] },
        { id: 'c9ss4', title: 'Forest Society and Colonialism', topics: ['Forest management', 'Colonial impact on forests', 'Tribes and forests', 'Scientific forestry'] },
        { id: 'c9ss5', title: 'Pastoralists in the Modern World', topics: ['Nomadic pastoralists', 'Colonial policies', 'Africa', 'India', 'Changes in pastoralism'] },
        { id: 'c9ss6', title: 'India — Size and Location', topics: ['Location of India', 'Extent', 'Neighbours', 'Standard meridian'] },
        { id: 'c9ss7', title: 'Physical Features of India', topics: ['Himalayan mountains', 'Northern plains', 'Peninsular plateau', 'Coastal plains', 'Islands'] },
        { id: 'c9ss8', title: 'Drainage', topics: ['River systems', 'Himalayan rivers', 'Peninsular rivers', 'Lakes', 'Rivers and economy'] },
        { id: 'c9ss9', title: 'Climate', topics: ['Monsoon', 'Seasons in India', 'Distribution of rainfall', 'Climatic regions'] },
        { id: 'c9ss10', title: 'Natural Vegetation and Wildlife', topics: ['Types of vegetation', 'Flora and fauna', 'Conservation', 'National parks'] },
        { id: 'c9ss11', title: 'Population', topics: ['Population distribution', 'Density', 'Growth rate', 'Literacy', 'Occupational structure'] },
        { id: 'c9ss12', title: 'What is Democracy? Why Democracy?', topics: ['Definition', 'Features', 'Arguments for democracy', 'Alternatives'] },
        { id: 'c9ss13', title: 'Constitutional Design', topics: ['Constituent Assembly', 'Preamble', 'Democratic constitution', 'South Africa case'] },
        { id: 'c9ss14', title: 'Electoral Politics', topics: ['Elections', 'Election Commission', 'Why elections?', 'Model code of conduct'] },
        { id: 'c9ss15', title: 'Working of Institutions', topics: ['Parliament', 'Prime Minister', 'Cabinet', 'Supreme Court', 'Judiciary'] },
        { id: 'c9ss16', title: 'The Story of Village Palampur', topics: ['Farming', 'Capital', 'Labour', 'Non-farm activities', 'Market'] },
        { id: 'c9ss17', title: 'People as Resource', topics: ['Human capital', 'Economic activities', 'Unemployment', 'Quality of population'] },
        { id: 'c9ss18', title: 'Poverty as a Challenge', topics: ['Poverty line', 'Causes', 'Anti-poverty measures', 'Challenges'] },
        { id: 'c9ss19', title: 'Food Security in India', topics: ['Food security', 'Buffer stock', 'PDS', 'Hunger', 'Famine'] },
      ]
    },
    {
      name: 'English', slug: 'english', icon: '📝', color: '#1e3a5f',
      chapters: [
        { id: 'c9en1', title: 'The Fun They Had', topics: ['Science fiction', 'Future of education', 'Vocabulary', 'Comprehension'] },
        { id: 'c9en2', title: 'The Sound of Music', topics: ['Biography', 'Evelyn Glennie', 'Bishnoi musicians', 'Comprehension'] },
        { id: 'c9en3', title: 'The Little Girl', topics: ['Katherine Mansfield', 'Family relationship', 'Grammar', 'Vocabulary'] },
        { id: 'c9en4', title: 'A Truly Beautiful Mind', topics: ['Albert Einstein', 'Biography', 'World peace', 'Science'] },
        { id: 'c9en5', title: 'The Snake and the Mirror', topics: ['Humour', 'Doctor\'s story', 'Descriptive writing'] },
        { id: 'c9en6', title: 'My Childhood', topics: ['APJ Abdul Kalam', 'Autobiography', 'Secularism', 'Friendship'] },
        { id: 'c9en7', title: 'Packing', topics: ['Jerome K Jerome', 'Humour', 'Adventure', 'Drama'] },
        { id: 'c9en8', title: 'Reach for the Top', topics: ['Santosh Yadav', 'Maria Sharapova', 'Achievement', 'Hard work'] },
        { id: 'c9en9', title: 'The Bond of Love', topics: ['Kenneth Anderson', 'Compassion', 'Animals', 'Story'] },
        { id: 'c9en10', title: 'Kathmandu', topics: ['Vikram Seth', 'Travel writing', 'Nepal', 'Descriptive'] },
        { id: 'c9en11', title: 'If I Were You', topics: ['Play', 'Drama', 'Humour', 'Suspense'] },
      ]
    },
  ]
}

// ─────────────────────────────────────────────────────────
// CLASS 10 (Board exam year)
// ─────────────────────────────────────────────────────────
export const CLASS_10: ClassSyllabus = {
  classLevel: '10',
  subjects: [
    {
      name: 'Mathematics', slug: 'mathematics', icon: '➕', color: '#1a3a6b',
      chapters: [
        { id: 'c10m1', title: 'Real Numbers', topics: ['Introduction', 'The fundamental theorem of arithmetic', 'Revisiting irrational numbers', 'Decimal expansions', 'Summary'], formulas: ['a = bq + r', 'HCF × LCM = Product of two numbers'] },
        { id: 'c10m2', title: 'Polynomials', topics: ['Introduction', 'Geometrical meaning of the zeroes of a polynomial', 'Relationship between zeroes and coefficients of a polynomial', 'Summary'], formulas: ['Sum of zeroes = -b/a', 'Product of zeroes = c/a'] },
        { id: 'c10m3', title: 'Pair of Linear Equations in Two Variables', topics: ['Introduction', 'Graphical method of solution', 'Algebraic methods of solving a pair of linear equations', 'Substitution method', 'Elimination method', 'Summary'], formulas: ['a₁/a₂ = b₁/b₂ = c₁/c₂', 'a₁/a₂ ≠ b₁/b₂'] },
        { id: 'c10m4', title: 'Quadratic Equations', topics: ['Introduction', 'Quadratic equations', 'Solution by factorisation', 'Quadratic formula', 'Nature of roots', 'Summary'], formulas: ['ax² + bx + c = 0', 'x = [-b ± √(b²-4ac)] / 2a', 'D = b² - 4ac'] },
        { id: 'c10m5', title: 'Arithmetic Progressions', topics: ['Introduction', 'Arithmetic progressions', 'nth term of an AP', 'Sum of first n terms of an AP', 'Summary'], formulas: ['aₙ = a + (n-1)d', 'Sₙ = n/2[2a + (n-1)d]', 'Sₙ = n/2(a + l)'] },
        { id: 'c10m6', title: 'Triangles', topics: ['Introduction', 'Similar figures', 'Similarity of triangles', 'Criteria for similarity of triangles', 'Summary'], formulas: ['Ar(ΔABC)/Ar(ΔPQR) = (AB/PQ)²', 'a² + b² = c²'] },
        { id: 'c10m7', title: 'Coordinate Geometry', topics: ['Introduction', 'Distance formula', 'Section formula', 'Summary'], formulas: ['d = √[(x₂-x₁)² + (y₂-y₁)²]', 'Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)'] },
        { id: 'c10m8', title: 'Introduction to Trigonometry', topics: ['Introduction', 'Trigonometric ratios', 'Trigonometric ratios of some specific angles', 'Trigonometric identities', 'Summary'], formulas: ['sin²θ + cos²θ = 1', 'tan²θ + 1 = sec²θ', '1 + cot²θ = cosec²θ'] },
        { id: 'c10m9', title: 'Some Applications of Trigonometry', topics: ['Heights and distances', 'Summary'] },
        { id: 'c10m10', title: 'Circles', topics: ['Introduction', 'Tangent to a circle', 'Number of tangents from a point on a circle', 'Summary'], formulas: ['Equal tangents from an external point are equal'] },
        { id: 'c10m11', title: 'Areas Related to Circles', topics: ['Areas of sector and segment of a circle', 'Summary'], formulas: ['Area = πr²', 'C = 2πr', 'Area of sector = θ/360 × πr²'] },
        { id: 'c10m12', title: 'Surface Areas and Volumes', topics: ['Introduction', 'Surface area of a combination of solids', 'Volume of a combination of solids', 'Summary'], formulas: ['TSA of cylinder = 2πr(h+r)', 'Volume of sphere = 4/3 πr³'] },
        { id: 'c10m13', title: 'Statistics', topics: ['Introduction', 'Mean of grouped data', 'Mode of grouped data', 'Median of grouped data', 'Summary'], formulas: ['Mean = Σfx/Σf', 'Mode = l + [(f₁-f₀)/(2f₁-f₀-f₂)] × h', 'Median = l + [(N/2-cf)/f] × h'] },
        { id: 'c10m14', title: 'Probability', topics: ['Probability — a theoretical approach', 'Summary'], formulas: ['P(E) = n(E)/n(S)', 'P(E) + P(not E) = 1'] },
      ]
    },
    {
      name: 'Science', slug: 'science', icon: '⚗️', color: '#0369a1',
      chapters: [
        { id: 'c10s1', title: 'Chemical Reactions and Equations', topics: ['Chemical equation', 'Balancing equations', 'Types of reactions (combination, decomposition, displacement, double displacement, redox)'], keyTerms: ['Reactants', 'Products', 'Oxidation', 'Reduction', 'Corrosion', 'Rancidity'] },
        { id: 'c10s2', title: 'Acids, Bases and Salts', topics: ['Properties of acids and bases', 'pH scale', 'Neutralisation', 'Salts', 'Common everyday products'], formulas: ['pH < 7 = acid', 'pH > 7 = base', 'pH = 7 = neutral'] },
        { id: 'c10s3', title: 'Metals and Non-metals', topics: ['Physical and chemical properties', 'Reactivity series', 'Ionic bonding', 'Extraction of metals', 'Corrosion'] },
        { id: 'c10s4', title: 'Carbon and Its Compounds', topics: ['Covalent bonding', 'Properties of carbon', 'Hydrocarbons', 'Functional groups', 'Ethanol and Ethanoic acid', 'Soap and detergent'], keyTerms: ['Saturated', 'Unsaturated', 'Homologous series', 'Isomers'] },
        { id: 'c10s5', title: 'Periodic Classification of Elements', topics: ['Newlands\' law of octaves', 'Mendeleev\'s periodic table', 'Modern periodic law', 'Trends in periodic table', 'Valency', 'Atomic size', 'Metallic character'] },
        { id: 'c10s6', title: 'Life Processes', topics: ['Nutrition', 'Respiration', 'Transportation', 'Excretion', 'Photosynthesis', 'Digestion', 'Circulatory system'] },
        { id: 'c10s7', title: 'Control and Coordination', topics: ['Nervous system', 'Reflex action', 'Human brain', 'Endocrine glands', 'Hormones', 'Plant movements'] },
        { id: 'c10s8', title: 'How Do Organisms Reproduce?', topics: ['Asexual reproduction', 'Sexual reproduction', 'Reproduction in plants', 'Human reproductive system', 'Contraception'] },
        { id: 'c10s9', title: 'Heredity and Evolution', topics: ['Mendel\'s laws', 'Inheritance', 'Sex determination', 'Evolution', 'Natural selection', 'Speciation', 'Human evolution'] },
        { id: 'c10s10', title: 'Light — Reflection and Refraction', topics: ['Laws of reflection', 'Spherical mirrors', 'Mirror formula', 'Refraction', 'Snell\'s law', 'Lenses', 'Lens formula', 'Power of lens'], formulas: ['1/v + 1/u = 1/f', 'm = -v/u', 'n = sin i/sin r', 'P = 1/f (in metres)'] },
        { id: 'c10s11', title: 'Human Eye and Colourful World', topics: ['Human eye structure', 'Defects of vision', 'Dispersion of light', 'Rainbow', 'Scattering of light', 'Tyndall effect'] },
        { id: 'c10s12', title: 'Electricity', topics: ['Electric current', 'Ohm\'s law', 'Resistance', 'Series and parallel circuits', 'Heating effect', 'Electric power'], formulas: ['V = IR (Ohm\'s law)', 'P = VI = I²R = V²/R', 'H = I²Rt'] },
        { id: 'c10s13', title: 'Magnetic Effects of Electric Current', topics: ['Oersted\'s experiment', 'Magnetic field', 'Fleming\'s rules', 'Electric motor', 'Electromagnetic induction', 'Electric generator', 'Domestic circuits'] },
        { id: 'c10s14', title: 'Our Environment', topics: ['Ecosystem', 'Food chain and web', 'Trophic levels', 'Biological magnification', 'Ozone layer', 'Waste management'] },
        { id: 'c10s15', title: 'Management of Natural Resources', topics: ['Forest management', 'Dams', 'Water harvesting', 'Coal and petroleum', 'Sustainable development', '3 Rs'] },
      ]
    },
  ]
}

// ─────────────────────────────────────────────────────────
// CLASS 11 - SCIENCE STREAM
// ─────────────────────────────────────────────────────────
export const CLASS_11: ClassSyllabus = {
  classLevel: '11',
  subjects: [
    {
      name: 'Physics', slug: 'physics', icon: '🔬', color: '#0369a1',
      chapters: [
        { id: 'c11p1', title: 'Physical World', topics: ['Physics and its scope', 'Scientific method', 'Fundamental forces', 'Dimensional analysis'] },
        { id: 'c11p2', title: 'Units and Measurements', topics: ['SI units', 'Significant figures', 'Errors in measurement', 'Dimensional analysis', 'Applications'] },
        { id: 'c11p3', title: 'Motion in a Straight Line', topics: ['Position, displacement', 'Velocity', 'Acceleration', 'Kinematic equations', 'Graphs of motion'], formulas: ['v = u + at', 's = ut + ½at²', 'v² = u² + 2as'] },
        { id: 'c11p4', title: 'Motion in a Plane', topics: ['Scalar and vector quantities', 'Vector addition', 'Projectile motion', 'Circular motion', 'Relative velocity'], formulas: ['Range = u²sin2θ/g', 'Maximum height = u²sin²θ/2g', 'Time of flight = 2usinθ/g'] },
        { id: 'c11p5', title: 'Laws of Motion', topics: ['Newton\'s laws', 'Momentum', 'Impulse', 'Friction', 'Circular motion dynamics'], formulas: ['F = ma', 'p = mv', 'Impulse = Δp'] },
        { id: 'c11p6', title: 'Work, Energy and Power', topics: ['Work done', 'Energy', 'Work-energy theorem', 'Conservative forces', 'Power', 'Collisions'], formulas: ['W = F·d·cosθ', 'KE = ½mv²', 'P = W/t'] },
        { id: 'c11p7', title: 'System of Particles and Rotational Motion', topics: ['Centre of mass', 'Torque', 'Angular momentum', 'Moment of inertia', 'Rolling motion'], formulas: ['τ = r×F', 'L = Iω', 'τ = Iα'] },
        { id: 'c11p8', title: 'Gravitation', topics: ['Kepler\'s laws', 'Universal gravitation', 'Gravitational field', 'Orbital velocity', 'Escape velocity', 'Satellites'], formulas: ['F = Gm₁m₂/r²', 'v_orbital = √(GM/r)', 'v_escape = √(2GM/R)'] },
        { id: 'c11p9', title: 'Mechanical Properties of Solids', topics: ['Stress and strain', 'Elastic moduli', 'Hooke\'s law', 'Young\'s modulus', 'Shear and bulk modulus'] },
        { id: 'c11p10', title: 'Mechanical Properties of Fluids', topics: ['Pressure', 'Bernoulli\'s theorem', 'Viscosity', 'Surface tension', 'Stoke\'s law'] },
        { id: 'c11p11', title: 'Thermal Properties of Matter', topics: ['Temperature', 'Thermal expansion', 'Specific heat', 'Change of state', 'Heat transfer'] },
        { id: 'c11p12', title: 'Thermodynamics', topics: ['Thermal equilibrium', 'Laws of thermodynamics', 'Heat engines', 'Carnot cycle', 'Entropy'] },
        { id: 'c11p13', title: 'Kinetic Theory', topics: ['Kinetic theory of gases', 'Gas laws', 'RMS speed', 'Degrees of freedom', 'Mean free path'] },
        { id: 'c11p14', title: 'Oscillations', topics: ['Periodic motion', 'SHM', 'Energy in SHM', 'Damped oscillations', 'Resonance'], formulas: ['T = 2π√(l/g)', 'T = 2π√(m/k)'] },
        { id: 'c11p15', title: 'Waves', topics: ['Wave motion', 'Types of waves', 'Superposition', 'Standing waves', 'Doppler effect'], formulas: ['v = fλ', 'v = √(T/μ)'] },
      ]
    },
    {
      name: 'Chemistry', slug: 'chemistry', icon: '🧪', color: '#7c3aed',
      chapters: [
        { id: 'c11c1', title: 'Some Basic Concepts of Chemistry', topics: ['Matter', 'Atomic mass', 'Molecular mass', 'Mole concept', 'Stoichiometry'], formulas: ['n = m/M', 'Mole = 6.022×10²³ particles'] },
        { id: 'c11c2', title: 'Structure of Atom', topics: ['Subatomic particles', 'Bohr\'s model', 'Quantum numbers', 'Orbitals', 'Electronic configuration', 'Aufbau principle'] },
        { id: 'c11c3', title: 'Classification of Elements and Periodicity in Properties', topics: ['Periodic table', 'Periodic law', 'Atomic radius', 'Ionisation energy', 'Electron affinity', 'Electronegativity'] },
        { id: 'c11c4', title: 'Chemical Bonding and Molecular Structure', topics: ['Ionic bond', 'Covalent bond', 'Lewis structures', 'VSEPR theory', 'Hybridisation', 'Hydrogen bond'] },
        { id: 'c11c5', title: 'States of Matter', topics: ['Gas laws', 'Ideal gas equation', 'Kinetic molecular theory', 'Liquids', 'Solids'] },
        { id: 'c11c6', title: 'Thermodynamics', topics: ['System and surroundings', 'Internal energy', 'Enthalpy', 'Hess\'s law', 'Entropy', 'Gibbs energy'] },
        { id: 'c11c7', title: 'Equilibrium', topics: ['Physical and chemical equilibrium', 'Law of mass action', 'Kc and Kp', 'Le Chatelier\'s principle', 'Ionic equilibrium', 'pH', 'Buffer'] },
        { id: 'c11c8', title: 'Redox Reactions', topics: ['Oxidation and reduction', 'Oxidation number', 'Balancing redox equations', 'Electrode processes'] },
        { id: 'c11c9', title: 'Hydrogen', topics: ['Position in periodic table', 'Dihydrogen', 'Hydrides', 'Water', 'Heavy water', 'Hydrogen peroxide', 'Hydrogen economy'] },
        { id: 'c11c10', title: 'The s-Block Elements', topics: ['Group 1 and 2 elements', 'Properties', 'Compounds', 'Uses', 'Anomalous properties of Li and Be'] },
        { id: 'c11c11', title: 'The p-Block Elements', topics: ['Group 13 and 14', 'Boron', 'Carbon family', 'Allotropes of carbon', 'Compounds'] },
        { id: 'c11c12', title: 'Organic Chemistry - Basic Principles', topics: ['Classification of organic compounds', 'Nomenclature (IUPAC)', 'Structural isomerism', 'Fundamental concepts in reactions'] },
        { id: 'c11c13', title: 'Hydrocarbons', topics: ['Alkanes', 'Alkenes', 'Alkynes', 'Aromatic hydrocarbons', 'Benzene', 'Reactions'] },
        { id: 'c11c14', title: 'Environmental Chemistry', topics: ['Environmental pollution', 'Atmospheric pollution', 'Water pollution', 'Soil pollution', 'Green chemistry'] },
      ]
    },
    {
      name: 'Mathematics', slug: 'mathematics', icon: '➕', color: '#1a3a6b',
      chapters: [
        { id: 'c11math1', title: 'Sets', topics: ['Set representation', 'Types of sets', 'Operations on sets', 'Venn diagrams', 'De Morgan\'s law'] },
        { id: 'c11math2', title: 'Relations and Functions', topics: ['Relations', 'Types of functions', 'Domain and range', 'Composition', 'One-one and onto'] },
        { id: 'c11math3', title: 'Trigonometric Functions', topics: ['Radian measure', 'Trigonometric functions', 'Graphs', 'Identities', 'Signs in quadrants'], formulas: ['sin²x + cos²x = 1', 'sin 2x = 2sin x cos x', 'cos 2x = cos²x - sin²x'] },
        { id: 'c11math4', title: 'Principle of Mathematical Induction', topics: ['PMI statement', 'Base case', 'Inductive step', 'Applications'] },
        { id: 'c11math5', title: 'Complex Numbers and Quadratic Equations', topics: ['Complex numbers', 'Algebra of complex numbers', 'Argand plane', 'Modulus and argument', 'Quadratic equations'], formulas: ['i² = -1', '|z| = √(a²+b²)', 'Quadratic formula'] },
        { id: 'c11math6', title: 'Linear Inequalities', topics: ['Inequalities in one variable', 'Graphical representation', 'System of inequalities'] },
        { id: 'c11math7', title: 'Permutations and Combinations', topics: ['Fundamental principle of counting', 'Permutations', 'Combinations'], formulas: ['ⁿPr = n!/(n-r)!', 'ⁿCr = n!/r!(n-r)!'] },
        { id: 'c11math8', title: 'Binomial Theorem', topics: ['Binomial theorem for positive integral index', 'General term', 'Middle term'], formulas: ['(a+b)ⁿ = Σ ⁿCr aⁿ⁻ʳ bʳ'] },
        { id: 'c11math9', title: 'Sequences and Series', topics: ['AP', 'GP', 'Sum of AP and GP', 'Arithmetic-Geometric Progression', 'Special series'], formulas: ['Sum of AP = n/2(2a+(n-1)d)', 'Sum of GP = a(rⁿ-1)/(r-1)'] },
        { id: 'c11math10', title: 'Straight Lines', topics: ['Slope', 'Equation of line (various forms)', 'Angle between lines', 'Distance from point to line'] },
        { id: 'c11math11', title: 'Conic Sections', topics: ['Circle', 'Parabola', 'Ellipse', 'Hyperbola', 'Standard equations'], formulas: ['Circle: x²+y²=r²', 'Parabola: y²=4ax', 'Ellipse: x²/a²+y²/b²=1'] },
        { id: 'c11math12', title: 'Introduction to Three Dimensional Geometry', topics: ['Coordinates in 3D', 'Distance formula', 'Section formula'] },
        { id: 'c11math13', title: 'Limits and Derivatives', topics: ['Limit of a function', 'Algebra of limits', 'Derivative', 'Derivatives of basic functions'], formulas: ['d/dx(xⁿ) = nxⁿ⁻¹', 'd/dx(sin x) = cos x', 'd/dx(eˣ) = eˣ'] },
        { id: 'c11math14', title: 'Mathematical Reasoning', topics: ['Statements', 'Connectives', 'Implications', 'Converse and contrapositive', 'Proof by contradiction'] },
        { id: 'c11math15', title: 'Statistics', topics: ['Measures of dispersion', 'Range', 'Variance', 'Standard deviation', 'Analysis of frequency distributions'] },
        { id: 'c11math16', title: 'Probability', topics: ['Random experiments', 'Events', 'Probability', 'Axiomatic approach', 'Conditional probability'] },
      ]
    },
    {
      name: 'Biology', slug: 'biology', icon: '🧬', color: '#0a5e3f',
      chapters: [
        { id: 'c11b1', title: 'The Living World', topics: ['What is living?', 'Biodiversity', 'Nomenclature', 'Classification', 'Taxonomic hierarchy'] },
        { id: 'c11b2', title: 'Biological Classification', topics: ['Whittaker\'s 5-kingdom', 'Monera', 'Protista', 'Fungi', 'Plantae', 'Animalia', 'Viruses'] },
        { id: 'c11b3', title: 'Plant Kingdom', topics: ['Algae', 'Bryophyta', 'Pteridophyta', 'Gymnosperms', 'Angiosperms', 'Plant life cycles'] },
        { id: 'c11b4', title: 'Animal Kingdom', topics: ['Basis of classification', 'Non-chordates', 'Chordates', 'Phyla characteristics'] },
        { id: 'c11b5', title: 'Morphology of Flowering Plants', topics: ['Root', 'Stem', 'Leaf', 'Inflorescence', 'Flower', 'Fruit', 'Seed', 'Semi-technical descriptions'] },
        { id: 'c11b6', title: 'Anatomy of Flowering Plants', topics: ['Tissues', 'Tissue systems', 'Anatomy of monocot and dicot'] },
        { id: 'c11b7', title: 'Structural Organisation in Animals', topics: ['Tissues', 'Organs', 'Organ systems', 'Morphology of earthworm, cockroach, frog'] },
        { id: 'c11b8', title: 'Cell: The Unit of Life', topics: ['Cell theory', 'Prokaryotic and eukaryotic', 'Cell organelles in detail'] },
        { id: 'c11b9', title: 'Biomolecules', topics: ['Carbohydrates', 'Proteins', 'Lipids', 'Nucleic acids', 'Enzymes'] },
        { id: 'c11b10', title: 'Cell Cycle and Cell Division', topics: ['Cell cycle', 'Mitosis', 'Meiosis', 'Significance'] },
        { id: 'c11b11', title: 'Transport in Plants', topics: ['Plant-water relations', 'Osmosis', 'Transpiration', 'Translocation of photosynthates'] },
        { id: 'c11b12', title: 'Mineral Nutrition', topics: ['Essential minerals', 'Deficiency symptoms', 'Nitrogen fixation', 'Hydroponics'] },
        { id: 'c11b13', title: 'Photosynthesis in Higher Plants', topics: ['Light reactions', 'Calvin cycle', 'Photorespiration', 'C3 and C4 plants', 'CAM plants'] },
        { id: 'c11b14', title: 'Respiration in Plants', topics: ['Glycolysis', 'Kreb\'s cycle', 'Electron transport chain', 'Fermentation', 'ATP yield'] },
        { id: 'c11b15', title: 'Plant Growth and Development', topics: ['Plant growth phases', 'Plant growth regulators', 'Photoperiodism', 'Vernalisation'] },
        { id: 'c11b16', title: 'Digestion and Absorption', topics: ['Digestive system', 'Enzymes', 'Digestion', 'Absorption', 'Disorders'] },
        { id: 'c11b17', title: 'Breathing and Exchange of Gases', topics: ['Respiratory organs', 'Mechanism of breathing', 'Gas exchange', 'Transport of gases'] },
        { id: 'c11b18', title: 'Body Fluids and Circulation', topics: ['Blood', 'Lymph', 'Circulatory system', 'Heart', 'ECG', 'Disorders'] },
        { id: 'c11b19', title: 'Excretory Products and Elimination', topics: ['Modes of excretion', 'Kidney', 'Urine formation', 'Dialysis', 'Disorders'] },
        { id: 'c11b20', title: 'Locomotion and Movement', topics: ['Types of movement', 'Skeleton', 'Joints', 'Muscle contraction', 'Disorders'] },
        { id: 'c11b21', title: 'Neural Control and Coordination', topics: ['Neuron', 'Neural impulse', 'Synapse', 'CNS', 'PNS', 'Reflex action', 'Sense organs'] },
        { id: 'c11b22', title: 'Chemical Coordination and Integration', topics: ['Endocrine glands', 'Hormones', 'Mechanism of action', 'Feedback'] },
      ]
    },
  ]
}

// ─────────────────────────────────────────────────────────
// CLASS 12 (Final Board Year)
// ─────────────────────────────────────────────────────────
export const CLASS_12: ClassSyllabus = {
  classLevel: '12',
  subjects: [
    {
      name: 'Physics', slug: 'physics', icon: '🔬', color: '#0369a1',
      chapters: [
        { id: 'c12p1', title: 'Electric Charges and Fields', topics: ['Coulomb\'s law', 'Electric field', 'Electric dipole', 'Gauss\'s law', 'Field due to various charge distributions'], formulas: ['F = kq₁q₂/r²', 'E = F/q', 'Gauss: ΦE = q/ε₀'] },
        { id: 'c12p2', title: 'Electrostatic Potential and Capacitance', topics: ['Electric potential', 'Potential due to dipole', 'Equipotential surfaces', 'Capacitors', 'Dielectrics', 'Energy stored'], formulas: ['V = kq/r', 'C = Q/V', 'U = ½CV²', 'Series: 1/C = 1/C₁+1/C₂'] },
        { id: 'c12p3', title: 'Current Electricity', topics: ['Electric current', 'Ohm\'s law', 'Drift velocity', 'Resistivity', 'Cells and EMF', 'Kirchhoff\'s laws', 'Wheatstone bridge'], formulas: ['I = nAvde', 'R = ρl/A', 'Kirchhoff: ΣI=0, ΣV=0'] },
        { id: 'c12p4', title: 'Moving Charges and Magnetism', topics: ['Magnetic force on charge', 'Magnetic field due to current', 'Biot-Savart law', 'Ampere\'s law', 'Galvanometer'], formulas: ['F = qv×B', 'B = μ₀I/2πr (wire)', 'B = μ₀nI (solenoid)'] },
        { id: 'c12p5', title: 'Magnetism and Matter', topics: ['Bar magnet', 'Magnetic field lines', 'Earth\'s magnetism', 'Magnetic materials', 'Hysteresis'] },
        { id: 'c12p6', title: 'Electromagnetic Induction', topics: ['Faraday\'s laws', 'Lenz\'s law', 'Motional EMF', 'Inductance', 'Self and mutual inductance'], formulas: ['EMF = -dΦ/dt', 'EMF = Blv', 'L = NΦ/I'] },
        { id: 'c12p7', title: 'Alternating Current', topics: ['AC generator', 'RMS values', 'Phasor', 'Reactance', 'Impedance', 'Resonance', 'Power in AC'], formulas: ['Vrms = V₀/√2', 'Z = √(R²+X²)', 'P = VrmsIrms cosφ'] },
        { id: 'c12p8', title: 'Electromagnetic Waves', topics: ['Displacement current', 'Maxwell\'s equations', 'EM wave spectrum', 'Properties of EM waves'] },
        { id: 'c12p9', title: 'Ray Optics', topics: ['Reflection', 'Refraction', 'Lenses', 'Prism', 'Optical instruments'], formulas: ['Mirror: 1/v+1/u=1/f', 'Lens: 1/v-1/u=1/f', 'n = sin i/sin r'] },
        { id: 'c12p10', title: 'Wave Optics', topics: ['Huygens\' principle', 'Interference', 'Young\'s double slit', 'Diffraction', 'Polarisation'], formulas: ['Path diff = nλ (bright)', 'β = λD/d (fringe width)'] },
        { id: 'c12p11', title: 'Dual Nature of Radiation and Matter', topics: ['Photoelectric effect', 'Einstein\'s equation', 'de Broglie wavelength', 'Davisson-Germer experiment'], formulas: ['E = hν', 'KEmax = hν - W₀', 'λ = h/mv'] },
        { id: 'c12p12', title: 'Atoms', topics: ['Rutherford\'s model', 'Bohr\'s model', 'Energy levels', 'Hydrogen spectrum', 'Atomic spectra'], formulas: ['rn = 0.529n² Å', 'En = -13.6/n² eV'] },
        { id: 'c12p13', title: 'Nuclei', topics: ['Nucleus', 'Nuclear force', 'Mass defect', 'Binding energy', 'Nuclear fission and fusion', 'Radioactivity'], formulas: ['E = mc²', 'ΔE = Δm × c²'] },
        { id: 'c12p14', title: 'Semiconductor Electronics', topics: ['Semiconductors', 'p-n junction', 'Diode', 'Transistor', 'Logic gates', 'Digital circuits'] },
        { id: 'c12p15', title: 'Communication Systems', topics: ['Elements of communication', 'Modulation', 'AM and FM', 'Bandwidth', 'Propagation of EM waves'] },
      ]
    },
    {
      name: 'Chemistry', slug: 'chemistry', icon: '🧪', color: '#7c3aed',
      chapters: [
        { id: 'c12c1', title: 'The Solid State', topics: ['Types of solids', 'Unit cell', 'Packing efficiency', 'Defects', 'Electrical properties', 'Magnetic properties'] },
        { id: 'c12c2', title: 'Solutions', topics: ['Types of solutions', 'Expressing concentration', 'Vapour pressure', 'Colligative properties', 'Osmosis', 'Abnormal molar masses'] },
        { id: 'c12c3', title: 'Electrochemistry', topics: ['Galvanic cells', 'EMF', 'Nernst equation', 'Equilibrium constant', 'Electrolysis', 'Kohlrausch\'s law', 'Batteries', 'Fuel cells', 'Corrosion'], formulas: ['ΔG° = -nFE°', 'E = E° - (RT/nF)lnQ'] },
        { id: 'c12c4', title: 'Chemical Kinetics', topics: ['Rate of reaction', 'Rate law', 'Order of reaction', 'Integrated rate equations', 'Arrhenius equation', 'Activation energy'], formulas: ['Rate = k[A]ᵐ[B]ⁿ', 'k = Ae^(-Ea/RT)'] },
        { id: 'c12c5', title: 'Surface Chemistry', topics: ['Adsorption', 'Catalysis', 'Colloids', 'Emulsions'] },
        { id: 'c12c6', title: 'General Principles of Isolation of Elements', topics: ['Metallurgy', 'Concentration', 'Extraction', 'Refining', 'Important processes'] },
        { id: 'c12c7', title: 'The p-Block Elements', topics: ['Group 15 (N, P)', 'Group 16 (O, S)', 'Group 17 (halogens)', 'Group 18 (noble gases)', 'Oxoacids'] },
        { id: 'c12c8', title: 'The d and f Block Elements', topics: ['Transition metals', 'General properties', 'Magnetic properties', 'Catalytic behaviour', 'Lanthanides', 'Actinides'] },
        { id: 'c12c9', title: 'Coordination Compounds', topics: ['Werner\'s theory', 'Nomenclature', 'Isomerism', 'Bonding', 'Crystal field theory', 'Applications'] },
        { id: 'c12c10', title: 'Haloalkanes and Haloarenes', topics: ['Nomenclature', 'Preparation', 'Properties', 'Reactions', 'Nucleophilic substitution', 'Elimination'] },
        { id: 'c12c11', title: 'Alcohols, Phenols and Ethers', topics: ['Classification', 'Nomenclature', 'Preparation', 'Physical properties', 'Chemical properties', 'Uses'] },
        { id: 'c12c12', title: 'Aldehydes, Ketones and Carboxylic Acids', topics: ['Nomenclature', 'Preparation', 'Properties', 'Nucleophilic addition', 'Oxidation', 'Reduction', 'Uses'] },
        { id: 'c12c13', title: 'Amines', topics: ['Classification', 'Nomenclature', 'Preparation', 'Properties', 'Diazonium salts', 'Uses'] },
        { id: 'c12c14', title: 'Biomolecules', topics: ['Carbohydrates', 'Proteins', 'Enzymes', 'Vitamins', 'Nucleic acids'] },
        { id: 'c12c15', title: 'Polymers', topics: ['Classification', 'Polymerisation', 'Natural and synthetic polymers', 'Rubber', 'Fibres', 'Plastics'] },
        { id: 'c12c16', title: 'Chemistry in Everyday Life', topics: ['Drugs', 'Medicines', 'Food additives', 'Cleansing agents', 'Soaps and detergents'] },
      ]
    },
    {
      name: 'Mathematics', slug: 'mathematics', icon: '➕', color: '#1a3a6b',
      chapters: [
        { id: 'c12m1', title: 'Relations and Functions', topics: ['Types of relations', 'Types of functions', 'Composition', 'Invertible functions', 'Binary operations'] },
        { id: 'c12m2', title: 'Inverse Trigonometric Functions', topics: ['Definition', 'Domain and range', 'Graphs', 'Properties'], formulas: ['sin⁻¹(-x) = -sin⁻¹x', 'sin⁻¹x + cos⁻¹x = π/2'] },
        { id: 'c12m3', title: 'Matrices', topics: ['Types of matrices', 'Operations', 'Transpose', 'Symmetric', 'Invertible matrices'], formulas: ['(AB)T = BTAT', '(A+B)T = AT+BT'] },
        { id: 'c12m4', title: 'Determinants', topics: ['Determinant', 'Properties', 'Cofactors', 'Adjoint', 'Inverse', 'Cramer\'s rule', 'Area of triangle'], formulas: ['|A| = a(ei-fh) - b(di-fg) + c(dh-eg)', 'A⁻¹ = adj(A)/|A|'] },
        { id: 'c12m5', title: 'Continuity and Differentiability', topics: ['Continuity', 'Differentiability', 'Chain rule', 'Implicit differentiation', 'Logarithmic differentiation', 'Higher order derivatives'] },
        { id: 'c12m6', title: 'Application of Derivatives', topics: ['Rate of change', 'Increasing and decreasing functions', 'Tangents and normals', 'Maxima and minima', 'Approximations'], formulas: ['dy/dx at (x₀,y₀) is slope of tangent'] },
        { id: 'c12m7', title: 'Integrals', topics: ['Indefinite integration', 'Methods of integration', 'Definite integrals', 'Fundamental theorem', 'Integration by parts'], formulas: ['∫xⁿdx = xⁿ⁺¹/(n+1)', '∫sin x dx = -cos x', '∫eˣdx = eˣ'] },
        { id: 'c12m8', title: 'Application of Integrals', topics: ['Area under curves', 'Area between curves', 'Volume of revolution'] },
        { id: 'c12m9', title: 'Differential Equations', topics: ['Order and degree', 'General and particular solution', 'Variable separable', 'Homogeneous', 'Linear DE'], formulas: ['dy/dx = f(x)g(y)', 'dy/dx + Py = Q'] },
        { id: 'c12m10', title: 'Vector Algebra', topics: ['Vectors', 'Magnitude and direction', 'Dot product', 'Cross product', 'Triple product'], formulas: ['a·b = |a||b|cosθ', '|a×b| = |a||b|sinθ'] },
        { id: 'c12m11', title: 'Three Dimensional Geometry', topics: ['Direction cosines and ratios', 'Equation of line in 3D', 'Angle between lines', 'Plane equation', 'Angle between planes'], formulas: ['l²+m²+n² = 1', 'Distance of point from plane'] },
        { id: 'c12m12', title: 'Linear Programming', topics: ['Linear programming problem', 'Graphical method', 'Feasible region', 'Optimal solution', 'Applications'] },
        { id: 'c12m13', title: 'Probability', topics: ['Conditional probability', 'Multiplication theorem', 'Independent events', 'Bayes\' theorem', 'Random variable', 'Binomial distribution'], formulas: ['P(A|B) = P(A∩B)/P(B)', 'Bayes: P(Aᵢ|B) = P(Aᵢ)P(B|Aᵢ)/ΣP(Aⱼ)P(B|Aⱼ)'] },
      ]
    },
    {
      name: 'Biology', slug: 'biology', icon: '🧬', color: '#0a5e3f',
      chapters: [
        { id: 'c12b1', title: 'Reproduction in Organisms', topics: ['Asexual reproduction', 'Sexual reproduction', 'Types of asexual reproduction', 'Significance'] },
        { id: 'c12b2', title: 'Sexual Reproduction in Flowering Plants', topics: ['Flower parts', 'Microsporogenesis', 'Megasporogenesis', 'Pollination', 'Fertilisation', 'Fruit and seed development'] },
        { id: 'c12b3', title: 'Human Reproduction', topics: ['Male reproductive system', 'Female reproductive system', 'Gametogenesis', 'Menstrual cycle', 'Fertilisation', 'Pregnancy'] },
        { id: 'c12b4', title: 'Reproductive Health', topics: ['RCH', 'Contraception', 'STIs', 'Infertility', 'ART'] },
        { id: 'c12b5', title: 'Principles of Inheritance and Variation', topics: ['Mendel\'s laws', 'Inheritance of one and two genes', 'Sex determination', 'Mutation', 'Chromosomal disorders'] },
        { id: 'c12b6', title: 'Molecular Basis of Inheritance', topics: ['DNA', 'RNA', 'Replication', 'Transcription', 'Translation', 'Regulation of gene expression', 'Human Genome Project'] },
        { id: 'c12b7', title: 'Evolution', topics: ['Origin of life', 'Theories of evolution', 'Natural selection', 'Hardy-Weinberg principle', 'Brief account of evolution'] },
        { id: 'c12b8', title: 'Human Health and Disease', topics: ['Common diseases', 'Immunity', 'AIDS', 'Cancer', 'Drugs and alcohol abuse'] },
        { id: 'c12b9', title: 'Strategies for Enhancement in Food Production', topics: ['Animal husbandry', 'Plant breeding', 'Single cell protein', 'Tissue culture'] },
        { id: 'c12b10', title: 'Microbes in Human Welfare', topics: ['Useful microbes', 'Biogas', 'Biocontrol agents', 'Biofertilisers'] },
        { id: 'c12b11', title: 'Biotechnology: Principles and Processes', topics: ['Recombinant DNA technology', 'Tools of genetic engineering', 'PCR', 'Gel electrophoresis'] },
        { id: 'c12b12', title: 'Biotechnology and its Applications', topics: ['Genetically modified organisms', 'Insulin production', 'Gene therapy', 'Ethical issues'] },
        { id: 'c12b13', title: 'Organisms and Populations', topics: ['Ecology', 'Population attributes', 'Population growth', 'Life history variations'] },
        { id: 'c12b14', title: 'Ecosystem', topics: ['Structure', 'Productivity', 'Decomposition', 'Energy flow', 'Ecological pyramids', 'Nutrient cycles'] },
        { id: 'c12b15', title: 'Biodiversity and Conservation', topics: ['Biodiversity', 'Patterns', 'Loss of biodiversity', 'Conservation strategies'] },
        { id: 'c12b16', title: 'Environmental Issues', topics: ['Air pollution', 'Water pollution', 'Solid wastes', 'Greenhouse effect', 'Ozone depletion', 'Radioactive waste'] },
      ]
    },
  ]
}

// ─── MASTER EXPORT ────────────────────────────────────────
export { CLASS_7, CLASS_8 } from './ncert-syllabus-7-8'
export { CLASS_11_COMMERCE, CLASS_12_COMMERCE, CLASS_11_HUMANITIES } from './ncert-syllabus-commerce'
import { CLASS_7, CLASS_8 } from './ncert-syllabus-7-8'
import { CLASS_11_COMMERCE, CLASS_12_COMMERCE, CLASS_11_HUMANITIES } from './ncert-syllabus-commerce'

export const ALL_CLASSES: ClassSyllabus[] = [
  CLASS_1, CLASS_2, CLASS_3, CLASS_4, CLASS_5,
  CLASS_6, CLASS_7, CLASS_8,
  CLASS_9, CLASS_10, CLASS_11, CLASS_12,
]

// Stream-specific data
export const COMMERCE_11 = CLASS_11_COMMERCE
export const COMMERCE_12 = CLASS_12_COMMERCE
export const HUMANITIES_11 = CLASS_11_HUMANITIES

export function getClassSyllabus(classLevel: string): ClassSyllabus | null {
  return ALL_CLASSES.find(c => c.classLevel === classLevel) ?? null
}

export function getSubjectSyllabus(classLevel: string, subjectSlug: string): Subject | null {
  const cls = getClassSyllabus(classLevel)
  return cls?.subjects.find(s => s.slug === subjectSlug) ?? null
}

export function getChapter(classLevel: string, subjectSlug: string, chapterId: string): Chapter | null {
  const subject = getSubjectSyllabus(classLevel, subjectSlug)
  return subject?.chapters.find(c => c.id === chapterId) ?? null
}
