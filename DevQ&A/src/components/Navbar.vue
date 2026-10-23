<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQAStore } from '../composables/useQAStore'
import { useTheme } from '../composables/useTheme'

const emit = defineEmits<{
  (e: 'open-add-modal'): void
  (e: 'open-data-modal'): void
}>()

const router = useRouter()
const route = useRoute()

const { items, syncStatus } = useQAStore()
const { isDark, toggleTheme } = useTheme()

const isMobileMenuOpen = ref(false)

const isHomeActive = computed(() => {
  return route.path === '/' || route.name === 'categories' || route.name === 'category-questions'
})

const isLessonsActive = computed(() => {
  return route.path === '/lessons' || route.name === 'lessons'
})

const isStudyActive = computed(() => {
  return route.path === '/study' || route.name === 'study'
})

function navigateTo(path: string) {
  router.push(path)
  isMobileMenuOpen.value = false
}

function handleAddClick() {
  emit('open-add-modal')
  isMobileMenuOpen.value = false
}

function handleDataClick() {
  emit('open-data-modal')
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="navbar-wrapper">
    <div class="navbar-container">
      <!-- Brand Logo & Title -->
      <div class="brand" @click="navigateTo('/')">
        <div class="brand-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-title">DevQ&A</span>
          <span class="brand-badge">{{ items.length }} Q&As</span>
          <div class="sync-status-badge" :title="syncStatus === 'synced' ? 'Data automatically synchronized across all connected devices' : 'Connecting to shared storage...'">
            <span class="sync-dot" :class="syncStatus"></span>
            <span class="sync-label">{{ syncStatus === 'synced' ? 'Synced' : syncStatus === 'syncing' ? 'Syncing...' : 'Local' }}</span>
          </div>
        </div>
      </div>

      <!-- Desktop Nav Tabs -->
      <nav class="desktop-nav">
        <button
          class="nav-tab"
          :class="{ active: isHomeActive }"
          @click="navigateTo('/')"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect width="7" height="7" x="3" y="3" rx="1"/>
            <rect width="7" height="7" x="14" y="3" rx="1"/>
            <rect width="7" height="7" x="14" y="14" rx="1"/>
            <rect width="7" height="7" x="3" y="14" rx="1"/>
          </svg>
          <span>Category Board</span>
        </button>

        <button
          class="nav-tab"
          :class="{ active: isLessonsActive }"
          @click="navigateTo('/lessons')"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <polyline points="4 17 10 11 4 5"/>
            <line x1="12" y1="19" x2="20" y2="19"/>
          </svg>
          <span>Command Lessons</span>
        </button>

        <button
          class="nav-tab study-tab"
          :class="{ active: isStudyActive }"
          @click="navigateTo('/study')"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="m2 7 10 5 10-5-10-5Z"/>
            <path d="m2 17 10 5 10-5"/>
            <path d="m2 12 10 5 10-5"/>
          </svg>
          <span>Flashcard Study</span>
        </button>
      </nav>

      <!-- Desktop Right Controls -->
      <div class="desktop-actions">
        <!-- New Question Button -->
        <button class="btn btn-primary add-btn" @click="handleAddClick">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span>New Question</span>
        </button>

        <!-- Backup & Import Button -->
        <button class="btn btn-secondary icon-btn" title="Backup & Restore Data" @click="handleDataClick">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </button>

        <!-- Theme Toggle -->
        <button class="btn btn-secondary icon-btn" :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'" @click="toggleTheme">
          <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.2">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2"/><path d="M12 20v2"/>
            <path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/>
            <path d="M2 12h2"/><path d="M20 12h2"/>
            <path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.2">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <div class="mobile-toggle-wrapper">
        <button class="btn btn-primary mobile-add-btn" @click="handleAddClick" title="Add Question">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
        <button class="btn btn-secondary icon-btn" @click="isMobileMenuOpen = !isMobileMenuOpen" aria-label="Toggle menu">
          <svg v-if="!isMobileMenuOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="4" x2="20" y1="12" y2="12"/>
            <line x1="4" x2="20" y1="6" y2="6"/>
            <line x1="4" x2="20" y1="18" y2="18"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <div v-if="isMobileMenuOpen" class="mobile-drawer fade-in">
      <div class="mobile-nav-links">
        <button
          class="mobile-nav-item"
          :class="{ active: isHomeActive }"
          @click="navigateTo('/')"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect width="7" height="7" x="3" y="3" rx="1"/>
            <rect width="7" height="7" x="14" y="3" rx="1"/>
            <rect width="7" height="7" x="14" y="14" rx="1"/>
            <rect width="7" height="7" x="3" y="14" rx="1"/>
          </svg>
          <span>Category Board</span>
        </button>

        <button
          class="mobile-nav-item"
          :class="{ active: isLessonsActive }"
          @click="navigateTo('/lessons')"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="4 17 10 11 4 5"/>
            <line x1="12" y1="19" x2="20" y2="19"/>
          </svg>
          <span>Command Lessons</span>
        </button>

        <button
          class="mobile-nav-item"
          :class="{ active: isStudyActive }"
          @click="navigateTo('/study')"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m2 7 10 5 10-5-10-5Z"/>
            <path d="m2 17 10 5 10-5"/>
            <path d="m2 12 10 5 10-5"/>
          </svg>
          <span>Flashcard Study</span>
        </button>
      </div>

      <div class="mobile-drawer-footer">
        <button class="btn btn-secondary" style="flex: 1;" @click="handleDataClick">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <span>Data Backup</span>
        </button>

        <button class="btn btn-secondary icon-btn" @click="toggleTheme">
          <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2"/><path d="M12 20v2"/>
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar-wrapper {
  position: sticky;
  top: 0;
  z-index: 40;
  background-color: rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.25s ease;
}

html.dark .navbar-wrapper {
  background-color: rgba(19, 27, 46, 0.85);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

.navbar-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  cursor: pointer;
  user-select: none;
}

.brand-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, #4f46e5 0%, #ec4899 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);
  transition: transform 0.2s ease;
}

