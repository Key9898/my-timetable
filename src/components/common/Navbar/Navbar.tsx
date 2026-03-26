import { type FC, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Search, Sun, User, X } from 'lucide-react'
import { useTheme } from '../../../hooks/useTheme'
import { useTimetable } from '../../../hooks/useTimetable'
import type { AppRoute } from '../../../hooks/useBrowserNavigation'

interface NavbarProps {
  currentPath: AppRoute
  onNavigate: (path: AppRoute) => void
}

const Navbar: FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const { theme, toggleTheme } = useTheme()
  const { searchQuery, setSearchQuery } = useTimetable()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (searchActive && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchActive])

  const navLinks = [
    { name: 'Dashboard', href: '/' as AppRoute },
    { name: 'Analytics', href: '/analytics' as AppRoute },
    { name: 'History', href: '/history' as AppRoute },
  ]

  const searchPlaceholder =
    currentPath === '/analytics'
      ? 'Filter analytics...'
      : currentPath === '/history'
        ? 'Search history...'
        : 'Search schedule...'

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-[100] border-b transition-all duration-500 ${
          scrolled
            ? 'bg-base-100/30 shadow-primary/5 border-white/5 py-3.5 shadow-2xl backdrop-blur-xl'
            : 'border-transparent bg-transparent py-6'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="group flex cursor-pointer items-center gap-3"
          >
            <div className="relative h-10 w-10">
              <img
                src="/logo/logo.svg"
                alt="Chronos Logo"
                className="h-full w-full transition-transform duration-300 group-hover:rotate-12"
              />
              <div className="bg-primary/20 absolute inset-0 rounded-full opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
            </div>
            <span className="text-primary text-2xl font-black tracking-tighter">CHRONOS</span>
          </button>

          <div className="hidden items-center gap-4 md:flex lg:gap-8">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.name}
                onClick={() => onNavigate(link.href)}
                className={`text-[9px] font-black tracking-[0.2em] uppercase transition-colors lg:text-[10px] ${
                  currentPath === link.href
                    ? 'text-primary'
                    : 'text-base-content/40 hover:text-primary'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex lg:gap-5">
            <div className="relative flex items-center">
              <motion.div
                initial={false}
                animate={{ width: searchActive ? 240 : 0, opacity: searchActive ? 1 : 0 }}
                className="mr-2 overflow-hidden"
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-base-200/50 focus:ring-primary/30 w-full rounded-full border-none px-4 py-2 text-xs font-bold outline-none focus:ring-1"
                />
              </motion.div>
              <button
                type="button"
                onClick={() => setSearchActive(!searchActive)}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                  searchActive
                    ? 'bg-primary text-white'
                    : 'bg-base-200/50 text-base-content/40 hover:text-primary hover:bg-base-300'
                }`}
              >
                {searchActive ? <X size={18} /> : <Search size={18} />}
              </button>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="bg-base-200/50 hover:bg-base-300 text-base-content/40 hover:text-primary flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
            >
              {theme === 'winter' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <div className="bg-base-content/10 mx-2 h-8 w-[1px]" />
            <button
              type="button"
              className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/10 group flex items-center gap-1.5 rounded-full border py-2 pr-3 pl-2 transition-all md:gap-3 md:pr-6"
            >
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
                <User size={16} />
              </div>
              <span className="text-[10px] font-black tracking-widest uppercase">Sign In</span>
            </button>
          </div>

          <button
            type="button"
            className="bg-base-200 flex h-10 w-10 items-center justify-center rounded-xl md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="bg-base-100 fixed inset-0 z-[90] flex flex-col gap-10 p-10 pt-32 md:hidden"
          >
            <div className="relative">
              <Search
                className="text-base-content/30 absolute top-1/2 left-5 -translate-y-1/2"
                size={20}
              />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-base-200 focus:ring-primary/20 w-full rounded-3xl border-none py-5 pr-6 pl-14 text-sm font-bold outline-none focus:ring-2"
              />
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.name}
                  onClick={() => {
                    onNavigate(link.href)
                    setMobileMenuOpen(false)
                  }}
                  className={`text-left text-5xl font-black tracking-tighter transition-transform duration-300 ${
                    currentPath === link.href
                      ? 'text-primary'
                      : 'text-base-content/40 hover:text-primary hover:translate-x-2'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-6">
              <div className="bg-base-200/50 flex items-center justify-between rounded-[2.5rem] p-6">
                <span className="text-xs font-black tracking-widest uppercase opacity-40">
                  Appearance
                </span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="bg-base-100 flex items-center gap-3 rounded-full px-6 py-3 text-xs font-bold shadow-sm"
                >
                  {theme === 'winter' ? <Moon size={16} /> : <Sun size={16} />}
                  {theme === 'winter' ? 'Dark Mode' : 'Light Mode'}
                </button>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-lg h-20 rounded-[2.5rem] font-black tracking-[0.2em] uppercase"
              >
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
