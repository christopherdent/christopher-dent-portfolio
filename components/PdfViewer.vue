<template>
  <div class="flex flex-col lg:flex-row lg:h-[calc(100vh-5rem)] h-auto">
   
    <div class="relative flex-1 rounded-2xl shadow-xl bg-white overflow-auto" style="aspect-ratio: 8.5/11;">
      
      <!-- toolbar -->
      <div class="action-toolbar absolute top-2 right-2 z-10 flex space-x-2 bg-white/80 p-1 rounded">
        <button @click="pdfViewer?.download('ChristopherDentResume.pdf')">
          <Icon name="material-symbols:download" style="color:black" />
        </button>
        <button @click="pdfViewer?.print(150, 'ChristopherDentResume.pdf', true)">
          <Icon name="material-symbols:print" style="color:black" />
        </button>
      </div>

      <!-- resume selector -->

      <!-- pagination -->
      <div class="flex items-center justify-center gap-4 mt-4">
        <button
          @click="prevPage"
          :disabled="currentPage <= 1"
          class="px-3 py-1 rounded-md border border-gray-400 text-gray-800 hover:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300"
        >
          Previous
        </button>

        <span class="text-sm text-gray-700">
          Page {{ currentPage }} / {{ pageCount }}
        </span>

        <button
          @click="nextPage"
          :disabled="currentPage >= pageCount"
          class="px-3 py-1 rounded-md border border-gray-400 text-gray-800 hover:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300"
        >
          Next
        </button>
      </div>

      <!-- pdf viewer -->
      <ClientOnly>
        <vue-pdf-embed
          ref="pdfViewer"
          :source="source"
          :page="currentPage"
          class="w-full h-full object-contain"
          @loaded="onLoaded"
        />
      </ClientOnly>

      <!-- loading overlay -->
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white/70">
        Loading …
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'
import type { PDFDocumentProxy } from 'pdfjs-dist'

const props = defineProps<{
  seFile: string
  tpmFile: string
}>()

const pdfViewer = ref<InstanceType<typeof VuePdfEmbed> | null>(null)
const source = ref<string | null>(null)
const currentPage = ref(1)
const pageCount = ref(1)
const loading = ref(true)
const selectedResume = ref<'se' | 'tpm'>('se')

const emit = defineEmits(['resumeChange'])

function emitSelection() {
  emit('resumeChange', selectedResume.value)
}

function onLoaded(pdf: PDFDocumentProxy) {
  pageCount.value = pdf.numPages
  loading.value = false
}

// ✅ Initialize default resume
watch(
  () => [props.seFile, props.tpmFile],
  ([se, tpm]) => {
    if (se && tpm && !source.value) source.value = se
  },
  { immediate: true }
)

// ✅ Watch dropdown changes (single safe watcher)
watch(selectedResume, async (val) => {
  loading.value = true
  await nextTick()
  source.value = val === 'tpm' ? props.tpmFile : props.seFile
  currentPage.value = 1
})

function nextPage() {
  if (currentPage.value < pageCount.value) currentPage.value++
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
</script>
