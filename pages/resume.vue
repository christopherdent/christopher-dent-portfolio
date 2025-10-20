<template>
  <div class="hero-container min-h-screen shadow-md rounded-xl transition-all duration-500">
    <header class="w-full flex justify-center py-8 bg-base-200/80 backdrop-blur-sm shadow-sm transition-colors">
      <a 
        href="/" 
        class="text-4xl font-bold transition-all duration-300 hover:scale-105"
        :class="linkClasses"
      >
        Portfolio Home
      </a>
    </header>

    <!-- Resume Toggle Buttons -->
    <div class="flex justify-center mt-4 space-x-3">
      <button
        @click="setResume('TPM')"
        :class="selected === 'TPM' ? buttonActiveClasses : buttonInactiveClasses"
        class="px-3 py-1 rounded shadow-sm transition"
      >
        Project Manager
      </button>
      <button
        @click="setResume('SE')"
        :class="selected === 'SE' ? buttonActiveClasses : buttonInactiveClasses"
        class="px-3 py-1 rounded shadow-sm transition"
      >
        Software Engineer
      </button>
    </div>

    <div class="flex flex-col lg:flex-row h-[calc(100vh-5rem)]">
      <!-- PDF Panel -->
      <section class="w-full lg:w-1/2 p-4 flex flex-col">
        <div class="relative flex-1 rounded-2xl shadow-xl bg-white overflow-hidden">
          <PdfViewer :file="resumeUrl" />
        </div>
      </section>

      <!-- Chat Panel -->
      <section class="w-full lg:w-1/2 p-4">
        <UContainer
          class="chat-container flex-1 bg-gray-900/80 backdrop-blur-lg shadow-2xl rounded-2xl p-6 pb-12 overflow-auto text-gray-100"
        >
          <ChatSidebar />
        </UContainer>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ChatSidebar from '~/components/ChatSidebar.vue'
import PdfViewer from '~/components/PdfViewer.vue'
import { useResume } from '~/composables/useResume'
import { useTheme } from '~/composables/useTheme'

const { theme } = useTheme()
const { resumeUrl, selected, setResume } = useResume()

const linkClasses = computed(() => {
  const themes = {
    cosmic: 'text-purple-400 hover:text-purple-300',
    neon: 'text-green-400 hover:text-green-300',
    cool: 'text-blue-400 hover:text-blue-300',
    psychedelic: 'text-pink-400 hover:text-pink-300'
  }
  return themes[theme.value] || themes.cosmic
})

const buttonActiveClasses = computed(() => {
  const themes = {
    cosmic: 'bg-purple-600 text-white',
    neon: 'bg-green-600 text-white',
    cool: 'bg-blue-600 text-white',
    psychedelic: 'bg-pink-600 text-white'
  }
  return themes[theme.value] || themes.cosmic
})

const buttonInactiveClasses = computed(() => {
  const themes = {
    cosmic: 'bg-white text-purple-600 border border-purple-600',
    neon: 'bg-white text-green-600 border border-green-600',
    cool: 'bg-white text-blue-600 border border-blue-600',
    psychedelic: 'bg-white text-pink-600 border border-pink-600'
  }
  return themes[theme.value] || themes.cosmic
})
</script>