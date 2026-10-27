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

### Step 1: Create a Topic File

Create a new file in `src/content/topics/` (e.g., `dependency-injection.js`):

```javascript
import { text, heading, code, callout, quiz } from '../../utils/contentParser.js'

export const dependencyInjection = {
  id: 'dependency-injection',
  title: 'Dependency Injection',
  description: 'Learn how to inject dependencies in .NET applications.',
  category: 'C# & .NET',    // Must match a category name in content/index.js
  status: 'published',
  tags: ['csharp', 'di', 'ioc', 'dotnet'],
  date: '2026-08-02',
  estimatedReadTime: 10,
  sections: [
    heading(1, 'Dependency Injection'),
    text('Dependency Injection (DI) is a design pattern...'),

    heading(2, 'Constructor Injection'),
    code('csharp', `public class OrderService
{
    private readonly IRepository _repo;

    public OrderService(IRepository repo)
    {
        _repo = repo;
    }
}`, 'OrderService.cs'),

    callout('Prefer constructor injection over property injection for required dependencies.', 'tip'),

    quiz(
      'Which DI lifetime creates a new instance per request?',
      ['Singleton', 'Scoped', 'Transient', 'Singleton per thread'],
      1,
      'Scoped lifetime creates one instance per HTTP request in ASP.NET Core.'
    )
  ]
}
```

### Step 2: Register the Topic

Open `src/content/index.js`, import the lesson, and replace its matching `plannedTopic(...)` entry:

```javascript
import { dependencyInjection } from './topics/dependency-injection.js'

export const allTopics = [
  // ...other lessons
  dependencyInjection,
  // ...other lessons
]
```

### Step 3: Done!

The topic automatically appears in:
- Published lessons on the home page
- Sidebar navigation (under its category)
- Search results
- Its own URL at `/topic/dependency-injection`

The roadmap entry can exist before the content does. Planned lessons use `plannedTopic(...)`, appear in search and navigation, and show a clean “Planned lesson” page until their content file is registered.

---

## Content Section Types

Import these helpers from `src/utils/contentParser.js`:

| Helper | Purpose | Example |
|--------|---------|---------|
| `text(content)` | Paragraph text | `text('Hello world')` |
| `heading(level, content)` | Section heading | `heading(2, 'Subtopic')` |
| `code(language, content, filename?)` | Code block | `code('csharp', '...', 'Program.cs')` |
| `image(src, alt, caption?)` | Image/diagram | `image('/diagram.png', 'Class diagram')` |
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
3. **You drop the file** into `src/content/topics/` and register it in `index.js`
4. **Done** — no UI changes needed

---

## Project Structure

```
edu-blog/
├── src/
│   ├── components/
│   │   ├── Layout/          # Header, Sidebar, ThemeToggle
│   │   ├── UI/              # SearchBar, TopicCard, TagBadge
│   │   └── Content/         # CodeBlock, Quiz, TryItYourself, ImageDiagram, ContentRenderer
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
