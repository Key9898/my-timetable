
export const MOCK_TIMETABLE_DATA: any[] = [
    {
        id: '1',
        title: 'React Architecture',
        start: '09:00',
        end: '10:30',
        day_of_week: 'Monday',
        location: 'Room A',
    },
    {
        id: '2',
        title: 'TypeScript Advanced',
        start: '11:00',
        end: '12:30',
        day_of_week: 'Wednesday',
        location: 'Room B',
    },
    {
        id: '3',
        title: 'UI/UX Design',
        start: '14:00',
        end: '15:30',
        day_of_week: 'Friday',
        location: 'Room C',
    },
];

export const mockApiResponse = <T>(data: T, delay = 500): Promise<T> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
};
