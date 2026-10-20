export interface QAItem {
  id: string
  category: string
  lesson: string
  question: string
  answerEn: string
  answerKh: string
  // Fallback for previous legacy items
  answer?: string
  createdAt: number
  isFavorite?: boolean
}

export type ViewMode = 'list' | 'study'
