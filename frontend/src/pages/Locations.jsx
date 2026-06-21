import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { Globe } from "../components/shared/Globe";
import { SectionHeading } from "../components/shared/SectionHeading";
import { LOCATIONS } from "../data/content";
import { MapPin, Clock, Building2 } from "lucide-react";

export default function Locations() {
  return (
    <>
      <PageHero eyebrow="Locations" title="A truly global footprint"
        subtitle="Three strategic hubs across Europe and Asia-Pacific, working as one borderless team." />

      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <Globe />
        <div className="space-y-6">
          {LOCATIONS.map((l, i) => (
            <Reveal key={l.city} delay={i * 0.1}>
              <GlowCard className="p-7" data-testid={`location-${l.city.toLowerCase().replace(/\s/g, "-")}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-2xl font-medium">{l.city}<span className="text-muted-foreground text-base font-body ml-2">{l.country}</span></h3>
                    <p className="text-emerald-500 text-sm mt-1 flex items-center gap-1.5"><Building2 className="w-4 h-4" />{l.role}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full glass text-xs font-mono flex items-center gap-1.5"><Clock className="w-3 h-3" />{l.tz}</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0" />{l.addr}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
