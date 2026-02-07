import type { TimetableItem } from '../models/Timetable';
import { mapTimetableItems } from '../mappers/timetableMapper';
import { MOCK_TIMETABLE_DATA, mockApiResponse } from '../mocks/timetableMock';

const USE_MOCK = true; // Toggle this to switch between Mock and Real API

export const timetableService = {
    getTimetable: async (): Promise<TimetableItem[]> => {
        if (USE_MOCK) {
            const data = await mockApiResponse(MOCK_TIMETABLE_DATA);
            return mapTimetableItems(data);
        }

        // Real API Implementation will go here
        // const response = await fetch('/api/timetable');
        // const data = await response.json();
        // return mapTimetableItems(data);
        return [];
    },

    addTimetableItem: async (item: Partial<TimetableItem>): Promise<TimetableItem> => {
        // Mock add
        return {
            id: Math.random().toString(36).substr(2, 9),
            subject: item.subject || '',
            startTime: item.startTime || '',
            endTime: item.endTime || '',
            day: item.day || '',
            ...item
        } as TimetableItem;
    }
};
