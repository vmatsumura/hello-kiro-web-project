// src/components/ui/BestValueBadge/BestValueBadge.tsx
// Badge que sinaliza o melhor valor em uma linha de especificação.

import { Chip, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useTranslation } from 'react-i18next';
import { colorTokens } from '../../../theme/tokens';

export interface BestValueBadgeProps {
  /** true = maior é melhor (potência, torque), false = menor é melhor (consumo, tempo) */
  isHigherBetter: boolean;
}

/**
 * Badge visual que indica o melhor valor em uma linha de especificação.
 * - Verde com seta para cima: maior é melhor (ex: potência)
 * - Azul com seta para baixo: menor é melhor (ex: consumo, tempo 0-100)
 * Adapta as cores automaticamente ao modo claro/escuro.
 */
export function BestValueBadge({ isHigherBetter }: BestValueBadgeProps) {
  const { t } = useTranslation('comparison');
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const label = isHigherBetter
    ? t('bestValue.higher')
    : t('bestValue.lower');

  const ariaLabel = isHigherBetter
    ? t('bestValue.higherAriaLabel')
    : t('bestValue.lowerAriaLabel');

  const icon = isHigherBetter ? (
    <TrendingUpIcon fontSize="small" />
  ) : (
    <TrendingDownIcon fontSize="small" />
  );

  const sx = isHigherBetter
    ? {
        bgcolor: isDark ? colorTokens.bestValueHigherBgDark : colorTokens.bestValueHigherBg,
        color: isDark ? colorTokens.bestValueHigherColorDark : colorTokens.bestValueHigherColor,
        '& .MuiChip-icon': {
          color: isDark ? colorTokens.bestValueHigherColorDark : colorTokens.bestValueHigherColor,
        },
      }
    : {
        bgcolor: isDark ? colorTokens.bestValueLowerBgDark : colorTokens.bestValueLowerBg,
        color: isDark ? colorTokens.bestValueLowerColorDark : colorTokens.bestValueLowerColor,
        '& .MuiChip-icon': {
          color: isDark ? colorTokens.bestValueLowerColorDark : colorTokens.bestValueLowerColor,
        },
      };

  return (
    <Chip
      icon={icon}
      label={label}
      size="small"
      aria-label={ariaLabel}
      sx={{
        fontWeight: 600,
        fontSize: '0.7rem',
        height: 22,
        ...sx,
      }}
    />
  );
}

export default BestValueBadge;
