import { z } from 'zod';
import { ConfiguracoesSchema } from '../../models';

const DadosSchema = z.object({
  chave: z.string().optional().nullable(),
  codigoCancelamento: z.number().int().min(1).max(99).optional().nullable(),
  motivo: z.string().max(255).optional().nullable(),
});

export const NfseEnvioCancelamentoPorChaveSchema = z.object({
  configuracoes: ConfiguracoesSchema,
  dados: DadosSchema,
});

export type NfseEnvioCancelamentoPorChave = z.infer<typeof NfseEnvioCancelamentoPorChaveSchema>;
