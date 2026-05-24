import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/+201050001587"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل واتساب"
      className="fixed bottom-5 right-5 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white grid place-items-center shadow-glow animate-pulse-ring hover:scale-110 transition"
    >
      <FaWhatsapp className="w-7 h-7 md:w-8 md:h-8" />
    </a>
  );
}
