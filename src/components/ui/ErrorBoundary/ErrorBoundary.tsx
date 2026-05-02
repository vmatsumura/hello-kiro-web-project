// src/components/ui/ErrorBoundary/ErrorBoundary.tsx
// Error boundary para isolar falhas de renderização por seção.

import { Component, ReactNode, ErrorInfo } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary que isola falhas de renderização.
 * Cada seção principal da página de comparação deve ser envolvida
 * em um ErrorBoundary independente para evitar que um erro derrube a página inteira.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[ErrorBoundary] Erro na seção "${this.props.name}":`, error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          role="alert"
          sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'error.light',
            borderRadius: 2,
            bgcolor: 'error.50',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            my: 2,
          }}
        >
          <ErrorOutlineIcon color="error" />
          <Typography variant="body2" color="error.main" align="center">
            {this.props.name
              ? `Não foi possível carregar a seção "${this.props.name}".`
              : 'Ocorreu um erro inesperado nesta seção.'}
          </Typography>
          <Button size="small" onClick={this.handleReset} variant="outlined" color="error">
            Tentar novamente
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
