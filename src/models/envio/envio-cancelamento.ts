import { z } from 'zod'
import { ConfiguracoesSchema } from '..'

export const EnvioCancalamentoSchema = z.object({
  configuracoes: ConfiguracoesSchema,
  dados: z.object({
    motivoCancelamento: z.string(),
    chaveAcesso: z.string(),
    protocolo: z.string(),
    xml: z.string(),
  }),
})

export type EnvioCancelamento = z.infer<typeof EnvioCancalamentoSchema>
