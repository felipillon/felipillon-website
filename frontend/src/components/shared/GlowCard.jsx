import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const GlowCard = ({ children, className = "", glow = "201,151,58", lift = true, variant = "dark", ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const [hover, setHover] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setHover(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: hover && lift ? rotateX : 0,
        rotateY: hover && lift ? rotateY : 0,
      }}
      className={`relative group rounded-[24px] backdrop-blur-xl transition-colors duration-500 overflow-hidden ${
        variant === "light"
          ? "bg-white border border-brown-500/[0.08] shadow-[0_2px_24px_-8px_rgba(61,35,20,0.12)] hover:border-gold/30 hover:shadow-[0_8px_40px_-8px_rgba(201,151,58,0.25)]"
          : "bg-[#0c0c0e] border border-white/[0.06] hover:bg-[#111114]"
      } ${className}`}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500"
        style={{
          opacity: hover ? 1 : 0,
          background: `radial-gradient(500px circle at ${useTransform(mouseXSpring, v => (v + 0.5) * 100)}% ${useTransform(mouseYSpring, v => (v + 0.5) * 100)}%, rgba(${glow}, 0.08), transparent 40%)`,
        }}
      />
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${variant === "light" ? "via-gold/40" : "via-white/[0.15]"}`} />
      <div className="relative z-10 h-full w-full" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
};