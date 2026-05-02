# Documento de Design Tecnico - Portal do Automovel (auto-compara-portal)

## Visao Geral

O Portal do Automovel e uma SPA (Single-Page Application) construida com React 18+, TypeScript strict, Material UI v6 e Vite. Permite ao usuario selecionar de 2 a 4 veiculos e visualizar suas especificacoes tecnicas lado a lado, com destaque visual de diferencas e melhor valor, galeria de fotos comparativa e persistencia da comparacao na URL.

A aplicacao e inteiramente front-end estatica: nao ha backend proprio. Os dados dos veiculos sao arquivos TypeScript estaticos versionados no repositorio em src/data/. A unica integracao externa e a camada de hospedagem (CDN/Vercel), que serve os cabecalhos de seguranca HTTP.

### Principios de Design

- **Dados como codigo**: os dados dos veiculos sao modulos TypeScript tipados, validados em tempo de compilacao.
- **URL como fonte de verdade**: o estado da comparacao ativa e derivado dos query params da URL, nao de estado efemero.
- **Componentes apresentacionais puros**: a logica de negocio (filtragem, calculo de melhor valor, toggle de diferencas) vive em hooks e utilitarios, nao em componentes.
- **Acessibilidade por padrao**: WCAG 2.1 AA e um requisito de arquitetura, nao um afterthought.
- **i18n desde o inicio**: nenhum texto visivel e hardcoded em componentes.

---

## Arquitetura

### Diagrama de Alto Nivel

```mermaid
graph TD
    subgraph Browser
        URL[URL / Query Params]
        subgraph React App
            Router[React Router v6]
            subgraph Pages
                SelectionPage[SelectionPage]
                ComparisonPage[ComparisonPage]
                NotFoundPage[NotFoundPage]
            end
            subgraph Stores[Zustand Stores]
                ComparisonStore[useComparisonStore]
                ThemeStore[useThemeStore]
            end
            subgraph Hooks
                useVehicleSelector
                useComparisonUrl
                useDiffHighlight
                useBestValue
                useFilteredSpecs
            end
            subgraph Services
                vehicleRepository[vehicleRepository]
                urlSerializer[urlSerializer]
            end
            subgraph Data[src/data/]
                toyota[toyota.ts]
                honda[honda.ts]
                nissan[nissan.ts]
            end
        end
    end

    URL <-->|sync| useComparisonUrl
    useComparisonUrl <-->|read/write| ComparisonStore
    ComparisonStore -->|state| SelectionPage
    ComparisonStore -->|state| ComparisonPage
    vehicleRepository -->|Vehicle[]| useVehicleSelector
    vehicleRepository -->|Vehicle[]| ComparisonStore
    toyota & honda & nissan -->|dados| vehicleRepository
```

### Fluxo de Dados Principal

1. O usuario acessa /comparar?v=toyota-corolla-xei-2023&v=honda-civic-touring-2023
2. useComparisonUrl le os query params e chama ehicleRepository.findById() para cada ID
3. Os veiculos validos sao carregados no useComparisonStore
4. ComparisonPage le o store e renderiza os blocos de especificacoes
5. Qualquer mudanca no store (add/remove veiculo) dispara useComparisonUrl que atualiza a URL via useNavigate sem recarregar a pagina

---

## Estrutura de Pastas

```
src/
  assets/
    images/           # Imagens de placeholder e icones SVG
    fonts/            # Fontes locais (se houver)
  components/
    ui/               # Atomos reutilizaveis (sem estado proprio)
      VehicleCard/
        VehicleCard.tsx
        VehicleCard.test.tsx
      SpecRow/
        SpecRow.tsx
        SpecRow.test.tsx
      SpecBlock/
        SpecBlock.tsx
        SpecBlock.test.tsx
      VehicleSelector/
        VehicleSelector.tsx
        VehicleSelector.test.tsx
      DiffToggle/
        DiffToggle.tsx
        DiffToggle.test.tsx
      PhotoGallery/
        PhotoGallery.tsx
        PhotoGallery.test.tsx
      BestValueBadge/
        BestValueBadge.tsx
        BestValueBadge.test.tsx
      ImageWithFallback/
        ImageWithFallback.tsx
        ImageWithFallback.test.tsx
      SpecTooltip/
        SpecTooltip.tsx
        SpecTooltip.test.tsx
    layout/
      AppHeader/
        AppHeader.tsx
        AppHeader.test.tsx
      PageWrapper/
        PageWrapper.tsx
    sections/
      IdentificationBlock/   # Bloco sticky com foto, nome, MSRP, remover
        IdentificationBlock.tsx
        IdentificationBlock.test.tsx
      ComparisonGrid/        # Orquestra todos os SpecBlocks
        ComparisonGrid.tsx
        ComparisonGrid.test.tsx
      SelectionPanel/        # Painel de selecao de veiculos (slots)
        SelectionPanel.tsx
        SelectionPanel.test.tsx
  hooks/
    useVehicleSelector.ts    # Logica dos filtros encadeados
    useVehicleSelector.test.ts
    useComparisonUrl.ts      # Sincronizacao URL <-> store
    useComparisonUrl.test.ts
    useDiffHighlight.ts      # Calcula quais linhas tem diferencas
    useDiffHighlight.test.ts
    useBestValue.ts          # Determina o melhor valor por linha
    useBestValue.test.ts
    useFilteredSpecs.ts      # Aplica o toggle de diferencas
    useFilteredSpecs.test.ts
  pages/
    SelectionPage.tsx
    ComparisonPage.tsx
    NotFoundPage.tsx
  services/
    vehicleRepository.ts     # Acesso aos dados estaticos
    vehicleRepository.test.ts
    urlSerializer.ts         # Serializa/deserializa IDs na URL
    urlSerializer.test.ts
  store/
    useComparisonStore.ts
    useThemeStore.ts
  theme/
    index.ts                 # Tema MUI (light + dark)
    tokens.ts                # Tokens de cor para diferencas e melhor valor
  types/
    vehicle.ts               # Schema central do veiculo
    comparison.ts            # Tipos do estado de comparacao
    i18n.d.ts                # Tipos de namespace i18n
  utils/
    slugify.ts               # Gera o ID slugificado
    slugify.test.ts
    formatCurrency.ts        # Formata MSRP em R$
    formatCurrency.test.ts
    specMetadata.ts          # Metadados de cada especificacao (label, unidade, direcao)
    specMetadata.test.ts
    sanitizeUrlParam.ts      # Valida e sanitiza parametros de URL
    sanitizeUrlParam.test.ts
  locales/
    pt-BR/
      common.json
      comparison.json
      vehicle.json
      errors.json
  mocks/
    handlers.ts              # MSW handlers (para testes)
    server.ts                # MSW server setup
  __tests__/
    components/              # Espelha src/components/
    hooks/                   # Espelha src/hooks/
    services/                # Espelha src/services/
    utils/                   # Espelha src/utils/
  App.tsx
  main.tsx
  setupTests.ts
  i18n.ts                    # Configuracao do react-i18next
```

---

## Componentes e Interfaces

### Hierarquia de Componentes

```
App
  ThemeProvider (MUI)
  I18nextProvider
  Router
    AppHeader
    Routes
      SelectionPage
        PageWrapper
          SelectionPanel
            VehicleSelector (x2-4 slots)
              [MUI Select: Marca]
              [MUI Select: Modelo]
              [MUI Select: Ano]
              [MUI Select: Versao]
            [Botao: Comparar]
      ComparisonPage
        PageWrapper
          IdentificationBlock (sticky)
            VehicleCard (x2-4)
              ImageWithFallback
              [Typography: nome completo]
              [Typography: MSRP]
              [IconButton: remover]
          DiffToggle
          ComparisonGrid
            SpecBlock (x9 blocos)
              [Typography: cabecalho do bloco]
              SpecRow (x N linhas)
                SpecTooltip
                  [Typography: rotulo]
                [celula por veiculo] (x2-4)
                  BestValueBadge (condicional)
          PhotoGallery
            [linha por categoria] (x9)
              ImageWithFallback (x2-4)
      NotFoundPage
```

