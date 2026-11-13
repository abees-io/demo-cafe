import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STORY_LINES = [
  'Born from a love of community',
  'and the quiet ritual of coffee,',
  'Vipe Hope is more than a café —',
  'it\'s a sanctuary.',
]

export default function AboutSection() {
  const sectionRef = useRef(null)
  const linesRef = useRef([])
  const imageRef = useRef(null)
  const decorRef = useRef(null)

  useEffect(() => {
    // Animate text lines on scroll
    linesRef.current.forEach((line, i) => {
      if (!line) return
      gsap.fromTo(line,
        { y: 60, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        {
          y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)',
          duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
          },
          delay: i * 0.12,
        }
      )
    })

    // Parallax image
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }

    // Decorative element rotation
    if (decorRef.current) {
      gsap.to(decorRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      })
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} style={{
      padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 5vw, 5rem)',
      background: 'linear-gradient(180deg, #1a0f0a 0%, #2d1810 50%, #1a0f0a 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background decorative text */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(8rem, 20vw, 18rem)',
        color: 'rgba(198,139,89,0.04)',
        whiteSpace: 'nowrap', pointerEvents: 'none',
        userSelect: 'none', letterSpacing: '-0.05em',
      }}>
        STORY
      </div>

      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,420px),1fr))',
        gap: 'clamp(3rem, 6vw, 6rem)', alignItems: 'center',
      }}>
        {/* Text column */}
        <div>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.75rem',
            color: '#c68b59', letterSpacing: '0.3em', textTransform: 'uppercase',
            marginBottom: '1.5rem', opacity: 0.9,
          }}>
            Our Story
          </p>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#f5ebe0', lineHeight: 1.1,
            marginBottom: '2.5rem', fontWeight: 400,
          }}>
            A place where{' '}
            <em style={{ color: '#c68b59', fontStyle: 'italic' }}>hope</em>{' '}
            is brewed fresh daily.
          </h2>

          {/* Animated story lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2.5rem' }}>
            {STORY_LINES.map((line, i) => (
              <p
                key={i}
                ref={el => linesRef.current[i] = el}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  color: '#f5ebe0', opacity: 0.85, lineHeight: 1.7,
                }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '3rem', marginTop: '3rem' }}>
            {[
              { num: '2017', label: 'Est.' },
              { num: '12K+', label: 'Happy Guests' },
              { num: '30+', label: 'Blends' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '2.2rem', color: '#c68b59', lineHeight: 1,
                }}>
                  {num}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '0.75rem',
                  color: '#f5ebe0', opacity: 0.6, letterSpacing: '0.15em',
                  textTransform: 'uppercase', marginTop: '0.3rem',
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image column */}
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
          {/* Decorative circle */}
          <div ref={decorRef} style={{
            position: 'absolute', top: '-30px', right: '-30px',
            width: '120px', height: '120px',
            border: '1px solid rgba(198,139,89,0.3)',
            borderRadius: '50%', zIndex: 2,
          }} />
          <div style={{
            aspectRatio: '3/4',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid rgba(198,139,89,0.25)',
            position: 'relative',
          }}>
            <div
              ref={imageRef}
              style={{
                width: '100%',
                height: '130%',
                backgroundImage: 'url("https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.9) contrast(1.05)',
                position: 'relative',
              }}
            >
              {/* Warm gradient overlay for cinematic contrast */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(26,15,10,0.85) 0%, rgba(26,15,10,0.2) 60%, transparent 100%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '2rem',
              }}>
                <div>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.7rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#e3b778',
                    display: 'block',
                    marginBottom: '0.3rem',
                  }}>
                    Atmosphere
                  </span>
                  <span style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.4rem',
                    color: '#f5ebe0',
                    fontStyle: 'italic',
                  }}>
                    A sanctuary for slow moments
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Offset accent box */}
          <div style={{
            position: 'absolute', bottom: '-20px', left: '-20px',
            width: '80px', height: '80px',
            background: 'rgba(198,139,89,0.15)',
            border: '1px solid rgba(198,139,89,0.3)',
          }} />
        </div>
      </div>
    </section>
  )
}
