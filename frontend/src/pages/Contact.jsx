import { useState } from "react";
import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { MagneticButton } from "../components/shared/MagneticButton";
import { LOCATIONS, MEDIA } from "../data/content";
import { Send, MapPin, Mail, Phone, User, Building2, MessageSquare, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useLang } from "../context/LangContext";

const SERVICES_OPTIONS = [
  "Staffing & Recruitment",
  "Software Development",
  "Digital Marketing",
  "AI Applications",
  "CRM Platforms",
  "Other",
];

const EMPTY = { name: "", email: "", company: "", service: SERVICES_OPTIONS[0], message: "" };

export default function Contact() {
  const { t } = useLang();
  const c = t.contact || {};

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = c.fullName + " is required.";
    if (!form.email.trim()) e.email = c.emailAddress + " is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email.";
    if (!form.message.trim()) e.message = c.message + " is required.";
    return e;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); toast.error("Please fix the errors below."); return; }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success(c.successTitle, { description: c.successDesc1 + " " + form.name });
    }, 1400);
  };

  return (
    <>
      <PageHero
        eyebrow={c.eyebrow || "Contact"}
        title={c.title || "Let's start a conversation"}
        subtitle={c.subtitle}
        img={MEDIA.officeWide}
      />

      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8 grid lg:grid-cols-3 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-2">
          <Reveal>
            <GlowCard lift={false} className="p-8 sm:p-10">
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
                      className="w-16 h-16 rounded-full bg-[#C9973A]/10 border border-[#C9973A]/20 flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 className="w-8 h-8 text-[#C9973A]" />
                    </motion.div>
                    <h3 className="font-heading text-2xl font-medium mb-3 text-white">{c.successTitle}</h3>
                    <p className="text-white/45 max-w-sm mb-8 text-sm leading-relaxed">
                      {c.successDesc1} <span className="text-white font-medium">{form.name}</span>. {c.successDesc2} <span className="text-white font-medium">{form.email}</span> {c.successDesc3}
                    </p>
                    <MagneticButton variant="secondary" onClick={() => { setForm(EMPTY); setErrors({}); setSubmitted(false); }}>
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
                        <label className="text-[10px] uppercase tracking-[0.2em] text-white/35 block mb-2">
                          {c.fullName} <span className="text-[#C9973A]">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                          <input type="text" value={form.name} onChange={set("name")} placeholder="Jane Doe"
                            data-testid="contact-name"
                            className={`w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/[0.04] border outline-none transition-all text-white placeholder:text-white/20 text-sm ${errors.name ? "border-red-500/60" : "border-white/[0.08] focus:border-[#C9973A]/60"}`} />
                        </div>
                        {errors.name && <p className="text-xs text-red-400/80 mt-1.5">{errors.name}</p>}
                      </div>
                      {/* Email */}
                      <div>
                        <label className="text-[10px] uppercase tracking-[0.2em] text-white/35 block mb-2">
                          {c.emailAddress} <span className="text-[#C9973A]">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                          <input type="email" value={form.email} onChange={set("email")} placeholder="jane@company.com"
                            data-testid="contact-email"
                            className={`w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/[0.04] border outline-none transition-all text-white placeholder:text-white/20 text-sm ${errors.email ? "border-red-500/60" : "border-white/[0.08] focus:border-[#C9973A]/60"}`} />
                        </div>
                        {errors.email && <p className="text-xs text-red-400/80 mt-1.5">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.2em] text-white/35 block mb-2">{c.company}</label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                        <input type="text" value={form.company} onChange={set("company")} placeholder="Acme GmbH"
                          data-testid="contact-company"
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9973A]/60 outline-none transition-all text-white placeholder:text-white/20 text-sm" />
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.2em] text-white/35 block mb-2">{c.service}</label>
                      <select value={form.service} onChange={set("service")} data-testid="contact-service"
                        className="w-full px-4 py-3.5 rounded-xl bg-[#0F0F14] border border-white/[0.08] focus:border-[#C9973A]/60 outline-none transition-colors text-white text-sm">
                        {SERVICES_OPTIONS.map(s => <option key={s} value={s} className="bg-[#0F0F14]">{s}</option>)}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.2em] text-white/35 block mb-2">
                        {c.message} <span className="text-[#C9973A]">*</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-white/25" />
                        <textarea value={form.message} onChange={set("message")} rows={5}
                          data-testid="contact-message"
                          placeholder={c.messagePlaceholder}
                          className={`w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/[0.04] border outline-none transition-all resize-none text-white placeholder:text-white/20 text-sm ${errors.message ? "border-red-500/60" : "border-white/[0.08] focus:border-[#C9973A]/60"}`} />
                      </div>
                      {errors.message && <p className="text-xs text-red-400/80 mt-1.5">{errors.message}</p>}
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <motion.button type="submit" disabled={submitting}
                        whileHover={{ scale: submitting ? 1 : 1.04, boxShadow: "0 0 32px -4px rgba(201,151,58,0.6)" }}
                        whileTap={{ scale: 0.97 }}
                        data-testid="send-inquiry-btn"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C9973A] text-black text-sm font-semibold transition-all disabled:opacity-50">
                        {submitting ? (
                          <>
                            <motion.div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                              animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                            {c.sending}
                          </>
                        ) : (
                          <><Send className="w-4 h-4" />{c.sendInquiry}</>
                        )}
                      </motion.button>
                    </div>

                    <p className="text-xs text-white/25 pt-1">
                      {c.responseTime}{" "}
                      <a href="/privacy-policy" className="text-[#C9973A] hover:underline">{c.privacyPolicy}</a>.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlowCard>
          </Reveal>
        </div>

        {/* Office cards */}
        <div className="space-y-4">
          {LOCATIONS.map((loc, i) => (
            <Reveal key={loc.country} delay={i * 0.1}>
              <GlowCard className="p-6" data-testid={`contact-office-${loc.country.toLowerCase()}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{loc.flag}</span>
                  <div>
                    <h3 className="font-medium text-white text-sm">{loc.country}</h3>
                    <p className="text-[10px] text-[#C9973A]">{loc.role}</p>
                  </div>
                </div>
                <p className="text-xs text-white/35 leading-relaxed flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />{loc.addr}
                </p>
                <p className="text-[10px] text-white/20 mt-2">{loc.entity}</p>
              </GlowCard>
            </Reveal>
          ))}
          <Reveal delay={0.35}>
            <GlowCard className="p-6 space-y-3">
              <a href="mailto:hello@felipillon.com" className="flex items-center gap-3 text-sm text-white/45 hover:text-[#C9973A] transition-colors">
                <Mail className="w-4 h-4" /> hello@felipillon.com
              </a>
              <a href="tel:+4930000000" className="flex items-center gap-3 text-sm text-white/45 hover:text-[#C9973A] transition-colors">
                <Phone className="w-4 h-4" /> +49 30 000 0000
              </a>
            </GlowCard>
          </Reveal>
        </div>
      </section>
    </>
  );
}