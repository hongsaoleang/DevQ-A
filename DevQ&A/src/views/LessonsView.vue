<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useLessonStore } from '../composables/useLessonStore'
import type { LessonItem, CommandItem } from '../types/lesson'
import { getCategoryColor } from '../utils/colors'
import LessonFormModal from '../components/LessonFormModal.vue'
import CommandFormModal from '../components/CommandFormModal.vue'
import BulkCommandImportModal from '../components/BulkCommandImportModal.vue'

const {
  lessons,
  currentLessonId,
  currentLesson,
  syncStatus,
  selectLesson,
  addLesson,
  updateLesson,
  deleteLesson,
  addCommand,
  updateCommand,
  deleteCommand,
  addBulkCommands
} = useLessonStore()

// Practice input values mapped by command id
const practiceInputs = ref<Record<string, string>>({})
const revealedHints = ref<Record<string, boolean>>({})

// Modals
const showLessonModal = ref(false)
const editingLesson = ref<LessonItem | null>(null)

const showCommandModal = ref(false)
const editingCommand = ref<CommandItem | null>(null)

const showBulkModal = ref(false)
const showDeleteConfirm = ref(false)
const lessonToDelete = ref<LessonItem | null>(null)

// References to input elements for auto-advancing on Enter
const inputRefs = ref<Record<string, HTMLInputElement | null>>({})

function setInputRef(el: any, id: string) {
  if (el) {
    inputRefs.value[id] = el
  }
}

// Check practice status
function isPracticeCorrect(cmd: CommandItem): boolean {
  const input = (practiceInputs.value[cmd.id] || '').trim()
  const target = (cmd.practice || cmd.command).trim()
  return input === target
}

function isPracticeTypo(cmd: CommandItem): boolean {
  const input = (practiceInputs.value[cmd.id] || '').trim()
  const target = (cmd.practice || cmd.command).trim()
  if (!input) return false
  return !target.startsWith(input)
}

const completedCount = computed(() => {
  if (!currentLesson.value) return 0
  return currentLesson.value.commands.filter((c) => isPracticeCorrect(c)).length
})

const totalCount = computed(() => {
  return currentLesson.value?.commands.length || 0
})

const progressPercent = computed(() => {
  if (totalCount.value === 0) return 0
  return Math.round((completedCount.value / totalCount.value) * 100)
})

function resetPractice() {
  practiceInputs.value = {}
  revealedHints.value = {}
}

function toggleHint(cmdId: string) {
  revealedHints.value[cmdId] = !revealedHints.value[cmdId]
}

function handlePracticeEnter(currentCmdId: string, currentIndex: number) {
  const currentCmd = currentLesson.value?.commands[currentIndex]
  if (currentCmd && isPracticeCorrect(currentCmd)) {
    // Jump to next command input
    const nextCmd = currentLesson.value?.commands[currentIndex + 1]
    if (nextCmd && inputRefs.value[nextCmd.id]) {
      inputRefs.value[nextCmd.id]?.focus()
      inputRefs.value[nextCmd.id]?.select()
    }
  }
}

// Copy command helper
const copiedId = ref<string | null>(null)
async function copyCommand(cmd: CommandItem) {
  try {
    await navigator.clipboard.writeText(cmd.command)
    copiedId.value = cmd.id
    setTimeout(() => {
      if (copiedId.value === cmd.id) copiedId.value = null
    }, 1500)
  } catch {}
}

// Lesson Modal Handlers
function openNewLessonModal() {
  editingLesson.value = null
  showLessonModal.value = true
}

function openEditLessonModal(lesson: LessonItem) {
  editingLesson.value = lesson
  showLessonModal.value = true
}

function handleSaveLesson(payload: { name: string; category: string; whyWeUseIt: string }) {
  if (editingLesson.value) {
    updateLesson(editingLesson.value.id, payload)
  } else {
    addLesson(payload.name, payload.whyWeUseIt, payload.category)
  }
  showLessonModal.value = false
  editingLesson.value = null
}

