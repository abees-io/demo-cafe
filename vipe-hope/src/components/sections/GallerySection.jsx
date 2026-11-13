import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GALLERY_ITEMS = [
  {
    id: 1,
    label: 'Morning Ritual',
    category: 'Pour Over',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    span: 'tall',
  },
  {
    id: 2,
    label: 'Artisan Pour',
    category: 'Latte Art',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
    span: 'normal',
  },
  {
    id: 3,
    label: 'The Courtyard',
    category: 'Ambience',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80',
    span: 'normal',
  },
  {
    id: 4,
    label: 'Single Origin Roast',
    category: 'Bean Selection',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80',
    span: 'wide',
  },
  {
    id: 5,
    label: 'Late Evening Glow',
    category: 'Atmosphere',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    span: 'normal',
  },
  {
    id: 6,
    label: 'The Espresso Bar',
    category: 'Craftsmanship',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    span: 'tall',
  },
  {
    id: 7,
    label: 'Cold Brew Craft',
    category: 'Slow Drip',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    span: 'normal',
  },
  {
    id: 8,
    label: 'Artisan Bakery',
    category: 'Fresh Daily',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80',
    span: 'wide',
  },
]

function GalleryItem({ item, index }) {
  const itemRef = useRef(null)
  const overlayRef = useRef(null)
  const imgRef = useRef(null)

  const handleMouseEnter = () => {
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 })
    gsap.to(imgRef.current, { scale: 1.08, duration: 0.6, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    gsap.to(overlayRef.current, { opacity: 0.85, duration: 0.3 })
    gsap.to(imgRef.current, { scale: 1, duration: 0.6, ease: 'power2.out' })
  }

  useEffect(() => {
    if (!itemRef.current) return
    gsap.fromTo(itemRef.current,
      { y: 50, opacity: 0, scale: 0.96 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        delay: (index % 4) * 0.1,
      }
    )
  }, [])

  const heightMap = { tall: '420px', normal: '260px', wide: '260px' }
  const colSpanMap = { wide: 'span 2', tall: 'span 1', normal: 'span 1' }

  return (
    <div
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '4px',
        cursor: 'pointer',
        height: heightMap[item.span],
        gridColumn: colSpanMap[item.span],
        gridRow: item.span === 'tall' ? 'span 2' : 'span 1',
        border: '1px solid rgba(198,139,89,0.15)',
        background: '#1a0f0a',
      }}
    >
      {/* Real photograph */}
      <div
        ref={imgRef}
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url("${item.image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      />

      {/* Atmospheric gradient overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.75,
          background: 'linear-gradient(to top, rgba(26,15,10,0.95) 0%, rgba(26,15,10,0.4) 50%, rgba(26,15,10,0.1) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '1.5rem',
          transition: 'opacity 0.3s ease',
        }}
      >
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.65rem',
          color: '#e3b778',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '0.25rem',
        }}>
          {item.category}
        </span>
        <h4 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.35rem',
          color: '#f5ebe0',
          fontWeight: 400,
          margin: 0,
        }}>
          {item.label}
        </h4>
      </div>

      <div style={{
        position: 'absolute',
        inset: 0,
        border: '1px solid rgba(198,139,89,0.2)',
        borderRadius: '4px',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

export default function GallerySection() {
  const headingRef = useRef(null)

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
        }
      )
    }
  }, [])

  return (
    <section id="gallery" style={{
      padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 5vw, 5rem)',
      background: 'linear-gradient(180deg, #1a0f0a, #24140d, #1a0f0a)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={headingRef} style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            color: '#c68b59',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Moments &amp; Craft
          </p>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: '#f5ebe0',
            fontWeight: 400,
            lineHeight: 1,
          }}>
            The Gallery
          </h2>
        </div>

        {/* Masonry / grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: '1.25rem',
        }}>
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
