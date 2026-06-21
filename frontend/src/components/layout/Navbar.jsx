import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, ArrowUpRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { NAV_LINKS } from "../../data/content";

export const Navbar = () => {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const primary = NAV_LINKS.slice(0, 6);

  return (
    <motion.header
      initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass py-3 shadow-lg" : "py-5 bg-transparent"}`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" data-testid="logo-link">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-electric-500 flex items-center justify-center font-heading font-bold text-white text-lg">F</div>
          <span className="font-heading font-semibold text-lg tracking-tight">Felipillon</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {primary.map((l) => (
            <Link key={l.path} to={l.path} data-testid={`nav-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              className={`relative px-4 py-2 text-sm rounded-full transition-colors ${pathname === l.path ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"}`}>
              {l.label}
              {pathname === l.path && <motion.span layoutId="nav-dot" className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-1 h-1 rounded-full bg-emerald-500" />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={toggle} data-testid="theme-toggle" aria-label="Toggle theme"
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-emerald-500/50 transition-colors">
            <AnimatePresence mode="wait">
              <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.span>
            </AnimatePresence>
          </button>

          <Link to="/contact" data-testid="nav-contact-cta"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-electric-500 text-white text-sm font-medium hover:shadow-[0_0_24px_-6px_rgba(16,185,129,0.7)] transition-shadow">
            Contact <ArrowUpRight className="w-4 h-4" />
          </Link>

          <button onClick={() => setOpen(!open)} data-testid="mobile-menu-toggle"
            className="lg:hidden w-10 h-10 rounded-full glass flex items-center justify-center">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden glass mt-3 mx-6 rounded-2xl" data-testid="mobile-menu">
            <div className="p-4 grid grid-cols-2 gap-1">
              {NAV_LINKS.map((l) => (
                <Link key={l.path} to={l.path} className={`px-4 py-3 rounded-xl text-sm ${pathname === l.path ? "bg-emerald-500/10 text-emerald-500" : "text-muted-foreground"}`}>
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
