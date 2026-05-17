import { motion } from "framer-motion";
import { useMemo } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import CTAButton from "@/components/common/CTAButton";
import { problems as staticProblems, benefits as staticBenefits } from "../data/features";
import { useLandingData } from "@/context/LandingDataContext";

function Column({ items, type }) {
  const isGood = type === "good";
  const Icon = isGood ? FaCheck : FaTimes;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`rounded-3xl p-7 md:p-9 shadow-card ${isGood ? "bg-dark text-white" : "bg-white border border-border"}`}
    >
      <div className={`inline-block text-sm bold px-4 py-1.5 rounded-full mb-5 ${isGood ? "bg-primary text-white" : "bg-destructive/10 text-destructive"}`}>
        {isGood ? "✓ معانا" : "✗ لوحدك"}
      </div>
      <h3 className={`text-2xl md:text-3xl font-black mb-6 ${isGood ? "text-white" : "text-dark"}`}>
        {isGood ? "مع تحدي الـ 90 يوم" : "من غير البرنامج"}
      </h3>
      <ul className="space-y-4">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-3 text-right">
            <span className={`shrink-0 w-7 h-7 rounded-full grid place-items-center mt-0.5 ${isGood ? "bg-success/20 text-success" : "bg-destructive/10 text-destructive"}`}>
              <Icon className="w-3.5 h-3.5" />
            </span>
            <span className={`leading-relaxed ${isGood ? "text-white/90" : "text-muted-foreground"}`}>{it}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function WhyJoin() {
  const apiData = useLandingData();
  const problems = useMemo(() => {
    const asks = apiData?.asks;
    if (!asks?.length) return staticProblems;
    return asks.map((a) => a.title + (a.description ? ` — ${a.description}` : ""));
  }, [apiData]);
  const benefits = useMemo(() => {
    const comps = apiData?.comparisons;
    if (!comps?.length) return staticBenefits;
    return comps.map((c) => c.title + (c.description ? ` — ${c.description}` : ""));
  }, [apiData]);

  return (
    <section id="why" className="py-20 md:py-28 bg-background">
      <Container>
        <SectionTitle
          eyebrow="قارن بنفسك"
          title="ليه تشترك في تحدي الـ 90 يوم؟"
          subtitle="الفرق بين إنك تحاول لوحدك وبين إنك تبقى في نظام مدروس وجنبك كوتش."
        />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <Column items={problems} type="bad" />
          <Column items={benefits} type="good" />
        </div>
        <div className="mt-12 flex justify-center">
          <CTAButton size="lg" href="#pricing">ابدأ رحلتك</CTAButton>
        </div>
      </Container>
    </section>
  );
}
