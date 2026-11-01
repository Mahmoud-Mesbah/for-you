import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Envelope from './components/Envelope.jsx'
import LoveLetter from './components/LoveLetter.jsx'
import PhotoGallery from './components/PhotoGallery.jsx'
import RelationshipCounter from './components/RelationshipCounter.jsx'
import SpecialDays from './components/SpecialDays.jsx'
import FinalSection from './components/FinalSection.jsx'
import FloatingHearts from './components/FloatingHearts.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import useMusic from './hooks/useMusic.js'
import { track } from './data/content.js'

const SCREENS = { ENVELOPE: 'envelope', LETTER: 'letter', STORY: 'story' }

export default function App() {
  const [screen, setScreen] = useState(SCREENS.ENVELOPE)
  const [musicStarted, setMusicStarted] = useState(false)
  const [runId, setRunId] = useState(0) // bumps on "Read it again" to replay every animation
  const scrollRef = useRef(null)
  const music = useMusic(track.src)

  const handleSealTap = useCallback(() => {
    music.play()
    setMusicStarted(true)
  }, [music])

  const restart = () => {
    window.scrollTo({ top: 0 })
    setScreen(SCREENS.ENVELOPE)
    setRunId((n) => n + 1)
  }

  return (
    <div ref={scrollRef} className="wine-bg relative min-h-[100svh] overflow-x-hidden">
      <FloatingHearts />

      <main className="relative z-10 mx-auto w-full max-w-[520px]">
        <AnimatePresence mode="wait">
          {screen === SCREENS.ENVELOPE && (
            <Envelope
              key={`envelope-${runId}`}
              onOpen={handleSealTap}
              onOpened={() => setScreen(SCREENS.LETTER)}
            />
          )}

          {screen === SCREENS.LETTER && (
            <LoveLetter
              key="letter"
              onNext={() => {
                window.scrollTo({ top: 0 })
                setScreen(SCREENS.STORY)
              }}
            />
          )}

          {screen === SCREENS.STORY && (
            <motion.div
              key="story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="pb-4"
            >
              <PhotoGallery />
              <RelationshipCounter />
              <SpecialDays />
              <FinalSection onRestart={restart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <MusicPlayer title={track.title} playing={music.playing} onToggle={music.toggle} visible={musicStarted} />
    </div>
  )
}
