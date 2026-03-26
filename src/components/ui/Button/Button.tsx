import { type FC, type ReactNode } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { motion, AnimatePresence, type HTMLMotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Omit conflicting props between React.ButtonHTMLAttributes and Framer Motion's motion.button
type MotionButtonProps = Omit<
  HTMLMotionProps<'button'>,
  'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
>

interface ButtonProps extends MotionButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: ReactNode
}

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const variants = {
    primary:
      'bg-primary text-primary-content border-none hover:bg-primary/90 shadow-lg shadow-primary/20',
    secondary:
      'bg-secondary text-secondary-content border-none hover:bg-secondary/90 shadow-lg shadow-secondary/20',
    accent:
      'bg-accent text-accent-content border-none hover:bg-accent/90 shadow-lg shadow-accent/20',
    ghost: 'bg-transparent text-base-content hover:bg-base-200 border-none',
    outline:
      'bg-transparent border-2 border-primary/40 text-primary hover:border-primary hover:bg-primary/5',
    danger: 'bg-error text-error-content border-none hover:bg-error/90 shadow-lg shadow-error/20',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm h-10',
    md: 'px-6 py-3 text-base h-12',
    lg: 'px-8 py-4 text-lg h-14',
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      className={cn(
        'btn relative inline-flex items-center justify-center rounded-2xl font-bold tracking-tight whitespace-nowrap transition-all duration-300 disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex items-center"
          >
            <Loader2 className="mr-2 animate-spin" size={18} />
            <span className="opacity-70">{children}</span>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex items-center justify-center gap-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default Button