### Interfaces dos Componentes Principais

```typescript
// VehicleSelector — filtros encadeados para um slot
interface VehicleSelectorProps {
  slotIndex: number;
  onVehicleSelected: (vehicle: Vehicle | null) => void;
}

// VehicleCard — exibicao no bloco de identificacao
interface VehicleCardProps {
  vehicle: Vehicle;
  onRemove: () => void;
}

// SpecBlock — bloco tematico de especificacoes
interface SpecBlockProps {
  blockKey: SpecBlockKey;  // 'motorTransmissao' | 'desempenho' | ...
  vehicles: Vehicle[];
  showOnlyDiffs: boolean;
}

// SpecRow — linha de especificacao
interface SpecRowProps {
  specKey: string;
  label: string;
  unit: string;
  description: string;
  values: (string | number | null)[];
  hasDiff: boolean;
  bestValueIndex: number | null;
  isHigherBetter: boolean | null;  // null = nao numerico
}

// DiffToggle — controle de exibicao de diferencas
interface DiffToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

// ImageWithFallback — imagem com placeholder
interface ImageWithFallbackProps {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  fallbackText?: string;
}

// BestValueBadge — badge de melhor valor
interface BestValueBadgeProps {
  isHigherBetter: boolean;
}
```

---

## Modelos de Dados

### Schema TypeScript Completo — src/types/vehicle.ts

```typescript
// src/types/vehicle.ts

// ─── Enums ────────────────────────────────────────────────────────────────────

export enum TipoCombustivel {
  Gasolina = 'gasolina',
  Etanol = 'etanol',
  Flex = 'flex',
  Diesel = 'diesel',
  Hibrido = 'hibrido',
  HibridoPlugin = 'hibrido-plugin',
  Eletrico = 'eletrico',
  GNV = 'gnv',
}

export enum TipoTransmissao {
  Manual5 = 'manual-5',
  Manual6 = 'manual-6',
  Automatico4 = 'automatico-4',
  Automatico6 = 'automatico-6',
  Automatico8 = 'automatico-8',
  Automatico9 = 'automatico-9',
  Automatico10 = 'automatico-10',
  CVT = 'cvt',
  DCT6 = 'dct-6',
  DCT7 = 'dct-7',
  DCT8 = 'dct-8',
}

export enum TipoTracao {
  Dianteira = 'dianteira',
  Traseira = 'traseira',
  Integral4x4 = '4x4',
  AWD = 'awd',
}

export enum TipoFreio {
  DiscoVentilado = 'disco-ventilado',
  DiscoSolido = 'disco-solido',
  Tambor = 'tambor',
}

export enum TipoArCondicionado {
  Manual = 'manual',
  Digital = 'digital',
  DualZone = 'dual-zone',
  TriZone = 'tri-zone',
  QuadZone = 'quad-zone',
  Ausente = 'ausente',
}

export enum CategoriaFoto {
  FrontalTresDQuartos = 'frontal-3-4',
  LateralDireita = 'lateral-direita',
  TraseiraTresDQuartos = 'traseira-3-4',
  LateralEsquerda = 'lateral-esquerda',
  PainelCockpit = 'painel-cockpit',
  BancoTraseiro = 'banco-traseiro',
  PortaMalasAberto = 'porta-malas-aberto',
  MotorTampaAberta = 'motor-tampa-aberta',
  DetalheRodas = 'detalhe-rodas',
}

// ─── Sub-objetos de Identificacao ─────────────────────────────────────────────

export interface VehicleIdentificacao {
  /** Slug unico: {marca}-{modelo}-{versao}-{ano} ex: toyota-corolla-xei-2023 */
  id: string;
  marca: string;
  modelo: string;
  versao: string;
  anoModelo: number;
  /** Preco sugerido ao consumidor em reais. null se nao disponivel. */
  msrpBrl: number | null;
  /** URL do catalogo ou ficha tecnica oficial utilizada como fonte */
  dataSource: string;
}

// ─── Sub-objetos de Especificacoes ────────────────────────────────────────────

export interface MotorTransmissao {
  tipoCombustivel: TipoCombustivel | null;
  tipoTransmissao: TipoTransmissao | null;
  tipoTracao: TipoTracao | null;
  numeroCilindros: number | null;
  cilindradaCc: number | null;
  potenciaCv: number | null;
  torqueKgfm: number | null;
  /** Potencia do motor eletrico em cv (hibridos/eletricos) */
  potenciaEletricaCv: number | null;
  /** Torque do motor eletrico em kgf.m */
  torqueEletricoKgfm: number | null;
  /** Capacidade da bateria em kWh (hibridos/eletricos) */
  capacidadeBateriaKwh: number | null;
}

export interface Desempenho {
  /** Tempo de 0 a 100 km/h em segundos */
  aceleracao0a100Segundos: number | null;
  velocidadeMaximaKmh: number | null;
  /** Consumo urbano em km/l (ciclo INMETRO) */
  consumoUrbanoKmL: number | null;
  /** Consumo rodoviario em km/l (ciclo INMETRO) */
  consumoRodoviarioKmL: number | null;
  /** Consumo medio em km/l */
  consumoMedioKmL: number | null;
  /** Autonomia eletrica em km (hibridos plugin/eletricos) */
  autonomiaEletricaKm: number | null;
  /** Emissao de CO2 em g/km */
  emissaoCo2GKm: number | null;
}

export interface DimensoesPeso {
  comprimentoMm: number | null;
  larguraMm: number | null;
  alturaMm: number | null;
  distanciaEntreEixosMm: number | null;
  pesoKg: number | null;
  /** Capacidade do porta-malas em litros */
  portaMalasLitros: number | null;
  /** Capacidade do tanque de combustivel em litros */
  tanqueLitros: number | null;
}

export interface RodasPneusFreios {
  /** Tamanho do aro em polegadas */
  aroPolegadas: number | null;
  /** Especificacao do pneu ex: 205/55R16 */
  especificacaoPneu: string | null;
  /** Material da roda: 'liga-leve' | 'aco' */
  materialRoda: 'liga-leve' | 'aco' | null;
  tipoFreiosDianteiros: TipoFreio | null;
  tipoFreiosTraseiros: TipoFreio | null;
  /** Possui ABS */
  abs: boolean | null;
  /** Possui EBD (Electronic Brakeforce Distribution) */
  ebd: boolean | null;
}

export interface SegurancaAtiva {
  /** Numero de airbags */
  airbags: number | null;
  /** Controle de estabilidade (ESC/ESP) */
  controleEstabilidade: boolean | null;
  /** Controle de tracao (TCS) */
  controleTracao: boolean | null;
  /** Assistente de partida em rampa (HSA) */
  assistentePartidaRampa: boolean | null;
  /** Camera de re */
  cameraRe: boolean | null;
  /** Sensor de estacionamento traseiro */
  sensorEstacionamentoTraseiro: boolean | null;
  /** Sensor de estacionamento dianteiro */
  sensorEstacionamentoDianteiro: boolean | null;
  /** Monitor de ponto cego (BSM) */
  monitorPontoCego: boolean | null;
  /** Alerta de saida de faixa (LDA/LKA) */
  alertaSaidaFaixa: boolean | null;
  /** Frenagem autonoma de emergencia (AEB) */
  frenagemAutonomaEmergencia: boolean | null;
  /** Cruise control adaptativo (ACC) */
  cruiseControlAdaptativo: boolean | null;
  /** Piloto automatico convencional */
  pilotoAutomatico: boolean | null;
}

export interface SegurancaPassiva {
  /** Nota NCAP Latin (estrelas, 0-5). null se nao avaliado. */
  notaNcapLatinEstrelas: number | null;
  /** Ano da avaliacao NCAP */
  anoAvaliacaoNcap: number | null;
  /** Cinto de seguranca com pre-tensionador no banco do motorista */
  cintoPreTensionadorMotorista: boolean | null;
  /** Cinto de seguranca com limitador de forca */
  cintoLimitadorForca: boolean | null;
  /** Apoio de cabeca ativo traseiro */
  apoioCabecaAtivoTraseiro: boolean | null;
  /** ISOFIX nos bancos traseiros */
  isofix: boolean | null;
}

export interface TecnologiaConectividade {
  /** Tamanho da tela central em polegadas */
  telaCentralPolegadas: number | null;
  /** Suporte a Apple CarPlay */
  appleCarPlay: boolean | null;
  /** Suporte a Android Auto */
  androidAuto: boolean | null;
  /** Conexao Bluetooth */
  bluetooth: boolean | null;
  /** Numero de portas USB */
  portasUsb: number | null;
  /** Carregamento wireless (Qi) */
  carregamentoWireless: boolean | null;
  /** GPS/Navegacao integrado */
  gpsIntegrado: boolean | null;
  /** Painel de instrumentos digital */
  painelDigital: boolean | null;
  /** Tamanho do painel digital em polegadas */
  painelDigitalPolegadas: number | null;
  /** Head-up display */
  headUpDisplay: boolean | null;
  /** Chave presencial (keyless entry/start) */
  chavePresencial: boolean | null;
  /** Partida por botao */
  partidaBotao: boolean | null;
}

export interface ConfortoConveniencias {
  tipoArCondicionado: TipoArCondicionado | null;
  /** Teto solar */
  tetoSolar: boolean | null;
  /** Teto panoramico */
  tetoPanoramico: boolean | null;
  /** Banco do motorista com ajuste eletrico */
  bancoMotoristAjusteEletrico: boolean | null;
  /** Banco do passageiro com ajuste eletrico */
  bancoPassageiroAjusteEletrico: boolean | null;
  /** Banco com aquecimento */
  bancoAquecido: boolean | null;
  /** Banco com ventilacao */
  bancoVentilado: boolean | null;
  /** Volante com ajuste de altura e profundidade */
  volanteAjusteAlturaProf: boolean | null;
  /** Volante aquecido */
  volanteAquecido: boolean | null;
  /** Retrovisores eletricos */
  retrovisorEletrico: boolean | null;
  /** Retrovisores com rebatimento eletrico */
  retrovisorRebatimentoEletrico: boolean | null;
  /** Vidros eletricos nas 4 portas */
  vidrosEletricos4Portas: boolean | null;
  /** Porta-malas eletrico */
  portaMalasEletrico: boolean | null;
  /** Farol de LED */
  farolLed: boolean | null;
  /** Farol de neblina */
  farolNeblina: boolean | null;
}

export interface CapacidadePassageiros {
  /** Numero de portas */
  portas: number | null;
  /** Numero de passageiros (incluindo motorista) */
  passageiros: number | null;
}

export interface VehicleEspecificacoes {
  motorTransmissao: MotorTransmissao;
  desempenho: Desempenho;
  dimensoesPeso: DimensoesPeso;
  rodasPneusFreios: RodasPneusFreios;
  segurancaAtiva: SegurancaAtiva;
  segurancaPassiva: SegurancaPassiva;
  tecnologiaConectividade: TecnologiaConectividade;
  confortoConveniencias: ConfortoConveniencias;
  capacidadePassageiros: CapacidadePassageiros;
}

// ─── Sub-objeto de Midia ──────────────────────────────────────────────────────

export type FotosPorCategoria = {
  [key in CategoriaFoto]: string | null;
};

export interface VehicleMidia {
  /** Foto principal (usada no bloco de identificacao) */
  fotoPrincipal: string | null;
  fotos: FotosPorCategoria;
}

// ─── Tipo Principal ───────────────────────────────────────────────────────────

export interface Vehicle {
  identificacao: VehicleIdentificacao;
  especificacoes: VehicleEspecificacoes;
  midia: VehicleMidia;
}

// ─── Tipos Auxiliares ─────────────────────────────────────────────────────────

export type SpecBlockKey = keyof VehicleEspecificacoes;

/** Chave de especificacao no formato 'bloco.campo' ex: 'motorTransmissao.potenciaCv' */
export type SpecKey = string;

/** Metadados de uma especificacao para exibicao e calculo */
export interface SpecMetadata {
  key: SpecKey;
  labelKey: string;          // chave i18n
  unit: string;              // ex: 'cv', 'kg', 'mm'
  descriptionKey: string;    // chave i18n para tooltip
  /** true = maior e melhor (potencia), false = menor e melhor (consumo), null = nao numerico */
  isHigherBetter: boolean | null;
}
```

