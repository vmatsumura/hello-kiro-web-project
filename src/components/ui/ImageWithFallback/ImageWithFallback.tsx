// src/components/ui/ImageWithFallback/ImageWithFallback.tsx
// Imagem com fallback automático quando src é null ou falha ao carregar.

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { useTranslation } from 'react-i18next';

export interface ImageWithFallbackProps {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  fallbackText?: string;
}

/**
 * Renderiza uma imagem com fallback visual quando:
 * - src é null (dado não disponível)
 * - a imagem falha ao carregar (erro de rede, URL inválida)
 *
 * Sempre define width e height explícitos para evitar CLS.
 * Usa loading="lazy" para carregamento sob demanda.
 */
export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fallbackText,
}: ImageWithFallbackProps) {
  const { t } = useTranslation('common');
  const [hasError, setHasError] = useState(false);

  const showFallback = src === null || hasError;
  const displayFallbackText = fallbackText ?? t('placeholders.photoUnavailable');

  if (showFallback) {
    return (
      <Box
        role="img"
        aria-label={alt}
        sx={{
          width,
          height,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'action.hover',
          borderRadius: 1,
          gap: 1,
          color: 'text.disabled',
        }}
      >
        <BrokenImageIcon sx={{ fontSize: 40 }} aria-hidden="true" />
        <Typography variant="caption" align="center" sx={{ px: 1 }}>
          {displayFallbackText}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      onError={() => setHasError(true)}
      sx={{
        objectFit: 'cover',
        display: 'block',
        borderRadius: 1,
      }}
    />
  );
}

export default ImageWithFallback;
