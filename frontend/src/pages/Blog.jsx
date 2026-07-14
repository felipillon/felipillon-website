import { useState } from "react";
import { PageHero } from "../components/layout/Layout";
import { Reveal } from "../components/shared/Reveal";
import { BLOG, BLOG_CATEGORIES, MEDIA } from "../data/content";
import { Clock, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LangContext";

export default function Blog() {
  const { t } = useLang();
  const b = t.blog || {};
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? BLOG : BLOG.filter(p => p.category === cat);
  const featured = BLOG.find(p => p.featured);

  return (
    <>
      <PageHero
        eyebrow={b.eyebrow || "Blog"}
        title={b.title || "Insights on talent, technology and the future of work"}
        subtitle={b.subtitle}
        img={MEDIA.servers}
        tall
      />

      {/* Featured */}
      {featured && (
        <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src={featured.img}
                alt={featured.title}
                className="w-full aspect-[21/9] object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ filter: "brightness(0.3) saturate(0.7)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
              <div className="absolute inset-0 p-10 sm:p-16 flex items-end">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#C9973A]/30 text-[#C9973A] text-[10px] font-semibold tracking-wider uppercase mb-5 bg-[#C9973A]/10">
                    {b.featured} · {featured.category}
                  </span>
                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.03em] text-white leading-[1.1] mb-5">
                    {featured.title}
                  </h2>
                  <p className="text-white/50 mb-6 leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center gap-5 text-xs text-white/35">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featured.read} {b.read}</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Category filter */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-10">
        <div className="flex flex-wrap gap-2">
          {BLOG_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                cat === c
                  ? "bg-[#C9973A] text-black font-semibold"
                  : "border border-white/10 text-white/50 hover:text-white hover:border-white/20"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Posts grid */}
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
                <div className="group cursor-pointer h-full" data-testid={`blog-${post.id}`}>
                  <div className="relative rounded-xl overflow-hidden aspect-[16/9] mb-4">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      style={{ filter: "brightness(0.5) saturate(0.75)" }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider border border-[#C9973A]/30 text-[#C9973A] bg-[#C9973A]/10">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-medium text-white mb-2 leading-snug group-hover:text-[#E8C07A] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-white/25">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.read} {b.read}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
}