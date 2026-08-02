import { Hash } from 'lucide-react'

export default function TagBadge({ tag, onClick, active = false }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1 text-sm rounded-full transition-colors ${
        active
          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      <Hash className="w-3.5 h-3.5 mr-1" />
      {tag}
    </button>
  )
}
