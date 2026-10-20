import { ref, watch, onMounted } from 'vue'

const isDark = ref(false)

export function useTheme() {
  function toggleTheme() {
    isDark.value = !isDark.value
    applyTheme()
  }

  function applyTheme() {
    if (typeof document !== 'undefined') {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      try {
        localStorage.setItem('devqa_theme', isDark.value ? 'dark' : 'light')
      } catch (e) {
        // ignore
      }
    }
  }

  onMounted(() => {
    try {
      const saved = localStorage.getItem('devqa_theme')
      if (saved) {
        isDark.value = saved === 'dark'
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        isDark.value = true
      }
      applyTheme()
    } catch (e) {
      // ignore
    }
  })

  return {
    isDark,
    toggleTheme
  }
}
