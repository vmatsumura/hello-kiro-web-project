// src/components/sections/ComparisonGrid/ComparisonGrid.tsx
// Orquestra os 9 blocos de especificações técnicas na página de comparação.

import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { Vehicle, SpecBlockKey } from '../../../types/vehicle';
import { SpecBlock } from '../../ui/SpecBlock/SpecBlock';
import { ErrorBoundary } from '../../ui/ErrorBoundary/ErrorBoundary';

export interface ComparisonGridProps {
  vehicles: Vehicle[];
  showOnlyDiffs: boolean;
}

/** Ordem canônica dos blocos de especificações — conforme Requisito 4.1 */
const BLOCK_ORDER: SpecBlockKey[] = [
  'motorTransmissao',
  'desempenho',
  'dimensoesPeso',
  'rodasPneusFreios',
  'segurancaAtiva',
  'segurancaPassiva',
  'tecnologiaConectividade',
  'confortoConveniencias',
  'capacidadePassageiros',
];

/**
 * Grade de comparação com os 9 blocos temáticos de especificações.
 * Cada bloco é envolvido em um ErrorBoundary independente para que
 * um erro em um bloco não derrube a página inteira.
 */
export function ComparisonGrid({ vehicles, showOnlyDiffs }: ComparisonGridProps) {
  const { t } = useTranslation('comparison');

  return (
    <Box component="main" aria-label="Especificações técnicas comparadas">
      {BLOCK_ORDER.map((blockKey) => (
        <ErrorBoundary key={blockKey} name={t(`blocks.${blockKey}`)}>
          <SpecBlock
            blockKey={blockKey}
            vehicles={vehicles}
            showOnlyDiffs={showOnlyDiffs}
          />
        </ErrorBoundary>
      ))}
    </Box>
  );
}

export default ComparisonGrid;
