import { useToastContext } from './useToastContext'
import { type ToastType } from '../contexts/ToastContext'

export const useToast = () => {
  const { showToast, removeToast, clearAllToasts, toasts } = useToastContext()

  const success = (message: string, duration?: number) => {
    showToast(message, 'success', duration)
  }

  const error = (message: string, duration?: number) => {
    showToast(message, 'error', duration)
  }

  const warning = (message: string, duration?: number) => {
    showToast(message, 'warning', duration)
  }

  const info = (message: string, duration?: number) => {
    showToast(message, 'info', duration)
  }

  return {
    toasts,
    showToast,
    success,
    error,
    warning,
    info,
    removeToast,
    clearAllToasts,
  }
}

export type { ToastType }
