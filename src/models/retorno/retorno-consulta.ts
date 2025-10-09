import z from 'zod'
import { DateNullishSchema, NullishString } from '../../types'

export const RetornoConsultaSchema = z.object({
  data: DateNullishSchema,
  protocolo: z.string(),
  status: z.enum([
    'A',
    'C',
    'D',
    'I',
    'O'
  ]),
  chaveAcesso: z.string(),
  xml: NullishString,
  evento: NullishString,
})

export type RetornoConsulta = z.infer<typeof RetornoConsultaSchema>
