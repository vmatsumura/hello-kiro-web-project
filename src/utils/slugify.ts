// src/utils/slugify.ts
// Utilitários para geração de slugs e IDs de veículos.

/**
 * Converte uma string para formato kebab-case lowercase,
 * removendo acentos, caracteres especiais e espaços extras.
 *
 * @example
 * slugify('Toyota Corolla XEi') // 'toyota-corolla-xei'
 * slugify('HR-V EX-L') // 'hr-v-ex-l'
 */
export function slugify(text: string): string {
  return text
    .normalize('NFD') // decompõe caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // remove diacríticos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove caracteres especiais (exceto hífen)
    .replace(/[\s_]+/g, '-') // substitui espaços e underscores por hífen
    .replace(/-+/g, '-') // colapsa múltiplos hífens
    .replace(/^-+|-+$/g, ''); // remove hífens no início e fim
}

/**
 * Gera o ID único de um veículo no formato:
 * {marca}-{modelo}-{versao}-{ano}
 *
 * @example
 * buildVehicleId('Toyota', 'Corolla', 'XEi', 2023)
 * // 'toyota-corolla-xei-2023'
 */
export function buildVehicleId(
  marca: string,
  modelo: string,
  versao: string,
  ano: number
): string {
  return [slugify(marca), slugify(modelo), slugify(versao), String(ano)].join('-');
}
