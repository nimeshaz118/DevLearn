# DevLearn — Software Engineering Notes

A clean, fast, and extensible educational blog built with React + Vite + Tailwind CSS. Designed for software engineering topics with support for code snippets, quizzes, interactive exercises, and diagrams.

## Features

- **Dark & Light Mode** — Toggle with persistence
- **Search** — Real-time search across all topics
- **Sidebar Navigation** — Organized by categories
- **Content Types:**
  - Text & Headings
  - Code blocks with syntax highlighting and copy button
  - Images & Diagrams (with lightbox zoom)
  - Interactive Quizzes
  - "Try It Yourself" code playgrounds (UI ready, execution needs backend)
  - Callout boxes (info, tip, warning, danger)
  - Lists (ordered/unordered)
- **Responsive Design** — Works on all screen sizes
- **Easy Content Addition** — Just create a JS file and register it

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Build for Production

```bash
npm run build
```

---

## How to Add a New Topic

### Step 1: Add the lesson to its category file

Open the relevant file in `src/content/topics/` and create the lesson with `createLesson`. The factory keeps every lesson consistent: overview, diagram, key ideas, example, takeaway, and quiz.

```javascript
import { createLesson } from '../topicFactory.js'

export const dependencyInjection = createLesson({
  id: 'dependency-injection',
  title: 'Dependency Injection',
  description: 'Learn how to inject dependencies in .NET applications.',
  category: 'C# & .NET',    // Must match a category name in content/index.js
  tags: ['csharp', 'di', 'dotnet'],
  overview: 'Dependency injection gives a class its collaborators from outside...',
  diagramTitle: 'Constructor injection',
  diagramSteps: [
    { label: 'Registration', detail: 'Map a contract to an implementation' },
    { label: 'Container', detail: 'Build the object graph' },
    { label: 'Constructor', detail: 'Receive required services' },
  ],
  concepts: ['Dependencies stay explicit.', 'Lifetimes control ownership.'],
  exampleIntro: 'Register a service and receive it through the constructor.',
  language: 'csharp',
  filename: 'DependencyInjection.cs',
  example: 'builder.Services.AddScoped<IService, Service>();',
  takeaway: 'Prefer constructor injection for required dependencies.',
  quizQuestion: 'Which lifetime creates one instance per request?',
  quizOptions: ['Singleton', 'Scoped', 'Transient'],
  quizAnswer: 1,
  quizExplanation: 'Scoped services are shared within one request scope.',
})
```

### Step 2: Register the Topic

Export the lesson from its category array. `src/content/index.js` already combines those arrays:

```javascript
export const dotnetTopics = [
  dependencyInjection,
  // other C# and .NET lessons
]
```

### Step 3: Done!

The topic automatically appears in:
- Published lessons on the home page
- Sidebar navigation (under its category)
- Search results
- Its own URL at `/topic/dependency-injection`

The lesson automatically gains a page outline, searchable metadata, category navigation, and the standard visual content layout.

---

## Content Section Types

Import these helpers from `src/utils/contentParser.js`:

| Helper | Purpose | Example |
|--------|---------|---------|
| `text(content)` | Paragraph text | `text('Hello world')` |
| `heading(level, content)` | Section heading | `heading(2, 'Subtopic')` |
| `code(language, content, filename?)` | Code block | `code('csharp', '...', 'Program.cs')` |
| `image(src, alt, caption?)` | Image/diagram | `image('/diagram.png', 'Class diagram')` |
| `diagram(title, steps[], caption?)` | Responsive process diagram | `diagram('Request flow', steps)` |
| `quiz(question, options[], correctIndex, explanation?)` | Interactive quiz | `quiz('Q?', ['A','B'], 0, 'Because...')` |
| `tryIt(instructions, starterCode, language?)` | Code exercise | `tryIt('Fix this...', 'code...')` |
| `list(items[], ordered?)` | Bullet/numbered list | `list(['a', 'b'])` |
| `callout(content, variant?)` | Info box | `callout('Note:', 'warning')` |

**Callout variants:** `info`, `tip`, `warning`, `danger`

---

## Workflow for Adding Content (You + Me)

When you want to add a new topic:

1. **You send me** the raw text/content (bullet points, code, explanations)
2. **I format it** into the structured JS format above
3. **I add it** to the matching category file in `src/content/topics/`
4. **Done** — no UI changes needed

---

## Project Structure

```
edu-blog/
├── src/
│   ├── components/
│   │   ├── Layout/          # Header, Sidebar, ThemeToggle
│   │   ├── UI/              # SearchBar, TopicCard, TagBadge
│   │   └── Content/         # CodeBlock, Quiz, ConceptDiagram, ImageDiagram, ContentRenderer
│   ├── pages/               # Home, TopicPage, SearchResults
│   ├── content/
│   │   ├── index.js         # Registry of all topics
│   │   └── topics/          # Individual topic files
│   ├── hooks/               # useSearch
│   ├── context/             # ThemeContext (dark/light mode)
│   └── utils/               # contentParser helpers
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Framework preset: **Vite**
4. Deploy!

---

## Next Steps / Enhancements (Optional)

- [ ] Add a real C# compiler backend for "Try It Yourself"
- [ ] Add table of contents (TOC) sidebar per topic
- [ ] Add "previous / next topic" navigation
- [ ] Add progress tracking (localStorage)
- [ ] Add MDX support for writing content in Markdown
- [ ] Add sitemap generation for SEO
