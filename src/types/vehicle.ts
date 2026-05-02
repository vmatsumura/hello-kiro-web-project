// src/types/vehicle.ts
// Schema central do veículo — fonte única da verdade para todos os dados do portal.

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
  Manual4 = 'manual-4',
  Manual5 = 'manual-5',
  Manual6 = 'manual-6',
  Automatico4 = 'automatico-4',
  Automatico5 = 'automatico-5',
  Automatico6 = 'automatico-6',
  Automatico7 = 'automatico-7',
  Automatico8 = 'automatico-8',
  Automatico9 = 'automatico-9',
  Automatico10 = 'automatico-10',
  CVT = 'cvt',
  DCT6 = 'dct-6',
  DCT7 = 'dct-7',
  DCT8 = 'dct-8',
  Eletrica = 'eletrica',
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

// ─── Sub-objeto de Identificação ─────────────────────────────────────────────

export interface VehicleIdentificacao {
  /** Slug único: {marca}-{modelo}-{versao}-{ano} ex: toyota-corolla-xei-2023 */
  id: string;
  marca: string;
  modelo: string;
  versao: string;
  anoModelo: number;
  /** Preço sugerido ao consumidor em reais. null se não disponível. */
  msrpBrl: number | null;
  /** URL do catálogo ou ficha técnica oficial utilizada como fonte */
  dataSource: string;
}

// ─── Sub-objetos de Especificações ────────────────────────────────────────────

export interface MotorTransmissao {
  tipoCombustivel: TipoCombustivel | null;
  tipoTransmissao: TipoTransmissao | null;
  tipoTracao: TipoTracao | null;
  numeroCilindros: number | null;
  /** Configuração dos cilindros, ex: "em linha", "V", "boxer" */
  configuracaoCilindros: string | null;
  cilindradaCc: number | null;
  potenciaCv: number | null;
  /** RPM em que a potência máxima é atingida */
  potenciaRpm: number | null;
  torqueKgfm: number | null;
  /** RPM em que o torque máximo é atingido */
  torqueRpm: number | null;
  /** Tipo de alimentação: 'turbo', 'aspirado', 'injeção direta', etc. */
  alimentacao: string | null;
  numeroDeMarchas: number | null;
  /** Potência do motor elétrico em cv (híbridos/elétricos) */
  potenciaEletricaCv: number | null;
  /** Torque do motor elétrico em kgf.m */
  torqueEletricoKgfm: number | null;
  /** Capacidade da bateria em kWh (híbridos/elétricos) */
  capacidadeBateriaKwh: number | null;
}

export interface Desempenho {
  /** Tempo de 0 a 100 km/h em segundos */
  aceleracao0a100Segundos: number | null;
  velocidadeMaximaKmh: number | null;
  /** Consumo urbano em km/l com gasolina (ciclo INMETRO) */
  consumoUrbanoGasolinaKmL: number | null;
  /** Consumo rodoviário em km/l com gasolina (ciclo INMETRO) */
  consumoRodoviarioGasolinaKmL: number | null;
  /** Consumo urbano em km/l com etanol (ciclo INMETRO) */
  consumoUrbanoEtanolKmL: number | null;
  /** Consumo rodoviário em km/l com etanol (ciclo INMETRO) */
  consumoRodoviarioEtanolKmL: number | null;
  /** Autonomia elétrica em km (híbridos plugin/elétricos) */
  autonomiaEletricaKm: number | null;
  /** Emissão de CO2 em g/km */
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
  /** Capacidade do tanque de combustível em litros */
  tanqueLitros: number | null;
  /** Capacidade de carga útil em kg (quando aplicável, ex: pickups) */
  cargaUtilKg: number | null;
}

export interface RodasPneusFreios {
  /** Tamanho do aro em polegadas */
  aroPolegadas: number | null;
  /** Especificação do pneu ex: 205/55R16 */
  especificacaoPneu: string | null;
  /** Material da roda */
  materialRoda: 'liga-leve' | 'aco' | null;
  tipoFreiosDianteiros: TipoFreio | null;
  tipoFreiosTraseiros: TipoFreio | null;
  /** Possui ABS */
  abs: boolean | null;
  /** Possui EBD (Electronic Brakeforce Distribution) */
  ebd: boolean | null;
  /** Possui BA (Brake Assist) */
  ba: boolean | null;
}

export interface SegurancaAtiva {
  /** Número de airbags */
  airbags: number | null;
  /** Posicionamento dos airbags, ex: "frontais, laterais, de cortina" */
  posicionamentoAirbags: string | null;
  /** Controle de estabilidade (ESC/ESP) */
  controleEstabilidade: boolean | null;
  /** Controle de tração (TCS/ASC) */
  controleTracao: boolean | null;
  /** Assistente de partida em rampa (HSA/HAC) */
  assistentePartidaRampa: boolean | null;
  /** Alerta de colisão frontal (FCW) */
  alertaColisaoFrontal: boolean | null;
  /** Frenagem autônoma de emergência (AEB) */
  frenagemAutonomaEmergencia: boolean | null;
  /** Alerta de saída de faixa (LDW) */
  alertaSaidaFaixa: boolean | null;
  /** Assistente de permanência em faixa (LKA) */
  assistentePermanenciaFaixa: boolean | null;
  /** Monitor de ponto cego (BSM) */
  monitorPontoCego: boolean | null;
  /** Câmera de ré */
  cameraRe: boolean | null;
  /** Visão 360° */
  visao360: boolean | null;
  /** Sensor de estacionamento traseiro */
  sensorEstacionamentoTraseiro: boolean | null;
  /** Sensor de estacionamento dianteiro */
  sensorEstacionamentoDianteiro: boolean | null;
}

