import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

const meta: Meta<typeof Modal> = {
    title: 'Dumb/UI/Modal',
    component: Modal,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
                <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <div className="p-4">
                        <p>This is the modal content!</p>
                        <div className="modal-action">
                            <Button onClick={() => setIsOpen(false)} variant="ghost">Close</Button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    },
    args: {
        id: 'test-modal',
        title: 'Example Modal',
        isOpen: false,
        onClose: () => { },
    },
};

export const WithForm: Story = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
                <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <div className="flex flex-col gap-4">
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="modal-action">
                            <Button onClick={() => setIsOpen(false)} variant="primary">Submit</Button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    },
    args: {
        id: 'form-modal',
        title: 'Information Form',
        isOpen: false,
        onClose: () => { },
    },
};
