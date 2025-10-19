
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
    <header class="w-full flex justify-center py-8 bg-white/80 backdrop-blur-sm shadow-sm">
      <a href="/" class="text-4xl font-bold text-blue-600 hover:text-blue-800 transition-all duration-300 hover:scale-105">
        Dent Home
      </a>
    </header>

    <!-- Resume Toggle Buttons -->
    <div class="flex justify-center mt-4 space-x-3">
      <button
        @click="setResume('TPM')"
        :class="selected === 'TPM' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600'"
        class="px-3 py-1 rounded shadow-sm transition"
      >
        Project Manager
      </button>
      <button
        @click="setResume('SE')"
        :class="selected === 'SE' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600'"
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
import ChatSidebar from '~/components/ChatSidebar.vue'
import PdfViewer from '~/components/PdfViewer.vue'
import { useResume } from '~/composables/useResume'

const { resumeUrl, selected, setResume } = useResume()
</script>