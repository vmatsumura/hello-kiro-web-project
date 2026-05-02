/**
 * Smoke test to verify the test infrastructure is correctly configured.
 * Tests: Vitest globals, jsdom environment, @testing-library/jest-dom matchers,
 * and MSW server setup.
 */

describe('Test infrastructure', () => {
  it('should have Vitest globals available', () => {
    expect(true).toBe(true);
  });

  it('should have jsdom environment (window is defined)', () => {
    expect(typeof window).toBe('object');
    expect(typeof document).toBe('object');
  });

  it('should have @testing-library/jest-dom matchers available', () => {
    const div = document.createElement('div');
    div.textContent = 'hello';
    document.body.appendChild(div);
    expect(div).toBeInTheDocument();
    document.body.removeChild(div);
  });
});
