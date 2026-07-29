import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { CursorFollower } from "../components/shared/CursorFollower";
import { AmbientBackground } from "../components/shared/AmbientBackground";
import { ScrollProgress } from "../components/shared/ScrollProgress";
import { SPECIALITIES, MEDIA, SPECIALITY_VIDEOS } from "../data/content";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { useLang } from "../context/LangContext";

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
                  <p className="font-heading text-lg font-light" style={{ color: spec.color }}>{spec.stat}</p>
                  <p className="text-[10px] text-brown-500/40 mb-2">{spec.statLabel}</p>
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
                      <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/95 backdrop-blur-md shadow-lg">
                        <span className="font-heading text-3xl font-light" style={{ color: spec.color }}>{spec.stat}</span>
                        <span className="text-xs text-brown-500/50">{spec.statLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${isEven ? "lg:order-2" : "lg:order-1"} py-6`}>
                  <Reveal className="max-w-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${spec.color}18`, border: `1px solid ${spec.color}35` }}>
                        <spec.icon className="w-6 h-6" style={{ color: spec.color }} />
                      </div>
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
                          <div key={svc} className="flex items-center gap-3 text-sm text-brown-500/60">
                            <Check className="w-4 h-4 shrink-0" style={{ color: spec.color }} />
                            {svc}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <p className="text-[10px] tracking-[0.25em] uppercase text-brown-500/35 mb-4">{s.markets}</p>
                      <div className="flex gap-3">
                        {spec.markets.map((m) => (
                          <span key={m} className="flex items-center gap-1.5 text-xs text-brown-500/45">
                            <MapPin className="w-3 h-3" /> {m}
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