import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, Hash, CircleDashed, BookOpen, ListTree, PanelRightClose, PanelRightOpen } from 'lucide-react'
import { getTopicById } from '../content/index.js'
import ContentRenderer, { getContentHeadings } from '../components/Content/ContentRenderer.jsx'

export default function TopicPage() {
  const { topicId } = useParams()
  const topic = getTopicById(topicId)
  const [isOutlineOpen, setIsOutlineOpen] = useState(true)

  if (!topic) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Topic not found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">The topic you're looking for doesn't exist.</p>
        <Link to="/" className="text-primary-600 hover:underline">Go back home</Link>
      </div>
    )
  }

  if (topic.status === 'planned') {
    return (
      <article className="mx-auto max-w-3xl py-6 sm:py-12">
        <Link to="/" className="mb-8 inline-flex items-center text-sm text-slate-500 transition-colors hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to learning tracks
        </Link>
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900">
            <CircleDashed className="h-3.5 w-3.5" />
            Planned lesson
          </span>
          <p className="mt-7 text-sm font-medium text-primary-600 dark:text-primary-400">{topic.category}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">{topic.title}</h1>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{topic.description}</p>
          <div className="mt-8 flex items-start gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/60">
            <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Content will be added next</p>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">This page is already connected to navigation and search. When the raw notes are ready, they can be converted into the site’s reusable learning blocks.</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {topic.tags.map(tag => <span key={tag} className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"><Hash className="mr-0.5 h-3 w-3" />{tag}</span>)}
          </div>
        </div>
      </article>
    )
  }

  const outline = getContentHeadings(topic.sections).filter(item => item.level === 2)

  return (
    <article>
      {/* Breadcrumb & Meta */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
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
          {outline.length > 0 && (
            <button onClick={() => setIsOutlineOpen(open => !open)} className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-primary-300 hover:text-primary-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-primary-700 dark:hover:text-primary-300" aria-expanded={isOutlineOpen}>
              {isOutlineOpen ? <PanelRightClose className="h-3.5 w-3.5" /> : <PanelRightOpen className="h-3.5 w-3.5" />}
              {isOutlineOpen ? 'Hide outline' : 'Show outline'}
            </button>
          )}
        </div>
      </div>

      <div className={`grid items-start gap-8 ${isOutlineOpen && outline.length > 0 ? 'xl:grid-cols-[minmax(0,1fr)_15rem]' : ''}`}>
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white px-5 py-2 shadow-sm sm:px-8 dark:border-slate-800 dark:bg-slate-900">
          <ContentRenderer sections={topic.sections} />
        </div>
        {isOutlineOpen && outline.length > 0 && (
          <aside className="order-first rounded-2xl border border-slate-200 bg-white p-4 shadow-sm xl:order-none xl:sticky xl:top-24 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              <ListTree className="h-4 w-4 text-primary-500" />
              On this page
            </div>
            <nav aria-label="Lesson outline" className="space-y-1">
              {outline.map(item => (
                <a key={item.id} href={`#${item.id}`} className="block rounded-lg px-2.5 py-2 text-sm text-slate-600 transition hover:bg-primary-50 hover:text-primary-700 dark:text-slate-400 dark:hover:bg-primary-900/20 dark:hover:text-primary-300">
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
        )}
      </div>
    </article>
  )
}
