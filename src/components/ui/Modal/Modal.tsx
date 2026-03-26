import { type FC, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ModalProps {
  id: string
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

const Modal: FC<ModalProps> = ({ title, isOpen, onClose, children, className }) => {
  // Escape restricted stacking context using React Portals
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 200,
            }}
            className={cn(
              'glass-card scrollbar-hide max-h-[92vh] w-full overflow-y-auto rounded-t-[3rem] p-0 shadow-2xl sm:max-w-lg sm:rounded-b-[3rem]',
              className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Grab Handle */}
            <div className="flex justify-center pt-4 sm:hidden">
              <div className="bg-base-content/10 h-1.5 w-12 rounded-full shadow-inner"></div>
            </div>

            <header className="border-base-content/5 flex items-center justify-between border-b px-8 pt-6 pb-4 sm:px-10 sm:pt-10">
              <h2 className="text-primary text-2xl leading-none font-black tracking-tighter sm:text-3xl">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="bg-base-200/50 hover:bg-base-300 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                title="Close modal"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </header>

            <div className="p-8 sm:px-10 sm:pt-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default Modal
