import { http, HttpResponse } from 'msw';

/**
 * MSW request handlers for tests.
 * This portal is a static SPA with no backend API.
 * Add handlers here if external API integrations are added in the future.
 */
export const handlers = [
  // Example handler — remove or replace when real endpoints are added
  http.get('/api/health', () => {
    return HttpResponse.json({ status: 'ok' }, { status: 200 });
  }),
];
