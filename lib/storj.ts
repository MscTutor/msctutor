// lib/storj.ts — Storj DCS storage (FREE 25GB for user uploads)

import { S3Client, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const STORJ = new S3Client({
  region: 'us-east-1',
  endpoint: process.env.STORJ_ENDPOINT ?? 'https://gateway.storjshare.io',
  credentials: {
    accessKeyId:     process.env.STORJ_ACCESS_KEY ?? '',
    secretAccessKey: process.env.STORJ_SECRET_KEY ?? '',
  },
})

const BUCKET = process.env.STORJ_BUCKET ?? 'msctutor-users'

export async function storjUpload(key: string, buffer: Buffer, contentType: string): Promise<string> {
  await STORJ.send(new PutObjectCommand({
    Bucket:      BUCKET,
    Key:         key,
    Body:        buffer,
    ContentType: contentType,
  }))
  return `${process.env.STORJ_ENDPOINT}/${BUCKET}/${key}`
}

export async function storjDelete(key: string): Promise<void> {
  await STORJ.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }))
}

export async function storjSignedUrl(key: string, expiresIn = 3600): Promise<string> {
  return getSignedUrl(STORJ, new PutObjectCommand({ Bucket: BUCKET, Key: key }), { expiresIn })
}

export async function storjFileSize(key: string): Promise<number> {
  try {
    const res = await STORJ.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }))
    return res.ContentLength ?? 0
  } catch {
    return 0
  }
}
