
// src/utils/specMetadata.ts
// Metadados de todas as especificações técnicas dos veículos.
// Define rótulos i18n, unidades, descrições e direção do "melhor valor".

import type { SpecBlockKey, SpecKey, SpecMetadata, Vehicle } from '../types/vehicle';

// ─── Metadados por bloco ──────────────────────────────────────────────────────

const motorTransmissaoSpecs: SpecMetadata[] = [
  { key: 'motorTransmissao.tipoCombustivel', labelKey: 'vehicle:specs.motorTransmissao.tipoCombustivel.label', unit: '', descriptionKey: 'vehicle:specs.motorTransmissao.tipoCombustivel.description', isHigherBetter: null },
  { key: 'motorTransmissao.cilindradaCc', labelKey: 'vehicle:specs.motorTransmissao.cilindradaCc.label', unit: 'cc', descriptionKey: 'vehicle:specs.motorTransmissao.cilindradaCc.description', isHigherBetter: null },
  { key: 'motorTransmissao.numeroCilindros', labelKey: 'vehicle:specs.motorTransmissao.numeroCilindros.label', unit: '', descriptionKey: 'vehicle:specs.motorTransmissao.numeroCilindros.description', isHigherBetter: null },
  { key: 'motorTransmissao.configuracaoCilindros', labelKey: 'vehicle:specs.motorTransmissao.configuracaoCilindros.label', unit: '', descriptionKey: 'vehicle:specs.motorTransmissao.configuracaoCilindros.description', isHigherBetter: null },
  { key: 'motorTransmissao.potenciaCv', labelKey: 'vehicle:specs.motorTransmissao.potenciaCv.label', unit: 'cv', descriptionKey: 'vehicle:specs.motorTransmissao.potenciaCv.description', isHigherBetter: true },
  { key: 'motorTransmissao.potenciaRpm', labelKey: 'vehicle:specs.motorTransmissao.potenciaRpm.label', unit: 'rpm', descriptionKey: 'vehicle:specs.motorTransmissao.potenciaRpm.description', isHigherBetter: null },
  { key: 'motorTransmissao.torqueKgfm', labelKey: 'vehicle:specs.motorTransmissao.torqueKgfm.label', unit: 'kgf.m', descriptionKey: 'vehicle:specs.motorTransmissao.torqueKgfm.description', isHigherBetter: true },
  { key: 'motorTransmissao.torqueRpm', labelKey: 'vehicle:specs.motorTransmissao.torqueRpm.label', unit: 'rpm', descriptionKey: 'vehicle:specs.motorTransmissao.torqueRpm.description', isHigherBetter: null },
  { key: 'motorTransmissao.alimentacao', labelKey: 'vehicle:specs.motorTransmissao.alimentacao.label', unit: '', descriptionKey: 'vehicle:specs.motorTransmissao.alimentacao.description', isHigherBetter: null },
  { key: 'motorTransmissao.tipoTransmissao', labelKey: 'vehicle:specs.motorTransmissao.tipoTransmissao.label', unit: '', descriptionKey: 'vehicle:specs.motorTransmissao.tipoTransmissao.description', isHigherBetter: null },
  { key: 'motorTransmissao.numeroDeMarchas', labelKey: 'vehicle:specs.motorTransmissao.numeroDeMarchas.label', unit: '', descriptionKey: 'vehicle:specs.motorTransmissao.numeroDeMarchas.description', isHigherBetter: null },
  { key: 'motorTransmissao.tipoTracao', labelKey: 'vehicle:specs.motorTransmissao.tipoTracao.label', unit: '', descriptionKey: 'vehicle:specs.motorTransmissao.tipoTracao.description', isHigherBetter: null },
  { key: 'motorTransmissao.potenciaEletricaCv', labelKey: 'vehicle:specs.motorTransmissao.potenciaEletricaCv.label', unit: 'cv', descriptionKey: 'vehicle:specs.motorTransmissao.potenciaEletricaCv.description', isHigherBetter: true },
  { key: 'motorTransmissao.torqueEletricoKgfm', labelKey: 'vehicle:specs.motorTransmissao.torqueEletricoKgfm.label', unit: 'kgf.m', descriptionKey: 'vehicle:specs.motorTransmissao.torqueEletricoKgfm.description', isHigherBetter: true },
  { key: 'motorTransmissao.capacidadeBateriaKwh', labelKey: 'vehicle:specs.motorTransmissao.capacidadeBateriaKwh.label', unit: 'kWh', descriptionKey: 'vehicle:specs.motorTransmissao.capacidadeBateriaKwh.description', isHigherBetter: true },
];

