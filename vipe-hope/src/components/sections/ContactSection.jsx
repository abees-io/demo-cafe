import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function FloatingInput({ label, name, type = 'text', value, onChange, required, as: As = 'input' }) {
  const [focused, setFocused] = useState(false)
  const isFilled = value && value.length > 0
  const isActive = focused || isFilled

  const InputEl = As === 'textarea' ? 'textarea' : 'input'

  return (
    <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
      <label style={{
        position: 'absolute',
        left: '1rem',
        top: isActive ? '-0.5rem' : As === 'textarea' ? '1rem' : '50%',
        transform: isActive ? 'translateY(0) scale(0.8)' : As === 'textarea' ? 'translateY(0)' : 'translateY(-50%)',
        transformOrigin: 'left',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.85rem',
        color: focused ? '#c68b59' : 'rgba(245,235,224,0.5)',
        transition: 'all 0.25s ease',
        pointerEvents: 'none',
        background: focused || isFilled ? '#1a0f0a' : 'transparent',
        padding: '0 0.25rem',
        zIndex: 1,
      }}>
        {label}{required && ' *'}
      </label>
      <InputEl
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={As === 'textarea' ? 4 : undefined}
        style={{
          width: '100%',
          background: 'rgba(45,24,16,0.4)',
          border: `1px solid ${focused ? '#c68b59' : 'rgba(198,139,89,0.2)'}`,
          borderRadius: '3px',
          padding: As === 'textarea' ? '1rem' : '0.9rem 1rem',
          color: '#f5ebe0',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.9rem',
          outline: 'none',
          resize: As === 'textarea' ? 'vertical' : undefined,
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          boxShadow: focused ? '0 0 0 3px rgba(198,139,89,0.15), 0 0 20px rgba(198,139,89,0.1)' : 'none',
          backdropFilter: 'blur(8px)',
          minHeight: As === 'textarea' ? '120px' : undefined,
        }}
        required={required}
      />
    </div>
  )
}

