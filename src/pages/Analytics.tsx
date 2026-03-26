import { type FC, type ReactNode } from 'react'
import { Activity, Archive, BarChart3, CheckCircle2, Layers3, Repeat2 } from 'lucide-react'
import { useTimetable } from '../hooks/useTimetable'
import { useTimetableInsights } from '../hooks/useTimetableInsights'
import { formatDuration, formatRelativeTime } from '../utils/dateFormatter'

const Analytics: FC = () => {
  const {
    searchedItems,
    filteredActiveItems,
    filteredCompletedItems,
    filteredArchivedItems,
    searchQuery,
  } = useTimetable()
  const {
    totalMinutes,
    activeMinutes,
    completedMinutes,
    archivedMinutes,
    completionRate,
    recurringCoverage,
    averageSessionMinutes,
    subjectBreakdown,
    dayBreakdown,
    busiestDay,
    lastTimelineEvent,
  } = useTimetableInsights()

  const maxDayMinutes = Math.max(...dayBreakdown.map((item) => item.totalMinutes), 1)
  const maxSubjectMinutes = Math.max(...subjectBreakdown.map((item) => item.minutes), 1)

  return (
    <div className="space-y-10">
      <section className="mx-auto max-w-6xl px-6">
        <div className="border-secondary/10 from-secondary/10 to-accent/10 shadow-secondary/10 relative overflow-hidden rounded-[3.5rem] border bg-gradient-to-br via-white/70 p-8 shadow-2xl">
          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-5">
              <div className="border-secondary/20 bg-secondary/15 text-secondary inline-flex items-center gap-2 rounded-full border px-5 py-2 text-[11px] font-black tracking-[0.1em] uppercase">
                <Activity size={12} />
                Signal Intelligence
              </div>
              <div className="space-y-3">
                <h1 className="text-base-content text-4xl font-black tracking-tighter md:text-6xl lg:text-7xl">
                  ANALY<span className="text-secondary">TICS</span>
                </h1>
                <p className="text-base-content/45 max-w-2xl text-base font-bold md:text-lg">
                  Real metrics from your schedule, completion flow, recurring workload, and subject
                  focus. Nothing here is placeholder data.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="bg-primary/10 text-primary border-primary/20 rounded-full border px-5 py-2.5 text-[11px] font-black tracking-[0.1em] uppercase shadow-sm">
                  {filteredActiveItems.length +
                    filteredCompletedItems.length +
                    filteredArchivedItems.length}{' '}
                  Tracked Records
                </div>
                <div className="bg-base-content/10 text-base-content/70 border-base-content/15 rounded-full border px-5 py-2.5 text-[11px] font-black tracking-[0.1em] uppercase shadow-sm">
                  {searchQuery ? `Filtered by "${searchQuery}"` : 'Full Dataset'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:w-[22rem]">
              <MetricOrb
                value={`${completionRate}%`}
                label="Execution Rate"
                tone="text-secondary"
              />
              <MetricOrb
                value={formatDuration(totalMinutes)}
                label="Tracked Time"
                tone="text-accent"
              />
              <MetricOrb
                value={filteredActiveItems.length.toString()}
                label="Live Tasks"
                tone="text-primary"
              />
              <MetricOrb
                value={formatDuration(averageSessionMinutes)}
                label="Avg Session"
                tone="text-base-content"
              />
            </div>
          </div>

          <div className="bg-secondary/20 absolute top-8 -right-12 h-48 w-48 rounded-full blur-[110px]" />
          <div className="bg-accent/20 absolute bottom-0 left-0 h-40 w-40 rounded-full blur-[90px]" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <InsightCard
            icon={<Layers3 size={18} />}
            label="Active Workload"
            value={formatDuration(activeMinutes)}
            detail={`${filteredActiveItems.length} tasks still in motion`}
          />
          <InsightCard
            icon={<CheckCircle2 size={18} />}
            label="Completed Flow"
            value={formatDuration(completedMinutes)}
            detail={`${filteredCompletedItems.length} records pushed through`}
          />
          <InsightCard
            icon={<Archive size={18} />}
            label="Archive Volume"
            value={formatDuration(archivedMinutes)}
            detail={`${filteredArchivedItems.length} items safely stored`}
          />
          <InsightCard
            icon={<Repeat2 size={18} />}
            label="Recurring Coverage"
            value={`${recurringCoverage}%`}
            detail="How much of your system runs on repeat"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-card p-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-base-content/35 text-[10px] font-black tracking-[0.2em] uppercase">
                  Weekly Load
                </p>
                <h2 className="text-base-content mt-2 text-3xl font-black tracking-tighter">
                  Day-by-day pressure map
                </h2>
              </div>
              <BarChart3 size={22} className="text-secondary/50" />
            </div>

            <div className="mt-8 space-y-5">
              {dayBreakdown.map((day) => (
                <div key={day.day} className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-base-content/80 text-[11px] font-black tracking-[0.15em] uppercase">
                        {day.day}
                      </p>
                      <p className="text-base-content/30 text-[10px] font-black tracking-[0.2em] uppercase">
                        {day.totalMinutes > 0 ? formatDuration(day.totalMinutes) : 'No load'}
                      </p>
                    </div>
                    <div className="text-base-content/30 text-right text-[10px] font-black tracking-[0.2em] uppercase">
                      <div>{formatDuration(day.activeMinutes)} active</div>
                      <div>{formatDuration(day.completedMinutes)} complete</div>
                    </div>
                  </div>
                  <div
                    className="bg-base-300/30 dark:bg-base-content/10 h-4 overflow-hidden rounded-full"
                    aria-label={`Activity for ${day.day}: ${day.activeMinutes}m active, ${day.completedMinutes}m completed, ${day.archivedMinutes}m archived`}
                  >
                    <div className="flex h-full">
                      <div
                        className="bg-primary/70 h-full"
                        style={{ width: `${(day.activeMinutes / maxDayMinutes) * 100}%` }}
                      />
                      <div
                        className="bg-secondary/70 h-full"
                        style={{ width: `${(day.completedMinutes / maxDayMinutes) * 100}%` }}
                      />
                      <div
                        className="bg-accent/70 h-full"
                        style={{ width: `${(day.archivedMinutes / maxDayMinutes) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-10">
            <p className="text-base-content/35 text-[10px] font-black tracking-[0.2em] uppercase">
              Top Subjects
            </p>
            <h2 className="text-base-content mt-2 text-3xl font-black tracking-tighter">
              Where your hours really go
            </h2>

            <div className="mt-8 space-y-4">
              {subjectBreakdown.length > 0 ? (
                subjectBreakdown.map((subject) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-base-content text-sm font-black tracking-tight">
                          {subject.subject}
                        </p>
                        <p className="text-base-content/30 text-[10px] font-black tracking-[0.2em] uppercase">
                          {subject.count} blocks
                        </p>
                      </div>
                      <span className="text-secondary text-[10px] font-black tracking-[0.2em] uppercase">
                        {formatDuration(subject.minutes)}
                      </span>
                    </div>
                    <div
                      className="bg-base-300/30 dark:bg-base-content/10 h-3 rounded-full"
                      aria-label={`${subject.subject}: ${subject.minutes} minutes tracked`}
                    >
                      <div
                        className="from-secondary to-accent h-full rounded-full bg-gradient-to-r"
                        style={{ width: `${(subject.minutes / maxSubjectMinutes) * 100}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="border-base-content/10 bg-base-200/30 rounded-[2rem] border border-dashed px-6 py-12 text-center">
                  <p className="text-base-content/40 text-lg font-black tracking-tight">
                    No subject analytics yet
                  </p>
                  <p className="text-base-content/30 mt-2 text-[10px] font-black tracking-[0.2em] uppercase">
                    Add or restore records to reveal focus distribution.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <SummaryTile
            label="Busiest Day"
            value={busiestDay && busiestDay.totalMinutes > 0 ? busiestDay.day : 'Balanced'}
            detail={
              busiestDay && busiestDay.totalMinutes > 0
                ? formatDuration(busiestDay.totalMinutes)
                : 'No heavy spike detected'
            }
          />
          <SummaryTile
            label="Last Timeline Move"
            value={lastTimelineEvent ? lastTimelineEvent.subject : 'No history yet'}
            detail={
              lastTimelineEvent
                ? formatRelativeTime(lastTimelineEvent.archivedAt || lastTimelineEvent.completedAt)
                : 'Complete or archive tasks to build history'
            }
          />
          <SummaryTile
            label="Scope Snapshot"
            value={`${filteredActiveItems.length}/${searchedItems.length || 0}`}
            detail="Active records vs all visible records"
          />
        </div>
      </section>
    </div>
  )
}

interface MetricOrbProps {
  value: string
  label: string
  tone: string
}

const MetricOrb: FC<MetricOrbProps> = ({ value, label, tone }) => {
  const isZero = value === '0' || value === '0%' || value === '0m' || value === 'Quiet'
  const displayTone = isZero ? 'text-sky-500/50 dark:text-sky-400/40' : tone

  return (
    <div className="glass-card group hover:border-primary/30 relative overflow-hidden p-5 transition-all">
      <p className={`text-4xl font-black tracking-tighter ${displayTone}`}>{value}</p>
      <p className="text-base-content/80 mt-2 text-[11px] font-black tracking-[0.1em] uppercase">
        {label}
      </p>
      {isZero && (
        <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-sky-500/5 blur-xl" />
      )}
    </div>
  )
}

interface InsightCardProps {
  icon: ReactNode
  label: string
  value: string
  detail: string
}

const InsightCard: FC<InsightCardProps> = ({ icon, label, value, detail }) => {
  const isZero = value === '0m' || value === '0%' || value === '0'

  return (
    <div className="glass-card relative overflow-hidden p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div
          className={`rounded-2xl ${isZero ? 'bg-sky-500/10 text-sky-600/50' : 'bg-primary/10 text-primary'} p-3`}
        >
          {icon}
        </div>
        <p className="text-base-content/80 text-[11px] font-black tracking-[0.1em] uppercase">
          {label}
        </p>
      </div>
      <p
        className={`mt-6 text-4xl font-black tracking-tighter ${isZero ? 'text-sky-600/30' : 'text-base-content'}`}
      >
        {value}
      </p>
      <p className="text-base-content/60 mt-2 text-sm font-bold">{detail}</p>
      {isZero && (
        <div className="absolute -right-4 -bottom-4 h-12 w-12 rounded-full bg-sky-500/5 blur-2xl" />
      )}
    </div>
  )
}

interface SummaryTileProps {
  label: string
  value: string
  detail: string
  tone?: string
}

const SummaryTile: FC<SummaryTileProps> = ({ label, value, detail, tone }) => (
  <div className="glass-card group hover:border-base-content/20 relative overflow-hidden p-6 shadow-xl transition-all">
    <p className={`text-3xl font-black tracking-tighter ${tone || 'text-base-content'}`}>{value}</p>
    <p className="text-base-content/80 mt-2 text-[11px] font-black tracking-[0.1em] uppercase">
      {label}
    </p>
    <p className="text-base-content/60 mt-2 text-sm font-bold">{detail}</p>
  </div>
)

export default Analytics
