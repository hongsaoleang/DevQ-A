<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { useQAStore } from '../composables/useQAStore'
import type { QAItem } from '../types/qa'
import { getCategoryColor } from '../utils/colors'

const props = defineProps<{
  isOpen: boolean
  editItem?: QAItem | null
  initialCategory?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'saved', item: QAItem): void
}>()

const { categories, getLessonsForCategory, addItem, updateItem, addCategory } = useQAStore()

const categorySelect = ref('')
const isCustomCategory = ref(false)
const customCategoryInput = ref('')
const isDropdownOpen = ref(false)
const dropdownContainerRef = ref<HTMLElement | null>(null)

const lesson = ref('')
const question = ref('')
const answerEn = ref('')
const answerKh = ref('')

const errorMessage = ref('')

const activeCategory = computed(() => {
  if (isCustomCategory.value) {
    return customCategoryInput.value.trim()
  }
  return categorySelect.value.trim()
})

const suggestedLessons = computed(() => {
  return getLessonsForCategory(activeCategory.value)
})

function selectCategory(cat: string) {
  categorySelect.value = cat
  isCustomCategory.value = false
  isDropdownOpen.value = false
}

function startCreateNewCategory() {
  isCustomCategory.value = true
  isDropdownOpen.value = false
  customCategoryInput.value = ''
}

function cancelCustomCategory() {
  isCustomCategory.value = false
  if (!categories.value.includes(categorySelect.value) && categories.value.length > 0) {
    categorySelect.value = categories.value[0] || 'Backend'
  }
}

function confirmCustomCategory() {
  const trimmed = customCategoryInput.value.trim()
  if (trimmed) {
    addCategory(trimmed)
    categorySelect.value = trimmed
    isCustomCategory.value = false
  }
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownContainerRef.value && !dropdownContainerRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      isDropdownOpen.value = false
      errorMessage.value = ''
      if (props.editItem) {
        const itemCat = props.editItem.category || ''
        if (categories.value.includes(itemCat)) {
          categorySelect.value = itemCat
          isCustomCategory.value = false
          customCategoryInput.value = ''
        } else {
          categorySelect.value = '__custom__'
          isCustomCategory.value = true
          customCategoryInput.value = itemCat
        }
        lesson.value = props.editItem.lesson
        question.value = props.editItem.question
        answerEn.value = props.editItem.answerEn || props.editItem.answer || ''
        answerKh.value = props.editItem.answerKh || ''
      } else {
        if (props.initialCategory && categories.value.includes(props.initialCategory)) {
          categorySelect.value = props.initialCategory
          isCustomCategory.value = false
        } else if (categories.value.length > 0) {
          categorySelect.value = categories.value[0] || 'Backend'
          isCustomCategory.value = false
        } else {
          categorySelect.value = 'General'
          isCustomCategory.value = false
        }
        customCategoryInput.value = ''
        if (!lesson.value) lesson.value = ''
        question.value = ''
        answerEn.value = ''
        answerKh.value = ''
      }
    }
  },
  { immediate: true }
)

function handleSave(andAddAnother = false) {
  errorMessage.value = ''

  const finalCat = activeCategory.value || 'General'
  if (!finalCat) {
    errorMessage.value = 'Please select or enter a category.'
    return
  }

  if (!question.value.trim()) {
    errorMessage.value = 'Please enter a question.'
    return
  }

  if (!answerEn.value.trim() && !answerKh.value.trim()) {
    errorMessage.value = 'Please enter at least one definition (English or Khmer).'
    return
  }

  // Ensure category is registered
  addCategory(finalCat)

  const payload = {
    category: finalCat,
    lesson: lesson.value.trim() || 'General Lesson',
    question: question.value.trim(),
    answerEn: answerEn.value.trim(),
    answerKh: answerKh.value.trim()
  }

  if (props.editItem) {
    updateItem(props.editItem.id, payload)
    emit('saved', { ...props.editItem, ...payload })
    emit('close')
  } else {
    const created = addItem(payload)
    emit('saved', created)

    if (andAddAnother) {
      question.value = ''
      answerEn.value = ''
      answerKh.value = ''
    } else {
      emit('close')
    }
  }
}
</script>

