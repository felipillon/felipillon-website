import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { CursorFollower } from "../components/shared/CursorFollower";
import { AmbientBackground } from "../components/shared/AmbientBackground";
import { ScrollProgress } from "../components/shared/ScrollProgress";
import { useLang } from "../context/LangContext";

const Field = ({ label, placeholder }) => (
  <div className="mb-2 last:mb-0">
    {label && (
      <p className="text-xs text-brown-500/40 uppercase tracking-wide mb-0.5">{label}</p>
    )}
    <span className="inline-block text-xs px-2.5 py-1 rounded-md bg-gold/10 border border-dashed border-gold/40 text-gold-600">
      {placeholder}
    </span>
  </div>
);

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

export default function PrivacyPolicy() {
  const { t } = useLang();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prevBg = document.body.style.background;
    document.body.style.background = "#FBF8F3";
    setReady(true);
    return () => { document.body.style.background = prevBg; };
  }, []);

  const SECTIONS = [
    { id: "s1", n: "1",  label: t.privacy?.s1  || "Overview" },
    { id: "s2", n: "2",  label: t.privacy?.s2  || "Data Controller" },
    { id: "s3", n: "3",  label: t.privacy?.s3  || "Data We Collect" },
    { id: "s4", n: "4",  label: t.privacy?.s4  || "Purpose & Legal Basis" },
    { id: "s5", n: "5",  label: t.privacy?.s5  || "Data Retention" },
    { id: "s6", n: "6",  label: t.privacy?.s6  || "Third-Party Services" },
    { id: "s7", n: "7",  label: "Analytics & Session Recording" },
    { id: "s8", n: "8",  label: t.privacy?.s7  || "Your Rights" },
    { id: "s9", n: "9",  label: t.privacy?.s8  || "Cookies & Local Storage" },
    { id: "s10", n: "10", label: t.privacy?.s9  || "Changes to This Policy" },
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
            <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">{t.privacy?.eyebrow || "Legal"}</span>
          </motion.div>
          <h1 className="font-heading font-light leading-[0.96] tracking-[-0.05em] text-4xl sm:text-6xl text-[#231911] max-w-2xl">
            {t.privacy?.title || "Privacy Policy"}
          </h1>
          <p className="mt-6 text-lg text-brown-500/50 max-w-xl leading-relaxed font-light">{t.privacy?.subtitle || "Information pursuant to the EU General Data Protection Regulation"}</p>
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
          <GlowCard variant="light" lift={false} className="p-8 sm:p-12" data-testid="privacy-card">

            <Section id="s1" number="1" title={t.privacy?.s1 || "Overview"}>
              <p>This Privacy Policy explains how Felipillon UG (haftungsbeschränkt) collects, uses, and protects personal data when you visit our website, apply for a role, or contact us.</p>
              <p>We process personal data in accordance with the EU General Data Protection Regulation (GDPR) and the German Federal Data Protection Act (BDSG).</p>
            </Section>

            <Section id="s2" number="2" title={t.privacy?.s2 || "Data Controller"}>
              <p className="text-[#231911]">Felipillon UG (haftungsbeschränkt)</p>
              <p>Franz-Ehrlich-Straße 12, 12489 Berlin, Germany</p>
              <div className="pt-2 space-y-2">
                <Field label="E-Mail" placeholder="[E-MAIL]" />
                <Field label="Telefon" placeholder="[TELEFON]" />
              </div>
            </Section>

            <Section id="s3" number="3" title={t.privacy?.s3 || "Data We Collect"}>
              <p>Depending on how you interact with our website, we may collect:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Contact details you submit via our contact form (name, email, company, message)</li>
                <li>Application data submitted via our Open Roles page (name, email, phone, CV, cover note)</li>
                <li>Technical data automatically collected when you browse our site (IP address, browser type, pages visited, referrer)</li>
                <li>Session and interaction data collected via our analytics provider, including page views and, where enabled, session recordings (see Section 7)</li>
                <li>Local storage data used to remember your theme preference</li>
              </ul>
            </Section>

            <Section id="s4" number="4" title={t.privacy?.s4 || "Purpose & Legal Basis"}>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><span className="text-[#231911]">Contact inquiries</span> — processed under Art. 6(1)(b) GDPR.</li>
                <li><span className="text-[#231911]">Job applications</span> — processed under Art. 6(1)(b) GDPR and § 26 BDSG.</li>
                <li><span className="text-[#231911]">Website analytics</span> — processed under Art. 6(1)(f) GDPR (legitimate interest) for aggregate usage statistics.</li>
                <li><span className="text-[#231911]">Session recording</span> — processed under Art. 6(1)(a) GDPR (consent), where enabled. See Section 7.</li>
              </ul>
            </Section>

            <Section id="s5" number="5" title={t.privacy?.s5 || "Data Retention"}>
              <p>Application data is retained for up to 6 months after a recruitment process concludes. Contact form submissions are retained only as long as necessary, typically no longer than 12 months.</p>
            </Section>

            <Section id="s6" number="6" title={t.privacy?.s6 || "Third-Party Services"}>
              <p>We use the following third-party processors. Where required, we maintain Data Processing Agreements (Art. 28 GDPR) with each:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li><span className="text-[#231911]">Resend</span> — transactional email delivery (contact and application confirmations).</li>
                <li><span className="text-[#231911]">Cloudinary</span> — secure storage of submitted CV files.</li>
                <li><span className="text-[#231911]">PostHog</span> — website analytics and session recording (see Section 7).</li>
              </ul>
            </Section>

            <Section id="s7" number="7" title="Analytics & Session Recording">
              <p>We use <span className="text-[#231911]">PostHog</span>, a third-party analytics provider, to understand how visitors use our website and to improve it. PostHog may collect:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Pages visited, referrer, device and browser information</li>
                <li>Session recordings — a replay of on-page interactions such as mouse movement, scrolling, and clicks. Session recordings are configured not to capture cross-origin iframe content or performance-timing data.</li>
              </ul>
              <p>
                This data is processed by PostHog on servers located in the <span className="text-[#231911]">United States</span>.
                Where personal data is transferred outside the EU/EEA, we rely on appropriate safeguards under
                Art. 46 GDPR (such as Standard Contractual Clauses) with our processor.
              </p>
              <p>
                Session recording, specifically, relies on your consent (Art. 6(1)(a) GDPR){" "}
                <span className="text-gold-600">[confirm consent-collection mechanism before this goes live — see note below]</span>.
                You can object to analytics processing at any time by contacting us using the details in Section 2.
              </p>
            </Section>

            <Section id="s8" number="8" title={t.privacy?.s7 || "Your Rights"}>
              <p>Under the GDPR, you have the right to access, correct, erase, restrict, or object to the processing of your data, and the right to data portability.</p>
            </Section>

            <Section id="s9" number="9" title={t.privacy?.s8 || "Cookies & Local Storage"}>
              <p>Our website uses local storage to remember your theme preference — this stays on your device and is never transmitted to our servers.</p>
              <p>Separately, our analytics provider (PostHog, see Section 7) may set cookies or use similar technologies to recognize your browser across visits and to enable session recording.</p>
            </Section>

            <Section id="s10" number="10" title={t.privacy?.s9 || "Changes to This Policy"}>
              <p>We may update this Privacy Policy from time to time. The current version is always available on this page.</p>
              <p className="text-xs pt-1">{t.privacy?.updated || "Last updated: June 2026"}</p>
            </Section>

            <div className="mt-10 pt-6 border-t border-brown-500/[0.08] text-xs text-brown-500/35 space-y-1">
              <p>{t.privacy?.warn1 || "Fields highlighted in gold are placeholders and must be completed."}</p>
              <p>Before publishing: confirm whether a cookie/tracking consent mechanism is in place for session recording, and have this page reviewed by counsel.</p>
            </div>

          </GlowCard>
        </Reveal>
      </section>
    </div>
  );
}