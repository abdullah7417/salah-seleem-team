import { memo, useMemo } from "react";
import { cn } from "@/lib/utils";
import { howItWorksSteps as staticSteps, teamMembers as staticTeam } from "../data";
import { useLandingData } from "@/context/LandingDataContext";

export const HowItWorks = memo(function HowItWorks() {
  const apiData = useLandingData();
  const howItWorksSteps = useMemo(() => {
    const steps = apiData?.steps;
    if (!steps?.length) return staticSteps;
    return steps.map((s: any) => ({ title: s.title, body: s.description }));
  }, [apiData]);
  const teamMembers = useMemo(() => {
    const programs = apiData?.programs;
    if (!programs?.length) return staticTeam;
    return programs.map((p: any, i: number) => ({
      icon: ["🧑", "🥗", "💪", "🎯"][i % 4],
      title: p.title,
      body: p.description,
    }));
  }, [apiData]);
  return (
    <section className="bg-brand-dark px-5 py-10" aria-labelledby="howitworks-heading">
      <div className="mx-auto w-full max-w-[480px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
        <p className="text-center text-[34px] md:text-[46px] bold text-[rgba(255,255,255,0.5)] leading-[1.25] tracking-tight mb-2" id="howitworks-heading">
          {apiData?.general_data[1]?.journey_title || "ايه اللي بيحصل بعد الاشتراك بالخطوات؟"}
        </p>
        <h2 className="text-center text-base md:text-xl medium leading-[1.5] text-white tracking-normal">{apiData?.general_data[1]?.journey_subtitle || "من أول يوم لحد ما تعمل فورمة"}</h2>

        <ol className="mt-2">
          {howItWorksSteps.map((s: any, i: number) => (
            <li
              key={i}
              className={cn(
                "flex items-start gap-3.5 py-4",
                i < howItWorksSteps.length - 1 && "border-b border-[rgba(255,255,255,0.08)]"
              )}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] bold bg-[rgba(230,51,18,0.12)] border-2 border-brand-red text-brand-red"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-[15px] bold text-white mb-1">{s.title}</h3>
                <p className="text-[13px] leading-[1.65] text-[rgba(255,255,255,0.65)]">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="text-center text-base md:text-xl font-semibold leading-[1.5] text-white tracking-normal mt-8">{apiData?.general_data[1]?.programs_title || "مين اللي بيتابع معاك على الواتس-آب كل يوم؟"}</h2>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {teamMembers.map((t: any, i: number) => (
            <div
              key={i}
              className="rounded-xl p-3.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]"
            >
              <div className="text-[22px] mb-2" aria-hidden="true">{t.icon}</div>
              <h3 className="text-[13px] bold text-white mb-1">{t.title}</h3>
              <p className="text-[12px] leading-[1.5] text-[rgba(255,255,255,0.65)]">
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
