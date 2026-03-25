import { useState, useCallback, useMemo } from 'react'
import type { TimetableInput } from '../models/Timetable'
import { getTimeValue } from '../utils/dateFormatter'

export interface FormErrors {
  subject?: string
  startTime?: string
  endTime?: string
  day?: string
}

export interface FormValidationResult {
  isValid: boolean
  errors: FormErrors
}

export const useFormValidation = (formData: TimetableInput) => {
  const [touched, setTouched] = useState<Set<keyof TimetableInput>>(new Set())

  const validateField = useCallback(
    (field: keyof TimetableInput, value: unknown): string | undefined => {
      switch (field) {
        case 'subject':
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            return 'Subject is required'
          }
          if (typeof value === 'string' && value.length > 100) {
            return 'Subject must be less than 100 characters'
          }
          break
        case 'startTime':
          if (!value || (typeof value === 'string' && value === '')) {
            return 'Start time is required'
          }
          break
        case 'endTime':
          if (!value || (typeof value === 'string' && value === '')) {
            return 'End time is required'
          }
          if (typeof value === 'string' && formData.startTime) {
            const startMinutes = getTimeValue(formData.startTime)
            const endMinutes = getTimeValue(value)
            if (endMinutes <= startMinutes) {
              return 'End time must be after start time'
            }
          }
          break
        case 'day':
          if (!value) {
            return 'Day is required'
          }
          break
      }
      return undefined
    },
    [formData.startTime],
  )

  const validateForm = useCallback((): FormValidationResult => {
    const errors: FormErrors = {}

    const subjectError = validateField('subject', formData.subject)
    if (subjectError) errors.subject = subjectError

    const startTimeError = validateField('startTime', formData.startTime)
    if (startTimeError) errors.startTime = startTimeError

    const endTimeError = validateField('endTime', formData.endTime)
    if (endTimeError) errors.endTime = endTimeError

    const dayError = validateField('day', formData.day)
    if (dayError) errors.day = dayError

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  }, [formData, validateField])

  const markTouched = useCallback((field: keyof TimetableInput) => {
    setTouched((prev) => new Set(prev).add(field))
  }, [])

  const resetTouched = useCallback(() => {
    setTouched(new Set())
  }, [])

  const errors = useMemo(() => {
    const result = validateForm()
    return result.errors
  }, [validateForm])

  const getVisibleError = useCallback(
    (field: keyof TimetableInput): string | undefined => {
      if (!touched.has(field)) return undefined
      return errors[field as keyof FormErrors]
    },
    [errors, touched],
  )

  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0
  }, [errors])

  return {
    errors,
    touched,
    isValid,
    validateField,
    validateForm,
    markTouched,
    resetTouched,
    getVisibleError,
  }
}
