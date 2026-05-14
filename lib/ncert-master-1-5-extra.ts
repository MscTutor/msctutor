// lib/ncert-master-1-5-extra.ts
// ══════════════════════════════════════════════════════════════════════
// EXTRA NCERT CHAPTERS — Class 1 to 5 (extended set)
// Math, EVS, English, Hindi — rich topics, formulas, experiments
// ══════════════════════════════════════════════════════════════════════

import type { ClassData } from '@/lib/ncert-master'

// ══════════════════════════════════════════════════════════════════════
// CLASS 1 — Additional chapters
// ══════════════════════════════════════════════════════════════════════
export const CLASS1_EXTRA: ClassData = {
  classLevel: '1', label: 'Class 1', board: ['CBSE','ICSE','State'],
  description: 'Class 1 extended chapters — Numbers to 20, Measurement, Patterns',
  subjects: [
    {
      slug: 'mathematics', name: 'Mathematics (Maths Magic)', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Numbers to Twenty, Measurement, Patterns and More',
      chapters: [
        {
          id: 'c1m5', chapterNo: 5, title: 'Numbers from Ten to Twenty',
          description: 'Counting beyond 9, two-digit numbers, understanding tens and ones.',
          topics: [
            { title: 'Numbers 10 to 15', content: '10 = ten, 11 = eleven, 12 = twelve, 13 = thirteen, 14 = fourteen, 15 = fifteen. After 9 comes 10. Ten is the first two-digit number. It has a 1 in the tens place and 0 in the ones place. A group of 10 fingers helps us see the "ten" in each number.' },
            { title: 'Numbers 16 to 20', content: '16 = sixteen, 17 = seventeen, 18 = eighteen, 19 = nineteen, 20 = twenty. Twenty is special — it means 2 groups of ten (2 tens = 20). Practice: Write the number name for 18. Answer: eighteen. Write the number for "seventeen". Answer: 17.' },
            { title: 'Tens and Ones Place', content: '12 = 1 ten + 2 ones. 17 = 1 ten + 7 ones. 20 = 2 tens + 0 ones. The tens place is on the LEFT. The ones place is on the RIGHT. Using a place value chart helps: write 16 → Tens:1, Ones:6. This is the foundation of our number system.' },
            { title: 'Ordering Numbers 10-20', content: 'Numbers on a number line go left to right in increasing order. 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20. Which is bigger: 14 or 17? 17 is bigger. Which is smaller: 12 or 19? 12 is smaller. Arrange in order: 18, 11, 15 → 11, 15, 18.' },
          ],
          formulas: [
            { name: 'Teen Numbers', formula: '10 + ones digit = teen number', example: '10 + 6 = 16 (sixteen)', note: 'Numbers 11-19 are called "teen" numbers' },
            { name: 'Place Value', formula: 'Any 2-digit number = (tens × 10) + ones', example: '13 = (1×10) + 3 = 10+3 = 13' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Teens', 'Twenty', 'Tens place', 'Ones place', 'Place value'],
          quickFacts: ['10 is the smallest two-digit number', '20 = 2 tens', 'The number system we use is called Hindu-Arabic', 'Zero was invented in India!'],
        },
        {
          id: 'c1m7', chapterNo: 7, title: 'Measurement',
          description: 'Long and short, heavy and light, full and empty — comparison without standard units.',
          topics: [
            { title: 'Long and Short', content: 'We can compare the lengths of objects. A pencil is longer than a crayon. A crayon is shorter than a pencil. To compare: place both objects side by side, starting from the same end. The one that sticks out more is longer. Practice: Compare your hand with your friend\'s hand. Who has a longer hand?' },
            { title: 'Heavy and Light', content: 'Some objects weigh more (heavier) and some weigh less (lighter). A watermelon is heavier than a grape. A feather is lighter than a stone. We can feel weight by holding objects in our hands — two hands become a balance! The heavier side goes down, lighter side goes up.' },
            { title: 'Full, Empty, Half-Full', content: 'A container can be full (no more can be added), half-full (half the space is used), or empty (nothing inside). A full glass of water spills if you add more. An empty glass can hold water. Half-full means exactly half is filled. Practice: Look at these jars and say if they are full, half-full, or empty.' },
            { title: 'Measuring Without Instruments', content: 'Before rulers, people used body parts to measure: Cubit (elbow to fingertip), Handspan (thumb to little finger), Foot (length of foot), Pace (one step). Problem: these are different for everyone! That is why we need standard units (cm, m, kg, litre). Standard units are the same for everyone.' },
          ],
          formulas: [],
          experiments: [
            { title: 'Balance with Ruler', objective: 'Compare weights of everyday objects', materials: ['Ruler', 'String', 'Two paper cups', 'Various small objects'], steps: ['Tie cups to each end of ruler', 'Balance the ruler on a pencil', 'Put one object in each cup', 'Observe which side goes down'], result: 'The heavier object makes its side go down, lighter side goes up', safetyNote: 'Use light objects, be careful with the balance' },
          ],
          videos: [],
          keyTerms: ['Long', 'Short', 'Heavy', 'Light', 'Full', 'Empty', 'Half', 'Compare', 'Measurement', 'Cubit', 'Standard unit'],
          quickFacts: ['A metre is the standard unit of length', 'A kilogram is the standard unit of weight', 'A litre is the standard unit of liquid', 'The metric system is used by almost all countries'],
        },
        {
          id: 'c1m10', chapterNo: 10, title: 'Patterns',
          description: 'Identifying, extending and creating patterns with shapes, colours, and numbers.',
          topics: [
            { title: 'Shape Patterns', content: 'A pattern repeats in a fixed rule. Circle, triangle, circle, triangle — the rule is: repeat circle and triangle. What comes next in: square, square, circle, square, square, ___? The pattern is two squares then one circle. So next is: circle! Learning to spot patterns is a key math skill.' },
            { title: 'Colour Patterns', content: 'Red, blue, red, blue — colour pattern. Red, red, blue, red, red, blue — "2 reds then 1 blue" pattern. Patterns are everywhere: traffic lights (red, yellow, green), fruit (stripe, stripe, stripe on watermelon), birds (striped feathers). Draw your own colour pattern!' },
            { title: 'Number Patterns', content: 'Count by 2s: 2, 4, 6, 8, 10... Count by 5s: 5, 10, 15, 20... Count by 10s: 10, 20, 30, 40... These are number patterns. Pattern rule: add 2 each time. Adding 5 each time. Adding 10 each time. Skip-counting is a pattern! It helps in multiplication later.' },
            { title: 'Patterns in Nature', content: 'Nature is full of patterns: bee honeycomb (hexagons), sunflower seeds (spiral), zebra (stripes), snail shell (spiral), snowflake (6-fold symmetry), leaf veins (branching). Spotting patterns in nature connects math to the world around us. Drawing natural patterns is a fun activity!' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['Pattern', 'Repeat', 'Rule', 'Skip counting', 'Shape pattern', 'Colour pattern', 'Number pattern'],
          quickFacts: ['Math patterns are the foundation of algebra', 'Even numbers follow the pattern: ends in 0,2,4,6,8', 'Odd numbers follow the pattern: ends in 1,3,5,7,9', 'The Fibonacci pattern (1,1,2,3,5,8,13...) appears in sunflowers and shells'],
        },
      ]
    },
    {
      slug: 'evs', name: 'Environmental Studies', icon: '🌿', color: '#15803d', bg: '#f0fdf4',
      description: 'Our Body, Animals, Plants, Family and Home',
      chapters: [
        {
          id: 'c1evs1', chapterNo: 1, title: 'My Body',
          description: 'Body parts, their names, functions and how to keep the body clean and healthy.',
          topics: [
            { title: 'External Body Parts', content: 'Our body has many external (outside) parts: Head (top), Eyes (see), Ears (hear), Nose (smell), Mouth (eat, taste), Neck (connects head to body), Shoulders, Arms, Hands, Fingers, Chest, Stomach, Legs, Feet, Toes. Count your fingers: 5 on each hand = 10 total. Count toes: 5 on each foot = 10 total.' },
            { title: 'Sense Organs', content: 'We have 5 sense organs: Eyes (sight), Ears (hearing), Nose (smell), Tongue (taste), Skin (touch). Each sense organ sends information to our brain. Example: when you touch ice, skin tells brain "cold!" and brain says "pull hand away!" Senses help us understand the world safely.' },
            { title: 'Healthy Habits', content: 'To keep our body healthy: Brush teeth twice daily (morning and night). Bathe every day. Wash hands before eating and after using the toilet. Cut nails regularly. Eat fruits and vegetables. Exercise daily. Sleep 8-10 hours. These habits prevent diseases and keep us strong and active.' },
          ],
          formulas: [],
          experiments: [
            { title: 'Handprint Art', objective: 'Identify and count body parts', materials: ['Paper', 'Paint or crayon', 'Pencil'], steps: ['Place hand flat on paper', 'Trace around hand with pencil', 'Count fingers: 1,2,3,4,5', 'Draw fingernails', 'Label: palm, thumb, index finger'], result: 'Made a handprint and labelled all parts of the hand', safetyNote: 'Use non-toxic paint' },
          ],
          videos: [],
          keyTerms: ['Body parts', 'Sense organs', 'Eyes', 'Ears', 'Nose', 'Tongue', 'Skin', 'Hygiene', 'Healthy habits'],
          quickFacts: ['Humans have 206 bones', 'The skin is the largest organ of the body', 'The human eye can see about 10 million colours', 'We have about 100,000 hairs on our head'],
        },
        {
          id: 'c1evs2', chapterNo: 2, title: 'Family',
          description: 'Members of the family, roles, how family members help each other.',
          topics: [
            { title: 'My Family', content: 'A family is a group of people who live together and care for each other. My family has: Father, Mother, Brother, Sister, Grandparents. We share meals, celebrate festivals together, and help each other. Each member has a role: parents earn money and care for children, grandparents share wisdom, siblings play together.' },
            { title: 'Nuclear and Joint Family', content: 'Nuclear family: parents + children only (small family). Joint family: grandparents + parents + children + uncles + aunts + cousins (large family). Both types are wonderful! In a joint family, there are many people to play with and help you. In a nuclear family, you are very close to your parents.' },
            { title: 'Family Roles and Responsibilities', content: 'In a family, everyone helps. Father might work outside and earn. Mother might cook, teach and care. Children study, help with small tasks. Grandparents guide and tell stories. But families are different — some mothers work outside, some fathers cook. All family members deserve respect and love.' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['Family', 'Father', 'Mother', 'Siblings', 'Grandparents', 'Nuclear family', 'Joint family', 'Responsibility'],
          quickFacts: ['Family provides love, food, shelter and education', 'Grandparents are important — they carry family history', 'India celebrates Family Day on May 15', 'Most children live in families, but some live in orphanages where they are cared for by volunteers'],
        },
      ]
    },
  ]
}

// ══════════════════════════════════════════════════════════════════════
// CLASS 2 — Additional chapters
// ══════════════════════════════════════════════════════════════════════
export const CLASS2_EXTRA: ClassData = {
  classLevel: '2', label: 'Class 2', board: ['CBSE','ICSE','State'],
  description: 'Class 2 extended: Numbers to 999, Multiplication, Division, Time, Shapes',
  subjects: [
    {
      slug: 'mathematics', name: 'Mathematics (Maths Magic)', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Numbers, Multiplication intro, Time, Measurement',
      chapters: [
        {
          id: 'c2m1', chapterNo: 1, title: 'What is Long, What is Round?',
          description: 'Shapes in the environment — 2D and 3D shapes, properties and recognition.',
          topics: [
            { title: '2D Shapes (Flat Shapes)', content: '2D shapes are flat — they have length and width but no thickness. Types: Circle (no corners, no sides), Square (4 equal sides, 4 corners), Rectangle (2 long + 2 short sides, 4 corners), Triangle (3 sides, 3 corners). Look for shapes around you: clock=circle, window=rectangle, pizza slice=triangle, dice face=square.' },
            { title: '3D Shapes (Solid Shapes)', content: '3D shapes have length, width and height — they are solid. Types: Sphere (ball shape — no flat face), Cube (6 equal square faces — dice), Cuboid (6 rectangular faces — brick), Cylinder (2 circular faces, 1 curved surface — tin can), Cone (1 circular face, 1 curved surface — ice cream cone). Roll test: sphere and cylinder roll; cube and cuboid slide.' },
            { title: 'Properties of Shapes', content: 'Faces: the flat surfaces of a 3D shape. Edges: where two faces meet. Corners/Vertices: where three or more edges meet. Cube has 6 faces, 12 edges, 8 corners. Cuboid has 6 faces, 12 edges, 8 corners. Sphere has 0 faces, 0 edges, 0 corners — it\'s all curved! Count the faces, edges, corners of objects around you.' },
            { title: 'Shapes in Daily Life', content: 'Buildings use cuboids (walls), cylinders (columns), pyramids (rooftops). Kitchen: cylindrical pots, spherical fruits, cuboid bread. Sports: football (sphere), cricket bat (cuboid), coin (cylinder). Nature: eggs (oval), tree trunk (cylinder), mountains (cone). Engineering uses shapes because they are strong, stable or efficient.' },
          ],
          formulas: [
            { name: 'Shape Properties Summary', formula: 'Cube: 6 faces, 12 edges, 8 vertices | Cuboid: 6 faces, 12 edges, 8 vertices | Cone: 2 faces, 1 edge, 1 vertex | Cylinder: 3 faces, 2 edges, 0 vertices', example: 'A die is a cube — count: 6 faces (each face has numbers 1-6), 12 edges, 8 corners' },
          ],
          experiments: [
            { title: 'Shape Hunt Around the House', objective: 'Identify 2D and 3D shapes in real objects', materials: ['Paper and pencil', 'Household objects'], steps: ['Walk around the house', 'Find 3 objects that are sphere-shaped', 'Find 3 objects that are cuboid-shaped', 'Find 3 objects that are cylinder-shaped', 'Draw each object and write its shape name'], result: 'Identified common 3D shapes in everyday objects', safetyNote: 'Do not handle breakable or sharp objects' },
          ],
          videos: [],
          keyTerms: ['2D shape', '3D shape', 'Circle', 'Square', 'Rectangle', 'Triangle', 'Sphere', 'Cube', 'Cuboid', 'Cylinder', 'Cone', 'Face', 'Edge', 'Vertex'],
          quickFacts: ['A sphere has the smallest surface area for a given volume — that is why bubbles are spherical', 'The triangle is the strongest shape — used in bridges and towers', 'Snowflakes always have 6-fold symmetry', 'A football is made of 12 pentagons and 20 hexagons'],
        },
        {
          id: 'c2m2', chapterNo: 2, title: 'Counting in Groups',
          description: 'Skip counting by 2s, 5s, 10s. Introduction to multiplication as repeated addition.',
          topics: [
            { title: 'Skip Counting by 2s', content: 'Skip counting by 2 means: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20... You jump over every other number. Trick: count on your fingers but skip every "in-between" number. Even numbers are: 2, 4, 6, 8, 10, 12... They always end in 0, 2, 4, 6, or 8. Skip counting by 2 helps in counting pairs (socks, gloves, shoes).' },
            { title: 'Skip Counting by 5s', content: 'Skip counting by 5: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50... Trick: use one hand (5 fingers). Each hand is 5. Two hands = 10. Numbers ending in 0 or 5 are in the 5-times table. Clocks use this! Minute hand at 1 = 5 minutes, at 2 = 10 minutes, at 3 = 15 minutes (5, 10, 15...).' },
            { title: 'Skip Counting by 10s', content: 'Skip counting by 10: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100... It is easy! Just add a zero. 3×10=30. In the 10-times table, the last digit is always 0. Ten rupee notes: 1 note=₹10, 2 notes=₹20, 3 notes=₹30. Skip counting by 10 is the basis of place value!' },
            { title: 'Introduction to Multiplication', content: 'Multiplication is fast addition of equal groups. 3 groups of 4 = 4+4+4 = 12. We write this as 3×4=12. The × sign means multiply. 3×4 is read as "three times four" or "3 fours". Another way: 4×3 = 4+4+4 = 12. Notice: 3×4 = 4×3 = 12! This is the commutative property of multiplication.' },
          ],
          formulas: [
            { name: 'Multiplication as Repeated Addition', formula: 'a × b = a + a + a... (b times)', example: '5 × 3 = 5+5+5 = 15 (five added three times)', note: 'Or: 3×5 = 3+3+3+3+3 = 15 (three added five times). Both give 15!' },
            { name: 'Commutative Property', formula: 'a × b = b × a', example: '4 × 6 = 6 × 4 = 24' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Skip counting', 'Multiplication', 'Times', 'Groups', 'Equal groups', 'Product', 'Factor', 'Commutative'],
          quickFacts: ['Multiplication was developed in ancient Egypt', 'Skip counting by 2 gives even numbers', 'The 9 times table has a special pattern: digits always sum to 9 (9,18,27,36...)', 'Times tables help solve problems much faster than repeated addition'],
        },
        {
          id: 'c2m3', chapterNo: 3, title: 'How Much Can You Carry?',
          description: 'Measuring weight using non-standard units, comparing weights, heavier-lighter.',
          topics: [
            { title: 'Heavy and Light', content: 'Some objects weigh more (are heavier) and some weigh less (are lighter). We compare weights using a balance. The heavier side goes down. To compare: put one object on each side of the balance. The lower side is heavier. Examples: A brick is heavier than a feather. A pencil box is heavier than a pencil.' },
            { title: 'Using a Balance Scale', content: 'A balance scale has two pans. Place objects in each pan to compare. If left pan goes down: left is heavier. If pans balance (level): both are equal weight. Practice: Compare a book with an eraser. Compare 5 erasers with a book. Keep adding until the pans balance — count how many of one object equals the other.' },
            { title: 'Non-Standard Units of Weight', content: 'Before kg and grams, people used: stones, seeds, hands (palm full), loads (however much one person carries). Problem: a "stone" is different in different places! So we created standard units: 1 kilogram (kg) = 1000 grams (g). A standard unit is the same everywhere in the world. A bag of rice might weigh 5 kg. A pencil weighs about 5 g.' },
          ],
          formulas: [
            { name: 'Standard Weight Units', formula: '1 kg = 1000 g', example: 'A bag of flour weighing 2 kg = 2000 g', note: 'kg = kilogram, g = gram' },
          ],
          experiments: [
            { title: 'Paper Balance', objective: 'Compare weights of objects using a paper balance', materials: ['Cardboard strip (30 cm)', 'String (30 cm)', 'Two paper cups', 'Pencil (as fulcrum)', 'Objects to weigh'], steps: ['Punch a hole in centre of cardboard', 'Tie string through hole, hang from a fixed point', 'Attach cups to each end with string', 'Place objects to compare'], result: 'The heavier object makes its side go down', safetyNote: 'Hang balance where it will not fall' },
          ],
          videos: [],
          keyTerms: ['Weight', 'Heavy', 'Light', 'Balance', 'Standard unit', 'Kilogram', 'Gram'],
          quickFacts: ['1 kg = 1000 grams', 'A mango weighs about 200-300 grams', 'A car weighs about 1000 kg (1 tonne)', 'Weight and mass are slightly different — weight depends on gravity!'],
        },
        {
          id: 'c2m5', chapterNo: 5, title: 'Footprints',
          description: 'Measurement using non-standard and standard units, comparing lengths.',
          topics: [
            { title: 'Measuring with Body Parts', content: 'Long before rulers, people measured with body parts. Cubit: from elbow to fingertip (used in ancient Egypt). Handspan: thumb to little finger spread. Foot: length of foot (still used in countries using inches/feet). The problem: everyone\'s foot is a different size! Two children measuring the same table get different answers. We need a standard unit everyone agrees on.' },
            { title: 'Standard Unit — Centimetre and Metre', content: 'A centimetre (cm) is a standard unit of length. A ruler has 15 or 30 cm. To measure: place 0 end at start of object, read the number at the end. 100 cm = 1 metre (m). A metre is about the height of a 4-year-old child. Use metre to measure long distances, centimetre for small objects.' },
            { title: 'Comparing Lengths', content: 'To compare: measure both and compare numbers. A pencil = 15 cm. A pen = 14 cm. Pencil is longer! Direct comparison: place side by side. Indirect: measure both, compare numbers. Ordering: arrange from shortest to longest or longest to shortest. Practice: measure your desk, book, and pencil case. Arrange in order.' },
          ],
          formulas: [
            { name: 'Unit Conversion', formula: '1 m = 100 cm', example: 'A door is 2 m tall = 200 cm tall', note: 'km = kilometre: 1 km = 1000 m (for long distances like roads)' },
          ],
          experiments: [
            { title: 'Measure the Classroom', objective: 'Practice measuring using a ruler', materials: ['Ruler (30 cm)', 'Paper', 'Pencil'], steps: ['Measure the width of your textbook in cm', 'Measure the length of your pencil in cm', 'Measure the height of your water bottle in cm', 'Measure your own handspan in cm', 'Record all measurements in a table'], result: 'Practised accurate measurement with a ruler', safetyNote: 'Hold the ruler steady, keep 0 at the start' },
          ],
          videos: [],
          keyTerms: ['Measurement', 'Centimetre (cm)', 'Metre (m)', 'Ruler', 'Standard unit', 'Length', 'Compare', 'Handspan'],
          quickFacts: ['The metre was defined in France in 1791', '1 km = 1000 m (distance a person walks in about 12 minutes)', 'Light travels 300,000 km per second', 'Mount Everest is 8,848 metres tall'],
        },
        {
          id: 'c2m6', chapterNo: 6, title: 'Vegetables',
          description: 'Sorting, classification, and data collection using vegetables as context.',
          topics: [
            { title: 'Sorting by Colour', content: 'We can sort objects by their colour. Sort these vegetables: tomato (red), carrot (orange), spinach (green), brinjal (purple), potato (brown). Red group: tomatoes. Green group: spinach. Orange group: carrot. Sorting helps us organise and count more easily. How many green vegetables do you have?' },
            { title: 'Sorting by Shape', content: 'Vegetables have different shapes: Round (tomato, potato), Long (carrot, radish), Leafy (spinach, cabbage). Sort your vegetables by shape. How many are round? How many are long? Sorting by one rule gives groups. We can then count and compare groups.' },
            { title: 'Making a Picture Graph', content: 'A picture graph uses pictures to show data. If you have 3 tomatoes, draw 3 tomato pictures in a row. If you have 5 carrots, draw 5 carrot pictures. Now you can compare: more carrots than tomatoes! Reading a graph: each picture = 1 (or any agreed number). The longer row has more. Picture graphs are the simplest type of data display.' },
          ],
          formulas: [],
          experiments: [
            { title: 'Vegetable Sort', objective: 'Sort and count vegetables, make a tally', materials: ['Assorted plastic vegetables (or pictures)', 'Paper', 'Pencil'], steps: ['Sort vegetables by colour', 'Count how many in each colour group', 'Make tally marks: //// = 5', 'Draw a picture graph', 'Answer: which colour has most? Which has fewest?'], result: 'Created a simple picture graph of vegetables by colour', safetyNote: 'Handle real vegetables carefully' },
          ],
          videos: [],
          keyTerms: ['Sorting', 'Classifying', 'Data', 'Picture graph', 'Tally', 'More', 'Fewer', 'Group'],
          quickFacts: ['Data means information collected about something', 'Graphs help us see patterns quickly', 'Vegetables contain vitamins and minerals for good health', 'India is the world\'s second largest producer of vegetables'],
        },
        {
          id: 'c2m7', chapterNo: 7, title: 'Jugs and Mugs',
          description: 'Capacity and volume — full, half, quarter; measuring liquids in litres and millilitres.',
          topics: [
            { title: 'Full, Half, and Quarter', content: 'When we fill containers: Full = can hold no more. Half-full = exactly half the space is used. Quarter-full = one-fourth of the space is used. Empty = nothing inside. A full glass of water holds more than a half glass. Practice: Look at these jars — are they full, half or quarter full? Use fractions to describe how much liquid is in a container.' },
            { title: 'Measuring Capacity', content: 'Capacity is the amount a container can hold. We measure liquids in litres (L) and millilitres (mL). 1 litre = 1000 millilitres. A large water bottle holds 1 litre. A spoon holds about 5 millilitres. Milk packets in India come in 500 mL or 1 L. Medicine is often measured in mL — important for correct dosage!' },
            { title: 'Comparing Containers', content: 'Which holds more: a bucket or a glass? Bucket holds more. Which holds more: a teapot or a jug? Depends on size! To compare: pour one container into another. The one that overflows first was holding more. With standard units: 5 L > 2 L. 500 mL < 1 L. Practice: rank these from least to most: teaspoon, glass, bucket, swimming pool.' },
          ],
          formulas: [
            { name: 'Capacity Units', formula: '1 litre (L) = 1000 millilitres (mL)', example: 'A soft drink can holds 330 mL = 0.33 L', note: 'Large amounts use kilolitres (kL): 1 kL = 1000 L' },
          ],
          experiments: [
            { title: 'How Much Does It Hold?', objective: 'Compare capacity of different containers', materials: ['Several containers of different sizes', 'Water', 'Small measuring cup'], steps: ['Fill small cup with water', 'Count how many cups fill container A', 'Count how many cups fill container B', 'Compare: which took more cups?', 'That container has greater capacity'], result: 'Compared capacities of containers using a cup as non-standard unit', safetyNote: 'Do experiment near a sink to avoid spills' },
          ],
          videos: [],
          keyTerms: ['Capacity', 'Volume', 'Litre', 'Millilitre', 'Full', 'Half', 'Quarter', 'Empty', 'Container'],
          quickFacts: ['1 litre of water weighs exactly 1 kilogram (at 4°C)', 'The human body is about 60% water', 'An adult should drink about 2 litres of water per day', 'Oceans hold about 1.335 billion km³ of water'],
        },
      ]
    },
    {
      slug: 'evs', name: 'Environmental Studies', icon: '🌿', color: '#15803d', bg: '#f0fdf4',
      description: 'Plants, Animals, Water, Food — Class 2 EVS',
      chapters: [
        {
          id: 'c2evs1', chapterNo: 1, title: 'Plants — Parts and Uses',
          description: 'Parts of a plant, what each part does, plants we use for food, medicine, shade.',
          topics: [
            { title: 'Parts of a Plant', content: 'A plant has: Roots (underground — absorb water and minerals, anchor the plant), Stem (above ground — carries water and food up, supports leaves), Leaves (green, flat — make food using sunlight, water, and air), Flowers (make seeds, attract insects), Fruits (contain seeds, often we eat them), Seeds (new plant grows from seed). The tree in your garden has all these parts!' },
            { title: 'How Plants Make Food', content: 'Plants are the only living things that make their own food! Process: Photosynthesis. Leaves absorb sunlight. Roots absorb water from soil. Leaves take in carbon dioxide (CO₂) from air. With sunlight, they make glucose (sugar) and release oxygen. We breathe the oxygen! Plants are called "producers" — they produce food from non-living things.' },
            { title: 'Uses of Plants', content: 'We use plants for: Food (rice, wheat, vegetables, fruits), Medicine (neem, tulsi, aloe vera), Clothing (cotton from cotton plant), Timber/Wood (furniture, paper, houses), Oxygen (trees refresh the air), Shade (trees keep us cool). Without plants, no life on Earth! We must plant trees and not cut them unnecessarily.' },
          ],
          formulas: [],
          experiments: [
            { title: 'Watch a Seed Sprout', objective: 'Observe germination of a seed', materials: ['Bean or moong seed', 'Small pot', 'Soil', 'Water'], steps: ['Soak seed in water overnight', 'Fill pot with moist soil', 'Plant seed 2 cm deep', 'Water every day (a little)', 'Observe over 7-10 days'], result: 'Seed sprouts — tiny root emerges first, then stem, then leaves', safetyNote: 'Use small pot, do not overwater' },
          ],
          videos: [],
          keyTerms: ['Roots', 'Stem', 'Leaves', 'Flowers', 'Fruits', 'Seeds', 'Photosynthesis', 'Oxygen', 'Chlorophyll'],
          quickFacts: ['Plants make up 80% of all life on Earth by weight', 'The Amazon rainforest is called the "lungs of the Earth"', 'The oldest living tree is about 5,000 years old (Methuselah pine, USA)', 'A tree absorbs about 22 kg of CO₂ per year'],
        },
        {
          id: 'c2evs2', chapterNo: 2, title: 'Animals — Types and Habitats',
          description: 'Wild and domestic animals, pet animals, water and land animals, their homes.',
          topics: [
            { title: 'Domestic and Wild Animals', content: 'Domestic animals: kept by humans for help or food. Examples: cow (milk), dog (guard), cat (pet), horse (ride/pull), hen (eggs), goat (milk, meat). Wild animals: live in forests, jungles, rivers. Examples: lion, tiger, elephant, deer, peacock, cobra. We must NOT keep wild animals as pets — they are happiest and healthiest in their natural habitat.' },
            { title: 'Animals and Their Homes', content: 'Animals live in different places (habitats). Lion: den. Rabbit: burrow. Bird: nest. Honeybee: hive. Dog: kennel. Cow: shed/barn. Snake: hole. Fish: water (river/sea/tank). Spider: web. Matching animal to home is a classic activity. Each habitat provides food, safety and the right conditions for the animal.' },
            { title: 'What Animals Eat', content: 'Herbivores: eat only plants. Examples: cow (grass), rabbit (carrots, lettuce), deer (grass), elephant (leaves, fruits). Carnivores: eat only other animals. Examples: lion (deer), shark (fish), eagle (small animals). Omnivores: eat both plants and animals. Examples: humans, bears, dogs. Knowing what animals eat helps us understand food chains.' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['Domestic animal', 'Wild animal', 'Habitat', 'Herbivore', 'Carnivore', 'Omnivore', 'Pet', 'Den', 'Burrow', 'Nest'],
          quickFacts: ['There are about 8.7 million animal species on Earth', 'Blue whale is the largest animal (up to 30 m long)', 'Cheetah is the fastest land animal (112 km/h)', 'Hummingbird is the only bird that can fly backwards'],
        },
      ]
    },
  ]
}

// ══════════════════════════════════════════════════════════════════════
// CLASS 3 — Additional chapters
// ══════════════════════════════════════════════════════════════════════
export const CLASS3_EXTRA: ClassData = {
  classLevel: '3', label: 'Class 3', board: ['CBSE','ICSE','State'],
  description: 'Class 3 extended: Numbers to 9999, Fractions, Time, Maps, Animals, Plants',
  subjects: [
    {
      slug: 'mathematics', name: 'Mathematics (Maths Magic)', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Large numbers, fractions, time, data handling',
      chapters: [
        {
          id: 'c3m1', chapterNo: 1, title: 'Where to Look From',
          description: 'Maps, directions, different views of the same object.',
          topics: [
            { title: 'Top View, Front View, Side View', content: 'When we look at an object from different directions, we see different shapes. A cup seen from: Top (top view) = circle. Front (front view) = trapezoid. Side (side view) = same as front view. A cube seen from: Top = square. Front = square. The view depends on direction! Architects use "top view" (plan view) to design buildings.' },
            { title: 'Reading a Map', content: 'A map is a picture of a place as seen from above (top view). On a map: North is usually up, South is down, East is right, West is left. Symbols represent real objects: house symbol = house, tree symbol = park, road = line. Scale: 1 cm on map = 100 m in real life. Maps help us find our way!' },
            { title: 'Directions', content: 'There are 4 main directions: North (N), South (S), East (E), West (W). Remember with: Never Eat Soggy Waffles (N,E,S,W going clockwise). Sun rises in East, sets in West. If you face North: Right hand is East, Left hand is West, Back is South. 4 more directions: NE, NW, SE, SW (between main directions).' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['Top view', 'Front view', 'Side view', 'Map', 'North', 'South', 'East', 'West', 'Direction', 'Scale'],
          quickFacts: ['The compass was invented in China about 2000 years ago', 'GPS satellites help us know our exact location', 'Maps are drawn to scale — 1 cm might represent 1 km', 'The first accurate world map was made by Ptolemy in 150 AD'],
        },
        {
          id: 'c3m3', chapterNo: 3, title: 'Give and Take',
          description: 'Three-digit addition and subtraction with carrying and borrowing.',
          topics: [
            { title: 'Addition of 3-Digit Numbers (No Carry)', content: 'Add column by column: Ones first, then Tens, then Hundreds. Example: 234 + 152. Ones: 4+2=6. Tens: 3+5=8. Hundreds: 2+1=3. Answer: 386. Always write answer below the line. This is called the column addition method. Practice: 421+235=? 312+261=? Always check by adding in reverse order!' },
            { title: 'Addition with Carrying', content: 'When the ones column sum is ≥ 10, we "carry" to the tens column. Example: 247 + 165. Ones: 7+5=12 → write 2, carry 1. Tens: 4+6+1(carry)=11 → write 1, carry 1. Hundreds: 2+1+1(carry)=4. Answer: 412. Carrying is also called "regrouping" — we regroup 10 ones into 1 ten.' },
            { title: 'Subtraction of 3-Digit Numbers (No Borrow)', content: 'Subtract column by column: Ones, Tens, Hundreds. Example: 567 - 234. Ones: 7-4=3. Tens: 6-3=3. Hundreds: 5-2=3. Answer: 333. Always subtract the smaller number from the larger in each column when no borrowing needed. Practice: 875-213=? 964-521=? Check your answer by adding back!' },
            { title: 'Subtraction with Borrowing', content: 'When we cannot subtract (top digit < bottom digit), we "borrow" from the next column. Example: 523 - 187. Ones: 3<7, borrow from tens. 13-7=6. Tens: (5-1)-8=4<8, borrow from hundreds. 14-8=6. Hundreds: (5-1)-1=3. Answer: 336. Borrowing = regrouping. Check: 336+187=523 ✓ Always verify subtraction by addition!' },
          ],
          formulas: [
            { name: 'Column Addition', formula: 'Add ones first, then tens, then hundreds', example: '345 + 278 = 623 (5+8=13: write 3 carry 1; 4+7+1=12: write 2 carry 1; 3+2+1=6)', note: 'Carry means a group of 10 is moved to the next higher place value' },
            { name: 'Column Subtraction', formula: 'Subtract ones first, then tens, then hundreds', example: '503 - 248 = 255 (3<8: borrow; 13-8=5; 0-1-4: borrow; 10-5=5; 5-1-2=2)' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Addition', 'Subtraction', 'Carrying', 'Borrowing', 'Regrouping', 'Three-digit numbers', 'Column method'],
          quickFacts: ['The column method of arithmetic was developed in India over 1500 years ago', 'Mental arithmetic uses the same regrouping ideas', 'Calculators use binary (0s and 1s) to do addition', 'Adding 0 to any number gives the same number'],
        },
        {
          id: 'c3m4', chapterNo: 4, title: 'Long and Short',
          description: 'Measuring length, perimeter, comparing using cm and m.',
          topics: [
            { title: 'Review of Length Units', content: 'Millimetre (mm): very small — thickness of a credit card. Centimetre (cm): 10 mm = 1 cm — width of a fingernail. Metre (m): 100 cm = 1 m — height of a door handle from floor. Kilometre (km): 1000 m = 1 km — distance between two bus stops. Which unit? Use mm for tiny things, cm for classroom objects, m for rooms, km for travel distances.' },
            { title: 'Measuring Perimeter', content: 'Perimeter = total length around the boundary of a shape. For a rectangle: add all 4 sides. Example: rectangle 5 cm × 3 cm. Perimeter = 5+3+5+3 = 16 cm. For a square: 4 equal sides. Perimeter = 4 × side. Example: square with side 4 cm. Perimeter = 4×4 = 16 cm. Perimeter is used to find how much fencing, wire or string to go around a shape.' },
            { title: 'Estimating Length', content: 'Estimating means making a good guess without measuring exactly. Benchmark lengths: 1 cm ≈ width of your little fingernail; 1 m ≈ your arm span; 10 m ≈ length of a bus. Estimation skills: look at the object, compare to a benchmark, make your estimate, then measure to check. Good estimates are close to the actual measurement.' },
          ],
          formulas: [
            { name: 'Unit conversion', formula: '10 mm = 1 cm | 100 cm = 1 m | 1000 m = 1 km', example: '250 cm = 2 m 50 cm = 2.5 m', note: 'Convert from larger to smaller unit: multiply. Smaller to larger: divide.' },
            { name: 'Perimeter of Rectangle', formula: 'P = 2 × (length + breadth)', example: 'Rectangle 8 cm × 5 cm: P = 2×(8+5) = 2×13 = 26 cm' },
            { name: 'Perimeter of Square', formula: 'P = 4 × side', example: 'Square side = 7 cm: P = 4×7 = 28 cm' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Millimetre', 'Centimetre', 'Metre', 'Kilometre', 'Perimeter', 'Boundary', 'Estimate'],
          quickFacts: ['The metre was originally defined as 1/10,000,000 of the distance from equator to North Pole', 'Light travels about 300,000 km in one second', 'The longest road in India is NH44 (4,112 km)', 'An ant walks about 10 m per minute'],
        },
        {
          id: 'c3m5', chapterNo: 5, title: 'Shapes and Designs',
          description: 'Symmetry, tessellation, tangrams, patterns in geometry.',
          topics: [
            { title: 'Lines of Symmetry', content: 'A shape has symmetry if you can fold it and the two halves match exactly. The fold line is the line of symmetry (or mirror line). Shapes and their lines: Circle (infinite), Square (4 lines), Rectangle (2 lines), Equilateral triangle (3 lines), Isoceles triangle (1 line), Regular hexagon (6 lines). In nature: butterfly wings, human face, leaves all have symmetry (approximately).' },
            { title: 'Tessellations', content: 'Tessellation = tiling pattern where shapes fit together with no gaps or overlaps. Shapes that tessellate: squares, rectangles, triangles, regular hexagons. Shapes that don\'t: circles (leave gaps), regular pentagons. Honeybee combs are hexagonal tessellations — the most efficient use of space! Floor tiles, bathroom tiles, brickwork are all examples of tessellations.' },
            { title: 'Tangram', content: 'A tangram is a 7-piece Chinese puzzle made by cutting a square into: 2 large triangles, 1 medium triangle, 2 small triangles, 1 square, 1 parallelogram. Rearrange all 7 pieces to form: animals, people, objects. Every arrangement must use all 7 pieces with no overlap. Tangrams develop spatial thinking and creativity. The puzzle is over 1000 years old!' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['Symmetry', 'Line of symmetry', 'Tessellation', 'Tangram', 'Fold', 'Mirror', 'Pattern', 'Geometry'],
          quickFacts: ['A human face has approximate bilateral (2-sided) symmetry', 'Bees naturally build hexagonal combs — using 33% less wax than square cells!', 'The word symmetry comes from Greek "symmetria" meaning same measure', 'Tessellations are used in Islamic art (geometric tile patterns)'],
        },
        {
          id: 'c3m6', chapterNo: 6, title: 'Fun with Give and Take',
          description: 'Word problems involving addition and subtraction of 3-4 digit numbers.',
          topics: [
            { title: 'Choosing the Right Operation', content: 'Read the problem carefully. Keywords for addition: "altogether", "in all", "total", "combined", "more". Keywords for subtraction: "left", "remaining", "difference", "less than", "how many more". Example: "238 students and 145 teachers — how many people altogether?" → Addition: 238+145 = 383. "School has 587 books, 234 are taken. How many are left?" → Subtraction: 587-234 = 353.' },
            { title: 'Solving Word Problems Step by Step', content: 'Step 1: Read the problem twice. Step 2: Underline the numbers and key words. Step 3: Decide: add or subtract? Step 4: Set up the calculation. Step 5: Solve. Step 6: Write the answer with units. Example: "A train had 456 passengers. At the next station 234 got off. How many are left?" Numbers: 456, 234. Key word: "got off" → subtract. 456-234=222. Answer: 222 passengers are left.' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['Word problem', 'Operation', 'Addition key words', 'Subtraction key words', 'Total', 'Remaining', 'Difference'],
          quickFacts: ['Word problems combine math with reading comprehension', 'Engineers use word problems daily — calculating loads, distances, costs', 'India\'s railway system moves over 8 billion passengers per year!', 'Mental maths helps solve problems faster'],
        },
        {
          id: 'c3m7', chapterNo: 7, title: 'Time Goes On',
          description: 'Telling time on a clock, hours, minutes, AM/PM, calendar.',
          topics: [
            { title: 'Reading a Clock', content: 'A clock has: Hour hand (short, moves slowly — 12 hours for one full rotation), Minute hand (long, moves faster — 60 minutes for one full rotation). Reading time: look at hour hand for hour, look at minute hand for minutes. When minute hand at 12: time is exactly on the hour (e.g., 3:00). At 3: time is 15 minutes past (3:15). At 6: 30 minutes past (half past). At 9: 45 minutes past (quarter to next hour).' },
            { title: 'Hours and Minutes', content: '60 minutes = 1 hour. 24 hours = 1 day. AM = after midnight (12:00 AM to 11:59 AM — morning). PM = after noon (12:00 PM to 11:59 PM — afternoon and night). School starts at 8:00 AM. School ends at 2:00 PM. Dinner is at 8:00 PM. Practice: What is 30 minutes after 3:15? Answer: 3:45. What is 1 hour after 11:30? Answer: 12:30.' },
            { title: 'Calendar — Days, Months, Year', content: '7 days = 1 week. About 4 weeks = 1 month. 12 months = 1 year. Days: Mon, Tue, Wed, Thu, Fri (school days), Sat, Sun (weekend). Months: 30 days: April, June, September, November. 31 days: January, March, May, July, August, October, December. February: 28 days (29 in leap year every 4 years). Trick: "30 days has September, April, June, and November..."' },
          ],
          formulas: [
            { name: 'Time Conversion', formula: '60 seconds = 1 minute | 60 minutes = 1 hour | 24 hours = 1 day | 7 days = 1 week | 52 weeks = 1 year', example: '2 hours = 2×60 = 120 minutes | 3 days = 3×24 = 72 hours' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Clock', 'Hour hand', 'Minute hand', 'AM', 'PM', 'Calendar', 'Week', 'Month', 'Year', 'Leap year'],
          quickFacts: ['A day is defined by one rotation of Earth', 'A year is defined by one orbit of Earth around the Sun', 'Leap years occur because a year is actually 365.25 days', 'The concept of 60 minutes in an hour comes from ancient Babylon (base-60 counting)'],
        },
        {
          id: 'c3m8', chapterNo: 8, title: 'Who is Heavier?',
          description: 'Standard units of weight: kg and g, measuring and comparing mass.',
          topics: [
            { title: 'Grams and Kilograms', content: 'Gram (g): small unit of weight. 1000 g = 1 kilogram (kg). A pencil ≈ 5 g. A mango ≈ 200 g. A bag of sugar = 1 kg = 1000 g. A bag of rice often = 5 kg. A school bag ≈ 3 kg. Your body weight ≈ 20-30 kg. Weigh yourself: how many kg? Using the right unit: "I weigh 25 kg" NOT "I weigh 25 g" (that would be like weighing a pencil!).' },
            { title: 'Reading a Weighing Scale', content: 'Weighing machines have dials or digital displays. Bathroom scale: for weighing people in kg. Kitchen scale: for cooking in g or kg. Find the largest number on the scale — that is the maximum weight. Read the pointer/number. Digital scale: just read the numbers displayed. If 500 g flour in a bowl on a 2 kg digital scale: display shows 0.5 kg or 500 g depending on setting.' },
            { title: 'Estimating and Comparing Weight', content: 'Estimation: A brick ≈ 1 kg, so 2 bricks ≈ 2 kg. Feather ≈ 0.01 g. Coin ≈ 8 g. Mobile phone ≈ 200 g. Comparing: Which is heavier: 3 kg of cotton or 3 kg of iron? TRICK QUESTION! Both are 3 kg. Weight depends on amount, not material. 3 kg = 3 kg regardless of material. Cotton just takes up more space (less dense).' },
          ],
          formulas: [
            { name: 'Weight Units', formula: '1 kg = 1000 g', example: '2.5 kg = 2500 g | 500 g = 0.5 kg', note: 'Scientific unit of mass is kilogram (kg)' },
          ],
          experiments: [
            { title: 'Weigh Everyday Objects', objective: 'Practice using a kitchen scale', materials: ['Kitchen scale', 'Various small objects (pencil, eraser, book)'], steps: ['Set scale to zero', 'Place object on scale', 'Read the display (in grams)', 'Record in a table', 'Order objects from lightest to heaviest'], result: 'Measured and compared weights of classroom objects', safetyNote: 'Do not exceed the scale\'s maximum capacity' },
          ],
          videos: [],
          keyTerms: ['Gram', 'Kilogram', 'Weighing scale', 'Mass', 'Weight', 'Estimation', 'Comparison'],
          quickFacts: ['1 litre of water = 1 kg (at 4°C) — this was used to define the kilogram originally', 'The official kilogram was a platinum-iridium cylinder in Paris until 2019', 'A loaded Boeing 747 can weigh 412,000 kg at takeoff', 'An ant can carry 50 times its own body weight'],
        },
      ]
    },
    {
      slug: 'evs', name: 'Environmental Studies', icon: '🌿', color: '#15803d', bg: '#f0fdf4',
      description: 'Class 3 EVS — Food, Shelter, Travel, Water',
      chapters: [
        {
          id: 'c3evs1', chapterNo: 1, title: 'Poonam\'s Day Out',
          description: 'Observing animals in the environment, their characteristics and behaviour.',
          topics: [
            { title: 'Animals in the Environment', content: 'When Poonam goes out she sees many animals: birds, insects, butterflies, snails, squirrels. Each animal is adapted to its habitat. A squirrel in a tree = adapted to climbing (strong claws, bushy tail for balance). An earthworm in soil = adapted to burrowing (no legs, moist skin, strong muscles). Observing animals in natural settings teaches us about their true behaviour.' },
            { title: 'Bird Features', content: 'Birds have unique features: Feathers (for flight, warmth), Wings (two, for flying), Beak (no teeth — shape depends on food), Hollow bones (light for flying), Lay eggs. Beak types: Sharp/hooked (eagle/hawk — tear meat), Long/pointed (woodpecker — drill wood for insects), Wide/flat (duck — filter water for food), Short/thick (sparrow — crack seeds). Beak shape = food type!' },
            { title: 'Insects', content: 'Insects: 3 body parts (head, thorax, abdomen), 6 legs (always!), often 2 pairs of wings, antennae. Examples: ant, bee, butterfly, mosquito, dragonfly. Insects are the most numerous animals — over 1 million species! Most are helpful (bees pollinate flowers, ants aerate soil). Some are pests (mosquitoes spread disease). Insects are vital to ecosystems.' },
          ],
          formulas: [],
          experiments: [
            { title: 'Insect Observation', objective: 'Observe and describe insects in the garden', materials: ['Magnifying glass', 'Notebook', 'Pencil'], steps: ['Go to the garden or park', 'Look under leaves and stones for insects', 'Use magnifying glass to observe closely', 'Count: how many legs? Body parts?', 'Draw and label your observation'], result: 'Observed insects and identified key features (6 legs, 3 body parts)', safetyNote: 'Do not touch unknown insects — some sting. Look but do not harm.' },
          ],
          videos: [],
          keyTerms: ['Adaptation', 'Habitat', 'Bird', 'Insect', 'Beak', 'Feathers', 'Antennae', 'Six legs', 'Three body parts'],
          quickFacts: ['There are about 10,000 species of birds', 'About 1 in 3 bites of food we eat depends on bee pollination', 'A butterfly can taste with its feet', 'Dragonflies can fly at 50 km/h and catch 95% of prey they chase'],
        },
        {
          id: 'c3evs3', chapterNo: 3, title: 'Roofs and Walls',
          description: 'Types of houses, building materials, traditional vs modern homes across India.',
          topics: [
            { title: 'Why Do We Need Houses?', content: 'Houses provide: Shelter from rain, sun, and cold. Safety from animals and strangers. Privacy. A place to sleep, eat and keep belongings. Different climates need different types of houses. Hot desert: thick walls (keeps cool). Cold mountains: sloped roofs (snow slides off). Coastal areas: stilt houses (safe from floods). Smart people design homes to suit the climate!' },
            { title: 'Building Materials', content: 'Traditional materials: Mud and clay (kutcha house), Bamboo, Straw and grass, Stone (Kerala, Rajasthan). Modern materials: Brick and cement (pucca house), Steel, Glass, RCC (Reinforced Cement Concrete). Traditional houses are eco-friendly and use local materials. Modern houses are strong and durable. Many places mix both — brick walls with traditional decorations.' },
            { title: 'Homes Around India', content: 'India is diverse — home styles vary: North: RCC flat-roofed houses in plains; sloped roofs in hills (Himachal Pradesh). East: bamboo and wood (Assam, Meghalaya). West: mud houses (Rajasthan), with beautiful colourful designs. South: tiled roofs (Tamil Nadu, Kerala). Underground houses: some communities in Rajasthan. Boats: Kashmiri houseboat. Every style reflects climate and culture.' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['Shelter', 'Kutcha house', 'Pucca house', 'Building materials', 'Mud', 'Brick', 'Concrete', 'Climate', 'Adaptation'],
          quickFacts: ['The Great Wall of China is made of bricks and stone', 'Ice houses (igloos) are warm inside because ice insulates heat', 'India has the world\'s tallest residential building (World One, 442 m, Mumbai)', 'Bamboo is stronger than steel per unit weight'],
        },
        {
          id: 'c3evs5', chapterNo: 5, title: 'Chhotu\'s House',
          description: 'Understanding different types of families and their daily routines.',
          topics: [
            { title: 'Daily Routines', content: 'Every family has a routine — the order of activities in a day. Morning: wake up, brush teeth, bathe, breakfast, school. Afternoon: school, lunch, rest or play. Evening: homework, outdoor play, dinner. Night: sleep. Routine helps us be organised and ensures we do all necessary tasks. Different families have different routines based on work and culture.' },
            { title: 'Helping at Home', content: 'Children can help at home: Setting the table. Watering plants. Keeping room tidy. Washing own plate. Folding clothes. These responsibilities teach: time management, respect, care for others, self-reliance. In many traditional homes, girls and boys had different tasks. Today, all family members share responsibilities. Helping at home is a sign of maturity and respect.' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['Routine', 'Responsibilities', 'Chores', 'Family', 'Cooperation', 'Independence'],
          quickFacts: ['Research shows children who have chores are more responsible adults', 'Routine reduces stress and helps the brain focus', 'In India, joint families are common — 3+ generations under one roof', 'The first lesson of discipline starts at home'],
        },
      ]
    },
  ]
}

// ══════════════════════════════════════════════════════════════════════
// CLASS 4 — Additional chapters
// ══════════════════════════════════════════════════════════════════════
export const CLASS4_EXTRA: ClassData = {
  classLevel: '4', label: 'Class 4', board: ['CBSE','ICSE','State'],
  description: 'Class 4 extra: Large numbers, Multiplication tables, Division, Fractions, Decimals',
  subjects: [
    {
      slug: 'mathematics', name: 'Mathematics', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Numbers to 99999, Long multiplication, Long division, Fractions',
      chapters: [
        {
          id: 'c4m1', chapterNo: 1, title: 'Building with Bricks',
          description: 'Multiplication of 2-3 digit numbers, multiplicand, multiplier, product.',
          topics: [
            { title: 'Revisiting Multiplication Tables', content: 'Multiplication tables 1-12 are the foundation. Key: 6×7=42, 7×8=56, 8×9=72, 9×9=81 (commonly confused). Method to learn: sing tables, use visual arrays, practice daily. "Nines trick": 9×6 — hold up fingers, fold the 6th finger, count 5 to the left and 4 to the right = 54. 9×any digit: first digit = (digit-1), second digit = (10-digit). Example: 9×7: first=6, second=3 → 63.' },
            { title: 'Multiplying 2-Digit by 1-Digit', content: 'Method: Multiply ones first, then tens. Example: 34 × 7. Ones: 4×7=28, write 8 carry 2. Tens: 3×7=21, +2(carry)=23. Answer: 238. Or: expand 34 = 30+4. Then: 30×7=210 and 4×7=28. Add: 210+28=238. This expanded form helps understand why the method works. Always check by rough estimate: 34×7 ≈ 35×7 = 245. Close to 238 ✓' },
            { title: 'Multiplying by 10, 100, 1000', content: 'Shortcut: Multiply by 10: add one zero. 47×10=470. Multiply by 100: add two zeros. 47×100=4700. Multiply by 1000: add three zeros. 47×1000=47000. WHY? Because place values shift left: 47 → 4 hundreds 7 tens (×10). This rule makes mental multiplication very fast! Use it: 25×40 = 25×4×10 = 100×10 = 1000.' },
            { title: 'Multiplying 2-Digit by 2-Digit', content: 'Example: 23 × 14. Step 1: 23×4 = 92. Step 2: 23×10 = 230 (multiply by tens digit, add zero). Step 3: Add: 92+230 = 322. Written method: write partial products separately, then add. Grid method: draw 4 boxes, multiply each part. 20×10=200, 20×4=80, 3×10=30, 3×4=12. Add all: 200+80+30+12=322. All methods give same answer!' },
          ],
          formulas: [
            { name: 'Multiplication', formula: 'Multiplicand × Multiplier = Product', example: '23 × 14 = 322 (23 is multiplicand, 14 is multiplier, 322 is product)' },
            { name: 'Multiply by Powers of 10', formula: 'N × 10 = N with one extra 0 | N × 100 = N with two extra 0s', example: '56 × 1000 = 56,000' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Multiplication', 'Multiplicand', 'Multiplier', 'Product', 'Partial products', 'Grid method', 'Carry'],
          quickFacts: ['Multiplication is just fast addition of equal groups', 'The multiplication sign × was first used by William Oughtred in 1631', 'Binary computers multiply using repeated shifting', 'The largest known prime number has over 24 million digits'],
        },
        {
          id: 'c4m2', chapterNo: 2, title: 'Tick Tick Tick',
          description: 'Time — 24-hour clock, calculating time intervals, calendars.',
          topics: [
            { title: '24-Hour Clock (Railway Time)', content: '12-hour clock: 12 AM (midnight) to 12 PM (noon), then 12 PM to 11 PM. Confusing! 24-hour clock: runs from 00:00 (midnight) to 23:59. No AM/PM needed. Morning 7 AM = 07:00. Noon 12 PM = 12:00. Evening 6 PM = 18:00 (12+6). Night 11 PM = 23:00. Midnight = 00:00 (not 24:00). Indian Railways uses 24-hour clock — that is why your train ticket shows "18:30" not "6:30 PM".' },
            { title: 'Calculating Time Duration', content: 'How long is the journey? Train leaves 10:30, arrives 14:45. Duration: 14:45 - 10:30 = 4 hours 15 minutes. Method: Count hours first (10:30 to 14:30 = 4 hours), then count minutes (14:30 to 14:45 = 15 min). Total: 4h 15min. Another way: convert to total minutes. 10:30 = 630 min. 14:45 = 885 min. Difference = 255 min = 4h 15min.' },
            { title: 'Calendar Calculations', content: 'How many days from 15 March to 20 April? Days remaining in March: 31-15 = 16 days. Days in April until 20th: 20 days. Total: 16+20 = 36 days. How many weeks and days? 36÷7 = 5 weeks 1 day. Such calculations are used for: planning trips, counting days until an event, calculating age. Practice: how many days until your birthday?' },
          ],
          formulas: [
            { name: '24-hour conversion', formula: 'PM time (except noon): 24-hr = 12-hr + 12', example: '3:00 PM = 3+12 = 15:00 | 8:30 PM = 8:30+12 = 20:30' },
            { name: 'Time difference', formula: 'End time - Start time = Duration', example: '15:45 - 11:20 = 4 h 25 min' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['24-hour clock', 'AM', 'PM', 'Duration', 'Calendar', 'Time difference', 'Interval'],
          quickFacts: ['The 24-hour clock was used by the ancient Egyptians', 'The first mechanical clocks were built in Europe in the 13th century', 'The most accurate atomic clocks lose only 1 second in 300 million years!', 'Time zones: the world is divided into 24 time zones'],
        },
        {
          id: 'c4m3', chapterNo: 3, title: 'A Trip to Bhopal',
          description: 'Maps, distance, money problems in real-life context of travel.',
          topics: [
            { title: 'Reading Maps and Scale', content: 'A map uses a scale to represent real distances. Scale 1 cm = 100 km means: if the map shows 3 cm between two cities, actual distance = 3×100 = 300 km. Reading a map: find the scale (usually at bottom or corner). Measure the map distance with a ruler. Multiply by the scale factor. India is about 3,000 km from north to south — on a 1:5,000,000 scale map that is 60 cm.' },
            { title: 'Calculating Travel Costs', content: 'Real-life money problems: Train tickets: ₹450 per person × 4 people = ₹1800. Hotel: ₹800 per night × 3 nights = ₹2400. Food: ₹600 per day × 4 days = ₹2400. Total trip cost = ₹1800 + ₹2400 + ₹2400 = ₹6600. Budget left: ₹8000 - ₹6600 = ₹1400. Money maths uses all 4 operations — addition, subtraction, multiplication, division.' },
          ],
          formulas: [
            { name: 'Map Scale', formula: 'Actual distance = Map distance × Scale factor', example: 'Map distance 5 cm, scale 1 cm = 50 km → Actual = 5×50 = 250 km' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Scale', 'Map', 'Distance', 'Budget', 'Travel cost', 'Estimation'],
          quickFacts: ['Google Maps uses GPS and satellite images to show routes', 'The shortest route is not always the fastest — traffic matters!', 'The first detailed maps were made by ancient Babylonians on clay tablets', 'India has over 3.3 million km of roads'],
        },
        {
          id: 'c4m4', chapterNo: 4, title: 'Smart Charts',
          description: 'Bar graphs, pictographs, tally charts — representing and reading data.',
          topics: [
            { title: 'Collecting and Organising Data', content: 'Data = information. Steps to organise: 1. Collect (survey: ask everyone in class their favourite subject). 2. Tally (make tally marks as each person answers). 3. Count (count tallies for each category). 4. Display (graph). Tally marks: ||||  = 5 (four vertical, one diagonal). Counting in 5s makes tallying faster. Your tally table is the data table.' },
            { title: 'Bar Graphs', content: 'A bar graph uses rectangular bars to show data. X-axis (horizontal): categories (subjects, months). Y-axis (vertical): values (number of students, cm of rainfall). Bar height = value. Reading a bar graph: find the bar, go across to the y-axis to read value. Comparing bars: the taller bar has more. Bar graphs are used in newspapers, sports statistics, weather reports.' },
            { title: 'Interpreting Graphs', content: 'From a bar graph we can: Find highest/lowest value (tallest/shortest bar). Calculate total (add all bar values). Find difference (subtract two bar values). Identify trends. Example: Monthly rainfall graph. Which month had most rain? August (tallest bar). How much more rain in August than July? 250-200=50 mm. Graphs make data easy to understand at a glance.' },
          ],
          formulas: [],
          experiments: [
            { title: 'Class Favourite Colour Survey', objective: 'Collect data and draw a bar graph', materials: ['Paper', 'Coloured pencils', 'Ruler'], steps: ['Survey classmates: What is your favourite colour?', 'Make a tally table', 'Count tallies for each colour', 'Draw x and y axes on paper', 'Draw a bar for each colour with height = count', 'Label axes and title'], result: 'Created a bar graph from real survey data', safetyNote: 'None' },
          ],
          videos: [],
          keyTerms: ['Data', 'Tally', 'Bar graph', 'X-axis', 'Y-axis', 'Category', 'Value', 'Survey', 'Pictograph'],
          quickFacts: ['The first modern statistical bar graph was made by William Playfair in 1786', 'Data science is one of the most important careers today', 'Sports analytics uses graphs to improve team performance', 'India conducts a Census every 10 years to collect population data'],
        },
        {
          id: 'c4m5', chapterNo: 5, title: 'The Way the World Looks',
          description: 'Patterns, symmetry, and reflecting/rotating shapes.',
          topics: [
            { title: 'Reflection (Mirror Image)', content: 'When you look in a mirror, you see a reflection. In a reflection: the image is the same distance behind the mirror as the object is in front. Left and right are swapped (your right hand appears to be on the left in the mirror). The mirror line is the line of symmetry. Reflections are used in: art, architecture, kaleidoscopes, designing logos.' },
            { title: 'Rotation', content: 'Rotation means turning around a fixed point. A wheel rotates about its centre. Rotation: 90° (quarter turn), 180° (half turn), 270° (three-quarter turn), 360° (full turn — back to start). A square looks the same after rotating 90°, 180°, 270° or 360° — it has rotational symmetry of order 4. A circle looks the same after any rotation — infinite symmetry.' },
            { title: 'Patterns in Art and Architecture', content: 'Patterns appear in: Rangoli designs (rotation and reflection), Islamic geometric art (tessellations), Snowflakes (6-fold rotational symmetry), Taj Mahal (bilateral symmetry), Honeycomb (hexagonal tessellation). These patterns are mathematical! Architects and artists use symmetry to make beautiful designs. You can create patterns too: fold paper, cut, unfold to see symmetry.' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['Reflection', 'Mirror image', 'Rotation', 'Symmetry', 'Pattern', '90 degrees', 'Half turn', 'Full turn'],
          quickFacts: ['A circle has infinite lines of symmetry', 'The letter H has 2 lines of symmetry', 'Snowflakes have 6-fold symmetry because of ice crystal structure', 'The Taj Mahal has perfect bilateral symmetry — each side is a mirror image of the other'],
        },
      ]
    },
    {
      slug: 'evs', name: 'Environmental Studies', icon: '🌿', color: '#15803d', bg: '#f0fdf4',
      description: 'Class 4 EVS — Food, Transport, Plants, Water, Shelter',
      chapters: [
        {
          id: 'c4evs2', chapterNo: 2, title: 'Ear to Ear',
          description: 'How animals hear and communicate, different types of sounds in nature.',
          topics: [
            { title: 'How We Hear', content: 'Sound is a vibration that travels through air to our ears. The ear has: Outer ear (pinna) — collects sound, like a funnel. Ear canal — channels sound inward. Eardrum — vibrates when sound hits it. Ossicles (3 tiny bones: malleus, incus, stapes) — amplify vibrations. Cochlea (snail-shaped) — converts vibrations to nerve signals. Auditory nerve — sends signals to brain, which interprets them as sound.' },
            { title: 'Animal Communication', content: 'Animals use sounds to communicate: Warning calls (crow caws to warn of predators), Mating calls (peacock spreads tail + cries), Mother-child calls (elephant calf calls mother), Echo-location (bats emit ultrasound, hear echo to navigate and hunt). Some animals communicate without sound: bees dance to show direction to food, ants leave chemical trails, fireflies flash lights. Communication helps survival.' },
            { title: 'Sounds in Nature', content: 'Natural sounds: thunder, rain, river, wind, birdsong. Artificial sounds: machines, vehicles, music. Noise pollution: too much loud noise damages hearing. Sources of noise pollution: factories, traffic, loudspeakers, firecrackers. Effects: hearing loss, stress, difficulty sleeping, affects wildlife (whale communication disrupted by ship engines). Solution: soundproof walls, quiet zones, noise regulations.' },
          ],
          formulas: [],
          experiments: [
            { title: 'Tin Can Telephone', objective: 'Show how sound travels through solids', materials: ['2 tin cans', 'String (3 m)', 'Nail'], steps: ['Make small hole in bottom of each can', 'Thread string through holes, tie knot to hold', 'Pull string tight between two people', 'One person speaks into can, other holds can to ear', 'Compare: string tight vs loose vs too long'], result: 'Sound travels through tight string better than through air (string conducts vibration efficiently)', safetyNote: 'Sand down sharp edges of cans' },
          ],
          videos: [],
          keyTerms: ['Sound', 'Vibration', 'Eardrum', 'Ear canal', 'Communication', 'Echolocation', 'Noise pollution', 'Ultrasound'],
          quickFacts: ['Sound travels at about 340 m/s in air (much slower than light at 300,000 km/s)', 'Dogs can hear frequencies up to 65,000 Hz; humans up to 20,000 Hz', 'Blue whales make the loudest sounds of any animal (up to 188 dB)', 'Noise above 85 dB for extended periods can cause hearing damage'],
        },
        {
          id: 'c4evs3', chapterNo: 3, title: 'From the Window',
          description: 'Observing and appreciating trees, their diversity, and importance.',
          topics: [
            { title: 'Types of Trees', content: 'Trees are the largest plants. Types: Evergreen trees: keep leaves all year (mango, neem, banyan). Deciduous trees: shed leaves in winter/dry season (teak, peepal in some regions). Coniferous trees: needle-like leaves, found in cold mountains (pine, cedar, fir). Deciduous trees drop leaves to conserve water during dry periods — a smart adaptation! India has all three types depending on the region.' },
            { title: 'Parts of a Tree', content: 'Roots: underground, absorb water and minerals, anchor the tree. Can be very deep (banyan: up to 3 m), or wide spread (100 m radius!). Trunk: strong woody stem, carries water up and food down, stores food, provides structural support. Bark: protects trunk from insects, disease, and water loss. Branches and leaves: capture sunlight for photosynthesis. Seeds and fruits: reproduction.' },
            { title: 'Trees and Our Lives', content: 'Trees give us: Oxygen (one tree = oxygen for 2 people for a year), Food (fruits, nuts), Medicine (neem, tulsi, ashwagandha), Timber (furniture, buildings, paper), Shade and coolness (cities with trees are 3-5°C cooler!), Biodiversity (one oak tree supports 500+ species). Deforestation: India lost significant forest cover. Reforestation: India planted 66 million trees in 12 hours (2016 record). Plant a tree today!' },
          ],
          formulas: [],
          experiments: [
            { title: 'Leaf Rubbings', objective: 'Study leaf shapes and vein patterns', materials: ['Leaves of different trees', 'White paper', 'Wax crayons'], steps: ['Collect 5-6 different leaves', 'Place leaf under paper, vein-side up', 'Rub crayon over paper to reveal leaf pattern', 'Label each leaf with tree name', 'Compare: which has the most veins?'], result: 'Observed different leaf shapes and vein patterns — each tree species has a unique leaf pattern', safetyNote: 'Do not damage living plants, use fallen leaves' },
          ],
          videos: [],
          keyTerms: ['Evergreen', 'Deciduous', 'Coniferous', 'Trunk', 'Bark', 'Roots', 'Photosynthesis', 'Deforestation', 'Reforestation'],
          quickFacts: ['The banyan tree (India\'s national tree) can spread over 2 hectares — one tree looks like a forest!', 'The tallest tree in the world is Hyperion (sequoia) in USA at 115 metres', 'Trees communicate through underground fungal networks — the "Wood Wide Web"', 'India has about 24% forest cover — we need to increase this to 33%'],
        },
      ]
    },
  ]
}

// ══════════════════════════════════════════════════════════════════════
// CLASS 5 — Additional chapters
// ══════════════════════════════════════════════════════════════════════
export const CLASS5_EXTRA: ClassData = {
  classLevel: '5', label: 'Class 5', board: ['CBSE','ICSE','State'],
  description: 'Class 5 extra: Large numbers, Percentages, Algebra intro, Speed-Distance-Time',
  subjects: [
    {
      slug: 'mathematics', name: 'Mathematics', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Large numbers, fractions, decimals, percentage, average, speed',
      chapters: [
        {
          id: 'c5m1', chapterNo: 1, title: 'The Fish Tale',
          description: 'Large numbers in real context — millions, comparison, number names.',
          topics: [
            { title: 'Numbers in Millions', content: '1 thousand = 1,000. 1 lakh = 1,00,000 (1 hundred thousand). 10 lakh = 10,00,000 = 1 million. 1 crore = 1,00,00,000 = 10 million. Indian system: thousands, lakhs, crores. International system: thousands, millions, billions. India: 1,40,00,00,000 people = 1 billion 400 million = 140 crore. Both systems are valid — know both!' },
            { title: 'Comparing and Ordering Large Numbers', content: 'To compare: first count digits (more digits = larger). Same digits: compare from left. 4,56,789 vs 4,23,456. Both have 6 digits. Left-most same (4). Second: 56 > 23, so 4,56,789 > 4,23,456. Ordering: arrange 5 numbers from smallest to largest. Use place value chart to align numbers before comparing.' },
            { title: 'Estimation with Large Numbers', content: 'Estimation = rounding to nearest convenient unit. Round to nearest thousand: 3,678 → 4,000 (since 6 ≥ 5). 2,341 → 2,000 (since 3 < 5). Rounding rule: look at digit to the right of rounding place. ≥5: round up. <5: round down. Use estimation to check if an answer is reasonable: 5,678 × 9 ≈ 6,000 × 9 = 54,000. Actual: 51,102. Close! Estimation confirmed it is reasonable.' },
          ],
          formulas: [
            { name: 'Indian Number System', formula: '1 crore = 100 lakh | 1 lakh = 100 thousand | 1 thousand = 10 hundred', example: '2,75,48,923 = 2 crore 75 lakh 48 thousand 9 hundred 23' },
            { name: 'Rounding Rule', formula: 'If digit to the right is ≥ 5: round up | < 5: round down', example: 'Round 7,349 to nearest hundred: look at tens digit (4 < 5) → 7,300' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Thousand', 'Lakh', 'Crore', 'Million', 'Billion', 'Estimation', 'Rounding', 'Place value'],
          quickFacts: ['India\'s population is about 1.4 billion = 140 crore', 'One million seconds = about 11.5 days', 'The national debt of many countries is in trillions', 'A googol is 10^100 — more than atoms in the observable universe'],
        },
        {
          id: 'c5m2', chapterNo: 2, title: 'Shapes and Angles',
          description: 'Types of angles, triangles, quadrilaterals, and their properties.',
          topics: [
            { title: 'Types of Angles', content: 'An angle is formed when two lines meet at a point. Types: Acute angle: less than 90° (sharp — like a corner of a book cover when half open). Right angle: exactly 90° (corner of a square, ⊾ symbol). Obtuse angle: greater than 90° but less than 180° (wider than a right angle). Straight angle: exactly 180° (a straight line). Reflex angle: greater than 180° (more than half a turn).' },
            { title: 'Types of Triangles', content: 'By sides: Equilateral (all 3 sides equal — all angles 60°). Isosceles (2 equal sides — 2 equal angles). Scalene (no equal sides — no equal angles). By angles: Acute triangle (all angles acute). Right triangle (one angle = 90° — the right angle triangle used in Pythagoras theorem later). Obtuse triangle (one angle obtuse). Important: Angles of any triangle always add up to 180°!' },
            { title: 'Quadrilaterals and Their Properties', content: 'Quadrilaterals are 4-sided polygons. Sum of angles = 360° (always!). Types: Square (4 equal sides, 4 right angles), Rectangle (2 pairs equal sides, 4 right angles), Parallelogram (opposite sides equal and parallel), Rhombus (4 equal sides, opposite angles equal), Trapezium (one pair of parallel sides). Area of square = side². Area of rectangle = length × breadth.' },
          ],
          formulas: [
            { name: 'Angle Sum of Triangle', formula: '∠A + ∠B + ∠C = 180°', example: 'If two angles are 60° and 70°, third angle = 180-60-70 = 50°' },
            { name: 'Angle Sum of Quadrilateral', formula: 'Sum of all 4 angles = 360°', example: 'If three angles are 90°, 90°, 80°, fourth angle = 360-260 = 100°' },
            { name: 'Area of Rectangle', formula: 'Area = length × breadth', example: 'Room 5m × 4m: Area = 5×4 = 20 m²' },
            { name: 'Area of Square', formula: 'Area = side × side = side²', example: 'Square with side 6 cm: Area = 6² = 36 cm²' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Angle', 'Acute', 'Right angle', 'Obtuse', 'Triangle', 'Equilateral', 'Isosceles', 'Scalene', 'Quadrilateral', 'Rectangle', 'Perimeter', 'Area'],
          quickFacts: ['The Pythagorean theorem (in a right triangle: a²+b²=c²) was known in India as the Baudhayana theorem 800 years before Pythagoras', 'Triangles are used in bridges because they are the strongest shape', 'GPS uses triangulation to find location', 'The angles of any triangle always add to exactly 180°'],
        },
        {
          id: 'c5m3', chapterNo: 3, title: 'How Many Squares?',
          description: 'Area of irregular shapes, counting squares method, comparing areas.',
          topics: [
            { title: 'Area by Counting Squares', content: 'Area = amount of space inside a shape. Unit: square centimetre (cm²) or square metre (m²). Method: draw shape on squared paper. Count complete squares inside the shape. For incomplete squares: count those > half as 1, those < half as 0 (or count halves and add). Practice: draw your hand on squared paper, count squares, find approximate area.' },
            { title: 'Area of Irregular Shapes', content: 'Real shapes (leaves, lakes, countries) are irregular. Method: trace on grid paper. Count squares (use half-square rule). Area of India ≈ 3.3 million km². Architects use this to find area of awkward rooms. Farmers use this to measure field areas. Computer programs can calculate area of any shape by similar counting of pixels (tiny squares).' },
            { title: 'Perimeter vs Area', content: 'KEY DISTINCTION: Perimeter = distance around (1D, measured in cm, m). Area = space inside (2D, measured in cm², m²). Two different shapes can have SAME perimeter but DIFFERENT areas! Example: Rectangle 6×2 (P=16, A=12) vs Rectangle 5×3 (P=16, A=15). Same perimeter (16), different area! Farmers prefer maximum area for a given fence length — that is why square fields are efficient.' },
          ],
          formulas: [
            { name: 'Area of Rectangle', formula: 'A = l × b', example: '8 cm × 5 cm = 40 cm²', note: 'Area unit is always "squared" (cm², m², km²)' },
            { name: 'Area of Square', formula: 'A = s²', example: '7 cm × 7 cm = 49 cm²' },
          ],
          experiments: [
            { title: 'Leaf Area', objective: 'Find the area of a leaf using grid paper', materials: ['Large leaf', 'Grid paper (1 cm squares)', 'Pencil', 'Calculator (optional)'], steps: ['Place leaf on grid paper', 'Trace around the leaf', 'Count complete squares inside', 'Count half squares and divide by 2', 'Add: complete + halves/2 = approximate area'], result: 'Found approximate area of a leaf in cm²', safetyNote: 'Use a fallen leaf, do not damage plants' },
          ],
          videos: [],
          keyTerms: ['Area', 'Square centimetre (cm²)', 'Square metre (m²)', 'Irregular shape', 'Grid method', 'Perimeter', 'Comparison'],
          quickFacts: ['The surface area of the Earth is about 510 million km²', 'India\'s area is 3.29 million km² (7th largest country)', 'Architects use area calculations every day for building design', 'The formula for area of a circle is π × r² (learned in Class 7)'],
        },
        {
          id: 'c5m4', chapterNo: 4, title: 'Parts and Wholes',
          description: 'Fractions — equivalent fractions, comparing, adding and subtracting fractions.',
          topics: [
            { title: 'Equivalent Fractions', content: 'Equivalent fractions are equal in value but written differently. ½ = 2/4 = 3/6 = 4/8 (all are half). To create: multiply or divide numerator and denominator by the same number. ½ → multiply both by 3: 3/6. ¾ → multiply both by 2: 6/8. To simplify: divide by HCF. 6/8 → HCF of 6 and 8 is 2. 6÷2/8÷2 = 3/4. Simplest form has no common factors.' },
            { title: 'Comparing Fractions', content: 'Same denominator: bigger numerator = bigger fraction. 5/7 > 3/7 because 5>3. Different denominator: find common denominator first. Compare 2/3 and 3/4: common denom = 12. 2/3 = 8/12, 3/4 = 9/12. So 3/4 > 2/3 (9/12 > 8/12). Visual: 2/3 means 2 of 3 equal parts. 3/4 means 3 of 4 equal parts. Draw fraction bars to see which is bigger.' },
            { title: 'Adding and Subtracting Fractions', content: 'Same denominator: just add/subtract numerators. 2/5 + 1/5 = 3/5. 4/7 - 2/7 = 2/7. Different denominators: find LCM first. 1/2 + 1/3: LCM of 2 and 3 = 6. 1/2 = 3/6, 1/3 = 2/6. Sum = 5/6. Mixed numbers: add wholes and fractions separately. 2½ + 1¼ = (2+1) + (½+¼) = 3 + 3/4 = 3¾.' },
          ],
          formulas: [
            { name: 'Equivalent Fractions', formula: 'a/b = (a×n)/(b×n) for any non-zero n', example: '3/4 = 6/8 = 9/12 (multiply by 2, then 3)' },
            { name: 'Adding Fractions (same denom)', formula: 'a/c + b/c = (a+b)/c', example: '3/7 + 2/7 = 5/7' },
            { name: 'Adding Fractions (different denom)', formula: 'a/b + c/d = (a×d + c×b)/(b×d)', example: '1/3 + 1/4 = (4+3)/12 = 7/12' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Fraction', 'Numerator', 'Denominator', 'Equivalent fraction', 'Simplest form', 'LCM', 'HCF', 'Mixed number', 'Proper fraction', 'Improper fraction'],
          quickFacts: ['Fractions were used by ancient Egyptians to distribute food and land', 'A fraction means "a part of a whole"', 'Percentages (%) are fractions with denominator 100', 'Decimals are also fractions (0.5 = 5/10 = 1/2)'],
        },
        {
          id: 'c5m5', chapterNo: 5, title: 'Does it Look the Same?',
          description: 'Symmetry in 2D and 3D, rotational symmetry, line symmetry.',
          topics: [
            { title: 'Line Symmetry', content: 'A shape has line symmetry (bilateral symmetry) if a line divides it into two mirror halves. Test: fold the shape along the line — if edges match perfectly, it has line symmetry. Lines of symmetry for common shapes: Square: 4, Rectangle: 2, Equilateral triangle: 3, Isosceles triangle: 1, Scalene triangle: 0, Circle: infinite. Letters with line symmetry: A, H, I, M, O, T, U, V, W, X, Y.' },
            { title: 'Rotational Symmetry', content: 'A shape has rotational symmetry if it looks the same when rotated (before completing 360°). Order of rotational symmetry = number of times it looks the same in one full rotation. Square: looks same at 90°, 180°, 270°, 360° → order 4. Equilateral triangle: at 120°, 240°, 360° → order 3. Circle: at any angle → infinite. Rectangle: 180° and 360° → order 2. Most shapes have both line and rotational symmetry.' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['Line symmetry', 'Bilateral symmetry', 'Rotational symmetry', 'Order of symmetry', 'Mirror line', 'Fold'],
          quickFacts: ['The human face has approximate bilateral symmetry', 'Studies show people find faces with higher symmetry more attractive', 'Starfish have 5-fold symmetry', 'Regular hexagons (like honeycomb cells) have 6 lines of symmetry and rotational symmetry of order 6'],
        },
        {
          id: 'c5m7', chapterNo: 7, title: 'Can You See the Pattern?',
          description: 'Number patterns, magic squares, Pascal\'s triangle, Fibonacci sequence.',
          topics: [
            { title: 'Magic Squares', content: 'A magic square is a grid where every row, column, and diagonal adds to the same number (the "magic sum"). 3×3 magic square with numbers 1-9: magic sum = 15. Example: | 2 7 6 | | 9 5 1 | | 4 3 8 | — every row, column, diagonal = 15! Magic squares have fascinated mathematicians for thousands of years. Lo Shu magic square was discovered in China about 2000 BCE.' },
            { title: 'Pascal\'s Triangle', content: 'Pascal\'s triangle: start with 1. Each row: 1 at each end, middle numbers = sum of two above. Row 1: 1. Row 2: 1 1. Row 3: 1 2 1. Row 4: 1 3 3 1. Row 5: 1 4 6 4 1. Patterns: rows are powers of 11 (11⁰=1, 11¹=11, 11²=121, 11³=1331...), diagonal sums = Fibonacci numbers, coefficients of (a+b)ⁿ. Pascal\'s triangle has infinitely many patterns!' },
            { title: 'Fibonacci Sequence', content: '1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89... Each number = sum of previous two. Named after Leonardo Fibonacci (1202 AD) but known in India as Hemachandra sequence (1150 AD) — even earlier! Appears in nature: sunflower spiral counts (21 and 34, or 34 and 55), pine cone spirals, petal counts (most flowers have Fibonacci number of petals: 5 petals, 8 petals, 13 petals). The most beautiful pattern in mathematics!' },
          ],
          formulas: [
            { name: 'Fibonacci Rule', formula: 'F(n) = F(n-1) + F(n-2)', example: 'F(7) = F(6)+F(5) = 8+5 = 13', note: 'Starting values: F(1)=1, F(2)=1' },
            { name: 'Magic Sum Formula', formula: 'Magic sum of n×n square using 1 to n² = n(n²+1)/2', example: '3×3 square: 3×(9+1)/2 = 3×5 = 15' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Magic square', 'Pascal\'s triangle', 'Fibonacci sequence', 'Pattern', 'Number sequence', 'Golden ratio'],
          quickFacts: ['The ratio of consecutive Fibonacci numbers approaches the Golden Ratio (1.618...)', 'Fibonacci numbers appear in spiral arrangement of seeds in sunflowers', 'Pascal\'s triangle was known in India (as Meru Prastāra) 1000 years before Pascal!', 'The Fibonacci sequence grows approximately 1.618× each step (exponential growth)'],
        },
        {
          id: 'c5m8', chapterNo: 8, title: 'Mapping Your Way',
          description: 'Distance, speed, time; reading road maps and calculating journey times.',
          topics: [
            { title: 'Speed, Distance, Time', content: 'Speed = how fast something moves. Distance = how far it travels. Time = how long it takes. Relationship: Speed = Distance ÷ Time. Distance = Speed × Time. Time = Distance ÷ Speed. Example: A car travels 180 km in 3 hours. Speed = 180÷3 = 60 km/h. If speed = 80 km/h and time = 2.5 hours, distance = 80×2.5 = 200 km. Practice: A train travels at 100 km/h. How long to travel 350 km?' },
            { title: 'Using Maps for Journey Planning', content: 'On a map with scale 1 cm = 50 km: Mumbai to Pune = 4 cm on map = 200 km. Car at 80 km/h: time = 200÷80 = 2.5 hours. Google Maps calculates this instantly! But understanding the math helps when there is no network. Journey planning: consider distance, speed of transport, stops, traffic. Road maps show highways, cities, distances.' },
          ],
          formulas: [
            { name: 'Speed-Distance-Time Triangle', formula: 'S = D/T | D = S×T | T = D/S', example: 'Speed = 60 km/h, Time = 2.5 h → Distance = 60×2.5 = 150 km' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Speed', 'Distance', 'Time', 'km/h', 'm/s', 'Map scale', 'Journey planning'],
          quickFacts: ['The fastest animal is the peregrine falcon (dive speed 389 km/h)', 'The fastest land animal is the cheetah (112 km/h)', 'Light travels 300,000 km/s — from Sun to Earth takes about 8 minutes', 'The Shinkansen (bullet train in Japan) runs at over 300 km/h'],
        },
        {
          id: 'c5m9', chapterNo: 9, title: 'Boxes and Sketches',
          description: '3D shapes, nets of cubes and cuboids, volume and surface area introduction.',
          topics: [
            { title: 'Nets of 3D Shapes', content: 'A net is a flat shape that folds into a 3D shape. Net of a cube: 6 squares connected. Net of a cuboid: 6 rectangles (opposite faces equal). Net of a cylinder: 2 circles + 1 rectangle. Net of a cone: 1 circle + 1 sector. Making a net: draw a box (cuboid), cut along edges, unfold flat — that\'s the net! Nets are used in packaging design — manufacturers design box shapes (nets) for most efficient use of cardboard.' },
            { title: 'Volume', content: 'Volume = amount of space a 3D shape occupies. Unit: cubic centimetres (cm³) or cubic metres (m³). Volume of a cuboid: length × breadth × height. Example: box 5 cm × 3 cm × 4 cm = 60 cm³. Volume of a cube: side³. 4 cm cube = 4³ = 64 cm³. A litre = 1000 cm³. How many 1 cm cubes fill a 5×4×3 box? 60 cubes! Volume = number of unit cubes that fill a shape.' },
            { title: 'Surface Area', content: 'Surface area = total area of all faces of a 3D shape. Cuboid: SA = 2(lb + bh + lh). Example: 5×3×4 cm cuboid: 2(5×3 + 3×4 + 5×4) = 2(15+12+20) = 2×47 = 94 cm². Cube: SA = 6×side². 4 cm cube: 6×16 = 96 cm². Surface area determines how much paint/wrapping needed. Volume determines how much it holds. Both are important in packaging!' },
          ],
          formulas: [
            { name: 'Volume of Cuboid', formula: 'V = l × b × h', example: '4 cm × 3 cm × 5 cm = 60 cm³' },
            { name: 'Volume of Cube', formula: 'V = s³', example: '6 cm cube: V = 6³ = 216 cm³' },
            { name: 'Surface Area of Cube', formula: 'SA = 6s²', example: '5 cm cube: SA = 6×25 = 150 cm²' },
          ],
          experiments: [
            { title: 'Make a Paper Cube', objective: 'Understand the net of a cube', materials: ['Graph paper', 'Scissors', 'Tape', 'Pencil'], steps: ['Draw a "+" shape: one square for centre, one above, below, left, right, and one more on the right', 'This is one net of a cube (there are 11 different nets!)', 'Cut out the net carefully', 'Fold along edges', 'Tape to make a cube', 'Count: how many faces?'], result: 'Made a cube from a flat net — saw how 6 squares become a 3D cube', safetyNote: 'Be careful with scissors' },
          ],
          videos: [],
          keyTerms: ['Net', 'Volume', 'Surface area', 'Cuboid', 'Cube', 'cm³', 'Faces', 'Edges', 'Vertices'],
          quickFacts: ['A cube has 11 different possible nets', 'The volume of water in all Earth\'s oceans is about 1.335 billion km³', 'The Rubik\'s Cube has 43,252,003,274,489,856,000 possible combinations', 'Volume is used by engineers to design ships (they must displace water equal to their weight)'],
        },
      ]
    },
    {
      slug: 'evs', name: 'Environmental Studies', icon: '🌿', color: '#15803d', bg: '#f0fdf4',
      description: 'Class 5 EVS extra chapters',
      chapters: [
        {
          id: 'c5evs2', chapterNo: 2, title: 'A Snake Charmer\'s Story',
          description: 'Snakes, their habitats, characteristics, wildlife protection.',
          topics: [
            { title: 'Snakes', content: 'Snakes are reptiles: cold-blooded (body temperature matches surroundings), have scales, lay eggs (most), move without legs. India has about 270 snake species. Venomous snakes in India: King Cobra (longest venomous snake — up to 5.5 m), Indian Cobra (makes a hood, iconic), Russell\'s Viper, Saw-scaled Viper, Common Krait. Non-venomous and helpful: Rat Snake (eats mice, protecting crops).' },
            { title: 'Snake Senses and Movement', content: 'Snakes have unique senses: Forked tongue (flicks to collect smell particles, sends to Jacobson\'s organ in roof of mouth — "smells" the air!). Heat pits (pit vipers have heat-sensing organs on face — detect warm prey in dark). No external ears — sense vibrations through ground. Eyes: no eyelids, always open. Movement: sidewinding (desert), rectilinear (straight), concertina (trees), lateral undulation (most common).' },
            { title: 'Wildlife Protection', content: 'All Indian snakes are protected under Wildlife Protection Act 1972. Snake charming is illegal in India since 1972. Why: snake charming harms snakes (teeth removed or venom glands damaged, kept in tiny baskets, die of dehydration and injuries). Conservation: National Snake Park (Chennai) breeds and studies snakes. Snakes play vital role: control rat populations (protecting crops). Never kill a snake — call forest department.' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['Reptile', 'Venom', 'Cold-blooded', 'Scales', 'Jacobson\'s organ', 'Wildlife Protection Act', 'Conservation'],
          quickFacts: ['India has the highest rate of snakebite deaths globally — about 50,000 per year', 'Anti-venom is made by injecting small amounts of venom into horses and collecting their antibodies', 'King Cobra is the only snake that builds a nest for its eggs', 'Snakes are deaf to airborne sounds — the snake charmer\'s movement, not music, sways the snake'],
        },
        {
          id: 'c5evs4', chapterNo: 4, title: 'Mangoes Round the Year',
          description: 'Food preservation, seasonal foods, different preservation methods.',
          topics: [
            { title: 'Why Preserve Food?', content: 'Food spoils because of: bacteria and fungi growth, chemical reactions (oxidation), moisture. Without preservation, we could only eat seasonal food! Preservation methods extend shelf life so food is available year-round. India wastes about 40% of its food each year — preservation helps reduce this waste significantly.' },
            { title: 'Methods of Food Preservation', content: '1. Pickling: add salt/oil/vinegar (creates acidic environment — bacteria cannot survive). Mango, lemon, chilli pickle. 2. Drying/dehydration: remove water (bacteria need water). Sun-dry tomatoes, chilli, fish, papads. 3. Freezing: low temperature slows bacterial growth. 4. Pasteurisation: heat milk to 72°C for 15 seconds — kills harmful bacteria (Louis Pasteur invented in 1864). 5. Canning: food sealed in airtight tin, heated to kill bacteria — lasts years.' },
            { title: 'Indian Traditional Preservation', content: 'India has rich traditional food preservation: Achaar (pickle) — seasonal mango/lemon preserved in mustard oil with spices for months. Murabba (sweet preserve) — amla, karela in sugar. Papad — sun-dried lentil discs. Dried fish (coastal states). Murrabba. Ghee — butter clarified to remove water (lasts months without refrigeration). Traditional methods are natural, eco-friendly and have lasted centuries.' },
          ],
          formulas: [],
          experiments: [
            { title: 'Observe Food Spoilage', objective: 'Compare how different foods spoil', materials: ['Bread slice', 'Orange slice', 'Cooked rice', '3 plates', 'Magnifying glass'], steps: ['Place each food on a separate plate', 'Label with date', 'Observe each day for 5 days', 'Look for colour change, smell, and fuzzy growth (mould)', 'Record observations in a table'], result: 'Different foods spoil at different rates. Mould (fungi) appears as white/green/black fuzz. Bread typically moulds faster than dried foods.', safetyNote: 'Do not eat spoiled food. Wash hands after handling. Dispose of mouldy food safely.' },
          ],
          videos: [],
          keyTerms: ['Preservation', 'Spoilage', 'Bacteria', 'Pickling', 'Drying', 'Pasteurisation', 'Freezing', 'Achaar', 'Traditional methods'],
          quickFacts: ['The first canned food was made in 1810 — invented for Napoleon\'s army', 'Honey never spoils — 3,000-year-old honey from Egyptian tombs is still edible!', 'Freeze-drying preserves nutritional value better than most other methods', 'India is the world\'s largest producer of mangoes — proper preservation helps reduce waste'],
        },
        {
          id: 'c5evs5', chapterNo: 5, title: 'Seeds and Seeds',
          description: 'Seed dispersal, germination, seed structure, types of seeds.',
          topics: [
            { title: 'Seed Structure', content: 'A seed has: Seed coat (testa) — protective outer covering. Cotyledon(s) — food store for the baby plant. Embryo — the tiny baby plant (has: radicle=future root, plumule=future shoot). Dicot seeds have 2 cotyledons (beans, peas, mango). Monocot seeds have 1 cotyledon (rice, wheat, maize, coconut). Open a bean seed soaked in water and see these parts clearly!' },
            { title: 'Seed Dispersal', content: 'Seeds need to move away from the parent plant to avoid competition. Methods: Wind: light seeds with wings (maple, dandelion "parachutes"). Water: coconut floats, water lily seeds. Animals: eaten by birds (pass out as droppings), barbed seeds stick to fur (gokhru/tribulus). Explosion: some pods burst and scatter seeds (touch-me-not/Mimosa, peas). Human: farming and trade spread crops worldwide.' },
            { title: 'Germination', content: 'Germination = seed starting to grow into a new plant. Conditions needed: Water (to activate enzymes), Warmth (optimal temperature), Oxygen (for respiration to release energy). Steps: Seed absorbs water, swells. Seed coat softens, splits. Radicle (root) grows downward (gravity). Plumule (shoot) grows upward (light). Cotyledons supply food. First true leaves appear. The plant is now a seedling — it can make its own food via photosynthesis.' },
          ],
          formulas: [],
          experiments: [
            { title: 'Seed Germination in Cotton', objective: 'Observe germination step by step', materials: ['5 bean seeds', 'Cotton wool', 'Glass jar with water', 'Warm place'], steps: ['Soak seeds in water overnight', 'Place cotton in jar, moisten with water', 'Press seeds against glass wall (visible)', 'Keep in warm place, ensure cotton stays moist', 'Observe daily for 10 days', 'Record: which part appears first?'], result: 'Radicle (root) appears first, then plumule (shoot). Root grows DOWN, shoot grows UP, regardless of seed orientation!', safetyNote: 'Keep cotton moist but not flooded. Use clean water.' },
          ],
          videos: [],
          keyTerms: ['Seed', 'Cotyledon', 'Embryo', 'Radicle', 'Plumule', 'Germination', 'Seed dispersal', 'Dicot', 'Monocot'],
          quickFacts: ['Seeds can remain dormant for thousands of years — a 32,000-year-old seed was germinated in Russia!', 'The largest seed in the world is the coco-de-mer coconut (up to 25 kg!)', 'Rice, wheat and maize are seeds — they feed more than half the world\'s population', 'One dandelion plant produces about 200 seeds that can travel 100 km in the wind'],
        },
      ]
    },
  ]
}

// ══════════════════════════════════════════════════════════════════════
// Export all extra Class 1-5 data
// ══════════════════════════════════════════════════════════════════════
export const ALL_CLASS_DATA_1_5_EXTRA: ClassData[] = [
  CLASS1_EXTRA,
  CLASS2_EXTRA,
  CLASS3_EXTRA,
  CLASS4_EXTRA,
  CLASS5_EXTRA,
]
