import { useMemo } from 'react'

/** Very subtle drifting hearts and twinkling gold sparkles. Purely decorative. */
export default function FloatingHearts({ hearts = 9, sparkles = 14 }) {
  const items = useMemo(() => {
    const rnd = (min, max) => min + Math.random() * (max - min)
    return {
      hearts: Array.from({ length: hearts }, (_, i) => ({
        id: i,
        left: rnd(4, 96),
        size: rnd(10, 20),
        duration: rnd(16, 28),
        delay: -rnd(0, 24),
      })),
      sparkles: Array.from({ length: sparkles }, (_, i) => ({
        id: i,
        left: rnd(3, 97),
        top: rnd(3, 97),
        size: rnd(3, 6),
        duration: rnd(2.5, 5),
        delay: -rnd(0, 5),
      })),
    }
  }, [hearts, sparkles])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {items.sparkles.map((s) => (
        <span
          key={`s${s.id}`}
          className="absolute animate-twinkle rounded-full bg-gold-300"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            boxShadow: '0 0 8px 2px rgba(230,194,119,.45)',
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      {items.hearts.map((h) => (
        <svg
          key={`h${h.id}`}
          viewBox="0 0 24 24"
          className="absolute -bottom-6 animate-floatUp"
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          <path
            d="M12 21C5 15.5 3 12 3 8.8 3 6.2 5 4.3 7.4 4.3c1.8 0 3.5 1 4.6 2.8 1.1-1.8 2.8-2.8 4.6-2.8C19 4.3 21 6.2 21 8.8 21 12 19 15.5 12 21z"
            fill="none"
            stroke="#d4a35a"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  )
}
