// public/sw.js — MscTutor Service Worker v6 (UPGRADED)
// Offline-first + Background sync + Low-bandwidth optimization

const CACHE_V      = 'msctutor-v6'
const STATIC_CACHE = 'msctutor-static-v6'
const API_CACHE    = 'msctutor-api-v6'
const CONTENT_CACHE= 'msctutor-content-v6'
const MAX_API_AGE  = 5 * 60 * 1000  // 5 min

const STATIC_ASSETS = [
  '/', '/ask', '/mock-test', '/formulas', '/calculators', '/offline',
  '/ai-teacher', '/formulas', '/class',
  '/manifest.json', '/msctutor-logo.png',
]

const CACHE_FIRST = ['/icons/', '/og/', '/_next/static/', '/_next/image']
const NETWORK_FIRST = ['/api/ask', '/api/learning', '/api/auth']
const STALE_WHILE_REVALIDATE = ['/api/search', '/api/knowledge-graph', '/formulas', '/class']

// ── INSTALL ────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache =>
      cache.addAll(STATIC_ASSETS).catch(() => {})
    ).then(() => self.skipWaiting())
  )
})

// ── ACTIVATE ───────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => ![CACHE_V, STATIC_CACHE, API_CACHE, CONTENT_CACHE].includes(k)).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

// ── FETCH STRATEGY ─────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip cross-origin, POST, auth cookies
  if (url.origin !== self.location.origin) return
  if (request.method !== 'GET') return

  const path = url.pathname

  // Cache-first: static assets
  if (CACHE_FIRST.some(p => path.startsWith(p))) {
    event.respondWith(cacheFirst(request, STATIC_CACHE))
    return
  }

  // Network-first: live AI endpoints
  if (NETWORK_FIRST.some(p => path.startsWith(p))) {
    event.respondWith(networkFirst(request, API_CACHE))
    return
  }

  // Stale-while-revalidate: content pages + search
  if (STALE_WHILE_REVALIDATE.some(p => path.startsWith(p))) {
    event.respondWith(staleWhileRevalidate(request, CONTENT_CACHE))
    return
  }

  // Default: network with offline fallback
  event.respondWith(networkWithOfflineFallback(request))
})

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request)
  if (cached) return cached
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    return caches.match('/offline') || new Response('Offline', { status: 503 })
  }
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request, { signal: AbortSignal.timeout(8000) })
    if (response.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    const cached = await caches.match(request)
    return cached || new Response(JSON.stringify({ error: 'Offline', cached: false }), {
      headers: { 'Content-Type': 'application/json' }, status: 503
    })
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache  = await caches.open(cacheName)
  const cached = await cache.match(request)

  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone())
    return response
  }).catch(() => null)

  return cached || await fetchPromise || new Response('Offline', { status: 503 })
}

async function networkWithOfflineFallback(request) {
  try {
    return await fetch(request)
  } catch {
    const cached = await caches.match(request)
    if (cached) return cached
    // Return offline page for navigation requests
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match('/offline') || new Response('<h1>You are offline</h1>', { headers: {'Content-Type':'text/html'}, status: 503 })
    }
    return new Response('Offline', { status: 503 })
  }
}

// ── BACKGROUND SYNC ────────────────────────────────────────────────
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-questions') {
    event.waitUntil(syncOfflineQuestions())
  }
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncLearnerProgress())
  }
})

async function syncOfflineQuestions() {
  // Sync any questions asked while offline
  const db = await openDB()
  const pendingQuestions = await getAllFromDB(db, 'offline-questions')
  for (const q of pendingQuestions) {
    try {
      await fetch('/api/ask', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(q) })
      await deleteFromDB(db, 'offline-questions', q.id)
    } catch { break }
  }
}

async function syncLearnerProgress() {
  // Future: sync learner profile to cloud
}

// ── PUSH NOTIFICATIONS ─────────────────────────────────────────────
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {}
  event.waitUntil(
    self.registration.showNotification(data.title ?? 'MscTutor', {
      body:    data.body ?? 'Time to continue learning!',
      icon:    '/icons/icon-192.png',
      badge:   '/icons/icon-72.png',
      tag:     data.tag ?? 'msctutor',
      data:    { url: data.url ?? '/dashboard' },
      actions: [
        { action: 'open', title: 'Open App' },
        { action: 'dismiss', title: 'Later' },
      ],
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  if (event.action === 'dismiss') return
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      const url = event.notification.data?.url ?? '/'
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) return client.focus()
      }
      return clients.openWindow(url)
    })
  )
})

// ── MINIMAL INDEXEDDB HELPERS ──────────────────────────────────────
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('msctutor-offline', 1)
    req.onupgradeneeded = e => {
      const db = e.target.result
      if (!db.objectStoreNames.contains('offline-questions')) {
        db.createObjectStore('offline-questions', { keyPath: 'id', autoIncrement: true })
      }
    }
    req.onsuccess = e => resolve(e.target.result)
    req.onerror   = e => reject(e.target.error)
  })
}
function getAllFromDB(db, store) {
  return new Promise((resolve) => {
    const tx  = db.transaction(store, 'readonly')
    const req = tx.objectStore(store).getAll()
    req.onsuccess = () => resolve(req.result ?? [])
    req.onerror   = () => resolve([])
  })
}
function deleteFromDB(db, store, id) {
  return new Promise((resolve) => {
    const tx = db.transaction(store, 'readwrite')
    tx.objectStore(store).delete(id)
    tx.oncomplete = resolve
  })
}
