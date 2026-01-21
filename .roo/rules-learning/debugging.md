# Effective Debugging Strategies

Debugging is a core developer skill. This guide teaches systematic approaches to finding and fixing bugs.

## The Debugging Mindset

### Before You Start

- **Stay calm** - Bugs happen to everyone
- **Reproduce the bug** - Can you make it happen consistently?
- **Understand the goal** - What should the code do?
- **Gather information** - Error messages, logs, steps to reproduce

## Systematic Debugging Process

### Step 1: Isolate the Problem

```typescript
// BAD: "Something is broken somewhere"
// GOOD: "The login function fails when the password is over 20 characters"
```

**Questions to ask:**

- When does it happen? (特定条件)
- Where does it happen? (具体位置)
- What changed recently? (最近变更)
- Does it happen in other environments? (环境问题)

### Step 2: Form a Hypothesis

Based on your observations, form a testable hypothesis:

```typescript
// Hypothesis: "The password validation regex rejects passwords over 20 chars"
// Test: Try a 21-character password and observe behavior
```

### Step 3: Add Diagnostic Information

```typescript
// Add logging to understand what's happening
console.log("Input:", password)
console.log("Regex test:", regex.test(password))
console.log("Password length:", password.length)
```

### Step 4: Test Your Hypothesis

- Make one change at a time
- Document each test and result
- Use version control to track changes

### Step 5: Identify the Root Cause

Keep asking "why" until you find the fundamental issue:

```
Why does it fail? → The regex rejects long passwords
Why? → The regex has a length limit
Why? → It was copied from an old validation library
```

## Common Debugging Techniques

### 1. Binary Search

Divide and conquer to find bugs in large files:

1. Comment out half the code
2. Does the bug still occur?
3. Repeat in the remaining half

### 2. Rubber Duck Debugging

Explain the code line-by-line to someone (or something):

- Forces you to slow down
- Often reveals hidden assumptions
- Can be done with a literal rubber duck 🦆

### 3. Step-by-Step Execution

Use a debugger to:

- Set breakpoints
- Inspect variables
- Watch expressions
- Trace execution flow

### 4. Log Analysis

Read logs carefully:

- Check timestamps
- Look for patterns
- Note error codes
- Trace request IDs

### 5. Comparison

Compare working vs. broken:

- Different inputs
- Different environments
- Different versions
- Different configurations

## Tools at Your Disposal

| Tool             | Use Case                  |
| ---------------- | ------------------------- |
| Console.log      | Quick variable inspection |
| Debugger         | Step-by-step execution    |
| Browser DevTools | Frontend debugging        |
| Node Inspector   | Node.js debugging         |
| Log files        | Production issues         |
| Error tracking   | Automated bug detection   |

## The Scientific Method for Bugs

```
1. Observe     → What happens?
2. Hypothesis  → Why does it happen?
3. Prediction  → If I'm right, X should occur
4. Test        → Run the test
5. Analyze     → Did X occur?
6. Conclude    → Confirm or reject hypothesis
```

## Prevention Tips

- Write tests before fixing bugs
- Add type checking (TypeScript)
- Use linting tools
- Code review before merging
- Document edge cases
- Create a bug log

## Debugging Exercise

**Bug Report:** "The calculateTotal function returns wrong values for orders over $100"

Using the debugging process:

1. How would you isolate this?
2. What hypotheses would you test?
3. What diagnostic code would you add?

---

_Tip: Learning Mode can guide you through debugging exercises!_