const desempenhoSpecs: SpecMetadata[] = [
  { key: 'desempenho.aceleracao0a100Segundos', labelKey: 'vehicle:specs.desempenho.aceleracao0a100Segundos.label', unit: 's', descriptionKey: 'vehicle:specs.desempenho.aceleracao0a100Segundos.description', isHigherBetter: false },
  { key: 'desempenho.velocidadeMaximaKmh', labelKey: 'vehicle:specs.desempenho.velocidadeMaximaKmh.label', unit: 'km/h', descriptionKey: 'vehicle:specs.desempenho.velocidadeMaximaKmh.description', isHigherBetter: true },
  { key: 'desempenho.consumoUrbanoGasolinaKmL', labelKey: 'vehicle:specs.desempenho.consumoUrbanoGasolinaKmL.label', unit: 'km/l', descriptionKey: 'vehicle:specs.desempenho.consumoUrbanoGasolinaKmL.description', isHigherBetter: true },
  { key: 'desempenho.consumoRodoviarioGasolinaKmL', labelKey: 'vehicle:specs.desempenho.consumoRodoviarioGasolinaKmL.label', unit: 'km/l', descriptionKey: 'vehicle:specs.desempenho.consumoRodoviarioGasolinaKmL.description', isHigherBetter: true },
  { key: 'desempenho.consumoUrbanoEtanolKmL', labelKey: 'vehicle:specs.desempenho.consumoUrbanoEtanolKmL.label', unit: 'km/l', descriptionKey: 'vehicle:specs.desempenho.consumoUrbanoEtanolKmL.description', isHigherBetter: true },
  { key: 'desempenho.consumoRodoviarioEtanolKmL', labelKey: 'vehicle:specs.desempenho.consumoRodoviarioEtanolKmL.label', unit: 'km/l', descriptionKey: 'vehicle:specs.desempenho.consumoRodoviarioEtanolKmL.description', isHigherBetter: true },
  { key: 'desempenho.autonomiaEletricaKm', labelKey: 'vehicle:specs.desempenho.autonomiaEletricaKm.label', unit: 'km', descriptionKey: 'vehicle:specs.desempenho.autonomiaEletricaKm.description', isHigherBetter: true },
  { key: 'desempenho.emissaoCo2GKm', labelKey: 'vehicle:specs.desempenho.emissaoCo2GKm.label', unit: 'g/km', descriptionKey: 'vehicle:specs.desempenho.emissaoCo2GKm.description', isHigherBetter: false },
];

const dimensoesPesoSpecs: SpecMetadata[] = [
  { key: 'dimensoesPeso.comprimentoMm', labelKey: 'vehicle:specs.dimensoesPeso.comprimentoMm.label', unit: 'mm', descriptionKey: 'vehicle:specs.dimensoesPeso.comprimentoMm.description', isHigherBetter: null },
  { key: 'dimensoesPeso.larguraMm', labelKey: 'vehicle:specs.dimensoesPeso.larguraMm.label', unit: 'mm', descriptionKey: 'vehicle:specs.dimensoesPeso.larguraMm.description', isHigherBetter: null },
  { key: 'dimensoesPeso.alturaMm', labelKey: 'vehicle:specs.dimensoesPeso.alturaMm.label', unit: 'mm', descriptionKey: 'vehicle:specs.dimensoesPeso.alturaMm.description', isHigherBetter: null },
  { key: 'dimensoesPeso.distanciaEntreEixosMm', labelKey: 'vehicle:specs.dimensoesPeso.distanciaEntreEixosMm.label', unit: 'mm', descriptionKey: 'vehicle:specs.dimensoesPeso.distanciaEntreEixosMm.description', isHigherBetter: true },
  { key: 'dimensoesPeso.pesoKg', labelKey: 'vehicle:specs.dimensoesPeso.pesoKg.label', unit: 'kg', descriptionKey: 'vehicle:specs.dimensoesPeso.pesoKg.description', isHigherBetter: false },
  { key: 'dimensoesPeso.portaMalasLitros', labelKey: 'vehicle:specs.dimensoesPeso.portaMalasLitros.label', unit: 'L', descriptionKey: 'vehicle:specs.dimensoesPeso.portaMalasLitros.description', isHigherBetter: true },
  { key: 'dimensoesPeso.tanqueLitros', labelKey: 'vehicle:specs.dimensoesPeso.tanqueLitros.label', unit: 'L', descriptionKey: 'vehicle:specs.dimensoesPeso.tanqueLitros.description', isHigherBetter: true },
  { key: 'dimensoesPeso.cargaUtilKg', labelKey: 'vehicle:specs.dimensoesPeso.cargaUtilKg.label', unit: 'kg', descriptionKey: 'vehicle:specs.dimensoesPeso.cargaUtilKg.description', isHigherBetter: true },
];

