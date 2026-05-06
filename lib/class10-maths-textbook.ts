import type { Chapter, Formula, Topic, VideoLink } from '@/lib/ncert-master'

function makeChapterImage(title: string, accent: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <rect width="1200" height="630" fill="#f8fbff" />
      <rect x="42" y="42" width="1116" height="546" rx="28" fill="#ffffff" stroke="${accent}" stroke-width="6" />
      <circle cx="150" cy="118" r="44" fill="${accent}" opacity="0.12" />
      <circle cx="1068" cy="498" r="68" fill="${accent}" opacity="0.10" />
      <path d="M120 492 C240 340 360 582 498 420 S780 270 954 348" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round" opacity="0.85" />
      <text x="96" y="190" font-family="Arial, sans-serif" font-size="28" fill="#355071">MscTutor • Class 10 Mathematics</text>
      <text x="96" y="298" font-family="Arial, sans-serif" font-size="58" font-weight="700" fill="#0f1f3d">${title}</text>
      <text x="96" y="372" font-family="Arial, sans-serif" font-size="30" fill="#5a6a8a">NCERT-based chapter map with topic pages, formulas and examples</text>
      <text x="96" y="468" font-family="Arial, sans-serif" font-size="24" fill="#5a6a8a">Blueprint-aligned study structure • Read • Ask • Practice</text>
    </svg>
  `

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function makeVideo(title: string): VideoLink {
  return {
    title: `${title} - guided video search`,
    url: `https://www.youtube.com/results?search_query=${encodeURIComponent(`NCERT class 10 mathematics ${title}`)}`,
    duration: 'Open search',
    source: 'YouTube educational search',
  }
}

function makeFormula(name: string, formula: string, example: string, note?: string): Formula {
  return { name, formula, example, note }
}

function makeTopic(title: string, content: string): Topic {
  return { title, content }
}

function makeChapter(
  id: string,
  chapterNo: number,
  title: string,
  description: string,
  topics: Topic[],
  formulas: Formula[],
  keyTerms: string[],
  quickFacts: string[],
): Chapter {
  return {
    id,
    chapterNo,
    title,
    description,
    topics,
    formulas,
    experiments: [],
    videos: [makeVideo(title)],
    keyTerms,
    quickFacts,
    imageUrl: makeChapterImage(title, '#1a3a6b'),
  }
}

