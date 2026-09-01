import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { GLOBAL_VIDEO_BG, GLOBAL_VIDEO_POSTER } from "../../data/content";

// ── Global video background — persists across all pages ───────────────────
// ── Global background — inner pages only (home has its own hero video) ────────
export const GlobalBackground = ({ hide = false }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  // On the light home page, keep the app-level background dark so bottom
  // overscroll below the footer does not expose the cream page background.
  // Home's own sections still paint their cream surfaces explicitly.
  if (hide) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#07070A]">
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(201,151,58,0.16) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
      </div>
    );
  }

  // Inner pages — ambient video background
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        poster={GLOBAL_VIDEO_POSTER}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.15) saturate(0.5)" }}
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      >
        <source src={GLOBAL_VIDEO_BG} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#07070A]/80" />

      {/* Gold ambient orbs */}
      <div className="absolute -top-1/4 -left-1/4 w-[900px] h-[900px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(201,151,58,0.07) 0%, transparent 65%)" }} />
      <div className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(168,122,40,0.05) 0%, transparent 65%)" }} />

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.30]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(201,151,58,0.22) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#07070A] to-transparent" />
    </div>
  );
};

// ── Main Layout ──────────────────────────────────────────────────────────────
export const Layout = ({ children }) => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  // Home page has its own full-screen hero video — global background
  // only needs to show on inner pages
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen text-white relative">
      <GlobalBackground hide={isHome} />
      <div className="relative z-10">
        <Navbar />
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    </div>
  );
};

// ── Photo Hero — full-bleed image behind page titles ─────────────────────────
export const PageHero = ({ eyebrow, title, subtitle, children, img, tall = false }) => (
  <section className={`relative overflow-hidden ${tall ? "min-h-[65vh] flex items-end pb-20" : "pt-44 pb-20"}`}>
    {/* Full-bleed photo */}
    {img && (
      <div className="absolute inset-0">
        <img
          src={img}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.28) saturate(0.7)" }}
          loading="eager"
        />
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070A] via-[#07070A]/60 to-[#07070A]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070A]/70 via-transparent to-transparent" />
      </div>
    )}

    {/* Decorative gold line */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9973A]/50 to-transparent" />

    <div className="relative max-w-7xl mx-auto px-6 sm:px-8 z-10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-3 mb-6"
      >
        <span className="w-10 h-px bg-[#C9973A]" />
        <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">{eyebrow}</span>
        <span className="w-10 h-px bg-[#C9973A]" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light tracking-[-0.04em] leading-[1.02] max-w-4xl"
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.22 }}
          className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl leading-relaxed font-light"
        >
          {subtitle}
        </motion.p>
      )}
      {children && <div className="mt-8">{children}</div>}
    </div>
  </section>
);

// ── Full-bleed image section divider ─────────────────────────────────────────
export const ImageDivider = ({ src, alt = "", height = "h-72" }) => (
  <div className={`relative w-full ${height} overflow-hidden my-0`}>
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      style={{ filter: "brightness(0.35) saturate(0.7)" }}
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-[#07070A] via-transparent to-[#07070A]" />
  </div>
);
