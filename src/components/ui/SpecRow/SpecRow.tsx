// src/components/ui/SpecRow/SpecRow.tsx
// Linha de especificação técnica com destaque de diferença e melhor valor.

import { Box, Typography, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SpecTooltip } from '../SpecTooltip/SpecTooltip';
import { BestValueBadge } from '../BestValueBadge/BestValueBadge';
import { colorTokens } from '../../../theme/tokens';

export interface SpecRowProps {
  specKey: string;
  label: string;
  unit: string;
  description: string;
  /** Valores de cada veículo (um por coluna) */
  values: (string | number | boolean | null)[];
  /** Se true, aplica destaque visual de diferença na linha */
  hasDiff: boolean;
  /** Índice do veículo com o melhor valor (null = sem melhor valor) */
  bestValueIndex: number | null;
  /** Direção do melhor valor (null = não numérico) */
  isHigherBetter: boolean | null;
}

/** Formata um valor para exibição na célula */
function formatValue(value: string | number | boolean | null): string {
  if (value === null) return '—';
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
  return String(value);
}

/**
 * Linha de especificação técnica na tabela de comparação.
 * Exibe o rótulo (com tooltip) e uma célula por veículo.
 * Aplica destaque visual quando os valores diferem entre veículos.
 * Sinaliza o melhor valor com BestValueBadge.
 */
export function SpecRow({
  label,
  unit,
  description,
  values,
  hasDiff,
  bestValueIndex,
  isHigherBetter,
}: SpecRowProps) {
  const { t } = useTranslation('common');

  return (
    <Box
      component="tr"
      sx={{
        bgcolor: hasDiff ? colorTokens.diffRowBgLight : 'transparent',
        borderLeft: hasDiff
          ? `3px solid ${colorTokens.diffRowBorderLight}`
          : '3px solid transparent',
        '&:hover': { bgcolor: 'action.hover' },
        // Suporte a dark mode via CSS custom properties não é direto com tokens estáticos,
        // mas o tema MUI gerencia isso via ThemeProvider
      }}
    >
      {/* Célula do rótulo */}
      <Box
        component="td"
        sx={{
          py: 1,
          px: 2,
          minWidth: 180,
          verticalAlign: 'middle',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <SpecTooltip label={label} description={description} unit={unit} />
      </Box>

      {/* Células de valores — uma por veículo */}
      {values.map((value, index) => {
        const isBest = bestValueIndex === index;
        const displayValue = formatValue(value);
        const isUnavailable = value === null;

        return (
          <Box
            key={index}
            component="td"
            sx={{
              py: 1,
              px: 2,
              textAlign: 'center',
              verticalAlign: 'middle',
              borderBottom: '1px solid',
              borderColor: 'divider',
              minWidth: 140,
            }}
          >
            <Stack
              direction="column"
              alignItems="center"
              spacing={0.5}
            >
              <Typography
                variant="body2"
                sx={{
                  color: isUnavailable ? 'text.disabled' : 'text.primary',
                  fontWeight: isBest ? 700 : 400,
                }}
                aria-label={
                  isUnavailable
                    ? t('placeholders.dataUnavailable')
                    : undefined
                }
              >
                {displayValue}
                {!isUnavailable && unit ? (
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{ ml: 0.5, color: 'text.secondary' }}
                  >
                    {unit}
                  </Typography>
                ) : null}
              </Typography>

              {isBest && isHigherBetter !== null && (
                <BestValueBadge isHigherBetter={isHigherBetter} />
              )}
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
}

export default SpecRow;
