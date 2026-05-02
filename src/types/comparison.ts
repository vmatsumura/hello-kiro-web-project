// src/types/comparison.ts
// Tipos do estado de comparação — usados pelo useComparisonStore.

import type { Vehicle } from './vehicle';

/** Um slot de comparação: pode conter um veículo selecionado ou um erro */
export interface ComparisonSlot {
  vehicle: Vehicle | null;
  /** Mensagem de erro quando o ID da URL não corresponde a nenhum veículo */
  error: string | null;
}

/** Estado completo da comparação ativa */
export interface ComparisonState {
  slots: ComparisonSlot[];
  showOnlyDiffs: boolean;
}

/** Limites de slots */
export const MIN_SLOTS = 2;
export const MAX_SLOTS = 4;
