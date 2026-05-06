// lib/pdf-extract.ts — PDF text extraction using pdf-parse

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require('pdf-parse')

export interface PDFExtractResult {
  text: string
  pages: number
  info: Record<string, unknown>
}

export async function extractPDFText(buffer: Buffer): Promise<PDFExtractResult> {
  const data = await pdfParse(buffer)
  return {
    text:  data.text,
    pages: data.numpages,
    info:  data.info ?? {},
  }
}

export function splitIntoChapters(text: string): string[] {
  const chapterPatterns = [
    /chapter\s+\d+/gi,
    /अध्याय\s+\d+/g,
    /CHAPTER\s+[IVXLC]+/g,
    /^#{1,2}\s+.+$/gm,
    /^\d+\.\s+[A-Z].+$/gm,
  ]

  let splits: number[] = [0]
  for (const pattern of chapterPatterns) {
    let m: RegExpExecArray | null
    const re = new RegExp(pattern.source, pattern.flags)
    while ((m = re.exec(text)) !== null) {
      splits.push(m.index)
    }
  }
  splits = [...new Set(splits)].sort((a, b) => a - b)

  const chapters: string[] = []
  for (let i = 0; i < splits.length; i++) {
    const start = splits[i]
    const end   = splits[i + 1] ?? text.length
    const chunk = text.slice(start, end).trim()
    if (chunk.length > 200) chapters.push(chunk)
  }

  return chapters.length > 0 ? chapters : [text]
}

export function extractChapterTitle(chapterText: string): string {
  const firstLine = chapterText.split('\n').find(l => l.trim().length > 3)
  return (firstLine ?? 'Chapter').trim().slice(0, 100)
}