export default function ContactSection() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const btnRef = useRef(null)

  useEffect(() => {
    const els = [formRef.current, infoRef.current].filter(Boolean)
    els.forEach((el, i) => {
      gsap.fromTo(el,
        { x: i === 0 ? -60 : 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          delay: i * 0.2,
        }
      )
    })
  }, [])

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Name is required'
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email required'
    if (!formData.message.trim()) errs.message = 'Message is required'
    return errs
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setSubmitting(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500))
    setSubmitting(false)
    setSubmitted(true)

    // Success animation
    gsap.fromTo(formRef.current.querySelector('.success-msg'),
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
    )
  }

  return (
    <section id="contact" ref={sectionRef} style={{
      padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 5vw, 5rem)',
      background: 'linear-gradient(180deg, #2d1810 0%, #1a0f0a 100%)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.75rem',
            color: '#c68b59', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            Get in Touch
          </p>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: '#f5ebe0', fontWeight: 400, lineHeight: 1,
          }}>
            Visit Us
          </h2>
        </div>

        {/* Split layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,420px),1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'start',
        }}>
          {/* Form */}
          <div ref={formRef}>
            {!submitted ? (
              <form onSubmit={handleSubmit} noValidate>
                <FloatingInput label="Your Name" name="name" value={formData.name} onChange={handleChange} required />
                {errors.name && <p style={{ color: '#c68b59', fontSize: '0.75rem', marginTop: '-1rem', marginBottom: '0.5rem' }}>{errors.name}</p>}

                <FloatingInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                {errors.email && <p style={{ color: '#c68b59', fontSize: '0.75rem', marginTop: '-1rem', marginBottom: '0.5rem' }}>{errors.email}</p>}

                <FloatingInput label="Phone (Optional)" name="phone" type="tel" value={formData.phone} onChange={handleChange} />

                <FloatingInput label="Your Message" name="message" value={formData.message} onChange={handleChange} as="textarea" required />
                {errors.message && <p style={{ color: '#c68b59', fontSize: '0.75rem', marginTop: '-1rem', marginBottom: '0.5rem' }}>{errors.message}</p>}

                <button ref={btnRef} type="submit" disabled={submitting} style={{
                  width: '100%', padding: '1rem 2rem',
                  background: submitting ? 'rgba(198,139,89,0.5)' : '#c68b59',
                  color: '#1a0f0a', border: 'none', borderRadius: '3px',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                }}
                onMouseEnter={e => { if (!submitting) e.target.style.background = '#e3b778' }}
                onMouseLeave={e => { if (!submitting) e.target.style.background = '#c68b59' }}>
                  {submitting ? (
                    <>
                      <span style={{
                        width: '14px', height: '14px', border: '2px solid #1a0f0a',
                        borderTopColor: 'transparent', borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite', display: 'inline-block',
                      }} />
                      Sending...
                    </>
                  ) : 'Send Message →'}
                </button>
              </form>
            ) : (
              <div className="success-msg" style={{
                textAlign: 'center', padding: '4rem 2rem',
                border: '1px solid rgba(198,139,89,0.3)', borderRadius: '4px',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>☕</div>
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem',
                  color: '#f5ebe0', marginBottom: '0.75rem',
                }}>
                  Message received!
                </h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '0.9rem',
                  color: '#f5ebe0', opacity: 0.7,
                }}>
                  We'll get back to you within 24 hours. ☀️
                </p>
              </div>
            )}
          </div>

          {/* Info */}
          <div ref={infoRef} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Address */}
            <div>
              <h4 style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem',
                color: '#c68b59', marginBottom: '0.75rem', fontWeight: 400,
              }}>
                Find Us
              </h4>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#f5ebe0', opacity: 0.75, lineHeight: 1.7 }}>
                12 Hope Lane, Brewer's Quarter<br />
                Mumbai, Maharashtra 400001<br />
                India
              </p>
            </div>

            {/* Hours */}
            <div>
              <h4 style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem',
                color: '#c68b59', marginBottom: '0.75rem', fontWeight: 400,
              }}>
                Opening Hours
              </h4>
              {[
                { days: 'Monday – Friday', hours: '7:00 AM – 10:00 PM' },
                { days: 'Saturday', hours: '8:00 AM – 11:00 PM' },
                { days: 'Sunday', hours: '9:00 AM – 9:00 PM' },
              ].map(({ days, hours }) => (
                <div key={days} style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
                  color: '#f5ebe0', opacity: 0.75, padding: '0.4rem 0',
                  borderBottom: '1px solid rgba(198,139,89,0.1)',
                }}>
                  <span>{days}</span>
                  <span style={{ color: '#e3b778' }}>{hours}</span>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h4 style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem',
                color: '#c68b59', marginBottom: '0.75rem', fontWeight: 400,
              }}>
                Contact
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="tel:+919000000000" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#f5ebe0', opacity: 0.75, textDecoration: 'none' }}>
                  📞 +91 90000 00000
                </a>
                <a href="mailto:hello@vipehope.com" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#f5ebe0', opacity: 0.75, textDecoration: 'none' }}>
                  ✉️ hello@vipehope.com
                </a>
              </div>
            </div>

            {/* Map & Storefront Photo */}
            <div style={{
              height: '220px',
              backgroundImage: 'url("https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '1px solid rgba(198,139,89,0.3)',
              borderRadius: '4px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              {/* Dark overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(26,15,10,0.65)',
                backdropFilter: 'blur(1px)',
              }} />
              <div style={{ zIndex: 1, textAlign: 'center', padding: '1rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'rgba(198,139,89,0.25)',
                  border: '1px solid #c68b59',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.75rem',
                  fontSize: '1.2rem',
                }}>
                  📍
                </div>
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.2rem',
                  color: '#f5ebe0',
                  margin: '0 0 0.3rem 0',
                }}>
                  Vipe Hope Flagship
                </p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.75rem',
                  color: '#c68b59',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  margin: 0,
                }}>
                  12 Hope Lane, Mumbai
                </p>
              </div>
            </div>

            {/* Social */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['Instagram', 'Twitter', 'Facebook', 'TikTok'].map(social => (
                <a key={social} href="#" style={{
                  width: '40px', height: '40px',
                  border: '1px solid rgba(198,139,89,0.3)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#c68b59', textDecoration: 'none', fontSize: '0.65rem',
                  fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(198,139,89,0.15)'
                  e.currentTarget.style.borderColor = '#c68b59'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(198,139,89,0.3)'
                }}>
                  {social[0]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  )
}
