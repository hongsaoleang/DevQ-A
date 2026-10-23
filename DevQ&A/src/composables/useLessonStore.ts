import { ref, computed, watch, onMounted } from 'vue'
import type { LessonItem, CommandItem } from '../types/lesson'

const LESSONS_STORAGE_KEY = 'devqa_lessons_v1'
const LESSONS_API_URL = '/api/lessons'

const DEFAULT_SAMPLE_LESSONS: LessonItem[] = [
  {
    id: 'lesson_linux_basics',
    name: 'Linux Terminal Navigation',
    category: 'Backend',
    whyWeUseIt: 'Terminal navigation commands allow you to move between directories, inspect files, and manage projects directly from the command line without needing a graphical interface. We use them together to explore the filesystem, check where we are, and manage files quickly.',
    createdAt: 1774000000000,
    commands: [
      {
        id: 'cmd_1',
        command: 'pwd',
        whatItDoes: 'Show current directory',
        practice: 'pwd',
        notes: 'Print Working Directory: tells you your exact full path in the filesystem'
      },
      {
        id: 'cmd_2',
        command: 'ls -la',
        whatItDoes: 'List all files and hidden files with permissions and size details',
        practice: 'ls -la',
        notes: 'Combines -l (long format) and -a (all, including dotfiles)'
      },
      {
        id: 'cmd_3',
        command: 'cd ..',
        whatItDoes: 'Move up one directory level to the parent folder',
        practice: 'cd ..',
        notes: 'Two dots (..) represent the parent directory'
      },
      {
        id: 'cmd_4',
        command: 'mkdir practice',
        whatItDoes: 'Create a new directory named practice',
        practice: 'mkdir practice',
        notes: 'Make Directory'
      },
      {
        id: 'cmd_5',
        command: 'touch index.html',
        whatItDoes: 'Create a new empty file named index.html',
        practice: 'touch index.html',
        notes: 'Also updates the file timestamp if it already exists'
      }
    ]
  },
  {
    id: 'lesson_git_basics',
    name: 'Git Workflow Fundamentals',
    category: 'Web Development',
    whyWeUseIt: 'Git is the industry standard for tracking code changes, collaborating with teammates, and reverting bugs. We use these core commands consecutively in our daily development loop to stage, commit, and sync code to remote repositories.',
    createdAt: 1774050000000,
    commands: [
      {
        id: 'git_1',
        command: 'git status',
        whatItDoes: 'Check current branch, modified files, and staged changes',
        practice: 'git status',
        notes: 'Run this frequently to see the state of your working tree'
      },
      {
        id: 'git_2',
        command: 'git add .',
        whatItDoes: 'Stage all current modified and newly created files',
        practice: 'git add .',
        notes: 'Prepares changes to be captured in the next commit snapshot'
      },
      {
        id: 'git_3',
        command: 'git commit -m "update"',
        whatItDoes: 'Commit staged changes with a descriptive message',
        practice: 'git commit -m "update"',
        notes: 'Saves your snapshot permanently to local Git history'
      },
      {
        id: 'git_4',
        command: 'git push origin main',
        whatItDoes: 'Upload local commits to the remote main branch',
        practice: 'git push origin main',
        notes: 'Syncs your work with GitHub / GitLab'
      }
    ]
  }
]

function normalizeCommand(raw: any): CommandItem | null {
  if (!raw || (!raw.command && !raw.whatItDoes)) return null
  const command = String(raw.command || '').trim()
  return {
    id: raw.id || 'cmd_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    command,
    whatItDoes: String(raw.whatItDoes || '').trim(),
    practice: String(raw.practice || command).trim(),
    notes: raw.notes ? String(raw.notes).trim() : undefined
  }
}

function normalizeLesson(raw: any): LessonItem | null {
  if (!raw || !raw.name) return null
  const cmds: CommandItem[] = Array.isArray(raw.commands)
    ? raw.commands.map((c: any) => normalizeCommand(c)).filter((c: any): c is CommandItem => c !== null)
    : []

  return {
    id: raw.id || 'lesson_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    name: String(raw.name).trim(),
    category: raw.category ? String(raw.category).trim() : 'General',
    whyWeUseIt: String(raw.whyWeUseIt || '').trim(),
    commands: cmds,
    createdAt: typeof raw.createdAt === 'number' ? raw.createdAt : Date.now(),
    updatedAt: typeof raw.updatedAt === 'number' ? raw.updatedAt : undefined
  }
}

function loadLocalLessons(): LessonItem[] {
  try {
    const raw = localStorage.getItem(LESSONS_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeLesson).filter((l): l is LessonItem => l !== null)
      }
    }
  } catch (e) {
    console.error('Failed to load lessons from localStorage:', e)
  }
  return DEFAULT_SAMPLE_LESSONS
}

