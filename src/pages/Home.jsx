import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Atom,
  BookOpen,
  Boxes,
  Braces,
  Code2,
  Database,
  KeyRound,
  Search,
  ShieldAlert,
  Sparkles,
} from 'lucide-react'
import { categories, publishedTopics, topicsByCategory } from '../content/index.js'
import TopicCard from '../components/UI/TopicCard.jsx'

const icons = {
  sparkles: Sparkles,
  braces: Braces,
  boxes: Boxes,
  'shield-alert': ShieldAlert,
  atom: Atom,
  database: Database,
  'key-round': KeyRound,
}

export default function Home() {
  return (
    <div className="space-y-14 pb-10">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-14 dark:border-slate-800 dark:bg-slate-900">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary-100/70 blur-3xl dark:bg-primary-900/20" />
        <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-cyan-100/60 blur-3xl dark:bg-cyan-900/10" />
        <div className="relative max-w-3xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
            <Code2 className="h-3.5 w-3.5" />
            Learn one concept at a time
          </span>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
            Software engineering notes,{' '}
            <span className="text-primary-600 dark:text-primary-400">made easier.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
            Clear explanations, practical code, diagrams, and quick checks for the ideas worth remembering.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#learning-tracks" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition hover:bg-primary-700">
              Explore learning tracks
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link to="/search?q=C%23" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary-300 hover:text-primary-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-primary-700 dark:hover:text-primary-300">
              <Search className="h-4 w-4" />
              Search the library
            </Link>
          </div>
        </div>
      </section>

      <section id="learning-tracks" className="scroll-mt-24">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">Library roadmap</p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">Learning tracks</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">Each track contains focused lessons. Planned lessons are already searchable and ready for content.</p>
          </div>
          <span className="hidden text-sm text-slate-500 sm:block dark:text-slate-400">{categories.length} tracks</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map(category => {
            const Icon = icons[category.icon] || BookOpen
            const topics = topicsByCategory[category.name]
            const publishedCount = topics.filter(topic => topic.status === 'published').length
            return (
              <Link key={category.id} to={`/search?q=${encodeURIComponent(category.name)}`} className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary-700">
                <div className="mb-5 flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100 dark:bg-primary-900/30 dark:text-primary-400 dark:ring-primary-900">
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary-500 dark:text-slate-700" />
                </div>
                <h3 className="font-semibold text-slate-950 dark:text-white">{category.name}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600 dark:text-slate-400">{category.description}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                  <span>{topics.length} lessons</span>
                  <span aria-hidden="true">•</span>
                  <span>{publishedCount > 0 ? `${publishedCount} published` : 'Coming soon'}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section>
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">Start reading</p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">Published lessons</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {publishedTopics.map(topic => <TopicCard key={topic.id} topic={topic} />)}
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-6 text-center dark:border-slate-700 dark:bg-slate-900/50">
        <BookOpen className="mx-auto h-8 w-8 text-primary-500" />
        <h2 className="mt-3 font-semibold text-slate-950 dark:text-white">Built to grow with your notes</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">New lessons use the same reusable blocks for text, code, callouts, images, quizzes, and exercises—so the library stays consistent as it grows.</p>
      </section>
    </div>
  )
}
