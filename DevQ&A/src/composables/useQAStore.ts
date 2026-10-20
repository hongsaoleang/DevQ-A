import { ref, computed, watch, onMounted } from 'vue'
import type { QAItem } from '../types/qa'

const STORAGE_KEY = 'devqa_items_v2'
const CATEGORIES_STORAGE_KEY = 'devqa_categories_v2'
const API_URL = '/api/questions'
const CATEGORIES_API_URL = '/api/categories'

const DEFAULT_CATEGORIES = ['Backend', 'Web Development', 'Computer Science', 'Database']

const DEFAULT_SAMPLE_ITEMS: QAItem[] = [
  {
    id: 'sample-backend-1',
    category: 'Backend',
    lesson: 'API Design',
    question: 'What is an API (Application Programming Interface)?',
    answerEn: 'An API is a defined set of rules, functions, and protocols that allows different software applications to communicate and exchange data with each other seamlessly.',
    answerKh: 'API (Application Programming Interface) គឺជាបណ្ដុំនៃក្បួនច្បាប់ និង protocols ដែលអនុញ្ញាតឱ្យកម្មវិធីកុំព្យូទ័រផ្សេងៗគ្នាអាចទាក់ទងគ្នា និងផ្លាស់ប្ដូរទិន្នន័យទៅវិញទៅមកបាន។',
    createdAt: 1774000000000,
    isFavorite: true
  },
  {
    id: 'sample-backend-2',
    category: 'Backend',
    lesson: 'HTTP Protocols',
    question: 'What is the difference between GET and POST methods in Backend development?',
    answerEn: 'GET is designed to safely retrieve data from a server without modifying server state. POST is designed to send data to the server to create, submit, or process a new resource.',
    answerKh: 'GET ត្រូវបានប្រើសម្រាប់ទាញយកទិន្នន័យពី Server ដោយមិនផ្លាស់ប្ដូរស្ថានភាពរបស់ Server ឡើយ។ ចំណែកឯ POST ប្រើសម្រាប់បញ្ជូនទិន្នន័យទៅកាន់ Server ដើម្បីបង្កើត ឬកែច្នៃ resource ថ្មី។',
    createdAt: 1774050000000,
    isFavorite: false
  },
  {
    id: 'sample-1',
    category: 'Web Development',
    lesson: 'Vue 3 Fundamentals',
    question: 'What is the difference between ref() and reactive() in Vue 3?',
    answerEn: 'ref() can accept both primitive values (number, string, boolean) and objects, returning a reactive ref object with a .value property. reactive() takes only objects/arrays and returns a deeply reactive proxy directly without needing .value.',
    answerKh: 'ref() អាចប្រើជាមួយតម្លៃបឋម (លេខ, អក្សរ, boolean) និង objects ដោយវាផ្ដល់ reactive object ដែលមាន .value។ ចំណែកឯ reactive() ប្រើសម្រាប់តែ objects ឬ arrays ប៉ុណ្ណោះ ដោយមិនចាំបាច់ប្រើ .value ឡើយ។',
    createdAt: 1774100000000,
    isFavorite: true
  },
  {
    id: 'sample-2',
    category: 'Web Development',
    lesson: 'CSS & Responsive Design',
    question: 'What is Responsive Web Design?',
    answerEn: 'Responsive web design is an approach where web pages automatically detect the user\'s screen size and orientation to adapt their layout seamlessly across mobile, tablet, and desktop devices.',
    answerKh: 'Responsive Web Design គឺជាបច្ចេកទេសរចនាគេហទំព័រ ដែលសម្របខ្លួនដោយស្វ័យប្រវត្តិទៅតាមទំហំអេក្រង់ទាំងអស់ ដូចជាទូរស័ព្ទដៃ ថេប្លេត និងកុំព្យូទ័រ ដើម្បីផ្ដល់បទពិសោធន៍មើលល្អបំផុត។',
    createdAt: 1774150000000,
    isFavorite: true
  },
  {
    id: 'sample-3',
    category: 'Computer Science',
    lesson: 'Algorithms',
    question: 'What is an Algorithm?',
    answerEn: 'An algorithm is a finite sequence of well-defined, step-by-step instructions designed to solve a specific problem or perform a task systematically.',
    answerKh: 'Algorithm (ក្បួនដោះស្រាយ) គឺជាលំដាប់នៃជំហាន និងសេចក្ដីណែនាំច្បាស់លាស់មួយជំហានៗ ដែលបង្កើតឡើងដើម្បីដោះស្រាយបញ្ហា ឬបំពេញការងារជាក់លាក់ណាមួយ។',
    createdAt: 1774200000000,
    isFavorite: false
  },
  {
    id: 'sample-4',
    category: 'Database',
    lesson: 'SQL Basics',
    question: 'What is a Primary Key in a Database?',
    answerEn: 'A primary key is a column or a set of columns that uniquely identifies each row in a database table. It cannot contain null values and must contain unique values.',
    answerKh: 'Primary Key គឺជា column ឬក្រុម column ដែលប្រើសម្រាប់សម្គាល់ជួរទិន្នន័យ (row) នីមួយៗឱ្យដាច់ដោយឡែកពីគេក្នុង table។ វាមិនអាចមានតម្លៃស្ទួន ឬជា Null បានឡើយ។',
    createdAt: 1774250000000,
    isFavorite: false
  }
]

