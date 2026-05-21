import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useMemo } from "react";
import "swiper/css";
import "swiper/css/pagination";
import Container from "@/components/common/Container";
import { transformations as staticTransformations } from "../data/transformations";
import { useLandingData } from "@/context/LandingDataContext";

const highlightSubtitle = (text) => {
  const parts = text.split(/(الدنيا إنك|الحقيقي إنك|وتعمل فورمة)/g);
  return parts.map((part, index) => {
    if (["الدنيا إنك", "الحقيقي إنك", "وتعمل فورمة"].includes(part)) {
      return <span key={index} className="text-primary">{part}</span>;
    }
    return part;
  });
};

function Card({ t }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-card border border-border/50 h-full flex flex-col"
    >
      <div className="grid grid-cols-2 relative">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={t.before}
            alt={`قبل ${t.name}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <span className="absolute top-3 right-3 bg-black/70 text-white text-xs bold px-3 py-1 rounded-full">
            قبل
          </span>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={t.after}
            alt={`بعد ${t.name}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 bg-primary text-white text-xs bold px-3 py-1 rounded-full">
            بعد
          </span>
        </div>
        {/* divider */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/70" />
      </div>
      <div className="p-5 text-right flex-1 flex flex-col">
        <h4 className="bold text-dark text-lg md:text-xl leading-tight mb-2">{t.result}</h4>
        <div className="mt-auto">
          <div className="text-primary bold">
            {t.name} 
          </div>
          <div className="text-muted-foreground text-sm mt-1">
            {t.description}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Transformations() {
  const apiData = useLandingData();
  const transformations = useMemo(() => {
    const ht = apiData?.transformationHeros;
    if (!ht?.length) return staticTransformations;
    return ht.map((t, i) => {
      const staticFallback = staticTransformations[i % staticTransformations.length];
      return {
        id: t.id || i + 1,
        name: t.user_name || "",
        age: "",
        result: t.target || t.final_result || "",
        before: t.image_before || staticFallback?.before || "",
        after: t.image_after || staticFallback?.after || "",
        description: t.description || "بعد التدريب واتباع نظام غذائي مع SST",
      };
    });
  }, [apiData]);

  return (
    <section className="py-16 md:py-24 bg-background">
      <Container>
        <div className="text-center pb-10 md:pb-14 max-w-4xl mx-auto">
          <h2 className="bold text-primary text-3xl sm:text-4xl md:text-5xl mb-4">
            {apiData?.general_data[1]?.transformation_title || "تحولات حقيقية لأشخاص حقيقيين"}
          </h2>
          <h3 className="bold text-dark text-lg sm:text-xl md:text-2xl leading-[1.8]">
            {highlightSubtitle(apiData?.general_data[1]?.transformation_subtitle || "أسهل حاجة في الدنيا إنك تخس بس التحدي الحقيقي إنك تعيش حياة صحية وتعمل فورمة قوية")}
          </h3>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {transformations.map((t) => (
            <Card key={t.id} t={t} />
          ))}
        </div>

        {/* Mobile slider */}
        <div className="md:hidden" dir="ltr">
          <Swiper
            modules={[Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop
            spaceBetween={16}
            slidesPerView={1.2}
            centeredSlides
            className="!pb-12"
          >
            {transformations.map((t) => (
              <SwiperSlide key={t.id}>
                <Card t={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-10 md:mt-14 flex justify-center">
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
