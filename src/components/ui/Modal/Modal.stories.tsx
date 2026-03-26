import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Modal from './Modal'
import Button from '../Button/Button'

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Modal>

type ModalStoryArgs = React.ComponentProps<typeof Modal>

const DefaultModalStory = (args: ModalStoryArgs) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="p-20">
      <Button type="button" onClick={() => setIsOpen(true)}>
        Launch Premium Modal
      </Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col gap-6">
          <p className="text-base-content/60 text-lg leading-relaxed font-medium">
            This modal now strictly uses{' '}
            <span className="text-primary font-black">Framer Motion</span> for the elegant entry
            animation and <span className="text-secondary font-black">Lucide React</span> for the
            close icon.
          </p>
          <div className="border-base-content/5 flex justify-end gap-3 border-t pt-6">
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              variant="ghost"
              className="rounded-full px-8"
            >
              Discard
            </Button>
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              variant="primary"
              className="shadow-primary/20 rounded-full px-10 shadow-xl"
            >
              Acknowledge
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export const Default: Story = {
  render: (args) => <DefaultModalStory {...args} />,
  args: {
    id: 'premium-modal',
    title: 'System Intelligence',
    isOpen: false,
    onClose: () => {},
  },
}

const LargeFormModalStory = (args: ModalStoryArgs) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="p-20">
      <Button type="button" onClick={() => setIsOpen(true)} variant="secondary">
        Configure Settings
      </Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col gap-8">
          <div className="form-control">
            <label className="label text-[10px] font-black tracking-widest uppercase opacity-40">
              User Profile Name
            </label>
            <input
              type="text"
              placeholder="Key98"
              className="input bg-base-200/50 h-14 rounded-2xl border-none font-bold"
            />
          </div>
          <div className="form-control">
            <label
              htmlFor="security-level-story"
              className="label text-[10px] font-black tracking-widest uppercase opacity-40"
            >
              Security Access Level
            </label>
            <select
              id="security-level-story"
              className="select bg-base-200/50 h-14 rounded-2xl border-none font-bold"
            >
              <option>Administrator</option>
              <option>Developer</option>
              <option>User</option>
            </select>
          </div>
          <div className="border-base-content/5 flex justify-end gap-4 border-t pt-6">
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              variant="primary"
              className="shadow-primary/20 h-16 w-full rounded-full shadow-2xl"
            >
              Save Configuration
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export const LargeForm: Story = {
  render: (args) => <LargeFormModalStory {...args} />,
  args: {
    id: 'settings-modal',
    title: 'Project Settings',
    isOpen: false,
    onClose: () => {},
  },
}
