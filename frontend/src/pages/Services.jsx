import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { CursorFollower } from "../components/shared/CursorFollower";
import { ScrollProgress } from "../components/shared/ScrollProgress";
import { SERVICES, MEDIA } from "../data/content";
import { ArrowRight } from "lucide-react";
import { useLang } from "../context/LangContext";

export default function Services() {
  const { t } = useLang();
  const s = t.services || {};
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
      {ready && <CursorFollower />}

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="animate-blob absolute -top-40 -left-32 w-[560px] h-[560px] bg-gradient-to-br from-gold/20 via-gold-300/15 to-transparent blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full bg-white border border-brown-500/10 shadow-[0_2px_16px_-4px_rgba(61,35,20,0.1)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">{s.eyebrow || "Services"}</span>
          </motion.div>
          <h1 className="font-heading font-light leading-[0.96] tracking-[-0.05em] text-4xl sm:text-6xl lg:text-[4.6rem] text-[#231911] max-w-4xl">
            {s.title || "Everything Felipillon does — in one place"}
          </h1>
          {s.subtitle && <p className="mt-7 text-lg text-brown-500/55 max-w-2xl leading-relaxed font-light">{s.subtitle}</p>}
        </div>
      </section>

      {/* ── Services bento grid ── */}
      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal className="mb-12">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-gold" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold-600">{s.allEyebrow}</span>
          </div>
          <h2 className="font-heading text-4xl font-light tracking-[-0.04em] leading-[1.06] text-[#231911]">{s.allTitle}</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative rounded-2xl overflow-hidden bg-white border border-brown-500/[0.07] hover:border-gold/30 shadow-[0_4px_18px_-8px_rgba(61,35,20,0.12)] hover:shadow-[0_16px_40px_-12px_rgba(201,151,58,0.25)] transition-shadow duration-500 h-full"
              >
                <div className="p-7">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center mb-5 group-hover:bg-gold/15 transition-colors">
                    <svc.icon className="w-6 h-6 text-gold-600" />
                  </div>
                  <h3 className="font-heading text-xl font-medium mb-3 text-[#231911]">{svc.title}</h3>
                  <p className="text-sm text-brown-500/45 leading-relaxed">{svc.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 transition-all duration-500 bg-gold" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="py-6 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_30px_70px_-20px_rgba(61,35,20,0.35)]">
            <img src={MEDIA.teamWork} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#150D07]/92 via-[#150D07]/70 to-[#150D07]/25" />
            <div className="relative px-10 sm:px-16 py-20 max-w-2xl">
              <Reveal>
                <h2 className="font-heading text-4xl font-light tracking-[-0.04em] leading-[1.06] mb-5 text-white">{s.notSureTitle}</h2>
                <p className="text-white/55 mb-8">{s.notSureDesc}</p>
                <MagneticButton to="/contact" variant="primary" icon={ArrowRight}>{s.startConversation}</MagneticButton>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}