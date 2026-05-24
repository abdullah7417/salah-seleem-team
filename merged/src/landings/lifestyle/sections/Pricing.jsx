import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaArrowLeft, FaCheck } from "react-icons/fa";
import Container from "@/components/common/Container";
import { pricingFeatures as staticFeatures, pricingPlans as staticPlans } from "../data/features";
import { useLandingData } from "@/context/LandingDataContext";
import { siteBaseUrl } from "@/config/site";

const FALLBACK_PLANS = [
  {
    id: 0,
    title: "تحدي الــ 90 يوم",
    description: "",
    most_popular: 0,
    features: [],
    memberships: staticPlans.map((p) => ({
      id: p.id,
      title: p.label,
      months: p.duration,
      price: p.price,
      price_before: p.before,
    })),
  },
];

function PlanCard({ plan, features, selectedMembership, onSelect, onPay }) {
  const m = selectedMembership;
  const price = m?.price ?? m?.outside_price ?? 0;
  const before = m?.price_before ?? m?.outside_price_before ?? 0;
  const hasMembership = !!m;
  const description = m?.description || plan.description || "جه الوقت اللي تكتشف فيه أحسن نسخة من نفسك";

  return (
    <div className="relative rounded-3xl bg-[#f8a53d] p-5 sm:p-7 md:p-8 text-right overflow-hidden shadow-card">
      {Number(m?.id) === Number(plan?.most_popular) && (
        <span className="absolute top-4 left-4 text-[11px] bold text-black bg-white/80 px-3 py-1 rounded-full">
          الأكثر شعبية
        </span>
      )}

      <div className="mb-5">
        <label className="block text-[15px] md:text-base text-black mb-2 font-medium">اختار المدة</label>
        <div className="relative">
          <select
            value={m?.id ?? ""}
            onChange={(e) => onSelect(Number(e.target.value))}
            className="w-full appearance-none bg-[#fdf6ef] border-0 rounded-xl py-4 px-4 pl-12 text-right font-medium text-[#464D5D] text-base focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
          >
            {plan.memberships?.map((ms) => (
              <option key={ms.id} value={ms.id}>{ms.title || ""}</option>
            ))}
          </select>
          <FaChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
        </div>
      </div>

      <div className="border-b border-black/15 pb-6 text-center">
        <h4 className="bold text-black text-3xl md:text-4xl mb-3">
          {plan.title || "تحدي الــ 90 يوم"}
        </h4>

        <div className="flex items-center justify-center gap-2 flex-wrap mb-3">
          <span className="bold text-primary text-4xl md:text-5xl leading-none">
            بـ {price}
          </span>
          {before > 0 && (
            <span className="text-black bold text-sm md:text-[17px] pr-1">
              بدلاً من <span className="line-through">{before}</span> جنيه
            </span>
          )}
        </div>

        <p className="text-black font-medium text-sm md:text-[17px] mb-4">
          {description}
        </p>

        <button
          type="button"
          disabled={!hasMembership}
          onClick={() => onPay(plan)}
          className="w-full inline-flex items-center justify-center gap-3 bg-black text-white bold text-base md:text-lg py-4 rounded-full hover:bg-dark-soft transition group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>ادفع {hasMembership ? price : "—"} جنيه</span>
          <FaArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition" />
        </button>
      </div>

      {features?.length > 0 && (
        <ul className="mt-5 space-y-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 py-2">
              <span className="shrink-0 w-6 h-6 rounded-full bg-[#22c55e] grid place-items-center mt-0.5">
                <FaCheck className="w-3 h-3 text-white" />
              </span>
              <span className="text-black leading-[1.7] text-[15px] md:text-[16px] font-normal">
                {f}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Pricing() {
  const apiData = useLandingData();

  const membershipPlans = useMemo(() => {
    const plans = apiData?.membership_plans;
    if (!plans?.length) return FALLBACK_PLANS;
    return plans;
  }, [apiData]);

  const getFeatures = useCallback(
    (plan) => {
      const raw = plan?.features;
      if (!raw?.length) return staticFeatures;
      return raw.map((f) => f.ar || f.en || "");
    },
    []
  );

  const [selections, setSelections] = useState({});

  useEffect(() => {
    const defaults = {};
    membershipPlans.forEach((plan) => {
      if (!plan.memberships?.length) return;
      const popular = plan.memberships.find((m) => Number(m.id) === Number(plan.most_popular));
      defaults[plan.id] = popular?.id ?? plan.memberships[0]?.id ?? null;
    });
    setSelections((prev) => ({ ...defaults, ...prev }));
  }, [membershipPlans]);

  const getSelectedMembership = useCallback(
    (plan) => {
      const id = selections[plan?.id];
      if (id == null) return null;
      return plan?.memberships?.find((m) => m.id === id) ?? null;
    },
    [selections]
  );

  const handleSelect = useCallback((planId, membershipId) => {
    setSelections((prev) => ({ ...prev, [planId]: membershipId }));
  }, []);

  const handlePay = useCallback((plan) => {
    const membership = getSelectedMembership(plan);
    if (!membership) return;
    window.location.href = `${siteBaseUrl}/membership/membership/payment/plans/${plan.id}/${membership.id}`;
  }, [getSelectedMembership]);

  const validPlans = membershipPlans.filter(
    (p) => p.memberships && p.memberships.length > 0
  );
  const isGrid = validPlans.length > 1;

  return (
    <section id="join" className="py-16 md:py-24 bg-background">
      <Container>
        <div className="text-center pb-8 md:pb-10">
          <h2 className="bold text-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            تحدي الــ 90 يوم
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={
            isGrid
              ? "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
              : "max-w-2xl mx-auto"
          }
        >
          <AnimatePresence mode="wait">
            {validPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                features={getFeatures(plan)}
                selectedMembership={getSelectedMembership(plan)}
                onSelect={(mId) => handleSelect(plan.id, mId)}
                onPay={handlePay}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