.brand:hover .brand-icon {
  transform: scale(1.05);
}

.brand-text {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.brand-title {
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #4f46e5 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-badge {
  font-size: 0.76rem;
  font-weight: 700;
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
  color: var(--primary);
  border: 1px solid rgba(79, 70, 229, 0.2);
}

.sync-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.18rem 0.55rem;
  border-radius: var(--radius-xs);
  background: rgba(16, 185, 129, 0.12);
  color: #059669;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

html.dark .sync-status-badge {
  color: #34d399;
}

.sync-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #10b981;
}

.sync-dot.syncing {
  background-color: #f59e0b;
  animation: pulseSync 1s infinite alternate;
}

.sync-dot.offline {
  background-color: #94a3b8;
}

@keyframes pulseSync {
  from { opacity: 0.4; }
  to { opacity: 1; }
}

/* Nav tabs */
.desktop-nav {
  display: none;
  align-items: center;
  gap: 0.4rem;
  background: var(--bg-subtle);
  padding: 0.35rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.15rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-tab:hover {
  color: var(--text-main);
}

.nav-tab.active {
  background: var(--bg-surface);
  color: var(--primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.desktop-actions {
  display: none;
  align-items: center;
  gap: 0.75rem;
}

.icon-btn {
  padding: 0.65rem;
  width: 42px;
  height: 42px;
  min-width: 42px;
  border-radius: var(--radius-sm);
}

.mobile-toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mobile-add-btn {
  padding: 0.5rem;
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: var(--radius-sm);
}

/* Mobile drawer */
.mobile-drawer {
  background: var(--bg-surface);
  border-top: 1px solid var(--border-color);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.15rem;
  border-radius: var(--radius-sm);
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.96rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}

.mobile-nav-item.active {
  background: var(--primary-light);
  color: var(--primary-text);
}

.mobile-drawer-footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-color);
}

@media (max-width: 680px) {
  .navbar-container {
    padding: 0.6rem 0.75rem;
    gap: 0.5rem;
  }
  .brand {
    gap: 0.55rem;
  }
  .brand-icon {
    width: 32px;
    height: 32px;
  }
  .brand-icon svg {
    width: 17px;
    height: 17px;
  }
  .brand-title {
    font-size: 1.1rem;
  }
  .brand-badge {
    padding: 0.15rem 0.45rem;
    font-size: 0.7rem;
  }
  .sync-status-badge {
    padding: 0.12rem 0.4rem;
    font-size: 0.66rem;
  }
  .mobile-add-btn {
    width: 34px;
    height: 34px;
    min-width: 34px;
    padding: 0.35rem;
  }
  .icon-btn {
    width: 34px;
    height: 34px;
    min-width: 34px;
    padding: 0.35rem;
  }
}

@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
  }
  .desktop-actions {
    display: flex;
  }
  .mobile-toggle-wrapper {
    display: none;
  }
  .mobile-drawer {
    display: none;
  }
}
</style>
