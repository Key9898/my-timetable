export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type ItemColor = 'blue' | 'purple' | 'emerald' | 'rose' | 'amber' | 'indigo';

export interface TimetableItem {
  id: string;
  subject: string;
  startTime: string; // "09:00" format
  endTime: string;   // "10:30" format
  day: DayOfWeek;
  room?: string;
  color?: ItemColor;
  isRecurring?: boolean;
}
