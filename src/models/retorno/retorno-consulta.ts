import z from 'zod'
import { NullishString } from '../../types'

export const RetornoConsultaSchema = z.object({
  data: z.date(),
  status: z.string(),
  protocolo: NullishString,
  chave: NullishString,
  xml: NullishString,
})

export type RetornoConsulta = z.infer<typeof RetornoConsultaSchema>
