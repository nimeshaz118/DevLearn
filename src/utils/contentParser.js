// Utility to help parse raw text content into structured sections
// You send raw text, and we can convert it to the structured format

export const sectionTypes = {
  TEXT: 'text',
  CODE: 'code',
  IMAGE: 'image',
  QUIZ: 'quiz',
  TRY_IT: 'tryIt',
  HEADING: 'heading',
  LIST: 'list',
  CALLOUT: 'callout'
}

/**
 * Helper to create a text section
 */
export const text = (content) => ({ type: sectionTypes.TEXT, content })

/**
 * Helper to create a heading section
 */
export const heading = (level, content) => ({ type: sectionTypes.HEADING, level, content })

/**
 * Helper to create a code section
 */
export const code = (language, content, filename = null) => ({
  type: sectionTypes.CODE,
  language,
  content,
  filename
})

/**
 * Helper to create an image/diagram section
 */
export const image = (src, alt, caption = '') => ({
  type: sectionTypes.IMAGE,
  src,
  alt,
  caption
})

/**
 * Helper to create a quiz section
 */
export const quiz = (question, options, correctIndex, explanation = '') => ({
  type: sectionTypes.QUIZ,
  question,
  options,
  correctIndex,
  explanation
})

/**
 * Helper to create a "Try It Yourself" section
 */
export const tryIt = (instructions, starterCode, language = 'csharp') => ({
  type: sectionTypes.TRY_IT,
  instructions,
  starterCode,
  language
})

/**
 * Helper to create a list section
 */
export const list = (items, ordered = false) => ({
  type: sectionTypes.LIST,
  items,
  ordered
})

/**
 * Helper to create a callout/info box
 */
export const callout = (content, variant = 'info') => ({
  type: sectionTypes.CALLOUT,
  content,
  variant // info, warning, tip, danger
})
