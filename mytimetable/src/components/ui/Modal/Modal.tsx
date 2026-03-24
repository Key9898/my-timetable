import { type FC, type ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ModalProps {
    id: string;
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

const Modal: FC<ModalProps> = ({
    title,
    isOpen,
    onClose,
    children,
    className
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-base-content/10"
                    onClick={onClose}
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className={cn(
                            'glass-card w-full max-w-lg overflow-hidden rounded-[3rem] shadow-2xl p-0',
                            className
                        )}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <header className="px-10 pt-10 pb-4 flex justify-between items-center border-b border-base-content/5">
                            <h2 className="text-3xl font-black text-primary tracking-tighter leading-none">{title}</h2>
                            <button 
                                onClick={onClose}
                                className="w-10 h-10 rounded-full flex items-center justify-center bg-base-200/50 hover:bg-base-300 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </header>
                        
                        <div className="p-10 pt-6">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
