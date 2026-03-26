import type { TimetableInput, TimetableItem, TimetableStatus } from '../models/Timetable'
import { mapTimetableItems } from '../mappers/timetableMapper'
import { MOCK_TIMETABLE_DATA, mockApiResponse } from '../mocks/timetableMock'

const STORAGE_KEY = 'my_timetable_data'
const USE_MOCK = true // Still use mock for initial load if no data in Storage

const createId = () => Math.random().toString(36).slice(2, 11)

const normalizeTimetableItem = (item: Partial<TimetableItem>): TimetableItem => {
  const createdAt = item.createdAt || item.updatedAt || new Date().toISOString()

  return {
    id: item.id || createId(),
    subject: item.subject || 'Untitled Task',
    startTime: item.startTime || '00:00',
    endTime: item.endTime || '00:00',
    day: item.day || 'Monday',
    room: item.room || '',
    color: item.color || 'purple',
    isRecurring: item.isRecurring ?? true,
    status: item.status || 'active',
    createdAt,
    updatedAt: item.updatedAt || createdAt,
    completedAt: item.completedAt,
    archivedAt: item.archivedAt,
  }
}

const persistItems = (items: TimetableItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

const applyStatusTransition = (
  item: TimetableItem,
  nextStatus: TimetableStatus,
  changedAt: string,
): TimetableItem => {
  if (nextStatus === 'completed') {
    return {
      ...item,
      status: 'completed',
      updatedAt: changedAt,
      completedAt: changedAt,
      archivedAt: undefined,
    }
  }

  if (nextStatus === 'archived') {
    return {
      ...item,
      status: 'archived',
      updatedAt: changedAt,
      archivedAt: changedAt,
    }
  }

  return {
    ...item,
    status: 'active',
    updatedAt: changedAt,
    completedAt: undefined,
    archivedAt: undefined,
  }
}

export const timetableService = {
  getTimetable: async (): Promise<TimetableItem[]> => {
    const storedItems = localStorage.getItem(STORAGE_KEY)

    if (storedItems) {
      const normalizedItems = JSON.parse(storedItems).map(normalizeTimetableItem)
      persistItems(normalizedItems)
      return normalizedItems
    }

    // Default to mock data if nothing in LocalStorage
    if (USE_MOCK) {
      const data = await mockApiResponse(MOCK_TIMETABLE_DATA)
      const mapped = mapTimetableItems(data)
      persistItems(mapped)
      return mapped
    }

    return []
  },

  addItem: async (item: TimetableInput): Promise<TimetableItem> => {
    const items = await timetableService.getTimetable()
    const now = new Date().toISOString()
    const newItem: TimetableItem = {
      ...item,
      id: createId(),
      status: 'active',
      createdAt: now,
      updatedAt: now,
    }

    const updatedItems = [...items, newItem]
    persistItems(updatedItems)
    return newItem
  },

  updateItem: async (id: string, updates: Partial<TimetableItem>): Promise<TimetableItem> => {
    const items = await timetableService.getTimetable()
    const existingIndex = items.findIndex((item) => item.id === id)

    if (existingIndex === -1) throw new Error('Item not found')

    const currentItem = items[existingIndex]
    const updatedAt = new Date().toISOString()

    let updatedItem = normalizeTimetableItem({
      ...currentItem,
      ...updates,
      updatedAt,
    })

    if (updates.status && updates.status !== currentItem.status) {
      updatedItem = applyStatusTransition(updatedItem, updates.status, updatedAt)
    }

    items[existingIndex] = updatedItem

    persistItems(items)
    return updatedItem
  },

  deleteItem: async (id: string): Promise<void> => {
    const items = await timetableService.getTimetable()
    const filteredItems = items.filter((item) => item.id !== id)
    persistItems(filteredItems)
  },
}
