import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { CONTENT } from '../data/content'

const AudioPlayer = forwardRef(function AudioPlayer(_, ref) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  useImperativeHandle(ref, () => ({
    startPlaying() {
      if (!audioRef.current || !CONTENT.music.src) return
      audioRef.current.volume = 0.35
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch(() => {})
    }
  }))

  if (!CONTENT.music.src) return null

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !muted
    setMuted(m => !m)
  }

  return (
    <>
      <audio ref={audioRef} src={CONTENT.music.src} loop preload="auto" />
      {playing && (
        <button
          onClick={toggleMute}
          title={muted ? 'Unmute' : 'Mute'}
          className="fixed bottom-6 right-4 z-50 w-9 h-9 rounded-full glass-gold flex items-center justify-center transition-all hover:scale-110"
          style={{ fontSize: '14px' }}
        >
          {muted ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          )}
        </button>
      )}
    </>
  )
})

export default AudioPlayer
