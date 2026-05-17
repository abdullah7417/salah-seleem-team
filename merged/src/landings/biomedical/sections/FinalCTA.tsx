import { memo } from "react";

export const FinalCTA = memo(function FinalCTA() {
  return (
    <section className="bg-brand-dark px-5 py-10 text-center" aria-labelledby="finalcta-heading">
      <div className="mx-auto w-full max-w-[480px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
        <div className="mb-4 inline-block rounded-full px-3.5 py-1 text-[11px] bold text-white bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.2)]">
          العرض ده لفترة محدودة
        </div>
        <h2 className="text-[22px] font-black text-white leading-[1.35] mb-1" id="finalcta-heading">
          +25,000 شخص غيروا حياتهم.
        </h2>
        <h3 className="text-[22px] font-black leading-[1.35] mb-3 text-brand-red">
          إنت الجاي.
        </h3>
        <p className="text-[14px] mb-6 text-[rgba(255,255,255,0.65)]">
          SST موجود معاك من أول يوم — سواء إصابة، مرض، أو بس عايز تبدأ صح
        </p>
        <a href="#pricing" className="block w-full max-w-[420px] mx-auto bg-brand-red text-white rounded-[10px] p-4 text-base font-extrabold text-center transition-colors hover:bg-brand-red-hover active:scale-[0.98] cursor-pointer border-none">ابدأ تحدي الـ 90 يوم دلوقتي</a>
        <p className="mt-3 text-[12px] text-[rgba(255,255,255,0.55)]">
          ضمان استرداد كامل • دفع آمن بالفيزا • رد في 24 ساعة
        </p>
      </div>
    </section>
  );
});
