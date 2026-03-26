import type { DayOfWeek, TimetableItem } from '../models/Timetable'

/**
 * Filters and sorts timetable items for a specific day.
 * Sorts by startTime ascending.
 */
export const getItemsForDay = (items: TimetableItem[], day: DayOfWeek): TimetableItem[] => {
  return items
    .filter((item) => item.day === day)
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
}
