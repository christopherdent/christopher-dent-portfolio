<template>
  <div class="flex h-[90vh] w-full">
    <!-- PDF on the left -->
    <div class="flex flex-col items-center justify-center w-full max-w-xl h-full"
         style="margin-left: 0; padding-left: 25px;">
      <div class="relative w-full h-full max-h-[75vh] rounded-lg border shadow bg-white overflow-hidden"
           style="aspect-ratio: 8.5/11;">
        <div class="action-toolbar absolute top-2 right-2 z-10 flex space-x-2 bg-white/80 p-1 rounded">
          <button @click="pdfViewer?.download('ChristopherDentResume.pdf')"><Icon name="material-symbols:download" style="color: black" /></button>
          <button @click="pdfViewer?.print(150, 'ChristopherDentResume.pdf', true)"><Icon name="material-symbols:print" style="color: black" /></button>
        </div>

        <ClientOnly>
          <vue-pdf-embed ref="pdfEmbed"
                         :source="source"
                         :page="currentPage"
                         class="w-full h-full"
                         @loaded="onLoaded" />
        </ClientOnly>
        <div v-if="loading"
             class="absolute inset-0 flex items-center justify-center bg-white/70">
          Loading…
        </div>
      </div>
      <!-- Pagination Controls -->
      <div class="flex items-center justify-center gap-4 mt-4"
           v-if="!loading">
        <button @click="prevPage"
                :disabled="currentPage <= 1"
                class="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50">
          Previous
        </button>
        <span class="text-sm">
          Page {{ currentPage }} / {{ pageCount }}
        </span>
        <button @click="nextPage"
                :disabled="currentPage >= pageCount"
                class="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50">
          Next
        </button>
      </div>
    </div>

    <!-- Spacer (and for future: chat sidebar here) -->
    <div class="flex-1" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import VuePdfEmbed from 'vue-pdf-embed'

const props = defineProps({
  file: {
    type: String,
    default: ''
  }
})

const pdfViewer = ref<InstanceType<typeof pdfEmbed> | null>(null)
const source = ref<string | null>(null)
const currentPage = ref(1)
const pageCount = ref(1)
const loading = ref(true)

function onLoaded(pdf: any) {
  pageCount.value = pdf.numPages
  loading.value = false
}

watch(
  () => props.file,
  (v) => {
    source.value = v
    currentPage.value = 1
    loading.value = true
  },
  { immediate: true }
)

function nextPage() {
  if (currentPage.value < pageCount.value) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>