function normalizeItem(raw: any): QAItem | null {
  if (!raw || !raw.question) return null
  const en = String(raw.answerEn || (raw.answer && !raw.answerKh ? raw.answer : '') || '').trim()
  const kh = String(raw.answerKh || '').trim()

  if (!en && !kh && !raw.answer) return null

  return {
    id: raw.id || 'qa_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    category: String(raw.category || 'General').trim(),
    lesson: String(raw.lesson || 'General Lesson').trim(),
    question: String(raw.question).trim(),
    answerEn: en || (raw.answer ? String(raw.answer).trim() : ''),
    answerKh: kh,
    createdAt: typeof raw.createdAt === 'number' ? raw.createdAt : Date.now(),
    isFavorite: Boolean(raw.isFavorite)
  }
}

function loadLocalItems(): QAItem[] {
  try {
    const rawV2 = localStorage.getItem(STORAGE_KEY)
    if (rawV2) {
      const parsed = JSON.parse(rawV2)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeItem).filter((i): i is QAItem => i !== null)
      }
    }
  } catch (err) {
    console.error('Failed to parse local QA items:', err)
  }
  return DEFAULT_SAMPLE_ITEMS
}

function loadLocalCategories(): string[] {
  try {
    const raw = localStorage.getItem(CATEGORIES_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((c) => String(c).trim()).filter(Boolean)
      }
    }
  } catch (err) {
    console.error('Failed to parse local categories:', err)
  }
  return DEFAULT_CATEGORIES
}

// Global state
const items = ref<QAItem[]>(loadLocalItems())
const customCategories = ref<string[]>(loadLocalCategories())
const syncStatus = ref<'synced' | 'syncing' | 'offline'>('synced')
const lastRemoteHash = ref('')
const lastRemoteCatHash = ref('')

function calculateHash(data: QAItem[]): string {
  try {
    return JSON.stringify(data.map((i) => ({ id: i.id, q: i.question, aEn: i.answerEn, aKh: i.answerKh, fav: i.isFavorite })))
  } catch {
    return ''
  }
}

// Save to remote API (Vite local storage shared across devices)
async function pushToRemote(data: QAItem[]) {
  try {
    syncStatus.value = 'syncing'
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (res.ok) {
      syncStatus.value = 'synced'
      lastRemoteHash.value = calculateHash(data)
    } else {
      syncStatus.value = 'offline'
    }
  } catch (e) {
    syncStatus.value = 'offline'
  }
}

// Push categories to remote
async function pushCategoriesToRemote(data: string[]) {
  try {
    await fetch(CATEGORIES_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    lastRemoteCatHash.value = JSON.stringify(data)
  } catch (e) {
    // ignore
  }
}

// Pull from remote API (to receive updates added from another phone/device)
async function pullFromRemote(silent = false) {
  try {
    if (!silent) syncStatus.value = 'syncing'
    const res = await fetch(API_URL + '?t=' + Date.now())
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        const validated = data.map(normalizeItem).filter((i): i is QAItem => i !== null)
        const newHash = calculateHash(validated)
        const currentHash = calculateHash(items.value)

        if (newHash !== currentHash) {
          items.value = validated
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(validated))
          } catch {}
        }
        lastRemoteHash.value = newHash
      } else if (Array.isArray(data) && data.length === 0 && items.value.length > 0) {
        // If server file is empty, push our local items to seed it!
        await pushToRemote(items.value)
      }
      syncStatus.value = 'synced'
    } else {
      syncStatus.value = 'offline'
    }
  } catch (e) {
    syncStatus.value = 'offline'
  }
}

// Pull categories from remote
async function pullCategoriesFromRemote() {
  try {
    const res = await fetch(CATEGORIES_API_URL + '?t=' + Date.now())
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        const cleaned = data.map((c: any) => String(c).trim()).filter(Boolean)
        const newHash = JSON.stringify(cleaned)
        const currentHash = JSON.stringify(customCategories.value)
        if (newHash !== currentHash) {
          customCategories.value = cleaned
          try {
            localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(cleaned))
          } catch {}
        }
        lastRemoteCatHash.value = newHash
      } else if (Array.isArray(data) && data.length === 0 && customCategories.value.length > 0) {
        await pushCategoriesToRemote(customCategories.value)
      }
    }
  } catch (e) {
    // ignore
  }
}

// Sync watch for questions
let saveTimeout: any = null
watch(
  items,
  (newVal) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
    } catch {}

    const newHash = calculateHash(newVal)
    if (newHash !== lastRemoteHash.value) {
      clearTimeout(saveTimeout)
      saveTimeout = setTimeout(() => {
        pushToRemote(newVal)
      }, 300)
    }
  },
  { deep: true }
)

