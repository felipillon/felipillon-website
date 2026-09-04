import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { Counter } from "../components/shared/Counter";
import { CursorFollower } from "../components/shared/CursorFollower";
import { AmbientBackground } from "../components/shared/AmbientBackground";
import { ScrollProgress } from "../components/shared/ScrollProgress";
import { SPECIALITIES, MEDIA, SPECIALITY_VIDEOS, SERVICES } from "../data/content";
import { CARD_TEXT } from "../data/cardTranslations";
import { ArrowRight } from "lucide-react";
import { useLang } from "../context/LangContext";

// Beyond staffing, Felipillon also builds technology and drives growth —
// same SERVICES data the old standalone Services page used, minus "Staffing
// & Recruitment" since this entire page already covers that in depth.
const BUSINESS_SERVICES = SERVICES.filter((s) => s.title !== "Staffing & Recruitment");
const TECH_STACK = ["React", "TypeScript", "Next.js", "Python", "FastAPI", "PostgreSQL", "AWS", "GCP", "Kubernetes", "LangChain", "TailwindCSS", "Node.js"];

// CEO-confirmed headline number for the specialities stat widget.
const TOTAL_PLACED = 200;

export default function Specialities() {
  const { t, lang } = useLang();
  const s = t.specialities || {};
  const ct = CARD_TEXT[lang]?.specialities || {};
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
              <span className="text-sm text-brown-500/50 max-w-[10rem] leading-snug">{s.placedLabel || "people and projects placed across all specialities"}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Quick jump ── */}
      <div className="sticky top-[68px] z-30 bg-[#FBF8F3]/90 backdrop-blur-md border-y border-brown-500/[0.07]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {SPECIALITIES.map((spec) => {
            const trName = ct[spec.id]?.name || spec.name;
            return (
              <a
                key={spec.id}
                href={`#${spec.id}`}
                className="shrink-0 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border border-brown-500/10 text-brown-500/55 hover:text-[#231911] hover:border-gold/40 transition-colors"
              >
                {trName}
              </a>
            );
          })}
          <a
            href="#technology-growth-services"
            className="shrink-0 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border border-brown-500/10 text-brown-500/55 hover:text-[#231911] hover:border-gold/40 transition-colors"
          >
            {s.techGrowthLabel || "Technology & Growth Services"}
          </a>
        </div>
      </div>

      {/* ── At a glance — comparison grid ── */}
      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SPECIALITIES.map((spec, i) => {
            const trName = ct[spec.id]?.name || spec.name;
            return (
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
                  <p className="text-xs font-medium text-[#231911]">{trName}</p>
                </motion.div>
              </a>
            </Reveal>
          );})}
        </div>
      </section>

      {/* ── Per-speciality — sticky image, scrolling detail panel ── */}
      {SPECIALITIES.map((spec, i) => {
        const isEven = i % 2 === 0;
        const tr = ct[spec.id] || {};
        const trName = tr.name || spec.name;
        const trDesc = tr.desc || spec.desc;
        const trServices = tr.services || spec.services;
        const trMarkets = tr.markets || spec.markets;
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
                          <img src={spec.imgWide || spec.img} alt={trName} className="w-full h-full object-cover" loading="lazy" />
                        )}
                      </motion.div>
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md shadow-lg">
                        <spec.icon className="w-4 h-4" style={{ color: spec.color }} />
                        <span className="text-sm font-medium text-[#231911]">{trName}</span>
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
                      <span className="w-10 h-px" style={{ background: spec.color }} />
                    </div>
                    <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] leading-[1.06] text-[#231911] mb-5">
                      {trName}
                    </h2>
                    <p className="text-brown-500/55 leading-relaxed mb-8">{trDesc}</p>

                    <div className="mb-8">
                      <p className="text-[10px] tracking-[0.25em] uppercase text-brown-500/35 mb-4">{s.services}</p>
                      <div className="space-y-2.5">
                        {trServices.map((svc) => (
                          <div key={svc} className="text-sm text-brown-500/60">
                            {svc}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <p className="text-[10px] tracking-[0.25em] uppercase text-brown-500/35 mb-4">{s.markets}</p>
                      <div className="flex gap-3">
                        {trMarkets.map((m) => (
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

      {/* ── Beyond staffing — Technology & Growth Services ── */}
      <section id="technology-growth-services" className="py-20 max-w-7xl mx-auto px-6 sm:px-8 scroll-mt-24">
        <Reveal className="mb-12">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-gold" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">{s.beyondEyebrow || "Beyond Staffing"}</span>
            <span className="w-10 h-px bg-gold" />
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] leading-[1.06] text-[#231911] max-w-2xl">
            {s.beyondTitle || "Technology & growth services"}
          </h2>
          <p className="text-brown-500/50 mt-3 max-w-2xl">
            {s.beyondDesc || "Beyond placing talent, Felipillon builds the software and drives the growth strategy behind it."}
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BUSINESS_SERVICES.map((svc, i) => {
            const trSvc = (CARD_TEXT[lang]?.services || [])[i + 1] || {};
            const svcTitle = trSvc.title || svc.title;
            const svcDesc = trSvc.desc || svc.desc;
            return (
            <Reveal key={svc.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative rounded-2xl overflow-hidden bg-white border border-brown-500/[0.07] hover:border-gold/30 shadow-[0_4px_18px_-8px_rgba(61,35,20,0.12)] hover:shadow-[0_16px_40px_-12px_rgba(201,151,58,0.25)] transition-shadow duration-500 h-full"
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={svc.img} alt={svcTitle} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-black/5 to-transparent" />
                </div>
                <div className="p-7">
                  <h3 className="font-heading text-xl font-semibold mb-3 text-[#1A0E08]">{svcTitle}</h3>
                  <p className="text-sm font-medium text-brown-500/70 leading-relaxed">{svcDesc}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 transition-all duration-500 bg-gold" />
              </motion.div>
            </Reveal>
          );})}
        </div>

        <Reveal className="mt-14">
          <div className="rounded-2xl bg-white border border-brown-500/[0.07] p-7 sm:p-8 shadow-[0_4px_18px_-10px_rgba(61,35,20,0.15)]">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-7">
              <div className="max-w-md">
                <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600 mb-3">{s.techStackLabel || "Tech Stack"}</p>
                <h3 className="font-heading text-2xl sm:text-3xl font-light tracking-[-0.03em] text-[#231911]">
                  {s.techStackTitle || "Modern by default"}
                </h3>
                <p className="mt-3 text-sm text-brown-500/50 leading-relaxed">
                  {s.techStackDesc || "Production-grade platforms built for scale, security and maintainable delivery."}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 lg:max-w-2xl">
                {TECH_STACK.map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-full bg-[#FBF8F3] border border-brown-500/[0.08] text-xs font-medium text-brown-500/62">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
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
