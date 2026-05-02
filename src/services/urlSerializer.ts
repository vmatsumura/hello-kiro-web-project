// src/services/urlSerializer.ts
// Serialização e desserialização de IDs de veículos nos query params da URL.

import { sanitizeUrlParam } from '../utils/sanitizeUrlParam';

/** Nome do query param usado para os IDs dos veículos */
export const VEHICLE_PARAM = 'v';

/**
 * Serializa uma lista de IDs de veículos como query params.
 * Retorna a string de query (sem o '?'), ex: "v=id1&v=id2"
 *
 * @example
 * buildComparisonUrl(['toyota-corolla-xei-2023', 'honda-civic-touring-2023'])
 * // 'v=toyota-corolla-xei-2023&v=honda-civic-touring-2023'
 */
export function buildComparisonUrl(ids: string[]): string {
  const params = new URLSearchParams();
  for (const id of ids) {
    params.append(VEHICLE_PARAM, id);
  }
  return params.toString();
}

/**
 * Extrai e sanitiza os IDs de veículos de uma string de query params.
 * Ignora IDs inválidos silenciosamente.
 *
 * @param search - String de query params (com ou sem '?'), ex: "?v=id1&v=id2"
 * @returns Array de IDs válidos e sanitizados, na ordem em que aparecem na URL
 *
 * @example
 * parseComparisonUrl('?v=toyota-corolla-xei-2023&v=honda-civic-touring-2023')
 * // ['toyota-corolla-xei-2023', 'honda-civic-touring-2023']
 *
 * parseComparisonUrl('?v=<script>&v=valid-id-2023')
 * // ['valid-id-2023']
 */
export function parseComparisonUrl(search: string): string[] {
  const params = new URLSearchParams(search);
  const rawIds = params.getAll(VEHICLE_PARAM);

  return rawIds
    .map(sanitizeUrlParam)
    .filter((id): id is string => id !== null);
}
