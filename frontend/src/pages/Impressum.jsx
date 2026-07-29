import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { CursorFollower } from "../components/shared/CursorFollower";
import { AmbientBackground } from "../components/shared/AmbientBackground";
import { ScrollProgress } from "../components/shared/ScrollProgress";
import { useLang } from "../context/LangContext";

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
            <p className="text-[10px] tracking-[0.25em] uppercase text-brown-500/30 mb-3">On this page</p>
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

          </GlowCard>
        </Reveal>
      </section>
    </div>
  );
}