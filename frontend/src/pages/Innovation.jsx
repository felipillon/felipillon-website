import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { SectionHeading } from "../components/shared/SectionHeading";
import { DIVISIONS, VIDEOS } from "../data/content";
import { ArrowRight, Bot, Code2, Cloud, Workflow, Layers, Boxes } from "lucide-react";

const icons = [Bot, Code2, Layers, Cloud, Workflow, Boxes];

export default function Innovation() {
  return (
    <>
      <section className="relative pt-40 pb-20 overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-[0.15]">
          <source src={VIDEOS.code} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-electric-500 mb-5">
              <span className="w-6 h-px bg-electric-500" />Felipillon Innovation
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter leading-[1.02] max-w-4xl">
              Custom software & <span className="text-gradient">AI engineering</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">We design, build and scale production-grade platforms — from LLM applications to cloud-native systems and intelligent automation.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8"><MagneticButton to="/contact" variant="primary" icon={ArrowRight}>Start a Project</MagneticButton></div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIVISIONS.innovation.services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={s} delay={i * 0.06}>
                <GlowCard glow="59,130,246" className="p-8 h-full" data-testid={`innovation-${s.toLowerCase().replace(/[\s.]/g, "-")}`}>
                  <div className="w-12 h-12 rounded-xl bg-electric-500/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-electric-500" />
                  </div>
                  <h3 className="font-heading text-xl font-medium">{s}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Enterprise-grade {s.toLowerCase()} engineered for scale, security and speed.</p>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
        <SectionHeading eyebrow="Tech Stack" title="Modern by default" center />
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {["React", "TypeScript", "Next.js", "Python", "FastAPI", "PostgreSQL", "AWS", "GCP", "Kubernetes", "LangChain", "TailwindCSS", "Node.js"].map((t, i) => (
            <Reveal key={t} delay={i * 0.03}>
              <span className="px-5 py-2.5 rounded-full glass font-mono text-sm hover:border-electric-500/50 transition-colors">{t}</span>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
