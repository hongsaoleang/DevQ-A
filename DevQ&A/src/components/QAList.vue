<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useQAStore } from '../composables/useQAStore'
import type { QAItem } from '../types/qa'
import { getCategoryColor } from '../utils/colors'
import QACard from './QACard.vue'

const emit = defineEmits<{
  (e: 'add'): void
  (e: 'edit', item: QAItem): void
}>()

const { items, categories, getLessonsForCategory } = useQAStore()

const DEFAULT_CATEGORY_KEY = 'devqa_default_category_choice'

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedLesson = ref('')
const favoritesOnly = ref(false)
const sortBy = ref<'newest' | 'oldest' | 'alpha'>('newest')
const forceExpandAll = ref(false)
const savedDefaultCategory = ref('')

onMounted(() => {
  try {
    const saved = localStorage.getItem(DEFAULT_CATEGORY_KEY)
    if (saved) {
      savedDefaultCategory.value = saved
      // If the saved default category exists in our items, select it by default on launch
      if (categories.value.includes(saved)) {
        selectedCategory.value = saved
      }
    }
  } catch (e) {
    // ignore
  }
})

function toggleDefaultCategory(cat: string) {
  try {
    if (savedDefaultCategory.value === cat) {
      localStorage.removeItem(DEFAULT_CATEGORY_KEY)
      savedDefaultCategory.value = ''
    } else {
      localStorage.setItem(DEFAULT_CATEGORY_KEY, cat)
      savedDefaultCategory.value = cat
    }
  } catch (e) {
    // ignore
  }
}

const availableLessons = computed(() => {
  return getLessonsForCategory(selectedCategory.value)
})

function selectCategory(cat: string) {
  if (selectedCategory.value === cat) {
    // Clicking again deselects and returns to Category Board
    selectedCategory.value = ''
  } else {
    selectedCategory.value = cat
  }
  selectedLesson.value = ''
  searchQuery.value = ''
}

function clearCategorySelection() {
  selectedCategory.value = ''
  selectedLesson.value = ''
  searchQuery.value = ''
  favoritesOnly.value = false
}

// Stats per category
function getCategoryStats(cat: string) {
  const catItems = items.value.filter((i) => i.category.trim().toLowerCase() === cat.trim().toLowerCase())
  const lessonsSet = new Set(catItems.map((i) => i.lesson.trim()).filter(Boolean))
  return {
    questionCount: catItems.length,
    lessonCount: lessonsSet.size
  }
}

function countByLesson(les: string) {
  return items.value.filter((i) => {
    const matchLes = i.lesson.trim().toLowerCase() === les.trim().toLowerCase()
    if (selectedCategory.value) {
      return matchLes && i.category.trim().toLowerCase() === selectedCategory.value.trim().toLowerCase()
    }
    return matchLes
  }).length
}

// Filtered items (only populated when a category is selected!)
const filteredItems = computed(() => {
  if (!selectedCategory.value) {
    return []
  }

  return items.value
    .filter((item) => {
      // Must match selected category
      if (item.category.trim().toLowerCase() !== selectedCategory.value.trim().toLowerCase()) {
        return false
      }

      if (favoritesOnly.value && !item.isFavorite) {
        return false
      }

      if (selectedLesson.value && item.lesson.trim().toLowerCase() !== selectedLesson.value.trim().toLowerCase()) {
        return false
      }

      if (searchQuery.value.trim()) {
        const query = searchQuery.value.trim().toLowerCase()
        const matchQ = item.question.toLowerCase().includes(query)
        const matchAEn = (item.answerEn || item.answer || '').toLowerCase().includes(query)
        const matchAKh = (item.answerKh || '').toLowerCase().includes(query)
        const matchL = item.lesson.toLowerCase().includes(query)
        return matchQ || matchAEn || matchAKh || matchL
      }

      return true
    })
    .sort((a, b) => {
      if (sortBy.value === 'newest') return b.createdAt - a.createdAt
      if (sortBy.value === 'oldest') return a.createdAt - b.createdAt
      if (sortBy.value === 'alpha') return a.question.localeCompare(b.question)
      return 0
    })
})

const currentCategoryTheme = computed(() => {
  return getCategoryColor(selectedCategory.value)
})
</script>