const rodasPneusFreiosSpecs: SpecMetadata[] = [
  { key: 'rodasPneusFreios.aroPolegadas', labelKey: 'vehicle:specs.rodasPneusFreios.aroPolegadas.label', unit: '"', descriptionKey: 'vehicle:specs.rodasPneusFreios.aroPolegadas.description', isHigherBetter: null },
  { key: 'rodasPneusFreios.especificacaoPneu', labelKey: 'vehicle:specs.rodasPneusFreios.especificacaoPneu.label', unit: '', descriptionKey: 'vehicle:specs.rodasPneusFreios.especificacaoPneu.description', isHigherBetter: null },
  { key: 'rodasPneusFreios.materialRoda', labelKey: 'vehicle:specs.rodasPneusFreios.materialRoda.label', unit: '', descriptionKey: 'vehicle:specs.rodasPneusFreios.materialRoda.description', isHigherBetter: null },
  { key: 'rodasPneusFreios.tipoFreiosDianteiros', labelKey: 'vehicle:specs.rodasPneusFreios.tipoFreiosDianteiros.label', unit: '', descriptionKey: 'vehicle:specs.rodasPneusFreios.tipoFreiosDianteiros.description', isHigherBetter: null },
  { key: 'rodasPneusFreios.tipoFreiosTraseiros', labelKey: 'vehicle:specs.rodasPneusFreios.tipoFreiosTraseiros.label', unit: '', descriptionKey: 'vehicle:specs.rodasPneusFreios.tipoFreiosTraseiros.description', isHigherBetter: null },
  { key: 'rodasPneusFreios.abs', labelKey: 'vehicle:specs.rodasPneusFreios.abs.label', unit: '', descriptionKey: 'vehicle:specs.rodasPneusFreios.abs.description', isHigherBetter: null },
  { key: 'rodasPneusFreios.ebd', labelKey: 'vehicle:specs.rodasPneusFreios.ebd.label', unit: '', descriptionKey: 'vehicle:specs.rodasPneusFreios.ebd.description', isHigherBetter: null },
  { key: 'rodasPneusFreios.ba', labelKey: 'vehicle:specs.rodasPneusFreios.ba.label', unit: '', descriptionKey: 'vehicle:specs.rodasPneusFreios.ba.description', isHigherBetter: null },
];

