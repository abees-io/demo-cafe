import React, { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, MeshDistortMaterial, Sphere, Text3D, Center, OrbitControls } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(err) {
    console.warn('3D Canvas encountered an error, falling back to 2D/3D CSS illustration:', err)
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

function FallbackCoffeeCup() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'relative',
        width: '260px',
        height: '260px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 40% 40%, rgba(227,183,120,0.2) 0%, rgba(45,24,16,0.8) 60%, transparent 80%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'floatCup 4s ease-in-out infinite',
      }}>
        <div style={{ fontSize: '6rem', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.6))' }}>☕</div>
      </div>
      <style>{`
        @keyframes floatCup {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
      `}</style>
    </div>
  )
}

// Procedural coffee cup mesh
function CoffeeCup({ scrollProgress }) {
  const groupRef = useRef()
  const cupRef = useRef()
  const liquidRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const { clock, pointer, mouse } = state
    const mx = pointer?.x ?? mouse?.x ?? 0
    const my = pointer?.y ?? mouse?.y ?? 0

    // Gentle float
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.08
    // Mouse parallax
    groupRef.current.rotation.y += (mx * 0.3 - groupRef.current.rotation.y) * 0.05
    groupRef.current.rotation.x += (my * -0.15 - groupRef.current.rotation.x) * 0.05
    // Scroll-driven rotation
    if (scrollProgress !== undefined) {
      groupRef.current.rotation.z = scrollProgress * Math.PI * 0.4
      groupRef.current.position.z = scrollProgress * -2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Cup body - tapered cylinder */}
      <mesh ref={cupRef} position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.65, 1.2, 32, 1, true]} />
        <meshStandardMaterial color="#2a1510" roughness={0.3} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>
      {/* Cup bottom */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.05, 32]} />
        <meshStandardMaterial color="#2a1510" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Coffee liquid */}
      <mesh ref={liquidRef} position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.08, 32]} />
        <meshStandardMaterial color="#3d1c08" roughness={0.1} metalness={0.3} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.95, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.3, 0.06, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#2a1510" roughness={0.3} />
      </mesh>
      {/* Saucer */}
      <mesh position={[0, -0.72, 0]}>
        <cylinderGeometry args={[1.1, 1.0, 0.1, 32]} />
        <meshStandardMaterial color="#1f1008" roughness={0.4} metalness={0.05} />
      </mesh>
      {/* Steam particles */}
      <SteamParticles />
    </group>
  )
}

// Floating steam particles
function SteamParticles() {
  const pointsRef = useRef()
  const count = 60

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.8
      pos[i * 3 + 1] = Math.random() * 2 + 0.5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.8
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const attr = pointsRef.current.geometry?.attributes?.position
    if (!attr || !attr.array) return
    const pos = attr.array
    const time = clock.elapsedTime
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] = ((pos[i * 3 + 1] - 0.5 + 0.01) % 2) + 0.5
      pos[i * 3] += Math.sin(time * 0.5 + i) * 0.002
    }
    attr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#e3b778" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

// Floating coffee beans
function CoffeeBeans() {
  const beansRef = useRef([])
  const count = 12

  const beans = React.useMemo(() => Array.from({ length: count }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 3 - 1,
    ],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
    speed: 0.3 + Math.random() * 0.5,
    radius: 0.08 + Math.random() * 0.06,
  })), [])

  useFrame(({ clock }) => {
    beans.forEach((bean, i) => {
      if (beansRef.current[i]) {
        beansRef.current[i].rotation.x += 0.005 * bean.speed
        beansRef.current[i].rotation.y += 0.008 * bean.speed
        beansRef.current[i].position.y = bean.position[1] + Math.sin(clock.elapsedTime * bean.speed + i) * 0.3
      }
    })
  })

  return (
    <>
      {beans.map((bean, i) => (
        <mesh key={i} ref={el => beansRef.current[i] = el} position={bean.position} rotation={bean.rotation}>
          <sphereGeometry args={[bean.radius, 8, 6]} />
          <meshStandardMaterial color="#3d1c08" roughness={0.6} />
        </mesh>
      ))}
    </>
  )
}

// Scene camera that responds to scroll
function ScrollCamera({ scrollProgress }) {
  const { camera } = useThree()
  useFrame(() => {
    if (scrollProgress !== undefined) {
      camera.position.z = 5 - scrollProgress * 2
      camera.position.y = scrollProgress * 0.5
    }
  })
  return null
}

export default function HeroSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const scrollRef = useRef({ progress: 0 })
  const [scrollProgress, setScrollProgress] = React.useState(0)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    // GSAP hero title stagger reveal
    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll('.hero-letter')
      gsap.fromTo(letters,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.06, ease: 'power3.out', delay: 0.3 }
      )
    }

    // Scroll-driven progress
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        setScrollProgress(self.progress)
      },
    })

    return () => trigger.kill()
  }, [])

  const heroTitle = 'VIPE HOPE'.split('')

  return (
    <section id="hero" ref={sectionRef} style={{
      position: 'relative', height: '100vh', minHeight: '600px',
      background: 'linear-gradient(135deg, #1a0f0a 0%, #2d1810 50%, #1a0f0a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* 3D Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <CanvasErrorBoundary fallback={<FallbackCoffeeCup />}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            dpr={[1, isMobile ? 1.5 : 2]}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1.2} color="#e3b778" />
            <pointLight position={[-5, -5, 3]} intensity={0.6} color="#c68b59" />
            <spotLight position={[0, 8, 4]} intensity={1} angle={0.4} penumbra={0.5} color="#f5ebe0" />

            <Suspense fallback={null}>
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
                <CoffeeCup scrollProgress={scrollProgress} />
              </Float>
              {!isMobile && <CoffeeBeans />}
            </Suspense>

            <ScrollCamera scrollProgress={scrollProgress} />
            <fog attach="fog" args={['#1a0f0a', 8, 20]} />
          </Canvas>
        </CanvasErrorBoundary>
      </div>

      {/* Text overlay */}
      <div style={{
        position: 'relative', zIndex: 2, textAlign: 'center',
        pointerEvents: 'none', userSelect: 'none',
      }}>
        <h1 ref={titleRef} style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(4rem, 14vw, 11rem)',
          color: '#f5ebe0', lineHeight: 0.9,
          letterSpacing: '-0.02em',
          textShadow: '0 0 80px rgba(198,139,89,0.3)',
          display: 'flex', gap: '0.03em', flexWrap: 'wrap', justifyContent: 'center',
          margin: 0,
          mixBlendMode: 'screen',
        }}>
          {heroTitle.map((letter, i) => (
            <span key={i} className="hero-letter" style={{
              display: 'inline-block',
              color: i < 4 ? '#f5ebe0' : '#c68b59',
              minWidth: letter === ' ' ? '0.3em' : 'auto',
            }}>
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          color: '#e3b778', letterSpacing: '0.3em',
          textTransform: 'uppercase', marginTop: '1.5rem',
          opacity: 0.9,
        }}>
          Where every sip brings hope.
        </p>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '50%',
        transform: 'translateX(-50%)', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
      }}>
        <span style={{ color: '#c68b59', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div style={{
          width: '1px', height: '50px',
          background: 'linear-gradient(to bottom, #c68b59, transparent)',
          animation: 'scrollBounce 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { opacity: 1; transform: scaleY(1); transform-origin: top; }
          50% { opacity: 0.5; transform: scaleY(0.5); transform-origin: top; }
        }
      `}</style>
    </section>
  )
}
