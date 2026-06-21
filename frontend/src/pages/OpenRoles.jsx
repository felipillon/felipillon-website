import { useState, useMemo } from "react";
import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { ROLES, DEPARTMENTS, LOCATIONS_FILTER } from "../data/content";
import { Search, MapPin, Briefcase, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const PER_PAGE = 4;

export default function OpenRoles() {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");
  const [loc, setLoc] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return ROLES.filter((r) =>
      (dept === "All" || r.department === dept) &&
      (loc === "All" || r.location === loc) &&
      r.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, dept, loc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const paged = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const reset = (fn) => (v) => { fn(v); setPage(1); };

  return (
    <>
      <PageHero eyebrow="Open Roles" title="Find your next defining role"
        subtitle="Live opportunities across healthcare, energy, construction and technology. New roles added weekly." />

      <section className="py-12 max-w-7xl mx-auto px-6 sm:px-8">
        {/* search + filters */}
        <div className="glass rounded-2xl p-6 mb-10">
          <div className="relative mb-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input value={query} onChange={(e) => reset(setQuery)(e.target.value)} placeholder="Search roles..."
              data-testid="roles-search"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-transparent border border-border focus:border-emerald-500 outline-none transition-colors" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Department</p>
              <div className="flex flex-wrap gap-2">
                {DEPARTMENTS.map((d) => (
                  <button key={d} onClick={() => reset(setDept)(d)} data-testid={`dept-filter-${d.toLowerCase().replace(/\s/g, "-")}`}
                    className={`px-4 py-1.5 rounded-full text-sm transition-colors ${dept === d ? "bg-emerald-500 text-white" : "glass hover:border-emerald-500/50"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Location</p>
              <div className="flex flex-wrap gap-2">
                {LOCATIONS_FILTER.map((l) => (
                  <button key={l} onClick={() => reset(setLoc)(l)} data-testid={`loc-filter-${l.toLowerCase().replace(/[\s,]/g, "-")}`}
                    className={`px-4 py-1.5 rounded-full text-sm transition-colors ${loc === l ? "bg-electric-500 text-white" : "glass hover:border-electric-500/50"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6" data-testid="roles-count">{filtered.length} open role{filtered.length !== 1 ? "s" : ""}</p>

        <AnimatePresence mode="wait">
          <motion.div key={`${dept}-${loc}-${query}-${current}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="space-y-4">
            {paged.length === 0 && <p className="text-center py-16 text-muted-foreground">No roles match your filters.</p>}
            {paged.map((r) => (
              <GlowCard key={r.id} lift={false} className="p-6 flex flex-col sm:flex-row sm:items-center gap-4" data-testid={`role-${r.id}`}>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-medium">{r.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" />{r.department}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{r.location}</span>
                    <span className="px-2.5 py-0.5 rounded-full glass text-xs">{r.type}</span>
                  </div>
                </div>
                <button onClick={() => toast.success(`Application started for ${r.title}`, { description: "ATS integration coming soon." })}
                  data-testid={`apply-${r.id}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-electric-500 text-white text-sm font-medium hover:shadow-[0_0_22px_-6px_rgba(16,185,129,0.7)] transition-shadow shrink-0">
                  Apply <ArrowUpRight className="w-4 h-4" />
                </button>
              </GlowCard>
            ))}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10" data-testid="pagination">
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-full text-sm transition-colors ${current === i + 1 ? "bg-emerald-500 text-white" : "glass hover:border-emerald-500/50"}`}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
