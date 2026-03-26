import type { Meta, StoryObj } from '@storybook/react';
import Navbar from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Common/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Dashboard: Story = {
  args: {
    currentPath: '/',
    onNavigate: (path) => console.log('Navigate to:', path),
  },
};

export const Analytics: Story = {
  args: {
    currentPath: '/analytics',
    onNavigate: (path) => console.log('Navigate to:', path),
  },
};

export const History: Story = {
  args: {
    currentPath: '/history',
    onNavigate: (path) => console.log('Navigate to:', path),
  },
};
