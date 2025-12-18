import { z } from 'zod';
import { ConfiguracoesSchema } from '../../models';

export const NfseEnvioConsultaPorChaveSchema = z.object({
  configuracoes: ConfiguracoesSchema,
  chave: z.string().length(50, "A chave de acesso deve ter 50 dígitos."),
});

export type NfseEnvioConsultaPorChave = z.infer<typeof NfseEnvioConsultaPorChaveSchema>;