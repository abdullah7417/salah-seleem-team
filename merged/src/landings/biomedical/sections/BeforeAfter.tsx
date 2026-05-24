import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { memo, useMemo } from "react";
import { cn } from "@/lib/utils";
import { beforeAfterCards as staticCards } from "../data";
import { useLandingData } from "@/context/LandingDataContext";

import "swiper/css";
import "swiper/css/navigation";

const DESKTOP_SLIDES = 4;
const DESKTOP_BREAKPOINT = 1024;

type Card = {
  result: string;
  name: string;
  age: string;
  duration: string;
  condition: string;
  imageBefore?: string;
  imageAfter?: string;
  target?: string;
};

const ImagePlaceholder = memo(function ImagePlaceholder({
  label,
}: {
  label: string;
}) {
  return (
    <div
      className="relative aspect-[3/4] bg-[#F0F0EE]"
      role="img"
      aria-label={`صورة ${label}`}
    >
      <div
        className="absolute inset-0 flex items-center justify-center text-2xl text-text-muted"
        aria-hidden="true"
      >
        👤
      </div>
      <span className="absolute top-1.5 left-1.5 rounded px-1.5 py-0.5 text-[9px] bold bg-[rgba(255,255,255,0.9)] text-text-muted">
        {label}
      </span>
    </div>
  );
});

const CardSlide = memo(function CardSlide({ c }: { c: Card }) {
  return (
    <article className="w-full overflow-hidden rounded-xl bg-white border-[0.5px] border-[#E5E7EB]">
      <div className="grid grid-cols-2 gap-px bg-gray-200 relative">
        {c.imageBefore ? (
          <div className="relative aspect-[3/4] overflow-hidden bg-[#F0F0EE]">
            <img src={c.imageBefore} alt={`قبل ${c.name}`} className="w-full h-full object-cover" loading="lazy" />
            <span className="absolute top-1.5 right-1.5 rounded px-2 py-1 text-xs bold bg-black/70 text-white">قبل</span>
          </div>
        ) : (
          <ImagePlaceholder label="قبل" />
        )}
        {c.imageAfter ? (
          <div className="relative aspect-[3/4] overflow-hidden bg-[#F0F0EE]">
            <img src={c.imageAfter} alt={`بعد ${c.name}`} className="w-full h-full object-cover" loading="lazy" />
            <span className="absolute top-1.5 left-1.5 rounded px-2 py-1 text-xs bold bg-[#47706C] text-white">بعد</span>
          </div>
        ) : (
          <ImagePlaceholder label="بعد" />
        )}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/70 z-10" />
      </div>
      <div className="p-4">
        <div className="text-base font-extrabold text-[#E63312]">
          {c.result}
        </div>
        <div className="text-sm mt-1 text-gray-400">
          {c.name} 
        </div>
        <span className="inline-block mt-1.5 rounded-lg px-1.5 py-0.5 text-[9px] font-semibold bg-[#47706C1A] text-[#47706C]">
          {c.target}
        </span>
      </div>
    </article>
  );
});

const DesktopSwiper = memo(function DesktopSwiper({
  items,
}: {
  items: Card[];
}) {
  const needsSlider = items.length >= DESKTOP_SLIDES;

  const modules = useMemo(() => {
    if (!needsSlider) return [];
    return [Autoplay, Navigation];
  }, [needsSlider]);

  return (
    <Swiper
      modules={modules}
      spaceBetween={16}
      loop={needsSlider}
      centeredSlides={true}
      autoplay={
        needsSlider ? { delay: 2500, disableOnInteraction: true } : false
      }
      breakpoints={{
        0: { slidesPerView: 1.15 },
        480: { slidesPerView: 1.5 },
        640: { slidesPerView: 2 },
        768: { slidesPerView: 2.3 },
        [DESKTOP_BREAKPOINT]: {
          slidesPerView: DESKTOP_SLIDES,
          centeredSlides: !needsSlider,
        },
      }}
    >
      {items.map((c, i) => (
        <SwiperSlide key={i}>
          <CardSlide c={c} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
});

export const BeforeAfter = memo(function BeforeAfter() {
  const apiData = useLandingData();
  const beforeAfterCards = useMemo(() => {
    const transformations = apiData?.transformationHeros;
    if (!transformations?.length) return staticCards;
    return transformations.map((t: any) => ({
      result: t.target || t.final_result || "",
      name: t.user_name || "",
      age: "",
      duration: t.duration || "",
      condition: t.type?.[0] || "",
      imageBefore: t.image_before || "",
      imageAfter: t.image_after || "",
      target: t.target || "",
    }));
  }, [apiData]);

  return (
    <section
      className="bg-white px-5 py-8"
      aria-labelledby="beforeafter-heading"
    >
        <div className="mx-auto w-full max-w-[580px] md:max-w-[820px] lg:max-w-[1060px] xl:max-w-[1280px]">
        <p className="text-center text-[34px] md:text-[46px] bold text-text-primary leading-[1.25] tracking-tight mb-2" id="beforeafter-heading">
         {apiData?.general_data[1]?.transformation_title || "تحولات عملائنا"}
        </p>
        <h2 className="text-center text-base md:text-xl medium leading-[1.5] text-text-secondary mb-6 tracking-normal">{apiData?.general_data[1]?.transformation_subtitle || "أرقام — مش وعود"}</h2>
        <p className="text-[14px] mb-4 text-center text-gray-500">
          {apiData?.general_data[1]?.transformation_subtitle_2  || ""}
        </p>

        <DesktopSwiper items={beforeAfterCards} />

        <a href="#pricing" className="block w-full max-w-[420px] mx-auto bg-brand-red text-white rounded-[10px] p-4 text-base font-extrabold text-center transition-colors hover:bg-brand-red-hover active:scale-[0.98] cursor-pointer border-none mt-5">
          ابدأ تحولك دلوقتي
        </a>
      </div>
    </section>
  );
});
