import React from 'react';
import type { TimetableItem } from '../../../models/Timetable';

interface TimetableCardProps {
    item: TimetableItem;
    onEdit?: (id: string) => void;
}

const TimetableCard: React.FC<TimetableCardProps> = ({ item, onEdit }) => {
    return (
        <div className="card bg-base-200 shadow-md border border-base-300 hover:border-primary transition-colors">
            <div className="card-body p-4">
                <h3 className="card-title text-lg font-bold text-primary">{item.subject}</h3>
                <div className="flex flex-col gap-1 text-sm opacity-80">
                    <p>📅 {item.day}</p>
                    <p>⏰ {item.startTime} - {item.endTime}</p>
                    {item.room && <p>📍 {item.room}</p>}
                </div>
                {onEdit && (
                    <div className="card-actions justify-end mt-2">
                        <button
                            className="btn btn-xs btn-ghost text-secondary"
                            onClick={() => onEdit(item.id)}
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimetableCard;
