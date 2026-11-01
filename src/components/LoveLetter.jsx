import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { letterContent } from '../data/content.js'

// Lace-edged card geometry (SVG units; the card keeps this aspect ratio at any size).
const W = 300
const H = 420
const R = 7.5 // scallop radius
const PANEL = { x: 34, y: 38, w: W - 68, h: H - 76 }

function scallopedRect(w, h, r) {
  const stepX = w / Math.round(w / (r * 2))
  const stepY = h / Math.round(h / (r * 2))
  let d = `M0 0`
  for (let x = 0; x < w - 0.1; x += stepX) d += ` a${stepX / 2} ${r} 0 0 1 ${stepX} 0`
  for (let y = 0; y < h - 0.1; y += stepY) d += ` a${r} ${stepY / 2} 0 0 1 0 ${stepY}`
  for (let x = 0; x < w - 0.1; x += stepX) d += ` a${stepX / 2} ${r} 0 0 1 ${-stepX} 0`
  for (let y = 0; y < h - 0.1; y += stepY) d += ` a${r} ${stepY / 2} 0 0 1 0 ${-stepY}`
  return d + ' Z'
}

function LaceCard() {
  const outer = useMemo(() => scallopedRect(W - 2 * R, H - 2 * R, R), [])
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <pattern id="lace-dots" width="7" height="7" patternUnits="userSpaceOnUse">
          <rect width="7" height="7" fill="#efe0bd" />
          <circle cx="3.5" cy="3.5" r="1.7" fill="#fbf3df" />
          <circle cx="0" cy="0" r="1" fill="#d9c196" />
          <circle cx="7" cy="7" r="1" fill="#d9c196" />
        </pattern>
        <pattern id="lace-ring" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#f2e5c6" />
          <circle cx="7" cy="7" r="4.4" fill="none" stroke="#d6bd8f" strokeWidth="1" />
          <circle cx="7" cy="7" r="1.4" fill="#fffaf0" />
        </pattern>
        <filter id="lace-shadow" x="-10%" y="-10%" width="120%" height="125%">
          <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>
      <g transform={`translate(${R} ${R + 4})`} filter="url(#lace-shadow)">
        <path d={outer} fill="url(#lace-ring)" stroke="#fff6df" strokeWidth="1.2" />
      </g>
      <rect x="14" y="14" width={W - 28} height={H - 28} rx="10" fill="url(#lace-dots)" opacity="0.9" />
      <rect x="22" y="22" width={W - 44} height={H - 44} rx="6" fill="none" stroke="#fffaf0" strokeOpacity="0.8" strokeWidth="1.6" />
      <rect
        x={PANEL.x}
        y={PANEL.y}
        width={PANEL.w}
        height={PANEL.h}
        fill="#ecd9b0"
        stroke="#d8c196"
        strokeWidth="1.2"
      />
    </svg>
  )
}

/** The cream lace letter with the Arabic message. Unfolds from top to bottom. */
export default function LoveLetter({ onNext }) {
  const { title, lines, button } = letterContent

  return (
    <motion.div
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30, transition: { duration: 0.6 } }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative w-full max-w-[min(84vw,380px)] [container-type:inline-size]"
        style={{ aspectRatio: `${W} / ${H}`, transformOrigin: 'top center' }}
        initial={{ clipPath: 'inset(0 0 100% 0)', scaleY: 0.92, y: 20 }}
        animate={{ clipPath: 'inset(0 0 -10% 0)', scaleY: 1, y: 0 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <LaceCard />

        <div
          className="absolute flex flex-col items-center justify-center text-center"
          style={{
            left: `${(PANEL.x / W) * 100}%`,
            top: `${(PANEL.y / H) * 100}%`,
            width: `${(PANEL.w / W) * 100}%`,
            height: `${(PANEL.h / H) * 100}%`,
          }}
        >
          <motion.h2
            className="font-script leading-none text-[#7a1424]"
            style={{ fontSize: '10.4cqw' }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
          >
            {title}
          </motion.h2>

          <div dir="rtl" lang="ar" className="mt-[3.2cqw] w-full font-arabic text-[#3a2a1c]" style={{ fontSize: '5.6cqw' }}>
            {lines.map((line, i) => (
              <motion.p
                key={line}
                className="leading-[2.05]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.3 + i * 0.28 }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.button
        type="button"
        onClick={onNext}
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-gold-400/60 px-8 py-3 font-hand text-xl text-gold-300 transition-colors hover:bg-gold-300/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 + lines.length * 0.28 + 0.2 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
      >
        {button}
        <ArrowRight size={18} strokeWidth={1.6} />
      </motion.button>
    </motion.div>
  )
}
