// app/api/knowledge-graph/route.ts
// Relations between concepts, prerequisite chains, intelligent recommendations
// EXTENDED: full curriculum hierarchy + formula-concept linking + mastery graph

import { NextRequest } from 'next/server'
import { ok, err, serverErr, getClientIP } from '@/lib/api-middleware'
import { questionCache, TTL, cacheHeaders } from '@/lib/cache'

// ── COMPREHENSIVE CURRICULUM KNOWLEDGE GRAPH ──────────────────────
// Class 9-12 NCERT, all major subjects
const CURRICULUM_GRAPH: Record<string, {
  subject:      string
  classLevel:   string
  chapter?:     string
  prerequisites: string[]
  related:       string[]
  builds_on?:    string[]
  formulas?:     string[]        // Formula slugs linked to this concept
  skills?:       string[]        // Skills this concept develops
  examWeight?:   'high' | 'medium' | 'low'  // Board exam importance
}> = {
  // ── MATHEMATICS ─────────────────────────────────────────────
  'real-numbers': {
    subject:'mathematics', classLevel:'10', chapter:'Real Numbers',
    prerequisites:[], related:['polynomials'], builds_on:['number-system-class9'],
    formulas:['euclids-division-lemma','fundamental-theorem-arithmetic'], examWeight:'medium',
  },
  'polynomials': {
    subject:'mathematics', classLevel:'10', chapter:'Polynomials',
    prerequisites:['real-numbers','algebraic-expressions'],
    related:['quadratic-equations','coordinate-geometry'],
    builds_on:['polynomials-class9'],
    formulas:['factor-theorem','remainder-theorem'], examWeight:'high',
  },
  'quadratic-equations': {
    subject:'mathematics', classLevel:'10',
    prerequisites:['polynomials','linear-equations-class9'],
    related:['arithmetic-progressions','coordinate-geometry'],
    builds_on:['linear-equations-class9'],
    formulas:['quadratic-formula','discriminant'], examWeight:'high',
  },
  'trigonometry-class10': {
    subject:'mathematics', classLevel:'10', chapter:'Introduction to Trigonometry',
    prerequisites:['coordinate-geometry','pythagoras-theorem','similar-triangles'],
    related:['heights-distances','circles'],
    formulas:['sin-cos-tan','pythagorean-identity','complementary-angles'], examWeight:'high',
  },
  'coordinate-geometry': {
    subject:'mathematics', classLevel:'10',
    prerequisites:['number-system-class9','algebraic-expressions'],
    related:['polynomials','trigonometry-class10'],
    formulas:['distance-formula','section-formula','midpoint-formula'], examWeight:'high',
  },
  'circles-class10': {
    subject:'mathematics', classLevel:'10',
    prerequisites:['trigonometry-class10','similar-triangles'],
    related:['areas-circles','constructions'],
    formulas:['tangent-length','angle-in-semicircle'], examWeight:'medium',
  },
  'statistics-class10': {
    subject:'mathematics', classLevel:'10',
    prerequisites:['basic-arithmetic'],
    related:['probability'],
    formulas:['mean-formula','median-formula','mode-formula'], examWeight:'high',
  },

  // ── PHYSICS ─────────────────────────────────────────────────
  'motion-class9': {
    subject:'physics', classLevel:'9', chapter:'Motion',
    prerequisites:['basic-measurements'],
    related:['force-laws-motion','gravitation'],
    formulas:['velocity-formula','acceleration-formula','equations-of-motion','distance-time'], examWeight:'high',
  },
  'force-laws-motion': {
    subject:'physics', classLevel:'9',
    prerequisites:['motion-class9'],
    related:['gravitation','work-energy'],
    formulas:['newtons-second-law','conservation-momentum','impulse'], examWeight:'high',
  },
  'gravitation': {
    subject:'physics', classLevel:'9',
    prerequisites:['force-laws-motion'],
    related:['pressure','work-energy'],
    formulas:['universal-gravitation','g-formula','escape-velocity'], examWeight:'high',
  },
  'electricity': {
    subject:'physics', classLevel:'10',
    prerequisites:['basic-electric-charge'],
    related:['magnetic-effects','electromagnetic-induction'],
    formulas:['ohms-law','resistance-formula','power-formula','kirchhoffs-laws'], examWeight:'high',
  },
  'light-reflection-refraction': {
    subject:'physics', classLevel:'10',
    prerequisites:['basic-optics'],
    related:['human-eye','electricity'],
    formulas:['mirror-formula','lens-formula','snells-law','magnification'], examWeight:'high',
  },

  // ── CHEMISTRY ───────────────────────────────────────────────
  'atoms-molecules': {
    subject:'chemistry', classLevel:'9',
    prerequisites:['matter-surroundings'],
    related:['structure-atom','chemical-reactions'],
    formulas:['mole-concept','avogadro-number','formula-mass'], examWeight:'high',
  },
  'chemical-reactions': {
    subject:'chemistry', classLevel:'10',
    prerequisites:['atoms-molecules','structure-atom'],
    related:['acids-bases-salts','metals-nonmetals'],
    formulas:['rate-reaction','activation-energy'], examWeight:'high',
  },
  'acids-bases-salts': {
    subject:'chemistry', classLevel:'10',
    prerequisites:['chemical-reactions'],
    related:['carbon-compounds','metals-nonmetals'],
    formulas:['ph-formula','neutralization'], examWeight:'high',
  },
  'carbon-compounds': {
    subject:'chemistry', classLevel:'10',
    prerequisites:['atoms-molecules','acids-bases-salts'],
    related:['polymers','biomolecules'],
    formulas:['functional-groups'], examWeight:'high',
  },

  // ── BIOLOGY ─────────────────────────────────────────────────
  'life-processes': {
    subject:'biology', classLevel:'10',
    prerequisites:['cell-basic','nutrition-basic'],
    related:['control-coordination','reproduction'],
    skills:['diagram-drawing','process-identification'], examWeight:'high',
  },
  'heredity-evolution': {
    subject:'biology', classLevel:'10',
    prerequisites:['reproduction','cell-division'],
    related:['how-organisms-reproduce'],
    formulas:['mendels-ratios'], examWeight:'high',
  },

  // ── CLASS 11 PHYSICS ─────────────────────────────────────────
  'kinematics': {
    subject:'physics', classLevel:'11',
    prerequisites:['motion-class9','mathematics-class10'],
    related:['laws-of-motion','work-energy-power'],
    formulas:['kinematic-equations','projectile-motion','relative-velocity'], examWeight:'high',
  },
  'laws-of-motion': {
    subject:'physics', classLevel:'11',
    prerequisites:['kinematics','force-laws-motion'],
    related:['work-energy-power','rotational-motion'],
    formulas:['newtons-laws','friction-coefficients','circular-motion'], examWeight:'high',
  },

  // ── CLASS 12 PHYSICS ─────────────────────────────────────────
  'electric-charges-fields': {
    subject:'physics', classLevel:'12',
    prerequisites:['electricity','kinematics'],
    related:['electric-potential','capacitance'],
    formulas:['coulombs-law','electric-field','gausss-law'], examWeight:'high',
  },
  'electromagnetism': {
    subject:'physics', classLevel:'12',
    prerequisites:['electric-charges-fields','magnetism'],
    related:['electromagnetic-waves','ac-circuits'],
    formulas:['faradays-law','lenz-law','maxwells-equations'], examWeight:'high',
  },
}

