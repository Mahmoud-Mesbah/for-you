import { useState } from 'react'
import { fallbackImage } from '../data/images.js'

/** <img> that swaps to a romantic placeholder if the source fails to load. */
export default function SafeImage({ src, alt, className = '', ...rest }) {
  const [failed, setFailed] = useState(false)
  return (
    <img
      src={failed ? fallbackImage : src}
      alt={alt}
      className={className}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}
