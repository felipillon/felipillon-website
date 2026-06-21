import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { SectionHeading } from "../components/shared/SectionHeading";
import { DIVISIONS, INDUSTRIES, MEDIA } from "../data/content";
import { ArrowRight, Check } from "lucide-react";

export default function Staffing() {
  return (
    <>
      <PageHero eyebrow="Felipillon Staffing & Recruitment" title="AI-driven human capital solutions"
        subtitle="We combine deep sector knowledge with a proprietary AI matching engine to place exceptional talent — fast, and with precision.">
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap gap-4">
            <MagneticButton to="/open-roles" variant="primary" icon={ArrowRight}>View Open Roles</MagneticButton>
            <MagneticButton to="/contact" variant="secondary">Hire Talent</MagneticButton>
          </div>
        </Reveal>
      </PageHero>

      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.id} delay={i * 0.08}>
              <GlowCard className="p-8 h-full flex gap-5">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-emerald-500/10 flex items-center justify-center" style={{ color: ind.color }}>
                  <ind.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-medium">{ind.name}</h3>
                  <p className="mt-2 text-muted-foreground">{ind.desc}</p>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
        <SectionHeading eyebrow="Our Process" title="From brief to offer in days, not months" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {["Discovery & calibration", "AI-powered sourcing", "Rigorous human screening", "Offer & onboarding"].map((step, i) => (
            <Reveal key={step} delay={i * 0.08}>
              <GlowCard className="p-7 h-full">
                <span className="font-mono text-emerald-500">Step 0{i + 1}</span>
                <p className="mt-3 font-heading text-lg font-medium">{step}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
