import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { compression } from "vite-plugin-compression2";

export default defineConfig(({ mode }) => ({
  plugins: [
    TanStackRouterVite(),
    tailwindcss(),
    tsconfigPaths(),
    react(),
    compression({ algorithm: "brotliCompress", threshold: 1024 }),
    compression({ algorithm: "gzip", threshold: 1024 }),
  ],
  build: {
    target: "es2020",
    minify: "esbuild",
    cssMinify: true,
    cssCodeSplit: true,
    sourcemap: mode !== "production",
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.match(/\/react\//))
              return "react-vendor";
            if (id.includes("@tanstack")) return "tanstack";
            if (id.includes("swiper")) return "swiper";
            if (id.includes("@fancyapps")) return "fancybox";
            if (id.includes("framer-motion")) return "framer-motion";
          }
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames(assetInfo) {
          const name = assetInfo.name ?? "";
          if (/\.(gif|jpe?g|png|svg|webp|avif)$/i.test(name))
            return "assets/img/[name]-[hash][extname]";
          if (/\.css$/i.test(name))
            return "assets/css/[name]-[hash][extname]";
          if (/\.(woff2?|ttf|otf|eot)$/i.test(name))
            return "assets/fonts/[name]-[hash][extname]";
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
}));
