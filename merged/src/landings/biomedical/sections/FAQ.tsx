import { useState, useCallback, useMemo, memo } from "react";
import { cn } from "@/lib/utils";
import { faqs as staticFaqs } from "../data";
import { useLandingData } from "@/context/LandingDataContext";

export const FAQ = memo(function FAQ() {
  const apiData = useLandingData();
  const faqs = useMemo(() => {
    const apiFaqs = apiData?.faqs;
    if (!apiFaqs?.length) return staticFaqs;
    return apiFaqs.map((f: any) => ({ q: f.question, a: f.answer }));
  }, [apiData]);

  const [open, setOpen] = useState<number | null>(0);
  const toggle = useCallback(
    (i: number) => setOpen((prev) => (prev === i ? null : i)),
    []
  );

  return (
    <section className="bg-white px-5 py-8" aria-labelledby="faq-heading">
      <div className="mx-auto w-full max-w-[480px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
        <p className="text-center text-[34px] md:text-[46px] bold text-text-primary leading-[1.25] tracking-tight mb-2" id="faq-heading">{apiData?.general_data[1]?.faqs_title || "أسئلة شائعة"}</p>
        <h2 className="text-center text-base md:text-xl medium leading-[1.5] text-text-secondary tracking-normal mb-4">أي سؤال في دماغك هتلاقيه هنا</h2>

        <div>
          {faqs.map((f: any, i: number) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={cn(i < faqs.length - 1 && "border-b border-[#E5E7EB]")}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  className="flex w-full items-center justify-between gap-2.5 py-4 text-right text-[14px] bold text-text-primary min-h-[44px]"
                >
                  <span>{f.q}</span>
                  <span
                    className={cn(
                      "text-[11px] transition-transform shrink-0 text-brand-red",
                      isOpen ? "rotate-180" : "rotate-0"
                    )}
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <p
                    id={`faq-answer-${i}`}
                    role="region"
                    className="pb-4 text-[13px] leading-[1.75] text-text-secondary"
                  >
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
