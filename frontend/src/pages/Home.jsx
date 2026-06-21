import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Globe2, Code2, Check } from "lucide-react";
import { Particles } from "../components/shared/Particles";
import { MagneticButton } from "../components/shared/MagneticButton";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal, StaggerGroup, fadeUp } from "../components/shared/Reveal";
import { SectionHeading } from "../components/shared/SectionHeading";
import { Counter } from "../components/shared/Counter";
import { Globe } from "../components/shared/Globe";
import { Link } from "react-router-dom";
import { INDUSTRIES, WHY, METRICS, DIVISIONS, TRUSTED, TESTIMONIALS, VIDEOS } from "../data/content";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden" data-testid="hero-section">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-[0.18]">
        <source src={VIDEOS.network} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 aurora" />
      <div className="absolute inset-0"><Particles density={70} /></div>
      <div className="absolute inset-0 grid-bg opacity-20" />

      <motion.div style={{ y, opacity }} className="relative max-w-7xl mx-auto px-6 sm:px-8 w-full pt-20">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-emerald-500 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Berlin · Pune · Makati City
          </span>
        </Reveal>
        <h1 className="font-heading text-5xl sm:text-6xl lg:text-[5.5rem] font-light tracking-tighter leading-[0.98] max-w-5xl">
          {["AI-Driven Human Capital", "& Custom Software", "Solutions"].map((line, i) => (
            <motion.span key={i} className="block overflow-hidden">
              <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}>
                {i === 1 ? <span className="text-gradient">{line}</span> : line}
              </motion.span>
            </motion.span>
          ))}
        </h1>
        <Reveal delay={0.6}>
          <p className="mt-7 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Powering the future of work across Healthcare, Renewable Energy, Construction, and Technology.
          </p>
        </Reveal>
        <Reveal delay={0.75}>
          <div className="mt-10 flex flex-wrap gap-4">
            <MagneticButton to="/staffing" variant="primary" icon={ArrowRight} data-testid="hero-hire-btn">Hire Top Talent</MagneticButton>
            <MagneticButton to="/services" variant="secondary" data-testid="hero-services-btn">Explore Services</MagneticButton>
            <MagneticButton to="/open-roles" variant="ghost" data-testid="hero-roles-btn">View Open Roles</MagneticButton>
          </div>
        </Reveal>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div className="w-px h-10 bg-gradient-to-b from-emerald-500 to-transparent" animate={{ scaleY: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
      </div>
    </section>
  );
};