const lessons = ref<LessonItem[]>(loadLocalLessons())
const currentLessonId = ref<string>(lessons.value[0]?.id || '')
const syncStatus = ref<'synced' | 'syncing' | 'offline'>('syncing')
const lastRemoteHash = ref<string>('')

function calculateHash(items: LessonItem[]): string {
  return JSON.stringify(
    items.map((l) => ({
      id: l.id,
      name: l.name,
      whyWeUseIt: l.whyWeUseIt,
      category: l.category,
      commandsCount: l.commands.length,
      commands: l.commands.map((c: CommandItem) => ({
        id: c.id,
        command: c.command,
        whatItDoes: c.whatItDoes,
        practice: c.practice
      }))
    }))
  )
}

async function pushToRemote(data: LessonItem[]) {
  try {
    syncStatus.value = 'syncing'
    const res = await fetch(LESSONS_API_URL, {
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

async function pullFromRemote(silent = false) {
  try {
    if (!silent) syncStatus.value = 'syncing'
    const res = await fetch(LESSONS_API_URL + '?t=' + Date.now())
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        const validated = data.map(normalizeLesson).filter((l): l is LessonItem => l !== null)
        const newHash = calculateHash(validated)
        const currentHash = calculateHash(lessons.value)

        if (newHash !== currentHash) {
          lessons.value = validated
          try {
            localStorage.setItem(LESSONS_STORAGE_KEY, JSON.stringify(validated))
          } catch {}
          if (!lessons.value.some((l) => l.id === currentLessonId.value) && lessons.value.length > 0) {
            const first = lessons.value[0]
            if (first) {
              currentLessonId.value = first.id
            }
          }
        }
        lastRemoteHash.value = newHash
      } else if (Array.isArray(data) && data.length === 0 && lessons.value.length > 0) {
        await pushToRemote(lessons.value)
      }
      syncStatus.value = 'synced'
    } else {
      syncStatus.value = 'offline'
    }
  } catch (e) {
    syncStatus.value = 'offline'
  }
}

let saveTimeout: any = null
watch(
  lessons,
  (newVal) => {
    try {
      localStorage.setItem(LESSONS_STORAGE_KEY, JSON.stringify(newVal))
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

let isPollingStarted = false
function startPolling() {
  if (isPollingStarted) return
  isPollingStarted = true
  pullFromRemote(false)
  setInterval(() => {
    pullFromRemote(true)
  }, 4000)
}

export function useLessonStore() {
  onMounted(() => {
    startPolling()
  })

  const currentLesson = computed(() => {
    if (!currentLessonId.value) {
      return lessons.value[0] || null
    }
    return lessons.value.find((l) => l.id === currentLessonId.value) || lessons.value[0] || null
  })

  function selectLesson(id: string) {
    currentLessonId.value = id
  }

  function addLesson(name: string, whyWeUseIt: string, category = 'General', initialCommands: CommandItem[] = []): LessonItem {
    const newLesson: LessonItem = {
      id: 'lesson_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      name: name.trim(),
      category: category.trim() || 'General',
      whyWeUseIt: whyWeUseIt.trim(),
      commands: initialCommands,
      createdAt: Date.now()
    }
    lessons.value.unshift(newLesson)
    currentLessonId.value = newLesson.id
    return newLesson
  }

  function updateLesson(id: string, updates: Partial<LessonItem>): boolean {
    const idx = lessons.value.findIndex((l) => l.id === id)
    if (idx === -1) return false
    const target = lessons.value[idx]
    if (!target) return false

    lessons.value[idx] = {
      ...target,
      ...updates,
      id: target.id,
      name: updates.name !== undefined ? updates.name : target.name,
      category: updates.category !== undefined ? updates.category : target.category,
      whyWeUseIt: updates.whyWeUseIt !== undefined ? updates.whyWeUseIt : target.whyWeUseIt,
      commands: updates.commands !== undefined ? updates.commands : target.commands,
      createdAt: target.createdAt,
      updatedAt: Date.now()
    }
    return true
  }

  function deleteLesson(id: string): boolean {
    const idx = lessons.value.findIndex((l) => l.id === id)
    if (idx === -1) return false
    lessons.value.splice(idx, 1)
    if (currentLessonId.value === id) {
      currentLessonId.value = lessons.value[0]?.id || ''
    }
    return true
  }

  function addCommand(lessonId: string, cmd: Omit<CommandItem, 'id'>): CommandItem | null {
    const lesson = lessons.value.find((l) => l.id === lessonId)
    if (!lesson) return null

    const newCmd: CommandItem = {
      id: 'cmd_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      command: cmd.command.trim(),
      whatItDoes: cmd.whatItDoes.trim(),
      practice: (cmd.practice || cmd.command).trim(),
      notes: cmd.notes ? cmd.notes.trim() : undefined
    }
    lesson.commands.push(newCmd)
    lesson.updatedAt = Date.now()
    return newCmd
  }

  function updateCommand(lessonId: string, cmdId: string, updates: Partial<CommandItem>): boolean {
    const lesson = lessons.value.find((l) => l.id === lessonId)
    if (!lesson) return false
    const cmdIdx = lesson.commands.findIndex((c) => c.id === cmdId)
    if (cmdIdx === -1) return false

    const targetCmd = lesson.commands[cmdIdx]
    if (!targetCmd) return false

    lesson.commands[cmdIdx] = {
      ...targetCmd,
      ...updates,
      id: targetCmd.id,
      command: updates.command !== undefined ? updates.command : targetCmd.command,
      whatItDoes: updates.whatItDoes !== undefined ? updates.whatItDoes : targetCmd.whatItDoes,
      practice: updates.practice !== undefined ? updates.practice : targetCmd.practice
    }
    lesson.updatedAt = Date.now()
    return true
  }

  function deleteCommand(lessonId: string, cmdId: string): boolean {
    const lesson = lessons.value.find((l) => l.id === lessonId)
    if (!lesson) return false
    const cmdIdx = lesson.commands.findIndex((c) => c.id === cmdId)
    if (cmdIdx === -1) return false

    lesson.commands.splice(cmdIdx, 1)
    lesson.updatedAt = Date.now()
    return true
  }

  function parseBulkText(text: string): { command: string; whatItDoes: string; practice: string; notes?: string }[] {
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
    const result: { command: string; whatItDoes: string; practice: string; notes?: string }[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (!line) continue

      // Detect and skip header row if user copied headers like:
      // "Command    What it does    practice"
      if (i === 0) {
        const lower = line.toLowerCase()
        if (
          (lower.includes('command') && lower.includes('what')) ||
          (lower.includes('command') && lower.includes('practice'))
        ) {
          continue
        }
      }

      let parts: string[] = []

      // 1. Try Tab separated
      if (line.includes('\t')) {
        parts = line.split('\t').map((p) => p.trim()).filter((p) => p.length > 0)
      } else if (line.includes('|')) {
        // 2. Try Pipe separated
        parts = line.split('|').map((p) => p.trim()).filter((p) => p.length > 0)
      } else {
        // 3. Try 2 or more spaces / tabs regex
        parts = line.split(/\s{2,}/).map((p) => p.trim()).filter((p) => p.length > 0)
      }

      const p0 = parts[0] || ''
      const p1 = parts[1] || ''
      const p2 = parts[2] || p0
      const p3 = parts[3]

      if (parts.length >= 3 && p0) {
        result.push({
          command: p0,
          whatItDoes: p1,
          practice: p2,
          notes: p3 || undefined
        })
      } else if (parts.length === 2 && p0) {
        result.push({
          command: p0,
          whatItDoes: p1,
          practice: p0
        })
      } else if (parts.length === 1 && p0) {
        result.push({
          command: p0,
          whatItDoes: '',
          practice: p0
        })
      }
    }

    return result
  }

  function addBulkCommands(lessonId: string, parsedList: { command: string; whatItDoes: string; practice: string; notes?: string }[]): number {
    const lesson = lessons.value.find((l) => l.id === lessonId)
    if (!lesson) return 0

    let count = 0
    for (const item of parsedList) {
      if (!item.command) continue
      lesson.commands.push({
        id: 'cmd_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
        command: item.command.trim(),
        whatItDoes: item.whatItDoes.trim(),
        practice: (item.practice || item.command).trim(),
        notes: item.notes?.trim()
      })
      count++
    }

    if (count > 0) {
      lesson.updatedAt = Date.now()
    }
    return count
  }

  function importLessons(rawList: any[]): { success: boolean; count: number; error?: string } {
    try {
      if (!Array.isArray(rawList)) {
        return { success: false, count: 0, error: 'Lessons data must be an array.' }
      }
      const validated: LessonItem[] = []
      for (const raw of rawList) {
        const item = normalizeLesson(raw)
        if (item) validated.push(item)
      }
      if (validated.length === 0) {
        return { success: false, count: 0, error: 'No valid lessons found in JSON.' }
      }
      lessons.value = validated
      if (validated.length > 0 && !validated.some((l) => l.id === currentLessonId.value)) {
        currentLessonId.value = validated[0]?.id || ''
      }
      pushToRemote(validated)
      return { success: true, count: validated.length }
    } catch (e: any) {
      return { success: false, count: 0, error: e?.message || 'Failed to import lessons.' }
    }
  }

  function resetLessonsToDefaults() {
    lessons.value = JSON.parse(JSON.stringify(DEFAULT_SAMPLE_LESSONS))
    currentLessonId.value = lessons.value[0]?.id || ''
    pushToRemote(lessons.value)
  }

  function clearAllLessons() {
    lessons.value = []
    currentLessonId.value = ''
    pushToRemote([])
  }

  return {
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
    parseBulkText,
    addBulkCommands,
    importLessons,
    resetLessonsToDefaults,
    clearAllLessons
  }
}
