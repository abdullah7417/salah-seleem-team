import { useEffect, useState, useRef, memo } from "react";
import { cn } from "@/lib/utils";

export const StickyCTA = memo(function StickyCTA() {
  const [show, setShow] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          setShow(window.scrollY > 350);
          ticking.current = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[100] bg-white px-4 pt-2.5 pb-3.5 transition-transform duration-300 border-t border-border",
        show ? "translate-y-0" : "translate-y-full"
      )}
      role="complementary"
      aria-label="زر الاشتراك العائم"
    >
      <a
        href="#pricing"
        className="block lg:hidden w-full rounded-[10px] text-center text-[15px] font-extrabold text-white bg-brand-red p-[14px] min-h-[44px]"
      >
        ابدأ تحدي الـ 90 يوم — 1,900 ج.م
      </a>
    </div>
  );
});
