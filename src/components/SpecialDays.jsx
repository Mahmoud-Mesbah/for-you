import { motion } from 'framer-motion'
import WaxSeal from './WaxSeal.jsx'
import AnimatedSection from './AnimatedSection.jsx'
import { specialDaysContent } from '../data/content.js'

function EventCard({ event, index, isLast }) {
  const isArabic = event.lang === 'ar'
  return (
    <motion.li
      className="relative flex gap-3"
      initial={{ opacity: 0, x: 26 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay: 0.05 * (index % 3), ease: [0.22, 1, 0.36, 1] }}
    >
      {/* seal on the vertical line */}
      <div className="relative flex w-8 shrink-0 justify-center">
        {!isLast && <span className="absolute left-1/2 top-4 h-[calc(100%+1rem)] w-px -translate-x-1/2 bg-gold-500/45" />}
        <WaxSeal size={30} className="relative z-10 mt-3" />
      </div>

      <div
        className="paper-card relative mb-4 min-w-0 flex-1 rounded-[7px] px-4 py-3.5"
        style={{ transform: `rotate(${index % 2 === 0 ? -0.5 : 0.4}deg)` }}
      >
        {/* pointer toward the seal */}
        <span
          className="absolute -left-[7px] top-4 h-3.5 w-3.5 rotate-45 bg-[#f6e9cb]"
          style={{ boxShadow: '-2px 2px 3px rgba(0,0,0,.12)' }}
          aria-hidden="true"
        />
        <p
          dir={isArabic ? 'rtl' : 'ltr'}
          lang={isArabic ? 'ar' : 'en'}
          className={
            isArabic
              ? 'font-arabic text-[1.05rem] font-medium leading-relaxed text-[#2f2118]'
              : 'font-hand text-[1.45rem] font-semibold leading-tight text-[#2a1b12]'
          }
        >
          {event.text}
        </p>
        {event.date && (
          <p dir="ltr" className="mt-1.5 text-left font-hand text-[0.95rem] italic tracking-wide text-[#8a6a3d]">
            — {event.date}
          </p>
        )}
      </div>
    </motion.li>
  )
}

/** Timeline of important dates. */
export default function SpecialDays() {
  const { heading, events } = specialDaysContent
  return (
    <AnimatedSection className="px-6 pt-16">
      <h2 className="gold-text text-center font-script text-[clamp(2.2rem,9vw,3rem)] leading-none">{heading}</h2>
      <ol className="mx-auto mt-8 max-w-[400px]">
        {events.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} isLast={i === events.length - 1} />
        ))}
      </ol>
    </AnimatedSection>
  )
}
