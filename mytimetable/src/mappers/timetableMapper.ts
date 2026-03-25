import type { DayOfWeek, ItemColor, TimetableItem, TimetableStatus } from '../models/Timetable'

export interface ApiTimetableItem {
  id?: string
  title?: string
  start?: string
  end?: string
  day_of_week?: DayOfWeek
  location?: string
  color?: ItemColor
  isRecurring?: boolean
  status?: TimetableStatus
  createdAt?: string
  updatedAt?: string
  completedAt?: string
  archivedAt?: string
}

const createId = () => Math.random().toString(36).slice(2, 11)

export const mapApiToTimetableItem = (apiData: ApiTimetableItem): TimetableItem => {
  const createdAt = new Date().toISOString()

  return {
    id: apiData.id || createId(),
    subject: apiData.title || 'No Subject',
    startTime: apiData.start || '00:00',
    endTime: apiData.end || '00:00',
    day: apiData.day_of_week || 'Monday',
    room: apiData.location || '',
    color: apiData.color || 'purple',
    isRecurring: apiData.isRecurring ?? true,
    status: apiData.status || 'active',
    createdAt: apiData.createdAt || createdAt,
    updatedAt: apiData.updatedAt || createdAt,
    completedAt: apiData.completedAt,
    archivedAt: apiData.archivedAt,
  }
}

export const mapTimetableItems = (items: ApiTimetableItem[]): TimetableItem[] => {
  return items.map(mapApiToTimetableItem)
}
