import { motion } from "framer-motion";

export default function GlassCard({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      className="glass-card group
        hover:-translate-y-2
        hover:border-cyan-400/50
        hover:shadow-xl hover:shadow-cyan-500/20
        transition-all"
    >
      {children}
    </motion.div>
  );
}
