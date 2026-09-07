import { Link } from "react-router-dom";
import { Linkedin, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useLang } from "../../context/LangContext";
import { MEDIA } from "../../data/content";

const COLS = [
  {
    titleKey: "company",
    links: [
      { labelKey: "about", path: "/about" },
      { labelKey: "team", path: "/team" },
      { labelKey: "locations", path: "/locations" },
      { labelKey: "blog", path: "/blog" },
    ],
  },
  {
    titleKey: "specialities",
    links: [
      { labelKey: "specialitiesServices", path: "/specialities" },
      { labelKey: "staffingRecruitment", path: "/staffing" },
      { labelKey: "openRoles", path: "/open-roles" },
      { labelKey: "caseStudies", path: "/case-studies" },
    ],
  },
  {
    titleKey: "legal",
    links: [
      { labelKey: "impressum", path: "/impressum" },
      { labelKey: "privacy", path: "/privacy-policy" },
      { labelKey: "terms", path: "/terms" },
    ],
  },
];

export const Footer = () => {
  const { t } = useLang();
  const f = t.footer || {};

  return (
    <footer className="relative border-t border-white/[0.06] mt-20 overflow-hidden bg-[#07070A]" data-testid="footer">
      <div className="absolute inset-0 pointer-events-none">
        <img src={MEDIA.officeWide} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.04) saturate(0)" }} />
        <div className="absolute inset-0 bg-[#07070A]/98" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2">
            <Link to="/" className="block mb-5">
              <img
                src="/logo-new.png"
                alt="Felipillon"
                className="
                  h-[72px]
                  sm:h-24
                  w-auto
                  object-contain
                  brightness-0
                  invert
                  drop-shadow-[0_5px_8px_rgba(0,0,0,0.72)]
                  drop-shadow-[0_16px_28px_rgba(0,0,0,0.5)]
                "
              />
            </Link>
            <p className="text-sm text-white/68 leading-relaxed max-w-xs mb-6">
              {f.description || "A global technology-driven services firm that builds software and deploys top talent to solve complex business challenges fast."}
            </p>
            <div className="space-y-2 mb-6">
              {[
                "Franz-Ehrlich-Straße 12, 12489 Berlin",
                "Manjari BK, Haveli, Pune 412307",
                "170 Salcedo Street, Makati City",
              ].map((loc) => (
                <p key={loc} className="text-xs text-white/58">
                  {loc}
                </p>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/felipillon" },
                { label: "X", href: "https://x.com/felipillon", isX: true },
                { icon: Mail, label: "Email", href: "mailto:hello@felipillon.com" },
                // { label: "Instagram", href: "https://www.instagram.com/felipillon", text: "IG" },
                // { label: "Facebook", href: "https://www.facebook.com/felipillon", text: "f" },
                // { label: "Indeed", href: "https://www.indeed.com/cmp/felipillon", text: "in" },
                // { label: "Glassdoor", href: "https://www.glassdoor.com/Overview/Working-at-felipillon", text: "Gd" },
              ].map(({ icon: Icon, label, href, isX }) => (
                <a key={label} href={href} aria-label={label} target={href?.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/[0.14] flex items-center justify-center text-white/62 hover:text-[#C9973A] hover:border-[#C9973A]/40 transition-all">
                  {isX ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ) : Icon ? (
                    <Icon className="w-4 h-4" />
                  ) : (
                    <span className="text-[10px] font-bold">{label === "Facebook" ? "f" : label === "Instagram" ? "IG" : label === "Indeed" ? "in" : "Gd"}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.titleKey}>
              <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/52 mb-5">{f[col.titleKey] || col.titleKey}</h4>
              <ul className="space-y-3">
                {col.links.map(({labelKey, path }) => (
                  <li key={path}>
                    <Link to={path} className="group inline-flex items-center gap-1 text-sm text-white/68 hover:text-white transition-colors">
                      {f[labelKey] || labelKey}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-6 pb-10 mb-10 border-b border-white/[0.05]">
          <a href="mailto:hello@felipillon.com" className="flex items-center gap-2 text-xs text-white/62 hover:text-[#C9973A] transition-colors">
            <Mail className="w-3.5 h-3.5" /> hello@felipillon.com
          </a>
          <a href="tel:+4930000000" className="flex items-center gap-2 text-xs text-white/62 hover:text-[#C9973A] transition-colors">
            <Phone className="w-3.5 h-3.5" /> +49 30 000 0000
          </a>
          <Link to="/contact" className="flex items-center gap-2 text-xs text-white/62 hover:text-[#C9973A] transition-colors">
            <MapPin className="w-3.5 h-3.5" /> {f.contactUs || "Contact us"}
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>{f.copyright || "© 2026 Felipillon UG (haftungsbeschränkt). All rights reserved."}</p>
          <div className="flex gap-5">
            <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">{f.privacyShort || "Privacy"}</Link>
            <Link to="/terms" className="hover:text-white transition-colors">{f.termsShort || "Terms"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
