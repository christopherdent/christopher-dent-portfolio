<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

let vantaEffect = null
const vantaRef = ref(null)

onMounted(async () => {
  // Only run on client
  if (typeof window !== 'undefined') {
    const THREE = await import('three')
    const VANTA = await import('vanta/dist/vanta.net.min.js')

vantaEffect = VANTA.default({
  el: vantaRef.value,
  THREE,
  mouseControls: true,
  touchControls: true,
  minHeight: window.innerHeight,
  minWidth: window.innerWidth,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0xffffff,
  backgroundColor: 0x000000
})


  }
})

onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy()
})
</script>

<template>
  <div ref="vantaRef" class="fixed inset-0 w-screen h-screen -z-10"></div>
</template>

