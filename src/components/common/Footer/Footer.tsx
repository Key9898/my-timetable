import { type FC } from 'react'
import { motion } from 'framer-motion'

const Footer: FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="w-full pt-4 pb-8 text-center"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-base-content/20 hover:text-primary/40 cursor-default text-[10px] font-black tracking-[0.4em] uppercase transition-colors select-none">
          © 2026 <span className="text-primary/30">Chronos</span> • Developed By{' '}
          <span className="text-secondary/40">Wunna Aung</span>
        </p>
      </div>
    </motion.footer>
  )
}

export default Footer
