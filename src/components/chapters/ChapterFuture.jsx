import { useState, useEffect } from 'react'
import { CONTENT } from '../../data/content'

export default function ChapterFuture({ onContinue }) {
  const { title, intro, items, closing } = CONTENT.future
  const [visible, setVisible] = useState(0)
  const [checked, setChecked] = useState(new Set())

  useEffect(() => {
    let i = 0
    const tick = () => {
      i++
      setVisible(i)
      if (i < items.length) setTimeout(tick, 600)
    }
    const t = setTimeout(tick, 900)
    return () => clearTimeout(t)
  }, [])

  const toggle = (i) =>
    setChecked(prev => {
      const n = new Set(prev)
      n.has(i) ? n.delete(i) : n.add(i)
      return n
    })

  const allVisible = visible >= items.length

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        {/* Label */}
        <p className="text-center text-xs tracking-[0.35em] uppercase mb-2 anim-fade-in"
          style={{ color: 'var(--gold)', opacity: 0.6 }}>
          {CONTENT.future.label}
        </p>

        {/* Title */}
        <h2 className="font-display text-3xl sm:text-4xl text-cream text-center mb-3 anim-fade-in-up delay-100">
          {title}
        </h2>

        {/* Intro */}
        <p className="text-center font-display italic text-sm mb-10 anim-fade-in delay-200"
          style={{ color: 'var(--cream-dim)' }}>
          {intro}
        </p>

        {/* Items */}
        <div className="space-y-3 mb-10">
          {items.map((item, i) => {
            const isChecked = checked.has(i)
            return (
              <button
                key={i}
                onClick={() => toggle(i)}
                className="w-full text-left glass-gold rounded-2xl px-5 py-4 flex items-start gap-4 transition-all"
                style={{
                  opacity: i < visible ? 1 : 0,
                  transform: i < visible ? 'translateX(0)' : 'translateX(30px)',
                  transition: 'opacity 0.55s ease, transform 0.55s ease, border-color 0.3s',
                  borderColor: isChecked ? 'rgba(74,222,128,0.35)' : undefined,
                  background: isChecked ? 'rgba(74,222,128,0.05)' : undefined,
                }}
              >
                {/* Checkbox */}
                <div
                  className="shrink-0 w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center transition-all"
                  style={{
                    borderColor: isChecked ? 'rgba(74,222,128,0.7)' : 'rgba(232,184,75,0.35)',
                    background: isChecked ? 'rgba(74,222,128,0.15)' : 'transparent',
                  }}
                >
                  {isChecked && (
                    <svg width="10" height="10" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="rgba(74,222,128,0.9)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    </svg>
                  )}
                </div>
                <p
                  className="font-display italic text-sm sm:text-base leading-snug"
                  style={{
                    color: isChecked ? 'rgba(240,230,211,0.5)' : 'var(--cream)',
                    textDecoration: isChecked ? 'line-through' : undefined,
                  }}
                >
                  {item}
                </p>
              </button>
            )
          })}
        </div>

        {/* Closing */}
        {allVisible && (
          <div className="text-center mb-10 anim-fade-in-up">
            <p className="font-display text-xl italic" style={{ color: 'var(--gold)' }}>
              {closing}
            </p>
          </div>
        )}

        {/* Continue */}
        {allVisible && (
          <div className="flex justify-center anim-fade-in delay-300">
            <button onClick={onContinue} className="btn-gold px-9 py-3 rounded-full font-display italic text-sm tracking-wide">
              One more thing →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
