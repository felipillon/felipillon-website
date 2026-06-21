import { useState } from "react";
import { PageHero } from "../components/layout/Layout";
import { GlowCard } from "../components/shared/GlowCard";
import { Reveal } from "../components/shared/Reveal";
import { LOCATIONS } from "../data/content";
import { Send, CalendarCheck, MapPin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const SERVICES_OPTIONS = ["Staffing & Recruitment", "Custom Software", "AI Engineering", "Cloud Solutions", "Executive Search", "Other"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: SERVICES_OPTIONS[0], message: "" });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    toast.success("Inquiry sent!", { description: "Our team will reach out within one business day." });
    setForm({ name: "", email: "", company: "", service: SERVICES_OPTIONS[0], message: "" });
  };

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's start a conversation"
        subtitle="Tell us about your hiring needs or your next big build. We respond within one business day." />

      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8 grid lg:grid-cols-3 gap-8">
        <Reveal className="lg:col-span-2">
          <GlowCard lift={false} className="p-8 sm:p-10">
            <form onSubmit={submit} className="space-y-5" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name" value={form.name} onChange={set("name")} testid="contact-name" placeholder="Jane Doe" />
                <Field label="Email" value={form.email} onChange={set("email")} testid="contact-email" type="email" placeholder="jane@company.com" />
              </div>
              <Field label="Company" value={form.company} onChange={set("company")} testid="contact-company" placeholder="Acme Inc." />
              <div>
                <label className="text-xs uppercase tracking-wide text-muted-foreground">Service</label>
                <select value={form.service} onChange={set("service")} data-testid="contact-service"
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-transparent border border-border focus:border-emerald-500 outline-none transition-colors">
                  {SERVICES_OPTIONS.map((s) => <option key={s} value={s} className="bg-background">{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-muted-foreground">Message</label>
                <textarea value={form.message} onChange={set("message")} rows={5} data-testid="contact-message" placeholder="How can we help?"
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-transparent border border-border focus:border-emerald-500 outline-none transition-colors resize-none" />
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} data-testid="send-inquiry-btn"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-electric-500 text-white font-medium hover:shadow-[0_0_28px_-6px_rgba(16,185,129,0.7)] transition-shadow">
                  Send Inquiry <Send className="w-4 h-4" />
                </motion.button>
                <motion.button type="button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} data-testid="book-consultation-btn"
                  onClick={() => toast("Booking", { description: "Consultation scheduling opens soon." })}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass font-medium hover:border-emerald-500/50 transition-colors">
                  Book Consultation <CalendarCheck className="w-4 h-4" />
                </motion.button>
              </div>
            </form>
          </GlowCard>
        </Reveal>

        <div className="space-y-4">
          {LOCATIONS.map((l, i) => (
            <Reveal key={l.city} delay={i * 0.1}>
              <GlowCard className="p-6" data-testid={`contact-office-${l.city.toLowerCase().replace(/\s/g, "-")}`}>
                <h3 className="font-heading text-lg font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />{l.city} {l.role.includes("Headquarters") && <span className="text-xs text-emerald-500">HQ</span>}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" />{l.addr}</p>
              </GlowCard>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <GlowCard className="p-6 space-y-3">
              <a href="mailto:hello@felipillon.com" className="flex items-center gap-3 text-sm hover:text-emerald-500 transition-colors"><Mail className="w-4 h-4" />hello@felipillon.com</a>
              <a href="tel:+49301234567" className="flex items-center gap-3 text-sm hover:text-emerald-500 transition-colors"><Phone className="w-4 h-4" />+49 30 1234 567</a>
            </GlowCard>
          </Reveal>
        </div>
      </section>
    </>
  );
}

const Field = ({ label, testid, type = "text", ...props }) => (
  <div>
    <label className="text-xs uppercase tracking-wide text-muted-foreground">{label}</label>
    <input type={type} data-testid={testid} {...props}
      className="mt-2 w-full px-4 py-3 rounded-xl bg-transparent border border-border focus:border-emerald-500 outline-none transition-colors" />
  </div>
);
