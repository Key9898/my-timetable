import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToastProvider, type ToastType } from '../../../contexts/ToastContext'
import { useToastContext } from '../../../hooks/useToastContext'
import Toast from './Toast'
import Button from '../../ui/Button'

const meta: Meta<typeof Toast> = {
  title: 'Common/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Toast>

const ToastDemo = () => {
  const { showToast } = useToastContext()

  const types: ToastType[] = ['success', 'error', 'warning', 'info']

  return (
    <div className="flex flex-wrap gap-3">
      {types.map((type) => (
        <Button
          key={type}
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} notification`, type)
          }
        >
          Show {type}
        </Button>
      ))}
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <div className="relative min-h-[200px]">
      <ToastDemo />
      <Toast />
    </div>
  ),
}

const RenderAllTypes = () => {
  const { showToast } = useToastContext()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => showToast('Task saved successfully!', 'success')}
        >
          Success
        </Button>
        <Button
          type="button"
          variant="danger"
          size="sm"
          onClick={() => showToast('Failed to save task.', 'error')}
        >
          Error
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => showToast('Schedule conflict detected.', 'warning')}
        >
          Warning
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => showToast('New feature available!', 'info')}
        >
          Info
        </Button>
      </div>
      <Toast />
    </div>
  )
}

export const AllTypes: Story = {
  render: () => <RenderAllTypes />,
}

const RenderPersistent = () => {
  const { showToast } = useToastContext()

  return (
    <div className="flex flex-col gap-4">
      <Button
        type="button"
        variant="primary"
        size="sm"
        onClick={() => showToast('This toast will not auto-dismiss', 'info', 0)}
      >
        Show Persistent Toast
      </Button>
      <Toast />
    </div>
  )
}

export const Persistent: Story = {
  render: () => <RenderPersistent />,
}
