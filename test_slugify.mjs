import { writeFileSync, appendFileSync } from "fs";

// Helper to build a vehicle entry as a string
function v(marca, modelo, versao, ano, msrp, ds, mt, desemp, dim, rpf, sa, sp, tc, cc, cap) {
  const id = buildVehicleId(marca, modelo, versao, ano);
  return JSON.stringify({
    identificacao: { id, marca, modelo, versao, anoModelo: ano, msrpBrl: msrp, dataSource: ds },
    especificacoes: { motorTransmissao: mt, desempenho: desemp, dimensoesPeso: dim, rodasPneusFreios: rpf, segurancaAtiva: sa, segurancaPassiva: sp, tecnologiaConectividade: tc, confortoConveniencias: cc, capacidadePassageiros: cap },
    midia: { fotoPrincipal: null, fotos: {} }
  }, null, 2);
}

function buildVehicleId(marca, modelo, versao, ano) {
  return [slugify(marca), slugify(modelo), slugify(versao), String(ano)].join("-");
}

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

console.log(buildVehicleId("Toyota", "Corolla", "XEi", 2023));
console.log(buildVehicleId("Toyota", "Corolla Cross", "XRE", 2022));
console.log(buildVehicleId("Toyota", "Hilux", "SRX 4x4", 2023));
