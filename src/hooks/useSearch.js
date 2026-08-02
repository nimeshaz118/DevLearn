import { useMemo } from 'react'
import { allTopics } from '../content/index.js'

export function useSearch(query) {
  return useMemo(() => {
    if (!query || query.trim() === '') return []
    const lower = query.toLowerCase()
    return allTopics.filter(topic => {
      return (
        topic.title.toLowerCase().includes(lower) ||
        topic.description.toLowerCase().includes(lower) ||
        topic.tags.some(tag => tag.toLowerCase().includes(lower)) ||
        topic.category.toLowerCase().includes(lower)
      )
    })
  }, [query])
}
