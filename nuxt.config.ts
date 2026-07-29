export default defineNuxtConfig({
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY || "",
        public: {
      RESUME_SOFTWARE_ENGINEER_URL: process.env.RESUME_SOFTWARE_ENGINEER_URL || "",
      RESUME_TPM_URL: process.env.RESUME_TPM_URL || ""
    }
  },
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/ui", "@nuxt/icon", "@nuxt/fonts"],
  css: ["~/assets/css/main.css"],
  fonts: {
    families: [
      { name: "Inter", provider: "google" },
      { name: "Space Grotesk", provider: "google" },
      { name: "Audiowide", provider: "google" },
    ],
  },
  app: {
    pageTransition: { name: "shatter", mode: "out-in" },
    head: {
      script: [
        { src: "https://cdn.jsdelivr.net/npm/three/build/three.min.js", defer: true },
        { src: "https://cdn.jsdelivr.net/npm/vanta/dist/vanta.net.min.js", defer: true },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", href: "/favicon.png" },
      ],
    },
  },
});
