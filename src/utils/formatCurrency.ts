// src/utils/formatCurrency.ts
// Formatação de valores monetários para exibição no portal.

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Formata um valor numérico como moeda brasileira (R$).
 * Retorna '—' quando o valor é null (dado não disponível).
 *
 * @example
 * formatCurrency(125990)  // 'R$ 125.990'
 * formatCurrency(0)       // 'R$ 0'
 * formatCurrency(null)    // '—'
 */
export function formatCurrency(value: number | null): string {
  if (value === null) return '—';
  return formatter.format(value);
}
