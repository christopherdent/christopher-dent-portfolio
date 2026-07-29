<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useTheme } from '~/composables/useTheme'

let vantaEffect = null
const vantaRef = ref(null)
const { theme } = useTheme()

const themeColors = {
  cosmic: { color: 0x818cf8, backgroundColor: 0x0f172a },     // soft indigo net on dark slate
  neon: { color: 0x34d399, backgroundColor: 0x064e3b },       // emerald net on deep dark green
  cool: { color: 0x60a5fa, backgroundColor: 0x0f172a },       // sky blue net on dark slate
  psychedelic: { color: 0xfacc15, backgroundColor: 0x3b0764 } // bright yellow net on deep purple
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
      points: 10.0,
      maxDistance: 22.0,
      spacing: 16.0
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
  <div ref="vantaRef" class="fixed inset-0 w-screen h-screen -z-10 pointer-events-none"></div>
</template>
