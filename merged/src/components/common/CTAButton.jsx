import { motion } from "framer-motion";

export default function CTAButton({ children, variant = "primary", size = "lg", className = "", as = "a", href = "#pricing", ...props }) {
  const base = "inline-flex items-center justify-center gap-2 bold rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/30";
  const sizes = {
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base md:text-lg",
    xl: "px-10 py-5 text-lg md:text-xl",
  };
  const variants = {
    primary: "bg-primary text-white shadow-glow hover:bg-primary-deep",
    dark: "bg-dark text-white hover:bg-dark-soft",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    white: "bg-white text-dark hover:bg-white/95 shadow-card",
  };
  const Tag = as;
  return (
    <motion.div whileHover={{ y: -2 }} className="inline-block w-full sm:w-auto">
      <Tag href={href} className={`${base} ${sizes[size]} ${variants[variant]} w-full sm:w-auto ${className}`} {...props}>
        {children}
      </Tag>
    </motion.div>
  );
}
