import type { TimetableItem } from '../models/Timetable';
import { mapTimetableItems } from '../mappers/timetableMapper';
import { MOCK_TIMETABLE_DATA, mockApiResponse } from '../mocks/timetableMock';

const STORAGE_KEY = 'my_timetable_data';
const USE_MOCK = true; // Still use mock for initial load if no data in Storage

export const timetableService = {
    getTimetable: async (): Promise<TimetableItem[]> => {
        const storedItems = localStorage.getItem(STORAGE_KEY);
        
        if (storedItems) {
            return JSON.parse(storedItems);
        }

        // Default to mock data if nothing in LocalStorage
        if (USE_MOCK) {
            const data = await mockApiResponse(MOCK_TIMETABLE_DATA);
            const mapped = mapTimetableItems(data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
            return mapped;
        }

        return [];
    },

    addItem: async (item: Omit<TimetableItem, 'id'>): Promise<TimetableItem> => {
        const items = await timetableService.getTimetable();
        const newItem: TimetableItem = {
            ...item,
            id: Math.random().toString(36).substr(2, 9),
        };
        
        const updatedItems = [...items, newItem];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
        return newItem;
    },

    updateItem: async (id: string, updates: Partial<TimetableItem>): Promise<TimetableItem> => {
        const items = await timetableService.getTimetable();
        const existingIndex = items.findIndex(item => item.id === id);
        
        if (existingIndex === -1) throw new Error('Item not found');
        
        const updatedItem = { ...items[existingIndex], ...updates };
        items[existingIndex] = updatedItem;
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        return updatedItem;
    },

    deleteItem: async (id: string): Promise<void> => {
        const items = await timetableService.getTimetable();
        const filteredItems = items.filter(item => item.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredItems));
    }
};
