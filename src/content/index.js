// Central content registry.
//
// To publish a lesson:
// 1. Create its file in src/content/topics/ using the helpers in contentParser.js.
// 2. Import it here.
// 3. Replace the matching plannedTopic entry with the imported lesson.
// Search, navigation, category counts, and the home page update automatically.

import { csharpBasics } from './topics/csharp-basics.js'
import { oopConcepts } from './topics/oop-concepts.js'

const plannedTopic = (id, title, description, category, tags = []) => ({
  id,
  title,
  description,
  category,
  tags,
  status: 'planned',
  estimatedReadTime: null,
  sections: [],
})

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
  plannedTopic('llm-basics', 'How LLMs Work', 'A practical introduction to tokens, context, and model responses.', 'LLM', ['llm', 'ai', 'basics']),
  plannedTopic('prompting-basics', 'Prompting Basics', 'Write clear instructions and improve model output step by step.', 'LLM', ['llm', 'prompting']),
  plannedTopic('embeddings-rag', 'Embeddings & RAG', 'Understand semantic search and grounding models with your own data.', 'LLM', ['llm', 'embeddings', 'rag']),
  { ...csharpBasics, category: 'C# & .NET', status: 'published' },
  plannedTopic('aspnet-core', 'ASP.NET Core', 'Build modern web APIs with the ASP.NET Core request pipeline.', 'C# & .NET', ['csharp', 'aspnet', 'api']),
  plannedTopic('ef-core', 'Entity Framework Core', 'Work with databases using entities, DbContext, and migrations.', 'C# & .NET', ['csharp', 'ef-core', 'database']),
  plannedTopic('dependency-injection', 'Dependency Injection', 'Keep application code modular, testable, and loosely coupled.', 'C# & .NET', ['csharp', 'di', 'architecture']),
  plannedTopic('generic-repositories', 'Generic Repositories', 'Explore reusable data access patterns and their trade-offs.', 'C# & .NET', ['csharp', 'repository', 'ef-core']),
  plannedTopic('swagger-openapi', 'Swagger & OpenAPI', 'Document and explore APIs with an interactive interface.', 'C# & .NET', ['api', 'swagger', 'openapi']),
  plannedTopic('iactionresult', 'IActionResult', 'Return clear, consistent HTTP responses from ASP.NET controllers.', 'C# & .NET', ['aspnet', 'api', 'http']),
  { ...oopConcepts, category: 'Object-Oriented Programming', status: 'published' },
  plannedTopic('classes-objects', 'Classes & Objects', 'Model data and behavior using classes and object instances.', 'Object-Oriented Programming', ['oop', 'classes', 'objects']),
  plannedTopic('constructors', 'Constructors', 'Initialize valid objects and understand constructor patterns.', 'Object-Oriented Programming', ['oop', 'constructors']),
  plannedTopic('solid-principles', 'SOLID Principles', 'Use five practical principles to improve object-oriented design.', 'Object-Oriented Programming', ['oop', 'solid', 'design']),
  plannedTopic('exceptions-csharp', 'Exceptions in C#', 'Throw, catch, and handle exceptions without hiding failures.', 'Error & Exception Handling', ['csharp', 'exceptions']),
  plannedTopic('global-error-handling', 'Global API Error Handling', 'Create consistent error responses from one central pipeline.', 'Error & Exception Handling', ['aspnet', 'errors', 'api']),
  plannedTopic('logging-basics', 'Logging Basics', 'Capture useful diagnostic information without adding noise.', 'Error & Exception Handling', ['logging', 'debugging']),
  plannedTopic('react-components', 'Components & Props', 'Build reusable interfaces from small, focused components.', 'React', ['react', 'components', 'props']),
  plannedTopic('react-state-hooks', 'State & Hooks', 'Manage component behavior with state and reusable hooks.', 'React', ['react', 'state', 'hooks']),
  plannedTopic('react-routing', 'Client-Side Routing', 'Create multi-page experiences without full page reloads.', 'React', ['react', 'routing']),
  plannedTopic('sql-basics', 'SQL Basics', 'Select, filter, sort, and combine relational data.', 'Database & SQL', ['sql', 'database', 'basics']),
  plannedTopic('database-design', 'Relational Database Design', 'Design tables, relationships, keys, and useful constraints.', 'Database & SQL', ['sql', 'schema', 'database']),
  plannedTopic('sql-joins', 'SQL Joins', 'Combine related rows using inner and outer joins.', 'Database & SQL', ['sql', 'joins']),
  plannedTopic('jwt-basics', 'JWT Fundamentals', 'Understand token structure, claims, signing, and expiration.', 'JWT Authentication', ['jwt', 'authentication', 'security']),
  plannedTopic('jwt-aspnet', 'JWT in ASP.NET Core', 'Protect API routes and validate bearer tokens.', 'JWT Authentication', ['jwt', 'aspnet', 'api']),
  plannedTopic('refresh-tokens', 'Refresh Tokens', 'Renew sessions securely without asking users to sign in repeatedly.', 'JWT Authentication', ['jwt', 'security', 'tokens']),
]

export const allCategories = categories.map(category => category.name)
export const publishedTopics = allTopics.filter(topic => topic.status === 'published')
export const allTags = [...new Set(allTopics.flatMap(topic => topic.tags))].sort()

export const topicsByCategory = Object.fromEntries(
  allCategories.map(category => [category, allTopics.filter(topic => topic.category === category)]),
)

export const getTopicById = id => allTopics.find(topic => topic.id === id)
export const getCategoryByName = name => categories.find(category => category.name === name)
