import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import Container from "@/components/common/Container";
import { faqs as staticFaqs } from "../data/features";
import { useLandingData } from "@/context/LandingDataContext";

/**
 * FAQs — dark style to match reference:
 * - Black section background
 * - White centered heading with orange "واتساب" + whatsapp icon
 * - Two-column grid of FAQ items separated by thin white dividers
 * - Plus/minus icon on the left, bold white question on the right
 */
function Item({ q, a, open, onClick }) {
  return (
    <div className="border-b border-white/15">
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center  gap-4 py-6 text-right group"
      >
        <span className="shrink-0 text-white w-6 h-6 grid place-items-center text-2xl leading-none font-light select-none cursor-pointer">
          {open ? "−" : "+"}
        </span>
        <span className="bold text-white text-base md:text-[17px] leading-[1.8] group-hover:text-primary transition-colors cursor-pointer">
          {q}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-10 text-white/70 leading-[2] text-sm md:text-[14px] text-right">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const apiData = useLandingData();
  const faqs = useMemo(() => {
    const apiFaqs = apiData?.faqs;
    if (!apiFaqs?.length) return staticFaqs;
    return apiFaqs.map((f) => ({ q: f.question, a: f.answer }));
  }, [apiData]);

  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-16 md:py-24 bg-black">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center pb-12 md:pb-16">
            <h2 className="bold text-white text-2xl md:text-3xl lg:text-[38px] leading-[1.7]">
              لو عندك سؤال غير الأسئلة الموجودة، ممكن تتواصل
              <br className="hidden md:block" /> معانا من خلال{" "}
              <a
                href="https://wa.me/201050001587"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white inline-flex items-center gap-1.5 hover:text-primary align-middle transition-colors"
              >
                واتساب
              </a>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 md:gap-x-16">
            {faqs.map((f, i) => (
              <Item
                key={i}
                q={f.q}
                a={f.a}
                open={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
