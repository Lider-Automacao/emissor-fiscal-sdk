import { z } from 'zod';

export const NFSE_STATUS_RPS_MAP = {
  1: 'Normal',
  2: 'Cancelado',
} as const;

export const StatusRpsSchema = z.union([
  z.literal(1).describe('RPS Normal / Válido'),
  z.literal(2).describe('RPS Cancelado'),
]).default(1);


export type StatusRps = z.infer<typeof StatusRpsSchema>;

