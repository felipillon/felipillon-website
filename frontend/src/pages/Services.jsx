import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { StaggerGroup, fadeUp } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { SERVICES } from "../data/content";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Two divisions, one seamless engagement"
        subtitle="Whether you're scaling a team or shipping a platform, our integrated services cover the full spectrum of talent and technology." />

      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <motion.div key={s.title} variants={fadeUp}>
              <GlowCard className="p-8 h-full" data-testid={`service-${s.title.toLowerCase().replace(/\s/g, "-")}`}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/15 to-electric-500/15 flex items-center justify-center mb-5">
                  <s.icon className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="font-heading text-xl font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </GlowCard>
            </motion.div>
          ))}
        </StaggerGroup>

        <div className="mt-16 text-center">
          <MagneticButton to="/contact" variant="primary" icon={ArrowRight} data-testid="services-cta">Start a conversation</MagneticButton>
        </div>
      </section>
    </>
  );
}