function promptDeleteLesson(lesson: LessonItem) {
  lessonToDelete.value = lesson
  showDeleteConfirm.value = true
}

function confirmDeleteLesson() {
  if (lessonToDelete.value) {
    deleteLesson(lessonToDelete.value.id)
  }
  showDeleteConfirm.value = false
  lessonToDelete.value = null
}

// Command Modal Handlers
function openAddCommandModal() {
  editingCommand.value = null
  showCommandModal.value = true
}

function openEditCommandModal(cmd: CommandItem) {
  editingCommand.value = cmd
  showCommandModal.value = true
}

function handleSaveCommand(payload: { command: string; whatItDoes: string; practice: string; notes?: string }) {
  if (!currentLesson.value) return

  if (editingCommand.value) {
    updateCommand(currentLesson.value.id, editingCommand.value.id, payload)
  } else {
    addCommand(currentLesson.value.id, payload)
  }
  showCommandModal.value = false
  editingCommand.value = null
}

function handleDeleteCommand(cmdId: string) {
  if (!currentLesson.value) return
  deleteCommand(currentLesson.value.id, cmdId)
}

// Bulk Import
function handleBulkImport(items: { command: string; whatItDoes: string; practice: string; notes?: string }[]) {
  if (!currentLesson.value) return
  addBulkCommands(currentLesson.value.id, items)
  showBulkModal.value = false
}
</script>

