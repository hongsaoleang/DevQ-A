<script setup lang="ts">
import { ref, watch } from 'vue'
import type { CommandItem } from '../types/lesson'

const props = defineProps<{
  isOpen: boolean
  editCommand?: CommandItem | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: { command: string; whatItDoes: string; practice: string; notes?: string }): void
}>()

const command = ref('')
const whatItDoes = ref('')
const practice = ref('')
const notes = ref('')
const errorMessage = ref('')
const autoSyncPractice = ref(true)

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      if (props.editCommand) {
        command.value = props.editCommand.command
        whatItDoes.value = props.editCommand.whatItDoes
        practice.value = props.editCommand.practice || props.editCommand.command
        notes.value = props.editCommand.notes || ''
        autoSyncPractice.value = false
      } else {
        command.value = ''
        whatItDoes.value = ''
        practice.value = ''
        notes.value = ''
        autoSyncPractice.value = true
      }
      errorMessage.value = ''
    }
  },
  { immediate: true }
)

function onCommandInput() {
  if (autoSyncPractice.value) {
    practice.value = command.value
  }
}

function onPracticeInput() {
  autoSyncPractice.value = false
}

function handleSubmit() {
  const trimmedCmd = command.value.trim()
  const trimmedWhat = whatItDoes.value.trim()
  const trimmedPractice = practice.value.trim() || trimmedCmd

  if (!trimmedCmd) {
    errorMessage.value = 'Please enter a command (e.g. pwd).'
    return
  }

  if (!trimmedWhat) {
    errorMessage.value = 'Please describe what it does (e.g. Show current directory).'
    return
  }

  emit('save', {
    command: trimmedCmd,
    whatItDoes: trimmedWhat,
    practice: trimmedPractice,
    notes: notes.value.trim() || undefined
  })
}
</script>

<template>
  <div v-if="isOpen" class="modal-backdrop" @click.self="emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <div class="header-left">
          <div class="icon-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
              <polyline points="4 17 10 11 4 5"/>
              <line x1="12" y1="19" x2="20" y2="19"/>
            </svg>
          </div>
          <div>
            <h3 class="modal-title">{{ editCommand ? 'Edit Command Row' : 'Add Command' }}</h3>
            <p class="modal-subtitle">Command, what it does, and interactive practice target</p>
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
        <!-- Command -->
        <div class="form-group">
          <label class="form-label">Command <span class="required">*</span></label>
          <div class="input-with-code">
            <span class="prompt-symbol">$</span>
            <input
              v-model="command"
              type="text"
              class="form-input mono"
              placeholder="e.g. pwd, ls -la, git status"
              autofocus
              @input="onCommandInput"
              @keydown.enter="handleSubmit"
            />
          </div>
        </div>

        <!-- What it does -->
        <div class="form-group">
          <label class="form-label">What it does / Why we use it <span class="required">*</span></label>
          <input
            v-model="whatItDoes"
            type="text"
            class="form-input"
            placeholder="e.g. Show current directory"
            @keydown.enter="handleSubmit"
          />
        </div>

        <!-- Practice Target -->
        <div class="form-group">
          <div class="label-with-hint">
            <label class="form-label">Practice Target <span class="hint-text">(What learner types to practice)</span></label>
            <button
              v-if="practice !== command"
              type="button"
              class="btn-text-action"
              @click="practice = command; autoSyncPractice = true"
            >
              Reset to Command
            </button>
          </div>
          <input
            v-model="practice"
            type="text"
            class="form-input mono"
            placeholder="Defaults to command (e.g. pwd)"
            @input="onPracticeInput"
            @keydown.enter="handleSubmit"
          />
        </div>

        <!-- Notes / Tip -->
        <div class="form-group">
          <label class="form-label">Extra Note / Hint <span class="hint-text">(Optional)</span></label>
          <input
            v-model="notes"
            type="text"
            class="form-input"
            placeholder="e.g. Print Working Directory: shows full filesystem path"
            @keydown.enter="handleSubmit"
          />
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="emit('close')">Cancel</button>
        <button type="button" class="btn btn-primary" @click="handleSubmit">
          {{ editCommand ? 'Save Row' : 'Add Command' }}
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
  max-width: 540px;
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
  background: var(--accent-emerald-light);
  color: var(--accent-emerald-text);
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
  gap: 1.2rem;
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

.required {
  color: var(--danger);
}

.hint-text {
  font-size: 0.75rem;
  font-weight: normal;
  color: var(--text-muted);
}

.label-with-hint {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-text-action {
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.btn-text-action:hover {
  text-decoration: underline;
}

.input-with-code {
  position: relative;
  display: flex;
  align-items: center;
}

.prompt-symbol {
  position: absolute;
  left: 0.85rem;
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-subtle);
  pointer-events: none;
}

.input-with-code .form-input {
  padding-left: 2rem;
}

.form-input {
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

.form-input.mono {
  font-family: var(--font-mono);
  font-size: 0.875rem;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  background: var(--bg-surface);
  box-shadow: 0 0 0 3px var(--primary-light);
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
</style>
