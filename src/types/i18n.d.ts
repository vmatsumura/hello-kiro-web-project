// src/types/i18n.d.ts
// Declaração de tipos para os namespaces do react-i18next.
// Garante type-safety nas chaves de tradução em toda a aplicação.

import type commonPtBR from '../locales/pt-BR/common.json';
import type comparisonPtBR from '../locales/pt-BR/comparison.json';
import type vehiclePtBR from '../locales/pt-BR/vehicle.json';
import type errorsPtBR from '../locales/pt-BR/errors.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof commonPtBR;
      comparison: typeof comparisonPtBR;
      vehicle: typeof vehiclePtBR;
      errors: typeof errorsPtBR;
    };
  }
}
