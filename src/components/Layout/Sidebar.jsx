import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronRight, Circle, X } from 'lucide-react'
import { categories, topicsByCategory } from '../../content/index.js'

export default function Sidebar({ isOpen, onClose, isCollapsed }) {
  const location = useLocation()
  const [expandedCats, setExpandedCats] = useState(() => {
    const cats = categories.map(category => category.name)
    return cats.reduce((acc, cat) => { acc[cat] = true; return acc }, {})
  })

  const toggleCat = (cat) => {
    setExpandedCats(prev => ({ ...prev, [cat]: !prev[cat] }))
  }

  const navigation = (
    <div className="p-4 pb-10">
      <div className="mb-5 flex items-center justify-between px-2 lg:hidden">
        <span className="text-sm font-semibold text-slate-900 dark:text-white">Browse library</span>
        <button onClick={onClose} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close navigation"><X className="h-5 w-5" /></button>
      </div>
      <h3 className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">Learning tracks</h3>
      <nav className="space-y-1">
          {categories.map(categoryData => {
            const category = categoryData.name
            const topics = topicsByCategory[category]
            return (
            <div key={category}>
              <button
                onClick={() => toggleCat(category)}
                className="flex w-full items-center rounded-lg px-2 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {expandedCats[category] ? (
                  <ChevronDown className="mr-1.5 h-4 w-4 shrink-0 text-slate-400" />
                ) : (
                  <ChevronRight className="mr-1.5 h-4 w-4 shrink-0 text-slate-400" />
                )}
                <span className="truncate">{categoryData.shortName}</span>
                <span className="ml-auto text-xs font-normal text-slate-400">{topics.length}</span>
              </button>
              {expandedCats[category] && (
                <div className="ml-5 mt-1 space-y-0.5 border-l border-slate-200 pl-2 dark:border-slate-800">
                  {topics.map(topic => (
                    <Link
                      key={topic.id}
                      to={`/topic/${topic.id}`}
                      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                        location.pathname === `/topic/${topic.id}`
                          ? 'bg-primary-50 font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Circle className={`h-1.5 w-1.5 shrink-0 ${topic.status === 'published' ? 'fill-emerald-500 text-emerald-500' : 'fill-slate-300 text-slate-300 dark:fill-slate-700 dark:text-slate-700'}`} />
                      <span className="truncate">{topic.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )})}
      </nav>
      <div className="mx-2 mt-7 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Lesson status</p>
        <div className="mt-2 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
          <span className="flex items-center gap-1.5"><Circle className="h-1.5 w-1.5 fill-emerald-500 text-emerald-500" />Published</span>
          <span className="flex items-center gap-1.5"><Circle className="h-1.5 w-1.5 fill-slate-300 text-slate-300 dark:fill-slate-700 dark:text-slate-700" />Planned</span>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <aside className={`sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-50 transition-[width] duration-200 lg:block dark:border-slate-800 dark:bg-slate-950 ${isCollapsed ? 'invisible w-0 pointer-events-none border-r-0' : 'visible w-72'}`} aria-hidden={isCollapsed}>
        {navigation}
      </aside>
      {isOpen && <button className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden" onClick={onClose} aria-label="Close navigation" />}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[min(88vw,20rem)] overflow-y-auto bg-white shadow-2xl transition-transform duration-200 lg:hidden dark:bg-slate-950 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {navigation}
      </aside>
    </>
  )
}
