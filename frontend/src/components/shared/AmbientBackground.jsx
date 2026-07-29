// Lightweight, continuously-animating ambient background for the light pages.
// Pure CSS/motion (no video file) so it never restarts or reloads on route
// changes, and costs near-zero bandwidth/perf compared to a video loop.
export const AmbientBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="animate-blob absolute -top-40 -left-32 w-[560px] h-[560px] bg-gradient-to-br from-gold/14 via-gold-300/10 to-transparent blur-3xl" />
    <div className="animate-blob-slow absolute top-1/2 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-cream-300/50 via-gold/8 to-transparent blur-3xl" />
    <div
      className="animate-blob absolute -bottom-32 left-1/3 w-[440px] h-[440px] bg-gradient-to-tr from-gold-300/12 to-transparent blur-3xl"
      style={{ animationDelay: "4s" }}
    />
    <div
      className="absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(201,151,58,0.14) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
  </div>
);