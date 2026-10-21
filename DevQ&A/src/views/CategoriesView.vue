<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQAStore } from '../composables/useQAStore'
import { getCategoryColor } from '../utils/colors'

const router = useRouter()
const { items, categories, addCategory, updateCategory, deleteCategory } = useQAStore()

const DEFAULT_CATEGORY_KEY = 'devqa_default_category_choice'
const savedDefaultCategory = ref('')
const categorySearch = ref('')

// Add category outside
const showAddCategoryModal = ref(false)
const newCategoryName = ref('')
const addCategoryError = ref('')
const categoryInputRef = ref<HTMLInputElement | null>(null)

// Edit category
const showEditCategoryModal = ref(false)
const editingCategoryOldName = ref('')
const editingCategoryNewName = ref('')
const editCategoryError = ref('')
const editCategoryInputRef = ref<HTMLInputElement | null>(null)

// Delete category
const showDeleteCategoryModal = ref(false)
const categoryToDelete = ref('')

function openAddCategoryModal() {
  newCategoryName.value = ''
  addCategoryError.value = ''
  showAddCategoryModal.value = true
  setTimeout(() => {
    categoryInputRef.value?.focus()
  }, 100)
}

function closeAddCategoryModal() {
  showAddCategoryModal.value = false
  newCategoryName.value = ''
  addCategoryError.value = ''
}

function handleCreateCategory() {
  const trimmed = newCategoryName.value.trim()
  if (!trimmed) {
    addCategoryError.value = 'Please enter a category name.'
    return
  }
  const exists = categories.value.some((c) => c.toLowerCase() === trimmed.toLowerCase())
  if (exists) {
    addCategoryError.value = 'Category already exists.'
    return
  }

  addCategory(trimmed)
  closeAddCategoryModal()
}

function openEditCategoryModal(cat: string) {
  editingCategoryOldName.value = cat
  editingCategoryNewName.value = cat
  editCategoryError.value = ''
  showEditCategoryModal.value = true
  setTimeout(() => {
    editCategoryInputRef.value?.focus()
    editCategoryInputRef.value?.select()
  }, 100)
}

function closeEditCategoryModal() {
  showEditCategoryModal.value = false
  editingCategoryOldName.value = ''
  editingCategoryNewName.value = ''
  editCategoryError.value = ''
}

function handleSaveEditCategory() {
  const trimmed = editingCategoryNewName.value.trim()
  if (!trimmed) {
    editCategoryError.value = 'Please enter a category name.'
    return
  }
  const result = updateCategory(editingCategoryOldName.value, trimmed)
  if (!result.success) {
    editCategoryError.value = result.error || 'Failed to update category.'
    return
  }
  if (savedDefaultCategory.value === editingCategoryOldName.value) {
    savedDefaultCategory.value = trimmed
  }
  closeEditCategoryModal()
}

function openDeleteCategoryModal(cat: string) {
  categoryToDelete.value = cat
  showDeleteCategoryModal.value = true
}

function closeDeleteCategoryModal() {
  showDeleteCategoryModal.value = false
  categoryToDelete.value = ''
}

function handleConfirmDeleteCategory() {
  if (!categoryToDelete.value) return
  if (savedDefaultCategory.value === categoryToDelete.value) {
    savedDefaultCategory.value = ''
  }
  deleteCategory(categoryToDelete.value)
  closeDeleteCategoryModal()
}

onMounted(() => {
  try {
    const saved = localStorage.getItem(DEFAULT_CATEGORY_KEY)
    if (saved && categories.value.includes(saved)) {
      savedDefaultCategory.value = saved
    }
  } catch (e) {
    // ignore
  }
})

