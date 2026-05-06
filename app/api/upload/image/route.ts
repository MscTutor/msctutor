// app/api/upload/image/route.ts — Compress → WebP → Storj

import { NextResponse }   from 'next/server'
import { compressToWebP, generateImageKey } from '@/lib/compress'
import { storjUpload }    from '@/lib/storj'
import { prisma }         from '@/lib/prisma'

export const runtime    = 'nodejs'
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file     = formData.get('image') as File | null
    const userId   = formData.get('userId') as string | null
    const schoolId = formData.get('schoolId') as string | null

    if (!file) return NextResponse.json({ error: 'No image provided' }, { status: 400 })

    const MAX_MB = 10
    if (file.size > MAX_MB * 1024 * 1024) {
      return NextResponse.json({ error: `Image must be under ${MAX_MB}MB` }, { status: 400 })
    }

    const buffer     = Buffer.from(await file.arrayBuffer())
    const compressed = await compressToWebP(buffer, { width: 1200, quality: 82 })
    const key        = generateImageKey(schoolId ? `schools/${schoolId}` : `users/${userId ?? 'anon'}`, file.name)
    const url        = await storjUpload(key, compressed, 'image/webp')

    if (schoolId) {
      await prisma.storageUsage.create({
        data: {
          schoolId:  parseInt(schoolId),
          fileType:  'image',
          fileName:  file.name,
          fileUrl:   url,
          sizeBytes: compressed.length,
        },
      })
    }

    return NextResponse.json({ url, size: compressed.length, key })
  } catch (err) {
    console.error('upload/image error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
