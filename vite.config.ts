import tailwindcss from "@tailwindcss/vite";

import react from "@vitejs/plugin-react-swc";

import compression from "vite-plugin-compression";

import path from "path";

import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression({
      algorithm: "gzip",
    }),
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
