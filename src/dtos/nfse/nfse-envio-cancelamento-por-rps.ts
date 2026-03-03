import { z } from 'zod';
import { ConfiguracoesSchema, TipoRPSSchema } from '../../models';

const DadosSchema = z.object({
  numeroNFSe: z.string().optional().nullable(),
  numeroRps: z.string().optional().nullable(),
  serie: z.string().optional().nullable(),
  lote: z.string().optional().nullable(),
  protocolo: z.string().optional().nullable(),
  codigoCancelamento: z.number().int().min(1).max(99).optional().nullable(),
  motivo: z.string().max(255).optional().nullable(),
  tipoRps: TipoRPSSchema.optional().nullable(),
});

export const NfseEnvioCancelamentoPorRpsSchema = z.object({
  configuracoes: ConfiguracoesSchema,
  dados: DadosSchema,
});

export type NfseEnvioCancelamentoPorRps = z.infer<typeof NfseEnvioCancelamentoPorRpsSchema>;
