<template>
  <UContainer class="hero-container shadow-md rounded-xl transition-all duration-500"
              size="full"
              >
    <a href="/"
       class="hover:text-blue-800 transition-all duration-300 hover:scale-105 menu-chris mb-4">
      Portfolio Home
    </a>


    <div class="flex items-center justify-center my-8">
      <span class="h-px flex-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-70"></span>
      <span class="mx-4 text-gray-400 text-lg font-semibold tracking-widest uppercase">✦</span>
      <span class="h-px flex-1 bg-gradient-to-l from-blue-400 via-purple-400 to-pink-400 opacity-70"></span>
    </div>

    <h1 class="heading-theme text-6xl font-bold text-center pb-6 passions-conflict-regular mt-20">~ My Journey ~</h1>
    <div class="flex justify-center">
      <BioTimeline />
    </div>
  </UContainer>
</template>

<script setup>
import { useTheme } from '~/composables/useTheme'
const { theme } = useTheme()
</script>