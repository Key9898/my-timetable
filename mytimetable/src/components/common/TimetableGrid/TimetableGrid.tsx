import { type FC } from 'react';
import type { TimetableItem, DayOfWeek } from '../../../models/Timetable';
import { formatTime } from '../../../utils/dateFormatter';
import { motion } from 'framer-motion';
import { Clock, Trash2 } from 'lucide-react';

interface TimetableGridProps {
    items: TimetableItem[];
    onEdit?: (item: TimetableItem) => void;
    onDelete?: (id: string) => void;
}

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const TimetableGrid: FC<TimetableGridProps> = ({ items, onEdit, onDelete }) => {
    // Group items by day
    const getItemsForDay = (day: DayOfWeek) => {
        return items
            .filter(item => item.day === day)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
    };

    const colorClasses: Record<string, string> = {
        blue: 'bg-blue-500/10 border-blue-500/30 text-blue-800',
        purple: 'bg-purple-500/10 border-purple-500/30 text-purple-800',
        emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800',
        rose: 'bg-rose-500/10 border-rose-500/30 text-rose-800',
        amber: 'bg-amber-500/10 border-amber-500/30 text-amber-800',
        indigo: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-800',
    };

    return (
        <div className="w-full overflow-x-auto pb-8 animate-in fade-in zoom-in duration-500">
            <div className="grid grid-cols-7 min-w-[1000px] gap-2 p-4">
                {DAYS.map(day => (
                    <div key={day} className="flex flex-col gap-3 min-h-[400px]">
                        <div className="text-center py-3 bg-base-200 rounded-2xl border border-base-content/5 mb-2">
                             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{day}</h4>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            {getItemsForDay(day).map(item => (
                                <motion.div 
                                    layoutId={item.id}
                                    key={item.id}
                                    className={`group relative p-4 rounded-2xl border-2 transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02] cursor-pointer ${colorClasses[item.color || 'purple']}`}
                                    onClick={() => onEdit?.(item)}
                                >
                                    <div className="text-xs font-black uppercase tracking-tight line-clamp-2">{item.subject}</div>
                                    <div className="text-[9px] font-black opacity-60 mt-2 flex items-center gap-1">
                                        <Clock size={10} className="mb-0.5" /> {formatTime(item.startTime)}
                                    </div>
                                    
                                    {/* Quick Actions */}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); onDelete?.(item.id); }}
                                            className="w-5 h-5 rounded-full bg-error/20 text-error flex items-center justify-center hover:bg-error/40 transition-colors"
                                        >
                                            <Trash2 size={10} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                            
                            {getItemsForDay(day).length === 0 && (
                                <div className="h-32 rounded-2xl border-2 border-dashed border-base-content/5 flex items-center justify-center opacity-20 text-[10px] font-black uppercase">
                                    Empty
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimetableGrid;
