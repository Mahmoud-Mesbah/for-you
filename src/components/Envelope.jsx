import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import WaxSeal from './WaxSeal.jsx'
import { envelopeContent } from '../data/content.js'

function useTypewriter(text, speed = 95, startDelay = 700) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(0)
    let id
    const start = setTimeout(() => {
      id = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            clearInterval(id)
            return c
          }
          return c + 1
        })
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(start)
      clearInterval(id)
    }
  }, [text, speed, startDelay])
  return text.slice(0, count)
}

const FRONT_CLIP = 'polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%)'
const FLAP_CLIP = 'polygon(0 0, 100% 0, 50% 100%)'

/**
 * Opening screen. Tapping the seal opens the flap, lifts the letter out,
 * then calls `onOpened` so the parent can show the letter screen.
 */
export default function Envelope({ onOpen, onOpened }) {
  const [stage, setStage] = useState('closed') // closed → opening → rising
  const [flapBehind, setFlapBehind] = useState(false)
  const hint = useTypewriter(envelopeContent.hint)

  const handleOpen = () => {
    if (stage !== 'closed') return
    setStage('opening')
    onOpen?.()
    setTimeout(() => setFlapBehind(true), 300)
    setTimeout(() => setStage('rising'), 750)
    setTimeout(() => onOpened?.(), 2100)
  }

  const opened = stage !== 'closed'

  return (
    <motion.div
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
      transition={{ duration: 0.9 }}
    >
      <motion.h1
        className="gold-text mb-7 font-script text-[clamp(2.6rem,11vw,3.6rem)] leading-none"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {envelopeContent.heading}
      </motion.h1>

      <motion.div
        className="relative w-full max-w-[min(88vw,440px)]"
        style={{ aspectRatio: '1.42 / 1', perspective: 1400 }}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* back panel */}
        <div
          className="absolute inset-0 rounded-[6px]"
          style={{
            background: 'linear-gradient(180deg,#5a0f1b 0%,#3d0a12 100%)',
            boxShadow: '0 22px 40px rgba(0,0,0,.55)',
            zIndex: 0,
          }}
        />

        {/* letter paper sliding out */}
        <motion.div
          className="absolute left-[5%] right-[5%] top-[9%] bottom-[5%] rounded-[4px]"
          style={{
            zIndex: 2,
            background: 'linear-gradient(180deg,#f3e4c4,#e9d3a8)',
            backgroundImage:
              'radial-gradient(circle at 6px 0, transparent 5px, #f3e4c4 5.5px), linear-gradient(180deg,#f3e4c4,#e9d3a8)',
            backgroundSize: '12px 8px, 100% 100%',
            backgroundRepeat: 'repeat-x, no-repeat',
            boxShadow: '0 -2px 8px rgba(0,0,0,.25)',
          }}
          animate={stage === 'rising' ? { y: '-62%', scale: 1.04 } : { y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* front pocket */}
        <div
          className="absolute inset-0 rounded-[6px]"
          style={{
            zIndex: 3,
            clipPath: FRONT_CLIP,
            background: 'linear-gradient(160deg,#7a1424 0%,#5f0f1d 55%,#4b0b17 100%)',
          }}
        />
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ zIndex: 3 }}
          viewBox="0 0 100 70"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 70 L50 39" stroke="rgba(0,0,0,.28)" strokeWidth=".35" fill="none" />
          <path d="M100 70 L50 39" stroke="rgba(255,255,255,.07)" strokeWidth=".35" fill="none" />
        </svg>

        {/* flap */}
        <motion.div
          className="absolute left-0 right-0 top-0"
          style={{
            height: '56%',
            transformOrigin: 'top center',
            zIndex: flapBehind ? 1 : 4,
            filter: flapBehind ? 'none' : 'drop-shadow(0 6px 6px rgba(0,0,0,.35))',
          }}
          animate={{ rotateX: opened ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.45, 0, 0.2, 1] }}
        >
          <motion.div
            className="h-full w-full"
            style={{ clipPath: FLAP_CLIP }}
            animate={{
              background: opened
                ? 'linear-gradient(180deg,#2c070c,#40090f)'
                : 'linear-gradient(180deg,#8a1829 0%,#6b1121 100%)',
            }}
            transition={{ duration: 0.4, delay: opened ? 0.25 : 0 }}
          />
        </motion.div>

        {/* seal */}
        <motion.button
          type="button"
          onClick={handleOpen}
          aria-label="Open the letter"
          disabled={opened}
          className="absolute grid place-items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
          style={{ left: '50%', top: '56%', width: 92, height: 92, x: '-50%', y: '-50%', zIndex: 5 }}
          animate={opened ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          whileTap={{ scale: 0.92 }}
        >
          <span className="absolute inset-0 rounded-full border border-white/25 animate-pulseSeal" />
          <WaxSeal size={68} />
        </motion.button>
      </motion.div>

      <motion.p
        className="mt-12 h-7 font-hand text-xl tracking-wide text-gold-400/90"
        animate={{ opacity: opened ? 0 : 1 }}
        aria-live="polite"
      >
        {hint}
        <span className="ml-[1px] inline-block w-[2px] animate-twinkle bg-gold-400/80 align-middle" style={{ height: '1em' }} />
      </motion.p>
    </motion.div>
  )
}