---

## Roteamento com React Router v6

### Definicao de Rotas

```typescript
// src/App.tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const SelectionPage = lazy(() => import('./pages/SelectionPage'));
const ComparisonPage = lazy(() => import('./pages/ComparisonPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<Navigate to="/selecionar" replace />} />
          <Route path="/selecionar" element={<SelectionPage />} />
          <Route path="/comparar" element={<ComparisonPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Estrutura de URLs

| Rota | Descricao |
|---|---|
| / | Redireciona para /selecionar |
| /selecionar | Pagina de selecao de veiculos |
| /comparar?v=toyota-corolla-xei-2023&v=honda-civic-touring-2023 | Pagina de comparacao com 2 veiculos |
| /comparar?v=id1&v=id2&v=id3&v=id4 | Comparacao com ate 4 veiculos |

### Decisao de Design: Query Params vs Path Params

Optamos por **query params** (?v=id1&v=id2) em vez de path params (/comparar/id1/id2) pelos seguintes motivos:

1. **Numero variavel de veiculos** (2-4): query params com chave repetida (=) sao mais naturais para colecoes de tamanho variavel.
2. **Ordem nao importa semanticamente**: a URL /comparar?v=a&v=b e /comparar?v=b&v=a representam a mesma comparacao — facil de normalizar.
3. **Compatibilidade com URLSearchParams**: a API nativa do browser suporta getAll('v') diretamente.
4. **Facilidade de adicionar/remover**: adicionar um veiculo e apenas adicionar um &v=novo-id sem reestruturar o path.

### Sincronizacao URL com Estado

O hook useComparisonUrl e o ponto central de sincronizacao:

```typescript
// src/hooks/useComparisonUrl.ts
export function useComparisonUrl() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { vehicles, setVehicles } = useComparisonStore();

  // Leitura: URL -> Store (na montagem e quando URL muda)
  useEffect(() => {
    const ids = searchParams.getAll('v');
    const sanitizedIds = ids
      .map(id => sanitizeUrlParam(id))
      .filter((id): id is string => id !== null);

    const resolved = sanitizedIds.map(id => vehicleRepository.findById(id));
    setVehicles(resolved);
  }, [searchParams]);

  // Escrita: Store -> URL (quando store muda)
  const syncToUrl = useCallback((vehicles: (Vehicle | null)[]) => {
    const validIds = vehicles
      .filter((v): v is Vehicle => v !== null)
      .map(v => v.identificacao.id);

    setSearchParams(
      validIds.length > 0
        ? validIds.reduce((p, id) => { p.append('v', id); return p; }, new URLSearchParams())
        : {},
      { replace: false }
    );
  }, [setSearchParams]);

  return { syncToUrl };
}
```

---

## Estado Global com Zustand

### Stores

#### useComparisonStore — Estado da Comparacao Ativa

```typescript
// src/store/useComparisonStore.ts
import { create } from 'zustand';
import { Vehicle } from '../types/vehicle';

