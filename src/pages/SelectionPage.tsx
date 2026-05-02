// src/pages/SelectionPage.tsx
// Página de seleção de veículos para comparação.

import { Box, Typography, Alert } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from '../components/layout/PageWrapper/PageWrapper';
import { SelectionPanel } from '../components/sections/SelectionPanel/SelectionPanel';

interface LocationState {
  error?: string;
}

export function SelectionPage() {
  const { t } = useTranslation('comparison');
  const location = useLocation();
  const state = location.state as LocationState | null;

  return (
    <PageWrapper>
      {/* Mensagem de redirecionamento (ex: URL inválida) */}
      {state?.error && (
        <Box aria-live="polite" role="status" sx={{ mb: 3 }}>
          <Alert severity="info">{state.error}</Alert>
        </Box>
      )}

      {/* Título da página — h2 (h1 está no AppHeader) */}
      <Box sx={{ mb: 4 }}>
        <Typography component="h2" variant="h4" fontWeight={700} gutterBottom>
          {t('selection.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('selection.subtitle')}
        </Typography>
      </Box>

      <SelectionPanel />
    </PageWrapper>
  );
}

export default SelectionPage;
