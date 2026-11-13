import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -100, mouseY = -100
    let ringX = -100, ringY = -100
    let isInitialized = false

    const moveCursor = (e) => {
      if (!isInitialized) {
        isInitialized = true
        setVisible(true)
        ringX = e.clientX
        ringY = e.clientY
      }
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.08, ease: 'power2.out' })
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      gsap.set(ring, { x: ringX, y: ringY })
      requestAnimationFrame(animateRing)
    }

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [data-cursor="grow"], input, textarea')) {
        gsap.to(ring, { scale: 2.2, opacity: 0.5, borderColor: '#e3b778', duration: 0.25 })
        gsap.to(dot, { scale: 0.3, duration: 0.25 })
      }
    }

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [data-cursor="grow"], input, textarea')) {
        gsap.to(ring, { scale: 1, opacity: 0.7, borderColor: '#c68b59', duration: 0.25 })
        gsap.to(dot, { scale: 1, duration: 0.25 })
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)
    const animId = requestAnimationFrame(animateRing)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(animId)
    }
  }, [])

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }}>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#c68b59',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid #c68b59',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          opacity: 0.7,
        }}
      />
    </div>
  )
}
