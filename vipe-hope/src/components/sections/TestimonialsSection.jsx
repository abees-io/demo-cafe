import React, { useState, useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Walking into Vipe Hope feels like being wrapped in a warm blanket on a rainy day. The coffee is extraordinary, but the soul of this place is what keeps me coming back.",
    author: "Priya M.",
    role: "Regular since 2019",
    initials: "PM",
  },
  {
    id: 2,
    quote: "I've traveled the world chasing coffee experiences. Vipe Hope is the rare café that understands coffee isn't just a beverage — it's a ritual, a pause, a small act of hope.",
    author: "James W.",
    role: "Coffee Enthusiast",
    initials: "JW",
  },
  {
    id: 3,
    quote: "The atmosphere, the music, the light — everything is intentional. I write my best work here. It's become my second home.",
    author: "Sara L.",
    role: "Writer & Remote Worker",
    initials: "SL",
  },
  {
    id: 4,
    quote: "Their Vibe Latte is genuinely life-changing. I tried to replicate it at home and failed spectacularly. Some things you just can't recreate.",
    author: "Rahul K.",
    role: "Designer",
    initials: "RK",
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const quoteRef = useRef(null)
  const authorRef = useRef(null)

  const goTo = useCallback((index) => {
    if (animating) return
    setAnimating(true)
    gsap.to([quoteRef.current, authorRef.current], {
      y: -20, opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        setCurrent(index)
        gsap.fromTo([quoteRef.current, authorRef.current],
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
            stagger: 0.1,
            onComplete: () => setAnimating(false),
          }
        )
      },
    })
  }, [animating])

  const prev = useCallback(() => goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), [current, goTo])
  const next = useCallback(() => goTo((current + 1) % TESTIMONIALS.length), [current, goTo])

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const t = TESTIMONIALS[current]

  return (
    <section style={{
      padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 5vw, 5rem)',
      background: '#1a0f0a', textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      {/* Giant background quote mark */}
      <div style={{
        position: 'absolute', top: '-2rem', left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(15rem, 30vw, 25rem)',
        color: 'rgba(198,139,89,0.05)', lineHeight: 1, pointerEvents: 'none',
        userSelect: 'none',
      }}>
        "
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.75rem',
          color: '#c68b59', letterSpacing: '0.3em', textTransform: 'uppercase',
          marginBottom: '3rem',
        }}>
          What They Say
        </p>

        {/* Quote */}
        <blockquote ref={quoteRef} style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.3rem, 3vw, 2rem)',
          color: '#f5ebe0', fontWeight: 300, lineHeight: 1.5,
          fontStyle: 'italic', marginBottom: '2.5rem',
        }}>
          "{t.quote}"
        </blockquote>

        {/* Author */}
        <div ref={authorRef} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
        }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #c68b59, #e3b778)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#1a0f0a', fontWeight: 600,
          }}>
            {t.initials}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#f5ebe0', fontWeight: 500 }}>
              {t.author}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#c68b59', opacity: 0.8 }}>
              {t.role}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginTop: '3rem' }}>
          <button onClick={prev} style={{
            background: 'none', border: '1px solid rgba(198,139,89,0.3)',
            color: '#c68b59', width: '44px', height: '44px', borderRadius: '50%',
            cursor: 'pointer', fontSize: '1.1rem', transition: 'all 0.3s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#c68b59'; e.currentTarget.style.background = 'rgba(198,139,89,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(198,139,89,0.3)'; e.currentTarget.style.background = 'none' }}>
            ←
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{
                width: i === current ? '24px' : '8px',
                height: '8px', borderRadius: '4px',
                background: i === current ? '#c68b59' : 'rgba(198,139,89,0.3)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </div>

          <button onClick={next} style={{
            background: 'none', border: '1px solid rgba(198,139,89,0.3)',
            color: '#c68b59', width: '44px', height: '44px', borderRadius: '50%',
            cursor: 'pointer', fontSize: '1.1rem', transition: 'all 0.3s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#c68b59'; e.currentTarget.style.background = 'rgba(198,139,89,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(198,139,89,0.3)'; e.currentTarget.style.background = 'none' }}>
            →
          </button>
        </div>
      </div>
    </section>
  )
}
