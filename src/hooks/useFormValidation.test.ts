import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFormValidation } from './useFormValidation'
import type { TimetableInput } from '../models/Timetable'

describe('useFormValidation', () => {
  const createFormData = (overrides?: Partial<TimetableInput>): TimetableInput => ({
    subject: 'Test Subject',
    startTime: '09:00',
    endTime: '10:00',
    day: 'Monday',
    room: '',
    color: 'purple',
    isRecurring: true,
    ...overrides,
  })

  describe('initial state', () => {
    it('returns isValid as true for valid form data', () => {
      const { result } = renderHook(() => useFormValidation(createFormData()))

      expect(result.current.isValid).toBe(true)
    })

    it('returns isValid as false for empty subject', () => {
      const { result } = renderHook(() => useFormValidation(createFormData({ subject: '' })))

      expect(result.current.isValid).toBe(false)
    })

    it('returns isValid as false for empty startTime', () => {
      const { result } = renderHook(() => useFormValidation(createFormData({ startTime: '' })))

      expect(result.current.isValid).toBe(false)
    })

    it('returns isValid as false for empty endTime', () => {
      const { result } = renderHook(() => useFormValidation(createFormData({ endTime: '' })))

      expect(result.current.isValid).toBe(false)
    })
  })

  describe('time validation', () => {
    it('returns error when end time is before start time', () => {
      const { result } = renderHook(() =>
        useFormValidation(createFormData({ startTime: '10:00', endTime: '09:00' })),
      )

      expect(result.current.errors.endTime).toBe('End time must be after start time')
      expect(result.current.isValid).toBe(false)
    })

    it('returns error when end time equals start time', () => {
      const { result } = renderHook(() =>
        useFormValidation(createFormData({ startTime: '09:00', endTime: '09:00' })),
      )

      expect(result.current.errors.endTime).toBe('End time must be after start time')
    })

    it('returns valid when end time is after start time', () => {
      const { result } = renderHook(() =>
        useFormValidation(createFormData({ startTime: '09:00', endTime: '10:00' })),
      )

      expect(result.current.errors.endTime).toBeUndefined()
      expect(result.current.isValid).toBe(true)
    })
  })

  describe('subject validation', () => {
    it('returns error for empty subject', () => {
      const { result } = renderHook(() => useFormValidation(createFormData({ subject: '' })))

      expect(result.current.errors.subject).toBe('Subject is required')
    })

    it('returns error for whitespace-only subject', () => {
      const { result } = renderHook(() => useFormValidation(createFormData({ subject: '   ' })))

      expect(result.current.errors.subject).toBe('Subject is required')
    })

    it('returns error for subject longer than 100 characters', () => {
      const longSubject = 'a'.repeat(101)
      const { result } = renderHook(() =>
        useFormValidation(createFormData({ subject: longSubject })),
      )

      expect(result.current.errors.subject).toBe('Subject must be less than 100 characters')
    })
  })

  describe('touched state', () => {
    it('does not show error before field is touched', () => {
      const { result } = renderHook(() => useFormValidation(createFormData({ subject: '' })))

      expect(result.current.getVisibleError('subject')).toBeUndefined()
    })

    it('shows error after field is touched', () => {
      const { result } = renderHook(() => useFormValidation(createFormData({ subject: '' })))

      act(() => {
        result.current.markTouched('subject')
      })

      expect(result.current.getVisibleError('subject')).toBe('Subject is required')
    })

    it('resets touched state', () => {
      const { result } = renderHook(() => useFormValidation(createFormData({ subject: '' })))

      act(() => {
        result.current.markTouched('subject')
      })

      expect(result.current.getVisibleError('subject')).toBe('Subject is required')

      act(() => {
        result.current.resetTouched()
      })

      expect(result.current.getVisibleError('subject')).toBeUndefined()
    })
  })

  describe('validateForm', () => {
    it('returns all errors for invalid form', () => {
      const { result } = renderHook(() =>
        useFormValidation(createFormData({ subject: '', startTime: '', endTime: '' })),
      )

      const validationResult = result.current.validateForm()

      expect(validationResult.isValid).toBe(false)
      expect(validationResult.errors.subject).toBe('Subject is required')
      expect(validationResult.errors.startTime).toBe('Start time is required')
      expect(validationResult.errors.endTime).toBe('End time is required')
    })

    it('returns no errors for valid form', () => {
      const { result } = renderHook(() => useFormValidation(createFormData()))

      const validationResult = result.current.validateForm()

      expect(validationResult.isValid).toBe(true)
      expect(validationResult.errors).toEqual({})
    })
  })
})
