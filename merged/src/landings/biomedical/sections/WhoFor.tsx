import { memo, useMemo } from "react";
import { whoForItems as staticItems } from "../data";
import { useLandingData } from "@/context/LandingDataContext";

export const WhoFor = memo(function WhoFor() {
  const apiData = useLandingData();
  const whoForItems = useMemo(() => {
    const benefits = apiData?.benefits;
    if (!benefits?.length) return staticItems;
    return benefits.map((b: any) => `${b.title} — ${b.description}`);
  }, [apiData]);
  return (
    <section className="bg-brand-offwhite px-5 py-10" aria-labelledby="whofor-heading">
      <div className="mx-auto w-full max-w-[480px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
        <p className="text-center text-[34px] md:text-[46px] bold text-text-primary leading-[1.25] tracking-tight mb-2" id="whofor-heading">{apiData?.general_data[1]?.benefit_title || "ازاي تتأكد إن الخدمة مناسبة ليك؟"}</p>
        <h2 className="text-center text-base md:text-xl medium leading-[1.5] text-text-secondary mb-6 tracking-normal">SST مناسب ليك لو:</h2>

        <ul className="space-y-2.5">
          {whoForItems.map((t: any, i: number) => (
            <li
              key={i}
              className="flex items-start gap-2.5 rounded-[10px] border border-border bg-white px-3.5 py-3 text-[14px] leading-snug text-text-secondary"
            >
              <span className="font-extrabold shrink-0 text-brand-teal" aria-hidden="true">✓</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
