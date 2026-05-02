import { writeFileSync } from "fs";

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

function buildVehicleId(marca, modelo, versao, ano) {
  return [slugify(marca), slugify(modelo), slugify(versao), String(ano)].join("-");
}

// Verify IDs
const testIds = [
  buildVehicleId("Toyota", "Corolla", "XEi", 2023),
  buildVehicleId("Toyota", "Corolla Cross", "XRE", 2022),
  buildVehicleId("Toyota", "Hilux", "SRX 4x4", 2023),
  buildVehicleId("Toyota", "SW4", "SRX Diamond", 2023),
  buildVehicleId("Toyota", "Yaris", "XS Hatch", 2022),
];
console.log("Sample IDs:", testIds);
