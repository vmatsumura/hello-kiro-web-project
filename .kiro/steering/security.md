# Security Best Practices

## Principle: Treat Every User Input as Untrusted

Even in a personal portfolio, user inputs (contact form, URL params, search) must be sanitized. Never render raw user input as HTML.

## Environment Variables

- Never hardcode API keys, tokens, or secrets in source code.
- All environment variables exposed to the frontend MUST use the `VITE_` prefix and must be considered **public** — they are bundled into the client build.
- Secrets that must remain private (e.g., email service credentials) must live only on a server/edge function, never in `VITE_*` variables.
- Provide a `.env.example` file with all required variable names (no real values) committed to the repo.
- Add `.env` and `.env.local` to `.gitignore` from day one.

```bash
# .env.example
VITE_SITE_URL=https://your-portfolio.com
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
# DO NOT add email service API keys here — use a serverless function
```

## Contact Form Security

The contact form is the main attack surface. Apply all of the following:

### Client-side
- Validate all fields before submission (length, format, allowed characters).
- Rate-limit submissions in the UI (disable button for 30s after submit).
- Use a CAPTCHA integration (e.g., hCaptcha or Google reCAPTCHA v3) to block bots.

### Server-side (edge function / backend)
- Re-validate all inputs server-side. Client validation is UX, not security.
- Use an email service SDK server-side (Resend, SendGrid) — never expose the API key to the browser.
- Sanitize inputs with a library like `validator.js` before sending emails.
- Implement server-side rate limiting (e.g., Vercel's `@vercel/kv` for IP-based throttling).

### Template
```ts
// src/services/contact.service.ts
// This calls YOUR edge function, not the email provider directly
export async function sendContact(data: ContactFormData): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to send message');
}
```

## Content Security Policy (CSP)

Configure CSP headers at the hosting layer (Vercel, Netlify, or nginx). A portfolio using MUI and Google Fonts needs at minimum:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self';
  frame-ancestors 'none';
```

Note: MUI uses `'unsafe-inline'` for styles via emotion. This is a known trade-off. Avoid adding `'unsafe-eval'`.

## HTTP Security Headers

Always set these headers (configure at the hosting/CDN layer):

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

## Dependency Security

- Run `npm audit` before every release. Fix critical and high vulnerabilities before deploying.
- Pin major versions of dependencies. Use `npm ci` in CI (not `npm install`).
- Enable GitHub Dependabot alerts for the repo.
- Never install packages from non-official sources. Review `package.json` diffs on every PR.

## XSS Prevention

- Never use `dangerouslySetInnerHTML`. If you absolutely must (e.g., CMS-rendered content), sanitize with `DOMPurify` first.
- Never construct URLs from user input without validation.
- Avoid `eval()`, `Function()`, and dynamic `import()` with user-controlled strings.

```tsx
// Never do this
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// Do this
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />
```

## External Links

All external links must have `rel="noopener noreferrer"` to prevent tab-napping attacks.

```tsx
// Always
<Link href="https://github.com/..." target="_blank" rel="noopener noreferrer">
  GitHub
</Link>
```

MUI's `Button` and `Link` do NOT add this automatically — you must pass it explicitly.

## Analytics & Privacy

- If using Google Analytics or similar, implement cookie consent before loading the tracking script.
- Respect the `Do Not Track` header where feasible.
- Do not log personal information (emails, names from the contact form) to client-side analytics.
- Add a Privacy Policy page if collecting any user data.

## Supply Chain Security

- Lock the Node.js version using `.nvmrc` or `engines` in `package.json`.
- Use `package-lock.json` (npm) or `pnpm-lock.yaml`. Commit the lockfile.
- Verify integrity of third-party scripts loaded from CDNs using Subresource Integrity (SRI) hashes.
