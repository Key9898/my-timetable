import type { Meta, StoryObj } from '@storybook/react';
import TimetableCard from './TimetableCard';

const meta: Meta<typeof TimetableCard> = {
    title: 'Dumb/Common/TimetableCard',
    component: TimetableCard,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TimetableCard>;

export const Default: Story = {
    args: {
        item: {
            id: '1',
            subject: 'React Architecture',
            startTime: '09:00',
            endTime: '10:30',
            day: 'Monday',
            room: 'Room A',
        },
    },
};

export const WithoutRoom: Story = {
    args: {
        item: {
            id: '2',
            subject: 'Quick Meeting',
            startTime: '14:00',
            endTime: '14:30',
            day: 'Friday',
        },
    },
};
