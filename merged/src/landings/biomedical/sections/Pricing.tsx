import { useState, useCallback, useMemo, memo } from "react";
import { cn } from "@/lib/utils";
import { pricingOptions as staticOptions, pricingFeatures as staticFeatures, medicalTags as staticTags } from "../data";
import { useLandingData } from "@/context/LandingDataContext";

export const Pricing = memo(function Pricing() {
  const apiData = useLandingData();
  const pricingOptions = useMemo(() => {
    const memberships = apiData?.memberships;
    if (!memberships?.length) return staticOptions;
    return memberships.map((m: any) => ({
      id: String(m.id),
      name: m.title || "",
      subSavings: m.price_before ? `وفر ${Number(m.price_before) - Number(m.price)} ج` : "",
      perMonth: m.outside_price ? `${m.outside_price} ج / شهر` : "",
      total: m.price ? `${Number(m.price).toLocaleString()} ج إجمالي` : "",
      totalNum: m.price ? `${Number(m.price).toLocaleString()} ج` : "",
      oldPrice: m.price_before ? `${Number(m.price_before).toLocaleString()} ج` : "",
      savingsBadge: m.price_before ? `وفرت ${(Number(m.price_before) - Number(m.price)).toLocaleString()} ج` : "",
      cta: m.price ? `ادفع ${Number(m.price).toLocaleString()} جنيه ←` : "",
      badge: "",
      pkgLabel: m.title || "",
    }));
  }, [apiData]);
  const pricingFeatures = useMemo(() => {
    const features = apiData?.membership_plans?.[0]?.features;
    if (!features?.length) return staticFeatures;
    return features.map((f: any) => f.ar || f.en || "");
  }, [apiData]);
  const medicalTags = useMemo(() => {
    const tags = apiData?.general_data?.[0];
    if (!tags) return staticTags;
    return staticTags;
  }, [apiData]);

  const [sel, setSel] = useState<string>(pricingOptions[1]?.id ?? "6m");
  const handleSelect = useCallback((id: string) => setSel(id), []);
  const current = pricingOptions.find((o: any) => o.id === sel) ?? pricingOptions[0];

  return (
    <section id="pricing" className="px-5 py-8 scroll-mt-16 bg-brand-offwhite" aria-labelledby="pricing-heading">
      <div className="mx-auto w-full max-w-[480px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
        <p className="text-center text-[34px] md:text-[46px] bold text-text-primary leading-[1.25] tracking-tight mb-2" id="pricing-heading">تحدي الـــ 90 يوم</p>
        <h2 className="text-center text-base md:text-xl medium leading-[1.5] text-text-secondary tracking-normal">اختار الباقة المناسبة ليك</h2>

        <div className="flex flex-col gap-2 mb-4" role="radiogroup" aria-label="اختر الباقة">
          {pricingOptions.map((o: any) => {
            const selected = sel === o.id;
            return (
              <button
                key={o.id}
                onClick={() => handleSelect(o.id)}
                role="radio"
                aria-checked={selected}
                className={cn(
                  "relative w-full text-right rounded-xl bg-white transition-all min-h-[44px]",
                  selected ? "border-2 border-brand-red" : "border-[1.5px] border-[#E5E7EB]",
                  "p-[14px_14px_12px]"
                )}
              >
                {o.badge && (
                  <span className="absolute top-0 left-4 text-[10px] bold text-white bg-brand-red px-2 py-[2px] rounded-b-md">
                    {o.badge}
                  </span>
                )}
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full",
                      selected ? "border-none bg-brand-red" : "border-[1.5px] border-[#D1D5DB] bg-transparent"
                    )}
                    aria-hidden="true"
                  >
                    {selected && <span className="h-[7px] w-[7px] rounded-full bg-white" />}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[14px] font-semibold text-text-primary">{o.name}</span>
                      {o.subSavings && (
                        <span className="rounded-md text-[11px] bold px-1.5 py-0.5 bg-[rgba(230,51,18,0.1)] text-brand-red">
                          {o.subSavings}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                      <span className="text-[15px] font-semibold text-text-primary">{o.perMonth}</span>
                      <span className="text-[11px] text-text-muted">{o.total}</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-white overflow-hidden border-[0.5px] border-[#E5E7EB] border-t-[3px] border-t-brand-red rounded-b-[14px]">
          <div className="px-5 pt-5">
            <div className="text-[12px] font-semibold uppercase tracking-wider mb-2 text-brand-teal">
              {current.pkgLabel}
            </div>
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <span className="text-[34px] bold leading-none text-text-primary">
                {current.totalNum}
              </span>
              <span className="text-[15px] line-through text-text-muted">
                {current.oldPrice}
              </span>
              <span className="rounded-lg px-2 py-0.5 text-[11px] bold bg-[rgba(230,51,18,0.08)] text-brand-red">
                {current.savingsBadge}
              </span>
            </div>
            <div className="text-[13px] font-semibold mt-1.5 text-brand-teal">
              = {current.perMonth} فقط
            </div>
            <p className="text-[13px] italic mt-2 text-text-secondary">
              جه الوقت اللي تكتشف فيه أحسن نسخة من نفسك
            </p>
            <div className="h-px my-3.5 bg-border" />
          </div>

          <div className="mx-5 mb-4 rounded-lg bg-[rgba(71,112,108,0.05)] border border-[rgba(71,112,108,0.12)] p-[10px_12px]">
            <div className="text-[11px] font-semibold mb-2 text-brand-teal">
              🏥 مناسب لحالات:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {medicalTags.map((t: any, i: number) => (
                <span
                  key={i}
                  className="rounded-[20px] bg-white text-[11px] text-brand-teal border border-[rgba(71,112,108,0.2)] px-[10px] py-[3px] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <ul className="px-5 mb-4 space-y-2">
            {pricingFeatures.map((f: any, j: number) => (
              <li key={j} className="flex items-start gap-2.5 text-[13px] text-text-secondary leading-[1.55]">
                <span className="font-extrabold shrink-0 text-brand-teal" aria-hidden="true">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mx-5 mb-4 rounded-lg text-[12px] bg-[rgba(71,112,108,0.05)] border border-[rgba(71,112,108,0.12)] p-2 px-3 text-brand-teal font-medium">
            🛡️ ضمان استرداد كامل لو ملتزمت 90 يوم ومشفتش نتيجة
          </div>

          <div className="px-5 pb-5">
            <button className="block w-full max-w-[420px] mx-auto bg-brand-red text-white rounded-[10px] p-4 text-base font-extrabold text-center transition-colors hover:bg-brand-red-hover active:scale-[0.98] cursor-pointer border-none">{current.cta}</button>
            <p className="mt-2.5 text-center text-[12px] text-text-muted">
              الدفع بالفيزا — آمن ومضمون ✓
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
