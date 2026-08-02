import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronRight, Hash } from 'lucide-react'
import { topicsByCategory, allTags } from '../../content/index.js'

export default function Sidebar() {
  const location = useLocation()
  const [expandedCats, setExpandedCats] = useState(() => {
    const cats = Object.keys(topicsByCategory)
    return cats.reduce((acc, cat) => { acc[cat] = true; return acc }, {})
  })

  const toggleCat = (cat) => {
    setExpandedCats(prev => ({ ...prev, [cat]: !prev[cat] }))
  }

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 hidden lg:block">
      <div className="p-4">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Topics
        </h3>
        <nav className="space-y-1">
          {Object.entries(topicsByCategory).map(([category, topics]) => (
            <div key={category}>
              <button
                onClick={() => toggleCat(category)}
                className="flex items-center w-full px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                {expandedCats[category] ? (
                  <ChevronDown className="w-4 h-4 mr-1 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-1 text-gray-400" />
                )}
                {category}
                <span className="ml-auto text-xs text-gray-400">{topics.length}</span>
              </button>
              {expandedCats[category] && (
                <div className="ml-5 mt-1 space-y-0.5">
                  {topics.map(topic => (
                    <Link
                      key={topic.id}
                      to={`/topic/${topic.id}`}
                      className={`block px-2 py-1.5 text-sm rounded-md transition-colors ${
                        location.pathname === `/topic/${topic.id}`
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                      }`}
                    >
                      {topic.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-6 mb-3">
          Tags
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {allTags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <Hash className="w-3 h-3 mr-0.5" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  )
}
