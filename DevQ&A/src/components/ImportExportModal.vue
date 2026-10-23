<script setup lang="ts">
import { ref } from 'vue'
import { useQAStore } from '../composables/useQAStore'
import { useLessonStore } from '../composables/useLessonStore'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { items, customCategories, addCategory, importFromJson, resetToDefaults, clearAll } = useQAStore()
const { lessons, importLessons, resetLessonsToDefaults, clearAllLessons } = useLessonStore()

const pastedJson = ref('')
const importStatus = ref<{ success?: boolean; message?: string }>({})

function handleDownloadJson() {
  const backupData = {
    version: 2,
    exportedAt: new Date().toISOString(),
    questions: items.value,
    lessons: lessons.value,
    categories: customCategories.value
  }
  const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `devqa-backup-${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const content = e.target?.result as string
    processImport(content)
  }
  reader.readAsText(file)
}

function handlePasteImport() {
  if (!pastedJson.value.trim()) {
    importStatus.value = { success: false, message: 'Please paste JSON data first.' }
    return
  }
  processImport(pastedJson.value)
}

function processImport(jsonString: string) {
  try {
    const parsed = JSON.parse(jsonString)
    let questionsCount = 0
    let lessonsCount = 0

    // 1. If it's a version 2 backup object or has questions / lessons keys
    if (!Array.isArray(parsed) && typeof parsed === 'object' && parsed !== null) {
      if (Array.isArray(parsed.questions) || Array.isArray(parsed.items)) {
        const qList = parsed.questions || parsed.items
        const resQ = importFromJson(JSON.stringify(qList))
        if (resQ.success) questionsCount = resQ.count
      }
      if (Array.isArray(parsed.lessons)) {
        const resL = importLessons(parsed.lessons)
        if (resL.success) lessonsCount = resL.count
      }
      if (Array.isArray(parsed.categories)) {
        parsed.categories.forEach((cat: string) => {
          if (cat && typeof cat === 'string') addCategory(cat)
        })
      }

      if (questionsCount === 0 && lessonsCount === 0) {
        importStatus.value = { success: false, message: 'No valid questions or lessons found in JSON backup.' }
        return
      }

      const parts: string[] = []
      if (questionsCount > 0) parts.push(`${questionsCount} question${questionsCount === 1 ? '' : 's'}`)
      if (lessonsCount > 0) parts.push(`${lessonsCount} command lesson${lessonsCount === 1 ? '' : 's'}`)

      importStatus.value = {
        success: true,
        message: `Successfully restored ${parts.join(' and ')}!`
      }
      pastedJson.value = ''
      setTimeout(() => {
        emit('close')
      }, 1200)
      return
    }

    // 2. If it's an array: could be questions array (previous format) or lessons array
    if (Array.isArray(parsed)) {
      if (parsed.length > 0 && ('commands' in parsed[0] || 'whyWeUseIt' in parsed[0])) {
        const resL = importLessons(parsed)
        if (resL.success) {
          importStatus.value = { success: true, message: `Successfully imported ${resL.count} command lessons!` }
          pastedJson.value = ''
          setTimeout(() => emit('close'), 1200)
        } else {
          importStatus.value = { success: false, message: resL.error || 'Failed to import lessons.' }
        }
        return
      }

      // Default array: questions (previous format)
      const resQ = importFromJson(jsonString)
      if (resQ.success) {
        importStatus.value = {
          success: true,
          message: `Successfully imported ${resQ.count} questions!`
        }
        pastedJson.value = ''
        setTimeout(() => {
          emit('close')
        }, 1200)
      } else {
        importStatus.value = {
          success: false,
          message: resQ.error || 'Failed to import JSON.'
        }
      }
      return
    }

    importStatus.value = { success: false, message: 'Invalid JSON format. Expected JSON array or backup object.' }
  } catch (err: any) {
    importStatus.value = { success: false, message: err?.message || 'Invalid JSON format.' }
  }
}

function handleResetDefaults() {
  if (confirm('This will restore the original sample questions and command lessons. Proceed?')) {
    resetToDefaults()
    resetLessonsToDefaults()
    emit('close')
  }
}

function handleClearAll() {
  if (confirm('Warning: This will delete ALL questions and command lessons saved on this device. Proceed?')) {
    clearAll()
    clearAllLessons()
    emit('close')
  }
}
</script>

<template>
  <div v-if="isOpen" class="modal-backdrop" @click.self="emit('close')">
    <div class="modal-dialog fade-in" role="dialog" aria-modal="true">
      <div class="modal-header">
        <div class="header-titles">
          <h2 class="modal-title">Data Backup & Restore</h2>
          <p class="modal-subtitle">
            All your questions and command lessons are stored securely and synchronized.
          </p>
        </div>
        <button class="btn btn-ghost close-btn" @click="emit('close')" aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <!-- Status message -->
        <div
          v-if="importStatus.message"
          class="status-banner"
          :class="{ success: importStatus.success, error: !importStatus.success }"
        >
          {{ importStatus.message }}
        </div>

        <!-- Export section -->
        <div class="section-box">
          <h3 class="section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export Backup
          </h3>
          <p class="section-desc">Download a backup JSON file of all your data ({{ items.length }} questions, {{ lessons.length }} command lessons).</p>
          <button class="btn btn-primary" @click="handleDownloadJson">
            Download JSON Backup
          </button>
        </div>

        <!-- Import section -->
        <div class="section-box">
          <h3 class="section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Import Data
          </h3>
          <p class="section-desc">Upload a previously saved JSON file or paste JSON below.</p>

          <label class="file-upload-btn btn btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <span>Choose JSON File</span>
            <input type="file" accept=".json,application/json" class="hidden-input" @change="handleFileUpload" />
          </label>

          <div class="paste-area">
            <textarea
              v-model="pastedJson"
              class="paste-textarea"
              placeholder="Or paste JSON array / backup object here..."
              rows="3"
            ></textarea>
            <button
              v-if="pastedJson"
              class="btn btn-secondary import-paste-btn"
              @click="handlePasteImport"
            >
              Import Pasted JSON
            </button>
          </div>
        </div>

        <!-- Reset & Clear Section -->
        <div class="danger-section">
          <button class="btn btn-ghost" @click="handleResetDefaults">
            Restore Sample Data
          </button>
          <button class="btn btn-danger-ghost" @click="handleClearAll">
            Delete All Data
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
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
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
}

.modal-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.modal-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-main);
}

.modal-subtitle {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
}

.close-btn {
  padding: 0.4rem;
  width: 36px;
  height: 36px;
}

.modal-body {
  padding: 1.25rem 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.status-banner {
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.88rem;
  font-weight: 600;
}

.status-banner.success {
  background: var(--accent-emerald-light);
  color: var(--accent-emerald-text);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.status-banner.error {
  background: var(--danger-light);
  color: var(--danger-text);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.section-box {
  background-color: var(--bg-subtle);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-main);
}

.section-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.file-upload-btn {
  position: relative;
  align-self: flex-start;
  cursor: pointer;
}

.hidden-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.paste-area {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.paste-textarea {
  width: 100%;
  padding: 0.6rem 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  background-color: var(--bg-surface);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  resize: vertical;
  outline: none;
}

.paste-textarea:focus {
  border-color: var(--primary);
}

.import-paste-btn {
  align-self: flex-end;
}

.danger-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border-color);
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
