// app/sitemap.ts — Complete multilingual sitemap with hreflang

import type { MetadataRoute } from 'next'

const BASE    = process.env.NEXT_PUBLIC_APP_URL ?? 'https://msctutor.in'
const LOCALES = ['en','hi','bn','gu','mr','ta','te','pa','ur','as','ar','fr']
const IETF    = { en:'en-IN',hi:'hi-IN',bn:'bn-IN',gu:'gu-IN',mr:'mr-IN',ta:'ta-IN',te:'te-IN',pa:'pa-IN',ur:'ur-PK',as:'as-IN',ar:'ar-SA',fr:'fr-FR' } as Record<string,string>

function entry(path: string, priority: number, freq: MetadataRoute.Sitemap[0]['changeFrequency']) {
  const langs: Record<string,string> = { 'x-default': `${BASE}${path}` }
  for (const l of LOCALES) langs[IETF[l]??l] = l==='en' ? `${BASE}${path}` : `${BASE}/${l}${path}`
  return { url:`${BASE}${path}`, lastModified:new Date(), changeFrequency:freq, priority, alternates:{ languages:langs } }
}

const CLASSES  = ['6','7','8','9','10','11','12']
const SUBJECTS = ['mathematics','physics','chemistry','biology','english','hindi','social-science','science','accountancy','economics']

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Core
    entry('/',            1.0, 'daily'),
    entry('/ask',         0.95,'daily'),
    entry('/ai-teacher',  0.95,'daily'),
    entry('/formulas',    0.90,'weekly'),
    entry('/mock-test',   0.90,'weekly'),
    entry('/calculators', 0.80,'monthly'),
    entry('/community',   0.75,'daily'),
    entry('/class',       0.85,'weekly'),
    entry('/pricing',     0.65,'monthly'),
    entry('/blog',        0.70,'daily'),
    entry('/register',    0.55,'monthly'),
    entry('/login',       0.45,'monthly'),
    entry('/about',       0.40,'monthly'),
    entry('/contact',     0.40,'monthly'),
    entry('/support',     0.35,'monthly'),
    entry('/privacy',     0.20,'yearly'),
    entry('/terms',       0.20,'yearly'),
    // Class pages
    ...CLASSES.map(c => entry(`/class/${c}`, 0.85,'weekly')),
    // Subject pages
    ...CLASSES.flatMap(c => SUBJECTS.map(s => entry(`/class/${c}/${s}`, 0.80,'weekly'))),
    // Class 12 streams
    entry('/class/12/humanities', 0.80,'weekly'),
    entry('/class/12/commerce',   0.80,'weekly'),
    entry('/class/11/humanities', 0.75,'weekly'),
    entry('/class/11/commerce',   0.75,'weekly'),
  ]
}
