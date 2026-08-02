import { BookOpen, Code, Layers, Zap } from 'lucide-react'
import { allTopics, allCategories } from '../content/index.js'
import TopicCard from '../components/UI/TopicCard.jsx'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Software Engineering <span className="text-primary-600">Notes</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          A curated collection of software engineering topics — from C# fundamentals to advanced patterns. 
          Built for quick reference and deep learning.
        </p>

        <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <BookOpen className="w-4 h-4" />
            {allTopics.length} topics
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Layers className="w-4 h-4" />
            {allCategories.length} categories
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Code className="w-4 h-4" />
            Code snippets
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Zap className="w-4 h-4" />
            Interactive quizzes
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allTopics.map(topic => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>

      {/* Empty state hint */}
      {allTopics.length === 0 && (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No topics yet. Add your first topic in <code>src/content/topics/</code></p>
        </div>
      )}
    </div>
  )
}
