import { motion } from 'framer-motion'
import WaxSeal from './WaxSeal.jsx'
import AnimatedSection from './AnimatedSection.jsx'
import useRelationshipTime from '../hooks/useRelationshipTime.js'
import { RELATIONSHIP_START, counterContent } from '../data/content.js'

function TimeBox({ value, label }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center rounded-[14px] border border-gold-400/30 bg-white/[0.025] px-1 pb-3 pt-3.5 shadow-[inset_0_0_14px_rgba(0,0,0,.25)]">
      <motion.span
        key={value}
        className="gold-text font-hand text-[clamp(1.5rem,7vw,2rem)] font-semibold leading-none tabular-nums"
        initial={{ y: -6, opacity: 0.2 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {value}
      </motion.span>
      <span className="mt-2 font-hand text-[0.72rem] tracking-[0.18em] text-gold-500/80">{label}</span>
    </div>
  )
}

/** Live "together for" counter. */
export default function RelationshipCounter() {
  const { days, hours, mins, secs } = useRelationshipTime(RELATIONSHIP_START)
  const { labels } = counterContent

  return (
    <AnimatedSection className="flex flex-col items-center px-6 pt-8">
      <WaxSeal size={52} />
      <h2 className="gold-text mt-4 font-script text-[clamp(2rem,8.5vw,2.7rem)] leading-none">{counterContent.heading}</h2>

      <div className="mt-6 flex w-full max-w-[380px] gap-2.5" role="timer" aria-label={`${days} days, ${hours} hours, ${mins} minutes, ${secs} seconds`}>
        <TimeBox value={days} label={labels.days} />
        <TimeBox value={hours} label={labels.hours} />
        <TimeBox value={mins} label={labels.mins} />
        <TimeBox value={secs} label={labels.secs} />
      </div>

      <p className="mt-6 font-script text-lg text-gold-400/90">{counterContent.since}</p>
      <p className="mt-1 text-center font-script text-[1.35rem] leading-snug text-gold-300/90">{counterContent.tagline}</p>
    </AnimatedSection>
  )
}
