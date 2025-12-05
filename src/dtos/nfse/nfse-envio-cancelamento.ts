import { z } from 'zod';
import { ConfiguracoesSchema } from '../../models';

const DadosSchema = z.union([
  z.object({
    numeroNFSe: z.string().optional().nullable(),
    numeroRps: z.string().optional().nullable(),
    serie: z.string().optional().nullable(),
    lote: z.string().optional().nullable(),
    protocolo: z.string().optional().nullable(),
    codigoCancelamento: z.number().int().min(1).max(99).optional().nullable(),
    motivo: z.string().max(255).optional().nullable(),
    tipoRps: z.string().max(1).optional().nullable(),
  }),
  z.object({
    chave: z.string().optional().nullable(),
    codigoCancelamento: z.number().int().min(1).max(99).optional().nullable(),
    motivo: z.string().max(255).optional().nullable(),
  })
]);

export const NfseEnvioCancelamentoSchema = z.object({
  configuracoes: ConfiguracoesSchema,
  dados: DadosSchema,
});

export type NfseEnvioCancelamento = z.infer<typeof NfseEnvioCancelamentoSchema>;
