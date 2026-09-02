import { useEffect, useRef } from 'react'

export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COLORS = ['#fff8e8', '#fff8e8', '#fff8e8', '#f5d98b', '#c9b8e8', '#b8d8f5']
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.3 + 0.2,
      baseOp: Math.random() * 0.55 + 0.08,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.012 + 0.004,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t++
      stars.forEach(s => {
        const op = s.baseOp * (0.55 + 0.45 * Math.sin(t * s.speed + s.phase))
        ctx.globalAlpha = op
        ctx.fillStyle = s.color
        ctx.beginPath()
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
