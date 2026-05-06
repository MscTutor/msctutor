import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getMessaging } from 'firebase-admin/messaging'

function createMissingEnvProxy(name: string) {
  return new Proxy(
    {},
    {
      get() {
        throw new Error(`${name} unavailable: FIREBASE_ADMIN_SDK_JSON missing`)
      },
    },
  )
}

function initAdmin() {
  if (getApps().length > 0) return getApps()[0]

  const sdk = process.env.FIREBASE_ADMIN_SDK_JSON
  if (!sdk) return null

  try {
    const credential = cert(JSON.parse(Buffer.from(sdk, 'base64').toString('utf8')))
    return initializeApp({ credential })
  } catch (error) {
    console.error('Failed to initialize Firebase Admin SDK:', error)
    return null
  }
}

const adminApp = initAdmin()

export const adminAuth: any = adminApp ? getAuth(adminApp) : createMissingEnvProxy('adminAuth')
export const adminDb: any = adminApp ? getFirestore(adminApp) : createMissingEnvProxy('adminDb')
export const adminMessaging: any = adminApp ? getMessaging(adminApp) : createMissingEnvProxy('adminMessaging')
