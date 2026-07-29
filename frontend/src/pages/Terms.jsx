import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { CursorFollower } from "../components/shared/CursorFollower";
import { AmbientBackground } from "../components/shared/AmbientBackground";
import { ScrollProgress } from "../components/shared/ScrollProgress";
import { useLang } from "../context/LangContext";

const Section = ({ id, number, title, children }) => (
  <div id={id} className="mb-10 last:mb-0 scroll-mt-28">
    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600 pb-2.5 mb-4 border-b border-brown-500/[0.08]">
      {number}. {title}
    </h2>
    <div className="space-y-3 text-sm leading-relaxed text-brown-500/60">
      {children}
    </div>
  </div>
);

export default function Terms() {
  const { t } = useLang();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prevBg = document.body.style.background;
    document.body.style.background = "#FBF8F3";
    setReady(true);
    return () => { document.body.style.background = prevBg; };
  }, []);

  const SECTIONS = [
    { id: "s1",  n: "1",  label: t.terms?.s1  || "Scope" },
    { id: "s2",  n: "2",  label: t.terms?.s2  || "Use of the Website" },
    { id: "s3",  n: "3",  label: t.terms?.s3  || "Job Applications" },
    { id: "s4",  n: "4",  label: t.terms?.s4  || "Intellectual Property" },
    { id: "s5",  n: "5",  label: t.terms?.s5  || "No Warranty" },
    { id: "s6",  n: "6",  label: t.terms?.s6  || "Limitation of Liability" },
    { id: "s7",  n: "7",  label: t.terms?.s7  || "External Links" },
    { id: "s8",  n: "8",  label: t.terms?.s8  || "Governing Law" },
    { id: "s9",  n: "9",  label: t.terms?.s9  || "Changes to These Terms" },
    { id: "s10", n: "10", label: t.terms?.s10 || "Contact" },
  ];

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
            <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">{t.terms?.eyebrow || "Legal"}</span>
          </motion.div>
          <h1 className="font-heading font-light leading-[0.96] tracking-[-0.05em] text-4xl sm:text-6xl text-[#231911] max-w-2xl">
            {t.terms?.title || "Terms of Service"}
          </h1>
          <p className="mt-6 text-lg text-brown-500/50 max-w-xl leading-relaxed font-light">{t.terms?.subtitle || "General terms and conditions for using this website"}</p>
        </div>
      </section>

      <section className="pb-24 max-w-6xl mx-auto px-6 sm:px-8 grid lg:grid-cols-[220px_1fr] gap-10">
        {/* ── Sticky table of contents ── */}
        <div className="hidden lg:block">
          <div className="lg:sticky lg:top-28 space-y-1">
            <p className="text-[10px] tracking-[0.25em] uppercase text-brown-500/30 mb-3">On this page</p>
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`}
                className="flex items-baseline gap-2 px-3 py-2 rounded-lg text-sm text-brown-500/50 hover:text-[#231911] hover:bg-white transition-colors">
                <span className="text-gold-600/60 text-xs">{s.n}</span>{s.label}
              </a>
            ))}
          </div>
        </div>

        <Reveal>
          <GlowCard variant="light" lift={false} className="p-8 sm:p-12" data-testid="terms-card">

            <Section id="s1" number="1" title={t.terms?.s1 || "Scope"}>
              <p>These Terms of Service govern your use of the Felipillon website. By accessing or using this website, you agree to be bound by these terms.</p>
              <p>Felipillon UG (haftungsbeschränkt), Franz-Ehrlich-Straße 12, 12489 Berlin, Germany operates this website.</p>
            </Section>

            <Section id="s2" number="2" title={t.terms?.s2 || "Use of the Website"}>
              <p>This website is provided to inform visitors about Felipillon's services. You agree to use the site only for lawful purposes and in a manner that does not infringe the rights of others.</p>
            </Section>

            <Section id="s3" number="3" title={t.terms?.s3 || "Job Applications"}>
              <p>Submitting an application through our Open Roles page does not guarantee an interview, offer, or placement. All applications are reviewed at our discretion.</p>
            </Section>

            <Section id="s4" number="4" title={t.terms?.s4 || "Intellectual Property"}>
              <p>All content on this website is the property of Felipillon UG (haftungsbeschränkt) or its licensors and is protected by applicable intellectual property laws.</p>
            </Section>

            <Section id="s5" number="5" title={t.terms?.s5 || "No Warranty"}>
              <p>This website and its content are provided "as is" without warranties of any kind. We do not guarantee the completeness, accuracy, or timeliness of any content.</p>
            </Section>

            <Section id="s6" number="6" title={t.terms?.s6 || "Limitation of Liability"}>
              <p>To the extent permitted by applicable law, Felipillon shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.</p>
            </Section>

            <Section id="s7" number="7" title={t.terms?.s7 || "External Links"}>
              <p>This website may contain links to third-party websites. Felipillon has no control over the content of external sites and accepts no responsibility for them.</p>
            </Section>

            <Section id="s8" number="8" title={t.terms?.s8 || "Governing Law"}>
              <p>These Terms of Service are governed by the laws of the Federal Republic of Germany. The place of jurisdiction is Berlin, Germany.</p>
            </Section>

            <Section id="s9" number="9" title={t.terms?.s9 || "Changes to These Terms"}>
              <p>We may revise these Terms of Service at any time. Continued use of the website following any changes constitutes acceptance of the updated terms.</p>
              <p className="text-xs pt-1">{t.terms?.updated || "Last updated: June 2026"}</p>
            </Section>

            <Section id="s10" number="10" title={t.terms?.s10 || "Contact"}>
              <p>Questions about these Terms of Service can be directed to us using the contact details listed in our <a href="/impressum" className="text-gold-600 hover:underline">Impressum</a>.</p>
            </Section>

          </GlowCard>
        </Reveal>
      </section>
    </div>
  );
}