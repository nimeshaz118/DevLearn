import { createLesson } from '../topicFactory.js'

export const llmTopics = [
  createLesson({
    id: 'llm-basics', title: 'How LLMs Work', category: 'LLM', tags: ['llm', 'ai', 'basics'], minutes: 10,
    description: 'A practical introduction to tokens, context, and model responses.',
    overview: 'A large language model predicts the next token from the tokens already in its context. Training exposes it to patterns in large collections of text and code; using the model applies those learned patterns to a new prompt. The result can be useful and fluent, but it is still a prediction rather than a database lookup or a guarantee of truth.',
    diagramTitle: 'From prompt to response',
    diagramSteps: [
      { label: 'Prompt', detail: 'Your instructions and supporting context' },
      { label: 'Tokens', detail: 'Text is split into model-readable pieces' },
      { label: 'Prediction', detail: 'The model scores likely next tokens' },
      { label: 'Response', detail: 'Tokens are generated until completion' },
    ],
    diagramCaption: 'Generation repeats the prediction step token by token.',
    concepts: ['Tokens are pieces of text, not always complete words.', 'The context window limits how much information the model can consider at once.', 'Temperature changes how varied the token choices are; it does not add knowledge.', 'Models can hallucinate, so important claims need verification.'],
    exampleIntro: 'A chat request usually sends a system instruction, user message, and generation settings together.',
    language: 'javascript', filename: 'request.js',
    example: `const request = {
  model: "example-model",
  messages: [
    { role: "system", content: "Explain ideas in plain language." },
    { role: "user", content: "What is dependency injection?" }
  ],
  temperature: 0.2
};`,
    takeaway: 'Give the model the facts and constraints it needs. Treat its answer as a draft to inspect, especially for security, legal, financial, or production decisions.',
    quizQuestion: 'What does an LLM directly predict during generation?', quizOptions: ['A complete verified answer', 'The next token', 'A database row', 'The user’s intention'], quizAnswer: 1,
    quizExplanation: 'The model repeatedly predicts a likely next token from the current context.',
  }),
  createLesson({
    id: 'prompting-basics', title: 'Prompting Basics', category: 'LLM', tags: ['llm', 'prompting'], minutes: 9,
    description: 'Write clear instructions and improve model output step by step.',
    overview: 'A useful prompt explains the task, provides relevant context, sets boundaries, and describes the desired output. Clear prompts reduce guesswork. Examples are especially effective when format or tone matters, while an explicit success criterion makes the response easier to evaluate.',
    diagramTitle: 'A dependable prompt structure',
    diagramSteps: [
      { label: 'Task', detail: 'State the action in one clear sentence' },
      { label: 'Context', detail: 'Supply facts the model should use' },
      { label: 'Constraints', detail: 'Set scope, audience, and limits' },
      { label: 'Format', detail: 'Describe the expected shape of the answer' },
    ],
    concepts: ['Put the most important instruction where it is easy to find.', 'Separate source material from instructions with clear delimiters.', 'Ask for evidence or uncertainty when accuracy matters.', 'Iterate by changing one unclear part of the prompt at a time.'],
    exampleIntro: 'This prompt gives the model a role, concrete input, constraints, and an output format.',
    language: 'text', filename: 'prompt.txt',
    example: `Task: Review the C# method below for correctness.

Context:
---
public decimal Divide(decimal a, decimal b) => a / b;
---

Constraints:
- Write for a junior developer.
- Identify only real issues.
- Keep the answer under 150 words.

Output: A short explanation followed by a corrected code block.`,
    takeaway: 'Prompting works best as specification writing: say what success looks like, include the necessary evidence, and remove ambiguous instructions.',
    quizQuestion: 'Which prompt addition most directly controls the shape of an answer?', quizOptions: ['A higher temperature', 'An output format', 'A longer model name', 'More unrelated context'], quizAnswer: 1,
    quizExplanation: 'An explicit output format tells the model how to organize the result.',
  }),
  createLesson({
    id: 'embeddings-rag', title: 'Embeddings & RAG', category: 'LLM', tags: ['llm', 'embeddings', 'rag'], minutes: 12,
    description: 'Understand semantic search and grounding models with your own data.',
    overview: 'An embedding represents meaning as a list of numbers. Similar ideas tend to produce nearby vectors, which makes semantic search possible. Retrieval-augmented generation (RAG) searches a trusted document collection first, then places the most relevant passages into the model context before asking for an answer.',
    diagramTitle: 'Retrieval-augmented generation',
    diagramSteps: [
      { label: 'Question', detail: 'The user asks about your information' },
      { label: 'Retrieve', detail: 'Embedding search finds relevant chunks' },
      { label: 'Augment', detail: 'Passages are added to the prompt' },
      { label: 'Generate', detail: 'The model answers from supplied context' },
    ],
    diagramCaption: 'RAG supplies current or private knowledge without retraining the model.',
    concepts: ['Split documents into useful, overlapping chunks before embedding them.', 'Similarity finds related text, but filters can narrow results by source or date.', 'Retrieved text must be treated as untrusted data, not executable instructions.', 'Citations let users inspect whether the answer is supported.'],
    exampleIntro: 'A RAG pipeline can stay small: embed the question, retrieve passages, and construct a grounded prompt.',
    language: 'javascript', filename: 'rag-pipeline.js',
    example: `const queryVector = await embed(question);
const passages = await vectorStore.search(queryVector, { limit: 4 });

const prompt = \`Answer only from the context below.
If the answer is missing, say you do not know.

Context:
\${passages.map(p => p.text).join("\n---\n")}

Question: \${question}\`;

const answer = await generate(prompt);`,
    takeaway: 'Good RAG quality depends more on clean source data, sensible chunking, retrieval evaluation, and citations than on a complicated prompt.',
    quizQuestion: 'Why does a RAG system retrieve passages before generation?', quizOptions: ['To increase screen brightness', 'To ground the answer in relevant sources', 'To retrain the model each time', 'To remove all tokens'], quizAnswer: 1,
    quizExplanation: 'Retrieved passages provide relevant evidence inside the model’s current context.',
  }),
]
