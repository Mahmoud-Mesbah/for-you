import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import WaxSeal from './WaxSeal.jsx'
import AnimatedSection from './AnimatedSection.jsx'
import { finalContent } from '../data/content.js'

/** Closing screen with a button that restarts the whole experience. */
export default function FinalSection({ onRestart }) {
  return (
    <AnimatedSection className="flex flex-col items-center px-6 pb-36 pt-16">
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <WaxSeal size={64} />
      </motion.div>

      <h2 className="gold-text mt-5 text-center font-script text-[clamp(2.2rem,9.5vw,3.1rem)] leading-tight">
        {finalContent.title}
      </h2>

      <motion.button
        type="button"
        onClick={onRestart}
        className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-gold-400/55 px-8 py-3 font-hand text-xl text-gold-300 transition-colors hover:bg-gold-300/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
      >
        <RotateCcw size={16} strokeWidth={1.6} />
        {finalContent.button}
      </motion.button>
    </AnimatedSection>
  )
}
