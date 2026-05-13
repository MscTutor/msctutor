# MscTutor — Production Audit Report
# Session 3 — Scalable Infrastructure Upgrade (May 2025)

## ✅ COMPLETED THIS SESSION — 10 SYSTEMS

### 1. RBAC Extension
- Added: `upload:image | upload:pdf | upload:content | upload:media`
- Added: `content:moderate | content:approve`  
- Teachers: can upload content (needs approval)
- School admins: can moderate their school's content
- File: `lib/security/rbac.ts` (270→283 lines)

### 2. Dynamic Content Engine
- `app/api/content/submit/route.ts` — 116L
  - Teachers/schools submit chapters, formulas, experiments, notes, syllabus
  - Auto-approves for admin roles; pending for teachers
  - Auto-creates ContentPage on approval
- `app/api/content/moderate/route.ts` — 110L
  - GET: paginated review queue by status
  - POST: approve/reject/flag with audit log
- `app/teacher/upload/page.tsx` — 272L
  - Full upload UI with PDF + text support
  - Subject/class/language selectors
  - Approval status feedback

### 3. PDF → Structured Content Pipeline
- `lib/pdf-extract.ts` extended (54→163 lines)
  - `PDFChunk` type: index, type, title, content, wordCount, pageEst, formulas
  - `buildStructuredChunks()` — splits into 400-word chunks with type detection
  - `extractFormulas()` — regex patterns for physics/chemistry/math formulas
  - `detectPDFLanguage()` — Hindi/Bengali/Tamil/Arabic auto-detection
  - `extractPDFTitle()` — metadata or first-line extraction

### 4. Auto SEO Page Generation
- `lib/seo-engine.ts` — 172L
  - `generateQuestionMeta()` — title/desc/keywords in 12 locales
  - `autoSaveQuestion()` — auto-saves to DB with SEO metadata after AI answer
  - `detectLanguage()` — Unicode range detection for 6 scripts
  - `extractNCERTRef()` — pattern matching for chapter references
  - `generateSitemapEntry()` — multilingual hreflang entries
- Integrated into `app/api/ask/route.ts` — replaces raw DB save

### 5. Global Educational Search
- `app/api/search/route.ts` — 123L (fully replaced)
  - `fuzzyScore()` — multi-level matching (exact→prefix→contains→word)
  - `detectIntent()` — formula|definition|how_to|example|general
  - `normaliseQuery()` — Hindi→English transliteration mapping (8 terms)
  - Parallel queries: questions + chapters + formulas + contentPages
  - Score-ranked merged results with cache (5min TTL)
  - `?type=formulas` — formula-specific search with bonus scoring

### 6. Voice & Media Learning
- `lib/multilingual-tts.ts` extended (+60 lines)
  - `saveVoiceSession()` — non-blocking session persistence
  - `getTTSLanguageInstruction()` — AI prompts in 12 languages
  - `prepareTextForSpeech()` — strips markdown, limits to 2000 chars

### 7. Knowledge Graph Foundation
- `app/api/knowledge-graph/route.ts` — 201L
  - Static graph: 9 concepts with prerequisites/related/builds_on
  - Subject prerequisites: 3 subjects × 3 class levels
  - Actions: prerequisites | subject-prereqs | learning-path | related | subject-graph
  - POST: add/update relations (admin only)
  - Reads DB first, falls back to static graph

### 8. Content Moderation
- `ContentSubmission`, `ModerationFlag` models in Prisma
- Full approval workflow: pending → approved/rejected/flagged
- Auto-creates ContentPage on approval
- Audit log on every moderation action

### 9. Production Hardening (api-middleware extensions)
- `monitorAPI()` — structured Vercel-compatible performance logs
- `withMonitoring()` — auto-times any API handler, logs slow/error
- `paginated()` — standardized pagination response
- `dbPaginated()` — safe paginated DB query wrapper
- `okWithId()` — response with X-Correlation-Id header

### 10. New Prisma Models (6)
- `ConceptRelation` — KG edges (fromConceptId, toConceptId, relationType, strength)
- `SubjectPrerequisite` — subject-level prereq chains
- `ContentSubmission` — moderation queue
- `ModerationFlag` — per-item flags
- `SearchIndex` — content discovery index
- `VoiceSession` — voice interaction history

---

## ⚠️ REMAINING GAPS vs GLOBAL EDTECH LEADERS

### P1 — High Impact (do next)
1. **Service Worker / Offline PWA** — Khan Academy advantage. Works without internet.
2. **Cmd+K Global Search Overlay** — Standard on all modern EdTechs
3. **Class 1-5 Rich Content** — Only syllabus index. 40% of Indian students.
4. **Real-time Progress Sync** — localStorage progress not synced to DB for analytics

### P2 — Medium Impact
5. **Graph Visualization** — Math function plotting (Desmos-style). Khan Academy, Byju's.
6. **Formula Sheet Generator** — Printable/downloadable formula sheets per chapter
7. **Bookmark & Save** — Save content pages/questions for later review
8. **Teacher Analytics** — Teachers can't see how students use their content
9. **Dark Mode Consistency** — Inline styles bypass Tailwind dark: variants in some pages

### P3 — Polish
10. Keyboard navigation (arrow keys in chapter pages)
11. Text-to-speech formula pronunciation (says "F equals M A" not "F = MA")
12. Print-optimized CSS for formulas/experiments
13. OCR on uploaded images (for handwritten question photos)

---

## PLATFORM COMPARISON (Updated Session 3)

| Feature                     | MscTutor | Khan Academy | Byju's | Vedantu | Unacademy |
|-----------------------------|----------|--------------|--------|---------|-----------|
| AI Q&A (text+image+voice+PDF)| ✅      | ❌           | Partial| ❌      | ❌        |
| 12 Indian Languages          | ✅      | ❌           | 4      | 3       | 2         |
| Adaptive AI Teacher          | ✅      | ✅           | ✅     | ❌      | ❌        |
| Gamification (XP+badges)     | ✅      | ✅           | ✅     | ❌      | ❌        |
| Learning Analytics Dashboard | ✅      | ✅           | ✅     | ❌      | ❌        |
| Teacher Content Upload       | ✅      | ✅           | ❌     | ✅      | ✅        |
| Content Moderation Workflow  | ✅      | ✅           | ✅     | Partial | ❌        |
| Free Core Content            | ✅      | ✅           | ❌     | ❌      | ❌        |
| School Management            | ✅      | ❌           | ✅     | ❌      | ❌        |
| Knowledge Graph              | ✅      | ✅           | ✅     | ❌      | ❌        |
| Fuzzy Educational Search     | ✅      | ✅           | ✅     | Partial | Partial   |
| PDF Content Extraction       | ✅      | ❌           | ✅     | ✅      | ❌        |
| Auto SEO Question Pages      | ✅      | ✅           | ✅     | ✅      | Partial   |
| Offline Support              | ❌      | ✅           | ❌     | ❌      | ❌        |
| Graph Visualization (Math)   | ❌      | ✅           | ✅     | ❌      | ❌        |
| Cmd+K Search                 | ❌      | ✅           | ❌     | ❌      | ❌        |

**MscTutor now leads on**: AI input formats × languages × free content × school management
**Remaining gap**: Offline support, graph visualization, Class 1-5 depth

## NEXT SPRINT RECOMMENDATIONS
1. Service worker (2 days) → offline = Khan Academy parity
2. Cmd+K search overlay (1 day) → discovery = modern EdTech parity
3. Class 1-5 content (1 week) → reach 40% more students
