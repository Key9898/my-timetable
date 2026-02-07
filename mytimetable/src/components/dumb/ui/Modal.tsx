import React, { useEffect, useRef } from 'react';

interface ModalProps {
    id: string;
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ id, title, isOpen, onClose, children }) => {
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!modalRef.current) return;
        if (isOpen) {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        }
    }, [isOpen]);

    return (
        <dialog id={id} ref={modalRef} className="modal modal-bottom sm:modal-middle" onClose={onClose}>
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                </form>
                <h3 className="font-bold text-lg mb-4">{title}</h3>
                <div className="py-4">
                    {children}
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
};

export default Modal;
