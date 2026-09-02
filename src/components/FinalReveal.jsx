import { useEffect, useRef, useState } from 'react'
import { CONTENT } from '../data/content'

function Confetti() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const COLORS = ['#e8b84b','#f5d98b','#ff6b8a','#a78bfa','#4ade80','#60a5fa','#fb923c','#f0e6d3']
    const pieces = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: -30 - Math.random() * 120,
      w: 5 + Math.random() * 9,
      h: 4 + Math.random() * 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - 0.5) * 2.5,
      vy: 1.8 + Math.random() * 2.8,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.08,
    }))

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pieces.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.rot += p.rotV
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = p.y < canvas.height * 0.9 ? 0.88 : Math.max(0, 1 - (p.y - canvas.height * 0.9) / (canvas.height * 0.1))
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
        if (p.y > canvas.height + 40) {
          p.y = -20
          p.x = Math.random() * canvas.width
        }
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-20" />
}

function CompletedConstellation() {
  const W = 320, H = 160
  const stars = [
    { x: 40,  y: 80,  label: CONTENT.her.city },
    { x: 280, y: 80,  label: CONTENT.you.city },
    { x: 160, y: 30  },
    { x: 100, y: 130 },
    { x: 220, y: 130 },
  ]
  const lines = [[0,2],[2,1],[0,3],[3,4],[4,1],[2,3],[2,4]]

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} overflow="visible">
      {lines.map(([a, b], i) => (
        <line
          key={i}
          x1={stars[a].x} y1={stars[a].y}
          x2={stars[b].x} y2={stars[b].y}
          stroke="rgba(232,184,75,0.25)"
          strokeWidth="0.8"
          strokeDasharray="400"
          strokeDashoffset="400"
          style={{ animation: `drawLine 1s ease ${i * 0.15}s both` }}
        />
      ))}
      {stars.map((s, i) => (
        <g key={i}>
          <circle
            cx={s.x} cy={s.y} r={i < 2 ? 5 : 3}
            fill="var(--gold)"
            className="star-glow-css"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
          {s.label && (
            <text
              x={s.x} y={s.y - 12}
              textAnchor="middle"
              fill="rgba(232,184,75,0.6)"
              fontSize="8"
              fontFamily="var(--font-display)"
              fontStyle="italic"
            >
              {s.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  )
}

export default function FinalReveal() {
  const [phase, setPhase] = useState(0)
  // 0: fade in, 1: name + constellation, 2: message, 3: certificate

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 2200)
    const t3 = setTimeout(() => setPhase(3), 4000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-5 py-16 relative">
      <Confetti />

      <div className="relative z-30 w-full max-w-sm flex flex-col items-center text-center">

        {/* Her name — the big reveal */}
        {phase >= 1 && (
          <div className="mb-6 anim-reveal-scale">
            <p className="font-display text-5xl sm:text-6xl font-bold shimmer-text mb-1">
              {CONTENT.her.name}
            </p>
          </div>
        )}

        {/* Constellation */}
        {phase >= 1 && (
          <div className="mb-8 anim-fade-in delay-300">
            <CompletedConstellation />
          </div>
        )}

        {/* The message */}
        {phase >= 2 && (
          <div className="mb-10 space-y-2 anim-fade-in-up">
            <p className="font-display text-2xl italic text-cream">Happy Birthday.</p>
            <p className="font-display italic text-base" style={{ color: 'var(--cream-dim)' }}>
              June to August 2nd to forever.
            </p>
          </div>
        )}

        {/* Certificate */}
        {phase >= 3 && (
          <div
            className="w-full rounded-3xl p-8 anim-reveal-scale"
            style={{
              background: 'linear-gradient(160deg, rgba(232,184,75,0.08), rgba(167,139,250,0.05))',
              border: '1px solid rgba(232,184,75,0.25)',
              boxShadow: '0 0 60px rgba(232,184,75,0.1)',
            }}
          >
            {/* Decorative top */}
            <div className="flex justify-center gap-3 mb-6 opacity-40">
              {[...Array(7)].map((_, i) => (
                <svg key={i} width="6" height="6" viewBox="0 0 6 6">
                  <circle cx="3" cy="3" r="3" fill="var(--gold)" />
                </svg>
              ))}
            </div>

            <p className="font-display italic text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--gold)', opacity: 0.6 }}>
              Made with every piece of me
            </p>
            <p className="font-display text-3xl text-cream mb-2">{CONTENT.her.name}</p>
            <p className="font-display italic text-sm mb-6" style={{ color: 'var(--cream-dim)' }}>
              {today}
            </p>

            <div className="h-px mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(232,184,75,0.3), transparent)' }} />

            <p className="font-display italic text-sm text-cream/60 mb-1">With love,</p>
            <p className="font-display text-xl" style={{ color: 'var(--gold)' }}>{CONTENT.you.name}</p>

            {/* Decorative bottom */}
            <div className="flex justify-center gap-3 mt-6 opacity-40">
              {[...Array(7)].map((_, i) => (
                <svg key={i} width="6" height="6" viewBox="0 0 6 6">
                  <circle cx="3" cy="3" r="3" fill="var(--gold)" />
                </svg>
              ))}
            </div>
          </div>
        )}

        {/* Screenshot hint */}
        {phase >= 3 && (
          <p className="text-xs mt-8 anim-fade-in delay-500" style={{ color: 'var(--cream-dim)', opacity: 0.4, fontStyle: 'italic' }}>
            screenshot this moment
          </p>
        )}
      </div>
    </div>
  )
}
