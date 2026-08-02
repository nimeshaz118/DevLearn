import CodeBlock from './CodeBlock.jsx'
import Quiz from './Quiz.jsx'
import TryItYourself from './TryItYourself.jsx'
import ImageDiagram from './ImageDiagram.jsx'
import { Info, AlertTriangle, Lightbulb, AlertOctagon } from 'lucide-react'

const calloutIcons = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
  danger: AlertOctagon,
}

const calloutStyles = {
  info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
  warning: 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-200',
  tip: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
  danger: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
}

function Callout({ content, variant = 'info' }) {
  const Icon = calloutIcons[variant] || Info
  return (
    <div className={`my-4 p-4 border-l-4 rounded-r-lg ${calloutStyles[variant] || calloutStyles.info}`}>
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="text-sm leading-relaxed">{content}</div>
      </div>
    </div>
  )
}

function Heading({ level, content }) {
  const Tag = `h${Math.min(Math.max(level, 1), 6)}`
  const classes = {
    h1: 'text-3xl font-bold mb-4 mt-8 text-gray-900 dark:text-white',
    h2: 'text-2xl font-semibold mb-3 mt-6 text-gray-800 dark:text-gray-100',
    h3: 'text-xl font-semibold mb-2 mt-4 text-gray-800 dark:text-gray-200',
    h4: 'text-lg font-semibold mb-2 mt-3 text-gray-800 dark:text-gray-200',
    h5: 'text-base font-semibold mb-1 mt-2 text-gray-800 dark:text-gray-300',
    h6: 'text-sm font-semibold mb-1 mt-2 text-gray-800 dark:text-gray-300 uppercase tracking-wide',
  }
  return <Tag className={classes[Tag]}>{content}</Tag>
}

function Text({ content }) {
  return <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">{content}</p>
}

function List({ items, ordered }) {
  const Tag = ordered ? 'ol' : 'ul'
  const className = ordered 
    ? 'list-decimal list-inside mb-4 text-gray-700 dark:text-gray-300 space-y-1'
    : 'list-disc list-inside mb-4 text-gray-700 dark:text-gray-300 space-y-1'
  return (
    <Tag className={className}>
      {items.map((item, i) => (
        <li key={i} className="leading-relaxed">{item}</li>
      ))}
    </Tag>
  )
}

export default function ContentRenderer({ sections }) {
  return (
    <div className="prose-custom">
      {sections.map((section, index) => {
        switch (section.type) {
          case 'text':
            return <Text key={index} content={section.content} />
          case 'heading':
            return <Heading key={index} level={section.level} content={section.content} />
          case 'code':
            return (
              <CodeBlock 
                key={index} 
                language={section.language} 
                content={section.content} 
                filename={section.filename} 
              />
            )
          case 'image':
            return (
              <ImageDiagram 
                key={index} 
                src={section.src} 
                alt={section.alt} 
                caption={section.caption} 
              />
            )
          case 'quiz':
            return (
              <Quiz 
                key={index}
                question={section.question}
                options={section.options}
                correctIndex={section.correctIndex}
                explanation={section.explanation}
              />
            )
          case 'tryIt':
            return (
              <TryItYourself 
                key={index}
                instructions={section.instructions}
                starterCode={section.starterCode}
                language={section.language}
              />
            )
          case 'list':
            return <List key={index} items={section.items} ordered={section.ordered} />
          case 'callout':
            return <Callout key={index} content={section.content} variant={section.variant} />
          default:
            return null
        }
      })}
    </div>
  )
}
