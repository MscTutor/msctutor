// lib/ncert-master-6-extra.ts
// Additional rich chapters for Class 6 — filling all syllabus gaps
// Math (c6m4-c6m14), Science (c6s2-c6s16), Social Science, English, Hindi

import type { ClassData } from '@/lib/ncert-master'

export const CLASS6_EXTRA: ClassData = {
  classLevel: '6', label: 'Class 6', board: ['CBSE','ICSE','State'],
  description: 'Complete Class 6 content — Geometry, Fractions, Science, History, Geography',
  subjects: [
    // ── MATHEMATICS ────────────────────────────────────────────────
    {
      slug: 'mathematics', name: 'Mathematics', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Geometry, fractions, decimals, algebra, data handling',
      chapters: [
        {
          id: 'c6m4', chapterNo: 4, title: 'Basic Geometrical Ideas',
          description: 'Point, line, ray, angles, triangles, quadrilaterals and circles — the language of geometry.',
          topics: [
            { title: 'Point, Line, Line Segment and Ray', content: 'A point is an exact location — it has no size, only position. A line extends infinitely in both directions. A line segment is part of a line between two fixed points (has definite length). A ray starts at one point and goes infinitely in one direction. Example: A torch beam is a ray; a ruler edge is a line segment; a dot on paper is a point.' },
            { title: 'Angles', content: 'An angle is formed when two rays meet at a common point (vertex). Types: Acute angle (0°–90°), Right angle (exactly 90°), Obtuse angle (90°–180°), Straight angle (180°), Reflex angle (180°–360°). Measured in degrees using a protractor. Sum of angles on a straight line = 180°.' },
            { title: 'Triangles', content: 'A triangle has 3 sides, 3 angles, 3 vertices. Types by sides: Equilateral (all equal), Isosceles (two equal), Scalene (all different). Types by angles: Acute (all < 90°), Right (one = 90°), Obtuse (one > 90°). Important: Sum of all angles of triangle = 180°.' },
            { title: 'Quadrilaterals', content: 'A quadrilateral has 4 sides, 4 angles, 4 vertices. Types: Square (all equal sides, all right angles), Rectangle (opposite sides equal, all right angles), Parallelogram (opposite sides equal and parallel), Rhombus (all sides equal), Trapezium (one pair parallel sides). Sum of all angles = 360°.' },
            { title: 'Circle', content: 'A circle is the set of all points at a fixed distance (radius) from the centre. Radius = distance from centre to boundary. Diameter = 2 × radius (longest chord). Chord = line joining two points on circle. Arc = part of the boundary. A diameter is the longest chord.' },
          ],
          formulas: [
            { name: 'Sum of angles in triangle', formula: '∠A + ∠B + ∠C = 180°', example: 'If two angles are 60° and 70°, third angle = 180-60-70 = 50°' },
            { name: 'Sum of angles in quadrilateral', formula: '∠A + ∠B + ∠C + ∠D = 360°', example: 'If three angles are 90°, 90°, 100°: fourth = 360-280 = 80°' },
            { name: 'Diameter and Radius', formula: 'd = 2r  |  r = d/2', example: 'r=5cm → d=10cm. d=14cm → r=7cm' },
          ],
          experiments: [],
          videos: [
            { title: 'Basic Geometrical Ideas Class 6', url: 'https://www.youtube.com/embed/302eJ3TzJQU', duration: '16 min', source: 'Education' },
          ],
          keyTerms: ['Point', 'Line', 'Ray', 'Line segment', 'Angle', 'Vertex', 'Triangle', 'Quadrilateral', 'Circle', 'Radius', 'Diameter', 'Chord'],
          quickFacts: ['The word "geometry" means "earth measurement" in Greek', 'Euclid wrote the first geometry textbook around 300 BC', 'Every circle can be divided into 360 degrees — ancient Babylonian tradition'],
          vedicTricks: [{ trick: 'To check if triangle is right-angled: verify a²+b²=c² (Pythagoras)', example: '3,4,5: 9+16=25=5² ✓ Right-angled!' }],
        },
        {
          id: 'c6m5', chapterNo: 5, title: 'Understanding Elementary Shapes',
          description: 'Measuring line segments, angles, triangles, quadrilaterals and 3D shapes.',
          topics: [
            { title: 'Measuring Line Segments', content: 'Use a ruler to measure. Always align the 0 mark with one end. Read the value at the other end. Unit: centimetres (cm) or millimetres (mm). 1 cm = 10 mm. For precision, use a divider (compass) along with ruler.' },
            { title: 'Types of Angles', content: 'Zero angle: 0°. Acute: between 0° and 90°. Right: exactly 90°. Obtuse: between 90° and 180°. Straight: exactly 180°. Reflex: between 180° and 360°. Complete/Full: 360°. Complementary angles add to 90°. Supplementary angles add to 180°.' },
            { title: 'Triangles Classification', content: 'By sides: Equilateral (3 equal sides, 3 equal 60° angles), Isosceles (2 equal sides, 2 equal angles), Scalene (no equal sides). By angles: Right-angled, Acute-angled, Obtuse-angled. A right isosceles triangle has angles 90°, 45°, 45°.' },
            { title: '3D Shapes', content: 'Cube: 6 faces, 8 vertices, 12 edges — all faces square. Cuboid: 6 rectangular faces. Cylinder: 2 circular faces, 1 curved surface. Cone: 1 circular face, 1 vertex, 1 curved surface. Sphere: no flat face, no edges, no vertices. Prism: two identical polygon bases + rectangular sides.' },
          ],
          formulas: [
            { name: 'Complementary Angles', formula: 'a + b = 90° (they complement each other)', example: 'Complement of 35° = 90-35 = 55°' },
            { name: 'Supplementary Angles', formula: 'a + b = 180° (they supplement each other)', example: 'Supplement of 110° = 180-110 = 70°' },
            { name: 'Euler\'s Formula for 3D shapes', formula: 'Faces + Vertices - Edges = 2', example: 'Cube: 6+8-12=2 ✓, Tetrahedron: 4+4-6=2 ✓' },
          ],
          experiments: [],
          videos: [{ title: 'Understanding Shapes Class 6', url: 'https://www.youtube.com/embed/vHqkHkHpWI4', duration: '18 min', source: 'Education' }],
          keyTerms: ['Complementary', 'Supplementary', 'Acute', 'Obtuse', 'Reflex', 'Equilateral', 'Isosceles', 'Scalene', 'Cube', 'Cuboid', 'Cylinder', 'Cone'],
          quickFacts: ['A honeycomb uses hexagonal cells — most efficient shape for storage', 'Euler\'s formula F+V-E=2 works for all convex polyhedra', 'Soccer ball has 12 pentagons + 20 hexagons'],
        },
        {
          id: 'c6m6', chapterNo: 6, title: 'Integers',
          description: 'Negative numbers, integers on number line, addition and subtraction of integers.',
          topics: [
            { title: 'Introduction to Integers', content: 'Whole numbers go from 0 upwards. But we need numbers below 0 too! Temperature below 0°C, depth below sea level, money owed. Negative numbers: -1, -2, -3... Integers = whole numbers + negative numbers = {...-3,-2,-1,0,1,2,3...}. Positive integers: 1,2,3... Negative integers: -1,-2,-3...' },
            { title: 'Integers on Number Line', content: 'Number line: 0 in centre, positive numbers to right, negative numbers to left. Going right = adding, going left = subtracting. Comparing: on number line, right is always greater. So -1 > -5 (even though 1 < 5). The further left, the smaller the number.' },
            { title: 'Addition of Integers', content: 'Same sign: add the numbers, keep the sign. (+5)+(+3)=+8. (-5)+(-3)=-8. Different signs: subtract smaller from larger, keep sign of larger. (+8)+(-3)=+5. (-8)+(+3)=-5. Adding a negative = same as subtracting. 7+(-4) = 7-4 = 3.' },
            { title: 'Subtraction of Integers', content: 'Subtracting an integer = adding its opposite (additive inverse). a - b = a + (-b). So 5 - 8 = 5 + (-8) = -3. And (-3) - (-7) = (-3) + 7 = 4. Rule: change subtraction to addition, change sign of second integer, then apply addition rules.' },
          ],
          formulas: [
            { name: 'Additive Inverse', formula: 'a + (-a) = 0, so additive inverse of a is -a', example: 'Additive inverse of 7 is -7. Of -12 is 12. Of 0 is 0.' },
            { name: 'Integer Subtraction', formula: 'a - b = a + (-b)', example: '5 - (-3) = 5 + 3 = 8. (-4) - (-7) = (-4) + 7 = 3' },
            { name: 'Sign Rules for Addition', formula: '+×+ = +, -×- = +, +×- = -, -×+ = -', example: '(+7)×(+3)=+21, (-7)×(-3)=+21, (+7)×(-3)=-21' },
          ],
          experiments: [],
          videos: [{ title: 'Integers Class 6 - Number Line', url: 'https://www.youtube.com/embed/abfGikx3KvY', duration: '14 min', source: 'Khan Academy' }],
          keyTerms: ['Integer', 'Positive integer', 'Negative integer', 'Number line', 'Additive inverse', 'Absolute value'],
          quickFacts: ['Temperature in Antarctica can be -89°C — the coldest recorded!', 'Dead Sea is 430 metres below sea level (negative altitude)', 'Negative numbers were used in India by Brahmagupta (628 CE) — 1000 years before Europe!'],
          vedicTricks: [{ trick: 'Distance between two integers on number line = larger - smaller (ignore signs)', example: 'Distance between -7 and +5 = 5+7 = 12 (add magnitudes)' }],
        },
        {
          id: 'c6m7', chapterNo: 7, title: 'Fractions',
          description: 'Understanding, comparing, and operating fractions including mixed numbers.',
          topics: [
            { title: 'What is a Fraction?', content: 'A fraction represents part of a whole. Written as p/q where p = numerator (parts taken), q = denominator (total equal parts). Example: 3/7 means 3 parts out of 7 equal parts. Types: Proper fraction (p<q): 3/5. Improper fraction (p≥q): 7/4. Mixed number: 1¾ = 1 + 3/4.' },
            { title: 'Equivalent Fractions', content: 'Fractions that represent the same value. Obtained by multiplying/dividing both numerator and denominator by same number. 1/2 = 2/4 = 3/6 = 50/100. To check: cross multiply — if a/b = c/d, then ad = bc. Simplest form: when HCF of numerator and denominator is 1.' },
            { title: 'Comparing Fractions', content: 'Same denominator: compare numerators (3/7 < 5/7). Same numerator: larger denominator = smaller fraction (3/7 > 3/8). Different both: make denominators equal (find LCM), then compare. Or cross multiply: a/b vs c/d → compare ad vs bc.' },
            { title: 'Adding and Subtracting Fractions', content: 'Same denominator: add/subtract numerators, keep denominator. 3/7 + 2/7 = 5/7. Different denominators: find LCM, convert to equivalent fractions, then add/subtract. 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Mixed numbers: convert to improper fractions first.' },
          ],
          formulas: [
            { name: 'Equivalent Fractions', formula: 'a/b = (a×n)/(b×n) for any n≠0', example: '2/3 = 4/6 = 6/9 = 10/15' },
            { name: 'Converting Mixed to Improper', formula: 'a(b/c) = (a×c + b)/c', example: '2¾ = (2×4+3)/4 = 11/4' },
            { name: 'Adding Fractions (different denom)', formula: 'a/b + c/d = (ad+bc)/bd', example: '1/3 + 1/4 = (4+3)/12 = 7/12' },
          ],
          experiments: [],
          videos: [{ title: 'Fractions Class 6 Complete', url: 'https://www.youtube.com/embed/XAHhBNVXsmo', duration: '20 min', source: 'Khan Academy' }],
          keyTerms: ['Numerator', 'Denominator', 'Proper fraction', 'Improper fraction', 'Mixed number', 'Equivalent fractions', 'Simplest form'],
          quickFacts: ['Ancient Egyptians only used unit fractions (1/n). They wrote 2/3 as 1/2 + 1/6!', 'Pi (π) cannot be written as a fraction — it\'s irrational', 'Music time signatures are fractions: 3/4 means 3 beats per 4 quarter notes'],
        },
        {
          id: 'c6m8', chapterNo: 8, title: 'Decimals',
          description: 'Decimal notation, place values, comparing decimals, and arithmetic with decimals.',
          topics: [
            { title: 'Decimal Notation', content: 'Decimals extend our number system to represent parts of whole numbers. The decimal point separates whole part (left) from fractional part (right). Tenths: one digit right of decimal. Hundredths: two digits. Thousandths: three digits. 3.47 = 3 ones + 4 tenths + 7 hundredths = 3 + 4/10 + 7/100.' },
            { title: 'Comparing Decimals', content: 'First compare whole number part. If equal, compare tenths digit. If still equal, compare hundredths, and so on. Add zeros to make same number of decimal places for easier comparison. Example: 2.3 vs 2.30 — same! 1.09 vs 1.9 — 1.9 is larger (1.90 vs 1.09).' },
            { title: 'Addition and Subtraction of Decimals', content: 'Key rule: align decimal points. Write zeros to fill empty places if needed. Then add/subtract as normal whole numbers. Example: 15.3 + 4.87: write as 15.30 + 4.87, then add. Always write answer with decimal point in same column.' },
            { title: 'Using Decimals in Daily Life', content: 'Money: ₹15.75 = 15 rupees and 75 paise. Length: 4.5 cm = 4 cm 5 mm. Weight: 2.250 kg = 2 kg 250 g. Fuel: petrol priced at ₹96.72 per litre. Decimals are everywhere! Converting: 1 kg = 1000 g, so 250 g = 0.250 kg = 0.25 kg.' },
          ],
          formulas: [
            { name: 'Decimal Place Values', formula: '...Hundreds | Tens | Ones . Tenths | Hundredths | Thousandths...', example: '5.374: 5 = ones, 3 = tenths, 7 = hundredths, 4 = thousandths' },
            { name: 'Fraction to Decimal', formula: 'Divide numerator by denominator', example: '3/4 = 3÷4 = 0.75. 1/8 = 0.125. 1/3 = 0.333...' },
            { name: 'Money Conversion', formula: '₹1 = 100 paise. So ₹p.q means p rupees q paise', example: '₹7.05 = 7 rupees 5 paise = 705 paise' },
          ],
          experiments: [],
          videos: [{ title: 'Decimals Class 6 - Full Chapter', url: 'https://www.youtube.com/embed/Gn2pdkvdbGQ', duration: '15 min', source: 'Khan Academy' }],
          keyTerms: ['Decimal point', 'Tenths', 'Hundredths', 'Thousandths', 'Place value', 'Comparing decimals'],
          quickFacts: ['The decimal system was developed in India (Hindu-Arabic numerals) and spread globally', 'Metric system uses decimals — 1 metre = 100 cm = 1000 mm', 'A billion = 1,000,000,000 = 1.0 × 10⁹ in scientific notation'],
        },
        {
          id: 'c6m9', chapterNo: 9, title: 'Data Handling',
          description: 'Collecting data, tally marks, pictographs, bar graphs and mean — introduction to statistics.',
          topics: [
            { title: 'Collecting and Recording Data', content: 'Data = collection of facts/numbers. Primary data: collected directly (surveys, experiments). Secondary data: from books, internet, newspapers. Recording methods: list, table, tally marks. Tally marks: draw 4 vertical lines, 5th is diagonal cross = 5. Quick counting method.' },
            { title: 'Pictograph', content: 'A pictograph uses pictures/symbols to represent data. Each symbol represents a fixed number (scale). Example: 1 book symbol = 100 books sold. Advantages: visual, easy to understand at a glance. Limitation: difficult for large numbers or non-round values.' },
            { title: 'Bar Graph', content: 'Uses rectangular bars of equal width. Height/length represents the value. Bars can be vertical or horizontal. Steps: choose scale, draw axes, label them, draw bars. Each bar represents one category. Useful for comparing quantities.' },
            { title: 'Mean (Average)', content: 'Mean = sum of all observations ÷ number of observations. Most common measure of central tendency. Example: marks of 5 students: 70,75,80,65,60. Sum = 350. Mean = 350/5 = 70. Mean represents the "typical" value in the data. Affected by extreme values.' },
          ],
          formulas: [
            { name: 'Mean (Average)', formula: 'Mean = Sum of all values / Number of values', example: 'Data: 12, 18, 15, 20, 10. Sum=75, n=5. Mean=75/5=15' },
            { name: 'Tally Marks', formula: 'Every 5th mark crosses previous 4 (like a gate)', example: 'HH HH HH | = 11 items' },
          ],
          experiments: [
            {
              title: 'Class Survey and Bar Graph',
              objective: 'Collect data about favourite subjects and represent as bar graph',
              materials: ['Paper', 'Pencil', 'Ruler', 'Coloured pencils'],
              steps: ['Ask each classmate their favourite subject', 'Record using tally marks', 'Count totals for each subject', 'Draw bar graph with proper scale and labels', 'Find mean number of students per subject'],
              result: 'You have created a real data collection and visualisation — the foundation of statistics!',
            },
          ],
          videos: [{ title: 'Data Handling Class 6 - Bar Graphs', url: 'https://www.youtube.com/embed/WoF7tnX4V6U', duration: '12 min', source: 'Khan Academy' }],
          keyTerms: ['Data', 'Tally marks', 'Pictograph', 'Bar graph', 'Mean', 'Scale', 'Frequency'],
          quickFacts: ['Statistics is used in cricket (batting average), medicine, business, weather forecasting', 'Mean is what most people call "average"', 'India\'s census data is collected every 10 years'],
        },
        {
          id: 'c6m11', chapterNo: 11, title: 'Algebra',
          description: 'Introduction to variables, expressions, equations — the gateway to higher mathematics.',
          topics: [
            { title: 'What is Algebra?', content: 'Algebra uses letters (variables) to represent unknown or changing numbers. Example: if each row has 4 chairs, n rows have 4n chairs. Here n is a variable — it can be any number. "Al-jabr" is Arabic for "reunion of broken parts" — origin of the word algebra, named after Al-Khwarizmi.' },
            { title: 'Variables and Expressions', content: 'Variable: a letter that stands for a number (a, b, x, y, n). Expression: combination of variables and numbers using operations. 2x+3, 5y-7, p/2+q, 3a²b. NOT an equation — no equals sign. Value of expression changes as variable changes.' },
            { title: 'Algebraic Expressions in Patterns', content: 'Patterns help us find algebraic formulas. Triangle pattern: 1st triangle has 3 matches, 2nd has 5, 3rd has 7... n-th has (2n+1) matches. Square pattern: n-th square needs 4n matches (no sharing) or (3n+1) when sharing sides. General formula saves us from counting!' },
            { title: 'Simple Equations', content: 'An equation has an equals sign: 2x = 8. The solution is the value that makes it true: x = 4. To solve: perform same operation on both sides to keep balance. 2x = 8 → divide both sides by 2 → x = 4. Check: 2×4 = 8 ✓.' },
          ],
          formulas: [
            { name: 'Matchstick Pattern (triangles)', formula: 'n triangles require (2n+1) matchsticks', example: '4 triangles: 2×4+1 = 9 matchsticks' },
            { name: 'Perimeter using variable', formula: 'Square with side l: Perimeter = 4l', example: 'l=5cm: P=4×5=20cm. l=x cm: P=4x cm' },
          ],
          experiments: [],
          videos: [{ title: 'Introduction to Algebra Class 6', url: 'https://www.youtube.com/embed/NybHckSEQBI', duration: '16 min', source: 'Khan Academy' }],
          keyTerms: ['Variable', 'Constant', 'Expression', 'Equation', 'Solution', 'LHS', 'RHS'],
          quickFacts: ['Al-Khwarizmi (780-850 CE) is the "father of Algebra"', 'His name gave us the word "algorithm"!', 'Algebra is used in computer programming, physics, economics'],
          vedicTricks: [{ trick: 'For mental algebra, think "what number does this need to be?"', example: 'x+7=15: what + 7 = 15? Answer: 8. So x=8' }],
        },
        {
          id: 'c6m12', chapterNo: 12, title: 'Ratio and Proportion',
          description: 'Comparing quantities using ratio, equivalent ratios, proportion and unitary method.',
          topics: [
            { title: 'Ratio', content: 'Ratio compares two quantities of the same type. a:b (read as "a is to b") = a/b. Always express in simplest form (divide by HCF). Example: 15:20 = 3:4 (divide by 5). Unit must be same before forming ratio: cannot compare kg and cm. Ratio has no unit.' },
            { title: 'Equivalent Ratios', content: 'Two ratios are equivalent if they are equal when simplified. Like equivalent fractions. 2:3 = 4:6 = 6:9 = 10:15 (multiply both by same number). To check: 2×6 = 3×4 = 12. Cross product method. Simplify both ratios to lowest terms and compare.' },
            { title: 'Proportion', content: 'Four quantities a, b, c, d are in proportion if a:b = c:d, i.e., a×d = b×c. Written as a:b::c:d. a and d are extremes; b and c are means. Extremes × Extremes = Means × Means. Example: 2:3::6:9. Check: 2×9=18, 3×6=18 ✓.' },
            { title: 'Unitary Method', content: 'Find value of ONE unit, then find value of required units. Example: 5 pencils cost ₹25. Cost of 1 pencil = 25/5 = ₹5. Cost of 8 pencils = 5×8 = ₹40. Always: divide to find unit value, then multiply for required quantity. Very practical in daily life!' },
          ],
          formulas: [
            { name: 'Ratio in simplest form', formula: 'a:b = a/HCF(a,b) : b/HCF(a,b)', example: '24:36 → HCF=12 → 2:3' },
            { name: 'Proportion Test', formula: 'a:b::c:d if and only if a×d = b×c', example: '3:4::6:8 → 3×8=24, 4×6=24 ✓ In proportion' },
          ],
          experiments: [],
          videos: [{ title: 'Ratio and Proportion Class 6', url: 'https://www.youtube.com/embed/F7gqFU5SXYU', duration: '14 min', source: 'Education' }],
          keyTerms: ['Ratio', 'Equivalent ratio', 'Proportion', 'Extremes', 'Means', 'Unitary method'],
          quickFacts: ['Ratio is used in map scales (1:50,000 means 1cm = 500m)', 'Golden ratio (~1.618) appears in art, architecture and nature', 'Cooking recipes use proportion (more people = more ingredients in same ratio)'],
          vedicTricks: [{ trick: 'To scale a recipe: multiply all ingredients by the same ratio', example: 'Recipe for 4 people → for 10 people: multiply all by 10/4 = 2.5' }],
        },
        {
          id: 'c6m13', chapterNo: 13, title: 'Symmetry',
          description: 'Line symmetry, lines of symmetry in shapes, reflection and rotational symmetry.',
          topics: [
            { title: 'Line Symmetry', content: 'A figure has line symmetry if a line divides it into two identical mirror halves. The dividing line is called the axis/line of symmetry. Examples: square has 4 lines of symmetry, rectangle has 2, equilateral triangle has 3, circle has infinite. Our faces are (nearly) symmetric!' },
            { title: 'Lines of Symmetry in Letters', content: 'Capital letters with symmetry: A, B, C, D, E, K, M, T, U, V, W, Y have horizontal or vertical symmetry. H, I, O, X have both. Z, N, S have no line of symmetry but have rotational symmetry (look same after 180° rotation). Useful in design and logos.' },
            { title: 'Reflection Symmetry', content: 'When you reflect a shape in a mirror, you get its mirror image. The mirror line is the line of symmetry. To draw reflection: each point of image is at same distance from mirror line as original point, on opposite side. MIRROR IMAGE reverses left and right.' },
          ],
          formulas: [
            { name: 'Lines of symmetry', formula: 'Regular polygon with n sides has n lines of symmetry', example: 'Equilateral triangle (n=3): 3 lines. Square (n=4): 4 lines. Regular hexagon (n=6): 6 lines' },
          ],
          experiments: [
            {
              title: 'Ink Blot Symmetry',
              objective: 'Create symmetric butterfly patterns using ink blots',
              materials: ['White paper', 'Paint or ink', 'Brush'],
              steps: ['Fold paper in half', 'Put paint drops on one half', 'Fold again and press firmly', 'Open and observe the symmetric pattern'],
              result: 'Both halves are mirror images — demonstrating line symmetry beautifully!',
            },
          ],
          videos: [{ title: 'Symmetry Class 6 NCERT', url: 'https://www.youtube.com/embed/oNMbUg-HBIA', duration: '12 min', source: 'Education' }],
          keyTerms: ['Line of symmetry', 'Mirror image', 'Reflection', 'Axis of symmetry', 'Rotational symmetry'],
          quickFacts: ['Snowflakes have 6-fold symmetry', 'Human body has bilateral symmetry', 'Most corporate logos use symmetry — it looks professional and balanced'],
        },
        {
          id: 'c6m14', chapterNo: 14, title: 'Practical Geometry',
          description: 'Constructing circles, perpendicular bisectors, angle bisectors and specific angles.',
          topics: [
            { title: 'Drawing a Circle', content: 'Using a compass: set compass to required radius, place needle at centre point, rotate compass fully. Always draw lightly first, then go over it. Key instruments: compass (for circles/arcs), ruler (for straight lines), protractor (for angles). Keep compass sharp and properly tightened.' },
            { title: 'Perpendicular Bisector', content: 'A line that is perpendicular (90°) to a segment AND passes through its midpoint. Construction: take any two points, draw arcs from both ends (radius > half the segment), the two arc intersections give the perpendicular bisector. Used in: equidistant points, right angles.' },
            { title: 'Constructing Angles', content: 'Angles of 60°, 30°, 90°, 120°, 45° can be constructed with compass and ruler (no protractor needed). 60°: construct equilateral triangle (using compass). 90°: perpendicular line. 30°: bisect 60°. 45°: bisect 90°. 120°: supplement of 60°.' },
          ],
          formulas: [],
          experiments: [],
          videos: [{ title: 'Practical Geometry Class 6 - Constructions', url: 'https://www.youtube.com/embed/mT8a4tWKFGU', duration: '20 min', source: 'Education' }],
          keyTerms: ['Compass', 'Perpendicular bisector', 'Angle bisector', 'Construction', 'Arc', 'Midpoint'],
          quickFacts: ['Ancient Greek mathematicians built all geometry using only compass and straightedge', 'Trisecting an angle (into 3 equal parts) with only compass+ruler is IMPOSSIBLE — proven in 1837!'],
        },
      ],
    },

    // ── SCIENCE ────────────────────────────────────────────────────
    {
      slug: 'science', name: 'Science', icon: '⚗️', color: '#0369a1', bg: '#eff6ff',
      description: 'Food, materials, plants, animals, light, electricity, environment',
      chapters: [
        {
          id: 'c6s2', chapterNo: 2, title: 'Components of Food',
          description: 'Nutrients in food — carbohydrates, proteins, fats, vitamins, minerals and balanced diet.',
          topics: [
            { title: 'Nutrients and Their Functions', content: 'Carbohydrates: give energy (rice, wheat, sugar, potato). Proteins: body building — growth and repair (dal, eggs, milk, meat). Fats: extra energy + protection (oil, butter, nuts). Vitamins: disease prevention, metabolism (fruits, vegetables). Minerals: bones, blood (calcium in milk, iron in spinach). Water: 60-70% of our body — essential for all functions.' },
            { title: 'Tests for Nutrients', content: 'Test for starch: add iodine solution → turns blue-black. Test for protein: add copper sulphate + sodium hydroxide → turns violet (Biuret test). Test for fat: rub on paper → leaves translucent spot. Test for sugar (glucose): add Benedict\'s solution, heat → turns orange-red.' },
            { title: 'Deficiency Diseases', content: 'Lack of nutrients causes diseases. Vitamin A deficiency → Night blindness. Vitamin C deficiency → Scurvy (bleeding gums). Vitamin D deficiency → Rickets (weak bones). Iron deficiency → Anaemia (pale skin, tiredness). Iodine deficiency → Goitre (swollen thyroid). Protein deficiency → Kwashiorkor (bloated belly in children).' },
            { title: 'Balanced Diet', content: 'A balanced diet contains ALL nutrients in right amounts. Include: cereals (carbs), pulses/meat (protein), milk/dairy (protein+calcium), fruits/vegetables (vitamins+minerals), small amount of fats. Avoid: too much sugar, too much fat, junk food. Eat variety of foods — no single food is complete!' },
          ],
          formulas: [
            { name: 'Iodine Test for Starch', formula: 'Food + Iodine solution → Blue-black colour = starch present', example: 'Rice: blue-black (starch present). Onion: no colour change (no starch)' },
          ],
          experiments: [
            {
              title: 'Testing Food for Starch and Protein',
              objective: 'Identify which foods contain starch and protein',
              materials: ['Rice', 'Dal', 'Egg', 'Potato', 'Banana', 'Iodine solution', 'Test tubes', 'Copper sulphate', 'Sodium hydroxide'],
              steps: ['Take small samples of each food in separate test tubes', 'Add 2 drops of iodine to each for starch test', 'Record which turn blue-black', 'Separately test with copper sulphate + NaOH for protein', 'Record results in a table'],
              result: 'Rice, potato, banana show blue-black (starch). Dal, egg show violet (protein). Tabulate all results!',
              safetyNote: 'Handle chemicals carefully. Wear gloves if available.',
            },
          ],
          videos: [{ title: 'Components of Food Class 6', url: 'https://www.youtube.com/embed/q1DRQHP8a8g', duration: '18 min', source: 'Education' }],
          keyTerms: ['Carbohydrates', 'Proteins', 'Fats', 'Vitamins', 'Minerals', 'Balanced diet', 'Deficiency disease', 'Nutrients'],
          quickFacts: ['Vitamin C was discovered by curing scurvy in sailors (1753)', 'Milk contains Vitamin D + Calcium + Protein — nearly a complete food', 'Human body has 206 bones — all need calcium!'],
        },
        {
          id: 'c6s5', chapterNo: 5, title: 'Separation of Substances',
          description: 'Methods of separating mixtures — threshing, winnowing, sieving, filtration, evaporation.',
          topics: [
            { title: 'Why Separation is Needed', content: 'Pure substances are rarely found in nature — most are mixtures. We need to separate to get useful components, remove impurities, and process food. Methods depend on properties: size, density, magnetic attraction, solubility, boiling point.' },
            { title: 'Handpicking, Threshing, Winnowing', content: 'Handpicking: manually remove unwanted items (remove stones from dal). Threshing: separate grain from stalks by beating on hard surface (paddy, wheat). Winnowing: use wind to separate light chaff from heavier grain (hold high, pour — wind blows chaff away). These are ancient Indian farming techniques.' },
            { title: 'Sieving and Filtration', content: 'Sieving: separate by particle size (flour sieve, construction sand). Fine particles fall through, coarse stay. Filtration: separate insoluble solid from liquid using filter paper/cloth. Example: filter dirty water — mud stays on filter, water passes through.' },
            { title: 'Evaporation and Distillation', content: 'Evaporation: heat a solution → liquid evaporates, solid remains. Used to recover salt from seawater (saltpans). Distillation: separate two liquids by boiling — the liquid with lower boiling point evaporates first, condenses and is collected. Used to purify water (distilled water).' },
          ],
          formulas: [],
          experiments: [
            {
              title: 'Making Salt from Saltwater (Evaporation)',
              objective: 'Separate salt from saltwater solution by evaporation',
              materials: ['Salt', 'Water', 'Beaker/pot', 'Stove/Bunsen burner', 'Evaporating dish'],
              steps: ['Dissolve 2 teaspoons of salt in water', 'Pour into evaporating dish', 'Heat gently until water evaporates', 'Observe white solid remaining'],
              result: 'Salt crystals remain after water evaporates — exactly how sea salt is made!',
              safetyNote: 'Handle hot equipment carefully. Do not touch evaporating dish when hot.',
            },
          ],
          videos: [{ title: 'Separation of Substances Class 6', url: 'https://www.youtube.com/embed/T_E6oFHHrWY', duration: '16 min', source: 'Education' }],
          keyTerms: ['Threshing', 'Winnowing', 'Sieving', 'Filtration', 'Evaporation', 'Distillation', 'Mixture', 'Pure substance'],
          quickFacts: ['Sea salt is made by evaporating seawater in saltpans', 'Distilled water has no minerals — not ideal for drinking long-term', 'Milk is homogenized to prevent cream from separating'],
        },
        {
          id: 'c6s7', chapterNo: 7, title: 'Getting to Know Plants',
          description: 'Types of plants, parts of a plant, roots, stems, leaves and photosynthesis.',
          topics: [
            { title: 'Types of Plants', content: 'Herbs: small, soft, green stems (tulsi, mint, wheat). Shrubs: medium-sized, woody stems, branches near base (rose, cotton, mehendi). Trees: tall, thick woody trunk, branches high up (mango, neem, banyan). Climbers: need support to grow (money plant, pea, grapevine). Creepers: grow along ground (pumpkin, watermelon).' },
            { title: 'The Root System', content: 'Taproot: one main root with smaller branch roots (mango, rose, mustard). Fibrous roots: bunch of thin roots, no main root (grass, wheat, rice, maize). Functions: absorb water and minerals from soil, anchor plant, store food (carrots, radish = modified taproots). Root hair cells increase surface area.' },
            { title: 'The Stem', content: 'Functions: supports leaves and flowers, transports water and nutrients. Conducting vessels: xylem (water up) and phloem (food down). Modified stems: potato (underground), ginger (rhizome), onion (bulb), cactus (stores water). Experiment: put celery/white flower in coloured water — colour travels up stem through xylem.' },
            { title: 'Leaves and Photosynthesis', content: 'Leaf structure: blade (lamina), petiole (stalk), midrib, veins (network or parallel). Stomata: tiny pores on leaf surface for gas exchange. PHOTOSYNTHESIS: leaves use sunlight, water (from roots), CO₂ (from air) to make glucose + oxygen. 6CO₂ + 6H₂O + sunlight → C₆H₁₂O₆ + 6O₂. Only green plants can do this — they are PRODUCERS.' },
          ],
          formulas: [
            { name: 'Photosynthesis Equation', formula: 'CO₂ + H₂O + Sunlight → Glucose + O₂', example: 'Plants absorb CO₂ we breathe out, and release O₂ we breathe in — perfect cycle!', note: 'Chlorophyll in leaves captures sunlight energy' },
          ],
          experiments: [
            {
              title: 'Water Transport in Stem (Xylem experiment)',
              objective: 'Show how water moves up the stem using coloured water',
              materials: ['White carnation flower or celery stalk', 'Water', 'Red/blue food coloring', 'Glass', 'Knife'],
              steps: ['Add food coloring to water', 'Trim stem bottom at angle', 'Place stem in colored water', 'Wait 4-6 hours or overnight', 'Observe color in leaves/petals', 'Cut stem and see colored dots (xylem vessels)'],
              result: 'Colored water travels up through xylem, tinting the flower/leaves. Proves water transport through stem!',
            },
          ],
          videos: [{ title: 'Parts of a Plant Class 6', url: 'https://www.youtube.com/embed/9UvtU8oR6Og', duration: '15 min', source: 'Education' }],
          keyTerms: ['Taproot', 'Fibrous root', 'Xylem', 'Phloem', 'Chlorophyll', 'Photosynthesis', 'Stomata', 'Lamina', 'Midrib'],
          quickFacts: ['A single large tree produces enough O₂ for 4 people per day!', 'Roots of a rye plant can extend 600 km total if laid end-to-end', 'Banyan tree (national tree of India) can spread over 1 hectare'],
        },
        {
          id: 'c6s8', chapterNo: 8, title: 'Body Movements',
          description: 'Types of joints in the human body, skeleton, and movement in animals.',
          topics: [
            { title: 'Types of Joints in Human Body', content: 'Joints are where two bones meet. Ball and socket joint: allows all-directional movement (shoulder, hip). Hinge joint: like a door hinge — only bends and straightens (knee, elbow, fingers). Pivot joint: rotational movement (neck — turns head). Fixed joint: no movement (skull bones). Gliding joint: slight movement (wrist, ankle).' },
            { title: 'Human Skeleton', content: '206 bones in adult human body. Skull: 22 bones, protects brain. Spine (vertebral column): 33 vertebrae, S-shaped, supports body and protects spinal cord. Rib cage: 12 pairs of ribs + sternum, protects heart and lungs. Cartilage: soft, flexible — at ear, nose, knee joints. Functions: support, protection, movement, blood cell production.' },
            { title: 'Movement in Animals', content: 'Cockroach: 3 pairs of legs + 2 pairs of wings. Earthworm: no skeleton, uses muscles and setae (tiny bristles) to grip soil. Snail: uses muscular foot, leaves trail of slime. Fish: S-shaped body movement, pectoral and tail fins for steering. Birds: hollow bones (light), powerful chest muscles for wing flapping. Snake: S-shaped movement using ribs and muscles.' },
          ],
          formulas: [],
          experiments: [],
          videos: [{ title: 'Body Movements Class 6', url: 'https://www.youtube.com/embed/RL_R9XYOVQA', duration: '14 min', source: 'Education' }],
          keyTerms: ['Ball and socket joint', 'Hinge joint', 'Pivot joint', 'Fixed joint', 'Cartilage', 'Vertebral column', 'Rib cage', 'Sternum'],
          quickFacts: ['The femur (thigh bone) is the longest and strongest bone', 'Babies are born with ~300 bones — many fuse as they grow', 'Birds have hollow bones to reduce weight for flight'],
        },
        {
          id: 'c6s11', chapterNo: 11, title: 'Light, Shadows and Reflections',
          description: 'How shadows form, transparent vs opaque materials, reflection of light and mirrors.',
          topics: [
            { title: 'Transparent, Translucent and Opaque', content: 'Transparent: light passes through completely (clear glass, water). You can see clearly through it. Translucent: some light passes, but scattered (frosted glass, oiled paper, thin cloth). Blurry vision through it. Opaque: no light passes (wood, metal, stone). Shadow formed behind it.' },
            { title: 'Shadow Formation', content: 'Shadow forms when opaque object blocks light. Shadow is always on opposite side from light source. Bigger/closer object = larger shadow. Farther object = smaller shadow. Shadow shape shows silhouette of object. Shadows show direction of light source.' },
            { title: 'Pinhole Camera', content: 'A dark box with a tiny pinhole on one side. Light rays from object pass through pinhole and form an INVERTED, diminished image on the screen opposite. Proves light travels in straight lines. The image is inverted (upside down) because rays from top of object go to bottom of screen.' },
            { title: 'Reflection', content: 'Reflection: bouncing back of light from a surface. Regular (specular) reflection: smooth surface (mirror) → clear image. Irregular (diffuse) reflection: rough surface → no clear image. Plane mirror forms virtual, erect (upright), same size, laterally inverted image. Lateral inversion: left appears as right in mirror.' },
          ],
          formulas: [
            { name: 'Law of Reflection', formula: 'Angle of incidence = Angle of reflection', example: 'Light hits mirror at 40° → reflects at 40° (both measured from normal)' },
          ],
          experiments: [
            {
              title: 'Making a Pinhole Camera',
              objective: 'Build a pinhole camera and observe inverted image',
              materials: ['Shoebox with lid', 'Black paint', 'Pin', 'Tracing paper/wax paper', 'Tape', 'Cutter'],
              steps: ['Paint inside of box black', 'Make tiny pinhole at one end', 'Cut small rectangle at other end, cover with tracing paper (screen)', 'Point pinhole at bright object (window/candle)', 'Look at tracing paper screen in dark room'],
              result: 'Inverted image of outside appears on tracing paper — just like an old camera!',
            },
          ],
          videos: [{ title: 'Light Shadows Reflections Class 6', url: 'https://www.youtube.com/embed/qJGPsM1OgO8', duration: '16 min', source: 'Education' }],
          keyTerms: ['Transparent', 'Translucent', 'Opaque', 'Shadow', 'Reflection', 'Lateral inversion', 'Pinhole camera', 'Regular reflection'],
          quickFacts: ['Speed of light = 3×10⁸ m/s (300,000 km per second)', 'Light from Sun takes 8 minutes to reach Earth', 'Moonlight is actually reflected sunlight — Moon has no light of its own!'],
        },
        {
          id: 'c6s12', chapterNo: 12, title: 'Electricity and Circuits',
          description: 'Electric circuit, cells, switches, conductors and insulators.',
          topics: [
            { title: 'Electric Circuit', content: 'An electric circuit is a closed path through which current can flow. Components: cell/battery (source of electrical energy), wire (conductor), bulb (load), switch (control). Current flows from positive terminal of cell, through circuit, back to negative terminal. Circuit must be CLOSED (complete) for current to flow.' },
            { title: 'Cell and Battery', content: 'Cell: device that converts chemical energy to electrical energy. Has positive (+) and negative (-) terminals. Battery: two or more cells connected. When cells connected in series (+ to -): voltages add. The liquid or paste inside cell is the electrolyte. Cell symbol: long line (+) and short thick line (-).' },
            { title: 'Conductors and Insulators', content: 'Conductors: allow current to pass through. Most metals: copper, iron, aluminium, silver. Graphite (pencil lead) also conducts. Insulators: do not allow current. Plastic, rubber, wood, glass, cloth. Uses: copper wires carry current; plastic covering insulates and protects from shocks.' },
            { title: 'Switch and Fuse', content: 'Switch: controls the flow of current. Open switch = broken circuit = no current. Closed switch = complete circuit = current flows. Fuse: a safety device — thin wire that melts if too much current flows, breaking the circuit and preventing fire/damage. Key safety principle: never touch live wires!' },
          ],
          formulas: [],
          experiments: [
            {
              title: 'Testing Conductors and Insulators',
              objective: 'Identify which materials conduct electricity',
              materials: ['Battery', 'Bulb + holder', 'Connecting wires', 'Various materials: coin, pencil, rubber, plastic, key, cloth, spoon'],
              steps: ['Set up a simple circuit: battery → wire → bulb → wire back to battery (leave gap)', 'Connect each material in the gap one by one', 'Observe if bulb lights up', 'Record results in a table'],
              result: 'Metals and graphite (pencil): bulb lights. Rubber, plastic, cloth: bulb doesn\'t light. Conductors vs insulators identified!',
              safetyNote: 'Use only small batteries (1.5V). Never use mains electricity for experiments.',
            },
          ],
          videos: [{ title: 'Electric Circuit Class 6', url: 'https://www.youtube.com/embed/NfHKSGCo4C0', duration: '15 min', source: 'Education' }],
          keyTerms: ['Circuit', 'Cell', 'Battery', 'Conductor', 'Insulator', 'Switch', 'Current', 'Terminal'],
          quickFacts: ['Benjamin Franklin proved lightning is electricity (1752)', 'Copper is the most common electrical conductor', 'India generates electricity mainly from thermal, hydro and nuclear power plants'],
        },
        {
          id: 'c6s13', chapterNo: 13, title: 'Fun with Magnets',
          description: 'Properties of magnets, magnetic poles, compass, Earth\'s magnetism and uses.',
          topics: [
            { title: 'Properties of Magnets', content: 'Magnets attract iron, nickel and cobalt objects. The strongest attraction is at the poles (ends). Types: natural magnets (magnetite/lodestone), artificial magnets (bar, horseshoe, ring, electromagnet). A freely suspended magnet always aligns in North-South direction — basis of compass.' },
            { title: 'Magnetic Poles', content: 'Every magnet has two poles: North (N) and South (S). Poles always exist in pairs — cannot separate (break a magnet → two smaller magnets each with N and S). Like poles REPEL (N-N, S-S). Unlike poles ATTRACT (N-S). The pole pointing to Earth\'s geographic north is called North pole.' },
            { title: 'Magnetic Compass', content: 'A compass contains a small magnetised needle freely pivoting on a pin. The needle aligns with Earth\'s magnetic field — North pole pointing to Earth\'s geographic north. Used for navigation for thousands of years. The compass needle is a tiny bar magnet. Earth itself is a giant magnet!' },
            { title: 'Uses of Magnets', content: 'Compasses (navigation), electric motors, generators, speakers, hard drives (magnetic storage), MRI machines in hospitals, scrapyards (magnetic cranes), credit cards (magnetic strip), doorbells, refrigerator door seals. Electromagnets (coil + iron core + current) are used where we need magnetism that can be switched on/off.' },
          ],
          formulas: [],
          experiments: [
            {
              title: 'Making a Compass',
              objective: 'Make a simple compass using a magnetised needle',
              materials: ['Sewing needle', 'Bar magnet', 'Cork disk', 'Bowl of water'],
              steps: ['Stroke needle 50 times in one direction with one pole of bar magnet', 'Push needle through cork disk', 'Float cork + needle in water bowl', 'Observe which direction needle settles', 'Compare with actual North direction'],
              result: 'The magnetised needle aligns North-South, just like a real compass!',
            },
          ],
          videos: [{ title: 'Fun with Magnets Class 6', url: 'https://www.youtube.com/embed/WDcXVLxMksc', duration: '13 min', source: 'Education' }],
          keyTerms: ['Magnet', 'Poles', 'Magnetic force', 'Compass', 'Electromagnet', 'Magnetite', 'Like poles', 'Unlike poles'],
          quickFacts: ['Earth\'s magnetic poles shift slightly every year', 'MRI machines use super-strong magnets (50,000 times Earth\'s magnetic field)', 'Migratory birds have magnetite in their beaks to detect Earth\'s magnetic field!'],
        },
      ],
    },

    // ── SOCIAL SCIENCE (HISTORY) ───────────────────────────────────
    {
      slug: 'social-science', name: 'Social Science', icon: '🌍', color: '#065f46', bg: '#d1fae5',
      description: 'History, geography, civics of ancient India and the world',
      chapters: [
        {
          id: 'c6ss2', chapterNo: 2, title: 'On the Trail of the Earliest People',
          description: 'Hunter-gatherers, stone age, cave paintings and life of early humans.',
          topics: [
            { title: 'Hunter-Gatherers', content: 'The earliest humans lived 2 million years ago. They were hunter-gatherers — they hunted animals and gathered fruits, berries, roots for food. They did NOT grow crops or keep animals. They moved from place to place following animals and seasons. They lived in rock shelters and caves.' },
            { title: 'Stone Age Tools', content: 'Earliest tools were made from stone — sharpened by hitting two stones together (knapping). Tools: choppers (cutting), hand axes (digging, butchering), scrapers (preparing animal skins), blades (cutting). Over time, tools became smaller and more refined. Stone tools found in India at Bhimbetka, Hunsgi valley.' },
            { title: 'Fire and Communication', content: 'Discovery of fire was revolutionary — for warmth, cooking, protection from animals, light in dark caves. Cooking made food safer and more nutritious. Communication: earliest humans communicated through gestures, sounds, and eventually language. Cave paintings (like Bhimbetka, Madhya Pradesh) — 30,000 years old — show animals, hunting scenes, human figures.' },
          ],
          formulas: [],
          experiments: [],
          videos: [{ title: 'Earliest Humans Class 6 History', url: 'https://www.youtube.com/embed/4B7hkCZmTTg', duration: '18 min', source: 'Education' }],
          keyTerms: ['Hunter-gatherer', 'Stone age', 'Cave paintings', 'Nomadic', 'Bhimbetka', 'Fire', 'Knapping'],
          quickFacts: ['Bhimbetka (MP) has cave paintings 30,000 years old — older than the Taj Mahal by 29,700 years!', 'Homo sapiens (modern humans) first appeared about 300,000 years ago', 'The Stone Age ended when humans started using metal tools'],
        },
        {
          id: 'c6ss4', chapterNo: 4, title: 'In the Earliest Cities',
          description: 'Harappan civilisation — town planning, trade, crafts and the mystery of its decline.',
          topics: [
            { title: 'Harappan Civilisation', content: 'Also called Indus Valley Civilisation (2600-1900 BCE). Spread across present-day Pakistan, northwest India and Afghanistan. Major cities: Harappa (Punjab, Pakistan), Mohenjo-daro (Sindh, Pakistan), Lothal (Gujarat), Kalibangan (Rajasthan), Dholavira (Gujarat). About 5000 years old — one of the world\'s earliest urban civilisations.' },
            { title: 'Town Planning', content: 'Advanced for its time. Cities had planned streets at right angles (grid pattern). Two parts: Citadel (higher area for important buildings) and Lower Town (residential). Features: underground drains (unique!), wells, brick houses with flat roofs, standardized bricks (same size everywhere), granaries (food storage), Great Bath at Mohenjo-daro.' },
            { title: 'Trade and Crafts', content: 'Harappans were skilled traders and craftspeople. Crafts: pottery (wheel-made), beads (carnelian, lapis lazuli), weights and measures (standardized — very accurate), seals (used in trade, had animal engravings + undeciphered script), copper/bronze tools, cotton textiles. Trade with Mesopotamia (modern Iraq) by sea.' },
            { title: 'Mystery of Decline', content: 'Harappan civilisation declined around 1900 BCE. Theories: floods, droughts (climate change), earthquakes, Aryan invasion (now doubted). Cities were abandoned gradually. The Harappan script has NOT been deciphered yet — a major archaeological mystery. Even today, we don\'t know exactly what happened!' },
          ],
          formulas: [],
          experiments: [],
          videos: [{ title: 'Harappan Civilisation Class 6', url: 'https://www.youtube.com/embed/N2wvGFHb4i4', duration: '22 min', source: 'Education' }],
          keyTerms: ['Harappa', 'Mohenjo-daro', 'Citadel', 'Great Bath', 'Seal', 'Granary', 'Town planning', 'Indus script'],
          quickFacts: ['Harappan bricks had ratio 1:2:4 (height:width:length) — same ratio as modern bricks!', 'Great Bath at Mohenjo-daro is 12m long, 7m wide — 4000 years old!', 'Harappan script has ~400 symbols — still undeciphered after 100 years of attempts'],
        },
        {
          id: 'c6ss8', chapterNo: 8, title: 'Ashoka: The Emperor Who Gave Up War',
          description: 'The Maurya Empire, Ashoka\'s transformation, Dhamma and its spread across Asia.',
          topics: [
            { title: 'The Maurya Empire', content: 'Founded by Chandragupta Maurya (321 BCE). Chandragupta defeated the Nanda dynasty with help of his advisor Chanakya (author of Arthashastra). First empire to unify most of Indian subcontinent. Pataliputra (modern Patna) was the capital. Ashoka was the third and greatest Mauryan emperor.' },
            { title: 'Kalinga War and Transformation', content: 'Ashoka was a mighty warrior king. In 261 BCE, he conquered Kalinga (modern Odisha). The war was brutal — 100,000 killed, 150,000 captured. Seeing the death and suffering, Ashoka was deeply moved. He gave up violence forever and adopted Buddhism. This transformation is one of history\'s most remarkable changes of heart.' },
            { title: 'Dhamma — Ashoka\'s Principles', content: 'Ashoka promoted DHAMMA (Pali for Dharma) — not Buddhism directly but moral principles. Key principles: non-violence (ahimsa), respect for elders and teachers, compassion for all living beings, tolerance for different religions, generous to poor. He sent missionaries to spread these ideas — including his own son Mahendra and daughter Sanghamitra to Sri Lanka.' },
            { title: 'Ashoka\'s Pillars and Edicts', content: 'Ashoka carved his messages on polished stone pillars and rock surfaces across his empire. These are called Ashoka\'s Edicts. Found across India, Nepal, Afghanistan, Pakistan. The Lion Capital (4 lions) on top of Sarnath pillar is India\'s national emblem. The Dhamma Chakra (wheel) on it is on the Indian flag!' },
          ],
          formulas: [],
          experiments: [],
          videos: [{ title: 'Ashoka the Great Class 6', url: 'https://www.youtube.com/embed/ySdlnIUiXhU', duration: '20 min', source: 'Education' }],
          keyTerms: ['Chandragupta', 'Chanakya', 'Arthashastra', 'Kalinga war', 'Dhamma', 'Ashoka\'s edicts', 'Lion capital', 'Dhamma Chakra'],
          quickFacts: ['India\'s national emblem is from Ashoka\'s Sarnath pillar — 2300 years old!', 'The Dhamma Chakra on the Indian flag has 24 spokes — one for each hour of the day', 'Ashoka sent Buddhist missionaries to Sri Lanka, Central Asia, Greece, Egypt'],
        },
      ],
    },

    // ── ENGLISH ────────────────────────────────────────────────────
    {
      slug: 'english', name: 'English', icon: '📖', color: '#1e3a5f', bg: '#eff6ff',
      description: 'Literature, comprehension, grammar and creative writing',
      chapters: [
        {
          id: 'c6e2', chapterNo: 2, title: 'How the Dog Found Himself a New Master',
          description: 'A folk tale about loyalty, cleverness and finding the strongest master — lesson in values.',
          topics: [
            { title: 'Story Summary', content: 'The dog used to be a free animal. He decided to find the strongest master. He first served the wolf — then found a bear stronger. Then served the bear — found a lion stronger. Then served the lion — but one day the lion was afraid of a man! So the dog realized man is the strongest. Since then, dogs live with and serve humans.' },
            { title: 'Theme and Values', content: 'Theme: Loyalty and finding one\'s place. The dog\'s journey teaches us that true strength is not just physical. Loyalty, once given, should be honoured. The story explains the bond between humans and dogs — a friendly explanation of how dogs became domesticated.' },
            { title: 'Grammar: Nouns and Pronouns', content: 'Nouns: names of persons, places, things, ideas. Types: Common (dog, man), Proper (India, Delhi), Abstract (loyalty, courage), Collective (pack, herd, flock). Pronouns replace nouns to avoid repetition. Personal: I, you, he, she, it, we, they. Possessive: my, your, his, her, their.' },
          ],
          formulas: [],
          experiments: [],
          videos: [{ title: 'How the Dog Found a New Master - Class 6 English', url: 'https://www.youtube.com/embed/xm3v-yBj9pM', duration: '10 min', source: 'Education' }],
          keyTerms: ['Folk tale', 'Loyalty', 'Noun', 'Pronoun', 'Common noun', 'Proper noun', 'Abstract noun'],
          quickFacts: ['Dogs were domesticated from wolves about 15,000 years ago', 'Dogs have been human companions longer than any other animal', 'The story teaches us that humans are the most clever beings'],
        },
        {
          id: 'c6e3', chapterNo: 3, title: 'Taro\'s Reward',
          description: 'A Japanese folk tale about respect for parents and reward for virtuous actions.',
          topics: [
            { title: 'Story Summary', content: 'Taro was a poor woodcutter who worked hard but could not afford rice wine for his old father. One day while working in the mountains, he heard water and found a magical waterfall. Its water tasted like rice wine. He gave it to his father who felt better immediately. When villagers tried to take water — it turned plain. The emperor rewarded Taro\'s filial devotion.' },
            { title: 'Values and Moral', content: 'Filial piety: respect and care for parents is rewarded. Hard work and honesty are virtuous. Greed is punished — the villagers got only plain water. The story comes from Japan but the values are universal — India also has the concept of "Matri devo bhava, Pitri devo bhava".' },
            { title: 'Grammar: Adjectives', content: 'Adjectives describe nouns: big, small, red, beautiful, brave. Types: Descriptive (tall mountain), Numeral (three birds), Quantitative (some water, much effort), Demonstrative (this cup, those birds). Degrees: Positive (tall), Comparative (taller), Superlative (tallest). Adjectives make writing vivid and precise.' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['Filial piety', 'Adjective', 'Degrees of comparison', 'Folk tale', 'Moral'],
          quickFacts: ['Filial piety (respect for parents) is core to many Asian cultures', 'Japan has a festival "Respect for the Aged Day" as a national holiday'],
        },
      ],
    },

    // ── HINDI ──────────────────────────────────────────────────────
    {
      slug: 'hindi', name: 'Hindi', icon: '📝', color: '#991b1b', bg: '#fee2e2',
      description: 'हिंदी साहित्य, व्याकरण और रचनात्मक लेखन',
      chapters: [
        {
          id: 'c6h2', chapterNo: 2, title: 'बचपन',
          description: 'बचपन की यादें, खेल और मस्ती — कृष्णा सोबती की कविता पर आधारित।',
          topics: [
            { title: 'कविता का सारांश', content: '"बचपन" कृष्णा सोबती की आत्मकथात्मक रचना है। इसमें बचपन की यादें — खेल, खाना, मौसम, दोस्त — बहुत सजीव तरीके से वर्णित हैं। लेखिका बताती हैं कि बचपन में रेनकोट का क्या महत्त्व था, क्या-क्या खाने का मन करता था। पुराने दिनों की मासूम खुशियाँ इस पाठ में जीवित हो उठती हैं।' },
            { title: 'व्याकरण: संज्ञा के भेद', content: 'संज्ञा = किसी व्यक्ति, स्थान, वस्तु या भाव का नाम। व्यक्तिवाचक: किसी एक विशेष का नाम — राम, दिल्ली, गंगा। जातिवाचक: पूरी जाति का नाम — लड़का, नदी, पहाड़। भाववाचक: गुण या भाव — ईमानदारी, खुशी, प्रेम। समूहवाचक: समूह का नाम — भीड़, सेना, दल। द्रव्यवाचक: पदार्थ का नाम — सोना, पानी, दूध।' },
            { title: 'भाषा और अभिव्यक्ति', content: 'पाठ में बचपन की मासूमियत को सरल भाषा में व्यक्त किया गया है। मुहावरे और लोकोक्तियाँ भाषा को जीवंत बनाते हैं। पत्र लेखन: अपनी दादी/नानी को पत्र लिखें — बचपन की एक यादगार घटना का वर्णन करते हुए। वर्णनात्मक लेखन में विवरण महत्त्वपूर्ण है।' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['संज्ञा', 'व्यक्तिवाचक', 'जातिवाचक', 'भाववाचक', 'आत्मकथा', 'वर्णनात्मक लेखन'],
          quickFacts: ['कृष्णा सोबती हिंदी की प्रसिद्ध लेखिका थीं — 2017 में ज्ञानपीठ पुरस्कार से सम्मानित', 'आत्मकथा में लेखक अपनी जीवनी स्वयं लिखता है'],
        },
        {
          id: 'c6h3', chapterNo: 3, title: 'नादान दोस्त',
          description: 'प्रेमचंद की कहानी — जीवों के प्रति दया और नादानी में की गई गलतियों की सीख।',
          topics: [
            { title: 'कहानी का सारांश', content: '"नादान दोस्त" प्रेमचंद की अत्यंत मार्मिक बाल कहानी है। केशव और श्यामा को एक कार्निस पर चिड़िया का घोंसला मिलता है। बच्चे उत्सुकता में अंडों की देखभाल करने की कोशिश करते हैं — पर उनकी नादानी से अंडे टूट जाते हैं और चिड़िया घोंसला छोड़ देती है। सीख: अच्छे इरादे भी गलत कदम उठाने पर नुकसान पहुँचा सकते हैं।' },
            { title: 'प्रेमचंद और उनका साहित्य', content: 'मुंशी प्रेमचंद (1880-1936) हिंदी और उर्दू के महान कथाकार। उन्हें "उपन्यास सम्राट" कहा जाता है। प्रमुख रचनाएँ: गोदान, गबन, निर्मला, प्रेमाश्रम (उपन्यास); पंच परमेश्वर, ईदगाह, कफ़न (कहानियाँ)। उनका साहित्य ग्रामीण जीवन, गरीबी, नारी दशा पर केंद्रित है।' },
            { title: 'व्याकरण: क्रिया और काल', content: 'क्रिया = वह शब्द जो कार्य करना या होना दर्शाए। भूतकाल (Past): वह गया। वर्तमान काल (Present): वह जाता है/जा रहा है। भविष्यकाल (Future): वह जाएगा। अकर्मक क्रिया: बिना कर्म के (वह सोता है)। सकर्मक क्रिया: कर्म के साथ (वह रोटी खाता है)।' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['प्रेमचंद', 'कहानी', 'नादानी', 'क्रिया', 'काल', 'अकर्मक', 'सकर्मक'],
          quickFacts: ['प्रेमचंद ने 300 से अधिक कहानियाँ और 14 उपन्यास लिखे', '"ईदगाह" (1933) प्रेमचंद की सबसे प्रसिद्ध कहानियों में से एक है'],
        },
      ],
    },
  ],
}

export const ALL_CLASS6_EXTRA_DATA: ClassData[] = [CLASS6_EXTRA]
