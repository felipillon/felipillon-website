import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";

export const MagneticButton = ({
  children, onClick, to, variant = "primary", className = "", icon: Icon, ...props
}) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.22,
      y: (e.clientY - rect.top - rect.height / 2) * 0.22,
    });
  };

  const reset = () => setPos({ x: 0, y: 0 });
  const handleClick = (e) => { if (onClick) onClick(e); if (to) navigate(to); };

  const styles = {
    primary: "bg-[#C9973A] text-black font-semibold hover:bg-[#D4A853] hover:shadow-[0_0_32px_-4px_rgba(201,151,58,0.65)] active:scale-95",
    secondary: "bg-[#3D2314] border border-[#C9973A] text-white hover:bg-[#54321E] hover:border-[#E0B65F]",
    ghost: "bg-[#231911] border border-white/60 text-white hover:bg-[#3D2314] hover:border-white",
    // Light-theme variants (homepage redesign)
    lightPrimary: "bg-brown-500 text-white font-semibold hover:bg-brown-600 hover:shadow-[0_10px_32px_-8px_rgba(61,35,20,0.45)] active:scale-95",
    lightSecondary: "bg-white text-[#3D2314] border border-brown-500/45 hover:bg-[#F5EDDF] hover:border-brown-500/70 hover:shadow-[0_8px_28px_-8px_rgba(201,151,58,0.35)]",
    lightGhost: "bg-[#F5EDDF] border border-brown-500/45 text-[#3D2314] hover:bg-[#EADCC7] hover:border-brown-500/70",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={handleClick}
      animate={{ x: pos.x, y: pos.y }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 200, damping: 16 }}
      className={cn("relative min-h-11 max-w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#855A16] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", styles[variant], className)}
      {...props}
    >
      {children}
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
    </motion.button>
  );
};