<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useLessonStore } from '../composables/useLessonStore'

const props = defineProps<{
  isOpen: boolean
  lessonName: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'import', items: { command: string; whatItDoes: string; practice: string; notes?: string }[]): void
}>()

const { parseBulkText } = useLessonStore()

const inputText = ref('')

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      inputText.value = `Command\tWhat it does\tpractice\npwd\tShow current directory\tpwd\nls -la\tList all files with details\tls -la\ncd ..\tGo up one folder\tcd ..`
    }
  },
  { immediate: true }
)

const parsedItems = computed(() => {
  return parseBulkText(inputText.value)
})

function handleImport() {
  if (parsedItems.value.length === 0) return
  emit('import', parsedItems.value)
}
</script>

<template>
  <div v-if="isOpen" class="modal-backdrop" @click.self="emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <div class="header-left">
          <div class="icon-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <div>
            <h3 class="modal-title">Bulk Import Commands</h3>
            <p class="modal-subtitle">Add commands to "{{ lessonName }}" by pasting text</p>
          </div>
        </div>
        <button class="btn-close" @click="emit('close')" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <div class="hint-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <span>Paste multiple lines separated by <strong>Tab</strong>, <strong>Spaces</strong>, or <strong>Pipe (|)</strong>. Format: <code>Command &nbsp; What it does &nbsp; practice</code></span>
        </div>

        <div class="form-group">
          <label class="form-label">Paste Raw Text</label>
          <textarea
            v-model="inputText"
            class="form-textarea mono"
            rows="6"
            placeholder="pwd    Show current directory    pwd&#10;ls -la    List all files    ls -la&#10;cd ..    Move up one level    cd .."
          ></textarea>
        </div>

        <!-- Live Preview -->
        <div class="preview-section">
          <div class="preview-header">
            <span class="preview-title">Live Preview ({{ parsedItems.length }} rows parsed)</span>
          </div>

          <div v-if="parsedItems.length > 0" class="preview-table-wrapper">
            <table class="preview-table">
              <thead>
                <tr>
                  <th>Command</th>
                  <th>What it does</th>
                  <th>Practice Target</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, idx) in parsedItems" :key="idx">
                  <td class="mono-cell"><code>{{ row.command }}</code></td>
                  <td>{{ row.whatItDoes || '-' }}</td>
                  <td class="mono-cell"><code>{{ row.practice }}</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="preview-empty">
            No rows parsed yet. Type or paste your commands above.
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="emit('close')">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          :disabled="parsedItems.length === 0"
          @click="handleImport"
        >
          Import {{ parsedItems.length }} Command{{ parsedItems.length === 1 ? '' : 's' }}
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
  max-width: 680px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
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
  flex-shrink: 0;
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
  background: var(--accent-purple-light);
  color: var(--accent-purple-text);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.modal-title {
  margin: 0;
  font-size: 1.125rem;
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

.modal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  overflow-y: auto;
}

.hint-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  background: var(--primary-light);
  color: var(--primary-text);
  font-size: 0.825rem;
  line-height: 1.45;
}

.hint-box code {
  background: rgba(79, 70, 229, 0.15);
  padding: 0.15rem 0.35rem;
  border-radius: var(--radius-xs);
  font-family: var(--font-mono);
  font-size: 0.8rem;
}

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

.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: var(--bg-subtle);
  color: var(--text-main);
  font-size: 0.875rem;
  resize: vertical;
}

.form-textarea.mono {
  font-family: var(--font-mono);
  white-space: pre;
}

.form-textarea:focus {
  outline: none;
  border-color: var(--primary);
  background: var(--bg-surface);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.preview-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-title {
  font-size: 0.825rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

.preview-table-wrapper {
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.preview-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.825rem;
  text-align: left;
}

.preview-table th {
  background: var(--bg-subtle);
  padding: 0.5rem 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1;
}

.preview-table td {
  padding: 0.45rem 0.75rem;
  border-bottom: 1px solid var(--border-subtle);
  color: var(--text-main);
}

.mono-cell code {
  background: var(--bg-subtle);
  padding: 0.15rem 0.4rem;
  border-radius: var(--radius-xs);
  font-family: var(--font-mono);
  color: var(--primary-text);
  font-size: 0.8rem;
}

.preview-empty {
  padding: 1.5rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.85rem;
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-md);
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-subtle);
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  background: var(--bg-subtle);
  flex-shrink: 0;
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

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: var(--bg-surface);
  color: var(--text-main);
  border-color: var(--border-color);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--bg-hover);
}

.btn-primary {
  background: var(--primary);
  color: #ffffff;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-hover);
}
</style>