const MAX_SLOTS = 4;
const MIN_SLOTS = 2;

interface ComparisonSlot {
  vehicle: Vehicle | null;
  error: string | null;  // ex: 'ID invalido' quando URL tem ID inexistente
}

interface ComparisonStore {
  slots: ComparisonSlot[];
  showOnlyDiffs: boolean;

  // Acoes
  setVehicles: (vehicles: (Vehicle | null)[]) => void;
  addSlot: () => void;
  removeSlot: (index: number) => void;
  setVehicleInSlot: (index: number, vehicle: Vehicle | null) => void;
  setSlotError: (index: number, error: string | null) => void;
  toggleShowOnlyDiffs: () => void;
  reset: () => void;

  // Seletores derivados (computados fora do store, mas expostos para conveniencia)
  filledVehicles: () => Vehicle[];
  canCompare: () => boolean;
}

export const useComparisonStore = create<ComparisonStore>()((set, get) => ({
  slots: [
    { vehicle: null, error: null },
    { vehicle: null, error: null },
  ],
  showOnlyDiffs: false,

  setVehicles: (vehicles) => set({
    slots: vehicles.slice(0, MAX_SLOTS).map(v => ({ vehicle: v, error: null })),
  }),

  addSlot: () => set(state => {
    if (state.slots.length >= MAX_SLOTS) return state;
    return { slots: [...state.slots, { vehicle: null, error: null }] };
  }),

  removeSlot: (index) => set(state => {
    if (state.slots.length <= MIN_SLOTS) return state;
    return { slots: state.slots.filter((_, i) => i !== index) };
  }),

  setVehicleInSlot: (index, vehicle) => set(state => ({
    slots: state.slots.map((slot, i) =>
      i === index ? { vehicle, error: null } : slot
    ),
  })),

  setSlotError: (index, error) => set(state => ({
    slots: state.slots.map((slot, i) =>
      i === index ? { ...slot, error } : slot
    ),
  })),

  toggleShowOnlyDiffs: () => set(state => ({
    showOnlyDiffs: !state.showOnlyDiffs,
  })),

  reset: () => set({
    slots: [
      { vehicle: null, error: null },
      { vehicle: null, error: null },
    ],
    showOnlyDiffs: false,
  }),

  filledVehicles: () => get().slots
    .map(s => s.vehicle)
    .filter((v): v is Vehicle => v !== null),

  canCompare: () => get().slots
    .filter(s => s.vehicle !== null).length >= MIN_SLOTS,
}));
```

#### useThemeStore — Preferencia de Tema

```typescript
// src/store/useThemeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      toggleMode: () => set(state => ({
        mode: state.mode === 'light' ? 'dark' : 'light',
      })),
    }),
    { name: 'auto-compara-theme' }
  )
);
```

### Hooks de Logica de Negocio

#### useVehicleSelector — Filtros Encadeados

```typescript
// src/hooks/useVehicleSelector.ts
export function useVehicleSelector(slotIndex: number) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  const brands = useMemo(() => vehicleRepository.getBrands(), []);
  const models = useMemo(
    () => selectedBrand ? vehicleRepository.getModelsByBrand(selectedBrand) : [],
    [selectedBrand]
  );
  const years = useMemo(
    () => selectedModel ? vehicleRepository.getYearsByModel(selectedModel) : [],
    [selectedModel]
  );
  const versions = useMemo(
    () => (selectedModel && selectedYear)
      ? vehicleRepository.getVersionsByModelAndYear(selectedModel, selectedYear)
      : [],
    [selectedModel, selectedYear]
  );

  const selectedVehicle = useMemo(
    () => (selectedBrand && selectedModel && selectedYear && selectedVersion)
      ? vehicleRepository.findBySlug(selectedBrand, selectedModel, selectedVersion, selectedYear)
      : null,
    [selectedBrand, selectedModel, selectedYear, selectedVersion]
  );

  return {
    brands, models, years, versions,
    selectedBrand, selectedModel, selectedYear, selectedVersion,
    selectedVehicle,
    setSelectedBrand, setSelectedModel, setSelectedYear, setSelectedVersion,
  };
}
```

#### useDiffHighlight — Calculo de Diferencas

```typescript
// src/hooks/useDiffHighlight.ts
export function useDiffHighlight(values: (string | number | null)[]) {
  return useMemo(() => {
    const nonNull = values.filter(v => v !== null);
    if (nonNull.length < 2) return false;
    return new Set(nonNull.map(String)).size > 1;
  }, [values]);
}
```

#### useBestValue — Calculo do Melhor Valor

```typescript
// src/hooks/useBestValue.ts
export function useBestValue(
  values: (string | number | null)[],
  isHigherBetter: boolean | null
): number | null {
  return useMemo(() => {
    if (isHigherBetter === null) return null;
    const numericValues = values.map((v, i) => ({ value: v, index: i }))
      .filter((item): item is { value: number; index: number } =>
        typeof item.value === 'number'
      );
    if (numericValues.length < 2) return null;

    const best = isHigherBetter
      ? numericValues.reduce((a, b) => a.value > b.value ? a : b)
      : numericValues.reduce((a, b) => a.value < b.value ? a : b);

    return best.index;
  }, [values, isHigherBetter]);
}
```

#### useFilteredSpecs — Aplicacao do Toggle de Diferencas

```typescript
// src/hooks/useFilteredSpecs.ts
export function useFilteredSpecs(
  blockKey: SpecBlockKey,
  vehicles: Vehicle[],
  showOnlyDiffs: boolean
): SpecMetadata[] {
  const allSpecs = useMemo(() => getSpecsForBlock(blockKey), [blockKey]);

  return useMemo(() => {
    if (!showOnlyDiffs) return allSpecs;
    return allSpecs.filter(spec => {
      const values = vehicles.map(v => getSpecValue(v, spec.key));
      const nonNull = values.filter(v => v !== null);
      if (nonNull.length < 2) return true; // manter se nao ha dados suficientes para comparar
      return new Set(nonNull.map(String)).size > 1;
    });
  }, [allSpecs, vehicles, showOnlyDiffs]);
}
```

---

## Internacionalizacao (i18n) com react-i18next

### Configuracao

```typescript
// src/i18n.ts
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
```

### Namespaces e Estrutura dos Arquivos de Traducao

#### common.json — Textos gerais da interface

```json
{
  "app": {
    "title": "Portal do Automovel",
    "tagline": "Compare veiculos lado a lado"
  },
  "actions": {
    "compare": "Comparar",
    "remove": "Remover veiculo",
    "addVehicle": "Adicionar veiculo",
    "backToSelection": "Voltar a selecao"
  },
  "placeholders": {
    "photoUnavailable": "Foto nao disponivel",
    "dataUnavailable": "—",
    "selectBrand": "Selecione a marca",
    "selectModel": "Selecione o modelo",
    "selectYear": "Selecione o ano",
    "selectVersion": "Selecione a versao"
  },
  "theme": {
    "toggleDark": "Ativar modo escuro",
    "toggleLight": "Ativar modo claro"
  }
}
```

#### comparison.json — Textos da pagina de comparacao

```json
{
  "blocks": {
    "motorTransmissao": "Motor e Transmissao",
    "desempenho": "Desempenho",
    "dimensoesPeso": "Dimensoes e Peso",
    "rodasPneusFreios": "Rodas, Pneus e Freios",
    "segurancaAtiva": "Seguranca Ativa",
    "segurancaPassiva": "Seguranca Passiva",
    "tecnologiaConectividade": "Tecnologia e Conectividade",
    "confortoConveniencias": "Conforto e Conveniencias",
    "capacidadePassageiros": "Capacidade de Passageiros",
    "galeria": "Galeria de Fotos"
  },
  "toggle": {
    "showOnlyDiffs": "Mostrar apenas diferencas",
    "ariaLabel": "Alternar exibicao: mostrar apenas especificacoes diferentes entre os veiculos"
  },
  "bestValue": {
    "higher": "Melhor valor (maior)",
    "lower": "Melhor valor (menor)"
  },
  "photoCategories": {
    "frontal-3-4": "Vista frontal (3/4 dianteiro)",
    "lateral-direita": "Vista lateral direita",
    "traseira-3-4": "Vista traseira (3/4 traseiro)",
    "lateral-esquerda": "Vista lateral esquerda",
    "painel-cockpit": "Painel e cockpit do motorista",
    "banco-traseiro": "Banco traseiro",
    "porta-malas-aberto": "Porta-malas aberto",
    "motor-tampa-aberta": "Motor com tampa aberta",
    "detalhe-rodas": "Detalhe das rodas"
  }
}
```

#### ehicle.json — Rotulos de especificacoes e enums

```json
{
  "specs": {
    "motorTransmissao": {
      "tipoCombustivel": { "label": "Combustivel", "unit": "", "description": "Tipo de combustivel utilizado pelo motor" },
      "tipoTransmissao": { "label": "Transmissao", "unit": "", "description": "Tipo de caixa de cambio" },
      "tipoTracao": { "label": "Tracao", "unit": "", "description": "Sistema de tracao do veiculo" },
      "numeroCilindros": { "label": "Cilindros", "unit": "", "description": "Numero de cilindros do motor" },
      "cilindradaCc": { "label": "Cilindrada", "unit": "cc", "description": "Volume total dos cilindros em centimetros cubicos" },
      "potenciaCv": { "label": "Potencia", "unit": "cv", "description": "Potencia maxima do motor em cavalos-vapor" },
      "torqueKgfm": { "label": "Torque", "unit": "kgf.m", "description": "Torque maximo do motor em quilograma-forca metro" }
    },
    "desempenho": {
      "aceleracao0a100Segundos": { "label": "0-100 km/h", "unit": "s", "description": "Tempo de aceleracao de 0 a 100 km/h em segundos" },
      "velocidadeMaximaKmh": { "label": "Vel. maxima", "unit": "km/h", "description": "Velocidade maxima do veiculo" },
      "consumoUrbanoKmL": { "label": "Consumo urbano", "unit": "km/l", "description": "Consumo de combustivel em ciclo urbano (INMETRO)" },
      "consumoRodoviarioKmL": { "label": "Consumo rodoviario", "unit": "km/l", "description": "Consumo de combustivel em ciclo rodoviario (INMETRO)" }
    }
  },
  "enums": {
    "tipoCombustivel": {
      "gasolina": "Gasolina",
      "etanol": "Etanol",
      "flex": "Flex (Gasolina/Etanol)",
      "diesel": "Diesel",
      "hibrido": "Hibrido",
      "hibrido-plugin": "Hibrido Plugin",
      "eletrico": "Eletrico",
      "gnv": "GNV"
    },
    "tipoTransmissao": {
      "manual-5": "Manual 5 marchas",
      "manual-6": "Manual 6 marchas",
      "automatico-6": "Automatico 6 marchas",
      "cvt": "CVT",
      "dct-7": "DCT 7 marchas"
    }
  }
}
```

#### errors.json — Mensagens de erro

```json
{
  "minVehicles": "Selecione ao menos 2 veiculos para comparar.",
  "invalidVehicleId": "Veiculo nao encontrado. Selecione outro veiculo.",
  "invalidUrl": "O link de comparacao e invalido. Redirecionando para a selecao...",
  "generic": "Ocorreu um erro inesperado. Tente novamente."
}
```

### Uso nos Componentes

```typescript
// Exemplo de uso em componente
import { useTranslation } from 'react-i18next';

