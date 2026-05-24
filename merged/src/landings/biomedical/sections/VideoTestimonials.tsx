import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useRef, useState, useMemo, memo } from "react";
import { videoTestimonials as staticTestimonials } from "../data";
import { useLandingData } from "@/context/LandingDataContext";

import "swiper/css";
import "swiper/css/pagination";

export const VideoTestimonials = memo(function VideoTestimonials() {
  const apiData = useLandingData();
  const videoTestimonials = useMemo(() => {
    const videos = apiData?.videos?.[0]?.length
      ? apiData.videos[0]
      : apiData?.videosWithoutChunk?.length
      ? apiData.videosWithoutChunk
      : null;

    if (!videos?.length) {
      return staticTestimonials.map((v: any) => ({
        name: v.name || "",
        condition: v.condition || "",
        caption: v.caption || "",
        duration: v.duration || "",
        url: v.videoId ? `https://www.youtube.com/watch?v=${v.videoId}` : "",
        imageUrl: v.imageUrl || "",
        thumbnail: v.videoId ? `https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg` : "",
        hasUrl: !!v.videoId,
      }));
    }

    return videos.map((v: any) => {
      const url = v.url || v.video_url || v.videoUrl || "";
      return {
        name: v.title || "",
        condition: v.type?.[0] || "",
        caption: v.description || "",
        duration: v.duration || "",
        url,
        imageUrl: v.image_url || v.imageUrl || "",
        thumbnail: v.thumbnail || v.image_url || v.imageUrl || "",
        hasUrl: !!url,
      };
    });
  }, [apiData]);

  const sectionRef = useRef<HTMLElement>(null);
  const [fancyboxReady, setFancyboxReady] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fancyboxReady) {
          import("@fancyapps/ui").then(({ Fancybox }) => {
            Fancybox.bind("[data-fancybox='videos']", {
              Toolbar: false,
              animated: true,
              dragToClose: true,
              closeButton: true,
              Youtube: { autoplay: 1 },
            } as any);
          });
          import("@fancyapps/ui/dist/fancybox/fancybox.css");
          setFancyboxReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [fancyboxReady]);

  return (
    <section className="bg-white px-5 py-8" ref={sectionRef} aria-labelledby="testimonials-heading">
      <div className="mx-auto w-full max-w-[480px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
        <p className="text-center text-[34px] md:text-[46px] bold text-text-primary leading-[1.25] tracking-tight mb-2" id="testimonials-heading">شوف بنفسك</p>
        <h2 className="text-center text-base md:text-xl medium leading-[1.5] text-text-secondary mb-6 tracking-normal">
          ناس حقيقية زيك وصلوا للفورمة وحياتهم اتغيرت
        </h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={12}
          loop={true}
          centeredSlides={true}
          autoplay={{ delay: 2500, disableOnInteraction: true }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1.4 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5, centeredSlides: false },
          }}
        >
          {videoTestimonials.map((r: any, i: number) => (
            <SwiperSlide key={i}>
              {r.hasUrl ? (
                <a
                  href={r.url}
                  data-fancybox="videos"
                  className="block overflow-hidden rounded-[10px] bg-white border-[0.5px] border-[#E5E7EB]"
                  aria-label={`فيديو شهادة: ${r.caption}`}
                >
                  <div
                    className="relative flex items-center justify-center bg-cover bg-center aspect-[9/16]"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.6) 100%), url('${r.thumbnail || r.imageUrl}')`,
                    }}
                  >
                    <span className="absolute top-1.5 left-1.5 rounded-[3px] flex items-center bg-[#FF0000] px-1 py-[2px]" aria-hidden="true">
                      <svg width="14" height="10" viewBox="0 0 24 17" fill="white">
                        <path d="M23.5 2.6a3 3 0 0 0-2.1-2.1C19.6 0 12 0 12 0S4.4 0 2.6.5A3 3 0 0 0 .5 2.6C0 4.4 0 8.5 0 8.5s0 4.1.5 5.9a3 3 0 0 0 2.1 2.1C4.4 17 12 17 12 17s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.8.5-5.9.5-5.9s0-4.1-.5-5.9zM9.6 12V5l6.3 3.5L9.6 12z" />
                      </svg>
                    </span>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(230,51,18,0.9)]" aria-hidden="true">
                      <span
                        style={{
                          width: 0,
                          height: 0,
                          borderTop: "5px solid transparent",
                          borderBottom: "5px solid transparent",
                          borderRight: "7px solid white",
                          marginLeft: "-1px",
                        }}
                      />
                    </div>

                    <span className="absolute bottom-1.5 right-1.5 rounded-[3px] text-[9px] text-white bg-[rgba(0,0,0,0.5)] py-[1px] px-1">
                      {r.duration}
                    </span>
                  </div>

                  <div className="py-[7px] px-[9px]">
                    <div className="text-[11px] bold text-text-primary">{r.name}</div>
                    <div className="text-[9px] medium mt-0.5 text-brand-teal">{r.condition}</div>
                    <p className="text-[10px] italic mt-1 leading-[1.4] text-text-secondary">{r.caption}</p>
                  </div>
                </a>
              ) : (
                <div className="block overflow-hidden rounded-[10px] bg-white border-[0.5px] border-[#E5E7EB]">
                  <div
                    className="relative flex items-center justify-center bg-cover bg-center aspect-[9/16]"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.6) 100%), url('${r.imageUrl}')`,
                    }}
                  >
                    <div className="absolute inset-0 bg-black/10" />
                  </div>

                  <div className="py-[7px] px-[9px]">
                    <div className="text-[11px] bold text-text-primary">{r.name}</div>
                    <div className="text-[9px] medium mt-0.5 text-brand-teal">{r.condition}</div>
                    <p className="text-[10px] italic mt-1 leading-[1.4] text-text-secondary">{r.caption}</p>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
});
