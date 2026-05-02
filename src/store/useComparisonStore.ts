// src/store/useComparisonStore.ts
// Store Zustand para o estado da comparação ativa.

import { create } from 'zustand';
import type { Vehicle } from '../types/vehicle';
import type { ComparisonSlot } from '../types/comparison';
import { MIN_SLOTS, MAX_SLOTS } from '../types/comparison';

interface ComparisonStore {
  slots: ComparisonSlot[];
  showOnlyDiffs: boolean;

  // ─── Ações ────────────────────────────────────────────────────────────────

  /** Substitui todos os slots de uma vez (usado ao carregar da URL) */
  setVehicles: (vehicles: (Vehicle | null)[]) => void;

  /** Adiciona um slot vazio (máx. MAX_SLOTS) */
  addSlot: () => void;

  /** Remove o slot no índice informado (mín. MIN_SLOTS) */
  removeSlot: (index: number) => void;

  /** Define o veículo de um slot específico */
  setVehicleInSlot: (index: number, vehicle: Vehicle | null) => void;

  /** Define uma mensagem de erro em um slot (ex: ID inválido na URL) */
  setSlotError: (index: number, error: string | null) => void;

  /** Alterna o toggle "mostrar apenas diferenças" */
  toggleShowOnlyDiffs: () => void;

  /** Reseta o store para o estado inicial */
  reset: () => void;

  // ─── Seletores derivados ──────────────────────────────────────────────────

  /** Retorna apenas os veículos não-nulos dos slots */
  filledVehicles: () => Vehicle[];

  /** Retorna true se há ao menos MIN_SLOTS veículos selecionados */
  canCompare: () => boolean;
}

const initialSlots: ComparisonSlot[] = [
  { vehicle: null, error: null },
  { vehicle: null, error: null },
];

export const useComparisonStore = create<ComparisonStore>()((set, get) => ({
  slots: initialSlots,
  showOnlyDiffs: false,

  setVehicles: (vehicles) =>
    set({
      slots: vehicles.slice(0, MAX_SLOTS).map((v) => ({
        vehicle: v,
        error: null,
      })),
    }),

  addSlot: () =>
    set((state) => {
      if (state.slots.length >= MAX_SLOTS) return state;
      return { slots: [...state.slots, { vehicle: null, error: null }] };
    }),

  removeSlot: (index) =>
    set((state) => {
      if (state.slots.length <= MIN_SLOTS) return state;
      return { slots: state.slots.filter((_, i) => i !== index) };
    }),

  setVehicleInSlot: (index, vehicle) =>
    set((state) => ({
      slots: state.slots.map((slot, i) =>
        i === index ? { vehicle, error: null } : slot
      ),
    })),

  setSlotError: (index, error) =>
    set((state) => ({
      slots: state.slots.map((slot, i) =>
        i === index ? { ...slot, error } : slot
      ),
    })),

  toggleShowOnlyDiffs: () =>
    set((state) => ({ showOnlyDiffs: !state.showOnlyDiffs })),

  reset: () =>
    set({
      slots: [
        { vehicle: null, error: null },
        { vehicle: null, error: null },
      ],
      showOnlyDiffs: false,
    }),

  filledVehicles: () =>
    get()
      .slots.map((s) => s.vehicle)
      .filter((v): v is Vehicle => v !== null),

  canCompare: () =>
    get().slots.filter((s) => s.vehicle !== null).length >= MIN_SLOTS,
}));
