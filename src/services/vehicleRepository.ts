// src/services/vehicleRepository.ts
// Repositório de dados estáticos dos veículos.
// Agrega todos os arquivos de dados e expõe métodos de consulta tipados.

import type { Vehicle } from '../types/vehicle';
import { toyotaVehicles } from '../data/toyota';
import { hondaVehicles } from '../data/honda';
import { nissanVehicles } from '../data/nissan';

/** Todos os veículos disponíveis no portal */
const ALL_VEHICLES: Vehicle[] = [
  ...toyotaVehicles,
  ...hondaVehicles,
  ...nissanVehicles,
];

export const vehicleRepository = {
  /**
   * Retorna todos os IDs de veículos disponíveis.
   */
  getAllIds(): string[] {
    return ALL_VEHICLES.map((v) => v.identificacao.id);
  },

  /**
   * Retorna todas as marcas disponíveis, em ordem alfabética.
   */
  getBrands(): string[] {
    return [...new Set(ALL_VEHICLES.map((v) => v.identificacao.marca))].sort();
  },

  /**
   * Retorna os modelos disponíveis para uma marca, em ordem alfabética.
   */
  getModelsByBrand(brand: string): string[] {
    return [
      ...new Set(
        ALL_VEHICLES.filter((v) => v.identificacao.marca === brand).map(
          (v) => v.identificacao.modelo
        )
      ),
    ].sort();
  },

  /**
   * Retorna os anos-modelo disponíveis para um modelo, do mais recente ao mais antigo.
   */
  getYearsByModel(model: string): number[] {
    return [
      ...new Set(
        ALL_VEHICLES.filter((v) => v.identificacao.modelo === model).map(
          (v) => v.identificacao.anoModelo
        )
      ),
    ].sort((a, b) => b - a);
  },

  /**
   * Retorna as versões disponíveis para um modelo e ano, em ordem alfabética.
   */
  getVersionsByModelAndYear(model: string, year: number): string[] {
    return ALL_VEHICLES.filter(
      (v) =>
        v.identificacao.modelo === model && v.identificacao.anoModelo === year
    )
      .map((v) => v.identificacao.versao)
      .sort();
  },

  /**
   * Busca um veículo pelo ID único (slug).
   * Retorna null se não encontrado.
   */
  findById(id: string): Vehicle | null {
    return ALL_VEHICLES.find((v) => v.identificacao.id === id) ?? null;
  },

  /**
   * Busca um veículo pela combinação marca + modelo + versão + ano.
   * Retorna null se não encontrado.
   */
  findBySlug(
    marca: string,
    modelo: string,
    versao: string,
    ano: number
  ): Vehicle | null {
    return (
      ALL_VEHICLES.find(
        (v) =>
          v.identificacao.marca === marca &&
          v.identificacao.modelo === modelo &&
          v.identificacao.versao === versao &&
          v.identificacao.anoModelo === ano
      ) ?? null
    );
  },

  /**
   * Retorna todos os veículos (para uso em testes e validações).
   */
  getAll(): Vehicle[] {
    return ALL_VEHICLES;
  },
};
