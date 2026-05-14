// lib/ncert-master-1-5.ts
// ══════════════════════════════════════════════════════════════════
// RICH NCERT CONTENT — Class 1 to 5, All Subjects
// Full topics, formulas, key terms, quick facts
// ══════════════════════════════════════════════════════════════════

import type { ClassData } from '@/lib/ncert-master'

// ══════════════════════════════════════════════════════════════════
// CLASS 1
// ══════════════════════════════════════════════════════════════════
export const CLASS1_DATA: ClassData = {
  classLevel: '1', label: 'Class 1', board: ['CBSE','ICSE','State'],
  description: 'Foundation year — Shapes, Numbers 1-100, Addition, Subtraction, Time, Measurement',
  subjects: [
    {
      slug: 'mathematics', name: 'Mathematics (Maths Magic)', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Numbers 1-100, basic addition and subtraction, shapes, time, measurement and patterns',
      chapters: [
        {
          id: 'c1m1', chapterNo: 1, title: 'Shapes and Space',
          description: 'Learn about shapes around us, inside/outside, and spatial understanding.',
          topics: [
            { title: 'Inside and Outside', content: 'Inside means something that is within a boundary. Outside means beyond the boundary. Example: A ball inside a box is "inside". The same ball on the floor is "outside". Practice: Is the fish inside or outside the bowl? This helps us understand space and position.' },
            { title: 'Shapes Around Us', content: 'We see many shapes in our daily life. A circle is round like a clock. A square has 4 equal sides like a window pane. A triangle has 3 sides like a slice of pizza. A rectangle has 2 long sides and 2 short sides like a door. Look around you and name the shapes you see.' },
            { title: 'Patterns with Shapes', content: 'Patterns repeat in a fixed order. Circle, square, circle, square — this is a pattern! Look at the pattern and guess what comes next. Patterns are found in tiles, clothes, and nature. Making patterns helps develop logical thinking.' },
            { title: 'Above and Below, Near and Far', content: 'Above means higher up. Below means lower down. The bird is above the tree. The fish is below the water. Near means close. Far means at a distance. The door is near. The mountain is far. These words help us describe position.' },
          ],
          formulas: [],
          experiments: [
            { title: 'Shape Hunt', objective: 'Find shapes in the classroom', materials: ['Paper', 'Pencil', 'Classroom objects'], steps: ['Look around the classroom', 'Find something round (circle)', 'Find something with 4 equal sides (square)', 'Find something with 3 sides (triangle)', 'Draw each shape you found'], result: 'You found shapes in everyday objects — clock (circle), tile (square), sandwich (triangle)', safetyNote: 'Handle objects carefully' },
          ],
          videos: [
            { title: 'Shapes and Space — Class 1 Maths', url: 'https://www.youtube.com/embed/KQDhyMJMWZo', duration: '8 min', source: 'Education' },
          ],
          keyTerms: ['Circle', 'Square', 'Triangle', 'Rectangle', 'Inside', 'Outside', 'Above', 'Below', 'Pattern'],
          quickFacts: ['A square is a special rectangle where all sides are equal', 'A circle has no corners or sides', 'Patterns help us predict what comes next', 'Your textbook cover is a rectangle'],
        },
        {
          id: 'c1m2', chapterNo: 2, title: 'Numbers from One to Nine',
          description: 'Learning numbers 1 to 9, counting objects, writing numbers.',
          topics: [
            { title: 'Counting Objects 1 to 5', content: 'Count 1 apple, 2 bananas, 3 mangoes, 4 oranges, 5 grapes. Always count one object at a time. Point to each object as you count. The last number you say is how many objects there are. This is called the "counting principle".' },
            { title: 'Numbers 6 to 9', content: 'After 5 comes 6, 7, 8, 9. 6 = six (draw 6 dots). 7 = seven (days in a week!). 8 = eight (legs on a spider). 9 = nine (planets used to include Pluto). Practice writing each number and drawing that many objects.' },
            { title: 'More and Fewer', content: 'More means a larger number. Fewer means a smaller number. 5 apples is MORE than 3 apples. 2 cats is FEWER than 4 cats. We compare by counting or by matching one to one. If there are leftover objects after matching, that group has more.' },
            { title: 'Number Names', content: 'Every number has a name. 1=one, 2=two, 3=three, 4=four, 5=five, 6=six, 7=seven, 8=eight, 9=nine. Practice saying the name and writing it. Number names help us read word problems in maths.' },
          ],
          formulas: [
            { name: 'Counting Rule', formula: 'Count each object once and only once', example: 'To count 7 stars, point to each one: 1,2,3,4,5,6,7 — there are 7 stars', note: 'Always count from left to right or top to bottom to avoid missing any' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Counting', 'Number', 'More', 'Fewer', 'Number name', 'One to Nine'],
          quickFacts: ['0 is called zero — it means nothing', '9 is the largest single-digit number', 'We use 10 fingers to help count', 'India has the number system used worldwide (0-9)'],
        },
        {
          id: 'c1m3', chapterNo: 3, title: 'Addition',
          description: 'Understanding addition as putting together, number bonds, addition facts.',
          topics: [
            { title: 'What is Addition?', content: 'Addition means putting groups together. If you have 2 sweets and get 3 more, you add them: 2 + 3 = 5. The "+" sign means add. The "=" sign means equals (the answer). Addition always gives a bigger number (unless we add 0).' },
            { title: 'Addition Stories', content: 'A story problem uses words to describe addition. "Riya has 3 pencils. Ram gives her 2 more. How many pencils does she have?" Think: 3 + 2 = 5 pencils. Read the story, find the numbers, and add them together.' },
            { title: 'Adding with Pictures', content: 'Draw objects to help add. Draw 4 stars + 2 stars. Count all: 1,2,3,4,5,6 = 6 stars. This picture method helps visualise addition. You can also use fingers: hold up 4 fingers on one hand, 2 on the other, then count all fingers.' },
            { title: 'Number Bonds', content: 'Number bonds show how numbers split into two parts. 5 = 1+4, 5 = 2+3, 5 = 5+0. These are called "bonds of 5". Knowing bonds helps you add quickly without counting. Bonds of 10: 1+9, 2+8, 3+7, 4+6, 5+5.' },
          ],
          formulas: [
            { name: 'Addition', formula: 'Part + Part = Whole', example: '3 + 4 = 7 (3 is a part, 4 is a part, 7 is the whole)', note: 'The order does not matter: 3+4 = 4+3 = 7' },
            { name: 'Adding Zero', formula: 'Any number + 0 = that number', example: '6 + 0 = 6', note: 'Zero is the identity for addition' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Addition', 'Plus (+)', 'Equals (=)', 'Sum', 'Number bond', 'Total'],
          quickFacts: ['Adding 0 to any number gives the same number', 'Addition can be done in any order (3+2 = 2+3)', 'The answer to addition is called the sum', 'You can add more than two numbers: 1+2+3 = 6'],
        },
        {
          id: 'c1m4', chapterNo: 4, title: 'Subtraction',
          description: 'Subtraction as taking away, finding difference, subtraction facts.',
          topics: [
            { title: 'What is Subtraction?', content: 'Subtraction means taking away. If you have 5 sweets and eat 2, you subtract: 5 - 2 = 3. The "-" sign means subtract. Subtraction gives a smaller number. We subtract when things are taken away, given away, or used up.' },
            { title: 'Subtraction Stories', content: 'Story: "There were 7 birds on a tree. 3 flew away. How many are left?" 7 - 3 = 4 birds. Look for words like "left", "remaining", "flew away", "gave away" — these signal subtraction.' },
            { title: 'How Many are Left?', content: 'Cross out pictures to subtract. Draw 6 fish. Cross out 2. Count the uncrossed fish: 4 are left. 6 - 2 = 4. This method shows subtraction visually. You can also use a number line — start at 6, jump back 2 steps, land on 4.' },
          ],
          formulas: [
            { name: 'Subtraction', formula: 'Whole - Part = Remaining Part', example: '8 - 3 = 5 (start with 8, take away 3, 5 remain)', note: 'You cannot subtract a bigger number from a smaller number in Class 1' },
            { name: 'Subtraction Fact', formula: 'If a + b = c, then c - b = a', example: 'Since 3+4=7, we know 7-4=3 and 7-3=4' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Subtraction', 'Minus (-)', 'Take away', 'Difference', 'Remaining', 'Left over'],
          quickFacts: ['Subtraction is the opposite of addition', 'Any number minus itself = 0', 'Any number minus 0 = the same number', 'We can check subtraction by adding back'],
        },
        {
          id: 'c1m6', chapterNo: 6, title: 'Time',
          description: 'Understanding time — morning, afternoon, evening, night, days, months.',
          topics: [
            { title: 'Parts of the Day', content: 'A day has 4 main parts: Morning (sunrise to noon), Afternoon (noon to 3 pm), Evening (3 pm to sunset), Night (sunset to sunrise). We do different activities at different times. We eat breakfast in the morning, lunch in the afternoon, and dinner at night.' },
            { title: 'Days of the Week', content: 'There are 7 days in a week. Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. School days: Monday to Friday (5 days). Weekend: Saturday and Sunday (2 days). After Sunday comes Monday again — it repeats!' },
            { title: 'Months of the Year', content: 'There are 12 months in a year: January, February, March, April, May, June, July, August, September, October, November, December. January is the first month. December is the last. The year repeats every 12 months.' },
          ],
          formulas: [
            { name: 'Days in a Week', formula: '1 week = 7 days', example: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday' },
            { name: 'Months in a Year', formula: '1 year = 12 months = 365 days (or 366 in a leap year)', example: 'January to December' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Morning', 'Afternoon', 'Evening', 'Night', 'Week', 'Month', 'Year', 'Day'],
          quickFacts: ['A day has 24 hours', 'A week has 7 days', 'A year has 12 months', 'February has 28 days (29 in a leap year)', 'A leap year comes every 4 years'],
        },
        {
          id: 'c1m12', chapterNo: 12, title: 'Money',
          description: 'Indian coins and notes, counting money, simple transactions.',
          topics: [
            { title: 'Coins and Notes', content: 'In India, we use Rupees (₹) and Paise. Coins: 50 paise, ₹1, ₹2, ₹5, ₹10. Notes: ₹10, ₹20, ₹50, ₹100, ₹200, ₹500. A coin is a round metallic piece. A note is made of paper. 100 paise = ₹1.' },
            { title: 'Counting Money', content: 'To count money, start with the highest value. Example: 1×₹10 + 2×₹5 + 3×₹1 = ₹10 + ₹10 + ₹3 = ₹23. Always add the bigger coins/notes first, then smaller ones. Check by counting again.' },
            { title: 'Simple Transactions', content: 'A transaction is when money is exchanged. Buying: you give money, you get goods. Cost ₹8, you give ₹10, change = ₹10-₹8 = ₹2. Selling: you give goods, you get money. Practice: item costs ₹6, you have ₹10, how much change do you get?' },
          ],
          formulas: [
            { name: 'Change Calculation', formula: 'Change = Amount Given - Cost', example: 'Cost ₹7, gave ₹10, change = ₹10 - ₹7 = ₹3' },
            { name: 'Paise to Rupees', formula: '100 paise = ₹1', example: '250 paise = ₹2 and 50 paise' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Rupee', 'Paise', 'Coin', 'Note', 'Cost', 'Change', 'Transaction'],
          quickFacts: ['₹ symbol stands for Indian Rupee', '100 paise = 1 rupee', 'India prints currency notes at RBI (Reserve Bank of India)', 'The ₹ symbol was adopted in 2010'],
        },
      ]
    },
    {
      slug: 'english', name: 'English (Marigold)', icon: '📝', color: '#1e3a5f', bg: '#eff6ff',
      description: 'Simple poems, stories, vocabulary and comprehension for Class 1',
      chapters: [
        {
          id: 'c1e1', chapterNo: 1, title: 'A Happy Child',
          description: 'A poem about a happy child describing their home, sky, and possessions.',
          topics: [
            { title: 'Poem Reading and Comprehension', content: 'The poem "A Happy Child" describes a child who is happy with simple things. Key words: home (where you live), sky (above us), mine (belonging to me). The child feels the sky is "mine" because they can always see it and enjoy it freely. This teaches us to be happy with what we have.' },
            { title: 'New Vocabulary', content: 'New words from this chapter: Happy (feeling of joy), Home (place where family lives), Sky (the blue space above us with clouds and stars), Mine (belonging to me). Use each word in a sentence: "I am happy today." "My home has four rooms." "The sky is blue."' },
            { title: 'Grammar — Action Words (Verbs)', content: 'Action words tell us what someone does. Examples: run, jump, eat, sleep, play. In the poem: "I see the sky" — "see" is the action word. Find more action words in the poem. Action words are also called VERBS.' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['Poem', 'Happy', 'Vocabulary', 'Action word', 'Verb', 'Comprehension'],
          quickFacts: ['A poem often has rhyming words at the end of lines', 'Poems can describe feelings and nature', 'Reading poems aloud helps with pronunciation'],
        },
        {
          id: 'c1e3', chapterNo: 3, title: 'One Little Kitten',
          description: 'A counting poem about a kitten and animals, teaching numbers and rhymes.',
          topics: [
            { title: 'Counting Poem', content: 'This poem counts from 1 to many using animals. "One little kitten, two little puppies..." Counting poems help us learn numbers through rhythm and rhyme. As you read, hold up fingers to show each number.' },
            { title: 'Rhyming Words', content: 'Rhyming words sound similar at the end. Cat - mat, dog - log, one - fun, two - blue. Find rhyming pairs in the poem. Rhymes make poems fun to read and easy to remember. Can you make your own rhyming pair?' },
            { title: 'Animals and Sounds', content: 'Animals make different sounds. Cat - meow, Dog - woof, Cow - moo, Duck - quack, Frog - croak, Horse - neigh, Lion - roar. Match each animal to its sound. This builds vocabulary about the animal world.' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['Rhyme', 'Counting poem', 'Animal sounds', 'Pattern', 'Rhythm'],
          quickFacts: ['Poems that count are called counting rhymes', 'Rhyming words share the same ending sound', 'India has over 400 species of mammals'],
        },
      ]
    },
    {
      slug: 'hindi', name: 'Hindi (Rimjhim)', icon: '🇮🇳', color: '#dc2626', bg: '#fee2e2',
      description: 'हिंदी वर्णमाला, सरल शब्द, कविता और कहानी',
      chapters: [
        {
          id: 'c1h1', chapterNo: 1, title: 'झूला',
          description: 'बच्चों का झूले का वर्णन — स्वर और व्यंजन की पहचान।',
          topics: [
            { title: 'स्वर (Vowels)', content: 'हिंदी में 11 स्वर होते हैं: अ, आ, इ, ई, उ, ऊ, ए, ऐ, ओ, औ, अं। स्वर वे ध्वनियाँ हैं जो बिना किसी रुकावट के मुँह से निकलती हैं। अ से अनार, आ से आम, इ से इमली — इस तरह याद करो।' },
            { title: 'व्यंजन (Consonants)', content: 'हिंदी में 33 व्यंजन होते हैं: क, ख, ग, घ, ङ, च, छ, ज, झ, ञ, ट, ठ, ड, ढ, ण, त, थ, द, ध, न, प, फ, ब, भ, म, य, र, ल, व, श, ष, स, ह। हर व्यंजन का उच्चारण करो और उससे शुरू होने वाला एक शब्द बताओ।' },
            { title: 'बारहखड़ी', content: 'बारहखड़ी = व्यंजन + स्वर। जैसे क + अ = क, क + आ = का, क + इ = कि, क + ई = की। इसी तरह हर व्यंजन के साथ स्वर लगाकर अक्षर बनते हैं। यही हिंदी लिखने का आधार है।' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['स्वर', 'व्यंजन', 'बारहखड़ी', 'वर्णमाला', 'उच्चारण', 'अक्षर'],
          quickFacts: ['हिंदी में 44 वर्ण होते हैं (11 स्वर + 33 व्यंजन)', 'हिंदी भारत की राजभाषा है', 'हिंदी देवनागरी लिपि में लिखी जाती है', 'विश्व में 60 करोड़ से अधिक लोग हिंदी बोलते हैं'],
        },
        {
          id: 'c1h2', chapterNo: 2, title: 'आम की कहानी',
          description: 'आम के बारे में एक छोटी कहानी — नए शब्द और वाक्य।',
          topics: [
            { title: 'कहानी पढ़ना', content: 'कहानी में पात्र (characters), स्थान (place) और घटना (events) होते हैं। "आम की कहानी" में एक बच्चा और आम का पेड़ है। कहानी को ध्यान से पढ़ो और समझो कि क्या हुआ, किसने क्या किया।' },
            { title: 'नए शब्द', content: 'आम = mango (एक फल), मीठा = sweet, पेड़ = tree, पत्ता = leaf, कच्चा = raw/unripe, पका = ripe, खाना = to eat। इन शब्दों को लिखकर याद करो।' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['कहानी', 'पात्र', 'आम', 'फल', 'पेड़', 'शब्द'],
          quickFacts: ['आम भारत का राष्ट्रीय फल है', 'भारत दुनिया में सबसे ज्यादा आम उगाता है', 'आम को "फलों का राजा" कहते हैं'],
        },
      ]
    },
  ]
}

// ══════════════════════════════════════════════════════════════════
// CLASS 2
// ══════════════════════════════════════════════════════════════════
export const CLASS2_DATA: ClassData = {
  classLevel: '2', label: 'Class 2', board: ['CBSE','ICSE','State'],
  description: 'Building on Class 1 — 3-digit numbers, addition with carry, subtraction, measurement',
  subjects: [
    {
      slug: 'mathematics', name: 'Mathematics (Maths Magic)', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Place value, 3-digit numbers, addition, subtraction, measurement, data handling',
      chapters: [
        {
          id: 'c2m4', chapterNo: 4, title: 'Counting in Tens',
          description: 'Place value of tens and ones, writing 2-digit numbers, number expansion.',
          topics: [
            { title: 'Tens and Ones', content: 'Every 2-digit number has a tens place and a ones place. In 35: 3 is in tens place (= 30) and 5 is in ones place (= 5). So 35 = 30 + 5 = three tens and five ones. The tens digit tells how many groups of 10 there are.' },
            { title: 'Place Value Chart', content: 'A place value chart has columns: Tens | Ones. Place the digits: 47 → Tens column: 4, Ones column: 7. Value of 4 in tens = 4×10 = 40. Value of 7 in ones = 7×1 = 7. Total = 40 + 7 = 47. Always read from left to right.' },
            { title: 'Number Expansion', content: 'Expanded form shows the value of each digit. 63 = 60 + 3 = 6 tens + 3 ones. 90 = 90 + 0 = 9 tens + 0 ones. 15 = 10 + 5 = 1 ten + 5 ones. This helps us understand what each digit really means.' },
          ],
          formulas: [
            { name: 'Expanded Form', formula: '2-digit number = Tens digit × 10 + Ones digit × 1', example: '47 = 4×10 + 7×1 = 40 + 7', note: 'This is called expanded notation' },
            { name: 'Place Value', formula: 'Place value = Face value × Position value', example: 'In 73: place value of 7 = 7×10 = 70; place value of 3 = 3×1 = 3' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Tens', 'Ones', 'Place value', 'Face value', 'Expanded form', '2-digit number'],
          quickFacts: ['The smallest 2-digit number is 10', 'The largest 2-digit number is 99', 'Place value depends on where a digit is placed', '10 ones = 1 ten'],
        },
        {
          id: 'c2m8', chapterNo: 8, title: 'Tens and Hundreds',
          description: 'Introduction to 3-digit numbers — hundreds, tens and ones.',
          topics: [
            { title: 'Hundreds, Tens, Ones', content: '10 tens = 1 hundred = 100. A 3-digit number has three places: Hundreds | Tens | Ones. In 345: 3 hundreds (300) + 4 tens (40) + 5 ones (5) = 345. The hundreds digit shows how many groups of 100.' },
            { title: '3-Digit Numbers', content: 'Numbers from 100 to 999 are 3-digit numbers. 100 = one hundred. 200 = two hundred. 500 = five hundred. 999 = nine hundred ninety-nine. The smallest 3-digit number is 100. The largest is 999.' },
            { title: 'Comparing 3-Digit Numbers', content: 'More digits = larger (3-digit > 2-digit). Same digits: compare hundreds first, then tens, then ones. 456 > 398 because 4 hundreds > 3 hundreds. 567 > 534 because 6 tens > 3 tens (hundreds are same = 5).' },
          ],
          formulas: [
            { name: 'Expanded Form (3-digit)', formula: '3-digit number = H×100 + T×10 + O×1', example: '356 = 3×100 + 5×10 + 6×1 = 300+50+6', note: 'H=hundreds digit, T=tens digit, O=ones digit' },
            { name: 'Hundreds', formula: '10 tens = 1 hundred', example: '10 groups of 10 = 100' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Hundreds', 'Tens', 'Ones', '3-digit number', 'Place value chart', 'Expanded form'],
          quickFacts: ['1 hundred = 10 tens = 100 ones', 'The smallest 3-digit number is 100', 'The largest 3-digit number is 999', 'Numbers 1-9 are 1-digit; 10-99 are 2-digit; 100-999 are 3-digit'],
        },
        {
          id: 'c2m10', chapterNo: 10, title: 'Add Our Points',
          description: '2-digit addition with and without carrying (regrouping).',
          topics: [
            { title: 'Addition Without Carry', content: 'When ones digit sum < 10, no carrying needed. Example: 23 + 15. Ones: 3+5=8. Tens: 2+1=3. Answer: 38. Always add ones first, then tens. Write digits in correct columns.' },
            { title: 'Addition With Carry', content: 'When ones digit sum ≥ 10, we carry 1 to tens. Example: 27 + 35. Ones: 7+5=12 → write 2, carry 1. Tens: 2+3+1(carry)=6. Answer: 62. The "carry" is the extra ten we move to the tens column.' },
            { title: 'Word Problems', content: 'Ravi has 34 marbles. Priya has 28 marbles. Total = 34+28. Ones: 4+8=12, write 2 carry 1. Tens: 3+2+1=6. Total = 62 marbles. Read carefully, identify numbers, decide operation, calculate, check.' },
          ],
          formulas: [
            { name: 'Column Addition', formula: 'Add ones first, then tens (carry if sum ≥ 10)', example: '47+35: ones=7+5=12(write 2,carry 1); tens=4+3+1=8; answer=82' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Addition', 'Carry', 'Regrouping', 'Column addition', 'Sum', 'Word problem'],
          quickFacts: ['Carrying in addition is called regrouping', 'We always add from right to left (ones to tens)', 'The answer in addition is called the sum', 'Addition is commutative: 34+28 = 28+34 = 62'],
        },
        {
          id: 'c2m12', chapterNo: 12, title: 'Give and Take',
          description: '2-digit subtraction with and without borrowing.',
          topics: [
            { title: 'Subtraction Without Borrowing', content: 'When ones digit of top number ≥ ones digit of bottom, subtract directly. Example: 56 - 23. Ones: 6-3=3. Tens: 5-2=3. Answer: 33. Work column by column from right to left.' },
            { title: 'Subtraction With Borrowing', content: 'When top ones < bottom ones, borrow 1 ten from tens column. Example: 42 - 17. Ones: 2<7, borrow 1 ten from 4 tens → 12-7=5; tens become 3. Tens: 3-1=2. Answer: 25. Borrowing means taking 1 ten and converting to 10 ones.' },
          ],
          formulas: [
            { name: 'Column Subtraction', formula: 'Subtract ones first, then tens (borrow if top < bottom)', example: '54-28: ones=4<8 so borrow; 14-8=6; tens=(5-1)-2=2; answer=26' },
            { name: 'Checking Subtraction', formula: 'Answer + Subtracted number = Original number', example: '54-28=26; check: 26+28=54 ✓' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Subtraction', 'Borrowing', 'Regrouping', 'Difference', 'Minuend', 'Subtrahend'],
          quickFacts: ['Borrowing in subtraction is called regrouping', 'The answer in subtraction is called the difference', 'We can check subtraction by adding', 'Subtraction is NOT commutative: 8-3 ≠ 3-8'],
        },
      ]
    },
  ]
}

// ══════════════════════════════════════════════════════════════════
// CLASS 3
// ══════════════════════════════════════════════════════════════════
export const CLASS3_DATA: ClassData = {
  classLevel: '3', label: 'Class 3', board: ['CBSE','ICSE','State'],
  description: 'Multiplication, division, measurement in standard units, data handling, EVS',
  subjects: [
    {
      slug: 'mathematics', name: 'Mathematics', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Multiplication, division, fractions, measurement, money, data handling',
      chapters: [
        {
          id: 'c3m2', chapterNo: 2, title: 'Fun with Numbers',
          description: '4-digit numbers, place value up to thousands, comparing and ordering.',
          topics: [
            { title: '4-Digit Numbers', content: '10 hundreds = 1 thousand = 1,000. 4-digit numbers go from 1,000 to 9,999. Place value chart: Thousands | Hundreds | Tens | Ones. In 4,536: 4 thousands + 5 hundreds + 3 tens + 6 ones = 4,000+500+30+6 = 4,536.' },
            { title: 'Comparing Large Numbers', content: 'Compare from leftmost digit. 4 digit numbers are always bigger than 3 digit numbers. Between 4,536 and 3,987: 4 thousands > 3 thousands, so 4,536 > 3,987. Between 4,536 and 4,278: thousands same (4), compare hundreds: 5 > 2, so 4,536 > 4,278.' },
            { title: 'Ordering Numbers', content: 'Ascending order = smallest to largest. Descending order = largest to smallest. Example: 3,456; 1,234; 5,678; 2,345. Ascending: 1,234; 2,345; 3,456; 5,678. Descending: 5,678; 3,456; 2,345; 1,234.' },
          ],
          formulas: [
            { name: 'Expanded Form (4-digit)', formula: 'Th×1000 + H×100 + T×10 + O×1', example: '3725 = 3×1000 + 7×100 + 2×10 + 5×1 = 3000+700+20+5', note: 'Th=thousands, H=hundreds, T=tens, O=ones' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Thousands', '4-digit number', 'Place value', 'Ascending', 'Descending', 'Expanded form'],
          quickFacts: ['1 thousand = 10 hundreds = 100 tens = 1000 ones', 'The smallest 4-digit number is 1,000', 'The largest 4-digit number is 9,999', 'We use commas to separate groups: 1,234'],
        },
        {
          id: 'c3m9', chapterNo: 9, title: 'How Many Times?',
          description: 'Multiplication as repeated addition, times tables 1-10.',
          topics: [
            { title: 'Multiplication as Repeated Addition', content: '4 × 3 means add 4 three times: 4 + 4 + 4 = 12. OR add 3 four times: 3 + 3 + 3 + 3 = 12. Multiplication is a faster way to add the same number many times. The "×" symbol means multiply.' },
            { title: 'Times Tables', content: 'Table of 2: 2,4,6,8,10,12,14,16,18,20. Table of 5: 5,10,15,20,25,30,35,40,45,50. Table of 10: 10,20,30,40,50,60,70,80,90,100. Tip: Table of 5 always ends in 5 or 0. Table of 10 always ends in 0.' },
            { title: 'Multiplication Facts', content: 'Any number × 1 = same number (6×1=6). Any number × 0 = 0 (7×0=0). Order does not matter: 3×4 = 4×3 = 12 (commutative property). Multiplication makes repeated addition fast and easy.' },
          ],
          formulas: [
            { name: 'Multiplication', formula: 'a × b = a added b times', example: '6 × 4 = 6+6+6+6 = 24', note: 'Also: 6×4 = 4×6 = 24 (commutative)' },
            { name: 'Multiply by 0', formula: 'Any number × 0 = 0', example: '999 × 0 = 0' },
            { name: 'Multiply by 1', formula: 'Any number × 1 = that number', example: '45 × 1 = 45' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Multiplication', 'Times tables', 'Product', 'Factor', 'Repeated addition', 'Commutative'],
          quickFacts: ['Multiplication is repeated addition', '0 times any number = 0', '1 times any number = same number', 'The answer in multiplication is called the product'],
        },
        {
          id: 'c3m12', chapterNo: 12, title: 'Can We Share?',
          description: 'Division as equal sharing, relationship with multiplication.',
          topics: [
            { title: 'Division as Equal Sharing', content: '12 sweets shared equally among 4 children = 12 ÷ 4 = 3 sweets each. Division means splitting into equal groups. "÷" means divide. 15 ÷ 3 = 5 means 15 split into 3 equal groups gives 5 in each group.' },
            { title: 'Division Tables', content: 'Division is reverse multiplication. If 3 × 4 = 12, then 12 ÷ 3 = 4 and 12 ÷ 4 = 3. Division facts come from multiplication tables. 20 ÷ 5 = 4 (because 5 × 4 = 20). 18 ÷ 6 = 3 (because 6 × 3 = 18).' },
            { title: 'Division as Repeated Subtraction', content: '20 ÷ 4 = how many times can we subtract 4 from 20? 20-4=16, 16-4=12, 12-4=8, 8-4=4, 4-4=0. We subtracted 5 times. So 20 ÷ 4 = 5. This method helps understand what division really means.' },
          ],
          formulas: [
            { name: 'Division', formula: 'Dividend ÷ Divisor = Quotient', example: '24 ÷ 6 = 4 (24 is dividend, 6 is divisor, 4 is quotient)' },
            { name: 'Division-Multiplication Relationship', formula: 'If a ÷ b = c, then b × c = a', example: 'If 15 ÷ 3 = 5, then 3 × 5 = 15' },
            { name: 'Division by 1', formula: 'Any number ÷ 1 = same number', example: '67 ÷ 1 = 67' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Division', 'Dividend', 'Divisor', 'Quotient', 'Equal sharing', 'Remainder'],
          quickFacts: ['Division is the opposite of multiplication', 'No number can be divided by 0', 'Any number divided by itself = 1', 'Any number divided by 1 = same number'],
        },
      ]
    },
    {
      slug: 'evs', name: 'EVS (Looking Around)', icon: '🌿', color: '#0a5e3f', bg: '#d1fae5',
      description: 'Plants, animals, water, family, transport and environment',
      chapters: [
        {
          id: 'c3e2', chapterNo: 2, title: 'The Plant Fairy',
          description: 'Types of plants, parts of a plant, plants in our daily life.',
          topics: [
            { title: 'Parts of a Plant', content: 'A plant has 6 main parts: Roots (underground, absorb water and minerals, anchor plant), Stem (above ground, carries water from roots to leaves), Leaves (make food using sunlight, called photosynthesis), Flowers (produce seeds for reproduction), Fruits (protect seeds, we eat many), Seeds (grow into new plants).' },
            { title: 'Types of Plants', content: 'Plants are classified by size: Trees (tall, woody trunk: mango, banyan, neem), Shrubs (medium, woody stem: rose, jasmine, hibiscus), Herbs (small, soft stem: tulsi, mint, coriander), Creepers (grow along ground: pumpkin, watermelon), Climbers (grow upward using support: money plant, grape).' },
            { title: 'Plants Around Us', content: 'Plants give us: Food (wheat, rice, vegetables, fruits), Oxygen (all green plants release oxygen), Wood (for furniture and fuel), Medicine (neem, tulsi, aloe vera), Shade and beauty. Without plants, no life on Earth is possible. Always plant trees and protect existing ones.' },
          ],
          formulas: [],
          experiments: [
            { title: 'Parts of a Plant', objective: 'Identify and label parts of a plant', materials: ['A small plant with roots', 'Paper', 'Pencil'], steps: ['Take a small plant out of the soil gently', 'Wash the roots carefully', 'Place it on paper and trace its outline', 'Label: roots, stem, leaves, flowers (if any)', 'Return the plant to soil'], result: 'You can identify and name all parts of a plant', safetyNote: 'Wash hands after handling soil' },
          ],
          videos: [],
          keyTerms: ['Roots', 'Stem', 'Leaves', 'Flowers', 'Seeds', 'Photosynthesis', 'Tree', 'Shrub', 'Herb', 'Creeper'],
          quickFacts: ['The tallest tree is the Coastal Redwood — over 115 meters tall', 'A Banyan tree can spread over a large area with aerial roots', 'Bamboo is the fastest growing plant — grows 91 cm per day', 'Tulsi (Holy Basil) has antibacterial properties and is used in Ayurveda'],
        },
        {
          id: 'c3e3', chapterNo: 3, title: 'Water O Water',
          description: 'Sources of water, uses, water cycle, conservation.',
          topics: [
            { title: 'Sources of Water', content: 'Natural sources: Rivers (Ganga, Yamuna), Lakes, Ponds, Rainfall, Groundwater (wells, borewells), Oceans. Man-made: Dams, Reservoirs, Water tanks. 97% of Earth\'s water is in oceans (salty). Only 3% is freshwater. Most freshwater is frozen in glaciers.' },
            { title: 'Uses of Water', content: 'We need water for: Drinking (must be clean), Cooking, Bathing, Washing clothes and utensils, Agriculture (farming needs 70% of all water used), Industries, Generating electricity (hydro power). An adult needs about 2-3 litres of water per day for drinking.' },
            { title: 'Water Conservation', content: 'Water is precious — save it! Ways to save water: Turn off taps when not in use, Fix leaking pipes, Collect rainwater (rainwater harvesting), Use bucket instead of shower, Water plants in the morning or evening. India has water scarcity in many regions during summer.' },
          ],
          formulas: [],
          experiments: [
            { title: 'Water Cycle in a Bag', objective: 'Observe the water cycle process', materials: ['Zip-lock plastic bag', 'Water', 'Blue food colouring', 'Tape', 'Sunny window'], steps: ['Add water with a few drops of blue colouring to the bag', 'Seal the bag tightly', 'Tape it to a sunny window', 'Observe for a few hours or next day', 'Watch water drops form at top (condensation)'], result: 'You will see water evaporate and condense, just like the real water cycle', safetyNote: 'Seal the bag properly to avoid spilling' },
          ],
          videos: [],
          keyTerms: ['River', 'Groundwater', 'Evaporation', 'Condensation', 'Water cycle', 'Conservation', 'Drought'],
          quickFacts: ['71% of Earth\'s surface is covered with water', 'Only 1% of all water on Earth is available for human use', 'A dripping tap wastes about 15 litres per day', 'India receives about 4000 billion cubic metres of rain per year'],
        },
      ]
    },
  ]
}

// ══════════════════════════════════════════════════════════════════
// CLASS 4
// ══════════════════════════════════════════════════════════════════
export const CLASS4_DATA: ClassData = {
  classLevel: '4', label: 'Class 4', board: ['CBSE','ICSE','State'],
  description: 'Fractions, geometry, area, perimeter, multiplication/division of larger numbers',
  subjects: [
    {
      slug: 'mathematics', name: 'Mathematics', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Fractions, large numbers, area, perimeter, geometry, money',
      chapters: [
        {
          id: 'c4m9', chapterNo: 9, title: 'Halves and Quarters',
          description: 'Introduction to fractions — half, quarter, three-quarters.',
          topics: [
            { title: 'What is a Fraction?', content: 'A fraction is a part of a whole. If you divide a pizza into 4 equal slices and take 1 slice, you have 1/4 (one-fourth or one-quarter). The number below the line (4) is the denominator — it tells how many equal parts the whole is divided into. The number above (1) is the numerator — it tells how many parts we have.' },
            { title: 'Half (1/2)', content: 'Half means dividing something into 2 equal parts and taking 1 part. 1/2 of 10 = 5. 1/2 of 12 = 6. 1/2 of an hour = 30 minutes. To find half: divide by 2. Half + Half = Whole. 1/2 + 1/2 = 1.' },
            { title: 'Quarter (1/4) and Three-quarters (3/4)', content: 'Quarter means dividing into 4 equal parts and taking 1. 1/4 of 12 = 3. Three-quarters = 3/4 = take 3 parts out of 4. 3/4 of 12 = 9. Four quarters = 1 whole. 1/4 + 1/4 + 1/4 + 1/4 = 1.' },
          ],
          formulas: [
            { name: 'Fraction', formula: 'Fraction = Numerator / Denominator', example: 'In 3/8: numerator=3, denominator=8, meaning 3 parts out of 8 equal parts' },
            { name: 'Finding Fraction of a Number', formula: 'p/q of N = N ÷ q × p', example: '3/4 of 20 = 20÷4×3 = 5×3 = 15' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Fraction', 'Numerator', 'Denominator', 'Half', 'Quarter', 'Three-quarters', 'Equal parts'],
          quickFacts: ['A fraction less than 1 is called a proper fraction', '1/2 of a day = 12 hours', 'A quarter of a rupee = 25 paise', '3/4 of a circle is 270 degrees'],
        },
        {
          id: 'c4m13', chapterNo: 13, title: 'Fields and Fences',
          description: 'Understanding perimeter and area — measurement of land.',
          topics: [
            { title: 'What is Perimeter?', content: 'Perimeter is the total length of the boundary of a shape. To find perimeter, add all the sides. A fence around a field is a real-world example of perimeter. Unit: cm, m, km. Perimeter of a rectangle = 2 × (length + breadth). Perimeter of a square = 4 × side.' },
            { title: 'What is Area?', content: 'Area is the amount of surface covered by a shape. Imagine counting the number of 1×1 unit squares needed to fill a shape — that count is the area. Unit: sq cm (cm²), sq m (m²). Area of a rectangle = length × breadth. Area of a square = side × side.' },
            { title: 'Perimeter vs Area', content: 'Perimeter is the distance AROUND a shape (1D concept, linear measurement). Area is the space INSIDE a shape (2D concept, square measurement). A shape can have a large area but small perimeter (like a circle), or vice versa. Both are important in daily life — fencing (perimeter), flooring (area).' },
          ],
          formulas: [
            { name: 'Perimeter of Rectangle', formula: 'P = 2 × (l + b)', example: 'Rectangle 8m × 5m: P = 2×(8+5) = 2×13 = 26m', note: 'l=length, b=breadth' },
            { name: 'Perimeter of Square', formula: 'P = 4 × s', example: 'Square with side 7cm: P = 4×7 = 28cm', note: 's=side length' },
            { name: 'Area of Rectangle', formula: 'A = l × b', example: 'Rectangle 8m × 5m: A = 8×5 = 40 sq m' },
            { name: 'Area of Square', formula: 'A = s × s = s²', example: 'Square with side 6cm: A = 6×6 = 36 sq cm' },
          ],
          experiments: [
            { title: 'Finding Area by Counting', objective: 'Find area of irregular shapes using grid paper', materials: ['Grid/graph paper', 'Pencil', 'A leaf'], steps: ['Place a leaf on grid paper', 'Trace the outline', 'Count the complete squares inside', 'Count the half squares and divide by 2', 'Add: total area = complete squares + half squares/2'], result: 'You have estimated the area of an irregular shape', safetyNote: 'None' },
          ],
          videos: [],
          keyTerms: ['Perimeter', 'Area', 'Length', 'Breadth', 'Square unit', 'Rectangle', 'Square'],
          quickFacts: ['A football field is about 7,000 sq m in area', 'The Great Wall of China is 21,196 km long (perimeter of route)', 'India has a total area of 3.29 million sq km', 'Perimeter uses linear units (m, cm); Area uses square units (m², cm²)'],
        },
      ]
    },
    {
      slug: 'evs', name: 'EVS (Looking Around)', icon: '🌿', color: '#0a5e3f', bg: '#d1fae5',
      description: 'Transport, animals, environment, conservation, history',
      chapters: [
        {
          id: 'c4evs1', chapterNo: 1, title: 'Going to School',
          description: 'Different modes of transport, road safety, maps.',
          topics: [
            { title: 'Modes of Transport', content: 'Land transport: walking, cycling, bus, train, car, auto-rickshaw. Water transport: boat, ship, ferry. Air transport: aeroplane, helicopter. The fastest is air transport. The most common in India is land transport. Trains connect all major cities in India.' },
            { title: 'Road Safety Rules', content: 'Always walk on the footpath/sidewalk. Cross the road only at zebra crossing. Look Right-Left-Right before crossing. Wear helmet on bicycle/bike. Don\'t play on the road. Traffic lights: Red=Stop, Yellow=Get Ready, Green=Go. Wear seatbelt in a car.' },
            { title: 'Transport Maps', content: 'Maps show roads, railways, airports and waterways. A legend explains the symbols used. Road maps use lines (thick = highway, thin = local road). Distances are shown to scale (e.g., 1 cm = 10 km). India has the 4th largest road network and 4th largest railway network in the world.' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['Transport', 'Land', 'Water', 'Air', 'Road safety', 'Traffic light', 'Map', 'Scale'],
          quickFacts: ['India has over 67,000 km of railway track', 'India\'s first train ran in 1853 from Mumbai to Thane', 'The fastest train in India is Vande Bharat Express', 'India has the world\'s largest bus network'],
        },
        {
          id: 'c4evs4', chapterNo: 4, title: 'The Story of Amrita',
          description: 'Chipko Movement, importance of trees, conservation.',
          topics: [
            { title: 'The Chipko Movement', content: 'In 1973, in Uttarakhand, villagers (especially women led by Gaura Devi) hugged trees to prevent them from being cut by contractors. "Chipko" means to hug/stick. This non-violent protest saved thousands of trees and became famous worldwide as an environmental movement.' },
            { title: 'Importance of Trees', content: 'Trees: Release oxygen for breathing, Absorb carbon dioxide (reducing pollution), Provide shade and cool the environment, Prevent soil erosion, Give us fruits, wood, medicine, gum, Provide habitat for animals and birds, Control floods by absorbing water, Improve rainfall patterns.' },
            { title: 'Tree Conservation Today', content: 'Ways to protect trees: Plant new trees (Afforestation), Don\'t cut trees needlessly (Deforestation must be stopped), Celebrate Van Mahotsav (first week of July — tree planting festival), Use recycled paper (saves trees), Choose bamboo products over wood products. India\'s forest cover is about 21% — target is 33%.' },
          ],
          formulas: [],
          experiments: [
            { title: 'Plant a Sapling', objective: 'Learn to plant and care for a tree', materials: ['A small sapling or seeds', 'Pot or garden soil', 'Water', 'Manure'], steps: ['Dig a small hole in the soil', 'Place the sapling in the hole', 'Fill soil around the roots and press gently', 'Water the plant', 'Place in sunlight and water daily'], result: 'You have planted a tree that will grow and provide oxygen', safetyNote: 'Wash hands after handling soil' },
          ],
          videos: [],
          keyTerms: ['Chipko Movement', 'Deforestation', 'Afforestation', 'Conservation', 'Gaura Devi', 'Van Mahotsav'],
          quickFacts: ['One tree produces 100 kg of oxygen per year', 'A mature tree absorbs 22 kg of CO₂ per year', 'The Amazon rainforest produces 20% of world\'s oxygen', 'The oldest tree (Methuselah) is 4,850+ years old'],
        },
      ]
    },
  ]
}

// ══════════════════════════════════════════════════════════════════
// CLASS 5
// ══════════════════════════════════════════════════════════════════
export const CLASS5_DATA: ClassData = {
  classLevel: '5', label: 'Class 5', board: ['CBSE','ICSE','State'],
  description: 'Decimals, large numbers, HCF/LCM, area, volume, EVS — digestive system, water cycle',
  subjects: [
    {
      slug: 'mathematics', name: 'Mathematics', icon: '➕', color: '#1a3a6b', bg: '#e8eef8',
      description: 'Decimals, fractions, LCM, HCF, area, volume, data handling',
      chapters: [
        {
          id: 'c5m6', chapterNo: 6, title: 'Be My Multiple, I\'ll be Your Factor',
          description: 'Factors, multiples, prime numbers, HCF and LCM.',
          topics: [
            { title: 'Factors and Multiples', content: 'A factor of a number divides it exactly (no remainder). Factors of 12: 1, 2, 3, 4, 6, 12 (because 12÷1=12, 12÷2=6, 12÷3=4, 12÷4=3, 12÷6=2, 12÷12=1). A multiple is obtained by multiplying a number. Multiples of 5: 5, 10, 15, 20, 25... Every number is a factor and multiple of itself.' },
            { title: 'Prime and Composite Numbers', content: 'A prime number has exactly 2 factors: 1 and itself. Examples: 2, 3, 5, 7, 11, 13, 17, 19, 23. 2 is the only even prime number! A composite number has more than 2 factors. Examples: 4(1,2,4), 6(1,2,3,6), 8, 9, 10... 1 is neither prime nor composite.' },
            { title: 'HCF (Highest Common Factor)', content: 'HCF is the largest number that divides two or more numbers exactly. To find HCF of 12 and 18: Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. Common factors: 1,2,3,6. HCF = 6 (the highest). HCF is also called GCD (Greatest Common Divisor).' },
            { title: 'LCM (Lowest Common Multiple)', content: 'LCM is the smallest number that is a multiple of two or more numbers. LCM of 4 and 6: Multiples of 4: 4,8,12,16,20,24. Multiples of 6: 6,12,18,24. Common multiples: 12,24... LCM = 12 (the lowest). Use: LCM helps find when two events repeat together.' },
          ],
          formulas: [
            { name: 'HCF × LCM Relationship', formula: 'HCF × LCM = Product of two numbers', example: 'For 12 and 18: HCF=6, LCM=36. Check: 6×36 = 216 = 12×18 ✓' },
            { name: 'Finding HCF (Division Method)', formula: 'Divide larger by smaller; replace larger with remainder; repeat till remainder = 0', example: 'HCF(18,12): 18÷12=1 R6; 12÷6=2 R0; HCF=6' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Factor', 'Multiple', 'Prime number', 'Composite number', 'HCF', 'LCM', 'Common factor'],
          quickFacts: ['2 is the smallest and only even prime number', 'There are 25 prime numbers less than 100', 'HCF of any two consecutive numbers = 1', 'LCM of any two consecutive numbers = their product'],
        },
        {
          id: 'c5m10', chapterNo: 10, title: 'Tenths and Hundredths',
          description: 'Decimal numbers, place value of decimals, comparing decimals.',
          topics: [
            { title: 'What are Decimals?', content: 'Decimals represent parts of a whole using the decimal point (.). After the decimal: first place = tenths (1/10), second place = hundredths (1/100). 0.3 = 3/10 = three-tenths. 0.45 = 45/100 = forty-five hundredths. 2.7 = 2 ones + 7 tenths = 2 + 7/10.' },
            { title: 'Decimal Place Value', content: 'Extended place value: ... Hundreds | Tens | Ones . Tenths | Hundredths. In 25.63: 2 tens, 5 ones, 6 tenths, 3 hundredths. 25.63 = 20 + 5 + 0.6 + 0.03. The decimal point separates the whole number part from the decimal part.' },
            { title: 'Decimals in Daily Life', content: 'We use decimals everywhere: Money (₹24.50 = 24 rupees 50 paise), Weight (1.5 kg = 1 kg 500g), Measurement (1.25 m = 125 cm), Temperature (36.5°C = normal body temperature), Marks (8.5 out of 10 = 85%). Decimals make calculations with fractions easier.' },
          ],
          formulas: [
            { name: 'Decimal to Fraction', formula: 'Move denominator as power of 10 based on decimal places', example: '0.7 = 7/10;  0.45 = 45/100;  0.125 = 125/1000' },
            { name: 'Comparing Decimals', formula: 'Compare whole part first; if equal compare tenth; if equal compare hundredth', example: '3.45 vs 3.52: whole equal; tenths 4<5; so 3.45 < 3.52' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Decimal', 'Decimal point', 'Tenths', 'Hundredths', 'Place value', 'Decimal fraction'],
          quickFacts: ['0.1 = 1/10 = 10%', '0.25 = 1/4 = 25%', '0.5 = 1/2 = 50%', '0.75 = 3/4 = 75%', 'Decimals are used in all scientific measurements'],
        },
        {
          id: 'c5m11', chapterNo: 11, title: 'Area and its Boundary',
          description: 'Area formulas for rectangles and squares, relationship with perimeter.',
          topics: [
            { title: 'Area of Rectangle', content: 'Area = length × breadth. Unit is always square units (cm², m²). If a room is 5m long and 4m wide, area = 5×4 = 20 m². This means 20 tiles of 1m×1m are needed to cover the floor. Area tells us how much surface is covered.' },
            { title: 'Area of Square', content: 'Since all sides of a square are equal, Area = side × side = side². A square tile of side 30 cm has area = 30×30 = 900 cm² = 0.09 m². To find how many tiles needed: room area ÷ tile area = number of tiles.' },
            { title: 'Perimeter and Area Together', content: 'Same perimeter can give different areas! Rectangle 10m×2m: P=24m, A=20m². Square 6m×6m: P=24m, A=36m². A square always gives maximum area for a given perimeter. Farmers want maximum crop area with minimum fencing — so square fields are best.' },
          ],
          formulas: [
            { name: 'Area of Rectangle', formula: 'A = l × b', example: 'l=12cm, b=7cm: A=12×7=84 cm²', note: 'l=length, b=breadth' },
            { name: 'Area of Square', formula: 'A = s²', example: 's=9m: A=9²=81 m²', note: 's=side' },
            { name: 'Perimeter of Rectangle', formula: 'P = 2(l + b)', example: 'l=12cm, b=7cm: P=2×(12+7)=2×19=38 cm' },
          ],
          experiments: [],
          videos: [],
          keyTerms: ['Area', 'Perimeter', 'Square unit', 'Length', 'Breadth', 'Side', 'Rectangle', 'Square'],
          quickFacts: ['India\'s total land area is 3,287,263 km²', '1 hectare = 10,000 m² (used for land measurement)', '1 acre ≈ 4,047 m²', 'The area of a football field is about 7,140 m²'],
        },
      ]
    },
    {
      slug: 'evs', name: 'EVS (Looking Around)', icon: '🌿', color: '#0a5e3f', bg: '#d1fae5',
      description: 'Human body systems, water cycle, food preservation, conservation',
      chapters: [
        {
          id: 'c5evs1', chapterNo: 1, title: 'Super Senses',
          description: 'Sense organs, how animals use senses, adaptation.',
          topics: [
            { title: 'Five Sense Organs', content: 'Eyes (sight): We see using eyes. Eyes have a lens that focuses light. Never look directly at the sun. Ears (hearing): Detect sound vibrations. The pinna collects sound. Nose (smell): Detects chemicals in air. Dogs have smell 10,000 times better than humans. Tongue (taste): Sweet (tip), Salty/Sour (sides), Bitter (back). Skin (touch): Detects pressure, temperature, pain.' },
            { title: 'Animal Super Senses', content: 'Dogs can smell 10,000× better than humans — used by police. Bats use echolocation (ultrasound) to navigate in darkness. Eagles can see prey from 3 km away. Snakes sense heat (infrared) to find prey at night. Ants communicate through chemicals (pheromones). Dolphins use echolocation in water like bats in air.' },
            { title: 'Protecting Our Senses', content: 'Eyes: Don\'t rub, wear glasses if needed, avoid bright light, eat carrots (Vitamin A). Ears: Don\'t put objects inside, avoid loud noise, clean gently. Nose: Cover in dusty places, don\'t pick nose. Tongue: Don\'t eat very hot food. Skin: Apply sunscreen, protect from cuts, keep clean.' },
          ],
          formulas: [],
          experiments: [
            { title: 'Taste Map of Tongue', objective: 'Identify different taste regions on tongue', materials: ['Sugar solution', 'Salt solution', 'Lemon juice', 'Bitter gourd juice', 'Cotton swabs'], steps: ['Dip cotton swab in sugar solution', 'Apply to tip of tongue — sweet?', 'Try same with salt on sides', 'Try lemon on sides', 'Try bitter at back'], result: 'Different parts of tongue detect different tastes: sweet=tip, salty/sour=sides, bitter=back', safetyNote: 'Use clean cotton swabs for each taste. Do not mix.' },
          ],
          videos: [],
          keyTerms: ['Sense organs', 'Eyes', 'Ears', 'Nose', 'Tongue', 'Skin', 'Echolocation', 'Adaptation'],
          quickFacts: ['Light travels at 3×10⁸ m/s — we see instantly', 'Sound travels at 340 m/s — we hear with a delay', 'Dogs can hear frequencies up to 65,000 Hz (humans: 20,000 Hz)', 'The human tongue has about 10,000 taste buds'],
        },
        {
          id: 'c5evs6', chapterNo: 6, title: 'Every Drop Counts',
          description: 'Water cycle, water conservation, rainwater harvesting.',
          topics: [
            { title: 'The Water Cycle', content: 'The water cycle has 4 stages: 1) Evaporation: Sun heats water in oceans, rivers — water turns to vapour and rises. 2) Condensation: Water vapour cools high up, forms clouds (tiny water droplets). 3) Precipitation: Water falls as rain, snow, or hail. 4) Collection: Water collects in rivers, lakes, groundwater. Then evaporation starts again — a continuous cycle!' },
            { title: 'Water Crisis in India', content: 'India has 18% of world\'s population but only 4% of world\'s freshwater. Many states face drought in summer: Rajasthan, Maharashtra, Tamil Nadu. Over 60 million people in India lack safe drinking water. Underground water (groundwater) is being used faster than it is replenished — this is a serious problem.' },
            { title: 'Rainwater Harvesting', content: 'Rainwater harvesting means collecting and storing rainwater for later use. Methods: Rooftop collection (direct rain into tank), Check dams (small dams to hold rainwater), Percolation pits (allow water to seep underground). Tamil Nadu made rooftop harvesting mandatory in 2001 — solved Chennai\'s water problem! It is a sustainable solution to water scarcity.' },
          ],
          formulas: [],
          experiments: [
            { title: 'Water Filtration', objective: 'Show how water can be cleaned using simple materials', materials: ['Muddy water', 'Plastic bottle', 'Gravel', 'Sand', 'Cotton wool', 'Charcoal'], steps: ['Cut bottle in half, invert top half as funnel into bottom', 'Layer from bottom up: cotton, charcoal, sand, gravel', 'Pour muddy water slowly through the top', 'Observe filtered water collecting at bottom'], result: 'Muddy water becomes clearer after filtration. Note: this removes only solids, not bacteria — boiling still needed for drinking.', safetyNote: 'Do not drink the filtered water without boiling first' },
          ],
          videos: [],
          keyTerms: ['Water cycle', 'Evaporation', 'Condensation', 'Precipitation', 'Rainwater harvesting', 'Groundwater', 'Drought'],
          quickFacts: ['71% of Earth is covered in water but only 2.5% is freshwater', 'Water expands when it freezes (unusual property)', 'Water is called the "universal solvent"', 'India receives 4,000 billion m³ of rain annually', 'World Water Day is on March 22'],
        },
        {
          id: 'c5evs3', chapterNo: 3, title: 'From Tasting to Digesting',
          description: 'Digestive system, teeth, how food is broken down.',
          topics: [
            { title: 'Types of Teeth', content: 'Humans have 4 types of teeth: Incisors (front 8 teeth — for cutting food), Canines (4 pointed teeth — for tearing food), Premolars (8 teeth — for crushing), Molars (12 teeth including wisdom teeth — for grinding). Children have 20 milk teeth. Adults have 32 permanent teeth. Brush twice daily to protect teeth!' },
            { title: 'Digestive System', content: 'Digestion: breaking complex food into simple nutrients. Path: Mouth (chewing, saliva starts digestion) → Oesophagus (food pipe, moves food to stomach) → Stomach (acids break proteins, churns food) → Small intestine (most nutrients absorbed here, 6-7m long) → Large intestine (water absorbed, 1.5m long) → Rectum → Anus (waste expelled).' },
            { title: 'Healthy Eating Habits', content: 'Eat a balanced diet: Carbohydrates (rice, wheat — energy), Proteins (pulses, eggs, milk — body building), Fats (oil, butter — energy store), Vitamins and Minerals (fruits, vegetables — protection), Water (digestion, blood, all processes). Eat slowly and chew properly. Don\'t eat junk food daily. Eat at regular times.' },
          ],
          formulas: [],
          experiments: [],
          videos: [],
          keyTerms: ['Digestion', 'Teeth', 'Incisors', 'Canines', 'Molars', 'Oesophagus', 'Stomach', 'Small intestine', 'Nutrients', 'Saliva'],
          quickFacts: ['The small intestine is 6-7 metres long when uncoiled', 'Saliva contains the enzyme amylase that digests starch', 'The stomach produces hydrochloric acid to kill bacteria', 'Food takes 24-72 hours to pass through the digestive system', 'An adult produces about 1.5 litres of saliva per day'],
        },
      ]
    },
  ]
}

export const ALL_CLASS_DATA_1_5: ClassData[] = [
  CLASS1_DATA,
  CLASS2_DATA,
  CLASS3_DATA,
  CLASS4_DATA,
  CLASS5_DATA,
]
