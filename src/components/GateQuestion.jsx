import { useState, useRef, useEffect } from 'react'
import { CONTENT } from '../data/content'
import { checkAnswer } from '../utils/answers'

export default function GateQuestion({ gateIndex, onUnlock }) {
  const gate = CONTENT.gates[gateIndex]
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('idle') // idle | wrong | correct
  const [tries, setTries] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 700)
    return () => clearTimeout(t)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim()) return

    if (checkAnswer(value, gate)) {
      setStatus('correct')
      setTimeout(onUnlock, 800)
    } else {
      setStatus('wrong')
      setTries(t => t + 1)
      setTimeout(() => setStatus('idle'), 600)
    }
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-5 py-16">
      <div
        className="w-full max-w-sm anim-fade-in-up"
        style={status === 'wrong' ? { animation: 'shake 0.45s ease' } : {}}
        key={tries}
      >
        {/* Gate number badge */}
        <div className="flex justify-center mb-8">
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold"
            style={{ animation: 'fadeInDown 0.7s ease both' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill="var(--gold)"
                opacity="0.7"
              />
            </svg>
            <span className="text-xs font-display italic" style={{ color: 'var(--gold)', opacity: 0.7 }}>
              Gate {gate.number} of {CONTENT.gates.length}
            </span>
          </div>
        </div>

        {/* Stars decorative */}
        <div className="flex justify-center gap-2 mb-6" style={{ animation: 'fadeIn 1s ease 0.2s both', opacity: 0 }}>
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="8" height="8" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="6" fill="var(--gold)" opacity={0.15 + i * 0.1} />
            </svg>
          ))}
        </div>

        {/* Question */}
        <h2
          className="font-display text-2xl sm:text-3xl text-center text-cream leading-snug mb-3"
          style={{ animation: 'fadeInUp 0.7s ease 0.1s both', opacity: 0 }}
        >
          {gate.question}
        </h2>

        {/* Hint */}
        <p
          className="text-center text-xs mb-10"
          style={{
            color: 'var(--cream-dim)',
            animation: 'fadeIn 0.8s ease 0.4s both',
            opacity: 0,
            fontStyle: 'italic',
          }}
        >
          {gate.hint}
        </p>

        {/* Input form */}
        <form onSubmit={handleSubmit} style={{ animation: 'fadeInUp 0.7s ease 0.3s both', opacity: 0 }}>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Your answer..."
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="w-full px-5 py-4 rounded-2xl text-center text-cream placeholder:text-cream/20 outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: status === 'wrong'
                ? '1px solid rgba(255,107,138,0.6)'
                : status === 'correct'
                ? '1px solid rgba(74,222,128,0.6)'
                : '1px solid rgba(232,184,75,0.2)',
              fontSize: '1rem',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              boxShadow: status === 'correct' ? '0 0 20px rgba(74,222,128,0.2)' : undefined,
            }}
            disabled={status === 'correct'}
          />

          <button
            type="submit"
            disabled={!value.trim() || status === 'correct'}
            className="btn-gold w-full mt-4 py-4 rounded-2xl font-display italic text-base tracking-wide disabled:opacity-30"
            style={{ fontSize: '1rem' }}
          >
            {status === 'correct' ? '✓ Unlocked' : 'Continue →'}
          </button>
        </form>

        {/* Wrong answer feedback */}
        {status === 'wrong' && (
          <p className="text-center text-xs mt-5 anim-fade-in" style={{ color: 'var(--rose)' }}>
            {tries === 1 ? 'Not quite — try again.' : tries === 2 ? 'Almost... think harder.' : 'You know this. Keep trying.'}
          </p>
        )}
      </div>
    </div>
  )
}
