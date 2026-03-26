import { useTimetableContext } from './useTimetableContext'
import { useToast } from './useToast'
import type { TimetableInput, TimetableItem } from '../models/Timetable'

export const useTimetable = () => {
  const {
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
    fetchTimetable,
    addItem,
    updateItem,
    deleteItem,
    completeItem,
    archiveItem,
    restoreItem,
    viewType,
    setViewType,
  } = useTimetableContext()

  const toast = useToast()

  const handleAddItem = async (item: TimetableInput) => {
    try {
      await addItem(item)
      toast.success('Task added successfully')
    } catch (err) {
      toast.error('Failed to add task')
      throw err
    }
  }

  const handleUpdateItem = async (id: string, updates: Partial<TimetableItem>) => {
    try {
      await updateItem(id, updates)
      toast.success('Task updated successfully')
    } catch (err) {
      toast.error('Failed to update task')
      throw err
    }
  }

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteItem(id)
      toast.success('Task deleted successfully')
    } catch (err) {
      toast.error('Failed to delete task')
      throw err
    }
  }

  const handleCompleteItem = async (id: string) => {
    try {
      await completeItem(id)
      toast.success('Task marked as completed')
    } catch (err) {
      toast.error('Failed to complete task')
      throw err
    }
  }

  const handleArchiveItem = async (id: string) => {
    try {
      await archiveItem(id)
      toast.success('Task archived successfully')
    } catch (err) {
      toast.error('Failed to archive task')
      throw err
    }
  }

  const handleRestoreItem = async (id: string) => {
    try {
      await restoreItem(id)
      toast.success('Task restored successfully')
    } catch (err) {
      toast.error('Failed to restore task')
      throw err
    }
  }

  return {
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
    addItem: handleAddItem,
    updateItem: handleUpdateItem,
    deleteItem: handleDeleteItem,
    completeItem: handleCompleteItem,
    archiveItem: handleArchiveItem,
    restoreItem: handleRestoreItem,
  }
}
