import { z } from 'zod'
import { ConfiguracoesSchema, StatusSchema } from '..'

export const EnvioImpressaoSchema = z.object({
  configuracoes: ConfiguracoesSchema,
  dados: z.object({
    xml: z.string(),
    status: StatusSchema,
    evento: z.string().nullish(),
  }),
})

export type EnvioImpressao = z.infer<typeof EnvioImpressaoSchema>
