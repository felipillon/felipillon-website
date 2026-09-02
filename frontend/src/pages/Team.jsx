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
import { ArrowRight, Linkedin, X } from "lucide-react";
import { useLang } from "../context/LangContext";
import annaImg from "../Team/anna.png";
import dereckImg from "../Team/Dereck.png";
import gotiImg from "../Team/Goti.png";
import harrisonImg from "../Team/Harrison.png";
import krupashreeImg from "../Team/Krupashree.png";
import meltemImg from "../Team/Meltem.png";
import nareshImg from "../Team/Naresh.png";
import neshImg from "../Team/Nesh.png";
import niharikaImg from "../Team/Niharika.png";
import oykuImg from "../Team/Oyku.png";
import poulomiImg from "../Team/Poulomi.png";
import priyankaImg from "../Team/Priyanka.png";
import razanImg from "../Team/Razan.png";
import saurabhImg from "../Team/Saurabh.png";
import savaniImg from "../Team/Savani.png";
import ketakiImg from "../Team/ketaki.png";
import ketanImg from "../Team/ketan.png";
import kojoImg from "../Team/Kojo.png";
import muzaffarImg from "../Team/Muzaffar.png";
import yarenImg from "../Team/Yaren.png";

const TEAM_IMAGES = {
  "Anna Angold": annaImg,
  "Harrison Coviello": harrisonImg,
  "Krupashree Kannan": krupashreeImg,
  "Naresh Malake": nareshImg,
  "Niharika Singh": niharikaImg,
  "Razan Anwar": razanImg,
  "Saurabh Gaikwad": saurabhImg,
  "Savani Redkar": savaniImg,
  "Dereck Boateng": dereckImg,
  "Ketaki Malwade": ketakiImg,
  "Meltem Özer": meltemImg,
  "Öykü Usumu": oykuImg,
  "Oyku Usumu": oykuImg,
  "Poulomi Ghosh": poulomiImg,
  "Ketan Bhanudas Barve": ketanImg,
  "Kojo Quansah": kojoImg,
  "Prince Goti": gotiImg,
  "Meltem": meltemImg,
  "Neslihan Ünlükurt": neshImg,
  "Neslihan Unlukurt": neshImg,
  "Nesh": neshImg,
  "Priyanka Das": priyankaImg,
  "Ketaki": ketakiImg,
  "Muzaffar": muzaffarImg,
  "Muzaffar Mirzaliev": muzaffarImg,
  "Yaren Akin": yarenImg,
};

const MEMBER_ROLES = {
  "Anna Angold": "Business Development Manager",
  "Dereck Boateng": "Software Developer",
  "Ketaki Malwade": "Content Marketing & Communication",
  "Kojo Quansah": "Head of Administration",
  "Meltem Özer": "HR Team",
  "Muzaffar Mirzaliev": "IT & Administration",
  "Naresh Malake": "Business Development Team",
  "Neslihan Ünlükurt": "HR Team",
  "Neslihan Unlukurt": "HR Team",
  "Öykü Usumu": "HR Team",
  "Prince Goti": "Software Developer",
  "Priyanka Das": "Talent Acquisition Team",
  "Yaren Akin": "Talent Acquisition Team",
};

const initialsFor = (name) => name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
const imageFor = (name) => TEAM_IMAGES[name] || TEAM_IMAGES[name.split(" ")[0]];
const leaderRoleFor = (name) => LEADERSHIP.find((leader) => leader.name === name)?.role;
const roleFor = (name, fallback) => MEMBER_ROLES[name] || MEMBER_ROLES[name.split(" ")[0]] || leaderRoleFor(name) || fallback;

