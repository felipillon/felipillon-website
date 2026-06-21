# Felipillon — Premium Enterprise Website (PRD)

## Original Problem Statement
Build a premium, cinematic, enterprise-grade website for "Felipillon", a global company (Berlin HQ, Pune, Makati City) with two divisions: Staffing & Recruitment (AI-driven human capital) and Innovation (custom software & AI engineering). Apple/OpenAI/Stripe/NVIDIA/Palantir aesthetic. Dark mode default + light mode, heavy Framer Motion animation, glassmorphism, particles, gradients, video backgrounds, interactive globe. 14 pages.

## User Choices
- Frontend-only (static/mock data, no backend persistence)
- Contact form: visual-only (toast feedback)
- Hero/section backgrounds: mix of looping stock video + CSS/canvas particles
- Theme: dark default, Emerald (#10B981) + Electric Blue (#3B82F6) accents
- Blog: static curated articles

## Architecture
- React 19 + react-router-dom 7, TailwindCSS, Framer Motion, shadcn/ui, lucide-react, sonner
- ThemeContext (localStorage 'felipillon-theme'), Layout with page transitions
- Shared components: MagneticButton, GlowCard (cursor glow + lift), Particles (canvas), Counter, Reveal/Stagger, SectionHeading, Globe (SVG/CSS interactive)
- Static data centralized in src/data/content.js
- Fixed craco.config.js for webpack-dev-server v5 compat (removed deprecated onAfterSetupMiddleware, converted https->server)

## Implemented (2026-06-21)
- 14 pages: Home, About, Services, Industries, Staffing, Innovation, Leadership, Team, Open Roles, Case Studies, Testimonials, Locations, Blog, Contact
- Home: cinematic video+particle hero, staggered headline, trusted-by marquee, asymmetric divisions bento, industries cards, why-felipillon glow cards, animated metric counters, interactive globe footprint, testimonials, CTA
- Open Roles: search + department/location filters + pagination (API-ready structure for future Manatal ATS)
- Contact: validated visual form + office side panel; Blog: featured + category filter; Testimonials: auto-sliding carousel
- Dark/light animated theme toggle, responsive, magnetic buttons, border glows
- Tested: 100% frontend pass, all routes load, no console errors

## Backlog / Next Tasks
- P1: Wire Open Roles to Manatal ATS API (architecture ready)
- P1: Real contact submission (Resend email or DB) if user wants leads captured
- P2: Individual case study / blog article detail pages
- P2: CMS-managed blog
- P2: Replace placeholder leadership/team avatars with real photos
