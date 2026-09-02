import { useState } from 'react'
import { CONTENT } from '../data/content'

export default function Envelope({ onOpen }) {
  const [state, setState] = useState('idle') // idle | cracking | opening | done

  const handleClick = () => {
    if (state !== 'idle') return
    setState('cracking')
    setTimeout(() => setState('opening'), 420)
    setTimeout(() => {
      setState('done')
      onOpen()
    }, 1800)
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 select-none">
      {/* Label above */}
      <p
        className="font-display text-xs tracking-[0.35em] uppercase mb-10 opacity-0"
        style={{
          color: 'var(--gold)',
          opacity: state === 'idle' ? undefined : 0,
          animation: 'fadeInDown 0.9s ease 0.3s both',
        }}
      >
        For {CONTENT.her.name}
      </p>

      {/* Envelope */}
      <div
        className={`envelope-wrap ${state === 'idle' ? 'anim-float' : ''}`}
        onClick={handleClick}
        style={{
          opacity: state === 'done' ? 0 : 1,
          transition: state === 'done' ? 'opacity 0.4s ease' : undefined,
          transform: state === 'done' ? 'scale(0.85)' : undefined,
        }}
      >
        <div className="envelope" style={{ animation: 'constellationIn 0.8s ease 0.1s both' }}>
          {/* Back body */}
          <div className="env-back" />
          {/* Side folds */}
          <div className="env-left" />
          <div className="env-right" />
          {/* Bottom fold */}
          <div className="env-bottom" />
          {/* Flap */}
          <div className={`env-flap${state === 'opening' || state === 'done' ? ' open' : ''}`} />

          {/* Wax seal */}
          {state !== 'done' && (
            <div className={`wax-seal anim-pulse-glow${state === 'cracking' ? ' cracking' : ''}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="rgba(232,184,75,0.7)"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Tap hint */}
      {state === 'idle' && (
        <p
          className="text-xs tracking-widest mt-10"
          style={{
            color: 'var(--cream-dim)',
            animation: 'fadeIn 1s ease 1.4s both',
          }}
        >
          tap to open
        </p>
      )}
    </div>
  )
}
