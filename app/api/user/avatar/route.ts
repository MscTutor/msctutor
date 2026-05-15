// app/api/user/avatar/route.ts
// Profile image upload — MAX 10 KB enforced server-side
// Stored in Cloudflare R2 at: avatars/{uid}.webp

import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/api-middleware'
import { r2Upload } from '@/lib/r2'
import { logger } from '@/lib/logger'

const MAX_SIZE_BYTES = 10 * 1024 // 10 KB — hard limit

export async function POST(req: NextRequest) {
  try {
    // 1. Auth check
    const { user, response } = await requireAuth(req)
    if (response) return response

    // 2. Parse multipart form
    const form = await req.formData()
    const file = form.get('avatar') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // 3. Type check — only images allowed
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed (jpg, png, webp, gif)' },
        { status: 400 }
      )
    }

    // 4. ✅ SIZE CHECK — 10 KB maximum (server-side hard limit)
    if (file.size > MAX_SIZE_BYTES) {
      const sizeKB = (file.size / 1024).toFixed(1)
      return NextResponse.json(
        {
          error: `Image too large: ${sizeKB} KB. Maximum allowed size is 10 KB.`,
          maxSize: '10 KB',
          yourSize: `${sizeKB} KB`,
          tip: 'Compress your image at: tinypng.com or squoosh.app',
        },
        { status: 413 }
      )
    }

    // 5. Convert to Buffer and upload to R2
    const buffer  = Buffer.from(await file.arrayBuffer())
    const key     = `avatars/${user!.uid}.${file.type.split('/')[1] ?? 'jpg'}`
    const url     = await r2Upload(key, buffer, file.type)

    logger.info('Avatar uploaded', { uid: user!.uid, sizeBytes: file.size, url })

    return NextResponse.json({ success: true, url, sizeBytes: file.size })
  } catch (e) {
    logger.error('Avatar upload failed', e)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
