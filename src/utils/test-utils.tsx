// src/utils/test-utils.tsx
// Utilitários centralizados para testes — envolve componentes com todos os providers.

import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { lightTheme } from '../theme';
import i18n from '../i18n';

interface ThemeWrapperProps {
  children: ReactNode;
  initialEntries?: string[];
}

/**
 * Wrapper padrão para testes — envolve com MemoryRouter, ThemeProvider e I18nextProvider.
 * Use como `wrapper` no render() do RTL.
 *
 * @example
 * render(<MyComponent />, { wrapper: ThemeWrapper });
 */
export function ThemeWrapper({ children, initialEntries = ['/'] }: ThemeWrapperProps) {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </I18nextProvider>
    </MemoryRouter>
  );
}

// Re-exporta tudo do RTL para uso centralizado nos testes
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
