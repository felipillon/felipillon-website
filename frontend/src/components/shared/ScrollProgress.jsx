import { motion, useScroll, useSpring } from "framer-motion";

// Thin gold bar pinned under the navbar, filling with scroll progress.
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gold origin-left z-[70]"
      style={{ scaleX }}
    />
  );
};