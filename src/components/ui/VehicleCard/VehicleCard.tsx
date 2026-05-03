// src/components/ui/VehicleCard/VehicleCard.tsx
// Card de identificação do veículo no bloco sticky do topo.

import { Box, Typography, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import type { Vehicle } from '../../../types/vehicle';
import { ImageWithFallback } from '../ImageWithFallback/ImageWithFallback';
import { formatCurrency } from '../../../utils/formatCurrency';

export interface VehicleCardProps {
  vehicle: Vehicle;
  onRemove: () => void;
}

/**
 * Card de identificação do veículo exibido no bloco sticky do topo.
 * Contém: foto principal, nome completo, MSRP e botão de remoção.
 */
export function VehicleCard({ vehicle, onRemove }: VehicleCardProps) {
  const { t } = useTranslation('common');
  const { identificacao, midia } = vehicle;

  const fullName = `${identificacao.marca} ${identificacao.modelo} ${identificacao.versao} ${identificacao.anoModelo}`;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 1.5,
        gap: 1,
        minWidth: 160,
        position: 'relative',
      }}
    >
      {/* Botão de remoção */}
      <IconButton
        onClick={onRemove}
        size="small"
        aria-label={t('actions.remove') + ': ' + fullName}
        sx={{
          position: 'absolute',
          top: 4,
          right: 4,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: 1,
          color: 'text.primary',
          '&:hover': { bgcolor: 'error.main', borderColor: 'error.main', color: '#fff' },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      {/* Foto principal */}
      <ImageWithFallback
        src={midia.fotoPrincipal}
        alt={fullName}
        width={160}
        height={100}
      />

      {/* Informações do veículo */}
      <Stack spacing={0.25} alignItems="center" sx={{ width: '100%' }}>
        <Typography
          variant="caption"
          fontWeight={700}
          align="center"
          sx={{ lineHeight: 1.3 }}
        >
          {identificacao.marca} {identificacao.modelo}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          sx={{ lineHeight: 1.3 }}
        >
          {identificacao.versao} · {identificacao.anoModelo}
        </Typography>
        <Typography
          variant="body2"
          fontWeight={600}
          color="primary.main"
          align="center"
        >
          {formatCurrency(identificacao.msrpBrl)}
        </Typography>
      </Stack>
    </Box>
  );
}

export default VehicleCard;
