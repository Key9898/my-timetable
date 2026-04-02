export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export type ItemColor = 'blue' | 'purple' | 'emerald' | 'rose' | 'amber' | 'indigo'

export type TimetableStatus = 'active' | 'completed' | 'archived'

export interface TimetableInput {
  subject: string
  startTime: string // "09:00" format
  endTime: string // "10:30" format
  day: DayOfWeek
  room?: string
  color?: ItemColor
  isRecurring?: boolean
}

export interface TimetableItem extends TimetableInput {
  id: string
  userId: string
  status: TimetableStatus
  createdAt: string
  updatedAt: string
  completedAt?: string
  archivedAt?: string
}
