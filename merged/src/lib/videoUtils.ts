import { useEffect, useState } from "react";

export type VideoPlatform = "youtube" | "vimeo" | "mp4";

export interface VideoInfo {
  platform: VideoPlatform;
  id: string;
}

const vimeoThumbnailCache = new Map<string, string>();

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov", ".m4v", ".avi", ".mkv"];

export function getVideoType(url: string | undefined | null): VideoPlatform | null {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();

  if (/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))/.test(trimmed)) {
    return "youtube";
  }

  if (/vimeo\.com\/(?:video\/)?\d+/.test(trimmed)) {
    return "vimeo";
  }

  if (/^\d+$/.test(trimmed)) {
    return "vimeo";
  }

  const lower = trimmed.toLowerCase();
  if (VIDEO_EXTENSIONS.some((ext) => lower.includes(ext))) {
    return "mp4";
  }

  if (/^https?:\/\/.+\/.+\.\w{2,5}(\?.*)?$/.test(trimmed) && !trimmed.includes("youtube") && !trimmed.includes("vimeo")) {
    return "mp4";
  }

  return null;
}

export function getYoutubeId(url: string | undefined | null): string | null {
  if (!url || typeof url !== "string") return null;
  const match = url.trim().match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|^)([A-Za-z0-9_-]{11})(?:\?|&|$|\/)?/,
  );
  return match ? match[1] : null;
}

export function getVimeoId(url: string | undefined | null): string | null {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  const match = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (match) return match[1];
  if (/^\d+$/.test(trimmed)) return trimmed;
  return null;
}

export function parseVideoUrl(url: string | undefined | null): VideoInfo | null {
  if (!url || typeof url !== "string") return null;

  const trimmed = url.trim();

  const ytIdMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|^)([A-Za-z0-9_-]{11})(?:\?|&|$|\/)?/,
  );
  if (ytIdMatch) {
    return { platform: "youtube", id: ytIdMatch[1] };
  }

  const vimeoIdMatch = trimmed.match(
    /vimeo\.com\/(?:video\/)?(\d+)/,
  );
  if (vimeoIdMatch) {
    return { platform: "vimeo", id: vimeoIdMatch[1] };
  }

  if (/^\d+$/.test(trimmed)) {
    return { platform: "vimeo", id: trimmed };
  }

  const lower = trimmed.toLowerCase();
  if (VIDEO_EXTENSIONS.some((ext) => lower.includes(ext))) {
    return { platform: "mp4", id: trimmed };
  }

  return null;
}

export type EmbedMode = "background" | "desktop" | "modal";

export function getEmbedUrl(
  platform: VideoPlatform,
  id: string,
  mode: EmbedMode = "desktop",
): string {
  if (platform === "youtube") {
    if (mode === "background") {
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&controls=0&rel=0&playlist=${id}&playsinline=1`;
    }
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
  }

  if (platform === "vimeo") {
    if (mode === "background") {
      return `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&controls=0&background=1`;
    }
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }

  return id;
}

export function getYoutubeThumbnail(
  videoId: string,
  quality: "maxresdefault" | "hqdefault" | "sddefault" = "maxresdefault",
): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

export function getWatchUrl(platform: VideoPlatform, id: string): string {
  if (platform === "youtube") {
    return `https://www.youtube.com/watch?v=${id}`;
  }
  if (platform === "vimeo") {
    return `https://vimeo.com/${id}`;
  }
  return id;
}

export function useVimeoThumbnail(videoId: string | undefined): string | null {
  const [thumbnail, setThumbnail] = useState<string | null>(() => {
    if (!videoId) return null;
    return vimeoThumbnailCache.get(videoId) ?? null;
  });

  useEffect(() => {
    if (!videoId) {
      setThumbnail(null);
      return;
    }

    if (vimeoThumbnailCache.has(videoId)) {
      setThumbnail(vimeoThumbnailCache.get(videoId)!);
      return;
    }

    let cancelled = false;

    fetch(
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data.thumbnail_url) {
          vimeoThumbnailCache.set(videoId, data.thumbnail_url);
          setThumbnail(data.thumbnail_url);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [videoId]);

  return thumbnail;
}

export function getVideoThumbnail(
  info: VideoInfo | null,
  vimeoThumbnail: string | null,
): string {
  if (!info) return "";

  if (info.platform === "youtube") {
    return getYoutubeThumbnail(info.id);
  }
  if (info.platform === "vimeo") {
    return vimeoThumbnail ?? "";
  }

  return "";
}

export type ThumbnailStatus = "loading" | "loaded" | "error";

export function useVideoThumbnail(
  url: string | undefined | null,
  fallbackImage?: string,
): { src: string; status: ThumbnailStatus } {
  const info = parseVideoUrl(url);
  const vimeoThumb = useVimeoThumbnail(info?.platform === "vimeo" ? info.id : undefined);
  const [mp4Poster, setMp4Poster] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setMp4Poster(null);
    setImgError(false);
  }, [url]);

  const thumbnail = (() => {
    if (!info) return { src: fallbackImage ?? "", status: "loaded" as ThumbnailStatus };

    if (info.platform === "youtube") {
      return { src: getYoutubeThumbnail(info.id), status: "loaded" as ThumbnailStatus };
    }

    if (info.platform === "vimeo") {
      if (vimeoThumb) {
        return { src: vimeoThumb, status: "loaded" as ThumbnailStatus };
      }
      return { src: fallbackImage ?? "", status: "loading" as ThumbnailStatus };
    }

    if (info.platform === "mp4") {
      if (mp4Poster) {
        return { src: mp4Poster, status: "loaded" as ThumbnailStatus };
      }
      return { src: fallbackImage ?? "", status: "loading" as ThumbnailStatus };
    }

    return { src: fallbackImage ?? "", status: "loaded" as ThumbnailStatus };
  })();

  if (imgError && fallbackImage && thumbnail.src !== fallbackImage) {
    return { src: fallbackImage, status: "loaded" };
  }

  return thumbnail;
}
