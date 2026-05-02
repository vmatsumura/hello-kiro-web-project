// src/App.tsx
// Ponto de entrada da aplicação — roteamento, providers e layout global.

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, CircularProgress, Box } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import { useThemeStore } from './store/useThemeStore';
import { lightTheme, darkTheme } from './theme';
import { AppHeader } from './components/layout/AppHeader/AppHeader';
import i18n from './i18n';

// Code splitting por rota — carrega apenas o necessário
const SelectionPage = lazy(() => import('./pages/SelectionPage'));
const ComparisonPage = lazy(() => import('./pages/ComparisonPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageSkeleton() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
      aria-label="Carregando..."
      role="status"
    >
      <CircularProgress />
    </Box>
  );
}

function AppContent() {
  const mode = useThemeStore((state) => state.mode);
  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader />
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<Navigate to="/selecionar" replace />} />
          <Route path="/selecionar" element={<SelectionPage />} />
          <Route path="/comparar" element={<ComparisonPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
