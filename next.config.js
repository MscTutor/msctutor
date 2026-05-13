/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify:       true,
  compress:        true,          // Gzip/Brotli compression

  // ── OUTPUT ────────────────────────────────────────────────────
  // 'standalone' bundles only what's needed — reduces deploy size
  output: 'standalone',

  // ── IMAGE OPTIMIZATION ────────────────────────────────────────
  images: {
    formats:          ['image/avif', 'image/webp'],  // Best compression
    minimumCacheTTL:  86400,                          // Cache 24h
    deviceSizes:      [640, 828, 1080, 1200, 1920],
    imageSizes:       [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: '*.r2.dev' },
      { protocol: 'https', hostname: '*.cloudflare.com' },
    ],
    dangerouslyAllowSVG:  true,
    contentSecurityPolicy:"default-src 'self'; script-src 'none'; sandbox;",
  },

  // ── EXPERIMENTAL OPTIMIZATIONS ────────────────────────────────
  experimental: {
    // Optimize known large packages — reduces initial JS
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      'firebase',
      'katex',
      '@aws-sdk/client-s3',
    ],
    // Partial pre-rendering (Next.js 14+)
    ppr: false,   // Enable when stable
    // Turbo for faster dev builds (don't enable in prod)
    // turbo: {}
  },

  // ── SECURITY HEADERS ──────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',  value: 'nosniff' },
          { key: 'X-Frame-Options',          value: 'DENY' },
          { key: 'X-XSS-Protection',         value: '1; mode=block' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      // Aggressive caching for static assets
      {
        source: '/(.*)\\.(js|css|woff2|woff|ttf|ico|png|jpg|jpeg|svg|gif|webp|avif)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // API routes: no caching by default
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ]
  },

  // ── REDIRECTS ─────────────────────────────────────────────────
  async redirects() {
    return [
      { source: '/home',  destination: '/',             permanent: true },
      { source: '/index', destination: '/',             permanent: true },
      { source: '/ask-question', destination: '/ask',   permanent: true },
      { source: '/formula',      destination: '/formulas', permanent: true },
    ]
  },

  // ── WEBPACK OPTIMIZATION ──────────────────────────────────────
  webpack(config, { dev, isServer }) {
    // Production-only optimizations
    if (!dev) {
      // Tree-shaking: mark as side-effect-free
      config.optimization = {
        ...config.optimization,
        usedExports:          true,
        sideEffects:          true,
        // Better chunk splitting
        splitChunks: {
          chunks:                  'all',
          maxInitialRequests:      25,
          maxAsyncRequests:        25,
          minSize:                 20_000,
          maxSize:                 244_000,   // 244KB max chunk
          cacheGroups: {
            // Vendor chunks
            react: {
              test:     /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              name:     'vendor-react',
              priority: 40,
              chunks:   'all',
            },
            firebase: {
              test:     /[\\/]node_modules[\\/](firebase|@firebase)[\\/]/,
              name:     'vendor-firebase',
              priority: 30,
              chunks:   'async',  // Lazy load Firebase
            },
            ui: {
              test:     /[\\/]node_modules[\\/](lucide-react|framer-motion)[\\/]/,
              name:     'vendor-ui',
              priority: 20,
              chunks:   'async',
            },
            // Heavy libs only load when needed
            heavy: {
              test:     /[\\/]node_modules[\\/](katex|pdf-parse|@aws-sdk)[\\/]/,
              name:     'vendor-heavy',
              priority: 10,
              chunks:   'async',  // Code-split these
            },
          },
        },
      }
    }

    // Don't bundle server-only packages in client
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs:             false,
        net:            false,
        tls:            false,
        crypto:         false,
        'firebase-admin': false,
        'pdf-parse':    false,
        'razorpay':     false,
        'stripe':       false,
      }
    }

    return config
  },

  // ── TYPESCRIPT ────────────────────────────────────────────────
  typescript:  { ignoreBuildErrors: false },
  eslint:      { ignoreDuringBuilds: false },

  // ── LOGGING ───────────────────────────────────────────────────
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },

  // ── ENV VARS available client-side ────────────────────────────
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
}

module.exports = nextConfig
