// src/hooks/useBestValue.ts
// Determina o índice do melhor valor em uma linha de especificação.

import { useMemo } from 'react';

/**
 * Retorna o índice do melhor valor numérico no array fornecido.
 *
 * - isHigherBetter = true  → retorna o índice do maior valor
 * - isHigherBetter = false → retorna o índice do menor valor
 * - isHigherBetter = null  → retorna null (sem direção definida)
 *
 * Retorna null quando:
 * - isHigherBetter é null (campo não numérico ou sem direção universal)
 * - há menos de 2 valores numéricos não-nulos para comparar
 * - todos os valores numéricos são iguais (empate)
 *
 * @example
 * useBestValue([150, 130, 180], true)   // 2 (180 é o maior)
 * useBestValue([8.5, 7.2, 9.1], false)  // 1 (7.2 é o menor)
 * useBestValue([150, null, 180], true)  // 1 (índice de 180 no array original)
 * useBestValue([150, 150, 150], true)   // null (empate)
 * useBestValue([150, 130], null)        // null (sem direção)
 */
export function useBestValue(
  values: (string | number | boolean | null)[],
  isHigherBetter: boolean | null
): number | null {
  return useMemo(() => {
    if (isHigherBetter === null) return null;

    // Filtra apenas valores numéricos, mantendo o índice original
    const numericEntries = values
      .map((v, i) => ({ value: v, index: i }))
      .filter(
        (entry): entry is { value: number; index: number } =>
          typeof entry.value === 'number'
      );

    if (numericEntries.length < 2) return null;

    const best = isHigherBetter
      ? numericEntries.reduce((a, b) => (a.value >= b.value ? a : b))
      : numericEntries.reduce((a, b) => (a.value <= b.value ? a : b));

    // Verifica empate: se outro entry tem o mesmo valor, não há "melhor"
    const bestValue = best.value;
    const tiedCount = numericEntries.filter((e) => e.value === bestValue).length;
    if (tiedCount > 1) return null;

    return best.index;
  }, [values, isHigherBetter]);
}
