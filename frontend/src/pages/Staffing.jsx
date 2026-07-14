import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { SPECIALITIES, MEDIA } from "../data/content";
import { ArrowRight, ArrowUpRight, Check, Users, Bot, Zap, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "../context/LangContext";

const STAFFING_SECTORS = SPECIALITIES.filter(s => s.id !== "technology");

export default function Staffing() {
  const { t } = useLang();
  const s = t.staffing || {};
  const p = s.process || {};
  const stats = s.stats || {};

  const PROCESS = [
    { step: "01", title: p.s1t, desc: p.s1d },
    { step: "02", title: p.s2t, desc: p.s2d },
    { step: "03", title: p.s3t, desc: p.s3d },
    { step: "04", title: p.s4t, desc: p.s4d },
  ];

  return (
    <>
      <PageHero
        eyebrow={s.eyebrow || "Staffing & Recruitment"}
        title={s.title || "Talent that moves your business forward"}
        subtitle={s.subtitle}
        img={MEDIA.team}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <MagneticButton to="/open-roles" variant="primary" icon={ArrowRight}>{s.viewRoles}</MagneticButton>
          <MagneticButton to="/contact" variant="secondary">{s.hireTalent}</MagneticButton>
        </motion.div>
      </PageHero>

      {/* Stats */}
      <section className="border-y border-white/[0.05] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { val: "500+", label: stats.placements },
            { val: "50+",  label: stats.platforms },
            { val: stats.avgTimeVal || "4 days", label: stats.avgTime },
            { val: "95%",  label: stats.retention },
          ].map((st) => (
            <div key={st.label} className="text-center">
              <p className="font-heading text-3xl font-light bg-gradient-to-r from-[#E8C07A] to-[#C9973A] bg-clip-text text-transparent">{st.val}</p>
              <p className="text-xs text-white/35 tracking-wide mt-1">{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal className="mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-[#C9973A]" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">{s.sectorsEyebrow}</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] leading-[1.06]">{s.sectorsTitle}</h2>
          <p className="text-white/45 mt-3 max-w-2xl">{s.sectorsSubtitle}</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {STAFFING_SECTORS.map((spec, i) => (
            <Reveal key={spec.id} delay={i * 0.07}>
              <div className="group relative rounded-2xl overflow-hidden border border-white/[0.07] hover:border-opacity-30 transition-all duration-500 p-7" data-testid={`sector-${spec.id}`}>
                <div className="absolute inset-0">
                  <img src={spec.img} alt={spec.name} className="w-full h-full object-cover opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#07070A] to-[#07070A]/90" />
                </div>
                <div className="relative flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${spec.color}14`, border: `1px solid ${spec.color}28` }}>
                    <spec.icon className="w-6 h-6" style={{ color: spec.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-medium text-white mb-2">{spec.name}</h3>
                    <p className="text-sm text-white/45 leading-relaxed mb-4">{spec.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {spec.services.map(sv => (
                        <span key={sv} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/[0.07] text-[10px] text-white/35">
                          <Check className="w-2.5 h-2.5" style={{ color: spec.color }} />{sv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: `linear-gradient(90deg, ${spec.color}, transparent)` }} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle, rgba(201,151,58,0.18) 1px, transparent 1px)", backgroundSize: "52px 52px" }} />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <Reveal className="mb-14">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-[#C9973A]" />
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">{s.processEyebrow}</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] text-center">{s.processTitle}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS.map((pr, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <GlowCard className="p-7 h-full">
                  <span className="font-mono text-xs text-[#C9973A] tracking-wider">{pr.step}</span>
                  <h4 className="font-heading text-lg font-medium text-white mt-3 mb-3">{pr.title}</h4>
                  <p className="text-sm text-white/40 leading-relaxed">{pr.desc}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why + photo */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#C9973A]" />
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">{s.whyEyebrow}</span>
            </div>
            <h2 className="font-heading text-4xl font-light tracking-[-0.04em] leading-[1.08] mb-6">{s.whyTitle}</h2>
            <div className="space-y-3 mb-10">
              {[
                { icon: Bot,   text: "People Match AI scans 50+ global platforms for the best fit" },
                { icon: Users, text: "Specialist recruiters with lived sector experience" },
                { icon: Zap,   text: "Shortlists delivered in days, not weeks" },
                { icon: Clock, text: "Follow-the-sun coverage across Germany, India and Philippines" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#C9973A]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-[#C9973A]" />
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <MagneticButton to="/contact" variant="primary" icon={ArrowUpRight}>{s.startConversation}</MagneticButton>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img src={MEDIA.team} alt="Team" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070A] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <GlowCard className="p-5">
                  <p className="text-sm text-white/60 italic">"From brief to shortlist in 4 days. Felipillon understands enterprise hiring better than anyone."</p>
                  <p className="text-xs text-[#C9973A] mt-3 font-medium">— Priya Nair, Head of Talent, Solaris Energy</p>
                </GlowCard>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}