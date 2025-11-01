# Testing & Quality Assurance Guide

## Overview

This project uses a comprehensive testing and quality setup to ensure code reliability and maintainability.

## Testing Stack

- **Vitest**: Fast unit and integration testing framework
- **React Testing Library**: Component testing utilities
- **TypeScript**: Strict type checking
- **Prettier**: Code formatting
- **ESLint**: Code linting
- **Husky**: Git hooks for pre-commit checks

## Running Tests

```bash
# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Writing Tests

### Component Tests

Component tests are located in `components/__tests__/` directory, mirroring the component structure.

Example:
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### Unit Tests

Utility functions and helpers should have corresponding test files in the same directory with `.test.ts` extension.

### Integration Tests

API routes and database operations should be tested in `app/api/**/__tests__/` directories.

## Code Quality

### TypeScript

TypeScript strict mode is enabled with additional flags:
- `noUnusedLocals`: Flags unused local variables
- `noUnusedParameters`: Flags unused parameters
- `noUncheckedIndexedAccess`: Requires explicit checks for array/object access
- `noImplicitReturns`: Ensures all code paths return a value

### Formatting

```bash
# Format all files
npm run format

# Check formatting without modifying files
npm run format:check
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Pre-commit Hooks

Husky is configured to run:
1. ESLint with auto-fix
2. Prettier formatting
3. Tests (optional, can be enabled)

To set up Husky (after initializing Git):
```bash
npm run prepare
npx husky add .husky/pre-commit "npx lint-staged"
```

## CI/CD

GitHub Actions runs on every push and pull request:
- Type checking
- Linting
- Formatting check
- Unit tests
- Build verification

## Coverage Goals

- **Current Target**: 80% code coverage
- **Components**: All components should have basic render tests
- **Utilities**: All utility functions should have unit tests
- **API Routes**: All API endpoints should have integration tests

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what users see and do
2. **Keep Tests Simple**: One assertion per test when possible
3. **Use Descriptive Names**: Test names should describe what is being tested
4. **Mock External Dependencies**: Use Vitest mocks for Next.js router, APIs, etc.
5. **Clean Up**: Tests should clean up after themselves (handled by setup file)

## Error Monitoring

See [ERROR_MONITORING.md](./ERROR_MONITORING.md) for Sentry setup instructions.

