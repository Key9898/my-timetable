import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider } from '../../../contexts/ToastProvider'
import { useToastContext } from '../../../hooks/useToastContext'
import Toast from './Toast'
import Button from '../../ui/Button'

// A wrapper component to demonstrate Toast functionality within Storybook
const ToastDemo = () => {
  const { showToast } = useToastContext()

  return (
    <div className="flex flex-wrap gap-4 p-8">
      <Button variant="primary" onClick={() => showToast('Success message!', 'success')}>
        Show Success
      </Button>
      <Button variant="secondary" onClick={() => showToast('Information message.', 'info')}>
        Show Info
      </Button>
      <Button
        className="bg-warning text-warning-content border-none"
        onClick={() => showToast('Warning message!', 'warning')}
      >
        Show Warning
      </Button>
      <Button
        className="bg-error text-error-content border-none"
        onClick={() => showToast('Error message occurred.', 'error')}
      >
        Show Error
      </Button>
      <Button
        variant="ghost"
        onClick={() => showToast('This will stay for 10 seconds.', 'info', 10000)}
      >
        Long Toast
      </Button>
    </div>
  )
}

const meta: Meta<typeof Toast> = {
  title: 'Common/Toast',
  component: Toast,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastDemo />
      </ToastProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Toast>

export const Default: Story = {}
