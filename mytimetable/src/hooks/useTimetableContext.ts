import { useContext } from 'react'
import { TimetableContext, type TimetableContextType } from '../contexts/TimetableContext'

export const useTimetableContext = (): TimetableContextType => {
  const context = useContext(TimetableContext)
  if (!context) {
    throw new Error('useTimetableContext must be used within a TimetableProvider')
  }
  return context
}
