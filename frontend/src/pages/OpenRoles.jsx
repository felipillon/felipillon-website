import { useState, useMemo } from "react";
import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { ROLES, DEPARTMENTS, LOCATIONS_FILTER, MEDIA } from "../data/content";
import { Search, MapPin, Briefcase, ArrowUpRight, X, Upload, User, Mail, Phone, FileText, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useLang } from "../context/LangContext";

const PER_PAGE = 6;

const ApplyModal = ({ role, onClose, t }) => {
  const r = t.openRoles || {};
  const [form, setForm] = useState({ name: "", email: "", phone: "", coverNote: "", cvFile: null });
  const [submitting, setSubmitting] = useState(false);
  const [cvName, setCvName] = useState("");

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") { toast.error("Please upload a PDF file."); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("File must be under 5MB."); return; }
    setForm({ ...form, cvFile: file });
    setCvName(file.name);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error("Please fill in your name and email."); return; }
    if (!form.cvFile) { toast.error("Please upload your CV."); return; }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onClose();
      toast.success(r.apply + "!", {
        description: `${r.contactWithin} ${role.title} ${r.contactDays}`,
      });
    }, 1200);
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        <motion.div
          className="relative w-full max-w-lg bg-[#0D0D10] border border-white/[0.08] rounded-2xl p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-xs text-[#C9973A] font-semibold uppercase tracking-widest">{r.applyNow}</span>
              <h2 className="font-heading text-2xl font-medium mt-1 text-white">{role.title}</h2>
              <div className="flex gap-3 mt-2 text-sm text-white/40">
                <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{role.department}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{role.location}</span>
                <span className="px-2 py-0.5 rounded-full border border-white/10 text-xs">{role.type}</span>
              </div>
            </div>
            <button onClick={onClose} data-testid="apply-modal-close"
              className="p-2 rounded-full border border-white/10 hover:border-white/30 transition-colors shrink-0 ml-4 text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={submit} className="space-y-4" data-testid="apply-form">
            {/* Name */}
            <div>
              <label className="text-xs uppercase tracking-wide text-white/35">{r.fullName} *</label>
              <div className="relative mt-2">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input type="text" value={form.name} onChange={set("name")} placeholder="Jane Doe"
                  data-testid="apply-name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9973A]/60 outline-none transition-colors text-white placeholder:text-white/20 text-sm" />
              </div>
            </div>
            {/* Email */}
            <div>
              <label className="text-xs uppercase tracking-wide text-white/35">{r.emailAddress} *</label>
              <div className="relative mt-2">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input type="email" value={form.email} onChange={set("email")} placeholder="jane@company.com"
                  data-testid="apply-email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9973A]/60 outline-none transition-colors text-white placeholder:text-white/20 text-sm" />
              </div>
            </div>
            {/* Phone */}
            <div>
              <label className="text-xs uppercase tracking-wide text-white/35">{r.phoneNumber}</label>
              <div className="relative mt-2">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+49 30 1234 567"
                  data-testid="apply-phone"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9973A]/60 outline-none transition-colors text-white placeholder:text-white/20 text-sm" />
              </div>
            </div>
            {/* CV */}
            <div>
              <label className="text-xs uppercase tracking-wide text-white/35">{r.uploadCV} *</label>
              <label data-testid="apply-cv-upload"
                className={`mt-2 flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-dashed cursor-pointer transition-colors ${cvName ? "border-[#C9973A]/60 text-[#C9973A]" : "border-white/10 hover:border-[#C9973A]/40 text-white/40"}`}>
                <Upload className="w-4 h-4 shrink-0" />
                <span className="text-sm truncate">{cvName || r.clickUpload}</span>
                <input type="file" accept=".pdf" onChange={handleFile} className="hidden" />
              </label>
            </div>
            {/* Cover note */}
            <div>
              <label className="text-xs uppercase tracking-wide text-white/35">{r.coverNote}</label>
              <div className="relative mt-2">
                <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-white/25" />
                <textarea value={form.coverNote} onChange={set("coverNote")} rows={3}
                  placeholder={r.coverPlaceholder}
                  data-testid="apply-cover-note"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9973A]/60 outline-none transition-colors resize-none text-white placeholder:text-white/20 text-sm" />
              </div>
            </div>

            <motion.button type="submit" disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.03 }} whileTap={{ scale: submitting ? 1 : 0.97 }}
              data-testid="apply-submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#C9973A] text-black font-semibold hover:shadow-[0_0_28px_-6px_rgba(201,151,58,0.7)] transition-all disabled:opacity-60">
              {submitting ? (
                <>
                  <motion.div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                    animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                  {r.submitting}
                </>
              ) : (
                <><Send className="w-4 h-4" />{r.submitApplication}</>
              )}
            </motion.button>
            <p className="text-xs text-white/25 text-center">{r.contactDays2}</p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function OpenRoles() {
  const { t } = useLang();
  const r = t.openRoles || {};

  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");
  const [loc, setLoc] = useState("All");
  const [page, setPage] = useState(1);
  const [applyRole, setApplyRole] = useState(null);

  const filtered = useMemo(() => ROLES.filter((role) =>
    (dept === "All" || role.department === dept) &&
    (loc === "All" || role.location === loc) &&
    role.title.toLowerCase().includes(query.toLowerCase())
  ), [query, dept, loc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const paged = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  const reset = (fn) => (v) => { fn(v); setPage(1); };

  return (
    <>
      <PageHero
        eyebrow={r.eyebrow || "Open Roles"}
        title={r.title || "Find your next defining role"}
        subtitle={r.subtitle}
        img={MEDIA.teamMeeting}
      />

      <section className="py-12 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Search + filters */}
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 mb-10">
          <div className="relative mb-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/25" />
            <input value={query} onChange={(e) => reset(setQuery)(e.target.value)}
              placeholder={r.searchPlaceholder}
              data-testid="roles-search"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-transparent border border-white/[0.08] focus:border-[#C9973A]/60 outline-none transition-colors text-white placeholder:text-white/20 text-sm" />
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <p className="text-xs text-white/30 mb-2 uppercase tracking-wide">{r.department}</p>
              <div className="flex flex-wrap gap-2">
                {DEPARTMENTS.map((d) => (
                  <button key={d} onClick={() => reset(setDept)(d)}
                    data-testid={`dept-filter-${d.toLowerCase().replace(/\s/g, "-")}`}
                    className={`px-4 py-1.5 rounded-full text-sm transition-colors ${dept === d ? "bg-[#C9973A] text-black font-semibold" : "border border-white/10 text-white/50 hover:text-white hover:border-white/20"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs text-white/30 mb-2 uppercase tracking-wide">{r.location}</p>
              <div className="flex flex-wrap gap-2">
                {LOCATIONS_FILTER.map((l) => (
                  <button key={l} onClick={() => reset(setLoc)(l)}
                    data-testid={`loc-filter-${l.toLowerCase().replace(/[\s,]/g, "-")}`}
                    className={`px-4 py-1.5 rounded-full text-sm transition-colors ${loc === l ? "bg-[#C9973A] text-black font-semibold" : "border border-white/10 text-white/50 hover:text-white hover:border-white/20"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-white/35 mb-6" data-testid="roles-count">
          {filtered.length} {filtered.length === 1 ? r.roles : r.rolesPlural}
        </p>

        <AnimatePresence mode="wait">
          <motion.div key={`${dept}-${loc}-${query}-${current}`}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="space-y-4">
            {paged.length === 0 && (
              <p className="text-center py-16 text-white/35">{r.noRoles}</p>
            )}
            {paged.map((role) => (
              <GlowCard key={role.id} lift={false}
                className="p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                data-testid={`role-${role.id}`}>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-medium text-white">{role.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-white/40">
                    <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" />{role.department}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{role.location}</span>
                    <span className="px-2.5 py-0.5 rounded-full border border-white/10 text-xs">{role.type}</span>
                  </div>
                </div>
                <button onClick={() => setApplyRole(role)} data-testid={`apply-${role.id}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#C9973A] text-black text-sm font-semibold hover:bg-[#D4A853] hover:shadow-[0_0_22px_-6px_rgba(201,151,58,0.7)] transition-all shrink-0">
                  {r.apply} <ArrowUpRight className="w-4 h-4" />
                </button>
              </GlowCard>
            ))}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10" data-testid="pagination">
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-full text-sm transition-colors ${current === i + 1 ? "bg-[#C9973A] text-black font-semibold" : "border border-white/10 text-white/50 hover:text-white hover:border-white/20"}`}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>

      {applyRole && <ApplyModal role={applyRole} onClose={() => setApplyRole(null)} t={t} />}
    </>
  );
}