<template>
  <div v-if="isOpen" class="modal-backdrop" @click.self="emit('close')">
    <div class="modal-dialog fade-in" role="dialog" aria-modal="true">
      <!-- Clean Minimal Header -->
      <div class="modal-header">
        <h2 class="modal-title">{{ editItem ? 'Edit Question' : 'New Question' }}</h2>
        <button class="btn btn-ghost close-btn" @click="emit('close')" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Error alert -->
      <div v-if="errorMessage" class="alert alert-error">
        {{ errorMessage }}
      </div>

      <!-- Form Body -->
      <div class="modal-body">
        <div class="form-row-2">
          <!-- Category Selection -->
          <div class="form-group category-select-group" ref="dropdownContainerRef">
            <div class="form-label-row">
              <label class="form-label">Category</label>
              <button
                v-if="!isCustomCategory"
                type="button"
                class="btn-text-action"
                @click="startCreateNewCategory"
              >
                + New
              </button>
              <button
                v-else
                type="button"
                class="btn-text-action"
                @click="cancelCustomCategory"
              >
                Select Existing
              </button>
            </div>

            <!-- Custom Styled Select Trigger & Menu -->
            <div v-if="!isCustomCategory" class="custom-select-box">
              <button
                type="button"
                class="custom-select-trigger"
                :class="{ 'is-open': isDropdownOpen }"
                @click="isDropdownOpen = !isDropdownOpen"
              >
                <div class="trigger-left">
                  <span
                    class="category-color-dot"
                    :style="{
                      backgroundColor: getCategoryColor(categorySelect).primary,
                      boxShadow: `0 0 8px ${getCategoryColor(categorySelect).primary}55`
                    }"
                  ></span>
                  <span class="trigger-text">{{ categorySelect || 'Select Category' }}</span>
                </div>
                <svg
                  class="chevron-icon"
                  :class="{ rotated: isDropdownOpen }"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.3"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div v-if="isDropdownOpen" class="custom-dropdown-menu fade-in">
                <div class="dropdown-items-scroll">
                  <div
                    v-for="cat in categories"
                    :key="cat"
                    class="dropdown-option"
                    :class="{ active: categorySelect === cat }"
                    @click="selectCategory(cat)"
                  >
                    <div class="option-left">
                      <span
                        class="option-dot"
                        :style="{ backgroundColor: getCategoryColor(cat).primary }"
                      ></span>
                      <span class="option-title">{{ cat }}</span>
                    </div>

                    <svg
                      v-if="categorySelect === cat"
                      class="check-icon"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.8"
                    >
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                </div>

                <div class="dropdown-divider"></div>

                <button
                  type="button"
                  class="dropdown-option new-cat-option"
                  @click="startCreateNewCategory"
                >
                  <div class="option-left">
                    <span class="new-plus-badge">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </span>
                    <span class="new-cat-text">New Category...</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- Custom Category Input -->
            <div v-else class="custom-cat-input-row">
              <input
                id="qa-category-custom"
                v-model="customCategoryInput"
                type="text"
                class="form-input"
                placeholder="Enter category name..."
                autofocus
                @keydown.enter.prevent="confirmCustomCategory"
              />
              <button
                type="button"
                class="btn-icon-cancel"
                title="Cancel"
                @click="cancelCustomCategory"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Lesson Input -->
          <div class="form-group">
            <label for="qa-lesson" class="form-label">Lesson</label>
            <input
              id="qa-lesson"
              v-model="lesson"
              list="lesson-suggestions"
              type="text"
              class="form-input"
              placeholder="Lesson name"
            />
            <datalist id="lesson-suggestions">
              <option v-for="les in suggestedLessons" :key="les" :value="les" />
            </datalist>
          </div>
        </div>

        <!-- Question Input -->
        <div class="form-group">
          <label for="qa-question" class="form-label">Question</label>
          <textarea
            id="qa-question"
            v-model="question"
            rows="2"
            class="form-textarea"
            placeholder="Type your question..."
          ></textarea>
        </div>

        <!-- English Definition -->
        <div class="form-group">
          <label for="qa-answer-en" class="form-label">
            <span>🇬🇧 English Definition</span>
          </label>
          <textarea
            id="qa-answer-en"
            v-model="answerEn"
            rows="3"
            class="form-textarea"
            placeholder="English definition..."
          ></textarea>
        </div>

        <!-- Khmer Definition -->
        <div class="form-group">
          <label for="qa-answer-kh" class="form-label">
            <span>🇰🇭 ភាសាខ្មែរ</span>
          </label>
          <textarea
            id="qa-answer-kh"
            v-model="answerKh"
            rows="3"
            class="form-textarea khmer-text"
            placeholder="និយមន័យជាភាសាខ្មែរ..."
          ></textarea>
        </div>
      </div>

      <!-- Clean Modal Footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="emit('close')">
          Cancel
        </button>

        <div class="footer-save-group">
          <button
            v-if="!editItem"
            type="button"
            class="btn btn-secondary"
            @click="handleSave(true)"
          >
            Save & Add Another
          </button>

          <button
            type="button"
            class="btn btn-primary"
            @click="handleSave(false)"
          >
            {{ editItem ? 'Save Changes' : 'Save' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}

.modal-dialog {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-width: 580px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.modal-header {
  padding: 1.15rem 1.4rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: -0.01em;
}

.close-btn {
  padding: 0.35rem;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-xs);
}

.alert {
  padding: 0.65rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 500;
}

.alert-error {
  background: var(--danger-light);
  color: var(--danger-text);
  border-bottom: 1px solid rgba(239, 68, 68, 0.2);
}

.modal-body {
  padding: 1.25rem 1.4rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row-2 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.85rem;
}

@media (min-width: 640px) {
  .form-row-2 {
    grid-template-columns: 1fr 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.category-select-group {
  position: relative;
}

.form-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-text-action {
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.15s ease;
}

.btn-text-action:hover {
  text-decoration: underline;
  opacity: 0.85;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-main);
}

/* Custom Category Dropdown Trigger */
.custom-select-box {
  position: relative;
  width: 100%;
}

.custom-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.62rem 0.85rem;
  font-family: var(--font-sans);
  background-color: var(--bg-subtle);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}

.custom-select-trigger:hover {
  background-color: var(--bg-hover);
  border-color: var(--text-subtle);
}

.custom-select-trigger.is-open {
  border-color: var(--primary);
  background-color: var(--bg-surface);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.trigger-left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
}

.category-color-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
}

