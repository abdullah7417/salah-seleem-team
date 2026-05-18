import { useMemo } from "react";
import Container from "@/components/common/Container";
import { partners as staticPartners } from "../data/features";
import { useLandingData } from "@/context/LandingDataContext";

export default function Partners() {
  const apiData = useLandingData();
  const partners = useMemo(() => {
    const apiPartners = apiData?.partners;
    if (!apiPartners?.length) return staticPartners;
    return apiPartners.map((p) => {
      const mediaImage = p.media?.[0]?.original_url || p.media?.[0]?.url || "";
      return mediaImage || "";
    }).filter(Boolean).length > 0
      ? apiPartners.map((p) => p.media?.[0]?.original_url || p.media?.[0]?.url || "").filter(Boolean)
      : staticPartners;
  }, [apiData]);

  return (
    <section id="partner" className="py-16 md:py-24 bg-background">
      <Container>
        <h3 className="text-center text-2xl md:text-4xl bold text-dark mb-10 md:mb-14">
          فخورون بكل شركائنا
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-10 items-center justify-items-center">
          {partners.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`شريك ${i + 1}`}
              loading="lazy"
              className="max-h-10 md:max-h-12 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition duration-300"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
