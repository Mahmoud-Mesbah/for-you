import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'

function Equalizer({ playing }) {
  return (
    <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
      {[0.5, 1, 0.7].map((h, i) => (
        <span
          key={i}
          className={`w-[3px] origin-bottom rounded-sm bg-gold-300 ${playing ? 'animate-eq' : ''}`}
          style={{ height: `${h * 100}%`, animationDelay: `${i * 0.18}s`, transform: playing ? undefined : 'scaleY(0.7)' }}
        />
      ))}
    </span>
  )
}

/**
 * Floating music control: a round equalizer button that expands into a
 * "now playing" pill. The pill opens briefly when music starts.
 */
export default function MusicPlayer({ title, playing, onToggle, visible }) {
  const [expanded, setExpanded] = useState(false)

  // Show the pill for a few seconds the first time music starts.
  useEffect(() => {
    if (!visible) return undefined
    setExpanded(true)
    const id = setTimeout(() => setExpanded(false), 6000)
    return () => clearTimeout(id)
  }, [visible])

  if (!visible) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-end px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto flex items-center gap-2">
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="pill"
              className="flex items-center gap-3 rounded-full border border-gold-400/45 bg-wine-950/85 py-1.5 pl-5 pr-1.5 backdrop-blur"
              initial={{ opacity: 0, width: 0, x: 20 }}
              animate={{ opacity: 1, width: 'auto', x: 0 }}
              exit={{ opacity: 0, width: 0, x: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="min-w-[96px] leading-tight">
                <p className="whitespace-nowrap font-hand text-lg text-gold-300">{title}</p>
                <p className="font-hand text-xs tracking-widest text-gold-500/60">1 / 1</p>
              </div>
              <button
                type="button"
                onClick={onToggle}
                aria-label={playing ? 'Pause music' : 'Play music'}
                className="grid h-10 w-10 place-items-center rounded-full border border-gold-400/60 text-gold-300 transition-colors hover:bg-gold-300/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
              >
                {playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? 'Hide music player' : 'Show music player'}
          aria-expanded={expanded}
          className="grid h-12 w-12 place-items-center rounded-full border border-gold-400/50 bg-wine-950/70 backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
          whileTap={{ scale: 0.92 }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Equalizer playing={playing} />
        </motion.button>
      </div>
    </div>
  )
}
