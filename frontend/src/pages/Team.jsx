import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { Counter } from "../components/shared/Counter";
import { TEAMS } from "../data/content";
import { Linkedin, Twitter } from "lucide-react";

export default function Team() {
  return (
    <>
      <PageHero eyebrow="Our Team" title="108 people. One culture of excellence."
        subtitle="Across five departments and three continents, our team brings together the sharpest recruiters and engineers in the industry." />
      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAMS.map((t, i) => (
            <Reveal key={t.dept} delay={i * 0.08}>
              <GlowCard glow={`${parseInt(t.color.slice(1,3),16)},${parseInt(t.color.slice(3,5),16)},${parseInt(t.color.slice(5,7),16)}`} className="p-8 h-full" data-testid={`team-${t.dept.toLowerCase().replace(/\s/g, "-")}`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${t.color}1a`, color: t.color }}>
                    <t.icon className="w-7 h-7" />
                  </div>
                  <div className="flex gap-2">
                    <span className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-emerald-500 transition-colors cursor-pointer"><Linkedin className="w-4 h-4" /></span>
                    <span className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-electric-500 transition-colors cursor-pointer"><Twitter className="w-4 h-4" /></span>
                  </div>
                </div>
                <h3 className="font-heading text-xl font-medium">{t.dept}</h3>
                <p className="mt-1 text-muted-foreground text-sm">
                  <span className="font-heading text-2xl font-light" style={{ color: t.color }}><Counter value={t.count} /></span> specialists
                </p>
                <div className="flex -space-x-2 mt-5">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-9 h-9 rounded-full border-2 border-background bg-gradient-to-br from-foreground/20 to-foreground/5" />
                  ))}
                  <div className="w-9 h-9 rounded-full border-2 border-background glass flex items-center justify-center text-[10px]">+{t.count - 5}</div>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
