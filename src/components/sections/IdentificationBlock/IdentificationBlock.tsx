// src/components/sections/IdentificationBlock/IdentificationBlock.tsx
// Bloco de identificação dos veículos — sticky no topo durante o scroll.

import { Box, Divider } from '@mui/material';
import type { Vehicle } from '../../../types/vehicle';
import { VehicleCard } from '../../ui/VehicleCard/VehicleCard';
import { useComparisonStore } from '../../../store/useComparisonStore';

export interface IdentificationBlockProps {
  vehicles: Vehicle[];
  onVehicleRemoved?: (index: number) => void;
}

/**
 * Bloco sticky que exibe os cards de identificação dos veículos comparados.
 * Permanece fixo no topo da viewport durante o scroll da página de comparação.
 *
 * Ao remover um veículo:
 * - Se restar menos de 2 veículos, o componente pai redireciona para /selecionar
 * - Caso contrário, o slot é removido e a URL é atualizada
 */
export function IdentificationBlock({ vehicles, onVehicleRemoved }: IdentificationBlockProps) {
  const { removeSlot } = useComparisonStore();

  const handleRemove = (index: number) => {
    removeSlot(index);
    onVehicleRemoved?.(index);
  };

  return (
    <Box
      component="header"
      aria-label="Veículos em comparação"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar - 1,
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          // Reserva espaço para o rótulo da linha (180px) alinhado com SpecRow
          pl: { xs: 0, md: '180px' },
        }}
      >
        {vehicles.map((vehicle, index) => (
          <Box
            key={vehicle.identificacao.id}
            sx={{
              flex: 1,
              minWidth: 160,
              borderRight: index < vehicles.length - 1 ? 1 : 0,
              borderColor: 'divider',
            }}
          >
            <VehicleCard
              vehicle={vehicle}
              onRemove={() => handleRemove(index)}
            />
          </Box>
        ))}
      </Box>
      <Divider />
    </Box>
  );
}

export default IdentificationBlock;
