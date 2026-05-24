import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { heroReviews as staticHeroReviews } from "../data";
import { useLandingData } from "@/context/LandingDataContext";
import {
  parseVideoUrl,
  useVideoThumbnail,
  getEmbedUrl,
} from "@/lib/videoUtils";
import { VideoPlayButton } from "@/components/VideoPlayButton";
import { VideoPlayerModal } from "@/components/VideoPlayerModal";

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
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [desktopVideoPlaying, setDesktopVideoPlaying] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);

  const videoUrl = apiData?.general_data?.[0]?.hero_video || null;
  const videoInfo = useMemo(() => parseVideoUrl(videoUrl), [videoUrl]);
  const { src: thumbnailSrc } = useVideoThumbnail(videoUrl);

  useEffect(() => {
    let rafId: number;
    let ticking = false;
    const check = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          const mobile = window.innerWidth < 1024;
          setIsMobile(mobile);
          if (!mobile) setDesktopVideoPlaying(false);
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
  }, [heroReviews.length]);

  const goTo = useCallback((i: number) => {
    setVisible(false);
    setTimeout(() => {
      setIdx(i);
      setVisible(true);
    }, 280);
  }, []);

  useEffect(() => {
    if (videoUrl) return;
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [videoUrl]);

  const handleOpenModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleDesktopPlay = useCallback(() => {
    setDesktopVideoPlaying(true);
  }, []);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (videoInfo?.platform === "youtube") {
      target.src = `https://img.youtube.com/vi/${videoInfo.id}/hqdefault.jpg`;
    }
  }, [videoInfo]);

  const hero = apiData?.general_data?.[0];
  const badge = hero?.hero_badge || "أول فريق طبي رياضي في مصر هيساعدك تعمل فورمة بسهولة";
  const title = hero?.title || "لسه شايف إن الإصابة أو المرض سبب علشان توقف حياتك ومتوصلش للفورمة؟";
  const description = hero?.description || "في SST فريقنا الطبي والرياضي من دكاترة علاج طبيعي وأخصائيين تغذية علاجية ومدربين Fitness هيصمموا كل البرامج على حسب إصابتك أو مرضك علشان توصل لنسخة من نفسك مكنتش تعرف إن هي موجودة";
  const ctaText = hero?.hero_btn_txt || "يلا نعمل فورمة";
  const videoBtnText = hero?.hero_video_btn || "شوف ازاي هتتحول في 90 يوم";
  const ensureText = hero?.ensure_subtitle || "لو التزمت بكل البرامج لمدة 90 يوم متواصلين وملاحظتش نتيجة واضحة هتسترد فلوسك كاملة";

  const hasVideo = !!videoUrl && !!videoInfo;

  const renderMobileBackground = () => {
    if (!hasVideo) return null;

    if (videoInfo!.platform === "youtube" || videoInfo!.platform === "vimeo") {
      const embedSrc = getEmbedUrl(videoInfo!.platform, videoInfo!.id, "background");
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <iframe
            src={embedSrc}
            title="فيديو التحولات"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 border-none opacity-25"
          />
        </div>
      );
    }

    if (videoInfo!.platform === "mp4") {
      return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            src={videoInfo!.id}
            className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-25"
          />
        </div>
      );
    }

    return null;
  };

  const renderDesktopInlinePlayer = () => {
    if (!hasVideo) return null;

    if (videoInfo!.platform === "youtube" || videoInfo!.platform === "vimeo") {
      const embedSrc = getEmbedUrl(videoInfo!.platform, videoInfo!.id, "desktop");
      return (
        <iframe
          src={embedSrc}
          title="فيديو تحولات SST"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-none block"
        />
      );
    }

    if (videoInfo!.platform === "mp4") {
      return (
        <video
          ref={desktopVideoRef}
          src={videoInfo!.id}
          controls
          autoPlay
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="فيديو تحولات SST"
        >
          <track kind="captions" />
        </video>
      );
    }

    return null;
  };

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-[#172120] flex flex-col"
      aria-label="القسم الرئيسي"
    >
      {isMobile && renderMobileBackground()}

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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block rounded-[20px] py-1 px-3.5 text-white bold bg-[rgba(255,255,255,0.12)] border-[1px solid rgba(255,255,255,0.2)] mb-4"
          >
            {badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white text-[34px] bold leading-12 mb-5"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[14px] leading-6 text-[rgba(255,255,255,0.7)] mb-6"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a href="#pricing" className="block w-full max-w-[420px] mx-auto bg-brand-red text-white rounded-[10px] p-4 text-base font-extrabold text-center transition-colors hover:bg-brand-red-hover active:scale-[0.98] cursor-pointer border-none">
              {ctaText}
            </a>

            {hasVideo ? (
              <button
                onClick={handleOpenModal}
                className="bold block w-full max-w-[420px] mx-auto mt-2 bg-white text-brand-red rounded-[10px] py-4 text-sm text-center cursor-pointer border-none"
                aria-label={videoBtnText}
              >
                {videoBtnText}
              </button>
            ) : (
              <a
                href="https://www.youtube.com/watch?v=j2ZwS94lAhg"
                data-fancybox="hero-video"
                className="bold block w-full max-w-[420px] mx-auto mt-2 bg-white text-brand-red rounded-[10px] py-4 text-sm text-center cursor-pointer border-none no-underline"
              >
                {videoBtnText}
              </a>
            )}

            <p className="mb-2 text-[12px] text-[rgba(255,255,255,0.55)]">
              {ensureText}
            </p>
          </motion.div>
        </div>
      )}

      {!isMobile && (
        <>
          <div className="relative z-[2] grid grid-cols-12 gap-10 py-12 px-16 pb-8 max-w-[1200px] my-0 mx-auto w-full items-stretch">
            <div className="flex flex-col gap-4 text-right col-span-7">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block py-[0.35rem] px-4 rounded-[20px] text-[12px] bold text-white bg-[rgba(255,255,255,0.1)] border-[1px solid rgba(255,255,255,0.2)] w-fit"
              >
                {badge}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white text-[36px] md:text-[42px] xl:text-[52px] bold leading-[60px]"
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-[14px] md:text-[18px] text-[rgba(255,255,255,0.7)] leading-6 flex-1 regular"
              >
                {description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <a href="#pricing" className="block w-full max-w-[420px] bg-brand-red text-white rounded-[10px] p-4 text-base font-extrabold text-center transition-colors hover:bg-brand-red-hover active:scale-[0.98] cursor-pointer border-none lg:mx-0 self-start">
                  {ctaText}
                </a>

                <p className="text-[rgba(255,255,255,0.5)] text-[12px] md:text-[14px] regular mt-2">
                  {ensureText}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[16px] overflow-hidden min-h-[280px] bg-[#0e1a19] shadow-[0_20px_60px_rgba(0,0,0,0.5)] col-span-5 group"
            >
              {hasVideo && desktopVideoPlaying ? (
                renderDesktopInlinePlayer()
              ) : hasVideo ? (
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={handleDesktopPlay}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleDesktopPlay(); }}
                  role="button"
                  tabIndex={0}
                  aria-label={videoBtnText}
                >
                  {thumbnailSrc ? (
                    <img
                      src={thumbnailSrc}
                      alt={videoBtnText}
                      width={640}
                      height={360}
                      onError={handleImageError}
                      onLoad={() => setImgLoaded(true)}
                      className={cn(
                        "w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.04]",
                        !imgLoaded && "opacity-0",
                      )}
                    />
                  ) : videoInfo?.platform === "mp4" ? (
                    <video
                      src={videoInfo.id}
                      preload="metadata"
                      muted
                      className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : null}

                  {!imgLoaded && !thumbnailSrc && videoInfo?.platform !== "mp4" && (
                    <div className="absolute inset-0 bg-[#0e1a19] animate-pulse" />
                  )}

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,33,32,0.1)_0%,rgba(23,33,32,0.5)_100%)]" />

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <VideoPlayButton size="lg" onClick={handleDesktopPlay} ariaLabel={videoBtnText} />
                  </div>

                  <div className="absolute bottom-[14px] right-[14px] bg-[rgba(0,0,0,0.6)] backdrop-blur-[6px] py-[0.3rem] px-[0.8rem] rounded-[20px] text-xs bold text-brand-red border border-[rgba(230,51,18,0.4)]">
                    {videoBtnText}
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.05)] animate-pulse" />
                </div>
              )}
            </motion.div>
          </div>

          <div className="relative z-[2] px-16 pb-10 max-w-[1200px] mx-auto w-full" />
        </>
      )}

      <VideoPlayerModal
        url={videoUrl}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={videoBtnText}
      />
    </section>
  );
}
