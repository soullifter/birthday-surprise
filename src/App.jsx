import { useState, useRef } from 'react'
import Starfield from './components/Starfield'
import Envelope from './components/Envelope'
import Constellation from './components/Constellation'
import GateQuestion from './components/GateQuestion'
import ChapterJune from './components/chapters/ChapterJune'
import ChapterCalls from './components/chapters/ChapterCalls'
import ChapterAug2 from './components/chapters/ChapterAug2'
import ChapterBubbles from './components/chapters/ChapterBubbles'
import ChapterLetter from './components/chapters/ChapterLetter'
import ChapterFuture from './components/chapters/ChapterFuture'
import FinalVideo from './components/FinalVideo'
import FinalReveal from './components/FinalReveal'
import AudioPlayer from './components/AudioPlayer'

const FLOW = [
  'envelope',
  'constellation',
  'gate-0',
  'chapter-june',
  'gate-1',
  'chapter-calls',
  'gate-2',
  'chapter-aug2',
  'gate-3',
  'chapter-bubbles',
  'gate-4',
  'chapter-letter',
  'chapter-future',
  'final-video',
  'final-reveal',
]

const CHAPTER_STEPS = FLOW.filter(s => s.startsWith('chapter') || s.startsWith('gate')).length
const STEP_START = 2 // constellation is step 1, first gate is step 2

function ProgressDots({ step }) {
  if (step < STEP_START || step >= FLOW.length - 1) return null
  const total = FLOW.length - STEP_START - 1
  const current = step - STEP_START
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 pointer-events-none">
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i === current ? 8 : 5,
              height: i === current ? 8 : 5,
              borderRadius: '50%',
              background: i <= current ? 'var(--gold)' : 'rgba(255,255,255,0.15)',
              boxShadow: i <= current ? '0 0 8px rgba(232,184,75,0.6)' : 'none',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [step, setStep] = useState(0)
  const [fading, setFading] = useState(false)
  const audioRef = useRef(null)

  const advance = () => {
    setFading(true)
    setTimeout(() => {
      setStep(s => Math.min(s + 1, FLOW.length - 1))
      window.scrollTo({ top: 0, behavior: 'instant' })
      setFading(false)
    }, 480)
  }

  const handleEnvelopeOpen = () => {
    audioRef.current?.startPlaying()
    advance()
  }

  const current = FLOW[step]

  return (
    <div className="relative min-h-dvh overflow-x-hidden" style={{ background: 'var(--bg)' }}>
      <Starfield />
      <AudioPlayer ref={audioRef} />
      <ProgressDots step={step} />

      <div
        className="relative z-10"
        style={{
          opacity: fading ? 0 : 1,
          transition: 'opacity 480ms ease-in-out',
        }}
      >
        {current === 'envelope'        && <Envelope onOpen={handleEnvelopeOpen} />}
        {current === 'constellation'   && <Constellation onContinue={advance} />}
        {current.startsWith('gate-')   && (
          <GateQuestion
            gateIndex={parseInt(current.split('-')[1])}
            onUnlock={advance}
          />
        )}
        {current === 'chapter-june'    && <ChapterJune onContinue={advance} />}
        {current === 'chapter-calls'   && <ChapterCalls onContinue={advance} />}
        {current === 'chapter-aug2'    && <ChapterAug2 onContinue={advance} />}
        {current === 'chapter-bubbles' && <ChapterBubbles onContinue={advance} />}
        {current === 'chapter-letter'  && <ChapterLetter onContinue={advance} />}
        {current === 'chapter-future'  && <ChapterFuture onContinue={advance} />}
        {current === 'final-video'     && <FinalVideo onContinue={advance} />}
        {current === 'final-reveal'    && <FinalReveal />}
      </div>
    </div>
  )
}
