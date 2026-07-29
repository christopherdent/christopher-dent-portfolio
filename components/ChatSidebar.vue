<template>
  <div class="h-full flex flex-col justify-between">
    <!-- Header -->
    <div class="px-2 pt-1 pb-3 shrink-0 border-b border-white/10 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg" :class="botAvatarThemeClasses">
          <Bot class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-lg font-bold font-display" :class="titleThemeClasses">
            Ask ChrisBot
          </h2>
          <div class="flex items-center space-x-1.5 text-xs text-gray-400">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>AI Resume Assistant • Online</span>
          </div>
        </div>
      </div>

      <Sparkles class="w-4 h-4" :class="titleThemeClasses" />
    </div>

    <!-- Quick Prompt Suggestions (Shown when chat is empty or starting) -->
    <div v-if="messages.length === 0" class="p-3 my-2 rounded-xl bg-white/5 border border-white/10">
      <p class="text-xs font-mono text-gray-400 mb-2 flex items-center space-x-1">
        <HelpCircle class="w-3.5 h-3.5 text-purple-400" />
        <span>Suggested Questions:</span>
      </p>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="(prompt, idx) in suggestedPrompts"
          :key="idx"
          @click="askSuggested(prompt)"
          class="text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5 transition-all text-left"
        >
          "{{ prompt }}"
        </button>
      </div>
    </div>

    <!-- Chat Log -->
    <div ref="log" class="flex-1 overflow-y-auto py-3 px-1 space-y-3.5 text-sm my-1">
      <div
        v-for="(msg, i) in messages"
        :key="i"
        class="flex space-x-2"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <!-- Bot Avatar for Bot Messages -->
        <div
          v-if="msg.role === 'chrisbot'"
          class="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-white text-xs mt-0.5"
          :class="botAvatarThemeClasses"
        >
          <Bot class="w-4 h-4" />
        </div>

        <!-- Message Bubble -->
        <div
          :class="[
            'rounded-2xl px-4 py-2.5 max-w-[85%] sm:max-w-[78%] text-sm leading-relaxed shadow-lg',
            msg.role === 'user'
              ? userBubbleThemeClasses
              : 'bg-slate-800/90 text-gray-200 border border-white/10'
          ]"
        >
          {{ msg.text }}
        </div>

        <!-- User Avatar for User Messages -->
        <div
          v-if="msg.role === 'user'"
          class="w-7 h-7 rounded-lg shrink-0 bg-slate-700 flex items-center justify-center text-gray-300 text-xs mt-0.5"
        >
          <User class="w-4 h-4" />
        </div>
      </div>

      <!-- Bot Typing Indicator -->
      <div v-if="loading" class="flex items-center space-x-2">
        <div class="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-white text-xs" :class="botAvatarThemeClasses">
          <Bot class="w-4 h-4 animate-bounce" />
        </div>
        <div class="bg-slate-800/90 text-gray-400 rounded-2xl px-4 py-2 border border-white/10 flex items-center space-x-1.5 text-xs">
          <span class="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
          <span class="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
          <span class="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
        </div>
      </div>

      <div ref="bottom"></div>
    </div>

    <!-- Input Form -->
    <form @submit.prevent="submitQuestion" class="pt-3 border-t border-white/10 flex gap-2 shrink-0">
      <input
        ref="chatInput"
        v-model="draft"
        :disabled="loading"
        class="flex-1 bg-slate-800/90 border border-white/15 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
        placeholder="Ask ChrisBot about skills, projects, or experience…"
      />
      <button
        type="submit"
        :disabled="loading || !draft.trim()"
        class="px-4 py-2 rounded-xl text-white font-semibold transition-all duration-300 disabled:opacity-40 flex items-center space-x-1.5 shadow-lg"
        :class="submitBtnThemeClasses"
      >
        <span>Send</span>
        <Send class="w-3.5 h-3.5" />
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, computed } from 'vue'
import { Bot, User, Send, Sparkles, HelpCircle } from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { theme } = useTheme()

const draft = ref('')
const messages = ref<{ role: 'user' | 'chrisbot'; text: string }[]>([])
const loading = ref(false)
const chatInput = ref<HTMLInputElement>()
const bottom = ref<HTMLElement>()

const suggestedPrompts = [
  "What is Chris's tech stack?",
  "What project management certifications does Chris hold?",
  "Tell me about Chris's recent engineering projects."
]

// Theme-reactive CSS Classes
const titleThemeClasses = computed(() => {
  const themes: Record<string, string> = {
    cosmic: 'text-purple-300',
    neon: 'text-emerald-300',
    cool: 'text-blue-300',
    psychedelic: 'text-pink-300'
  }
  return themes[theme.value] || themes.cosmic
})

const botAvatarThemeClasses = computed(() => {
  const themes: Record<string, string> = {
    cosmic: 'bg-gradient-to-br from-purple-500 to-indigo-600',
    neon: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    cool: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    psychedelic: 'bg-gradient-to-br from-pink-500 to-purple-600'
  }
  return themes[theme.value] || themes.cosmic
})

const userBubbleThemeClasses = computed(() => {
  const themes: Record<string, string> = {
    cosmic: 'bg-purple-600 text-white shadow-purple-600/30',
    neon: 'bg-emerald-600 text-white shadow-emerald-600/30',
    cool: 'bg-blue-600 text-white shadow-blue-600/30',
    psychedelic: 'bg-pink-600 text-white shadow-pink-600/30'
  }
  return themes[theme.value] || themes.cosmic
})

const submitBtnThemeClasses = computed(() => {
  const themes: Record<string, string> = {
    cosmic: 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/30',
    neon: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30',
    cool: 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30',
    psychedelic: 'bg-pink-600 hover:bg-pink-500 shadow-pink-600/30'
  }
  return themes[theme.value] || themes.cosmic
})

function askSuggested(promptText: string) {
  draft.value = promptText
  submitQuestion()
}

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