<template>
  <div class="lessons-container">
    <!-- Top Action Bar -->
    <div class="page-topbar">
      <div class="topbar-left">
        <h1 class="page-title">Command Lessons</h1>
      </div>

      <div class="topbar-right">
        <button class="btn btn-primary" @click="openNewLessonModal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span>New Lesson</span>
        </button>
      </div>
    </div>

    <!-- Lesson Selection Tabs -->
    <div v-if="lessons.length > 0" class="lesson-tabs-wrapper">
      <div class="lesson-tabs-scroll">
        <button
          v-for="l in lessons"
          :key="l.id"
          class="lesson-tab-btn"
          :class="{ active: currentLesson?.id === l.id }"
          @click="selectLesson(l.id)"
        >
          <span
            class="tab-color-dot"
            :style="{ backgroundColor: getCategoryColor(l.category || 'General').primary }"
          ></span>
          <span class="tab-name">{{ l.name }}</span>
          <span class="tab-count">{{ l.commands.length }}</span>
        </button>

        <button class="lesson-tab-add" @click="openNewLessonModal" title="Create New Lesson">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span>New</span>
        </button>
      </div>
    </div>

    <!-- Empty State when no lessons -->
    <div v-if="!currentLesson" class="empty-state-card">
      <div class="empty-icon-box">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
          <path d="M6 6h10"/>
          <path d="M6 10h10"/>
        </svg>
      </div>
      <h2>No Lessons Yet</h2>
      <p>Set up your first lesson to group commands together and practice them side-by-side.</p>
      <button class="btn btn-primary" @click="openNewLessonModal">Create Your First Lesson</button>
    </div>

    <!-- Active Lesson View -->
    <div v-else class="lesson-main-card">
      <!-- Lesson Header Info -->
      <div class="lesson-header">
        <div class="lesson-title-area">
          <div class="title-with-tag">
            <h2 class="active-lesson-title">{{ currentLesson.name }}</h2>
            <span
              class="category-tag"
              :style="{
                backgroundColor: getCategoryColor(currentLesson.category || 'General').bgLight,
                color: getCategoryColor(currentLesson.category || 'General').primary,
                borderColor: getCategoryColor(currentLesson.category || 'General').border
              }"
            >
              {{ currentLesson.category || 'General' }}
            </span>
          </div>
          <span class="commands-stat">{{ currentLesson.commands.length }} Commands in this lesson</span>
        </div>

        <div class="lesson-actions">
          <button class="btn btn-secondary btn-sm" @click="openEditLessonModal(currentLesson)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            <span>Edit Lesson</span>
          </button>
          <button class="btn btn-danger-ghost btn-sm" @click="promptDeleteLesson(currentLesson)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Why We Use It / Lesson Text Callout -->
      <div class="why-use-it-card">
        <div class="why-header">
          <div class="why-title-left">
            <div class="why-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </div>
            <span class="why-heading">Why We Use It</span>
          </div>
          <button class="btn-text-edit" @click="openEditLessonModal(currentLesson)">
            Edit Notes
          </button>
        </div>
        <p class="why-body">
          {{ currentLesson.whyWeUseIt || 'No lesson notes added yet.' }}
        </p>
      </div>

      <!-- Practice Progress Tracker Bar -->
      <div class="practice-tracker-bar">
        <div class="tracker-info">
          <span class="tracker-label">Practice Mastery</span>
          <span class="tracker-score">
            <strong>{{ completedCount }}</strong> of {{ totalCount }} completed ({{ progressPercent }}%)
          </span>
        </div>
        <div class="progress-bar-bg">
          <div
            class="progress-bar-fill"
            :style="{ width: progressPercent + '%' }"
            :class="{ full: progressPercent === 100 }"
          ></div>
        </div>
        <div class="tracker-actions">
          <span class="keyboard-tip">
            <kbd>Enter</kbd> advances to next practice row
          </span>
          <button
            v-if="completedCount > 0"
            class="btn-reset"
            @click="resetPractice"
            title="Reset typing practice inputs"
          >
            Reset Practice
          </button>
        </div>
      </div>

      <!-- Side-by-Side Commands Table -->
      <div class="table-container">
        <div class="table-top-controls">
          <div class="table-title-group">
            <h3 class="table-title">Commands & Practice</h3>
          </div>
          <div class="table-buttons">
            <button class="btn btn-secondary btn-sm" @click="showBulkModal = true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <span>Bulk Import Text</span>
            </button>
            <button class="btn btn-primary btn-sm" @click="openAddCommandModal">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <span>Add Command</span>
            </button>
          </div>
        </div>

        <div v-if="currentLesson.commands.length === 0" class="empty-table-card">
          <p>No commands in this lesson yet.</p>
          <div class="empty-btns">
            <button class="btn btn-primary btn-sm" @click="openAddCommandModal">Add Single Command</button>
            <button class="btn btn-secondary btn-sm" @click="showBulkModal = true">Paste Multiple Commands</button>
          </div>
        </div>

        <div v-else class="table-responsive">
          <table class="commands-table">
            <thead>
              <tr>
                <th class="th-command">Command</th>
                <th class="th-does">What it does / Why we use it</th>
                <th class="th-practice">Practice Hands-On</th>
                <th class="th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(cmd, index) in currentLesson.commands"
                :key="cmd.id"
                class="command-row"
                :class="{ 'row-matched': isPracticeCorrect(cmd) }"
              >
                <!-- Column 1: Command -->
                <td class="td-command">
                  <div class="command-badge-wrapper">
                    <code class="command-code">
                      <span class="cmd-prompt">$</span> {{ cmd.command }}
                    </code>
                    <button
                      class="btn-copy"
                      :class="{ copied: copiedId === cmd.id }"
                      @click="copyCommand(cmd)"
                      :title="copiedId === cmd.id ? 'Copied!' : 'Copy command'"
                    >
                      <svg v-if="copiedId === cmd.id" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                      </svg>
                    </button>
                  </div>
                  <div v-if="cmd.notes" class="cmd-note">
                    {{ cmd.notes }}
                  </div>
                </td>

                <!-- Column 2: What it does -->
                <td class="td-does">
                  <span class="what-it-does-text">{{ cmd.whatItDoes }}</span>
                </td>

                <!-- Column 3: Practice -->
                <td class="td-practice">
                  <div class="practice-box">
                    <div
                      class="practice-input-wrap"
                      :class="{
                        matched: isPracticeCorrect(cmd),
                        typo: isPracticeTypo(cmd)
                      }"
                    >
                      <span class="practice-prompt-prefix">$</span>
                      <input
                        :ref="(el) => setInputRef(el, cmd.id)"
                        v-model="practiceInputs[cmd.id]"
                        type="text"
                        class="practice-input"
                        :placeholder="`Type '${cmd.practice || cmd.command}'...`"
                        autocomplete="off"
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                        @keydown.enter="handlePracticeEnter(cmd.id, index)"
                      />

                      <!-- Success Checkmark -->
                      <span v-if="isPracticeCorrect(cmd)" class="practice-badge-success" title="Correct!">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </span>

                      <!-- Peek/Hint button -->
                      <button
                        v-else
                        type="button"
                        class="btn-hint"
                        :class="{ active: revealedHints[cmd.id] }"
                        @click="toggleHint(cmd.id)"
                        :title="revealedHints[cmd.id] ? 'Hide hint' : 'Peek target command'"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </button>
                    </div>

                    <!-- Revealed hint label -->
                    <div v-if="revealedHints[cmd.id] && !isPracticeCorrect(cmd)" class="hint-popup">
                      <span>Target: <code>{{ cmd.practice || cmd.command }}</code></span>
                    </div>
                  </div>
                </td>

                <!-- Column 4: Actions -->
                <td class="td-actions">
                  <div class="row-actions">
                    <button class="btn-icon" title="Edit row" @click="openEditCommandModal(cmd)">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 20h9"/>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                      </svg>
                    </button>
                    <button class="btn-icon btn-icon-danger" title="Delete row" @click="handleDeleteCommand(cmd.id)">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <LessonFormModal
      :is-open="showLessonModal"
      :edit-lesson="editingLesson"
      @close="showLessonModal = false"
      @save="handleSaveLesson"
    />

    <CommandFormModal
      :is-open="showCommandModal"
      :edit-command="editingCommand"
      @close="showCommandModal = false"
      @save="handleSaveCommand"
    />

    <BulkCommandImportModal
      :is-open="showBulkModal"
      :lesson-name="currentLesson?.name || ''"
      @close="showBulkModal = false"
      @import="handleBulkImport"
    />

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="modal-backdrop" @click.self="showDeleteConfirm = false">
      <div class="modal-card-small">
        <div class="modal-body-small">
          <div class="warn-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <h3>Delete Lesson?</h3>
          <p>Are you sure you want to delete "<strong>{{ lessonToDelete?.name }}</strong>" and all its {{ lessonToDelete?.commands.length }} commands?</p>
        </div>
        <div class="modal-footer-small">
          <button class="btn btn-secondary" @click="showDeleteConfirm = false">Cancel</button>
          <button class="btn btn-danger" @click="confirmDeleteLesson">Delete Lesson</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lessons-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 3rem;
}

