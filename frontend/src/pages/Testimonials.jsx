import { useState, useEffect } from "react";
import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { TESTIMONIALS } from "../data/content";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[idx];

  return (
    <>
      <PageHero eyebrow="Testimonials" title="In the words of our partners"
        subtitle="The relationships we build are the truest measure of our work." />

      <section className="py-16 max-w-4xl mx-auto px-6 sm:px-8">
        <div className="relative" data-testid="testimonials-carousel">
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -24, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <GlowCard lift={false} className="p-12 text-center">
                <Quote className="w-12 h-12 text-emerald-500/30 mx-auto mb-6" />
                <p className="font-heading text-2xl sm:text-3xl font-light leading-snug">"{t.quote}"</p>
                <div className="mt-8 flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-electric-500 flex items-center justify-center text-white font-medium text-lg">{t.name[0]}</div>
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.title}</p>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={() => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} data-testid="testimonial-prev"
              className="w-11 h-11 rounded-full glass flex items-center justify-center hover:border-emerald-500/50 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-emerald-500" : "w-2 bg-foreground/20"}`} />
              ))}
            </div>
            <button onClick={() => setIdx((i) => (i + 1) % TESTIMONIALS.length)} data-testid="testimonial-next"
              className="w-11 h-11 rounded-full glass flex items-center justify-center hover:border-emerald-500/50 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
