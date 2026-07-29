<template>
  <div class="flex flex-col h-full relative">
    <!-- Action Toolbar (Download, Print, Page Controls) -->
    <div class="flex items-center justify-between p-2 sm:p-3 mb-2 rounded-xl bg-slate-800/80 border border-white/10 text-xs font-mono text-gray-300">
      <!-- Pagination -->
      <div class="flex items-center space-x-2">
        <button
          @click="prevPage"
          :disabled="currentPage <= 1"
          class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 border border-white/10 transition-colors flex items-center space-x-1"
        >
          <ChevronLeft class="w-3.5 h-3.5" />
          <span class="hidden sm:inline">Prev</span>
        </button>

        <span class="px-2 py-0.5 rounded bg-white/10 text-gray-200">
          {{ currentPage }} / {{ pageCount }}
        </span>

        <button
          @click="nextPage"
          :disabled="currentPage >= pageCount"
          class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 border border-white/10 transition-colors flex items-center space-x-1"
        >
          <span class="hidden sm:inline">Next</span>
          <ChevronRight class="w-3.5 h-3.5" />
        </button>
      </div>

      <!-- Download & Print Actions -->
      <div class="flex items-center space-x-2">
        <button
          @click="pdfViewer?.download('ChristopherDentResume.pdf')"
          class="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-200 border border-white/10 transition-all duration-300 hover:scale-105"
          title="Download PDF"
        >
          <Download class="w-4 h-4 text-purple-300" />
        </button>
        <button
          @click="pdfViewer?.print(150, 'ChristopherDentResume.pdf', true)"
          class="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-200 border border-white/10 transition-all duration-300 hover:scale-105"
          title="Print PDF"
        >
          <Printer class="w-4 h-4 text-purple-300" />
        </button>
      </div>
    </div>

    <!-- PDF Viewer Frame -->
    <div class="relative flex-1 rounded-xl bg-white overflow-auto shadow-inner border border-white/10">
      <ClientOnly>
        <vue-pdf-embed
          ref="pdfViewer"
          :source="source"
          :page="currentPage"
          class="w-full h-full object-contain"
          @loaded="onLoaded"
        />
      </ClientOnly>

      <!-- Loading overlay -->
      <div v-if="loading" class="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 text-gray-300 space-y-3 backdrop-blur-sm">
        <div class="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <span class="text-xs font-mono text-purple-300">Loading Resume Document…</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import { ChevronLeft, ChevronRight, Download, Printer } from 'lucide-vue-next'

const props = defineProps<{ file: string }>()

const pdfViewer = ref<InstanceType<typeof VuePdfEmbed> | null>(null)
const source = ref<string | null>(null)
const currentPage = ref(1)
const pageCount = ref(1)
const loading = ref(true)

function onLoaded(pdf: PDFDocumentProxy) {
  pageCount.value = pdf.numPages
  loading.value = false
}

watch(
  () => props.file,
  (newFile) => {
    if (!newFile) return
    loading.value = true
    currentPage.value = 1
    source.value = newFile
  },
  { immediate: true }
)

function nextPage() {
  if (currentPage.value < pageCount.value) currentPage.value++
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
</script>
