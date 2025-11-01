# Error Monitoring Setup (Sentry)

## Overview

Sentry provides real-time error tracking, performance monitoring, and release tracking for production applications.

## Setup Instructions

### 1. Create Sentry Account

1. Go to [sentry.io](https://sentry.io) and sign up
2. Create a new project for "Next.js"
3. Copy your DSN (Data Source Name)

### 2. Install Dependencies

```bash
npm install @sentry/nextjs
```

### 3. Initialize Sentry

Run the Sentry wizard to automatically configure your project:

```bash
npx @sentry/wizard@latest -i nextjs
```

This will:
- Create `sentry.client.config.ts`
- Create `sentry.server.config.ts`
- Create `sentry.edge.config.ts`
- Update `next.config.js` with Sentry configuration
- Create `.sentryclirc` for releases

### 4. Environment Variables

Add to your `.env.local` (development) and production environment:

```env
SENTRY_DSN=your-dsn-here
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=your-project-slug
SENTRY_AUTH_TOKEN=your-auth-token
```

### 5. Manual Configuration (Optional)

If you prefer manual setup, create the following files:

#### `sentry.client.config.ts`
```typescript
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
})
```

#### `sentry.server.config.ts`
```typescript
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
})
```

#### `sentry.edge.config.ts`
```typescript
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
})
```

### 6. Error Boundaries

Create an error boundary component:

```typescript
// components/ErrorBoundary.tsx
'use client'

import * as Sentry from '@sentry/nextjs'
import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    Sentry.captureException(error, { contexts: { react: errorInfo } })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary">
          <h1>Something went wrong</h1>
          <p>We've been notified and are working on a fix.</p>
        </div>
      )
    }

    return this.props.children
  }
}
```

Then wrap your app in `app/layout.tsx`:

```typescript
import ErrorBoundary from '@/components/ErrorBoundary'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
```

### 7. Manual Error Reporting

Capture errors manually when needed:

```typescript
import * as Sentry from '@sentry/nextjs'

try {
  // Your code
} catch (error) {
  Sentry.captureException(error)
  // Handle error
}
```

### 8. Performance Monitoring

Track performance automatically or manually:

```typescript
// Automatic performance monitoring is enabled
// Manual transaction tracking:
const transaction = Sentry.startTransaction({ name: 'My Transaction' })
// ... your code ...
transaction.finish()
```

### 9. Release Tracking

Set up release tracking in your deployment pipeline:

```bash
# Install Sentry CLI
npm install -g @sentry/cli

# Create release
sentry-cli releases new $VERSION
sentry-cli releases set-commits $VERSION --auto
sentry-cli releases finalize $VERSION
```

Or use the GitHub Actions integration for automatic releases.

## Features

- **Error Tracking**: Automatic error capture with stack traces
- **Performance Monitoring**: Track page load times and API response times
- **Session Replay**: Record user sessions when errors occur
- **Release Tracking**: Track which releases introduced bugs
- **Source Maps**: See original source code in error reports
- **User Context**: Attach user information to errors
- **Breadcrumbs**: See user actions leading to errors

## Best Practices

1. **Filter Sensitive Data**: Configure data scrubbing to remove PII
2. **Set Sample Rates**: Adjust `tracesSampleRate` based on traffic
3. **Use Environments**: Tag errors with environment (dev, staging, prod)
4. **Monitor Performance**: Set up alerts for performance degradation
5. **Review Regularly**: Check Sentry dashboard weekly for new errors

## Cost Considerations

- **Developer Plan**: Free for up to 5,000 events/month
- **Team Plan**: Starts at $26/month for 50,000 events/month
- **Business Plan**: Custom pricing for high-volume apps

## Alternative Options

If Sentry is not available or too expensive:
- **LogRocket**: Session replay and error tracking
- **Rollbar**: Error tracking with similar features
- **Bugsnag**: Alternative error monitoring
- **Self-hosted Sentry**: Open-source option

## Testing

Test error reporting in development:

```typescript
// Test error boundary
throw new Error('Test error')

// Test manual reporting
Sentry.captureMessage('Test message', 'info')
```

