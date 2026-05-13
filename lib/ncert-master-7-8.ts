// lib/ncert-master-7-8.ts
// Class 7 & 8 Rich Chapter Content — Topics, Formulas, Experiments, Videos

import type { ClassData } from './ncert-master'

export const CLASS7: ClassData = {
  classLevel: '7', label: 'Class 7', board: ['CBSE','ICSE','State'],
  description: 'Integers, Fractions, Science processes, Medieval History',
  subjects: [
    {
      slug: 'mathematics', name: 'Mathematics', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Integers, fractions, algebraic expressions, triangles, data handling',
      chapters: [
        {
          id: 'c7m4', chapterNo: 4, title: 'Simple Equations',
          description: 'Setting up and solving linear equations in one variable using transposition.',
          topics: [
            { title: 'What is an Equation?', content: 'An equation is a statement that two expressions are equal. It has two sides: LHS (Left Hand Side) and RHS (Right Hand Side) connected by "=" sign. Example: 2x + 3 = 11. The value of x that makes this true is called the solution or root.' },
            { title: 'Solving by Transposition', content: 'Transposition means moving a term from one side to another with a sign change. Addition becomes subtraction, multiplication becomes division. Rule: Whatever you do to one side, do the same to the other side to keep equation balanced.' },
            { title: 'Setting Up Equations', content: 'Real-life problems can be converted to equations. Step 1: Choose a variable for the unknown. Step 2: Write conditions as equation. Step 3: Solve. Example: "Twice a number plus 5 equals 17" → 2x + 5 = 17 → x = 6.' },
            { title: 'Applications', content: 'Equations are used everywhere: calculating prices, distances, time, age problems, perimeter problems. Example: Perimeter of rectangle = 2(l+b). If P=30 and l=8, find b: 2(8+b)=30 → 8+b=15 → b=7 cm.' },
          ],
          formulas: [
            { name: 'Linear Equation', formula: 'ax + b = c  →  x = (c - b) / a', example: '3x + 4 = 19 → x = (19-4)/3 = 15/3 = 5', note: 'a ≠ 0' },
            { name: 'Transposition Rule', formula: 'If ax + b = c, then ax = c - b (b moves to RHS with -ve sign)', example: '2x + 7 = 15 → 2x = 15-7 = 8 → x = 4' },
            { name: 'Check Solution', formula: 'Substitute x back in original equation → LHS must equal RHS', example: 'x=5 in 3x+4=19: 3(5)+4=15+4=19 ✓' },
          ],
          experiments: [],
          videos: [
            { title: 'Simple Equations Class 7 - Full Chapter', url: 'https://www.youtube.com/embed/9DxrF6Ttws4', duration: '20 min', source: 'Education' },
            { title: 'Setting Up Equations from Word Problems', url: 'https://www.youtube.com/embed/UfgT-rnRqzI', duration: '15 min', source: 'Khan Academy' },
          ],
          keyTerms: ['Equation', 'Variable', 'Solution', 'Transposition', 'LHS', 'RHS', 'Balanced equation'],
          quickFacts: ['Equations were first systematically solved by Al-Khwarizmi in 820 CE', 'His book "Al-Kitab al-mukhtasar" is origin of word "Algebra"', 'Equations are used in every field — medicine, economics, engineering'],
          vedicTricks: [
            { trick: 'Check answer instantly by substituting back', example: '2x+5=17, x=6: 2(6)+5=17 ✓ — saves time in exams' },
          ],
        },
        {
          id: 'c7m8', chapterNo: 8, title: 'Comparing Quantities',
          description: 'Ratios, percentages, profit-loss, simple interest — practical everyday math.',
          topics: [
            { title: 'Ratio and Proportion', content: 'Ratio compares two quantities of same type. a:b = a/b. Proportion means two ratios are equal: a:b = c:d or a/b = c/d. Cross multiplication: ad = bc. Unitary method: find value of one unit first, then multiply.' },
            { title: 'Percentage', content: 'Percentage means "per hundred". x% = x/100. To convert fraction to %: multiply by 100. To find x% of y: (x/100)×y. To find what % is a of b: (a/b)×100. Used in marks, discounts, tax, interest everywhere.' },
            { title: 'Profit and Loss', content: 'Cost Price (CP) = amount paid to buy. Selling Price (SP) = amount received on sale. Profit = SP - CP (when SP > CP). Loss = CP - SP (when CP > SP). Profit% = (Profit/CP)×100. Loss% = (Loss/CP)×100.' },
            { title: 'Simple Interest', content: 'SI = (Principal × Rate × Time) / 100. P = Principal (amount borrowed/invested). R = Rate of interest per year (%). T = Time in years. Amount = P + SI. Used in banks, loans, savings.' },
          ],
          formulas: [
            { name: 'Percentage', formula: 'x% of y = (x/100) × y', example: '15% of 400 = (15/100)×400 = 60', note: 'Very commonly used in daily life' },
            { name: 'Profit %', formula: 'Profit% = (Profit / CP) × 100 = (SP-CP)/CP × 100', example: 'CP=₹200, SP=₹250: Profit=₹50, Profit%=50/200×100=25%' },
            { name: 'Loss %', formula: 'Loss% = (Loss / CP) × 100', example: 'CP=₹500, SP=₹400: Loss=₹100, Loss%=20%' },
            { name: 'Simple Interest', formula: 'SI = P × R × T / 100', example: 'P=₹1000, R=5%, T=3yr: SI=1000×5×3/100=₹150', note: 'Amount = P + SI' },
            { name: 'Find SP from Profit%', formula: 'SP = CP × (100 + Profit%) / 100', example: 'CP=₹800, Profit%=25: SP=800×125/100=₹1000' },
          ],
          experiments: [],
          videos: [
            { title: 'Profit Loss Percentage - Class 7', url: 'https://www.youtube.com/embed/F4e8ANhMBVo', duration: '18 min', source: 'Education' },
            { title: 'Simple Interest Formula Explained', url: 'https://www.youtube.com/embed/bx8X_GaiGAc', duration: '12 min', source: 'Khan Academy' },
          ],
          keyTerms: ['Ratio', 'Proportion', 'Percentage', 'Cost price', 'Selling price', 'Profit', 'Loss', 'Principal', 'Simple interest'],
          quickFacts: ['India\'s GST is a % tax on goods and services', 'Bank savings account gives 3-6% interest per year', 'Discount on sale = Loss for shopkeeper = Gain for buyer'],
          vedicTricks: [
            { trick: 'Calculate 15% quickly: find 10%, then add half of it', example: '15% of 360 = 36 + 18 = 54. Or: 15% of 200 = 20+10=30' },
            { trick: 'Calculate 25% quickly: divide by 4', example: '25% of 480 = 480/4 = 120' },
          ],
        },
        {
          id: 'c7m11', chapterNo: 11, title: 'Perimeter and Area',
          description: 'Area of triangles, parallelograms and circles — with real-life applications.',
          topics: [
            { title: 'Area of Triangle', content: 'Area = ½ × base × height. Height must be perpendicular to the base. Any side can be taken as base. The triangle can be right-angled, acute or obtuse — formula remains same. For right triangle: area = ½ × leg1 × leg2.' },
            { title: 'Area of Parallelogram', content: 'Area = base × height. Height is perpendicular distance between parallel sides (NOT the slant side). A rectangle is a special parallelogram with height = breadth. Important: diagonal of parallelogram divides it into 2 equal triangles.' },
            { title: 'Circles — Circumference and Area', content: 'Circle: all points at equal distance (radius r) from center. Circumference (perimeter) = 2πr. Area = πr². π ≈ 22/7 ≈ 3.14159. Diameter d = 2r. Semi-circle: perimeter = πr + 2r, area = πr²/2.' },
          ],
          formulas: [
            { name: 'Area of Triangle', formula: 'A = ½ × b × h', example: 'b=10cm, h=6cm: A = ½×10×6 = 30 cm²', note: 'h is perpendicular height, not slant' },
            { name: 'Area of Parallelogram', formula: 'A = b × h', example: 'b=8cm, h=5cm: A = 8×5 = 40 cm²' },
            { name: 'Circumference of Circle', formula: 'C = 2πr = πd', example: 'r=7cm: C = 2×22/7×7 = 44 cm' },
            { name: 'Area of Circle', formula: 'A = πr²', example: 'r=7cm: A = 22/7×49 = 154 cm²' },
            { name: 'Area of Semi-circle', formula: 'A = πr²/2', example: 'r=7: A = 154/2 = 77 cm²' },
          ],
          experiments: [
            {
              title: 'Verify Area of Circle Using Grid Paper',
              objective: 'Approximately verify the formula A = πr² by counting squares',
              materials: ['Grid paper (cm squares)', 'Compass', 'Pencil', 'Calculator'],
              steps: [
                'Draw a circle of radius 5cm on grid paper using compass',
                'Count all complete squares inside the circle',
                'Count squares more than half inside — add them as 1 each',
                'Count squares less than half inside — ignore them',
                'Total count ≈ area in cm²',
                'Compare with formula: πr² = π×25 ≈ 78.5 cm²',
              ],
              result: 'Count will be approximately 78-80 cm², close to πr² ≈ 78.5 cm². Confirms area formula!',
              safetyNote: 'Use compass carefully to avoid pricking fingers',
            },
          ],
          videos: [
            { title: 'Area of Triangle and Parallelogram - Class 7', url: 'https://www.youtube.com/embed/MBNEAGgRXLU', duration: '18 min', source: 'Education' },
            { title: 'Circumference and Area of Circle', url: 'https://www.youtube.com/embed/YokKp3pwVFc', duration: '15 min', source: 'Khan Academy' },
          ],
          keyTerms: ['Perimeter', 'Area', 'Triangle', 'Parallelogram', 'Circle', 'Radius', 'Diameter', 'Circumference', 'π (pi)'],
          quickFacts: ['π has been calculated to 100 trillion decimal places!', 'Area of circle was first calculated by Archimedes (~250 BCE)', 'Pizza price should be proportional to r² not r — that\'s why bigger sizes are better value!'],
          vedicTricks: [
            { trick: 'Multiply by 22/7 for π: First multiply by 22, then divide by 7', example: 'πr² where r=7: 22×49/7 = 22×7 = 154 cm²' },
          ],
        },
      ]
    },
    {
      slug: 'science', name: 'Science', icon: '⚗️', color: '#0369a1', bg: '#eff6ff',
      description: 'Nutrition, respiration, weather, light, electricity and forest conservation',
      chapters: [
        {
          id: 'c7s1', chapterNo: 1, title: 'Nutrition in Plants',
          description: 'How plants make their own food through photosynthesis and other modes of nutrition.',
          topics: [
            { title: 'Autotrophic Nutrition', content: 'Plants make their own food using sunlight, CO₂ from air, and water from soil. This process is called PHOTOSYNTHESIS. Chlorophyll (green pigment in leaves) traps solar energy. Occurs in chloroplasts. Plants are called autotrophs (self-feeders).' },
            { title: 'Photosynthesis Process', content: 'Equation: 6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂. Light absorbed by chlorophyll. Water absorbed by roots, moves up through xylem. CO₂ enters through stomata (tiny pores in leaves). Glucose is the food; oxygen is released as byproduct.' },
            { title: 'Other Modes of Nutrition', content: 'Parasitic: Cuscuta (Amarbel) grows on other plants, takes nutrition from host. Insectivorous: Venus Flytrap, Pitcher Plant — trap and digest insects for nitrogen. Saprophytic: Fungi, mushrooms — feed on dead/decaying matter. Symbiotic: Lichens — alga + fungi live together.' },
          ],
          formulas: [
            { name: 'Photosynthesis Equation', formula: '6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂', example: 'Every day green plants around us do this using sunlight', note: 'Occurs in chloroplasts of leaf cells' },
          ],
          experiments: [
            {
              title: 'Testing a Leaf for Starch (Iodine Test)',
              objective: 'Show that leaves exposed to light produce starch (food) through photosynthesis',
              materials: ['Potted plant', 'Alcohol', 'Iodine solution', 'Beaker', 'Water bath', 'Forceps'],
              steps: [
                'Keep the plant in a dark room for 48 hours (to remove all starch)',
                'Cover half of one leaf with black paper, expose plant to sunlight for 6 hours',
                'Pluck the leaf, remove black paper',
                'Boil leaf in water for 2 minutes to soften',
                'Boil in alcohol to remove green colour (chlorophyll)',
                'Wash with water, place on white tile',
                'Add iodine solution and observe colour change',
              ],
              result: 'Exposed part turns BLUE-BLACK (starch present). Covered part stays BROWN (no starch). Proves photosynthesis requires light!',
              safetyNote: 'Alcohol is flammable — never heat directly on flame. Use water bath. Use forceps to handle hot leaf.',
            },
          ],
          videos: [
            { title: 'Nutrition in Plants - Photosynthesis Class 7', url: 'https://www.youtube.com/embed/I9VWWqBhZCo', duration: '16 min', source: 'Education' },
            { title: 'Starch Test Experiment in Plants', url: 'https://www.youtube.com/embed/VT4vBrYk0aA', duration: '10 min', source: 'Science Lab' },
          ],
          keyTerms: ['Autotroph', 'Heterotroph', 'Photosynthesis', 'Chlorophyll', 'Stomata', 'Parasite', 'Saprotrophic', 'Symbiosis', 'Insectivorous'],
          quickFacts: ['A large tree makes 100+ kg of food per year through photosynthesis', 'Cuscuta (Amarbel) has NO chlorophyll — completely parasitic', 'Venus flytrap closes in 0.1 seconds — one of fastest plant movements'],
        },
        {
          id: 'c7s13', chapterNo: 13, title: 'Motion and Time',
          description: 'Speed, uniform/non-uniform motion, distance-time graphs and measuring time.',
          topics: [
            { title: 'Slow and Fast Motion', content: 'We say something is fast or slow by comparing how much distance it covers in a given time. A cheetah covers 120m in 1 second; a tortoise covers 0.003m in 1 second. Speed helps us compare motions objectively without saying just "fast" or "slow".' },
            { title: 'Speed', content: 'Speed = Distance / Time. SI unit: m/s (metres per second). Also used: km/h, cm/s. Uniform speed: same speed throughout (car on straight highway). Non-uniform speed: speed changes (car in city traffic). Speedometer in car measures instantaneous speed.' },
            { title: 'Distance-Time Graph', content: 'Plotting distance (y-axis) vs time (x-axis). Straight line through origin = uniform speed (slope = speed). Flat horizontal line = object at rest. Steeper slope = faster speed. Curved line = non-uniform speed (changing speed).' },
            { title: 'Measuring Time', content: 'Ancient methods: sundial (shadow), water clock, hourglass. Modern: quartz clock (vibration of quartz crystal at 32,768 Hz), atomic clock (vibration of cesium-133 atom). Simple pendulum: T = 2π√(L/g). Time period depends only on length, not mass or amplitude (for small oscillations).' },
          ],
          formulas: [
            { name: 'Speed', formula: 'Speed = Distance / Time', example: 'Train covers 300km in 3h: Speed = 300/3 = 100 km/h', note: 'SI unit is m/s' },
            { name: 'Unit Conversion', formula: '1 km/h = 5/18 m/s  |  1 m/s = 18/5 km/h = 3.6 km/h', example: '72 km/h = 72×5/18 = 20 m/s' },
            { name: 'Pendulum Time Period', formula: 'T = 2π√(L/g)', example: 'L=1m, g=10: T=2π×√(0.1)=2π×0.316=1.99s ≈ 2s', note: 'T depends only on length L, not mass' },
            { name: 'Distance from Graph', formula: 'Distance = Speed × Time = Area under speed-time graph', example: 'Speed=40m/s for 5s: Distance=40×5=200m' },
          ],
          experiments: [
            {
              title: 'Finding Speed Using a Toy Car and Stopwatch',
              objective: 'Measure speed of a toy car rolling down a ramp',
              materials: ['Toy car/marble', 'Inclined ramp (30cm ruler)', 'Measuring tape', 'Stopwatch', 'Chalk marks'],
              steps: [
                'Set up ramp at fixed angle on floor',
                'Mark start and finish lines 1 metre apart on floor',
                'Release toy car from top of ramp',
                'Start stopwatch when car crosses start line',
                'Stop when car crosses finish line',
                'Record time (t). Distance = 1 metre',
                'Speed = 1/t m/s',
                'Repeat 5 times and take average',
              ],
              result: 'Calculate average speed = 1/avg_time m/s. Shows how to measure speed practically.',
              safetyNote: 'Ensure path is clear before releasing car',
            },
          ],
          videos: [
            { title: 'Speed Distance Time - Class 7 Science', url: 'https://www.youtube.com/embed/xP8CfRaIOl8', duration: '15 min', source: 'Education' },
            { title: 'Distance Time Graphs Explained Simply', url: 'https://www.youtube.com/embed/GYK_Sh8BDOE', duration: '12 min', source: 'Khan Academy' },
          ],
          keyTerms: ['Speed', 'Distance', 'Time', 'Uniform motion', 'Non-uniform', 'Distance-time graph', 'Pendulum', 'Oscillation', 'Time period'],
          quickFacts: ['Light travels 300,000 km per second — fastest speed possible!', 'Cheetah: fastest land animal at 120 km/h (33.3 m/s)', 'Atomic clocks lose only 1 second in 300 million years!'],
          vedicTricks: [
            { trick: 'km/h to m/s: multiply by 5 and divide by 18 (or ×5/18)', example: '90 km/h = 90×5/18 = 25 m/s. Easy: 90÷18=5, 5×5=25' },
          ],
        },
      ]
    },
  ]
}

