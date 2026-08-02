import { Link } from 'react-router-dom'
import { Clock, ArrowRight, Hash } from 'lucide-react'

export default function TopicCard({ topic }) {
  return (
    <Link
      to={`/topic/${topic.id}`}
      className="group block p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md dark:hover:shadow-gray-900/50 transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300">
          {topic.category}
        </span>
        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary-500 transition-colors" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {topic.title}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
        {topic.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {topic.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="inline-flex items-center text-xs text-gray-500 dark:text-gray-500"
            >
              <Hash className="w-3 h-3 mr-0.5" />
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
          <Clock className="w-3.5 h-3.5 mr-1" />
          {topic.estimatedReadTime} min
        </div>
      </div>
    </Link>
  )
}
