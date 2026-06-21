import { Link } from "react-router-dom";
import { Linkedin, Github, Twitter, Mail, ArrowUpRight } from "lucide-react";

const cols = [
  { title: "Company", links: [["About", "/about"], ["Leadership", "/leadership"], ["Team", "/team"], ["Locations", "/locations"]] },
  { title: "Services", links: [["Staffing", "/staffing"], ["Innovation", "/innovation"], ["Services", "/services"], ["Industries", "/industries"]] },
  { title: "Careers", links: [["Open Roles", "/open-roles"], ["Case Studies", "/case-studies"], ["Testimonials", "/testimonials"], ["Blog", "/blog"], ["Contact", "/contact"]] },
];

export const Footer = () => (
  <footer className="relative border-t border-border mt-24 overflow-hidden" data-testid="footer">
    <div className="absolute inset-0 grid-bg opacity-40" />
    <div className="relative max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-10">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-electric-500 flex items-center justify-center font-heading font-bold text-white">F</div>
            <span className="font-heading font-semibold text-xl">Felipillon</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            AI-driven human capital & custom software solutions. Berlin · Pune · Makati City.
          </p>
          <div className="flex gap-3 mt-6">
            {[Linkedin, Github, Twitter, Mail].map((Icon, i) => (
              <a key={i} href="#" data-testid={`footer-social-${i}`} aria-label="social"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-emerald-500/50 hover:text-emerald-500 transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="font-heading text-sm font-semibold mb-4">{c.title}</h4>
            <ul className="space-y-3">
              {c.links.map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {label}<ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 mb-8">
        <h2 className="font-heading text-[18vw] md:text-[13vw] leading-none font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-foreground/10 to-foreground/[0.03] select-none">
          FELIPILLON
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border text-xs text-muted-foreground">
        <p>© 2026 Felipillon GmbH. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);
