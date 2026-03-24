import { useTimetableContext } from '../contexts/TimetableContext';
import type { TimetableItem } from '../models/Timetable';

/**
 * useTimetable Hook
 * Centralizing hook for accessing global timetable state and operations.
 */
export const useTimetable = () => {
    const { 
        items, 
        loading, 
        error, 
        fetchTimetable, 
        addItem, 
        updateItem, 
        deleteItem,
        viewType,
        setViewType
    } = useTimetableContext();

    const handleAddItem = async (item: Omit<TimetableItem, 'id'>) => {
        try {
            await addItem(item);
        } catch (err) {
            console.error('Add failed:', err);
            throw err;
        }
    };

    const handleUpdateItem = async (id: string, updates: Partial<TimetableItem>) => {
        try {
            await updateItem(id, updates);
        } catch (err) {
            console.error('Update failed:', err);
            throw err;
        }
    };

    const handleDeleteItem = async (id: string) => {
        try {
            await deleteItem(id);
        } catch (err) {
            console.error('Delete failed:', err);
            throw err;
        }
    };

    return {
        items,
        loading,
        error,
        viewType,
        setViewType,
        fetchTimetable,
        addItem: handleAddItem,
        updateItem: handleUpdateItem,
        deleteItem: handleDeleteItem
    };
};
