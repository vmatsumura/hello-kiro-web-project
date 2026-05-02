// src/components/layout/AppHeader/AppHeader.tsx
// Cabeçalho principal da aplicação com título, navegação e toggle de tema.

import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useTranslation } from 'react-i18next';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { useThemeStore } from '../../../store/useThemeStore';

/**
 * Cabeçalho fixo da aplicação.
 * - Título como h1 (único por página)
 * - Botão de toggle de tema com aria-label descritivo
 * - Link "Voltar à seleção" quando na página de comparação
 * - nav com aria-label para acessibilidade
 */
export function AppHeader() {
  const { t } = useTranslation('common');
  const { mode, toggleMode } = useThemeStore();
  const location = useLocation();

  const isComparisonPage = location.pathname === '/comparar';

  return (
    <AppBar position="sticky" elevation={1} component="header">
      <Toolbar>
        {/* Ícone da aplicação */}
        <DirectionsCarIcon sx={{ mr: 1 }} aria-hidden="true" />

        {/* Título — h1 único da aplicação */}
        <Typography
          component="h1"
          variant="h6"
          sx={{ fontWeight: 700, flexGrow: 1, letterSpacing: '-0.5px' }}
        >
          {t('app.title')}
        </Typography>

        {/* Navegação principal */}
        <Box
          component="nav"
          aria-label={t('nav.label')}
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          {isComparisonPage && (
            <Button
              component={RouterLink}
              to="/selecionar"
              color="inherit"
              size="small"
              sx={{ textTransform: 'none' }}
            >
              {t('actions.backToSelection')}
            </Button>
          )}

          {/* Toggle de tema */}
          <IconButton
            onClick={toggleMode}
            color="inherit"
            aria-label={mode === 'dark' ? t('theme.toggleLight') : t('theme.toggleDark')}
          >
            {mode === 'dark' ? (
              <LightModeIcon fontSize="small" />
            ) : (
              <DarkModeIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
