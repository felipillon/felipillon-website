import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { CursorFollower } from "../components/shared/CursorFollower";
import { AmbientBackground } from "../components/shared/AmbientBackground";
import { ScrollProgress } from "../components/shared/ScrollProgress";
import { useLang } from "../context/LangContext";
import { Mail } from "lucide-react";

// ── Social icon — SVG inline so we can use exact brand logos ────────────────
const SocialLink = ({ href, label, children }) => (
  <a
    href={href}
    target={href.startsWith("mailto") ? undefined : "_blank"}
    rel="noopener noreferrer"
    aria-label={label}
    className="w-11 h-11 rounded-full border border-brown-500/15 flex items-center justify-center text-brown-500/50 hover:text-[#231911] hover:border-gold/50 hover:bg-gold/5 transition-all duration-200"
    style={{ cursor: "pointer" }}
  >
    {children}
  </a>
);

const Field = ({ label, value, placeholder }) => (
  <div className="mb-2 last:mb-0">
    {label && (
      <p className="text-xs text-brown-500/40 uppercase tracking-wide mb-0.5">{label}</p>
    )}
    {value ? (
      <p className="text-sm text-brown-500/65">{value}</p>
    ) : (
      <span className="inline-block text-xs px-2.5 py-1 rounded-md bg-gold/10 border border-dashed border-gold/40 text-gold-600">
        {placeholder}
      </span>
    )}
  </div>
);

const Section = ({ id, title, children }) => (
  <div id={id} className="mb-10 last:mb-0 scroll-mt-28">
    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600 pb-2.5 mb-4 border-b border-brown-500/[0.08]">
      {title}
    </h2>
    <div className="text-brown-500/60">{children}</div>
  </div>
);

