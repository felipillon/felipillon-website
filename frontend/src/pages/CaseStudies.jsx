import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { Counter } from "../components/shared/Counter";
import { CursorFollower } from "../components/shared/CursorFollower";
import { AmbientBackground } from "../components/shared/AmbientBackground";
import { ScrollProgress } from "../components/shared/ScrollProgress";
import { CASE_STUDIES, MEDIA } from "../data/content";
import { ArrowRight } from "lucide-react";
import { useLang } from "../context/LangContext";

export default function CaseStudies() {
  const { t } = useLang();
  const cs = t.caseStudies || {};
  const [ready, setReady] = useState(false);

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
            <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">{cs.eyebrow || "Case Studies"}</span>
          </motion.div>
          <h1 className="font-heading font-light leading-[0.96] tracking-[-0.05em] text-4xl sm:text-6xl lg:text-[4.6rem] text-[#231911] max-w-3xl">
            {cs.title || "Outcomes that speak louder than promises"}
          </h1>
          {cs.subtitle && <p className="mt-7 text-lg text-brown-500/55 max-w-xl leading-relaxed font-light">{cs.subtitle}</p>}
        </div>
      </section>

      {/* ── Outcome blocks — sticky metric photo, scrolling detail panel ── */}
      {CASE_STUDIES.map((c, i) => {
        const isEven = i % 2 === 0;
        const numStr = c.metric.replace(/[^0-9]/g, "");
        const num = parseInt(numStr, 10) || 0;
        const suffix = c.metric.replace(/[0-9,]/g, "");
        return (
          <section key={c.id} className="relative py-10" data-testid={`case-study-${c.id}`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                <div className={`${isEven ? "lg:order-1" : "lg:order-2"} lg:sticky lg:top-28`}>
                  <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-[0_24px_60px_-16px_rgba(61,35,20,0.25)] border border-white">
                    <motion.div
                      className="absolute inset-0"
                      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.div className="w-full h-full" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}>
                        <img src={c.img} alt={c.title} className="w-full h-full object-cover" loading="lazy" />
                      </motion.div>
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <div className="font-heading font-light leading-none text-5xl sm:text-6xl" style={{ color: c.color }}>
                        {num > 0 ? <Counter value={num} suffix={suffix} /> : c.metric}
                      </div>
                      <p className="text-white/60 text-sm mt-2">{c.metricLabel}</p>
                      <p className="text-white/35 text-xs">{c.sub}</p>
                    </div>
                  </div>
                </div>

                <div className={`${isEven ? "lg:order-2" : "lg:order-1"} py-6`}>
                  <Reveal className="max-w-lg">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border mb-6"
                      style={{ color: c.color, borderColor: `${c.color}40`, background: `${c.color}12` }}>
                      {c.category}
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl font-light tracking-[-0.03em] leading-[1.12] text-[#231911] mb-5">
                      {c.title}
                    </h2>
                    <p className="text-brown-500/55 leading-relaxed mb-8">{c.desc}</p>
                    <MagneticButton to="/contact" variant="lightSecondary" icon={ArrowRight}>
                      {cs.discussProject}
                    </MagneticButton>
                  </Reveal>
                </div>
              </div>
            </div>
            {i < CASE_STUDIES.length - 1 && (
              <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-14">
                <div className="h-px bg-gradient-to-r from-transparent via-brown-500/[0.1] to-transparent" />
              </div>
            )}
          </section>
        );
      })}

      {/* ── CTA ── */}
      <section className="py-6 pb-24 pt-14">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_30px_70px_-20px_rgba(61,35,20,0.35)] text-center py-20 px-8">
            <div className="absolute inset-0 bg-gradient-to-br from-brown-500 via-brown-600 to-[#180F08]" />
            <div className="animate-blob absolute -top-24 -left-24 w-[380px] h-[380px] bg-gold/15 blur-3xl" />
            <Reveal className="relative">
              <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] mb-5 text-white">{cs.nextStory}</h2>
              <p className="text-white/55 mb-8 max-w-xl mx-auto">{cs.nextStoryDesc}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <MagneticButton to="/contact" variant="primary" icon={ArrowRight}>{cs.startConversation}</MagneticButton>
                <MagneticButton to="/specialities" variant="secondary">{cs.ourSpecialities}</MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}