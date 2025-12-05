import { z } from 'zod';

export const ConfiguracoesWebServiceSchema = z.object({
  usuario: z.string(),
  senha: z.string(),
  usaPadraoNacional: z.boolean().default(false),
  chaveAutoriz: z.string().nullable().optional(),
  chaveAcesso: z.string().nullable().optional(),
  fraseSecr: z.string().nullable().optional(),
});

export type ConfiguracoesWebService = z.infer<typeof ConfiguracoesWebServiceSchema>;