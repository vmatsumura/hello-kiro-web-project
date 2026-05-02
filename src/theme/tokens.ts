// src/theme/tokens.ts
// Tokens de cor semânticos para o portal de comparação.
// Usados pelo tema MUI e pelos componentes de destaque visual.

export const colorTokens = {
  /** Fundo de linha com diferença entre veículos — modo claro */
  diffRowBgLight: '#FFF8E1',
  /** Fundo de linha com diferença entre veículos — modo escuro */
  diffRowBgDark: '#3E3000',

  /** Cor de borda/destaque de linha com diferença — modo claro */
  diffRowBorderLight: '#FFD54F',
  /** Cor de borda/destaque de linha com diferença — modo escuro */
  diffRowBorderDark: '#F9A825',

  /** Badge de melhor valor (maior é melhor) — fundo */
  bestValueHigherBg: '#E8F5E9',
  /** Badge de melhor valor (maior é melhor) — texto/ícone */
  bestValueHigherColor: '#2E7D32',

  /** Badge de melhor valor (menor é melhor) — fundo */
  bestValueLowerBg: '#E3F2FD',
  /** Badge de melhor valor (menor é melhor) — texto/ícone */
  bestValueLowerColor: '#1565C0',

  /** Badge de melhor valor (maior é melhor) — fundo modo escuro */
  bestValueHigherBgDark: '#1B5E20',
  /** Badge de melhor valor (maior é melhor) — texto/ícone modo escuro */
  bestValueHigherColorDark: '#A5D6A7',

  /** Badge de melhor valor (menor é melhor) — fundo modo escuro */
  bestValueLowerBgDark: '#0D47A1',
  /** Badge de melhor valor (menor é melhor) — texto/ícone modo escuro */
  bestValueLowerColorDark: '#90CAF9',
} as const;

export type ColorTokens = typeof colorTokens;
