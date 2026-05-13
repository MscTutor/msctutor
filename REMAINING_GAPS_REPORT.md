# MscTutor — Remaining Gaps vs Global EdTech Platforms
# Generated: May 2025

## ✅ COMPLETED IN THIS SESSION

### New Modular Component Library
- `components/edu/EduBlocks.tsx` — 15 reusable educational components
  - VariableTable, DerivationBlock, SolvedExample, MistakeBox, MemoryTrick
  - NoteBlock, AIExplainButton, StepFlow, ObservationList, SafetyChecklist
  - ApplicationBadges, ProgressRing, SyllabusStatusBadge, WeakTopicBadge, SectionHeader

### Formula Page Upgrade (`/formulas/[slug]`)
- ✅ Variables & Units table (cross-referenced from NCERTFormula)
- ✅ Derivation block with step-by-step flow
- ✅ Solved example section
- ✅ Common mistakes box
- ✅ Memory tricks
- ✅ Important note block
- ✅ Real-world applications
- ✅ Practice CTA with AI link
- ✅ Schema.org QAPage markup
- ✅ Improved metadata

### Experiment Page Upgrade (`/experiments/[slug]`)
- ✅ Aim/Objective in highlighted block
- ✅ Materials as badge chips (not plain list)
- ✅ Step-by-step numbered flow with connector lines
- ✅ Observations with numbered list
- ✅ Safety checklist with warning icons
- ✅ Conclusion section separated clearly
- ✅ Viva questions AI link
- ✅ Real-world applications
- ✅ AI explain button

### Class Dashboard Upgrade (`/class/[classId]`)
- ✅ Learning journey stats grid (chapters, subjects, AI support)
- ✅ Subject count + chapter count per branch
- ✅ Hover effects on subject cards
- ✅ Mini progress bar placeholder per subject

### Subject Dashboard Upgrade (`/class/[classId]/[subject]`)
- ✅ Syllabus overview bar with rich content percentage
- ✅ Formula / Experiment / Video counts in header
- ✅ Fixed generic description text

---

## ⚠️ REMAINING GAPS vs GLOBAL EDTECH PLATFORMS

### HIGH PRIORITY (User Experience)

1. **Real-time Progress Tracking on Subject Page**
   - Gap: Subject page shows "0%" bars — no localStorage progress loaded server-side
   - Fix needed: Client component wrapper that reads localStorage and animates bars
   - Comparable platform: Khan Academy shows completion per unit

2. **Weak Topic Surface on Subject Dashboard**
   - Gap: No weak topic badges shown on chapter cards
   - Fix: Read learner profile, show ⚠️ badge on chapters with low mastery
   - Comparable: Byju's shows "Needs Practice" on chapter cards

3. **Search Functionality**
   - Gap: `/search` page exists but no global search shortcut in header
   - Fix: Keyboard shortcut (Cmd+K / Ctrl+K) to open search
   - Comparable: All major EdTech platforms have cmd+k search

4. **Offline Support**
   - Gap: `/offline/page.tsx` exists but no service worker
   - Fix: Add service worker for core pages (formulas, chapters)
   - Comparable: Khan Academy works offline

5. **Print/PDF Export**
   - Gap: No print-optimized CSS or PDF export for formulas/notes
   - Fix: `@media print` styles + optional PDF generation
   - Comparable: NCERT website allows PDF download per chapter

### MEDIUM PRIORITY (Content & Engagement)

6. **Class 1-5 Rich Content**
   - Gap: Only syllabus index exists, no rich chapter content
   - Fix: Add topics, formulas, experiments for primary classes
   - Impact: 40% of Indian students are in Class 1-5

7. **Formula Sheet Generator**
   - Gap: No printable formula sheet per chapter/class
   - Fix: `/formulas/sheet?class=10&subject=physics` — printable layout
   - Comparable: ExamFear, Vedantu offer formula sheets

