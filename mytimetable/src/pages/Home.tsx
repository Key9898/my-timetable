import { useState, useEffect, type FC } from 'react';
import TimetableContainer from '../containers/TimetableContainer';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useModal } from '../hooks/useModal';
import { useTimetable } from '../hooks/useTimetable';
import type { TimetableItem, ItemColor } from '../models/Timetable';
import { Plus, List, Grid, MapPin } from 'lucide-react';

const Home: FC = () => {
    const { isOpen: isFormModalOpen, openModal, closeModal } = useModal();
    const { addItem, updateItem, viewType, setViewType } = useTimetable();

    const [editingItem, setEditingItem] = useState<TimetableItem | null>(null);
    const [formData, setFormData] = useState({
        subject: '',
        startTime: '',
        endTime: '',
        day: 'Monday' as any,
        room: '',
        color: 'purple' as ItemColor,
        isRecurring: true as boolean
    });

    const [isSaving, setIsSaving] = useState(false);

    const colors: ItemColor[] = ['blue', 'purple', 'emerald', 'rose', 'amber', 'indigo'];

    useEffect(() => {
        if (editingItem) {
            setFormData({
                subject: editingItem.subject,
                startTime: editingItem.startTime,
                endTime: editingItem.endTime,
                day: editingItem.day,
                room: editingItem.room || '',
                color: editingItem.color || 'purple',
                isRecurring: editingItem.isRecurring ?? true
            });
            openModal();
        } else {
            setFormData({
                subject: '',
                startTime: '',
                endTime: '',
                day: 'Monday',
                room: '',
                color: 'purple',
                isRecurring: true
            });
        }
    }, [editingItem, openModal]);

    const handleFormSubmit = async () => {
        if (!formData.subject || !formData.startTime || !formData.endTime) return;
        
        try {
            setIsSaving(true);
            if (editingItem) {
                await updateItem(editingItem.id, formData);
            } else {
                await addItem(formData);
            }
            closeModal();
            setEditingItem(null);
        } catch (error) {
            console.error('Failed to save item:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleOpenAddModal = () => {
        setEditingItem(null);
        openModal();
    };

    return (
        <div className="min-h-screen bg-base-100 p-4 md:p-12 animate-in fade-in duration-1000 overflow-x-hidden">
            <header className="max-w-5xl mx-auto mb-12 relative overflow-hidden p-8 rounded-[3.5rem] bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/5 shadow-2xl shadow-primary/5">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] uppercase">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            Pro Architecture
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-primary tracking-tighter leading-none">
                            MY <span className="text-secondary">PLAN</span>
                        </h1>
                        <p className="text-xl text-base-content/40 font-bold max-w-sm">
                            Sophisticated scheduling for high-impact developers.
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-5 w-full md:w-auto min-w-[240px]">
                        <Button 
                            onClick={handleOpenAddModal} 
                            variant="primary" 
                            size="lg" 
                            className="rounded-[2.5rem] shadow-[0_20px_50px_-10px_rgba(100,50,255,0.3)] hover:translate-y-[-2px] transition-all flex items-center gap-3 justify-center"
                        >
                            <Plus size={20} strokeWidth={3} /> Add Smart Task
                        </Button>
                        <div className="flex bg-base-300/30 p-1.5 rounded-[1.8rem] border border-base-content/5 backdrop-blur-sm">
                            <button 
                                onClick={() => setViewType('list')}
                                className={`flex-1 px-6 py-3 rounded-[1.4rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${viewType === 'list' ? 'bg-white shadow-xl text-primary scale-[1.02]' : 'opacity-30 hover:opacity-100'}`}
                            >
                                <List size={14} strokeWidth={3} /> Card View
                            </button>
                            <button 
                                onClick={() => setViewType('grid')}
                                className={`flex-1 px-6 py-3 rounded-[1.4rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${viewType === 'grid' ? 'bg-white shadow-xl text-primary scale-[1.02]' : 'opacity-30 hover:opacity-100'}`}
                            >
                                <Grid size={14} strokeWidth={3} /> Grid View
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            </header>

            <main className="max-w-5xl mx-auto pb-40">
                <TimetableContainer onEdit={setEditingItem} />
            </main>

            <Modal
                id="item-form-modal"
                title={editingItem ? "Edit Schedule" : "New Smart Task"}
                isOpen={isFormModalOpen}
                onClose={() => { closeModal(); setEditingItem(null); }}
                className="max-w-xl rounded-[3rem]"
            >
                <div className="flex flex-col gap-8 pb-4">
                    <div className="form-control">
                        <label className="label uppercase text-[10px] font-black tracking-[0.2em] opacity-40 ml-2 mb-1">Subject / Project</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Master Neural Networks"
                            className="input input-bordered w-full rounded-[1.8rem] bg-base-200/50 border-none focus:ring-4 focus:ring-primary/20 text-xl py-8 px-8 font-bold" 
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label uppercase text-[10px] font-black tracking-[0.2em] opacity-40 ml-2 mb-1">Day of Week</label>
                            <select 
                                className="select select-bordered w-full rounded-[1.5rem] bg-base-200/50 border-none focus:ring-4 focus:ring-primary/20 h-14 font-bold"
                                value={formData.day}
                                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                            >
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label uppercase text-[10px] font-black tracking-[0.2em] opacity-40 ml-2 mb-1">Visual Accent</label>
                            <div className="flex gap-3 items-center h-14 px-4 bg-base-200/30 rounded-[1.5rem]">
                                {colors.map(color => {
                                    const dotClasses = {
                                        blue: 'bg-blue-500', 
                                        purple: 'bg-purple-500', 
                                        emerald: 'bg-emerald-500', 
                                        rose: 'bg-rose-500', 
                                        amber: 'bg-amber-500', 
                                        indigo: 'bg-indigo-500'
                                    };
                                    return (
                                        <button 
                                            key={color}
                                            onClick={() => setFormData({...formData, color})}
                                            className={`w-7 h-7 rounded-full transition-all border-2 ${dotClasses[color]} ${formData.color === color ? 'scale-125 border-white shadow-xl ring-4 ring-primary/10' : 'border-transparent opacity-40 hover:opacity-100'}`}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                         <div className="form-control">
                            <label className="label uppercase text-[10px] font-black tracking-[0.2em] opacity-40 ml-2 mb-1">Location</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="e.g. Lab 402"
                                    className="input input-bordered w-full rounded-[1.5rem] bg-base-200/50 border-none focus:ring-4 focus:ring-primary/20 h-14 font-bold pl-12" 
                                    value={formData.room}
                                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                                />
                                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20" />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label uppercase text-[10px] font-black tracking-[0.2em] opacity-40 ml-2 mb-1">Recurrence</label>
                            <div className="flex items-center gap-3 h-14 px-5 bg-base-200/30 rounded-[1.5rem]">
                                <input 
                                    type="checkbox" 
                                    className="toggle toggle-primary h-7 w-12 rounded-full" 
                                    checked={formData.isRecurring} 
                                    onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })} 
                                />
                                <span className="text-[10px] font-black uppercase opacity-70 tracking-tighter">Weekly Repeat</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label uppercase text-[10px] font-black tracking-[0.2em] opacity-40 ml-2 mb-1">Sync Start</label>
                            <input type="time" className="input bg-base-200/50 border-none rounded-[1.5rem] h-14 font-mono font-bold" value={formData.startTime} onChange={(e) => setFormData({...formData, startTime: e.target.value})} />
                        </div>
                        <div className="form-control">
                            <label className="label uppercase text-[10px] font-black tracking-[0.2em] opacity-40 ml-2 mb-1">Finish Time</label>
                            <input type="time" className="input bg-base-200/50 border-none rounded-[1.5rem] h-14 font-mono font-bold" value={formData.endTime} onChange={(e) => setFormData({...formData, endTime: e.target.value})} />
                        </div>
                    </div>

                    <div className="modal-action gap-4 pt-6 border-t border-base-content/5 mt-4">
                        <Button onClick={closeModal} variant="ghost" className="rounded-full px-10">Discard</Button>
                        <Button onClick={handleFormSubmit} isLoading={isSaving} disabled={!formData.subject} className="rounded-full px-14 shadow-xl shadow-primary/20">Commit Changes</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Home;