/* Page Topbar */
.page-topbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.topbar-left {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.page-heading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.page-title {
  margin: 0;
  font-size: 1.65rem;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.02em;
}

.page-badges {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-full);
}

.badge-subtle {
  background: var(--bg-subtle);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}

.sync-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-full);
  background: var(--bg-subtle);
  border: 1px solid var(--border-color);
  font-size: 0.725rem;
  font-weight: 600;
  color: var(--text-muted);
}

.sync-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--text-subtle);
}

.sync-dot.synced {
  background: #10b981;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.5);
}

.sync-dot.syncing {
  background: #f59e0b;
}

.page-description {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
  max-width: 720px;
  line-height: 1.45;
}

/* Tabs */
.lesson-tabs-wrapper {
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.lesson-tabs-scroll {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  min-width: max-content;
}

.lesson-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.95rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  background: var(--bg-surface);
  color: var(--text-main);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.lesson-tab-btn:hover {
  background: var(--bg-subtle);
  border-color: var(--border-focus);
}

.lesson-tab-btn.active {
  background: var(--primary-light);
  color: var(--primary);
  border-color: var(--primary);
  box-shadow: 0 0 0 1px var(--primary);
}

.tab-color-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.tab-count {
  font-size: 0.725rem;
  padding: 0.1rem 0.4rem;
  border-radius: var(--radius-sm);
  background: var(--bg-subtle);
  color: var(--text-muted);
}

.lesson-tab-btn.active .tab-count {
  background: rgba(79, 70, 229, 0.15);
  color: var(--primary);
}

.lesson-tab-add {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.55rem 0.85rem;
  border-radius: var(--radius-lg);
  border: 1px dashed var(--border-color);
  background: transparent;
  color: var(--text-muted);
  font-size: 0.825rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.lesson-tab-add:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-light);
}