function DiffToggle({ checked, onChange }: DiffToggleProps) {
  const { t } = useTranslation('comparison');
  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={e => onChange(e.target.checked)} />}
      label={t('toggle.showOnlyDiffs')}
      aria-label={t('toggle.ariaLabel')}
    />
  );
}
```

---

## Decisoes de Design

### 1. Toggle de Diferencas — Como Funciona

O toggle "Mostrar apenas diferencas" e implementado em dois niveis:

**Nivel de linha** (useFilteredSpecs): para cada SpecMetadata de um bloco, calcula se os valores dos veiculos selecionados diferem. Se showOnlyDiffs === true, filtra as specs onde todos os valores nao-nulos sao iguais.

**Nivel de bloco** (SpecBlock): recebe a lista filtrada de specs. Se a lista estiver vazia (todas as specs do bloco sao iguais), o bloco inteiro (incluindo o cabecalho <h3>) nao e renderizado.

```typescript
// SpecBlock.tsx — logica de ocultacao do bloco inteiro
function SpecBlock({ blockKey, vehicles, showOnlyDiffs }: SpecBlockProps) {
  const filteredSpecs = useFilteredSpecs(blockKey, vehicles, showOnlyDiffs);
  if (filteredSpecs.length === 0) return null;  // oculta o bloco inteiro
  // ...renderiza o bloco
}
```

### 2. Calculo de Melhor Valor

A direcao do "melhor valor" (maior ou menor) e definida no campo isHigherBetter de cada SpecMetadata em src/utils/specMetadata.ts. Isso centraliza a logica de negocio e evita que os componentes precisem saber qual direcao e melhor para cada atributo.

Exemplos de configuracao:

| Especificacao | isHigherBetter |
|---|---|
| potenciaCv | 	rue (maior potencia e melhor) |
| 	orqueKgfm | 	rue |
| elocidadeMaximaKmh | 	rue |
| celeracao0a100Segundos | alse (menor tempo e melhor) |
| consumoUrbanoKmL | 	rue (maior km/l e melhor) |
| emissaoCo2GKm | alse (menor emissao e melhor) |
| pesoKg | 
ull (nao ha "melhor" universal) |
| 	ipoCombustivel | 
ull (nao numerico) |

### 3. Sincronizacao URL com Estado

A URL e a **fonte de verdade** para a comparacao ativa. O fluxo e unidirecional:

`
URL (query params) -> useComparisonUrl -> useComparisonStore -> Componentes
                                       <- useComparisonUrl <- useComparisonStore (ao mudar)
`

Quando o usuario adiciona ou remove um veiculo, o store e atualizado primeiro, e o hook useComparisonUrl observa o store e chama setSearchParams para sincronizar a URL. Isso garante que a URL sempre reflita o estado atual sem recarregar a pagina (React Router usa history.pushState internamente).

### 4. Validacao e Sanitizacao de Parametros de URL

Antes de qualquer lookup no repositorio, os IDs da URL passam por sanitizeUrlParam:

```typescript
// src/utils/sanitizeUrlParam.ts
const VALID_ID_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function sanitizeUrlParam(raw: string): string | null {
  const trimmed = raw.trim().toLowerCase();
  if (!VALID_ID_REGEX.test(trimmed)) return null;
  if (trimmed.length > 100) return null;  // limite de tamanho
  return trimmed;
}
```

Apos a sanitizacao de formato, o ID e verificado contra o repositorio. Se nao existir, o slot recebe um erro em vez de lancar uma excecao.

### 5. Bloco de Identificacao Sticky

O bloco de identificacao usa position: sticky via MUI sx prop:

```typescript
<Box
  component="header"
  sx={{
    position: 'sticky',
    top: 0,
    zIndex: theme => theme.zIndex.appBar - 1,
    bgcolor: 'background.paper',
    borderBottom: 1,
    borderColor: 'divider',
    boxShadow: 2,
  }}
