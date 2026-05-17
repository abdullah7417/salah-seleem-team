import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaPlay } from "react-icons/fa";
import { useMemo } from "react";
import "swiper/css";
import Container from "@/components/common/Container";
import { videoThumbs as staticThumbs } from "../data/transformations";
import { useLandingData } from "@/context/LandingDataContext";

export default function TransformationVideos() {
  const apiData = useLandingData();
  const videoThumbs = useMemo(() => {
    const ht = apiData?.highlighted_transformations;
    if (!ht?.length) return staticThumbs;
    return ht.map((t, i) => {
      const staticFallback = staticThumbs[i % staticThumbs.length];
      return {
        id: t.id || i + 1,
        image: t.image_after || t.image_before || staticFallback?.image || "",
      };
    });
  }, [apiData]);

  return (
    <section className="py-16 md:py-24 bg-background">
      <Container>
        <div className="text-center pb-10 md:pb-12">
          <h2 className="font-black text-dark text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.5]">
            أبطال زيك قدروا يعملوا فورمة من غير مكملات ولا 7 أيام تمرين متواصل
          </h2>
        </div>
      </Container>

      <div dir="ltr" className="px-4">
        <Swiper
          modules={[Autoplay]}
          grabCursor
          centeredSlides
          loop
          slidesPerView="auto"
          spaceBetween={15}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="!py-4"
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 12 },
            640: { slidesPerView: 2.2, spaceBetween: 14 },
            1024: { slidesPerView: 3.2, spaceBetween: 15 },
            1280: { slidesPerView: 4, spaceBetween: 15 },
          }}
        >
          {videoThumbs.map((v) => (
            <SwiperSlide key={v.id}>
              <button
                type="button"
                aria-label="شغّل الفيديو"
                className="relative block w-full aspect-[9/14] rounded-2xl overflow-hidden group shadow-card"
              >
                <img
                  src={v.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                <span className="absolute inset-0 m-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 grid place-items-center shadow-glow group-hover:scale-110 transition">
                  <FaPlay className="w-5 h-5 md:w-6 md:h-6 text-primary translate-x-0.5" />
                </span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Container className="mt-10 md:mt-12">
        <div className="flex justify-center">
          <a
            href="#join"
            className="inline-flex items-center justify-center bg-primary text-white bold text-lg md:text-xl px-10 py-4 rounded-full shadow-glow hover:bg-primary-deep transition"
          >
            يلا نعمل فورمة
          </a>
        </div>
      </Container>
    </section>
  );
}
