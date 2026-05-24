import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaArrowLeft, FaCheck } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { pricingOptions as staticOptions, pricingFeatures as staticFeatures, medicalTags as staticTags } from "../data";
import { useLandingData } from "@/context/LandingDataContext";
import { siteBaseUrl } from "@/config/site";

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

function PlanCard({
  plan,
  features,
  medicalTags,
  selectedMembership,
  onSelect,
  onPay,
}: {
  plan: any;
  features: string[];
  medicalTags: any[];
  selectedMembership: any;
  onSelect: (id: string | number) => void;
  onPay: (plan: any) => void;
}) {
  const m = selectedMembership;
  const price = m?.price ?? m?.outside_price ?? 0;
  const before = m?.price_before ?? m?.outside_price_before ?? 0;
  const hasMembership = !!m;
  const description = m?.description || plan.description || "جه الوقت اللي تكتشف فيه أحسن نسخة من نفسك";

  return (
    <div className="relative rounded-3xl bg-white border border-[#E5E7EB] p-5 sm:p-7 md:p-8 text-right overflow-hidden shadow-card">
      {Number(m?.id) === Number(plan?.most_popular) && (
        <span className="absolute top-4 left-4 text-[11px] bold text-white bg-brand-red px-3 py-1 rounded-full">
          {plan.most_popular_title || "الأكثر شعبية"}
        </span>
      )}

      <div className="mb-5">
        <label className="block text-[15px] md:text-base text-text-secondary mb-2 font-medium">اختار المدة</label>
        <div className="relative">
          <select
            value={m?.id ?? ""}
            onChange={(e) => onSelect(Number(e.target.value))}
            className="w-full appearance-none bg-brand-offwhite border-0 rounded-xl py-4 px-4 pl-12 text-right font-medium text-text-primary text-base focus:outline-none focus:ring-2 focus:ring-brand-red/40 cursor-pointer"
          >
            {plan.memberships?.map((ms: any) => (
              <option key={ms.id} value={ms.id}>{ms.title || ""}</option>
            ))}
          </select>
          <FaChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red pointer-events-none" />
        </div>
      </div>

      <div className="border-b border-[#E5E7EB] pb-6 text-center">
        <h4 className="bold text-text-primary text-3xl md:text-4xl mb-3">
          {plan.title || "تحدي الـــ 90 يوم"}
        </h4>

        <div className="flex items-center justify-center gap-2 flex-wrap mb-3">
          <span className="bold text-brand-red text-4xl md:text-5xl leading-none">
            بـ {Number(price).toLocaleString()}
          </span>
          {Number(before) > 0 && (
            <span className="text-text-secondary bold text-sm md:text-[17px] pr-1">
              بدلاً من <span className="line-through">{Number(before).toLocaleString()}</span> جنيه
            </span>
          )}
        </div>

        <p className="text-text-secondary font-medium text-sm md:text-[17px] mb-4">
          {description}
        </p>

        <button
          type="button"
          disabled={!hasMembership}
          onClick={() => onPay(plan)}
          className="w-full inline-flex items-center justify-center gap-3 bg-brand-red text-white bold text-base md:text-lg py-4 rounded-full hover:bg-brand-red-hover transition group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>ادفع {hasMembership ? Number(price).toLocaleString() : "—"} جنيه</span>
          <FaArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition" />
        </button>
      </div>

      {medicalTags?.length > 0 && (
        <div className=" my-4 rounded-lg bg-[rgba(71,112,108,0.05)] border border-[rgba(71,112,108,0.12)] p-[10px_12px]">
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
      )}

      {features?.length > 0 && (
        <ul className="mt-5 space-y-1">
          {features.map((f: string, i: number) => (
            <li key={i} className="flex items-start gap-3 py-2">
              <span className="shrink-0 w-6 h-6 rounded-full bg-brand-teal grid place-items-center mt-0.5">
                <FaCheck className="w-3 h-3 text-white" />
              </span>
              <span className="text-text-secondary leading-[1.7] text-[15px] md:text-[16px] font-normal">
                {f}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function NewPricing() {
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

  const getFeatures = useCallback(
    (plan: any) => {
      const raw = plan?.features;
      if (!raw?.length) return staticFeatures;
      return raw.map((f: any) => f.ar || f.en || "");
    },
    []
  );

  const [selections, setSelections] = useState<Record<string, string | number | null>>({});

  useEffect(() => {
    const defaults: Record<string, string | number | null> = {};
    membershipPlans.forEach((plan: any) => {
      if (!plan.memberships?.length) return;
      const popular = plan.memberships.find((m: any) => Number(m.id) === Number(plan.most_popular));
      defaults[plan.id] = popular?.id ?? plan.memberships[0]?.id ?? null;
    });
    setSelections((prev) => ({ ...defaults, ...prev }));
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

  const handlePay = useCallback((plan: any) => {
    const membership = getSelectedMembership(plan);
    if (!membership) return;
    window.location.href = `${siteBaseUrl}/membership/membership/payment/plans/${plan.id}/${membership.id}`;
  }, [getSelectedMembership]);

  const validPlans = membershipPlans.filter(
    (p: any) => p.memberships && p.memberships.length > 0
  );
  const isGrid = validPlans.length > 1;

  return (
    <section id="pricing" className="py-16 md:py-24 bg-brand-offwhite">
      <div className={cn(
        "mx-auto w-full px-5",
        isGrid
          ? "max-w-4xl"
          : "max-w-2xl"
      )}>
        <div className="text-center pb-8 md:pb-10">
          <h2 className="bold text-brand-red text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            {apiData?.general_data?.[1]?.pricing_title || "تحدي الـــ 90 يوم"}
          </h2>
          <p className="mt-2 text-base md:text-xl medium text-text-secondary">
            {apiData?.general_data?.[1]?.pricing_subtitle || "اختار الباقة المناسبة ليك"}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={
            isGrid
              ? "grid grid-cols-1 md:grid-cols-2 gap-6"
              : ""
          }
        >
          <AnimatePresence mode="wait">
            {validPlans.map((plan: any) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                features={getFeatures(plan)}
                medicalTags={medicalTags}
                selectedMembership={getSelectedMembership(plan)}
                onSelect={(mId: string | number) => handleSelect(plan.id, mId)}
                onPay={handlePay}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
