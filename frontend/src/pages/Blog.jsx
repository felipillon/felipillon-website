import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "../components/shared/Reveal";
import { CursorFollower } from "../components/shared/CursorFollower";
import { AmbientBackground } from "../components/shared/AmbientBackground";
import { ScrollProgress } from "../components/shared/ScrollProgress";
import { BLOG, BLOG_CATEGORIES, MEDIA } from "../data/content";
import { Clock, Calendar } from "lucide-react";
import { useLang } from "../context/LangContext";

export default function Blog() {
  const { t } = useLang();
  const b = t.blog || {};
  const [cat, setCat] = useState("All");
  const [ready, setReady] = useState(false);
  const filtered = cat === "All" ? BLOG : BLOG.filter(p => p.category === cat);
  const featured = BLOG.find(p => p.featured);

  useEffect(() => {
    const prevBg = document.body.style.background;
    document.body.style.background = "#FBF8F3";
    setReady(true);
    return () => { document.body.style.background = prevBg; };
  }, []);

  return (
    <div className="relative bg-[#FBF8F3] text-brown-500">
      <ScrollProgress />
      <AmbientBackground />
      {ready && <CursorFollower />}

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full bg-white border border-brown-500/10 shadow-[0_2px_16px_-4px_rgba(61,35,20,0.1)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">{b.eyebrow || "Blog"}</span>
          </motion.div>
          <h1 className="font-heading font-light leading-[0.96] tracking-[-0.05em] text-4xl sm:text-6xl lg:text-[4.6rem] text-[#231911] max-w-3xl">
            {b.title || "Insights on talent, technology and the future of work"}
          </h1>
          {b.subtitle && <p className="mt-7 text-lg text-brown-500/55 max-w-xl leading-relaxed font-light">{b.subtitle}</p>}
        </div>
      </section>

      {/* ── Featured post ── */}
      {featured && (
        <section className="py-10 max-w-7xl mx-auto px-6 sm:px-8">
          <Reveal>
            <div className="relative rounded-[2rem] overflow-hidden group cursor-pointer shadow-[0_30px_70px_-20px_rgba(61,35,20,0.3)]">
              <motion.div
                initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={featured.img}
                  alt={featured.title}
                  className="w-full aspect-[21/9] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
              <div className="absolute inset-0 p-8 sm:p-14 flex items-end">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center px-3 py-1 rounded-full border border-gold/40 text-gold-300 text-[10px] font-semibold tracking-wider uppercase mb-5 bg-gold/10">
                    {b.featured} · {featured.category}
                  </span>
                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.03em] text-white leading-[1.1] mb-5">
                    {featured.title}
                  </h2>
                  <p className="text-white/55 mb-6 leading-relaxed max-w-lg">{featured.excerpt}</p>
                  <div className="flex items-center gap-5 text-xs text-white/40">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featured.read} {b.read}</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ── Category filter ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-10 mt-6">
        <div className="flex flex-wrap gap-2">
          {BLOG_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                cat === c
                  ? "bg-gold text-white font-semibold shadow-[0_4px_16px_-4px_rgba(201,151,58,0.5)]"
                  : "border border-brown-500/15 text-brown-500/55 hover:text-[#231911] hover:border-gold/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* ── Posts grid ── */}
      <section className="pb-24 max-w-7xl mx-auto px-6 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.06}>
                <div
                  className="group cursor-pointer h-full bg-white rounded-2xl border border-brown-500/[0.07] hover:border-gold/30 shadow-[0_4px_18px_-8px_rgba(61,35,20,0.12)] hover:shadow-[0_16px_40px_-12px_rgba(201,151,58,0.25)] transition-shadow duration-500 overflow-hidden"
                  data-testid={`blog-${post.id}`}
                >
                  <div className="relative overflow-hidden aspect-[16/9]">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider border border-gold/30 text-white bg-black/40 backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-medium text-[#231911] mb-2 leading-snug group-hover:text-gold-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-brown-500/45 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-brown-500/30">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.read} {b.read}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}