/* Empty State */
.empty-state-card {
  padding: 4rem 2rem;
  text-align: center;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-icon-box {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-xl);
  background: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Active Lesson Main Card */
.lesson-main-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.title-with-tag {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.active-lesson-title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-main);
}

.category-tag {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
}

.commands-stat {
  font-size: 0.825rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
  display: block;
}

.lesson-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Why We Use It Box */
.why-use-it-card {
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(139, 92, 246, 0.03) 100%);
  border: 1px solid rgba(79, 70, 229, 0.15);
  border-left: 4px solid var(--primary);
  border-radius: var(--radius-lg);
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.why-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.why-title-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.why-icon {
  color: var(--primary);
  display: flex;
}

.why-heading {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--primary-text);
}

.btn-text-edit {
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.775rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.btn-text-edit:hover {
  text-decoration: underline;
}

.why-body {
  margin: 0;
  font-size: 0.925rem;
  line-height: 1.55;
  color: var(--text-main);
}

/* Practice Progress Tracker Bar */
.practice-tracker-bar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: var(--bg-subtle);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 0.85rem 1.15rem;
}

.tracker-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.825rem;
}

.tracker-label {
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.tracker-score {
  color: var(--text-main);
}

.progress-bar-bg {
  width: 100%;
  height: 8px;
  background: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--primary-gradient);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-bar-fill.full {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.tracker-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.775rem;
  color: var(--text-muted);
}

.keyboard-tip kbd {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 3px;
  padding: 0.1rem 0.35rem;
  font-size: 0.725rem;
  font-family: var(--font-mono);
  box-shadow: 0 1px 1px rgba(0,0,0,0.06);
}

.btn-reset {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.775rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-reset:hover {
  color: var(--primary);
  text-decoration: underline;
}

/* Table Controls */
.table-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.table-top-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 0.5rem;
}

.table-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-main);
}

.table-subtitle {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.table-buttons {
  display: flex;
  gap: 0.5rem;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
}

/* Commands Table */
.commands-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.875rem;
}

.commands-table th {
  background: var(--bg-subtle);
  padding: 0.75rem 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-color);
}

.th-command { width: 26%; }
.th-does { width: 34%; }
.th-practice { width: 32%; }
.th-actions { width: 8%; text-align: right; }

.command-row {
  border-bottom: 1px solid var(--border-subtle);
  transition: background-color 0.15s ease;
}

.command-row:last-child {
  border-bottom: none;
}

.command-row:hover {
  background: var(--bg-subtle);
}

.command-row.row-matched {
  background: rgba(16, 185, 129, 0.04);
}

.commands-table td {
  padding: 0.85rem 1rem;
  vertical-align: middle;
}

/* Column 1: Command Badge */
.command-badge-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--bg-subtle);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 0.25rem 0.5rem;
  max-width: 100%;
}

.command-code {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary-text);
  word-break: break-all;
}

.cmd-prompt {
  color: var(--text-subtle);
  user-select: none;
  font-weight: normal;
}