<template>
  <div class="board-wrapper">
    <!-- Category Board Section (Always accessible) -->
    <section class="category-board-container">
      <div class="board-header">
        <div class="header-titles">
          <div class="board-badge-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <rect width="7" height="7" x="3" y="3" rx="1"/>
              <rect width="7" height="7" x="14" y="3" rx="1"/>
              <rect width="7" height="7" x="14" y="14" rx="1"/>
              <rect width="7" height="7" x="3" y="14" rx="1"/>
            </svg>
            <span>Category Board</span>
          </div>
          <h2 class="board-title">Categories & Subjects</h2>
          <p class="board-subtitle">
            Click on any category to view its questions and answers.
          </p>
        </div>

        <div class="board-header-actions">
          <button
            v-if="selectedCategory"
            class="btn btn-secondary back-board-btn"
            @click="clearCategorySelection"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            <span>Show All Categories</span>
          </button>

          <button class="btn btn-primary add-new-btn" @click="emit('add')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span>New Question</span>
          </button>
        </div>
      </div>

      <!-- Categories Cards Grid on the Board -->
      <div class="category-cards-grid">
        <div
          v-for="cat in categories"
          :key="cat"
          class="cat-board-card"
          :class="{
            'is-active': selectedCategory === cat,
            'is-default': savedDefaultCategory === cat
          }"
          :style="{
            '--cat-col': getCategoryColor(cat).primary,
            '--cat-bg': getCategoryColor(cat).bgLight,
            '--cat-border': getCategoryColor(cat).border,
            '--cat-gradient': getCategoryColor(cat).gradient
          }"
          @click="selectCategory(cat)"
        >
          <!-- Top Accent Line -->
          <div class="cat-card-accent"></div>

          <div class="cat-card-top">
            <div class="cat-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
              </svg>
            </div>

            <!-- Set as Default Pin Button -->
            <button
              class="pin-default-btn"
              :class="{ pinned: savedDefaultCategory === cat }"
              :title="savedDefaultCategory === cat ? 'Default category on startup' : 'Set as default category on launch'"
              @click.stop="toggleDefaultCategory(cat)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span v-if="savedDefaultCategory === cat" class="pin-text">Default</span>
            </button>
          </div>

          <!-- Category Name -->
          <h3 class="cat-card-name">{{ cat }}</h3>

          <!-- Category Metrics -->
          <div class="cat-card-stats">
            <span class="cat-stat-chip">
              <strong>{{ getCategoryStats(cat).questionCount }}</strong> Questions
            </span>
            <span class="cat-stat-chip lesson-chip">
              <strong>{{ getCategoryStats(cat).lessonCount }}</strong> Lessons
            </span>
          </div>

          <!-- Click to Open Indicator -->
          <div class="cat-card-footer">
            <span class="view-prompt">
              {{ selectedCategory === cat ? 'Viewing questions ↓' : 'Click to view questions →' }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- State 1: When NO Category is Selected (Questions Hidden) -->
    <div v-if="!selectedCategory" class="no-selection-banner fade-in">
      <div class="prompt-icon-box">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="7 11 12 6 17 11"/>
          <line x1="12" y1="18" x2="12" y2="6"/>
        </svg>
      </div>
      <h3 class="prompt-title">Select a Category from the Board</h3>
      <p class="prompt-desc">
        Click on any category above (such as <strong>Backend</strong> or <strong>Web Development</strong>) to reveal all questions and definitions inside it.
      </p>
      <div v-if="savedDefaultCategory" class="default-cat-note">
        Default category set to: <strong>{{ savedDefaultCategory }}</strong> (Click it above or change anytime)
      </div>
    </div>

    <!-- State 2: When a Category IS Selected (Questions Revealed!) -->
    <section v-else class="active-category-section fade-in">
      <!-- Active Category Header & Lesson Filters -->
      <div
        class="active-cat-panel"
        :style="{
          '--active-col': currentCategoryTheme.primary,
          '--active-bg': currentCategoryTheme.bgLight,
          '--active-border': currentCategoryTheme.border
        }"
      >
        <div class="active-panel-top">
          <div class="active-cat-title-row">
            <span class="active-indicator-badge">Active Category</span>
            <h2 class="active-cat-heading">{{ selectedCategory }}</h2>
            <span class="active-count-tag">{{ filteredItems.length }} Questions</span>
          </div>

          <div class="active-top-actions">
            <!-- Pin / Unpin as default -->
            <button
              class="btn btn-secondary pin-action-btn"
              :class="{ is_default: savedDefaultCategory === selectedCategory }"
              @click="toggleDefaultCategory(selectedCategory)"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" :fill="savedDefaultCategory === selectedCategory ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span>{{ savedDefaultCategory === selectedCategory ? 'Default on launch' : 'Set as launch default' }}</span>
            </button>

            <!-- Close / Change Category Button -->
            <button class="btn btn-secondary close-cat-btn" @click="clearCategorySelection">
              ✕ Back to Board
            </button>
          </div>
        </div>

        <!-- Lesson Filter Pills for this category -->
        <div v-if="availableLessons.length > 0" class="category-lessons-bar">
          <span class="lessons-bar-label">Lessons in {{ selectedCategory }}:</span>
          <div class="lesson-pills-scroll">
            <button
              class="lesson-filter-pill"
              :class="{ active: selectedLesson === '' }"
              @click="selectedLesson = ''"
            >
              All Lessons ({{ items.filter((i) => i.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()).length }})
            </button>
            <button
              v-for="les in availableLessons"
              :key="les"
              class="lesson-filter-pill"
              :class="{ active: selectedLesson === les }"
              @click="selectedLesson = les"
            >
              <span>{{ les }}</span>
              <span class="pill-number">{{ countByLesson(les) }}</span>
            </button>
          </div>
        </div>

        <!-- Search & Control Toolbar inside Category -->
        <div class="category-toolbar">
          <div class="category-search-box">
            <svg class="cat-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              class="cat-search-input"
              :placeholder="`Search questions in ${selectedCategory}...`"
            />
            <button v-if="searchQuery" class="clear-search-btn" @click="searchQuery = ''">
              ✕
            </button>
          </div>

          <div class="category-sub-actions">
            <button
              class="btn btn-secondary opt-btn fav-btn-toggle"
              :class="{ active: favoritesOnly }"
              @click="favoritesOnly = !favoritesOnly"
              title="Show only favorites"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" :fill="favoritesOnly ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span>Favorites</span>
            </button>

            <button class="btn btn-secondary opt-btn" @click="forceExpandAll = !forceExpandAll">
              <span>{{ forceExpandAll ? 'Collapse All' : 'Expand All' }}</span>
            </button>

            <select v-model="sortBy" class="sort-select" aria-label="Sort questions">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alpha">A-Z</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Question Cards Grid (Revealed for this category) -->
      <div v-if="filteredItems.length > 0" class="cards-grid">
        <QACard
          v-for="item in filteredItems"
          :key="item.id"
          :item="item"
          :force-expanded="forceExpandAll"
          @edit="(it) => emit('edit', it)"
        />
      </div>

      <!-- Empty State if no questions match search/lesson inside this category -->
      <div v-else class="empty-state fade-in">
        <h3 class="empty-title">No questions found in {{ selectedCategory }}</h3>
        <p class="empty-desc">
          Try clearing your search query or lesson filter.
        </p>
        <div class="empty-actions">
          <button class="btn btn-secondary" @click="searchQuery = ''; selectedLesson = ''; favoritesOnly = false">
            Reset Filters
          </button>
          <button class="btn btn-primary" @click="emit('add')">
            + Add Question in {{ selectedCategory }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.board-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
}

