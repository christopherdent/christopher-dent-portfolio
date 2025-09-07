<template>
<UContainer class="hero-container min-h-screen shadow-md rounded-xl transition-all duration-500" size="full">

    <a href="/"
       class="hover:text-blue-800 transition-all duration-300 hover:scale-105 menu-chris mb-4">
      Portfolio Home
    </a>

    <div class="flex flex-col lg:flex-row lg:items-center h-[calc(100vh-5rem)]">
      <!-- ─────────────── PDF PANEL ──────────────────────────────────────── -->
      <section class="w-full lg:w-1/2 p-4 flex flex-col">
        <div class="relative flex-1 rounded-2xl shadow-xl bg-white overflow-hidden">
          <!-- pdf viewer itself (fills parent) -->
          <PdfViewer :file="resumeUrl" />
        </div>
      </section>

      <!-- ─────────────── CHAT PANEL ─────────────────────────────────────── -->
      <section class="w-full lg:w-1/2 p-4 flex justify-center">
        <!-- feel free to keep your original classes here -->
        <UContainer class="chat-container
           flex flex-col
           w-full   
           lg:max-w-[75%]
           h-[80vh] lg:h-full 
           bg-gray-900/80 backdrop-blur-lg shadow-2xl rounded-2xl
           p-6 text-gray-100
           overflow-hidden">
          <ChatSidebar />
        </UContainer>
      </section>
    </div>
</UContainer>
</template>

<script setup>
import ChatSidebar from '../components/ChatSidebar';
import PdfViewer from '../components/PdfViewer.vue';
import { useTheme } from '~/composables/useTheme'
const { theme } = useTheme()
const resumeUrl = '/pdf/ChristopherDentResume.pdf';
</script>