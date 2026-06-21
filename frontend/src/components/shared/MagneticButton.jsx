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
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.25 });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (to) navigate(to);
  };

  const styles = {
    primary: "bg-gradient-to-r from-emerald-500 to-electric-500 text-white hover:shadow-[0_0_30px_-4px_rgba(16,185,129,0.6)]",
    secondary: "glass text-foreground hover:border-emerald-500/50",
    ghost: "bg-transparent border border-foreground/15 text-foreground hover:bg-foreground/5",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={handleClick}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 180, damping: 14 }}
      className={`relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm transition-shadow duration-300 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon className="w-4 h-4" />}
    </motion.button>
  );
};
