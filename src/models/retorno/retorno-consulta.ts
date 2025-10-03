import z from 'zod'
import { NullishString } from '../../types'

export const RetornoConsultaSchema = z.object({
  data: z.date(),
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
  xml: NullishString,
})

export type RetornoConsulta = z.infer<typeof RetornoConsultaSchema>
