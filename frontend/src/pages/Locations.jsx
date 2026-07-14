import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { Globe } from "../components/shared/Globe";
import { LOCATIONS, MEDIA } from "../data/content";
import { MapPin, Clock, Building2, ArrowRight } from "lucide-react";
import { useLang } from "../context/LangContext";

export default function Locations() {
  const { t } = useLang();
  const l = t.locations || {};

  return (
    <>
      <PageHero
        eyebrow={l.eyebrow || "Locations"}
        title={l.title || "Three countries. One borderless team."}
        subtitle={l.subtitle}
        img={MEDIA.berlin}
        tall
      />

      {LOCATIONS.map((loc, i) => {
        const isEven = i % 2 === 0;
        return (
          <section key={loc.country} className="relative">
            <div className="grid lg:grid-cols-2 min-h-[60vh]">
              <div className={`relative min-h-[50vh] ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                <img
                  src={loc.img}
                  alt={loc.country}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.38) saturate(0.7)" }}
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-${isEven ? "r" : "l"} from-transparent to-[#07070A]/90`} />
                <div className="absolute top-8 left-8">
                  <span className="text-4xl">{loc.flag}</span>
                </div>
              </div>

              <div className={`flex items-center p-10 sm:p-16 bg-[#07070A]/50 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                <Reveal className="max-w-lg w-full">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <span className="w-8 h-px bg-[#C9973A]" />
                    <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">{loc.role}</span>
                  </div>
                  <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] text-white mb-2">{loc.country}</h2>
                  <p className="text-[#C9973A] text-sm mb-8">{loc.entity}</p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                      <p className="text-sm text-white/55 leading-relaxed">{loc.addr}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-white/30 shrink-0" />
                      <p className="text-sm text-white/55">{l.timezone}: {loc.tz}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-white/30 shrink-0" />
                      <p className="text-sm text-white/55">{loc.role}</p>
                    </div>
                  </div>

                  <GlowCard className="p-5">
                    <p className="text-xs text-white/35 uppercase tracking-wider mb-3">{l.officeHours}</p>
                    <p className="text-sm text-white/60">{l.officeHoursVal} {loc.tz}</p>
                    <p className="text-xs text-white/30 mt-2">{l.alwaysOnNote}</p>
                  </GlowCard>
                </Reveal>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          </section>
        );
      })}

      {/* Globe section */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#C9973A]" />
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">{l.globalNetworkEyebrow}</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] leading-[1.06] mb-5">{l.globalNetworkTitle}</h2>
            <p className="text-white/45 leading-relaxed mb-8">{l.globalNetworkDesc}</p>
            <MagneticButton to="/contact" variant="primary" icon={ArrowRight}>{l.getInTouch}</MagneticButton>
          </Reveal>
          <Reveal delay={0.15}>
            <Globe />
          </Reveal>
        </div>
      </section>
    </>
  );
}