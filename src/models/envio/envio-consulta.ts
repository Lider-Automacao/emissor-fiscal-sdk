import * as z from "zod";
import { ConfiguracoesSchema } from '..';

export const EnvioConsultaSchema = z.object({
  dados: z.object({
    chaveAcesso: z.string(),
    xml: z.string().optional().nullable(),
  }),
  configuracoes: ConfiguracoesSchema,
})

export type EnvioConsulta = z.input<typeof EnvioConsultaSchema>
