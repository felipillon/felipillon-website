import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { CursorFollower } from "../components/shared/CursorFollower";
import { AmbientBackground } from "../components/shared/AmbientBackground";
import { ScrollProgress } from "../components/shared/ScrollProgress";
import { TESTIMONIALS, MEDIA } from "../data/content";
import { ArrowRight, X } from "lucide-react";
import { useLang } from "../context/LangContext";

export default function Testimonials() {
  const { t } = useLang();
  const tm = t.testimonials || {};
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(null);
  const testimonialItems = TESTIMONIALS.map((item, i) => ({ ...item, ...(tm.items?.[i] || {}) }));
  const activeItem = active !== null ? testimonialItems[active] : null;

  useEffect(() => {
    const prevBg = document.body.style.background;
    document.body.style.background = "#FBF8F3";
    setReady(true);
    return () => { document.body.style.background = prevBg; };
  }, []);

  return (
    <div className="relative bg-[#FBF8F3] text-brown-500">
      <ScrollProgress />
      <AmbientBackground />
      {ready && <CursorFollower />}

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full bg-white border border-brown-500/10 shadow-[0_2px_16px_-4px_rgba(61,35,20,0.1)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">{tm.eyebrow || "Testimonials"}</span>
          </motion.div>
          <h1 className="font-heading font-light leading-[0.96] tracking-[-0.05em] text-4xl sm:text-6xl lg:text-[4.6rem] text-[#231911] max-w-3xl">
            {tm.title || "Trusted by the people we serve"}
          </h1>
          {tm.subtitle && <p className="mt-7 text-lg text-brown-500/55 max-w-xl leading-relaxed font-light">{tm.subtitle}</p>}
        </div>
      </section>

      {/* ── Quote grid — click any card to zoom ── */}
      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid sm:grid-cols-2 gap-5">
          {testimonialItems.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <motion.div
                layoutId={`testimonial-page-${i}`}
                onClick={() => setActive(i)}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="h-full cursor-pointer"
              >
                <GlowCard variant="light" className="p-8 h-full">
                  <p className="text-gold text-lg mb-6">★★★★★</p>
                  <p className="font-heading text-lg sm:text-xl font-light text-brown-500/75 leading-[1.4] italic mb-8">
                    "{item.quote}"
                  </p>
                  <div className="flex items-center gap-4 pt-5 border-t border-brown-500/[0.08]">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-300 to-gold-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {item.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#231911]">{item.name}</p>
                      <p className="text-xs text-brown-500/40 mt-0.5">{item.title}</p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Zoom modal ── */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              layoutId={`testimonial-page-${active}`}
              onClick={(e) => e.stopPropagation()}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative bg-white rounded-[2rem] shadow-2xl max-w-xl w-full p-9 sm:p-12"
            >
              <button onClick={() => setActive(null)} className="absolute top-5 right-5 w-9 h-9 rounded-full bg-brown-500/5 hover:bg-brown-500/10 flex items-center justify-center text-brown-500/50 hover:text-brown-500 transition-colors" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
              <p className="text-gold text-xl mb-6">★★★★★</p>
              <p className="font-heading text-xl sm:text-2xl font-light leading-relaxed text-brown-500/80 italic mb-8">"{activeItem.quote}"</p>
              <div className="flex items-center gap-4 pt-6 border-t border-brown-500/[0.08]">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-300 to-gold-700 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {activeItem.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-base text-[#231911]">{activeItem.name}</p>
                  <p className="text-sm text-brown-500/40 mt-0.5">{activeItem.title}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Satisfaction — dark contrast band ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <div className="relative rounded-[2.5rem] overflow-hidden py-16 text-center shadow-[0_30px_70px_-20px_rgba(61,35,20,0.4)]">
          <img src={MEDIA.team} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.3) saturate(0.6)" }} />
          <div className="absolute inset-0 bg-gradient-to-br from-brown-500/90 via-brown-600/85 to-[#180F08]/92" />
          <Reveal className="relative">
            <p className="font-heading text-4xl sm:text-5xl font-light bg-gradient-to-r from-gold-300 to-gold bg-clip-text text-transparent mb-3">95%</p>
            <p className="text-gold-300 text-sm tracking-widest uppercase mb-2">{tm.satisfactionRate}</p>
            <p className="text-white/45 text-sm">{tm.satisfactionDesc}</p>
          </Reveal>
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8 text-center">
        <Reveal>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] mb-5 text-[#231911]">{tm.addYourStory}</h2>
          <p className="text-brown-500/50 mb-8 max-w-xl mx-auto">{tm.addYourStoryDesc}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <MagneticButton to="/contact" variant="lightPrimary" icon={ArrowRight}>{tm.startConversation}</MagneticButton>
            <MagneticButton to="/case-studies" variant="lightSecondary">{tm.viewCaseStudies}</MagneticButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
