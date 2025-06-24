// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui'],
    app: {
    head: {
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/three/build/three.min.js', defer: true },
        { src: 'https://cdn.jsdelivr.net/npm/vanta/dist/vanta.net.min.js', defer: true }
      ]
    }
  }
})