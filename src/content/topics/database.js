import { createLesson } from '../topicFactory.js'

export const databaseTopics = [
  createLesson({
    id: 'sql-basics', title: 'SQL Basics', category: 'Database & SQL', tags: ['sql', 'database', 'basics'], minutes: 11,
    description: 'Select, filter, sort, and combine relational data.',
    overview: 'SQL is a declarative language for relational data. You describe the result you want, and the database optimizer chooses an execution plan. A SELECT query identifies columns, reads from a source, filters rows, groups when needed, sorts the result, and optionally limits how much data is returned.',
    diagramTitle: 'Logical query processing',
    diagramSteps: [{ label: 'FROM', detail: 'Choose and join row sources' }, { label: 'WHERE', detail: 'Filter individual rows' }, { label: 'SELECT', detail: 'Project the output columns' }, { label: 'ORDER BY', detail: 'Sort the final result' }],
    concepts: ['Select only the columns the caller needs instead of using SELECT *.', 'Use parameters for values to prevent SQL injection and improve plan reuse.', 'NULL means unknown or missing; compare it with IS NULL, not = NULL.', 'Without ORDER BY, row order is not guaranteed.'],
    exampleIntro: 'This parameterized query returns recent active products in a deterministic order.',
    language: 'sql', filename: 'active-products.sql',
    example: `SELECT id, name, price
FROM products
WHERE is_active = TRUE
  AND price >= @minimum_price
ORDER BY price DESC, id ASC
LIMIT 20;`,
    takeaway: 'Write queries around the exact result shape you need. Parameterize external values and inspect the execution plan when performance matters.',
    quizQuestion: 'Which clause guarantees the order of returned rows?', quizOptions: ['FROM', 'WHERE', 'ORDER BY', 'SELECT'], quizAnswer: 2,
    quizExplanation: 'A table has no guaranteed presentation order; ORDER BY defines one for the result.',
  }),
  createLesson({
    id: 'database-design', title: 'Relational Database Design', category: 'Database & SQL', tags: ['sql', 'schema', 'database'], minutes: 12,
    description: 'Design tables, relationships, keys, and useful constraints.',
    overview: 'Relational design stores facts in tables and connects them with keys. A primary key identifies a row; a foreign key requires a related row to exist. Constraints keep invalid data out at the database boundary, while normalization reduces duplicated facts that can drift out of sync.',
    diagramTitle: 'A one-to-many relationship',
    diagramSteps: [{ label: 'Customer', detail: 'Primary key: customer_id' }, { label: 'Foreign key', detail: 'orders.customer_id' }, { label: 'Orders', detail: 'Many rows can reference one customer' }, { label: 'Order items', detail: 'Each order owns many line items' }],
    concepts: ['Use stable, narrow primary keys and enforce natural uniqueness separately.', 'Foreign keys protect relationships from orphaned references.', 'NOT NULL, CHECK, and UNIQUE constraints encode important invariants.', 'Indexes improve reads but add storage and write cost, so create them from query needs.'],
    exampleIntro: 'The schema places customer facts once and uses constraints to protect order relationships.',
    language: 'sql', filename: 'orders-schema.sql',
    example: `CREATE TABLE orders (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id  BIGINT NOT NULL REFERENCES customers(id),
  status       VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'paid', 'shipped')),
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ix_orders_customer_created
  ON orders (customer_id, created_at DESC);`,
    takeaway: 'Put rules that must always hold into database constraints. Application validation improves messages, while constraints protect data across every writer.',
    quizQuestion: 'What does a foreign key protect?', quizOptions: ['Font size', 'Referential integrity between tables', 'JavaScript state', 'HTTP routing'], quizAnswer: 1,
    quizExplanation: 'A foreign key prevents references to related rows that do not exist.',
  }),
  createLesson({
    id: 'sql-joins', title: 'SQL Joins', category: 'Database & SQL', tags: ['sql', 'joins'], minutes: 10,
    description: 'Combine related rows using inner and outer joins.',
    overview: 'A join combines rows from two sources using a relationship. INNER JOIN returns only matching pairs. LEFT JOIN keeps every row from the left source and fills right-side columns with NULL when no match exists. The join condition is part of correctness, so connect tables by their actual keys.',
    diagramTitle: 'How join types differ',
    diagramSteps: [{ label: 'Left table', detail: 'The starting set of rows' }, { label: 'ON condition', detail: 'Defines matching keys' }, { label: 'INNER', detail: 'Keep matches only' }, { label: 'LEFT', detail: 'Keep all left rows plus matches' }],
    concepts: ['An INNER JOIN removes rows without a match.', 'A LEFT JOIN is useful when missing related data still matters.', 'Filtering right-table columns in WHERE can accidentally turn a LEFT JOIN into an inner join.', 'One-to-many joins repeat the parent values for each matching child.'],
    exampleIntro: 'The LEFT JOIN keeps customers with no orders, while COUNT ignores NULL order identifiers.',
    language: 'sql', filename: 'customer-orders.sql',
    example: `SELECT
  c.id,
  c.name,
  COUNT(o.id) AS order_count
FROM customers AS c
LEFT JOIN orders AS o
  ON o.customer_id = c.id
GROUP BY c.id, c.name
ORDER BY order_count DESC;`,
    takeaway: 'Start by stating which rows must remain even when a relationship is missing. That answer usually tells you whether to use INNER or LEFT JOIN.',
    quizQuestion: 'Which join keeps every row from the left table?', quizOptions: ['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN only', 'No join can'], quizAnswer: 1,
    quizExplanation: 'LEFT JOIN preserves all left rows and uses NULL for unmatched right-side columns.',
  }),
]
