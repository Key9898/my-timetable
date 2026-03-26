import { createContext } from 'react'
import type { TimetableInput, TimetableItem } from '../models/Timetable'

export interface TimetableContextType {
  items: TimetableItem[]
  searchedItems: TimetableItem[]
  activeItems: TimetableItem[]
  completedItems: TimetableItem[]
  archivedItems: TimetableItem[]
  filteredItems: TimetableItem[]
  filteredActiveItems: TimetableItem[]
  filteredCompletedItems: TimetableItem[]
  filteredArchivedItems: TimetableItem[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  loading: boolean
  error: string | null
  viewType: 'list' | 'grid'
  setViewType: (view: 'list' | 'grid') => void
  fetchTimetable: () => Promise<void>
  addItem: (item: TimetableInput) => Promise<void>
  updateItem: (id: string, item: Partial<TimetableItem>) => Promise<void>
  deleteItem: (id: string) => Promise<void>
  completeItem: (id: string) => Promise<void>
  archiveItem: (id: string) => Promise<void>
  restoreItem: (id: string) => Promise<void>
}

export const TimetableContext = createContext<TimetableContextType | undefined>(undefined)
