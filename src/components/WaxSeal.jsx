import { useId } from 'react'

// Irregular wavy edge, like a pressed wax seal.
const EDGE_POINTS = 14
function sealPath() {
  const cx = 50
  const cy = 50
  const pts = []
  for (let i = 0; i < EDGE_POINTS * 2; i++) {
    const a = (Math.PI * 2 * i) / (EDGE_POINTS * 2)
    const r = i % 2 === 0 ? 44 : 40
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r])
  }
  return (
    pts
      .map(([x, y], i) => {
        const [px, py] = pts[(i + pts.length - 1) % pts.length]
        const mx = (x + px) / 2
        const my = (y + py) / 2
        return i === 0 ? `M${mx.toFixed(2)} ${my.toFixed(2)}` : `Q${px.toFixed(2)} ${py.toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`
      })
      .join(' ') + ' Z'
  )
}
const SEAL_PATH = sealPath()

export default function WaxSeal({ size = 64, className = '' }) {
  const uid = useId().replace(/:/g, '')
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,.45))' }}
    >
      <defs>
        <linearGradient id={`g${uid}`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#f6dc9c" />
          <stop offset="0.45" stopColor="#d4a35a" />
          <stop offset="1" stopColor="#8f5f24" />
        </linearGradient>
        <radialGradient id={`r${uid}`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#fff2c8" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff2c8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={SEAL_PATH} fill={`url(#g${uid})`} />
      <circle cx="50" cy="50" r="32" fill="none" stroke="#7b4f1c" strokeOpacity="0.35" strokeWidth="1.4" />
      <circle cx="50" cy="50" r="32" fill={`url(#r${uid})`} />
      <path
        d="M50 68C34 57 29 49 29 41c0-6 4.6-10.5 10.4-10.5 4.2 0 8 2.4 10.6 6.2 2.6-3.8 6.4-6.2 10.6-6.2C66.4 30.5 71 35 71 41c0 8-5 16-21 27z"
        fill="none"
        stroke="#6f4614"
        strokeWidth="3.4"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M50 66C36 56 31.5 49 31.5 42c0-4.8 3.7-8.5 8.4-8.5 3.6 0 6.9 2.2 10.1 6.8 3.2-4.6 6.5-6.8 10.1-6.8 4.7 0 8.4 3.7 8.4 8.5 0 7-4.5 14-18.5 24z"
        fill="none"
        stroke="#fbe6aa"
        strokeWidth="1.2"
        strokeOpacity="0.55"
        strokeLinejoin="round"
      />
    </svg>
  )
}
