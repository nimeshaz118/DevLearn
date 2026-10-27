import { createLesson } from '../topicFactory.js'

export const errorTopics = [
  createLesson({
    id: 'exceptions-csharp', title: 'Exceptions in C#', category: 'Error & Exception Handling', tags: ['csharp', 'exceptions'], minutes: 10,
    description: 'Throw, catch, and handle exceptions without hiding failures.',
    overview: 'Exceptions represent failures that interrupt normal execution. Throw when the current operation cannot fulfill its contract, and catch only where you can recover, add useful context, or translate the failure at a boundary. Expected business outcomes often deserve result types rather than exceptions.',
    diagramTitle: 'Exception propagation',
    diagramSteps: [{ label: 'Operation', detail: 'Detects an unrecoverable problem' }, { label: 'Throw', detail: 'Creates a typed failure' }, { label: 'Unwind', detail: 'Moves up the call stack' }, { label: 'Boundary', detail: 'Recover, log, or translate once' }],
    concepts: ['Catch specific exceptions before general ones.', 'Use throw; to preserve the original stack trace when rethrowing.', 'Do not catch an exception merely to ignore it.', 'Dispose resources with using or finally even when an operation fails.'],
    exampleIntro: 'This boundary translates a specific infrastructure failure while preserving its original cause.',
    language: 'csharp', filename: 'InvoiceService.cs',
    example: `public async Task<Invoice> LoadAsync(int id)
{
    try
    {
        return await repository.GetRequiredAsync(id);
    }
    catch (SqlException exception)
    {
        throw new InvoiceUnavailableException(id, exception);
    }
}`,
    takeaway: 'Exceptions should carry useful context and remain observable. Avoid logging the same exception at every layer; log once where the request or job is handled.',
    quizQuestion: 'Which rethrow keeps the original stack trace?', quizOptions: ['throw;', 'throw exception;', 'return exception;', 'catch all;'], quizAnswer: 0,
    quizExplanation: 'A bare throw preserves the original exception stack; throw exception resets part of it.',
  }),
  createLesson({
    id: 'global-error-handling', title: 'Global API Error Handling', category: 'Error & Exception Handling', tags: ['aspnet', 'errors', 'api'], minutes: 11,
    description: 'Create consistent error responses from one central pipeline.',
    overview: 'A global error handler is the final boundary around an HTTP request. It catches unhandled exceptions, records diagnostic context, and returns a safe, consistent response. Known exception types can map to status codes, while unexpected failures return a generic 500 response without exposing internal details.',
    diagramTitle: 'Central error boundary',
    diagramSteps: [{ label: 'Request', detail: 'Enters the API pipeline' }, { label: 'Endpoint', detail: 'May complete or throw' }, { label: 'Exception handler', detail: 'Maps and logs the failure' }, { label: 'Problem details', detail: 'Returns a stable client contract' }],
    concepts: ['Use RFC 9457 problem details for a standard error shape.', 'Give each failure a trace identifier for support and diagnostics.', 'Map validation and not-found outcomes intentionally.', 'Never send stack traces, connection strings, or secret values to clients.'],
    exampleIntro: 'ASP.NET Core can register one exception handler and produce problem details across the API.',
    language: 'csharp', filename: 'Program.cs',
    example: `builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<ApiExceptionHandler>();

var app = builder.Build();
app.UseExceptionHandler();

// ApiExceptionHandler maps known exception types to status codes
// and returns a ProblemDetails response with the request trace id.`,
    takeaway: 'Central handling makes errors consistent, but it does not replace validation or explicit application results. Handle expected outcomes before they become exceptions.',
    quizQuestion: 'What should an unexpected production error response contain?', quizOptions: ['The full stack trace', 'Database credentials', 'A safe message and trace identifier', 'The server file path'], quizAnswer: 2,
    quizExplanation: 'A trace identifier supports diagnosis without disclosing sensitive implementation details.',
  }),
  createLesson({
    id: 'logging-basics', title: 'Logging Basics', category: 'Error & Exception Handling', tags: ['logging', 'debugging'], minutes: 9,
    description: 'Capture useful diagnostic information without adding noise.',
    overview: 'Logs are timestamped events that explain what a running system did. Structured logging stores named properties alongside a message template, making events searchable without parsing sentences. Useful logs describe boundaries, significant decisions, failures, and durations while avoiding secrets and excessive repetition.',
    diagramTitle: 'From event to insight',
    diagramSteps: [{ label: 'Application event', detail: 'A meaningful action or failure' }, { label: 'Structured log', detail: 'Template plus named properties' }, { label: 'Collector', detail: 'Centralizes events from instances' }, { label: 'Search & alert', detail: 'Find patterns and detect problems' }],
    concepts: ['Debug is detailed development data; Information records normal milestones.', 'Warning is an unusual recoverable condition; Error means an operation failed.', 'Use message templates instead of string interpolation for searchable properties.', 'Never log passwords, tokens, private keys, or unnecessary personal data.'],
    exampleIntro: 'The template remains stable while order and duration become queryable fields.',
    language: 'csharp', filename: 'OrderProcessor.cs',
    example: `logger.LogInformation(
    "Processed order {OrderId} for customer {CustomerId} in {ElapsedMs} ms",
    order.Id,
    order.CustomerId,
    stopwatch.ElapsedMilliseconds);

// Avoid: logger.LogInformation($"Processed {order.Id}");`,
    takeaway: 'A log should help answer a future operational question. Prefer a few meaningful, structured events over a stream of messages that no one can use.',
    quizQuestion: 'Why use message templates with named properties?', quizOptions: ['To make logs unsearchable', 'To preserve structured fields for filtering', 'To hide all events', 'To replace exception handling'], quizAnswer: 1,
    quizExplanation: 'Collectors can index named properties such as OrderId and query them directly.',
  }),
]
