// lib/ncert-syllabus-7-8.ts
// Class 7 and 8 complete NCERT syllabus

import type { ClassSyllabus } from './ncert-syllabus'

// ─────────────────────────────────────────────────────────
// CLASS 7
// ─────────────────────────────────────────────────────────
export const CLASS_7: ClassSyllabus = {
  classLevel: '7',
  subjects: [
    {
      name: 'Mathematics', slug: 'mathematics', icon: '➕', color: '#1a3a6b',
      chapters: [
        {
          id: 'c7m1', title: 'Integers',
          topics: ['Properties of integers','Addition and subtraction of integers','Multiplication of integers','Division of integers','Properties on a number line'],
          formulas: ['a × (-b) = -(a × b)', '(-a) × (-b) = a × b', 'a ÷ (-1) = -a'],
          keyTerms: ['Integer','Absolute value','Negative integer','Positive integer']
        },
        {
          id: 'c7m2', title: 'Fractions and Decimals',
          topics: ['Multiplication of fractions','Division of fractions','Multiplication of decimals','Division of decimals','Word problems'],
          formulas: ['a/b × c/d = ac/bd', 'a/b ÷ c/d = a/b × d/c'],
        },
        {
          id: 'c7m3', title: 'Data Handling',
          topics: ['Collecting data','Mean','Mode','Median','Range','Bar graph','Probability'],
          formulas: ['Mean = Sum of all values / Number of values', 'Range = Maximum - Minimum'],
          keyTerms: ['Mean','Median','Mode','Range','Bar graph','Probability']
        },
        {
          id: 'c7m4', title: 'Simple Equations',
          topics: ['What is an equation?','Solving equations','Transposition method','Applications of simple equations'],
          formulas: ['ax + b = c → x = (c-b)/a'],
          keyTerms: ['Variable','Equation','Solution','LHS','RHS','Transposition']
        },
        {
          id: 'c7m5', title: 'Lines and Angles',
          topics: ['Related angles (complementary, supplementary)','Pairs of lines','Transversal','Parallel lines and transversal'],
          formulas: ['Complementary angles: a + b = 90°','Supplementary angles: a + b = 180°','Vertically opposite angles are equal'],
        },
        {
          id: 'c7m6', title: 'The Triangle and Its Properties',
          topics: ['Medians of a triangle','Altitudes of a triangle','Exterior angle property','Angle sum property','Pythagoras theorem (intro)'],
          formulas: ['Angle sum = 180°','Exterior angle = Sum of opposite interior angles'],
          keyTerms: ['Median','Altitude','Hypotenuse','Right triangle','Equilateral triangle']
        },
        {
          id: 'c7m7', title: 'Congruence of Triangles',
          topics: ['Congruent figures','Criteria for congruence','SSS','SAS','ASA','RHS'],
          keyTerms: ['Congruent','Corresponding parts','CPCT','SSS','SAS','ASA','RHS']
        },
        {
          id: 'c7m8', title: 'Comparing Quantities',
          topics: ['Equivalent ratios','Percentage','Converting ratios to percentages','Profit and loss','Simple interest'],
          formulas: ['Profit% = (Profit/CP) × 100','Loss% = (Loss/CP) × 100','SI = (P × R × T)/100'],
          keyTerms: ['Ratio','Percentage','Profit','Loss','Cost price','Selling price','Simple interest']
        },
        {
          id: 'c7m9', title: 'Rational Numbers',
          topics: ['Need for rational numbers','Positive and negative rational numbers','Rational numbers on number line','Comparison','Operations'],
          formulas: ['a/b where b ≠ 0','a/b = ac/bc'],
          keyTerms: ['Rational number','Numerator','Denominator','Equivalent fractions']
        },
        {
          id: 'c7m10', title: 'Practical Geometry',
          topics: ['Construction of a line parallel to a given line','Construction of triangles (SSS, SAS, ASA, RHS)'],
        },
        {
          id: 'c7m11', title: 'Perimeter and Area',
          topics: ['Squares and rectangles','Triangles as parts of rectangles','Area of parallelogram','Area of triangle','Circles: circumference and area'],
          formulas: ['Area of triangle = ½ × base × height','Area of parallelogram = base × height','C = 2πr','Area of circle = πr²'],
        },
        {
          id: 'c7m12', title: 'Algebraic Expressions',
          topics: ['How expressions are formed','Terms of an expression','Like and unlike terms','Addition and subtraction','Finding the value'],
          keyTerms: ['Variable','Constant','Coefficient','Monomial','Binomial','Trinomial','Polynomial']
        },
        {
          id: 'c7m13', title: 'Exponents and Powers',
          topics: ['Exponents','Laws of exponents','Decimal number system','Expressing large numbers in standard form'],
          formulas: ['aᵐ × aⁿ = aᵐ⁺ⁿ','aᵐ ÷ aⁿ = aᵐ⁻ⁿ','(aᵐ)ⁿ = aᵐⁿ','a⁰ = 1'],
        },
        {
          id: 'c7m14', title: 'Symmetry',
          topics: ['Lines of symmetry','Rotational symmetry','Order of rotational symmetry','Line symmetry and rotational symmetry'],
          keyTerms: ['Line of symmetry','Rotational symmetry','Order','Centre of rotation']
        },
        {
          id: 'c7m15', title: 'Visualising Solid Shapes',
          topics: ['3D shapes','Faces, edges, vertices','Nets of 3D shapes','Viewing different sections of solids'],
          formulas: ['Euler\'s formula: F + V - E = 2'],
          keyTerms: ['Face','Edge','Vertex','Net','Prism','Pyramid','Cylinder','Cone']
        },
      ]
    },
    {
      name: 'Science', slug: 'science', icon: '⚗️', color: '#0369a1',
      chapters: [
        {
          id: 'c7s1', title: 'Nutrition in Plants',
          topics: ['Mode of nutrition','Photosynthesis','Other modes of nutrition','Saprotrophic nutrition','Symbiosis'],
          keyTerms: ['Autotroph','Heterotroph','Chlorophyll','Stomata','Symbiosis','Parasite','Saprotroph']
        },
        {
          id: 'c7s2', title: 'Nutrition in Animals',
          topics: ['Different ways of taking food','Digestion in humans','Digestion in grass-eating animals','Feeding in Amoeba'],
          keyTerms: ['Ingestion','Digestion','Absorption','Assimilation','Egestion','Villi','Bile','Enzyme']
        },
        {
          id: 'c7s3', title: 'Fibre to Fabric',
          topics: ['Wool','Silk','Life history of silk moth','Processing of silk'],
          keyTerms: ['Fleece','Shearing','Scouring','Sorting','Combing','Spinning','Cocoon','Sericulture']
        },
        {
          id: 'c7s4', title: 'Heat',
          topics: ['Hot and cold','Measuring temperature','Laboratory thermometer','Transfer of heat','Kinds of clothes we wear in summer and winter'],
          formulas: ['°F = (9/5 × °C) + 32','°C = (°F - 32) × 5/9'],
          keyTerms: ['Temperature','Thermometer','Conduction','Convection','Radiation','Conductor','Insulator']
        },
        {
          id: 'c7s5', title: 'Acids, Bases and Salts',
          topics: ['Acids and bases','Natural indicators around us','Neutralisation','Neutralisation in everyday life'],
          keyTerms: ['Acid','Base','Salt','Neutral','Indicator','Litmus','Turmeric','pH']
        },
        {
          id: 'c7s6', title: 'Physical and Chemical Changes',
          topics: ['Physical changes','Chemical changes','Rusting of iron','Crystallisation'],
          keyTerms: ['Physical change','Chemical change','Reversible','Irreversible','Rusting','Crystallisation','Galvanisation']
        },
        {
          id: 'c7s7', title: 'Weather, Climate and Adaptations of Animals to Climate',
          topics: ['Weather','Climate','Climate and adaptation','Polar regions','Tropical rainforests'],
          keyTerms: ['Weather','Climate','Adaptation','Migration','Hibernation','Blubber','Tropical']
        },
        {
          id: 'c7s8', title: 'Winds, Storms and Cyclones',
          topics: ['Air exerts pressure','High and low pressure regions','Wind','Thunderstorms','Cyclones','Destruction caused by cyclones','Effective safety measures'],
          keyTerms: ['Air pressure','Wind','Cyclone','Thunderstorm','Lightning','Tornado','Anemometer']
        },
        {
          id: 'c7s9', title: 'Soil',
          topics: ['Soil — teeming with life','Soil profile','Soil types','Properties of soil','Soil and crops','Soil erosion'],
          keyTerms: ['Humus','Topsoil','Subsoil','Bedrock','Percolation','Silt','Clay','Sandy soil','Loam']
        },
        {
          id: 'c7s10', title: 'Respiration in Organisms',
          topics: ['Why do we respire?','Breathing','How do we breathe?','Breathing in other animals','Breathing under water'],
          formulas: ['Glucose + Oxygen → CO₂ + Water + Energy','C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy'],
          keyTerms: ['Respiration','Breathing','Diaphragm','Alveoli','Yeast','Anaerobic','Aerobic']
        },
        {
          id: 'c7s11', title: 'Transportation in Animals and Plants',
          topics: ['Circulatory system','Components of blood','Heartbeat','Excretion in animals','Transport of substances in plants'],
          keyTerms: ['Blood','Heart','Artery','Vein','Capillary','Plasma','Excretion','Transpiration','Phloem','Xylem']
        },
        {
          id: 'c7s12', title: 'Reproduction in Plants',
          topics: ['Modes of reproduction','Vegetative propagation','Budding','Fragmentation','Spore formation','Sexual reproduction'],
          keyTerms: ['Vegetative propagation','Asexual reproduction','Sexual reproduction','Pollination','Fertilisation','Germination']
        },
        {
          id: 'c7s13', title: 'Motion and Time',
          topics: ['Slow and fast','Speed','Measurement of time','Units of time','Distance-time graph'],
          formulas: ['Speed = Distance / Time', 'Distance = Speed × Time'],
          keyTerms: ['Speed','Uniform motion','Non-uniform motion','Time period','Oscillation','Pendulum']
        },
        {
          id: 'c7s14', title: 'Electric Current and Its Effects',
          topics: ['Symbols of electric components','Heating effect of electric current','Magnetic effect of electric current','Electromagnet','Electric bell'],
          keyTerms: ['Circuit','Fuse','Electromagnet','Electric bell','MCB','Heating effect','Magnetic effect']
        },
        {
          id: 'c7s15', title: 'Light',
          topics: ['Light travels in a straight line','Reflection of light','Spherical mirrors','Images formed by lenses'],
          keyTerms: ['Reflection','Refraction','Mirror','Lens','Convex','Concave','Incident ray','Reflected ray']
        },
        {
          id: 'c7s16', title: 'Water: A Precious Resource',
          topics: ['How much water is available','Forms of water','Groundwater','Depletion of water table','Distribution of water','Water management','Role of government'],
          keyTerms: ['Water table','Groundwater','Aquifer','Water management','Drip irrigation','Water harvesting']
        },
        {
          id: 'c7s17', title: 'Forests: Our Lifeline',
          topics: ['Visit to a forest','Why are forests important?','Components of forest'],
          keyTerms: ['Canopy','Deforestation','Biodiversity','Humus','Crown','Decomposer','Microbe']
        },
        {
          id: 'c7s18', title: 'Wastewater Story',
          topics: ['Water, our lifeline','What is sewage?','Sewage treatment','Better housekeeping practices','Sanitation and disease'],
          keyTerms: ['Sewage','Wastewater','Treatment','Filtration','Sedimentation','Sludge','Vermi-processing']
        },
      ]
    },
    {
      name: 'Social Science', slug: 'social-science', icon: '🌍', color: '#065f46',
      chapters: [
        { id: 'c7ss1', title: 'Tracing Changes Through a Thousand Years', topics: ['Historians and their sources', 'New social and political groups', 'Region from 700 to 1750'] },
        { id: 'c7ss2', title: 'New Kings and Kingdoms', topics: ['Warfare and territorial control', 'Administration', 'Prashastis and genealogies', 'Chola kingdom', 'Rashtrakutas', 'Rajputs'] },
        { id: 'c7ss3', title: 'The Delhi Sultanate', topics: ['Where do we get information?', 'The Mongol invasions', 'Balban and Sultans', 'Market reforms of Alauddin Khalji', 'Ibn Battuta'] },
        { id: 'c7ss4', title: 'The Mughal Empire', topics: ['Who were the Mughals?', 'Mughal military campaigns', 'Akbar\'s policies', 'Mughal administration', 'Mansabdars and jagirdars', 'Mughal relations with other rulers'] },
        { id: 'c7ss5', title: 'Rulers and Buildings', topics: ['Engineering skills and construction', 'Temples, mosques and tanks', 'Why were temples destroyed?', 'A new kind of building'] },
        { id: 'c7ss6', title: 'Towns, Traders and Craftspersons', topics: ['Administrative centres', 'Temple towns', 'Pilgrimage centres', 'Trade and commerce'] },
        { id: 'c7ss7', title: 'Tribes, Nomads and Settled Communities', topics: ['Beyond big cities', 'Who were tribals?', 'How tribal societies were organized?', 'Changes in tribal societies'] },
        { id: 'c7ss8', title: 'Devotional Paths to the Divine', topics: ['The idea of a Supreme God', 'A new kind of bhakti in the south', 'Basavanna\'s Virashaivism', 'The saints of Maharashtra', 'Kabir', 'Guru Nanak', 'Mirabai'] },
        { id: 'c7ss9', title: 'The Making of Regional Cultures', topics: ['The Cheras and the development of Malayalam', 'Rulers and religious traditions', 'The Rajputs and the idea of heroism', 'Beyond boundaries', 'Painting as a regional art form'] },
        { id: 'c7ss10', title: 'Eighteenth-Century Political Formations', topics: ['Crisis of the empire', 'Maratha kingdom', 'Afghan dominance', 'Sikh kingdom', 'Hyderabad', 'Mysore'] },
      ]
    },
    {
      name: 'English', slug: 'english', icon: '📝', color: '#1e3a5f',
      chapters: [
        { id: 'c7e1', title: 'Three Questions', topics: ['Leo Tolstoy story', 'Morals and values', 'Time, people and purpose', 'Reading comprehension'] },
        { id: 'c7e2', title: 'A Gift of Chappals', topics: ['Story by Vasantha Surya', 'Compassion', 'Giving', 'Indian family life'] },
        { id: 'c7e3', title: 'Gopal and the Hilsa Fish', topics: ['Folk tale', 'Humour', 'Bengali literature', 'Dramatic reading'] },
        { id: 'c7e4', title: 'The Ashes That Made Trees Bloom', topics: ['Japanese folktale', 'Honesty', 'Reward and punishment', 'Moral story'] },
        { id: 'c7e5', title: 'Quality', topics: ['John Galsworthy', 'Craftsmanship', 'Pride in work', 'Short story'] },
        { id: 'c7e6', title: 'Expert Detectives', topics: ['Detective story', 'Susanna and Natasha', 'Mystery', 'Inference skills'] },
        { id: 'c7e7', title: 'The Invention of Vita Wonk', topics: ['Roald Dahl', 'Science fiction', 'Humour', 'Imagination'] },
        { id: 'c7e8', title: 'Fire: Friend and Foe', topics: ['Non-fiction', 'Fire uses', 'Forest fires', 'Safety tips'] },
        { id: 'c7e9', title: 'A Bicycle in Good Repair', topics: ['Jerome K Jerome', 'Humour', 'Repair', 'Machines'] },
        { id: 'c7e10', title: 'The Story of Cricket', topics: ['History of cricket', 'British origins', 'Evolution of the game', 'Rules'] },
      ]
    },
    {
      name: 'Hindi', slug: 'hindi', icon: '🇮🇳', color: '#dc2626',
      chapters: [
        { id: 'c7h1', title: 'बाल महाभारत कथा', topics: ['महाभारत की कहानी', 'पात्र परिचय', 'नैतिक मूल्य', 'गद्य पाठ'] },
        { id: 'c7h2', title: 'हम पंछी उन्मुक्त गगन के', topics: ['कविता', 'स्वतंत्रता', 'पक्षी जीवन', 'भाव सौंदर्य'] },
        { id: 'c7h3', title: 'दादी माँ', topics: ['संस्मरण', 'परिवार', 'ग्रामीण जीवन', 'प्रेम'] },
        { id: 'c7h4', title: 'हिमालय की बेटियाँ', topics: ['नदियाँ', 'प्रकृति वर्णन', 'नागार्जुन', 'निबंध'] },
        { id: 'c7h5', title: 'कठपुतली', topics: ['कविता', 'स्वतंत्रता की चाह', 'कठपुतली का जीवन', 'प्रतीकात्मकता'] },
      ]
    },
  ]
}

