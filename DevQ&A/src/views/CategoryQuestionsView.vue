<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQAStore } from '../composables/useQAStore'
import type { QAItem } from '../types/qa'
import { getCategoryColor } from '../utils/colors'
import QACard from '../components/QACard.vue'

const props = defineProps<{
  name: string
}>()

const emit = defineEmits<{
  (e: 'add-question', prefillCategory?: string): void
  (e: 'edit-question', item: QAItem): void
}>()

const router = useRouter()
const { items, getLessonsForCategory, updateCategory, deleteCategory } = useQAStore()

const currentCategory = computed(() => {
  return decodeURIComponent(props.name || '')
})

// Edit category state
const showEditCategoryModal = ref(false)
const editingCategoryNewName = ref('')
const editCategoryError = ref('')
const editCategoryInputRef = ref<HTMLInputElement | null>(null)

function openEditCategoryModal() {
  editingCategoryNewName.value = currentCategory.value
  editCategoryError.value = ''
  showEditCategoryModal.value = true
  setTimeout(() => {
    editCategoryInputRef.value?.focus()
    editCategoryInputRef.value?.select()
  }, 100)
}

function closeEditCategoryModal() {
  showEditCategoryModal.value = false
  editingCategoryNewName.value = ''
  editCategoryError.value = ''
}

function handleSaveEditCategory() {
  const trimmed = editingCategoryNewName.value.trim()
  if (!trimmed) {
    editCategoryError.value = 'Please enter a category name.'
    return
  }
  const result = updateCategory(currentCategory.value, trimmed)
  if (!result.success) {
    editCategoryError.value = result.error || 'Failed to update category.'
    return
  }
  closeEditCategoryModal()
  router.replace({
    name: 'category-questions',
    params: { name: trimmed }
  })
}

// Delete category state
const showDeleteCategoryModal = ref(false)

function openDeleteCategoryModal() {
  showDeleteCategoryModal.value = true
}

function closeDeleteCategoryModal() {
  showDeleteCategoryModal.value = false
}

function handleConfirmDeleteCategory() {
  deleteCategory(currentCategory.value)
  closeDeleteCategoryModal()
  router.replace('/')
}

const theme = computed(() => {
  return getCategoryColor(currentCategory.value)
})

const availableLessons = computed(() => {
  return getLessonsForCategory(currentCategory.value)
})

const selectedLesson = ref('')
const searchQuery = ref('')
const favoritesOnly = ref(false)
const sortBy = ref<'newest' | 'oldest' | 'alpha'>('newest')
const forceExpandAll = ref(false)

function goBackToBoard() {
  router.push('/')
}

function handleAddInThisCategory() {
  emit('add-question', currentCategory.value)
}

function countByLesson(les: string) {
  return items.value.filter((i) => {
    const matchCat = i.category.trim().toLowerCase() === currentCategory.value.trim().toLowerCase()
    const matchLes = i.lesson.trim().toLowerCase() === les.trim().toLowerCase()
    return matchCat && matchLes
  }).length
}

