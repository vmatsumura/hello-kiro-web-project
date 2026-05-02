import { setupServer } from 'msw/node';
import { handlers } from './handlers';

/**
 * MSW server for Node.js environment (used in Vitest tests).
 * Intercepts network requests during tests.
 */
export const server = setupServer(...handlers);
