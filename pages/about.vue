<template>
  <UContainer class="hero-container py-8 px-4 sm:px-8 transition-all duration-500 min-h-screen" size="full">
    <!-- Back to Home Bar -->
    <div class="w-full max-w-4xl mx-auto flex items-center justify-between mb-6">
      <NuxtLink
        to="/"
        class="inline-flex items-center space-x-2 text-sm font-mono font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/10 transition-all duration-300 hover:-translate-x-1 cursor-pointer z-20 relative"
      >
        <ArrowLeft class="w-4 h-4" />
        <span>Return to Home</span>
      </NuxtLink>

      <span class="text-xs font-mono text-purple-400/80 uppercase tracking-widest hidden sm:inline-block">
        [ Bio & Developer Milestones ]
      </span>
    </div>

    <!-- Header Section -->
    <div class="text-center max-w-2xl mx-auto mb-8">
      <h1 class="page-title page-title--landing heading-theme text-3xl sm:text-5xl font-bold tracking-tight mb-2">
        My Journey
      </h1>
      <p class="subheading-theme text-base sm:text-lg font-mono">
        From oceans and project management to modern full-stack engineering.
      </p>
    </div>

    <!-- Divider Line -->
    <div class="flex items-center justify-center max-w-4xl mx-auto my-6 opacity-60">
      <span class="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></span>
    </div>

    <!-- Interactive Bio Timeline -->
    <div class="w-full">
      <BioTimeline />
    </div>
  </UContainer>
</template>

<script setup>
import { ArrowLeft } from 'lucide-vue-next'
import BioTimeline from '~/components/BioTimeline.vue'
import { useTheme } from '~/composables/useTheme'

const { theme } = useTheme()
</script>

<style scoped>
.hero-container {
  max-width: 90%;
  margin: 2rem auto;
}

@media (max-width: 768px) {
  .hero-container {
    max-width: 100%;
    margin: 0;
    border-radius: 0;
  }
}
</style>