import { useState, useEffect, useCallback } from 'react'
import { CONTENT } from '../../data/content'

function useTypewriter(lines, enabled, speed = 28) {
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
        const completed = line
        setDone(prev => [...prev, completed])
        setCurrent('')
        lineIdx++; charIdx = 0
        setTimeout(tick, 420)
      } else {
        setTimeout(tick, speed)
      }
    }
    setTimeout(tick, 300)
    return () => { cancelled = true }
  }, [enabled])

  return { done, current, finished }
}

export default function ChapterJune({ onContinue }) {
  const [phase, setPhase] = useState(0)
  const { done, current, finished } = useTypewriter(CONTENT.june.story, phase >= 1)

  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (finished) setTimeout(() => setPhase(2), 600)
  }, [finished])

  const photos = CONTENT.june.photos

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        {/* Label */}
        <p className="text-center text-xs tracking-[0.35em] uppercase mb-2 anim-fade-in"
          style={{ color: 'var(--gold)', opacity: 0.6 }}>
          {CONTENT.june.label}
        </p>

        {/* Title */}
        <h2 className="font-display text-3xl sm:text-4xl text-cream text-center mb-10 anim-fade-in-up delay-100">
          {CONTENT.june.title}
        </h2>

        {/* Story card */}
        <div className="glass-gold rounded-2xl p-7 mb-8 min-h-[200px]">
          <div className="font-display text-lg text-cream/90 leading-relaxed space-y-4">
            {done.map((line, i) => (
              <p key={i} className="anim-fade-in">{line}</p>
            ))}
            {!finished && current && (
              <p>
                {current}
                <span className="cursor-blink ml-0.5" style={{ color: 'var(--gold)' }}>|</span>
              </p>
            )}
          </div>
        </div>

        {/* Photos */}
        {phase >= 2 && photos.length > 0 && (
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2 anim-fade-in-up">
            {photos.map((src, i) => (
              <div
                key={i}
                className="shrink-0 w-44 rounded-2xl overflow-hidden anim-fade-in-up"
                style={{
                  border: '1px solid rgba(232,184,75,0.15)',
                  animationDelay: `${i * 180}ms`,
                }}
              >
                <img src={src} alt="" className="w-full h-64 object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Photo placeholder */}
        {phase >= 2 && photos.length === 0 && (
          <div
            className="w-full h-40 rounded-2xl flex items-center justify-center mb-8 anim-fade-in"
            style={{ border: '1px dashed rgba(232,184,75,0.2)' }}
          >
            <p className="text-xs font-display italic" style={{ color: 'rgba(232,184,75,0.3)' }}>
              your photos will appear here
            </p>
          </div>
        )}

        {/* Continue */}
        {phase >= 2 && (
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