const filteredQuestions = computed(() => {
  return items.value
    .filter((item) => {
      if (item.category.trim().toLowerCase() !== currentCategory.value.trim().toLowerCase()) {
        return false
      }

      if (favoritesOnly.value && !item.isFavorite) {
        return false
      }

      if (selectedLesson.value && item.lesson.trim().toLowerCase() !== selectedLesson.value.trim().toLowerCase()) {
        return false
      }

      if (searchQuery.value.trim()) {
        const q = searchQuery.value.trim().toLowerCase()
        const matchQ = item.question.toLowerCase().includes(q)
        const matchAEn = (item.answerEn || item.answer || '').toLowerCase().includes(q)
        const matchAKh = (item.answerKh || '').toLowerCase().includes(q)
        const matchL = item.lesson.toLowerCase().includes(q)
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

const totalQuestionsInCategory = computed(() => {
  return items.value.filter((i) => i.category.trim().toLowerCase() === currentCategory.value.trim().toLowerCase()).length
})
</script>

<template>
  <div
    class="category-questions-page fade-in"
    :style="{
      '--cat-primary': theme.primary,
      '--cat-bg': theme.bgLight,
      '--cat-border': theme.border,
      '--cat-gradient': theme.gradient
    }"
  >
    <!-- Clean Header & Actions -->
    <header class="category-header">
      <div class="header-left">
        <button class="back-link-btn" @click="goBackToBoard">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          <span>Categories</span>
        </button>

        <div class="title-row">
          <h1 class="category-heading">{{ currentCategory }}</h1>
          <span class="count-badge">{{ totalQuestionsInCategory }} questions</span>

          <div class="header-cat-actions">
            <button
              class="cat-action-btn edit-cat-btn"
              title="Edit Category Name"
              @click="openEditCategoryModal"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button
              class="cat-action-btn delete-cat-btn"
              title="Delete Category"
              @click="openDeleteCategoryModal"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="header-right">
        <button class="btn btn-primary" @click="handleAddInThisCategory">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span>Add Question</span>
        </button>
      </div>
    </header>

    <!-- Lesson Filter Pills (Direct, no repetitive label) -->
    <div v-if="availableLessons.length > 0" class="lessons-bar">
      <button
        class="lesson-chip"
        :class="{ active: selectedLesson === '' }"
        @click="selectedLesson = ''"
      >
        All Lessons ({{ totalQuestionsInCategory }})
      </button>
      <button
        v-for="les in availableLessons"
        :key="les"
        class="lesson-chip"
        :class="{ active: selectedLesson === les }"
        @click="selectedLesson = les"
      >
        <span>{{ les }}</span>
        <span class="chip-count">{{ countByLesson(les) }}</span>
      </button>
    </div>

    <!-- Search & Control Toolbar -->
    <div class="search-toolbar">
      <div class="search-box">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="Search..."
        />
        <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">
          ✕
        </button>
      </div>

      <div class="toolbar-options">
        <button
          class="btn btn-secondary opt-btn fav-opt"
          :class="{ active: favoritesOnly }"
          @click="favoritesOnly = !favoritesOnly"
          title="Favorites"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" :fill="favoritesOnly ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>

        <button class="btn btn-secondary opt-btn" @click="forceExpandAll = !forceExpandAll">
          <span>{{ forceExpandAll ? 'Collapse' : 'Expand' }}</span>
        </button>

        <select v-model="sortBy" class="sort-select" aria-label="Sort">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="alpha">A-Z</option>
        </select>
      </div>
    </div>

    <!-- Questions Grid -->
    <div v-if="filteredQuestions.length > 0" class="questions-grid">
      <QACard
        v-for="item in filteredQuestions"
        :key="item.id"
        :item="item"
        :force-expanded="forceExpandAll"
        @edit="(it) => emit('edit-question', it)"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="empty-questions fade-in">
      <p class="empty-desc">
        {{
          totalQuestionsInCategory === 0
            ? 'No questions yet.'
            : 'No matching questions found.'
        }}
      </p>
      <div class="empty-actions">
        <button v-if="searchQuery || selectedLesson || favoritesOnly" class="btn btn-secondary" @click="searchQuery = ''; selectedLesson = ''; favoritesOnly = false">
          Clear Filters
        </button>
        <button class="btn btn-primary" @click="handleAddInThisCategory">
          + Add Question
        </button>
      </div>
    </div>
    <!-- Edit Category Modal -->
    <div v-if="showEditCategoryModal" class="modal-backdrop" @click.self="closeEditCategoryModal">
      <div class="modal-dialog cat-modal-dialog fade-in" role="dialog" aria-modal="true">
        <div class="modal-header">
          <h2 class="modal-title">Edit Category</h2>
          <button class="btn btn-ghost close-btn" @click="closeEditCategoryModal" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSaveEditCategory" class="modal-body">
          <div v-if="editCategoryError" class="alert-error-mini">
            {{ editCategoryError }}
          </div>

          <div class="form-group">
            <label for="edit-category-name" class="form-label">Category Name</label>
            <input
              id="edit-category-name"
              ref="editCategoryInputRef"
              v-model="editingCategoryNewName"
              type="text"
              class="form-input"
              placeholder="Category name"
              autocomplete="off"
            />
            <p class="form-tip">
              Renaming this category will update all {{ totalQuestionsInCategory }} question(s) in this category.
            </p>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-ghost" @click="closeEditCategoryModal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Category Modal -->
    <div v-if="showDeleteCategoryModal" class="modal-backdrop" @click.self="closeDeleteCategoryModal">
      <div class="modal-dialog cat-modal-dialog fade-in" role="dialog" aria-modal="true">
        <div class="modal-header delete-modal-header">
          <div class="delete-header-info">
            <div class="delete-icon-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </div>
            <div>
              <h2 class="modal-title">Delete Category</h2>
              <p class="delete-subtitle">Are you sure you want to delete this category?</p>
            </div>
          </div>
          <button class="btn btn-ghost close-btn" @click="closeDeleteCategoryModal" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <div class="delete-target-preview">
            <span class="delete-category-badge">{{ currentCategory }}</span>
          </div>

          <div v-if="totalQuestionsInCategory > 0" class="delete-warning-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <div>
              <strong>Warning:</strong> This category contains <strong>{{ totalQuestionsInCategory }} questions</strong>. Deleting it will permanently delete this category and all its questions.
            </div>
          </div>
          <p v-else class="delete-info-text">
            This category has no questions. It will be removed from your categories list.
          </p>

          <div class="modal-footer">
            <button type="button" class="btn btn-ghost" @click="closeDeleteCategoryModal">
              Cancel
            </button>
            <button type="button" class="btn btn-danger" @click="handleConfirmDeleteCategory">
              Delete Category
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-questions-page {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Category Header */
.category-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-bottom: 0.25rem;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.back-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  width: fit-content;
  transition: color 0.15s ease;
}

.back-link-btn:hover {
  color: var(--primary);
}

.title-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.header-cat-actions {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-left: 0.25rem;
}

.cat-action-btn {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.35rem;
  border-radius: var(--radius-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  box-shadow: var(--shadow-sm);
}

.cat-action-btn:hover {
  color: var(--text-main);
  background: var(--bg-hover);
  border-color: var(--text-subtle);
}

.edit-cat-btn:hover {
  color: var(--primary);
  border-color: var(--primary);
}

.delete-cat-btn:hover {
  color: var(--danger);
  background: var(--danger-light);
  border-color: rgba(239, 68, 68, 0.3);
}

.category-heading {
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.count-badge {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--cat-primary);
  background: var(--cat-bg);
  border: 1px solid var(--cat-border);
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-xs);
}

.header-right {
  display: flex;
  align-items: center;
}

/* Lessons Bar */
.lessons-bar {
  display: flex;
  gap: 0.45rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scrollbar-width: thin;
}

.lesson-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background: var(--bg-surface);
  color: var(--text-muted);
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.15s ease;
}

.lesson-chip:hover {
  background: var(--bg-hover);
  color: var(--text-main);
}

.lesson-chip.active {
  background: var(--cat-primary);
  border-color: var(--cat-primary);
  color: #ffffff;
}

.chip-count {
  font-size: 0.7rem;
  background: rgba(0, 0, 0, 0.1);
  padding: 0.08rem 0.35rem;
  border-radius: var(--radius-xs);
}

.lesson-chip.active .chip-count {
  background: rgba(255, 255, 255, 0.25);
  color: white;
}

/* Search Toolbar */
.search-toolbar {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  box-shadow: var(--shadow-sm);
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 200px;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.85rem;
  color: var(--text-subtle);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.55rem 2rem 0.55rem 2.3rem;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  background-color: var(--bg-subtle);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  outline: none;
  transition: all 0.2s ease;
}

.search-input:focus {
  background-color: var(--bg-surface);
  border-color: var(--cat-primary);
}

.clear-btn {
  position: absolute;
  right: 0.75rem;
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.2rem;
}

.toolbar-options {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.opt-btn {
  padding: 0.4rem 0.75rem;
  font-size: 0.8rem;
  min-height: 34px;
}

.fav-opt.active {
  background: #fef3c7;
  color: #b45309;
  border-color: #fde68a;
}

html.dark .fav-opt.active {
  background: rgba(245, 158, 11, 0.25);
  color: #fbbf24;
  border-color: rgba(245, 158, 11, 0.35);
}

.sort-select {
  padding: 0.4rem 0.75rem;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  background-color: var(--bg-surface);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  outline: none;
  min-height: 34px;
  cursor: pointer;
}

/* Questions Grid */
.questions-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 680px) {
  .questions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1100px) {
  .questions-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Empty Questions */
.empty-questions {
  text-align: center;
  padding: 3rem 1.5rem;
  background-color: var(--bg-surface);
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
}

.empty-desc {
  font-size: 0.95rem;
  color: var(--text-muted);
}

.empty-actions {
  display: flex;
  gap: 0.75rem;
}

/* Modals */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  z-index: 100;
}

.cat-modal-dialog {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 440px;
  box-shadow: var(--shadow-xl);
  overflow: hidden;
}

.modal-header {
  padding: 1.2rem 1.4rem;
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-main);
}

.close-btn {
  padding: 0.35rem;
  min-height: auto;
  border-radius: var(--radius-xs);
  color: var(--text-muted);
}

.modal-body {
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.form-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-input {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: var(--bg-subtle);
  color: var(--text-main);
  outline: none;
  transition: all 0.2s ease;
  width: 100%;
}

.form-input:focus {
  border-color: var(--primary);
  background: var(--bg-surface);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.form-tip {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.4;
  margin-top: 0.15rem;
}

.alert-error-mini {
  padding: 0.6rem 0.85rem;
  background: var(--danger-light);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: var(--danger-text);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-weight: 500;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 0.5rem;
}

/* Delete Modal Specifics */
.delete-modal-header {
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.delete-header-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.delete-icon-badge {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: var(--danger-light);
  color: var(--danger);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.delete-subtitle {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-top: 0.15rem;
}

.delete-target-preview {
  display: flex;
  align-items: center;
}

.delete-category-badge {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-main);
  background: var(--bg-subtle);
  border: 1px solid var(--border-color);
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-sm);
}

.delete-warning-box {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: var(--danger-light);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: var(--radius-sm);
  color: var(--danger-text);
  font-size: 0.86rem;
  line-height: 1.5;
}

.delete-warning-box svg {
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.delete-info-text {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.btn-danger {
  background: var(--danger);
  color: #ffffff;
  border: 1px solid var(--danger);
  font-weight: 600;
  padding: 0.65rem 1.25rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-danger:hover {
  background: #dc2626;
  border-color: #dc2626;
  transform: translateY(-1px);
}
</style>
