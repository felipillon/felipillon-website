import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { Counter } from "../components/shared/Counter";
import { CursorFollower } from "../components/shared/CursorFollower";
import { AmbientBackground } from "../components/shared/AmbientBackground";
import { ScrollProgress } from "../components/shared/ScrollProgress";
import { SPECIALITIES, MEDIA, SPECIALITY_VIDEOS, SERVICES } from "../data/content";
import { ArrowRight } from "lucide-react";
import { useLang } from "../context/LangContext";

// Beyond staffing, Felipillon also builds technology and drives growth —
// same SERVICES data the old standalone Services page used, minus "Staffing
// & Recruitment" since this entire page already covers that in depth.
const BUSINESS_SERVICES = SERVICES.filter((s) => s.title !== "Staffing & Recruitment");

// One combined total instead of repeating a number on every card/panel —
// summed live from each speciality's stat, so it stays correct automatically
// if those numbers ever change.
const TOTAL_PLACED = SPECIALITIES.reduce((sum, spec) => sum + (parseInt(spec.stat, 10) || 0), 0);

export default function Specialities() {
  const { t } = useLang();
  const s = t.specialities || {};
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

      {/* ── Hero — large type ── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full bg-white border border-brown-500/10 shadow-[0_2px_16px_-4px_rgba(61,35,20,0.1)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">{s.eyebrow || "Specialities"}</span>
          </motion.div>
          <h1 className="font-heading font-light leading-[0.96] tracking-[-0.05em] text-4xl sm:text-6xl lg:text-[5rem] text-[#231911] max-w-4xl">
            {s.title || "Where we deliver results"}
          </h1>
          {s.subtitle && <p className="mt-7 text-lg text-brown-500/55 max-w-2xl leading-relaxed font-light">{s.subtitle}</p>}

          <Reveal delay={0.15}>
            <div className="mt-10 inline-flex items-baseline gap-3 px-6 py-4 rounded-2xl bg-white border border-brown-500/[0.08] shadow-[0_4px_20px_-10px_rgba(61,35,20,0.15)]">
              <span className="font-heading text-4xl sm:text-5xl font-light text-gold-600">
                <Counter value={TOTAL_PLACED} suffix="+" />
              </span>
              <span className="text-sm text-brown-500/50 max-w-[10rem] leading-snug">people and projects placed across all specialities</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Quick jump ── */}
      <div className="sticky top-[68px] z-30 bg-[#FBF8F3]/90 backdrop-blur-md border-y border-brown-500/[0.07]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {SPECIALITIES.map((spec) => (
            <a
              key={spec.id}
              href={`#${spec.id}`}
              className="shrink-0 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border border-brown-500/10 text-brown-500/55 hover:text-[#231911] hover:border-gold/40 transition-colors"
            >
              {spec.name}
            </a>
          ))}
        </div>
      </div>

      {/* ── At a glance — comparison grid ── */}
      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SPECIALITIES.map((spec, i) => (
            <Reveal key={spec.id} delay={i * 0.05}>
              <a href={`#${spec.id}`} className="group block">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="bg-white rounded-2xl border border-brown-500/[0.07] group-hover:border-gold/30 shadow-[0_4px_16px_-10px_rgba(61,35,20,0.15)] group-hover:shadow-[0_12px_30px_-10px_rgba(201,151,58,0.25)] transition-shadow duration-300 p-5 text-center h-full"
                >
                  <div className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-3"
                    style={{ background: `${spec.color}18`, border: `1px solid ${spec.color}35` }}>
                    <spec.icon className="w-5 h-5" style={{ color: spec.color }} />
                  </div>
                  <p className="text-xs font-medium text-[#231911]">{spec.name}</p>
                </motion.div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Per-speciality — sticky image, scrolling detail panel ── */}
      {SPECIALITIES.map((spec, i) => {
        const isEven = i % 2 === 0;
        return (
          <section key={spec.id} id={spec.id} className="relative py-10 scroll-mt-24" data-testid={`speciality-${spec.id}`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                <div className={`${isEven ? "lg:order-1" : "lg:order-2"} lg:sticky lg:top-28`}>
                  <div className="group relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-[0_24px_60px_-16px_rgba(61,35,20,0.25)] border border-white">
                    <motion.div
                      className="absolute inset-0"
                      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.div
                        className="w-full h-full"
                        animate={{ scale: [1, 1.06, 1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {SPECIALITY_VIDEOS[spec.id] ? (
                          <video
                            autoPlay muted loop playsInline
                            poster={SPECIALITY_VIDEOS[spec.id].poster}
                            className="w-full h-full object-cover"
                          >
                            <source src={SPECIALITY_VIDEOS[spec.id].src} type="video/mp4" />
                          </video>
                        ) : (
                          <img src={spec.imgWide || spec.img} alt={spec.name} className="w-full h-full object-cover" loading="lazy" />
                        )}
                      </motion.div>
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md shadow-lg">
                        <spec.icon className="w-4 h-4" style={{ color: spec.color }} />
                        <span className="text-sm font-medium text-[#231911]">{spec.name}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${isEven ? "lg:order-2" : "lg:order-1"} py-6`}>
                  <Reveal className="max-w-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-10 h-px" style={{ background: spec.color }} />
                      <span className="text-[10px] font-bold tracking-[0.35em] uppercase" style={{ color: spec.color }}>
                        {s.eyebrow}
                      </span>
                    </div>
                    <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] leading-[1.06] text-[#231911] mb-5">
                      {spec.name}
                    </h2>
                    <p className="text-brown-500/55 leading-relaxed mb-8">{spec.desc}</p>

                    <div className="mb-8">
                      <p className="text-[10px] tracking-[0.25em] uppercase text-brown-500/35 mb-4">{s.services}</p>
                      <div className="space-y-2.5">
                        {spec.services.map((svc) => (
                          <div key={svc} className="text-sm text-brown-500/60">
                            {svc}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <p className="text-[10px] tracking-[0.25em] uppercase text-brown-500/35 mb-4">{s.markets}</p>
                      <div className="flex gap-3">
                        {spec.markets.map((m) => (
                          <span key={m} className="text-xs text-brown-500/45">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    <MagneticButton to="/open-roles" variant="lightPrimary" icon={ArrowRight}>
                      {s.viewRoles}
                    </MagneticButton>
                  </Reveal>
                </div>
              </div>
            </div>
            {i < SPECIALITIES.length - 1 && (
              <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-14">
                <div className="h-px bg-gradient-to-r from-transparent via-brown-500/[0.1] to-transparent" />
              </div>
            )}
          </section>
        );
      })}

      {/* ── Beyond staffing — Technology & Growth Services (merged in from
           the old standalone Services page) ── */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal className="mb-12">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-gold" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">Beyond Staffing</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] leading-[1.06] text-[#231911] max-w-2xl">
            Technology &amp; growth services
          </h2>
          <p className="text-brown-500/50 mt-3 max-w-2xl">
            Beyond placing talent, Felipillon builds the software and drives the growth strategy behind it.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BUSINESS_SERVICES.map((svc, i) => (
            <Reveal key={svc.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative rounded-2xl overflow-hidden bg-white border border-brown-500/[0.07] hover:border-gold/30 shadow-[0_4px_18px_-8px_rgba(61,35,20,0.12)] hover:shadow-[0_16px_40px_-12px_rgba(201,151,58,0.25)] transition-shadow duration-500 h-full"
              >
                <div className="p-7">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center mb-5 group-hover:bg-gold/15 transition-colors">
                    <svc.icon className="w-6 h-6 text-gold-600" />
                  </div>
                  <h3 className="font-heading text-xl font-medium mb-3 text-[#231911]">{svc.title}</h3>
                  <p className="text-sm text-brown-500/45 leading-relaxed">{svc.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 transition-all duration-500 bg-gold" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-6 pb-24 pt-14">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_30px_70px_-20px_rgba(61,35,20,0.35)] text-center py-20 px-8">
            <div className="absolute inset-0 bg-gradient-to-br from-brown-500 via-brown-600 to-[#180F08]" />
            <div className="animate-blob absolute -bottom-24 -right-24 w-[380px] h-[380px] bg-gold/15 blur-3xl" />
            <Reveal className="relative">
              <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] mb-5 text-white">{s.dontSee}</h2>
              <p className="text-white/55 mb-8 max-w-xl mx-auto">{s.dontSeeDesc}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <MagneticButton to="/contact" variant="primary" icon={ArrowRight}>{s.discussNeeds}</MagneticButton>
                <MagneticButton to="/staffing" variant="secondary">{s.viewStaffing}</MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}