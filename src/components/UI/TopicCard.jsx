import { Link } from 'react-router-dom'
import { Clock, ArrowRight, Hash, CircleDashed } from 'lucide-react'

export default function TopicCard({ topic }) {
  const isPlanned = topic.status === 'planned'

  return (
    <Link
      to={`/topic/${topic.id}`}
      className="group block rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30 transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none dark:hover:border-primary-700"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="inline-flex items-center rounded-md bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-300">
          {topic.category}
        </span>
        <ArrowRight className="h-4 w-4 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary-500 dark:text-slate-700" />
      </div>

      <h3 className="mb-1 text-lg font-semibold text-slate-950 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
        {topic.title}
      </h3>

      <p className="mb-4 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {topic.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex min-w-0 flex-wrap gap-1.5">
          {topic.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="inline-flex items-center text-xs text-slate-500 dark:text-slate-500"
            >
              <Hash className="w-3 h-3 mr-0.5" />
              {tag}
            </span>
          ))}
        </div>
        <div className="ml-3 flex shrink-0 items-center text-xs text-slate-400 dark:text-slate-500">
          {isPlanned ? <CircleDashed className="mr-1 h-3.5 w-3.5" /> : <Clock className="mr-1 h-3.5 w-3.5" />}
          {isPlanned ? 'Planned' : `${topic.estimatedReadTime} min`}
        </div>
      </div>
    </Link>
  )
}
