import { useSearchParams, Link } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
import { useSearch } from '../hooks/useSearch.js'
import TopicCard from '../components/UI/TopicCard.jsx'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const results = useSearch(query)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Search Results
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {results.length > 0 
            ? `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
            : `No results found for "${query}"`
          }
        </p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map(topic => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
          <Search className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-700" />
          <p className="text-gray-500 dark:text-gray-400 mb-2">No topics match your search.</p>
          <Link 
            to="/" 
            className="inline-flex items-center text-primary-600 hover:underline"
          >
            Browse all topics
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      )}
    </div>
  )
}
