# Design System & Accessibility

## MUI Theme

All design decisions live in `src/theme/index.ts`. Components never define their own colors, typography, or spacing raw — they reference theme tokens.

```ts
// src/theme/index.ts
import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  palette: {
    primary: { main: '#1976D2' },
    secondary: { main: '#9C27B0' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
    h1: { fontSize: '3rem', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '2.25rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
  },
  spacing: 8,
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
  },
});

export const lightTheme = createTheme(baseTheme, {
  palette: { mode: 'light' },
});

export const darkTheme = createTheme(baseTheme, {
  palette: { mode: 'dark' },
});
```

## Dark Mode

- Light/dark mode is controlled by `useThemeStore`. User preference persists via `localStorage`.
- Respect the OS preference on first load using `window.matchMedia('(prefers-color-scheme: dark)')`.
- Never hardcode light-mode-only colors. Always use `theme.palette.*` tokens.

```tsx
// src/App.tsx
function App() {
  const mode = useThemeStore(state => state.mode);
  const theme = mode === 'dark' ? darkTheme : lightTheme;
  return <ThemeProvider theme={theme}>...</ThemeProvider>;
}
```

## Responsive Design

- Mobile-first: design for 375px, then expand.
- Use MUI's `useMediaQuery` or `sx` responsive syntax — never write media queries manually.
- Breakpoints: `xs` (0–600px), `sm` (600–900px), `md` (900–1200px), `lg` (1200–1536px).

```tsx
// Responsive columns using sx
<Grid2 container spacing={{ xs: 2, md: 3 }}>
  <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
    <ProjectCard {...project} />
  </Grid2>
</Grid2>
```

## Accessibility (WCAG 2.1 AA)

All components must meet these requirements. The Kiro agent must apply them automatically.

### Color Contrast
- Normal text: minimum 4.5:1 contrast ratio against background.
- Large text (18px+ regular or 14px+ bold): minimum 3:1.
- Use the MUI theme palette — it's WCAG-tested. Custom colors must be verified with a contrast checker.

### Focus Management
- Every interactive element must be keyboard-reachable (tab order).
- Do not remove the focus ring (`outline: none`) without providing a visible custom focus indicator.
- Modals, dialogs, and drawers must trap focus when open and restore focus to the trigger element when closed. Use MUI's `Modal` — it handles this natively.

### Semantic HTML
- Use one `<h1>` per page (the portfolio owner's name or page title).
- Section headings must follow a logical hierarchy: `h1` → `h2` → `h3`. Never skip levels.
- Navigation must be wrapped in `<nav>` with an `aria-label`.
- The contact form must have `<label>` elements associated with every input via `htmlFor`/`id`.

```tsx
// Required: explicit label association
<FormControl fullWidth>
  <InputLabel htmlFor="contact-email">Email</InputLabel>
  <OutlinedInput id="contact-email" type="email" aria-describedby="email-helper" />
  <FormHelperText id="email-helper">We'll never share your email.</FormHelperText>
</FormControl>
```

### Images
- Every `<img>` and MUI `Avatar` with a meaningful image must have a descriptive `alt` attribute.
- Decorative images (background illustrations) must have `alt=""` and `role="presentation"`.

```tsx
// Meaningful image
<Avatar src="/profile.jpg" alt="Vitor — Senior Frontend Developer" />

// Decorative
<img src="/hero-bg.svg" alt="" role="presentation" />
```

### Animations
- Respect `prefers-reduced-motion`. Disable or simplify animations for users who request it.

```ts
// In the MUI theme
components: {
  MuiCssBaseline: {
    styleOverrides: `
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
        }
      }
    `,
  },
},
```

### ARIA
- Do not add ARIA roles that duplicate native HTML semantics (e.g., `role="button"` on a `<button>`).
- Use `aria-live="polite"` for regions that update dynamically (form submission status, filter results).
- Icon-only buttons must have `aria-label`.

```tsx
// Icon-only button
<IconButton aria-label="Toggle dark mode" onClick={toggleMode}>
  <DarkModeIcon />
</IconButton>
```

## Performance

- Use `React.lazy` and `Suspense` for route-level code splitting.
- Optimize images: use WebP format, define explicit `width` and `height` attributes to prevent layout shift (CLS).
- Load fonts with `font-display: swap`.
- Memoize expensive computations with `useMemo`. Memoize stable callbacks passed to children with `useCallback`.
- Do not over-memoize — only apply when profiling shows a measurable gain.
