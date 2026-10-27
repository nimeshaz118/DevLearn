import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import SearchBar from '../UI/SearchBar.jsx'

export default function Layout({ children }) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsNavigationOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname, location.search])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header onMenuClick={() => setIsNavigationOpen(true)} />
      <div className="border-b border-slate-200 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-950">
        <SearchBar />
      </div>
      <div className="mx-auto flex max-w-[1440px]">
        <Sidebar isOpen={isNavigationOpen} onClose={() => setIsNavigationOpen(false)} />
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10 lg:px-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
