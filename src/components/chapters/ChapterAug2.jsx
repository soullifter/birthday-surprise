import { useState, useEffect } from 'react'
import { CONTENT } from '../../data/content'

function useTypewriter(lines, enabled, speed = 30) {
  const [done, setDone] = useState([])
  const [current, setCurrent] = useState('')
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (!enabled) return
    let lineIdx = 0, charIdx = 0, cancelled = false
    const tick = () => {
      if (cancelled) return
      if (lineIdx >= lines.length) { setFinished(true); return }
      const line = lines[lineIdx]
      charIdx++
      setCurrent(line.slice(0, charIdx))
      if (charIdx >= line.length) {
        setDone(prev => [...prev, line])
        setCurrent(''); lineIdx++; charIdx = 0
        setTimeout(tick, 480)
      } else {
        setTimeout(tick, speed)
      }
    }
    setTimeout(tick, 300)
    return () => { cancelled = true }
  }, [enabled])

  return { done, current, finished }
}

export default function ChapterAug2({ onContinue }) {
  const [phase, setPhase] = useState(0)
  // 0: black, 1: date appears, 2: pre-story types, 3: quote appears, 4: post-story, 5: photo+button

  const { done: preDone, current: preCurrent, finished: preFinished } =
    useTypewriter(CONTENT.aug2.story, phase === 2)

  const { done: postDone, current: postCurrent, finished: postFinished } =
    useTypewriter(CONTENT.aug2.storyAfter, phase === 4)

  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 2200)
      return () => clearTimeout(t)
    }
  }, [phase])

  useEffect(() => {
    if (preFinished && phase === 2) {
      const t = setTimeout(() => setPhase(3), 600)
      return () => clearTimeout(t)
    }
  }, [preFinished, phase])

  useEffect(() => {
    if (phase === 3) {
      const t = setTimeout(() => setPhase(4), 2000)
      return () => clearTimeout(t)
    }
  }, [phase])

  useEffect(() => {
    if (postFinished && phase === 4) {
      const t = setTimeout(() => setPhase(5), 600)
      return () => clearTimeout(t)
    }
  }, [postFinished, phase])

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-5 py-16 transition-all duration-1000"
      style={{
        background: phase <= 1
          ? 'radial-gradient(ellipse at center, rgba(10,5,20,0.98), #030308)'
          : undefined,
      }}
    >
      <div className="w-full max-w-sm">
        {/* Label */}
        {phase >= 2 && (
          <p className="text-center text-xs tracking-[0.35em] uppercase mb-3 anim-fade-in"
            style={{ color: 'var(--gold)', opacity: 0.6 }}>
            {CONTENT.aug2.label}
          </p>
        )}

        {/* THE DATE — dramatic entrance */}
        {phase >= 1 && (
          <div className="text-center mb-10">
            <h1
              className="font-display text-5xl sm:text-6xl font-bold shimmer-text"
              style={{
                animation: phase === 1 ? 'revealScale 1s cubic-bezier(0.34,1.56,0.64,1) both' : undefined,
                textShadow: '0 0 40px rgba(232,184,75,0.3)',
              }}
            >
              {CONTENT.aug2.date}
            </h1>
          </div>
        )}

        {/* Pre-story */}
        {phase >= 2 && (
          <div className="glass-gold rounded-2xl p-6 mb-6 min-h-[120px]">
            <div className="font-display text-base sm:text-lg text-cream/90 leading-relaxed space-y-3">
              {preDone.map((line, i) => <p key={i} className="anim-fade-in">{line}</p>)}
              {!preFinished && preCurrent && (
                <p>{preCurrent}<span className="cursor-blink ml-0.5" style={{ color: 'var(--gold)' }}>|</span></p>
              )}
            </div>
          </div>
        )}

        {/* THE QUOTE — the emotional center */}
        {phase >= 3 && (
          <div
            className="text-center px-4 py-8 mb-6 rounded-2xl anim-reveal-scale"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(232,184,75,0.08), transparent)',
              border: '1px solid rgba(232,184,75,0.2)',
            }}
          >
            <p
              className="font-display text-2xl sm:text-3xl italic leading-snug"
              style={{
                color: 'var(--gold)',
                textShadow: '0 0 30px rgba(232,184,75,0.4)',
              }}
            >
              {CONTENT.aug2.quote}
            </p>
          </div>
        )}

        {/* Post-story */}
        {phase >= 4 && (
          <div className="glass-gold rounded-2xl p-6 mb-6 min-h-[80px]">
            <div className="font-display text-base sm:text-lg text-cream/90 leading-relaxed space-y-3">
              {postDone.map((line, i) => <p key={i} className="anim-fade-in">{line}</p>)}
              {!postFinished && postCurrent && (
                <p>{postCurrent}<span className="cursor-blink ml-0.5" style={{ color: 'var(--gold)' }}>|</span></p>
              )}
            </div>
          </div>
        )}

        {/* Photo */}
        {phase >= 5 && CONTENT.aug2.photo && (
          <div className="rounded-2xl overflow-hidden mb-6 anim-fade-in-up"
            style={{ border: '1px solid rgba(232,184,75,0.15)' }}>
            <img src={CONTENT.aug2.photo} alt="" className="w-full object-cover" style={{ maxHeight: '280px' }} />
          </div>
        )}

        {/* Photo placeholder */}
        {phase >= 5 && !CONTENT.aug2.photo && (
          <div className="w-full h-36 rounded-2xl flex items-center justify-center mb-6 anim-fade-in"
            style={{ border: '1px dashed rgba(232,184,75,0.18)' }}>
            <p className="text-xs font-display italic" style={{ color: 'rgba(232,184,75,0.25)' }}>
              your photo from August 2nd
            </p>
          </div>
        )}

        {/* Continue */}
        {phase >= 5 && (
          <div className="flex justify-center anim-fade-in delay-300">
            <button onClick={onContinue} className="btn-gold px-9 py-3 rounded-full font-display italic text-sm tracking-wide">
              Continue →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
