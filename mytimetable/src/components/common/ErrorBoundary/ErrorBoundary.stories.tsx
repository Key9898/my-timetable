import type { Meta, StoryObj } from '@storybook/react-vite'
import ErrorBoundary from './ErrorBoundary'

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Common/ErrorBoundary',
  component: ErrorBoundary,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof ErrorBoundary>

const ThrowError = (): never => {
  throw new Error('Test error for ErrorBoundary demonstration')
}

export const Default: Story = {
  render: () => (
    <ErrorBoundary>
      <div className="p-8 text-center">
        <p className="text-lg">This content renders normally.</p>
      </div>
    </ErrorBoundary>
  ),
}

export const WithError: Story = {
  render: () => (
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  ),
}

export const CustomFallback: Story = {
  render: () => (
    <ErrorBoundary
      fallback={
        <div className="glass-card p-8 text-center">
          <h3 className="text-error text-xl font-bold">Custom Error UI</h3>
          <p className="text-base-content/60 mt-2">A custom fallback was provided.</p>
        </div>
      }
    >
      <ThrowError />
    </ErrorBoundary>
  ),
}
