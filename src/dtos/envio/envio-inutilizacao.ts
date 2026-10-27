import * as z from "zod";
import { ConfiguracoesSchema } from '../../models';

export const EnvioInutilizacaoSchema = z.object({
  configuracoes: ConfiguracoesSchema,
  dados: z.object({
    motivo: z.string().trim().min(15).max(255),
    ano: z.number().int().min(2000),
    serie: z.number().int().min(1),
    numeroInicial: z.number().int().min(1),
    numeroFinal: z.number().int().min(1),
  }),
})

export type EnvioInutilizacao = z.input<typeof EnvioInutilizacaoSchema>
