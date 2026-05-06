import { slugify } from './slug'

export interface ImageResult {
  url: string
  thumb: string
  caption: string
  source: 'wikimedia' | 'nasa' | 'ai-generated' | 'cache'
  license: string
  attribution: string
}

// ─── WIKIMEDIA COMMONS API ────────────────────────────
export async function getFreeImage(query: string, subject = ''): Promise<ImageResult | null> {
  try {
    // Search Wikimedia Commons
    const searchUrl = `https://commons.wikimedia.org/w/api.php?` +
      `action=query&list=search&srsearch=${encodeURIComponent(query + ' education diagram')}&` +
      `srnamespace=6&format=json&srlimit=5&origin=*`

    const searchRes = await fetch(searchUrl, { next: { revalidate: 86400 } })
    const searchData = await searchRes.json()
    const results = searchData?.query?.search ?? []

    if (results.length === 0) return await getNasaImage(query)

    // Get image details
    const title = results[0].title
    const infoUrl = `https://commons.wikimedia.org/w/api.php?` +
      `action=query&titles=${encodeURIComponent(title)}&` +
      `prop=imageinfo&iiprop=url|extmetadata|size&format=json&origin=*`

    const infoRes = await fetch(infoUrl, { next: { revalidate: 86400 } })
    const infoData = await infoRes.json()
    const pages    = infoData?.query?.pages ?? {}
    const page     = Object.values(pages)[0] as any
    const info     = page?.imageinfo?.[0]

    if (!info?.url) return await getNasaImage(query)

    const license = info.extmetadata?.License?.value ?? 'CC-BY-SA'
    const author  = info.extmetadata?.Artist?.value?.replace(/<[^>]+>/g, '') ?? 'Wikimedia'

    return {
      url:         info.url,
      thumb:       info.url,
      caption:     `${query} — Educational Diagram`,
      source:      'wikimedia',
      license,
      attribution: `${author} — Wikimedia Commons (${license})`,
    }
  } catch {
    return await getNasaImage(query)
  }
}

// ─── NASA IMAGE API (for space/astronomy topics) ──────
async function getNasaImage(query: string): Promise<ImageResult | null> {
  try {
    const res = await fetch(
      `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`,
      { next: { revalidate: 86400 } }
    )
    const data = await res.json()
    const item = data?.collection?.items?.[0]
    if (!item) return getOpenStaxImage(query)

    const imageUrl = item?.links?.[0]?.href ?? ''
    const title    = item?.data?.[0]?.title ?? query

    return {
      url:         imageUrl,
      thumb:       imageUrl,
      caption:     title,
      source:      'nasa',
      license:     'Public Domain',
      attribution: `NASA — Public Domain`,
    }
  } catch {
    return getOpenStaxImage(query)
  }
}

// ─── OPENSTAX (textbook diagrams) ─────────────────────
function getOpenStaxImage(query: string): ImageResult | null {
  // OpenStax free textbook diagrams - curated static map
  const openStaxMap: Record<string, string> = {
    'newton':      'https://openstax.org/apps/archive/latest/resources/newton-laws-diagram.jpg',
    'atom':        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Stylised_atom_with_three_Bohr_model_orbits_and_stylised_nucleus.svg/200px-Stylised_atom_with_three_Bohr_model_orbits_and_stylised_nucleus.svg.png',
    'cell':        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Cell_biology_cytoplasm.jpg/320px-Cell_biology_cytoplasm.jpg',
    'dna':         'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/DNA_Structure%2BKey%2BLabelled.pn_NoBB.png/200px-DNA_Structure%2BKey%2BLabelled.pn_NoBB.png',
    'photosynthesis':'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Photosynthesis_en.svg/300px-Photosynthesis_en.svg.png',
    'demand':      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Supply-and-demand.svg/300px-Supply-and-demand.svg.png',
    'circuit':     'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Electric_circuit.svg/300px-Electric_circuit.svg.png',
    'periodic':    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Simple_Periodic_Table_Chart-en.svg/500px-Simple_Periodic_Table_Chart-en.svg.png',
  }

  const key = Object.keys(openStaxMap).find(k => query.toLowerCase().includes(k))
  if (!key) return null

  return {
    url:         openStaxMap[key],
    thumb:       openStaxMap[key],
    caption:     `${query} — Educational Diagram`,
    source:      'wikimedia',
    license:     'CC-BY-SA / Public Domain',
    attribution: 'Wikimedia Commons — Open License',
  }
}
