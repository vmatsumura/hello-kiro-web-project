// src/utils/sanitizeUrlParam.ts
// Sanitização de parâmetros de URL para prevenir injeção de valores maliciosos.

/**
 * Padrão válido para IDs de veículos na URL:
 * apenas letras minúsculas, números e hífens, sem hífens no início/fim.
 */
const VALID_ID_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Tamanho máximo permitido para um ID de veículo na URL */
const MAX_ID_LENGTH = 100;

/**
 * Sanitiza e valida um parâmetro de URL que representa um ID de veículo.
 *
 * Retorna o ID normalizado (lowercase, trimmed) se válido,
 * ou `null` se o valor não corresponder ao padrão esperado.
 *
 * @example
 * sanitizeUrlParam('toyota-corolla-xei-2023') // 'toyota-corolla-xei-2023'
 * sanitizeUrlParam('  Toyota-Corolla  ')      // 'toyota-corolla'
 * sanitizeUrlParam('<script>alert(1)</script>') // null
 * sanitizeUrlParam('')                          // null
 */
export function sanitizeUrlParam(raw: string): string | null {
  if (typeof raw !== 'string') return null;

  const normalized = raw.trim().toLowerCase();

  if (normalized.length === 0) return null;
  if (normalized.length > MAX_ID_LENGTH) return null;
  if (!VALID_ID_REGEX.test(normalized)) return null;

  return normalized;
}
