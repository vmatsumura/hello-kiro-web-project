// src/components/sections/SelectionPanel/SelectionPanel.tsx
// Painel de seleção de veículos para comparação (2 a 4 slots).

import { useState } from 'react';
import {
  Box,
  Button,
  Grid2,
  Typography,
  IconButton,
  Paper,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { Vehicle } from '../../../types/vehicle';
import { VehicleSelector } from '../../ui/VehicleSelector/VehicleSelector';
import { useComparisonStore } from '../../../store/useComparisonStore';
import { buildComparisonUrl } from '../../../services/urlSerializer';
import { MAX_SLOTS, MIN_SLOTS } from '../../../types/comparison';

/**
 * Painel de seleção de veículos.
 * Gerencia de 2 a 4 slots de seleção independentes.
 * Navega para /comparar quando ao menos 2 veículos estão selecionados.
 */
export function SelectionPanel() {
  const { t } = useTranslation(['comparison', 'errors', 'common']);
  const navigate = useNavigate();
  const { slots, addSlot, removeSlot, setVehicleInSlot, canCompare } = useComparisonStore();

  const [showMinError, setShowMinError] = useState(false);

  const handleVehicleSelected = (slotIndex: number, vehicle: Vehicle | null) => {
    setVehicleInSlot(slotIndex, vehicle);
    setShowMinError(false);
  };

  const handleCompare = () => {
    if (!canCompare()) {
      setShowMinError(true);
      return;
    }

    const filledVehicles = slots
      .map((s) => s.vehicle)
      .filter((v): v is Vehicle => v !== null);

    const ids = filledVehicles.map((v) => v.identificacao.id);
    const queryString = buildComparisonUrl(ids);
    navigate(`/comparar?${queryString}`);
  };

  const handleAddSlot = () => {
    addSlot();
    setShowMinError(false);
  };

  const handleRemoveSlot = (index: number) => {
    removeSlot(index);
    setShowMinError(false);
  };

  return (
    <Box>
      {/* Mensagem de erro — mínimo de veículos */}
      <Box aria-live="polite" role="status" sx={{ mb: showMinError ? 2 : 0 }}>
        {showMinError && (
          <Alert severity="warning" onClose={() => setShowMinError(false)}>
            {t('errors:minVehicles')}
          </Alert>
        )}
      </Box>

      {/* Grid de slots */}
      <Grid2 container spacing={3}>
        {slots.map((slot, index) => (
          <Grid2 key={index} size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
            <Paper
              variant="outlined"
              sx={{ p: 2, position: 'relative', height: '100%' }}
            >
              {/* Cabeçalho do slot */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('comparison:selection.slot', { number: index + 1 })}
                </Typography>

                {/* Botão de remover slot (apenas se > MIN_SLOTS) */}
                {slots.length > MIN_SLOTS && (
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveSlot(index)}
                    aria-label={`Remover slot ${index + 1}`}
                    color="default"
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              {/* Seletor de veículo */}
              <VehicleSelector
                slotIndex={index}
                onVehicleSelected={(vehicle) => handleVehicleSelected(index, vehicle)}
              />

              {/* Erro de slot (ID inválido da URL) */}
              {slot.error && (
                <Box aria-live="polite" role="alert" sx={{ mt: 1 }}>
                  <Alert severity="error" sx={{ py: 0 }}>
                    {slot.error}
                  </Alert>
                </Box>
              )}
            </Paper>
          </Grid2>
        ))}

        {/* Botão de adicionar slot */}
        {slots.length < MAX_SLOTS && (
          <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                height: '100%',
                minHeight: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderStyle: 'dashed',
                '&:hover': { bgcolor: 'action.hover' },
              }}
              onClick={handleAddSlot}
              role="button"
              tabIndex={0}
              aria-label={t('common:actions.addVehicle')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleAddSlot();
                }
              }}
            >
              <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                <AddIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="body2">
                  {t('common:actions.addVehicle')}
                </Typography>
              </Box>
            </Paper>
          </Grid2>
        )}
      </Grid2>

      {/* Botão comparar */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<CompareArrowsIcon />}
          onClick={handleCompare}
          disabled={!canCompare()}
          aria-disabled={!canCompare()}
          sx={{ px: 6, py: 1.5, fontSize: '1rem' }}
        >
          {t('comparison:actions.compare', { defaultValue: t('common:actions.compare') })}
        </Button>
      </Box>

      {/* Dica de mínimo de veículos */}
      {!canCompare() && (
        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          display="block"
          sx={{ mt: 1 }}
          aria-live="polite"
        >
          {t('comparison:selection.minVehiclesHint')}
        </Typography>
      )}
    </Box>
  );
}

export default SelectionPanel;
