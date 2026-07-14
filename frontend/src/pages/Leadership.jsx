import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { LEADERSHIP, MEDIA, WHY_WIN } from "../data/content";
import { ArrowRight, Linkedin, Check } from "lucide-react";
import { useLang } from "../context/LangContext";

export default function Leadership() {
  const { t } = useLang();
  const l = t.leadership || {};

  return (
    <>
      <PageHero
        eyebrow={l.eyebrow || "Leadership"}
        title={l.title || "The team that leads Felipillon"}
        subtitle={l.subtitle}
        img={MEDIA.aboutMission}
        tall
      />

      {/* CEO */}
      <section className="relative">
        <div className="grid lg:grid-cols-2 min-h-[70vh]">
          <div className="relative">
            <img src={MEDIA.interview} alt="CEO" className="w-full h-full object-cover min-h-[50vh]" style={{ filter: "brightness(0.35) saturate(0.7)" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#07070A]/90" />
          </div>
          <div className="flex items-center p-10 sm:p-20 bg-[#07070A]/50">
            <Reveal className="max-w-lg">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-[#C9973A]" />
                <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">
                  {l.ceoRole || "Founder & CEO · Germany"}
                </span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] text-white mb-2">
                Ketan Bhanudas Barve
              </h2>
              <p className="text-[#C9973A] text-sm mb-8">{l.ceoRole}</p>
              <p className="text-white/50 leading-relaxed mb-5">{l.ceoBody1}</p>
              <blockquote className="border-l-2 border-[#C9973A]/40 pl-5 mb-8">
                <p className="text-white/60 italic text-sm leading-relaxed">"{l.ceoQuote}"</p>
              </blockquote>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#C9973A]/50 hover:text-[#C9973A] transition-colors cursor-pointer">
                  <Linkedin className="w-4 h-4" />
                </span>
                <MagneticButton to="/about" variant="ghost" icon={ArrowRight}>{l.ourStory}</MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Senior team */}
      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal className="mb-12">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-[#C9973A]" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">{l.seniorEyebrow}</span>
          </div>
          <h2 className="font-heading text-4xl font-light tracking-[-0.04em]">{l.seniorTitle}</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LEADERSHIP.slice(1).map((lead, i) => (
            <Reveal key={lead.name} delay={i * 0.08}>
              <GlowCard className="p-0 overflow-hidden h-full group">
                <div className="relative h-52 bg-gradient-to-br from-[#C9973A]/10 to-[#07070A]">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#C9973A] to-[#8A6020] flex items-center justify-center text-black font-heading text-4xl font-medium">
                      {lead.initials}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070A]/60 to-transparent" />
                </div>
                <div className="p-7">
                  <h3 className="font-heading text-xl font-medium text-white mb-1">{lead.name}</h3>
                  <p className="text-[#C9973A] text-xs mb-1">{lead.role}</p>
                  <p className="text-white/30 text-xs mb-4">{lead.office}</p>
                  <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#C9973A]/50 hover:text-[#C9973A] transition-colors cursor-pointer">
                    <Linkedin className="w-3.5 h-3.5" />
                  </span>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative py-24 overflow-hidden">
        <img src={MEDIA.officeWide} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.12) saturate(0.4)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070A] via-transparent to-[#07070A]" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <Reveal className="mb-12">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-[#C9973A]" />
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">{l.philosophyEyebrow}</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em]">{l.philosophyTitle}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {WHY_WIN.map((w, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="flex items-start gap-3 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-[#C9973A]/20 transition-colors">
                  <div className="w-5 h-5 rounded-full bg-[#C9973A]/15 border border-[#C9973A]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#C9973A]" />
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">{w}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}