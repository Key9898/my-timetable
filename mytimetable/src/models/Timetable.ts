export interface TimetableItem {
    id: string;
    subject: string;
    startTime: string;
    endTime: string;
    day: string;
    room?: string;
}

export interface TimetableState {
    items: TimetableItem[];
    isLoading: boolean;
    error: string | null;
}
