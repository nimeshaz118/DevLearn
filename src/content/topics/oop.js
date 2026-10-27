import { createLesson } from '../topicFactory.js'

export const oopTopics = [
  createLesson({
    id: 'classes-objects', title: 'Classes & Objects', category: 'Object-Oriented Programming', tags: ['oop', 'classes', 'objects'], minutes: 9,
    description: 'Model data and behavior using classes and object instances.',
    overview: 'A class defines a type: the state it owns, the behavior it offers, and the rules that keep it valid. An object is one instance of that class. Good classes group behavior with the data it changes, expose a small public API, and prevent callers from placing the object in an invalid state.',
    diagramTitle: 'Class and instances',
    diagramSteps: [{ label: 'Class', detail: 'Defines fields, properties, and methods' }, { label: 'new', detail: 'Runs construction logic' }, { label: 'Object A', detail: 'Own identity and state' }, { label: 'Behavior', detail: 'Methods enforce the rules' }],
    concepts: ['Fields store internal data; properties control public access.', 'Methods should describe behavior, not only expose storage.', 'Private members hide implementation details that callers should not depend on.', 'Prefer valid objects over objects that require many setup calls.'],
    exampleIntro: 'The account owns its balance and changes it only through operations that protect its rules.',
    language: 'csharp', filename: 'BankAccount.cs',
    example: `public sealed class BankAccount
{
    public string Owner { get; }
    public decimal Balance { get; private set; }

    public BankAccount(string owner) => Owner = owner;

    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
        Balance += amount;
    }
}`,
    takeaway: 'Ask what the object is responsible for and which states are valid. Put those rules inside the class instead of repeating them in every caller.',
    quizQuestion: 'What is an object?', quizOptions: ['A class definition', 'An instance of a type with its own state', 'Only a database table', 'A namespace'], quizAnswer: 1,
    quizExplanation: 'A class defines the type, while each object is an instance with its own state.',
  }),
  createLesson({
    id: 'constructors', title: 'Constructors', category: 'Object-Oriented Programming', tags: ['oop', 'constructors'], minutes: 8,
    description: 'Initialize valid objects and understand constructor patterns.',
    overview: 'A constructor runs when an object is created. Its main job is to establish the object’s initial invariants: required values are present, dependencies are available, and the object is ready to use. Constructor overloads can offer convenient creation paths, but each path should lead to the same valid state.',
    diagramTitle: 'Safe object creation',
    diagramSteps: [{ label: 'Arguments', detail: 'Required values and dependencies' }, { label: 'Validate', detail: 'Reject missing or invalid input' }, { label: 'Initialize', detail: 'Assign complete internal state' }, { label: 'Valid object', detail: 'Ready for immediate use' }],
    concepts: ['Use constructor parameters for values that are always required.', 'Validate at the boundary and throw the most specific argument exception.', 'Chain overloads to one primary constructor to avoid duplicated setup.', 'Do not perform slow network or database work in a constructor.'],
    exampleIntro: 'This constructor makes invalid creation impossible and keeps the validation close to the state it protects.',
    language: 'csharp', filename: 'OrderLine.cs',
    example: `public sealed class OrderLine
{
    public string Sku { get; }
    public int Quantity { get; }

    public OrderLine(string sku, int quantity)
    {
        Sku = string.IsNullOrWhiteSpace(sku)
            ? throw new ArgumentException("SKU is required.", nameof(sku))
            : sku;
        Quantity = quantity > 0
            ? quantity
            : throw new ArgumentOutOfRangeException(nameof(quantity));
    }
}`,
    takeaway: 'A successful constructor should return a complete object. If creation can fail for expected business reasons, consider a factory that returns a result instead.',
    quizQuestion: 'What should be true immediately after a constructor succeeds?', quizOptions: ['The object is valid and usable', 'Every property is public', 'A database was queried', 'The object has no behavior'], quizAnswer: 0,
    quizExplanation: 'Construction should establish all required state and invariants.',
  }),
  createLesson({
    id: 'solid-principles', title: 'SOLID Principles', category: 'Object-Oriented Programming', tags: ['oop', 'solid', 'design'], minutes: 13,
    description: 'Use five practical principles to improve object-oriented design.',
    overview: 'SOLID is a set of design prompts for code that changes safely. The principles are not rules to apply mechanically. They help you notice classes with mixed reasons to change, extensions that require risky edits, inheritance that breaks expectations, oversized interfaces, and business code tied directly to infrastructure.',
    diagramTitle: 'SOLID at a glance',
    diagramSteps: [{ label: 'SRP', detail: 'One cohesive reason to change' }, { label: 'OCP & LSP', detail: 'Extend safely and preserve contracts' }, { label: 'ISP', detail: 'Small client-focused interfaces' }, { label: 'DIP', detail: 'Core policy depends on abstractions' }],
    concepts: ['SRP groups code that changes for the same reason.', 'OCP favors adding a new implementation over editing stable decision logic.', 'LSP requires subtypes to honor the promises of their base type.', 'ISP and DIP keep consumers dependent on the smallest useful contract.'],
    exampleIntro: 'Depending on a notification contract lets the checkout workflow stay stable when delivery channels change.',
    language: 'csharp', filename: 'CheckoutService.cs',
    example: `public interface IOrderNotifier
{
    Task SendConfirmationAsync(Order order);
}

public sealed class CheckoutService(IOrderNotifier notifier)
{
    public async Task CompleteAsync(Order order)
    {
        order.Complete();
        await notifier.SendConfirmationAsync(order);
    }
}`,
    takeaway: 'Use SOLID to explain a concrete source of coupling or change risk. More interfaces and layers are helpful only when they create a real boundary.',
    quizQuestion: 'Which principle asks high-level policy to depend on abstractions?', quizOptions: ['SRP', 'OCP', 'ISP', 'DIP'], quizAnswer: 3,
    quizExplanation: 'The Dependency Inversion Principle separates core policy from concrete infrastructure details.',
  }),
]
