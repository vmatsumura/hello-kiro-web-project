// src/i18n.ts
// Configuração do react-i18next com pt-BR como idioma padrão.

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonPtBR from './locales/pt-BR/common.json';
import comparisonPtBR from './locales/pt-BR/comparison.json';
import vehiclePtBR from './locales/pt-BR/vehicle.json';
import errorsPtBR from './locales/pt-BR/errors.json';

i18n.use(initReactI18next).init({
  lng: 'pt-BR',
  fallbackLng: 'pt-BR',
  defaultNS: 'common',
  resources: {
    'pt-BR': {
      common: commonPtBR,
      comparison: comparisonPtBR,
      vehicle: vehiclePtBR,
      errors: errorsPtBR,
    },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
