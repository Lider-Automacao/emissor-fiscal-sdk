import { z } from 'zod';

export const NFSE_TIPO_RPS_MAP = {
  1: 'RPS',
  2: 'NFConjugada',
  3: 'Cupom',
} as const;


export const TipoRPSSchema = z.union(
  [
    z.literal(1).describe('RPS'),
    z.literal(2).describe('NFConjugada'),
    z.literal(3).describe('Cupom'),
  ]
);
