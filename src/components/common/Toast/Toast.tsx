import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { useToastContext } from '../../../hooks/useToastContext'
import { type ToastType } from '../../../contexts/ToastContext'

const toastConfig: Record<
  ToastType,
  { icon: typeof CheckCircle; bgClass: string; iconColor: string }
> = {
  success: {
    icon: CheckCircle,
    bgClass: 'bg-success/10 border-success/30',
    iconColor: 'text-success',
  },
  error: {
    icon: XCircle,
    bgClass: 'bg-error/10 border-error/30',
    iconColor: 'text-error',
  },
  warning: {
    icon: AlertTriangle,
    bgClass: 'bg-warning/10 border-warning/30',
    iconColor: 'text-warning',
  },
  info: {
    icon: Info,
    bgClass: 'bg-info/10 border-info/30',
    iconColor: 'text-info',
  },
}

const ToastItem = ({
  id,
  message,
  type,
  onRemove,
}: {
  id: string
  message: string
  type: ToastType
  onRemove: (id: string) => void
}) => {
  const config = toastConfig[type]
  const Icon = config.icon

  const handleClose = () => {
    onRemove(id)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`pointer-events-auto flex items-center gap-3 rounded-2xl border ${config.bgClass} px-4 py-3 shadow-xl backdrop-blur-xl`}
    >
      <Icon className={`h-5 w-5 flex-shrink-0 ${config.iconColor}`} />
      <p className="text-base-content flex-1 text-sm font-medium">{message}</p>
      <button
        type="button"
        onClick={handleClose}
        className="hover:bg-base-content/10 rounded-full p-1 transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="text-base-content/60 h-4 w-4" />
      </button>
    </motion.div>
  )
}

const ToastContainer = () => {
  const { toasts, removeToast } = useToastContext()

  return (
    <div
      className="pointer-events-none fixed top-20 right-4 z-[999] flex w-full max-w-sm flex-col gap-3"
      role="region"
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onRemove={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ToastContainer
