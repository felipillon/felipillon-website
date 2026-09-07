import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion, animate } from "framer-motion";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MagneticButton } from "../components/shared/MagneticButton";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { Counter } from "../components/shared/Counter";
import { Globe } from "../components/shared/Globe";
import { CursorFollower } from "../components/shared/CursorFollower";
import { useLang } from "../context/LangContext";
import { SPECIALITIES, WHY, METRICS, TRUSTED, TESTIMONIALS, MEDIA, VIDEO_BG, HERO_VIDEOS } from "../data/content";
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

// ── Hero — multi-video carousel with crossfade ──────────────────────────
const SLIDE_DURATION = 7; // seconds per slide (5 × 7 = 35s total cycle)

const Hero = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef([]);
  const timerRef = useRef(null);
  const startRef = useRef(Date.now());

  const count = HERO_VIDEOS.length;
  const current = HERO_VIDEOS[activeIdx];
  const dur = current.maxDuration || SLIDE_DURATION;

  // ── Advance to next slide ──
  const goTo = (idx) => {
    setActiveIdx(idx % count);
    setProgress(0);
    startRef.current = Date.now();
  };

  // ── Timer-driven cycling (progress + advance) ──
  useEffect(() => {
    const tick = () => {
      const elapsed = (Date.now() - startRef.current) / 1000;
      const d = HERO_VIDEOS[activeIdx].maxDuration || SLIDE_DURATION;
      const pct = Math.min(elapsed / d, 1);
      setProgress(pct);
      if (pct >= 1) {
        goTo((activeIdx + 1) % count);
      }
    };
    timerRef.current = setInterval(tick, 50);
    return () => clearInterval(timerRef.current);
  }, [activeIdx, count]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Restart video from beginning & enforce maxDuration cap ──
  useEffect(() => {
    const vid = videoRefs.current[activeIdx];
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }
  }, [activeIdx]);

  // ── Pause video when it hits maxDuration (prevents logo flash) ──
  useEffect(() => {
    const vid = videoRefs.current[activeIdx];
    if (!vid) return;
    const maxDur = HERO_VIDEOS[activeIdx].maxDuration || SLIDE_DURATION;
    const onTimeUpdate = () => {
      if (vid.currentTime >= maxDur) {
        vid.pause();
      }
    };
    vid.addEventListener("timeupdate", onTimeUpdate);
    return () => vid.removeEventListener("timeupdate", onTimeUpdate);
  }, [activeIdx]);

  const entrance = (delay = 0) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(4px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.6 },
    transition: { duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section ref={ref} className="relative min-h-[58svh] flex items-end overflow-hidden">

      {/* ── Video layers with crossfade ── */}
      <div className="absolute inset-0 z-0">
        {HERO_VIDEOS.map((v, i) => (
          <motion.div
            key={v.label}
            initial={false}
            animate={{ opacity: i === activeIdx ? 1 : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            style={{ zIndex: i === activeIdx ? 1 : 0 }}
          >
            <img src={v.poster} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              muted
              playsInline
              autoPlay
              preload="auto"
              poster={v.poster}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="absolute inset-0 w-full h-full object-cover"
            >
              {(v.sources || [v.src]).map((src) => (
                <source key={src} src={src} type="video/mp4" />
              ))}
            </video>
          </motion.div>
        ))}

        {/* ── Cinematic overlay stack ── */}
        {/* 1. Base darkening — lets the video breathe while keeping text readable */}
        <div className="absolute inset-0 z-[2]" style={{ background: "linear-gradient(135deg, rgba(7,7,10,0.72) 0%, rgba(7,7,10,0.38) 45%, rgba(7,7,10,0.22) 100%)" }} />

        {/* 2. Radial vignette — cinematic depth, draws focus to center-left content */}
        <div className="absolute inset-0 z-[2]" style={{ background: "radial-gradient(ellipse 70% 65% at 30% 50%, transparent 0%, rgba(7,7,10,0.55) 100%)" }} />

        {/* 3. Warm ambient wash — subtle amber tint matching the gold brand palette */}
        <div className="absolute inset-0 z-[2]" style={{ background: "radial-gradient(ellipse 80% 60% at 25% 60%, rgba(201,151,58,0.08) 0%, transparent 70%)" }} />

        {/* 4. Bottom edge fade — clean blend into page content below */}
        <div className="absolute inset-0 z-[2]" style={{ background: "linear-gradient(to top, rgba(7,7,10,0.65) 0%, rgba(7,7,10,0.15) 22%, transparent 40%)" }} />

        {/* 5. Top edge — subtle darkening for nav contrast */}
        <div className="absolute inset-0 z-[2]" style={{ background: "linear-gradient(to bottom, rgba(7,7,10,0.35) 0%, transparent 18%)" }} />

        {/* 6. Film grain texture — CSS noise for cinematic warmth */}
        <div className="absolute inset-0 z-[2] pointer-events-none hero-grain" />
      </div>

      {/* Decorative rings */}
      <motion.div
        className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-1/3 w-[760px] h-[760px] rounded-full border border-[#C9973A]/[0.10] pointer-events-none z-[3]"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-1/3 w-[540px] h-[540px] rounded-full border border-[#C9973A]/[0.16] pointer-events-none z-[3]"
        animate={{ rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full pt-32 pb-14 sm:pt-36 sm:pb-16">
        <div className="relative max-w-4xl">
          <div
            className="absolute -inset-x-5 -inset-y-6 -z-10 rounded-[2rem] bg-gradient-to-r from-black/62 via-black/34 to-transparent blur-sm sm:-inset-x-8 sm:-inset-y-8"
            aria-hidden
          />
          <motion.div
            {...entrance(0.08)}
            className="inline-flex items-center gap-2.5 mb-6"
          >
            <span className="text-gold-300 text-[10px] font-bold tracking-[0.35em] uppercase">
              {t.hero?.badge || "Germany · India · Philippines · Italy"}
            </span>
          </motion.div>

          <motion.h1
            {...entrance(0.16)}
            className="font-heading text-4xl sm:text-5xl lg:text-[4.4rem] xl:text-[5rem] font-light tracking-[-0.035em] leading-[1.03] max-w-4xl"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.78)" }}
          >
            {[t.hero?.line1 || "Felipillon's Mission", t.hero?.line2 || "Connecting Talent", t.hero?.line3 || "With Opportunity"].map((line, i) => (
              <span
                key={i}
                className={`block ${
                  i === 1
                    ? "text-gold-300"
                    : "text-white"
                }`}
              >
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            {...entrance(0.3)}
            className="mt-6 max-w-2xl text-base sm:text-lg text-white/95 leading-relaxed font-medium"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.9)" }}
          >
            {t.hero?.sub || "We help companies find skilled talent, build reliable software and expand into new markets with confidence."}
          </motion.p>

          <motion.div
            {...entrance(0.42)}
            className="mt-8 flex flex-wrap gap-4"
          >
            <MagneticButton to="/staffing" variant="primary" icon={ArrowRight} className="shadow-[0_16px_34px_-14px_rgba(0,0,0,1)]">
              {t.hero?.cta1 || "Hire Top Talent"}
            </MagneticButton>
            <MagneticButton to="/specialities" variant="secondary" className="bg-black/62 border-white/35 text-white shadow-[0_16px_34px_-14px_rgba(0,0,0,1)] hover:bg-black/72">
              {t.hero?.cta2 || "Our Specialities"}
            </MagneticButton>
            <MagneticButton to="/open-roles" variant="ghost" className="bg-black/48 border-white/30 text-white/95 shadow-[0_16px_34px_-14px_rgba(0,0,0,1)] hover:bg-black/62">
              {t.hero?.cta3 || "Open Roles"}
            </MagneticButton>
          </motion.div>
        </div>

        {/* ── Video carousel indicators ── */}
        <motion.div
          {...entrance(0.55)}
          className="mt-10 flex items-center gap-2.5 px-4 py-2.5 rounded-full"
          style={{
            background: "rgba(7,7,10,0.35)",
            backdropFilter: "blur(16px) saturate(140%)",
            WebkitBackdropFilter: "blur(16px) saturate(140%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 4px 24px -4px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
            width: "fit-content",
          }}
        >
          {HERO_VIDEOS.map((v, i) => {
            const isActive = i === activeIdx;
            const isPast = i < activeIdx || (activeIdx === 0 && i === count - 1 && progress < 0.05);
            return (
              <button
                key={v.label}
                onClick={() => goTo(i)}
                className="group relative flex items-center gap-2 focus:outline-none transition-all duration-300"
                aria-label={`Show ${v.label} video`}
              >
                {/* Progress bar track */}
                <div
                  className="relative overflow-hidden rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: isActive ? 56 : 16,
                    height: isActive ? 4 : 4,
                    background: isActive ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.15)",
                  }}
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-colors duration-300"
                    style={{
                      width: isActive ? `${progress * 100}%` : isPast ? "100%" : "0%",
                      background: isActive
                        ? "linear-gradient(90deg, #C9973A, #E8C97A)"
                        : "rgba(255,255,255,0.32)",
                      boxShadow: isActive ? "0 0 8px rgba(201,151,58,0.4)" : "none",
                    }}
                  />
                </div>
                {/* Label (visible for active slide) */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                      animate={{ opacity: 1, width: "auto", marginLeft: 2 }}
                      exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="text-[9px] font-bold tracking-[0.22em] uppercase text-white/70 whitespace-nowrap overflow-hidden"
                    >
                      {v.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
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
            <span className="w-10 h-px bg-gold" />
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
      {/* Stronger gradient for guaranteed readability on any image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />

      <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
        <div>
          <div className="mb-2">
            <span className="text-xl sm:text-2xl font-heading font-medium text-gold-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">{item.stat}</span>
            <span className="text-xs sm:text-sm font-semibold text-[#FFF7E6] ml-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">{statLabel}</span>
          </div>
          <h4 className="font-heading text-white text-base sm:text-lg font-semibold mb-1.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">{name}</h4>
          <p className="text-[#FFF7E6] text-xs sm:text-sm font-medium leading-relaxed line-clamp-2 mb-2 hidden sm:block drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">{desc}</p>
          <div
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#FFE29A] opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]"
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
  const stageRef = useRef(null);
  const wheelResumeRef = useRef(null);
  const isCarouselHoveredRef = useRef(false);
  const [radius, setRadius] = useState(210);

  const startAutoRotation = () => {
    controlsRef.current?.stop();
    controlsRef.current = animate(rotation, rotation.get() - 360, { duration: 46, repeat: Infinity, ease: "linear" });
  };

  const rotateFromWheel = (e) => {
    const rawDelta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (rawDelta === 0) return;

    controlsRef.current?.stop();
    rotation.set(rotation.get() - rawDelta * 0.28);

    if (wheelResumeRef.current) {
      window.clearTimeout(wheelResumeRef.current);
    }

    wheelResumeRef.current = window.setTimeout(startAutoRotation, 900);
  };

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
    startAutoRotation();
    return () => {
      controlsRef.current?.stop();
      if (wheelResumeRef.current) {
        window.clearTimeout(wheelResumeRef.current);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onWheel = (e) => {
      if (!isCarouselHoveredRef.current) return;
      e.preventDefault();
      rotateFromWheel(e);
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
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
            <span className="w-10 h-px bg-gold" />
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.03em] max-w-3xl leading-[1.06] text-[#231911]">
            {t.specialities?.title || "Where we deliver results"}
          </h2>
        </Reveal>
      </div>

      <div
        ref={stageRef}
        className="relative isolate mx-auto flex items-center justify-center select-none"
        style={{ height: stageSize, maxWidth: stageSize }}
        onMouseEnter={() => {
          isCarouselHoveredRef.current = true;
          controlsRef.current?.pause();
        }}
        onMouseLeave={() => {
          isCarouselHoveredRef.current = false;
          controlsRef.current?.play();
        }}
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

      {/* ── Prev / Next navigation buttons ── */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => {
            controlsRef.current?.stop();
            rotation.set(rotation.get() + (360 / SPECIALITIES.length));
            setTimeout(startAutoRotation, 1200);
          }}
          className="w-11 h-11 rounded-full border border-brown-500/20 bg-white shadow-sm flex items-center justify-center text-brown-500/60 hover:text-[#231911] hover:border-gold/50 hover:shadow-[0_4px_16px_-4px_rgba(201,151,58,0.35)] transition-all duration-200"
          aria-label="Previous speciality"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          onClick={() => navigate("/specialities")}
          className="px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border border-brown-500/15 text-brown-500/55 hover:text-[#231911] hover:border-gold/40 transition-colors"
        >
          {t.specialities?.explore || "Explore All"}
        </button>

        <button
          onClick={() => {
            controlsRef.current?.stop();
            rotation.set(rotation.get() - (360 / SPECIALITIES.length));
            setTimeout(startAutoRotation, 1200);
          }}
          className="w-11 h-11 rounded-full border border-brown-500/20 bg-white shadow-sm flex items-center justify-center text-brown-500/60 hover:text-[#231911] hover:border-gold/50 hover:shadow-[0_4px_16px_-4px_rgba(201,151,58,0.35)] transition-all duration-200"
          aria-label="Next speciality"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

    </section>
  );
};

// ── Quote break ───────────────────────────────────────────────────────────
const PhotoBreak = () => {
  const { t } = useLang();
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="relative h-[46vh] min-h-[340px] overflow-hidden rounded-[2.5rem] shadow-[0_30px_70px_-20px_rgba(61,35,20,0.3)]">
        <img src={MEDIA.officeWide} alt="Felipillon office" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Reveal>
            <blockquote className="text-center max-w-3xl px-8">
              <p className="font-heading text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-relaxed tracking-[-0.02em]">
                "{t.quoteBreak?.quote || "We focus on real business problems, not just services. Long-term value over short-term fees."}"
              </p>
              <cite className="block mt-6 text-gold-300 text-sm tracking-widest not-italic">
                {t.quoteBreak?.cite || "— Ketan Bhanudas Barve, CEO"}
              </cite>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

// ── Why section ───────────────────────────────────────────────────────────
const WhySection = () => {
  const { t } = useLang();
  const whyCards = t.why?.cards || [];
  return (
    <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <Reveal className="mb-14">
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="w-10 h-px bg-gold" />
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">
            {t.why?.eyebrow || "Why Felipillon"}
          </span>
          <span className="w-10 h-px bg-gold" />
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.03em] max-w-2xl leading-[1.06] text-[#231911]">
          {t.why?.title || "Built for enterprises that can't afford to compromise"}
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {WHY.map((w, i) => {
          const translated = whyCards[i] || {};
          return (
          <Reveal key={w.title} delay={i * 0.07}>
            <GlowCard variant="light" className="p-7 h-full group">
              <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center mb-5 group-hover:bg-gold/15 transition-colors">
                <w.icon className="w-5 h-5 text-gold-600" />
              </div>
              <h4 className="font-heading text-lg font-medium mb-2 text-[#231911]">{translated.title || w.title}</h4>
              <p className="text-sm text-brown-500/50 leading-relaxed">{translated.desc || w.desc}</p>
            </GlowCard>
          </Reveal>
        )})}
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
  const testimonialItems = TESTIMONIALS.map((item, i) => ({ ...item, ...(t.testimonials?.items?.[i] || {}) }));
  const activeItem = active !== null ? testimonialItems[active] : null;

  return (
    <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <Reveal className="mb-14">
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="w-10 h-px bg-gold" />
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">
            {t.testimonials?.eyebrow || "Testimonials"}
          </span>
          <span className="w-10 h-px bg-gold" />
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.06] text-[#231911]">
          {t.testimonials?.title || "Trusted by the people we serve"}
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-5">
        {testimonialItems.map((tm, i) => (
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
            <span className="w-10 h-px bg-gold" />
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.03em] leading-[1.06] mb-5 text-[#231911]">
            {t.footprint?.title || "Four countries. One seamless network."}
          </h2>
          <p className="text-brown-500/50 leading-relaxed mb-10">
            {t.footprint?.subtitle || "Operating across Europe and Asia-Pacific with a follow-the-sun model that delivers talent and technology around the clock."}
          </p>

          {[
            { code: "DE", country: t.footprint?.germany || "Germany", entity: "Felipillon UG", role: t.footprint?.globalHeadquarters || "Global Headquarters", img: MEDIA.berlin },
            { code: "IN", country: t.footprint?.india || "India", entity: "Felipillon Innovation Pvt. Ltd.", role: t.footprint?.techHub || "Technology Hub", img: MEDIA.india },
            { code: "PH", country: t.footprint?.philippines || "Philippines", entity: "Felipillon OPC", role: t.footprint?.apacOperations || "Asia-Pacific Operations", img: MEDIA.philippinesLandmark },
            { code: "IT", country: t.footprint?.italy || "Italy", entity: t.footprint?.newOffice || "New Office", role: t.footprint?.europeanOperations || "European Operations", img: MEDIA.italy },
          ].map((loc, i) => (
            <Reveal key={loc.country} delay={i * 0.1}>
              <div className="flex items-center gap-4 p-4 mb-3 rounded-2xl bg-white border border-brown-500/[0.06] shadow-[0_4px_18px_-8px_rgba(61,35,20,0.15)] hover:border-gold/30 hover:shadow-[0_10px_30px_-8px_rgba(201,151,58,0.25)] transition-all duration-300 group">
                <div className="relative w-14 h-10 rounded-md overflow-hidden shrink-0">
                  <img src={loc.img} alt={loc.country} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-4 text-[9px] font-bold tracking-wider bg-brown-500/8 rounded text-brown-500/60">{loc.code}</span>
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

        {/* Layer 1 — light dark wash for video readability */}
        <div className="absolute inset-0 bg-[#0D0A07]/32" />
        {/* Layer 2 — directional gradient behind the text area */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(13,8,4,0.82) 0%, rgba(13,8,4,0.62) 45%, rgba(13,8,4,0.26) 75%, rgba(13,8,4,0.08) 100%)" }} />
        {/* Layer 3 — bottom fade for clean blend into footer */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,8,4,0.28) 0%, transparent 35%)" }} />

        <div className="relative px-10 sm:px-16 py-20 max-w-2xl">
          <Reveal>
            <h2
              className="font-heading text-4xl sm:text-5xl font-semibold tracking-[-0.01em] leading-[1.06] mb-5 text-white"
              style={{ textShadow: "0 3px 18px rgba(0,0,0,0.98), 0 1px 6px rgba(0,0,0,0.95)" }}
            >
              {t.cta?.title || "Let's build your competitive advantage"}
            </h2>
            <p
              className="text-white font-semibold mb-8 leading-relaxed"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.95)" }}
            >
              {t.cta?.sub || "Whether you need elite talent or transformative software, our teams are ready."}
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton to="/contact" variant="primary" icon={ArrowRight}>
                {t.cta?.btn1 || "Send Inquiry"}
              </MagneticButton>
              <MagneticButton to="/open-roles" variant="secondary" className="bg-[#1A0E08]/95 border-white/45 font-semibold text-white backdrop-blur-none shadow-[0_10px_24px_-14px_rgba(0,0,0,0.9)] hover:bg-[#231911]">
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

  // Keep bottom overscroll/bounce dark so the footer does not reveal a light
  // strip below it. The home content still paints its own cream background.
  useEffect(() => {
    const prevBg = document.body.style.background;
    document.body.style.background = "#07070A";
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