8. **Bookmark / Save Feature**
   - Gap: Dashboard "saved" page exists but no save button on content pages
   - Fix: Add bookmark button to chapter cards and formula pages
   - Impact: Users can't build personal study libraries

9. **Comparison Tables (Class 9 vs 10, etc.)**
   - Gap: No cross-class formula comparison
   - Fix: Side-by-side formula views for revision

10. **Teacher-Created Content**
    - Gap: Teachers can create exams but not custom chapters/notes
    - Fix: Simple rich text editor for teacher notes
    - Comparable: Google Classroom, Classplus

### LOW PRIORITY (Polish)

11. **Dark Mode for Educational Content**
    - Gap: Inconsistent dark mode — some inline styles don't respect dark
    - Fix: Audit all inline styles, convert to Tailwind dark variants

12. **Keyboard Navigation**
    - Gap: No keyboard shortcut system (chapter navigation)
    - Fix: Arrow keys to navigate chapters, Tab for tabs

13. **Text-to-Speech for Formulas**
    - Gap: TTS reads formula text verbatim (says "F = MA")
    - Fix: Special handling for formula pronunciation

14. **Graph/Visualization Tool**
    - Gap: No interactive graphs for math functions
    - Fix: Lightweight Desmos-style graphing (use math.js + canvas)
    - Comparable: Desmos is embedded on Khan Academy

15. **Student Analytics Dashboard**
    - Gap: Dashboard shows 0 stats until questions asked
    - Fix: Onboarding flow for new users with initial topic assessment

---

## 📊 PLATFORM COMPARISON

| Feature                    | MscTutor | Khan Academy | Byju's | Vedantu | Unacademy |
|---------------------------|----------|--------------|--------|---------|-----------|
| AI Explanations           | ✅       | ❌           | Partial| ❌      | Partial   |
| 12 Indian Languages       | ✅       | ❌           | 4      | 3       | 2         |
| Adaptive Learning         | ✅       | ✅           | ✅     | ❌      | ❌        |
| Free Core Content         | ✅       | ✅           | ❌     | ❌      | ❌        |
| NCERT Alignment           | ✅       | Partial      | ✅     | ✅      | ✅        |
| Voice Questions           | ✅       | ❌           | ❌     | ❌      | ❌        |
| Image Questions           | ✅       | ❌           | ✅     | ❌      | ❌        |
| Offline Support           | ❌       | ✅           | ❌     | ❌      | ❌        |
| School Management         | ✅       | ❌           | ✅     | ❌      | ❌        |
| Teacher Tools             | ✅       | ✅           | ❌     | ✅      | ✅        |
| Live Classes              | ✅       | ❌           | ✅     | ✅      | ✅        |
| Formula Derivations       | ✅       | ✅           | Partial| ✅      | ✅        |
| Interactive Experiments   | Partial  | ✅           | ✅     | ❌      | ❌        |
| Graph Visualization       | ❌       | ✅           | ✅     | ❌      | ❌        |
| PDF Export                | ❌       | ❌           | ✅     | ✅      | ❌        |
| Cmd+K Search              | ❌       | ✅           | ❌     | ❌      | ❌        |

**MscTutor advantage**: Unique combination of AI (text+image+voice+PDF), 12 languages, adaptive learning, school management — ALL FREE.
**Main gap**: Offline support, graph visualization, Class 1-5 content depth.

---

## 🚀 NEXT 3 SPRINTS RECOMMENDATION

### Sprint 1 (1 week): Progress & Engagement
1. Client-side progress bars on subject page (read localStorage)
2. Bookmark/save buttons on content pages
3. Weak topic badges on chapter cards

### Sprint 2 (1 week): Content Depth
1. Class 1-5 rich chapter content (at least Class 3-5)
2. Formula sheet printable view
3. Dark mode consistency audit

### Sprint 3 (1 week): Discovery
1. Cmd+K search overlay
2. Related chapters suggestions
3. Offline-first service worker for core pages
