// src/hooks/useComparisonUrl.ts
// Sincronização bidirecional entre a URL (query params) e o useComparisonStore.

import { useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useComparisonStore } from '../store/useComparisonStore';
import { vehicleRepository } from '../services/vehicleRepository';
import { parseComparisonUrl, VEHICLE_PARAM } from '../services/urlSerializer';
import type { Vehicle } from '../types/vehicle';

/**
 * Hook que sincroniza o estado da comparação com os query params da URL.
 *
 * Leitura (URL → Store): ao montar e quando os query params mudam,
 * extrai os IDs, resolve os veículos e atualiza o store.
 *
 * Escrita (Store → URL): expõe syncToUrl() para atualizar a URL
 * quando o usuário adiciona/remove veículos.
 *
 * Redireciona para /selecionar quando a URL tem menos de 2 IDs válidos.
 */
export function useComparisonUrl() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation('errors');
  const { setVehicles, setSlotError } = useComparisonStore();

  // Refs estáveis para evitar re-execução desnecessária do useEffect
  const navigateRef = useRef(navigate);
  const tRef = useRef(t);
  const setVehiclesRef = useRef(setVehicles);
  const setSlotErrorRef = useRef(setSlotError);
  navigateRef.current = navigate;
  tRef.current = t;
  setVehiclesRef.current = setVehicles;
  setSlotErrorRef.current = setSlotError;

  // Leitura: URL → Store
  useEffect(() => {
    const rawSearch = searchParams.toString();
    const validIds = parseComparisonUrl(`?${rawSearch}`);

    if (validIds.length < 2) {
      navigateRef.current('/selecionar', {
        replace: true,
        state: { error: tRef.current('invalidUrl') },
      });
      return;
    }

    const resolved = validIds.map((id) => vehicleRepository.findById(id));
    const validCount = resolved.filter((v) => v !== null).length;

    if (validCount < 2) {
      navigateRef.current('/selecionar', {
        replace: true,
        state: { error: tRef.current('invalidUrl') },
      });
      return;
    }

    setVehiclesRef.current(resolved);

    resolved.forEach((vehicle, index) => {
      if (vehicle === null) {
        setSlotErrorRef.current(index, tRef.current('invalidVehicleId'));
      }
    });
  }, [searchParams]);

  /**
   * Sincroniza a lista de veículos para a URL como query params.
   * Deve ser chamado sempre que o usuário adiciona ou remove um veículo.
   */
  const syncToUrl = useCallback(
    (vehicles: (Vehicle | null)[]) => {
      const validIds = vehicles
        .filter((v): v is Vehicle => v !== null)
        .map((v) => v.identificacao.id);

      if (validIds.length === 0) {
        setSearchParams({});
        return;
      }

      const newParams = new URLSearchParams();
      for (const id of validIds) {
        newParams.append(VEHICLE_PARAM, id);
      }

      setSearchParams(newParams, { replace: false });
    },
    [setSearchParams]
  );

  return { syncToUrl };
}
