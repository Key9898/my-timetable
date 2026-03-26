import { Component, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

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
        <div className="flex min-h-[400px] w-full items-center justify-center p-8">
          <div className="glass-card max-w-md text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-error/10 rounded-full p-4">
                <AlertTriangle className="text-error h-12 w-12" />
              </div>
            </div>

            <h2 className="text-base-content mb-2 text-2xl font-bold">Something went wrong</h2>

            <p className="text-base-content/60 mb-6">
              An unexpected error occurred. Please try again.
            </p>

            {error && (
              <pre className="bg-base-300/50 text-base-content/70 mb-6 max-h-32 overflow-auto rounded-lg p-4 text-left text-xs">
                {error.message}
              </pre>
            )}

            <button
              type="button"
              onClick={this.handleReset}
              className="btn btn-primary btn-sm gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return children
  }
}

export default ErrorBoundary
