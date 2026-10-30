<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useQAStore } from '../composables/useQAStore'
import type { QAItem } from '../types/qa'
import { getCategoryColor } from '../utils/colors'

const emit = defineEmits<{
  (e: 'back'): void
}>()

const { items, categories, getLessonsForCategory } = useQAStore()

const selectedCategory = ref('')
const selectedLesson = ref('')
const isFlipped = ref(false)
const currentIndex = ref(0)

const studyItems = ref<QAItem[]>([])

const availableLessons = computed(() => {
  return getLessonsForCategory(selectedCategory.value)
})

function extractQuestionNumber(str: string): number {
  const match = str.trim().match(/^(\d+)/)
  return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER
}

function rebuildStudyList() {
  const filtered = items.value.filter((item) => {
    if (selectedCategory.value && item.category.trim().toLowerCase() !== selectedCategory.value.trim().toLowerCase()) {
      return false
    }
    if (selectedLesson.value && item.lesson.trim().toLowerCase() !== selectedLesson.value.trim().toLowerCase()) {
      return false
    }
    return true
  })
  studyItems.value = [...filtered].sort((a, b) => {
    const numA = extractQuestionNumber(a.question)
    const numB = extractQuestionNumber(b.question)
    if (numA !== numB) return numA - numB
    return a.createdAt - b.createdAt
  })
  currentIndex.value = 0
  isFlipped.value = false
}

watch([selectedCategory, selectedLesson], () => {
  rebuildStudyList()
})

watch(
  items,
  () => {
    rebuildStudyList()
  },
  { deep: true, immediate: true }
)

const currentCard = computed((): QAItem | null => {
  if (studyItems.value.length === 0) return null
  return studyItems.value[currentIndex.value] ?? null
})

const currentTheme = computed(() => {
  return currentCard.value ? getCategoryColor(currentCard.value.category) : getCategoryColor('')
})

function flipCard() {
  isFlipped.value = !isFlipped.value
}

function nextCard() {
  if (currentIndex.value < studyItems.value.length - 1) {
    currentIndex.value++
    isFlipped.value = false
  }
}

function prevCard() {
  if (currentIndex.value > 0) {
    currentIndex.value--
    isFlipped.value = false
  }
}

function shuffleCards() {
  const shuffled = [...studyItems.value]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i]!
    shuffled[i] = shuffled[j]!
    shuffled[j] = temp
  }
  studyItems.value = shuffled
  currentIndex.value = 0
  isFlipped.value = false
}

function handleKeyDown(e: KeyboardEvent) {
  if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return

  if (e.code === 'Space' || e.code === 'Enter') {
    e.preventDefault()
    flipCard()
  } else if (e.code === 'ArrowRight') {
    e.preventDefault()
    nextCard()
  } else if (e.code === 'ArrowLeft') {
    e.preventDefault()
    prevCard()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="study-container">
    <!-- Header Controls -->
    <div class="study-header">
      <div class="header-left">
        <button class="btn btn-secondary back-btn" @click="emit('back')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          <span>Back to List</span>
        </button>

        <h2 class="study-title">Interactive Flashcards</h2>
      </div>

      <!-- Filters & Shuffle -->
      <div class="header-right">
        <select v-model="selectedCategory" class="study-select" aria-label="Select Category to study">
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>

        <select
          v-if="availableLessons.length > 0"
          v-model="selectedLesson"
          class="study-select"
          aria-label="Select Lesson to study"
        >
          <option value="">All Lessons</option>
          <option v-for="les in availableLessons" :key="les" :value="les">{{ les }}</option>
        </select>

        <button class="btn btn-secondary shuffle-btn" @click="shuffleCards" title="Shuffle flashcards">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <polyline points="16 3 21 3 21 8"/>
            <line x1="4" y1="20" x2="21" y2="3"/>
            <polyline points="21 16 21 21 16 21"/>
            <line x1="15" y1="15" x2="21" y2="21"/>
            <line x1="4" y1="4" x2="9" y2="9"/>
          </svg>
          <span>Shuffle</span>
        </button>
      </div>
    </div>

    <!-- Active Flashcard View -->
    <div v-if="currentCard" class="card-area">
      <!-- Progress Bar -->
      <div class="progress-wrapper">
        <div class="progress-info">
          <span class="card-count-label">{{ currentIndex + 1 }} / {{ studyItems.length }}</span>
        </div>
        <div class="progress-track">
          <div
            class="progress-fill"
            :style="{ width: `${((currentIndex + 1) / studyItems.length) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Flip Card 3D Component -->
      <div class="flip-card-wrapper" @click="flipCard">
        <div class="flip-card-inner" :class="{ flipped: isFlipped }">
          <!-- Card Front: Question -->
          <div class="flip-card-face flip-card-front">
            <div class="face-meta">
              <span
                class="badge"
                :style="{
                  background: currentTheme.bgLight,
                  color: currentTheme.textLight,
                  border: `1px solid ${currentTheme.border}`
                }"
              >
                {{ currentCard.category }}
              </span>
              <span class="badge lesson-badge">{{ currentCard.lesson }}</span>
              <span class="card-side-tag">Question</span>
            </div>

            <div class="face-body">
              <span class="big-indicator" :style="{ background: currentTheme.gradient }">Q</span>
              <p class="question-content">{{ currentCard.question }}</p>
            </div>

            <div class="face-footer">
              <div class="flip-action-hint">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
                <span>Click to flip</span>
              </div>
            </div>
          </div>

          <!-- Card Back: Answer / Definitions -->
          <div class="flip-card-face flip-card-back">
            <div class="face-meta">
              <span
                class="badge"
                :style="{
                  background: currentTheme.bgLight,
                  color: currentTheme.textLight,
                  border: `1px solid ${currentTheme.border}`
                }"
              >
                {{ currentCard.category }}
              </span>
              <span class="badge lesson-badge">{{ currentCard.lesson }}</span>
              <span class="card-side-tag answer-tag">Answer</span>
            </div>

            <div class="face-body">
              <div class="study-answers-stack">
                <!-- English definition -->
                <div v-if="currentCard.answerEn || (!currentCard.answerKh && currentCard.answer)" class="study-lang-block en-block">
                  <div class="study-lang-title">
                    <span>🇬🇧 English</span>
                  </div>
                  <p class="answer-content">{{ currentCard.answerEn || currentCard.answer }}</p>
                </div>

                <!-- Khmer definition -->
                <div v-if="currentCard.answerKh" class="study-lang-block kh-block">
                  <div class="study-lang-title khmer-font">
                    <span>🇰🇭 ភាសាខ្មែរ</span>
                  </div>
                  <p class="answer-content khmer-text">{{ currentCard.answerKh }}</p>
                </div>
              </div>
            </div>

            <div class="face-footer">
              <div class="flip-action-hint">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
                <span>Click to flip</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <div class="nav-controls">
        <button
          class="btn btn-secondary nav-btn"
          :disabled="currentIndex === 0"
          @click="prevCard"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          <span>Previous</span>
        </button>

        <button class="btn btn-primary flip-btn" @click="flipCard">
          <span>{{ isFlipped ? 'Show Question' : 'Reveal Definitions' }}</span>
        </button>

        <button
          class="btn btn-secondary nav-btn"
          :disabled="currentIndex === studyItems.length - 1"
          @click="nextCard"
        >
          <span>Next</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Empty State for Study Mode -->
    <div v-else class="study-empty">
      <h3>No questions to study in this selection</h3>
      <p>Try selecting a different Category or Lesson above.</p>
      <button class="btn btn-primary" @click="selectedCategory = ''; selectedLesson = ''">
        Reset Study Filters
      </button>
    </div>
  </div>
