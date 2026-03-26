import { describe, it, expect } from 'vitest'
import {
  formatTime,
  formatDay,
  getTimeValue,
  getDurationMinutes,
  formatDuration,
} from './dateFormatter'

describe('formatTime', () => {
  it('returns empty string for empty input', () => {
    expect(formatTime('')).toBe('')
  })

  it('converts 24-hour format to 12-hour format with AM', () => {
    expect(formatTime('09:00')).toBe('9:00 AM')
    expect(formatTime('11:30')).toBe('11:30 AM')
  })

  it('converts 24-hour format to 12-hour format with PM', () => {
    expect(formatTime('13:00')).toBe('1:00 PM')
    expect(formatTime('23:59')).toBe('11:59 PM')
  })

  it('handles midnight correctly', () => {
    expect(formatTime('00:00')).toBe('12:00 AM')
  })

  it('handles noon correctly', () => {
    expect(formatTime('12:00')).toBe('12:00 PM')
  })
})

describe('formatDay', () => {
  it('capitalizes the first letter of the day', () => {
    expect(formatDay('monday')).toBe('Monday')
    expect(formatDay('tuesday')).toBe('Tuesday')
  })

  it('returns already capitalized day unchanged', () => {
    expect(formatDay('Wednesday')).toBe('Wednesday')
  })
})

describe('getTimeValue', () => {
  it('returns 0 for empty input', () => {
    expect(getTimeValue('')).toBe(0)
  })

  it('converts time string to minutes from midnight', () => {
    expect(getTimeValue('00:00')).toBe(0)
    expect(getTimeValue('01:00')).toBe(60)
    expect(getTimeValue('01:30')).toBe(90)
    expect(getTimeValue('12:00')).toBe(720)
    expect(getTimeValue('23:59')).toBe(1439)
  })
})

describe('getDurationMinutes', () => {
  it('calculates duration between two times', () => {
    expect(getDurationMinutes('09:00', '10:00')).toBe(60)
    expect(getDurationMinutes('09:00', '09:30')).toBe(30)
    expect(getDurationMinutes('09:00', '12:00')).toBe(180)
  })

  it('returns 0 if end time is before start time', () => {
    expect(getDurationMinutes('10:00', '09:00')).toBe(0)
  })

  it('treats empty start time as midnight', () => {
    expect(getDurationMinutes('', '10:00')).toBe(600)
  })

  it('returns 0 for empty end time', () => {
    expect(getDurationMinutes('09:00', '')).toBe(0)
  })
})

describe('formatDuration', () => {
  it('formats minutes into hours and minutes', () => {
    expect(formatDuration(60)).toBe('1h')
    expect(formatDuration(90)).toBe('1h 30m')
    expect(formatDuration(30)).toBe('30m')
    expect(formatDuration(120)).toBe('2h')
    expect(formatDuration(135)).toBe('2h 15m')
  })

  it('handles zero minutes', () => {
    expect(formatDuration(0)).toBe('0m')
  })
})
