import { Component, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render(): ReactNode {
    const { hasError, error } = this.state
    const { children, fallback } = this.props

    if (hasError) {
      if (fallback) {
        return fallback
      }

      return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden p-6 sm:p-12">
          {/* Animated Backdrop Overlay */}
          <div
            className="bg-base-100/60 absolute inset-0 backdrop-blur-xl transition-colors duration-500"
            aria-hidden="true"
          />

          {/* Animated Glow Backgrounds */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="bg-error/10 absolute top-[20%] left-[15%] h-80 w-80 rounded-full blur-[120px]" />
            <div className="bg-primary/5 absolute right-[15%] bottom-[20%] h-96 w-96 rounded-full blur-[140px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            className="glass-card border-error/5 shadow-error/5 relative z-10 w-full max-w-lg border-2 p-10 text-center shadow-2xl lg:p-14"
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <div className="bg-error/20 absolute inset-0 rounded-full blur-2xl" />
                <div className="from-error/20 to-error/5 border-error/20 shadow-error/10 relative rounded-full border bg-gradient-to-br p-6 shadow-xl">
                  <AlertTriangle className="text-error h-16 w-16 stroke-[1.5]" />
                </div>
              </div>
            </motion.div>

            <h2 className="text-base-content mb-4 text-3xl leading-none font-black tracking-tighter lg:text-5xl">
              Something went wrong
            </h2>

            <p className="text-base-content/50 mx-auto mb-10 max-w-sm text-base leading-relaxed font-bold md:text-lg">
              An unexpected system error occurred. Our engineers have been notified.
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-10 text-left"
              >
                <div className="text-error/60 mb-3 ml-1 text-[11px] font-black tracking-[0.2em] uppercase">
                  Error Trace
                </div>
                <div className="bg-base-200/50 border-error/10 text-error/80 scrollbar-thin max-h-40 overflow-auto rounded-2xl border p-6 font-mono text-xs break-all shadow-inner">
                  {error.message}
                </div>
              </motion.div>
            )}

            <button
              type="button"
              onClick={this.handleReset}
              className="group bg-primary text-primary-content hover:shadow-primary/30 relative w-full overflow-hidden rounded-full px-10 py-4.5 text-sm font-black tracking-[0.2em] uppercase transition-all hover:scale-105 hover:shadow-2xl active:scale-95 sm:w-auto"
            >
              <div className="flex items-center justify-center gap-3">
                <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
                Try Again
              </div>
            </button>
          </motion.div>
        </div>
      )
    }

    return children
  }
}

export default ErrorBoundary
