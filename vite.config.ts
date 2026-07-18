import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: "prompt",
    includeAssets: ["ember-icon.svg", "media/exercises/*.png"],
    manifest: {
      name: "Ember — Träna med riktning",
      short_name: "Ember",
      description: "En lugn, lokal träningscoach för styrka och progression.",
      theme_color: "#11100f",
      background_color: "#11100f",
      display: "standalone",
      start_url: "/",
      scope: "/",
      icons: [{ src: "/ember-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" }],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,svg,png}"],
      navigateFallback: "/index.html",
      cleanupOutdatedCaches: true,
    },
  })],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
});
