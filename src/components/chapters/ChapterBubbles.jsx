import { useState, useMemo } from 'react'
import { CONTENT } from '../../data/content'

export default function ChapterBubbles({ onContinue }) {
  const bubbles = CONTENT.bubbles
  const total = bubbles.length
  const [popped, setPopped] = useState(new Set())
  const [popping, setPopping] = useState(new Set())
  const [sparkles, setSparkles] = useState([])

  const positions = useMemo(() => bubbles.map((_, i) => {
    // Distribute across the field using a grid-ish random to avoid heavy overlap
    const col = i % 4
    const row = Math.floor(i / 4)
    return {
      left: 4 + col * 23 + (Math.random() * 12 - 6),
      top:  4 + row * 18 + (Math.random() * 8 - 4),
      size: 72 + Math.random() * 44,
      duration: 3.2 + Math.random() * 2.6,
      delay: Math.random() * 2.5,
    }
  }), [])

  const poppedCount = popped.size
  const allPopped = poppedCount === total

  const handlePop = (i) => {
    if (popped.has(i) || popping.has(i)) return
    setPopping(prev => new Set([...prev, i]))
    // Add sparkle at bubble position
    const pos = positions[i]
    const id = Date.now() + i
    setSparkles(prev => [...prev, { id, left: pos.left, top: pos.top }])
    setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== id)), 600)
    setTimeout(() => {
      setPopped(prev => new Set([...prev, i]))
      setPopping(prev => { const n = new Set(prev); n.delete(i); return n })
    }, 320)
  }

  return (
    <div className="min-h-dvh flex flex-col px-5 py-16">
      <div className="max-w-sm mx-auto w-full">
        {/* Header */}
        <p className="text-center text-xs tracking-[0.35em] uppercase mb-2 anim-fade-in"
          style={{ color: 'var(--gold)', opacity: 0.6 }}>
          Chapter Four
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-cream text-center mb-2 anim-fade-in-up delay-100">
          What I See When I See You
        </h2>
        <p className="text-center text-sm mb-6 anim-fade-in delay-200" style={{ color: 'var(--cream-dim)', fontStyle: 'italic' }}>
          Pop every bubble to discover them all
        </p>

        {/* Counter */}
        <div className="flex justify-center mb-6 anim-fade-in delay-300">
          <div className="glass-gold rounded-full px-5 py-2 text-sm font-display italic"
            style={{ color: 'var(--gold)' }}>
            {poppedCount} / {total} discovered
          </div>
        </div>
      </div>

      {/* Bubble field */}
      <div
        className="relative flex-1 mx-auto w-full"
        style={{ maxWidth: '500px', minHeight: '480px', height: `${Math.ceil(total / 4) * 110}px` }}
      >
        {bubbles.map((text, i) => {
          if (popped.has(i)) return null
          const pos = positions[i]
          const isPopping = popping.has(i)
          return (
            <button
              key={i}
              onClick={() => handlePop(i)}
              className="bubble"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                width: pos.size,
                height: pos.size,
                '--duration': `${pos.duration}s`,
                '--delay': `${pos.delay}s`,
                animation: isPopping
                  ? 'pop 0.32s ease forwards'
                  : `float ${pos.duration}s ease-in-out ${pos.delay}s infinite alternate`,
              }}
            >
              {text}
            </button>
          )
        })}

        {/* Sparkles where bubbles popped */}
        {sparkles.map(s => (
          <div
            key={s.id}
            className="absolute pointer-events-none anim-sparkle"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: 40, height: 40,
              marginLeft: -20, marginTop: -20,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40">
              {[0,60,120,180,240,300].map((angle, idx) => {
                const rad = (angle * Math.PI) / 180
                const x2 = 20 + Math.cos(rad) * 14
                const y2 = 20 + Math.sin(rad) * 14
                return (
                  <line key={idx} x1="20" y1="20" x2={x2} y2={y2}
                    stroke="var(--gold)" strokeWidth="1.5" opacity="0.8" />
                )
              })}
              <circle cx="20" cy="20" r="3" fill="var(--gold)" opacity="0.9" />
            </svg>
          </div>
        ))}
      </div>

      {/* All popped state */}
      {allPopped && (
        <div className="text-center py-10 anim-reveal-scale max-w-sm mx-auto w-full">
          <p className="font-display text-4xl italic mb-3" style={{ color: 'var(--gold)' }}>
            All {total}.
          </p>
          <p className="font-display text-lg text-cream/80 italic mb-8">
            And that's not even all of them.
          </p>
          <button onClick={onContinue} className="btn-gold px-9 py-3 rounded-full font-display italic text-sm tracking-wide">
            Continue →
          </button>
        </div>
      )}

      {/* Early continue when 80% popped */}
      {!allPopped && poppedCount >= Math.floor(total * 0.8) && (
        <div className="text-center py-6 anim-fade-in max-w-sm mx-auto w-full">
          <button onClick={onContinue} className="btn-gold px-9 py-3 rounded-full font-display italic text-sm tracking-wide">
            I've seen enough → Continue
          </button>
        </div>
      )}
    </div>
  )
}
