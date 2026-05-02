# Project Overview

## Purpose

Frontend portfolio application showcasing professional work, projects, skills, and contact information. The goal is a fast, accessible, and visually polished single-page application that reflects the developer's brand.

## Stack

- **Framework**: React 18+ with TypeScript (strict mode)
- **UI Library**: Material UI (MUI) v6
- **Testing**: React Testing Library (RTL) + Vitest
- **State Management**: Zustand (lightweight, no Redux overhead for a portfolio)
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Linting**: ESLint + Prettier
- **CI**: GitHub Actions

## Project Structure

```
src/
  assets/           # Static assets (images, fonts, icons)
  components/
    ui/             # Reusable, dumb UI components (atoms)
    layout/         # Header, Footer, PageWrapper
    sections/       # Page sections (Hero, About, Projects, Contact)
  hooks/            # Custom React hooks
  pages/            # Route-level components
  services/         # API calls, email service, analytics
  store/            # Zustand stores
  theme/            # MUI theme customization
  types/            # Shared TypeScript interfaces
  utils/            # Pure utility functions
  __tests__/        # Mirrors src/ structure
```

## Key Constraints

- Must score 90+ on Lighthouse (Performance, Accessibility, SEO, Best Practices)
- Must be fully keyboard navigable and WCAG 2.1 AA compliant
- No runtime errors on mobile (iOS Safari and Android Chrome)
- All user-facing text must support i18n from day one (react-i18next)
- Contact form must work without exposing any backend credentials client-side
