import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SafeImage from './SafeImage.jsx'
import AnimatedSection from './AnimatedSection.jsx'
import { memoryImages } from '../data/images.js'
import { memoriesContent } from '../data/content.js'

const SWIPE_DISTANCE = 70
const STACK_VISIBLE = 3
// Slight rotations/offsets for the cards waiting behind the front one.
const STACK_POSE = [
  { rotate: 0, x: 0, y: 0, scale: 1 },
  { rotate: -3.5, x: -10, y: 6, scale: 0.975 },
  { rotate: 2.8, x: 9, y: 11, scale: 0.95 },
]

/** Tap-or-swipe stack of photo cards ("n / total" counter underneath). */
export default function PhotoGallery() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const total = memoryImages.length

  const go = (dir) => {
    setDirection(dir)
    setIndex((i) => (i + dir + total) % total)
  }

  const visible = Array.from({ length: Math.min(STACK_VISIBLE, total) }, (_, offset) => ({
    offset,
    image: memoryImages[(index + offset) % total],
  }))

  return (
    <AnimatedSection className="flex flex-col items-center px-6 pt-14">
      <h2 className="gold-text font-script text-[clamp(2.2rem,9vw,3rem)] leading-none">{memoriesContent.heading}</h2>

      <div className="relative mt-8 aspect-[4/5] w-full max-w-[min(72vw,330px)] select-none">
        <AnimatePresence initial={false} custom={direction}>
          {visible
            .slice()
            .reverse()
            .map(({ offset, image }) => {
              const pose = STACK_POSE[offset]
              const isTop = offset === 0
              return (
                <motion.figure
                  key={image.id}
                  custom={direction}
                  className="absolute inset-0 m-0 overflow-hidden rounded-[18px] border border-white/10 bg-wine-900"
                  style={{
                    zIndex: STACK_VISIBLE - offset,
                    boxShadow: '0 14px 26px rgba(0,0,0,.5)',
                    touchAction: 'pan-y',
                    cursor: isTop ? 'grab' : 'default',
                  }}
                  initial={{ opacity: 0, scale: 0.9, y: 24 }}
                  animate={{ opacity: 1, ...pose, transition: { type: 'spring', stiffness: 220, damping: 24 } }}
                  exit={(dir) => ({
                    x: dir * 340,
                    rotate: dir * 14,
                    opacity: 0,
                    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
                  })}
                  drag={isTop ? 'x' : false}
                  dragSnapToOrigin
                  dragElastic={0.7}
                  onDragEnd={(_, info) => {
                    if (!isTop) return
                    if (info.offset.x < -SWIPE_DISTANCE) go(1)
                    else if (info.offset.x > SWIPE_DISTANCE) go(-1)
                  }}
                  onTap={() => isTop && go(1)}
                  whileHover={isTop ? { scale: 1.015 } : undefined}
                >
                  <SafeImage src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                  <span className="pointer-events-none absolute inset-0 rounded-[18px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.12)]" />
                </motion.figure>
              )
            })}
        </AnimatePresence>
      </div>

      <p className="mt-8 font-hand text-lg tracking-[0.2em] text-gold-500" aria-live="polite">
        {index + 1} / {total}
      </p>
      <p className="mt-1 font-hand text-base text-gold-500/70">{memoriesContent.hint}</p>
    </AnimatedSection>
  )
}
