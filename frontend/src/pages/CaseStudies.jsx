import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { Counter } from "../components/shared/Counter";
import { CASE_STUDIES } from "../data/content";
import { ArrowUpRight } from "lucide-react";

export default function CaseStudies() {
  const parseMetric = (m) => {
    const num = parseInt(m.replace(/[^0-9]/g, ""), 10);
    const suffix = m.replace(/[0-9,]/g, "");
    return { num, suffix };
  };

  return (
    <>
      <PageHero eyebrow="Case Studies" title="Outcomes that speak louder than promises"
        subtitle="A selection of engagements where Felipillon talent and technology moved the needle for our clients." />

      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {CASE_STUDIES.map((c, i) => {
            const { num, suffix } = parseMetric(c.metric);
            const rgb = `${parseInt(c.color.slice(1,3),16)},${parseInt(c.color.slice(3,5),16)},${parseInt(c.color.slice(5,7),16)}`;
            return (
              <Reveal key={c.id} delay={i * 0.08}>
                <GlowCard glow={rgb} className="p-10 h-full flex flex-col justify-between min-h-[320px]" data-testid={`case-${c.id}`}>
                  <div>
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: c.color }}>{c.category}</span>
                    <h3 className="font-heading text-2xl font-medium mt-4 leading-snug">{c.title}</h3>
                  </div>
                  <div className="mt-8 flex items-end gap-4">
                    <div className="font-heading text-6xl font-light" style={{ color: c.color }}>
                      <Counter value={num} suffix={suffix} />
                    </div>
                    <div className="pb-2">
                      <p className="font-medium text-sm">{c.metricLabel}</p>
                      <p className="text-xs text-muted-foreground">{c.sub}</p>
                    </div>
                    <ArrowUpRight className="w-6 h-6 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
