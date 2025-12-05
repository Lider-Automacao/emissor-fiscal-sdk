import { z } from 'zod';

export const NFSE_REGIME_TRIBUTACAO_MAP = {
  0: 'Nenhum',
  1: 'MicroempresaMunicipal',
  2: 'Estimativa',
  3: 'SociedadeProfissionais',
  4: 'Cooperativa',
  5: 'MicroempresarioIndividual',
  6: 'MicroempresarioEmpresaPP',
} as const;

export const RegimeEspecialTributacaoSchema = z.union(
  [
    z.literal(0).describe('Nenhum'),
    z.literal(1).describe('Microempresa Municipal'),
    z.literal(2).describe('Estimativa'),
    z.literal(3).describe('Sociedade Profissionais'),
    z.literal(4).describe('Cooperativa'),
    z.literal(5).describe('Microempresário Individual'),
    z.literal(6).describe('Microempresário Empresa PP'),
  ]
)

