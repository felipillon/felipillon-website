import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { Counter } from "../components/shared/Counter";
import { MagneticButton } from "../components/shared/MagneticButton";
import { VALUES, TIMELINE, MEDIA, WHY_WIN } from "../data/content";
import { ArrowRight, Check } from "lucide-react";
import { useLang } from "../context/LangContext";

export default function About() {
  const { t } = useLang();
  const a = t.about || {};

  return (
    <>
      <PageHero
        eyebrow={a.eyebrow || "About Felipillon"}
        title={a.title || "Connecting people with opportunity"}
        subtitle={a.subtitle}
        img={MEDIA.about}
        tall
      />

      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#C9973A]" />
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">{a.missionEyebrow}</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] leading-[1.06] mb-6">
              {a.missionTitle}
            </h2>
            <p className="text-white/50 leading-relaxed mb-4">{a.missionBody1}</p>
            <p className="text-white/40 leading-relaxed mb-8">{a.missionBody2}</p>
            <div className="space-y-3">
              {WHY_WIN.slice(0, 4).map((w, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C9973A]/15 border border-[#C9973A]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#C9973A]" />
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">{w}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-video">
                <img src={MEDIA.aboutTeam} alt="Felipillon team" className="w-full h-full object-cover" style={{ filter: "brightness(0.65) saturate(0.8)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-xl overflow-hidden aspect-square">
                  <img src={MEDIA.berlinOffice} alt="Berlin office" className="w-full h-full object-cover" style={{ filter: "brightness(0.55)" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs text-[#C9973A] font-semibold">Germany</p>
                    <p className="text-xs text-white/50">Global HQ</p>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-square">
                  <img src={MEDIA.teamWork} alt="Team working" className="w-full h-full object-cover" style={{ filter: "brightness(0.55)" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs text-[#C9973A] font-semibold">India + Philippines</p>
                    <p className="text-xs text-white/50">Tech & Ops</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Metrics on photo */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={MEDIA.officeWide} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.15) saturate(0.5)" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07070A] via-transparent to-[#07070A]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { val: 500, suf: "+", label: t.metrics?.placementsMade },
              { val: 50,  suf: "+", label: t.metrics?.projectsDelivered },
              { val: 3,   suf: "",  label: t.metrics?.countryOffices },
              { val: 95,  suf: "%", label: t.metrics?.clientSatisfaction },
            ].map((m, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="py-8">
                  <div className="font-heading text-5xl sm:text-6xl font-light bg-gradient-to-r from-[#E8C07A] to-[#C9973A] bg-clip-text text-transparent">
                    <Counter value={m.val} suffix={m.suf} />
                  </div>
                  <p className="mt-3 text-xs tracking-[0.2em] uppercase text-white/35">{m.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal className="mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-[#C9973A]" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">{a.valuesEyebrow}</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em]">{a.valuesTitle}</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <GlowCard className="p-7 h-full">
                <div className="font-heading text-5xl font-light text-[#C9973A]/20 mb-4">0{i + 1}</div>
                <h3 className="font-heading text-xl font-medium mb-3">{v.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{v.desc}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={MEDIA.berlin} alt="Berlin" className="w-full h-full object-cover" style={{ filter: "brightness(0.12) saturate(0.5)" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07070A] via-transparent to-[#07070A]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <Reveal className="mb-14">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-[#C9973A]" />
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">{a.journeyEyebrow}</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em]">{a.journeyTitle}</h2>
          </Reveal>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9973A]/50 via-[#C9973A]/20 to-transparent ml-4 hidden sm:block" />
            <div className="space-y-8">
              {TIMELINE.map((tl, i) => (
                <Reveal key={tl.year} delay={i * 0.08}>
                  <div className="sm:pl-14 relative">
                    <div className="absolute left-0 top-1.5 w-9 h-9 rounded-full bg-[#C9973A]/15 border border-[#C9973A]/40 flex items-center justify-center hidden sm:flex">
                      <div className="w-2 h-2 rounded-full bg-[#C9973A]" />
                    </div>
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="font-heading text-2xl font-light text-[#C9973A]">{tl.year}</span>
                      <h4 className="font-heading text-xl font-medium text-white">{tl.title}</h4>
                    </div>
                    <p className="text-sm text-white/45 leading-relaxed">{tl.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8 text-center">
        <Reveal>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] mb-5">{a.readyTitle}</h2>
          <p className="text-white/45 mb-8 max-w-xl mx-auto">{a.readyDesc}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <MagneticButton to="/contact" variant="primary" icon={ArrowRight}>{a.getInTouch}</MagneticButton>
            <MagneticButton to="/team" variant="secondary">{a.meetTeam}</MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}