.trigger-text {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-main);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chevron-icon {
  color: var(--text-muted);
  flex-shrink: 0;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.chevron-icon.rotated {
  transform: rotate(180deg);
  color: var(--primary);
}

/* Dropdown Menu Panel */
.custom-dropdown-menu {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  right: 0;
  z-index: 100;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xl);
  padding: 0.35rem;
}

.dropdown-items-scroll {
  max-height: 190px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.dropdown-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.52rem 0.75rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: all 0.12s ease;
  border: 1px solid transparent;
  width: 100%;
  background: none;
  text-align: left;
}

.dropdown-option:hover {
  background-color: var(--bg-hover);
}

.dropdown-option.active {
  background-color: var(--primary-light);
  border-color: rgba(99, 102, 241, 0.25);
}

.option-left {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.option-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.option-title {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-main);
}

.dropdown-option.active .option-title {
  color: var(--primary);
}

.check-icon {
  color: var(--primary);
  flex-shrink: 0;
}

.dropdown-divider {
  height: 1px;
  background-color: var(--border-subtle);
  margin: 0.3rem 0;
}

.new-cat-option {
  color: var(--primary);
}

.new-plus-badge {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.new-cat-text {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary);
}

/* Custom Category Input Mode */
.custom-cat-input-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.btn-icon-cancel {
  background: var(--bg-subtle);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.btn-icon-cancel:hover {
  background: var(--bg-hover);
  color: var(--danger);
  border-color: var(--danger-light);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.6rem 0.8rem;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  background-color: var(--bg-subtle);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  outline: none;
  transition: all 0.15s ease;
}

.form-input:focus,
.form-textarea:focus {
  background-color: var(--bg-surface);
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.khmer-text {
  font-family: var(--font-khmer);
  line-height: 1.6;
}

.form-textarea {
  resize: vertical;
}

.modal-footer {
  padding: 0.85rem 1.4rem;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-surface);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.footer-save-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

@media (max-width: 480px) {
  .modal-footer {
    flex-direction: column-reverse;
    align-items: stretch;
  }
  .footer-save-group {
    flex-direction: column-reverse;
    width: 100%;
  }
  .modal-footer button {
    width: 100%;
  }
}
</style>
