// lib/compress.ts — Sharp image compression → WebP

import sharp from 'sharp'

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

export async function compressThumbnail(input: Buffer): Promise<Buffer> {
  return sharp(input)
    .resize(400, 300, { fit: 'cover' })
    .webp({ quality: 70 })
    .toBuffer()
}

export async function getImageDimensions(input: Buffer): Promise<{ width: number; height: number }> {
  const meta = await sharp(input).metadata()
  return { width: meta.width ?? 0, height: meta.height ?? 0 }
}

export function generateImageKey(prefix: string, filename: string): string {
  const ext   = filename.split('.').pop() ?? 'jpg'
  const clean = filename.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
  const ts    = Date.now()
  return `${prefix}/${ts}-${clean}.webp`
}
