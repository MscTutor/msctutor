'use client'
// components/OptimizedImage.tsx — Drop-in replacement for <img>
// Lazy loading, blur placeholder, WebP/AVIF, error fallback

import NextImage, { type ImageProps } from 'next/image'
import { useState, useCallback }      from 'react'

interface Props extends Omit<ImageProps, 'src' | 'alt'> {
  src:         string
  alt:         string
  fallback?:   string       // Fallback image on error
  aspectRatio?: number      // width/height ratio e.g. 16/9
  className?:  string
  eager?:      boolean      // Force eager loading (above fold)
  blurData?:   string       // Custom blur placeholder base64
}

// Tiny 1x1 transparent pixel as blur placeholder
const DEFAULT_BLUR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

export default function OptimizedImage({
  src, alt, fallback, aspectRatio, className,
  eager = false, blurData, fill, width, height,
  style, ...props
}: Props) {
  const [error, setError]     = useState(false)
  const [loaded, setLoaded]   = useState(false)

  const onError = useCallback(() => setError(true), [])
  const onLoad  = useCallback(() => setLoaded(true), [])

  const imgSrc = error ? (fallback ?? '/images/placeholder.png') : src

  // Determine dimensions
  const hasDimensions = width && height
  const hasFill       = fill || (!hasDimensions && !aspectRatio)

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    ...(aspectRatio && !fill ? { paddingBottom: `${(1 / aspectRatio) * 100}%` } : {}),
    ...style,
  }

  const imageStyle: React.CSSProperties = {
    transition:   'opacity 0.3s ease',
    opacity:      loaded ? 1 : 0.7,
    objectFit:    props.objectFit as React.CSSProperties['objectFit'] ?? 'cover',
  }

  if (fill || (!hasDimensions && aspectRatio)) {
    return (
      <div style={containerStyle} className={className}>
        <NextImage
          src={imgSrc}
          alt={alt}
          fill={true}
          loading={eager ? 'eager' : 'lazy'}
          placeholder="blur"
          blurDataURL={blurData ?? DEFAULT_BLUR}
          onError={onError}
          onLoad={onLoad}
          style={imageStyle}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          {...props}
        />
      </div>
    )
  }

  return (
    <NextImage
      src={imgSrc}
      alt={alt}
      width={width  ?? 800}
      height={height ?? 600}
      loading={eager ? 'eager' : 'lazy'}
      placeholder="blur"
      blurDataURL={blurData ?? DEFAULT_BLUR}
      onError={onError}
      onLoad={onLoad}
      className={className}
      style={{ ...imageStyle, ...style }}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
      {...props}
    />
  )
}

// ── AVATAR COMPONENT ──────────────────────────────────────────────
export function Avatar({ src, name, size = 40 }: { src?: string; name: string; size?: number }) {
  const [error, setError] = useState(false)
  const initials          = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

  if (!src || error) {
    return (
      <div style={{
        width:          size, height: size,
        borderRadius:   '50%',
        background:     'linear-gradient(135deg,#1a3a6b,#2563eb)',
        color:          '#fff',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        fontSize:       size * 0.35,
        fontWeight:     700,
        flexShrink:     0,
      }}>
        {initials}
      </div>
    )
  }

  return (
    <NextImage
      src={src} alt={name} width={size} height={size}
      style={{ borderRadius: '50%', objectFit: 'cover' }}
      onError={() => setError(true)}
      loading="lazy"
    />
  )
}
