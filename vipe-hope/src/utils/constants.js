export const COLORS = {
  espresso: '#1a0f0a',
  cream: '#f5ebe0',
  caramel: '#c68b59',
  gold: '#e3b778',
}

export const FONTS = {
  serif: "'Cormorant Garamond', 'Playfair Display', serif",
  sans: "'Inter', 'DM Sans', sans-serif",
}

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
}

export const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < BREAKPOINTS.mobile
export const REDUCED_MOTION = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
