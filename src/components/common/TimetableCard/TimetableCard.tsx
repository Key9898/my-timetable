import { type FC } from 'react'
import { motion } from 'framer-motion'
import { Archive, Calendar, CheckCircle2, Clock, Edit2, MapPin, Repeat, Trash2 } from 'lucide-react'
import type { TimetableItem } from '../../../models/Timetable'
import { formatDuration, formatTime, getDurationMinutes } from '../../../utils/dateFormatter'

interface TimetableCardProps {
  item: TimetableItem
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onComplete?: (id: string) => void
  onArchive?: (id: string) => void
}

const TimetableCard: FC<TimetableCardProps> = ({
  item,
  onEdit,
  onDelete,
  onComplete,
  onArchive,
}) => {
  const accentBorderClasses: Record<string, string> = {
    blue: 'border-l-blue-500/80 dark:border-l-blue-400/80 border-white/60 dark:border-white/10',
    purple:
      'border-l-purple-500/80 dark:border-l-purple-400/80 border-white/60 dark:border-white/10',
    emerald:
      'border-l-emerald-500/80 dark:border-l-emerald-400/80 border-white/60 dark:border-white/10',
    rose: 'border-l-rose-500/80 dark:border-l-rose-400/80 border-white/60 dark:border-white/10',
    amber: 'border-l-amber-500/80 dark:border-l-amber-400/80 border-white/60 dark:border-white/10',
    indigo:
      'border-l-indigo-500/80 dark:border-l-indigo-400/80 border-white/60 dark:border-white/10',
  }

  const textAccentClasses: Record<string, string> = {
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
    rose: 'text-rose-600 dark:text-rose-400',
    amber: 'text-amber-600 dark:text-amber-400',
    indigo: 'text-indigo-600 dark:text-indigo-400',
  }

  const accentBgClasses: Record<string, string> = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    emerald: 'bg-emerald-500',
    rose: 'bg-rose-500',
    amber: 'bg-amber-500',
    indigo: 'bg-indigo-500',
  }

  const color = item.color || 'purple'
  const duration = formatDuration(getDurationMinutes(item.startTime, item.endTime))

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{
        opacity: 0,
        scale: 0.8,
        x: 100,
        transition: { duration: 0.3, ease: 'anticipate' },
      }}
      className={`group glass-card relative overflow-hidden rounded-[2.5rem] !border-l-[10px] p-5 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl lg:p-10 ${accentBorderClasses[color]}`}
    >
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-2xl text-white shadow-lg ${accentBgClasses[color]}`}
              >
                <Calendar size={15} aria-hidden="true" />
              </span>
              {item.isRecurring && (
                <span className="border-base-content/10 bg-base-content/5 text-base-content/60 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-black tracking-[0.2em] uppercase">
                  <Repeat size={10} aria-hidden="true" />
                  Weekly
                </span>
              )}
            </div>

            <h3
              className={`line-clamp-2 text-xl leading-tight font-black tracking-tighter transition-transform group-hover:translate-x-1 lg:text-3xl ${textAccentClasses[color]}`}
            >
              {item.subject}
            </h3>
          </div>
          <div
            className={`border-base-content/10 bg-base-content/5 rounded-full border px-3 py-2 text-[10px] font-black tracking-[0.2em] uppercase opacity-80 ${textAccentClasses[color]}`}
          >
            Active
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="bg-base-content/5 border-base-content/5 flex items-center gap-3 overflow-hidden rounded-2xl border px-3 py-3">
            <div
              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-white shadow-lg ${accentBgClasses[color]}`}
            >
              <Calendar size={16} aria-hidden="true" />
            </div>
            <span className="text-base-content truncate text-sm font-black tracking-wide uppercase opacity-80">
              {item.day}
            </span>
          </div>

          <div className="bg-base-content/5 border-base-content/5 flex items-center gap-3 rounded-2xl border px-3 py-3">
            <div
              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-white shadow-lg ${accentBgClasses[color]}`}
            >
              <Clock size={16} aria-hidden="true" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base-content font-mono text-sm font-black tracking-wide whitespace-nowrap uppercase opacity-80">
                {formatTime(item.startTime)} - {formatTime(item.endTime)}
              </span>
              <span className="text-base-content mt-1 text-[10px] font-black tracking-[0.2em] uppercase opacity-40">
                {duration}
              </span>
            </div>
          </div>

          {item.room && (
            <div className="bg-base-content/5 border-base-content/5 flex items-center gap-3 overflow-hidden rounded-2xl border px-3 py-3 lg:col-span-2">
              <div
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-white shadow-lg ${accentBgClasses[color]}`}
              >
                <MapPin size={16} aria-hidden="true" />
              </div>
              <span className="text-base-content truncate text-sm font-black tracking-wide uppercase opacity-80">
                {item.room}
              </span>
            </div>
          )}
        </div>

        <div className="mt-2 grid grid-cols-2 gap-3 border-t border-white/15 pt-6 lg:pt-8">
          <button
            type="button"
            onClick={() => onEdit?.(item.id)}
            className="border-base-content/20 hover:shadow-base-content/10 inline-flex items-center justify-center gap-2 rounded-2xl border bg-white/90 px-4 py-2.5 text-[10px] font-black tracking-[0.2em] uppercase shadow-[0_0_12px_rgba(0,0,0,0.08)] transition-all hover:bg-white hover:shadow-xl active:scale-95 lg:py-4 dark:border-white/20 dark:bg-white/15 dark:hover:bg-white/25"
          >
            <Edit2 size={14} className="text-indigo-600/70 dark:text-inherit" aria-hidden="true" />
            Edit
          </button>
          <button
            type="button"
            onClick={() => onComplete?.(item.id)}
            aria-label={`Mark ${item.subject} as completed`}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-[10px] font-black tracking-[0.2em] text-emerald-900 uppercase transition-all hover:bg-emerald-500/20 active:scale-95 lg:py-4"
          >
            <CheckCircle2 size={14} aria-hidden="true" />
            Complete
          </button>
          <button
            type="button"
            onClick={() => onArchive?.(item.id)}
            aria-label={`Archive ${item.subject} schedule`}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-2.5 text-[10px] font-black tracking-[0.2em] text-amber-900 uppercase transition-all hover:bg-amber-500/20 active:scale-95 lg:py-4"
          >
            <Archive size={14} aria-hidden="true" />
            Archive
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(item.id)}
            aria-label={`Delete ${item.subject} entry`}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-2.5 text-[10px] font-black tracking-[0.2em] text-rose-900 uppercase transition-all hover:bg-rose-500/20 active:scale-95 lg:py-4"
          >
            <Trash2 size={14} aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 translate-y-[-80%] skew-y-12 bg-white/5 transition-transform group-hover:translate-y-[-75%]" />
    </motion.div>
  )
}

export default TimetableCard
