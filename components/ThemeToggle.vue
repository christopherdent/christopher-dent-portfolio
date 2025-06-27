<template>
  <div class="flex space-x-4">
    <button
      v-for="theme in themes"
      :key="theme.value"
      @click="selectTheme(theme.value)"
      :aria-label="theme.label"
      type="button"
      class="rounded-full transition-all"
      :class="[
        swatchSize,
        theme.preview,
        selected === theme.value
          ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-800 scale-110'
          : 'opacity-60 hover:opacity-90'
      ]"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

// receive v-model value
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

// prepare emit
const emit = defineEmits(['update:modelValue'])

// available themes
const themes = [
  { label: 'Cosmic Glow',    value: 'cosmic',      preview: 'bg-gradient-to-br from-[#1e293b] to-[#4c1d95]' },
  { label: 'Neon Energy',    value: 'neon',        preview: 'bg-gradient-to-br from-[#0f172a] to-[#10b981]' },
  { label: 'Professional Cool', value: 'cool',      preview: 'bg-gradient-to-br from-[#1e293b] to-[#3b82f6]' },
  { label: 'Psychedelic Boost', value: 'psychedelic', preview: 'bg-gradient-to-br from-[#ff6b6b] via-[#f06595] to-[#845ef7]' }
]

// proxy for two-way binding
const selected = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

// swatch size (customizable if you want)
const swatchSize = 'w-6 h-6'

// manual select handler
function selectTheme(val) {
  selected.value = val
}
</script>
