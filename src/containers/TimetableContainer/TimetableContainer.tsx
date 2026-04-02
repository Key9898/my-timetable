import { type FC } from 'react'
import { useTimetable } from '../../hooks/useTimetable'
import TimetableCard from '../../components/common/TimetableCard/TimetableCard'
import TimetableGrid from '../../components/common/TimetableGrid/TimetableGrid'
import type { TimetableItem } from '../../models/Timetable'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarClock, AlertCircle } from 'lucide-react'

interface TimetableContainerProps {
  onDelete?: (id: string) => void
  onEdit?: (item: TimetableItem) => void
}

const TimetableContainer: FC<TimetableContainerProps> = ({ onDelete, onEdit }) => {
  const { filteredActiveItems, loading, error, deleteItem, completeItem, archiveItem, viewType } =
    useTimetable()

  const handleDelete = async (id: string) => {
    if (window.confirm('Confirm delete? This cannot be undone.')) {
      await deleteItem(id)
      if (onDelete) onDelete(id)
    }
  }

  const handleComplete = async (id: string) => {
    await completeItem(id)
  }

  const handleArchive = async (id: string) => {
    await archiveItem(id)
  }

  if (loading) {
    return (
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.7, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="glass-card bg-base-content/5 relative h-64 overflow-hidden rounded-[2.5rem] shadow-none"
          >
            <motion.div
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
            <div className="flex h-full flex-col justify-between p-8">
              <div className="space-y-4">
                <div className="bg-base-content/10 h-6 w-32 rounded-full" />
                <div className="bg-base-content/10 h-10 w-full rounded-2xl" />
              </div>
              <div className="bg-base-content/5 h-12 w-full rounded-2xl" />
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert bg-error/10 border-error/20 text-error animate-in shake m-8 mx-auto max-w-4xl rounded-[2.5rem] border p-8 duration-500">
        <div className="flex items-center gap-6">
          <AlertCircle size={32} />
          <div>
            <h3 className="mb-1 text-xs font-black tracking-widest uppercase opacity-50">
              System Error
            </h3>
            <p className="text-xl font-bold">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {viewType === 'list' ? (
        <motion.div
          key="list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 lg:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredActiveItems.length > 0 ? (
              filteredActiveItems.map((item) => (
                <TimetableCard
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                  onEdit={() => onEdit?.(item)}
                  onComplete={handleComplete}
                  onArchive={handleArchive}
                />
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="col-span-full"
              >
                <EmptyState />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          key="grid"
          initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 1.05, rotateX: 10 }}
          transition={{ duration: 0.4, ease: 'circOut' }}
        >
          {filteredActiveItems.length > 0 ? (
            <TimetableGrid
              items={filteredActiveItems}
              onDelete={handleDelete}
              onEdit={onEdit}
              onComplete={handleComplete}
              onArchive={handleArchive}
            />
          ) : (
            <EmptyState />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const EmptyState = () => (
  <div className="border-primary/10 from-primary/5 to-secondary/5 shadow-primary/5 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed bg-gradient-to-br px-6 py-16 text-center shadow-2xl backdrop-blur-md lg:rounded-[4rem] lg:px-10 lg:py-24">
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="text-primary/40 border-primary/10 mb-8 flex justify-center rounded-3xl border bg-white p-6 shadow-2xl"
    >
      <CalendarClock size={64} strokeWidth={1.5} />
    </motion.div>
    <div className="space-y-4">
      <h3 className="text-primary text-2xl leading-none font-black tracking-tighter lg:text-4xl">
        Active Deck Empty
      </h3>
      <p className="text-base-content/40 mx-auto max-w-sm text-sm leading-relaxed font-bold">
        Your schedule is currently clear. Add a new goal to begin tracking, or restore a finished
        task from history.
      </p>
      <div className="flex justify-center gap-2 pt-4" aria-label="Loading schedule">
        <div className="bg-primary/20 h-2 w-2 animate-bounce rounded-full delay-[0ms]" />
        <div className="bg-primary/20 h-2 w-2 animate-bounce rounded-full delay-[200ms]" />
        <div className="bg-primary/20 h-2 w-2 animate-bounce rounded-full delay-[400ms]" />
      </div>
    </div>
  </div>
)

export default TimetableContainer