.btn-copy {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  border-radius: var(--radius-xs);
  transition: all 0.15s ease;
}

.btn-copy:hover {
  background: var(--bg-hover);
  color: var(--text-main);
}

.btn-copy.copied {
  color: #10b981;
}

.cmd-note {
  margin-top: 0.35rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.35;
}

/* Column 2: What it does */
.what-it-does-text {
  color: var(--text-main);
  line-height: 1.45;
  display: block;
}

/* Column 3: Practice Input */
.practice-box {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 100%;
}

.practice-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-subtle);
  transition: all 0.15s ease;
}

.practice-input-wrap:focus-within {
  border-color: var(--primary);
  background: var(--bg-surface);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.practice-input-wrap.matched {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.08);
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.practice-input-wrap.typo:not(.matched) {
  border-color: #f43f5e;
  box-shadow: 0 0 0 2px rgba(244, 63, 94, 0.15);
}

.practice-prompt-prefix {
  padding-left: 0.65rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-subtle);
  user-select: none;
}

.practice-input {
  width: 100%;
  padding: 0.5rem 0.5rem;
  border: none;
  background: transparent;
  color: var(--text-main);
  font-family: var(--font-mono);
  font-size: 0.85rem;
}

.practice-input:focus {
  outline: none;
}

.practice-badge-success {
  padding: 0 0.65rem;
  color: #10b981;
  display: flex;
  align-items: center;
}

.btn-hint {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0 0.6rem;
  display: flex;
  align-items: center;
  height: 100%;
}

.btn-hint:hover {
  color: var(--primary);
}

.btn-hint.active {
  color: var(--primary);
}

.hint-popup {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.hint-popup code {
  font-family: var(--font-mono);
  color: var(--primary-text);
  font-weight: 600;
}

/* Column 4: Actions */
.row-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.35rem;
}

.btn-icon {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.35rem;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.btn-icon:hover {
  background: var(--bg-hover);
  color: var(--text-main);
}

.btn-icon-danger:hover {
  background: var(--danger-light);
  color: var(--danger);
}

/* Empty Table */
.empty-table-card {
  padding: 2.5rem;
  text-align: center;
  color: var(--text-muted);
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.empty-btns {
  display: flex;
  gap: 0.5rem;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.55rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid transparent;
}

.btn-sm {
  padding: 0.4rem 0.75rem;
  font-size: 0.8rem;
}

.btn-primary {
  background: var(--primary);
  color: #ffffff;
}

.btn-primary:hover {
  background: var(--primary-hover);
}

.btn-secondary {
  background: var(--bg-surface);
  color: var(--text-main);
  border-color: var(--border-color);
}

.btn-secondary:hover {
  background: var(--bg-hover);
}

.btn-danger-ghost {
  background: transparent;
  color: var(--danger);
  border-color: transparent;
}

.btn-danger-ghost:hover {
  background: var(--danger-light);
}

.btn-danger {
  background: var(--danger);
  color: #ffffff;
}

.btn-danger:hover {
  background: var(--danger-hover, #dc2626);
}

/* Small Delete Modal */
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

.modal-card-small {
  width: 100%;
  max-width: 420px;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  animation: modalEnter 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-body-small {
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.warn-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--danger-light);
  color: var(--danger);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;
}

.modal-body-small h3 {
  margin: 0;
  color: var(--text-main);
}

.modal-body-small p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.45;
}

.modal-footer-small {
  padding: 0.85rem 1.25rem;
  border-top: 1px solid var(--border-subtle);
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  background: var(--bg-subtle);
}

@media (max-width: 768px) {
  .page-topbar {
    flex-direction: column;
    align-items: stretch;
  }
  .topbar-right {
    display: flex;
  }
  .topbar-right .btn {
    width: 100%;
  }
  .th-command { width: 30%; }
  .th-does { width: 35%; }
  .th-practice { width: 35%; }
  .th-actions { display: none; }
  .td-actions { display: none; }
}
</style>