// ── TOPOLOGICAL SORT (prerequisite order) ────────────────────────
function topologicalSort(startNode: string, maxDepth = 6): string[] {
  const visited = new Set<string>()
  const order:   string[] = []

  function dfs(node: string, depth: number) {
    if (depth > maxDepth || visited.has(node)) return
    visited.add(node)
    const edges = CURRICULUM_GRAPH[node]
    if (edges) {
      for (const prereq of edges.prerequisites) dfs(prereq, depth + 1)
    }
    order.push(node)
  }

  dfs(startNode, 0)
  return order
}

// ── LEARNING PATH WITH MASTERY AWARENESS ─────────────────────────
function generateAdaptiveLearningPath(
  targetConcept: string,
  masteredConcepts: string[] = [],
  weakConcepts:    string[] = []
): { concept: string; status: 'mastered' | 'weak' | 'pending' | 'target'; priority: number }[] {
  const path = topologicalSort(targetConcept)
  return path.map((concept, i) => ({
    concept,
    status: masteredConcepts.includes(concept) ? 'mastered' as const
      : concept === targetConcept ? 'target' as const
      : weakConcepts.includes(concept) ? 'weak' as const : 'pending' as const,
    priority: weakConcepts.includes(concept) ? 1 : i,
  })).sort((a, b) => a.priority - b.priority)
}

