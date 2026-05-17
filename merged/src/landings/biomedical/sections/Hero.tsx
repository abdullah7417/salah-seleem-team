import { useEffect, useRef, useState, useCallback, useMemo, memo } from "react";
import { cn } from "@/lib/utils";
import { heroReviews as staticHeroReviews } from "../data";
import { useLandingData } from "@/context/LandingDataContext";

const ReviewCard = memo(function ReviewCard({
  r,
  visible,
  idx,
  goTo,
}: {
  r: { init: string; name: string; tag: string; quote: string };
  visible: boolean;
  idx: number;
  goTo: (i: number) => void;
}) {
  return (
    <>
      <div className="mt-6 rounded-xl p-[0.875rem_1rem] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)]">
        <div className="flex items-center gap-3 text-right">
          <div
            className={cn(
              "w-12 h-12 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center text-white bold shrink-0 transition-opacity duration-300",
              visible ? "opacity-100" : "opacity-0",
            )}
          >
            {r.init}
          </div>

          <div
            className={cn(
              "flex-1 transition-opacity duration-300",
              visible ? "opacity-100" : "opacity-0",
            )}
          >
            <div
              className="text-[11px] text-[#FBB043]"
              aria-label="5 من 5 نجوم"
            >
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </div>
            <p className="italic text-[13px] text-white leading-[1.6] mt-1">
              {r.quote}
            </p>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <span className="text-xs bold text-white">{r.name}</span>
              <span className="rounded-md py-[0.2rem] px-[0.5rem] text-[10px] font-semibold bg-[rgba(71,112,108,0.3)] text-[#66C1BF]">
                {r.tag}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-3 flex justify-center gap-1.5"
        role="tablist"
        aria-label="التقييمات"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`تقييم ${i + 1}`}
            aria-selected={i === idx}
            role="tab"
            className={cn(
              "w-6 h-6 rounded-full border-none cursor-pointer p-0 transition-all duration-200 flex items-center justify-center",
              i === idx ? "bg-brand-red" : "bg-[rgba(255,255,255,0.2)]",
            )}
          >
            <span
              className={cn(
                "block rounded-full transition-transform duration-200",
                i === idx
                  ? "w-[7px] h-[7px] scale-[1.4] bg-white"
                  : "w-[7px] h-[7px] bg-white/50",
              )}
            />
          </button>
        ))}
      </div>
    </>
  );
});

