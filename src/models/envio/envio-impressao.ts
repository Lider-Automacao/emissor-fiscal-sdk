import { z } from 'zod'
import { ConfiguracoesSchema } from '..'

export const EnvioImpressaoSchema = z.object({
  configuracoes: ConfiguracoesSchema,
  dados: z.object({
    xml: z.string(),
    status: z.string(),
    evento: z.string().optional(),
  }),
})

export type EnvioImpressao = z.infer<typeof EnvioImpressaoSchema>
