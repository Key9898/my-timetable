import { useEffect, useState, type FC } from 'react'
import { ArrowRight, BarChart3, Clock, Grid, History, List, MapPin, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import TimetableContainer from '../containers/TimetableContainer'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import { useModal } from '../hooks/useModal'
import { useTimetable } from '../hooks/useTimetable'
import { useFormValidation } from '../hooks/useFormValidation'
import { useTimetableInsights } from '../hooks/useTimetableInsights'
import type { AppRoute } from '../hooks/useBrowserNavigation'
import type { ItemColor, TimetableInput, TimetableItem } from '../models/Timetable'
import { formatDuration } from '../utils/dateFormatter'

interface HomeProps {
  onNavigate: (path: AppRoute) => void
}

const createEmptyForm = (): TimetableInput => ({
  subject: '',
  startTime: '',
  endTime: '',
  day: 'Monday',
  room: '',
  color: 'purple',
  isRecurring: true,
})

const Home: FC<HomeProps> = ({ onNavigate }) => {
  const { isOpen: isFormModalOpen, openModal, closeModal } = useModal()
  const { addItem, updateItem, activeItems, completedItems, archivedItems, viewType, setViewType } =
    useTimetable()
  const { activeMinutes, completionRate } = useTimetableInsights()

  const [editingItem, setEditingItem] = useState<TimetableItem | null>(null)
  const [formData, setFormData] = useState<TimetableInput>(createEmptyForm())
  const [isSaving, setIsSaving] = useState(false)

  const { isValid, getVisibleError, markTouched, resetTouched } = useFormValidation(formData)

  const colors: ItemColor[] = ['blue', 'purple', 'emerald', 'rose', 'amber', 'indigo']

  useEffect(() => {
    if (editingItem) {
      setFormData({
        subject: editingItem.subject,
        startTime: editingItem.startTime,
        endTime: editingItem.endTime,
        day: editingItem.day,
        room: editingItem.room || '',
        color: editingItem.color || 'purple',
        isRecurring: editingItem.isRecurring ?? true,
      })
      resetTouched()
      openModal()
    } else {
      setFormData(createEmptyForm())
      resetTouched()
    }
  }, [editingItem, openModal, resetTouched])

  const handleFormSubmit = async () => {
    if (!isValid) return

    try {
      setIsSaving(true)

      if (editingItem) {
        await updateItem(editingItem.id, formData)
      } else {
        await addItem(formData)
      }

      closeModal()
      setEditingItem(null)
    } catch {
      // Error toast is handled by useTimetable hook
    } finally {
      setIsSaving(false)
    }
  }

  const handleOpenAddModal = () => {
    setEditingItem(null)
    resetTouched()
    openModal()
  }

  return (
    <div className="animate-in fade-in duration-1000">
      <div className="mx-auto mb-12 w-full max-w-6xl px-6">
        <header className="border-primary/5 from-primary/5 to-secondary/5 shadow-primary/5 relative overflow-hidden rounded-[3.5rem] border bg-gradient-to-br p-8 shadow-2xl">
          <div className="relative z-10 flex flex-col items-center justify-between gap-6 md:flex-row lg:gap-10">
            <div className="space-y-5 text-center md:text-left">
              <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[11px] font-black tracking-[0.1em] uppercase">
                <span className="bg-primary h-2 w-2 animate-pulse rounded-full" />
                Operational Command Deck
              </div>
              <h1 className="text-primary text-4xl leading-none font-black tracking-tighter md:text-6xl lg:text-8xl">
                DASH<span className="text-secondary">BOARD</span>
              </h1>
              <p className="text-base-content/40 max-w-xl text-base font-bold md:text-lg lg:text-xl">
                Run your active schedule, move finished work into history, and jump into analytics
                the moment you need signal.
              </p>
              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-full bg-white/40 px-5 text-xs tracking-[0.2em] uppercase"
                  onClick={() => onNavigate('/analytics')}
                >
                  <BarChart3 size={14} /> Open Analytics
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-full bg-white/40 px-5 text-xs tracking-[0.2em] uppercase"
                  onClick={() => onNavigate('/history')}
                >
                  <History size={14} /> Review History
                </Button>
              </div>
            </div>

            <div className="flex w-full min-w-[200px] flex-col gap-4 md:w-auto md:min-w-[240px] md:gap-5">
              <Button
                type="button"
                onClick={handleOpenAddModal}
                variant="primary"
                size="lg"
                className="flex items-center justify-center gap-3 rounded-[2.5rem] shadow-[0_20px_50px_-10px_rgba(100,50,255,0.3)] transition-all hover:translate-y-[-2px]"
              >
                <Plus size={20} strokeWidth={3} /> Add Smart Task
              </Button>
              <div
                className="bg-base-300/30 border-base-content/5 flex rounded-[1.8rem] border p-1.5 backdrop-blur-sm"
                role="tablist"
                aria-label="Layout view selection"
              >
                <button
                  type="button"
                  onClick={() => setViewType('list')}
                  role="tab"
                  aria-selected={viewType === 'list'}
                  aria-label="Switch to Card View"
                  className={`flex flex-1 items-center justify-center gap-2 rounded-[1.4rem] px-5 py-3 text-[10px] font-black tracking-widest whitespace-nowrap uppercase transition-all ${viewType === 'list' ? 'text-primary scale-[1.02] bg-white shadow-xl' : 'opacity-30 hover:opacity-100'}`}
                >
                  <List size={14} strokeWidth={3} aria-hidden="true" /> Card View
                </button>
                <button
                  type="button"
                  onClick={() => setViewType('grid')}
                  role="tab"
                  aria-selected={viewType === 'grid'}
                  aria-label="Switch to Grid View"
                  className={`flex flex-1 items-center justify-center gap-2 rounded-[1.4rem] px-5 py-3 text-[10px] font-black tracking-widest whitespace-nowrap uppercase transition-all ${viewType === 'grid' ? 'text-primary scale-[1.02] bg-white shadow-xl' : 'opacity-30 hover:opacity-100'}`}
                >
                  <Grid size={14} strokeWidth={3} aria-hidden="true" /> Grid View
                </button>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
        </header>
      </div>

      <div className="mx-auto mb-10 w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <motion.button
            type="button"
            onClick={() => onNavigate('/analytics')}
            initial={{ y: 0 }}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="group border-secondary/20 bg-secondary/5 dark:bg-secondary/10 shadow-secondary/5 hover:bg-secondary/10 dark:hover:bg-secondary/15 rounded-[2.5rem] border-2 p-6 text-left shadow-xl backdrop-blur-xl transition-all hover:scale-[1.02!important] active:scale-95"
          >
            <p className="text-secondary text-[11px] font-black tracking-[0.1em] uppercase">
              Live Focus
            </p>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-secondary text-4xl font-black tracking-tighter">
                  {activeItems.length}
                </p>
                <p className="text-base-content/70 text-sm font-bold">Active tasks on deck</p>
              </div>
              <ArrowRight
                className="text-secondary/60 transition-transform group-hover:translate-x-1"
                size={24}
              />
            </div>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => onNavigate('/analytics')}
            initial={{ y: 0 }}
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="group border-primary/20 bg-primary/5 dark:bg-primary/10 shadow-primary/5 hover:bg-primary/10 dark:hover:bg-primary/15 rounded-[2.5rem] border-2 p-6 text-left shadow-xl backdrop-blur-xl transition-all hover:scale-[1.02!important] active:scale-95"
          >
            <p className="text-primary text-[11px] font-black tracking-[0.1em] uppercase">
              Execution Rate
            </p>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-primary text-4xl font-black tracking-tighter">
                  {completionRate}%
                </p>
                <p className="text-base-content/70 text-sm font-bold">
                  {formatDuration(activeMinutes)} still scheduled
                </p>
              </div>
              <ArrowRight
                className="text-primary/60 transition-transform group-hover:translate-x-1"
                size={24}
              />
            </div>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => onNavigate('/history')}
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.2,
            }}
            className="group border-accent/20 bg-accent/5 dark:bg-accent/10 shadow-accent/5 hover:bg-accent/10 dark:hover:bg-accent/15 rounded-[2.5rem] border-2 p-6 text-left shadow-xl backdrop-blur-xl transition-all hover:scale-[1.02!important] active:scale-95"
          >
            <p className="text-accent text-[11px] font-black tracking-[0.1em] uppercase">
              History Vault
            </p>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-accent text-4xl font-black tracking-tighter">
                  {completedItems.length + archivedItems.length}
                </p>
                <p className="text-base-content/70 text-sm font-bold">
                  Completed + archived records
                </p>
              </div>
              <ArrowRight
                className="text-accent/60 transition-transform group-hover:translate-x-1"
                size={24}
              />
            </div>
          </motion.button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        <main className="mt-4 pb-4">
          <TimetableContainer onEdit={setEditingItem} />
        </main>
      </div>

      <Modal
        id="item-form-modal"
        title={editingItem ? 'Edit Schedule' : 'New Smart Task'}
        isOpen={isFormModalOpen}
        onClose={() => {
          closeModal()
          setEditingItem(null)
        }}
        className="rounded-t-[3rem] sm:rounded-b-[3rem]"
      >
        <div className="flex flex-col gap-8 pb-4">
          <div className="form-control">
            <label
              htmlFor="subject-input"
              className="label text-primary mb-1 ml-2 text-[11px] font-black tracking-[0.1em] uppercase"
            >
              Subject / Project
            </label>
            <input
              id="subject-input"
              type="text"
              placeholder="e.g. Master Neural Networks"
              className={`input h-14 rounded-[1.5rem] border bg-white/10 px-8 text-xl font-bold transition-all placeholder:opacity-30 hover:bg-white/15 focus:bg-white/20 ${getVisibleError('subject') ? 'border-error focus:border-error' : 'border-white/20 focus:border-white/40'}`}
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              onBlur={() => markTouched('subject')}
            />
            {getVisibleError('subject') && (
              <p className="text-error mt-1 ml-2 text-xs font-bold">{getVisibleError('subject')}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="label text-primary/80 mb-1 ml-2 text-[10px] font-black tracking-[0.2em] uppercase">
              Day of Week
            </label>
            <div className="no-scrollbar flex gap-2 overflow-x-auto px-1 pb-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                (day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setFormData({ ...formData, day: day as TimetableInput['day'] })}
                    className={`h-12 flex-shrink-0 rounded-full border-2 px-6 text-sm font-bold transition-all ${
                      formData.day === day
                        ? 'bg-primary border-primary shadow-primary/30 text-white shadow-lg'
                        : 'text-base-content/60 border-white/5 bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {day}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="form-control">
            <label className="label text-primary/80 mb-1 ml-2 text-[11px] font-black tracking-[0.1em] uppercase">
              Visual Accent
            </label>
            <div className="no-scrollbar flex h-14 items-center gap-2.5 overflow-x-auto rounded-[1.5rem] border border-white/20 bg-white/10 px-4 sm:gap-3">
              {colors.map((color) => {
                const dotClasses = {
                  blue: 'bg-blue-500',
                  purple: 'bg-purple-500',
                  emerald: 'bg-emerald-500',
                  rose: 'bg-rose-500',
                  amber: 'bg-amber-500',
                  indigo: 'bg-indigo-500',
                }
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    aria-label={`Select ${color} accent`}
                    className={`h-7 w-7 rounded-full border-2 transition-all sm:h-8 sm:w-8 ${dotClasses[color]} ${formData.color === color ? 'ring-primary/10 scale-125 border-white shadow-xl ring-4' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  />
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="form-control">
              <label
                htmlFor="room-input"
                className="label text-primary/80 mb-1 ml-2 text-[11px] font-black tracking-[0.1em] uppercase"
              >
                Location
              </label>
              <div className="relative">
                <input
                  id="room-input"
                  type="text"
                  placeholder="e.g. Lab 402"
                  className="input h-14 w-full rounded-[1.5rem] border border-white/20 bg-white/10 pl-12 font-bold transition-all placeholder:opacity-30 hover:bg-white/15 focus:border-white/40 focus:bg-white/20"
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                />
                <MapPin
                  size={18}
                  className="text-primary absolute top-1/2 left-4 -translate-y-1/2 opacity-40"
                />
              </div>
            </div>
            <div className="form-control">
              <label
                htmlFor="recurring-toggle"
                className="label text-primary/80 mb-1 ml-2 text-[11px] font-black tracking-[0.1em] uppercase"
              >
                Recurrence
              </label>
              <div className="flex h-14 items-center gap-3 rounded-[1.5rem] border border-white/20 bg-white/10 px-5 transition-all hover:bg-white/15">
                <input
                  id="recurring-toggle"
                  type="checkbox"
                  className="toggle toggle-primary h-7 w-12 rounded-full"
                  checked={formData.isRecurring}
                  onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                />
                <span className="text-base-content/60 text-[10px] font-black tracking-tighter uppercase">
                  Weekly Repeat
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="form-control">
              <label
                htmlFor="start-time-input"
                className="label text-primary/80 mb-1 ml-2 text-[11px] font-black tracking-[0.1em] uppercase"
              >
                Starts At
              </label>
              <div className="relative">
                <input
                  id="start-time-input"
                  type="time"
                  className={`input h-14 w-full rounded-[1.5rem] border bg-white/10 pl-12 font-mono font-bold transition-all hover:bg-white/15 focus:bg-white/20 ${getVisibleError('startTime') ? 'border-error focus:border-error' : 'border-white/20 focus:border-white/40'}`}
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  onBlur={() => markTouched('startTime')}
                />
                <Clock
                  size={16}
                  className="text-primary absolute top-1/2 left-4 -translate-y-1/2 opacity-40"
                />
              </div>
              {getVisibleError('startTime') && (
                <p className="text-error mt-1 ml-2 text-xs font-bold">
                  {getVisibleError('startTime')}
                </p>
              )}
            </div>
            <div className="form-control">
              <label
                htmlFor="end-time-input"
                className="label text-primary/80 mb-1 ml-2 text-[11px] font-black tracking-[0.1em] uppercase"
              >
                Finish Time
              </label>
              <div className="relative">
                <input
                  id="end-time-input"
                  type="time"
                  className={`input h-14 w-full rounded-[1.5rem] border bg-white/10 pl-12 font-mono font-bold transition-all hover:bg-white/15 focus:bg-white/20 ${getVisibleError('endTime') ? 'border-error focus:border-error' : 'border-white/20 focus:border-white/40'}`}
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  onBlur={() => markTouched('endTime')}
                />
                <Clock
                  size={16}
                  className="text-primary absolute top-1/2 left-4 -translate-y-1/2 opacity-40"
                />
              </div>
              {getVisibleError('endTime') && (
                <p className="text-error mt-1 ml-2 text-xs font-bold">
                  {getVisibleError('endTime')}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 border-t border-white/5 pt-6 sm:grid-cols-2">
            <Button
              type="button"
              onClick={closeModal}
              variant="ghost"
              className="order-2 h-14 w-full rounded-full border-white/10 bg-white/5 py-4 hover:bg-white/10 sm:order-1"
            >
              Discard Changes
            </Button>
            <Button
              type="button"
              onClick={handleFormSubmit}
              isLoading={isSaving}
              disabled={!isValid}
              className="shadow-primary/40 bg-primary order-1 h-14 w-full rounded-full py-4 font-black text-white shadow-2xl transition-all hover:scale-[1.02] active:scale-95 sm:order-2"
            >
              Save {editingItem ? 'Edits' : 'Task'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Home
