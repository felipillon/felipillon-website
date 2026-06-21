import { useState } from "react";
import { PageHero } from "../components/layout/Layout";
import { Reveal } from "../components/shared/Reveal";
import { INDUSTRIES } from "../data/content";
import { motion } from "framer-motion";

export default function Industries() {
  const [active, setActive] = useState(INDUSTRIES[0].id);

  return (
    <>
      <PageHero eyebrow="Industries" title="Deep expertise across four high-stakes sectors"
        subtitle="We don't generalize. Each industry has a dedicated team that speaks its language and understands its talent landscape." />

      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8 space-y-6">
        {INDUSTRIES.map((ind, i) => (
          <Reveal key={ind.id} delay={i * 0.06}>
            <div
              onMouseEnter={() => setActive(ind.id)}
              className="group relative rounded-3xl overflow-hidden h-[300px] flex items-end cursor-pointer"
              data-testid={`industry-${ind.id}`}
            >
              <img src={ind.img} alt={ind.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/20" />
              <div className="relative p-8 sm:p-12 max-w-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center" style={{ color: ind.color }}>
                    <ind.icon className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-sm text-white/60">0{i + 1}</span>
                </div>
                <h3 className="font-heading text-3xl sm:text-4xl font-medium text-white">{ind.name}</h3>
                <p className="mt-3 text-white/70 max-w-lg">{ind.desc}</p>
              </div>
              <motion.div className="absolute bottom-0 left-0 h-1" style={{ background: ind.color }}
                animate={{ width: active === ind.id ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}
