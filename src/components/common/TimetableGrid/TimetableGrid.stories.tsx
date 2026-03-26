import type { Meta, StoryObj } from '@storybook/react'
import TimetableGrid from './TimetableGrid'
import type { TimetableItem } from '../../../models/Timetable'

const meta: Meta<typeof TimetableGrid> = {
  title: 'Common/TimetableGrid',
  component: TimetableGrid,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TimetableGrid>

const mockItems: TimetableItem[] = [
  {
    id: '1',
    subject: 'Advanced Mathematics',
    startTime: '08:00',
    endTime: '09:30',
    day: 'Monday',
    room: 'Room 302',
    color: 'blue',
    isRecurring: true,
    status: 'active',
    createdAt: '2026-03-25T08:00:00.000Z',
    updatedAt: '2026-03-25T08:00:00.000Z',
  },
  {
    id: '2',
    subject: 'Neural Networks',
    startTime: '10:00',
    endTime: '11:30',
    day: 'Monday',
    room: 'Lab 4',
    color: 'purple',
    isRecurring: true,
    status: 'active',
    createdAt: '2026-03-25T08:15:00.000Z',
    updatedAt: '2026-03-25T08:15:00.000Z',
  },
  {
    id: '3',
    subject: 'AI Theory',
    startTime: '13:00',
    endTime: '14:30',
    day: 'Wednesday',
    room: 'Hall A',
    color: 'emerald',
    isRecurring: false,
    status: 'active',
    createdAt: '2026-03-25T08:30:00.000Z',
    updatedAt: '2026-03-25T08:30:00.000Z',
  },
  {
    id: '4',
    subject: 'Design Thinking',
    startTime: '09:00',
    endTime: '10:30',
    day: 'Friday',
    room: 'Studio',
    color: 'rose',
    isRecurring: true,
    status: 'active',
    createdAt: '2026-03-25T08:45:00.000Z',
    updatedAt: '2026-03-25T08:45:00.000Z',
  },
]

export const Default: Story = {
  args: {
    items: mockItems,
  },
}

export const Empty: Story = {
  args: {
    items: [],
  },
}
