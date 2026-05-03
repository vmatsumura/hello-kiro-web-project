// src/theme/index.ts
// Tema MUI centralizado — fonte única de verdade para cores, tipografia e espaçamento.

import { createTheme } from '@mui/material/styles';
import { colorTokens } from './tokens';

const baseTheme = createTheme({
  palette: {
    primary: { main: '#1565C0' },
    secondary: { main: '#F57C00' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '2rem', fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.4 },
    h4: { fontSize: '1.25rem', fontWeight: 600 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
  },
  spacing: 8,
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `,
    },
  },
});

export const lightTheme = createTheme(baseTheme, {
  palette: {
    mode: 'light',
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    // Tokens semânticos expostos via palette para uso nos componentes
    diffRow: {
      background: colorTokens.diffRowBgLight,
      border: colorTokens.diffRowBorderLight,
    },
    bestValueHigher: {
      background: colorTokens.bestValueHigherBg,
      color: colorTokens.bestValueHigherColor,
    },
    bestValueLower: {
      background: colorTokens.bestValueLowerBg,
      color: colorTokens.bestValueLowerColor,
    },
  },
});

export const darkTheme = createTheme(baseTheme, {
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: colorTokens.darkText,
      secondary: colorTokens.darkTextSecondary,
    },
    divider: colorTokens.darkBorder,
    diffRow: {
      background: colorTokens.diffRowBgDark,
      border: colorTokens.diffRowBorderDark,
    },
    bestValueHigher: {
      background: colorTokens.bestValueHigherBgDark,
      color: colorTokens.bestValueHigherColorDark,
    },
    bestValueLower: {
      background: colorTokens.bestValueLowerBgDark,
      color: colorTokens.bestValueLowerColorDark,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: colorTokens.darkOutline,
        },
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colorTokens.darkOutlineFocus,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colorTokens.darkOutlineFocus,
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: colorTokens.darkDisabledBorder,
          },
          '&.Mui-disabled': {
            backgroundColor: colorTokens.darkDisabledBg,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: colorTokens.darkDisabledText,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&.Mui-disabled': {
            color: colorTokens.darkDisabledText,
            WebkitTextFillColor: colorTokens.darkDisabledText,
          },
        },
        icon: {
          color: colorTokens.darkText,
          '&.Mui-disabled': {
            color: colorTokens.darkDisabledText,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: colorTokens.darkDisabledText,
            backgroundColor: colorTokens.darkDisabledBg,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: colorTokens.darkDisabledText,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${colorTokens.darkBorder}`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colorTokens.darkBorder,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: colorTokens.darkBorder,
        },
      },
    },
  },
});

export type AppTheme = typeof lightTheme;