const segurancaAtivaSpecs: SpecMetadata[] = [
  { key: 'segurancaAtiva.airbags', labelKey: 'vehicle:specs.segurancaAtiva.airbags.label', unit: '', descriptionKey: 'vehicle:specs.segurancaAtiva.airbags.description', isHigherBetter: true },
  { key: 'segurancaAtiva.posicionamentoAirbags', labelKey: 'vehicle:specs.segurancaAtiva.posicionamentoAirbags.label', unit: '', descriptionKey: 'vehicle:specs.segurancaAtiva.posicionamentoAirbags.description', isHigherBetter: null },
  { key: 'segurancaAtiva.controleEstabilidade', labelKey: 'vehicle:specs.segurancaAtiva.controleEstabilidade.label', unit: '', descriptionKey: 'vehicle:specs.segurancaAtiva.controleEstabilidade.description', isHigherBetter: null },
  { key: 'segurancaAtiva.controleTracao', labelKey: 'vehicle:specs.segurancaAtiva.controleTracao.label', unit: '', descriptionKey: 'vehicle:specs.segurancaAtiva.controleTracao.description', isHigherBetter: null },
  { key: 'segurancaAtiva.assistentePartidaRampa', labelKey: 'vehicle:specs.segurancaAtiva.assistentePartidaRampa.label', unit: '', descriptionKey: 'vehicle:specs.segurancaAtiva.assistentePartidaRampa.description', isHigherBetter: null },
  { key: 'segurancaAtiva.alertaColisaoFrontal', labelKey: 'vehicle:specs.segurancaAtiva.alertaColisaoFrontal.label', unit: '', descriptionKey: 'vehicle:specs.segurancaAtiva.alertaColisaoFrontal.description', isHigherBetter: null },
  { key: 'segurancaAtiva.frenagemAutonomaEmergencia', labelKey: 'vehicle:specs.segurancaAtiva.frenagemAutonomaEmergencia.label', unit: '', descriptionKey: 'vehicle:specs.segurancaAtiva.frenagemAutonomaEmergencia.description', isHigherBetter: null },
  { key: 'segurancaAtiva.alertaSaidaFaixa', labelKey: 'vehicle:specs.segurancaAtiva.alertaSaidaFaixa.label', unit: '', descriptionKey: 'vehicle:specs.segurancaAtiva.alertaSaidaFaixa.description', isHigherBetter: null },
  { key: 'segurancaAtiva.assistentePermanenciaFaixa', labelKey: 'vehicle:specs.segurancaAtiva.assistentePermanenciaFaixa.label', unit: '', descriptionKey: 'vehicle:specs.segurancaAtiva.assistentePermanenciaFaixa.description', isHigherBetter: null },
  { key: 'segurancaAtiva.monitorPontoCego', labelKey: 'vehicle:specs.segurancaAtiva.monitorPontoCego.label', unit: '', descriptionKey: 'vehicle:specs.segurancaAtiva.monitorPontoCego.description', isHigherBetter: null },
  { key: 'segurancaAtiva.cameraRe', labelKey: 'vehicle:specs.segurancaAtiva.cameraRe.label', unit: '', descriptionKey: 'vehicle:specs.segurancaAtiva.cameraRe.description', isHigherBetter: null },
  { key: 'segurancaAtiva.visao360', labelKey: 'vehicle:specs.segurancaAtiva.visao360.label', unit: '', descriptionKey: 'vehicle:specs.segurancaAtiva.visao360.description', isHigherBetter: null },
  { key: 'segurancaAtiva.sensorEstacionamentoTraseiro', labelKey: 'vehicle:specs.segurancaAtiva.sensorEstacionamentoTraseiro.label', unit: '', descriptionKey: 'vehicle:specs.segurancaAtiva.sensorEstacionamentoTraseiro.description', isHigherBetter: null },
  { key: 'segurancaAtiva.sensorEstacionamentoDianteiro', labelKey: 'vehicle:specs.segurancaAtiva.sensorEstacionamentoDianteiro.label', unit: '', descriptionKey: 'vehicle:specs.segurancaAtiva.sensorEstacionamentoDianteiro.description', isHigherBetter: null },
];

const segurancaPassivaSpecs: SpecMetadata[] = [
  { key: 'segurancaPassiva.notaNcapLatinEstrelas', labelKey: 'vehicle:specs.segurancaPassiva.notaNcapLatinEstrelas.label', unit: '★', descriptionKey: 'vehicle:specs.segurancaPassiva.notaNcapLatinEstrelas.description', isHigherBetter: true },
  { key: 'segurancaPassiva.anoAvaliacaoNcapLatin', labelKey: 'vehicle:specs.segurancaPassiva.anoAvaliacaoNcapLatin.label', unit: '', descriptionKey: 'vehicle:specs.segurancaPassiva.anoAvaliacaoNcapLatin.description', isHigherBetter: null },
  { key: 'segurancaPassiva.notaNcapEuroEstrelas', labelKey: 'vehicle:specs.segurancaPassiva.notaNcapEuroEstrelas.label', unit: '★', descriptionKey: 'vehicle:specs.segurancaPassiva.notaNcapEuroEstrelas.description', isHigherBetter: true },
  { key: 'segurancaPassiva.cintoPreTensionadorMotorista', labelKey: 'vehicle:specs.segurancaPassiva.cintoPreTensionadorMotorista.label', unit: '', descriptionKey: 'vehicle:specs.segurancaPassiva.cintoPreTensionadorMotorista.description', isHigherBetter: null },
  { key: 'segurancaPassiva.cintoLimitadorForca', labelKey: 'vehicle:specs.segurancaPassiva.cintoLimitadorForca.label', unit: '', descriptionKey: 'vehicle:specs.segurancaPassiva.cintoLimitadorForca.description', isHigherBetter: null },
  { key: 'segurancaPassiva.isofix', labelKey: 'vehicle:specs.segurancaPassiva.isofix.label', unit: '', descriptionKey: 'vehicle:specs.segurancaPassiva.isofix.description', isHigherBetter: null },
];