export default function Team() {
  const { t } = useLang();
  const tm = t.team || {};
  const [ready, setReady] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const PERMANENT_LEADERSHIP = LEADERSHIP.filter(
    (l) => l.name === "Ketan Bhanudas Barve" || l.name === "Anna Angold"
  );
  const leadershipGroup = {
    dept: "Leadership",
    color: "#C9973A",
    members: PERMANENT_LEADERSHIP.map((leader) => leader.name),
  };

  useEffect(() => {
    const prevBg = document.body.style.background;
    document.body.style.background = "#FBF8F3";
    setReady(true);
    return () => { document.body.style.background = prevBg; };
  }, []);

  useEffect(() => {
    if (!selectedMember) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedMember(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedMember]);

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
            <span className="w-10 h-px bg-gold" />
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] text-[#231911]">{tm.leadershipTitle}</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
          {PERMANENT_LEADERSHIP.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.08}>
              <GlowCard variant="light" className="p-0 overflow-hidden h-full group">
                <button
                  type="button"
                  onClick={() => setSelectedMember({ name: l.name, group: leadershipGroup, role: l.role })}
                  className="block h-full w-full text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gold/60"
                >
                  <div className="relative h-40 bg-gradient-to-br from-gold/10 to-cream-100">
                    <div className="w-full h-full flex items-center justify-center">
                      {TEAM_IMAGES[l.name] ? (
                        <img
                          src={TEAM_IMAGES[l.name]}
                          alt={l.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-[0_18px_40px_-24px_rgba(61,35,20,0.6)] transition-all duration-300 group-hover:scale-105 group-hover:border-gold/70"
                        />
                      ) : (
                        <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-gold-300 to-gold-700 flex items-center justify-center text-white font-heading text-2xl font-medium transition-all duration-300 group-hover:scale-105">
                          {l.initials}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-medium text-[#231911] mb-1">{l.name}</h3>
                    <p className="text-gold-600 text-xs mb-1">{l.role}</p>
                    <p className="text-brown-500/35 text-xs">{l.office}</p>
                    <span className="mt-4 w-8 h-8 rounded-full border border-brown-500/15 flex items-center justify-center text-brown-500/60">
                      <Linkedin className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
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
              { val: 30, suffix: "+", label: tm.teamMembers || "Employees" },
              { val: 5,  suffix: "",  label: tm.departments },
              { val: 4,  suffix: "",  label: tm.countries },
            ].map((m) => (
              <Reveal key={m.label}>
                <div className="font-heading text-5xl font-light bg-gradient-to-r from-gold-300 to-gold bg-clip-text text-transparent">
                  <Counter value={m.val} suffix={m.suffix} />
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
            <span className="w-10 h-px bg-gold" />
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-[-0.04em] text-[#231911]">{tm.deptsTitle}</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAMS.map((team, i) => (
            <Reveal key={team.dept} delay={i * 0.08}>
              <GlowCard variant="light" className="p-7 text-center h-full">
                <div
                  className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${team.color}18`, border: `1px solid ${team.color}35` }}
                >
                  <team.icon className="w-6 h-6" style={{ color: team.color }} />
                </div>
                <p className="font-heading text-lg font-medium text-[#231911]">{team.dept}</p>
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

      {selectedMember && (
        <div
          className="team-member-modal fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 bg-[#120C08]/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedMember.name} profile`}
          onClick={() => setSelectedMember(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl rounded-[2rem] bg-[#FBF8F3] p-6 sm:p-8 shadow-[0_35px_90px_-28px_rgba(0,0,0,0.65)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brown-500 shadow-[0_10px_30px_-20px_rgba(61,35,20,0.55)] border border-brown-500/10 hover:text-gold-700 hover:border-gold/50 transition-colors"
              aria-label="Close profile"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-center">
              {imageFor(selectedMember.name) ? (
                <img
                  src={imageFor(selectedMember.name)}
                  alt={selectedMember.name}
                  className="mx-auto h-40 w-40 sm:h-52 sm:w-52 rounded-full object-cover border-4 border-white shadow-[0_26px_70px_-28px_rgba(61,35,20,0.75)]"
                />
              ) : (
                <div
                  className="mx-auto h-40 w-40 sm:h-52 sm:w-52 rounded-full flex items-center justify-center border-4 border-white text-5xl font-heading text-white shadow-[0_26px_70px_-28px_rgba(61,35,20,0.75)]"
                  style={{ background: selectedMember.group.color }}
                >
                  {initialsFor(selectedMember.name)}
                </div>
              )}
              <p className="mt-6 text-[10px] font-bold tracking-[0.3em] uppercase text-gold-600">{selectedMember.group.dept}</p>
              <h4 className="mt-2 font-heading text-3xl sm:text-5xl font-light tracking-[-0.04em] text-[#231911]">
                {selectedMember.name}
              </h4>
              <p className="mt-2 text-sm font-medium text-brown-500/65">
                {selectedMember.role || roleFor(selectedMember.name, selectedMember.group.dept)}
              </p>
            </div>

            <div className="mt-8 border-t border-brown-500/10 pt-6">
              <p className="text-center text-[10px] font-bold tracking-[0.24em] uppercase text-brown-500/45">Team Members</p>
              <div className="mt-5 flex flex-wrap justify-center gap-4">
                {selectedMember.group.members
                  .filter((member) => member !== selectedMember.name)
                  .map((member) => (
                    <button
                      type="button"
                      key={member}
                      onClick={() => setSelectedMember({ name: member, group: selectedMember.group, role: leaderRoleFor(member) })}
                      className="group w-20 text-center rounded-2xl focus:outline-none focus:ring-2 focus:ring-gold/60"
                    >
                      {imageFor(member) ? (
                        <img
                          src={imageFor(member)}
                          alt={member}
                          className="mx-auto h-14 w-14 rounded-full object-cover border-2 border-white shadow-[0_14px_34px_-22px_rgba(61,35,20,0.65)] transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <span
                          className="mx-auto h-14 w-14 rounded-full flex items-center justify-center border-2 border-white text-sm font-heading text-white shadow-[0_14px_34px_-22px_rgba(61,35,20,0.65)] transition-transform duration-300 group-hover:scale-105"
                          style={{ background: selectedMember.group.color }}
                        >
                          {initialsFor(member)}
                        </span>
                      )}
                      <span className="mt-2 block text-[11px] font-medium leading-tight text-brown-500/70">{member}</span>
                    </button>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}