import { motion } from 'framer-motion'

/** Scroll-triggered fade + slide-up wrapper. */
export default function AnimatedSection({ children, className = '', delay = 0, as = 'section' }) {
  const Tag = motion[as] ?? motion.section
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}
