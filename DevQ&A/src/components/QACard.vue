<script setup lang="ts">
import { ref, computed } from 'vue'
import type { QAItem } from '../types/qa'
import { useQAStore } from '../composables/useQAStore'
import { getCategoryColor } from '../utils/colors'

const props = defineProps<{
  item: QAItem
  forceExpanded?: boolean
}>()

const emit = defineEmits<{
  (e: 'edit', item: QAItem): void
}>()

const { deleteItem, toggleFavorite } = useQAStore()

const isExpanded = ref(false)
const copied = ref(false)

const theme = computed(() => getCategoryColor(props.item.category))

const effectiveAnswerEn = computed(() => {
  return props.item.answerEn || (!props.item.answerKh ? props.item.answer || '' : '')
})

const effectiveAnswerKh = computed(() => {
  return props.item.answerKh || ''
})

function handleCardClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.closest('button') || target.closest('a')) {
    return
  }
  isExpanded.value = !isExpanded.value
}

function handleCopy() {
  const parts = []
  if (effectiveAnswerEn.value) parts.push(`English: ${effectiveAnswerEn.value}`)
  if (effectiveAnswerKh.value) parts.push(`Khmer: ${effectiveAnswerKh.value}`)
  const text = `Q: ${props.item.question}\n\n${parts.join('\n\n')}`

  navigator.clipboard.writeText(text).then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  })
}

function handleDelete() {
  if (confirm(`Delete this question?`)) {
    deleteItem(props.item.id)
  }
}
</script>

<template>
  <div
    class="qa-card"
    :class="{
      'is-expanded': isExpanded || forceExpanded,
      'is-favorite': item.isFavorite
    }"
    :style="{
      '--cat-color': theme.primary,
      '--cat-bg': theme.bgLight,
      '--cat-text': theme.textLight,
      '--cat-border': theme.border,
      '--cat-gradient': theme.gradient
    }"
    @click="handleCardClick"
  >
    <div class="card-accent-bar"></div>

    <!-- Meta row: Lesson & Favorite -->
    <div class="card-meta">
      <div class="badges-wrapper">
        <span class="badge lesson-badge">
          {{ item.lesson }}
        </span>
        <span v-if="effectiveAnswerEn" class="lang-tag en-tag">EN</span>
        <span v-if="effectiveAnswerKh" class="lang-tag kh-tag">KH</span>
      </div>

      <button
        class="fav-btn"
        :class="{ active: item.isFavorite }"
        :title="item.isFavorite ? 'Favorite' : 'Mark as favorite'"
        @click.stop="toggleFavorite(item.id)"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          :fill="item.isFavorite ? 'currentColor' : 'none'"
          stroke="currentColor"
          stroke-width="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </button>
    </div>

    <!-- The Question: Bold & Clear -->
    <div class="card-question-box">
      <h3 class="q-title">{{ item.question }}</h3>
    </div>

    <!-- Clean subtle expand prompt -->
    <div class="touch-bar">
      <span class="touch-indicator">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          class="arrow-icon"
          :class="{ rotated: isExpanded || forceExpanded }"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
        <span>{{ (isExpanded || forceExpanded) ? 'Hide answer' : 'Answer' }}</span>
      </span>
    </div>

    <!-- Inside Content: English & Khmer Definitions -->
    <div v-if="isExpanded || forceExpanded" class="inside-definition fade-in" @click.stop>
      <!-- English Definition -->
      <div v-if="effectiveAnswerEn" class="lang-def-card en-def">
        <div class="lang-header">
          <span class="flag-icon">🇬🇧</span>
          <span class="lang-name">English</span>
        </div>
        <p class="lang-text">{{ effectiveAnswerEn }}</p>
      </div>

      <!-- Khmer Definition -->
      <div v-if="effectiveAnswerKh" class="lang-def-card kh-def">
        <div class="lang-header">
          <span class="flag-icon">🇰🇭</span>
          <span class="lang-name khmer-font">ភាសាខ្មែរ</span>
        </div>
        <p class="lang-text khmer-text">{{ effectiveAnswerKh }}</p>
      </div>

      <!-- Compact Footer -->
      <div class="inside-footer">
        <button class="footer-btn" @click="handleCopy" title="Copy">
          <svg v-if="!copied" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
          <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>{{ copied ? 'Copied' : 'Copy' }}</span>
        </button>

        <div class="footer-actions">
          <button class="footer-btn" @click="emit('edit', item)">
            <span>Edit</span>
          </button>
          <button class="footer-btn delete-btn" @click="handleDelete">
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.qa-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  user-select: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.card-accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--cat-gradient);
}

.qa-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px -4px rgba(15, 23, 42, 0.08);
  border-color: var(--cat-border);
}

.qa-card.is-expanded {
  border-color: var(--cat-color);
}

.qa-card.is-favorite {
  border-left: 3px solid #f59e0b;
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.badges-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: center;
}

.lesson-badge {
  background: var(--bg-subtle);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
  font-size: 0.72rem;
  padding: 0.15rem 0.5rem;
}

.lang-tag {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.12rem 0.4rem;
  border-radius: var(--radius-xs);
}

.en-tag {
  background: rgba(14, 165, 233, 0.1);
  color: #0284c7;
}

.kh-tag {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}

.fav-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-subtle);
  padding: 0.25rem;
  border-radius: var(--radius-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.fav-btn:hover {
  color: #f59e0b;
}

.fav-btn.active {
  color: #f59e0b;
}

.card-question-box {
  margin-top: 0.1rem;
}

.q-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.45;
  letter-spacing: -0.01em;
  word-break: break-word;
}

.touch-bar {
  display: flex;
  align-items: center;
}

.touch-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--text-muted);
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-xs);
  background: var(--bg-subtle);
  transition: all 0.15s ease;
}

.qa-card:hover .touch-indicator {
  color: var(--cat-color);
}

.arrow-icon {
  transition: transform 0.2s ease;
}

.arrow-icon.rotated {
  transform: rotate(180deg);
}

/* Inside Definition Area */
.inside-definition {
  margin-top: 0.35rem;
  padding-top: 0.85rem;
  border-top: 1px dashed var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: default;
}

/* Language Definition Cards */
.lang-def-card {
  padding: 0.9rem 1rem;
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.lang-def-card.en-def {
  background: var(--bg-subtle);
  border: 1px solid var(--border-color);
}

.lang-def-card.kh-def {
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.lang-header {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.flag-icon {
  font-size: 0.95rem;
}

.lang-name {
  font-size: 0.74rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--text-muted);
}

.khmer-font {
  font-family: var(--font-khmer);
  color: #059669;
}

html.dark .khmer-font {
  color: #34d399;
}

.lang-text {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--text-main);
  white-space: pre-wrap;
  word-break: break-word;
}

.khmer-text {
  font-family: var(--font-khmer);
  line-height: 1.7;
  font-size: 0.96rem;
}

/* Footer inside card */
.inside-footer {
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 0.5rem;
}

.footer-actions {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.footer-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  background: transparent;
  border: 1px solid var(--border-color);
  padding: 0.25rem 0.55rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: all 0.15s ease;
}

.footer-btn:hover {
  background: var(--bg-hover);
  color: var(--text-main);
}

.delete-btn:hover {
  color: var(--danger);
  border-color: var(--danger-light);
}

@media (max-width: 680px) {
  .qa-card {
    padding: 0.85rem 0.85rem;
    gap: 0.6rem;
  }
  .card-question {
    font-size: 0.95rem;
  }
  .lang-text {
    font-size: 0.85rem;
  }
  .khmer-text {
    font-size: 0.88rem;
  }
}
</style>
