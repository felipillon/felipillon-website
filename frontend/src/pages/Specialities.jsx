import { PageHero } from "../components/layout/Layout";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { SPECIALITIES, MEDIA } from "../data/content";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { useLang } from "../context/LangContext";

export default function Specialities() {
  const { t } = useLang();
  const s = t.specialities || {};

  return (
    <>
      <PageHero
        eyebrow={s.eyebrow || "Specialities"}
        title={s.title || "Where we deliver results"}
        subtitle={s.subtitle}
        img={MEDIA.teamMeeting}
        tall
      />

      {SPECIALITIES.map((spec, i) => {
        const isEven = i % 2 === 0;
        return (
          <section key={spec.id} className="relative overflow-hidden" data-testid={`speciality-${spec.id}`}>
            <div className="grid lg:grid-cols-2 min-h-[75vh]">
              <div className={`relative ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                <img
                  src={spec.imgWide || spec.img}
                  alt={spec.name}
                  className="w-full h-full object-cover min-h-[50vh]"
                  style={{ filter: "brightness(0.45) saturate(0.75)" }}
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-${isEven ? "r" : "l"} from-transparent to-[#07070A]/80`} />
                <div className="absolute bottom-8 left-8">
                  <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-black/50 backdrop-blur-md border border-white/10">
                    <span className="font-heading text-3xl font-light" style={{ color: spec.color }}>{spec.stat}</span>
                    <span className="text-xs text-white/50">{spec.statLabel}</span>
                  </div>
                </div>
              </div>

              <div className={`flex items-center p-10 sm:p-16 bg-[#07070A]/60 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                <Reveal className="max-w-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${spec.color}15`, border: `1px solid ${spec.color}30` }}>
                      <spec.icon className="w-6 h-6" style={{ color: spec.color }} />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.35em] uppercase" style={{ color: spec.color }}>
                      {s.eyebrow}
                    </span>
                  </div>
                  <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] leading-[1.06] text-white mb-5">
                    {spec.name}
                  </h2>
                  <p className="text-white/50 leading-relaxed mb-8">{spec.desc}</p>

                  <div className="mb-8">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-white/25 mb-4">{s.services}</p>
                    <div className="space-y-2.5">
                      {spec.services.map((svc) => (
                        <div key={svc} className="flex items-center gap-3 text-sm text-white/55">
                          <Check className="w-4 h-4 shrink-0" style={{ color: spec.color }} />
                          {svc}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-white/25 mb-4">{s.markets}</p>
                    <div className="flex gap-3">
                      {spec.markets.map((m) => (
                        <span key={m} className="flex items-center gap-1.5 text-xs text-white/40">
                          <MapPin className="w-3 h-3" /> {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <MagneticButton to="/open-roles" variant="primary" icon={ArrowRight}>
                    {s.viewRoles}
                  </MagneticButton>
                </Reveal>
              </div>
            </div>
            {i < SPECIALITIES.length - 1 && (
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
            )}
          </section>
        );
      })}

      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 text-center">
        <Reveal>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] mb-5">{s.dontSee}</h2>
          <p className="text-white/45 mb-8 max-w-xl mx-auto">{s.dontSeeDesc}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <MagneticButton to="/contact" variant="primary" icon={ArrowRight}>{s.discussNeeds}</MagneticButton>
            <MagneticButton to="/staffing" variant="secondary">{s.viewStaffing}</MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}