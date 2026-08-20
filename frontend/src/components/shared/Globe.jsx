import { motion } from "framer-motion";
import { LOCATIONS } from "../../data/content";

// CSS/SVG interactive rotating globe with pulsing office markers
export const Globe = () => {
  const markers = [
    { city: "Germany", top: "30%", left: "52%", color: "#10B981" },
    { city: "India", top: "52%", left: "68%", color: "#3B82F6" },
    { city: "Philippines", top: "58%", left: "82%", color: "#F59E0B" },
    { city: "Italy", top: "36%", left: "44%", color: "#EF4444" },
  ];

  return (
    <div className="relative w-full aspect-square max-w-[520px] mx-auto" data-testid="global-globe">
      {/* glow */}
      <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-3xl animate-pulse-glow" />

      <motion.div
        className="absolute inset-0 rounded-full border border-emerald-500/20 overflow-hidden"
        style={{ background: "radial-gradient(circle at 35% 30%, rgba(16,185,129,0.15), transparent 60%), radial-gradient(circle at 70% 70%, rgba(59,130,246,0.12), transparent 55%), #05060a" }}
      >
        {/* longitude/latitude grid — proper wireframe sphere geometry */}
        <div className="absolute inset-0 animate-spin-slow" style={{ transformOrigin: "center" }}>
          <svg viewBox="0 0 200 200" className="w-full h-full opacity-40">
            {/* Meridians — vertical ellipses, pole to pole, varying width */}
            {[...Array(8)].map((_, i) => (
              <ellipse key={`v${i}`} cx="100" cy="100" rx={8 + i * 12.5} ry="96" fill="none" stroke="rgba(16,185,129,0.25)" strokeWidth="0.4" />
            ))}
            {/* Latitudes — rings stacked toward the poles, narrowing as they approach top/bottom */}
            {[-75, -50, -25, 0, 25, 50, 75].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const R = 96;
              const cy = 100 - R * Math.sin(rad);
              const rx = R * Math.cos(rad);
              const ry = Math.max(2.5, 9 * Math.cos(rad));
              return (
                <ellipse key={`h${deg}`} cx="100" cy={cy} rx={rx} ry={ry} fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="0.4" />
              );
            })}
          </svg>
        </div>
      </motion.div>

      {/* connection arcs */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.path d="M44 36 Q48 28 52 30" fill="none" stroke="url(#g1)" strokeWidth="0.6"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.25, repeat: Infinity, repeatType: "reverse" }} />
        <motion.path d="M52 30 Q60 38 68 52" fill="none" stroke="url(#g1)" strokeWidth="0.6"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} />
        <motion.path d="M68 52 Q76 52 82 58" fill="none" stroke="url(#g1)" strokeWidth="0.6"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }} />
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>
      </svg>

      {markers.map((m, i) => (
        <motion.div key={m.city} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          style={{ top: m.top, left: m.left }}
          initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.2, type: "spring" }}>
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: m.color }} />
            <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: m.color }} />
          </span>
          <span className="mt-2 text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full glass whitespace-nowrap text-white">{m.city}</span>
        </motion.div>
      ))}
    </div>
  );
};