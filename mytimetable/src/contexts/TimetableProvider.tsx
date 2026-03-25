import React, { useCallback, useEffect, useState } from 'react'
import { TimetableContext } from './TimetableContext'
import type { TimetableInput, TimetableItem } from '../models/Timetable'
import { timetableService } from '../services/timetableService'

export const TimetableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<TimetableItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewType, setViewType] = useState<'list' | 'grid'>('list')

  const matchesSearch = (item: TimetableItem) =>
    item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.day.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.room && item.room.toLowerCase().includes(searchQuery.toLowerCase()))

  const searchedItems = items.filter(matchesSearch)
  const activeItems = items.filter((item) => item.status === 'active')
  const completedItems = items.filter((item) => item.status === 'completed')
  const archivedItems = items.filter((item) => item.status === 'archived')
  const filteredActiveItems = searchedItems.filter((item) => item.status === 'active')
  const filteredCompletedItems = searchedItems.filter((item) => item.status === 'completed')
  const filteredArchivedItems = searchedItems.filter((item) => item.status === 'archived')
  const filteredItems = filteredActiveItems

  const fetchTimetable = useCallback(async () => {
    try {
      setLoading(true)
      const data = await timetableService.getTimetable()
      setItems(data)
      setError(null)
    } catch {
      setError('Failed to load schedule. Using local cache.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTimetable()
  }, [fetchTimetable])

  const addItem = async (item: TimetableInput) => {
    const hasConflict = activeItems.some(
      (existing) =>
        existing.day === item.day &&
        ((item.startTime >= existing.startTime && item.startTime < existing.endTime) ||
          (item.endTime > existing.startTime && item.endTime <= existing.endTime)),
    )

    if (
      hasConflict &&
      !window.confirm('Conflict detected: Another task is scheduled at this time. Save anyway?')
    ) {
      throw new Error('Task timing conflict')
    }

    const newItem = await timetableService.addItem(item)
    setItems((prev) => [...prev, newItem])
  }

  const updateItem = async (id: string, item: Partial<TimetableItem>) => {
    const updatedItem = await timetableService.updateItem(id, item)
    setItems((prev) =>
      prev.map((currentItem) => (currentItem.id === id ? updatedItem : currentItem)),
    )
  }

  const deleteItem = async (id: string) => {
    await timetableService.deleteItem(id)
    setItems((prev) => prev.filter((currentItem) => currentItem.id !== id))
  }

  const completeItem = async (id: string) => {
    const updatedItem = await timetableService.updateItem(id, { status: 'completed' })
    setItems((prev) =>
      prev.map((currentItem) => (currentItem.id === id ? updatedItem : currentItem)),
    )
  }

  const archiveItem = async (id: string) => {
    const updatedItem = await timetableService.updateItem(id, { status: 'archived' })
    setItems((prev) =>
      prev.map((currentItem) => (currentItem.id === id ? updatedItem : currentItem)),
    )
  }

  const restoreItem = async (id: string) => {
    const updatedItem = await timetableService.updateItem(id, { status: 'active' })
    setItems((prev) =>
      prev.map((currentItem) => (currentItem.id === id ? updatedItem : currentItem)),
    )
  }

  return (
    <TimetableContext.Provider
      value={{
        items,
        searchedItems,
        activeItems,
        completedItems,
        archivedItems,
        filteredItems,
        filteredActiveItems,
        filteredCompletedItems,
        filteredArchivedItems,
        searchQuery,
        setSearchQuery,
        loading,
        error,
        viewType,
        setViewType,
        fetchTimetable,
        addItem,
        updateItem,
        deleteItem,
        completeItem,
        archiveItem,
        restoreItem,
      }}
    >
      {children}
    </TimetableContext.Provider>
  )
}
