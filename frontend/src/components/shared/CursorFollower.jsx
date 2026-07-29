import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// A soft, colorful glow that trails the cursor + a minimal ring/dot custom
// cursor that scales up over links, buttons and cards. Desktop (fine pointer)
// only — quietly does nothing on touch devices.
export const CursorFollower = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const glowX = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const glowY = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const ringX = useSpring(mx, { stiffness: 400, damping: 30, mass: 0.4 });
  const ringY = useSpring(my, { stiffness: 400, damping: 30, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    document.documentElement.classList.add("felipillon-light-page", "cursor-enabled");

    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const over = (e) => {
      setHovering(!!e.target.closest("a, button, [data-cursor-hover]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("felipillon-light-page", "cursor-enabled");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing color glow */}
      <motion.div
        aria-hidden
        className="cursor-spotlight"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 420 : 320,
          height: hovering ? 420 : 320,
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(201,151,58,0.16) 0%, rgba(232,192,122,0.08) 40%, transparent 70%)",
          transition: "width 0.4s ease, height 0.4s ease",
        }}
      />
      {/* Custom cursor ring */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[60] pointer-events-none rounded-full border border-brown-500/40 hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 46 : 26,
          height: hovering ? 46 : 26,
          backgroundColor: hovering ? "rgba(201,151,58,0.12)" : "transparent",
          transition: "width 0.25s ease, height 0.25s ease, background-color 0.25s ease",
        }}
      />
      {/* Custom cursor dot */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[60] pointer-events-none rounded-full bg-gold hidden md:block"
        style={{
          x: mx,
          y: my,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
        }}
      />
    </>
  );
};