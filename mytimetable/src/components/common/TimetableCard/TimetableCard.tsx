import { type FC } from 'react';
import type { TimetableItem } from '../../../models/Timetable';
import { formatTime } from '../../../utils/dateFormatter';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Edit2, Trash2 } from 'lucide-react';

interface TimetableCardProps {
    item: TimetableItem;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const TimetableCard: FC<TimetableCardProps> = ({ item, onEdit, onDelete }) => {
    const colorClasses: Record<string, string> = {
        blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-800',
        purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-800',
        emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-800',
        rose: 'from-rose-500/20 to-rose-500/5 border-rose-500/30 text-rose-800',
        amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-800',
        indigo: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/30 text-indigo-800',
    };

    const accentClasses: Record<string, string> = {
        blue: 'bg-blue-500', 
        purple: 'bg-purple-500', 
        emerald: 'bg-emerald-500', 
        rose: 'bg-rose-500', 
        amber: 'bg-amber-500', 
        indigo: 'bg-indigo-500'
    };

    const color = item.color || 'purple';

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`group relative overflow-hidden glass-card p-6 rounded-[2.5rem] border-2 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] bg-gradient-to-br ${colorClasses[color]}`}
        >
            <div className="flex flex-col gap-6 relative z-10">
                <div className="flex justify-between items-start gap-4">
                    <h3 className="text-2xl font-black tracking-tighter leading-tight group-hover:translate-x-1 transition-transform">{item.subject}</h3>
                    <div className="flex gap-2">
                        <button onClick={() => onEdit?.(item.id)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/40 border-none transition-all">
                            <Edit2 size={14} />
                        </button>
                        <button onClick={() => onDelete?.(item.id)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/40 border-none transition-all">
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 bg-white/10 p-3 rounded-2xl border border-white/20">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-lg ${accentClasses[color]}`}>
                            <Calendar size={14} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest opacity-80">{item.day}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 bg-white/10 p-3 rounded-2xl border border-white/20">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-lg ${accentClasses[color]}`}>
                            <Clock size={14} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest opacity-80 font-mono italic">{formatTime(item.startTime)}</span>
                    </div>
                </div>

                {item.room && (
                    <div className="flex items-center gap-4 bg-white/10 p-3 rounded-2xl border border-white/20">
                         <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-lg ${accentClasses[color]}`}>
                            <MapPin size={14} />
                         </div>
                         <span className="text-xs font-black uppercase tracking-widest opacity-80">{item.room}</span>
                    </div>
                )}
            </div>

            {/* Glossy overlay effect */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/5 pointer-events-none skew-y-12 translate-y-[-80%] transition-transform group-hover:translate-y-[-75%]"></div>
        </motion.div>
    );
};

export default TimetableCard;
