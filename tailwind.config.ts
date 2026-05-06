import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          500: '#2952a3',
          600: '#1a3a6b',
          700: '#152d54',
          DEFAULT: '#1a3a6b',
          glow: '#3b6fd4',
        },
        accent: {
          DEFAULT: '#f59e0b',
          green: '#10b981',
        },
        math:     '#1a3a6b',
        science:  '#0a5e3f',
        commerce: '#7c3400',
        language: '#6d28d9',
        tech:     '#0369a1',
      },
      fontFamily: {
        head: ['Sora', 'sans-serif'],
        body: ['Noto Sans', 'Noto Sans Devanagari', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '20px',
        xl: '28px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(26,58,107,0.10)',
        lg:   '0 8px 40px rgba(26,58,107,0.16)',
        glow: '0 0 24px rgba(59,111,212,0.25)',
      },
      animation: {
        'float':      'float 8s ease-in-out infinite',
        'dot-bounce': 'dotBounce 1.2s ease-in-out infinite',
        'slide-up':   'slideUp 0.4s ease',
        'fade-in':    'fadeIn 0.3s ease',
        'pulse-ring': 'pulseRing 1.2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%':     { transform: 'translateY(-18px) rotate(5deg)' },
        },
        dotBounce: {
          '0%,80%,100%': { transform: 'scale(0.6)', opacity: '0.5' },
          '40%':          { transform: 'scale(1)',   opacity: '1'   },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)'    },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        pulseRing: {
          '0%,100%': { boxShadow: '0 4px 20px rgba(220,38,38,0.4)' },
          '50%':     { boxShadow: '0 4px 32px rgba(220,38,38,0.7), 0 0 0 12px rgba(220,38,38,0.1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
