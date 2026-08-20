import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { CursorFollower } from "../components/shared/CursorFollower";
import { SPECIALITIES, MEDIA, STAFFING_VIDEO_BG } from "../data/content";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLang } from "../context/LangContext";

const STAFFING_SECTORS = SPECIALITIES.filter(s => s.id !== "technology");

// ── Cursor-reactive tilt wrapper — reused from the Home page's motion language ──
const TiltPanel = ({ children, className = "", strength = 6 }) => {
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
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className={className}>
      {children}
    </motion.div>
  );
};

export default function Staffing() {
  const { t } = useLang();
  const s = t.staffing || {};
  const p = s.process || {};
  const stats = s.stats || {};
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prevBg = document.body.style.background;
    document.body.style.background = "#FBF8F3";
    setReady(true);
    return () => { document.body.style.background = prevBg; };
  }, []);

  const PROCESS = [
    { step: "01", title: p.s1t, desc: p.s1d },
    { step: "02", title: p.s2t, desc: p.s2d },
    { step: "03", title: p.s3t, desc: p.s3d },
    { step: "04", title: p.s4t, desc: p.s4d },
  ];

  return (
    <div className="relative bg-[#FBF8F3] text-brown-500">
      {ready && <CursorFollower />}

      {/* ── Hero — large type left, video panel right ── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="animate-blob absolute -top-40 -left-32 w-[560px] h-[560px] bg-gradient-to-br from-gold/20 via-gold-300/15 to-transparent blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full bg-white border border-brown-500/10 shadow-[0_2px_16px_-4px_rgba(61,35,20,0.1)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">{s.eyebrow || "Staffing & Recruitment"}</span>
            </motion.div>
            <h1 className="font-heading font-light leading-[0.96] tracking-[-0.05em] text-4xl sm:text-6xl lg:text-[4.4rem] text-[#231911]">
              {s.title || "Talent that moves your business forward"}
            </h1>
            {s.subtitle && <p className="mt-7 text-lg text-brown-500/55 max-w-xl leading-relaxed font-light">{s.subtitle}</p>}
            <div className="mt-9 flex flex-wrap gap-4">
              <MagneticButton to="/open-roles" variant="lightPrimary" icon={ArrowRight}>{s.viewRoles}</MagneticButton>
              <MagneticButton to="/contact" variant="lightSecondary">{s.hireTalent}</MagneticButton>
            </div>
          </div>

          <TiltPanel className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(61,35,20,0.35)] border border-white aspect-[4/5]">
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src={STAFFING_VIDEO_BG} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
          </TiltPanel>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="border-y border-brown-500/[0.07] bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { val: "500+", label: stats.placements },
            { val: "50+",  label: stats.platforms },
            { val: stats.avgTimeVal || "4 days", label: stats.avgTime },
            { val: "95%",  label: stats.retention },
          ].map((st) => (
            <div key={st.label} className="text-center">
              <p className="font-heading text-3xl font-light bg-gradient-to-r from-gold-600 to-gold bg-clip-text text-transparent">{st.val}</p>
              <p className="text-xs text-brown-500/40 tracking-wide mt-1">{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sectors ── */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal className="mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-gold" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">{s.sectorsEyebrow}</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] leading-[1.06] text-[#231911]">{s.sectorsTitle}</h2>
          <p className="text-brown-500/50 mt-3 max-w-2xl">{s.sectorsSubtitle}</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {STAFFING_SECTORS.map((spec, i) => (
            <Reveal key={spec.id} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group relative rounded-2xl overflow-hidden bg-white border border-brown-500/[0.07] hover:border-gold/30 shadow-[0_4px_18px_-8px_rgba(61,35,20,0.12)] hover:shadow-[0_16px_40px_-12px_rgba(201,151,58,0.25)] transition-shadow duration-500 p-7"
                data-testid={`sector-${spec.id}`}
              >
                <div className="relative">
                  <div className="flex-1">
                    <div className="mb-4 h-1 w-12 rounded-full" style={{ background: spec.color }} />
                    <h3 className="font-heading text-xl font-medium text-[#231911] mb-2">{spec.name}</h3>
                    <p className="text-sm text-brown-500/50 leading-relaxed mb-4">{spec.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {spec.services.map(sv => (
                        <span key={sv} className="px-2.5 py-1 rounded-full border border-brown-500/[0.1] text-[10px] text-brown-500/45">
                          {sv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: spec.color }} />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Process — numbered bento ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle, rgba(201,151,58,0.14) 1px, transparent 1px)", backgroundSize: "52px 52px" }} />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <Reveal className="mb-14 text-center">
            <div className="inline-flex items-center gap-3 mb-5 justify-center">
              <span className="w-10 h-px bg-gold" />
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">{s.processEyebrow}</span>
              <span className="w-10 h-px bg-gold" />
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] text-[#231911]">{s.processTitle}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS.map((pr, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <GlowCard variant="light" className="p-7 h-full">
                  <span className="font-heading text-4xl font-light text-gold/25">{pr.step}</span>
                  <h4 className="font-heading text-lg font-medium text-[#231911] mt-3 mb-3">{pr.title}</h4>
                  <p className="text-sm text-brown-500/45 leading-relaxed">{pr.desc}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why + quote photo ── */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-gold" />
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">{s.whyEyebrow}</span>
            </div>
            <h2 className="font-heading text-4xl font-light tracking-[-0.04em] leading-[1.08] mb-6 text-[#231911]">{s.whyTitle}</h2>
            <div className="space-y-3 mb-10">
              {[
                "People Match AI scans 50+ global platforms for the best fit",
                "Specialist recruiters with lived sector experience",
                "Shortlists delivered in days, not weeks",
                "Follow-the-sun coverage across Germany, India and Philippines",
              ].map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="mt-2 h-px w-8 shrink-0 bg-gold" />
                  <p className="text-brown-500/60 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <MagneticButton to="/contact" variant="lightPrimary" icon={ArrowUpRight}>{s.startConversation}</MagneticButton>
          </Reveal>
          <Reveal delay={0.15}>
            <TiltPanel className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_24px_60px_-16px_rgba(61,35,20,0.25)] border border-white">
              <img src={MEDIA.team} alt="Team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-md rounded-xl p-5 shadow-lg">
                  <p className="text-sm text-brown-500/70 italic">"From brief to shortlist in 4 days. Felipillon understands enterprise hiring better than anyone."</p>
                  <p className="text-xs text-gold-600 mt-3 font-medium">— Priya Nair, Head of Talent, Solaris Energy</p>
                </div>
              </div>
            </TiltPanel>
          </Reveal>
        </div>
      </section>
    </div>
  );
}