// Sync watch for categories
let catSaveTimeout: any = null
watch(
  customCategories,
  (newVal) => {
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(newVal))
    } catch {}

    const newHash = JSON.stringify(newVal)
    if (newHash !== lastRemoteCatHash.value) {
      clearTimeout(catSaveTimeout)
      catSaveTimeout = setTimeout(() => {
        pushCategoriesToRemote(newVal)
      }, 300)
    }
  },
  { deep: true }
)

// Background polling for real-time multi-device synchronization
if (typeof window !== 'undefined') {
  pullFromRemote(true)
  pullCategoriesFromRemote()

  setInterval(() => {
    pullFromRemote(true)
    pullCategoriesFromRemote()
  }, 3000)

  window.addEventListener('focus', () => {
    pullFromRemote(true)
    pullCategoriesFromRemote()
  })
}

export function useQAStore() {
  const categories = computed(() => {
    const set = new Set<string>()
    customCategories.value.forEach((cat) => {
      const c = cat?.trim()
      if (c) set.add(c)
    })
    items.value.forEach((item) => {
      const cat = item.category?.trim()
      if (cat) set.add(cat)
    })
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  })

  function addCategory(name: string): boolean {
    const trimmed = name.trim()
    if (!trimmed) return false
    const exists = categories.value.some((c) => c.toLowerCase() === trimmed.toLowerCase())
    if (!exists) {
      customCategories.value.push(trimmed)
      try {
        localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(customCategories.value))
      } catch {}
      pushCategoriesToRemote(customCategories.value)
    }
    return true
  }

  const lessons = computed(() => {
    const set = new Set<string>()
    items.value.forEach((item) => {
      const les = item.lesson?.trim()
      if (les) set.add(les)
    })
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  })

  function getLessonsForCategory(category: string): string[] {
    if (!category) return lessons.value
    const set = new Set<string>()
    items.value
      .filter((item) => item.category.trim().toLowerCase() === category.trim().toLowerCase())
      .forEach((item) => {
        const les = item.lesson?.trim()
        if (les) set.add(les)
      })
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }

  function addItem(payload: { category: string; lesson: string; question: string; answerEn: string; answerKh: string }) {
    const newItem: QAItem = {
      id: 'qa_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      category: payload.category.trim() || 'General',
      lesson: payload.lesson.trim() || 'General Lesson',
      question: payload.question.trim(),
      answerEn: payload.answerEn.trim(),
      answerKh: payload.answerKh.trim(),
      createdAt: Date.now(),
      isFavorite: false
    }
    items.value.unshift(newItem)
    pushToRemote(items.value)
    return newItem
  }

  function updateItem(
    id: string,
    payload: { category: string; lesson: string; question: string; answerEn: string; answerKh: string }
  ) {
    const index = items.value.findIndex((it) => it.id === id)
    if (index !== -1 && items.value[index]) {
      const existing = items.value[index]
      items.value[index] = {
        id: existing.id,
        createdAt: existing.createdAt,
        isFavorite: existing.isFavorite,
        category: payload.category.trim() || 'General',
        lesson: payload.lesson.trim() || 'General Lesson',
        question: payload.question.trim(),
        answerEn: payload.answerEn.trim(),
        answerKh: payload.answerKh.trim()
      }
      pushToRemote(items.value)
      return true
    }
    return false
  }

  function deleteItem(id: string) {
    items.value = items.value.filter((it) => it.id !== id)
    pushToRemote(items.value)
  }

  function toggleFavorite(id: string) {
    const item = items.value.find((it) => it.id === id)
    if (item) {
      item.isFavorite = !item.isFavorite
      pushToRemote(items.value)
    }
  }

  function resetToDefaults() {
    items.value = JSON.parse(JSON.stringify(DEFAULT_SAMPLE_ITEMS))
    pushToRemote(items.value)
  }

  function clearAll() {
    items.value = []
    pushToRemote([])
  }

  function exportToJson(): string {
    return JSON.stringify(items.value, null, 2)
  }

  function importFromJson(jsonStr: string): { success: boolean; count: number; error?: string } {
    try {
      const parsed = JSON.parse(jsonStr)
      if (!Array.isArray(parsed)) {
        return { success: false, count: 0, error: 'JSON content must be an array of questions.' }
      }

      const validated: QAItem[] = []
      for (const raw of parsed) {
        const item = normalizeItem(raw)
        if (item) validated.push(item)
      }

      if (validated.length === 0) {
        return { success: false, count: 0, error: 'No valid questions found in JSON.' }
      }

      items.value = validated
      pushToRemote(validated)
      return { success: true, count: validated.length }
    } catch (e: any) {
      return { success: false, count: 0, error: e?.message || 'Invalid JSON format.' }
    }
  }

  return {
    items,
    syncStatus,
    pullFromRemote,
    categories,
    customCategories,
    addCategory,
    lessons,
    getLessonsForCategory,
    addItem,
    updateItem,
    deleteItem,
    toggleFavorite,
    resetToDefaults,
    clearAll,
    exportToJson,
    importFromJson
  }
}
