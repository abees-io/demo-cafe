import React, { useState, useEffect, Suspense, lazy } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Loading Screen
import LoadingScreen from './components/ui/LoadingScreen'

// UI elements
import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/ui/Navbar'
import useLenis from './hooks/useLenis'

// Sections
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import MenuSection from './components/sections/MenuSection'
import ExperienceSection from './components/sections/ExperienceSection'
import GallerySection from './components/sections/GallerySection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import ContactSection from './components/sections/ContactSection'
import Footer from './components/sections/Footer'

function AppContent() {
  useLenis()
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <ExperienceSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  const handleLoadComplete = () => {
    setLoading(false)
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)
  }

  return (
    <div style={{ background: '#1a0f0a', minHeight: '100vh', position: 'relative' }}>
      {/* The main content renders immediately so the curtain reveals it seamlessly */}
      <AppContent />

      {/* Loading curtain overlay */}
      {loading && (
        <LoadingScreen onComplete={handleLoadComplete} />
      )}
    </div>
  )
}
