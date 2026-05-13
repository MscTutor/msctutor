// lib/compress.ts — Extended media optimization pipeline
// WebP, AVIF, lazy previews, SVG passthrough, chunked references

import sharp from 'sharp'

// ── WEBP CONVERSION ───────────────────────────────────────────────
export async function compressToWebP(
  input: Buffer,
  options: { width?: number; quality?: number } = {}
): Promise<Buffer> {
  const { width = 800, quality = 80 } = options
  return sharp(input)
    .resize(width, undefined, { withoutEnlargement: true })
    .webp({ quality })
    .toBuffer()
}

// ── AVIF (better compression, modern browsers) ────────────────────
export async function compressToAVIF(
  input: Buffer,
  options: { width?: number; quality?: number } = {}
): Promise<Buffer> {
  const { width = 800, quality = 60 } = options
  try {
    return await sharp(input)
      .resize(width, undefined, { withoutEnlargement: true })
      .avif({ quality })
      .toBuffer()
  } catch {
    // AVIF not supported by this sharp build — fallback to WebP
    return compressToWebP(input, { width, quality: quality + 15 })
  }
}

// ── THUMBNAIL (lazy preview) ──────────────────────────────────────
export async function compressThumbnail(input: Buffer): Promise<Buffer> {
  return sharp(input)
    .resize(400, 300, { fit: 'cover' })
    .webp({ quality: 70 })
    .toBuffer()
}

// ── MICRO-PREVIEW (blur placeholder, tiny size) ───────────────────
export async function generateBlurPreview(input: Buffer): Promise<string> {
  // Generates a tiny 4×3 base64 image for blur-up lazy loading
  const tiny = await sharp(input)
    .resize(4, 3, { fit: 'cover' })
    .webp({ quality: 20 })
    .toBuffer()
  return `data:image/webp;base64,${tiny.toString('base64')}`
}

// ── DUAL FORMAT (WebP for fallback, AVIF for modern) ──────────────
export async function compressDualFormat(
  input: Buffer,
  options: { width?: number } = {}
): Promise<{ webp: Buffer; avif: Buffer; blur: string; originalSize: number }> {
  const [webp, avif, blur] = await Promise.all([
    compressToWebP(input, options),
    compressToAVIF(input, options),
    generateBlurPreview(input),
  ])
  return { webp, avif, blur, originalSize: input.length }
}

// ── EDUCATIONAL IMAGE RESIZE PRESETS ─────────────────────────────
export type ImagePreset = 'hero' | 'card' | 'thumbnail' | 'diagram' | 'og'
export const IMAGE_PRESETS: Record<ImagePreset, { width: number; quality: number }> = {
  hero:      { width: 1200, quality: 85 },
  card:      { width: 600,  quality: 80 },
  thumbnail: { width: 300,  quality: 75 },
  diagram:   { width: 800,  quality: 82 },  // Sharp lines, higher quality
  og:        { width: 1200, quality: 88 },  // OG images need high quality
}

export async function compressWithPreset(input: Buffer, preset: ImagePreset): Promise<Buffer> {
  const { width, quality } = IMAGE_PRESETS[preset]
  return compressToWebP(input, { width, quality })
}

// ── EXISTING FUNCTIONS (preserved) ───────────────────────────────
export async function getImageDimensions(input: Buffer): Promise<{ width: number; height: number }> {
  const meta = await sharp(input).metadata()
  return { width: meta.width ?? 0, height: meta.height ?? 0 }
}

export function generateImageKey(prefix: string, filename: string): string {
  const clean = filename.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
  const ts    = Date.now()
  return `${prefix}/${ts}-${clean}.webp`
}

// ── PDF CHUNK REFERENCES (prevent loading huge PDFs) ──────────────
export interface PDFChunkReference {
  chunkIndex:  number
  pageStart:   number
  pageEnd:     number
  wordCount:   number
  storageKey:  string    // Storj/R2 key for this chunk's text
  previewText: string    // First 100 chars for search indexing
}

export function buildPDFChunkReferences(
  chunks: { index: number; content: string; pageEst: number; wordCount: number }[],
  pdfKey: string
): PDFChunkReference[] {
  return chunks.map(chunk => ({
    chunkIndex:  chunk.index,
    pageStart:   chunk.pageEst,
    pageEnd:     chunk.pageEst + 1,
    wordCount:   chunk.wordCount,
    storageKey:  `${pdfKey}-chunk-${chunk.index}.txt`,
    previewText: chunk.content.slice(0, 100).replace(/\n/g, ' '),
  }))
}

// ── COMPRESSION STATS ─────────────────────────────────────────────
export function compressionSavings(originalBytes: number, compressedBytes: number): {
  saved:   number    // bytes saved
  ratio:   number    // compression ratio
  pct:     number    // % reduction
} {
  const saved = originalBytes - compressedBytes
  const ratio = originalBytes > 0 ? originalBytes / compressedBytes : 1
  const pct   = originalBytes > 0 ? Math.round(saved / originalBytes * 100) : 0
  return { saved, ratio: Math.round(ratio * 100) / 100, pct }
}

