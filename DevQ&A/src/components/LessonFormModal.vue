<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useQAStore } from '../composables/useQAStore'
import type { LessonItem } from '../types/lesson'
import { getCategoryColor } from '../utils/colors'

const props = defineProps<{
  isOpen: boolean
  editLesson?: LessonItem | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: { name: string; category: string; whyWeUseIt: string }): void
}>()

const { categories } = useQAStore()

const name = ref('')
const category = ref('')
const whyWeUseIt = ref('')
const errorMessage = ref('')

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      if (props.editLesson) {
        name.value = props.editLesson.name
        category.value = props.editLesson.category || (categories.value[0] || 'General')
        whyWeUseIt.value = props.editLesson.whyWeUseIt || ''
      } else {
        name.value = ''
        category.value = categories.value[0] || 'General'
        whyWeUseIt.value = ''
      }
      errorMessage.value = ''
    }
  },
  { immediate: true }
)

function handleSubmit() {
  const trimmedName = name.value.trim()
  const trimmedWhy = whyWeUseIt.value.trim()

  if (!trimmedName) {
    errorMessage.value = 'Please provide a lesson name.'
    return
  }

  emit('save', {
    name: trimmedName,
    category: category.value || 'General',
    whyWeUseIt: trimmedWhy
  })
}
</script>

<template>
  <div v-if="isOpen" class="modal-backdrop" @click.self="emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <div class="header-left">
          <div class="icon-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
              <path d="M6 6h10"/>
              <path d="M6 10h10"/>
            </svg>
          </div>
          <div>
            <h3 class="modal-title">{{ editLesson ? 'Edit Lesson' : 'Set Up New Lesson' }}</h3>
            <p class="modal-subtitle">Define the lesson name, category, and why we use it</p>
          </div>
        </div>
        <button class="btn-close" @click="emit('close')" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div v-if="errorMessage" class="alert-error">
        {{ errorMessage }}
      </div>

      <div class="modal-body">
        <div class="form-row">
          <!-- Lesson Name -->
          <div class="form-group flex-2">
            <label class="form-label">Lesson Name <span class="required">*</span></label>
            <input
              v-model="name"
              type="text"
              class="form-input"
              placeholder="e.g. Linux Terminal Navigation, Git Basics, Docker Core..."
              autofocus
              @keydown.enter="handleSubmit"
            />
          </div>

          <!-- Category -->
          <div class="form-group flex-1">
            <label class="form-label">Category</label>
            <select v-model="category" class="form-select">
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>

        <!-- Why we use it / Text for lesson -->
        <div class="form-group">
          <div class="label-with-hint">
            <label class="form-label">Lesson Overview & Why We Use It <span class="hint-text">(Context for these commands)</span></label>
          </div>
          <textarea
            v-model="whyWeUseIt"
            class="form-textarea"
            rows="4"
            placeholder="Explain why we use these commands together and when to use them near each other (e.g. 'Terminal navigation commands let you traverse directories, inspect folder contents, and manipulate files without a GUI...')"
          ></textarea>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="emit('close')">Cancel</button>
        <button type="button" class="btn btn-primary" @click="handleSubmit">
          {{ editLesson ? 'Save Changes' : 'Create Lesson' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background-color: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-card {
  width: 100%;
  max-width: 580px;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  animation: modalEnter 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(6px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.icon-badge {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  background: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.modal-title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-main);
}

.modal-subtitle {
  margin: 0.2rem 0 0;
  font-size: 0.825rem;
  color: var(--text-muted);
}

.btn-close {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.35rem;
  border-radius: var(--radius-sm);
  display: flex;
  transition: all 0.15s ease;
}

.btn-close:hover {
  background: var(--bg-hover);
  color: var(--text-main);
}

.alert-error {
  margin: 1rem 1.5rem 0;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  background: var(--danger-light);
  color: var(--danger-text);
  font-size: 0.875rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.modal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.flex-1 { flex: 1; }
.flex-2 { flex: 2; }

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-main);
}

.required {
  color: var(--danger);
}

.hint-text {
  font-size: 0.75rem;
  font-weight: normal;
  color: var(--text-muted);
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: var(--bg-subtle);
  color: var(--text-main);
  font-size: 0.9rem;
  font-family: inherit;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary);
  background: var(--bg-surface);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.form-textarea {
  resize: vertical;
  line-height: 1.5;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-subtle);
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  background: var(--bg-subtle);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid transparent;
}

.btn-secondary {
  background: var(--bg-surface);
  color: var(--text-main);
  border-color: var(--border-color);
}

.btn-secondary:hover {
  background: var(--bg-hover);
}

.btn-primary {
  background: var(--primary);
  color: #ffffff;
}

.btn-primary:hover {
  background: var(--primary-hover);
}

@media (max-width: 640px) {
  .form-row {
    flex-direction: column;
  }
}
</style>
