import z from 'zod'
import { NullishString } from '../../types'

export const RetornoConsultaSchema = z.object({
  data: z.date(),
  status: z.string(),
  protocolo: z.string(),
  chave: z.string(),
  xml: NullishString,
})

export type RetornoConsulta = z.infer<typeof RetornoConsultaSchema>
