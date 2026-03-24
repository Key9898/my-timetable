import { type FC } from 'react';
import { useTimetable } from '../../hooks/useTimetable';
import TimetableCard from '../../components/common/TimetableCard/TimetableCard';
import TimetableGrid from '../../components/common/TimetableGrid/TimetableGrid';
import type { TimetableItem } from '../../models/Timetable';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarClock, AlertCircle } from 'lucide-react';

interface TimetableContainerProps {
    onDelete?: (id: string) => void;
    onEdit?: (item: TimetableItem) => void;
}

const TimetableContainer: FC<TimetableContainerProps> = ({ onDelete, onEdit }) => {
    const { items, loading, error, deleteItem, viewType } = useTimetable();

    const handleDelete = async (id: string) => {
        if (window.confirm('Confirm delete? This cannot be undone.')) {
            await deleteItem(id);
            if (onDelete) onDelete(id);
        }
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="glass-card p-8 rounded-[2.5rem] opacity-30 animate-pulse bg-base-200 h-64 shadow-none"></div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert bg-error/10 border border-error/20 text-error max-w-4xl mx-auto m-8 p-8 rounded-[2.5rem] animate-in shake duration-500">
                <div className="flex items-center gap-6">
                    <AlertCircle size={32} />
                    <div>
                        <h3 className="font-black uppercase text-xs tracking-widest mb-1 opacity-50">System Error</h3>
                        <p className="text-xl font-bold">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <AnimatePresence mode="wait">
            {viewType === 'list' ? (
                <motion.div 
                    key="list"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full"
                >
                    {items.length > 0 ? (
                        items.map((item) => (
                            <TimetableCard 
                                key={item.id}
                                item={item} 
                                onDelete={handleDelete}
                                onEdit={() => onEdit?.(item)} 
                            />
                        ))
                    ) : (
                        <EmptyState />
                    )}
                </motion.div>
            ) : (
                <motion.div
                    key="grid"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                >
                    <TimetableGrid 
                        items={items}
                        onDelete={handleDelete}
                        onEdit={onEdit}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const EmptyState = () => (
    <div className="col-span-full border-2 border-dashed border-base-content/10 bg-base-200/20 py-32 px-10 rounded-[3.5rem] text-center backdrop-blur-sm animate-in zoom-in duration-700">
        <div className="flex justify-center mb-6 opacity-20">
            <CalendarClock size={64} strokeWidth={1} />
        </div>
        <h3 className="text-3xl font-black text-primary/40 tracking-tighter mb-2 leading-none">Schedule Empty</h3>
        <p className="text-base-content/30 max-w-sm mx-auto font-bold uppercase text-[10px] tracking-widest">Add a new goal to see it appear here.</p>
    </div>
);

export default TimetableContainer;
