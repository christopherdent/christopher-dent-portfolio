import { ref, watchEffect } from 'vue'
// Import useCookie from Nuxt or your cookie composable
import { useCookie } from '#app' // or 'nuxt/app' depending on your setup

export function useTheme() {
  // store/persist current theme
  const theme = useCookie('theme', { default: () => 'cosmic' })

  // setter
  function setTheme(val: string) {
    theme.value = val
  }

  // declaratively apply to <html>
  useHead({
    htmlAttrs: {
      'data-theme': theme
    }
  })

  return { theme, setTheme }
}
