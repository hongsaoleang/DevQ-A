export interface CommandItem {
  id: string
  command: string
  whatItDoes: string
  practice: string
  notes?: string
}

export interface LessonItem {
  id: string
  name: string
  category?: string
  whyWeUseIt: string
  commands: CommandItem[]
  createdAt: number
  updatedAt?: number
}
