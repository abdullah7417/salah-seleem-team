import { motion } from "framer-motion";

export default function SectionTitle({ eyebrow, title, subtitle, light = false, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`${center ? "text-center" : "text-right"} max-w-3xl ${center ? "mx-auto" : ""} mb-10 md:mb-14`}
    >
      {eyebrow && (
        <span className="inline-block text-primary bold text-sm md:text-base mb-3 tracking-wide">
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl md:text-5xl bold leading-tight ${light ? "text-white" : "text-foreground"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg ${light ? "text-white/70" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
