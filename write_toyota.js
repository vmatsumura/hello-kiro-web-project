const fs = require("fs");

const lines = [];

// Header
lines.push("// src/data/toyota.ts");
lines.push("// Dados dos veiculos Toyota comercializados no Brasil (2006-2026).");
lines.push("// Populado na Tarefa 13.");
lines.push("");
lines.push("import {");
lines.push("  Vehicle,");
lines.push("  TipoCombustivel,");
lines.push("  TipoTransmissao,");
lines.push("  TipoTracao,");
lines.push("  TipoFreio,");
lines.push("  TipoArCondicionado,");
lines.push("  CategoriaFoto,");
lines.push("} from '../types/vehicle';");
lines.push("import { buildVehicleId } from '../utils/slugify';");
lines.push("");
lines.push("const nullFotos = {");
lines.push("  [CategoriaFoto.FrontalTresDQuartos]: null,");
lines.push("  [CategoriaFoto.LateralDireita]: null,");
lines.push("  [CategoriaFoto.TraseiraTresDQuartos]: null,");
lines.push("  [CategoriaFoto.LateralEsquerda]: null,");
lines.push("  [CategoriaFoto.PainelCockpit]: null,");
lines.push("  [CategoriaFoto.BancoTraseiro]: null,");
lines.push("  [CategoriaFoto.PortaMalasAberto]: null,");
lines.push("  [CategoriaFoto.MotorTampaAberta]: null,");
lines.push("  [CategoriaFoto.DetalheRodas]: null,");
lines.push("};");
lines.push("");

fs.writeFileSync("src/data/toyota.ts", lines.join("\n"), "utf8");
console.log("Header written:", lines.length, "lines");
