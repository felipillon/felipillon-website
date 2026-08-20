import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { Counter } from "../components/shared/Counter";
import { MagneticButton } from "../components/shared/MagneticButton";
import { CursorFollower } from "../components/shared/CursorFollower";
import { AmbientBackground } from "../components/shared/AmbientBackground";
import { ScrollProgress } from "../components/shared/ScrollProgress";
import { VALUES, TIMELINE, MEDIA, WHY_WIN, ABOUT_VIDEO_BG } from "../data/content";
import { ArrowRight, Check } from "lucide-react";
import { useLang } from "../context/LangContext";

// ── Reveal-wipe photo panel — scroll-triggered mask reveal + slow Ken Burns
// zoom, same motion language used on the (light) Home page. ────────────────
const RevealPhoto = ({ src, alt = "", className = "", children, delay = 0 }) => (
  <div className={`group relative overflow-hidden ${className}`}>
    <motion.div
      className="absolute inset-0"
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="w-full h-full"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      </motion.div>
    </motion.div>
    {children}
  </div>
);

export default function About() {
  const { t } = useLang();
  const a = t.about || {};
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

      {/* ── Hero — large type, light, reveal photo ── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full bg-white border border-brown-500/10 shadow-[0_2px_16px_-4px_rgba(61,35,20,0.1)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">
                {a.eyebrow || "About Felipillon"}
              </span>
            </motion.div>
            <h1 className="font-heading font-light leading-[0.96] tracking-[-0.05em] text-4xl sm:text-6xl lg:text-[5rem] text-[#231911] max-w-3xl">
              {a.title || "Connecting people with opportunity"}
            </h1>
            {a.subtitle && (
              <p className="mt-7 text-lg text-brown-500/55 max-w-xl leading-relaxed font-light">{a.subtitle}</p>
            )}
          </div>
          <RevealPhoto src={MEDIA.about} alt="Felipillon" className="rounded-[2rem] aspect-[4/3] shadow-[0_24px_60px_-16px_rgba(61,35,20,0.25)] border border-white" />
        </div>
      </section>

      {/* ── Mission split ── */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-gold" />
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">{a.missionEyebrow}</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] leading-[1.06] mb-6 text-[#231911]">
              {a.missionTitle}
            </h2>
            <p className="text-brown-500/55 leading-relaxed mb-4">{a.missionBody1}</p>
            <p className="text-brown-500/40 leading-relaxed mb-8">{a.missionBody2}</p>
            <div className="space-y-3">
              {WHY_WIN.slice(0, 4).map((w, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-gold-600" />
                  </div>
                  <p className="text-sm text-brown-500/60 leading-relaxed">{w}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-4">
              <RevealPhoto src={MEDIA.aboutTeam} alt="Felipillon team" className="rounded-2xl aspect-video shadow-[0_20px_50px_-16px_rgba(61,35,20,0.22)]" />
              <div className="grid grid-cols-2 gap-4">
                <RevealPhoto src={MEDIA.berlinOffice} alt="Berlin office" className="rounded-xl aspect-square shadow-[0_16px_40px_-16px_rgba(61,35,20,0.2)]" delay={0.1}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs text-gold-300 font-semibold">Germany</p>
                    <p className="text-xs text-white/60">Global HQ</p>
                  </div>
                </RevealPhoto>
                <RevealPhoto src={MEDIA.teamWork} alt="Team working" className="rounded-xl aspect-square shadow-[0_16px_40px_-16px_rgba(61,35,20,0.2)]" delay={0.18}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs text-gold-300 font-semibold">India + Philippines</p>
                    <p className="text-xs text-white/60">Tech &amp; Ops</p>
                  </div>
                </RevealPhoto>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Metrics — dark contrast band ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <div className="relative rounded-[2.5rem] overflow-hidden py-16 sm:py-20 px-8 shadow-[0_30px_70px_-20px_rgba(61,35,20,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-br from-brown-500 via-brown-600 to-[#180F08]" />
          <div className="animate-blob absolute -top-24 -right-24 w-[420px] h-[420px] bg-gold/15 blur-3xl" />
          <div className="animate-blob-slow absolute -bottom-24 -left-24 w-[420px] h-[420px] bg-gold/10 blur-3xl" />
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { val: 500, suf: "+", label: t.metrics?.placementsMade },
              { val: 50,  suf: "+", label: t.metrics?.projectsDelivered },
              { val: 3,   suf: "",  label: t.metrics?.countryOffices },
              { val: 95,  suf: "%", label: t.metrics?.clientSatisfaction },
            ].map((m, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="py-4">
                  <div className="font-heading text-5xl sm:text-6xl font-light bg-gradient-to-r from-gold-300 to-gold bg-clip-text text-transparent">
                    <Counter value={m.val} suffix={m.suf} />
                  </div>
                  <p className="mt-3 text-xs tracking-[0.22em] uppercase text-white/45">{m.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── Values — numbered bento cards ── */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal className="mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-gold" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">{a.valuesEyebrow}</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] text-[#231911]">{a.valuesTitle}</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <GlowCard variant="light" className="p-7 h-full">
                <div className="font-heading text-5xl font-light text-gold/25 mb-4">0{i + 1}</div>
                <h3 className="font-heading text-xl font-medium mb-3 text-[#231911]">{v.title}</h3>
                <p className="text-sm text-brown-500/45 leading-relaxed">{v.desc}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Life at Felipillon — photo mosaic ── */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal className="mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-gold" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">Culture</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] text-[#231911]">Life at Felipillon</h2>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { video: true, span: "lg:col-span-2 lg:row-span-2", aspect: "aspect-square lg:aspect-auto" },
            { src: MEDIA.teamWork, span: "", aspect: "aspect-square" },
            { src: MEDIA.aboutTeam, span: "", aspect: "aspect-square" },
            { src: MEDIA.teamMeeting, span: "", aspect: "aspect-square" },
            { src: MEDIA.berlinOffice, span: "", aspect: "aspect-square" },
          ].map((g, i) => (
            <Reveal key={i} delay={i * 0.06} className={g.span}>
              <div className={`group relative overflow-hidden rounded-2xl ${g.aspect} h-full shadow-[0_8px_24px_-12px_rgba(61,35,20,0.2)]`}>
                {g.video ? (
                  <video autoPlay muted loop playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <source src={ABOUT_VIDEO_BG} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={g.src}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Timeline — sticky rail ── */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-14">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="w-10 h-px bg-gold" />
                <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">{a.journeyEyebrow}</span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] text-[#231911]">{a.journeyTitle}</h2>
            </Reveal>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent ml-4 hidden sm:block" />
            <div className="space-y-8">
              {TIMELINE.map((tl, i) => (
                <Reveal key={tl.year} delay={i * 0.08}>
                  <div className="sm:pl-14 relative">
                    <div className="absolute left-0 top-1.5 w-9 h-9 rounded-full bg-gold/15 border border-gold/40 items-center justify-center hidden sm:flex">
                      <div className="w-2 h-2 rounded-full bg-gold" />
                    </div>
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="font-heading text-2xl font-light text-gold-600">{tl.year}</span>
                      <h4 className="font-heading text-xl font-medium text-[#231911]">{tl.title}</h4>
                    </div>
                    <p className="text-sm text-brown-500/45 leading-relaxed">{tl.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-6 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_30px_70px_-20px_rgba(61,35,20,0.35)] text-center py-20 px-8">
            <div className="absolute inset-0 bg-gradient-to-br from-brown-500 via-brown-600 to-[#180F08]" />
            <div className="animate-blob absolute -top-24 -left-24 w-[380px] h-[380px] bg-gold/15 blur-3xl" />
            <Reveal className="relative">
              <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] mb-5 text-white">{a.readyTitle}</h2>
              <p className="text-white/55 mb-8 max-w-xl mx-auto">{a.readyDesc}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <MagneticButton to="/contact" variant="primary" icon={ArrowRight}>{a.getInTouch}</MagneticButton>
                <MagneticButton to="/team" variant="secondary">{a.meetTeam}</MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}