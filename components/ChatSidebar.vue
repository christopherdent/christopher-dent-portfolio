<!-- components/ChatSidebar.vue -->
<template>
  <div class="h-full flex flex-col">
    <!-- Chat log -->
    <div
      ref="log"
      class="flex-grow overflow-y-auto p-4 space-y-3 text-sm"
    >
      <div
        v-for="(msg,i) in messages"
        :key="i"
        :class="msg.role === 'user' ? 'text-right' : 'text-left'"
      >
        <strong>{{ msg.role === 'user' ? 'You' : 'ChrisBot' }}:</strong>
        <span>{{ msg.text }}</span>
      </div>
    </div>

        <!-- “Ask ChrisBot header -->
    <div class="px-4 pt-4">
      <h2 class="text-3xl font-extrabold font-sans mb-2">
        Ask ChrisBot
      </h2>
    </div>

    <!-- Input box -->
    <form
      @submit.prevent="submitQuestion"
      class="border-t p-4 flex gap-2"
    >
      <input
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
import { ref, watch, nextTick } from 'vue'

const draft    = ref('')
const messages = ref<{ role: 'user' | 'chrisbot'; text: string }[]>([])
const loading  = ref(false)
const log      = ref<HTMLElement>()

async function submitQuestion() {
  if (!draft.value.trim()) return
  // push user's question
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
    const { answer } = await res.json()
    messages.value.push({ role: 'chrisbot', text: answer })
  } catch {
    messages.value.push({ role: 'chrisbot', text: 'Error: could not reach API.' })
  } finally {
    loading.value = false
  }
}

// auto-scroll on new message
watch(messages, async () => {
  await nextTick()
  if (log.value) log.value.scrollTop = log.value.scrollHeight
})
</script>
