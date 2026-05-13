// lib/knowledge-graph.ts
// ══════════════════════════════════════════════════════════════════
// KNOWLEDGE GRAPH — Subject/Chapter/Concept relationship engine
// Extends existing global-content.ts — does NOT replace it
// ══════════════════════════════════════════════════════════════════

import { getUnifiedSubjectForClass, getUnifiedChapterById } from './global-content'
import { searchCache, TTL, cached } from './cache'

// ── NODE TYPES ────────────────────────────────────────────────────
export type NodeType = 'subject'|'chapter'|'concept'|'formula'|'experiment'|'prerequisite'

export interface KGNode {
  id:       string
  type:     NodeType
  label:    string
  metadata?: Record<string, string|number>
}

export interface KGEdge {
  from:     string
  to:       string
  relation: 'contains'|'requires'|'extends'|'related'|'explains'|'enables'
  weight:   number   // 0-1, used for recommendation ranking
}

export interface KGGraph {
  nodes: KGNode[]
  edges: KGEdge[]
}

// ── STATIC PREREQUISITE MAP ───────────────────────────────────────
// Built from NCERT curriculum logic — augmented by AI when online
const PREREQ_GRAPH: Record<string, string[]> = {
  // Mathematics chain
  'c6-mathematics': [],
  'c7-mathematics': ['c6-mathematics'],
  'c8-mathematics': ['c7-mathematics'],
  'c9-mathematics': ['c8-mathematics'],
  'c10-mathematics':['c9-mathematics'],
  'c11-mathematics':['c10-mathematics'],
  'c12-mathematics':['c11-mathematics'],
  // Physics requires Maths
  'c9-physics':     ['c9-mathematics'],
  'c10-physics':    ['c9-physics','c10-mathematics'],
  'c11-physics':    ['c10-physics','c11-mathematics'],
  'c12-physics':    ['c11-physics','c12-mathematics'],
  // Chemistry
  'c9-chemistry':   ['c9-science'],
  'c10-chemistry':  ['c9-chemistry'],
  'c11-chemistry':  ['c10-chemistry'],
  'c12-chemistry':  ['c11-chemistry'],
  // Biology
  'c9-biology':     ['c9-science'],
  'c10-biology':    ['c9-biology'],
  'c11-biology':    ['c10-biology'],
  'c12-biology':    ['c11-biology'],
}

// ── CONCEPT RELATIONS (cross-chapter) ────────────────────────────
const CONCEPT_RELATIONS: Record<string, string[]> = {
  'newton-laws':         ['force','mass','acceleration','inertia','momentum'],
  'quadratic-equations': ['polynomials','factorisation','roots','discriminant'],
  'photosynthesis':      ['chlorophyll','light-reactions','calvin-cycle','glucose'],
  'periodic-table':      ['atomic-number','valence-electrons','periods','groups'],
  'trigonometry':        ['right-triangle','sine','cosine','tangent','pythagoras'],
  'cell-division':       ['mitosis','meiosis','chromosomes','dna-replication'],
  'electricity':         ['current','voltage','resistance','ohms-law','circuits'],
  'chemical-bonding':    ['ionic','covalent','metallic','hydrogen-bonds'],
}

