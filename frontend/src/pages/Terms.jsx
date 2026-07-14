import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { useLang } from "../context/LangContext";

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

export default function Terms() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        eyebrow={t.terms?.eyebrow || "Legal"}
        title={t.terms?.title || "Terms of Service"}
        subtitle={t.terms?.subtitle || "General terms and conditions for using this website"}
      />

      <section className="py-16 max-w-3xl mx-auto px-6 sm:px-8">
        <Reveal>
          <GlowCard lift={false} className="p-8 sm:p-12" data-testid="terms-card">

            <Section number="1" title={t.terms?.s1 || "Scope"}>
              <p>These Terms of Service govern your use of the Felipillon website. By accessing or using this website, you agree to be bound by these terms.</p>
              <p>Felipillon UG (haftungsbeschränkt), Franz-Ehrlich-Straße 12, 12489 Berlin, Germany operates this website.</p>
            </Section>

            <Section number="2" title={t.terms?.s2 || "Use of the Website"}>
              <p>This website is provided to inform visitors about Felipillon's services. You agree to use the site only for lawful purposes and in a manner that does not infringe the rights of others.</p>
            </Section>

            <Section number="3" title={t.terms?.s3 || "Job Applications"}>
              <p>Submitting an application through our Open Roles page does not guarantee an interview, offer, or placement. All applications are reviewed at our discretion.</p>
            </Section>

            <Section number="4" title={t.terms?.s4 || "Intellectual Property"}>
              <p>All content on this website is the property of Felipillon UG (haftungsbeschränkt) or its licensors and is protected by applicable intellectual property laws.</p>
            </Section>

            <Section number="5" title={t.terms?.s5 || "No Warranty"}>
              <p>This website and its content are provided "as is" without warranties of any kind. We do not guarantee the completeness, accuracy, or timeliness of any content.</p>
            </Section>

            <Section number="6" title={t.terms?.s6 || "Limitation of Liability"}>
              <p>To the extent permitted by applicable law, Felipillon shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.</p>
            </Section>

            <Section number="7" title={t.terms?.s7 || "External Links"}>
              <p>This website may contain links to third-party websites. Felipillon has no control over the content of external sites and accepts no responsibility for them.</p>
            </Section>

            <Section number="8" title={t.terms?.s8 || "Governing Law"}>
              <p>These Terms of Service are governed by the laws of the Federal Republic of Germany. The place of jurisdiction is Berlin, Germany.</p>
            </Section>

            <Section number="9" title={t.terms?.s9 || "Changes to These Terms"}>
              <p>We may revise these Terms of Service at any time. Continued use of the website following any changes constitutes acceptance of the updated terms.</p>
              <p className="text-xs pt-1">{t.terms?.updated || "Last updated: June 2026"}</p>
            </Section>

            <Section number="10" title={t.terms?.s10 || "Contact"}>
              <p>Questions about these Terms of Service can be directed to us using the contact details listed in our <a href="/impressum" className="text-gold-500 hover:underline">Impressum</a>.</p>
            </Section>

          </GlowCard>
        </Reveal>
      </section>
    </>
  );
}