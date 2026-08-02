// ============================================
// CONTENT REGISTRY
// ============================================
// To add a new topic:
// 1. Create a new file in src/content/topics/
// 2. Import it here and add to allTopics array
// 3. That's it! It will appear in navigation and search

import { csharpBasics } from './topics/csharp-basics.js'
import { oopConcepts } from './topics/oop-concepts.js'

export const allTopics = [
  csharpBasics,
  oopConcepts,
  // Add new topics here
]

// Derived data for navigation
export const allCategories = [...new Set(allTopics.map(t => t.category))]

export const allTags = [...new Set(allTopics.flatMap(t => t.tags))]

export const topicsByCategory = allCategories.reduce((acc, cat) => {
  acc[cat] = allTopics.filter(t => t.category === cat)
  return acc
}, {})

export const getTopicById = (id) => allTopics.find(t => t.id === id)
