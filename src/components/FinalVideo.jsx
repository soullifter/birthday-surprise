import { useState } from 'react'
import { CONTENT } from '../data/content'

export default function FinalVideo({ onContinue }) {
  const { src, youtubeId, preText, postText } = CONTENT.video
  const [started, setStarted] = useState(false)
  const [ended, setEnded] = useState(false)

  const hasVideo = src || youtubeId

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        {/* Pre text */}
        {!started && (
          <div className="text-center mb-12 anim-fade-in-up">
            <p className="font-display text-2xl sm:text-3xl italic text-cream mb-3">{preText}</p>
            <div className="h-px w-20 mx-auto" style={{ background: 'linear-gradient(to right, transparent, var(--gold), transparent)' }} />
          </div>
        )}

        {/* Video area */}
        {hasVideo && (
          <div
            className="rounded-2xl overflow-hidden mb-8 anim-fade-in-up delay-300"
            style={{ border: '1px solid rgba(232,184,75,0.15)', background: '#000' }}
          >
            {src ? (
              <video
                src={src}
                controls
                className="w-full"
                style={{ maxHeight: '380px' }}
                onPlay={() => setStarted(true)}
                onEnded={() => setEnded(true)}
              />
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
                className="w-full"
                style={{ height: '240px' }}
                allowFullScreen
                allow="autoplay; encrypted-media"
                title="Video message"
                onLoad={() => setStarted(true)}
              />
            )}
          </div>
        )}

        {/* No video placeholder */}
        {!hasVideo && (
          <div
            className="w-full h-56 rounded-2xl flex flex-col items-center justify-center mb-8 anim-fade-in-up delay-200"
            style={{ border: '1px dashed rgba(232,184,75,0.2)', background: 'rgba(232,184,75,0.02)' }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(232,184,75,0.3)" strokeWidth="1.2">
              <path d="M15 10l4.55-2.27A1 1 0 0121 8.62v6.76a1 1 0 01-1.45.9L15 14"/>
              <rect x="1" y="6" width="14" height="12" rx="2"/>
            </svg>
            <p className="text-xs font-display italic mt-3" style={{ color: 'rgba(232,184,75,0.3)' }}>
              your video message goes here
            </p>
            <p className="text-[10px] mt-1" style={{ color: 'rgba(232,184,75,0.2)' }}>
              set video.src or video.youtubeId in content.js
            </p>
          </div>
        )}

        {/* Post text + continue */}
        {(ended || !hasVideo) && (
          <div className="text-center anim-fade-in-up">
            <p className="font-display italic text-lg text-cream/60 mb-8">{postText}</p>
            <button
              onClick={onContinue}
              className="btn-gold px-9 py-3 rounded-full font-display italic text-sm tracking-wide"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Show continue for YouTube (can't detect ended) */}
        {youtubeId && !src && started && !ended && (
          <div className="text-center mt-4 anim-fade-in">
            <button
              onClick={onContinue}
              className="text-xs font-display italic"
              style={{ color: 'var(--cream-dim)' }}
            >
              Continue when you're ready →
            </button>
          </div>
        )}

        {/* Skip for no video */}
        {!hasVideo && (
          <div className="text-center mt-4 anim-fade-in delay-500">
            <button onClick={onContinue} className="btn-gold px-9 py-3 rounded-full font-display italic text-sm tracking-wide">
              Continue →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