export function Hero() {
  const apiData = useLandingData();
  const heroReviews = useMemo(() => {
    const transformations = apiData?.highlighted_transformations;
    if (!transformations?.length) return staticHeroReviews;
    return transformations.map((t: any) => ({
      init: t.user_name?.[0] ?? "",
      name: t.user_name ?? "",
      tag: t.subtitle ?? "",
      quote: t.final_result ?? "",
    }));
  }, [apiData]);

  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [desktopVideoPlaying, setDesktopVideoPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [fancyboxBound, setFancyboxBound] = useState(false);

  useEffect(() => {
    let rafId: number;
    let ticking = false;
    const check = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          setIsMobile(window.innerWidth < 1024);
          ticking = false;
        });
      }
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("resize", check);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % heroReviews.length);
        setVisible(true);
      }, 280);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const goTo = useCallback((i: number) => {
    setVisible(false);
    setTimeout(() => {
      setIdx(i);
      setVisible(true);
    }, 280);
  }, []);

  useEffect(() => {
    if (!heroRef.current || fancyboxBound) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fancyboxBound) {
          import("@fancyapps/ui").then(({ Fancybox }) => {
            Fancybox.bind("[data-fancybox='hero-video']", {
              Toolbar: false,
              animated: true,
              dragToClose: true,
              closeButton: true,
              Youtube: { autoplay: 1 },
            } as any);
          });
          import("@fancyapps/ui/dist/fancybox/fancybox.css");
          setFancyboxBound(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [fancyboxBound]);

  const r = heroReviews[idx];

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-[#172120] flex flex-col"
      aria-label="القسم الرئيسي"
    >
      {isMobile && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/j2ZwS94lAhg?autoplay=1&mute=1&loop=1&controls=0&rel=0&playlist=j2ZwS94lAhg&playsinline=1"
            title="فيديو التحولات"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 border-none opacity-25"
          />
        </div>
      )}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none z-[1]",
          isMobile
            ? "bg-[linear-gradient(180deg,rgba(23,33,32,0.6)_0%,rgba(23,33,32,0.92)_60%)]"
            : "bg-[linear-gradient(180deg,rgba(23,33,32,0.55)_0%,rgba(23,33,32,0.9)_70%),radial-gradient(circle_at_50%_20%,#2a3a38_0%,#172120_70%)]",
        )}
      />

      {isMobile && (
        <div className="relative text-center pt-10 pb-8 px-5 z-[2]">
          <div className="inline-block rounded-[20px] py-1 px-3.5 text-white bold bg-[rgba(255,255,255,0.12)] border-[1px solid rgba(255,255,255,0.2)] mb-4">
            أول فريق طبي رياضي في مصر هيساعدك تعمل فورمة بسهولة
          </div>

          <h1 className="text-white text-[34px] bold leading-12 mb-5">
            لسه شايف إن الإصابة أو المرض سبب علشان توقف حياتك ومتوصلش للفورمة؟
          </h1>

          <p className="text-[14px] leading-12 text-[rgba(255,255,255,0.7)] mb-6">
            في SST فريقنا الطبي والرياضي من دكاترة علاج طبيعي وأخصائيين تغذية
            علاجية ومدربين Fitness هيصمموا كل البرامج على حسب إصابتك أو مرضك
            علشان توصل لنسخة من نفسك مكنتش تعرف إن هي موجودة
          </p>

          <a href="#pricing" className="block w-full max-w-[420px] mx-auto bg-brand-red text-white rounded-[10px] p-4 text-base font-extrabold text-center transition-colors hover:bg-brand-red-hover active:scale-[0.98] cursor-pointer border-none">
            يلا نعمل فورمة
          </a>

          <a
            href="https://www.youtube.com/watch?v=j2ZwS94lAhg"
            data-fancybox="hero-video"
            className="bold block w-full max-w-[420px] mx-auto mt-2 bg-white text-brand-red rounded-[10px] py-4 text-sm text-center cursor-pointer border-none no-underline"
          >
            تشغيل الفيديو
          </a>

          <p className="mb-2 text-[12px] text-[rgba(255,255,255,0.55)]">
            لو التزمت بكل البرامج لمدة 90 يوم متواصلين وملاحظتش نتيجة واضحة
            هتسترد فلوسك كاملة
          </p>

          <ReviewCard r={r} visible={visible} idx={idx} goTo={goTo} />
        </div>
      )}

      {!isMobile && (
        <>
          <div className="relative z-[2] grid grid-cols-2 gap-10 py-12 px-16 pb-8 max-w-[1200px] my-0 mx-auto w-full items-stretch">
            <div className="flex flex-col gap-4 text-right">
              <span className="inline-block py-[0.35rem] px-4 rounded-[20px] text-[12px] bold text-white bg-[rgba(255,255,255,0.1)] border-[1px solid rgba(255,255,255,0.2)] w-fit">
                أول فريق طبي رياضي في مصر هيساعدك تعمل فورمة بسهولة
              </span>

              <h1 className="text-white text-[38px] md:text-[48px] xl:text-[60px] bold leading-[60px]">
                لسه شايف إن الإصابة أو المرض سبب علشان توقف حياتك ومتوصلش
                للفورمة؟
              </h1>

              <p className="text-[14px] md:text-[18px] text-[rgba(255,255,255,0.7)] leading-6 flex-1 regular">
                في SST فريقنا الطبي والرياضي من دكاترة علاج طبيعي وأخصائيين
                تغذية علاجية ومدربين Fitness هيصمموا كل البرامج على حسب إصابتك
                أو مرضك علشان توصل لنسخة من نفسك مكنتش تعرف إن هي موجودة
              </p>

              <a href="#pricing" className="block w-full max-w-[420px] bg-brand-red text-white rounded-[10px] p-4 text-base font-extrabold text-center transition-colors hover:bg-brand-red-hover active:scale-[0.98] cursor-pointer border-none lg:mx-0 self-start">
                يلا نعمل فورمة
              </a>

              <p className="text-[rgba(255,255,255,0.5)] text-[12px] md:text-[14px] regular">
                لو التزمت بكل البرامج لمدة 90 يوم متواصلين وملاحظتش نتيجة واضحة
                هتسترد فلوسك كاملة
              </p>
            </div>

            <div className="relative rounded-[16px] overflow-hidden min-h-[280px] bg-[#0e1a19] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              {desktopVideoPlaying ? (
                <iframe
                  src="https://www.youtube.com/embed/j2ZwS94lAhg?autoplay=1&rel=0"
                  title="فيديو تحولات SST"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-none block"
                />
              ) : (
                <div
                  onClick={() => setDesktopVideoPlaying(true)}
                  className="absolute inset-0 cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      setDesktopVideoPlaying(true);
                  }}
                  aria-label="شغل فيديو تحولات SST"
                >
                  <img
                    src="https://img.youtube.com/vi/j2ZwS94lAhg/maxresdefault.jpg"
                    alt="فيديو تحولات SST"
                    width={640}
                    height={360}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://img.youtube.com/vi/j2ZwS94lAhg/hqdefault.jpg";
                    }}
                    className="w-full h-full object-cover block transition-transform duration-500 hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,33,32,0.1)_0%,rgba(23,33,32,0.5)_100%)]" />

                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-[72px] rounded-full bg-[rgba(230,51,18,0.9)] border-[3px] border-white flex items-center justify-center backdrop-blur-[4px] pointer-events-none"
                    aria-hidden="true"
                  >
                    <span
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: "12px solid transparent",
                        borderBottom: "12px solid transparent",
                        borderRight: "18px solid #fff",
                        marginRight: "-3px",
                      }}
                    />
                  </div>

                  <div className="absolute bottom-[14px] right-[14px] bg-[rgba(0,0,0,0.6)] backdrop-blur-[6px] py-[0.3rem] px-[0.8rem] rounded-[20px] text-xs bold text-brand-red border border-[rgba(230,51,18,0.4)]">
                    شوف ازاي هتتحول في 90 يوم
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative z-[2] px-16 pb-10 max-w-[1200px] mx-auto w-full">
            <div className="w-full h-px bg-[rgba(255,255,255,0.1)] mb-8" />
            <ReviewCard r={r} visible={visible} idx={idx} goTo={goTo} />
          </div>
        </>
      )}
    </section>
  );
}
