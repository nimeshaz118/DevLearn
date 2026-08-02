import { useState } from 'react'
import { CheckCircle, XCircle, HelpCircle, RotateCcw } from 'lucide-react'

export default function Quiz({ question, options, correctIndex, explanation }) {
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const handleSelect = (index) => {
    if (showResult) return
    setSelected(index)
    setShowResult(true)
  }

  const handleReset = () => {
    setSelected(null)
    setShowResult(false)
  }

  const isCorrect = selected === correctIndex

  return (
    <div className="my-6 p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-primary-500" />
        <h4 className="font-semibold text-gray-900 dark:text-white">Quick Quiz</h4>
      </div>

      <p className="text-gray-800 dark:text-gray-200 mb-4 font-medium">{question}</p>

      <div className="space-y-2">
        {options.map((option, index) => {
          let btnClass = 'w-full text-left px-4 py-3 rounded-lg border transition-all text-sm '

          if (!showResult) {
            btnClass += 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/10 text-gray-700 dark:text-gray-300'
          } else if (index === correctIndex) {
            btnClass += 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
          } else if (index === selected && index !== correctIndex) {
            btnClass += 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
          } else {
            btnClass += 'border-gray-200 dark:border-gray-700 opacity-60 text-gray-500 dark:text-gray-500'
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={showResult}
              className={btnClass}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && index === correctIndex && (
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                )}
                {showResult && index === selected && index !== correctIndex && (
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {showResult && (
        <div className={`mt-4 p-3 rounded-lg text-sm ${
          isCorrect 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
            : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
        }`}>
          <p className="font-medium mb-1">
            {isCorrect ? 'Correct!' : 'Not quite.'}
          </p>
          {explanation && <p className="opacity-90">{explanation}</p>}
        </div>
      )}

      {showResult && (
        <button
          onClick={handleReset}
          className="mt-3 flex items-center gap-1.5 text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          <RotateCcw className="w-4 h-4" />
          Try again
        </button>
      )}
    </div>
  )
}
