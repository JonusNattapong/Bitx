# Learning by Reading Code

Reading existing code is one of the most effective ways to improve as a developer. This guide will teach you how to read code effectively.

## Why Reading Code Matters

- **Learn patterns** used by experienced developers
- **Understand frameworks** and libraries you use
- **Improve debugging** skills by understanding execution flow
- **Learn coding styles** and best practices
- **Build intuition** for how systems work

## The CODE Strategy

Use this framework when reading unfamiliar code:

### C - Context

First, understand the big picture:

- What does this file/module do?
- What problem does it solve?
- Where does it fit in the overall system?
- What dependencies does it have?

```typescript
// Start by reading:
// 1. File header comments
// 2. Class/function docstrings
// 3. Export statements
// 4. Import statements
```

### O - Outline

Get a bird's eye view of the structure:

- What are the main functions/classes?
- How are they organized?
- What's the control flow?
- What are the key data structures?

```typescript
// Then look at:
// 1. Function signatures
// 2. Class hierarchy
// 3. Variable declarations
// 4. Control structures (loops, conditionals)
```

### D - Dive In

Now read the actual implementation:

- Follow the execution flow
- Track variable values
- Understand edge cases
- Note any magic numbers or strings

```typescript
// As you dive in:
// 1. Add comments to explain what you find
// 2. Draw diagrams of the flow
// 3. Write test cases to verify understanding
// 4. Look up unfamiliar APIs or patterns
```

### E - Evaluate

Finally, critically assess the code:

- Is this code following best practices?
- Could it be improved?
- What would you do differently?
- What can you learn from it?

## Tips for Effective Code Reading

### 1. Use Tools

- IDE features (go to definition, find references)
- Debuggers to step through execution
- Static analysis tools
- Documentation generators

### 2. Take Notes

- Write summaries of what you learned
- Document unfamiliar patterns
- Create vocabulary lists
- Sketch architecture diagrams

### 3. Experiment

- Modify code and see what happens
- Add logging to understand flow
- Write tests to verify behavior
- Refactor to confirm understanding

### 4. Ask Questions

- What problem does this solve?
- Why was it implemented this way?
- What are the trade-offs?
- How could this be improved?

## Common Patterns to Look For

| Pattern   | Purpose         | Example                |
| --------- | --------------- | ---------------------- |
| Factory   | Create objects  | `createUser()`         |
| Observer  | Notify changes  | Event listeners        |
| Strategy  | Swap algorithms | Different sort methods |
| Decorator | Add behavior    | Middleware             |
| Singleton | One instance    | Global state           |

## Practice Exercise

Try reading this code using the CODE strategy:

```typescript
function fibonacci(n: number): number {
	if (n <= 1) return n
	return fibonacci(n - 1) + fibonacci(n - 2)
}
```

**Questions to answer:**

1. What does this function do? (Context)
2. What is its structure? (Outline)
3. How does it work step by step? (Dive In)
4. What are its limitations? (Evaluate)

---

_Pro tip: Use Learning Mode to walk through this exercise with you!_
