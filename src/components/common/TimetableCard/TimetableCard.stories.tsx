import type { Meta, StoryObj } from '@storybook/react'
import TimetableCard from './TimetableCard'
import type { TimetableItem } from '../../../models/Timetable'

const meta: Meta<typeof TimetableCard> = {
  title: 'Common/TimetableCard',
  component: TimetableCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof TimetableCard>

const mockItem: TimetableItem = {
  id: '1',
  subject: 'Advanced Neural Networks',
  startTime: '09:00',
  endTime: '11:30',
  day: 'Monday',
  room: 'Lab 402',
  color: 'purple',
  isRecurring: true,
  status: 'active',
  createdAt: '2026-03-25T08:00:00.000Z',
  updatedAt: '2026-03-25T08:00:00.000Z',
}

export const Default: Story = {
  args: {
    item: mockItem,
  },
}

export const BlueVariant: Story = {
  args: {
    item: {
      ...mockItem,
      subject: 'React Professional Scaling',
      color: 'blue',
    },
  },
}

export const EmeraldVariant: Story = {
  args: {
    item: {
      ...mockItem,
      subject: 'UX Design Systems',
      color: 'emerald',
    },
  },
}

export const NoRoom: Story = {
  args: {
    item: {
      ...mockItem,
      id: '2',
      subject: 'Quick Strategy Sync',
      room: undefined,
      color: 'rose',
    },
  },
}
