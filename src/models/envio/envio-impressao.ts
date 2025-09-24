import { z } from 'zod'
import { ConfiguracoesSchema } from '..'

export const EnvioImpressaoSchema = z.object({
  configuracoes: ConfiguracoesSchema,
  dados: z.discriminatedUnion('status', [
    z.object({
      status: z.literal('C'),
      xml: z.string(),
      evento: z.string(),
    }),
    z.object({
      xml: z.string(),
      status: z.string(),
      evento: z.string().nullish(),
    })]),
})

export type EnvioImpressao = z.infer<typeof EnvioImpressaoSchema>
