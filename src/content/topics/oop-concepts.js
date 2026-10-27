import { text, heading, code, callout, diagram, list, quiz } from '../../utils/contentParser.js'

export const oopConcepts = {
  id: 'oop-concepts',
  title: 'OOP Concepts',
  description: 'Encapsulation, Inheritance, Polymorphism, and Abstraction in C#.',
  category: 'C#',
  tags: ['csharp', 'oop', 'class', 'inheritance', 'polymorphism'],
  date: '2026-08-02',
  estimatedReadTime: 15,
  sections: [
    heading(1, 'Object-Oriented Programming'),
    text('OOP is a programming paradigm based on the concept of "objects" that contain data and code. The four pillars of OOP are:'),
    diagram('The four OOP pillars', [
      { label: 'Encapsulation', detail: 'Protect state behind behavior' },
      { label: 'Abstraction', detail: 'Expose the essential contract' },
      { label: 'Inheritance', detail: 'Reuse a genuine is-a relationship' },
      { label: 'Polymorphism', detail: 'One contract, different behavior' },
    ], 'The pillars work together to keep object models understandable and changeable.'),
    list([
      'Encapsulation keeps state changes behind a clear public API.',
      'Abstraction exposes what a type does while hiding internal detail.',
      'Inheritance models a true is-a relationship and reuses a base contract.',
      'Polymorphism lets several implementations satisfy the same contract.',
    ]),

    heading(2, '1. Encapsulation'),
    text('Encapsulation is the bundling of data and methods that operate on that data within a single unit (class), and restricting direct access to some components.'),
    code('csharp', `public class BankAccount
{
    private decimal balance; // private field

    public decimal Balance   // public property
    {
        get { return balance; }
        private set { balance = value; }
    }

    public void Deposit(decimal amount)
    {
        if (amount > 0)
            balance += amount;
    }
}`, 'Encapsulation.cs'),

    heading(2, '2. Inheritance'),
    text('Inheritance allows a class to inherit properties and methods from another class.'),
    code('csharp', `public class Animal
{
    public string Name { get; set; }
    public void Speak() => Console.WriteLine("Some sound");
}

public class Dog : Animal
{
    public void Speak() => Console.WriteLine("Woof!");
}`, 'Inheritance.cs'),

    callout('C# does not support multiple inheritance of classes. Use interfaces to achieve similar functionality.', 'warning'),

    heading(2, '3. Polymorphism'),
    text('Polymorphism allows methods to do different things based on the object it is acting upon.'),

    heading(2, '4. Abstraction'),
    text('Abstraction hides complex implementation details and shows only the essential features.'),

    quiz(
      'Which OOP pillar is demonstrated by making fields private and exposing public properties?',
      ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'],
      2,
      'Encapsulation is about hiding internal state and requiring all interaction to be performed through an objects methods.'
    )
  ]
}
