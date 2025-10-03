import * as z from "zod";
import { ConfiguracoesSchema } from '..';

export const EnvioConsultaSchema = z.object({
  configuracoes: ConfiguracoesSchema,
  dados: z.object({
    chaveAcesso: z.string(),
    protocolo: z.string(),
    xml: z.string().optional().nullable(),
  }),
})

export type EnvioConsulta = z.infer<typeof EnvioConsultaSchema>
