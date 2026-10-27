import { createLesson } from '../topicFactory.js'

export const reactTopics = [
  createLesson({
    id: 'react-components', title: 'Components & Props', category: 'React', tags: ['react', 'components', 'props'], minutes: 9,
    description: 'Build reusable interfaces from small, focused components.',
    overview: 'A React component is a function that describes part of the interface. Props are read-only inputs from a parent. Components work best when each has a clear purpose, renders predictable output for its inputs, and composes smaller pieces instead of growing into one large page component.',
    diagramTitle: 'One-way component data flow',
    diagramSteps: [{ label: 'Parent', detail: 'Owns data and decisions' }, { label: 'Props', detail: 'Pass values downward' }, { label: 'Child', detail: 'Renders from its inputs' }, { label: 'Callback', detail: 'Reports an event upward' }],
    concepts: ['Use PascalCase names for components and lowercase names for HTML elements.', 'Props are read-only; a child should not mutate an object owned by its parent.', 'Use children for content that naturally sits inside a reusable wrapper.', 'Keep stable identity with meaningful keys when rendering lists.'],
    exampleIntro: 'The card accepts data and an event callback, while its parent keeps ownership of the selected product.',
    language: 'javascript', filename: 'ProductCard.jsx',
    example: `function ProductCard({ product, onSelect }) {
  return (
    <article>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <button onClick={() => onSelect(product.id)}>View details</button>
    </article>
  );
}`,
    takeaway: 'Design component APIs the way you design functions: clear inputs, clear events, and one understandable responsibility.',
    quizQuestion: 'How should a child component treat its props?', quizOptions: ['As read-only inputs', 'As global variables', 'As database rows to delete', 'As CSS files'], quizAnswer: 0,
    quizExplanation: 'The parent owns the values; the child reads props and uses callbacks to request changes.',
  }),
  createLesson({
    id: 'react-state-hooks', title: 'State & Hooks', category: 'React', tags: ['react', 'state', 'hooks'], minutes: 11,
    description: 'Manage component behavior with state and reusable hooks.',
    overview: 'State is data that changes over time and affects rendering. Hooks let function components use state, effects, context, refs, and reusable behavior. Keep state minimal: calculate values that can be derived during rendering, and use effects only to synchronize React with an external system.',
    diagramTitle: 'The React update cycle',
    diagramSteps: [{ label: 'User event', detail: 'Click, input, or external message' }, { label: 'State update', detail: 'Request the next state' }, { label: 'Render', detail: 'React computes the next UI' }, { label: 'Commit', detail: 'The DOM is updated' }],
    concepts: ['Never mutate state directly; replace arrays and objects with new values.', 'Use the updater form when next state depends on previous state.', 'Hooks must run unconditionally at the top level of a component or custom hook.', 'Effects need cleanup for subscriptions, timers, and in-flight work where applicable.'],
    exampleIntro: 'This state update uses the previous value safely and derives the label during rendering.',
    language: 'javascript', filename: 'Counter.jsx',
    example: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const label = count === 1 ? "click" : "clicks";

  return (
    <button onClick={() => setCount(current => current + 1)}>
      {count} {label}
    </button>
  );
}`,
    takeaway: 'Before adding state or an effect, ask whether the value can be derived from props and existing state. Fewer synchronization points mean fewer bugs.',
    quizQuestion: 'When should the updater form of setState be used?', quizOptions: ['When next state depends on previous state', 'Only for CSS', 'To mutate state directly', 'To declare a component'], quizAnswer: 0,
    quizExplanation: 'The updater receives the latest committed value and avoids stale state assumptions.',
  }),
  createLesson({
    id: 'react-routing', title: 'Client-Side Routing', category: 'React', tags: ['react', 'routing'], minutes: 10,
    description: 'Create multi-page experiences without full page reloads.',
    overview: 'Client-side routing maps browser URLs to React elements while keeping the application loaded. Routes make pages addressable, links update browser history, and parameters identify resources. A hosting fallback must serve index.html for unknown paths so direct visits can reach the client router.',
    diagramTitle: 'Client-side navigation',
    diagramSteps: [{ label: 'Link click', detail: 'Updates browser history' }, { label: 'Router', detail: 'Matches the current path' }, { label: 'Route element', detail: 'Renders the selected page' }, { label: 'URL', detail: 'Remains shareable and restorable' }],
    concepts: ['Use Link instead of a plain anchor for internal application navigation.', 'Route parameters identify a page resource, while search parameters represent filters or options.', 'Provide a not-found route for unmatched URLs.', 'Configure Vercel or another host to rewrite application paths to index.html.'],
    exampleIntro: 'These routes render a home page and one reusable topic page driven by the URL parameter.',
    language: 'javascript', filename: 'App.jsx',
    example: `import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/topic/:topicId" element={<TopicPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}`,
    takeaway: 'Treat the URL as part of the interface. A useful page should survive refresh, browser back and forward, and a copied link.',
    quizQuestion: 'Why does a deployed single-page app need a rewrite fallback?', quizOptions: ['To compile SQL', 'To serve index.html for direct visits to app routes', 'To disable browser history', 'To create JWTs'], quizAnswer: 1,
    quizExplanation: 'The host must return the app shell so the client router can handle the requested path.',
  }),
]
