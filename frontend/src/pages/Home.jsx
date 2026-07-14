import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Check, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageDivider } from "../components/layout/Layout";
import { MagneticButton } from "../components/shared/MagneticButton";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { Counter } from "../components/shared/Counter";
import { Globe } from "../components/shared/Globe";
import { Particles } from "../components/shared/Particles";
import { useLang } from "../context/LangContext";
import { SPECIALITIES, WHY, METRICS, TRUSTED, TESTIMONIALS, MEDIA, VIDEO_BG, VIDEO_BG_2, VIDEO_BG_FALLBACK, VIDEO_POSTER } from "../data/content";

// ── Hero with video + particles ───────────────────────────────────────────────
const Hero = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Full-screen video background ── */}
      <div className="absolute inset-0 z-0">
        {/* Poster image loads instantly — shows even if video is blocked */}
        <img
          src={VIDEO_POSTER}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.22) saturate(0.55)" }}
        />

        {/* Video sits on top of poster — replaces it when loaded */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={VIDEO_POSTER}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.22) saturate(0.55)" }}
        >
          <source src={VIDEO_BG} type="video/mp4" />
          <source src={VIDEO_BG_2} type="video/mp4" />
          <source src={VIDEO_BG_FALLBACK} type="video/mp4" />
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Warm gold colour tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C9973A]/[0.06] via-transparent to-[#07070A]/70" />

        {/* Top fade — blends into navbar */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#07070A]/80 to-transparent" />

        {/* Bottom fade — merges into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#07070A] to-transparent" />
      </div>

      {/* Particles layer — sits above video */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <Particles density={30} color="201,151,58" />
      </div>

      {/* Scan lines */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <div className="scan-line" />
        <div className="scan-line" style={{ animationDelay: "4s" }} />
      </div>

      {/* Decorative rings */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] rounded-full border border-[#C9973A]/[0.07] pointer-events-none z-[1]" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[560px] h-[560px] rounded-full border border-[#C9973A]/[0.10] pointer-events-none z-[1]" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full pt-32 pb-24"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 mb-10 rounded-full border border-[#C9973A]/25 bg-[#C9973A]/[0.07] backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9973A] animate-pulse" />
          <span className="text-[#C9973A] text-xs font-semibold tracking-[0.22em] uppercase">
            {t.hero?.badge || "Germany · India · Philippines"}
          </span>
        </motion.div>

        {/* Main headline — staggered line reveal */}
        <h1 className="font-heading font-light leading-[0.93] tracking-[-0.05em]">
          {[t.hero?.line1 || "The Human Side", t.hero?.line2 || "of Intelligent", t.hero?.line3 || "Business"].map((line, i) => (
            <motion.span
              key={i}
              className="block overflow-hidden"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.2 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={`block ${
                i === 1
                  ? "text-5xl sm:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] bg-gradient-to-r from-white via-[#E8C07A] to-[#C9973A] bg-clip-text text-transparent"
                  : "text-5xl sm:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] text-white"
              }`}>{line}</span>
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-10 text-lg sm:text-xl text-white/50 max-w-2xl leading-relaxed font-light"
        >
          {t.hero?.sub || "Elite talent placement and AI-powered software solutions — across Healthcare, Energy, Construction and Technology."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.82 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <MagneticButton to="/staffing" variant="primary" icon={ArrowRight}>
            {t.hero?.cta1 || "Hire Top Talent"}
          </MagneticButton>
          <MagneticButton to="/specialities" variant="secondary">
            {t.hero?.cta2 || "Our Specialities"}
          </MagneticButton>
          <MagneticButton to="/open-roles" variant="ghost">
            {t.hero?.cta3 || "Open Roles"}
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ── Trusted strip ─────────────────────────────────────────────────────────────
const TrustedStrip = () => (
  <div className="border-y border-white/[0.05] bg-white/[0.01] py-10 overflow-hidden">
    <p className="text-center text-[9px] tracking-[0.45em] uppercase text-white/25 mb-7">
      Trusted by enterprise leaders worldwide
    </p>
    <div className="relative">
      <div className="flex w-max gap-0" style={{ animation: "marquee 45s linear infinite" }}>
        {[...TRUSTED, ...TRUSTED].map((name, i) => (
          <div key={i} className="mx-14 font-heading text-lg font-semibold tracking-[0.22em] text-white/15 hover:text-white/40 transition-colors whitespace-nowrap">
            {name}
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#07070A] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#07070A] to-transparent pointer-events-none" />
    </div>
  </div>
);

// ── Who We Are — photo left, text right ──────────────────────────────────────
const WhoWeAre = () => {
  const { t } = useLang();
  const w = t.whoWeAre || {};
  return (
  <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8">
    <div className="grid lg:grid-cols-2 gap-14 items-center">
      <Reveal>
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
          <img
            src={MEDIA.teamMeeting}
            alt="Felipillon team at work"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            style={{ filter: "brightness(0.75) saturate(0.85)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070A]/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="inline-flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3">
              <span className="font-heading text-2xl font-light text-[#C9973A]">500+</span>
              <span className="text-xs text-white/60">{w.stat}</span>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="w-10 h-px bg-[#C9973A]" />
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">{w.eyebrow}</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] leading-[1.06] mb-6">
          {w.title}
        </h2>
        <p className="text-white/50 leading-relaxed mb-4">{w.body1}</p>
        <p className="text-white/40 leading-relaxed mb-10">{w.body2}</p>
        <div className="flex flex-wrap gap-4">
          <MagneticButton to="/about" variant="primary" icon={ArrowRight}>{w.cta1}</MagneticButton>
          <MagneticButton to="/leadership" variant="ghost">{w.cta2}</MagneticButton>
        </div>
      </Reveal>
    </div>
  </section>
  );
};

// ── Specialities — full-bleed photo cards ────────────────────────────────────
const SpecialitiesSection = () => {
  const { t } = useLang();
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-14">
        <Reveal>
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-[#C9973A]" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">
              {t.specialities?.eyebrow || "Specialities"}
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] max-w-3xl leading-[1.06]">
            {t.specialities?.title || "Where we deliver results"}
          </h2>
        </Reveal>
      </div>

      {/* Horizontal scroll of photo cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 px-6 sm:px-8 max-w-7xl mx-auto">
        {SPECIALITIES.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.06}>
            <Link to="/specialities">
              <div
                className="group relative overflow-hidden aspect-[4/3] cursor-pointer"
                data-testid={`speciality-${s.id}`}
              >
                {/* Photo */}
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  style={{ filter: "brightness(0.45) saturate(0.75)" }}
                  loading="lazy"
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-7 flex flex-col justify-end">
                  <div className="mb-auto">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-0"
                      style={{ background: `${s.color}20`, border: `1px solid ${s.color}40` }}>
                      <s.icon className="w-5 h-5" style={{ color: s.color }} />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <span className="text-2xl font-heading font-light text-[#C9973A]">{s.stat}</span>
                      <span className="text-xs text-white/40 ml-2">{s.statLabel}</span>
                    </div>
                    <h3 className="font-heading text-xl font-medium text-white mb-2">{s.name}</h3>
                    <p className="text-sm text-white/50 leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0 transition-transform">
                      {s.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: s.color }}>
                      Explore <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
                {/* Color bottom bar */}
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 transition-all duration-500"
                  style={{ background: s.color }} />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

// ── Full-bleed photo break ────────────────────────────────────────────────────
const PhotoBreak = () => (
  <div className="relative h-[50vh] overflow-hidden">
    <img
      src={MEDIA.officeWide}
      alt="Felipillon office"
      className="w-full h-full object-cover"
      style={{ filter: "brightness(0.25) saturate(0.6)" }}
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-[#07070A] via-transparent to-[#07070A]" />
    <div className="absolute inset-0 flex items-center justify-center">
      <Reveal>
        <blockquote className="text-center max-w-3xl px-6">
          <p className="font-heading text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-relaxed tracking-[-0.02em]">
            "We focus on real business problems, not just services. Long-term value over short-term fees."
          </p>
          <cite className="block mt-6 text-[#C9973A] text-sm tracking-widest not-italic">
            — Ketan Bhanudas Barve, CEO
          </cite>
        </blockquote>
      </Reveal>
    </div>
  </div>
);

// ── Why section — alternating image + text ────────────────────────────────────
const WhySection = () => {
  const { t } = useLang();
  return (
    <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <Reveal className="mb-14">
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="w-10 h-px bg-[#C9973A]" />
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">
            {t.why?.eyebrow || "Why Felipillon"}
          </span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] max-w-2xl leading-[1.06]">
          {t.why?.title || "Built for enterprises that can't afford to compromise"}
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {WHY.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.07}>
            <GlowCard className="p-7 h-full group">
              <div className="w-11 h-11 rounded-xl bg-[#C9973A]/10 border border-[#C9973A]/20 flex items-center justify-center mb-5 group-hover:bg-[#C9973A]/15 transition-colors">
                <w.icon className="w-5 h-5 text-[#C9973A]" />
              </div>
              <h4 className="font-heading text-lg font-medium mb-2">{w.title}</h4>
              <p className="text-sm text-white/40 leading-relaxed">{w.desc}</p>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

// ── Metrics ───────────────────────────────────────────────────────────────────
const MetricsSection = () => {
  const { t } = useLang();
  const labels = [
    t.metrics?.placementsMade    || t.metrics?.placements    || "Placements Made",
    t.metrics?.projectsDelivered || t.metrics?.projects      || "Projects Delivered",
    t.metrics?.countryOffices    || t.metrics?.offices       || "Country Offices",
    t.metrics?.clientSatisfaction|| t.metrics?.satisfaction  || "Client Satisfaction",
  ];
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={MEDIA.team} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.12) saturate(0.5)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070A] via-transparent to-[#07070A]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.1}>
              <div className="py-8">
                <div className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light bg-gradient-to-r from-[#E8C07A] to-[#C9973A] bg-clip-text text-transparent">
                  <Counter value={m.value} suffix={m.suffix} />
                </div>
                <p className="mt-3 text-xs tracking-[0.22em] uppercase text-white/35">{labels[i]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};



// ── Testimonials ──────────────────────────────────────────────────────────────
const TestimonialsSection = () => {
  const { t } = useLang();
  return (
    <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <Reveal className="mb-14">
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="w-10 h-px bg-[#C9973A]" />
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">
            {t.testimonials?.eyebrow || "Testimonials"}
          </span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] leading-[1.06]">
          {t.testimonials?.title || "Trusted by the people we serve"}
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-5">
        {TESTIMONIALS.map((tm, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <GlowCard className="p-8 h-full">
              <div className="mb-6">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-[#C9973A] text-lg">★</span>
                ))}
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-white/70 italic mb-6">
                "{tm.quote}"
              </p>
              <div className="flex items-center gap-4 pt-5 border-t border-white/[0.07]">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#C9973A] to-[#8A6020] flex items-center justify-center text-black font-bold text-sm shrink-0">
                  {tm.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">{tm.name}</p>
                  <p className="text-xs text-white/35 mt-0.5">{tm.title}</p>
                </div>
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>

      <div className="text-center mt-10">
        <MagneticButton to="/testimonials" variant="ghost" icon={ArrowRight}>
          {t.readStories || "Read all stories"}
        </MagneticButton>
      </div>
    </section>
  );
};

// ── Global footprint ──────────────────────────────────────────────────────────
const FootprintSection = () => {
  const { t } = useLang();
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-[#C9973A]" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">
              {t.footprint?.eyebrow || "Global Footprint"}
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] leading-[1.06] mb-5">
            {t.footprint?.title || "Three countries. One seamless network."}
          </h2>
          <p className="text-white/45 leading-relaxed mb-10">
            {t.footprint?.subtitle || "Operating across Europe and Asia-Pacific with a follow-the-sun model that delivers talent and technology around the clock."}
          </p>

          {[
            { flag: "🇩🇪", country: "Germany", entity: "Felipillon UG", role: "Global Headquarters", img: MEDIA.berlin },
            { flag: "🇮🇳", country: "India", entity: "Felipillon Innovation Pvt. Ltd.", role: "Technology Hub", img: MEDIA.india },
            { flag: "🇵🇭", country: "Philippines", entity: "Felipillon OPC", role: "Asia-Pacific Operations", img: MEDIA.philippines },
          ].map((loc, i) => (
            <Reveal key={loc.country} delay={i * 0.1}>
              <div className="flex items-center gap-4 p-4 mb-3 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-[#C9973A]/25 hover:bg-[#C9973A]/[0.03] transition-all duration-300 group">
                <div className="relative w-14 h-10 rounded-md overflow-hidden shrink-0">
                  <img src={loc.img} alt={loc.country} className="w-full h-full object-cover" style={{ filter: "brightness(0.6)" }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{loc.flag}</span>
                    <span className="font-medium text-white text-sm">{loc.country}</span>
                    <span className="text-xs text-[#C9973A]">· {loc.role}</span>
                  </div>
                  <p className="text-xs text-white/30 mt-0.5">{loc.entity}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </Reveal>

        <Reveal delay={0.2}>
          <Globe />
        </Reveal>
      </div>
    </section>
  );
};

// ── Final CTA ─────────────────────────────────────────────────────────────────
const CTASection = () => {
  const { t } = useLang();
  return (
    <section className="py-6">
      <div className="relative overflow-hidden mx-6 sm:mx-8 rounded-2xl">
        <img
          src={MEDIA.aboutTeam}
          alt="team"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.2) saturate(0.5)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070A]/90 via-[#07070A]/70 to-transparent" />
        <div className="relative px-10 sm:px-16 py-20 max-w-2xl">
          <Reveal>
            <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] leading-[1.06] mb-5">
              {t.cta?.title || "Let's build your competitive advantage"}
            </h2>
            <p className="text-white/45 mb-8 leading-relaxed">
              {t.cta?.sub || "Whether you need elite talent or transformative software, our teams are ready."}
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton to="/contact" variant="primary" icon={ArrowRight}>
                {t.cta?.btn1 || "Send Inquiry"}
              </MagneticButton>
              <MagneticButton to="/open-roles" variant="secondary">
                {t.cta?.btn2 || "View Open Roles"}
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ── Main export ───────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Hero />
      <TrustedStrip />
      <WhoWeAre />
      <SpecialitiesSection />
      <PhotoBreak />
      <WhySection />
      <MetricsSection />
      <FootprintSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}