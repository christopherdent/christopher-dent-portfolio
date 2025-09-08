<template>
  <div class="h-full flex flex-col">

    <!-- Header -->
    <div class="px-4 pt-4 shrink-0 sticky top-0 bg-gray-900/80 backdrop-blur-lg z-10">
      <h2 class="text-2xl sm:text-3xl font-extrabold font-sans mb-2">
        Ask ChrisBot
      </h2>
      <small class="text-xs sm:text-sm text-gray-400">
        Ask questions about the resume and get instant answers from ChrisBot, your AI guide.
        He promises to give you fair and balanced answers about his creator… mostly.
      </small>
    </div>

    <!-- Chat log -->
    <div ref="log" class="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
      <div
        v-for="(msg, i) in messages"
        :key="i"
        class="flex"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          :class="[
            'rounded-2xl px-4 py-2 max-w-[75%] shadow-md',
            msg.role === 'user'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-900'
          ]"
        >
          {{ msg.text }}
        </div>
      </div>

      <!-- Bot typing indicator -->
      <div v-if="loading" class="flex justify-start">
        <div
          class="bg-gray-200 text-gray-900 rounded-2xl px-4 py-2 shadow-md flex items-center gap-1"
        >
          <span class="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]"></span>
          <span class="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
          <span class="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
        </div>
      </div>

      <!-- 👇 Sentinel -->
      <div ref="bottom"></div>
    </div>

    <!-- Input -->
    <form
      @submit.prevent="submitQuestion"
      class="border-t p-4 flex gap-2 shrink-0"
    >
      <input
        ref="chatInput"
        v-model="draft"
        :disabled="loading"
        class="flex-1 border rounded px-3 py-1 text-sm"
        placeholder="Ask about the resume…"
      />
      <button
        type="submit"
        :disabled="loading || !draft.trim()"
        class="px-4 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {{ loading ? '…' : 'Send' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'

const draft = ref('')
const messages = ref<{ role: 'user' | 'chrisbot'; text: string }[]>([])
const loading = ref(false)
const chatInput = ref<HTMLInputElement>()
const bottom = ref<HTMLElement>()

async function submitQuestion() {
  if (!draft.value.trim()) return
  messages.value.push({ role: 'user', text: draft.value })
  const question = draft.value
  draft.value = ''
  loading.value = true

  try {
    const res = await fetch('/api/chat-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()
    const answer = data?.answer?.trim()

    messages.value.push({
      role: 'chrisbot',
      text: answer || 'Connection failed. No response from server.'
    })
  } catch {
    messages.value.push({
      role: 'chrisbot',
      text: 'Connection failed. Please try again later.'
    })
  } finally {
    loading.value = false
    nextTick(() => chatInput.value?.focus())
  }
}

onMounted(() => {
  chatInput.value?.focus()
})

watch(
  () => messages.value.length,
  async () => {
    await nextTick()
    requestAnimationFrame(() => {
      bottom.value?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    })
  }
)

</script>
