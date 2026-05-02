// src/components/ui/VehicleSelector/VehicleSelector.tsx
// Filtros encadeados para seleção de um veículo: Marca → Modelo → Ano → Versão.

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { Vehicle } from '../../../types/vehicle';
import { useVehicleSelector } from '../../../hooks/useVehicleSelector';
import { vehicleRepository } from '../../../services/vehicleRepository';

export interface VehicleSelectorProps {
  slotIndex: number;
  onVehicleSelected: (vehicle: Vehicle | null) => void;
}

/**
 * Conjunto de filtros encadeados para seleção de um veículo.
 * Cada filtro só é habilitado após o anterior ser preenchido.
 * Chama onVehicleSelected quando todos os filtros estão preenchidos.
 */
export function VehicleSelector({ slotIndex, onVehicleSelected }: VehicleSelectorProps) {
  const { t } = useTranslation('common');
  const {
    brands,
    models,
    years,
    versions,
    selectedBrand,
    selectedModel,
    selectedYear,
    selectedVersion,
    selectedVehicle,
    setSelectedBrand,
    setSelectedModel,
    setSelectedYear,
    setSelectedVersion,
  } = useVehicleSelector();

  // Notifica o pai quando um veículo completo é selecionado
  const handleVersionChange = (version: string) => {
    setSelectedVersion(version);
    // Busca o veículo diretamente — selectedVehicle ainda não reflete a nova versão neste render
    if (selectedBrand && selectedModel && selectedYear) {
      const vehicle = vehicleRepository.findBySlug(
        selectedBrand,
        selectedModel,
        version,
        selectedYear
      );
      onVehicleSelected(vehicle);
    }
  };

  // Notifica o pai quando um filtro é limpo
  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    onVehicleSelected(null);
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    onVehicleSelected(null);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    onVehicleSelected(null);
  };

  const idPrefix = `vehicle-selector-${slotIndex}`;

  return (
    <Box>
      <Stack spacing={2}>
        {/* Marca */}
        <FormControl fullWidth size="small">
          <InputLabel id={`${idPrefix}-brand-label`}>
            {t('placeholders.selectBrand')}
          </InputLabel>
          <Select
            labelId={`${idPrefix}-brand-label`}
            id={`${idPrefix}-brand`}
            value={selectedBrand ?? ''}
            label={t('placeholders.selectBrand')}
            onChange={(e) => handleBrandChange(e.target.value)}
          >
            {brands.map((brand) => (
              <MenuItem key={brand} value={brand}>
                {brand}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Modelo */}
        <FormControl fullWidth size="small" disabled={!selectedBrand}>
          <InputLabel id={`${idPrefix}-model-label`}>
            {t('placeholders.selectModel')}
          </InputLabel>
          <Select
            labelId={`${idPrefix}-model-label`}
            id={`${idPrefix}-model`}
            value={selectedModel ?? ''}
            label={t('placeholders.selectModel')}
            onChange={(e) => handleModelChange(e.target.value)}
          >
            {models.map((model) => (
              <MenuItem key={model} value={model}>
                {model}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Ano */}
        <FormControl fullWidth size="small" disabled={!selectedModel}>
          <InputLabel id={`${idPrefix}-year-label`}>
            {t('placeholders.selectYear')}
          </InputLabel>
          <Select
            labelId={`${idPrefix}-year-label`}
            id={`${idPrefix}-year`}
            value={selectedYear ?? ''}
            label={t('placeholders.selectYear')}
            onChange={(e) => handleYearChange(Number(e.target.value))}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Versão */}
        <FormControl fullWidth size="small" disabled={!selectedYear}>
          <InputLabel id={`${idPrefix}-version-label`}>
            {t('placeholders.selectVersion')}
          </InputLabel>
          <Select
            labelId={`${idPrefix}-version-label`}
            id={`${idPrefix}-version`}
            value={selectedVersion ?? ''}
            label={t('placeholders.selectVersion')}
            onChange={(e) => handleVersionChange(e.target.value)}
          >
            {versions.map((version) => (
              <MenuItem key={version} value={version}>
                {version}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Feedback visual quando veículo está selecionado */}
      {selectedVehicle && (
        <Box
          aria-live="polite"
          role="status"
          sx={{ mt: 1, fontSize: '0.75rem', color: 'success.main', fontWeight: 500 }}
        >
          ✓ {selectedVehicle.identificacao.marca}{' '}
          {selectedVehicle.identificacao.modelo}{' '}
          {selectedVehicle.identificacao.versao}{' '}
          {selectedVehicle.identificacao.anoModelo}
        </Box>
      )}
    </Box>
  );
}

export default VehicleSelector;
