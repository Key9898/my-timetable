import { useEffect, useState } from 'react'

export type AppRoute = '/' | '/analytics' | '/history'

const VALID_ROUTES: AppRoute[] = ['/', '/analytics', '/history']

const normalizeRoute = (path: string): AppRoute => {
  const normalizedPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path

  if (VALID_ROUTES.includes(normalizedPath as AppRoute)) {
    return normalizedPath as AppRoute
  }

  return '/'
}

export const useBrowserNavigation = () => {
  const [currentPath, setCurrentPath] = useState<AppRoute>(() =>
    normalizeRoute(window.location.pathname),
  )

  useEffect(() => {
    const normalizedPath = normalizeRoute(window.location.pathname)

    if (normalizedPath !== window.location.pathname) {
      window.history.replaceState({}, '', normalizedPath)
    }
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizeRoute(window.location.pathname))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (nextPath: AppRoute) => {
    if (nextPath === currentPath) return

    window.history.pushState({}, '', nextPath)
    setCurrentPath(nextPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return {
    currentPath,
    navigate,
  }
}
