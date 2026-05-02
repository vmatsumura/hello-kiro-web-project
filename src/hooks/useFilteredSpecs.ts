// src/hooks/useFilteredSpecs.ts
// Filtra as especificações de um bloco com base no toggle "mostrar apenas diferenças".

import { useMemo } from 'react';
import type { SpecBlockKey, SpecMetadata, Vehicle } from '../types/vehicle';
import { getSpecsForBlock, getSpecValue } from '../utils/specMetadata';

/**
 * Retorna as especificações de um bloco, opcionalmente filtradas
 * para exibir apenas as que diferem entre os veículos comparados.
 *
 * Quando showOnlyDiffs = false: retorna todas as specs do bloco.
 * Quando showOnlyDiffs = true:  retorna apenas specs onde pelo menos
 *   dois valores não-nulos são distintos entre si.
 *
 * Specs com menos de 2 valores não-nulos são mantidas mesmo com o
 * toggle ativo (dados insuficientes para determinar igualdade).
 *
 * Quando o resultado é vazio (todas as specs são iguais), o SpecBlock
 * deve ocultar o bloco inteiro, incluindo o cabeçalho.
 */
export function useFilteredSpecs(
  blockKey: SpecBlockKey,
  vehicles: Vehicle[],
  showOnlyDiffs: boolean
): SpecMetadata[] {
  const allSpecs = useMemo(() => getSpecsForBlock(blockKey), [blockKey]);

  return useMemo(() => {
    if (!showOnlyDiffs) return allSpecs;

    return allSpecs.filter((spec) => {
      const values = vehicles.map((v) => getSpecValue(v, spec.key));
      const nonNull = values.filter((v) => v !== null);

      // Mantém specs com dados insuficientes para comparar
      if (nonNull.length < 2) return true;

      // Mantém specs onde há pelo menos um par de valores distintos
      return new Set(nonNull.map(String)).size > 1;
    });
  }, [allSpecs, vehicles, showOnlyDiffs]);
}