function toggleDefaultCategory(cat: string, e: Event) {
  e.stopPropagation()
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

function openCategory(cat: string) {
  router.push({
    name: 'category-questions',
    params: { name: cat }
  })
}

function getCategoryStats(cat: string) {
  const catItems = items.value.filter((i) => i.category.trim().toLowerCase() === cat.trim().toLowerCase())
  const lessonsSet = new Set(catItems.map((i) => i.lesson.trim()).filter(Boolean))
  return {
    questionCount: catItems.length,
    lessonCount: lessonsSet.size
  }
}

const filteredCategories = computed(() => {
  if (!categorySearch.value.trim()) return categories.value
  const q = categorySearch.value.trim().toLowerCase()
  return categories.value.filter((c) => c.toLowerCase().includes(q))
})

const emit = defineEmits<{
  (e: 'add-question'): void
}>()
</script>

<template>
  <div class="categories-view-page fade-in">
    <!-- Clean Minimal Header Section -->
    <header class="page-header">
      <div class="header-main">
        <h1 class="page-title">Categories</h1>
      </div>

      <div class="header-actions">
        <!-- Quick search categories -->
        <div v-if="categories.length > 3" class="search-cat-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            v-model="categorySearch"
            type="text"
            class="search-cat-input"
            placeholder="Search..."
          />
        </div>

        <button class="btn btn-secondary" @click="openAddCategoryModal">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span>Add Category</span>
        </button>

        <button class="btn btn-primary" @click="emit('add-question')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span>New Question</span>
        </button>
      </div>
    </header>

    <!-- Clean Category Cards Board -->
    <div v-if="filteredCategories.length > 0" class="category-cards-grid">
      <div
        v-for="cat in filteredCategories"
        :key="cat"
        class="category-card"
        :class="{ 'is-pinned': savedDefaultCategory === cat }"
        :style="{
          '--cat-col': getCategoryColor(cat).primary,
          '--cat-bg': getCategoryColor(cat).bgLight,
          '--cat-border': getCategoryColor(cat).border,
          '--cat-gradient': getCategoryColor(cat).gradient
        }"
        @click="openCategory(cat)"
      >
        <div class="card-top-accent"></div>

        <div class="card-inner-top">
          <div class="icon-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
            </svg>
          </div>

          <!-- Card Actions (Pin, Edit, Delete) -->
          <div class="card-action-btns">
            <!-- Pin Button -->
            <button
              class="action-btn pin-btn"
              :class="{ active: savedDefaultCategory === cat }"
              :title="savedDefaultCategory === cat ? 'Default category' : 'Set as default'"
              @click.stop="toggleDefaultCategory(cat, $event)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" :fill="savedDefaultCategory === cat ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </button>

            <!-- Edit Button -->
            <button
              class="action-btn edit-btn"
              title="Edit Category Name"
              @click.stop="openEditCategoryModal(cat)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>

            <!-- Delete Button -->
            <button
              class="action-btn delete-btn"
              title="Delete Category"
              @click.stop="openDeleteCategoryModal(cat)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>

        <h2 class="category-name">{{ cat }}</h2>

        <!-- Metrics Chips -->
        <div class="card-stats">
          <span class="stat-badge">
            {{ getCategoryStats(cat).questionCount }} questions
          </span>
          <span class="stat-badge lesson-badge">
            {{ getCategoryStats(cat).lessonCount }} lessons
          </span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-board">
      <p>No categories found.</p>
      <button class="btn btn-secondary" @click="categorySearch = ''">Clear Search</button>
    </div>

    <!-- Add Category Outside Modal -->
    <div v-if="showAddCategoryModal" class="modal-backdrop" @click.self="closeAddCategoryModal">
      <div class="modal-dialog cat-modal-dialog fade-in" role="dialog" aria-modal="true">
        <div class="modal-header">
          <h2 class="modal-title">New Category</h2>
          <button class="btn btn-ghost close-btn" @click="closeAddCategoryModal" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleCreateCategory" class="modal-body">
          <div v-if="addCategoryError" class="alert-error-mini">
            {{ addCategoryError }}
          </div>

          <div class="form-group">
            <label for="new-category-name" class="form-label">Category Name</label>
            <input
              id="new-category-name"
              ref="categoryInputRef"
              v-model="newCategoryName"
              type="text"
              class="form-input"
              placeholder="e.g. Mobile, DevOps, Security..."
              autocomplete="off"
            />
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-ghost" @click="closeAddCategoryModal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Create
            </button>
          </div>
        </form>
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
              Renaming this category will automatically update all {{ getCategoryStats(editingCategoryOldName).questionCount }} question(s) inside it.
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

    <!-- Delete Category Confirmation Modal -->
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
            <span class="delete-category-badge">{{ categoryToDelete }}</span>
          </div>

          <div v-if="getCategoryStats(categoryToDelete).questionCount > 0" class="delete-warning-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <div>
              <strong>Warning:</strong> This category contains <strong>{{ getCategoryStats(categoryToDelete).questionCount }} questions</strong>. Deleting it will permanently delete this category and all its questions.
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
.categories-view-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-main);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.search-cat-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-cat-box svg {
  position: absolute;
  left: 0.75rem;
  color: var(--text-subtle);
  pointer-events: none;
}

.search-cat-input {
  padding: 0.55rem 0.85rem 0.55rem 2.2rem;
  font-family: var(--font-sans);
  font-size: 0.86rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: var(--bg-surface);
  color: var(--text-main);
  outline: none;
  min-width: 170px;
}

.search-cat-input:focus {
  border-color: var(--primary);
}

/* Category Cards Grid */
.category-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
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

/* Card */
.category-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  cursor: pointer;
  user-select: none;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.card-top-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3.5px;
  background: var(--cat-gradient);
}

.category-card:hover {
  transform: translateY(-3px);
  border-color: var(--cat-border);
  box-shadow: 0 10px 24px -6px rgba(15, 23, 42, 0.08);
}

.category-card.is-pinned {
  border-left: 3px solid #f59e0b;
}

.card-inner-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon-box {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  background: var(--cat-bg);
  color: var(--cat-col);
  border: 1px solid var(--cat-border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-action-btns {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.action-btn {
  background: transparent;
  border: none;
  color: var(--text-subtle);
  cursor: pointer;
  padding: 0.35rem;
  border-radius: var(--radius-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.action-btn:hover {
  background: var(--bg-hover);
  color: var(--text-main);
}

.pin-btn:hover {
  color: #f59e0b;
}

.pin-btn.active {
  color: #d97706;
}

.edit-btn:hover {
  color: var(--primary);
}

.delete-btn:hover {
  color: var(--danger);
  background: var(--danger-light);
}

.category-name {
  font-size: 1.18rem;
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.card-stats {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.stat-badge {
  font-size: 0.76rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-xs);
  background: var(--bg-subtle);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}

.stat-badge.lesson-badge {
  background: var(--accent-purple-light);
  color: var(--accent-purple-text);
  border-color: rgba(139, 92, 246, 0.2);
}

.empty-board {
  text-align: center;
  padding: 3rem 1.5rem;
  background: var(--bg-surface);
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--text-muted);
}

/* Modal for Add Category */
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

.form-tip {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.4;
  margin-top: 0.15rem;
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