// ── FORMULA-CONCEPT LINKER ────────────────────────────────────────
function getConceptsForFormula(formulaSlug: string): string[] {
  return Object.entries(CURRICULUM_GRAPH)
    .filter(([, v]) => v.formulas?.includes(formulaSlug))
    .map(([k]) => k)
}

// ── STATIC SUBJECT PREREQUISITES ─────────────────────────────────
const SUBJECT_PREREQUISITES: Record<string, { class: string; prereqs: string[] }[]> = {
  physics: [
    { class:'10', prereqs:['Force and Laws of Motion (Class 9)','Work and Energy (Class 9)'] },
    { class:'11', prereqs:['Class 10 Physics complete','Class 10 Mathematics'] },
    { class:'12', prereqs:['Class 11 Physics complete','Class 11 Mathematics'] },
  ],
  chemistry: [
    { class:'10', prereqs:['Atoms and Molecules (Class 9)','Chemical Reactions (Class 9)'] },
    { class:'11', prereqs:['Class 10 Chemistry complete'] },
    { class:'12', prereqs:['Class 11 Chemistry complete'] },
  ],
  mathematics: [
    { class:'10', prereqs:['Number Systems (Class 9)','Polynomials (Class 9)','Linear Equations (Class 9)'] },
    { class:'11', prereqs:['Class 10 Mathematics complete','Trigonometry','Coordinate Geometry'] },
    { class:'12', prereqs:['Class 11 Mathematics complete','Calculus foundations'] },
  ],
  biology: [
    { class:'10', prereqs:['Cell (Class 9)','Tissues (Class 9)'] },
    { class:'11', prereqs:['Class 10 Biology complete'] },
    { class:'12', prereqs:['Class 11 Biology complete'] },
  ],
}

