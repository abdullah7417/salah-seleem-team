import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CTAButton from "@/components/common/CTAButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-dark/90 backdrop-blur-md shadow-card" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="text-white bold text-xl md:text-2xl tracking-tight">SST</span>
          <span className="w-9 h-9 rounded-lg bg-white grid place-items-center text-primary bold">S</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-white/80 text-sm font-medium">
          <a href="#videos" className="hover:text-primary transition">التحولات</a>
          <a href="#why" className="hover:text-primary transition">ليه تشترك</a>
          <a href="#pricing" className="hover:text-primary transition">الاشتراك</a>
          <a href="#faq" className="hover:text-primary transition">الأسئلة</a>
        </div>
        <CTAButton size="md" href="#pricing">اشترك دلوقتي</CTAButton>
      </nav>
    </motion.header>
  );
}