const tecnologiaConectividadeSpecs: SpecMetadata[] = [
  { key: 'tecnologiaConectividade.telaCentralPolegadas', labelKey: 'vehicle:specs.tecnologiaConectividade.telaCentralPolegadas.label', unit: '"', descriptionKey: 'vehicle:specs.tecnologiaConectividade.telaCentralPolegadas.description', isHigherBetter: true },
  { key: 'tecnologiaConectividade.appleCarPlayComFio', labelKey: 'vehicle:specs.tecnologiaConectividade.appleCarPlayComFio.label', unit: '', descriptionKey: 'vehicle:specs.tecnologiaConectividade.appleCarPlayComFio.description', isHigherBetter: null },
  { key: 'tecnologiaConectividade.appleCarPlaySemFio', labelKey: 'vehicle:specs.tecnologiaConectividade.appleCarPlaySemFio.label', unit: '', descriptionKey: 'vehicle:specs.tecnologiaConectividade.appleCarPlaySemFio.description', isHigherBetter: null },
  { key: 'tecnologiaConectividade.androidAutoComFio', labelKey: 'vehicle:specs.tecnologiaConectividade.androidAutoComFio.label', unit: '', descriptionKey: 'vehicle:specs.tecnologiaConectividade.androidAutoComFio.description', isHigherBetter: null },
  { key: 'tecnologiaConectividade.androidAutoSemFio', labelKey: 'vehicle:specs.tecnologiaConectividade.androidAutoSemFio.label', unit: '', descriptionKey: 'vehicle:specs.tecnologiaConectividade.androidAutoSemFio.description', isHigherBetter: null },
  { key: 'tecnologiaConectividade.bluetooth', labelKey: 'vehicle:specs.tecnologiaConectividade.bluetooth.label', unit: '', descriptionKey: 'vehicle:specs.tecnologiaConectividade.bluetooth.description', isHigherBetter: null },
  { key: 'tecnologiaConectividade.portasUsb', labelKey: 'vehicle:specs.tecnologiaConectividade.portasUsb.label', unit: '', descriptionKey: 'vehicle:specs.tecnologiaConectividade.portasUsb.description', isHigherBetter: true },
  { key: 'tecnologiaConectividade.tipoPortaUsb', labelKey: 'vehicle:specs.tecnologiaConectividade.tipoPortaUsb.label', unit: '', descriptionKey: 'vehicle:specs.tecnologiaConectividade.tipoPortaUsb.description', isHigherBetter: null },
  { key: 'tecnologiaConectividade.carregamentoWireless', labelKey: 'vehicle:specs.tecnologiaConectividade.carregamentoWireless.label', unit: '', descriptionKey: 'vehicle:specs.tecnologiaConectividade.carregamentoWireless.description', isHigherBetter: null },
  { key: 'tecnologiaConectividade.gpsIntegrado', labelKey: 'vehicle:specs.tecnologiaConectividade.gpsIntegrado.label', unit: '', descriptionKey: 'vehicle:specs.tecnologiaConectividade.gpsIntegrado.description', isHigherBetter: null },
  { key: 'tecnologiaConectividade.altofaLantes', labelKey: 'vehicle:specs.tecnologiaConectividade.altofaLantes.label', unit: '', descriptionKey: 'vehicle:specs.tecnologiaConectividade.altofaLantes.description', isHigherBetter: true },
  { key: 'tecnologiaConectividade.marcaSomPremium', labelKey: 'vehicle:specs.tecnologiaConectividade.marcaSomPremium.label', unit: '', descriptionKey: 'vehicle:specs.tecnologiaConectividade.marcaSomPremium.description', isHigherBetter: null },
  { key: 'tecnologiaConectividade.wifiHotspot', labelKey: 'vehicle:specs.tecnologiaConectividade.wifiHotspot.label', unit: '', descriptionKey: 'vehicle:specs.tecnologiaConectividade.wifiHotspot.description', isHigherBetter: null },
  { key: 'tecnologiaConectividade.painelDigital', labelKey: 'vehicle:specs.tecnologiaConectividade.painelDigital.label', unit: '', descriptionKey: 'vehicle:specs.tecnologiaConectividade.painelDigital.description', isHigherBetter: null },
  { key: 'tecnologiaConectividade.painelDigitalPolegadas', labelKey: 'vehicle:specs.tecnologiaConectividade.painelDigitalPolegadas.label', unit: '"', descriptionKey: 'vehicle:specs.tecnologiaConectividade.painelDigitalPolegadas.description', isHigherBetter: true },
  { key: 'tecnologiaConectividade.headUpDisplay', labelKey: 'vehicle:specs.tecnologiaConectividade.headUpDisplay.label', unit: '', descriptionKey: 'vehicle:specs.tecnologiaConectividade.headUpDisplay.description', isHigherBetter: null },
];

