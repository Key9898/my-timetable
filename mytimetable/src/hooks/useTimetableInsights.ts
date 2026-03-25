import { useTimetable } from './useTimetable'
import { DAY_ORDER, getDurationMinutes } from '../utils/dateFormatter'
import type { TimetableItem } from '../models/Timetable'

const getMinutesForItems = (items: TimetableItem[]) =>
  items.reduce((total, item) => total + getDurationMinutes(item.startTime, item.endTime), 0)

const getRecordTimestamp = (item: TimetableItem) =>
  item.archivedAt || item.completedAt || item.updatedAt

export const useTimetableInsights = () => {
  const { searchedItems, filteredActiveItems, filteredCompletedItems, filteredArchivedItems } =
    useTimetable()

  const totalMinutes = getMinutesForItems(searchedItems)
  const activeMinutes = getMinutesForItems(filteredActiveItems)
  const completedMinutes = getMinutesForItems(filteredCompletedItems)
  const archivedMinutes = getMinutesForItems(filteredArchivedItems)

  const totalTrackableItems = filteredActiveItems.length + filteredCompletedItems.length
  const completionRate =
    totalTrackableItems > 0
      ? Math.round((filteredCompletedItems.length / totalTrackableItems) * 100)
      : 0

  const recurringItems = searchedItems.filter((item) => item.isRecurring)
  const recurringCoverage =
    searchedItems.length > 0 ? Math.round((recurringItems.length / searchedItems.length) * 100) : 0

  const averageSessionMinutes =
    searchedItems.length > 0 ? Math.round(totalMinutes / searchedItems.length) : 0

  const subjectBreakdown = Object.entries(
    searchedItems.reduce<Record<string, { count: number; minutes: number }>>(
      (accumulator, item) => {
        const currentSubject = accumulator[item.subject] || { count: 0, minutes: 0 }

        accumulator[item.subject] = {
          count: currentSubject.count + 1,
          minutes: currentSubject.minutes + getDurationMinutes(item.startTime, item.endTime),
        }

        return accumulator
      },
      {},
    ),
  )
    .map(([subject, value]) => ({
      subject,
      count: value.count,
      minutes: value.minutes,
    }))
    .sort((left, right) => right.minutes - left.minutes)
    .slice(0, 5)

  const dayBreakdown = DAY_ORDER.map((day) => {
    const active = filteredActiveItems.filter((item) => item.day === day)
    const completed = filteredCompletedItems.filter((item) => item.day === day)
    const archived = filteredArchivedItems.filter((item) => item.day === day)

    return {
      day,
      activeMinutes: getMinutesForItems(active),
      completedMinutes: getMinutesForItems(completed),
      archivedMinutes: getMinutesForItems(archived),
      totalMinutes: getMinutesForItems([...active, ...completed, ...archived]),
    }
  })

  const busiestDay = [...dayBreakdown].sort(
    (left, right) => right.totalMinutes - left.totalMinutes,
  )[0]
  const lastTimelineEvent = [...filteredCompletedItems, ...filteredArchivedItems].sort(
    (left, right) =>
      new Date(getRecordTimestamp(right)).getTime() - new Date(getRecordTimestamp(left)).getTime(),
  )[0]

  return {
    totalMinutes,
    activeMinutes,
    completedMinutes,
    archivedMinutes,
    completionRate,
    recurringCoverage,
    averageSessionMinutes,
    subjectBreakdown,
    dayBreakdown,
    busiestDay,
    lastTimelineEvent,
  }
}