/* Category Board Container */
.category-board-container {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.6rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.board-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.header-titles {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.board-badge-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--primary);
  background: var(--primary-light);
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-sm);
  width: fit-content;
  margin-bottom: 0.25rem;
}

.board-title {
  font-size: 1.45rem;
  font-weight: 800;
  letter-spacing: -0.015em;
  color: var(--text-main);
}

.board-subtitle {
  font-size: 0.92rem;
  color: var(--text-muted);
}

.board-header-actions {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.back-board-btn {
  font-size: 0.85rem;
  padding: 0.55rem 0.95rem;
}

.add-new-btn {
  font-size: 0.85rem;
  padding: 0.55rem 1.15rem;
}

/* Category Board Cards Grid */
.category-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.15rem;
}

@media (min-width: 600px) {
  .category-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .category-cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .category-cards-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Individual Category Card on Board */
.cat-board-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  cursor: pointer;
  user-select: none;
  position: relative;
  overflow: hidden;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.cat-card-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--cat-gradient);
  opacity: 0.85;
}

.cat-board-card:hover {
  transform: translateY(-3px);
  border-color: var(--cat-border);
  box-shadow: 0 10px 24px -6px rgba(15, 23, 42, 0.08);
}

.cat-board-card.is-active {
  border-color: var(--cat-col);
  background: var(--cat-bg);
  box-shadow: 0 0 0 2px var(--cat-col);
}

.cat-board-card.is-default {
  border-left: 4px solid #f59e0b;
}

.cat-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cat-icon-box {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: var(--cat-bg);
  color: var(--cat-col);
  border: 1px solid var(--cat-border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pin-default-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: transparent;
  border: none;
  color: var(--text-subtle);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-xs);
  transition: all 0.15s ease;
}

.pin-default-btn:hover {
  color: #f59e0b;
  background: var(--bg-hover);
}

.pin-default-btn.pinned {
  color: #d97706;
  background: rgba(245, 158, 11, 0.15);
}

.cat-card-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.35;
}

