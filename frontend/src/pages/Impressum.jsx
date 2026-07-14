import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { useLang } from "../context/LangContext";

const Field = ({ label, value, placeholder }) => (
  <div className="mb-2 last:mb-0">
    {label && (
      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
    )}
    {value ? (
      <p className="text-sm">{value}</p>
    ) : (
      <span className="inline-block text-xs px-2.5 py-1 rounded-md bg-gold-500/10 border border-dashed border-gold-500/40 text-gold-500">
        {placeholder}
      </span>
    )}
  </div>
);

const Section = ({ title, children }) => (
  <div className="mb-10 last:mb-0">
    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500 pb-2.5 mb-4 border-b border-border">
      {title}
    </h2>
    {children}
  </div>
);

export default function Impressum() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        eyebrow={t.impressum?.eyebrow || "Legal"}
        title={t.impressum?.title || "Impressum"}
        subtitle={t.impressum?.subtitle || "Angaben gemäß § 5 TMG"}
      />

      <section className="py-16 max-w-3xl mx-auto px-6 sm:px-8">
        <Reveal>
          <GlowCard lift={false} className="p-8 sm:p-12" data-testid="impressum-card">

            <Section title={t.impressum?.company || "Unternehmen"}>
              <p className="text-sm">Felipillon</p>
              <p className="text-sm">Franz-Ehrlich-Straße 12</p>
              <p className="text-sm">12489 Berlin</p>
              <p className="text-sm">Deutschland</p>
            </Section>

            <Section title={t.impressum?.represented || "Vertreten durch"}>
              <p className="text-sm">Geschäftsführer: Ketan Bhanudas Barve</p>
            </Section>

            <Section title={t.impressum?.contact || "Kontakt"}>
              <Field label={t.impressum?.phone || "Telefon"} placeholder="[TELEFONNUMMER]" />
              <div className="mt-3">
                <Field label={t.impressum?.email || "E-Mail"} placeholder="[E-MAIL-ADRESSE]" />
              </div>
            </Section>

            <Section title={t.impressum?.registry || "Registereintrag"}>
              <p className="text-sm">{t.impressum?.reg1 || "Eintragung im Handelsregister"}</p>
              <p className="text-sm">{t.impressum?.reg2 || "Registergericht: Amtsgericht Charlottenburg (Berlin)"}</p>
              <p className="text-sm">{t.impressum?.reg3 || "Registernummer: HRB 280553 B"}</p>
            </Section>

            <Section title={t.impressum?.vat || "Umsatzsteuer-ID"}>
              <p className="text-sm mb-3">
                {t.impressum?.vat1 || "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:"}
              </p>
              <Field placeholder="[USt-IdNr.]" />
            </Section>

            <Section title={t.impressum?.contentResp || "Verantwortlich für den Inhalt"}>
              <p className="text-sm mb-3">{t.impressum?.content1 || "gemäß § 18 Abs. 2 MStV:"}</p>
              <Field placeholder="[NAME, ANSCHRIFT]" />
            </Section>

            <Section title={t.impressum?.euDispute || "EU-Streitschlichtung"}>
              <p className="text-sm mb-2">
                {t.impressum?.eu1 || "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:"}{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-500 hover:underline"
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

            <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground space-y-1">
              <p>{t.impressum?.warn1 || "Fields highlighted in gold are placeholders and must be completed."}</p>
            </div>

          </GlowCard>
        </Reveal>
      </section>
    </>
  );
}