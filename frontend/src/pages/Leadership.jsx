import { PageHero } from "../components/layout/Layout";
import { Reveal } from "../components/shared/Reveal";
import { LEADERSHIP } from "../data/content";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const TiltCard = ({ p, i }) => {
  const handleMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
  };
  const reset = (e) => { e.currentTarget.style.transform = "perspective(900px) rotateY(0) rotateX(0)"; };

  return (
    <Reveal delay={i * 0.08}>
      <div onMouseMove={handleMove} onMouseLeave={reset}
        className="group relative rounded-2xl glass p-8 transition-transform duration-200 will-change-transform"
        data-testid={`leader-${p.name.toLowerCase().replace(/\s/g, "-")}`}>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 to-electric-500/0 group-hover:from-emerald-500/5 group-hover:to-electric-500/5 transition-colors" />
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-electric-500 flex items-center justify-center text-white font-heading text-2xl font-medium mb-6">
            {p.initials}
          </div>
          <h3 className="font-heading text-xl font-medium">{p.name}</h3>
          <p className="text-emerald-500 text-sm mt-1">{p.role}</p>
          <p className="text-muted-foreground text-xs mt-1">{p.office}</p>
          <a href="#" aria-label="LinkedIn" className="mt-5 inline-flex w-10 h-10 rounded-full glass items-center justify-center hover:text-electric-500 transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </Reveal>
  );
};

export default function Leadership() {
  return (
    <>
      <PageHero eyebrow="Leadership" title="The minds steering Felipillon forward"
        subtitle="A leadership team spanning recruitment, engineering and AI — united by a relentless standard for excellence." />
      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEADERSHIP.map((p, i) => <TiltCard key={p.name} p={p} i={i} />)}
        </div>
      </section>
    </>
  );
}
