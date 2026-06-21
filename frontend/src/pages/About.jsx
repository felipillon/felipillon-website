import { PageHero } from "../components/layout/Layout";
import { SectionHeading } from "../components/shared/SectionHeading";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { Counter } from "../components/shared/Counter";
import { VALUES, TIMELINE, METRICS, MEDIA } from "../data/content";
import { Target, Eye } from "lucide-react";

export default function About() {
  return (
    <>
      <PageHero eyebrow="About Felipillon" title="Connecting exceptional people with extraordinary technology"
        subtitle="Since 2019, Felipillon has grown from a Berlin recruitment specialist into a global force in human capital and software innovation." />

      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8 grid md:grid-cols-2 gap-6">
        <GlowCard glow="16,185,129" className="p-10" data-testid="mission-card">
          <Target className="w-9 h-9 text-emerald-500 mb-5" />
          <h3 className="font-heading text-2xl font-medium">Our Mission</h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">To empower organizations with the people and platforms they need to lead their industries — combining AI-driven recruitment with world-class engineering.</p>
        </GlowCard>
        <GlowCard glow="59,130,246" className="p-10" data-testid="vision-card">
          <Eye className="w-9 h-9 text-electric-500 mb-5" />
          <h3 className="font-heading text-2xl font-medium">Our Vision</h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">A future where talent and technology flow freely across borders, and every ambitious company has access to the very best of both.</p>
        </GlowCard>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
        <SectionHeading eyebrow="Core Values" title="The principles behind every decision" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <GlowCard className="p-7 h-full">
                <span className="font-mono text-emerald-500 text-sm">0{i + 1}</span>
                <h3 className="font-heading text-xl font-medium mt-3">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
        <SectionHeading eyebrow="Our Journey" title="A story of global expansion" />
        <div className="mt-14 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-electric-500 to-transparent" />
          <div className="space-y-12">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.05}>
                <div className={`relative flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 ml-12 md:ml-0 ${i % 2 === 0 ? "md:text-right" : ""}`}>
                    <GlowCard className="p-6 inline-block w-full md:w-auto">
                      <span className="font-mono text-emerald-500 text-sm">{t.year}</span>
                      <h4 className="font-heading text-xl font-medium mt-1">{t.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
                    </GlowCard>
                  </div>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-background" />
                  <div className="hidden md:block flex-1" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <div className="text-center p-8 rounded-2xl glass">
                <div className="font-heading text-5xl font-light text-gradient"><Counter value={m.value} suffix={m.suffix} /></div>
                <p className="mt-3 text-sm text-muted-foreground uppercase tracking-wide">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
