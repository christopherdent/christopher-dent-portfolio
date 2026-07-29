<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useTheme } from '~/composables/useTheme'

let vantaEffect = null
const vantaRef = ref(null)
const { theme } = useTheme()

// Subtle, muted ambient colors for background lines
const themeColors = {
  cosmic: { color: 0x6366f1, backgroundColor: 0x0f172a },     // subtle indigo on dark slate
  neon: { color: 0x10b981, backgroundColor: 0x064e3b },       // muted emerald on dark green
  cool: { color: 0x3b82f6, backgroundColor: 0x0f172a },       // muted sky blue on dark slate
  psychedelic: { color: 0xd946ef, backgroundColor: 0x3b0764 } // soft fuchsia on deep purple
}

onMounted(async () => {
  if (typeof window !== 'undefined') {
    const THREE = await import('three')
    const VANTA = await import('vanta/dist/vanta.net.min.js')

    const currentColors = themeColors[theme.value] || themeColors.cosmic

    vantaEffect = VANTA.default({
      el: vantaRef.value,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: window.innerHeight,
      minWidth: window.innerWidth,
      scale: 1.0,
      scaleMobile: 1.0,
      color: currentColors.color,
      backgroundColor: currentColors.backgroundColor,
      points: 8.0,        // Fewer points for a cleaner, spacious look
      maxDistance: 18.0,  // Shorter connection distance
      spacing: 18.0       // Wider node spacing
    })
  }
})

watch(theme, (newTheme) => {
  if (vantaEffect && themeColors[newTheme]) {
    vantaEffect.setOptions({
      color: themeColors[newTheme].color,
      backgroundColor: themeColors[newTheme].backgroundColor
    })
  }
})

onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy()
})
</script>

<template>
  <!-- Muted 35% opacity wrapper for non-distracting ambient background -->
  <div ref="vantaRef" class="fixed inset-0 w-screen h-screen -z-10 pointer-events-none opacity-35 transition-opacity duration-700"></div>
</template>