export const CLASS8: ClassData = {
  classLevel: '8', label: 'Class 8', board: ['CBSE','ICSE','State'],
  description: 'Rational numbers, linear equations, science experiments, history of modern India',
  subjects: [
    {
      slug: 'mathematics', name: 'Mathematics', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Rational numbers, linear equations, understanding quadrilaterals, mensuration',
      chapters: [
        {
          id: 'c8m8', chapterNo: 8, title: 'Comparing Quantities',
          description: 'Discount, tax, profit-loss, simple interest and compound interest.',
          topics: [
            { title: 'Discount and Marked Price', content: 'Marked Price (MP) = price written on item/tag. Discount = reduction on MP. Selling Price = MP - Discount. Discount % = (Discount/MP)×100. Example: MP=₹500, Discount=20%: Discount=₹100, SP=₹400. Always remember: Discount% is always on MP, not CP!' },
            { title: 'GST (Goods and Services Tax)', content: 'GST is tax added by government on goods and services. Added to Selling Price. Total amount paid = SP + GST. GST% varies: 0% (essential food), 5% (items of common use), 12%, 18%, 28% (luxury items). CGST+SGST = GST (equal split between Centre and State).' },
            { title: 'Compound Interest', content: 'In Simple Interest, interest is always on original principal. In Compound Interest, interest is added to principal every year (or period), and next year\'s interest is on new amount. CI gives more return than SI. CI = P(1+R/100)ⁿ - P. More compounding periods = more interest earned.' },
          ],
          formulas: [
            { name: 'Discount', formula: 'SP = MP - Discount = MP × (100-Discount%)/100', example: 'MP=₹800, Disc=25%: SP=800×75/100=₹600' },
            { name: 'GST Calculation', formula: 'Amount paid = SP + (GST% × SP)/100 = SP×(100+GST%)/100', example: 'SP=₹2000, GST=18%: Amount=2000×118/100=₹2360' },
            { name: 'Compound Interest', formula: 'A = P(1 + R/100)ⁿ  |  CI = A - P', example: 'P=₹10000, R=10%, n=2yr: A=10000×(1.1)²=12100, CI=₹2100', note: 'n = number of years (or periods)' },
            { name: 'SI vs CI Difference', formula: 'CI - SI = P(R/100)² (for 2 years)', example: 'P=₹5000, R=10%: CI-SI=5000×0.01=₹50' },
          ],
          experiments: [],
          videos: [
            { title: 'Compound Interest Class 8 - Complete', url: 'https://www.youtube.com/embed/IcxnAz4amoI', duration: '22 min', source: 'Education' },
            { title: 'GST Calculations Made Simple', url: 'https://www.youtube.com/embed/dQRbKCHLPxM', duration: '12 min', source: 'Education' },
          ],
          keyTerms: ['Marked price', 'Discount', 'GST', 'CGST', 'SGST', 'Compound interest', 'Principal', 'Amount', 'Rate'],
          quickFacts: ['India introduced GST on 1st July 2017', 'Compound interest makes savings grow much faster over time', 'Rule of 72: money doubles in (72/rate) years at compound interest. At 8%: 72/8=9 years!'],
          vedicTricks: [
            { trick: 'Rule of 72 for compound interest doubling time', example: 'At 6% per year: 72/6=12 years to double money. At 12%: 72/12=6 years!' },
          ],
        },
        {
          id: 'c8m11', chapterNo: 11, title: 'Mensuration',
          description: 'Surface area and volume of cuboids, cubes, cylinders — with real applications.',
          topics: [
            { title: 'Area of Trapezium', content: 'Trapezium has ONE pair of parallel sides (a and b) and height h. Area = ½ × (a+b) × h. Think of it as: average of parallel sides × height. Common in road cross-sections, dam designs, architectural structures.' },
            { title: 'Surface Area of Cube and Cuboid', content: 'Cuboid has 6 faces: 2 pairs of (l×b), 2 pairs of (b×h), 2 pairs of (l×h). TSA = 2(lb+bh+lh). Cube: all sides = a. TSA = 6a². LSA (lateral) = 4 faces only. Cuboid LSA = 2h(l+b). Cube LSA = 4a².' },
            { title: 'Volume of Cube and Cuboid', content: 'Volume = space occupied inside. Cuboid: V = l×b×h. Cube: V = a³. 1 litre = 1000 cm³ = 1000 mL. 1 m³ = 1,000,000 cm³ = 1000 litres. Swimming pool volume uses cuboid formula. Cube of ice → volume of water (approximately same).' },
            { title: 'Surface Area and Volume of Cylinder', content: 'Cylinder: circular base (radius r), height h. CSA (curved) = 2πrh (like label on can). TSA = 2πr(r+h) = 2πrh + 2πr². Volume = πr²h. A tin can, pipe, well, drum are all cylinders. Volume of water in cylindrical tank = πr²h.' },
          ],
          formulas: [
            { name: 'Area of Trapezium', formula: 'A = ½ × (a + b) × h', example: 'a=8cm, b=12cm, h=5cm: A=½×20×5=50 cm²', note: 'a,b are parallel sides; h is perpendicular height' },
            { name: 'Cuboid TSA', formula: 'TSA = 2(lb + bh + lh)', example: 'l=5, b=3, h=4: TSA=2(15+12+20)=94 cm²' },
            { name: 'Cuboid Volume', formula: 'V = l × b × h', example: 'l=5, b=3, h=4: V=60 cm³' },
            { name: 'Cylinder CSA', formula: 'CSA = 2πrh', example: 'r=7, h=10: CSA=2×22/7×7×10=440 cm²' },
            { name: 'Cylinder Volume', formula: 'V = πr²h', example: 'r=7, h=5: V=22/7×49×5=770 cm³', note: '1000 cm³ = 1 litre' },
          ],
          experiments: [
            {
              title: 'Finding Volume of Cylinder Using Water Displacement',
              objective: 'Measure volume of a cylinder using water displacement',
              materials: ['Cylindrical container (jar/bottle)', 'Measuring cylinder', 'Water', 'Ruler'],
              steps: [
                'Measure radius (r) and height (h) of cylinder using ruler',
                'Calculate volume using formula: V = πr²h',
                'Fill a larger container with water to a known level',
                'Immerse the cylinder (sealed, solid object) in water',
                'Measure rise in water level × base area = displaced volume',
                'Compare calculated vs measured volume',
              ],
              result: 'Both values should be approximately equal, confirming the volume formula',
              safetyNote: 'Ensure cylinder is sealed so no water enters inside',
            },
          ],
          videos: [
            { title: 'Mensuration Class 8 - Surface Area Volume', url: 'https://www.youtube.com/embed/bx8X_GaiGAc', duration: '28 min', source: 'Education' },
            { title: 'Cylinder Surface Area and Volume', url: 'https://www.youtube.com/embed/KZHAbF4ORRU', duration: '18 min', source: 'Khan Academy' },
          ],
          keyTerms: ['Trapezium', 'Cuboid', 'Cube', 'Cylinder', 'TSA', 'CSA', 'LSA', 'Volume', 'Surface area'],
          quickFacts: ['Olympic swimming pool = 2,500,000 litres (cuboid: 50×25×2m)', 'Earth is approximately a sphere (not cylinder!)', 'A standard Coke can has r≈3.3cm, h≈12.2cm → V≈417mL'],
        },
      ]
    },
    {
      slug: 'science', name: 'Science', icon: '⚗️', color: '#0369a1', bg: '#eff6ff',
      description: 'Microorganisms, metals, coal, combustion, cell structure, sound, light, stars',
      chapters: [
        {
          id: 'c8s2', chapterNo: 2, title: 'Microorganisms: Friend and Foe',
          description: 'Types of microorganisms, their uses, harmful effects, food preservation and vaccines.',
          topics: [
            { title: 'Types of Microorganisms', content: 'Bacteria: single-celled, no nucleus (prokaryote). Found everywhere — soil, water, air, inside us. Both helpful and harmful. Virus: not truly living, needs host cell to reproduce. Smallest — 20-400 nm. Cause flu, COVID, polio. Fungi: mushrooms, yeast, mould. Protozoa: single-celled with nucleus — Amoeba, Plasmodium. Algae: in water, make food by photosynthesis.' },
            { title: 'Useful Microorganisms', content: 'Bacteria in curd making (Lactobacillus converts milk→curd). Yeast for bread (CO₂ makes bread rise) and alcohol (fermentation). Bacteria in nitrogen fixation (Rhizobium in roots of legumes converts N₂→ammonia). Decomposers break dead matter into minerals. Antibiotics (Penicillin from Penicillium fungus) fight bacterial infections.' },
            { title: 'Harmful Microorganisms (Pathogens)', content: 'Disease-causing microorganisms are called pathogens. Bacteria cause: TB, cholera, typhoid. Viruses cause: influenza, polio, COVID-19, HIV. Protozoa cause: malaria (Plasmodium via mosquito), amoebic dysentery. Fungi cause: ringworm, athlete\'s foot. Prevention: vaccines, antibiotics, hygiene, vector control.' },
            { title: 'Food Preservation', content: 'Microorganisms spoil food by growing in it. Methods to preserve: 1) Salt — draws out water (dehydrates microbes). 2) Sugar — in jams and jellies. 3) Oil and vinegar — prevent oxygen. 4) Pasteurization — heat to 70°C for 15s (Louis Pasteur). 5) Refrigeration — slows microbial growth. 6) Preservatives — sodium benzoate.' },
          ],
          formulas: [
            { name: 'Pasteurization Temperature', formula: 'Milk heated to 70°C for 15 seconds OR 63°C for 30 minutes', example: 'This kills most harmful bacteria while keeping milk nutritious', note: 'Developed by Louis Pasteur in 1864' },
          ],
          experiments: [
            {
              title: 'Growing Mould on Bread',
              objective: 'Observe growth of fungi (mould) on bread under different conditions',
              materials: ['Bread slices (4)', 'Water', 'Zip-lock bags', 'Magnifying glass', 'Labels'],
              steps: [
                'Label 4 bags: Dry-Room, Wet-Room, Dry-Fridge, Wet-Fridge',
                'Slightly wet 2 bread slices with water spray',
                'Place dry slice in Bag 1, wet slice in Bag 2 — keep at room temperature',
                'Place dry slice in Bag 3, wet slice in Bag 4 — keep in fridge',
                'Observe daily for 7 days using magnifying glass',
                'Record when mould first appears and how much grows',
              ],
              result: 'Bag 2 (wet-room) shows most mould fastest. Bag 4 (wet-fridge) shows less mould. Dry bags show least. Proves microbes need moisture and warmth to grow!',
              safetyNote: 'Do NOT open bags — mould spores can cause allergies. Dispose sealed in dustbin.',
            },
          ],
          videos: [
            { title: 'Microorganisms Friend and Foe - Class 8', url: 'https://www.youtube.com/embed/r6OO_ZsR5h4', duration: '22 min', source: 'Education' },
            { title: 'Bacteria Viruses Fungi - Types of Microbes', url: 'https://www.youtube.com/embed/8_JQxb_R-eA', duration: '18 min', source: 'Science Ed' },
          ],
          keyTerms: ['Bacteria', 'Virus', 'Fungi', 'Protozoa', 'Pathogen', 'Antibiotic', 'Vaccine', 'Fermentation', 'Pasteurization', 'Nitrogen fixation'],
          quickFacts: ['1 teaspoon of soil has more bacteria than people on Earth!', 'Penicillin (discovered 1928) has saved over 200 million lives', 'COVID-19 virus is just 100-120 nanometres — 1000 times smaller than human hair'],
        },
        {
          id: 'c8s13', chapterNo: 13, title: 'Sound',
          description: 'How sound is produced, travels, reflection, echo, sonar, human ear.',
          topics: [
            { title: 'Production of Sound', content: 'Sound is produced by VIBRATION. When an object vibrates, it disturbs nearby air particles, which in turn disturb others — creating a wave. Examples: guitar string vibrates, vocal cords vibrate when we speak, drum membrane vibrates when hit. Without vibration — no sound!' },
            { title: 'Properties of Sound Waves', content: 'Amplitude: maximum displacement from rest position. Larger amplitude = LOUDER sound. Frequency: number of vibrations per second. Unit: Hertz (Hz). Higher frequency = HIGHER pitch. Wavelength: distance between two consecutive compressions. All three: amplitude, frequency, wavelength are related to our perception of sound.' },
            { title: 'Speed of Sound and Echo', content: 'Sound needs a medium — cannot travel in vacuum. Speed in air ≈ 343 m/s at 25°C. Speed in water ≈ 1500 m/s. Speed in steel ≈ 5000 m/s. Echo: reflection of sound from a hard surface. Minimum distance for echo = 17.15 m (so reflected sound arrives after 0.1s). SONAR uses echo to find depth of ocean or detect submarines.' },
            { title: 'Human Ear and Hearing Range', content: 'Humans hear 20 Hz to 20,000 Hz (20 kHz). Below 20 Hz: Infrasonic (elephants, earthquakes use this). Above 20,000 Hz: Ultrasonic (bats, dolphins, SONAR, medical imaging — USG). Ear: Pinna → Ear canal → Eardrum (tympanic membrane) → Ossicles (3 tiny bones: Malleus, Incus, Stapes) → Cochlea → Auditory nerve → Brain.' },
          ],
          formulas: [
            { name: 'Speed of Sound', formula: 'Speed = Distance / Time (like all speed)', example: 'Thunder heard 3s after lightning, speed=340m/s: Distance=340×3=1020m away', note: 'Speed varies with temperature and medium' },
            { name: 'Echo Minimum Distance', formula: 'Minimum distance = (Speed of sound × 0.1s) / 2 = 17.15 m', example: 'Shout at wall 20m away: echo comes in 20×2/340 = 0.12s (heard as echo)', note: 'Human ear cannot distinguish sounds less than 0.1s apart' },
            { name: 'Frequency and Pitch', formula: 'Higher frequency → Higher pitch (shriller sound)', example: 'Whistle: ~3000 Hz (high pitch). Bass drum: ~50-100 Hz (low pitch)' },
          ],
          experiments: [
            {
              title: 'Demonstrating Sound Needs a Medium',
              objective: 'Show that sound cannot travel without a medium (vacuum experiment)',
              materials: ['Electric bell', 'Glass bell jar', 'Vacuum pump (or use alternative)', 'Rubber pads', 'Power supply'],
              steps: [
                'Suspend electric bell inside glass jar on rubber pads',
                'Connect bell to power supply — hear it ringing',
                'Start vacuum pump to slowly remove air from jar',
                'Observe: as air decreases, sound becomes fainter',
                'At near-vacuum: bell is vibrating but almost no sound heard',
                'Slowly let air back in — sound returns',
              ],
              result: 'As air (medium) is removed, sound decreases and nearly disappears. Confirms sound NEEDS a medium to travel!',
              safetyNote: 'Handle glass jar carefully. Teacher should operate vacuum pump.',
            },
          ],
          videos: [
            { title: 'Sound Class 8 - Vibration, Frequency, Echo', url: 'https://www.youtube.com/embed/WM_OwFUo2W8', duration: '20 min', source: 'Education' },
            { title: 'How Human Ear Works - Animation', url: 'https://www.youtube.com/embed/flIAxGsV1q0', duration: '8 min', source: 'Science Animation' },
          ],
          keyTerms: ['Vibration', 'Amplitude', 'Frequency', 'Hertz', 'Pitch', 'Loudness', 'Echo', 'SONAR', 'Infrasonic', 'Ultrasonic', 'Cochlea'],
          quickFacts: ['Sound travels 4x faster in water than air', 'A jet engine produces 140 dB — can cause instant hearing damage', 'Bats use ultrasound (>20,000 Hz) to navigate in complete darkness', 'Space is completely silent — no medium for sound!'],
        },
      ]
    },
  ]
}
