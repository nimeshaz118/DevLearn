import { useState } from 'react'
import { Play, RotateCcw, Lightbulb, Terminal } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function TryItYourself({ instructions, starterCode, language = 'csharp' }) {
  const [code, setCode] = useState(starterCode)
  const [output, setOutput] = useState('')
  const [showHint, setShowHint] = useState(false)

  // Note: Real execution would require a backend or WebAssembly.
  // For now, we simulate with a placeholder response.
  const handleRun = () => {
    setOutput('// Code execution requires a C# compiler backend.\n// This is a placeholder — in production, connect to a compiler API or use Blazor WASM.\n\n// Your code:\n' + code.split('\n').map(l => '// ' + l).join('\n'))
  }

  const handleReset = () => setCode(starterCode)

  return (
    <div className="my-6 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-amber-50 dark:bg-amber-900/20 border-b border-gray-200 dark:border-gray-700">
        <Terminal className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        <h4 className="font-semibold text-gray-900 dark:text-white">Try It Yourself</h4>
      </div>

      <div className="p-4 bg-white dark:bg-gray-900">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{instructions}</p>

        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-48 p-4 text-sm font-mono bg-gray-900 text-gray-100 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            spellCheck={false}
          />
        </div>

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={handleRun}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Play className="w-4 h-4" />
            Run
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors ml-auto"
          >
            <Lightbulb className="w-4 h-4" />
            {showHint ? 'Hide Hint' : 'Hint'}
          </button>
        </div>

        {showHint && (
          <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-sm text-amber-800 dark:text-amber-200">
            Look at the starter code carefully. The solution builds on the existing structure.
          </div>
        )}

        {output && (
          <div className="mt-3">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Output</div>
            <div className="p-3 bg-gray-950 rounded-lg">
              <SyntaxHighlighter
                language="text"
                style={vscDarkPlus}
                customStyle={{ margin: 0, padding: 0, background: 'transparent', fontSize: '0.8rem' }}
              >
                {output}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
