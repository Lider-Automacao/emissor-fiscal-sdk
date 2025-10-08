import z from 'zod'
import { DateNullishSchema, NullishString } from '../../types'

export const RetornoConsultaSchema = z.object({
  data: DateNullishSchema,
  status: z.enum([
    'A',
    'C',
    'D',
    'I',
    'O',
    'G',
    'S',
    'N'
  ]),
  protocolo: z.string(),
  chaveAcesso: z.string(),
  xml: NullishString,
})

export type RetornoConsulta = z.infer<typeof RetornoConsultaSchema>
