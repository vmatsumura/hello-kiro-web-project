// src/components/ui/SpecBlock/SpecBlock.tsx
// Bloco temático de especificações técnicas (ex: Motor e Transmissão).

import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { SpecBlockKey, Vehicle } from '../../../types/vehicle';
import { useFilteredSpecs } from '../../../hooks/useFilteredSpecs';
import { useDiffHighlight } from '../../../hooks/useDiffHighlight';
import { useBestValue } from '../../../hooks/useBestValue';
import { getSpecValue } from '../../../utils/specMetadata';
import { SpecRow } from '../SpecRow/SpecRow';

export interface SpecBlockProps {
  blockKey: SpecBlockKey;
  vehicles: Vehicle[];
  showOnlyDiffs: boolean;
}

/**
 * Bloco temático que agrupa linhas de especificações relacionadas.
 *
 * Quando showOnlyDiffs=true e nenhuma spec do bloco difere entre os veículos,
 * o bloco inteiro (incluindo o cabeçalho h3) não é renderizado.
 */
export function SpecBlock({ blockKey, vehicles, showOnlyDiffs }: SpecBlockProps) {
  const { t } = useTranslation('comparison');
  const filteredSpecs = useFilteredSpecs(blockKey, vehicles, showOnlyDiffs);

  // Oculta o bloco inteiro quando não há specs para exibir
  if (filteredSpecs.length === 0) return null;

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <Typography
        component="h3"
        variant="h6"
        sx={{
          px: 2,
          py: 1.5,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          borderRadius: '8px 8px 0 0',
          fontWeight: 600,
        }}
      >
        {t(`blocks.${blockKey}`)}
      </Typography>

      {/* Wrapper com overflow horizontal para scroll em viewports pequenas (Requisito 8.2) */}
      <Box sx={{ overflowX: 'auto' }}>
        <Box
          component="table"
          sx={{
            width: '100%',
            borderCollapse: 'collapse',
            // tableLayout: 'auto' permite que as colunas se expandam além do container
            // habilitando scroll horizontal em mobile (xs < 600px)
            tableLayout: 'auto',
          }}
          role="table"
          aria-label={t(`blocks.${blockKey}`)}
        >
          <Box component="tbody">
            {filteredSpecs.map((spec) => {
              const values = vehicles.map((v) => getSpecValue(v, spec.key));

              return (
                <SpecRowWrapper
                  key={spec.key}
                  spec={spec}
                  values={values}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// Componente interno que calcula hasDiff e bestValueIndex por linha
function SpecRowWrapper({
  spec,
  values,
}: {
  spec: ReturnType<typeof useFilteredSpecs>[number];
  values: (string | number | boolean | null)[];
}) {
  const { t } = useTranslation('vehicle');
  const hasDiff = useDiffHighlight(values);
  const bestValueIndex = useBestValue(values, spec.isHigherBetter);

  // Resolve rótulo e descrição via i18n
  // As chaves no specMetadata têm o prefixo 'vehicle:' que removemos aqui
  const labelKey = spec.labelKey.replace('vehicle:', '') as string;
  const descriptionKey = spec.descriptionKey.replace('vehicle:', '') as string;

  const fallbackLabel = labelKey.split('.').pop() ?? labelKey;
  const fallbackDesc = descriptionKey.split('.').pop() ?? descriptionKey;

  // Usa t com cast para string — chaves dinâmicas não têm inferência de tipo
  const label = (t as (key: string, opts: object) => string)(labelKey, { defaultValue: fallbackLabel });
  const description = (t as (key: string, opts: object) => string)(descriptionKey, { defaultValue: fallbackDesc });

  return (
    <SpecRow
      specKey={spec.key}
      label={label}
      unit={spec.unit}
      description={description}
      values={values}
      hasDiff={hasDiff}
      bestValueIndex={bestValueIndex}
      isHigherBetter={spec.isHigherBetter}
    />
  );
}

// Suprime warning de fast-refresh para o componente interno
SpecRowWrapper.displayName = 'SpecRowWrapper';

export default SpecBlock;
