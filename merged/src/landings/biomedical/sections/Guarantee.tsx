import { memo } from "react";
import { useLandingData } from "@/context/LandingDataContext";


export const Guarantee = memo(function Guarantee() {
const apiData = useLandingData();
  return (
    <section className="bg-brand-offwhite px-5 py-12" aria-labelledby="guarantee-heading">
      <div className="mx-auto w-full max-w-[480px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
        <div
          className="rounded-[20px] p-8 text-center text-white overflow-hidden bg-[linear-gradient(160deg,#1a0a06_0%,#8B1A0A_50%,#E63312_100%)] shadow-[0_20px_60px_rgba(230,51,18,0.35)]"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center text-[60px]" aria-hidden="true">
            🛡️
          </div>
          <h2 className="text-[28px] bold mb-4" id="guarantee-heading">
            {apiData?.general_data[0]?.ensure_title || "ضمان الفورمة"}
          </h2>
          <p className="text-[16px] bold leading-[1.7] max-w-[400px] mx-auto mb-6">
            {apiData?.general_data[0]?.ensure_subtitle || "لو مالحظتش أي تطور في جسمك وصحتك بعد الالتزام الكامل بالبرامج لمدة 3 شهور، هنرجعلك كامل الاشتراك"}
          </p>
          <a
            href="#pricing"
            className="inline-block rounded-full bg-brand-dark px-10 py-4 text-[16px] font-extrabold text-white transition-colors hover:bg-black min-h-[44px]"
          >
            {apiData?.general_data[0]?.ensure_btn_txt || "شوف الخطط والأسعار"}
          </a>
        </div>
      </div>
    </section>
  );
});
