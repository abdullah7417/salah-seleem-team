import { useState, useCallback, useMemo, useEffect, memo } from "react";
import { cn } from "@/lib/utils";
import { pricingOptions as staticOptions, pricingFeatures as staticFeatures, medicalTags as staticTags } from "../data";
import { useLandingData } from "@/context/LandingDataContext";

const FALLBACK_PLANS = [
  {
    id: 0,
    title: "تحدي الـــ 90 يوم",
    description: "",
    most_popular: staticOptions.find((o) => o.badge)?.id ?? 0,
    features: [],
    memberships: staticOptions.map((o) => ({
      id: o.id,
      title: o.name,
      months: o.name,
      price: o.totalNum?.replace(/[^0-9]/g, "") || "0",
      price_before: o.oldPrice?.replace(/[^0-9]/g, "") || "0",
      outside_price: o.perMonth?.match(/\d+/)?.[0] || "",
      details: "",
      description: "",
    })),
  },
];

export const Pricing = memo(function Pricing() {
  const apiData = useLandingData();

  const membershipPlans = useMemo(() => {
    const plans = apiData?.membership_plans;
    if (!plans?.length) return FALLBACK_PLANS;
    return plans;
  }, [apiData]);

  const medicalTags = useMemo(() => {
    const tags = apiData?.general_data?.[0];
    if (!tags) return staticTags;
    return staticTags;
  }, [apiData]);

  const [selections, setSelections] = useState<Record<string, string | number | null>>({});

  useEffect(() => {
    const defaults: Record<string, string | number | null> = {};
    membershipPlans.forEach((plan: any) => {
      if (!plan.memberships?.length) return;
      const popular = plan.memberships.find((m: any) => Number(m.id) === Number(plan.most_popular));
      defaults[plan.id] = popular?.id ?? plan.memberships[0]?.id ?? null;
    });
    setSelections(defaults);
  }, [membershipPlans]);

  const getSelectedMembership = useCallback(
    (plan: any) => {
      const id = selections[plan?.id];
      if (id == null) return null;
      return plan?.memberships?.find((m: any) => m.id === id) ?? null;
    },
    [selections]
  );

  const handleSelect = useCallback((planId: string | number, membershipId: string | number) => {
    setSelections((prev) => ({ ...prev, [planId]: membershipId }));
  }, []);

  const handlePay = useCallback(
    (plan: any) => {
      const membership = getSelectedMembership(plan);
      if (!membership) return;
      window.location.href = `https://salahseleemteam.com/membership/membership/payment/plans/${plan.id}/${membership.id}`;
    },
    [getSelectedMembership]
  );

  const getFeatures = useCallback(
    (plan: any) => {
      const raw = plan?.features;
      if (!raw?.length) return staticFeatures;
      return raw.map((f: any) => f.ar || f.en || "");
    },
    []
  );

  const validPlans = membershipPlans.filter(
    (p: any) => p.memberships && p.memberships.length > 0
  );
  const isGrid = validPlans.length > 1;

  return (
    <section id="pricing" className="px-5 py-8 scroll-mt-16 bg-brand-offwhite" aria-labelledby="pricing-heading">
      <div className={cn(
        "mx-auto w-full",
        isGrid
          ? "max-w-[720px] lg:max-w-[1140px]"
          : "max-w-[480px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]"
      )}>
        <p className="text-center text-[34px] md:text-[46px] bold text-text-primary leading-[1.25] tracking-tight mb-2" id="pricing-heading">{apiData?.general_data?.[1]?.pricing_title || "تحدي الـــ 90 يوم"}</p>
        <h2 className="text-center text-base md:text-xl medium leading-[1.5] text-text-secondary tracking-normal mb-4">{apiData?.general_data?.[1]?.pricing_subtitle || "اختار الباقة المناسبة ليك"}</h2>

        <div className={cn(isGrid && "grid grid-cols-1 md:grid-cols-2 gap-6")}>
          {validPlans.map((plan: any) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              features={getFeatures(plan)}
              selectedMembership={getSelectedMembership(plan)}
              medicalTags={medicalTags}
              onSelect={(mId: number) => handleSelect(plan.id, mId)}
              onPay={() => handlePay(plan)}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

function PlanCard({
  plan,
  features,
  selectedMembership,
  medicalTags,
  onSelect,
  onPay,
}: {
  plan: any;
  features: string[];
  selectedMembership: any;
  medicalTags: any[];
  onSelect: (id: string | number) => void;
  onPay: () => void;
}) {
  const m = selectedMembership;
  const hasMembership = !!m;
  const price = m?.price ?? m?.outside_price ?? 0;
  const priceBefore = m?.price_before ?? m?.outside_price_before ?? 0;
  const description = m?.description || plan.description || "جه الوقت اللي تكتشف فيه أحسن نسخة من نفسك";

  const priceFmt = Number(price).toLocaleString();
  const beforeFmt = Number(priceBefore).toLocaleString();
  const savings = priceBefore > 0 ? Number(priceBefore) - Number(price) : 0;
  const perMonth = m?.outside_price ? `${m.outside_price} ج / شهر` : "";
  const pkgLabel = m?.title || plan.title || "";
  const isMostPopular = Number(m?.id) === Number(plan.most_popular);

  return (
    <>
      <div className="flex flex-col gap-2 mb-4" role="radiogroup" aria-label="اختر الباقة">
        {plan.memberships?.map((ms: any) => {
          const selected = m?.id === ms.id;
          const msSavings = Number(ms.price_before || ms.outside_price_before || 0) - Number(ms.price || ms.outside_price || 0);
          return (
            <button
              key={ms.id}
              onClick={() => onSelect(ms.id)}
              role="radio"
              aria-checked={selected}
              className={cn(
                "relative w-full text-right rounded-xl bg-white transition-all min-h-[44px]",
                selected ? "border-2 border-brand-red" : "border-[1.5px] border-[#E5E7EB]",
                "p-[14px_14px_12px]"
              )}
            >
              {Number(ms.id) === Number(plan.most_popular) && (
                <span className="absolute top-0 left-4 text-[10px] bold text-white bg-brand-red px-2 py-[2px] rounded-b-md">
                  {plan.most_popular_title || "الأكثر شعبية"}
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
                    <span className="text-[14px] font-semibold text-text-primary">{ms.title || ""}</span>
                    {msSavings > 0 && (
                      <span className="rounded-md text-[11px] bold px-1.5 py-0.5 bg-[rgba(230,51,18,0.1)] text-brand-red">
                        وفر {msSavings.toLocaleString()} ج
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                    <span className="text-[15px] font-semibold text-text-primary">
                      {ms.outside_price ? `${ms.outside_price} ج / شهر` : ""}
                    </span>
                    <span className="text-[11px] text-text-muted">
                      {ms.price ? `${Number(ms.price).toLocaleString()} ج إجمالي` : ""}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className={cn(
        "relative bg-white overflow-hidden border-t-[3px] border-t-brand-red rounded-b-[14px]",
        isMostPopular ? "border-2 border-brand-red" : "border-[0.5px] border-[#E5E7EB]"
      )}>
        {isMostPopular && (
          <span className="absolute top-3 left-4 text-[11px] bold text-white bg-brand-red px-3 py-1 rounded-full z-10">
            {plan.most_popular_title || "الأكثر شعبية"}
          </span>
        )}
        <div className="px-5 pt-5">
          <div className="text-[12px] font-semibold uppercase tracking-wider mb-2 text-brand-teal">
            {pkgLabel}
          </div>
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <span className="text-[34px] bold leading-none text-text-primary">
              {priceFmt} ج
            </span>
            {Number(priceBefore) > 0 && (
              <span className="text-[15px] line-through text-text-muted">
                {beforeFmt} ج
              </span>
            )}
            {savings > 0 && (
              <span className="rounded-lg px-2 py-0.5 text-[11px] bold bg-[rgba(230,51,18,0.08)] text-brand-red">
                وفرت {savings.toLocaleString()} ج
              </span>
            )}
          </div>
          {perMonth && (
            <div className="text-[13px] font-semibold mt-1.5 text-brand-teal">
              = {perMonth} فقط
            </div>
          )}
          <p className="text-[13px] italic mt-2 text-text-secondary">
            {description}
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
          {features.map((f: string, j: number) => (
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
          <button
            disabled={!hasMembership}
            onClick={onPay}
            className="block w-full max-w-[420px] mx-auto bg-brand-red text-white rounded-[10px] p-4 text-base font-extrabold text-center transition-colors hover:bg-brand-red-hover active:scale-[0.98] cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {hasMembership ? `ادفع ${priceFmt} جنيه ←` : "ادفع — جنيه ←"}
          </button>
          <p className="mt-2.5 text-center text-[12px] text-text-muted">
            الدفع بالفيزا — آمن ومضمون ✓
          </p>
        </div>
      </div>
    </>
  );
}
