import { Reveal } from "./Reveal";

export const SectionHeading = ({ eyebrow, title, subtitle, center = false, className = "" }) => (
  <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl ${className}`}>
    {eyebrow && (
      <Reveal>
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-emerald-500 mb-4">
          <span className="w-6 h-px bg-emerald-500" />
          {eyebrow}
          <span className="w-6 h-px bg-emerald-500" />
        </span>
      </Reveal>
    )}
    <Reveal delay={0.05}>
      <h2 className="font-heading text-4xl sm:text-5xl font-light tracking-tight leading-[1.05]">{title}</h2>
    </Reveal>
    {subtitle && (
      <Reveal delay={0.1}>
        <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
      </Reveal>
    )}
  </div>
);