// ── BUILD GRAPH FOR SUBJECT+CLASS ─────────────────────────────────
export function buildSubjectGraph(classId: string, subjectSlug: string): KGGraph {
  const cacheKey = `kg:${classId}:${subjectSlug}`
  const cached_  = searchCache.get(cacheKey) as KGGraph|null
  if (cached_) return cached_

  const subject = getUnifiedSubjectForClass(classId, subjectSlug)
  if (!subject) return { nodes: [], edges: [] }

  const nodes: KGNode[] = []
  const edges: KGEdge[] = []

  // Subject node
  const subjectNodeId = `subject:${subjectSlug}`
  nodes.push({ id: subjectNodeId, type: 'subject', label: subject.name })

  // Chapter nodes
  for (const chapter of subject.chapters) {
    const chapterId = `chapter:${chapter.id}`
    nodes.push({
      id:       chapterId,
      type:     'chapter',
      label:    chapter.title,
      metadata: { chapterNo: chapter.chapterNo ?? 0, topicCount: chapter.topics.length },
    })
    edges.push({ from: subjectNodeId, to: chapterId, relation: 'contains', weight: 1 })

    // Prerequisite edges based on chapter order
    if (chapter.chapterNo && chapter.chapterNo > 1) {
      const prevChap = subject.chapters.find(c => c.chapterNo === (chapter.chapterNo! - 1))
      if (prevChap) {
        edges.push({ from: `chapter:${prevChap.id}`, to: chapterId, relation: 'enables', weight: 0.8 })
      }
    }

    // Concept/formula nodes within chapter
    for (const formula of chapter.formulas) {
      const fId = `formula:${chapter.id}:${formula.slug}`
      nodes.push({ id: fId, type: 'formula', label: formula.name })
      edges.push({ from: chapterId, to: fId, relation: 'contains', weight: 0.9 })
    }

    for (const topic of chapter.topics.slice(0, 5)) {
      const cId = `concept:${chapter.id}:${topic.slug}`
      nodes.push({ id: cId, type: 'concept', label: topic.title })
      edges.push({ from: chapterId, to: cId, relation: 'contains', weight: 0.85 })
    }
  }

  // Cross-chapter concept relations
  for (const [concept, related] of Object.entries(CONCEPT_RELATIONS)) {
    const conceptNodes = nodes.filter(n => n.label.toLowerCase().includes(concept.replace(/-/g,' ')))
    for (const cn of conceptNodes) {
      for (const rel of related) {
        const relNodes = nodes.filter(n => n.label.toLowerCase().includes(rel.replace(/-/g,' ')))
        for (const rn of relNodes) {
          if (cn.id !== rn.id) {
            edges.push({ from: cn.id, to: rn.id, relation: 'related', weight: 0.6 })
          }
        }
      }
    }
  }

  const graph: KGGraph = { nodes, edges }
  searchCache.set(cacheKey, graph, TTL.SEARCH)
  return graph
}

// ── GET RECOMMENDATIONS ───────────────────────────────────────────
export function getNextRecommendations(
  classId:         string,
  subjectSlug:     string,
  currentChapterId: string,
  completedTopics:  string[] = []
): { chapId: string; label: string; reason: string; weight: number }[] {
  const graph = buildSubjectGraph(classId, subjectSlug)
  const curr  = `chapter:${currentChapterId}`

  // Find edges leaving current chapter
  const outEdges = graph.edges
    .filter(e => e.from === curr && e.relation === 'enables')
    .sort((a, b) => b.weight - a.weight)

  const recs = outEdges.map(e => {
    const node = graph.nodes.find(n => n.id === e.to)
    return {
      chapId:  e.to.replace('chapter:', ''),
      label:   node?.label ?? e.to,
      reason:  'Natural next step in the curriculum',
      weight:  e.weight,
    }
  })

  return recs.slice(0, 3)
}

// ── RELATED CONCEPTS SEARCH ───────────────────────────────────────
export function findRelatedConcepts(conceptName: string, limit = 5): string[] {
  const lower = conceptName.toLowerCase()
  const related: string[] = []
  for (const [key, vals] of Object.entries(CONCEPT_RELATIONS)) {
    if (lower.includes(key.replace(/-/g,' ')) || key.replace(/-/g,' ').includes(lower)) {
      related.push(...vals.map(v => v.replace(/-/g,' ')))
    }
    for (const v of vals) {
      if (lower.includes(v.replace(/-/g,' '))) {
        related.push(key.replace(/-/g,' '), ...vals.filter(x => x !== v).map(x => x.replace(/-/g,' ')))
        break
      }
    }
  }
  return [...new Set(related)].slice(0, limit)
}

// ── PREREQUISITE CHECK ────────────────────────────────────────────
export function getPrerequisiteSubjects(classId: string, subjectSlug: string): string[] {
  const key = `c${classId}-${subjectSlug}`
  return PREREQ_GRAPH[key] ?? []
}

// ── LEARNING PATH ─────────────────────────────────────────────────
export function buildLearningPath(
  classId:     string,
  subjectSlug: string,
  targetChapter: string
): { step: number; chapterId: string; title: string; isRequired: boolean }[] {
  const subject = getUnifiedSubjectForClass(classId, subjectSlug)
  if (!subject) return []

  const target = subject.chapters.find(c => c.id === targetChapter)
  if (!target || !target.chapterNo) return []

  // All chapters up to target chapter number
  return subject.chapters
    .filter(c => c.chapterNo && c.chapterNo <= (target.chapterNo ?? 1))
    .sort((a, b) => (a.chapterNo ?? 0) - (b.chapterNo ?? 0))
    .map((c, i) => ({
      step:       i + 1,
      chapterId:  c.id,
      title:      c.title,
      isRequired: i < (target.chapterNo ?? 1) - 1,
    }))
}
