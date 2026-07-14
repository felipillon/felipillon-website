import { PageHero } from "../components/layout/Layout";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { Counter } from "../components/shared/Counter";
import { CASE_STUDIES, MEDIA } from "../data/content";
import { ArrowRight } from "lucide-react";
import { useLang } from "../context/LangContext";

export default function CaseStudies() {
  const { t } = useLang();
  const cs = t.caseStudies || {};

  return (
    <>
      <PageHero
        eyebrow={cs.eyebrow || "Case Studies"}
        title={cs.title || "Outcomes that speak louder than promises"}
        subtitle={cs.subtitle}
        img={MEDIA.teamMeeting}
        tall
      />

      <section className="py-16">
        {CASE_STUDIES.map((c, i) => {
          const isEven = i % 2 === 0;
          const numStr = c.metric.replace(/[^0-9]/g, "");
          const num = parseInt(numStr, 10) || 0;
          const suffix = c.metric.replace(/[0-9,]/g, "");
          return (
            <div key={c.id} className="relative mb-0.5">
              <div className="grid lg:grid-cols-2 min-h-[60vh]">
                <div className={`relative ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover min-h-[40vh]"
                    style={{ filter: "brightness(0.35) saturate(0.7)" }} loading="lazy" />
                  <div className={`absolute inset-0 bg-gradient-to-${isEven ? "r" : "l"} from-transparent to-[#07070A]/80`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-heading font-light leading-none" style={{ fontSize: "clamp(4rem, 10vw, 8rem)", color: c.color }}>
                        {num > 0 ? <Counter value={num} suffix={suffix} /> : c.metric}
                      </div>
                      <p className="text-white/50 text-sm mt-2">{c.metricLabel}</p>
                      <p className="text-white/25 text-xs">{c.sub}</p>
                    </div>
                  </div>
                </div>
                <div className={`flex items-center p-10 sm:p-16 bg-[#07070A]/70 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <Reveal className="max-w-lg">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border mb-6"
                      style={{ color: c.color, borderColor: `${c.color}30`, background: `${c.color}0D` }}>
                      {c.category}
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl font-light tracking-[-0.03em] leading-[1.12] text-white mb-5">
                      {c.title}
                    </h2>
                    <p className="text-white/50 leading-relaxed mb-8">{c.desc}</p>
                    <MagneticButton to="/contact" variant="secondary" icon={ArrowRight}>
                      {cs.discussProject}
                    </MagneticButton>
                  </Reveal>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            </div>
          );
        })}
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 text-center">
        <Reveal>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] mb-5">{cs.nextStory}</h2>
          <p className="text-white/45 mb-8 max-w-xl mx-auto">{cs.nextStoryDesc}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <MagneticButton to="/contact" variant="primary" icon={ArrowRight}>{cs.startConversation}</MagneticButton>
            <MagneticButton to="/specialities" variant="secondary">{cs.ourSpecialities}</MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}