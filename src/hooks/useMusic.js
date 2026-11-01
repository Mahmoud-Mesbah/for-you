import { useCallback, useEffect, useRef, useState } from 'react'

// Gentle lullaby used when no audio file is configured (see data/content.js).
const MELODY = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46, 523.25, 659.25, 783.99, 1046.5, 880, 783.99, 659.25, 587.33]
const NOTE_SECONDS = 0.7

/**
 * Background music. Plays `src` if provided, otherwise a soft synthesized melody.
 * `play()` must be called from a user gesture (e.g. tapping the wax seal).
 */
export default function useMusic(src) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  const ctxRef = useRef(null)
  const timerRef = useRef(null)
  const stepRef = useRef(0)
  const nextTimeRef = useRef(0)

  const scheduleNotes = useCallback(() => {
    const ctx = ctxRef.current
    if (!ctx) return
    while (nextTimeRef.current < ctx.currentTime + 1.2) {
      const t = nextTimeRef.current
      const freq = MELODY[stepRef.current % MELODY.length]
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.value = freq / 2
      gain.gain.setValueAtTime(0.0001, t)
      gain.gain.exponentialRampToValueAtTime(0.07, t + 0.06)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + NOTE_SECONDS * 1.8)
      osc.connect(gain).connect(ctx.destination)
      osc.start(t)
      osc.stop(t + NOTE_SECONDS * 1.9)
      stepRef.current += 1
      nextTimeRef.current += NOTE_SECONDS
    }
  }, [])

  const play = useCallback(async () => {
    try {
      if (src) {
        if (!audioRef.current) {
          audioRef.current = new Audio(src)
          audioRef.current.loop = true
        }
        await audioRef.current.play()
      } else {
        const Ctx = window.AudioContext || window.webkitAudioContext
        if (!Ctx) return
        if (!ctxRef.current) ctxRef.current = new Ctx()
        await ctxRef.current.resume()
        nextTimeRef.current = ctxRef.current.currentTime + 0.05
        clearInterval(timerRef.current)
        scheduleNotes()
        timerRef.current = setInterval(scheduleNotes, 400)
      }
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }, [src, scheduleNotes])

  const pause = useCallback(() => {
    if (src) {
      audioRef.current?.pause()
    } else {
      clearInterval(timerRef.current)
      ctxRef.current?.suspend()
    }
    setPlaying(false)
  }, [src])

  const toggle = useCallback(() => (playing ? pause() : play()), [playing, play, pause])

  useEffect(
    () => () => {
      clearInterval(timerRef.current)
      audioRef.current?.pause()
      ctxRef.current?.close?.()
    },
    [],
  )

  return { playing, play, pause, toggle }
}
