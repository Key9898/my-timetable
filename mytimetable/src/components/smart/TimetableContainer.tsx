import React, { useEffect, useState } from 'react';
import type { TimetableItem } from '../../models/Timetable';
import { timetableService } from '../../services/timetableService';
import TimetableCard from '../dumb/common/TimetableCard';

const TimetableContainer: React.FC = () => {
    const [items, setItems] = useState<TimetableItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                setLoading(true);
                const data = await timetableService.getTimetable();
                setItems(data);
            } catch (err) {
                setError('Failed to load timetable');
            } finally {
                setLoading(false);
            }
        };

        fetchTimetable();
    }, []);

    if (loading) return <div className="flex justify-center p-8"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    if (error) return <div className="alert alert-error">{error}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto p-4">
            {items.length > 0 ? (
                items.map((item) => (
                    <TimetableCard key={item.id} item={item} />
                ))
            ) : (
                <div className="col-span-full text-center py-10 opacity-50">
                    No items found in your timetable.
                </div>
            )}
        </div>
    );
};

export default TimetableContainer;
