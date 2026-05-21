import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useFancybox } from "@/hooks/useFancybox";
import coachHero from "@/assets/coach-hero.jpg";
import { useLandingData } from "@/context/LandingDataContext";


const YOUTUBE_VIDEO_ID = "5nz32pPBq8w";
const YOUTUBE_URL = `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`;
const YOUTUBE_THUMBNAIL = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;
const YOUTUBE_THUMBNAIL_SD = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`;

const FANCYBOX_SELECTOR = "[data-fancybox='hero-video-mobile']";

/**
 * Thumbnail fallback chain: maxresdefault → hqdefault → coachHero
 */
function handleThumbnailError(e) {
  const img = e.currentTarget;
  if (img.src.includes("maxresdefault")) {
    img.src = YOUTUBE_THUMBNAIL_SD;
  } else {
    img.src = coachHero;
  }
}

/* ------------------------------------------------------------------ */
/*  SST Logo SVG (shared by mobile & desktop to keep markup DRY)      */
/* ------------------------------------------------------------------ */
function SstLogo() {
  return (
   <svg width="207" height="53" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M46.4787 15.3185L45.7655 16.1176L41.189 21.2451L36.9096 26.0397H30.1637L38.9898 16.1176H36.1964L22.556 31.4004H13.9378L13.4624 30.8343L10.1043 27.0719L11.0255 26.0397L15.2751 21.2451H15.3049L19.8814 16.1176L24.4579 10.99L28.7075 6.22871H25.8843L21.6347 10.99L17.0582 16.1176L12.452 21.2451H3.86354L3.32862 20.6791L0.000244141 16.95L0.713469 16.1176L5.31971 10.99L9.56934 6.19542H16.3153L12.0656 10.99L7.4891 16.1176H10.3123L14.8888 10.99L19.1384 6.19542L23.923 0.868088H32.5114L33.0166 1.40081L36.345 5.16326L36.3747 5.19655L31.2038 10.99L26.6273 16.1176L17.7714 26.0397H20.5946L24.8739 21.2451L29.4505 16.1176L34.027 10.99H42.6154L43.0612 11.4895L46.4787 15.3185Z" fill="#fff"></path>
                                <path d="M87.3107 13.787C82.8531 13.5539 81.9913 13.4208 81.9913 12.2554C81.9913 12.2554 81.9913 12.2221 81.9913 12.1888C81.9913 12.1555 81.9913 12.1555 81.9913 12.1222C81.9913 12.0889 81.9913 12.0889 81.9913 12.0889C81.9913 11.9557 82.0507 11.8225 82.1102 11.7227C82.1696 11.6228 82.2587 11.5229 82.3479 11.423C82.3776 11.3897 82.4073 11.3897 82.437 11.3564C82.4668 11.3231 82.5262 11.2898 82.5856 11.2898C82.6154 11.2565 82.6451 11.2565 82.7045 11.2565C82.7342 11.2565 82.7639 11.2232 82.7937 11.2232C82.8234 11.2232 82.8828 11.1899 82.9423 11.1899C83.2691 11.09 83.7149 11.0235 84.3093 10.9569C84.339 10.9569 84.5173 10.9569 84.5767 10.9569C84.6064 10.9569 84.6064 10.9569 84.6362 10.9569C85.1711 10.9236 85.8249 10.9236 86.5975 10.9236C88.5292 10.9236 89.9259 11.0235 90.8769 11.2898C90.9363 11.2898 90.9957 11.3231 91.0255 11.3564C91.0849 11.3564 91.1146 11.3897 91.174 11.423C91.2335 11.423 91.2632 11.4563 91.3226 11.4896C91.3226 11.4896 91.3523 11.4896 91.3523 11.5229C91.6198 11.6561 91.8873 11.8226 92.125 12.0223C92.3033 12.1888 92.4222 12.322 92.5113 12.4219L96.9393 9.52515C95.4237 7.09455 92.0061 6.12897 87.1027 6.12897C80.3271 6.12897 76.4341 7.72717 76.4341 12.0889C76.4341 16.6505 79.495 18.0489 87.3107 18.3818C92.2439 18.6149 93.0463 18.7814 93.0463 20.0466C93.0463 21.1787 92.0359 21.6115 87.7268 21.6115C87.5782 21.6115 87.4296 21.6115 87.3107 21.6115C87.0433 21.6115 86.7758 21.6115 86.5084 21.5782C86.3895 21.5782 86.3003 21.5782 86.1815 21.5782C86.122 21.5782 86.0626 21.5782 86.0032 21.5782C85.914 21.5782 85.8249 21.5782 85.706 21.5782C85.498 21.5782 85.2899 21.5449 85.1116 21.5449C84.9928 21.5449 84.9036 21.5116 84.7847 21.5116C84.6064 21.4783 84.4281 21.4783 84.2498 21.445C84.1607 21.445 84.0715 21.4118 83.9824 21.4118C83.8635 21.3785 83.7743 21.3785 83.6852 21.3452C83.596 21.3119 83.5366 21.3119 83.4474 21.2786C83.0611 21.1787 82.7342 21.0455 82.4668 20.9123C82.437 20.879 82.3776 20.8457 82.3479 20.8457C82.3182 20.8124 82.2885 20.8124 82.2587 20.7791C82.2587 20.7791 81.6347 20.3463 81.3969 20.0466C81.3375 19.98 81.2781 19.8802 81.2186 19.8136L76.7015 22.7436C78.1874 25.6736 81.9021 26.4727 87.3999 26.4727C94.2944 26.4727 98.5143 25.2408 98.5143 19.8801C98.5737 14.6194 94.2647 14.1533 87.3107 13.787Z" fill="white"></path>
                                <path d="M64.5173 13.787C60.0596 13.5539 59.1978 13.4208 59.1978 12.2554C59.1978 12.2554 59.1978 12.2221 59.1978 12.1888C59.1978 12.1555 59.1978 12.1555 59.1978 12.1222C59.1978 12.0889 59.1978 12.0889 59.1978 12.0889C59.1978 11.9557 59.2573 11.8225 59.3167 11.7227C59.3761 11.6228 59.4653 11.5229 59.5544 11.423C59.5842 11.3897 59.6139 11.3897 59.6436 11.3564C59.6733 11.3231 59.7327 11.2898 59.7922 11.2898C59.8219 11.2565 59.8516 11.2565 59.9111 11.2565C59.9408 11.2565 59.9705 11.2232 60.0002 11.2232C60.0299 11.2232 60.0894 11.1899 60.1488 11.1899C60.4757 11.09 60.9215 11.0235 61.5158 10.9569C61.5455 10.9569 61.5455 10.9569 61.5752 10.9569C61.6347 10.9569 61.7238 10.9569 61.7833 10.9569C61.813 10.9569 61.813 10.9569 61.8427 10.9569C62.3776 10.9236 63.0314 10.9236 63.8041 10.9236C65.7357 10.9236 67.1324 11.0235 68.0834 11.2898C68.1428 11.2898 68.2023 11.3231 68.232 11.3564C68.2914 11.3564 68.3212 11.3897 68.3806 11.423C68.44 11.423 68.4697 11.4563 68.5292 11.4896C68.5292 11.4896 68.5589 11.4896 68.5589 11.5229C68.8264 11.6561 69.0938 11.8226 69.3316 12.0223C69.5099 12.1888 69.6287 12.322 69.7179 12.4219L74.1458 9.52515C72.6302 7.09455 69.2127 6.12897 64.3093 6.12897C57.5336 6.12897 53.6406 7.72717 53.6406 12.0889C53.6406 16.6505 56.7015 18.0489 64.5173 18.3818C69.4504 18.6149 70.2528 18.7814 70.2528 20.0466C70.2528 21.1787 69.2424 21.6115 64.9333 21.6115C64.7848 21.6115 64.6362 21.6115 64.5173 21.6115C64.2498 21.6115 63.9824 21.6115 63.7149 21.5782C63.596 21.5782 63.5069 21.5782 63.388 21.5782C63.3286 21.5782 63.2691 21.5782 63.2097 21.5782C63.1206 21.5782 63.0314 21.5782 62.9125 21.5782C62.7045 21.5782 62.4965 21.5449 62.3182 21.5449C62.1993 21.5449 62.1102 21.5116 61.9913 21.5116C61.813 21.4783 61.6347 21.4783 61.4564 21.445C61.3672 21.445 61.2781 21.4118 61.1889 21.4118C61.07 21.3785 60.9809 21.3785 60.8917 21.3452C60.8026 21.3119 60.7431 21.3119 60.654 21.2786C60.2677 21.1787 59.9408 21.0455 59.6733 20.9123C59.6436 20.879 59.5842 20.8457 59.5544 20.8457C59.5247 20.8124 59.495 20.8124 59.4653 20.7791C59.4653 20.7791 58.8412 20.3463 58.6035 20.0466C58.544 19.98 58.4846 19.8802 58.4252 19.8136L53.9081 22.7436C55.394 25.6736 59.1087 26.4727 64.6064 26.4727C71.5009 26.4727 75.7209 25.2408 75.7209 19.8801C75.7803 14.6194 71.4712 14.1533 64.5173 13.787Z" fill="white"></path>
                                <path d="M101.724 6.26219L98.2766 8.5263V11.5229H106.36V26.0399H111.917V11.5229H116.553L120 9.25882V6.26219H101.724Z" fill="white"></path>
                            </svg>
  );
}

/**
 * Lifestyle Hero section with advanced responsive video behavior.
 *
 * Desktop (lg+):
 *  - YouTube thumbnail poster with animated play button.
 *  - Click → inline YouTube playback via IFrame API (no modal).
 *  - Click again → pause; click again → resume.
 *  - YouTube IFrame API loaded on-demand only on first play.
 *
 * Mobile/Tablet (<lg):
 *  - YouTube thumbnail as full-screen background.
 *  - White pill CTA opens Fancybox modal with YouTube video.
 *  - Additional CTA button scrolls to #join.
 *  - Fancybox lazy-loaded via IntersectionObserver.
 */
export default function Hero() {
  /* ---- Desktop video state: 'idle' | 'playing' | 'paused' ---- */
  const [desktopVideoState, setDesktopVideoState] = useState("idle");
  const desktopPlayerContainerRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const ytApiLoadingRef = useRef(null);

  /* ---- Mobile Fancybox (lazy-loaded via IntersectionObserver) ---- */
  const { ref: fancyboxRef } = useFancybox(FANCYBOX_SELECTOR, {
    Toolbar: false,
    animated: true,
    dragToClose: true,
    closeButton: true,
    Youtube: { autoplay: 1 },
  });
  const fancyboxAnchorRef = useRef(null);

  /* ---- Load YouTube IFrame API (idempotent, returns cached promise) ---- */
  const loadYtApi = useCallback(() => {
    if (ytApiLoadingRef.current) return ytApiLoadingRef.current;
    if (window.YT?.Player) return Promise.resolve();

    const promise = new Promise((resolve) => {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        resolve();
      };
      document.head.appendChild(tag);
    });

    ytApiLoadingRef.current = promise;
    return promise;
  }, []);

  /* ---- Create / toggle YT Player when desktopVideoState changes ---- */
  useEffect(() => {
    if (desktopVideoState === "idle") {
      if (ytPlayerRef.current) {
        ytPlayerRef.current.destroy();
        ytPlayerRef.current = null;
      }
      if (desktopPlayerContainerRef.current) {
        desktopPlayerContainerRef.current.innerHTML = "";
      }
      return;
    }

    if (ytPlayerRef.current) {
      if (desktopVideoState === "playing") {
        ytPlayerRef.current.playVideo();
      } else {
        ytPlayerRef.current.pauseVideo();
      }
      return;
    }

    loadYtApi().then(() => {
      const container = desktopPlayerContainerRef.current;
      if (!container) return;

      const playerDiv = document.createElement("div");
      playerDiv.id = "yt-hero-desktop";
      container.innerHTML = "";
      container.appendChild(playerDiv);

      ytPlayerRef.current = new window.YT.Player("yt-hero-desktop", {
        videoId: YOUTUBE_VIDEO_ID,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              setDesktopVideoState("idle");
            }
          },
        },
      });
    });

    const timer = setTimeout(() => {
      isTransitioningRef.current = false;
    }, 300);
    return () => clearTimeout(timer);
  }, [desktopVideoState, loadYtApi]);

  /* ---- Desktop click handler ---- */
  const handleDesktopClick = useCallback(() => {
    if (isTransitioningRef.current) return;

    if (desktopVideoState === "idle") {
      isTransitioningRef.current = true;
      setDesktopVideoState("playing");
    } else if (desktopVideoState === "playing") {
      setDesktopVideoState("paused");
    } else {
      setDesktopVideoState("playing");
    }
  }, [desktopVideoState]);

  const handleDesktopKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleDesktopClick();
      }
    },
    [handleDesktopClick],
  );

  /* ---- Mobile Fancybox trigger ---- */
  const handleMobilePlay = useCallback(() => {
    fancyboxAnchorRef.current?.click();
  }, []);

  /* ---- Cleanup on unmount ---- */
  useEffect(() => {
    return () => {
      ytPlayerRef.current?.destroy?.();
      ytPlayerRef.current = null;
    };
  }, []);
  const apiData = useLandingData();

  return (
    <section id="top" ref={fancyboxRef} className="relative bg-dark">
      {/* Hidden anchor for Fancybox (mobile/tablet only) */}
      <a
        ref={fancyboxAnchorRef}
        href={YOUTUBE_URL}
        data-fancybox="hero-video-mobile"
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      >
        &nbsp;
      </a>

      {/* ========== MOBILE / TABLET LAYOUT (<lg) ==========
           - Muted autoplay YouTube video as full-screen background
           - YouTube thumbnail as poster fallback while video loads
           - Dark overlay for text readability
           - White pill CTA triggers Fancybox modal (with sound)
           - Additional CTA scrolls to #join
      */}
      <div className="lg:hidden relative min-h-screen w-full overflow-hidden">
        {/* Background video — muted autoplay, no controls, loops */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&controls=0&rel=0&playlist=${YOUTUBE_VIDEO_ID}&playsinline=1`}
            title="فيديو الخلفية"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 border-none opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-14 min-h-screen">
          {/* SST logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-8"
          >
            <SstLogo />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bold text-white leading-[1.25] text-[2.6rem] sm:text-5xl max-w-[20ch]"
          >
            {apiData?.general_data[0]?.title || "هتوصل للفورمة في <span className=\"text-primary\">90 يوم</span> بس من غير مكملات وبأكل عادي من البيت"}
            عادي من البيت
          </motion.h1>

          {/* White pill CTA → opens Fancybox modal */}
          <motion.button
            type="button"
            onClick={handleMobilePlay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 inline-flex items-center gap-3 bg-white rounded-full px-5 py-2 shadow-card hover:scale-[1.03] active:scale-[0.98] transition cursor-pointer"
          >
            <span className="w-12 h-12 rounded-full border-2 border-primary grid place-items-center bg-white">
              <FaPlay className="w-4 h-4 text-primary translate-x-0.5" />
            </span>
            <span className="text-primary font-extrabold text-[15px] leading-tight text-right">
              اعرف ازاي هتوصل
              <br />
              للفورمة في 90 يوم
            </span>
          </motion.button>

        

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 text-white/85 text-[15px] leading-[1.9] max-w-md"
          >
{apiData?.general_data[0]?.hero_description_trans || "مع متابعة يومية من فريق طبي ورياضي متكامل غيّر حياة الآلاف للأحسن في أكثر من"}            
            <span className="bold"> 77 </span>
            {apiData?.general_data[0]?.hero_title_trans || " دولة ببرامج مُصممة بالمتاح ليك من وقت وامكانيات"}
          </motion.p>

            {/* CTA → scrolls to #join */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6"
          >
           <a href="#join" className="inline-flex items-center justify-center bg-primary text-white bold text-lg md:text-xl px-10 py-4 rounded-full shadow-glow hover:bg-primary-deep transition">
             {apiData?.general_data[0]?.hero_btn_txt || "يلا نعمل فورمة"}
           </a>
          </motion.div>
        </div>
      </div>

      {/* ========== DESKTOP LAYOUT (lg+) ==========
           - Two-column: orange content panel (left) + video column (right)
           - Video: poster thumbnail → inline play via YouTube IFrame API
           - Click to play, click again to pause, click to resume
           - No modal / Fancybox on desktop
      */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:min-h-[760px]">
        {/* Video column */}
        <div className="relative order-2 bg-dark overflow-hidden">
          {/* Poster thumbnail (fades out when video plays) */}
          <img
            src={YOUTUBE_THUMBNAIL}
            alt="كوتش تحدي الـ 90 يوم"
            onError={handleThumbnailError}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
              desktopVideoState !== "idle" && "opacity-0",
            )}
          />
          <div
            className={cn(
              "absolute inset-0 bg-black/20 transition-opacity duration-700",
              desktopVideoState !== "idle" && "opacity-0",
            )}
          />

          {/* YT Player container — iframe injected by YouTube IFrame API */}
          <div
            ref={desktopPlayerContainerRef}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-none",
              desktopVideoState === "idle" && "opacity-0 pointer-events-none",
            )}
          />

          {/* Play button overlay (visible in idle / paused) */}
          {desktopVideoState !== "playing" && (
            <motion.button
              key="play-btn"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: desktopVideoState === "idle" ? 0.4 : 0,
                type: "spring",
              }}
              aria-label="شغّل الفيديو"
              type="button"
              onClick={handleDesktopClick}
              onKeyDown={handleDesktopKeyDown}
              className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-white grid place-items-center shadow-glow animate-pulse-ring hover:scale-110 transition z-10 cursor-pointer"
            >
              <FaPlay className="w-8 h-8 text-primary translate-x-0.5" />
            </motion.button>
          )}

          {/* Pause overlay when playing — semi-transparent, visible on hover */}
          {desktopVideoState === "playing" && (
            <div
              className="absolute inset-0 z-10 cursor-pointer group"
              onClick={handleDesktopClick}
              role="button"
              tabIndex={0}
              onKeyDown={handleDesktopKeyDown}
              aria-label="إيقاف الفيديو مؤقتاً"
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white/0 group-hover:bg-white/90 grid place-items-center transition-all duration-300 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100">
                <FaPause className="w-7 h-7 text-primary" />
              </div>
            </div>
          )}
        </div>

        {/* Orange content column */}
        <div className="relative order-1 bg-primary text-white flex items-center overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-primary-deep/60 blur-3xl pointer-events-none" />

          <div className="relative w-full px-10 xl:px-20 py-16 text-start">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 justify-start mb-10"
            >
              <SstLogo />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bold text-white leading-[1.3] text-5xl xl:text-6xl"
            >
              هتوصل للفورمة في 90 يوم بس من غير مكملات وبأكل عادي من البيت
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg xl:text-xl text-white/95 leading-[1.9]"
            >
              مع متابعة يومية من فريق طبي ورياضي متكامل غيّر حياة الآلاف للأحسن في أكثر من
              <span className="bold"> 77 دولة </span>
              ببرامج مُصممة بالمتاح ليك من وقت وإمكانيات
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8"
            >
              <a
                href="#join"
                className="inline-flex items-center justify-center bg-white text-dark bold text-xl px-10 py-4 rounded-full shadow-card hover:scale-[1.03] active:scale-[0.98] transition"
              >
                يلا نعمل فورمة
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
