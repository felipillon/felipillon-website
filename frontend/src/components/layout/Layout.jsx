import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Navbar />
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

// Reusable inner-page hero
export const PageHero = ({ eyebrow, title, subtitle, children }) => (
  <section className="relative pt-40 pb-16 overflow-hidden">
    <div className="absolute inset-0 aurora opacity-70" />
    <div className="absolute inset-0 grid-bg opacity-30" />
    <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
      <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-emerald-500 mb-5">
        <span className="w-6 h-px bg-emerald-500" />{eyebrow}
      </motion.span>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
        className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter leading-[1.02] max-w-4xl">
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">{subtitle}</motion.p>
      )}
      {children}
    </div>
  </section>
);
