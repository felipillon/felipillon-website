import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { Counter } from "../components/shared/Counter";
import { CursorFollower } from "../components/shared/CursorFollower";
import { AmbientBackground } from "../components/shared/AmbientBackground";
import { ScrollProgress } from "../components/shared/ScrollProgress";
import { TEAMS, LEADERSHIP, MEDIA } from "../data/content";
import { ArrowRight, Linkedin } from "lucide-react";
import { useLang } from "../context/LangContext";

export default function Team() {
  const { t } = useLang();
  const tm = t.team || {};
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prevBg = document.body.style.background;
    document.body.style.background = "#FBF8F3";
    setReady(true);
    return () => { document.body.style.background = prevBg; };
  }, []);

  return (
    <div className="relative bg-[#FBF8F3] text-brown-500">
      <ScrollProgress />
      <AmbientBackground />
      {ready && <CursorFollower />}

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full bg-white border border-brown-500/10 shadow-[0_2px_16px_-4px_rgba(61,35,20,0.1)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">{tm.eyebrow || "Our Team"}</span>
          </motion.div>
          <h1 className="font-heading font-light leading-[0.96] tracking-[-0.05em] text-4xl sm:text-6xl lg:text-[4.6rem] text-[#231911] max-w-3xl">
            {tm.title || "The people behind every placement"}
          </h1>
          {tm.subtitle && <p className="mt-7 text-lg text-brown-500/55 max-w-xl leading-relaxed font-light">{tm.subtitle}</p>}
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal className="mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-gold" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">{tm.leadershipEyebrow}</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] text-[#231911]">{tm.leadershipTitle}</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LEADERSHIP.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.08}>
              <GlowCard variant="light" className="p-0 overflow-hidden h-full group">
                <div className="relative h-40 bg-gradient-to-br from-gold/10 to-cream-100">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-gold-300 to-gold-700 flex items-center justify-center text-white font-heading text-2xl font-medium">
                      {l.initials}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-medium text-[#231911] mb-1">{l.name}</h3>
                  <p className="text-gold-600 text-xs mb-1">{l.role}</p>
                  <p className="text-brown-500/35 text-xs">{l.office}</p>
                  <div className="mt-4">
                    <span className="w-8 h-8 rounded-full border border-brown-500/15 flex items-center justify-center hover:border-gold/50 hover:text-gold-600 transition-colors cursor-pointer text-brown-500/60">
                      <Linkedin className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Stats — dark contrast band ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <div className="relative rounded-[2.5rem] overflow-hidden py-16 shadow-[0_30px_70px_-20px_rgba(61,35,20,0.4)]">
          <img src={MEDIA.teamWork} alt="Team working" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.35) saturate(0.65)" }} />
          <div className="absolute inset-0 bg-gradient-to-br from-brown-500/85 via-brown-600/80 to-[#180F08]/90" />
          <div className="relative flex justify-center gap-16 text-center flex-wrap">
            {[
              { val: 16, label: tm.teamMembers },
              { val: 5,  label: tm.departments },
              { val: 3,  label: tm.countries },
            ].map((m) => (
              <Reveal key={m.label}>
                <div className="font-heading text-5xl font-light bg-gradient-to-r from-gold-300 to-gold bg-clip-text text-transparent">
                  <Counter value={m.val} />
                </div>
                <p className="text-xs text-white/45 mt-1 tracking-wider uppercase">{m.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── Departments ── */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal className="mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-gold" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">{tm.deptsEyebrow}</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] text-[#231911]">{tm.deptsTitle}</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAMS.map((team, i) => (
            <Reveal key={team.dept} delay={i * 0.08}>
              <GlowCard variant="light" className="p-8 h-full group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${team.color}18`, border: `1px solid ${team.color}35` }}>
                    <team.icon className="w-6 h-6" style={{ color: team.color }} />
                  </div>
                  <span className="font-heading text-3xl font-light" style={{ color: team.color }}>
                    <Counter value={team.count} />
                  </span>
                </div>
                <h3 className="font-heading text-xl font-medium mb-3 text-[#231911]">{team.dept}</h3>
                <div className="flex flex-wrap gap-1.5 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 overflow-hidden">
                  {team.members.map((m) => (
                    <span key={m} className="text-[11px] px-2.5 py-1 rounded-full bg-brown-500/[0.05] text-brown-500/50">{m}</span>
                  ))}
                </div>
                <p className="text-xs text-brown-500/30 group-hover:opacity-0 transition-opacity duration-300">
                  {team.members.slice(0, 2).join(", ")}{team.members.length > 2 ? `, +${team.members.length - 2} more` : ""}
                </p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Join CTA ── */}
      <section className="py-6 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_30px_70px_-20px_rgba(61,35,20,0.35)]">
            <img src={MEDIA.aboutTeam} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#150D07]/92 via-[#150D07]/70 to-[#150D07]/25" />
            <div className="relative px-10 sm:px-16 py-20 max-w-xl">
              <Reveal>
                <h2 className="font-heading text-4xl font-light tracking-[-0.04em] mb-5 text-white">{tm.joinTitle}</h2>
                <p className="text-white/55 mb-8 leading-relaxed">{tm.joinDesc}</p>
                <MagneticButton to="/open-roles" variant="primary" icon={ArrowRight}>{tm.viewRoles}</MagneticButton>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}