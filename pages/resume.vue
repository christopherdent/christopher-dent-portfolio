<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
    <!-- Header with better spacing and shadow -->
    <header class="w-full flex justify-center py-8 bg-white/80 backdrop-blur-sm shadow-sm">
      <a href="/"
         class="text-8xl font-bold text-blue-600 hover:text-blue-800 transition-all duration-300 hover:scale-105 passions-conflict-regular">
        Dent Home
      </a>
    </header>
    <!-- ── MAIN LAYOUT: stacks on mobile, splits 50/50 on lg+ ─────────────── -->
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
  </div>
</template>

<script setup>
import ChatSidebar from '../components/ChatSidebar';
import PdfViewer from '../components/PdfViewer.vue';
const resumeUrl = '/pdf/ChristopherDentResume.pdf';
</script>