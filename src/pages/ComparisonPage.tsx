// src/pages/ComparisonPage.tsx
// Página principal de comparação de veículos.

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useComparisonStore } from '../store/useComparisonStore';
import { useComparisonUrl } from '../hooks/useComparisonUrl';
import { IdentificationBlock } from '../components/sections/IdentificationBlock/IdentificationBlock';
import { ComparisonGrid } from '../components/sections/ComparisonGrid/ComparisonGrid';
import { DiffToggle } from '../components/ui/DiffToggle/DiffToggle';
import { PhotoGallery } from '../components/ui/PhotoGallery/PhotoGallery';

export function ComparisonPage() {
  const { t } = useTranslation('comparison');
  const navigate = useNavigate();
  const { syncToUrl } = useComparisonUrl();
  const { slots, showOnlyDiffs, toggleShowOnlyDiffs, filledVehicles } =
    useComparisonStore();

  const vehicles = filledVehicles();
  const filledCount = vehicles.length;

  // Redireciona para /selecionar se restar menos de 2 veículos após remoção
  useEffect(() => {
    const hasAnyVehicle = slots.some((s) => s.vehicle !== null);
    if (hasAnyVehicle && filledCount < 2) {
      navigate('/selecionar', { replace: true });
    }
  }, [slots, filledCount, navigate]);

  // Sincroniza URL quando veículos mudam
  useEffect(() => {
    if (vehicles.length >= 2) {
      syncToUrl(vehicles);
    }
  }, [vehicles, syncToUrl]);

  const handleVehicleRemoved = () => {
    const remaining = filledVehicles();
    if (remaining.length < 2) {
      navigate('/selecionar', {
        replace: true,
        state: { prefilledVehicles: remaining },
      });
    }
  };

  return (
    <Box>
      {/* Título da página — h2 semântico (visível em mobile, visually-hidden em desktop) */}
      <Typography
        component="h2"
        variant="h5"
        sx={{
          px: { xs: 2, md: 4 },
          py: { xs: 2, md: 0 },
          fontWeight: 700,
          // Em desktop fica visualmente oculto mas acessível a leitores de tela
          // Requisito 12.3: cada página deve ter h2 para seu título
          ...({ xs: {}, md: {
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
            whiteSpace: 'nowrap',
            border: 0,
          } }),
        }}
      >
        {t('page.title')}
      </Typography>

      {/* Bloco de identificação sticky */}
      {vehicles.length >= 2 && (
        <IdentificationBlock
          vehicles={vehicles}
          onVehicleRemoved={handleVehicleRemoved}
        />
      )}

      {/* Controles e conteúdo principal */}
      <Box sx={{ px: { xs: 0, md: 0 } }}>
        {/* Toggle "Mostrar apenas diferenças" */}
        <DiffToggle
          checked={showOnlyDiffs}
          onChange={toggleShowOnlyDiffs}
        />

        {/* Grade de especificações técnicas */}
        {vehicles.length >= 2 && (
          <ComparisonGrid
            vehicles={vehicles}
            showOnlyDiffs={showOnlyDiffs}
          />
        )}

        {/* Galeria de fotos comparativa */}
        {vehicles.length >= 2 && (
          <PhotoGallery vehicles={vehicles} />
        )}
      </Box>
    </Box>
  );
}

export default ComparisonPage;
