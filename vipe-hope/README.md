# ☕ Vipe Hope — Premium 3D Cafe Website

> *Where every sip brings hope.*

A cinematic, award-winning style cafe website built with React, Three.js, GSAP, and Tailwind CSS.

## ✨ Features

- **Immersive Loading Screen** — Steam animation, letter-by-letter reveal, curtain exit
- **3D Hero Section** — Interactive coffee cup via React Three Fiber with mouse parallax
- **Scroll Animations** — GSAP ScrollTrigger with pinned sections, parallax layers
- **Smooth Scrolling** — Lenis for buttery-smooth scroll experience
- **Custom Cursor** — Magnetic cursor that grows on hover
- **Animated Navbar** — Transparent to blurred on scroll, mobile hamburger
- **Menu Section** — Tab-filtered cards with 3D tilt-on-hover effect
- **Gallery** — Masonry grid with reveal animations
- **Testimonials** — Auto-advancing carousel with GSAP transitions
- **Contact Form** — Floating labels, animated focus states, success animation
- **Footer** — Giant outlined brand text, newsletter signup, back-to-top

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + Vite | UI framework & build tool |
| Three.js + R3F + Drei | 3D graphics & WebGL |
| GSAP + ScrollTrigger | Animations & scroll effects |
| @studio-freight/lenis | Smooth scrolling |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Supplemental animations |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Navigate to the project
cd "DEMO cafe/vipe-hope"

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Folder Structure

```
vipe-hope/
├── public/
│   └── favicon.svg              # Coffee cup favicon
├── src/
│   ├── components/
│   │   ├── 3d/                  # Three.js components (future models)
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx  # 3D hero with R3F canvas
│   │   │   ├── AboutSection.jsx # Story with parallax
│   │   │   ├── MenuSection.jsx  # Tabbed menu with 3D tilt cards
│   │   │   ├── ExperienceSection.jsx  # Full-width + marquee
│   │   │   ├── GallerySection.jsx     # Masonry gallery
│   │   │   ├── TestimonialsSection.jsx # Carousel
│   │   │   ├── ContactSection.jsx      # Form + info
│   │   │   └── Footer.jsx             # Footer with newsletter
│   │   └── ui/
│   │       ├── LoadingScreen.jsx  # Animated loading with curtain exit
│   │       ├── CustomCursor.jsx   # Magnetic cursor
│   │       └── Navbar.jsx         # Sticky blurred navbar
│   ├── hooks/
│   │   └── useLenis.js          # Lenis smooth scroll setup
│   ├── utils/
│   │   └── constants.js         # Brand colors, fonts, breakpoints
│   ├── styles/
│   │   └── globals.css          # Global styles + Tailwind imports
│   ├── App.jsx                  # Root component with loading orchestration
│   └── main.jsx                 # Entry point
├── index.html                   # HTML template with Google Fonts
├── vite.config.js               # Vite + Tailwind config
├── tailwind.config.js           # Tailwind brand tokens
└── README.md                    # This file
```

## 🎨 Brand Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--espresso` | `#1a0f0a` | Backgrounds |
| `--cream` | `#f5ebe0` | Text, light surfaces |
| `--caramel` | `#c68b59` | Primary accent |
| `--gold` | `#e3b778` | Secondary accent, highlights |

## ♿ Accessibility

- Respects `prefers-reduced-motion` — skips loading screen and animations
- Semantic HTML elements throughout
- Keyboard-navigable forms and buttons
- Mobile-optimized with lower particle counts in 3D scenes

## 📱 Mobile Optimization

- Responsive grid layouts with CSS `auto-fill` and `minmax`
- Coffee beans disabled on mobile (perf)
- Custom cursor hidden on touch devices
- Particle count reduced for mobile 3D

## 🔧 Customization

Replace placeholder content in:
- `src/components/sections/MenuSection.jsx` — `MENU_CATEGORIES` array
- `src/components/sections/TestimonialsSection.jsx` — `TESTIMONIALS` array  
- `src/components/sections/GallerySection.jsx` — `GALLERY_ITEMS` array
- `src/components/sections/ContactSection.jsx` — address and hours
```
