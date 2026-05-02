# Code Standards & Design Patterns

## TypeScript

- Use `strict: true` in `tsconfig.json`. No exceptions.
- Never use `any`. Use `unknown` and narrow with type guards when the type is truly unknown.
- Prefer `interface` for objects that represent shapes (can be extended). Use `type` for unions, intersections, and aliases.
- Export types from a centralized `src/types/` directory. Avoid inline prop-type declarations in component files for shared types.
- Use `satisfies` operator when you want inference but also want to ensure type shape.

```ts
// Prefer
interface Project {
  id: string;
  title: string;
  tags: string[];
  liveUrl?: string;
}

// Avoid
type Props = { title: any; tags: any[] };
```

## Component Architecture

### Rule: One responsibility per component

Each component does one thing. If a component fetches data, renders UI, AND handles user events — split it.

### Pattern: Container / Presentational

- **Presentational components** (`src/components/ui/`): receive props, render UI, have no side effects. Fully testable in isolation.
- **Container components** (`src/components/sections/`): own state or call hooks, pass data down to presentational components.

```tsx
// Presentational — pure, testable
export function ProjectCard({ title, description, tags, liveUrl }: ProjectCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
        <Stack direction="row" spacing={1}>
          {tags.map(tag => <Chip key={tag} label={tag} size="small" />)}
        </Stack>
      </CardContent>
      {liveUrl && (
        <CardActions>
          <Button href={liveUrl} target="_blank" rel="noopener noreferrer" size="small">
            View project
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

// Container — orchestrates data
export function ProjectsSection() {
  const projects = useProjectsStore(state => state.projects);
  return (
    <Section id="projects">
      <Grid container spacing={3}>
        {projects.map(p => <ProjectCard key={p.id} {...p} />)}
      </Grid>
    </Section>
  );
}
```

### Rule: No prop drilling beyond 2 levels

If a prop needs to travel more than 2 component levels, use Zustand or React Context instead.

## Custom Hooks

- Prefix all custom hooks with `use`.
- Each hook has a single, well-named responsibility.
- Never call hooks conditionally.
- Hooks that perform side effects must be tested with `renderHook` from RTL.

```ts
// Good: focused, composable
export function useContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const submit = useCallback(async (data: ContactFormData) => {
    setStatus('loading');
    try {
      await contactService.send(data);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }, []);

  return { status, submit };
}
```

## State Management (Zustand)

- One store per feature domain. Avoid one giant global store.
- Stores are in `src/store/`. Name them `use[Feature]Store`.
- Keep computed values outside stores — derive them with selectors at the component level.
- Never mutate state directly. Use Immer middleware if complex nested updates are needed.

```ts
// src/store/useThemeStore.ts
interface ThemeStore {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: 'light',
      toggleMode: () => set(state => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
    }),
    { name: 'portfolio-theme' }
  )
);
```

## MUI Usage

- Never override MUI styles with plain CSS or inline `style={{}}` for layout concerns. Use the `sx` prop or `styled()`.
- Customize via the MUI theme (`src/theme/`) — not ad hoc per component. Typography scale, palette, and spacing are defined once in the theme.
- Use MUI's `Grid2` (v6) instead of the legacy `Grid` component.
- Always use `Stack` for simple flex layouts instead of a div with `display: flex`.
- Prefer semantic HTML inside MUI components: `<Typography component="h1">`, not just `<Typography variant="h1">` without the semantic element.

```tsx
// Correct: semantic + visual decoupled
<Typography component="h1" variant="h3" gutterBottom>
  Vitor's Portfolio
</Typography>

// Wrong: visual hierarchy without semantic meaning
<Typography variant="h3" gutterBottom>
  Vitor's Portfolio
</Typography>
```

## File Naming

- Components: `PascalCase.tsx` — e.g. `ProjectCard.tsx`
- Hooks: `camelCase.ts` — e.g. `useContactForm.ts`
- Stores: `camelCase.ts` — e.g. `useThemeStore.ts`
- Utilities: `camelCase.ts` — e.g. `formatDate.ts`
- Test files: mirror the source file with `.test.tsx` — e.g. `ProjectCard.test.tsx`
- Index barrel files: allowed for `components/ui/`, `hooks/`, `types/`. Avoid barrel files inside `sections/` (causes circular import risk).

## Error Boundaries

Wrap each major page section in an `ErrorBoundary`. Never let one section crash take down the entire page.

```tsx
// Usage in a section
<ErrorBoundary fallback={<SectionError name="Projects" />}>
  <ProjectsSection />
</ErrorBoundary>
```

## Async & Data Fetching

- Wrap all fetch calls in service modules (`src/services/`). Components never call `fetch` directly.
- Use React Query (TanStack Query) if the portfolio integrates with APIs (GitHub, Notion, CMS). For static/hardcoded data, Zustand is sufficient.
- Always handle loading, error, and empty states explicitly — never assume data is available.
