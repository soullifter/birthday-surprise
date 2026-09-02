import { useState, useEffect } from 'react'
import { CONTENT } from '../../data/content'

export default function ChapterLetter({ onContinue }) {
  const { salutation, paragraphs, closing, signature, photo, photoAfterParagraph } = CONTENT.letter
  const [visibleCount, setVisibleCount] = useState(0)
  const [phase, setPhase] = useState(0) // 0: header, 1: typing, 2: done

  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (phase < 1) return
    if (visibleCount >= paragraphs.length) { setPhase(2); return }
    const delay = visibleCount === 0 ? 200 : 1200 + paragraphs[visibleCount - 1].length * 18
    const t = setTimeout(() => setVisibleCount(c => c + 1), delay)
    return () => clearTimeout(t)
  }, [phase, visibleCount])

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        {/* Label */}
        <p className="text-center text-xs tracking-[0.35em] uppercase mb-2 anim-fade-in"
          style={{ color: 'var(--gold)', opacity: 0.6 }}>
          {CONTENT.letter.label}
        </p>

        {/* Title */}
        <h2 className="font-display text-3xl sm:text-4xl text-cream text-center mb-10 anim-fade-in-up delay-100">
          A Letter
        </h2>

        {/* Letter paper */}
        <div
          className="rounded-2xl p-7 sm:p-9 mb-6"
          style={{
            background: 'linear-gradient(160deg, rgba(232,184,75,0.04), rgba(167,139,250,0.03))',
            border: '1px solid rgba(232,184,75,0.1)',
          }}
        >
          {/* Salutation */}
          <p
            className="font-display italic text-lg mb-6 anim-fade-in"
            style={{ color: 'var(--gold)', animationDelay: '200ms', opacity: 0 }}
          >
            {salutation}
          </p>

          {/* Paragraphs */}
          <div className="space-y-5">
            {paragraphs.slice(0, visibleCount).map((para, i) => (
              <div key={i}>
                <p
                  className="font-display italic text-base sm:text-lg text-cream/90 leading-relaxed anim-fade-in-up"
                  style={{ animationDelay: '0ms' }}
                >
                  {para}
                </p>
                {/* Mid-letter photo */}
                {photo && i === photoAfterParagraph && (
                  <div className="rounded-xl overflow-hidden my-5 anim-fade-in"
                    style={{ border: '1px solid rgba(232,184,75,0.12)' }}>
                    <img src={photo} alt="" className="w-full object-cover" style={{ maxHeight: '240px' }} />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {phase === 1 && visibleCount < paragraphs.length && (
              <p className="font-display italic text-base text-cream/40">
                <span className="cursor-blink" style={{ color: 'var(--gold)' }}>|</span>
              </p>
            )}
          </div>

          {/* Closing */}
          {phase === 2 && (
            <div className="mt-8 anim-fade-in-up">
              <p className="font-display italic text-base mb-1" style={{ color: 'var(--cream-dim)' }}>
                {closing}
              </p>
              <p className="font-display italic text-xl" style={{ color: 'var(--gold)' }}>
                {signature}
              </p>
            </div>
          )}
        </div>

        {/* Decorative gold line */}
        {phase === 2 && (
          <div
            className="h-px w-full mx-auto mb-8 anim-fade-in"
            style={{ background: 'linear-gradient(to right, transparent, rgba(232,184,75,0.4), transparent)' }}
          />
        )}

        {/* Continue */}
        {phase === 2 && (
          <div className="flex justify-center anim-fade-in delay-400">
            <button onClick={onContinue} className="btn-gold px-9 py-3 rounded-full font-display italic text-sm tracking-wide">
              Continue →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
