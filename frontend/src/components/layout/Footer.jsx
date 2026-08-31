import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useLang } from "../../context/LangContext";
import { MEDIA } from "../../data/content";

const COLS = [
  {
    title: "Company",
    links: [
      { label: "About", path: "/about" },
      { label: "Team", path: "/team" },
      { label: "Locations", path: "/locations" },
      { label: "Blog", path: "/blog" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Staffing & Recruitment", path: "/staffing" },
      { label: "Specialities", path: "/specialities" },
      { label: "Case Studies", path: "/case-studies" },
      { label: "Open Roles", path: "/open-roles" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Impressum", path: "/impressum" },
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms of Service", path: "/terms" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="relative border-t border-white/[0.06] mt-20 overflow-hidden" data-testid="footer">
      <div className="absolute inset-0 pointer-events-none">
        <img src={MEDIA.officeWide} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.05) saturate(0.3)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070A]/95 via-[#07070A]/90 to-[#07070A]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2">
            <Link to="/" className="block mb-5">
              <img
                src="/logo-new.png"
                alt="Felipillon"
                className="
                  h-16
                  sm:h-[76px]
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
              A global technology-driven services firm that builds software and deploys top talent to solve complex business challenges fast.
            </p>
            <div className="space-y-2 mb-6">
              {[
                { flag: "🇩🇪", text: "Franz-Ehrlich-Straße 12, 12489 Berlin" },
                { flag: "🇮🇳", text: "Manjari BK, Haveli, Pune 412307" },
                { flag: "🇵🇭", text: "170 Salcedo Street, Makati City" },
              ].map((loc) => (
                <p key={loc.flag} className="flex items-start gap-2 text-xs text-white/58">
                  <span>{loc.flag}</span><span>{loc.text}</span>
                </p>
              ))}
            </div>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Twitter, label: "Twitter" },
                { icon: Mail, label: "Email", href: "mailto:hello@felipillon.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href || "#"} aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/[0.14] flex items-center justify-center text-white/62 hover:text-[#C9973A] hover:border-[#C9973A]/40 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/52 mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map(({label, path }) => (
                  <li key={path}>
                    <Link to={path} className="group inline-flex items-center gap-1 text-sm text-white/68 hover:text-white transition-colors">
                      {label}
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
            <MapPin className="w-3.5 h-3.5" /> Contact us
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 Felipillon UG (haftungsbeschränkt). All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};