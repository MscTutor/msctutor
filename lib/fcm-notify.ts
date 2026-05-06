import { adminMessaging } from './firebase-admin'

export interface PushPayload { title: string; body: string; data?: Record<string, string> }

// Named aliases used by school notify routes
export async function sendPushToToken(token: string, payload: PushPayload): Promise<boolean> {
  try {
    await adminMessaging.send({ token, notification: { title: payload.title, body: payload.body }, data: payload.data ?? {}, android: { priority: 'high' }, apns: { payload: { aps: { sound: 'default' } } } })
    return true
  } catch { return false }
}

export async function sendPushMulticast(tokens: string[], payload: PushPayload): Promise<{ success: number; failure: number }> {
  if (!tokens.length) return { success: 0, failure: 0 }
  let success = 0, failure = 0
  for (let i = 0; i < tokens.length; i += 500) {
    const chunk = tokens.slice(i, i + 500)
    try {
      const res = await adminMessaging.sendEachForMulticast({ tokens: chunk, notification: { title: payload.title, body: payload.body }, data: payload.data ?? {}, android: { priority: 'high' } })
      success += res.successCount; failure += res.failureCount
    } catch { failure += chunk.length }
  }
  return { success, failure }
}

export async function sendPushNotification(token: string, title: string, body: string, data?: Record<string, string>) {
  if (!token) return
  try {
    await adminMessaging.send({ token, notification: { title, body }, data, android: { priority: 'high' }, apns: { payload: { aps: { sound: 'default' } } } })
  } catch (err) {
    console.error('FCM error:', err)
  }
}

export async function sendBulkNotification(tokens: string[], title: string, body: string, data?: Record<string, string>) {
  if (!tokens.length) return
  // Firebase supports 500 tokens per batch
  const chunks = Array.from({ length: Math.ceil(tokens.length / 500) }, (_, i) => tokens.slice(i * 500, i * 500 + 500))
  for (const chunk of chunks) {
    try {
      await adminMessaging.sendEachForMulticast({ tokens: chunk, notification: { title, body }, data, android: { priority: 'high' } })
    } catch (err) {
      console.error('FCM bulk error:', err)
    }
  }
}

// Attendance absent notification
export async function notifyAbsent(studentName: string, className: string, studentToken?: string, parentToken?: string) {
  const title = 'Attendance Alert — MscTutor'
  const body  = `${studentName} was marked ABSENT in ${className} today`
  if (studentToken) await sendPushNotification(studentToken, title, body, { type: 'attendance' })
  if (parentToken)  await sendPushNotification(parentToken,  `Your child absent — MscTutor`, `${studentName} was absent from ${className} today`, { type: 'parent_attendance' })
}

// New homework notification
export async function notifyHomework(tokens: string[], subject: string, className: string) {
  await sendBulkNotification(tokens, 'New Homework — MscTutor', `New ${subject} homework assigned for ${className}`, { type: 'homework' })
}

// School notice notification
export async function notifySchoolNotice(tokens: string[], title: string, message: string) {
  await sendBulkNotification(tokens, `📢 ${title}`, message, { type: 'notice' })
}
