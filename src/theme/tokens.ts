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

  // ── Contraste do modo escuro ──────────────────────────────────────────────

  /** Texto primário em fundo escuro — contraste >= 4.5:1 contra #121212 */
  darkText: '#E0E0E0',
  /** Texto secundário em fundo escuro — contraste >= 3:1 */
  darkTextSecondary: '#BDBDBD',
  /** Bordas e divisores sutis em modo escuro */
  darkBorder: 'rgba(255, 255, 255, 0.12)',
  /** Bordas de componentes interativos (Select, Input, Card) em modo escuro */
  darkOutline: 'rgba(255, 255, 255, 0.5)',
  /** Bordas de componentes interativos no hover/focus em modo escuro */
  darkOutlineFocus: '#FFFFFF',

  // ── Estado disabled no modo escuro ───────────────────────────────────────

  /** Texto de componentes desabilitados em modo escuro — contraste legível mas visivelmente inativo */
  darkDisabledText: 'rgba(255, 255, 255, 0.38)',
  /** Fundo de componentes desabilitados em modo escuro */
  darkDisabledBg: 'rgba(255, 255, 255, 0.08)',
  /** Borda de componentes desabilitados em modo escuro */
  darkDisabledBorder: 'rgba(255, 255, 255, 0.2)',
} as const;

export type ColorTokens = typeof colorTokens;
