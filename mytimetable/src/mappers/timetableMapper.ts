import type { TimetableItem } from '../models/Timetable';

export const mapApiToTimetableItem = (apiData: any): TimetableItem => {
    return {
        id: apiData.id || Math.random().toString(36).substr(2, 9),
        subject: apiData.title || 'No Subject',
        startTime: apiData.start || '00:00',
        endTime: apiData.end || '00:00',
        day: apiData.day_of_week || 'Monday',
        room: apiData.location || '',
    };
};

export const mapTimetableItems = (items: any[]): TimetableItem[] => {
    return items.map(mapApiToTimetableItem);
};
