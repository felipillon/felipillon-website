import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { Globe } from "../components/shared/Globe";
import { CursorFollower } from "../components/shared/CursorFollower";
import { AmbientBackground } from "../components/shared/AmbientBackground";
import { ScrollProgress } from "../components/shared/ScrollProgress";
import { LOCATIONS, MEDIA } from "../data/content";
import { MapPin, Clock, Building2, ArrowRight } from "lucide-react";
import { useLang } from "../context/LangContext";

export default function Locations() {
  const { t } = useLang();
  const l = t.locations || {};
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
            <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">{l.eyebrow || "Locations"}</span>
          </motion.div>
          <h1 className="font-heading font-light leading-[0.96] tracking-[-0.05em] text-4xl sm:text-6xl lg:text-[4.6rem] text-[#231911] max-w-3xl">
            {l.title || "Four locations. One borderless team."}
          </h1>
          {l.subtitle && <p className="mt-7 text-lg text-brown-500/55 max-w-xl leading-relaxed font-light">{l.subtitle}</p>}
        </div>
      </section>

      {/* ── Per-country — sticky photo, scrolling detail panel ── */}
      {LOCATIONS.map((loc, i) => {
        const isEven = i % 2 === 0;
        return (
          <section key={loc.country} className="relative py-10" data-testid={`location-${loc.country}`}>
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
                        <img src={loc.img} alt={loc.country} className="w-full h-full object-cover" loading="lazy" />
                      </motion.div>
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                    <div className="absolute top-6 left-6">
                      <span className="text-4xl drop-shadow-lg">{loc.flag}</span>
                    </div>
                  </div>
                </div>

                <div className={`${isEven ? "lg:order-2" : "lg:order-1"} py-6`}>
                  <Reveal className="max-w-lg">
                    <div className="inline-flex items-center gap-3 mb-6">
                      <span className="w-8 h-px bg-gold" />
                      <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">{loc.role}</span>
                      <span className="w-8 h-px bg-gold" />
                    </div>
                    <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] text-[#231911] mb-2">{loc.country}</h2>
                    <p className="text-gold-600 text-sm mb-8">{loc.entity}</p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-brown-500/35 shrink-0 mt-0.5" />
                        <p className="text-sm text-brown-500/55 leading-relaxed">{loc.addr}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-brown-500/35 shrink-0" />
                        <p className="text-sm text-brown-500/55">{l.timezone}: {loc.tz}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building2 className="w-4 h-4 text-brown-500/35 shrink-0" />
                        <p className="text-sm text-brown-500/55">{loc.role}</p>
                      </div>
                    </div>

                    <GlowCard variant="light" className="p-5">
                      <p className="text-xs text-brown-500/40 uppercase tracking-wider mb-3">{l.officeHours}</p>
                      <p className="text-sm text-[#231911]">{l.officeHoursVal} {loc.tz}</p>
                      <p className="text-xs text-brown-500/35 mt-2">{l.alwaysOnNote}</p>
                    </GlowCard>
                  </Reveal>
                </div>
              </div>
            </div>
            {i < LOCATIONS.length - 1 && (
              <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-14">
                <div className="h-px bg-gradient-to-r from-transparent via-brown-500/[0.1] to-transparent" />
              </div>
            )}
          </section>
        );
      })}

      {/* ── Globe — light framed widget ── */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-gold" />
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">{l.globalNetworkEyebrow}</span>
              <span className="w-10 h-px bg-gold" />
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] leading-[1.06] mb-5 text-[#231911]">{l.globalNetworkTitle}</h2>
            <p className="text-brown-500/50 leading-relaxed mb-8">{l.globalNetworkDesc}</p>
            <MagneticButton to="/contact" variant="lightPrimary" icon={ArrowRight}>{l.getInTouch}</MagneticButton>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rounded-[2.5rem] bg-white shadow-[0_24px_60px_-16px_rgba(61,35,20,0.25)] border border-brown-500/5 p-8">
              <Globe />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
