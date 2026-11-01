import { useEffect, useState } from 'react'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

function diffFrom(startMs) {
  const elapsed = Math.max(0, Date.now() - startMs)
  return {
    days: Math.floor(elapsed / DAY),
    hours: Math.floor((elapsed % DAY) / HOUR),
    mins: Math.floor((elapsed % HOUR) / MINUTE),
    secs: Math.floor((elapsed % MINUTE) / SECOND),
  }
}

/** Live duration since `startDate`, updated every second. */
export default function useRelationshipTime(startDate) {
  const startMs = new Date(startDate).getTime()
  const [time, setTime] = useState(() => diffFrom(startMs))

  useEffect(() => {
    setTime(diffFrom(startMs))
    const id = setInterval(() => setTime(diffFrom(startMs)), SECOND)
    return () => clearInterval(id)
  }, [startMs])

  return time
}