const confortoConvenienciasSpecs: SpecMetadata[] = [
  { key: 'confortoConveniencias.tipoArCondicionado', labelKey: 'vehicle:specs.confortoConveniencias.tipoArCondicionado.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.tipoArCondicionado.description', isHigherBetter: null },
  { key: 'confortoConveniencias.tipoDirecao', labelKey: 'vehicle:specs.confortoConveniencias.tipoDirecao.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.tipoDirecao.description', isHigherBetter: null },
  { key: 'confortoConveniencias.cruiseControlAdaptativo', labelKey: 'vehicle:specs.confortoConveniencias.cruiseControlAdaptativo.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.cruiseControlAdaptativo.description', isHigherBetter: null },
  { key: 'confortoConveniencias.cruiseControlConvencional', labelKey: 'vehicle:specs.confortoConveniencias.cruiseControlConvencional.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.cruiseControlConvencional.description', isHigherBetter: null },
  { key: 'confortoConveniencias.keylessEntry', labelKey: 'vehicle:specs.confortoConveniencias.keylessEntry.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.keylessEntry.description', isHigherBetter: null },
  { key: 'confortoConveniencias.partidaBotao', labelKey: 'vehicle:specs.confortoConveniencias.partidaBotao.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.partidaBotao.description', isHigherBetter: null },
  { key: 'confortoConveniencias.bancoMotoristaAjusteEletrico', labelKey: 'vehicle:specs.confortoConveniencias.bancoMotoristaAjusteEletrico.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.bancoMotoristaAjusteEletrico.description', isHigherBetter: null },
  { key: 'confortoConveniencias.bancoMotoristaPosicoesEletricas', labelKey: 'vehicle:specs.confortoConveniencias.bancoMotoristaPosicoesEletricas.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.bancoMotoristaPosicoesEletricas.description', isHigherBetter: true },
  { key: 'confortoConveniencias.bancoPassageiroAjusteEletrico', labelKey: 'vehicle:specs.confortoConveniencias.bancoPassageiroAjusteEletrico.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.bancoPassageiroAjusteEletrico.description', isHigherBetter: null },
  { key: 'confortoConveniencias.memoriaPositionBancoMotorista', labelKey: 'vehicle:specs.confortoConveniencias.memoriaPositionBancoMotorista.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.memoriaPositionBancoMotorista.description', isHigherBetter: null },
  { key: 'confortoConveniencias.bancoAquecidoDianteiro', labelKey: 'vehicle:specs.confortoConveniencias.bancoAquecidoDianteiro.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.bancoAquecidoDianteiro.description', isHigherBetter: null },
  { key: 'confortoConveniencias.bancoAquecidoTraseiro', labelKey: 'vehicle:specs.confortoConveniencias.bancoAquecidoTraseiro.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.bancoAquecidoTraseiro.description', isHigherBetter: null },
  { key: 'confortoConveniencias.bancoVentilado', labelKey: 'vehicle:specs.confortoConveniencias.bancoVentilado.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.bancoVentilado.description', isHigherBetter: null },
  { key: 'confortoConveniencias.tetoSolar', labelKey: 'vehicle:specs.confortoConveniencias.tetoSolar.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.tetoSolar.description', isHigherBetter: null },
  { key: 'confortoConveniencias.tetoPanoramico', labelKey: 'vehicle:specs.confortoConveniencias.tetoPanoramico.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.tetoPanoramico.description', isHigherBetter: null },
  { key: 'confortoConveniencias.parabrisaDesembacador', labelKey: 'vehicle:specs.confortoConveniencias.parabrisaDesembacador.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.parabrisaDesembacador.description', isHigherBetter: null },
  { key: 'confortoConveniencias.retrovisorEletrico', labelKey: 'vehicle:specs.confortoConveniencias.retrovisorEletrico.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.retrovisorEletrico.description', isHigherBetter: null },
  { key: 'confortoConveniencias.retrovisorRebatimentoEletrico', labelKey: 'vehicle:specs.confortoConveniencias.retrovisorRebatimentoEletrico.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.retrovisorRebatimentoEletrico.description', isHigherBetter: null },
  { key: 'confortoConveniencias.volanteAjusteAlturaProf', labelKey: 'vehicle:specs.confortoConveniencias.volanteAjusteAlturaProf.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.volanteAjusteAlturaProf.description', isHigherBetter: null },
  { key: 'confortoConveniencias.revestimentoBancos', labelKey: 'vehicle:specs.confortoConveniencias.revestimentoBancos.label', unit: '', descriptionKey: 'vehicle:specs.confortoConveniencias.revestimentoBancos.description', isHigherBetter: null },
];

