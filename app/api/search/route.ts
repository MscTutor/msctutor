// app/api/search/route.ts — UPGRADED: fuzzy, formula, multilingual, intent

import { NextResponse }  from 'next/server'
import { prisma }        from '@/lib/prisma'
import { searchCache, TTL, cacheHeaders } from '@/lib/cache'
import { logger }        from '@/lib/logger'

function fuzzyScore(text: string, query: string): number {
  const t = text.toLowerCase(), q = query.toLowerCase()
  if (t === q) return 100; if (t.startsWith(q)) return 90; if (t.includes(q)) return 70
  const words = q.split(/\s+/).filter(w => w.length > 2)
  const hits = words.filter(w => t.includes(w))
  return hits.length ? Math.round(hits.length / words.length * 60) : 0
}

function detectIntent(q: string) {
  const lo = q.toLowerCase()
  if (/formula|equation|calculate/.test(lo)) return { type:'formula' as const }
  if (/what is|define|meaning|kya hai/.test(lo)) return { type:'definition' as const }
  if (/how to|explain|steps|kaise/.test(lo)) return { type:'how_to' as const }
  if (/example|solved|practice/.test(lo)) return { type:'example' as const }
  const smap: Record<string,string> = {
    'physics|force|motion|energy|wave|newton': 'physics',
    'chemistry|reaction|acid|base|mole': 'chemistry',
    'biology|cell|photosynthesis|dna': 'biology',
    'math|algebra|geometry|calculus': 'mathematics',
  }
  for (const [p, s] of Object.entries(smap)) {
    if (new RegExp(p,'i').test(lo)) return { type:'general' as const, subject:s }
  }
  const cm = lo.match(/class\s*(\d+)|(\d+)th/)
  return { type:'general' as const, classHint: cm?.[1]??cm?.[2] }
}

function normalise(q: string): string {
  const m: Record<string,string> = { 'न्यूटन':'newton','गुरुत्व':'gravity','प्रकाश':'light',
    'ऊर्जा':'energy','बल':'force','त्वरण':'acceleration','परमाणु':'atom','ध्वनि':'sound' }
  let r = q; for (const [h,e] of Object.entries(m)) r = r.replace(new RegExp(h,'g'),e)
  return r.trim()
}

export async function GET(req: Request) {
  try {
    const sp = new URL(req.url).searchParams
    const rawQ = sp.get('q')?.trim() ?? ''
    const type = sp.get('type') ?? 'all'
    const subject = sp.get('subject') ?? ''
    const cls = sp.get('class') ?? ''
    const limit = Math.min(parseInt(sp.get('limit') ?? '10'), 20)

    if (!rawQ || rawQ.length < 2) {
      return NextResponse.json({ results:[], query:rawQ, total:0, intent:null })
    }

    const ck = `search:${rawQ}:${type}:${subject}:${cls}`
    const cached = searchCache.get(ck)
    if (cached) return NextResponse.json(cached, { headers: cacheHeaders(TTL.SEARCH) })

    const q = normalise(rawQ)
    const intent = detectIntent(q)
    const isFormula = /formula|equation|[=√∑]/i.test(q)
    const sf = subject || ('subject' in intent ? (intent as {subject?:string}).subject : '')
    const cf = cls || ('classHint' in intent ? (intent as {classHint?:string}).classHint : '')

    try {
      const [questions, chapters, formulas, pages] = await Promise.all([
        (type==='all'||type==='questions') ? prisma.question.findMany({
          where:{ isPublic:true, isApproved:true,
            OR:[{title:{contains:q}},{solution:{contains:q}},{tags:{contains:q}},{ncertRef:{contains:q}}],
            ...(sf?{subject:{slug:{contains:sf}}}:{}), ...(cf?{classLevel:cf}:{}) },
          select:{ slug:true,title:true,formula:true,ncertRef:true,difficulty:true,classLevel:true,views:true,
            subject:{select:{name:true,slug:true,color:true,icon:true}} },
          orderBy:[{views:'desc'}], take:limit,
        }).catch(()=>[]) : [],

        (type==='all'||type==='chapters') ? prisma.chapter.findMany({
          where:{ isPublic:true, isApproved:true,
            OR:[{title:{contains:q}},{description:{contains:q}},{concepts:{contains:q}}],
            ...(sf?{subject:{slug:{contains:sf}}}:{}), ...(cf?{classLevel:cf}:{}) },
          select:{ slug:true,title:true,classLevel:true, subject:{select:{slug:true,name:true,icon:true}} },
          take:Math.ceil(limit/2),
        }).catch(()=>[]) : [],

        (type==='all'||type==='formulas'||isFormula) ? prisma.formula.findMany({
          where:{ OR:[{title:{contains:q}},{latex:{contains:q}},{description:{contains:q}}] },
          select:{ id:true,title:true,latex:true,classLevel:true, subject:{select:{slug:true,name:true}} },
          take:5,
        }).catch(()=>[]) : [],

        prisma.contentPage.findMany({
          where:{ isPublic:true, isApproved:true, OR:[{title:{contains:q}},{content:{contains:q}}] },
          select:{ slug:true,title:true,type:true,classLevel:true }, take:5,
        }).catch(()=>[]),
      ])

      const results = [
        ...(questions as {slug:string;title:string;formula?:string;ncertRef?:string;difficulty?:string;classLevel?:string;views?:number;subject?:{name:string;slug:string;color?:string;icon?:string}}[])
          .map(r=>({ type:'question', slug:r.slug, title:r.title, formula:r.formula, ncertRef:r.ncertRef,
            difficulty:r.difficulty, classLevel:r.classLevel, subject:r.subject,
            score:fuzzyScore(r.title,q)+Math.min((r.views??0)/10,20), url:`/q/${r.slug}` })),
        ...(chapters as {slug:string;title:string;classLevel?:string;subject?:{slug:string;name:string;icon?:string}}[])
          .map(r=>({ type:'chapter', slug:r.slug, title:r.title, classLevel:r.classLevel, subject:r.subject,
            score:fuzzyScore(r.title,q), url:`/class/${r.classLevel}/${r.subject?.slug}` })),
        ...(formulas as {id:number;title:string;latex:string;classLevel?:string;subject?:{slug:string;name:string}}[])
          .map(r=>({ type:'formula', slug:`f-${r.id}`, title:r.title, latex:r.latex, classLevel:r.classLevel,
            subject:r.subject, score:fuzzyScore(r.title,q)+(isFormula?25:0), url:'/formulas' })),
        ...(pages as {slug:string;title:string;type:string;classLevel?:string}[])
          .map(r=>({ type:'page', slug:r.slug, title:r.title, pageType:r.type, classLevel:r.classLevel,
            score:fuzzyScore(r.title,q), url:`/content/${r.slug}` })),
      ].filter(r=>r.score>0).sort((a,b)=>b.score-a.score).slice(0,limit)

      const out = { results, query:rawQ, total:results.length, intent, isFormula }
      searchCache.set(ck, out, TTL.SEARCH)
      return NextResponse.json(out, { headers: cacheHeaders(TTL.SEARCH) })
    } catch(dbErr) {
      logger.dbError('search',dbErr)
      return NextResponse.json({ results:[], query:rawQ, total:0, intent })
    }
  } catch(e) {
    logger.apiError('/api/search',e)
    return NextResponse.json({ error:'Search failed' },{ status:500 })
  }
}
