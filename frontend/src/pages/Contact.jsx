import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { CursorFollower } from "../components/shared/CursorFollower";
import { AmbientBackground } from "../components/shared/AmbientBackground";
import { ScrollProgress } from "../components/shared/ScrollProgress";
import { LOCATIONS, MEDIA } from "../data/content";
import { Send, MapPin, Mail, Phone, User, Building2, MessageSquare, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "../context/LangContext";

const SERVICES_VALUES = [
  "Staffing & Recruitment",
  "Software Development",
  "Digital Marketing",
  "AI Applications",
  "CRM Platforms",
  "Looking for a Job",
  "Other",
];

const EMPTY = { name: "", email: "", company: "", service: SERVICES_VALUES[0], message: "" };

export default function Contact() {
  const { t } = useLang();
  const c = t.contact || {};
  const f = t.footprint || {};
  const [ready, setReady] = useState(false);

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const prevBg = document.body.style.background;
    document.body.style.background = "#FBF8F3";
    setReady(true);
    return () => { document.body.style.background = prevBg; };
  }, []);

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = `${c.fullName || "Full Name"} ${c.required || "is required."}`;
    if (!form.email.trim()) e.email = `${c.emailAddress || "Email Address"} ${c.required || "is required."}`;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = c.validEmail || "Please enter a valid email.";
    if (!form.message.trim()) e.message = `${c.message || "Message"} ${c.required || "is required."}`;
    return e;
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); toast.error(c.fixErrors || "Please fix the errors below."); return; }
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          company: form.company,
          service: form.service,
          message: form.message,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Submission failed");
      }
      setSubmitted(true);
      toast.success(c.successTitle || "Message received!", {
        description: `${c.successDesc1 || "Thank you,"} ${form.name}`,
      });
    } catch (err) {
      toast.error(err.message || c.genericError || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = (hasError) =>
    `w-full pl-10 pr-4 py-3.5 rounded-xl bg-cream-100/60 border outline-none transition-all text-[#231911] placeholder:text-brown-500/30 text-sm ${
      hasError ? "border-red-400/60" : "border-brown-500/[0.1] focus:border-gold/60"
    }`;

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
            <span className="text-gold-600 text-xs font-semibold tracking-[0.2em] uppercase">{c.eyebrow || "Contact"}</span>
          </motion.div>
          <h1 className="font-heading font-light leading-[0.96] tracking-[-0.05em] text-4xl sm:text-6xl lg:text-[4.6rem] text-[#231911] max-w-3xl">
            {c.title || "Let's start a conversation"}
          </h1>
          {c.subtitle && <p className="mt-7 text-lg text-brown-500/55 max-w-xl leading-relaxed font-light">{c.subtitle}</p>}
        </div>
      </section>

      <section className="pb-24 max-w-7xl mx-auto px-6 sm:px-8 grid lg:grid-cols-3 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-2">
          <Reveal>
            <GlowCard variant="light" lift={false} className="p-8 sm:p-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-14 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 className="w-8 h-8 text-gold-600" />
                    </motion.div>
                    <h3 className="font-heading text-2xl font-medium mb-3 text-[#231911]">{c.successTitle}</h3>
                    <p className="text-brown-500/50 max-w-sm mb-8 text-sm leading-relaxed">
                      {c.successDesc1} <span className="text-[#231911] font-medium">{form.name}</span>. {c.successDesc2} <span className="text-[#231911] font-medium">{form.email}</span> {c.successDesc3}
                    </p>
                    <MagneticButton variant="lightSecondary" onClick={() => { setForm(EMPTY); setErrors({}); setSubmitted(false); }}>
                      {c.sendAnother}
                    </MagneticButton>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    className="space-y-5"
                    data-testid="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="text-[10px] uppercase tracking-[0.2em] text-brown-500/40 block mb-2">
                          {c.fullName} <span className="text-gold-600">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-500/30" />
                          <input type="text" value={form.name} onChange={set("name")} placeholder="Jane Doe"
                            data-testid="contact-name"
                            className={inputCls(errors.name)} />
                        </div>
                        {errors.name && <p className="text-xs text-red-500/80 mt-1.5">{errors.name}</p>}
                      </div>
                      {/* Email */}
                      <div>
                        <label className="text-[10px] uppercase tracking-[0.2em] text-brown-500/40 block mb-2">
                          {c.emailAddress} <span className="text-gold-600">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-500/30" />
                          <input type="email" value={form.email} onChange={set("email")} placeholder="jane@company.com"
                            data-testid="contact-email"
                            className={inputCls(errors.email)} />
                        </div>
                        {errors.email && <p className="text-xs text-red-500/80 mt-1.5">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.2em] text-brown-500/40 block mb-2">{c.company}</label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-500/30" />
                        <input type="text" value={form.company} onChange={set("company")} placeholder="Acme GmbH"
                          data-testid="contact-company"
                          className={inputCls(false)} />
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.2em] text-brown-500/40 block mb-2">{c.service}</label>
                      <select value={form.service} onChange={set("service")} data-testid="contact-service"
                        className="w-full px-4 py-3.5 rounded-xl bg-cream-100/60 border border-brown-500/[0.1] focus:border-gold/60 outline-none transition-colors text-[#231911] text-sm">
                        {SERVICES_VALUES.map((val, i) => (
                          <option key={val} value={val}>
                            {(c.serviceOptions && c.serviceOptions[i]) || val}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.2em] text-brown-500/40 block mb-2">
                        {c.message} <span className="text-gold-600">*</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-brown-500/30" />
                        <textarea value={form.message} onChange={set("message")} rows={5}
                          data-testid="contact-message"
                          placeholder={c.messagePlaceholder}
                          className={`${inputCls(errors.message)} resize-none`} />
                      </div>
                      {errors.message && <p className="text-xs text-red-500/80 mt-1.5">{errors.message}</p>}
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <motion.button type="submit" disabled={submitting}
                        whileHover={{ scale: submitting ? 1 : 1.04, boxShadow: "0 0 32px -4px rgba(201,151,58,0.5)" }}
                        whileTap={{ scale: 0.97 }}
                        data-testid="send-inquiry-btn"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-white text-sm font-semibold transition-all disabled:opacity-50">
                        {submitting ? (
                          <>
                            <motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                            {c.sending}
                          </>
                        ) : (
                          <><Send className="w-4 h-4" />{c.sendInquiry}</>
                        )}
                      </motion.button>
                    </div>

                    <p className="text-xs text-brown-500/35 pt-1">
                      {c.responseTime}{" "}
                      <a href="/privacy-policy" className="text-gold-600 hover:underline">{c.privacyPolicy}</a>.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlowCard>
          </Reveal>
        </div>

        {/* Office cards */}
        <div className="space-y-4">
          {LOCATIONS.map((loc, i) => {
            const locText = {
              Germany: { country: f.germany, role: f.globalHeadquarters },
              India: { country: f.india, role: f.techHub },
              Philippines: { country: f.philippines, role: f.apacOperations },
              Italy: { country: f.italy, role: f.europeanOperations },
            }[loc.country] || {};
            return (
            <Reveal key={loc.country} delay={i * 0.1}>
              <GlowCard variant="light" className="p-6" data-testid={`contact-office-${loc.country.toLowerCase()}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div>
                    <h3 className="font-medium text-[#231911] text-sm">{locText.country || loc.country}</h3>
                    <p className="text-[10px] text-gold-600">{locText.role || loc.role}</p>
                  </div>
                </div>
                <p className="text-xs text-brown-500/45 leading-relaxed flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />{loc.addr}
                </p>
                <p className="text-[10px] text-brown-500/30 mt-2">{loc.entity}</p>
              </GlowCard>
            </Reveal>
          );})}
          <Reveal delay={0.35}>
            <GlowCard variant="light" className="p-6 space-y-3">
              <a href="mailto:hello@felipillon.com" className="flex items-center gap-3 text-sm text-brown-500/55 hover:text-gold-600 transition-colors">
                <Mail className="w-4 h-4" /> hello@felipillon.com
              </a>
              <a href="tel:+4930000000" className="flex items-center gap-3 text-sm text-brown-500/55 hover:text-gold-600 transition-colors">
                <Phone className="w-4 h-4" /> +49 30 000 0000
              </a>
            </GlowCard>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
