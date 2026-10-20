export interface ColorTheme {
  primary: string
  secondary: string
  bgLight: string
  textLight: string
  border: string
  gradient: string
}

const PALETTES: ColorTheme[] = [
  {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    bgLight: 'rgba(99, 102, 241, 0.12)',
    textLight: '#4f46e5',
    border: 'rgba(99, 102, 241, 0.25)',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
  },
  {
    primary: '#0ea5e9',
    secondary: '#06b6d4',
    bgLight: 'rgba(14, 165, 233, 0.12)',
    textLight: '#0284c7',
    border: 'rgba(14, 165, 233, 0.25)',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)'
  },
  {
    primary: '#10b981',
    secondary: '#059669',
    bgLight: 'rgba(16, 185, 129, 0.12)',
    textLight: '#059669',
    border: 'rgba(16, 185, 129, 0.25)',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
  },
  {
    primary: '#f59e0b',
    secondary: '#ea580c',
    bgLight: 'rgba(245, 158, 11, 0.14)',
    textLight: '#d97706',
    border: 'rgba(245, 158, 11, 0.3)',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)'
  },
  {
    primary: '#ec4899',
    secondary: '#f43f5e',
    bgLight: 'rgba(236, 72, 153, 0.12)',
    textLight: '#db2777',
    border: 'rgba(236, 72, 153, 0.25)',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)'
  },
  {
    primary: '#8b5cf6',
    secondary: '#d946ef',
    bgLight: 'rgba(139, 92, 246, 0.12)',
    textLight: '#7c3aed',
    border: 'rgba(139, 92, 246, 0.25)',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)'
  }
]

export function getCategoryColor(name: string): ColorTheme {
  if (!name) return PALETTES[0]!
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % PALETTES.length
  return PALETTES[index] || PALETTES[0]!
}
