import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { SERVICES, MEDIA } from "../data/content";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";

export default function Services() {
  const { t } = useLang();
  const s = t.services || {};

  return (
    <>
      <PageHero
        eyebrow={s.eyebrow || "Services"}
        title={s.title || "Everything Felipillon does — in one place"}
        subtitle={s.subtitle}
        img={MEDIA.teamWork}
        tall
      />

      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal className="mb-12">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-[#C9973A]" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">{s.allEyebrow}</span>
          </div>
          <h2 className="font-heading text-4xl font-light tracking-[-0.04em] leading-[1.06]">{s.allTitle}</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.title} delay={i * 0.07}>
              <div className="group relative rounded-2xl overflow-hidden border border-white/[0.07] hover:border-[#C9973A]/25 transition-all duration-500 h-full">
                <div className="absolute inset-0">
                  <img src={svc.img} alt={svc.title}
                    className="w-full h-full object-cover opacity-0 group-hover:opacity-[0.1] transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-[#07070A]/95" />
                </div>
                <div className="relative p-7">
                  <div className="w-12 h-12 rounded-xl bg-[#C9973A]/10 border border-[#C9973A]/20 flex items-center justify-center mb-5 group-hover:bg-[#C9973A]/15 transition-colors">
                    <svc.icon className="w-6 h-6 text-[#C9973A]" />
                  </div>
                  <h3 className="font-heading text-xl font-medium mb-3">{svc.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{svc.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 transition-all duration-500 bg-gradient-to-r from-[#C9973A] to-transparent" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative py-24 overflow-hidden mx-6 sm:mx-8 rounded-2xl mb-16">
        <img src={MEDIA.teamWork} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.18) saturate(0.5)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070A]/90 to-transparent" />
        <div className="relative px-10 sm:px-16 max-w-2xl">
          <Reveal>
            <h2 className="font-heading text-4xl font-light tracking-[-0.04em] leading-[1.06] mb-5">{s.notSureTitle}</h2>
            <p className="text-white/45 mb-8">{s.notSureDesc}</p>
            <MagneticButton to="/contact" variant="primary" icon={ArrowRight}>{s.startConversation}</MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}