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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 overflow-hidden">
          {/* Animated Backdrop Overlay */}
          <div 
            className="absolute inset-0 bg-base-100/60 backdrop-blur-xl transition-colors duration-500" 
            aria-hidden="true" 
          />
          
          {/* Animated Glow Backgrounds */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute left-[15%] top-[20%] h-80 w-80 rounded-full bg-error/10 blur-[120px]" />
            <div className="absolute right-[15%] bottom-[20%] h-96 w-96 rounded-full bg-primary/5 blur-[140px]" />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="glass-card relative z-10 w-full max-w-lg p-10 lg:p-14 text-center border-2 border-error/5 shadow-2xl shadow-error/5"
          >
            <motion.div 
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-error/20 blur-2xl rounded-full" />
                <div className="relative bg-gradient-to-br from-error/20 to-error/5 border border-error/20 rounded-full p-6 shadow-xl shadow-error/10">
                  <AlertTriangle className="text-error h-16 w-16 stroke-[1.5]" />
                </div>
              </div>
            </motion.div>

            <h2 className="text-3xl lg:text-5xl font-black text-base-content tracking-tighter leading-none mb-4">
              Something went wrong
            </h2>

            <p className="text-base-content/50 text-base md:text-lg font-bold max-w-sm mx-auto mb-10 leading-relaxed">
              An unexpected system error occurred. Our engineers have been notified.
            </p>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-10 text-left"
              >
                <div className="uppercase text-[11px] font-black tracking-[0.2em] text-error/60 mb-3 ml-1">Error Trace</div>
                <div className="bg-base-200/50 border border-error/10 text-error/80 rounded-2xl p-6 text-xs font-mono break-all max-h-40 overflow-auto scrollbar-thin shadow-inner">
                  {error.message}
                </div>
              </motion.div>
            )}

            <button
              type="button"
              onClick={this.handleReset}
              className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-primary px-10 py-4.5 text-sm font-black uppercase tracking-[0.2em] text-primary-content transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 active:scale-95"
            >
              <div className="flex items-center justify-center gap-3">
                <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
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
