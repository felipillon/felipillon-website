import { motion } from "framer-motion";

// Scroll reveal wrapper
export const Reveal = ({ children, delay = 0, y = 28, className = "", ...props }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Staggered container + item
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const StaggerGroup = ({ children, className = "" }) => (
  <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className={className}>
    {children}
  </motion.div>
);
