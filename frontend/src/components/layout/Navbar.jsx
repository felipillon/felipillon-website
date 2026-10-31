import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { useLang } from "../../context/LangContext";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "../ui/sheet";
import { NAV_LINKS } from "../../data/content";
import { LANGUAGES } from "../../data/i18n";

const PRIMARY_NAV = [
  "home",
  "about",
  "specialities",
  "staffing",
  "team",
  "openRoles",
  "testimonials",
  "locations",
];

export const Navbar = () => {
  const { lang, switchLang, t } = useLang();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  /*
   * Detect whether the user has moved away
   * from the very top of the page.
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Close menus whenever the route changes.
   */
  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
    setScrolled(window.scrollY > 24);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        setLangOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const primaryLinks = NAV_LINKS.filter((link) =>
    PRIMARY_NAV.includes(link.label)
  );

  const moreLinks = NAV_LINKS.filter(
    (link) => !PRIMARY_NAV.includes(link.label)
  );

  const currentLang = LANGUAGES.find(
    (language) => language.code === lang
  );

  const nav = t.nav || {};

  const isFloating = scrolled;
  const useDarkForeground = !isHomePage || scrolled;

  /*
   * Navbar link colors
   *
   * Homepage top:
   * white / gold because navbar is transparent
   *
   * Scrolled or non-home:
   * dark brown / gold because navbar becomes light
   */
  const navItemClass = (active) => {
    if (useDarkForeground) {
      return active
        ? "text-[#A47420] hover:text-[#8C6018] focus-visible:text-[#8C6018]"
        : "text-[#3D2314] hover:text-[#1A0E08] focus-visible:text-[#1A0E08]";
    }

    return active
      ? "text-gold-300 hover:text-gold-200 focus-visible:text-gold-200"
      : "text-white hover:text-white focus-visible:text-white";
  };

  /*
   * Dropdowns are always light because they
   * need predictable contrast regardless of
   * what page section is behind them.
   */
  const surfaceDropdown =
    "bg-[#FBF8F3] border border-brown-500/[0.1] " +
    "shadow-[0_22px_60px_-26px_rgba(61,35,20,0.65)]";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
    <motion.header
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        fixed inset-x-0 top-0 z-50
        pointer-events-none
        transition-all duration-500 ease-out

        ${
          isFloating
            ? "px-4 pt-4 sm:px-6"
            : "px-0 pt-0"
        }
      `}
      data-testid="navbar"
    >
      {/* NAVBAR SURFACE */}
      <div
        className={`
          pointer-events-auto
          mx-auto
          flex items-center justify-between
          gap-2 sm:gap-6

          transition-all
          duration-500
          ease-out

          ${
            isFloating
              ? `
                max-w-7xl
                rounded-2xl
                border
                border-brown-500/[0.12]
                bg-[#FBF8F3]
                px-4
                py-2
                shadow-[0_18px_48px_-26px_rgba(61,35,20,0.62)]
                sm:px-6
              `
              : !isHomePage
              ? `
                max-w-none
                rounded-none
                border-b
                border-brown-500/[0.08]
                bg-[#FBF8F3]
                px-6
                py-3
                shadow-[0_8px_30px_-24px_rgba(61,35,20,0.4)]
                sm:px-8
              `
              : `
                max-w-7xl
                rounded-none
                border
                border-transparent
                bg-transparent
                px-6
                py-3
                shadow-none
                sm:px-8
              `
          }
        `}
      >
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center shrink-0"
          data-testid="logo-link"
        >
          <img
            src="/logo-new.png"
            alt="Felipillon"
            style={{
              filter: useDarkForeground
                ? "brightness(0) drop-shadow(0 2px 8px rgba(61,35,20,0.15))"
                : "brightness(0) invert(1) drop-shadow(0 2px 12px rgba(255,255,255,0.9)) drop-shadow(0 0 24px rgba(255,255,255,0.6))",
            }}
            className={`
              ${isFloating ? "h-11 sm:h-16" : "h-12 sm:h-20"}
              w-auto
              object-contain
              transition-all
              duration-500
            `}
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden xl:flex items-center gap-1">
          {primaryLinks.map((link) => {
            const label = nav[link.label] || link.label;
            const active = pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.label}`}
                className={`
                  relative
                  px-3
                  py-1.5
                  text-[13px]
                  font-semibold
                  rounded-full

                  transition-colors
                  duration-500

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-gold/50

                  ${navItemClass(active)}
                `}
              >
                {label}

                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="
                      absolute
                      left-1/2
                      -translate-x-1/2
                      -bottom-0.5
                      w-1
                      h-1
                      rounded-full
                      bg-gold
                    "
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}

          {/* MORE DROPDOWN — only shown when there are links not in PRIMARY_NAV */}
          {moreLinks.length > 0 && <div className="relative group">
            <button
              type="button"
              className={`
                px-3
                py-1.5
                text-[13px]
                font-semibold
                rounded-full

                flex
                items-center
                gap-1

                transition-colors
                duration-500

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-gold/50

                ${navItemClass(false)}
              `}
            >
              {nav.more || "More"}

              <ChevronDown
                className="
                  w-3.5
                  h-3.5
                  group-hover:rotate-180
                  transition-transform
                  duration-300
                "
              />
            </button>

            <div
              className={`
                absolute
                top-full
                left-0
                mt-3
                w-60

                rounded-2xl
                overflow-hidden

                invisible
                opacity-0
                translate-y-1

                group-focus-within:visible group-hover:visible
                group-focus-within:opacity-100 group-hover:opacity-100
                group-focus-within:translate-y-0 group-hover:translate-y-0

                transition-all
                duration-200

                ${surfaceDropdown}
              `}
            >
              {moreLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    flex
                    items-center
                    justify-between

                    px-4
                    py-3.5

                    text-sm
                    font-medium

                    transition-colors

                    ${
                      pathname === link.path
                        ? "bg-gold/14 text-gold-700"
                        : "text-[#3D2314] hover:bg-white/70 hover:text-[#1A0E08]"
                    }
                  `}
                >
                  {nav[link.label] || link.label}

                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              ))}
            </div>
          </div>}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2 shrink-0">
          {/* LANGUAGE SWITCHER */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((current) => !current)}
              aria-expanded={langOpen}
              aria-label="Choose language"
              data-testid="lang-switcher"
              className={`
                flex
                items-center
                gap-1.5

                px-3
                py-1.5

                rounded-full
                border

                text-[13px]
                font-semibold

                transition-all
                duration-500

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-gold/50

                ${
                  useDarkForeground
                    ? `
                      border-brown-500/[0.14]
                      bg-white
                      text-[#231911]
                      hover:border-gold/45
                    `
                    : `
                      border-white/25
                      bg-black/25
                      text-white
                      hover:border-gold/45
                    `
                }
              `}
            >
              {currentLang?.label}

              <ChevronDown
                className={`
                  w-3.5
                  h-3.5
                  transition-transform
                  duration-200

                  ${langOpen ? "rotate-180" : ""}
                `}
              />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                    scale: 0.95,
                  }}
                  transition={{
                    duration: 0.18,
                  }}
                  className={`
                    absolute
                    top-full
                    right-0
                    mt-2

                    w-44

                    rounded-2xl
                    overflow-hidden

                    ${surfaceDropdown}
                  `}
                >
                  {LANGUAGES.map((language) => (
                    <button
                      type="button"
                      key={language.code}
                      onClick={() => {
                        switchLang(language.code);
                        setLangOpen(false);
                      }}
                      data-testid={`lang-${language.code}`}
                      className={`
                        w-full

                        flex
                        items-center
                        gap-3

                        px-4
                        py-3

                        text-sm

                        transition-colors

                        ${
                          lang === language.code
                            ? "text-gold-700 bg-gold/14"
                            : "text-[#3D2314] hover:text-[#1A0E08] hover:bg-white/70"
                        }
                      `}
                    >
                      <span className="font-semibold w-6">
                        {language.label}
                      </span>

                      <span className="text-brown-500/60 text-xs">
                        {language.name}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CONTACT CTA */}
          <Link
            to="/contact"
            data-testid="nav-contact-cta"
            className="
              hidden
              sm:inline-flex

              items-center
              gap-1.5

              px-4
              py-2

              rounded-full

              bg-[#C9973A]
              text-[#1A0E08]

              text-[13px]
              font-semibold

              hover:bg-[#D4A853]
              hover:shadow-[0_12px_28px_-18px_rgba(201,151,58,0.75)]

              transition-all
              duration-300

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-gold/50
            "
          >
            {nav.contact || "Contact"}

            <ArrowUpRight className="w-4 h-4" />
          </Link>

          {/* MOBILE HAMBURGER */}
          <SheetTrigger asChild>
          <button
            type="button"
            data-testid="mobile-menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className={`
              xl:hidden

              w-11
              h-11

              rounded-full
              border

              flex
              items-center
              justify-center

              transition-all
              duration-500

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-gold/50

              ${
                useDarkForeground
                  ? `
                    border-brown-500/[0.14]
                    bg-white
                    text-[#3D2314]
                  `
                  : `
                    border-white/25
                    bg-black/20
                    text-white
                  `
              }
            `}
          >
            {open ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
          </SheetTrigger>
        </div>
      </div>
    </motion.header>

      <SheetContent id="mobile-navigation" side="right"
        className="mobile-navigation z-[120] h-[100dvh] w-[82vw] max-w-[300px] overflow-y-auto overscroll-contain border-brown-500/10 bg-[#FBF8F3] px-5 pb-8 pt-7 text-[#3D2314]"
        data-testid="mobile-menu">
        <SheetTitle className="pr-12 text-left text-2xl text-[#3D2314]">Felipillon</SheetTitle>
        <SheetDescription className="sr-only">Browse pages and choose your language.</SheetDescription>
        <nav aria-label="Mobile navigation" className="mt-6 grid gap-1">
          {[...NAV_LINKS, { label: "contact", path: "/contact" }].map((link) => (
            <SheetClose asChild key={link.path}>
              <Link to={link.path} aria-current={pathname === link.path ? "page" : undefined}
                className={`flex min-h-11 items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.path ? "bg-gold/15 text-gold-700" : "text-[#3D2314] hover:bg-white"
                }`}>
                {nav[link.label] || link.label}
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </Link>
            </SheetClose>
          ))}
        </nav>
        <div className="mt-6 flex flex-wrap gap-2 border-t border-brown-500/10 pt-5" aria-label="Language">
          {LANGUAGES.map((language) => (
            <button type="button" key={language.code} onClick={() => switchLang(language.code)}
              aria-label={language.name} aria-pressed={lang === language.code}
              className={`min-h-11 min-w-11 rounded-full border px-3 py-2 text-sm font-semibold ${
                lang === language.code ? "border-gold bg-gold text-black" : "border-brown-500/20 bg-white text-[#3D2314]"
              }`}>{language.label}</button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