export interface SegurancaPassiva {
  /** Nota NCAP Latin (estrelas, 0-5). null se não avaliado. */
  notaNcapLatinEstrelas: number | null;
  /** Ano da avaliação NCAP Latin */
  anoAvaliacaoNcapLatin: number | null;
  /** Nota NCAP Euro (estrelas, 0-5). null se não avaliado. */
  notaNcapEuroEstrelas: number | null;
  /** Ano da avaliação NCAP Euro */
  anoAvaliacaoNcapEuro: number | null;
  /** Cinto de segurança com pré-tensionador no banco do motorista */
  cintoPreTensionadorMotorista: boolean | null;
  /** Cinto de segurança com limitador de força */
  cintoLimitadorForca: boolean | null;
  /** ISOFIX nos bancos traseiros */
  isofix: boolean | null;
}

export interface TecnologiaConectividade {
  /** Tamanho da tela central em polegadas */
  telaCentralPolegadas: number | null;
  /** Suporte a Apple CarPlay com fio */
  appleCarPlayComFio: boolean | null;
  /** Suporte a Apple CarPlay sem fio */
  appleCarPlaySemFio: boolean | null;
  /** Suporte a Android Auto com fio */
  androidAutoComFio: boolean | null;
  /** Suporte a Android Auto sem fio */
  androidAutoSemFio: boolean | null;
  /** Conexão Bluetooth */
  bluetooth: boolean | null;
  /** Número de portas USB */
  portasUsb: number | null;
  /** Tipo de porta USB, ex: "USB-A", "USB-C", "USB-A e USB-C" */
  tipoPortaUsb: string | null;
  /** Carregamento wireless (Qi) */
  carregamentoWireless: boolean | null;
  /** GPS/Navegação integrado */
  gpsIntegrado: boolean | null;
  /** Número de alto-falantes do sistema de som */
  altofaLantes: number | null;
  /** Marca do sistema de som premium, ex: "Bose", "JBL" */
  marcaSomPremium: string | null;
  /** Wi-Fi hotspot */
  wifiHotspot: boolean | null;
  /** Painel de instrumentos digital */
  painelDigital: boolean | null;
  /** Tamanho do painel digital em polegadas */
  painelDigitalPolegadas: number | null;
  /** Head-up display */
  headUpDisplay: boolean | null;
}

export interface ConfortoConveniencias {
  tipoArCondicionado: TipoArCondicionado | null;
  /** Direção: 'eletrica', 'hidraulica', 'eletro-hidraulica' */
  tipoDirecao: 'eletrica' | 'hidraulica' | 'eletro-hidraulica' | null;
  /** Piloto automático adaptativo (ACC) */
  cruiseControlAdaptativo: boolean | null;
  /** Piloto automático convencional */
  cruiseControlConvencional: boolean | null;
  /** Entrada sem chave (keyless entry) */
  keylessEntry: boolean | null;
  /** Partida por botão (push-start) */
  partidaBotao: boolean | null;
  /** Banco do motorista com ajuste elétrico */
  bancoMotoristaAjusteEletrico: boolean | null;
  /** Número de posições de ajuste elétrico do banco do motorista */
  bancoMotoristaPosicoesEletricas: number | null;
  /** Banco do passageiro com ajuste elétrico */
  bancoPassageiroAjusteEletrico: boolean | null;
  /** Memória de posição do banco do motorista */
  memoriaPositionBancoMotorista: boolean | null;
  /** Aquecimento de bancos dianteiros */
  bancoAquecidoDianteiro: boolean | null;
  /** Aquecimento de bancos traseiros */
  bancoAquecidoTraseiro: boolean | null;
  /** Ventilação de bancos */
  bancoVentilado: boolean | null;
  /** Teto solar convencional */
  tetoSolar: boolean | null;
  /** Teto panorâmico */
  tetoPanoramico: boolean | null;
  /** Para-brisa com desembaçador elétrico */
  parabrisaDesembacador: boolean | null;
  /** Retrovisores elétricos */
  retrovisorEletrico: boolean | null;
  /** Retrovisores com rebatimento elétrico automático */
  retrovisorRebatimentoEletrico: boolean | null;
  /** Volante com ajuste de altura e profundidade */
  volanteAjusteAlturaProf: boolean | null;
  /** Revestimento interno dos bancos */
  revestimentoBancos: 'tecido' | 'couro-sintetico' | 'couro-genuino' | 'alcantara' | null;
}

export interface CapacidadePassageiros {
  /** Número de portas */
  portas: number | null;
  /** Número de passageiros (incluindo motorista) */
  passageiros: number | null;
  /** Configuração de fileiras, ex: "2 fileiras", "3 fileiras" */
  configuracaoFileiras: string | null;
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

// ─── Sub-objeto de Mídia ──────────────────────────────────────────────────────

export type FotosPorCategoria = {
  [key in CategoriaFoto]: string | null;
};

export interface VehicleMidia {
  /** Foto principal (usada no bloco de identificação) */
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

/** Chave de especificação no formato 'bloco.campo' ex: 'motorTransmissao.potenciaCv' */
export type SpecKey = string;

/** Metadados de uma especificação para exibição e cálculo */
export interface SpecMetadata {
  key: SpecKey;
  /** Chave i18n para o rótulo da especificação */
  labelKey: string;
  /** Unidade de medida, ex: 'cv', 'kg', 'mm' */
  unit: string;
  /** Chave i18n para a descrição exibida no tooltip */
  descriptionKey: string;
  /**
   * Direção do "melhor valor":
   * - true  = maior é melhor (potência, torque, autonomia)
   * - false = menor é melhor (consumo em L/100km, emissão CO2, tempo 0-100)
   * - null  = não numérico ou sem direção universal (peso, dimensões)
   */
  isHigherBetter: boolean | null;
}
