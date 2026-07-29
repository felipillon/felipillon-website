import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MagneticButton } from "../components/shared/MagneticButton";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { Counter } from "../components/shared/Counter";
import { Globe } from "../components/shared/Globe";
import { CursorFollower } from "../components/shared/CursorFollower";
import { useLang } from "../context/LangContext";
import { SPECIALITIES, WHY, METRICS, TRUSTED, TESTIMONIALS, MEDIA, VIDEO_BG, VIDEO_POSTER, HERO_VIDEOS } from "../data/content";
import { CARD_TEXT } from "../data/cardTranslations";

// ── Reusable tilt wrapper — cursor-reactive 3D tilt for photo/video panels ──
const TiltPanel = ({ children, className = "", strength = 8 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), { stiffness: 150, damping: 20 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ── Floating blob background (decorative, animated) ─────────────────────────
const BlobField = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="animate-blob absolute -top-40 -left-32 w-[560px] h-[560px] bg-gradient-to-br from-gold/20 via-gold-300/15 to-transparent blur-3xl" />
    <div className="animate-blob-slow absolute top-1/3 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-cream-300/60 via-gold/10 to-transparent blur-3xl" />
    <div className="animate-blob absolute -bottom-32 left-1/4 w-[440px] h-[440px] bg-gradient-to-tr from-gold-300/20 to-transparent blur-3xl" style={{ animationDelay: "3s" }} />
  </div>
);

// ── Hero — occupation video carousel ─────────────────────────────────────
// Cycles through real footage of each speciality (staffing, healthcare,
// construction, technology) with a crossfade, clickable tabs and a
// progress bar — so the hero actually shows the kind of work Felipillon does.
const Hero = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % HERO_VIDEOS.length), 6000);
    return () => clearInterval(id);
  }, []);

  const current = HERO_VIDEOS[active];

  return (
    <section ref={ref} className="relative min-h-screen flex items-end overflow-hidden">

      {/* ── Hero video — 4-clip carousel, light/white wash instead of dark tint ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={current.src}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img src={current.poster} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <video autoPlay muted loop playsInline poster={current.poster} className="absolute inset-0 w-full h-full object-cover">
              <source src={current.src} type="video/mp4" />
            </video>
          </motion.div>
        </AnimatePresence>

        {/* White/cream wash — strongest where the text sits, fading elsewhere. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FBF8F3]/92 via-[#FBF8F3]/55 to-[#FBF8F3]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FBF8F3]/80 via-transparent to-[#FBF8F3]/25" />
        <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-[#FBF8F3] via-[#FBF8F3]/50 to-transparent" />
      </div>

      {/* Decorative rings */}
      <motion.div
        className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-1/3 w-[760px] h-[760px] rounded-full border border-[#C9973A]/[0.14] pointer-events-none z-[1]"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-1/3 w-[540px] h-[540px] rounded-full border border-[#C9973A]/[0.2] pointer-events-none z-[1]"
        animate={{ rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full pt-40 pb-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 mb-9 rounded-full bg-white border border-brown-500/10 shadow-[0_2px_16px_-4px_rgba(61,35,20,0.15)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-gold-600 text-xs font-semibold tracking-[0.22em] uppercase">
            {t.hero?.badge || "Germany · India · Philippines · Italy"}
          </span>
        </motion.div>

        {/* Main headline */}
        <h1 className="font-heading font-light leading-[0.95] tracking-[-0.05em] max-w-4xl">
          {[t.hero?.line1 || "The Human Side", t.hero?.line2 || "of Intelligent", t.hero?.line3 || "Business"].map((line, i) => (
            <motion.span
              key={i}
              className="block overflow-hidden"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.05, delay: 0.15 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={`block text-4xl sm:text-6xl lg:text-[5.4rem] xl:text-[6.2rem] ${
                i === 1
                  ? "bg-gradient-to-r from-gold-600 via-gold to-gold-700 bg-clip-text text-transparent"
                  : "text-[#231911]"
              }`}>{line}</span>
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-7 text-lg sm:text-xl text-brown-500/60 max-w-2xl leading-relaxed font-light"
        >
          {t.hero?.sub || "Elite talent placement and AI-powered software solutions — across Healthcare, Energy, Construction and Technology."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <MagneticButton to="/staffing" variant="lightPrimary" icon={ArrowRight}>
            {t.hero?.cta1 || "Hire Top Talent"}
          </MagneticButton>
          <MagneticButton to="/specialities" variant="lightSecondary">
            {t.hero?.cta2 || "Our Specialities"}
          </MagneticButton>
          <MagneticButton to="/open-roles" variant="lightGhost">
            {t.hero?.cta3 || "Open Roles"}
          </MagneticButton>
        </motion.div>

      </motion.div>
    </section>
  );
};

// ── Trusted strip ─────────────────────────────────────────────────────────
const TrustedStrip = () => (
  <div className="relative border-y border-brown-500/[0.07] bg-[#FBF8F3] py-10 overflow-hidden">
    <p className="text-center text-[9px] tracking-[0.45em] uppercase text-brown-500/40 mb-7">
      Trusted by enterprise leaders worldwide
    </p>
    <div className="relative">
      <div className="flex w-max gap-0" style={{ animation: "marquee 45s linear infinite" }}>
        {[...TRUSTED, ...TRUSTED].map((name, i) => (
          <div key={i} className="mx-14 font-heading text-lg font-semibold tracking-[0.22em] text-brown-500/45 hover:text-gold-600 transition-colors whitespace-nowrap">
            {name}
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#FBF8F3] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#FBF8F3] to-transparent pointer-events-none" />
    </div>
  </div>
);

// ── Who We Are ───────────────────────────────────────────────────────────
const WhoWeAre = () => {
  const { t } = useLang();
  const w = t.whoWeAre || {};
  return (
    <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <TiltPanel className="relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-[0_24px_60px_-16px_rgba(61,35,20,0.25)] border border-white group" strength={5}>
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="w-full h-full"
                animate={{ scale: [1, 1.09, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={MEDIA.teamMeeting}
                  alt="Felipillon team at work"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-xl px-5 py-3 shadow-lg">
                <span className="font-heading text-2xl font-medium text-gold-600">500+</span>
                <span className="text-xs text-brown-500/60">{w.stat}</span>
              </div>
            </div>
          </TiltPanel>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-gold" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">{w.eyebrow}</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.06] mb-6 text-[#231911]">
            {w.title}
          </h2>
          <p className="text-brown-500/60 leading-relaxed mb-4">{w.body1}</p>
          <p className="text-brown-500/45 leading-relaxed mb-8">{w.body2}</p>

          <div className="flex flex-wrap gap-4">
            <MagneticButton to="/about" variant="lightPrimary" icon={ArrowRight}>{w.cta1}</MagneticButton>
            <MagneticButton to="/team" variant="lightGhost">{w.cta2}</MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ── Specialities — a complete circle of cards, always fully formed, that
// continuously and slowly rotates on its own. Hover the section to pause it
// so you can read a card; move away and it keeps spinning. ────────────────
const ORBIT_TILT = 55; // small vertical ellipse so it reads as a turning wheel, not a flat slider

const OrbitCard = ({ item, index, count, rotation, radius, cardW, cardH, onOpen, tr }) => {
  const baseAngle = (360 / count) * index;
  const theta = useTransform(rotation, (r) => ((baseAngle + r) * Math.PI) / 180);
  const x = useTransform(theta, (t) => Math.sin(t) * radius);
  const y = useTransform(theta, (t) => Math.cos(t) * -ORBIT_TILT);
  const depth = useTransform(theta, (t) => Math.cos(t)); // -1 (back) .. 1 (front)
  const scale = useTransform(depth, [-1, 1], [0.72, 1.08]);
  const opacity = useTransform(depth, [-1, 1], [0.55, 1]);
  const blurPx = useTransform(depth, [-1, 0.4], [2.5, 0]);
  const filter = useTransform(blurPx, (b) => `blur(${Math.max(b, 0)}px)`);
  const zIndex = useTransform(depth, (d) => Math.round(d * 15) + 15);
  const name = tr?.name ?? item.name;
  const desc = tr?.desc ?? item.desc;
  const statLabel = tr?.statLabel ?? item.statLabel;

  return (
    <motion.div
      onClick={onOpen}
      whileHover={{ filter: "brightness(1.05)" }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group absolute top-1/2 left-1/2 rounded-[1.75rem] overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_-12px_rgba(201,151,58,0.4)] cursor-pointer"
      style={{
        x, y, scale, opacity, zIndex, filter,
        width: cardW, height: cardH,
        marginLeft: -cardW / 2, marginTop: -cardH / 2,
      }}
    >
      <img src={item.img} alt={name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/30 to-black/5" />

      <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between">
        <div
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center"
          style={{ background: `${item.color}30`, border: `1px solid ${item.color}60` }}
        >
          <item.icon className="w-5 h-5" style={{ color: item.color }} />
        </div>

        <div>
          <div className="mb-2">
            <span className="text-xl sm:text-2xl font-heading font-light text-gold-300">{item.stat}</span>
            <span className="text-xs sm:text-sm text-white/50 ml-1.5">{statLabel}</span>
          </div>
          <h4 className="font-heading text-white text-base sm:text-lg font-medium mb-1.5">{name}</h4>
          <p className="text-white/55 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-2 hidden sm:block">{desc}</p>
          <div
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ color: item.color }}
          >
            Explore <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 transition-all duration-500" style={{ background: item.color }} />
    </motion.div>
  );
};

const SpecialitiesSection = () => {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const rotation = useMotionValue(0);
  const controlsRef = useRef(null);
  const [radius, setRadius] = useState(210);

  useEffect(() => {
    const setR = () => {
      const w = window.innerWidth;
      setRadius(w < 480 ? 170 : w < 640 ? 250 : w < 1024 ? 330 : 400);
    };
    setR();
    window.addEventListener("resize", setR);
    return () => window.removeEventListener("resize", setR);
  }, []);

  useEffect(() => {
    controlsRef.current = animate(rotation, rotation.get() - 360, { duration: 46, repeat: Infinity, ease: "linear" });
    return () => controlsRef.current?.stop();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const cardW = radius < 220 ? 165 : radius < 290 ? 205 : radius < 360 ? 250 : 295;
  const cardH = radius < 220 ? 215 : radius < 290 ? 265 : radius < 360 ? 320 : 380;
  const stageSize = radius * 2 + cardH + 40;

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-10">
        <Reveal>
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-gold" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">
              {t.specialities?.eyebrow || "Specialities"}
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.03em] max-w-3xl leading-[1.06] text-[#231911]">
            {t.specialities?.title || "Where we deliver results"}
          </h2>
        </Reveal>
      </div>

      <div
        className="relative isolate mx-auto flex items-center justify-center select-none"
        style={{ height: stageSize, maxWidth: stageSize }}
        onMouseEnter={() => controlsRef.current?.pause()}
        onMouseLeave={() => controlsRef.current?.play()}
      >
        {SPECIALITIES.map((item, i) => (
          <OrbitCard
            key={item.id}
            item={item}
            index={i}
            count={SPECIALITIES.length}
            rotation={rotation}
            radius={radius}
            cardW={cardW}
            cardH={cardH}
            onOpen={() => navigate("/specialities")}
            tr={CARD_TEXT[lang]?.specialities?.[item.id]}
          />
        ))}
      </div>

      <p className="text-center text-xs text-brown-500/35 mt-8 tracking-wide">Hover to pause · click a card to explore</p>
    </section>
  );
};

// ── Quote break ───────────────────────────────────────────────────────────
const PhotoBreak = () => (
  <div className="max-w-7xl mx-auto px-6 sm:px-8">
    <div className="relative h-[46vh] min-h-[340px] overflow-hidden rounded-[2.5rem] shadow-[0_30px_70px_-20px_rgba(61,35,20,0.3)]">
      <img src={MEDIA.officeWide} alt="Felipillon office" className="w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Reveal>
          <blockquote className="text-center max-w-3xl px-8">
            <p className="font-heading text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-relaxed tracking-[-0.02em]">
              "We focus on real business problems, not just services. Long-term value over short-term fees."
            </p>
            <cite className="block mt-6 text-gold-300 text-sm tracking-widest not-italic">
              — Ketan Bhanudas Barve, CEO
            </cite>
          </blockquote>
        </Reveal>
      </div>
    </div>
  </div>
);

// ── Why section ───────────────────────────────────────────────────────────
const WhySection = () => {
  const { t } = useLang();
  return (
    <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <Reveal className="mb-14">
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="w-10 h-px bg-gold" />
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">
            {t.why?.eyebrow || "Why Felipillon"}
          </span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.03em] max-w-2xl leading-[1.06] text-[#231911]">
          {t.why?.title || "Built for enterprises that can't afford to compromise"}
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {WHY.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.07}>
            <GlowCard variant="light" className="p-7 h-full group">
              <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center mb-5 group-hover:bg-gold/15 transition-colors">
                <w.icon className="w-5 h-5 text-gold-600" />
              </div>
              <h4 className="font-heading text-lg font-medium mb-2 text-[#231911]">{w.title}</h4>
              <p className="text-sm text-brown-500/50 leading-relaxed">{w.desc}</p>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

// ── Metrics — bold dark contrast band ────────────────────────────────────
const MetricsSection = () => {
  const { t } = useLang();
  const labels = [
    t.metrics?.placementsMade    || t.metrics?.placements    || "Placements Made",
    t.metrics?.projectsDelivered || t.metrics?.projects      || "Projects Delivered",
    t.metrics?.countryOffices    || t.metrics?.offices       || "Country Offices",
    t.metrics?.clientSatisfaction|| t.metrics?.satisfaction  || "Client Satisfaction",
  ];
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
      <div className="relative rounded-[2.5rem] overflow-hidden py-16 sm:py-20 px-8 shadow-[0_30px_70px_-20px_rgba(61,35,20,0.4)]">
        <div className="absolute inset-0 bg-gradient-to-br from-brown-500 via-brown-600 to-[#180F08]" />
        <div className="animate-blob absolute -top-24 -right-24 w-[420px] h-[420px] bg-gold/15 blur-3xl" />
        <div className="animate-blob-slow absolute -bottom-24 -left-24 w-[420px] h-[420px] bg-gold/10 blur-3xl" />
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.1}>
              <div className="py-4">
                <div className="font-heading text-5xl sm:text-6xl font-light bg-gradient-to-r from-gold-300 to-gold bg-clip-text text-transparent">
                  <Counter value={m.value} suffix={m.suffix} />
                </div>
                <p className="mt-3 text-xs tracking-[0.22em] uppercase text-white/45">{labels[i]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Testimonials ──────────────────────────────────────────────────────────
const TestimonialsSection = () => {
  const { t } = useLang();
  const [active, setActive] = useState(null);
  const activeItem = active !== null ? TESTIMONIALS[active] : null;

  return (
    <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <Reveal className="mb-14">
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="w-10 h-px bg-gold" />
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">
            {t.testimonials?.eyebrow || "Testimonials"}
          </span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.06] text-[#231911]">
          {t.testimonials?.title || "Trusted by the people we serve"}
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-5">
        {TESTIMONIALS.map((tm, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <motion.div
              layoutId={`testimonial-${i}`}
              onClick={() => setActive(i)}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="h-full cursor-pointer"
              data-cursor-hover
            >
              <GlowCard variant="light" className="p-8 h-full">
                <div className="mb-6">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-gold text-lg">★</span>
                  ))}
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-brown-500/70 italic mb-6">
                  "{tm.quote}"
                </p>
                <div className="flex items-center gap-4 pt-5 border-t border-brown-500/[0.08]">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-300 to-gold-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {tm.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#231911]">{tm.name}</p>
                    <p className="text-xs text-brown-500/40 mt-0.5">{tm.title}</p>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <div className="text-center mt-10">
        <MagneticButton to="/testimonials" variant="lightGhost" icon={ArrowRight}>
          {t.readStories || "Read all stories"}
        </MagneticButton>
      </div>

      {/* ── Zoom modal — the clicked card morphs into this larger view ── */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              layoutId={`testimonial-${active}`}
              onClick={(e) => e.stopPropagation()}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative bg-white rounded-[2rem] shadow-2xl max-w-xl w-full p-9 sm:p-12"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-brown-500/5 hover:bg-brown-500/10 flex items-center justify-center text-brown-500/50 hover:text-brown-500 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-gold text-xl">★</span>
                ))}
              </div>
              <p className="font-heading text-xl sm:text-2xl font-light leading-relaxed text-brown-500/80 italic mb-8">
                "{activeItem.quote}"
              </p>
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
    </section>
  );
};

// ── Global footprint ──────────────────────────────────────────────────────
const FootprintSection = () => {
  const { t } = useLang();
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-gold" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">
              {t.footprint?.eyebrow || "Global Footprint"}
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.06] mb-5 text-[#231911]">
            {t.footprint?.title || "Four countries. One seamless network."}
          </h2>
          <p className="text-brown-500/50 leading-relaxed mb-10">
            {t.footprint?.subtitle || "Operating across Europe and Asia-Pacific with a follow-the-sun model that delivers talent and technology around the clock."}
          </p>

          {[
            { flag: "🇩🇪", country: "Germany", entity: "Felipillon UG", role: "Global Headquarters", img: MEDIA.berlin },
            { flag: "🇮🇳", country: "India", entity: "Felipillon Innovation Pvt. Ltd.", role: "Technology Hub", img: MEDIA.india },
            { flag: "🇵🇭", country: "Philippines", entity: "Felipillon OPC", role: "Asia-Pacific Operations", img: MEDIA.philippines },
            { flag: "🇮🇹", country: "Italy", entity: "New Office", role: "European Operations", img: MEDIA.italy },
          ].map((loc, i) => (
            <Reveal key={loc.country} delay={i * 0.1}>
              <div className="flex items-center gap-4 p-4 mb-3 rounded-2xl bg-white border border-brown-500/[0.06] shadow-[0_4px_18px_-8px_rgba(61,35,20,0.15)] hover:border-gold/30 hover:shadow-[0_10px_30px_-8px_rgba(201,151,58,0.25)] transition-all duration-300 group">
                <div className="relative w-14 h-10 rounded-md overflow-hidden shrink-0">
                  <img src={loc.img} alt={loc.country} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{loc.flag}</span>
                    <span className="font-medium text-[#231911] text-sm">{loc.country}</span>
                    <span className="text-xs text-gold-600">· {loc.role}</span>
                  </div>
                  <p className="text-xs text-brown-500/35 mt-0.5">{loc.entity}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </Reveal>

        <Reveal delay={0.2}>
          <div className="rounded-[2.5rem] bg-white shadow-[0_24px_60px_-16px_rgba(61,35,20,0.25)] border border-brown-500/5 p-8">
            <Globe />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ── Final CTA — cinematic video banner ─────────────────────────────────────
const CTASection = () => {
  const { t } = useLang();
  return (
    <section className="py-6 pb-2">
      <div className="relative overflow-hidden mx-6 sm:mx-8 rounded-[2.5rem] shadow-[0_30px_80px_-20px_rgba(61,35,20,0.4)]">
        <video autoPlay muted loop playsInline poster={MEDIA.aboutTeam} className="absolute inset-0 w-full h-full object-cover">
          <source src={VIDEO_BG} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#150D07]/92 via-[#150D07]/75 to-[#150D07]/30" />
        <div className="relative px-10 sm:px-16 py-20 max-w-2xl">
          <Reveal>
            <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.06] mb-5 text-white">
              {t.cta?.title || "Let's build your competitive advantage"}
            </h2>
            <p className="text-white/55 mb-8 leading-relaxed">
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

// ── Main export ───────────────────────────────────────────────────────────
export default function Home() {
  const [ready, setReady] = useState(false);

  // Keep body's overscroll/bounce color light while on this page only —
  // reverts automatically on unmount so every other (still dark) page is unaffected.
  useEffect(() => {
    const prevBg = document.body.style.background;
    document.body.style.background = "#FBF8F3";
    setReady(true);
    return () => { document.body.style.background = prevBg; };
  }, []);

  return (
    <div className="relative bg-[#FBF8F3] text-brown-500">
      {ready && <CursorFollower />}
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
    </div>
  );
}