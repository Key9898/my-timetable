import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';
import Button from '../Button/Button';

const meta: Meta<typeof Modal> = {
    title: 'UI/Modal',
    component: Modal,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="p-20">
                <Button onClick={() => setIsOpen(true)}>Launch Premium Modal</Button>
                <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <div className="flex flex-col gap-6">
                        <p className="text-lg font-medium text-base-content/60 leading-relaxed">
                            This modal now strictly uses <span className="text-primary font-black">Framer Motion</span> for 
                            the elegant entry animation and <span className="text-secondary font-black">Lucide React</span> for the close icon.
                        </p>
                        <div className="flex justify-end gap-3 pt-6 border-t border-base-content/5">
                            <Button onClick={() => setIsOpen(false)} variant="ghost" className="rounded-full px-8">Discard</Button>
                            <Button onClick={() => setIsOpen(false)} variant="primary" className="rounded-full px-10 shadow-xl shadow-primary/20">Acknowledge</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    },
    args: {
        id: 'premium-modal',
        title: 'System Intelligence',
        isOpen: false,
        onClose: () => { },
    },
};

export const LargeForm: Story = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="p-20">
                <Button onClick={() => setIsOpen(true)} variant="secondary">Configure Settings</Button>
                <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <div className="flex flex-col gap-8">
                        <div className="form-control">
                            <label className="label uppercase text-[10px] font-black tracking-widest opacity-40">User Profile Name</label>
                            <input type="text" placeholder="Key98" className="input bg-base-200/50 border-none rounded-2xl h-14 font-bold" />
                        </div>
                        <div className="form-control">
                            <label className="label uppercase text-[10px] font-black tracking-widest opacity-40">Security Access Level</label>
                            <select className="select bg-base-200/50 border-none rounded-2xl h-14 font-bold">
                                <option>Administrator</option>
                                <option>Developer</option>
                                <option>User</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-4 pt-6 border-t border-base-content/5">
                             <Button onClick={() => setIsOpen(false)} variant="primary" className="rounded-full w-full h-16 shadow-2xl shadow-primary/20">Save Configuration</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    },
    args: {
        id: 'settings-modal',
        title: 'Project Settings',
        isOpen: false,
        onClose: () => { },
    },
};
