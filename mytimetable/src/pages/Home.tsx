import React, { useState } from 'react';
import TimetableContainer from '../components/smart/TimetableContainer';
import Button from '../components/dumb/ui/Button';
import Modal from '../components/dumb/ui/Modal';

const Home: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-base-100 p-4 md:p-8">
            <header className="max-w-4xl mx-auto flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-black text-primary tracking-tight">MY TIMETABLE</h1>
                    <p className="text-base-content/60">Organize your schedule perfectly</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} variant="primary" size="md">
                    Add New
                </Button>
            </header>

            <main>
                <TimetableContainer />
            </main>

            <Modal
                id="add-item-modal"
                title="Add Timetable Item"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <div className="flex flex-col gap-4">
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Subject Name</span></label>
                        <input type="text" placeholder="e.g. React Architecture" className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-2">
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text">Start Time</span></label>
                            <input type="time" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text">End Time</span></label>
                            <input type="time" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="modal-action">
                        <Button onClick={() => setIsModalOpen(false)} variant="ghost">Cancel</Button>
                        <Button onClick={() => setIsModalOpen(false)} variant="primary">Save Item</Button>
                    </div>
                </div>
            </Modal>

            <footer className="max-w-4xl mx-auto mt-20 text-center opacity-30 text-xs">
                <p>© 2026 My Timetable Architecture Demonstration</p>
            </footer>
        </div>
    );
};

export default Home;
