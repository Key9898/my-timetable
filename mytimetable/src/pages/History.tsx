import { type FC, useState } from 'react'
import { Archive, CheckCircle2, History as HistoryIcon, RotateCcw, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTimetable } from '../hooks/useTimetable'
import type { TimetableItem } from '../models/Timetable'
import {
  formatDateTime,
  formatDuration,
  formatRelativeTime,
  formatTime,
  getDurationMinutes,
} from '../utils/dateFormatter'

type HistoryFilter = 'all' | 'completed' | 'archived'

const getRecordTimestamp = (item: TimetableItem) =>
  item.archivedAt || item.completedAt || item.updatedAt

const History: FC = () => {
  const [filter, setFilter] = useState<HistoryFilter>('all')
  const {
    filteredCompletedItems,
    filteredArchivedItems,
    restoreItem,
    archiveItem,
    deleteItem,
    searchQuery,
  } = useTimetable()

  const historyRecords = [...filteredCompletedItems, ...filteredArchivedItems].sort(
    (left, right) =>
      new Date(getRecordTimestamp(right)).getTime() - new Date(getRecordTimestamp(left)).getTime(),
  )

  const visibleRecords =
    filter === 'all' ? historyRecords : historyRecords.filter((item) => item.status === filter)

  const latestRecord = historyRecords[0]

  return (
    <div className="space-y-10">
      <section className="mx-auto max-w-6xl px-6">
        <div className="border-accent/10 from-accent/10 shadow-accent/10 relative overflow-hidden rounded-[3.5rem] border bg-gradient-to-br via-white/70 to-amber-500/10 p-8 shadow-2xl">
          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-5">
              <div className="border-accent/10 bg-accent/10 text-accent inline-flex items-center gap-2 rounded-full border px-5 py-2 text-[11px] font-black tracking-[0.1em] uppercase">
                <HistoryIcon size={12} />
                Timeline Vault
              </div>
              <div className="space-y-3">
                <h1 className="text-base-content text-4xl font-black tracking-tighter md:text-6xl lg:text-7xl">
                  HIS<span className="text-accent">TORY</span>
                </h1>
                <p className="text-base-content/45 max-w-2xl text-base font-bold md:text-lg">
                  Finished work and archived schedules live here. Restore anything back to
                  Dashboard, or keep the vault clean with permanent deletion.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:w-[22rem]">
              <HistoryMetric
                value={filteredCompletedItems.length.toString()}
                label="Completed"
                tone="text-emerald-700"
              />
              <HistoryMetric
                value={filteredArchivedItems.length.toString()}
                label="Archived"
                tone="text-amber-700"
              />
              <HistoryMetric
                value={historyRecords.length.toString()}
                label="Total History"
                tone="text-accent"
              />
              <HistoryMetric
                value={
                  latestRecord ? formatRelativeTime(getRecordTimestamp(latestRecord)) : 'Quiet'
                }
                label="Last Move"
                tone="text-base-content"
              />
            </div>
          </div>

          <div className="bg-accent/20 absolute bottom-0 -left-8 h-44 w-44 rounded-full blur-[100px]" />
          <div className="absolute top-12 right-0 h-56 w-56 rounded-full bg-amber-500/20 blur-[120px]" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="glass-card flex flex-col gap-4 !rounded-[2.8rem] p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {(
              [
                { value: 'all', label: 'All Records' },
                { value: 'completed', label: 'Completed' },
                { value: 'archived', label: 'Archived' },
              ] as Array<{ value: HistoryFilter; label: string }>
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter(option.value)}
                className={`rounded-full px-5 py-3 text-[11px] font-black tracking-[0.15em] uppercase transition-all ${
                  filter === option.value
                    ? 'bg-base-content text-base-100 shadow-xl'
                    : 'bg-base-200/60 text-base-content/60 hover:bg-base-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="border-accent/20 bg-accent/10 flex items-center gap-3 rounded-full border px-6 py-3 shadow-sm backdrop-blur-md">
            <HistoryIcon size={16} className="text-accent" />
            <p className="text-accent text-[11px] font-black tracking-[0.1em] uppercase">
              {searchQuery ? `Search filter: "${searchQuery}"` : 'Showing full history'}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-4">
        {visibleRecords.length > 0 ? (
          <div className="space-y-4">
            {visibleRecords.map((item) => {
              const isCompleted = item.status === 'completed'
              const statusTone = isCompleted
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-900'
                : 'border-amber-500/20 bg-amber-500/10 text-amber-900'

              return (
                <article key={item.id} className="glass-card !rounded-[3rem] p-6">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`rounded-full border px-4 py-2 text-[11px] font-black tracking-[0.1em] uppercase ${statusTone}`}
                        >
                          {isCompleted ? 'Completed' : 'Archived'}
                        </span>
                        <p className="text-base-content/80 text-sm font-black tracking-[0.15em] uppercase">
                          {formatRelativeTime(getRecordTimestamp(item))}
                        </p>
                      </div>

                      <div>
                        <h2 className="text-base-content text-2xl font-black tracking-tight md:text-3xl">
                          {item.subject}
                        </h2>
                        <p className="text-base-content/45 mt-2 text-sm font-bold">
                          {formatDateTime(getRecordTimestamp(item))}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <MetaPill label={item.day} />
                        <MetaPill
                          label={`${formatTime(item.startTime)} - ${formatTime(item.endTime)}`}
                        />
                        <MetaPill
                          label={formatDuration(getDurationMinutes(item.startTime, item.endTime))}
                        />
                        {item.room ? <MetaPill label={item.room} /> : null}
                        {item.isRecurring ? <MetaPill label="Weekly repeat" /> : null}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:min-w-[24rem]">
                      <button
                        type="button"
                        onClick={() => restoreItem(item.id)}
                        className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-[11px] font-black tracking-[0.1em] uppercase transition-colors"
                      >
                        <RotateCcw size={14} />
                        Restore
                      </button>

                      {isCompleted ? (
                        <button
                          type="button"
                          onClick={() => archiveItem(item.id)}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-4 text-[11px] font-black tracking-[0.1em] text-amber-900 uppercase transition-colors hover:bg-amber-500/20"
                        >
                          <Archive size={14} />
                          Archive
                        </button>
                      ) : (
                        <div className="text-base-content/60 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/40 bg-white/40 px-4 py-4 text-[11px] font-black tracking-[0.1em] uppercase">
                          <Archive size={14} />
                          Vaulted
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Permanently delete this history record?')) {
                            deleteItem(item.id)
                          }
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-4 text-[11px] font-black tracking-[0.1em] text-rose-900 uppercase transition-colors hover:bg-rose-500/20"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-accent/10 from-accent/5 shadow-accent/5 flex flex-col items-center justify-center rounded-[4rem] border-2 border-dashed bg-gradient-to-br to-amber-500/5 px-10 py-24 text-center shadow-2xl backdrop-blur-md"
          >
            <motion.div
              animate={{
                y: [0, -12, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-accent/30 border-accent/10 mb-8 flex justify-center rounded-3xl border bg-white p-6 shadow-2xl"
            >
              {filter === 'completed' ? (
                <CheckCircle2 size={64} strokeWidth={1.5} />
              ) : (
                <Archive size={64} strokeWidth={1.5} />
              )}
            </motion.div>
            <div className="space-y-4">
              <h2 className="text-accent text-4xl leading-none font-black tracking-tighter">
                History is clear
              </h2>
              <p className="text-base-content/40 mx-auto max-w-md text-sm leading-relaxed font-bold">
                {searchQuery
                  ? `No history records found matching "${searchQuery}". Try a different term or clear the search.`
                  : 'Finished tasks and archived schedules will appear here. Complete tasks on the dashboard to build your timeline.'}
              </p>
              <div className="flex justify-center gap-2 pt-4">
                <div className="bg-accent/20 h-2 w-2 animate-pulse rounded-full delay-[0ms]" />
                <div className="bg-accent/20 h-2 w-2 animate-pulse rounded-full delay-[200ms]" />
                <div className="bg-accent/20 h-2 w-2 animate-pulse rounded-full delay-[400ms]" />
              </div>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  )
}

interface HistoryMetricProps {
  value: string
  label: string
  tone: string
}

const HistoryMetric: FC<HistoryMetricProps> = ({ value, label, tone }) => {
  const isZero = value === '0' || value === '0m' || value === 'Quiet'
  const displayTone = isZero ? 'text-emerald-500/60 dark:text-emerald-400/50' : tone

  return (
    <div className="glass-card group hover:border-accent/30 relative overflow-hidden p-5 shadow-xl transition-all">
      <p className={`text-3xl font-black tracking-tighter ${displayTone}`}>{value}</p>
      <p className="text-base-content/80 mt-2 text-[11px] font-black tracking-[0.1em] uppercase">
        {label}
      </p>
      {isZero && (
        <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-emerald-500/5 blur-xl" />
      )}
    </div>
  )
}

interface MetaPillProps {
  label: string
}

const MetaPill: FC<MetaPillProps> = ({ label }) => (
  <span className="border-base-content/10 bg-base-content/5 text-base-content/70 rounded-full border-2 px-4 py-2 text-[11px] font-black tracking-[0.1em] uppercase backdrop-blur-sm">
    {label}
  </span>
)

export default History
