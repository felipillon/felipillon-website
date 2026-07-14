import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { useLang } from "../context/LangContext";

const Field = ({ label, placeholder }) => (
  <div className="mb-2 last:mb-0">
    {label && (
      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
    )}
    <span className="inline-block text-xs px-2.5 py-1 rounded-md bg-gold-500/10 border border-dashed border-gold-500/40 text-gold-500">
      {placeholder}
    </span>
  </div>
);

const Section = ({ number, title, children }) => (
  <div className="mb-10 last:mb-0">
    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500 pb-2.5 mb-4 border-b border-border">
      {number}. {title}
    </h2>
    <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
      {children}
    </div>
  </div>
);

export default function PrivacyPolicy() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        eyebrow={t.privacy?.eyebrow || "Legal"}
        title={t.privacy?.title || "Privacy Policy"}
        subtitle={t.privacy?.subtitle || "Information pursuant to the EU General Data Protection Regulation"}
      />

      <section className="py-16 max-w-3xl mx-auto px-6 sm:px-8">
        <Reveal>
          <GlowCard lift={false} className="p-8 sm:p-12" data-testid="privacy-card">

            <Section number="1" title={t.privacy?.s1 || "Overview"}>
              <p>This Privacy Policy explains how Felipillon UG (haftungsbeschränkt) collects, uses, and protects personal data when you visit our website, apply for a role, or contact us.</p>
              <p>We process personal data in accordance with the EU General Data Protection Regulation (GDPR) and the German Federal Data Protection Act (BDSG).</p>
            </Section>

            <Section number="2" title={t.privacy?.s2 || "Data Controller"}>
              <p className="text-foreground">Felipillon UG (haftungsbeschränkt)</p>
              <p>Franz-Ehrlich-Straße 12, 12489 Berlin, Germany</p>
              <div className="pt-2 space-y-2">
                <Field label="E-Mail" placeholder="[E-MAIL]" />
                <Field label="Telefon" placeholder="[TELEFON]" />
              </div>
            </Section>

            <Section number="3" title={t.privacy?.s3 || "Data We Collect"}>
              <p>Depending on how you interact with our website, we may collect:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Contact details you submit via our contact form (name, email, company, message)</li>
                <li>Application data submitted via our Open Roles page (name, email, phone, CV, cover note)</li>
                <li>Technical data automatically collected when you browse our site (IP address, browser type, pages visited, referrer)</li>
                <li>Cookie and local storage data used to remember your theme preference</li>
              </ul>
            </Section>

            <Section number="4" title={t.privacy?.s4 || "Purpose & Legal Basis"}>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><span className="text-foreground">Contact inquiries</span> — processed under Art. 6(1)(b) GDPR.</li>
                <li><span className="text-foreground">Job applications</span> — processed under Art. 6(1)(b) GDPR and § 26 BDSG.</li>
                <li><span className="text-foreground">Website analytics</span> — processed under Art. 6(1)(f) GDPR.</li>
              </ul>
            </Section>

            <Section number="5" title={t.privacy?.s5 || "Data Retention"}>
              <p>Application data is retained for up to 6 months after a recruitment process concludes. Contact form submissions are retained only as long as necessary, typically no longer than 12 months.</p>
            </Section>

            <Section number="6" title={t.privacy?.s6 || "Third-Party Services"}>
              <p>We may use third-party processors for email delivery, cloud hosting, and analytics. Where required, we maintain Data Processing Agreements (Art. 28 GDPR) with each processor.</p>
            </Section>

            <Section number="7" title={t.privacy?.s7 || "Your Rights"}>
              <p>Under the GDPR, you have the right to access, correct, erase, restrict, or object to the processing of your data, and the right to data portability.</p>
            </Section>

            <Section number="8" title={t.privacy?.s8 || "Cookies & Local Storage"}>
              <p>Our website uses local storage only to remember your dark/light theme preference. This data stays on your device and is never transmitted to our servers.</p>
            </Section>

            <Section number="9" title={t.privacy?.s9 || "Changes to This Policy"}>
              <p>We may update this Privacy Policy from time to time. The current version is always available on this page.</p>
              <p className="text-xs pt-1">{t.privacy?.updated || "Last updated: June 2026"}</p>
            </Section>

            <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground space-y-1">
              <p>{t.privacy?.warn1 || "Fields highlighted in gold are placeholders and must be completed."}</p>
            </div>

          </GlowCard>
        </Reveal>
      </section>
    </>
  );
}