</template>

<style scoped>
.study-container {
  display: flex;
  flex-direction: column;
  gap: 1.85rem;
  max-width: 860px;
  margin: 0 auto;
  width: 100%;
}

.study-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.study-title {
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: -0.015em;
  color: var(--text-main);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.study-select {
  padding: 0.55rem 0.85rem;
  font-family: var(--font-sans);
  font-size: 0.88rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  background-color: var(--bg-surface);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  outline: none;
  cursor: pointer;
}

.card-area {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Progress Bar */
.progress-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.86rem;
  color: var(--text-muted);
  font-weight: 700;
}

.keyboard-hint {
  display: none;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-subtle);
}

@media (min-width: 640px) {
  .keyboard-hint {
    display: inline;
  }
}

.progress-track {
  width: 100%;
  height: 8px;
  background-color: var(--border-color);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4f46e5 0%, #ec4899 100%);
  border-radius: var(--radius-full);
  transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 3D Flip Card */
.flip-card-wrapper {
  perspective: 1200px;
  cursor: pointer;
  min-height: 420px;
  user-select: none;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  min-height: 420px;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-style: preserve-3d;
}

.flip-card-inner.flipped {
  transform: rotateY(180deg);
}

.flip-card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 2.2rem 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: var(--shadow-lg);
  overflow-y: auto;
}

.flip-card-back {
  transform: rotateY(180deg);
  border-color: rgba(16, 185, 129, 0.4);
}

.face-meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.lesson-badge {
  background: var(--accent-purple-light);
  color: var(--accent-purple-text);
  border: 1px solid rgba(139, 92, 246, 0.25);
}

.card-side-tag {
  margin-left: auto;
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-subtle);
}

.card-side-tag.answer-tag {
  color: #059669;
}

html.dark .card-side-tag.answer-tag {
  color: #34d399;
}

.face-body {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: center;
}

.big-indicator {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  color: white;
  font-size: 1.35rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.question-content {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.5;
  letter-spacing: -0.015em;
  max-width: 680px;
}

.study-answers-stack {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.study-lang-block {
  text-align: left;
  padding: 1.25rem 1.4rem;
  border-radius: var(--radius-md);
}

.study-lang-block.en-block {
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.06) 0%, rgba(14, 165, 233, 0.06) 100%);
  border: 1.5px solid rgba(79, 70, 229, 0.25);
}

.study-lang-block.kh-block {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.08) 100%);
  border: 1.5px solid rgba(16, 185, 129, 0.3);
}

.study-lang-title {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.5rem;
  color: var(--primary);
}

.khmer-font {
  font-family: var(--font-khmer);
  color: #059669;
}

html.dark .khmer-font {
  color: #34d399;
}

.answer-content {
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--text-main);
  line-height: 1.65;
  white-space: pre-wrap;
}

.khmer-text {
  font-family: var(--font-khmer);
  line-height: 1.85;
  font-size: 1.18rem;
}

.face-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-color);
}

.flip-action-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.86rem;
  color: var(--text-muted);
  font-weight: 600;
}

/* Nav Controls */
.nav-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.nav-btn {
  min-width: 120px;
}

.flip-btn {
  flex: 1;
  max-width: 250px;
}

@media (max-width: 600px) {
  .flip-card-face {
    padding: 1.5rem;
  }
  .question-content {
    font-size: 1.25rem;
  }
  .answer-content {
    font-size: 1rem;
  }
}

.study-empty {
  text-align: center;
  padding: 4rem 2rem;
  background-color: var(--bg-surface);
  border-radius: var(--radius-xl);
  border: 2px dashed var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>
