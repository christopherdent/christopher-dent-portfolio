<template>
  <div class="hero-container min-h-screen py-6 px-3 sm:px-6 transition-all duration-500 flex flex-col">
    <!-- Top Nav Header -->
    <header class="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
      <!-- Back to Home -->
      <NuxtLink
        to="/"
        class="inline-flex items-center space-x-2 text-sm font-mono font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/10 transition-all duration-300 hover:-translate-x-1 cursor-pointer z-20 relative"
      >
        <ArrowLeft class="w-4 h-4" />
        <span>Return to Home</span>
      </NuxtLink>

      <!-- Page Title -->
      <h1 class="page-title page-title--landing text-xl sm:text-2xl font-bold font-display text-center" :class="headerThemeClasses">
        Interactive Resume & AI Guide
      </h1>

      <!-- Segmented Resume Role Switcher -->
      <div class="glass-switcher p-1 rounded-xl flex items-center space-x-1 border border-white/10 bg-slate-900/60">
        <button
          @click="setResume('SE')"
          class="px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center space-x-1.5"
          :class="selected === 'SE' ? activePillClasses : 'text-gray-400 hover:text-white'"
        >
          <Code2 class="w-3.5 h-3.5" />
          <span>Software Engineer</span>
        </button>

        <button
          @click="setResume('TPM')"
          class="px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center space-x-1.5"
          :class="selected === 'TPM' ? activePillClasses : 'text-gray-400 hover:text-white'"
        >
          <Briefcase class="w-3.5 h-3.5" />
          <span>Project Manager</span>
        </button>
      </div>
    </header>

    <!-- Main Content: PDF View + Chat Panel -->
    <div class="flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[75dvh]">
      <!-- PDF Panel -->
      <section class="flex flex-col h-full">
        <div class="flex-1 rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-2xl overflow-hidden p-2 sm:p-4">
          <PdfViewer :file="resumeUrl" />
        </div>
      </section>

      <!-- Chat Panel -->
      <section class="flex flex-col h-full">
        <div class="flex-1 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl p-4 sm:p-6 overflow-hidden">
          <ChatSidebar />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeft, Code2, Briefcase } from 'lucide-vue-next'
import ChatSidebar from '~/components/ChatSidebar.vue'
import PdfViewer from '~/components/PdfViewer.vue'
import { useResume } from '~/composables/useResume'
import { useTheme } from '~/composables/useTheme'

const { theme } = useTheme()
const { resumeUrl, selected, setResume } = useResume()

// Theme-reactive Header Title Classes
const headerThemeClasses = computed(() => {
  const themes: Record<string, string> = {
    cosmic: 'text-purple-300',
    neon: 'text-emerald-300',
    cool: 'text-blue-300',
    psychedelic: 'text-pink-300'
  }
  return themes[theme.value] || themes.cosmic
})

// Theme-reactive Active Switcher Pill Classes
const activePillClasses = computed(() => {
  const themes: Record<string, string> = {
    cosmic: 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] scale-105',
    neon: 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-105',
    cool: 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-105',
    psychedelic: 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] scale-105'
  }
  return themes[theme.value] || themes.cosmic
})
</script>

<style scoped>
.glass-switcher {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
</style>