>
```

O zIndex e definido abaixo do AppBar para que o header da aplicacao fique acima do bloco sticky durante o scroll.

### 6. Repositorio de Dados — Acesso Tipado

O ehicleRepository e um modulo singleton que agrega todos os dados estaticos e expoe metodos de consulta tipados:

```typescript
// src/services/vehicleRepository.ts
import { toyotaVehicles } from '../data/toyota';
import { hondaVehicles } from '../data/honda';
import { nissanVehicles } from '../data/nissan';

const ALL_VEHICLES: Vehicle[] = [
  ...toyotaVehicles,
  ...hondaVehicles,
  ...nissanVehicles,
];

export const vehicleRepository = {
  findById: (id: string): Vehicle | null =>
    ALL_VEHICLES.find(v => v.identificacao.id === id) ?? null,

  getBrands: (): string[] =>
    [...new Set(ALL_VEHICLES.map(v => v.identificacao.marca))].sort(),

  getModelsByBrand: (brand: string): string[] =>
    [...new Set(
      ALL_VEHICLES
        .filter(v => v.identificacao.marca === brand)
        .map(v => v.identificacao.modelo)
    )].sort(),

  getYearsByModel: (model: string): number[] =>
    [...new Set(
      ALL_VEHICLES
        .filter(v => v.identificacao.modelo === model)
        .map(v => v.identificacao.anoModelo)
    )].sort((a, b) => b - a),  // mais recente primeiro

  getVersionsByModelAndYear: (model: string, year: number): string[] =>
    ALL_VEHICLES
      .filter(v => v.identificacao.modelo === model && v.identificacao.anoModelo === year)
      .map(v => v.identificacao.versao)
      .sort(),

  findBySlug: (brand: string, model: string, version: string, year: number): Vehicle | null =>
    ALL_VEHICLES.find(v =>
      v.identificacao.marca === brand &&
      v.identificacao.modelo === model &&
      v.identificacao.versao === version &&
      v.identificacao.anoModelo === year
    ) ?? null,
};
```

---

## Propriedades de Corretude

*Uma propriedade e uma caracteristica ou comportamento que deve ser verdadeiro em todas as execucoes validas de um sistema — essencialmente, uma declaracao formal sobre o que o sistema deve fazer. Propriedades servem como ponte entre especificacoes legiveis por humanos e garantias de corretude verificaveis por maquina.*

### Reflexao sobre Redundancia

Antes de listar as propriedades finais, identificamos as seguintes redundancias no prework:

- **1.3, 1.4 e 1.5** (filtragem de modelos, anos e versoes) sao instancias do mesmo padrao de filtragem encadeada. Podem ser combinadas em uma unica propriedade de filtragem.
- **5.1 e 5.2** (diferenca visual presente/ausente) sao complementares e podem ser expressas como uma unica propriedade bidirecional.
- **6.2 e 6.4** (toggle oculta linhas e blocos) sao relacionadas — a ocultacao de blocos e consequencia da ocultacao de todas as linhas. Mantemos separadas pois testam niveis diferentes (linha vs. bloco).
- **2.1 e 2.2** (serializacao e round-trip de URL) — a 2.2 (round-trip) subsume a 2.1. Mantemos apenas a round-trip.

### Propriedades Finais

---

### Propriedade 1: Filtragem Encadeada Retorna Apenas Resultados Pertencentes ao Filtro Pai

*Para qualquer* marca M selecionada, todos os modelos retornados por getModelsByBrand(M) devem ter marca === M. Para qualquer modelo M selecionado, todos os anos retornados por getYearsByModel(M) devem corresponder a veiculos com modelo === M. Para qualquer combinacao (modelo M, ano A), todas as versoes retornadas por getVersionsByModelAndYear(M, A) devem corresponder a veiculos com modelo === M e noModelo === A.

**Valida: Requisitos 1.3, 1.4, 1.5**

---

### Propriedade 2: Numero de Slots Sempre Entre 2 e 4

*Para qualquer* sequencia de operacoes de adicao e remocao de slots, o numero de slots no store deve ser sempre maior ou igual a 2 e menor ou igual a 4.

**Valida: Requisito 1.1**

---

### Propriedade 3: Remocao de Slot Preserva os Demais

*Para qualquer* estado com N slots preenchidos (2 <= N <= 4), remover o slot no indice i deve preservar todos os outros slots com seus veiculos intactos, sem alterar seus indices relativos.

**Valida: Requisito 1.7**

---

### Propriedade 4: Botao de Comparar Habilitado se e Somente se ha >= 2 Veiculos

*Para qualquer* estado do store, canCompare() deve retornar 	rue se e somente se o numero de slots com veiculo nao-nulo for maior ou igual a 2.

**Valida: Requisitos 1.8, 1.9**

---

### Propriedade 5: Round-Trip de Serializacao de URL

*Para qualquer* lista valida de veiculos V (2 <= |V| <= 4), serializar V para query params e depois parsear os query params deve retornar os mesmos IDs de veiculos, na mesma ordem.

**Valida: Requisitos 2.1, 2.2, 2.5**

---

### Propriedade 6: Sanitizacao de Parametros de URL Rejeita Entradas Invalidas

*Para qualquer* string arbitraria que nao corresponda ao padrao ^[a-z0-9]+(-[a-z0-9]+)*$ ou que exceda 100 caracteres, sanitizeUrlParam deve retornar 
ull.

**Valida: Requisitos 2.3, 15.4**

---

### Propriedade 7: Bloco de Identificacao Renderiza Todos os Veiculos Selecionados

*Para qualquer* lista de N veiculos (2 <= N <= 4), o IdentificationBlock deve renderizar exatamente N cards, cada um contendo o nome completo, MSRP e botao de remocao do veiculo correspondente.

**Valida: Requisito 3.1**

---

### Propriedade 8: Cada Bloco de Especificacoes Renderiza Exatamente N Colunas

*Para qualquer* lista de N veiculos (2 <= N <= 4), cada SpecBlock deve renderizar exatamente N colunas de dados, uma por veiculo.

**Valida: Requisito 4.2**

---

### Propriedade 9: Campos Nulos Exibem Travessao

*Para qualquer* veiculo V e qualquer campo de especificacao com valor 
ull, a celula correspondente na SpecRow deve exibir o texto "—".

**Valida: Requisito 4.3**

---

### Propriedade 10: Diferenca Visual Presente se e Somente se Valores Diferem

*Para qualquer* SpecRow com N valores (N >= 2), a diferenca visual deve estar presente se e somente se existe pelo menos um par de valores nao-nulos que sao diferentes entre si.

**Valida: Requisitos 5.1, 5.2**

---

### Propriedade 11: Melhor Valor Calculado Corretamente por Direcao

*Para qualquer* conjunto de valores numericos e direcao isHigherBetter, useBestValue deve retornar o indice do maior valor quando isHigherBetter === true e o indice do menor valor quando isHigherBetter === false. Deve retornar 
ull quando isHigherBetter === null ou quando ha menos de 2 valores numericos.

**Valida: Requisitos 5.3, 5.4**

---

### Propriedade 12: Toggle Ativo Oculta Apenas Linhas com Valores Identicos

*Para qualquer* estado de comparacao com toggle ativo, todas as SpecRow visiveis devem ter pelo menos um par de valores nao-nulos diferentes entre si. Nenhuma linha com todos os valores iguais deve ser visivel.

**Valida: Requisito 6.2**

---

### Propriedade 13: Toggle Ativo Oculta Bloco Inteiro Quando Todas as Linhas Sao Identicas

*Para qualquer* SpecBlock onde todas as especificacoes do bloco possuem valores identicos entre os veiculos comparados, com o toggle ativo, o bloco inteiro (incluindo seu cabecalho) nao deve ser renderizado.

**Valida: Requisito 6.4**

---

### Propriedade 14: Toggle Desativado Restaura Todas as Linhas

*Para qualquer* estado de comparacao, ativar e depois desativar o toggle deve resultar no mesmo conjunto de linhas visiveis que o estado inicial (sem toggle).

**Valida: Requisito 6.3**

---

### Propriedade 15: Alt das Imagens da Galeria Segue o Padrao Definido

*Para qualquer* veiculo V e categoria de foto C, o atributo lt da imagem correspondente na galeria deve ser igual a "{marca} {modelo} {versao} {ano} — {descricao da categoria}".

**Valida: Requisito 7.4**

---

### Propriedade 16: ID do Veiculo e Derivavel dos Campos de Identificacao

*Para qualquer* veiculo V no repositorio, V.identificacao.id deve ser igual a slugify(V.identificacao.marca + '-' + V.identificacao.modelo + '-' + V.identificacao.versao + '-' + V.identificacao.anoModelo) e deve corresponder ao padrao ^[a-z0-9]+(-[a-z0-9]+)*$.

**Valida: Requisito 9.2**

---

### Propriedade 17: Nenhum Campo do Schema e undefined

*Para qualquer* veiculo V no repositorio, nenhum campo de V.especificacoes deve ser undefined — campos ausentes devem ser explicitamente 
ull.

**Valida: Requisito 9.4**

---

## Tratamento de Erros

### Categorias de Erro

| Categoria | Origem | Tratamento |
|---|---|---|
| ID invalido na URL | Parametro de URL nao corresponde a nenhum veiculo | Exibe erro no slot, permite substituicao |
| URL com < 2 IDs validos | URL malformada ou IDs inexistentes | Redireciona para /selecionar com mensagem |
| Comparacao com < 2 veiculos | Usuario remove veiculo deixando apenas 1 | Redireciona para /selecionar com slots pre-preenchidos |
| Foto nao disponivel | Campo otoPrincipal ou otos[categoria] e 
ull | Exibe ImageWithFallback com texto "Foto nao disponivel" |
| Dado nao disponivel | Campo de especificacao e 
ull | Exibe "—" na celula |
| Erro de renderizacao | Excecao em um componente de secao | ErrorBoundary captura e exibe SectionError |

### Estrategia de Error Boundaries

Cada secao principal da pagina de comparacao e envolvida em um ErrorBoundary independente, para que um erro em um bloco nao derrube a pagina inteira:

```typescript
// ComparisonPage.tsx
<ErrorBoundary fallback={<SectionError name={t('blocks.motorTransmissao')} />}>
  <SpecBlock blockKey="motorTransmissao" vehicles={vehicles} showOnlyDiffs={showOnlyDiffs} />
