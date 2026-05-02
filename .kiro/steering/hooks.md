# Agent Hooks

Hooks are automated tasks triggered by file changes in the project. They run in the background while you develop.

## Hook: Enforce external link security

**Trigger**: any `.tsx` file in `src/` is modified.
**Task**: scan the file for `<a>`, MUI `<Link>`, or MUI `<Button>` components with `target="_blank"`. Verify they all have `rel="noopener noreferrer"`. If missing, add it automatically.

## Hook: Sync test file on component creation

**Trigger**: a new `.tsx` file is created in `src/components/`.
**Task**: create a corresponding `.test.tsx` file in `src/__tests__/components/` with a boilerplate structure — describe block, a basic render test using `ThemeWrapper`, and an axe accessibility test stub.

## Hook: Validate environment variable usage

**Trigger**: any `.ts` or `.tsx` file is saved.
**Task**: scan for hardcoded strings that look like API keys, tokens, or secrets (regex patterns for base64 strings >20 chars, keys starting with `sk_`, `Bearer `, `AIza`, etc.). If found, warn and suggest moving to `.env.local`.

## Hook: Check for `dangerouslySetInnerHTML`

**Trigger**: any `.tsx` file is saved.
**Task**: detect usage of `dangerouslySetInnerHTML` without an adjacent `DOMPurify.sanitize()` call. If found, add a comment warning and a TODO to sanitize, and log a Kiro warning.

## Hook: Update README on new section added

**Trigger**: a new file is created in `src/components/sections/`.
**Task**: add the new section to the "Sections" table in `README.md` with a placeholder description. Prompt the developer to fill in the description.

## Hook: Run axe on changed component

**Trigger**: any `.tsx` file in `src/components/` is saved.
**Task**: run `vitest run --reporter=verbose` scoped to the test file matching the changed component. Surface any `jest-axe` violations directly in Kiro's output panel.
