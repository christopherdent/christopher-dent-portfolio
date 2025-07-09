export default defineNuxtConfig({
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY || ''
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/icon', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  fonts: {
    families: [
      { name: 'Inter', provider: 'google' },
      { name: 'Monoton', provider: 'google' },
      { name: 'Audiowide', provider: 'google' },
      { name: 'Zen Dots', provider: 'google' }
    ]
  },
  app: {
    head: {
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/three/build/three.min.js', defer: true },
        { src: 'https://cdn.jsdelivr.net/npm/vanta/dist/vanta.net.min.js', defer: true }
      ]
    }
  }
});