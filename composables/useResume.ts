import { ref, computed } from 'vue'

export function useResume() {
  const selected = ref<'TPM' | 'SE'>('TPM')
  const config = useRuntimeConfig()

  const resumeUrl = computed(() =>
    selected.value === 'TPM'
      ? config.public.RESUME_TPM_URL
      : config.public.RESUME_SOFTWARE_ENGINEER_URL
  )

  function toggle() {
    selected.value = selected.value === 'TPM' ? 'SE' : 'TPM'
  }

  function setResume(type: 'TPM' | 'SE') {
    selected.value = type
  }

  return { selected, resumeUrl, toggle, setResume }
}
