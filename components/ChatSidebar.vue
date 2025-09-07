<!-- components/ChatSidebar.vue -->
<template>
  <div class="h-full flex flex-col">

            <!-- “Ask ChrisBot header -->
    <div class="px-4 pt-4">
      <h2 class="text-3xl font-extrabold font-sans mb-2">
        Ask ChrisBot
      </h2>
      <small><span style="color:gray">Ask questions about the resume and get instant answers from ChrisBot, your AI guide.</span></small>
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
    <div class="bg-gray-200 text-gray-900 rounded-2xl px-4 py-2 shadow-md flex items-center gap-1">
      <span class="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]"></span>
      <span class="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
      <span class="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
    </div>
  </div>
</div>




    <!-- Input box -->
    <form
      @submit.prevent="submitQuestion"
      class="border-t p-4 flex gap-2 shrink-0"
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

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }

    const data = await res.json()
    const answer = data?.answer?.trim()

    if (answer) {
      messages.value.push({ role: 'chrisbot', text: answer })
    } else {
      messages.value.push({ role: 'chrisbot', text: 'Connection failed. No response from server.' })
    }
  } catch (err) {
    messages.value.push({ role: 'chrisbot', text: 'Connection failed. Please try again later.' })
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
