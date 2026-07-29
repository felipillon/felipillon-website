import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { useLang } from "../../context/LangContext";
import { NAV_LINKS } from "../../data/content";
import { LANGUAGES } from "../../data/i18n";

const PRIMARY_NAV = ["home", "about", "specialities", "staffing", "openRoles"];

export const Navbar = () => {
  const { lang, switchLang, t } = useLang();
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const [langOpen, setLangOpen]   = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); setLangOpen(false); }, [pathname]);

  const primaryLinks = NAV_LINKS.filter(l => PRIMARY_NAV.includes(l.label));
  const moreLinks    = NAV_LINKS.filter(l => !PRIMARY_NAV.includes(l.label));
  const currentLang  = LANGUAGES.find(l => l.code === lang);
  const nav          = t.nav || {};

  return (
    <motion.header
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 bg-[#0D0D10] backdrop-blur-xl border-b border-white/[0.06] ${
        scrolled
          ? "py-3 shadow-[0_1px_40px_rgba(0,0,0,0.5)]"
          : "py-5 shadow-[0_1px_20px_rgba(0,0,0,0.35)]"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0" data-testid="logo-link">
          <img
            src="/logo-new.png"
            alt="Felipillon"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {primaryLinks.map((l) => {
            const label  = nav[l.label] || l.label;
            const active = pathname === l.path;
            return (
              <Link
                key={l.path}
                to={l.path}
                data-testid={`nav-${l.label}`}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  active ? "text-[#C9973A]" : "text-white/60 hover:text-white"
                }`}
              >
                {label}
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-1 h-1 rounded-full bg-[#C9973A]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          {/* More dropdown */}
          <div className="relative group">
            <button className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white rounded-full transition-colors flex items-center gap-1">
              {nav.more || "More"}
              <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-52 rounded-2xl bg-[#0D0D10]/95 backdrop-blur-xl border border-white/[0.08] overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 shadow-2xl">
              {moreLinks.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-white/[0.04] ${
                    pathname === l.path ? "text-[#C9973A]" : "text-white/60 hover:text-white"
                  }`}
                >
                  {nav[l.label] || l.label}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              data-testid="lang-switcher"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/[0.1] text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition-colors"
            >
              {currentLang?.label}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full right-0 mt-2 w-44 rounded-2xl bg-[#0D0D10]/95 backdrop-blur-xl border border-white/[0.08] overflow-hidden shadow-2xl"
                >
                  {LANGUAGES.map((lng) => (
                    <button
                      key={lng.code}
                      onClick={() => { switchLang(lng.code); setLangOpen(false); }}
                      data-testid={`lang-${lng.code}`}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                        lang === lng.code
                          ? "text-[#C9973A] bg-[#C9973A]/08"
                          : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      <span className="font-semibold w-6">{lng.label}</span>
                      <span className="text-white/40 text-xs">{lng.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>


          {/* Contact CTA */}
          <Link
            to="/contact"
            data-testid="nav-contact-cta"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#C9973A] text-black text-sm font-semibold hover:bg-[#D4A853] hover:shadow-[0_0_28px_-6px_rgba(201,151,58,0.7)] transition-all duration-300"
          >
            {nav.contact || "Contact"} <ArrowUpRight className="w-4 h-4" />
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            data-testid="mobile-menu-toggle"
            className="lg:hidden w-9 h-9 rounded-full border border-white/[0.1] flex items-center justify-center text-white/70"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="mx-4 mt-3 rounded-2xl bg-[#0D0D10]/95 backdrop-blur-xl border border-white/[0.08] p-4" data-testid="mobile-menu">
              <div className="grid grid-cols-2 gap-1 mb-4">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.path}
                    to={l.path}
                    className={`px-4 py-3 rounded-xl text-sm transition-colors ${
                      pathname === l.path
                        ? "bg-[#C9973A]/10 text-[#C9973A]"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {nav[l.label] || l.label}
                  </Link>
                ))}
              </div>
              {/* Language switcher mobile */}
              <div className="flex gap-2 pt-3 border-t border-white/[0.06]">
                {LANGUAGES.map((lng) => (
                  <button
                    key={lng.code}
                    onClick={() => switchLang(lng.code)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      lang === lng.code
                        ? "bg-[#C9973A] text-black"
                        : "border border-white/10 text-white/50 hover:text-white"
                    }`}
                  >
                    {lng.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};