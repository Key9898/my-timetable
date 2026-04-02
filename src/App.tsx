import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider } from './contexts/AuthProvider'
import { TimetableProvider } from './contexts/TimetableProvider'
import { ToastProvider } from './contexts/ToastProvider'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ErrorBoundary from './components/common/ErrorBoundary'
import Toast from './components/common/Toast'
import Home from './pages/Home'
import Analytics from './pages/Analytics'
import History from './pages/History'
import { useBrowserNavigation, type AppRoute } from './hooks/useBrowserNavigation'

const pageTitles: Record<AppRoute, string> = {
  '/': 'Chronos Dashboard',
  '/analytics': 'Chronos Analytics',
  '/history': 'Chronos History',
}

function AppShell() {
  const { currentPath, navigate } = useBrowserNavigation()

  useEffect(() => {
    document.title = pageTitles[currentPath]
  }, [currentPath])

  const renderPage = () => {
    if (currentPath === '/analytics') {
      return <Analytics />
    }

    if (currentPath === '/history') {
      return <History />
    }

    return <Home onNavigate={navigate} />
  }

  return (
    <div className="bg-base-100 min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-secondary/10 absolute top-24 left-[-12%] h-72 w-72 rounded-full blur-[120px]" />
        <div className="bg-accent/10 absolute top-64 right-[-10%] h-96 w-96 rounded-full blur-[140px]" />
        <div className="bg-primary/10 absolute bottom-[-12%] left-1/3 h-80 w-80 rounded-full blur-[140px]" />
      </div>

      <Navbar currentPath={currentPath} onNavigate={navigate} />

      <main className="relative z-10 flex-1 px-0 pt-28 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <TimetableProvider>
            <Toast />
            <AppShell />
          </TimetableProvider>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
