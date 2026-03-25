import { useState, type FC } from 'react'
import { motion } from 'framer-motion'
import { Archive, CheckCircle2, Clock, Edit2, Trash2 } from 'lucide-react'
import type { DayOfWeek, TimetableItem } from '../../../models/Timetable'
import {
  DAY_ORDER,
  formatDuration,
  formatTime,
  getDurationMinutes,
} from '../../../utils/dateFormatter'
import { getItemsForDay } from '../../../utils/timetableUtils'

interface TimetableGridProps {
  items: TimetableItem[]
  onEdit?: (item: TimetableItem) => void
  onDelete?: (id: string) => void
  onComplete?: (id: string) => void
  onArchive?: (id: string) => void
}

const DAYS: DayOfWeek[] = DAY_ORDER

const TimetableGrid: FC<TimetableGridProps> = ({
  items,
  onEdit,
  onDelete,
  onComplete,
  onArchive,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [suppressedId, setSuppressedId] = useState<string | null>(null)

  const handleActionClick = (id: string | null, suppressId?: string | null) => {
    setSelectedItemId(id)
    setHoveredId(null)
    if (suppressId) {
      setSuppressedId(suppressId)
    }
  }

  const colorClasses: Record<string, string> = {
    blue: 'border-l-blue-500/80 dark:border-l-blue-400/80 text-blue-600 dark:text-blue-400',
    purple:
      'border-l-purple-500/80 dark:border-l-purple-400/80 text-purple-600 dark:text-purple-400',
    emerald:
      'border-l-emerald-500/80 dark:border-l-emerald-400/80 text-emerald-600 dark:text-emerald-400',
    rose: 'border-l-rose-500/80 dark:border-l-rose-400/80 text-rose-600 dark:text-rose-400',
    amber: 'border-l-amber-500/80 dark:border-l-amber-400/80 text-amber-600 dark:text-amber-400',
    indigo:
      'border-l-indigo-500/80 dark:border-l-indigo-400/80 text-indigo-600 dark:text-indigo-400',
  }

  return (
    <div className="animate-in fade-in zoom-in w-full overflow-x-auto pb-8 duration-500">
      {/* Click-outside backdrop */}
      {selectedItemId && (
        <div
          className="fixed inset-0 z-[19] cursor-default bg-transparent"
          onClick={(e) => {
            e.stopPropagation()
            setSelectedItemId(null)
          }}
        />
      )}
      <div className="grid min-w-[1000px] grid-cols-7 gap-3 pt-2 pb-6">
        {DAYS.map((day) => (
          <div key={day} className="flex min-h-[400px] flex-col gap-3">
            <div className="bg-base-200 border-base-content/5 mb-2 rounded-2xl border py-3 text-center">
              <h4 className="text-primary text-[10px] font-black tracking-[0.2em] uppercase">
                {day}
              </h4>
            </div>

            <div className="flex flex-col gap-2">
              {getItemsForDay(items, day).map((item) => (
                <motion.div
                  layoutId={item.id}
                  key={item.id}
                  className={`group dark:bg-base-200/40 relative cursor-pointer rounded-2xl !border-l-[8px] border-white/60 bg-white/60 p-4 backdrop-blur-md transition-all hover:scale-[1.02] hover:bg-white hover:shadow-xl dark:border-white/10 dark:hover:bg-white/10 ${selectedItemId === item.id ? 'z-[30]' : 'z-[10]'} ${colorClasses[item.color || 'purple']}`}
                  onTap={(e) => {
                    e.stopPropagation()
                    handleActionClick(selectedItemId === item.id ? null : item.id)
                  }}
                  onMouseEnter={() => {
                    if (suppressedId !== item.id) {
                      setHoveredId(item.id)
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredId(null)
                    setSuppressedId(null)
                  }}
                >
                  <div className="line-clamp-2 min-h-[2.5rem] pr-6 text-xs leading-tight font-black tracking-tight uppercase">
                    {item.subject}
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-[9px] font-black opacity-60">
                    <Clock size={10} className="mb-0.5" /> {formatTime(item.startTime)} -{' '}
                    {formatTime(item.endTime)}
                  </div>
                  <div className="mt-2 text-[8px] font-black tracking-[0.2em] uppercase opacity-35">
                    {formatDuration(getDurationMinutes(item.startTime, item.endTime))}
                  </div>

                  <motion.div
                    className={`bg-base-300/60 absolute inset-0 z-20 grid grid-cols-2 place-items-center gap-2 rounded-2xl p-4 backdrop-blur-[2px] transition-all duration-300 ${selectedItemId === item.id || hoveredId === item.id ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
                    onTap={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleActionClick(null, item.id)
                        onEdit?.(item)
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-700 shadow-lg transition-all hover:scale-110 hover:bg-indigo-500/40 active:scale-90"
                      title="Edit Task"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleActionClick(null, item.id)
                        onComplete?.(item.id)
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-700 shadow-lg transition-all hover:scale-110 hover:bg-emerald-500/40 active:scale-90"
                      title="Mark as Complete"
                    >
                      <CheckCircle2 size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleActionClick(null, item.id)
                        onArchive?.(item.id)
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/20 text-amber-700 shadow-lg transition-all hover:scale-110 hover:bg-amber-500/40 active:scale-90"
                      title="Archive"
                    >
                      <Archive size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleActionClick(null, item.id)
                        onDelete?.(item.id)
                      }}
                      className="bg-error/20 text-error hover:bg-error/40 flex h-9 w-9 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 active:scale-90"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                </motion.div>
              ))}

              {getItemsForDay(items, day).length === 0 && (
                <div className="border-base-content/5 flex h-32 items-center justify-center rounded-2xl border-2 border-dashed text-[10px] font-black uppercase opacity-20">
                  Empty
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TimetableGrid
