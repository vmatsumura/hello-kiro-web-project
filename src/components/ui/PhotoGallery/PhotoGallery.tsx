// src/components/ui/PhotoGallery/PhotoGallery.tsx
// Galeria de fotos comparativa — exibe 9 categorias de fotos lado a lado.

import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { Vehicle } from '../../../types/vehicle';
import { CategoriaFoto } from '../../../types/vehicle';
import { ImageWithFallback } from '../ImageWithFallback/ImageWithFallback';

export interface PhotoGalleryProps {
  vehicles: Vehicle[];
}

/** Ordem canônica das categorias de fotos — sempre exibida nesta sequência */
const PHOTO_CATEGORIES: CategoriaFoto[] = [
  CategoriaFoto.FrontalTresDQuartos,
  CategoriaFoto.LateralDireita,
  CategoriaFoto.TraseiraTresDQuartos,
  CategoriaFoto.LateralEsquerda,
  CategoriaFoto.PainelCockpit,
  CategoriaFoto.BancoTraseiro,
  CategoriaFoto.PortaMalasAberto,
  CategoriaFoto.MotorTampaAberta,
  CategoriaFoto.DetalheRodas,
];

const PHOTO_WIDTH = 280;
const PHOTO_HEIGHT = 180;

/**
 * Galeria comparativa de fotos padronizadas.
 * Exibe 9 categorias de fotos, uma linha por categoria,
 * com uma coluna por veículo selecionado.
 *
 * Quando uma foto não está disponível, exibe placeholder com "Foto não disponível".
 * Todas as imagens têm alt descritivo no formato:
 * "{Marca} {Modelo} {Versão} {Ano} — {Descrição da categoria}"
 */
export function PhotoGallery({ vehicles }: PhotoGalleryProps) {
  const { t } = useTranslation('comparison');

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
        {t('blocks.galeria')}
      </Typography>

      <Box sx={{ overflowX: 'auto' }}>
        {PHOTO_CATEGORIES.map((category) => {
          const categoryLabel = t(`photoCategories.${category}`);

          return (
            <Box
              key={category}
              sx={{
                display: 'flex',
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:last-child': { borderBottom: 'none' },
              }}
            >
              {/* Rótulo da categoria */}
              <Box
                sx={{
                  minWidth: 180,
                  px: 2,
                  py: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: 'background.default',
                  borderRight: '1px solid',
                  borderColor: 'divider',
                  flexShrink: 0,
                }}
              >
                <Typography variant="body2" fontWeight={500} color="text.secondary">
                  {categoryLabel}
                </Typography>
              </Box>

              {/* Fotos — uma por veículo */}
              {vehicles.map((vehicle) => {
                const { identificacao, midia } = vehicle;
                const src = midia.fotos[category];
                const fullName = `${identificacao.marca} ${identificacao.modelo} ${identificacao.versao} ${identificacao.anoModelo}`;
                const altText = `${fullName} — ${categoryLabel}`;

                return (
                  <Box
                    key={identificacao.id}
                    sx={{
                      flex: 1,
                      minWidth: PHOTO_WIDTH,
                      p: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRight: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': { borderRight: 'none' },
                    }}
                  >
                    <ImageWithFallback
                      src={src}
                      alt={altText}
                      width={PHOTO_WIDTH}
                      height={PHOTO_HEIGHT}
                    />
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default PhotoGallery;
