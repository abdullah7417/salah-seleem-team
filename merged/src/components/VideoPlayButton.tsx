import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VideoPlayButtonProps {
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  ariaLabel?: string;
}

const sizeMap = {
  sm: { outer: "w-10 h-10", triangle: 6, border: 2 },
  md: { outer: "w-[56px] h-[56px]", triangle: 10, border: 2.5 },
  lg: { outer: "w-[72px] h-[72px]", triangle: 12, border: 3 },
};

export function VideoPlayButton({
  onClick,
  size = "md",
  className,
  ariaLabel = "Play video",
}: VideoPlayButtonProps) {
  const s = sizeMap[size];

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center cursor-pointer border-white bg-[rgba(230,51,18,0.9)] backdrop-blur-[4px] relative focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        s.outer,
        className,
      )}
      style={{ borderWidth: s.border }}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      tabIndex={0}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-[rgba(230,51,18,0.4)]"
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span
        className="relative z-[1]"
        style={{
          width: 0,
          height: 0,
          borderTop: `${s.triangle}px solid transparent`,
          borderBottom: `${s.triangle}px solid transparent`,
          borderRight: `${s.triangle * 1.5}px solid #fff`,
          marginRight: `-${s.triangle * 0.25}px`,
        }}
      />
    </motion.button>
  );
}
