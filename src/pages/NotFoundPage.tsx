// src/pages/NotFoundPage.tsx
// Página 404 — exibida quando a rota não existe.

import { Box, Typography, Button } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from '../components/layout/PageWrapper/PageWrapper';

export function NotFoundPage() {
  const { t } = useTranslation(['errors', 'common']);

  return (
    <PageWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: 2,
          textAlign: 'center',
        }}
      >
        <SearchOffIcon sx={{ fontSize: 80, color: 'text.disabled' }} aria-hidden="true" />

        <Typography component="h2" variant="h4" fontWeight={700}>
          {t('errors:notFound')}
        </Typography>

        <Typography variant="body1" color="text.secondary" maxWidth={400}>
          {t('errors:notFoundDescription')}
        </Typography>

        <Button
          component={RouterLink}
          to="/selecionar"
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
        >
          {t('common:actions.backToSelection')}
        </Button>
      </Box>
    </PageWrapper>
  );
}

export default NotFoundPage;
