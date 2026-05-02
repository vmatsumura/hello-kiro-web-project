// src/hooks/useDiffHighlight.ts
// Determina se uma linha de especificação tem diferença entre os veículos.

import { useMemo } from 'react';

/**
 * Retorna true se os valores fornecidos contêm pelo menos dois valores
 * não-nulos distintos entre si (indicando diferença entre veículos).
 *
 * Valores null são ignorados na comparação — representam dados ausentes,
 * não um valor igual a outro.
 *
 * @example
 * useDiffHighlight([150, 130, 180])  // true  (valores distintos)
 * useDiffHighlight([150, 150, 150])  // false (todos iguais)
 * useDiffHighlight([150, null, 150]) // false (não-nulos são iguais)
 * useDiffHighlight([150, null, 180]) // true  (150 ≠ 180)
 * useDiffHighlight([null, null])     // false (sem dados suficientes)
 */
export function useDiffHighlight(
  values: (string | number | boolean | null)[]
): boolean {
  return useMemo(() => {
    const nonNull = values.filter((v) => v !== null);
    if (nonNull.length < 2) return false;
    return new Set(nonNull.map(String)).size > 1;
  }, [values]);
}
