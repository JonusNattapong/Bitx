# Programming Best Practices

This guide covers fundamental best practices that will make you a better developer.

## Code Organization

### Keep Functions Small and Focused

```typescript
// BAD: One function does everything
function processUserData(input) {
	validate(input)
	transform(input)
	save(input)
	notify(input)
	log(input)
}

// GOOD: Each function does one thing
function processUser(input) {
	validateUser(input)
	saveUser(input)
	notifyUser(input)
}

function validateUser(input) {
	// validation logic
}
```

### Meaningful Names

```typescript
// BAD: Cryptic names
const d = 10
const list = []

// GOOD: Descriptive names
const maxRetries = 10
const userList = []
```

**Naming Rules:**

- Variables: `nouns` (user, products, order)
- Functions: `verbs` (getUser, calculateTotal)
- Constants: `SCREAMING_CASE` (MAX_RETRIES)
- Classes: `PascalCase` (UserService)

### Single Responsibility Principle

Each module/class/function should have one reason to change:

```typescript
// BAD: Handles both user data AND notifications
class UserManager {
	saveUser(user) {
		/* save logic */
	}
	sendEmail(user) {
		/* email logic */
	}
}

// GOOD: Separate concerns
class UserRepository {
	saveUser(user) {
		/* save logic */
	}
}

class UserNotifier {
	sendEmail(user) {
		/* email logic */
	}
}
```

## Writing Clean Code

### Comments

Use comments to explain "why", not "what":

```typescript
// BAD: Redundant comments
const PI = 3.14159 // PI is 3.14159

// GOOD: Explains why
// Using locale-specific format to match legacy system
const localeFormat = "de-DE"
```

### Code Layout

```typescript
// Consistent spacing
const sum = (a, b) => a + b

// Meaningful blank lines
function createUser() {
	const user = new User()

	user.name = name
	user.email = email

	return user.save()
}
```

### Avoid Magic Numbers

```typescript
// BAD: Unclear meaning
if (status === 2) { ... }

// GOOD: Named constant
const STATUS_APPROVED = 2;
if (status === STATUS_APPROVED) { ... }
```

## Error Handling

### Use Try-Catch Appropriately

```typescript
// Wrap only what can fail
async function fetchUser(id) {
	try {
		const response = await api.getUser(id)
		return response.data
	} catch (error) {
		logger.error("Failed to fetch user", { id, error })
		throw new UserNotFoundError(id)
	}
}
```

### Create Meaningful Errors

```typescript
class ValidationError extends Error {
	constructor(message, field) {
		super(message)
		this.name = "ValidationError"
		this.field = field
	}
}
```

## Testing

### Write Testable Code

```typescript
// Testable: Dependencies are injected
class UserService {
	constructor(userRepository, emailService) {
		this.userRepository = userRepository
		this.emailService = emailService
	}

	async createUser(userData) {
		const user = await this.userRepository.create(userData)
		await this.emailService.sendWelcome(user)
		return user
	}
}
```

### Test Pyramid

```
        /\
       /  \     Few E2E tests
      /____\
     /      \   More Integration tests
    /________\
   /          \ Many Unit tests
  /____________\
```

## Git Best Practices

### Commit Messages

```
feat: Add user registration with email validation

- Validate email format before saving
- Send confirmation email after registration
- Add unit tests for UserValidator

Fixes #123
```

### Branch Naming

- `feature/user-registration`
- `bugfix/login-error`
- `docs/readme-update`

## Code Review Checklist

- [ ] Does the code do what it's supposed to?
- [ ] Is the code readable and maintainable?
- [ ] Are there adequate tests?
- [ ] Are there any security concerns?
- [ ] Is the documentation updated?
- [ ] Are there any performance issues?

---

_Want to learn more about a specific best practice? Ask Learning Mode!_
