// src/components/ui/DiffToggle/DiffToggle.tsx
// Toggle "Mostrar apenas diferenças" na página de comparação.

import { FormControlLabel, Switch, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface DiffToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/**
 * Controle toggle que alterna entre exibir todas as especificações
 * ou apenas as que diferem entre os veículos comparados.
 *
 * Totalmente operável por teclado (Space para alternar).
 * Possui aria-label descritivo para leitores de tela.
 */
export function DiffToggle({ checked, onChange }: DiffToggleProps) {
  const { t } = useTranslation('comparison');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        px: 2,
        py: 1,
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            color="primary"
            inputProps={{
              'aria-label': t('toggle.ariaLabel'),
            }}
          />
        }
        label={t('toggle.showOnlyDiffs')}
        labelPlacement="start"
        sx={{
          ml: 0,
          gap: 1,
          '& .MuiFormControlLabel-label': {
            fontWeight: 500,
            fontSize: '0.875rem',
          },
        }}
      />
    </Box>
  );
}

export default DiffToggle;