// ─────────────────────────────────────────────────────────
// CLASS 8
// ─────────────────────────────────────────────────────────
export const CLASS_8: ClassSyllabus = {
  classLevel: '8',
  subjects: [
    {
      name: 'Mathematics', slug: 'mathematics', icon: '➕', color: '#1a3a6b',
      chapters: [
        {
          id: 'c8m1', title: 'Rational Numbers',
          topics: ['Properties of rational numbers','Rational numbers on number line','Rational numbers between two rational numbers'],
          formulas: ['a/b + c/d = (ad+bc)/bd', 'a/b × c/d = ac/bd', 'Additive inverse of a/b is -a/b'],
          keyTerms: ['Rational number','Irrational number','Commutative','Associative','Distributive','Closure']
        },
        {
          id: 'c8m2', title: 'Linear Equations in One Variable',
          topics: ['Introduction','Solving equations with linear expressions','Applications — word problems','Reducing equations to simpler form'],
          formulas: ['ax + b = c → x = (c-b)/a'],
          keyTerms: ['Linear equation','Variable','Transposition','Solution','LHS','RHS']
        },
        {
          id: 'c8m3', title: 'Understanding Quadrilaterals',
          topics: ['Polygons','Kinds of quadrilaterals','Properties of parallelogram','Properties of rectangle, rhombus, square'],
          formulas: ['Sum of angles of quadrilateral = 360°','Opposite angles of parallelogram are equal'],
          keyTerms: ['Polygon','Diagonal','Parallelogram','Rectangle','Square','Rhombus','Trapezium','Kite']
        },
        {
          id: 'c8m4', title: 'Practical Geometry',
          topics: ['Constructing a quadrilateral (5 measurements)','Special quadrilaterals: squares, rhombus, etc.'],
        },
        {
          id: 'c8m5', title: 'Data Handling',
          topics: ['Looking for information','Organising data','Grouping data','Circle graph (pie chart)','Probability'],
          formulas: ['P(E) = Favourable outcomes / Total outcomes'],
          keyTerms: ['Frequency','Class interval','Histogram','Pie chart','Probability','Bar graph']
        },
        {
          id: 'c8m6', title: 'Squares and Square Roots',
          topics: ['Properties of square numbers','Finding square roots — repeated subtraction, prime factorisation, long division'],
          formulas: ['√(a × b) = √a × √b', '(a+b)² = a²+2ab+b²', '(a-b)² = a²-2ab+b²'],
          keyTerms: ['Perfect square','Square root','Prime factorisation','Long division method']
        },
        {
          id: 'c8m7', title: 'Cubes and Cube Roots',
          topics: ['Cubes','Cube roots through prime factorisation'],
          formulas: ['∛(a × b × c) = ∛a × ∛b × ∛c', '(a+b)³ = a³+3a²b+3ab²+b³'],
          keyTerms: ['Perfect cube','Cube root','Prime factorisation']
        },
        {
          id: 'c8m8', title: 'Comparing Quantities',
          topics: ['Ratios and percentages','Finding increase or decrease percent','Finding discounts','Finding profit or loss','Simple and compound interest'],
          formulas: ['CI = P(1 + R/100)ⁿ - P', 'Amount = P(1 + R/100)ⁿ', 'SI = PRT/100'],
          keyTerms: ['Discount','Marked price','Selling price','Profit','Loss','Simple interest','Compound interest']
        },
        {
          id: 'c8m9', title: 'Algebraic Expressions and Identities',
          topics: ['Expressions','Terms, factors, coefficients','Monomials, binomials, polynomials','Addition and subtraction','Multiplication','Standard identities'],
          formulas: ['(a+b)² = a²+2ab+b²','(a-b)² = a²-2ab+b²','(a+b)(a-b) = a²-b²','(x+a)(x+b) = x²+(a+b)x+ab'],
          keyTerms: ['Monomial','Binomial','Trinomial','Like terms','Identity']
        },
        {
          id: 'c8m10', title: 'Visualising Solid Shapes',
          topics: ['Views of 3D shapes','Mapping space around us','Faces, edges, vertices'],
          formulas: ['Euler\'s formula: F + V - E = 2'],
          keyTerms: ['Net','Polyhedron','Prism','Pyramid','Cuboid','Cylinder']
        },
        {
          id: 'c8m11', title: 'Mensuration',
          topics: ['Area of trapezium','Area of general quadrilateral','Area of polygon','Surface area of cube, cuboid, cylinder','Volume of cube, cuboid, cylinder'],
          formulas: ['Area of trapezium = ½(a+b)h','CSA of cylinder = 2πrh','TSA of cylinder = 2πr(r+h)','Volume of cylinder = πr²h','Volume of cuboid = lbh'],
          keyTerms: ['Trapezium','Surface area','Lateral surface area','Total surface area','Volume']
        },
        {
          id: 'c8m12', title: 'Exponents and Powers',
          topics: ['Powers with negative exponents','Laws of exponents','Standard form and scientific notation'],
          formulas: ['a⁻ⁿ = 1/aⁿ','aᵐ × aⁿ = aᵐ⁺ⁿ','aᵐ/aⁿ = aᵐ⁻ⁿ','(aᵐ)ⁿ = aᵐⁿ'],
        },
        {
          id: 'c8m13', title: 'Direct and Inverse Proportions',
          topics: ['Direct proportion','Inverse proportion','Applications'],
          formulas: ['Direct: x/y = k (constant)','Inverse: x × y = k'],
          keyTerms: ['Proportion','Unitary method','Direct variation','Inverse variation']
        },
        {
          id: 'c8m14', title: 'Factorisation',
          topics: ['Common factors','Factorisation using identities','Division of algebraic expressions'],
          formulas: ['a²-b² = (a+b)(a-b)', 'a²+2ab+b² = (a+b)²'],
          keyTerms: ['Factor','Common factor','Irreducible factor']
        },
        {
          id: 'c8m15', title: 'Introduction to Graphs',
          topics: ['Bar graphs','Pie charts','Histograms','Line graphs','Cartesian plane'],
          keyTerms: ['x-axis','y-axis','Origin','Quadrant','Coordinate','Plot']
        },
        {
          id: 'c8m16', title: 'Playing with Numbers',
          topics: ['Numbers in general form','Letters for digits','Tests of divisibility'],
          keyTerms: ['Divisibility','Number puzzle','Cryptarithmetic']
        },
      ]
    },
    {
      name: 'Science', slug: 'science', icon: '⚗️', color: '#0369a1',
      chapters: [
        {
          id: 'c8s1', title: 'Crop Production and Management',
          topics: ['Agricultural practices','Basic practices of crop production','Preparation of soil','Sowing','Adding manure and fertilisers','Irrigation','Protection from weeds','Harvesting','Storage','Food from animals'],
          keyTerms: ['Kharif crop','Rabi crop','Irrigation','Manure','Fertiliser','Pesticide','Harvesting','Threshing']
        },
        {
          id: 'c8s2', title: 'Microorganisms: Friend and Foe',
          topics: ['Microorganisms','Where do microorganisms live?','Microorganisms and us','Harmful microorganisms','Food preservation','Nitrogen fixation'],
          keyTerms: ['Bacteria','Virus','Fungi','Protozoa','Algae','Antibiotic','Vaccine','Fermentation','Pathogen']
        },
        {
          id: 'c8s3', title: 'Synthetic Fibres and Plastics',
          topics: ['Types of synthetic fibres (Rayon, Nylon, Polyester, Acrylic)','Characteristics of synthetic fibres','Plastics','Plastics and the environment'],
          keyTerms: ['Synthetic fibre','Polymer','Monomer','Thermoplastic','Thermosetting plastic','Biodegradable']
        },
        {
          id: 'c8s4', title: 'Materials: Metals and Non-metals',
          topics: ['Physical properties of metals and non-metals','Chemical properties','Uses of metals and non-metals','Reaction of metals with oxygen, water, acids','Displacement reaction'],
          keyTerms: ['Metal','Non-metal','Ductile','Malleable','Lustrous','Reactivity','Displacement reaction']
        },
        {
          id: 'c8s5', title: 'Coal and Petroleum',
          topics: ['Natural resources','Inexhaustible and exhaustible','Coal','Petroleum','Natural gas','PCRA'],
          keyTerms: ['Fossil fuel','Coal','Petroleum','Natural gas','Coke','Coal tar','Petrol','Diesel','LPG','CNG']
        },
        {
          id: 'c8s6', title: 'Combustion and Flame',
          topics: ['What is combustion?','How do we control fire?','Types of combustion','Flame','Structure of a flame','What is a fuel?','Fuel efficiency'],
          formulas: ['Calorific value = Energy released per kg of fuel'],
          keyTerms: ['Combustion','Ignition temperature','Inflammable','Flammable','Fuel','Calorific value','CO₂','Fire extinguisher']
        },
        {
          id: 'c8s7', title: 'Conservation of Plants and Animals',
          topics: ['Deforestation','Consequences of deforestation','Conservation of forest and wildlife','Biosphere reserves','Wildlife sanctuaries','National parks','Red data book'],
          keyTerms: ['Deforestation','Reforestation','Biosphere reserve','Endemic species','Extinct species','Biodiversity','Migratory birds']
        },
        {
          id: 'c8s8', title: 'Cell — Structure and Functions',
          topics: ['Discovery of cell','Cell','Organisms show variety in cell number, shape and size','Unicellular organisms','Multicellular organisms','Cell structure and function','Parts of a cell'],
          keyTerms: ['Cell','Cell membrane','Cell wall','Cytoplasm','Nucleus','Vacuole','Chloroplast','Mitochondria','Prokaryote','Eukaryote']
        },
        {
          id: 'c8s9', title: 'Reproduction in Animals',
          topics: ['Modes of reproduction','Sexual reproduction in animals','Asexual reproduction','Cloning','Development of embryo'],
          keyTerms: ['Sexual reproduction','Asexual reproduction','Zygote','Embryo','Fetus','Fertilisation','Binary fission','Budding','Viviparous','Oviparous']
        },
        {
          id: 'c8s10', title: 'Reaching the Age of Adolescence',
          topics: ['Adolescence and puberty','Changes at puberty','Secondary sexual characters','Changes in boys and girls','Role of hormones','Reproductive phase in humans','How a baby\'s sex is determined'],
          keyTerms: ['Adolescence','Puberty','Hormone','Testosterone','Estrogen','Menarche','Menopause','Sex determination']
        },
        {
          id: 'c8s11', title: 'Force and Pressure',
          topics: ['Force: a push or a pull','Forces are due to interaction','Exploring forces','A force can change the state of motion','Force can change the shape of an object','Contact forces','Non-contact forces','Pressure','Pressure exerted by liquids and gases','Atmospheric pressure'],
          formulas: ['Pressure = Force / Area', 'P = F/A'],
          keyTerms: ['Force','Contact force','Non-contact force','Gravity','Magnetic force','Electrostatic force','Pressure','Atmosphere']
        },
        {
          id: 'c8s12', title: 'Friction',
          topics: ['Force of friction','Factors affecting friction','Friction: a necessary evil','Increasing and reducing friction','Wheels reduce friction','Fluid friction'],
          keyTerms: ['Friction','Static friction','Kinetic friction','Rolling friction','Fluid friction','Lubricant','Ball bearing']
        },
        {
          id: 'c8s13', title: 'Sound',
          topics: ['Sound is produced by vibrating bodies','Sound produced by humans','Sound needs a medium for propagation','We hear sound through ears','Amplitude, time period, frequency','Audible and inaudible sounds','Noise and music','Noise pollution'],
          formulas: ['Frequency = 1/Time period', 'f = 1/T'],
          keyTerms: ['Vibration','Amplitude','Frequency','Hertz','Infrasonic','Ultrasonic','Noise','Decibel']
        },
        {
          id: 'c8s14', title: 'Chemical Effects of Electric Current',
          topics: ['Do liquids conduct electricity?','Chemical effects of electric current','Electroplating'],
          keyTerms: ['Conductor','Insulator','Electrolyte','Electrode','Anode','Cathode','Electroplating','LED']
        },
        {
          id: 'c8s15', title: 'Some Natural Phenomena',
          topics: ['Lightning','Charging by rubbing','Types of charges and their interaction','Transfer of charge','The story of lightning','Lightning conductors','Earthquakes'],
          keyTerms: ['Electric charge','Electroscope','Lightning','Lightning conductor','Earthquake','Richter scale','Seismograph']
        },
        {
          id: 'c8s16', title: 'Light',
          topics: ['What makes things visible','Laws of reflection','Regular and diffuse reflection','Reflected light can be reflected again','Multiple images','Sunlight — white or coloured?','What is inside our eyes?','Care of eyes','Visually challenged persons','Braille system'],
          keyTerms: ['Reflection','Laws of reflection','Regular reflection','Diffuse reflection','Prism','Dispersion','Retina','Cornea','Iris','Pupil','Braille']
        },
        {
          id: 'c8s17', title: 'Stars and the Solar System',
          topics: ['The moon','The stars','Constellations','The solar system','Some other members of the solar system'],
          keyTerms: ['Moon','Star','Constellation','Solar system','Planet','Satellite','Asteroid','Comet','Meteor','Meteorite','Light year']
        },
        {
          id: 'c8s18', title: 'Pollution of Air and Water',
          topics: ['Air pollution','How does air get polluted?','Case study: The Taj Mahal','Greenhouse effect and global warming','What can be done?','Water pollution','What can be done about water pollution?'],
          keyTerms: ['Pollutant','Air pollution','Water pollution','Greenhouse gas','Acid rain','Global warming','Potable water']
        },
      ]
    },
    {
      name: 'Social Science', slug: 'social-science', icon: '🌍', color: '#065f46',
      chapters: [
        { id: 'c8ss1', title: 'How, When and Where', topics: ['How important are dates?', 'Colonial administration', 'How do we periodise?', 'Official records', 'Surveys, censuses, museums'] },
        { id: 'c8ss2', title: 'From Trade to Territory', topics: ['East India Company', 'Trade and commercial networks', 'Battle of Plassey', 'Company becomes Nawab', 'Tipu Sultan', 'Annexation of Awadh'] },
        { id: 'c8ss3', title: 'Ruling the Countryside', topics: ['Bengal and Permanent Settlement', 'Munro system', 'Indigo and Blue Revolution', 'Mahalwari settlement', 'The Blue Rebellion'] },
        { id: 'c8ss4', title: 'Tribals, Dikus and the Vision of a Golden Age', topics: ['How did tribal groups live?', 'What did the dikus do?', 'A Closer Look: Birsa Munda'] },
        { id: 'c8ss5', title: 'When People Rebel: 1857 and After', topics: ['Policies and the people', 'The Sepoy Mutiny', 'How the British suppressed the revolt', 'India after 1857'] },
        { id: 'c8ss6', title: 'Weavers, Iron Smelters and Factory Owners', topics: ['Indian textiles', 'Iron and steel: traditional and new', 'Factories come up', 'Who were the leaders of industry?'] },
        { id: 'c8ss7', title: 'Civilising the Native, Educating the Nation', topics: ['How the British saw education', 'What happened to the local schools?', 'The Agenda for a national education', 'Mahatma Gandhi\'s view on education'] },
        { id: 'c8ss8', title: 'Women, Caste and Reform', topics: ['Working towards change', 'Rammohan Roy', 'Dayanand Saraswati', 'Pandita Ramabai', 'Through the eyes of the poor'] },
        { id: 'c8ss9', title: 'The Making of the National Movement: 1870s-1947', topics: ['The emergence of nationalism', 'The growth of mass nationalism', 'The making of Gandhi', 'Non-cooperation movement', 'Quit India Movement', 'Towards independence and partition'] },
        { id: 'c8ss10', title: 'India After Independence', topics: ['A new and divided nation', 'Integration of states', 'Economy', 'Constitution', 'Democracy in India'] },
        { id: 'c8ss11', title: 'Resources', topics: ['What are resources?', 'Types of resources', 'Sustainable development', 'Principle of sustainable development'] },
        { id: 'c8ss12', title: 'Land, Soil, Water, Natural Vegetation and Wildlife Resources', topics: ['Land', 'Soil', 'Water', 'Natural vegetation', 'Wildlife', 'Conservation'] },
        { id: 'c8ss13', title: 'Mineral and Power Resources', topics: ['What is a mineral?', 'Types of minerals', 'Distribution of minerals', 'Conservation of minerals', 'Power resources'] },
        { id: 'c8ss14', title: 'Agriculture', topics: ['Types of farming', 'Major crops', 'Agricultural development', 'India — a case study', 'USA — a case study'] },
        { id: 'c8ss15', title: 'Industries', topics: ['Classification', 'Factors affecting industrial location', 'Iron and steel industry', 'Cotton textile industry', 'Information technology industry'] },
        { id: 'c8ss16', title: 'Human Resources', topics: ['Distribution of population', 'Density of population', 'Factors affecting distribution of population', 'Population change'] },
        { id: 'c8ss17', title: 'The Indian Constitution', topics: ['Why does a country need a constitution?', 'Framing the Indian constitution', 'Key features of the Constitution'] },
        { id: 'c8ss18', title: 'Understanding Secularism', topics: ['What is secularism?', 'Why is it important?', 'Indian secularism', 'Challenges to secular state'] },
        { id: 'c8ss19', title: 'Why Do We Need a Parliament?', topics: ['Why should people decide?', 'The role of Parliament', 'Two houses', 'What Parliament does'] },
        { id: 'c8ss20', title: 'Understanding Laws', topics: ['What is law?', 'How does law get made?', 'Unpopular and controversial laws', 'Do laws apply to all?'] },
        { id: 'c8ss21', title: 'Judiciary', topics: ['What is judiciary?', 'What is an independent judiciary?', 'Structure of courts in India', 'Public Interest Litigation'] },
        { id: 'c8ss22', title: 'Understanding Our Criminal Justice System', topics: ['The role of the FIR', 'The role of the police', 'The role of the public prosecutor', 'The role of the judge', 'Fair trial'] },
        { id: 'c8ss23', title: 'Understanding Marginalisation', topics: ['Who are marginalised?', 'Adivasis and marginalisation', 'Muslims and marginalisation'] },
        { id: 'c8ss24', title: 'Confronting Marginalisation', topics: ['Invoking fundamental rights', 'Laws for the marginalised', 'Protecting the rights of Dalits', 'Adivasi demands and the 1989 Act', 'Practice and safeguards'] },
        { id: 'c8ss25', title: 'Public Facilities', topics: ['Water and the people of Chennai', 'Public facilities', 'Public facilities and the government', 'In search of alternatives'] },
        { id: 'c8ss26', title: 'Law and Social Justice', topics: ['Bhopal Gas Tragedy', 'Markets everywhere', 'Enforcement of safety laws', 'New laws to protect the environment'] },
      ]
    },
    {
      name: 'English', slug: 'english', icon: '📝', color: '#1e3a5f',
      chapters: [
        { id: 'c8e1', title: 'The Best Christmas Present in the World', topics: ['World War I story', 'Friendship across borders', 'Michael Morpurgo', 'Comprehension'] },
        { id: 'c8e2', title: 'The Tsunami', topics: ['Natural disaster', 'Human stories', 'Animal instinct', 'Survival'] },
        { id: 'c8e3', title: 'Glimpses of the Past', topics: ['History through cartoons', 'Freedom struggle', 'India under British rule', 'Visual texts'] },
        { id: 'c8e4', title: 'Bepin Choudhury\'s Lapse of Memory', topics: ['Satyajit Ray', 'Memory and identity', 'Humour and suspense', 'Bengali literature'] },
        { id: 'c8e5', title: 'The Summit Within', topics: ['H.P.S. Ahluwalia', 'Mountain climbing', 'Personal achievement', 'Autobiographical'] },
        { id: 'c8e6', title: 'This is Jody\'s Fawn', topics: ['Marjorie Rawlings', 'Human-animal bond', 'Compassion', 'Short story'] },
        { id: 'c8e7', title: 'A Visit to Cambridge', topics: ['Firdaus Kanga', 'Stephen Hawking', 'Disability and achievement', 'Interview'] },
        { id: 'c8e8', title: 'A Short Monsoon Diary', topics: ['Ruskin Bond', 'Diary writing', 'Nature writing', 'Monsoon season'] },
        { id: 'c8e9', title: 'The Great Stone Face', topics: ['Nathaniel Hawthorne', 'Character and ideals', 'American literature', 'Moral values'] },
      ]
    },
    {
      name: 'Hindi', slug: 'hindi', icon: '🇮🇳', color: '#dc2626',
      chapters: [
        { id: 'c8h1', title: 'ध्वनि', topics: ['सूर्यकांत त्रिपाठी निराला', 'प्रकृति कविता', 'वसंत ऋतु', 'भाव पक्ष'] },
        { id: 'c8h2', title: 'लाख की चूड़ियाँ', topics: ['कहानी', 'पारंपरिक शिल्प', 'मशीनीकरण', 'लघु उद्योग'] },
        { id: 'c8h3', title: 'बस की यात्रा', topics: ['यात्रा वर्णन', 'हरिशंकर परसाई', 'हास्य व्यंग्य', 'गद्य'] },
        { id: 'c8h4', title: 'दीवानों की हस्ती', topics: ['कविता', 'स्वतंत्र जीवन', 'दार्शनिक विचार', 'भगवतीचरण वर्मा'] },
        { id: 'c8h5', title: 'चिट्ठियों की अनूठी दुनिया', topics: ['पत्र लेखन', 'संचार का इतिहास', 'आर्यभट्ट', 'निबंध'] },
        { id: 'c8h6', title: 'भगवान के डाकिए', topics: ['रामधारी सिंह दिनकर', 'कविता', 'प्रकृति', 'पक्षी'] },
        { id: 'c8h7', title: 'क्या निराश हुआ जाए', topics: ['हजारी प्रसाद द्विवेदी', 'आशावाद', 'निबंध', 'विचार'] },
        { id: 'c8h8', title: 'यह सबसे कठिन समय नहीं', topics: ['जया जादवानी', 'कविता', 'कठिनाइयाँ', 'उम्मीद'] },
        { id: 'c8h9', title: 'कबीर की साखियाँ', topics: ['कबीर', 'दोहे', 'आध्यात्मिक ज्ञान', 'भक्ति काव्य'] },
      ]
    },
  ]
}
