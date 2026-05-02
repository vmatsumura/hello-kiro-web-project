# Testing with React Testing Library (RTL)

## Philosophy

Test what the user sees and does — not implementation details.

- Query by accessible role, label, or text. Never by CSS class or component internals.
- Tests should not break when you rename a class or refactor a hook, only when behavior changes.
- Prefer `userEvent` over `fireEvent` — it simulates real browser interactions (focus, keyboard, pointer events in sequence).
- Every new component gets a test file. Every new hook gets a `renderHook` test.

## Setup

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      thresholds: { lines: 80, functions: 80, branches: 75 },
    },
  },
});
```

```ts
// src/setupTests.ts
import '@testing-library/jest-dom';
import { server } from './mocks/server'; // MSW mock server

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Query Priority (in order — use the first that applies)

1. `getByRole` — most accessible, most robust
2. `getByLabelText` — for form inputs
3. `getByPlaceholderText` — fallback for inputs without label
4. `getByText` — for static content
5. `getByTestId` — **last resort only**. If you're reaching for `data-testid`, reconsider the component's accessibility.

## Test Structure

Use the Arrange-Act-Assert pattern. Group related tests with `describe`. Name tests with "should" + user behavior.

```tsx
// src/components/ui/ProjectCard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectCard } from './ProjectCard';
import { ThemeWrapper } from '../../utils/test-utils';

const defaultProps = {
  title: 'E-commerce Dashboard',
  description: 'A dashboard built with React and MUI.',
  tags: ['React', 'TypeScript', 'MUI'],
  liveUrl: 'https://example.com',
};

describe('ProjectCard', () => {
  it('should render the project title and description', () => {
    render(<ProjectCard {...defaultProps} />, { wrapper: ThemeWrapper });

    expect(screen.getByRole('heading', { name: 'E-commerce Dashboard' })).toBeInTheDocument();
    expect(screen.getByText('A dashboard built with React and MUI.')).toBeInTheDocument();
  });

  it('should render all technology tags', () => {
    render(<ProjectCard {...defaultProps} />, { wrapper: ThemeWrapper });

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('MUI')).toBeInTheDocument();
  });

  it('should not render the View project button when liveUrl is absent', () => {
    render(<ProjectCard {...defaultProps} liveUrl={undefined} />, { wrapper: ThemeWrapper });

    expect(screen.queryByRole('link', { name: /view project/i })).not.toBeInTheDocument();
  });

  it('should open the live URL when the button is activated via keyboard', async () => {
    const user = userEvent.setup();
    render(<ProjectCard {...defaultProps} />, { wrapper: ThemeWrapper });

    const link = screen.getByRole('link', { name: /view project/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');

    await user.tab();
    expect(link).toHaveFocus();
  });
});
```

## Test Utilities

Create a centralized `test-utils.tsx` to wrap components with providers (MUI theme, Router, i18n) in every test.

```tsx
// src/utils/test-utils.tsx
import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { theme } from '../theme';

export function ThemeWrapper({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </MemoryRouter>
  );
}

// Re-export RTL with custom render
export * from '@testing-library/react';
```

## Testing Async Behavior

Use `waitFor` or `findBy*` queries for async UI updates. Never use arbitrary `setTimeout` in tests.

```tsx
it('should show success message after form submission', async () => {
  const user = userEvent.setup();
  render(<ContactForm />, { wrapper: ThemeWrapper });

  await user.type(screen.getByLabelText(/name/i), 'Vitor');
  await user.type(screen.getByLabelText(/email/i), 'vitor@example.com');
  await user.type(screen.getByLabelText(/message/i), 'Hello, world!');
  await user.click(screen.getByRole('button', { name: /send/i }));

  expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
});
```

## Mocking API Calls

Use **MSW (Mock Service Worker)** for API mocking. Never mock `fetch` directly — it creates brittle tests.

```ts
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/contact', () => {
    return HttpResponse.json({ success: true }, { status: 200 });
  }),
];
```

## Testing Custom Hooks

```ts
// src/hooks/useContactForm.test.ts
import { renderHook, act } from '@testing-library/react';
import { useContactForm } from './useContactForm';

it('should transition to success after a successful submission', async () => {
  const { result } = renderHook(() => useContactForm());

  expect(result.current.status).toBe('idle');

  await act(async () => {
    await result.current.submit({
      name: 'Vitor',
      email: 'vitor@example.com',
      message: 'Test',
    });
  });

  expect(result.current.status).toBe('success');
});
```

## Accessibility Testing

Include `@axe-core/react` (or `jest-axe`) in the test suite to catch common a11y violations automatically.

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

it('should have no accessibility violations', async () => {
  const { container } = render(<ContactForm />, { wrapper: ThemeWrapper });
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## What NOT to Test

- Internal state values (test observable UI, not `useState` internals)
- Implementation details like prop names passed to child components
- Third-party library behavior (MUI components, Zustand internals)
- Snapshot tests — they break constantly and don't validate behavior

## Coverage Targets

| Layer | Target |
|---|---|
| Components (ui/) | 85%+ |
| Hooks | 90%+ |
| Services | 80%+ |
| Utils | 95%+ |
| Sections | 70%+ (integration-style) |
