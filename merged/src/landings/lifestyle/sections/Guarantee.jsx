import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import badge from "@/assets/guarantee-badge.png";

/**
 * Guarantee section — dark background with red/orange radial glow + white badge on top.
 * Matches salahseleemteam.com/lifestyle "ضمان الفورمة" block.
 */
export default function Guarantee() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-guarantee px-6 py-14 md:py-20 md:px-10 text-center shadow-card"
        >
          {/* decorative glows */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/50 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-primary-deep/60 blur-3xl" />

          <div className="relative max-w-3xl mx-auto">
            <img
              src={badge}
              alt="شعار الضمان"
              className="mx-auto w-24 h-24 md:w-40 md:h-40 object-contain mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
              loading="lazy"
            />
            <h3 className="font-black text-white text-3xl md:text-5xl leading-tight mb-4">
              ضمان الفورمة
            </h3>
            <p className="text-white/95 text-lg md:text-2xl bold leading-relaxed mb-8">
              لو ملاحظتش أي تطور في جسمك وصحتك بعد الالتزام الكامل بالبرامج لمدة 3 شهور، هنرجعلك
              الاشتراك كامل
            </p>
            <a
              href="#join"
              className="inline-flex items-center justify-center bg-black text-white bold text-lg md:text-xl px-10 py-4 rounded-full hover:bg-dark-soft transition"
            >
              يلا نعمل فورمة
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
