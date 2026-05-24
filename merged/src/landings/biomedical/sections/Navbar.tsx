import logoDarkWebP from "@/assets/sst-logo-dark.webp";
import logoDarkPng from "@/assets/sst-logo-dark.png";
import { memo } from "react";
import { useLandingData } from "@/context/LandingDataContext";


export const Navbar = memo(function Navbar() {
    const apiData = useLandingData();
  return (
    <nav className="sticky top-0 z-50 bg-brand-dark" role="navigation" aria-label="القائمة الرئيسية">
      <div className="mx-auto w-full max-w-[480px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] flex items-center justify-between px-5 py-3.5">
        <a href="#" className="flex items-center gap-2 min-h-[44px] min-w-[44px]" aria-label="الصفحة الرئيسية - SST">
          <picture>
            <source srcSet={logoDarkWebP} type="image/webp" />
            <img
              src={logoDarkPng}
              alt="شعار SST"
              width={56}
              height={56}
              className="size-14"
              fetchPriority="high"
            />
          </picture>
        </a>
        <a
          href="#pricing"
          className="rounded-lg bg-brand-red px-5 py-2.5 text-[13px] bold text-white transition-colors hover:bg-brand-red-hover min-h-[44px] flex items-center"
        >
         {apiData?.general_data[0]?.hero_btn_txt || "اشترك الآن"}
        </a>
      </div>
    </nav>
  );
});
