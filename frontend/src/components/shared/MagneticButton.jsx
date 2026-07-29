import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const MagneticButton = ({
  children, onClick, to, variant = "primary", className = "", icon: Icon, ...props
}) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
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
    secondary: "bg-white/[0.07] backdrop-blur-md border border-white/[0.12] text-white hover:bg-white/[0.12] hover:border-white/20",
    ghost: "bg-transparent border border-white/[0.12] text-white/70 hover:text-white hover:border-white/25",
    // Light-theme variants (homepage redesign)
    lightPrimary: "bg-brown-500 text-white font-semibold hover:bg-brown-600 hover:shadow-[0_10px_32px_-8px_rgba(61,35,20,0.45)] active:scale-95",
    lightSecondary: "bg-white text-brown-500 border border-brown-500/15 font-medium hover:border-gold/50 hover:shadow-[0_8px_28px_-8px_rgba(201,151,58,0.35)]",
    lightGhost: "bg-transparent border border-brown-500/15 text-brown-500/70 hover:text-brown-500 hover:border-brown-500/30",
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
      className={`relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm transition-all duration-300 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon className="w-4 h-4" />}
    </motion.button>
  );
};