</ErrorBoundary>
```

### Tratamento de URL Invalida

```typescript
// useComparisonUrl.ts — tratamento de IDs invalidos
useEffect(() => {
  const rawIds = searchParams.getAll('v');
  const sanitized = rawIds.map(sanitizeUrlParam).filter(Boolean) as string[];

  if (sanitized.length < 2) {
    navigate('/selecionar', {
      replace: true,
      state: { error: t('errors:invalidUrl') },
    });
    return;
  }

  const resolved = sanitized.map(id => {
    const vehicle = vehicleRepository.findById(id);
    return { vehicle, error: vehicle ? null : t('errors:invalidVehicleId') };
  });

  setSlots(resolved);
}, [searchParams]);
```

### Mensagens de Erro com aria-live

Todas as mensagens de erro dinamicas usam ria-live="polite" para serem anunciadas por leitores de tela:

```typescript
<Box aria-live="polite" role="status">
  {error && (
    <Alert severity="error" sx={{ mt: 1 }}>
      {error}
    </Alert>
  )}
</Box>
```

---

## Estrategia de Testes

### Abordagem Dual: Testes de Exemplo + Testes de Propriedade

O portal utiliza duas camadas complementares de testes:

- **Testes de exemplo** (RTL + Vitest): verificam comportamentos especificos, casos de borda e integracoes entre componentes.
- **Testes de propriedade** (fast-check + Vitest): verificam propriedades universais que devem valer para qualquer entrada valida.

### Biblioteca de Testes de Propriedade

Utilizamos **fast-check** como biblioteca de property-based testing para TypeScript/JavaScript. Cada teste de propriedade e configurado com minimo de 100 iteracoes.

```bash
npm install --save-dev fast-check
```

### Configuracao do Vitest

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      thresholds: {
        'src/components/ui/**': { lines: 85, functions: 85 },
        'src/hooks/**': { lines: 90, functions: 90 },
        'src/utils/**': { lines: 95, functions: 95 },
        'src/services/**': { lines: 80, functions: 80 },
      },
    },
  },
});
```

### Metas de Cobertura por Camada

| Camada | Linhas | Funcoes |
|---|---|---|
| src/components/ui/ | 85%+ | 85%+ |
| src/hooks/ | 90%+ | 90%+ |
| src/utils/ | 95%+ | 95%+ |
| src/services/ | 80%+ | 80%+ |
| src/components/sections/ | 70%+ | 70%+ |

### Exemplos de Testes de Propriedade

#### Propriedade 1 — Filtragem Encadeada

```typescript
// Feature: auto-compara-portal, Property 1: filtragem encadeada retorna apenas resultados pertencentes ao filtro pai
import fc from 'fast-check';
import { vehicleRepository } from '../services/vehicleRepository';

it('getModelsByBrand retorna apenas modelos da marca selecionada', () => {
  const brands = vehicleRepository.getBrands();
  fc.assert(
    fc.property(fc.constantFrom(...brands), (brand) => {
      const models = vehicleRepository.getModelsByBrand(brand);
      return models.every(model =>
        vehicleRepository.getVersionsByModelAndYear(model, 2023).length >= 0
      );
    }),
    { numRuns: 100 }
  );
});
```

#### Propriedade 5 — Round-Trip de URL

```typescript
// Feature: auto-compara-portal, Property 5: round-trip de serializacao de URL
import fc from 'fast-check';
import { buildComparisonUrl, parseComparisonUrl } from '../services/urlSerializer';

it('serializar e parsear URL retorna os mesmos IDs', () => {
  const allIds = vehicleRepository.getAllIds();
  fc.assert(
    fc.property(
      fc.array(fc.constantFrom(...allIds), { minLength: 2, maxLength: 4 }),
      (ids) => {
        const url = buildComparisonUrl(ids);
        const parsed = parseComparisonUrl(url);
        return JSON.stringify(ids) === JSON.stringify(parsed);
      }
    ),
    { numRuns: 100 }
  );
});
```

#### Propriedade 6 — Sanitizacao de URL

