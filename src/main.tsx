// src/main.tsx (or index.tsx)
import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { useAuthStore } from './store/authStore'
import { useThemeStore } from './store/themeStore'

// This runs once when the app loads
const Root = () => {
  const initializeAuth = useAuthStore((state) => state.initialize)
  const isLoading = useAuthStore((state) => state.isLoading)
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    initializeAuth() 
  }, [initializeAuth])

  // Apply dark class to html element
useEffect(() => {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}, [theme])

    if (isLoading) {
    return <div>Initializing...</div>
  }



  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)