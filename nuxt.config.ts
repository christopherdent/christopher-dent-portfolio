export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap'
        }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/three/build/three.min.js', defer: true },
        { src: 'https://cdn.jsdelivr.net/npm/vanta/dist/vanta.net.min.js', defer: true }
      ]
    },
    
  }
});
