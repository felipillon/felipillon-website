import { useState, useMemo } from "react";
import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { BLOG, BLOG_CATEGORIES } from "../data/content";
import { ArrowUpRight, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Blog() {
  const [cat, setCat] = useState("All");
  const featured = BLOG.find((b) => b.featured);
  const list = useMemo(() => BLOG.filter((b) => !b.featured && (cat === "All" || b.category === cat)), [cat]);

  return (
    <>
      <PageHero eyebrow="Insights" title="Ideas on talent, AI & the future of work"
        subtitle="Field notes and deep dives from our recruitment and engineering teams." />

      <section className="py-12 max-w-7xl mx-auto px-6 sm:px-8">
        {featured && (
          <Reveal>
            <GlowCard className="grid md:grid-cols-2 overflow-hidden mb-14" data-testid="featured-article">
              <div className="relative h-64 md:h-auto">
                <img src={featured.img} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-5 left-5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-medium">Featured · {featured.category}</span>
              </div>
              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <h2 className="font-heading text-3xl font-medium leading-tight">{featured.title}</h2>
                <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.read}</span>
                </div>
                <a href="#" className="mt-6 inline-flex items-center gap-2 text-emerald-500 font-medium group">Read article<ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></a>
              </div>
            </GlowCard>
          </Reveal>
        )}

        <div className="flex flex-wrap gap-2 mb-10">
          {BLOG_CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)} data-testid={`blog-cat-${c.toLowerCase().replace(/\s/g, "-")}`}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${cat === c ? "bg-emerald-500 text-white" : "glass hover:border-emerald-500/50"}`}>
              {c}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={cat} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.06}>
                <GlowCard className="overflow-hidden h-full flex flex-col" data-testid={`blog-${b.id}`}>
                  <div className="relative h-48">
                    <img src={b.img} alt={b.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs">{b.category}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-heading text-lg font-medium leading-snug">{b.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground flex-1">{b.excerpt}</p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{b.date}</span><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{b.read}</span>
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
}
