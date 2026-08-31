import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { useLang } from "../../context/LangContext";
import { NAV_LINKS } from "../../data/content";
import { LANGUAGES } from "../../data/i18n";

const PRIMARY_NAV = [
  "home",
  "about",
  "specialities",
  "staffing",
  "openRoles",
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
          gap-6

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
            className={`
              ${isFloating ? "h-16 sm:h-[72px]" : "h-[72px] sm:h-24"}
              w-auto
              object-contain
              transition-all
              duration-500

              ${
                useDarkForeground
                  ? `
                    brightness-0
                    drop-shadow-[0_10px_22px_rgba(61,35,20,0.2)]
                  `
                  : `
                    brightness-0
                    invert
                    drop-shadow-[0_5px_8px_rgba(0,0,0,0.72)]
                    drop-shadow-[0_16px_28px_rgba(0,0,0,0.5)]
                  `
              }
            `}
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1">
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

          {/* MORE DROPDOWN */}
          <div className="relative group">
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

                group-hover:visible
                group-hover:opacity-100
                group-hover:translate-y-0

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
          </div>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2 shrink-0">
          {/* LANGUAGE SWITCHER */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((current) => !current)}
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
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            data-testid="mobile-menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            className={`
              lg:hidden

              w-9
              h-9

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
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -8,
            }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              lg:hidden
              overflow-hidden
              pointer-events-auto
            "
          >
            <div
              className={`mx-4 mt-3 rounded-2xl border p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.65)] transition-colors duration-500 ${
                useDarkForeground
                  ? "bg-[#FBF8F3] border-brown-500/[0.12]"
                  : "bg-[#0D0D10]/95 backdrop-blur-xl border-white/[0.08]"
              }`}
              data-testid="mobile-menu"
            >
              {/* MOBILE LINKS */}
              <div className="grid grid-cols-2 gap-1 mb-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      px-4
                      py-3

                      rounded-xl

                      text-sm
                      font-medium

                      transition-colors

                      ${
                        pathname === link.path
                          ? useDarkForeground
                            ? "bg-gold/14 text-gold-700"
                            : "bg-[#C9973A]/10 text-[#C9973A]"
                          : useDarkForeground
                            ? "text-[#3D2314]/78 hover:text-[#1A0E08] hover:bg-white/70"
                            : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                      }
                    `}
                  >
                    {nav[link.label] || link.label}
                  </Link>
                ))}
              </div>

              {/* MOBILE LANGUAGE SWITCHER */}
              <div className={`flex gap-2 pt-3 border-t ${
                useDarkForeground ? "border-brown-500/[0.1]" : "border-white/[0.06]"
              }`}>
                {LANGUAGES.map((language) => (
                  <button
                    type="button"
                    key={language.code}
                    onClick={() => {
                      switchLang(language.code);
                    }}
                    className={`
                      px-3
                      py-1.5

                      rounded-full

                      text-xs
                      font-semibold

                      transition-colors

                      ${
                        lang === language.code
                          ? "bg-[#C9973A] text-black"
                          : useDarkForeground
                            ? "border border-brown-500/[0.12] text-[#3D2314]/70 hover:text-[#1A0E08]"
                            : "border border-white/10 text-white/60 hover:text-white"
                      }
                    `}
                  >
                    {language.label}
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
