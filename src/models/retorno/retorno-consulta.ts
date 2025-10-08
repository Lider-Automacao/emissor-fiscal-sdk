import { isEmpty } from '@raicamposs/toolkit'
import z from 'zod'
import { NullishString } from '../../types'

export const RetornoConsultaSchema = z.object({
  data: z.union([z.date(), z.iso.date().transform(value => isEmpty(value) ? null : value)]).nullish(),
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
