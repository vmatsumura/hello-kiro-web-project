// src/store/useThemeStore.ts
// Store Zustand para preferência de tema (claro/escuro).
// Persiste no localStorage e respeita a preferência do sistema operacional.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark';

interface ThemeStore {
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

/** Detecta a preferência de tema do sistema operacional */
function getSystemTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: getSystemTheme(),
      toggleMode: () =>
        set((state) => ({
          mode: state.mode === 'light' ? 'dark' : 'light',
        })),
      setMode: (mode) => set({ mode }),
    }),
    {
      name: 'auto-compara-theme',
    }
  )
);
