// src/components/ui/SpecTooltip/SpecTooltip.tsx
// Tooltip acessível para rótulos de especificações técnicas.

import { ReactNode } from 'react';
import { Tooltip, Typography, Box } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export interface SpecTooltipProps {
  /** Rótulo visível da especificação */
  label: string;
  /** Descrição exibida no tooltip */
  description: string;
  /** Unidade de medida (ex: 'cv', 'mm', 'km/l') */
  unit?: string;
  children?: ReactNode;
}

/**
 * Envolve o rótulo de uma especificação em um Tooltip acessível.
 * Ativado por hover E por foco de teclado (Tab + Enter/Space).
 *
 * O tooltip exibe a descrição e a unidade de medida do atributo.
 * Usa aria-describedby para associar o tooltip ao elemento de forma acessível.
 */
export function SpecTooltip({ label, description, unit }: SpecTooltipProps) {
  const tooltipContent = (
    <Box>
      <Typography variant="body2" fontWeight={600}>
        {label}
        {unit ? ` (${unit})` : ''}
      </Typography>
      <Typography variant="caption">{description}</Typography>
    </Box>
  );

  return (
    <Tooltip
      title={tooltipContent}
      arrow
      enterTouchDelay={0}
      leaveTouchDelay={3000}
      // Garante ativação por foco de teclado além de hover
      disableFocusListener={false}
      disableHoverListener={false}
      disableTouchListener={false}
    >
      {/* tabIndex={0} torna o elemento focável por teclado */}
      <Box
        component="span"
        tabIndex={0}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          cursor: 'help',
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 2,
            borderRadius: 0.5,
          },
        }}
        aria-label={`${label}${unit ? ` (${unit})` : ''}: ${description}`}
      >
        <Typography
          component="span"
          variant="body2"
          sx={{ fontWeight: 500, color: 'text.secondary' }}
        >
          {label}
        </Typography>
        <InfoOutlinedIcon
          sx={{ fontSize: 14, color: 'text.disabled' }}
          aria-hidden="true"
        />
      </Box>
    </Tooltip>
  );
}

export default SpecTooltip;
