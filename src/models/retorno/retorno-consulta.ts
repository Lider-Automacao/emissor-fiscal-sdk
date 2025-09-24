import { isEmpty } from '@raicamposs/toolkit'
import z from 'zod'

export const RetornoConsultaSchema = z.object({
  data: z.date(),
  status: z.string(),
  protocolo: z.string().nullish().transform(value => isEmpty(value) ? undefined : value),
  chave: z.string().nullish().transform(value => isEmpty(value) ? undefined : value),
  xml: z.string().nullish().transform(value => isEmpty(value) ? undefined : value),
})

export type RetornoConsulta = z.infer<typeof RetornoConsultaSchema>
