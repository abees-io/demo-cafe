import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav ref={navRef} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '1.2rem 2rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(26,15,10,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(198,139,89,0.2)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <a href="#hero" onClick={(e) => scrollToSection(e, '#hero')} style={{
        fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem',
        color: '#f5ebe0', textDecoration: 'none', letterSpacing: '0.05em',
      }}>
        Vipe <span style={{ color: '#c68b59' }}>Hope</span>
      </a>

      {/* Desktop nav */}
      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}
        className="hidden md:flex">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a href={href} onClick={(e) => scrollToSection(e, href)} style={{
              color: '#f5ebe0', textDecoration: 'none', fontSize: '0.85rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', opacity: 0.85,
              position: 'relative', paddingBottom: '2px',
            }}
            onMouseEnter={e => e.target.style.color = '#c68b59'}
            onMouseLeave={e => e.target.style.color = '#f5ebe0'}>
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Reserve a Table button */}
      <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} style={{
        display: 'none',
        padding: '0.6rem 1.4rem',
        border: '1px solid #c68b59', color: '#c68b59',
        textDecoration: 'none', fontSize: '0.8rem',
        letterSpacing: '0.12em', textTransform: 'uppercase',
        fontFamily: 'Inter, sans-serif',
        transition: 'all 0.3s ease',
        borderRadius: '2px',
      }}
      className="md:!inline-block"
      onMouseEnter={e => { e.target.style.background = '#c68b59'; e.target.style.color = '#1a0f0a' }}
      onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#c68b59' }}>
        Reserve
      </a>

      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px',
      }} className="md:hidden">
        {[0,1,2].map(i => (
          <span key={i} style={{
            display: 'block', width: '24px', height: '1.5px', background: '#f5ebe0',
            transition: 'all 0.3s ease',
            transform: menuOpen && i === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                        menuOpen && i === 1 ? 'scaleX(0)' :
                        menuOpen && i === 2 ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }}/>
        ))}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: '#1a0f0a', zIndex: 999,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '2rem',
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position: 'absolute', top: '1.5rem', right: '2rem',
            background: 'none', border: 'none', color: '#f5ebe0', fontSize: '2rem', cursor: 'pointer',
          }}>✕</button>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} onClick={(e) => scrollToSection(e, href)} style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem',
              color: '#f5ebe0', textDecoration: 'none', letterSpacing: '0.1em',
            }}>
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
