import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MARQUEE_TEXT = 'Coffee  •  Calm  •  Community  •  Hope  •  '

export default function ExperienceSection() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const marqueeRef = useRef(null)
  const textBlockRef = useRef(null)

  useEffect(() => {
    // Scale on scroll
    if (bgRef.current) {
      gsap.fromTo(bgRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )
    }

    // Marquee animation
    if (marqueeRef.current) {
      const totalWidth = marqueeRef.current.scrollWidth / 2
      gsap.to(marqueeRef.current, {
        x: -totalWidth,
        duration: 20,
        ease: 'none',
        repeat: -1,
      })
    }

    // Text reveal
    if (textBlockRef.current) {
      gsap.fromTo(textBlockRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: textBlockRef.current, start: 'top 75%' },
        }
      )
    }
  }, [])

  return (
    <section ref={sectionRef} style={{
      position: 'relative', overflow: 'hidden',
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center',
    }}>
      {/* Background with real photography and scale-on-scroll */}
      <div ref={bgRef} style={{
        position: 'absolute',
        inset: '-10%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1800&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.4) contrast(1.1) saturate(1.1)',
      }} />

      {/* Cinematic dark warm overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(45,24,16,0.5) 0%, rgba(26,15,10,0.85) 100%)',
      }} />

      {/* Content */}
      <div ref={textBlockRef} style={{
        position: 'relative', zIndex: 1,
        textAlign: 'center', padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)',
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.75rem',
          color: '#c68b59', letterSpacing: '0.3em', textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}>
          The Experience
        </p>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(2.5rem, 7vw, 6rem)',
          color: '#f5ebe0', fontWeight: 300, lineHeight: 1.1,
          maxWidth: '800px', margin: '0 auto 2rem',
        }}>
          Step into a world of warmth, crafted for the curious soul.
        </h2>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '1rem',
          color: '#f5ebe0', opacity: 0.7, maxWidth: '500px',
          margin: '0 auto', lineHeight: 1.7,
        }}>
          Every corner of Vipe Hope is designed with intention — from the low amber lighting 
          to the curated jazz that fills the air. It's not just coffee. It's a feeling.
        </p>
      </div>

      {/* Marquee */}
      <div style={{
        position: 'relative', zIndex: 1,
        overflow: 'hidden', borderTop: '1px solid rgba(198,139,89,0.2)',
        borderBottom: '1px solid rgba(198,139,89,0.2)',
        padding: '1.5rem 0',
      }}>
        <div ref={marqueeRef} style={{ display: 'flex', whiteSpace: 'nowrap' }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: i % 2 === 0 ? '#f5ebe0' : '#c68b59',
              opacity: 0.8, paddingRight: '2rem',
              letterSpacing: '0.1em',
            }}>
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
