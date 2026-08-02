import { text, heading, code, callout, list, quiz } from '../../utils/contentParser.js'

export const csharpBasics = {
  id: 'csharp-basics',
  title: 'C# Basics',
  description: 'Variables, data types, control flow, and basic syntax in C#.',
  category: 'C#',
  tags: ['csharp', 'basics', 'syntax', 'variables'],
  date: '2026-08-01',
  estimatedReadTime: 12,
  sections: [
    heading(1, 'C# Basics'),
    text('C# is a modern, object-oriented programming language developed by Microsoft. It is part of the .NET ecosystem and is widely used for building web, desktop, and mobile applications.'),

    heading(2, 'Variables and Data Types'),
    text('In C#, you declare a variable by specifying its type followed by its name.'),
    code('csharp', `// Variable declarations
string name = "John";
int age = 25;
double salary = 50000.50;
bool isActive = true;

// Implicit typing with var
var count = 10; // compiler infers int`, 'Variables.cs'),

    callout('Use `var` when the type is obvious from the right-hand side. It keeps code cleaner without losing type safety.', 'tip'),

    heading(2, 'Common Data Types'),
    list([
      '`int` — whole numbers (32-bit)',
      '`double` — floating-point numbers',
      '`string` — text/characters',
      '`bool` — true or false',
      '`DateTime` — dates and times',
      '`List<T>` — generic list of items'
    ]),

    heading(2, 'Control Flow'),
    text('C# provides standard control flow statements.'),
    code('csharp', `// If-else
if (age >= 18)
{
    Console.WriteLine("Adult");
}
else
{
    Console.WriteLine("Minor");
}

// For loop
for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);
}

// Foreach
var names = new[] { "Alice", "Bob", "Charlie" };
foreach (var n in names)
{
    Console.WriteLine(n);
}`, 'ControlFlow.cs'),

    quiz(
      'What is the output of `Console.WriteLine(5 / 2)` in C#?',
      ['2.5', '2', '2.0', 'Error'],
      1,
      'In C#, dividing two integers performs integer division. To get 2.5, at least one operand must be a double: `5.0 / 2`.'
    )
  ]
}
