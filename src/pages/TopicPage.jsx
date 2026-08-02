import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, Hash } from 'lucide-react'
import { getTopicById } from '../content/index.js'
import ContentRenderer from '../components/Content/ContentRenderer.jsx'

export default function TopicPage() {
  const { topicId } = useParams()
  const topic = getTopicById(topicId)

  if (!topic) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Topic not found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">The topic you're looking for doesn't exist.</p>
        <Link to="/" className="text-primary-600 hover:underline">Go back home</Link>
      </div>
    )
  }

  return (
    <div>
      {/* Breadcrumb & Meta */}
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          All topics
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300">
            {topic.category}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {topic.title}
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {topic.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {topic.estimatedReadTime} min read
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {topic.date}
          </div>
          <div className="flex items-center gap-2">
            {topic.tags.map(tag => (
              <span key={tag} className="inline-flex items-center">
                <Hash className="w-3 h-3 mr-0.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-800 mb-8" />

      {/* Content */}
      <ContentRenderer sections={topic.sections} />
    </div>
  )
}