.cat-card-stats {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.cat-stat-chip {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-xs);
  background: var(--bg-subtle);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}

.cat-stat-chip.lesson-chip {
  background: var(--accent-purple-light);
  color: var(--accent-purple-text);
  border-color: rgba(139, 92, 246, 0.25);
}

.cat-card-footer {
  margin-top: auto;
  padding-top: 0.6rem;
  border-top: 1px dashed var(--border-color);
}

.view-prompt {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--cat-col);
}

/* State 1: No Category Selected Banner */
.no-selection-banner {
  text-align: center;
  padding: 3.5rem 1.5rem;
  background-color: var(--bg-surface);
  border: 1.5px dashed var(--border-color);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
}

.prompt-icon-box {
  width: 58px;
  height: 58px;
  border-radius: var(--radius-md);
  background: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.prompt-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-main);
}

.prompt-desc {
  font-size: 1rem;
  color: var(--text-muted);
  max-width: 480px;
  line-height: 1.6;
}

.default-cat-note {
  font-size: 0.85rem;
  color: var(--text-muted);
  background: var(--bg-subtle);
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-xs);
  border: 1px solid var(--border-color);
}

/* State 2: Active Category Questions Section */
.active-category-section {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.active-cat-panel {
  background-color: var(--bg-surface);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: var(--shadow-sm);
}

.active-panel-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid var(--border-color);
}

.active-cat-title-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.active-indicator-badge {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--active-bg);
  color: var(--active-col);
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-xs);
  border: 1px solid var(--active-border);
}

.active-cat-heading {
  font-size: 1.45rem;
  font-weight: 800;
  color: var(--text-main);
}

.active-count-tag {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--bg-subtle);
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
}

.active-top-actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.pin-action-btn {
  font-size: 0.82rem;
  padding: 0.45rem 0.85rem;
}

.pin-action-btn.is_default {
  background: rgba(245, 158, 11, 0.15);
  color: #b45309;
  border-color: rgba(245, 158, 11, 0.35);
}

.close-cat-btn {
  font-size: 0.82rem;
  padding: 0.45rem 0.85rem;
}

/* Category Lessons Bar */
.category-lessons-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.lessons-bar-label {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.lesson-pills-scroll {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scrollbar-width: thin;
}

.lesson-filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.85rem;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background: var(--bg-subtle);
  color: var(--text-muted);
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.15s ease;
}

.lesson-filter-pill:hover {
  background: var(--bg-hover);
  color: var(--text-main);
}

.lesson-filter-pill.active {
  background: var(--active-col);
  border-color: var(--active-col);
  color: #ffffff;
}

.pill-number {
  font-size: 0.72rem;
  background: rgba(0, 0, 0, 0.12);
  padding: 0.1rem 0.4rem;
  border-radius: var(--radius-xs);
}

.lesson-filter-pill.active .pill-number {
  background: rgba(255, 255, 255, 0.25);
  color: white;
}

/* Toolbar inside Category */
.category-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.category-search-box {
  position: relative;
  flex: 1;
  min-width: 260px;
  display: flex;
  align-items: center;
}

.cat-search-icon {
  position: absolute;
  left: 0.95rem;
  color: var(--text-subtle);
  pointer-events: none;
}

.cat-search-input {
  width: 100%;
  padding: 0.75rem 2.2rem 0.75rem 2.6rem;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  background-color: var(--bg-subtle);
  color: var(--text-main);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-md);
  outline: none;
  transition: all 0.2s ease;
}

.cat-search-input:focus {
  background-color: var(--bg-surface);
  border-color: var(--active-col);
  box-shadow: 0 0 0 3px var(--active-bg);
}

.clear-search-btn {
  position: absolute;
  right: 0.85rem;
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.2rem;
}

.category-sub-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.opt-btn {
  padding: 0.4rem 0.85rem;
  font-size: 0.82rem;
  min-height: 38px;
}

.fav-btn-toggle.active {
  background: #fef3c7;
  color: #b45309;
  border-color: #fde68a;
}

html.dark .fav-btn-toggle.active {
  background: rgba(245, 158, 11, 0.25);
  color: #fbbf24;
  border-color: rgba(245, 158, 11, 0.35);
}

.sort-select {
  padding: 0.4rem 0.85rem;
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  background-color: var(--bg-surface);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  outline: none;
  min-height: 38px;
  cursor: pointer;
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 680px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1100px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 1.5rem;
  background-color: var(--bg-surface);
  border: 1.5px dashed var(--border-color);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
}

.empty-desc {
  font-size: 0.95rem;
  color: var(--text-muted);
  max-width: 400px;
}

.empty-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
</style>
