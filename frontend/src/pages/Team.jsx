import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { Counter } from "../components/shared/Counter";
import { TEAMS, LEADERSHIP, MEDIA } from "../data/content";
import { ArrowRight, Linkedin } from "lucide-react";
import { useLang } from "../context/LangContext";

export default function Team() {
  const { t } = useLang();
  const tm = t.team || {};

  return (
    <>
      <PageHero
        eyebrow={tm.eyebrow || "Our Team"}
        title={tm.title || "The people behind every placement"}
        subtitle={tm.subtitle}
        img={MEDIA.team}
        tall
      />

      {/* Leadership */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal className="mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-[#C9973A]" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">{tm.leadershipEyebrow}</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em]">{tm.leadershipTitle}</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LEADERSHIP.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.08}>
              <GlowCard className="p-0 overflow-hidden h-full group">
                <div className="relative h-48 bg-gradient-to-br from-[#C9973A]/10 to-[#07070A]">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9973A] to-[#8A6020] flex items-center justify-center text-black font-heading text-3xl font-medium">
                      {l.initials}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070A] to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-medium text-white mb-1">{l.name}</h3>
                  <p className="text-[#C9973A] text-xs mb-1">{l.role}</p>
                  <p className="text-white/30 text-xs">{l.office}</p>
                  <div className="mt-4">
                    <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-[#C9973A]/50 hover:text-[#C9973A] transition-colors cursor-pointer">
                      <Linkedin className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats photo break */}
      <div className="relative h-[40vh] overflow-hidden">
        <img src={MEDIA.teamWork} alt="Team working" className="w-full h-full object-cover" style={{ filter: "brightness(0.25) saturate(0.6)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070A] via-transparent to-[#07070A]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex justify-center gap-16 text-center">
            {[
              { val: 16, label: tm.teamMembers },
              { val: 5,  label: tm.departments },
              { val: 3,  label: tm.countries },
            ].map((m) => (
              <div key={m.label}>
                <div className="font-heading text-5xl font-light text-[#C9973A]"><Counter value={m.val} /></div>
                <p className="text-xs text-white/40 mt-1 tracking-wider uppercase">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Departments */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal className="mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-[#C9973A]" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9973A]">{tm.deptsEyebrow}</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em]">{tm.deptsTitle}</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAMS.map((team, i) => (
            <Reveal key={team.dept} delay={i * 0.08}>
              <GlowCard className="p-8 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${team.color}1a`, color: team.color }}>
                    <team.icon className="w-6 h-6" />
                  </div>
                  <span className="font-heading text-3xl font-light" style={{ color: team.color }}>
                    <Counter value={team.count} />
                  </span>
                </div>
                <h3 className="font-heading text-xl font-medium mb-3">{team.dept}</h3>
                <div className="space-y-1.5">
                  {team.members.map((m) => (
                    <p key={m} className="text-xs text-white/35">{m}</p>
                  ))}
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Join CTA */}
      <section className="relative py-24 overflow-hidden mx-6 sm:mx-8 rounded-2xl mb-16">
        <img src={MEDIA.aboutTeam} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.18) saturate(0.5)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070A]/95 to-transparent" />
        <div className="relative px-10 sm:px-16 max-w-xl">
          <Reveal>
            <h2 className="font-heading text-4xl font-light tracking-[-0.04em] mb-5">{tm.joinTitle}</h2>
            <p className="text-white/45 mb-8 leading-relaxed">{tm.joinDesc}</p>
            <MagneticButton to="/open-roles" variant="primary" icon={ArrowRight}>{tm.viewRoles}</MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}