```typescript
// Feature: auto-compara-portal, Property 6: sanitizacao rejeita entradas invalidas
import fc from 'fast-check';
import { sanitizeUrlParam } from '../utils/sanitizeUrlParam';

it('sanitizeUrlParam retorna null para strings invalidas', () => {
  fc.assert(
    fc.property(
      fc.string().filter(s => !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s.trim().toLowerCase())),
      (invalidInput) => sanitizeUrlParam(invalidInput) === null
    ),
    { numRuns: 200 }
  );
});
```

#### Propriedade 11 — Melhor Valor

```typescript
// Feature: auto-compara-portal, Property 11: melhor valor calculado corretamente por direcao
import fc from 'fast-check';
import { renderHook } from '@testing-library/react';
import { useBestValue } from '../hooks/useBestValue';

it('useBestValue retorna indice do maior valor quando isHigherBetter=true', () => {
  fc.assert(
    fc.property(
      fc.array(fc.float({ min: 0, max: 1000, noNaN: true }), { minLength: 2, maxLength: 4 }),
      (values) => {
        const { result } = renderHook(() => useBestValue(values, true));
        const expectedIndex = values.indexOf(Math.max(...values));
        return result.current === expectedIndex;
      }
    ),
    { numRuns: 100 }
  );
});
```

### Exemplos de Testes de Componente (RTL)

```typescript
// src/__tests__/components/SpecRow.test.tsx
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SpecRow } from '../../components/ui/SpecRow/SpecRow';
import { ThemeWrapper } from '../../utils/test-utils';

expect.extend(toHaveNoViolations);

describe('SpecRow', () => {
  it('deve exibir travessao quando o valor e null', () => {
    render(
      <SpecRow
        specKey="potenciaCv"
        label="Potencia"
        unit="cv"
        description="Potencia maxima do motor"
        values={[150, null, 180]}
        hasDiff={true}
        bestValueIndex={2}
        isHigherBetter={true}
      />,
      { wrapper: ThemeWrapper }
    );
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('deve ter zero violacoes de acessibilidade', async () => {
    const { container } = render(
      <SpecRow
        specKey="potenciaCv"
        label="Potencia"
        unit="cv"
        description="Potencia maxima do motor"
        values={[150, 130]}
        hasDiff={true}
        bestValueIndex={0}
        isHigherBetter={true}
      />,
      { wrapper: ThemeWrapper }
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### MSW para Testes de Integracao

Embora o portal seja estatico, o MSW e configurado para interceptar eventuais chamadas a APIs externas (ex.: analytics, CDN de imagens em testes):

```typescript
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Intercepta requisicoes de imagens em testes para retornar placeholder
  http.get('/images/*', () => {
    return new HttpResponse(null, { status: 200 });
  }),
];
```

### Testes de Acessibilidade

Todo componente em src/components/ui/ deve ter um teste de acessibilidade com jest-axe. O hook de criacao de componente (definido em hooks.md) cria automaticamente o arquivo de teste com o stub de acessibilidade.

---

## Seguranca

### Sanitizacao de Parametros de URL

Conforme descrito na secao de Decisoes de Design, todos os parametros de URL passam por sanitizeUrlParam antes de qualquer uso. Isso previne injecao de valores maliciosos no repositorio de dados.

### Links Externos

Todos os links externos (ex.: dataSource exibido na interface) devem ter el="noopener noreferrer" e 	arget="_blank". O hook de arquivo (definido em hooks.md) verifica automaticamente essa regra em arquivos .tsx modificados.

### DOMPurify

O campo dataSource e exibido como texto simples (nao como HTML), portanto nao requer sanitizacao com DOMPurify. Se no futuro qualquer campo for renderizado como HTML via dangerouslySetInnerHTML, o hook de arquivo ira detectar e alertar sobre a necessidade de sanitizacao.

### Cabecalhos de Seguranca HTTP

Os seguintes cabecalhos devem ser configurados na camada de hospedagem (ex.: ercel.json):

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }
      ]
    }
  ]
}
```

---

## Performance

### Code Splitting por Rota

Todas as paginas sao carregadas com React.lazy e Suspense, conforme mostrado na secao de Roteamento. Isso garante que o bundle inicial seja minimo.

### Otimizacao de Imagens

- Todas as imagens dos veiculos devem estar no formato **WebP**.
- O componente ImageWithFallback sempre recebe width e height explicitos para evitar CLS.
- Imagens da galeria usam loading="lazy" para carregamento sob demanda.

```typescript
// ImageWithFallback.tsx
<Box
  component="img"
  src={src}
  alt={alt}
  width={width}
  height={height}
  loading="lazy"
  sx={{ objectFit: 'cover', display: 'block' }}
/>
```

### Memoizacao

- useMemo e aplicado em calculos de filtragem (useFilteredSpecs, useDiffHighlight, useBestValue) pois dependem de arrays de veiculos que mudam raramente.
- useCallback e aplicado em handlers passados para componentes filhos (onRemove, onVehicleSelected).
- Nao aplicar memoizacao em componentes simples sem props caras — apenas onde o profiling indicar ganho mensuravel.

### Fontes

```css
/* src/theme/index.ts — via MUI CssBaseline */
@font-face {
  font-family: 'Inter';
  font-display: swap;
}
```

---

## Acessibilidade

### Hierarquia de Headings

| Elemento | Nivel |
|---|---|
| Titulo da aplicacao no AppHeader | h1 |
| Nome de cada pagina (ex.: "Selecionar Veiculos") | h2 |
| Cabecalho de cada SpecBlock (ex.: "Motor e Transmissao") | h3 |

### Foco e Navegacao por Teclado

- O IdentificationBlock sticky garante que os botoes de remocao sejam alcancaveis por Tab.
- O DiffToggle e um <Switch> do MUI com ria-label descritivo.
- Os SpecTooltip sao ativados por hover E por foco de teclado (Tab + Enter/Space).
- Modais e drawers (se utilizados no futuro) devem usar o componente Modal do MUI, que gerencia focus trap nativamente.

### Reducao de Movimento

Configurado no tema MUI via prefers-reduced-motion:

```typescript
// src/theme/index.ts
components: {
  MuiCssBaseline: {
    styleOverrides: 
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
        }
      }
    ,
  },
},
```

### Regioes Dinamicas

Mensagens de erro e resultados de selecao de veiculo usam ria-live="polite" para serem anunciados por leitores de tela sem interromper o fluxo de leitura.

---

## Resumo das Decisoes de Design

| Decisao | Escolha | Justificativa |
|---|---|---|
| Persistencia de estado | URL (query params) | Compartilhavel, sem necessidade de backend |
| Formato de ID de veiculo | Slug {marca}-{modelo}-{versao}-{ano} | Legivel, URL-safe, derivavel dos dados |
| Numero de veiculos | 2 a 4 slots | Minimo para comparacao util; maximo para legibilidade em telas medias |
| Dados dos veiculos | Arquivos TypeScript estaticos | Validacao em tempo de compilacao, sem latencia de API |
| Organizacao dos dados | Um arquivo por marca | Facilita manutencao e adicao de novas marcas |
| Direcao do melhor valor | Configurada em specMetadata.ts | Centraliza logica de negocio, componentes sao genericos |
| Toggle de diferencas | Estado no Zustand store | Persiste durante navegacao na pagina, sem prop drilling |
| Tema claro/escuro | Zustand + localStorage | Persiste preferencia do usuario entre sessoes |
| Biblioteca PBT | fast-check | Madura, TypeScript-first, integra com Vitest |
| Sticky header | CSS position: sticky via MUI sx | Sem JavaScript, performatico, suportado em todos os browsers alvo |
| Breakpoints responsivos | Exclusivamente MUI (xs, sm, md) | Consistencia com o design system, sem media queries manuais |