export default function Impressum() {
  const { t } = useLang();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prevBg = document.body.style.background;
    document.body.style.background = "#FBF8F3";
    setReady(true);
    return () => { document.body.style.background = prevBg; };
  }, []);

  const SECTIONS = [
    { id: "company",     label: t.impressum?.company     || "Unternehmen" },
    { id: "represented", label: t.impressum?.represented || "Vertreten durch" },
    { id: "contact",     label: t.impressum?.contact     || "Kontakt" },
    { id: "registry",    label: t.impressum?.registry    || "Registereintrag" },
    { id: "vat",         label: t.impressum?.vat         || "Umsatzsteuer-ID" },
    { id: "contentResp", label: t.impressum?.contentResp || "Verantwortlich für den Inhalt" },
    { id: "euDispute",   label: t.impressum?.euDispute   || "EU-Streitschlichtung" },
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
            <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">{t.impressum?.eyebrow || "Legal"}</span>
          </motion.div>
          <h1 className="font-heading font-light leading-[0.96] tracking-[-0.05em] text-4xl sm:text-6xl text-[#231911] max-w-2xl">
            {t.impressum?.title || "Impressum"}
          </h1>
          <p className="mt-6 text-lg text-brown-500/50 max-w-xl leading-relaxed font-light">{t.impressum?.subtitle || "Angaben gemäß § 5 TMG"}</p>
        </div>
      </section>

      <section className="pb-24 max-w-6xl mx-auto px-6 sm:px-8 grid lg:grid-cols-[220px_1fr] gap-10">
        {/* ── Sticky table of contents ── */}
        <div className="hidden lg:block">
          <div className="lg:sticky lg:top-28 space-y-1">
            <p className="text-[10px] tracking-[0.25em] uppercase text-brown-500/30 mb-3">{t.impressum?.onThisPage || "On this page"}</p>
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`}
                className="block px-3 py-2 rounded-lg text-sm text-brown-500/50 hover:text-[#231911] hover:bg-white transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <Reveal>
          <GlowCard variant="light" lift={false} className="p-8 sm:p-12" data-testid="impressum-card">

            <Section id="company" title={t.impressum?.company || "Unternehmen"}>
              <p className="text-sm">Felipillon</p>
              <p className="text-sm">Franz-Ehrlich-Straße 12</p>
              <p className="text-sm">12489 Berlin</p>
              <p className="text-sm">Deutschland</p>
            </Section>

            <Section id="represented" title={t.impressum?.represented || "Vertreten durch"}>
              <p className="text-sm">Geschäftsführer: Ketan Bhanudas Barve</p>
            </Section>

            <Section id="contact" title={t.impressum?.contact || "Kontakt"}>
              <Field label={t.impressum?.phone || "Telefon"} placeholder="[TELEFONNUMMER]" />
              <div className="mt-3">
                <Field label={t.impressum?.email || "E-Mail"} placeholder="[E-MAIL-ADRESSE]" />
              </div>
            </Section>

            <Section id="registry" title={t.impressum?.registry || "Registereintrag"}>
              <p className="text-sm">{t.impressum?.reg1 || "Eintragung im Handelsregister"}</p>
              <p className="text-sm">{t.impressum?.reg2 || "Registergericht: Amtsgericht Charlottenburg (Berlin)"}</p>
              <p className="text-sm">{t.impressum?.reg3 || "Registernummer: HRB 280553 B"}</p>
            </Section>

            <Section id="vat" title={t.impressum?.vat || "Umsatzsteuer-ID"}>
              <p className="text-sm mb-3">
                {t.impressum?.vat1 || "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:"}
              </p>
              <Field placeholder="[USt-IdNr.]" />
            </Section>

            <Section id="contentResp" title={t.impressum?.contentResp || "Verantwortlich für den Inhalt"}>
              <p className="text-sm mb-3">{t.impressum?.content1 || "gemäß § 18 Abs. 2 MStV:"}</p>
              <Field placeholder="[NAME, ANSCHRIFT]" />
            </Section>

            <Section id="euDispute" title={t.impressum?.euDispute || "EU-Streitschlichtung"}>
              <p className="text-sm mb-2">
                {t.impressum?.eu1 || "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:"}{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-600 hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-sm mb-2">
                {t.impressum?.eu2 || "Unsere E-Mail-Adresse finden Sie oben im Impressum."}
              </p>
              <p className="text-sm">
                {t.impressum?.eu3 || "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren teilzunehmen."}
              </p>
            </Section>

            <div className="mt-10 pt-6 border-t border-brown-500/[0.08] text-xs text-brown-500/35 space-y-1">
              <p>{t.impressum?.warn1 || "Fields highlighted in gold are placeholders and must be completed."}</p>
            </div>

            {/* ── Social Media ── */}
            <div className="mt-8 pt-6 border-t border-brown-500/[0.08]">
              <p className="text-xs text-brown-500/40 uppercase tracking-wide mb-4">{t.impressum?.followUs || "Follow Us"}</p>
              <div className="flex flex-wrap gap-3">
                {/* LinkedIn */}
                <SocialLink href="https://www.linkedin.com/company/felipillon" label="LinkedIn">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </SocialLink>
                {/* X (formerly Twitter) */}
                <SocialLink href="https://x.com/felipillon" label="X (Twitter)">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </SocialLink>
                {/* Email */}
                <SocialLink href="mailto:hello@felipillon.com" label="Email">
                  <Mail className="w-4 h-4" />
                </SocialLink>
                {/* Instagram */}
                <SocialLink href="https://www.instagram.com/felipillon" label="Instagram">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                </SocialLink>
                {/* Facebook */}
                <SocialLink href="https://www.facebook.com/felipillon" label="Facebook">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </SocialLink>
                {/* Indeed */}
                <SocialLink href="https://www.indeed.com/cmp/felipillon" label="Indeed">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM9 8v12H7V8h2zm4-4h2v16h-2V4z"/>
                  </svg>
                </SocialLink>
                {/* Glassdoor */}
                <SocialLink href="https://www.glassdoor.com/Overview/Working-at-felipillon" label="Glassdoor">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V8h2v9zm4 0h-2V8h2v9z"/>
                  </svg>
                </SocialLink>
              </div>
            </div>

          </GlowCard>
        </Reveal>
      </section>
    </div>
  );
}