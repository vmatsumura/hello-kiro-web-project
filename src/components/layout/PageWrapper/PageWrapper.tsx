// src/components/layout/PageWrapper/PageWrapper.tsx
// Container responsivo para o conteúdo das páginas.

import { ReactNode } from 'react';
import { Container, Box } from '@mui/material';

export interface PageWrapperProps {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

/**
 * Wrapper de página com container MUI responsivo.
 * Aplica padding consistente em todos os breakpoints via sx prop.
 * Nunca usa media queries CSS manuais — apenas utilitários MUI.
 */
export function PageWrapper({ children, maxWidth = 'xl' }: PageWrapperProps) {
  return (
    <Container maxWidth={maxWidth} disableGutters>
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3 },
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Container>
  );
}

export default PageWrapper;
