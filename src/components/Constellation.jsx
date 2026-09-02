import { useState, useEffect } from 'react'
import { CONTENT } from '../data/content'

export default function Constellation({ onContinue }) {
  const [phase, setPhase] = useState(0)
  // 0 = stars appear, 1 = line draws (after 0.5s), 2 = text (after 3s), 3 = button (after 5s)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600)
    const t2 = setTimeout(() => setPhase(2), 3200)
    const t3 = setTimeout(() => setPhase(3), 5200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const W = 300, H = 130
  const x1 = 44, y1 = 65
  const x2 = 256, y2 = 65

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6">
      {/* SVG constellation */}
      <div style={{ animation: 'constellationIn 0.9s ease 0.2s both', opacity: 0 }}>
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          overflow="visible"
        >
          {/* Connection line */}
          {phase >= 1 && (
            <line
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(232,184,75,0.35)"
              strokeWidth="1"
              strokeDasharray="600"
              strokeDashoffset="600"
              style={{ animation: 'drawLine 1.8s ease-in-out 0.1s both' }}
            />
          )}

          {/* Her star */}
          <circle
            cx={x1} cy={y1} r="5"
            fill="var(--gold)"
            className="star-glow-css"
          />
          <text
            x={x1} y={y1 - 15}
            textAnchor="middle"
            fill="rgba(232,184,75,0.65)"
            fontSize="9"
            fontFamily="var(--font-display)"
            fontStyle="italic"
          >
            {CONTENT.her.city}
          </text>

          {/* Your star */}
          <circle
            cx={x2} cy={y2} r="5"
            fill="var(--gold)"
            className="star-glow-css"
            style={{ animationDelay: '0.4s' }}
          />
          <text
            x={x2} y={y2 - 15}
            textAnchor="middle"
            fill="rgba(232,184,75,0.65)"
            fontSize="9"
            fontFamily="var(--font-display)"
            fontStyle="italic"
          >
            {CONTENT.you.city}
          </text>
        </svg>
      </div>

      {/* Text reveal */}
      {phase >= 2 && (
        <div className="text-center mt-10 space-y-2">
          <p
            className="font-display text-3xl sm:text-4xl text-cream anim-fade-in-up"
            style={{ animationDelay: '0ms' }}
          >
            Same sky.
          </p>
          <p
            className="font-display text-3xl sm:text-4xl text-cream anim-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            Different cities.
          </p>
          <p
            className="font-display text-3xl sm:text-4xl italic anim-fade-in-up"
            style={{ color: 'var(--gold)', animationDelay: '700ms' }}
          >
            Same heart.
          </p>
        </div>
      )}

      {/* CTA */}
      {phase >= 3 && (
        <button
          onClick={onContinue}
          className="btn-gold mt-14 px-9 py-3 rounded-full font-display italic text-sm tracking-wide anim-fade-in"
        >
          Begin our story →
        </button>
      )}
    </div>
  )
}
