import { useState, useEffect } from 'react'

type Theme = 'winter' | 'dark'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('chronos-theme') as Theme
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'winter'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('chronos-theme', theme)

    // Also toggle the 'dark' class for Tailwind's dark mode utilities if needed
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'winter' ? 'dark' : 'winter'))
  }

  return { theme, toggleTheme }
}
