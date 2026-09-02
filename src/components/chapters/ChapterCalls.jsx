import { useState, useEffect } from 'react'
import { CONTENT } from '../../data/content'

export default function ChapterCalls({ onContinue }) {
  const [visible, setVisible] = useState(0)
  const cards = CONTENT.calls.cards
  const photos = CONTENT.calls.photos

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisible(i)
      if (i >= cards.length) clearInterval(interval)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const allVisible = visible >= cards.length

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        {/* Label */}
        <p className="text-center text-xs tracking-[0.35em] uppercase mb-2 anim-fade-in"
          style={{ color: 'var(--gold)', opacity: 0.6 }}>
          {CONTENT.calls.label}
        </p>

        {/* Title */}
        <h2 className="font-display text-3xl sm:text-4xl text-cream text-center mb-3 anim-fade-in-up delay-100">
          {CONTENT.calls.title}
        </h2>

        {/* Distance stat */}
        <p className="text-center text-sm mb-10 anim-fade-in delay-200" style={{ color: 'var(--cream-dim)' }}>
          <span className="font-display italic">{CONTENT.calls.distance} apart.</span>
          {CONTENT.calls.totalCallHours !== '___' && (
            <> <span style={{ color: 'var(--gold)' }}>{CONTENT.calls.totalCallHours} hours</span> of calls.</>
          )}
        </p>

        {/* Cards */}
        <div className="space-y-3 mb-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className="glass-gold rounded-2xl px-5 py-4 flex items-center gap-4"
              style={{
                opacity: i < visible ? 1 : 0,
                transform: i < visible ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              <span style={{ fontSize: '22px', minWidth: '28px', textAlign: 'center' }}>
                {card.icon}
              </span>
              <p className="font-display italic text-sm text-cream/90 leading-snug">{card.text}</p>
            </div>
          ))}
        </div>

        {/* Photos */}
        {allVisible && photos.length > 0 && (
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2 anim-fade-in-up">
            {photos.map((src, i) => (
              <div key={i} className="shrink-0 w-44 rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(232,184,75,0.15)', animationDelay: `${i*180}ms` }}>
                <img src={src} alt="" className="w-full h-56 object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Phone glow visual when no photos */}
        {allVisible && photos.length === 0 && (
          <div
            className="w-full h-36 rounded-2xl flex flex-col items-center justify-center mb-8 anim-fade-in"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(100,130,200,0.12), transparent 70%)',
              border: '1px dashed rgba(232,184,75,0.18)',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(232,184,75,0.3)" strokeWidth="1.5">
              <rect x="5" y="2" width="14" height="20" rx="2"/>
              <line x1="12" y1="18" x2="12" y2="18.01"/>
            </svg>
            <p className="text-xs font-display italic mt-2" style={{ color: 'rgba(232,184,75,0.25)' }}>
              your call screenshots go here
            </p>
          </div>
        )}

        {/* Continue */}
        {allVisible && (
          <div className="flex justify-center anim-fade-in delay-200">
            <button onClick={onContinue} className="btn-gold px-9 py-3 rounded-full font-display italic text-sm tracking-wide">
              Continue →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
