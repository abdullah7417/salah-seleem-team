import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaArrowLeft, FaCheck } from "react-icons/fa";
import Container from "@/components/common/Container";
import { pricingFeatures as staticFeatures, pricingPlans as staticPlans } from "../data/features";
import { useLandingData } from "@/context/LandingDataContext";

export default function Pricing() {
  const apiData = useLandingData();
  const pricingPlans = useMemo(() => {
    const memberships = apiData?.memberships;
    if (!memberships?.length) return staticPlans;
    return memberships.map((m) => ({
      id: m.id,
      label: m.title || "",
      price: m.outside_price || m.price || 0,
      before: m.outside_price_before || m.price_before || 0,
      duration: m.months || m.title || "",
    }));
  }, [apiData]);
  const pricingFeatures = useMemo(() => {
    const features = apiData?.membership_plans?.[0]?.features;
    if (!features?.length) return staticFeatures;
    return features.map((f) => f.ar || f.en || "");
  }, [apiData]);

  const [planIdx, setPlanIdx] = useState(0);
  const plan = pricingPlans[planIdx];

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
          className="max-w-2xl mx-auto"
        >
          {/* Orange/amber card */}
          <div className="relative rounded-3xl bg-[#f8a53d] p-5 sm:p-7 md:p-8 text-right overflow-hidden shadow-card">
            {/* Duration select */}
            <div className="mb-5">
              <label className="block text-[15px] md:text-base text-black mb-2 font-medium">اختار المدة</label>
              <div className="relative">
                <select
                  value={planIdx}
                  onChange={(e) => setPlanIdx(Number(e.target.value))}
                  className="w-full appearance-none bg-[#fdf6ef] border-0 rounded-xl py-4 px-4 pl-12 text-right font-medium text-[#464D5D] text-base focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                >
                  {pricingPlans.map((p, i) => (
                    <option key={p.id} value={i}>{p.label}</option>
                  ))}
                </select>
                <FaChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
              </div>
            </div>

            {/* Title + price + CTA */}
            <div className="border-b border-black/15 pb-6 text-center">
              <h4 className="bold text-black text-3xl md:text-4xl mb-3">تحدي الــ 90 يوم</h4>

              <div className="flex items-center justify-center gap-2 flex-wrap mb-3">
                <span className="bold text-primary text-4xl md:text-5xl leading-none">
                  بـ {plan.price}
                </span>
                <span className="text-black bold text-sm md:text-[17px] pr-1">
                  بدلاً من <span className="line-through">{plan.before}</span> دولار
                </span>
              </div>

              <p className="text-black font-medium text-sm md:text-[17px] mb-4">
                جه الوقت اللي تكتشف فيه أحسن نسخة من نفسك
              </p>

              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-3 bg-black text-white bold text-base md:text-lg py-4 rounded-full hover:bg-dark-soft transition group"
              >
                <span>ادفع {plan.price} دولار</span>
                <FaArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition" />
              </button>
            </div>

            {/* Features */}
            <ul className="mt-5 space-y-1">
              {pricingFeatures.map((f, i) => (
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
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
