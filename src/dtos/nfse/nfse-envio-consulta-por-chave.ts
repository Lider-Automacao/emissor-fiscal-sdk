import { z } from 'zod';
import { ConfiguracoesSchema } from '../../models';

export const NfseEnvioConsultaPorChaveSchema = z.object({
  configuracoes: ConfiguracoesSchema,
  chave: z.string().length(44, "A chave de acesso deve ter 44 dígitos."),
});

export type NfseEnvioConsultaPorChave = z.infer<typeof NfseEnvioConsultaPorChaveSchema>;