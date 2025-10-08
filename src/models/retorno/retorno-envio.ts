import { isEmpty } from '@raicamposs/toolkit'
import z from 'zod'
import { NullishString } from '../../types'

export const RetornoEnvioApiSchema = z.object({
  data: z.union([z.date(), z.iso.date()]),
  dataContigencia: z.union([z.date(), z.iso.date().transform(value => isEmpty(value) ? null : value)]).nullish(),
  protocolo: z.string(),
  chave: z.string(),
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
  xml: z.string(),
  motivo: NullishString,
  numero: z.number(),
  serie: z.number(),
})

export type RetornoEnvioApi = z.infer<typeof RetornoEnvioApiSchema>