const capacidadePassageirosSpecs: SpecMetadata[] = [
  { key: 'capacidadePassageiros.portas', labelKey: 'vehicle:specs.capacidadePassageiros.portas.label', unit: '', descriptionKey: 'vehicle:specs.capacidadePassageiros.portas.description', isHigherBetter: null },
  { key: 'capacidadePassageiros.passageiros', labelKey: 'vehicle:specs.capacidadePassageiros.passageiros.label', unit: '', descriptionKey: 'vehicle:specs.capacidadePassageiros.passageiros.description', isHigherBetter: null },
  { key: 'capacidadePassageiros.configuracaoFileiras', labelKey: 'vehicle:specs.capacidadePassageiros.configuracaoFileiras.label', unit: '', descriptionKey: 'vehicle:specs.capacidadePassageiros.configuracaoFileiras.description', isHigherBetter: null },
];

// ─── Mapa de blocos ───────────────────────────────────────────────────────────

const SPECS_BY_BLOCK: Record<SpecBlockKey, SpecMetadata[]> = {
  motorTransmissao: motorTransmissaoSpecs,
  desempenho: desempenhoSpecs,
  dimensoesPeso: dimensoesPesoSpecs,
  rodasPneusFreios: rodasPneusFreiosSpecs,
  segurancaAtiva: segurancaAtivaSpecs,
  segurancaPassiva: segurancaPassivaSpecs,
  tecnologiaConectividade: tecnologiaConectividadeSpecs,
  confortoConveniencias: confortoConvenienciasSpecs,
  capacidadePassageiros: capacidadePassageirosSpecs,
};

/** Todos os metadados de especificações, em ordem de exibição */
export const SPEC_METADATA: SpecMetadata[] = Object.values(SPECS_BY_BLOCK).flat();

// ─── Funções de acesso ────────────────────────────────────────────────────────

/**
 * Retorna os metadados de todas as especificações de um bloco temático.
 */
export function getSpecsForBlock(blockKey: SpecBlockKey): SpecMetadata[] {
  return SPECS_BY_BLOCK[blockKey] ?? [];
}

/**
 * Extrai o valor de uma especificação de um veículo usando a chave no formato 'bloco.campo'.
 * Retorna null se o campo não existir ou for null.
 */
export function getSpecValue(vehicle: Vehicle, specKey: SpecKey): string | number | boolean | null {
  const [block, field] = specKey.split('.') as [SpecBlockKey, string];
  if (!block || !field) return null;

  const blockData = vehicle.especificacoes[block];
  if (!blockData) return null;

  const value = (blockData as unknown as Record<string, unknown>)[field];
  if (value === undefined || value === null) return null;

  return value as string | number | boolean;
}
