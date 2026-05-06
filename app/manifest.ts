import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             'MscTutor — Free AI Education',
    short_name:       'MscTutor',
    description:      'Free AI-powered education for Class 1-12',
    start_url:        '/',
    display:          'standalone',
    background_color: '#f0f4ff',
    theme_color:      '#1a3a6b',
    orientation:      'portrait',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    categories:       ['education', 'productivity'],
    lang:             'en-IN',
  }
}
