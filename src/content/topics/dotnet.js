import { createLesson } from '../topicFactory.js'

export const dotnetTopics = [
  createLesson({
    id: 'aspnet-core', title: 'ASP.NET Core', category: 'C# & .NET', tags: ['csharp', 'aspnet', 'api'], minutes: 12,
    description: 'Build modern web APIs with the ASP.NET Core request pipeline.',
    overview: 'ASP.NET Core is a cross-platform framework for web applications and APIs. Each HTTP request travels through an ordered middleware pipeline before reaching an endpoint. Services are registered in the application container, configuration is composed from providers, and endpoints can use controllers or minimal APIs.',
    diagramTitle: 'The request pipeline',
    diagramSteps: [{ label: 'Client', detail: 'Sends an HTTP request' }, { label: 'Middleware', detail: 'Logging, errors, auth, routing' }, { label: 'Endpoint', detail: 'Runs application logic' }, { label: 'Response', detail: 'Returns status, headers, and body' }],
    concepts: ['Middleware order matters because each component wraps the next one.', 'Use dependency injection for application services and infrastructure.', 'Bind settings through configuration rather than hard-coding values.', 'Return appropriate HTTP status codes and structured response bodies.'],
    exampleIntro: 'A minimal API can register a service and map a focused endpoint with very little ceremony.',
    language: 'csharp', filename: 'Program.cs',
    example: `var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IProductService, ProductService>();

var app = builder.Build();
app.UseHttpsRedirection();

app.MapGet("/products/{id:int}", async (int id, IProductService service) =>
    await service.FindAsync(id) is { } product
        ? Results.Ok(product)
        : Results.NotFound());

app.Run();`,
    takeaway: 'Keep endpoints thin: validate the request, call an application service, then translate the result into an HTTP response.',
    quizQuestion: 'Why does middleware order matter?', quizOptions: ['Files are alphabetized', 'Each middleware wraps the components after it', 'C# requires it for compilation', 'It changes the database schema'], quizAnswer: 1,
    quizExplanation: 'A request flows through middleware in registration order and unwinds in reverse for the response.',
  }),
  createLesson({
    id: 'ef-core', title: 'Entity Framework Core', category: 'C# & .NET', tags: ['csharp', 'ef-core', 'database'], minutes: 12,
    description: 'Work with databases using entities, DbContext, and migrations.',
    overview: 'Entity Framework Core is an object-relational mapper. It translates LINQ queries into database commands, maps rows to .NET objects, and tracks changes so they can be persisted. A DbContext represents a short unit of work and exposes entity collections through DbSet properties.',
    diagramTitle: 'EF Core data flow',
    diagramSteps: [{ label: 'LINQ', detail: 'Compose a typed query' }, { label: 'EF Core', detail: 'Translate the expression tree' }, { label: 'Database', detail: 'Execute SQL near the data' }, { label: 'Entities', detail: 'Materialize the result' }],
    concepts: ['Use one short-lived DbContext per request or unit of work.', 'Call AsNoTracking for read-only queries to reduce tracking overhead.', 'Project only the columns a response needs with Select.', 'Migrations record intentional schema changes; review generated SQL before production.'],
    exampleIntro: 'This query filters and projects in the database, then materializes only the required DTOs.',
    language: 'csharp', filename: 'ProductService.cs',
    example: `public async Task<IReadOnlyList<ProductSummary>> GetActiveAsync()
{
    return await db.Products
        .AsNoTracking()
        .Where(product => product.IsActive)
        .OrderBy(product => product.Name)
        .Select(product => new ProductSummary(product.Id, product.Name, product.Price))
        .ToListAsync();
}`,
    takeaway: 'LINQ is still a database query until it is materialized. Inspect generated SQL and avoid loading full tables into memory before filtering.',
    quizQuestion: 'When is AsNoTracking most useful?', quizOptions: ['For read-only queries', 'Before every SaveChanges', 'Only for migrations', 'To create a primary key'], quizAnswer: 0,
    quizExplanation: 'Read-only results do not need change tracking, so AsNoTracking can reduce work and memory usage.',
  }),
  createLesson({
    id: 'dependency-injection', title: 'Dependency Injection', category: 'C# & .NET', tags: ['csharp', 'di', 'architecture'], minutes: 11,
    description: 'Keep application code modular, testable, and loosely coupled.',
    overview: 'Dependency injection gives an object its collaborators from the outside instead of letting it construct them. Classes depend on small contracts, while the application composition root chooses concrete implementations. This makes responsibilities clearer and allows tests to replace external systems with controlled alternatives.',
    diagramTitle: 'Constructor injection',
    diagramSteps: [{ label: 'Registration', detail: 'Map interface to implementation' }, { label: 'Container', detail: 'Build the object graph' }, { label: 'Constructor', detail: 'Receive required services' }, { label: 'Class', detail: 'Focus on its own behavior' }],
    concepts: ['Constructor parameters make required dependencies explicit.', 'Transient creates each time, scoped once per request, and singleton once per app.', 'A singleton must not capture a scoped service.', 'Avoid service locator calls inside business classes because they hide dependencies.'],
    exampleIntro: 'The order service describes what it needs; the startup code decides how those needs are fulfilled.',
    language: 'csharp', filename: 'DependencyInjection.cs',
    example: `builder.Services.AddScoped<IOrderRepository, EfOrderRepository>();
builder.Services.AddScoped<OrderService>();

public sealed class OrderService(IOrderRepository orders)
{
    public async Task<Order?> FindAsync(int id) =>
        await orders.FindAsync(id);
}`,
    takeaway: 'Choose lifetimes from ownership: scoped for request work, transient for lightweight independent behavior, and singleton only for thread-safe shared state.',
    quizQuestion: 'Which lifetime normally creates one instance per web request?', quizOptions: ['Transient', 'Scoped', 'Singleton', 'Static'], quizAnswer: 1,
    quizExplanation: 'ASP.NET Core creates one scoped instance within each request scope.',
  }),
  createLesson({
    id: 'generic-repositories', title: 'Generic Repositories', category: 'C# & .NET', tags: ['csharp', 'repository', 'ef-core'], minutes: 10,
    description: 'Explore reusable data access patterns and their trade-offs.',
    overview: 'A repository can isolate domain code from persistence details. A generic repository shares basic operations across entity types, but it can become too broad or merely copy DbSet. Use it when the abstraction expresses application needs; prefer focused query or repository interfaces when entities need different operations.',
    diagramTitle: 'Repository boundary',
    diagramSteps: [{ label: 'Application', detail: 'Requests domain-oriented data' }, { label: 'Repository contract', detail: 'Defines useful operations' }, { label: 'EF implementation', detail: 'Builds efficient queries' }, { label: 'Database', detail: 'Stores persistent state' }],
    concepts: ['Expose meaningful operations rather than every possible query.', 'Keep IQueryable inside the persistence boundary when possible.', 'A unit of work coordinates related changes and one final commit.', 'EF Core already implements repository and unit-of-work ideas, so extra layers need a clear benefit.'],
    exampleIntro: 'A small generic base can cover simple commands while a focused interface adds domain-specific queries.',
    language: 'csharp', filename: 'Repository.cs',
    example: `public interface IRepository<T> where T : class
{
    Task<T?> FindAsync(int id);
    void Add(T entity);
    void Remove(T entity);
}

public interface IOrderRepository : IRepository<Order>
{
    Task<IReadOnlyList<Order>> GetOpenForCustomerAsync(int customerId);
}`,
    takeaway: 'Add a repository when it protects a useful boundary. If it only renames Add, Find, and Remove, use DbContext directly in the application layer.',
    quizQuestion: 'What is a common risk of an overly generic repository?', quizOptions: ['It can hide useful query needs behind a weak abstraction', 'It makes C# untyped', 'It removes the database', 'It forces singleton lifetime'], quizAnswer: 0,
    quizExplanation: 'One generic contract often cannot express efficient, domain-specific queries.',
  }),
  createLesson({
    id: 'swagger-openapi', title: 'Swagger & OpenAPI', category: 'C# & .NET', tags: ['api', 'swagger', 'openapi'], minutes: 8,
    description: 'Document and explore APIs with an interactive interface.',
    overview: 'OpenAPI is a machine-readable description of an HTTP API. Swagger tools can generate, display, and test that description. A good contract documents routes, parameters, request bodies, responses, authentication, and schemas so people and tools can understand the API consistently.',
    diagramTitle: 'One contract, many uses',
    diagramSteps: [{ label: 'API metadata', detail: 'Routes, types, responses, auth' }, { label: 'OpenAPI document', detail: 'Portable JSON description' }, { label: 'Swagger UI', detail: 'Interactive documentation' }, { label: 'Clients & tests', detail: 'Generate code and validate contracts' }],
    concepts: ['OpenAPI is the specification; Swagger is a family of tools around it.', 'Document error responses as carefully as success responses.', 'Do not expose Swagger UI publicly without considering the security model.', 'Generated client quality depends on accurate schemas and operation metadata.'],
    exampleIntro: 'ASP.NET Core can discover endpoints, generate the document, and expose an interactive UI in development.',
    language: 'csharp', filename: 'Program.cs',
    example: `builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}`,
    takeaway: 'Treat the OpenAPI document as a public contract. Keep response models explicit and review contract changes just like code changes.',
    quizQuestion: 'What is OpenAPI?', quizOptions: ['A database engine', 'An API description specification', 'A C# compiler', 'An authentication token'], quizAnswer: 1,
    quizExplanation: 'OpenAPI defines a standard document format for describing HTTP APIs.',
  }),
  createLesson({
    id: 'iactionresult', title: 'IActionResult', category: 'C# & .NET', tags: ['aspnet', 'api', 'http'], minutes: 9,
    description: 'Return clear, consistent HTTP responses from ASP.NET controllers.',
    overview: 'IActionResult represents an HTTP result produced by a controller action. Helpers such as Ok, CreatedAtAction, BadRequest, and NotFound map application outcomes to meaningful status codes and response bodies. ActionResult<T> is useful when a successful response has a known type but failure paths return other results.',
    diagramTitle: 'Outcome to HTTP response',
    diagramSteps: [{ label: 'Request', detail: 'Route and model binding' }, { label: 'Application result', detail: 'Found, invalid, created, failed' }, { label: 'Action result', detail: 'Choose status and body' }, { label: 'Client', detail: 'Handles a predictable contract' }],
    concepts: ['200 OK returns a successful representation.', '201 Created should identify the new resource location.', '400 Bad Request reports invalid client input; 404 means the resource is absent.', 'Avoid returning 200 with an error object because it breaks HTTP semantics.'],
    exampleIntro: 'ActionResult<T> documents the successful type while keeping clear branches for other outcomes.',
    language: 'csharp', filename: 'ProductsController.cs',
    example: `[HttpGet("{id:int}")]
public async Task<ActionResult<ProductDto>> Get(int id)
{
    var product = await service.FindAsync(id);
    return product is null
        ? NotFound(new { message = "Product was not found." })
        : Ok(product);
}`,
    takeaway: 'Translate known application outcomes deliberately. Reserve exceptions for unexpected failures and handle them in one global error boundary.',
    quizQuestion: 'Which status best represents a successfully created resource?', quizOptions: ['200 only', '201 Created', '400 Bad Request', '404 Not Found'], quizAnswer: 1,
    quizExplanation: '201 Created communicates creation and can include the resource location.',
  }),
]