const Marquee = () => (
  <section className="py-16 border-y border-border overflow-hidden" data-testid="trusted-by">
    <p className="text-center text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">Trusted by enterprise leaders</p>
    <div className="relative">
      <div className="flex w-max animate-marquee">
        {[...TRUSTED, ...TRUSTED].map((name, i) => (
          <div key={i} className="mx-10 font-heading text-2xl font-semibold tracking-wider text-muted-foreground/40 hover:text-foreground transition-colors whitespace-nowrap">
            {name}
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
    </div>
  </section>
);

const Divisions = () => (
  <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8" data-testid="divisions-section">
    <SectionHeading eyebrow="Two Divisions. One Vision." title="A complete partner for talent & technology"
      subtitle="From elite human capital to enterprise-grade software, Felipillon delivers both halves of the modern competitive advantage." />
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-14">
      <GlowCard glow="16,185,129" className="md:col-span-7 p-8 sm:p-10 min-h-[380px] flex flex-col justify-between" data-testid="division-staffing">
        <div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
            <Globe2 className="w-7 h-7 text-emerald-500" />
          </div>
          <h3 className="font-heading text-3xl font-medium">{DIVISIONS.staffing.name}</h3>
          <p className="mt-3 text-muted-foreground max-w-md">{DIVISIONS.staffing.tagline} — placing exceptional people where they make the greatest impact.</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {DIVISIONS.staffing.services.map((s) => (
            <span key={s} className="px-4 py-2 rounded-full glass text-sm flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" />{s}</span>
          ))}
        </div>
        <Link to="/staffing" className="mt-8 inline-flex items-center gap-2 text-emerald-500 font-medium group">
          Explore Staffing <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </GlowCard>

      <GlowCard glow="59,130,246" className="md:col-span-5 p-8 sm:p-10 min-h-[380px] flex flex-col justify-between" data-testid="division-innovation">
        <div>
          <div className="w-14 h-14 rounded-2xl bg-electric-500/10 flex items-center justify-center mb-6">
            <Code2 className="w-7 h-7 text-electric-500" />
          </div>
          <h3 className="font-heading text-3xl font-medium">{DIVISIONS.innovation.name}</h3>
          <p className="mt-3 text-muted-foreground">{DIVISIONS.innovation.tagline} for ambitious organizations.</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {DIVISIONS.innovation.services.map((s) => (
            <span key={s} className="px-3 py-1.5 rounded-full glass text-xs">{s}</span>
          ))}
        </div>
        <Link to="/innovation" className="mt-8 inline-flex items-center gap-2 text-electric-500 font-medium group">
          Explore Innovation <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </GlowCard>
    </div>
  </section>
);

const IndustriesPreview = () => (
  <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8" data-testid="industries-preview">
    <SectionHeading eyebrow="Industries" title="Specialists where it matters most" center />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
      {INDUSTRIES.map((ind, i) => (
        <Reveal key={ind.id} delay={i * 0.08}>
          <Link to="/industries">
            <div className="group relative h-[340px] rounded-2xl overflow-hidden" data-testid={`industry-card-${ind.id}`}>
              <img src={ind.img} alt={ind.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-4" style={{ color: ind.color }}>
                  <ind.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-medium text-white">{ind.name}</h3>
                <p className="text-sm text-white/70 mt-1 line-clamp-2">{ind.desc}</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" style={{ background: ind.color }} />
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  </section>
);

const Why = () => (
  <section className="py-24 sm:py-32 relative overflow-hidden" data-testid="why-section">
    <div className="absolute inset-0 grid-bg opacity-30" />
    <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
      <SectionHeading eyebrow="Why Felipillon" title="Built for enterprises that can't afford to compromise" center />
      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {WHY.map((w) => (
          <motion.div key={w.title} variants={fadeUp}>
            <GlowCard className="p-8 h-full" data-testid={`why-card-${w.title.toLowerCase().replace(/\s/g, "-")}`}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/15 to-electric-500/15 flex items-center justify-center mb-5">
                <w.icon className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="font-heading text-xl font-medium">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
            </GlowCard>
          </motion.div>
        ))}
      </StaggerGroup>
    </div>
  </section>
);

const Metrics = () => (
  <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8" data-testid="metrics-section">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {METRICS.map((m, i) => (
        <Reveal key={m.label} delay={i * 0.1}>
          <div className="text-center p-8 rounded-2xl glass">
            <div className="font-heading text-5xl sm:text-6xl font-light text-gradient">
              <Counter value={m.value} suffix={m.suffix} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground tracking-wide uppercase">{m.label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

const Footprint = () => (
  <section className="py-24 sm:py-32 relative overflow-hidden" data-testid="footprint-section">
    <div className="absolute inset-0 grid-bg opacity-30" />
    <div className="relative max-w-7xl mx-auto px-6 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <SectionHeading eyebrow="Global Footprint" title="Three hubs. One borderless network."
          subtitle="A follow-the-sun operating model spanning Europe and Asia-Pacific, delivering talent and technology around the clock." />
        <div className="mt-8 space-y-3">
          {[["Berlin", "Global Headquarters"], ["Pune", "Engineering & Delivery"], ["Makati City", "APAC Operations"]].map(([c, r], i) => (
            <Reveal key={c} delay={i * 0.1}>
              <div className="flex items-center gap-4 p-4 rounded-xl glass">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-heading font-medium">{c}</span>
                <span className="text-sm text-muted-foreground ml-auto">{r}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <Globe />
    </div>
  </section>
);

const TestimonialsStrip = () => (
  <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8" data-testid="home-testimonials">
    <SectionHeading eyebrow="Testimonials" title="Trusted by the people we serve" center />
    <div className="grid md:grid-cols-2 gap-6 mt-14">
      {TESTIMONIALS.slice(0, 2).map((t, i) => (
        <Reveal key={i} delay={i * 0.1}>
          <GlowCard className="p-8">
            <p className="text-lg leading-relaxed">"{t.quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-electric-500 flex items-center justify-center text-white font-medium">{t.name[0]}</div>
              <div>
                <p className="font-medium text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.title}</p>
              </div>
            </div>
          </GlowCard>
        </Reveal>
      ))}
    </div>
    <div className="text-center mt-10">
      <MagneticButton to="/testimonials" variant="ghost" icon={ArrowRight}>Read all stories</MagneticButton>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
    <div className="relative rounded-3xl overflow-hidden p-12 sm:p-20 text-center glass">
      <div className="absolute inset-0 aurora" />
      <div className="relative">
        <Reveal>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-tight max-w-2xl mx-auto">Let's build your competitive advantage</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">Whether you need elite talent or transformative software, our teams are ready.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-9 flex flex-wrap gap-4 justify-center">
            <MagneticButton to="/contact" variant="primary" icon={ArrowRight} data-testid="cta-contact-btn">Send Inquiry</MagneticButton>
            <MagneticButton to="/open-roles" variant="secondary">View Open Roles</MagneticButton>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Divisions />
      <IndustriesPreview />
      <Why />
      <Metrics />
      <Footprint />
      <TestimonialsStrip />
      <CTA />
    </>
  );
}
