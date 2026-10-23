<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { QAItem } from './types/qa'
import Navbar from './components/Navbar.vue'
import QAFormModal from './components/QAFormModal.vue'
import ImportExportModal from './components/ImportExportModal.vue'

const router = useRouter()

const isAddModalOpen = ref(false)
const isDataModalOpen = ref(false)
const editingItem = ref<QAItem | null>(null)
const prefillCategory = ref('')

function handleOpenAdd(category?: string) {
  editingItem.value = null
  prefillCategory.value = category || ''
  isAddModalOpen.value = true
}

function handleEdit(item: QAItem) {
  editingItem.value = item
  prefillCategory.value = item.category
  isAddModalOpen.value = true
}

function handleCloseModal() {
  isAddModalOpen.value = false
  editingItem.value = null
  prefillCategory.value = ''
}

function handleSaved(savedItem: QAItem) {
  // If we just added a question and are not already in its category, we can let user stay or navigate
}
</script>

<template>
  <div class="app-root">
    <!-- Navbar -->
    <Navbar
      @open-add-modal="() => handleOpenAdd()"
      @open-data-modal="isDataModalOpen = true"
    />

    <!-- Routed Page View (Categories Board, Category Questions, or Study) -->
    <main class="main-container">
      <router-view
        @add-question="handleOpenAdd"
        @edit-question="handleEdit"
      />
    </main>

    <!-- Mobile Floating Action Button -->
    <button
      class="mobile-fab"
      @click="handleOpenAdd()"
      title="Add New Question"
      aria-label="Add Question"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    </button>

    <!-- Question Add / Edit Modal -->
    <QAFormModal
      :is-open="isAddModalOpen"
      :edit-item="editingItem"
      :initial-category="prefillCategory"
      @close="handleCloseModal"
      @saved="handleSaved"
    />

    <!-- Data Import / Export Modal -->
    <ImportExportModal
      :is-open="isDataModalOpen"
      @close="isDataModalOpen = false"
    />

    <!-- Footer -->
    <footer class="app-footer">
      <div class="footer-content">
        <span>DevQ&A</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  max-width: 1320px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem 5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (max-width: 680px) {
  .main-container {
    padding: 0.75rem 0.5rem 4.5rem;
    gap: 0.85rem;
  }
}

/* Mobile Floating Action Button */
.mobile-fab {
  display: flex;
  position: fixed;
  right: 1.5rem;
  bottom: 1.75rem;
  width: 54px;
  height: 54px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, #4f46e5 0%, #ec4899 100%);
  color: white;
  border: none;
  box-shadow: 0 8px 24px rgba(79, 70, 229, 0.45);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 30;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.mobile-fab:active {
  transform: scale(0.92);
}

@media (min-width: 768px) {
  .mobile-fab {
    display: none;
  }
}

/* Footer */
.app-footer {
  background-color: var(--bg-surface);
  border-top: 1px solid var(--border-color);
  padding: 1.5rem;
  text-align: center;
  font-size: 0.86rem;
  color: var(--text-muted);
  margin-top: auto;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.footer-dot {
  color: var(--text-subtle);
}
</style>
