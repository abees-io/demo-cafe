import React, { useRef } from 'react'

export default function Footer() {
  const bigTextRef = useRef(null)
  const [email, setEmail] = React.useState('')
  const [subscribed, setSubscribed] = React.useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer style={{
      background: '#1a0f0a',
      borderTop: '1px solid rgba(198,139,89,0.15)',
      overflow: 'hidden',
    }}>
      {/* Giant brand name */}
      <div ref={bigTextRef} style={{
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem) 0',
        overflow: 'hidden',
      }}>
        <div style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(5rem, 18vw, 16rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(198,139,89,0.3)',
          lineHeight: 0.85, letterSpacing: '-0.03em',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}>
          Vipe<br />
          <span style={{ WebkitTextStroke: '1px rgba(227,183,120,0.4)' }}>Hope</span>
        </div>
      </div>

      {/* Footer content */}
      <div style={{
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 5rem)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
        gap: '3rem',
        borderTop: '1px solid rgba(198,139,89,0.1)',
        marginTop: '2rem',
      }}>
        {/* Brand */}
        <div>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem',
            color: '#f5ebe0', marginBottom: '1rem', letterSpacing: '0.05em',
          }}>
            Vipe <span style={{ color: '#c68b59' }}>Hope</span>
          </div>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
            color: '#f5ebe0', opacity: 0.55, lineHeight: 1.7, maxWidth: '220px',
          }}>
            Cafe & Coffee House<br />
            Where every sip brings hope.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.7rem',
            color: '#c68b59', letterSpacing: '0.3em', textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            Explore
          </h5>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {['Home', 'Menu', 'About', 'Gallery', 'Contact'].map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
                  color: '#f5ebe0', opacity: 0.65, textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.target.style.color = '#c68b59'; e.target.style.opacity = '1' }}
                onMouseLeave={e => { e.target.style.color = '#f5ebe0'; e.target.style.opacity = '0.65' }}>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h5 style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.7rem',
            color: '#c68b59', letterSpacing: '0.3em', textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>
            Stay in the loop
          </h5>
          {!subscribed ? (
            <form onSubmit={handleSubscribe}>
              <div style={{ display: 'flex', gap: '0', borderRadius: '3px', overflow: 'hidden' }}>
                <input
                  type="email" placeholder="your@email.com" value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    flex: 1, padding: '0.7rem 1rem',
                    background: 'rgba(45,24,16,0.6)',
                    border: '1px solid rgba(198,139,89,0.2)', borderRight: 'none',
                    color: '#f5ebe0', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
                    outline: 'none', borderRadius: '3px 0 0 3px',
                  }}
                />
                <button type="submit" style={{
                  padding: '0.7rem 1rem', background: '#c68b59',
                  border: 'none', color: '#1a0f0a', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.75rem',
                  letterSpacing: '0.1em', borderRadius: '0 3px 3px 0',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={e => e.target.style.background = '#e3b778'}
                onMouseLeave={e => e.target.style.background = '#c68b59'}>
                  →
                </button>
              </div>
            </form>
          ) : (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#c68b59' }}>
              ☕ You're in! Check your inbox.
            </p>
          )}
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
            color: '#f5ebe0', opacity: 0.4, marginTop: '0.6rem',
          }}>
            No spam. Only good coffee news.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '1.5rem clamp(1.5rem, 5vw, 5rem)',
        borderTop: '1px solid rgba(198,139,89,0.1)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1rem',
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.75rem',
          color: '#f5ebe0', opacity: 0.4,
        }}>
          © {new Date().getFullYear()} Vipe Hope. All rights reserved.
        </p>
        <button onClick={scrollToTop} style={{
          background: 'none', border: '1px solid rgba(198,139,89,0.3)',
          color: '#c68b59', padding: '0.5rem 1.2rem',
          fontFamily: 'Inter, sans-serif', fontSize: '0.75rem',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          cursor: 'pointer', borderRadius: '2px',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => { e.target.style.background = 'rgba(198,139,89,0.1)'; e.target.style.borderColor = '#c68b59' }}
        onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.borderColor = 'rgba(198,139,89,0.3)' }}>
          ↑ Back to Top
        </button>
      </div>
    </footer>
  )
}