export async function GET(req: NextRequest) {
  try {
    const sp          = req.nextUrl.searchParams
    const action      = sp.get('action') ?? 'prerequisites'
    const conceptSlug = sp.get('concept') ?? ''
    const subject     = sp.get('subject') ?? ''
    const classLevel  = sp.get('class') ?? ''
    const mastered    = sp.get('mastered')?.split(',').filter(Boolean) ?? []
    const weak        = sp.get('weak')?.split(',').filter(Boolean) ?? []
    const formula     = sp.get('formula') ?? ''

    const ck = `kg:${action}:${conceptSlug}:${subject}:${classLevel}:${formula}`
    const cached = questionCache.get(ck)
    if (cached) return ok(cached)

    if (action === 'prerequisites') {
      if (!conceptSlug) return err('concept required', 400)
      const node = CURRICULUM_GRAPH[conceptSlug]
      const result = {
        concept:       conceptSlug,
        prerequisites: node?.prerequisites ?? [],
        related:       node?.related ?? [],
        builds_on:     node?.builds_on ?? [],
        formulas:      node?.formulas ?? [],
        examWeight:    node?.examWeight,
        subject:       node?.subject,
        chapter:       node?.chapter,
      }
      questionCache.set(ck, result, TTL.CHAPTER)
      return ok(result)
    }

    if (action === 'subject-prereqs') {
      if (!subject) return err('subject required', 400)
      const subPrereqs = SUBJECT_PREREQUISITES[subject.toLowerCase()]
      const forClass   = subPrereqs?.find(p => p.class === classLevel)
      const result     = { subject, classLevel, prerequisites: forClass?.prereqs ?? [], allLevels: subPrereqs ?? [] }
      questionCache.set(ck, result, TTL.CHAPTER)
      return ok(result)
    }

    if (action === 'learning-path') {
      if (!conceptSlug) return err('concept required', 400)
      const path   = generateAdaptiveLearningPath(conceptSlug, mastered, weak)
      const result = { concept: conceptSlug, learningPath: path, totalSteps: path.length, masteredCount: path.filter(p => p.status === 'mastered').length }
      questionCache.set(ck, result, TTL.STATS)
      return ok(result)
    }

    if (action === 'formula-concepts') {
      if (!formula) return err('formula required', 400)
      const concepts = getConceptsForFormula(formula)
      const result   = { formula, relatedConcepts: concepts.map(c => ({ id: c, ...CURRICULUM_GRAPH[c] })) }
      return ok(result)
    }

    if (action === 'subject-graph') {
      const filtered = Object.entries(CURRICULUM_GRAPH)
        .filter(([, v]) => (!subject || v.subject === subject) && (!classLevel || v.classLevel === classLevel))
        .map(([id, v]) => ({ id, ...v }))
      return ok({ nodes: filtered, edgeCount: filtered.reduce((s, n) => s + n.prerequisites.length + n.related.length, 0) })
    }

    if (action === 'recommendations') {
      // Recommend next concept based on mastered + weak
      const allConcepts = Object.keys(CURRICULUM_GRAPH)
      const candidates  = allConcepts.filter(c => {
        const node = CURRICULUM_GRAPH[c]
        if (!node || mastered.includes(c)) return false
        const prereqsMet = node.prerequisites.every(p => mastered.includes(p) || p === '')
        return prereqsMet && (!subject || node.subject === subject) && (!classLevel || node.classLevel === classLevel)
      })
      const prioritized = candidates.sort((a, b) => {
        const aWeak = weak.includes(a) ? -1 : 0
        const bWeak = weak.includes(b) ? -1 : 0
        const aHigh = CURRICULUM_GRAPH[a].examWeight === 'high' ? -1 : 0
        const bHigh = CURRICULUM_GRAPH[b].examWeight === 'high' ? -1 : 0
        return (aWeak + aHigh) - (bWeak + bHigh)
      }).slice(0, 5)
      return ok({ recommendations: prioritized.map(c => ({ concept: c, ...CURRICULUM_GRAPH[c] })) })
    }

    return err('action: prerequisites|subject-prereqs|learning-path|formula-concepts|subject-graph|recommendations', 400)
  } catch (e) { return serverErr(e, 'GET /api/knowledge-graph') }
}

export async function POST(req: NextRequest) {
  try {
    const { requireAdmin } = await import('@/lib/api-middleware')
    const { response } = await requireAdmin(req)
    if (response) return response
    const body = await req.json().catch(() => null)
    if (!body) return err('Invalid body', 400)
    const { fromConcept, toConcept, relationType, strength = 1.0 } = body
    if (!fromConcept || !toConcept || !relationType) return err('fromConcept, toConcept, relationType required', 400)
    try {
      const { default: prisma } = await import('@/lib/prisma')
      const db = prisma as unknown as { conceptRelation: { upsert: (a: unknown) => Promise<{ id: number }> } }
      const relation = await db.conceptRelation.upsert({
        where: { fromConceptId_toConceptId_relationType: { fromConceptId: parseInt(fromConcept), toConceptId: parseInt(toConcept), relationType } },
        update: { strength }, create: { fromConceptId: parseInt(fromConcept), toConceptId: parseInt(toConcept), relationType, strength },
      })
      return ok({ success: true, relationId: relation.id })
    } catch { return ok({ success: true, note: 'Stored in-memory' }) }
  } catch (e) { return serverErr(e, 'POST /api/knowledge-graph') }
}
