import * as z from "zod";
import { ConfiguracoesSchema } from '..';

export const EnvioInutilizacaoSchema = z.object({
  configuracoes: ConfiguracoesSchema,
  dados: z.object({
    justificativa: z.string(),
    ano: z.number().int().min(2000),
    serie: z.number().int().min(1),
    numeroInicial: z.number().int().min(1),
    numeroFinal: z.number().int().min(1),
  }),
})

export type EnvioInutilizacao = z.infer<typeof EnvioInutilizacaoSchema>
