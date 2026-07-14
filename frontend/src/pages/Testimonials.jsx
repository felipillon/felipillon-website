import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { TESTIMONIALS, MEDIA } from "../data/content";
import { ArrowRight } from "lucide-react";
import { useLang } from "../context/LangContext";

export default function Testimonials() {
  const { t } = useLang();
  const tm = t.testimonials || {};

  return (
    <>
      <PageHero
        eyebrow={tm.eyebrow || "Testimonials"}
        title={tm.title || "Trusted by the people we serve"}
        subtitle={tm.subtitle}
        img={MEDIA.interview}
        tall
      />

      <section className="py-16">
        {TESTIMONIALS.map((item, i) => {
          const isEven = i % 2 === 0;
          const bgImgs = [MEDIA.healthcare, MEDIA.servers, MEDIA.staffing, MEDIA.construction];
          return (
            <div key={i} className="relative mb-0.5">
              <div className="grid lg:grid-cols-2 min-h-[50vh]">
                <div className={`relative min-h-[35vh] ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <img
                    src={bgImgs[i % bgImgs.length]}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.2) saturate(0.5)" }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-${isEven ? "r" : "l"} from-transparent to-[#07070A]/90`} />
                  <div className="absolute top-8 left-8">
                    <p className="text-[#C9973A] text-2xl tracking-widest">★★★★★</p>
                  </div>
                  <div className="absolute bottom-6 right-8 font-heading text-[8rem] leading-none text-white/[0.04] select-none">"</div>
                </div>
                <div className={`flex items-center p-10 sm:p-16 bg-[#07070A]/60 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <Reveal className="max-w-lg">
                    <p className="font-heading text-2xl sm:text-3xl font-light text-white leading-[1.35] mb-8 italic">
                      "{item.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9973A] to-[#8A6020] flex items-center justify-center text-black font-bold text-lg shrink-0">
                        {item.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="text-sm text-white/40">{item.title}</p>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            </div>
          );
        })}
      </section>

      {/* Satisfaction metric */}
      <div className="relative py-16 overflow-hidden">
        <img src={MEDIA.team} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.12) saturate(0.4)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070A] via-transparent to-[#07070A]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <p className="font-heading text-4xl sm:text-5xl font-light text-white mb-3">95%</p>
            <p className="text-[#C9973A] text-sm tracking-widest uppercase mb-2">{tm.satisfactionRate}</p>
            <p className="text-white/35 text-sm">{tm.satisfactionDesc}</p>
          </Reveal>
        </div>
      </div>

      {/* CTA */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 text-center">
        <Reveal>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] mb-5">{tm.addYourStory}</h2>
          <p className="text-white/45 mb-8 max-w-xl mx-auto">{tm.addYourStoryDesc}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <MagneticButton to="/contact" variant="primary" icon={ArrowRight}>{tm.startConversation}</MagneticButton>
            <MagneticButton to="/case-studies" variant="secondary">{tm.viewCaseStudies}</MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}