export const CLASS10_MATHEMATICS_TEXTBOOK: Chapter[] = [
  makeChapter(
    'c10m1',
    1,
    'Real Numbers',
    'Class 10 NCERT chapter on Euclid’s division lemma, prime factorisation, irrational numbers and decimal expansions.',
    [
      makeTopic('Introduction', 'Real numbers include rational and irrational numbers together. This chapter revises number system ideas from earlier classes and prepares students to reason about divisibility, factorisation and decimal representation in a structured way.'),
      makeTopic('The Fundamental Theorem of Arithmetic', 'Every composite number can be expressed as a product of prime numbers, and this factorisation is unique apart from the order of factors. This theorem is the base for HCF, LCM, and checking terminating or non-terminating decimal expansions.'),
      makeTopic('Revisiting Irrational Numbers', 'Irrational numbers cannot be written in the form p/q where q is non-zero. Their decimal expansions are non-terminating and non-repeating. The chapter usually revisits why numbers such as √2, √3 and π behave differently from fractions.'),
      makeTopic('Decimal Expansions of Rational Numbers', 'A rational number has either a terminating decimal expansion or a non-terminating recurring decimal expansion. For a fraction p/q in lowest form, the decimal terminates if the prime factors of q are only 2 and/or 5.'),
      makeTopic('Summary', 'By the end of the chapter, learners should be able to apply Euclid’s algorithm, use prime factorisation confidently, distinguish rational and irrational numbers, and classify decimal expansions correctly.'),
    ],
    [
      makeFormula('Euclid Division Lemma', 'a = bq + r, 0 ≤ r < b', 'For 45 and 7: 45 = 7 × 6 + 3', 'Used repeatedly to find HCF.'),
      makeFormula('HCF-LCM Relationship', 'HCF(a, b) × LCM(a, b) = a × b', 'For 12 and 18: 6 × 36 = 12 × 18 = 216'),
      makeFormula('Terminating Decimal Test', 'If q = 2^m × 5^n in lowest form, then p/q terminates', '3/40 terminates because 40 = 2^3 × 5'),
    ],
    ['Real number', 'Rational', 'Irrational', 'Prime factorisation', 'HCF', 'LCM'],
    ['Prime factorisation is unique apart from order.', 'A decimal can terminate, repeat, or stay non-repeating.', 'This chapter builds the logic behind later algebra work.'],
  ),
  makeChapter(
    'c10m2',
    2,
    'Polynomials',
    'Study of zeroes of polynomials and the relationship between zeroes and coefficients in linear, quadratic and cubic forms.',
    [
      makeTopic('Introduction', 'A polynomial is an algebraic expression with non-negative integral powers of the variable. Class 10 mainly focuses on zeroes of linear, quadratic and cubic polynomials and on how graphs help interpret them.'),
      makeTopic('Geometrical Meaning of the Zeroes of a Polynomial', 'The zeroes of a polynomial are the x-coordinates where its graph cuts or touches the x-axis. A linear polynomial has one zero, a quadratic can have at most two, and a cubic can have at most three real zeroes.'),
      makeTopic('Relationship between Zeroes and Coefficients of a Polynomial', 'For quadratic polynomials ax² + bx + c, the sum of zeroes is -b/a and the product is c/a. Similar coefficient relations can be written for cubic polynomials as well, and these are extremely useful in verification and equation formation.'),
      makeTopic('Division Algorithm for Polynomials', 'Although the contents page may not list it separately here, school work often connects this chapter to dividing one polynomial by another. It supports factorisation, remainder ideas and solving algebraic questions efficiently.'),
      makeTopic('Summary', 'Students should finish the chapter knowing how graphs show zeroes, how to connect zeroes with coefficients, and how to use these relations in direct problems and proofs.'),
    ],
    [
      makeFormula('Sum of Zeroes', 'α + β = -b/a', 'For x² - 5x + 6, sum of zeroes = 5'),
      makeFormula('Product of Zeroes', 'αβ = c/a', 'For x² - 5x + 6, product of zeroes = 6'),
      makeFormula('Cubic Relation', 'α + β + γ = -b/a', 'For ax³ + bx² + cx + d, sum of zeroes depends on coefficient of x²'),
    ],
    ['Polynomial', 'Zero', 'Coefficient', 'Graph', 'Quadratic', 'Cubic'],
    ['Graphs make algebra visible.', 'Zeroes can be checked without solving the full factorisation.', 'Coefficient relations save time in board questions.'],
  ),
  makeChapter(
    'c10m3',
    3,
    'Pair of Linear Equations in Two Variables',
    'Methods of solving two linear equations using graphical and algebraic approaches.',
    [
      makeTopic('Introduction', 'A pair of linear equations in two variables represents two straight lines. The solution depends on whether the lines intersect, coincide, or remain parallel.'),
      makeTopic('Graphical Method of Solution', 'Plot each equation on the same graph. If the lines meet at one point, that point gives the unique solution. If the lines overlap completely, there are infinitely many solutions. If they never meet, there is no solution.'),
      makeTopic('Algebraic Methods of Solving a Pair of Linear Equations', 'Algebraic methods are more precise than graphing in many exam situations. They transform the equations so that one variable can be eliminated or replaced step by step.'),
      makeTopic('Substitution Method', 'Express one variable in terms of the other from one equation and substitute it into the second equation. This is often convenient when one equation already has a coefficient 1 or -1.'),
      makeTopic('Elimination Method', 'Multiply or adjust the equations so that one variable gets the same coefficient in both equations, then add or subtract to remove it. This method is a board-exam favourite because it is direct and systematic.'),
      makeTopic('Consistency of the Pair', 'When a₁/a₂ ≠ b₁/b₂, the system has a unique solution. When a₁/a₂ = b₁/b₂ = c₁/c₂, there are infinitely many solutions. When a₁/a₂ = b₁/b₂ but differs from c₁/c₂, the system is inconsistent.'),
      makeTopic('Summary', 'This chapter helps learners choose between graphical intuition and algebraic accuracy, and to classify a system as consistent, dependent or inconsistent.'),
    ],
    [
      makeFormula('Unique Solution Condition', 'a₁/a₂ ≠ b₁/b₂', 'If ratios of x and y coefficients differ, the lines intersect once'),
      makeFormula('Infinite Solutions Condition', 'a₁/a₂ = b₁/b₂ = c₁/c₂', 'Both equations represent the same line'),
      makeFormula('No Solution Condition', 'a₁/a₂ = b₁/b₂ ≠ c₁/c₂', 'Both lines are parallel and distinct'),
    ],
    ['Linear equation', 'Graphical method', 'Substitution', 'Elimination', 'Consistent', 'Inconsistent'],
    ['Each pair of equations can be read as a relationship between two lines.', 'Ratios reveal the nature of the solution before solving fully.', 'Graphical and algebraic methods should support each other.'],
  ),
  makeChapter(
    'c10m4',
    4,
    'Quadratic Equations',
    'Standard form, factorisation, roots and the discriminant of quadratic equations.',
    [
      makeTopic('Introduction', 'Quadratic equations arise in geometry, motion, area problems and algebraic modelling. Their standard form is ax² + bx + c = 0 with a ≠ 0.'),
      makeTopic('Quadratic Equations', 'A quadratic equation is identified by highest power 2 of the variable. Students should know how to rewrite word problems into standard form before solving.'),
      makeTopic('Solution by Factorisation', 'When the quadratic can be split into two linear factors, each factor is equated to zero. This method is efficient for well-structured equations and strengthens factor sense.'),
      makeTopic('Quadratic Formula', 'The formula x = [-b ± √(b² - 4ac)] / 2a gives the roots for every quadratic equation. It is especially useful when factorisation is not easy or when roots are irrational.'),
      makeTopic('Nature of Roots', 'The discriminant D = b² - 4ac tells us whether the roots are real and distinct, real and equal, or non-real. This is important both in theory and in quick problem analysis.'),
      makeTopic('Summary', 'After this chapter, students should be able to identify quadratics, solve them by multiple methods, and interpret the discriminant meaningfully.'),
    ],
    [
      makeFormula('Standard Form', 'ax² + bx + c = 0, a ≠ 0', '2x² - 7x + 3 = 0 is in standard form'),
      makeFormula('Quadratic Formula', 'x = [-b ± √(b² - 4ac)] / 2a', 'For x² - 5x + 6 = 0, roots are 2 and 3'),
      makeFormula('Discriminant', 'D = b² - 4ac', 'For x² + 2x + 1, D = 0 so the roots are equal'),
    ],
    ['Quadratic', 'Root', 'Discriminant', 'Factorisation', 'Standard form'],
    ['The discriminant lets you classify roots quickly.', 'Quadratic equations often model area and motion problems.', 'A factorised form reveals roots directly.'],
  ),
  makeChapter(
    'c10m5',
    5,
    'Arithmetic Progressions',
    'Sequences with common difference, nth term and sum formulas.',
    [
      makeTopic('Introduction', 'An arithmetic progression is a list of numbers where the difference between consecutive terms stays constant. Such patterns appear in seating rows, savings plans and repeated schedules.'),
      makeTopic('Arithmetic Progressions', 'The first term is denoted by a and the common difference by d. Recognising whether a sequence is an AP is the first and most important step in this chapter.'),
      makeTopic('nth Term of an AP', 'The nth term helps us jump to any position in the progression without listing all terms. It is especially useful in board problems involving large term numbers.'),
      makeTopic('Sum of First n Terms of an AP', 'The sum formula compresses long repeated addition into a neat algebraic rule. Students should know both the general sum formula and the version using first and last term.'),
      makeTopic('Summary', 'By the end of the chapter, learners should be comfortable identifying APs, finding missing values, locating particular terms and summing terms quickly.'),
    ],
    [
      makeFormula('nth Term', 'aₙ = a + (n - 1)d', 'If a = 3 and d = 4, then a₅ = 3 + 4×4 = 19'),
      makeFormula('Sum of First n Terms', 'Sₙ = n/2 [2a + (n - 1)d]', 'For a = 2, d = 3, n = 4: S₄ = 4/2[4 + 9] = 26'),
      makeFormula('Sum Using Last Term', 'Sₙ = n/2 (a + l)', 'If first term is 5, last term is 25 and n = 5, sum = 75'),
    ],
    ['Arithmetic progression', 'First term', 'Common difference', 'nth term', 'Series'],
    ['AP questions train pattern recognition.', 'The sum formula is derived from reversing and adding the series.', 'Many finance and planning problems use AP logic.'],
  ),
  makeChapter(
    'c10m6',
    6,
    'Triangles',
    'Similarity of triangles, criteria and proportional relationships.',
    [
      makeTopic('Introduction', 'This chapter focuses on similarity rather than congruence. Similar figures have the same shape but may differ in size, and proportional reasoning becomes central here.'),
      makeTopic('Similar Figures', 'Two figures are similar when corresponding angles are equal and corresponding sides are in the same ratio. This idea extends far beyond triangles, but triangles give the cleanest theorems and proofs.'),
      makeTopic('Similarity of Triangles', 'When triangles are similar, a wide set of side ratios and area relations become available. These results are essential in geometry proofs and measurement problems.'),
      makeTopic('Criteria for Similarity of Triangles', 'The standard criteria are AA, SSS and SAS. Students should not just memorise these names, but understand what information each criterion requires and why it works.'),
      makeTopic('Pythagoras Theorem and Converse', 'In many Class 10 syllabi, triangles also connect to Pythagoras theorem and its converse. This builds a bridge between similarity ideas and right-triangle measurement.'),
      makeTopic('Summary', 'The main outcome is the ability to prove similarity, set up correct ratios, compare areas and use triangle theorems in exam-style questions.'),
    ],
    [
      makeFormula('Area Ratio of Similar Triangles', 'Ar(ΔABC) / Ar(ΔPQR) = (AB / PQ)²', 'If corresponding sides are in ratio 2:3, areas are in ratio 4:9'),
      makeFormula('Pythagoras Theorem', 'a² + b² = c²', 'For sides 3, 4, 5: 3² + 4² = 5²'),
      makeFormula('Basic Proportionality Idea', 'If a line is parallel to one side of a triangle, it divides the other two sides proportionally', 'Useful in many textbook proofs'),
    ],
    ['Similarity', 'Corresponding sides', 'AA', 'SSS', 'SAS', 'Pythagoras'],
    ['Similarity is about shape, not exact size.', 'Area changes with the square of the scale factor.', 'Many geometry proofs become short once similarity is spotted.'],
  ),
  makeChapter(
    'c10m7',
    7,
    'Coordinate Geometry',
    'Distance and section ideas on the Cartesian plane.',
    [
      makeTopic('Introduction', 'Coordinate geometry combines algebra and geometry by placing points on a plane using ordered pairs. This makes shape and distance questions more calculable.'),
      makeTopic('Distance Formula', 'The distance formula comes from the Pythagoras theorem applied horizontally and vertically on the coordinate plane. It helps in finding side lengths and checking geometric properties.'),
      makeTopic('Section Formula', 'The section formula gives the coordinates of a point dividing a line segment in a given ratio. In Class 10, the midpoint idea is especially important and very frequently tested.'),
      makeTopic('Midpoint Interpretation', 'The midpoint is simply the point halfway between two coordinates. It supports symmetry questions, geometric proofs and quick line-segment reasoning.'),
      makeTopic('Summary', 'Students should be able to place points correctly, compute distances accurately and divide segments internally using ratios.'),
    ],
    [
      makeFormula('Distance Formula', 'd = √[(x₂ - x₁)² + (y₂ - y₁)²]', 'Distance between (1,2) and (4,6) is 5'),
      makeFormula('Midpoint Formula', 'M = ((x₁ + x₂)/2, (y₁ + y₂)/2)', 'Midpoint of (2,4) and (6,8) is (4,6)'),
      makeFormula('Internal Section Formula', 'P = ((mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n))', 'Used when one point divides a segment in m:n'),
    ],
    ['Coordinate plane', 'Distance formula', 'Midpoint', 'Section formula'],
    ['Coordinate geometry turns geometric shapes into algebra problems.', 'Distance formula is a direct Pythagoras application.', 'Midpoint questions often appear as 1-step board questions.'],
  ),
  makeChapter(
    'c10m8',
    8,
    'Introduction to Trigonometry',
    'Trigonometric ratios, identities and standard-angle values in right triangles.',
    [
      makeTopic('Introduction', 'Trigonometry studies the relationship between angles and side ratios in triangles. In Class 10, it begins with right triangles and standard acute angles.'),
      makeTopic('Trigonometric Ratios', 'For an acute angle in a right triangle, sin, cos and tan compare the opposite side, adjacent side and hypotenuse. The reciprocal ratios cosec, sec and cot are also introduced.'),
      makeTopic('Trigonometric Ratios of Some Specific Angles', 'Students memorise and justify the values of trigonometric ratios at 0°, 30°, 45°, 60° and 90°. These standard values are used constantly in simplification and applications.'),
      makeTopic('Trigonometric Identities', 'The identity sin²θ + cos²θ = 1 is the central relation in this chapter. Related forms involving tan, sec, cot and cosec come from dividing by cos²θ or sin²θ appropriately.'),
      makeTopic('Summary', 'By the end, learners should know the six ratios, their standard values and how to use basic identities in proofs and evaluation problems.'),
    ],
    [
      makeFormula('Basic Ratios', 'sin θ = P/H, cos θ = B/H, tan θ = P/B', 'In a 3-4-5 triangle with angle opposite 3, sin θ = 3/5'),
      makeFormula('Identity', 'sin²θ + cos²θ = 1', 'If sin θ = 3/5, then cos θ = 4/5'),
      makeFormula('Derived Identity', '1 + tan²θ = sec²θ', 'If tan θ = 3/4, then sec²θ = 25/16'),
    ],
    ['Trigonometry', 'Sine', 'Cosine', 'Tangent', 'Identity', 'Standard angles'],
    ['SOH-CAH-TOA is a memory aid, not a substitute for understanding.', 'Standard angles are reused across multiple chapters.', 'Identities simplify complicated expressions quickly.'],
  ),
  makeChapter(
    'c10m9',
    9,
    'Some Applications of Trigonometry',
    'Use of trigonometric ratios in measuring heights and distances.',
    [
      makeTopic('Heights and Distances', 'This chapter applies trigonometry to real objects such as buildings, towers and trees. The key language includes line of sight, angle of elevation and angle of depression.'),
      makeTopic('Modelling Right Triangles in Real Situations', 'Most problems reduce a situation into a right triangle. Correct labelling of the known sides, height and viewing angle is more important than starting with formulas too early.'),
      makeTopic('Choosing the Right Ratio', 'The correct ratio depends on what is known and what is required. If opposite and adjacent are involved, tan is often the cleanest ratio; if hypotenuse is involved, sin or cos may be better.'),
      makeTopic('Summary', 'Students should be able to draw diagrams from words, choose the correct trigonometric ratio and solve practical height-distance problems with confidence.'),
    ],
    [
      makeFormula('Angle of Elevation Model', 'tan θ = height / horizontal distance', 'If θ = 45° and distance = 20 m, height = 20 m'),
      makeFormula('Angle of Depression Link', 'Angle of depression from the top equals the corresponding angle of elevation from below', 'This equality helps convert many observation problems'),
    ],
    ['Angle of elevation', 'Angle of depression', 'Line of sight', 'Horizontal distance'],
    ['Applications chapter is more about diagramming than memorisation.', 'A clean sketch often solves half the question.', 'Standard trigonometric values reduce calculation load.'],
  ),
  makeChapter(
    'c10m10',
    10,
    'Circles',
    'Tangent properties and tangent lengths from external points.',
    [
      makeTopic('Introduction', 'A circle chapter at this level focuses on tangents and the relationship between a tangent and a radius. Theorems are short, elegant and proof-based.'),
      makeTopic('Tangent to a Circle', 'A tangent touches a circle at exactly one point. The radius drawn to the point of contact is perpendicular to the tangent. This theorem is fundamental and appears in most proofs in the chapter.'),
      makeTopic('Number of Tangents from a Point on a Circle', 'From a point outside a circle, exactly two tangents can be drawn. From a point on the circle, only one tangent exists; from an interior point, no real tangent can be drawn.'),
      makeTopic('Equal Tangent Segments', 'The lengths of tangent segments drawn from the same external point to a circle are equal. This result is a powerful tool in geometric proof and construction.'),
      makeTopic('Summary', 'Students should be able to recognise tangent situations, apply perpendicularity with radius, and compare tangent lengths from a common point.'),
    ],
    [
      makeFormula('Radius-Tangent Property', 'Radius at the point of contact ⟂ tangent', 'If PT is tangent at T and OT is radius, then OT ⟂ PT'),
      makeFormula('Equal Tangent Lengths', 'PA = PB', 'If tangents from P touch the circle at A and B, then PA = PB'),
    ],
    ['Tangent', 'Point of contact', 'Radius', 'External point'],
    ['Tangents create neat right angles.', 'Equal tangent segments often unlock geometry proofs.', 'Circle theorems are proof-heavy but conceptually compact.'],
  ),
  makeChapter(
    'c10m11',
    11,
    'Areas Related to Circles',
    'Sector and segment area calculations based on the whole circle.',
    [
      makeTopic('Areas of Sector and Segment of a Circle', 'A sector is the region enclosed by two radii and the corresponding arc. A segment is the region between a chord and its arc. Both are found by relating part to whole using the central angle.'),
      makeTopic('Circumference and Area Revision', 'Questions in this chapter assume strong command over circumference and area of a full circle. Students should move comfortably between diameter, radius, circumference and area.'),
      makeTopic('Sector-Based Problem Solving', 'Many textbook questions ask for area of remaining shape after removing or adding sectors. Students should first identify the total figure, then subtract or combine areas carefully.'),
      makeTopic('Summary', 'The chapter develops precision with π-based expressions, angle fractions and compound shapes involving circular parts.'),
    ],
    [
      makeFormula('Area of Circle', 'A = πr²', 'If r = 7 cm, area = 49π cm²'),
      makeFormula('Circumference', 'C = 2πr', 'If r = 7 cm, circumference = 14π cm'),
      makeFormula('Area of Sector', 'Area = (θ/360) × πr²', 'If θ = 90° and r = 14 cm, area = 49π cm²'),
    ],
    ['Sector', 'Segment', 'Arc', 'Chord', 'Central angle'],
    ['Sector questions combine geometry and fraction sense.', 'Segment problems often require subtraction from sector or triangle area.', 'Exact π form is often preferred over decimal approximation.'],
  ),
  makeChapter(
    'c10m12',
    12,
    'Surface Areas and Volumes',
    'Combination of solids and volume-surface area reasoning.',
    [
      makeTopic('Introduction', 'This chapter extends familiar mensuration formulas to combined solids such as hemispheres on cylinders, cones joined to cylinders and similar compound shapes.'),
      makeTopic('Surface Area of a Combination of Solids', 'Students must identify which faces are exposed and which are hidden or joined. Total surface area should include only the external visible surfaces in the final shape.'),
      makeTopic('Volume of a Combination of Solids', 'The volume of a compound solid is usually the sum or difference of the volumes of simpler solids. Correct unit handling is essential, especially when converting litres, cubic centimetres and cubic metres.'),
      makeTopic('Summary', 'The goal is to model real 3D objects as combinations of standard solids and apply mensuration formulas with care.'),
    ],
    [
      makeFormula('Volume of Cylinder', 'V = πr²h', 'For r = 3 cm, h = 10 cm, volume = 90π cm³'),
      makeFormula('Volume of Sphere', 'V = 4/3 πr³', 'For r = 3 cm, volume = 36π cm³'),
      makeFormula('TSA of Cylinder', 'TSA = 2πr(h + r)', 'For r = 2 cm and h = 5 cm, TSA = 28π cm²'),
    ],
    ['Surface area', 'Volume', 'Combination of solids', 'Exposed face'],
    ['Draw the 3D shape before applying formulas.', 'Surface area and volume are not solved the same way.', 'Units decide whether an answer is in area or volume form.'],
  ),
  makeChapter(
    'c10m13',
    13,
    'Statistics',
    'Mean, mode and median of grouped data with cumulative frequency ideas.',
    [
      makeTopic('Introduction', 'Statistics helps organise, summarise and interpret data. In Class 10, grouped data becomes important because information is collected in intervals rather than as a simple list.'),
      makeTopic('Mean of Grouped Data', 'The mean of grouped data can be computed through direct, assumed mean and step-deviation methods. The best method depends on the size of numbers and ease of calculation.'),
      makeTopic('Mode of Grouped Data', 'Mode identifies the most frequent class or the value occurring most often. In grouped form, it is found using the modal class and the corresponding mode formula.'),
      makeTopic('Median of Grouped Data', 'Median is the central value dividing the data into two equal parts. For grouped data, cumulative frequency is used to locate the median class before applying the median formula.'),
      makeTopic('Summary', 'Students should be able to choose the right measure of central tendency and work cleanly with frequency tables and class intervals.'),
    ],
    [
      makeFormula('Mean', 'Mean = Σfx / Σf', 'Multiply each class mark by frequency and divide by total frequency'),
      makeFormula('Mode', 'Mode = l + [(f₁ - f₀) / (2f₁ - f₀ - f₂)] × h', 'Use the modal class and neighbouring frequencies'),
      makeFormula('Median', 'Median = l + [(N/2 - cf) / f] × h', 'Find the median class using cumulative frequency first'),
    ],
    ['Frequency', 'Class interval', 'Class mark', 'Mean', 'Mode', 'Median'],
    ['Statistics is about interpretation, not just arithmetic.', 'A frequency table reduces large raw data into usable form.', 'Median and mode often tell a different story from mean.'],
  ),
  makeChapter(
    'c10m14',
    14,
    'Probability',
    'Theoretical probability using equally likely outcomes.',
    [
      makeTopic('Probability — A Theoretical Approach', 'Probability measures how likely an event is to happen. In this chapter, the focus is on simple theoretical probability where all outcomes are equally likely.'),
      makeTopic('Sample Space and Event', 'The sample space contains all possible outcomes of an experiment. An event is a subset of that sample space, such as getting an even number on a die or a head on a coin toss.'),
      makeTopic('Complementary Events', 'If E is an event, then not E is its complement. Together they account for the full sample space, which makes complement-based reasoning very efficient in many problems.'),
      makeTopic('Summary', 'Students should finish the chapter able to identify sample spaces, count favourable outcomes and express probabilities correctly between 0 and 1.'),
    ],
    [
      makeFormula('Basic Probability', 'P(E) = n(E) / n(S)', 'If 3 outcomes are favourable out of 8 total, probability = 3/8'),
      makeFormula('Complement Rule', 'P(E) + P(not E) = 1', 'If P(E) = 0.35, then P(not E) = 0.65'),
    ],
    ['Probability', 'Sample space', 'Event', 'Favourable outcome', 'Complement'],
    ['Probability is always between 0 and 1.', 'Theoretical probability assumes equally likely outcomes.', 'Counting carefully matters more than formula memorisation here.'],
  ),
]
