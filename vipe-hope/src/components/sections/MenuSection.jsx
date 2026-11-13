import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MENU_CATEGORIES = [
  {
    id: 'coffee',
    label: 'Coffee',
    emoji: '☕',
    items: [
      { name: 'Hope Espresso', desc: 'Double shot, golden crema, pure intention', price: '$4.50' },
      { name: 'Vibe Latte', desc: 'Silky oat milk, caramel swirl, cinnamon dust', price: '$6.00' },
      { name: 'Dream Cold Brew', desc: '18-hour steep, chocolate notes, served chilled', price: '$5.50' },
      { name: 'The Sunrise Pour', desc: 'Ethiopian single origin, light roast', price: '$5.00' },
    ],
  },
  {
    id: 'teas',
    label: 'Teas',
    emoji: '🍵',
    items: [
      { name: 'Golden Hour Chai', desc: 'House spice blend, oat milk, honey', price: '$5.00' },
      { name: 'Calm Matcha', desc: 'Ceremonial grade, lightly sweetened', price: '$5.50' },
      { name: 'Hibiscus Drift', desc: 'Florals, citrus, chilled over ice', price: '$4.50' },
      { name: 'Earl Grey Mist', desc: 'Bergamot, lavender, steamed milk', price: '$4.00' },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    emoji: '🍮',
    items: [
      { name: 'Crème Brûlée Tart', desc: 'Vanilla custard, caramelized sugar crust', price: '$7.00' },
      { name: 'Espresso Brownie', desc: 'Dense, fudgy, coffee-spiked', price: '$5.50' },
      { name: 'Hope Tiramisu', desc: 'House recipe, 24-hour set', price: '$8.00' },
      { name: 'Cardamom Panna Cotta', desc: 'Silky, spiced, rose water drizzle', price: '$6.50' },
    ],
  },
  {
    id: 'snacks',
    label: 'Snacks',
    emoji: '🥐',
    items: [
      { name: 'Almond Croissant', desc: 'Twice-baked, frangipane filled', price: '$4.50' },
      { name: 'Avocado Toast', desc: 'Sourdough, chili flakes, poached egg', price: '$9.00' },
      { name: 'Cheese Board', desc: 'Seasonal selection, house crackers', price: '$14.00' },
      { name: 'Granola Bowl', desc: 'House granola, coconut yogurt, fresh fruit', price: '$7.00' },
    ],
  },
]

function MenuItem3D({ item }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
    cardRef.current.style.borderColor = 'rgba(198,139,89,0.15)'
    cardRef.current.style.background = 'rgba(45,24,16,0.6)'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(198,139,89,0.5)'
        e.currentTarget.style.background = 'rgba(45,24,16,0.9)'
      }}
      style={{
        background: 'rgba(45,24,16,0.6)',
        border: '1px solid rgba(198,139,89,0.15)',
        borderRadius: '4px',
        padding: '1.5rem',
        transition: 'transform 0.15s ease, border-color 0.3s ease, background 0.3s ease',
        cursor: 'default',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <h4 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.2rem', color: '#f5ebe0', fontWeight: 400,
        }}>
          {item.name}
        </h4>
        <span style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.1rem', color: '#c68b59', fontWeight: 600,
          whiteSpace: 'nowrap', marginLeft: '1rem',
        }}>
          {item.price}
        </span>
      </div>
      <p style={{
        fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
        color: '#f5ebe0', opacity: 0.6, lineHeight: 1.5,
      }}>
        {item.desc}
      </p>
    </div>
  )
}

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState('coffee')
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const gridRef = useRef(null)

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

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.menu-card')
      gsap.fromTo(cards,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
      )
    }
  }, [activeTab])

  const activeCategory = MENU_CATEGORIES.find(c => c.id === activeTab)

  return (
    <section id="menu" ref={sectionRef} style={{
      padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 5vw, 5rem)',
      background: '#1a0f0a', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={headingRef} style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.75rem',
            color: '#c68b59', letterSpacing: '0.3em', textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Signature Selection
          </p>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: '#f5ebe0', fontWeight: 400, lineHeight: 1,
          }}>
            Our Menu
          </h2>
        </div>

        {/* Category tabs */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: '0.5rem', marginBottom: '3rem',
          flexWrap: 'wrap',
        }}>
          {MENU_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveTab(cat.id)} style={{
              padding: '0.6rem 1.6rem',
              background: activeTab === cat.id ? '#c68b59' : 'transparent',
              color: activeTab === cat.id ? '#1a0f0a' : '#f5ebe0',
              border: `1px solid ${activeTab === cat.id ? '#c68b59' : 'rgba(198,139,89,0.3)'}`,
              borderRadius: '2px',
              fontFamily: 'Inter, sans-serif', fontSize: '0.8rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.3s ease',
            }}>
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Menu items grid */}
        <div ref={gridRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,280px),1fr))',
          gap: '1.5rem',
        }}>
          {activeCategory?.items.map((item) => (
            <div key={item.name} className="menu-card">
              <MenuItem3D item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
