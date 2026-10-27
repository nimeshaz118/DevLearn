// Central content registry.
//
// To publish a lesson:
// 1. Add it to the relevant category file in src/content/topics/.
// 2. Use createLesson for the shared explanation, diagram, code, and quiz structure.
// 3. New category files can be imported and spread into allTopics below.
// Search, navigation, category counts, and the home page update automatically.

import { csharpBasics } from './topics/csharp-basics.js'
import { oopConcepts } from './topics/oop-concepts.js'
import { llmTopics } from './topics/llm.js'
import { dotnetTopics } from './topics/dotnet.js'
import { oopTopics } from './topics/oop.js'
import { errorTopics } from './topics/errors.js'
import { reactTopics } from './topics/react.js'
import { databaseTopics } from './topics/database.js'
import { authTopics } from './topics/auth.js'

export const categories = [
  { id: 'llm', name: 'LLM', shortName: 'LLM', description: 'Language models, prompting, embeddings, and practical AI patterns.', icon: 'sparkles' },
  { id: 'csharp-dotnet', name: 'C# & .NET', shortName: 'C#', description: 'C#, ASP.NET Core, EF Core, dependency injection, and repositories.', icon: 'braces' },
  { id: 'oop', name: 'Object-Oriented Programming', shortName: 'OOP', description: 'Classes, constructors, abstraction, inheritance, and clean object design.', icon: 'boxes' },
  { id: 'error-handling', name: 'Error & Exception Handling', shortName: 'Errors', description: 'Reliable error handling, validation, logging, and useful API responses.', icon: 'shield-alert' },
  { id: 'react', name: 'React', shortName: 'React', description: 'Components, state, hooks, routing, and maintainable front-end patterns.', icon: 'atom' },
  { id: 'database-sql', name: 'Database & SQL', shortName: 'SQL', description: 'Relational database fundamentals, queries, schema design, and performance.', icon: 'database' },
  { id: 'jwt-auth', name: 'JWT Authentication', shortName: 'JWT', description: 'Tokens, authentication flows, authorization, and secure API access.', icon: 'key-round' },
]

export const allTopics = [
  ...llmTopics,
  { ...csharpBasics, category: 'C# & .NET', status: 'published' },
  ...dotnetTopics,
  { ...oopConcepts, category: 'Object-Oriented Programming', status: 'published' },
  ...oopTopics,
  ...errorTopics,
  ...reactTopics,
  ...databaseTopics,
  ...authTopics,
]

export const allCategories = categories.map(category => category.name)
export const publishedTopics = allTopics.filter(topic => topic.status === 'published')
export const allTags = [...new Set(allTopics.flatMap(topic => topic.tags))].sort()

export const topicsByCategory = Object.fromEntries(
  allCategories.map(category => [category, allTopics.filter(topic => topic.category === category)]),
)

export const getTopicById = id => allTopics.find(topic => topic.id === id)
export const getCategoryByName = name => categories.find(category => category.name === name)
