<template>
  <UContainer class="hero-container min-h-screen shadow-md rounded-xl transition-all duration-500"
              size="full">

    <a href="/"
      class="page-title page-title--section heading-theme heading-hover-effect text-shadow-md hover:text-blue-800 transition-all duration-300 hover:scale-105 mb-4">
      Portfolio Home
    </a>


    <div class="flex flex-col lg:flex-row lg:items-stretch lg:gap-6 w-full h-[80vh]">

      <!-- ─────────────── PDF PANEL ──────────────────────────────────────── -->
      <section class="w-full lg:w-1/2 p-4 flex flex-col">
        <div class="relative flex-1 rounded-2xl shadow-xl bg-white overflow-auto">
          <PdfViewer :file="resumeUrl" />
        </div>
      </section>

      <!-- ─────────────── CHAT PANEL ─────────────────────────────────────── -->
      <section class="w-full lg:w-1/2 p-4 flex flex-col">
        <UContainer 
          class="chat-container
          flex flex-col
          w-full
          bg-gray-900/80 backdrop-blur-lg shadow-2xl rounded-2xl
          p-4 sm:p-6 text-gray-100
          overflow-hidden">
          <ChatSidebar class="flex-1" />
        </UContainer>
      </section>
    </div>
  </UContainer>
</template>

<script setup>
import ChatSidebar from '../components/ChatSidebar';
import PdfViewer from '../components/PdfViewer.vue';
import { useTheme } from '~/composables/useTheme';
const { theme } = useTheme();
const resumeUrl = '/pdf/ChristopherDentResume.pdf';
</script>