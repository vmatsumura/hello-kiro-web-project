// src/hooks/useVehicleSelector.ts
// Lógica dos filtros encadeados para seleção de um veículo (Marca → Modelo → Ano → Versão).

import { useState, useMemo, useCallback } from 'react';
import type { Vehicle } from '../types/vehicle';
import { vehicleRepository } from '../services/vehicleRepository';

export interface UseVehicleSelectorReturn {
  // Opções disponíveis para cada filtro
  brands: string[];
  models: string[];
  years: number[];
  versions: string[];

  // Valores selecionados
  selectedBrand: string | null;
  selectedModel: string | null;
  selectedYear: number | null;
  selectedVersion: string | null;

  // Veículo resultante (não-nulo apenas quando todos os filtros estão preenchidos)
  selectedVehicle: Vehicle | null;

  // Setters — cada setter reseta os filtros dependentes
  setSelectedBrand: (brand: string | null) => void;
  setSelectedModel: (model: string | null) => void;
  setSelectedYear: (year: number | null) => void;
  setSelectedVersion: (version: string | null) => void;

  /** Reseta todos os filtros para o estado inicial */
  reset: () => void;
}

/**
 * Hook que gerencia os filtros encadeados de seleção de veículo.
 * Cada filtro só é habilitado após o anterior ser preenchido.
 * Ao alterar um filtro, todos os filtros dependentes são resetados.
 */
export function useVehicleSelector(): UseVehicleSelectorReturn {
  const [selectedBrand, setSelectedBrandState] = useState<string | null>(null);
  const [selectedModel, setSelectedModelState] = useState<string | null>(null);
  const [selectedYear, setSelectedYearState] = useState<number | null>(null);
  const [selectedVersion, setSelectedVersionState] = useState<string | null>(null);

  // Opções derivadas dos dados disponíveis
  const brands = useMemo(() => vehicleRepository.getBrands(), []);

  const models = useMemo(
    () => (selectedBrand ? vehicleRepository.getModelsByBrand(selectedBrand) : []),
    [selectedBrand]
  );

  const years = useMemo(
    () => (selectedModel ? vehicleRepository.getYearsByModel(selectedModel) : []),
    [selectedModel]
  );

  const versions = useMemo(
    () =>
      selectedModel && selectedYear
        ? vehicleRepository.getVersionsByModelAndYear(selectedModel, selectedYear)
        : [],
    [selectedModel, selectedYear]
  );

  // Veículo resultante
  const selectedVehicle = useMemo(
    () =>
      selectedBrand && selectedModel && selectedYear && selectedVersion
        ? vehicleRepository.findBySlug(
            selectedBrand,
            selectedModel,
            selectedVersion,
            selectedYear
          )
        : null,
    [selectedBrand, selectedModel, selectedYear, selectedVersion]
  );

  // Setters com reset em cascata
  const setSelectedBrand = useCallback((brand: string | null) => {
    setSelectedBrandState(brand);
    setSelectedModelState(null);
    setSelectedYearState(null);
    setSelectedVersionState(null);
  }, []);

  const setSelectedModel = useCallback((model: string | null) => {
    setSelectedModelState(model);
    setSelectedYearState(null);
    setSelectedVersionState(null);
  }, []);

  const setSelectedYear = useCallback((year: number | null) => {
    setSelectedYearState(year);
    setSelectedVersionState(null);
  }, []);

  const setSelectedVersion = useCallback((version: string | null) => {
    setSelectedVersionState(version);
  }, []);

  const reset = useCallback(() => {
    setSelectedBrandState(null);
    setSelectedModelState(null);
    setSelectedYearState(null);
    setSelectedVersionState(null);
  }, []);

  return {
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
    reset,
  };
}
