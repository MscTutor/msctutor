// public/sw.js — Service Worker for PWA (offline support + push notifications)

const CACHE_NAME = 'msctutor-v4'
const STATIC_ASSETS = [
  '/',
  '/ask',
  '/mock-test',
  '/formulas',
  '/calculators',
  '/offline',
]

// Install: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(() => {})
    })
  )
  self.skipWaiting()
})

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// Fetch: network-first with cache fallback
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip API routes — always network
  if (url.pathname.startsWith('/api/')) return

  // Skip non-GET
  if (request.method !== 'GET') return

  event.respondWith(
    fetch(request)
      .then(response => {
        // Cache successful responses
        if (response.ok && response.status < 400) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
        }
        return response
      })
      .catch(() => {
        // Offline fallback
        return caches.match(request).then(cached => {
          if (cached) return cached
          // Return offline page for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/offline') || new Response('You are offline. Please check your internet connection.', { headers: { 'Content-Type': 'text/html' } })
          }
        })
      })
  )
})

// Push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return
  const data = event.data.json()
  event.waitUntil(
    self.registration.showNotification(data.title || 'MscTutor', {
      body:    data.body,
      icon:    '/icons/icon-192.png',
      badge:   '/icons/badge-72.png',
      data:    data.data ?? {},
      actions: [{ action: 'open', title: 'Open' }, { action: 'close', title: 'Close' }],
      vibrate: [200, 100, 200],
    })
  )
})

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  if (event.action === 'close') return
  const url = event.notification.data?.url ?? '/'
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) return client.focus()
      }
      if (clients.openWindow) return clients.openWindow(url)
    })
  )
})
