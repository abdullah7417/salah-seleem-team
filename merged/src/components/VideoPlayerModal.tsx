import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { parseVideoUrl, getEmbedUrl, type VideoInfo } from "@/lib/videoUtils";

interface VideoPlayerModalProps {
  url: string | undefined | null;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function VideoPlayerModal({
  url,
  isOpen,
  onClose,
  title = "Video player",
}: VideoPlayerModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const info: VideoInfo | null = parseVideoUrl(url);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const renderPlayer = () => {
    if (!info) return null;

    if (info.platform === "youtube") {
      return (
        <iframe
          src={getEmbedUrl("youtube", info.id, "modal")}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-none"
        />
      );
    }

    if (info.platform === "vimeo") {
      return (
        <iframe
          src={getEmbedUrl("vimeo", info.id, "modal")}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-none"
        />
      );
    }

    if (info.platform === "mp4") {
      return (
        <video
          ref={videoRef}
          src={info.id}
          controls
          autoPlay
          className="absolute inset-0 w-full h-full object-contain bg-black"
          aria-label={title}
        >
          <track kind="captions" />
        </video>
      );
    }

    return null;
  };

  return (
    <AnimatePresence>
      {isOpen && info && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            className="relative w-full max-w-[960px] mx-4 aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPlayer()}

            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors cursor-pointer border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close video"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
