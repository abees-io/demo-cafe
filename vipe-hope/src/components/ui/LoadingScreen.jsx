import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const LOADING_TEXTS = [
  'Grinding beans...',
  'Brewing hope...',
  'Pouring vibes...',
  'Awakening aromas...',
]

function CoffeeCupSVG({ progress }) {
  return (
    <svg viewBox="0 0 120 140" width="140" height="165" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 50 L25 120 Q25 130 35 130 L85 130 Q95 130 95 120 L100 50 Z" fill="#2a1a10" stroke="#c68b59" strokeWidth="2"/>
      <clipPath id="liquidClip">
        <rect x="20" y={50 + (70 * (1 - progress/100))} width="80" height={70 * progress/100} />
      </clipPath>
      <path d="M20 50 L25 120 Q25 130 35 130 L85 130 Q95 130 95 120 L100 50 Z" fill="#c68b59" opacity="0.8" clipPath="url(#liquidClip)"/>
      <ellipse cx="60" cy="50" rx="40" ry="8" fill="#3a2a1a" stroke="#c68b59" strokeWidth="2"/>
      <path d="M100 65 Q125 65 125 85 Q125 105 100 105" fill="none" stroke="#c68b59" strokeWidth="4" strokeLinecap="round"/>
      <ellipse cx="60" cy="133" rx="55" ry="8" fill="#2a1a10" stroke="#c68b59" strokeWidth="1.5"/>
      <g className="steam" opacity={progress < 90 ? 0.8 : 0}>
        <path className="steam-1" d="M40 45 Q38 35 42 25 Q46 15 44 5" stroke="#e3b778" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path className="steam-2" d="M60 43 Q58 33 62 23 Q66 13 64 3" stroke="#e3b778" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path className="steam-3" d="M80 45 Q78 35 82 25 Q86 15 84 5" stroke="#e3b778" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </g>
    </svg>
  )
}

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [textIndex, setTextIndex] = useState(0)
  const [lettersVisible, setLettersVisible] = useState([])
  const containerRef = useRef(null)
  const leftPanelRef = useRef(null)
  const rightPanelRef = useRef(null)
  const progressRef = useRef({ value: 0 })
  const completedRef = useRef(false)

  const brandLetters = 'VIPE HOPE'.split('')

  const finishEarly = () => {
    if (completedRef.current) return
    completedRef.current = true
    if (leftPanelRef.current && rightPanelRef.current) {
      gsap.to(leftPanelRef.current, { x: '-100%', duration: 0.6, ease: 'power3.inOut' })
      gsap.to(rightPanelRef.current, { x: '100%', duration: 0.6, ease: 'power3.inOut', onComplete })
    } else {
      onComplete?.()
    }
  }

  useEffect(() => {
    // Quick progress
    gsap.to(progressRef.current, {
      value: 100,
      duration: 2.0,
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.round(progressRef.current.value))
      },
    })

    // Stagger letter reveal
    brandLetters.forEach((_, i) => {
      setTimeout(() => {
        setLettersVisible(prev => [...prev, i])
      }, (i * 120) + 200)
    })

    const textInterval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % LOADING_TEXTS.length)
    }, 600)

    const exitTimer = setTimeout(() => {
      clearInterval(textInterval)
      finishEarly()
    }, 2400)

    return () => {
      clearInterval(textInterval)
      clearTimeout(exitTimer)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      onClick={finishEarly}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      title="Click anywhere to enter"
    >
      {/* Left panel */}
      <div
        ref={leftPanelRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: '#1a0f0a',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: '2vw',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.5rem' }}>
          <CoffeeCupSVG progress={progress} />
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem,8vw,6rem)', color: '#c68b59', lineHeight: 1 }}>
            {String(progress).padStart(2, '0')}
            <span style={{ fontSize: '0.4em', color: '#e3b778' }}>%</span>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div
        ref={rightPanelRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: '#1a0f0a',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: '2vw',
          borderLeft: '1px solid rgba(198,139,89,0.2)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', gap: '0.05em', flexWrap: 'wrap' }}>
            {brandLetters.map((letter, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(2rem,4.5vw,4rem)',
                  color: letter === ' ' ? 'transparent' : '#f5ebe0',
                  letterSpacing: '0.08em',
                  opacity: lettersVisible.includes(i) ? 1 : 0,
                  transform: lettersVisible.includes(i) ? 'translateY(0)' : 'translateY(15px)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  display: 'inline-block',
                  minWidth: letter === ' ' ? '0.8ch' : 'auto',
                }}
              >
                {letter}
              </span>
            ))}
          </div>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem',
            color: '#c68b59',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: 0.9,
          }}>
            {LOADING_TEXTS[textIndex]}
          </p>
          <div style={{ width: '180px', height: '2px', background: '#2a1a10', borderRadius: '1px' }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #c68b59, #e3b778)',
              width: `${progress}%`,
              borderRadius: '1px',
              transition: 'width 0.1s linear',
            }} />
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: '#c68b59', opacity: 0.5 }}>
            Click anywhere to enter →
          </span>
        </div>
      </div>

      <style>{`
        @keyframes steamRise {
          0% { transform: translateY(0) scaleX(1); opacity: 0.8; }
          50% { transform: translateY(-12px) scaleX(1.2); opacity: 0.4; }
          100% { transform: translateY(-24px) scaleX(0.8); opacity: 0; }
        }
        .steam-1 { animation: steamRise 1.8s ease-in-out infinite; }
        .steam-2 { animation: steamRise 1.8s ease-in-out infinite 0.5s; }
        .steam-3 { animation: steamRise 1.8s ease-in-out infinite 1s; }
      `}</style>
    </div>
  )
}
