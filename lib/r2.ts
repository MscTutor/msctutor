// lib/r2.ts — Cloudflare R2 storage (FREE 25GB for admin/AI images)

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const R2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId:     process.env.R2_ACCESS_KEY_ID     ?? '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
  },
})

const BUCKET = process.env.R2_BUCKET_NAME  ?? 'msctutor-admin'
const PUBLIC = process.env.R2_PUBLIC_URL   ?? ''

export async function r2Upload(key: string, buffer: Buffer, contentType: string): Promise<string> {
  await R2.send(new PutObjectCommand({
    Bucket:      BUCKET,
    Key:         key,
    Body:        buffer,
    ContentType: contentType,
  }))
  return `${PUBLIC}/${key}`
}

export async function r2Get(key: string): Promise<Buffer | null> {
  try {
    const res = await R2.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }))
    const chunks: Uint8Array[] = []
    for await (const chunk of res.Body as AsyncIterable<Uint8Array>) {
      chunks.push(chunk)
    }
    return Buffer.concat(chunks)
  } catch {
    return null
  }
}

export async function r2Delete(key: string): Promise<void> {
  await R2.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }))
}

export async function r2SignedUrl(key: string, expiresIn = 3600): Promise<string> {
  return getSignedUrl(R2, new GetObjectCommand({ Bucket: BUCKET, Key: key }), { expiresIn })
}

export function r2PublicUrl(key: string): string {
  return `${PUBLIC}/${key}`
}
