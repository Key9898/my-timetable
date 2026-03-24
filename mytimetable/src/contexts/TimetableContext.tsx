import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { TimetableItem } from '../models/Timetable';
import { timetableService } from '../services/timetableService';

interface TimetableContextType {
    items: TimetableItem[];
    loading: boolean;
    error: string | null;
    viewType: 'list' | 'grid';
    setViewType: (view: 'list' | 'grid') => void;
    fetchTimetable: () => Promise<void>;
    addItem: (item: Omit<TimetableItem, 'id'>) => Promise<void>;
    updateItem: (id: string, item: Partial<TimetableItem>) => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
}

const TimetableContext = createContext<TimetableContextType | undefined>(undefined);

export const TimetableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<TimetableItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewType, setViewType] = useState<'list' | 'grid'>('list');

    const fetchTimetable = useCallback(async () => {
        try {
            setLoading(true);
            const data = await timetableService.getTimetable();
            setItems(data);
            setError(null);
        } catch (err) {
            setError('Failed to load schedule. Using local cache.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTimetable();
    }, [fetchTimetable]);

    const addItem = async (item: Omit<TimetableItem, 'id'>) => {
        // Simple conflict detection before adding
        const hasConflict = items.some(existing => 
            existing.day === item.day && 
            ((item.startTime >= existing.startTime && item.startTime < existing.endTime) ||
             (item.endTime > existing.startTime && item.endTime <= existing.endTime))
        );

        if (hasConflict && !window.confirm('Conflict detected: Another task is scheduled at this time. Save anyway?')) {
            throw new Error('Task timing conflict');
        }

        const newItem = await timetableService.addItem(item);
        setItems(prev => [...prev, newItem]);
    };

    const updateItem = async (id: string, item: Partial<TimetableItem>) => {
        const updatedItem = await timetableService.updateItem(id, item);
        setItems(prev => prev.map(i => i.id === id ? updatedItem : i));
    };

    const deleteItem = async (id: string) => {
        await timetableService.deleteItem(id);
        setItems(prev => prev.filter(i => i.id !== id));
    };

    return (
        <TimetableContext.Provider value={{ 
            items, loading, error, viewType, setViewType, fetchTimetable, addItem, updateItem, deleteItem 
        }}>
            {children}
        </TimetableContext.Provider>
    );
};

export const useTimetableContext = () => {
    const context = useContext(TimetableContext);
    if (!context) throw new Error('useTimetableContext must be used within TimetableProvider');
    return context;
};
