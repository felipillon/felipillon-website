import { useState, useMemo, useEffect } from "react";
import { GlowCard } from "../components/shared/GlowCard";
import { CursorFollower } from "../components/shared/CursorFollower";
import { ScrollProgress } from "../components/shared/ScrollProgress";
import { AmbientBackground } from "../components/shared/AmbientBackground";
import { Search, MapPin, Briefcase, ArrowUpRight, X, Upload, Send, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useLang } from "../context/LangContext";

const PER_PAGE = 6;
const BACKEND = process.env.REACT_APP_BACKEND_URL;

// ── Dynamic field renderer — one job's form can differ completely from
// another's, so every field is rendered generically off its `kind`. ────────
const DynamicField = ({ field, value, onChange }) => {
  const labelCls = "text-xs uppercase tracking-wide text-white/35";
  const inputCls = "w-full mt-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9973A]/60 outline-none transition-colors text-white placeholder:text-white/20 text-sm";

  switch (field.kind) {
    case "textarea":
      return (
        <div>
          <label className={labelCls}>{field.label}{field.required && " *"}</label>
          <textarea rows={3} value={value || ""} onChange={(e) => onChange(e.target.value)}
            className={`${inputCls} resize-none`} />
        </div>
      );
    case "select":
      return (
        <div>
          <label className={labelCls}>{field.label}{field.required && " *"}</label>
          <select value={value || ""} onChange={(e) => onChange(e.target.value)} className={inputCls}>
            <option value="" disabled>Select…</option>
            {field.options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      );
    case "multiselect": {
      const selected = Array.isArray(value) ? value : [];
      const toggle = (v) =>
        onChange(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);
      return (
        <div>
          <label className={labelCls}>{field.label}{field.required && " *"}</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {field.options.map((o) => (
              <button type="button" key={o.value} onClick={() => toggle(o.value)}
                className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                  selected.includes(o.value)
                    ? "bg-[#C9973A] border-[#C9973A] text-black font-semibold"
                    : "border-white/15 text-white/50 hover:text-white"
                }`}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
      );
    }
    case "checkbox":
      return (
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 accent-[#C9973A]" />
          <span className="text-sm text-white/60">{field.label}{field.required && " *"}</span>
        </label>
      );
    case "file":
      return (
        <div>
          <label className={labelCls}>{field.label}{field.required && " *"}</label>
          <label className={`mt-2 flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-dashed cursor-pointer transition-colors ${value ? "border-[#C9973A]/60 text-[#C9973A]" : "border-white/10 hover:border-[#C9973A]/40 text-white/40"}`}>
            <Upload className="w-4 h-4 shrink-0" />
            <span className="text-sm truncate">{value?.name || "Click to upload (PDF, max 5MB)"}</span>
            <input type="file" accept=".pdf" className="hidden" onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              if (file.type !== "application/pdf") { toast.error("Please upload a PDF file."); return; }
              if (file.size > 5 * 1024 * 1024) { toast.error("File must be under 5MB."); return; }
              onChange(file);
            }} />
          </label>
        </div>
      );
    case "email":
    case "tel":
    case "number":
    case "date":
      return (
        <div>
          <label className={labelCls}>{field.label}{field.required && " *"}</label>
          <input type={field.kind} value={value || ""} onChange={(e) => onChange(e.target.value)} className={inputCls} />
        </div>
      );
    default:
      return (
        <div>
          <label className={labelCls}>{field.label}{field.required && " *"}</label>
          <input type="text" value={value || ""} onChange={(e) => onChange(e.target.value)} className={inputCls} />
        </div>
      );
  }
};

// ── Application modal — fetches this job's specific form, renders it
// dynamically, then submits to our backend's Manatal proxy. ────────────────
const ApplyModal = ({ role, onClose, t }) => {
  const r = t.openRoles || {};
  const [loadingForm, setLoadingForm] = useState(true);
  const [formError, setFormError] = useState(false);
  const [fields, setFields] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${BACKEND}/api/jobs/${role.id}/application-form`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (!cancelled) { setFields(data.fields || []); setLoadingForm(false); }
      } catch {
        if (!cancelled) { setFormError(true); setLoadingForm(false); }
      }
    })();
    return () => { cancelled = true; };
  }, [role.id]);

  const setAnswer = (fieldId, value) => setAnswers((a) => ({ ...a, [fieldId]: value }));

  const submit = async (e) => {
    e.preventDefault();

    const missing = fields.filter((f) => f.required && !answers[f.id] && f.kind !== "checkbox");
    if (missing.length > 0) {
      toast.error(`Please fill in: ${missing.map((f) => f.label).join(", ")}`);
      return;
    }

    setSubmitting(true);
    try {
      const fileField = fields.find((f) => f.kind === "file");
      const answersPayload = {};
      for (const f of fields) {
        if (f.kind === "file") continue; // sent separately below
        if (answers[f.id] !== undefined) answersPayload[f.id] = answers[f.id];
      }

      const fd = new FormData();
      fd.append("answers", JSON.stringify(answersPayload));
      if (fileField && answers[fileField.id]) {
        fd.append("cv_field_id", fileField.id);
        fd.append("cv", answers[fileField.id]);
      }

      const res = await fetch(`${BACKEND}/api/jobs/${role.id}/apply`, { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Submission failed");
      }
      onClose();
      toast.success(r.apply || "Application sent!", {
        description: `${r.contactWithin || "We'll be in touch about"} ${role.title}.`,
      });
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
              <span className="text-xs text-[#C9973A] font-semibold uppercase tracking-widest">{r.applyNow || "Apply Now"}</span>
              <h2 className="font-heading text-2xl font-medium mt-1 text-white">{role.title}</h2>
              <div className="flex gap-3 mt-2 text-sm text-white/40">
                <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{role.department}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{role.location}</span>
              </div>
            </div>
            <button onClick={onClose} data-testid="apply-modal-close"
              className="p-2 rounded-full border border-white/10 hover:border-white/30 transition-colors shrink-0 ml-4 text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {loadingForm && (
            <div className="py-16 flex justify-center">
              <motion.div className="w-6 h-6 border-2 border-white/20 border-t-[#C9973A] rounded-full"
                animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
            </div>
          )}

          {!loadingForm && formError && (
            <div className="py-12 text-center">
              <AlertCircle className="w-8 h-8 text-white/20 mx-auto mb-3" />
              <p className="text-white/50 text-sm">Couldn't load this application form. Please try again shortly.</p>
            </div>
          )}

          {!loadingForm && !formError && (
            <form onSubmit={submit} className="space-y-4" data-testid="apply-form">
              {fields.map((f) => (
                <DynamicField key={f.id} field={f} value={answers[f.id]} onChange={(v) => setAnswer(f.id, v)} />
              ))}

              <motion.button type="submit" disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.03 }} whileTap={{ scale: submitting ? 1 : 0.97 }}
                data-testid="apply-submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#C9973A] text-black font-semibold hover:shadow-[0_0_28px_-6px_rgba(201,151,58,0.7)] transition-all disabled:opacity-60">
                {submitting ? (
                  <>
                    <motion.div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                      animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                    {r.submitting || "Submitting..."}
                  </>
                ) : (
                  <><Send className="w-4 h-4" />{r.submitApplication || "Submit Application"}</>
                )}
              </motion.button>
              <p className="text-xs text-white/25 text-center">{r.contactDays2 || "We'll be in touch within 2 business days."}</p>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function OpenRoles() {
  const { t } = useLang();
  const r = t.openRoles || {};
  const [ready, setReady] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const prevBg = document.body.style.background;
    document.body.style.background = "#FBF8F3";
    setReady(true);
    return () => { document.body.style.background = prevBg; };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BACKEND}/api/jobs?size=100`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch {
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");
  const [loc, setLoc] = useState("All");
  const [page, setPage] = useState(1);
  const [applyRole, setApplyRole] = useState(null);

  const departments = useMemo(() => ["All", ...new Set(jobs.map((j) => j.department).filter(Boolean))], [jobs]);
  const locations   = useMemo(() => ["All", ...new Set(jobs.map((j) => j.location).filter(Boolean))], [jobs]);

  const filtered = useMemo(() => jobs.filter((job) =>
    (dept === "All" || job.department === dept) &&
    (loc === "All" || job.location === loc) &&
    job.title.toLowerCase().includes(query.toLowerCase())
  ), [jobs, query, dept, loc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const paged = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  const reset = (fn) => (v) => { fn(v); setPage(1); };

  return (
    <div className="relative bg-[#FBF8F3] text-brown-500">
      <ScrollProgress />
      <AmbientBackground />
      {ready && <CursorFollower />}

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full bg-white border border-brown-500/10 shadow-[0_2px_16px_-4px_rgba(61,35,20,0.1)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold-600 text-xs font-semibold uppercase">{r.eyebrow || "Open Roles"}</span>
          </motion.div>
          <h1 className="font-heading font-normal leading-[1.04] text-4xl sm:text-6xl lg:text-[4.6rem] text-[#231911] max-w-3xl">
            {r.title || "Find your next defining role"}
          </h1>
          {r.subtitle && <p className="mt-7 text-lg text-brown-500/70 max-w-xl leading-8">{r.subtitle}</p>}
        </div>
      </section>

      <section className="py-8 max-w-7xl mx-auto px-6 sm:px-8 pb-24">

        {loading && (
          <div className="py-24 flex justify-center">
            <motion.div className="w-7 h-7 border-2 border-brown-500/15 border-t-gold rounded-full"
              animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
          </div>
        )}

        {!loading && loadError && (
          <div className="py-24 text-center">
            <AlertCircle className="w-10 h-10 text-brown-500/20 mx-auto mb-4" />
            <p className="text-brown-500/50">Open roles are temporarily unavailable. Please check back shortly.</p>
          </div>
        )}

        {!loading && !loadError && (
          <>
            {/* ── Search + filters ── */}
            <div className="bg-white border border-brown-500/[0.08] rounded-2xl shadow-[0_4px_20px_-10px_rgba(61,35,20,0.15)] p-6 sm:p-7 mb-10">
              <div className="relative mb-5">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-500/55" />
                <input value={query} onChange={(e) => reset(setQuery)(e.target.value)}
                  placeholder={r.searchPlaceholder || "Search roles..."}
                  data-testid="roles-search"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-cream-100/70 border border-brown-500/[0.12] focus:border-gold/70 outline-none transition-colors text-[#231911] placeholder:text-brown-500/55 text-base sm:text-sm" />
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <p className="text-xs text-brown-500/65 mb-3 uppercase font-semibold">{r.department || "Department"}</p>
                  <div className="flex flex-wrap gap-2.5">
                    {departments.map((d) => (
                      <button key={d} onClick={() => reset(setDept)(d)}
                        className={`px-4 py-2 rounded-full text-sm transition-colors ${dept === d ? "bg-gold text-white font-semibold" : "border border-brown-500/20 text-brown-500/75 hover:text-[#231911] hover:border-gold/50"}`}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-brown-500/65 mb-3 uppercase font-semibold">{r.location || "Location"}</p>
                  <div className="flex flex-wrap gap-2.5">
                    {locations.map((l) => (
                      <button key={l} onClick={() => reset(setLoc)(l)}
                        className={`px-4 py-2 rounded-full text-sm transition-colors ${loc === l ? "bg-gold text-white font-semibold" : "border border-brown-500/20 text-brown-500/75 hover:text-[#231911] hover:border-gold/50"}`}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-brown-500/65 mb-6" data-testid="roles-count">
              {filtered.length} {filtered.length === 1 ? (r.roles || "open role") : (r.rolesPlural || "open roles")}
            </p>

            <AnimatePresence mode="wait">
              <motion.div key={`${dept}-${loc}-${query}-${current}`}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="space-y-5">
                {paged.length === 0 && (
                  <p className="text-center py-16 text-brown-500/65">{r.noRoles || "No roles match your filters."}</p>
                )}
                {paged.map((job) => (
                  <GlowCard key={job.id} lift={false} variant="light"
                    className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-5"
                    data-testid={`role-${job.id}`}>
                    <div className="flex-1">
                      <h3 className="font-heading text-xl font-semibold leading-snug text-[#231911]">{job.title}</h3>
                      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-sm text-brown-500/70">
                        <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" />{job.department}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{job.location}</span>
                      </div>
                    </div>
                    <button onClick={() => setApplyRole(job)} data-testid={`apply-${job.id}`}
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-gold text-white text-sm font-semibold hover:bg-gold-600 hover:shadow-[0_0_22px_-6px_rgba(201,151,58,0.5)] transition-colors shrink-0">
                      {r.apply || "Apply"} <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </GlowCard>
                ))}
              </motion.div>
            </AnimatePresence>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10" data-testid="pagination">
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-full text-sm transition-colors ${current === i + 1 ? "bg-gold text-white font-semibold" : "border border-brown-500/20 text-brown-500/75 hover:text-[#231911] hover:border-gold/50"}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {applyRole && <ApplyModal role={applyRole} onClose={() => setApplyRole(null)} t={t} />}
    </div>
  );
}
