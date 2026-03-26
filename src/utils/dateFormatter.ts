import type { DayOfWeek } from '../models/Timetable'

export const DAY_ORDER: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

/**
 * Format a time string (e.g., "09:00") into a more readable format if needed.
 * For now, it just returns the string, but can be expanded for AM/PM etc.
 */
export const formatTime = (time: string): string => {
  if (!time) return ''

  // Example: Convert "13:00" to "1:00 PM"
  const [hours, minutes] = time.split(':')
  const h = parseInt(hours, 10)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12

  return `${h12}:${minutes} ${ampm}`
}

/**
 * Format date/day strings
 */
export const formatDay = (day: string): string => {
  return day.charAt(0).toUpperCase() + day.slice(1)
}

export const getTimeValue = (time: string): number => {
  if (!time) return 0

  const [hours = '0', minutes = '0'] = time.split(':')
  return Number(hours) * 60 + Number(minutes)
}

export const getDurationMinutes = (startTime: string, endTime: string): number => {
  const start = getTimeValue(startTime)
  const end = getTimeValue(endTime)

  return Math.max(end - start, 0)
}

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}h ${remainingMinutes}m`
  }

  if (hours > 0) {
    return `${hours}h`
  }

  return `${remainingMinutes}m`
}

export const formatDateTime = (value?: string): string => {
  if (!value) return 'Not recorded yet'

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export const formatRelativeTime = (value?: string): string => {
  if (!value) return 'No timeline yet'

  const timestamp = new Date(value).getTime()
  const diff = Date.now() - timestamp
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  if (diff < hour) {
    const minutes = Math.max(Math.round(diff / minute), 1)
    return `${minutes} min ago`
  }

  if (diff < day) {
    const hours = Math.max(Math.round(diff / hour), 1)
    return `${hours} hour${hours === 1 ? '' : 's'} ago`
  }

  const days = Math.max(Math.round(diff / day), 1)
  return `${days} day${days === 1 ? '' : 's'} ago`
}
