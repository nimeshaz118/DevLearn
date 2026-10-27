import { Link } from 'react-router-dom'
import { BookOpen, Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import SearchBar from '../UI/SearchBar.jsx'
import ThemeToggle from './ThemeToggle.jsx'

export default function Header({ onMenuClick, isSidebarCollapsed }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <button onClick={onMenuClick} className="-ml-2 rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Toggle learning tracks sidebar" aria-expanded={!isSidebarCollapsed}>
              <Menu className="h-5 w-5 lg:hidden" />
              {isSidebarCollapsed ? <PanelLeftOpen className="hidden h-5 w-5 lg:block" /> : <PanelLeftClose className="hidden h-5 w-5 lg:block" />}
            </button>
            <Link to="/" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 shadow-md shadow-primary-600/20 transition-colors group-hover:bg-primary-700">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">
              Dev<span className="text-primary-600">Learn</span>
            </span>
          </Link>
          </div>

          <div className="mx-8 hidden max-w-lg flex-1 md:block">
            <SearchBar />
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
