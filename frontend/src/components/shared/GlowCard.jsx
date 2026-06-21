import { useRef, useState } from "react";
import { motion } from "framer-motion";

// Glassmorphism card with cursor-following glow border + hover lift
export const GlowCard = ({ children, className = "", glow = "16,185,129", lift = true, ...props }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [hover, setHover] = useState(false);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={lift ? { y: -8 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className={`group relative overflow-hidden rounded-2xl glass ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, rgba(${glow},0.12), transparent 40%)` }}
      />
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, rgba(${glow},0.5), transparent 40%)`,
          maskImage: "linear-gradient(#000,#000), linear-gradient(#000,#000)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};
